import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Basit in-memory rate limiting (Production'da Redis kullanılabilir)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 dakika
const MAX_REQUESTS_PER_WINDOW = 5; // 15 dakikada maksimum 5 istek

function getRateLimitKey(request: NextRequest): string {
  // IP adresini al (Vercel'de x-forwarded-for header'ından)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 
             request.headers.get('x-real-ip') || 
             'unknown';
  return ip;
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // Yeni pencere başlat
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetTime: now + RATE_LIMIT_WINDOW };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  // İsteği artır
  record.count++;
  rateLimitMap.set(ip, record);
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count, resetTime: record.resetTime };
}

// Eski kayıtları temizle (memory leak önleme)
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of Array.from(rateLimitMap.entries())) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 1000); // Her dakika temizle

export async function POST(request: NextRequest) {
  try {
    // Rate limiting kontrolü
    const ip = getRateLimitKey(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      const resetSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        { 
          success: false, 
          message: `Çok fazla istek gönderdiniz. Lütfen ${Math.ceil(resetSeconds / 60)} dakika sonra tekrar deneyin.` 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': MAX_REQUESTS_PER_WINDOW.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          }
        }
      );
    }

    const body = await request.json();
    const { firstName, lastName, phone, subject, message, projectName, timestamp } = body;

    // Güvenlik Kontrolleri
    // 1. Timestamp kontrolü - çok eski veya gelecek tarihli istekleri engelle
    if (timestamp) {
      const requestTime = Date.now();
      const timeDiff = Math.abs(requestTime - timestamp);
      const maxTimeDiff = 5 * 60 * 1000; // 5 dakika tolerans

      if (timeDiff > maxTimeDiff) {
        console.warn('Suspicious request: timestamp mismatch', { requestTime, timestamp, timeDiff });
        return NextResponse.json(
          { success: false, message: 'Geçersiz istek. Lütfen sayfayı yenileyip tekrar deneyin.' },
          { status: 400 }
        );
      }
    }

    // 2. Honeypot kontrolü (eğer gönderilmişse)
    if (body.website) {
      console.warn('Bot detected: honeypot field filled');
      return NextResponse.json(
        { success: false, message: 'Geçersiz istek.' },
        { status: 400 }
      );
    }

    // Validasyon
    if (!firstName || !lastName || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Lütfen tüm alanları doldurun.' },
        { status: 400 }
      );
    }

    // Resend API Key kontrolü
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is not set');
      return NextResponse.json(
        { success: false, message: 'Email servisi yapılandırılmamış.' },
        { status: 500 }
      );
    }

    // Resend instance'ı sadece API key varsa oluştur
    const resend = new Resend(apiKey);

    // Email gönderme
    // FROM email: Doğrulanmış olmalı (Resend'de email doğrulaması yeterli, domain doğrulaması gerekmez)
    // TO email: Herhangi bir email adresi olabilir (doğrulama gerekmez)
    
    // Alıcı email (form mesajlarının gönderileceği adres)
    const recipientEmail = process.env.CONTACT_EMAIL || 'info@evartlife.com';
    
    // Gönderen email (Resend'de doğrulanmış olmalı - domain doğrulaması GEREKMEZ)
    // Resend → Emails → Email adresinizi doğrulayın, sonra buraya yazın
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    // HTML escape fonksiyonu (XSS koruması)
    const escapeHtml = (text: string) => {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Güvenli HTML içerik
    const safeProjectName = escapeHtml(projectName || 'Evart');
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safePhone = escapeHtml(phone);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
    
    const { data, error } = await resend.emails.send({
      from: fromEmail, // Domain doğrulaması yapıldıktan sonra evartlife.com domain'inden gönderebilirsiniz
      to: [recipientEmail],
      subject: `${safeProjectName} - ${safeSubject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: 'Gotham', Arial, sans-serif; line-height: 1.6; color: #414042; margin: 0; padding: 0; background-color: #f4f4f4; }
              .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background-color: #869e9e; color: white; padding: 30px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
              .content { padding: 30px 20px; background-color: #ffffff; }
              .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e5e5e5; }
              .field:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #869e9e; font-size: 14px; text-transform: uppercase; margin-bottom: 5px; }
              .value { color: #414042; font-size: 16px; margin-top: 5px; }
              .footer { margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-top: 2px solid #869e9e; font-size: 12px; color: #666; text-align: center; }
              .footer p { margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Yeni İletişim Formu</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Proje</div>
                  <div class="value">${safeProjectName}</div>
                </div>
                <div class="field">
                  <div class="label">Ad</div>
                  <div class="value">${safeFirstName}</div>
                </div>
                <div class="field">
                  <div class="label">Soyad</div>
                  <div class="value">${safeLastName}</div>
                </div>
                <div class="field">
                  <div class="label">Telefon</div>
                  <div class="value">${safePhone}</div>
                </div>
                <div class="field">
                  <div class="label">Konu</div>
                  <div class="value">${safeSubject}</div>
                </div>
                <div class="field">
                  <div class="label">Mesaj</div>
                  <div class="value">${safeMessage}</div>
                </div>
              </div>
              <div class="footer">
                <p><strong>Evart İletişim Formu</strong></p>
                <p>Bu email Evart web sitesinden gönderilmiştir.</p>
                <p>Gönderim Zamanı: ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Yeni İletişim Formu

Proje: ${projectName || 'Evart'}
Ad: ${firstName}
Soyad: ${lastName}
Telefon: ${phone}
Konu: ${subject}

Mesaj:
${message}

---
Evart İletişim Formu
Bu email Evart web sitesinden gönderilmiştir.
Gönderim Zamanı: ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}
      `,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      
      // Resend hata mesajlarını daha detaylı göster
      let errorMessage = 'Email gönderilirken bir hata oluştu.';
      
      if (error.message) {
        // Domain doğrulama hatası
        if (error.message.includes('domain not verified') || error.message.includes('domain is not verified')) {
          errorMessage = 'Domain doğrulanmamış. Lütfen Resend dashboard\'da (https://resend.com/domains) domain doğrulaması yapın. Test için: Resend → Emails → Email adresinizi doğrulayın.';
        }
        // Test modu hatası
        else if (error.message.includes('testing emails')) {
          errorMessage = 'Test modunda sadece doğrulanmış email adreslerine gönderim yapılabilir. Resend → Emails → Email adresinizi doğrulayın.';
        }
        // API key hatası
        else if (error.message.includes('API key') || error.message.includes('Unauthorized') || error.message.includes('Invalid')) {
          errorMessage = 'Resend API anahtarı geçersiz veya eksik. Lütfen Vercel\'de RESEND_API_KEY environment variable\'ını kontrol edin.';
        }
        // From email hatası
        else if (error.message.includes('from') || error.message.includes('sender')) {
          errorMessage = `Gönderen email adresi (${fromEmail}) doğrulanmamış. Resend\'de bu email adresini doğrulamanız gerekiyor.`;
        }
        // Diğer hatalar
        else {
          errorMessage = `Resend hatası: ${error.message}`;
        }
      }
      
      // Hata detaylarını logla (production'da da görünsün)
      console.error('Resend error details:', {
        message: error.message,
        name: error.name,
        fromEmail,
        recipientEmail,
        apiKeyExists: !!apiKey,
        apiKeyLength: apiKey?.length || 0
      });
      
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla gönderildi!' },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': MAX_REQUESTS_PER_WINDOW.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        }
      }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    console.error('Error stack:', error?.stack);
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      apiKeyExists: !!process.env.RESEND_API_KEY
    });
    
    // Daha detaylı hata mesajı
    let errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
    
    if (error?.message) {
      if (error.message.includes('JSON')) {
        errorMessage = 'Geçersiz form verisi. Lütfen tüm alanları doğru şekilde doldurun.';
      } else {
        errorMessage = `Hata: ${error.message}`;
      }
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

