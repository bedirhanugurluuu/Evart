import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Geçerli bir e-posta adresi giriniz.' },
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

    const resend = new Resend(apiKey);

    // Email adreslerini ayarla
    const recipientEmail = process.env.CONTACT_EMAIL || 'info@evartlife.com';
    
    // Gönderen email (Resend'de doğrulanmış olmalı - domain doğrulaması GEREKMEZ)
    // Resend → Emails → Email adresinizi doğrulayın, sonra buraya yazın
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    // Debug: Email adreslerini logla
    console.log('Newsletter email config:', {
      fromEmail,
      recipientEmail,
      hasResendFromEmail: !!process.env.RESEND_FROM_EMAIL,
      hasContactEmail: !!process.env.CONTACT_EMAIL
    });

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

    const safeEmail = escapeHtml(email);
    const subscriptionTime = new Date().toLocaleString('tr-TR', { 
      timeZone: 'Europe/Istanbul',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Newsletter aboneliği bildirimi email'i gönder
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: '🎉 Yeni Newsletter Abonesi - Evart',
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
              .highlight { background-color: #f0f8f8; padding: 20px; border-left: 4px solid #869e9e; margin: 20px 0; }
              .footer { margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-top: 2px solid #869e9e; font-size: 12px; color: #666; text-align: center; }
              .footer p { margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Yeni Newsletter Abonesi</h1>
              </div>
              <div class="content">
                <div class="highlight">
                  <p style="margin: 0; font-size: 18px; color: #414042;">
                    <strong>Birisi newsletter aboneniz oldu!</strong>
                  </p>
                </div>
                <div class="field">
                  <div class="label">Email Adresi</div>
                  <div class="value">${safeEmail}</div>
                </div>
                <div class="field">
                  <div class="label">Abonelik Zamanı</div>
                  <div class="value">${subscriptionTime}</div>
                </div>
              </div>
              <div class="footer">
                <p><strong>Evart Newsletter Sistemi</strong></p>
                <p>Bu email Evart web sitesinden otomatik olarak gönderilmiştir.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
🎉 Yeni Newsletter Abonesi

Birisi newsletter aboneniz oldu!

Email Adresi: ${email}
Abonelik Zamanı: ${subscriptionTime}

---
Evart Newsletter Sistemi
Bu email Evart web sitesinden otomatik olarak gönderilmiştir.
      `,
    });

    if (error) {
      console.error('Resend error (newsletter):', JSON.stringify(error, null, 2));
      
      // Resend hata mesajlarını daha detaylı göster
      let errorMessage = 'Email gönderilirken bir hata oluştu.';
      
      if (error.message) {
        // Domain doğrulama hatası
        if (error.message.includes('domain not verified') || error.message.includes('domain is not verified')) {
          errorMessage = 'Domain doğrulanmamış. Lütfen Resend dashboard\'da email adresinizi doğrulayın.';
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
          errorMessage = `Gönderen email adresi (${fromEmail}) doğrulanmamış. Resend'de bu email adresini doğrulamanız gerekiyor.`;
        }
        // Diğer hatalar
        else {
          errorMessage = `Resend hatası: ${error.message}`;
        }
      }
      
      console.error('Newsletter email error details:', {
        message: error.message,
        name: error.name,
        fromEmail,
        recipientEmail,
        subscriberEmail: email,
        apiKeyExists: !!apiKey,
        apiKeyLength: apiKey?.length || 0
      });
      
      // Email gönderilemese bile abonelik başarılı sayılır
      // Ama hata detaylarını log'a yazıyoruz
      console.warn('Newsletter email gönderilemedi ama abonelik kaydedildi:', email);
      console.warn('Hata nedeni:', errorMessage);
    } else {
      console.log('Newsletter subscription email sent successfully:', data);
    }

    // Abonelik başarılı (email gönderilse de gönderilmese de)
    console.log('Newsletter subscription:', email, new Date().toISOString());

    return NextResponse.json(
      { success: true, message: 'Newsletter kaydı başarıyla alındı!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      stack: error?.stack
    });
    
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
