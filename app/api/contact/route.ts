import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, subject, message, projectName } = body;

    // Validasyon
    if (!firstName || !lastName || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Lütfen tüm alanları doldurun.' },
        { status: 400 }
      );
    }

    // Resend API Key kontrolü
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return NextResponse.json(
        { success: false, message: 'Email servisi yapılandırılmamış.' },
        { status: 500 }
      );
    }

    // Email gönderme
    // Resend test modunda sadece doğrulanmış email adresine gönderebilir
    // Production'da domain doğrulaması yapıldıktan sonra herhangi bir email adresine gönderebilirsiniz
    const recipientEmail = process.env.CONTACT_EMAIL || 'bedirhanugurlu@aof.anadolu.edu.tr';
    
    const { data, error } = await resend.emails.send({
      from: 'Evart İletişim <onboarding@resend.dev>', // Resend'de doğrulanmış domain kullanılmalı
      to: [recipientEmail], // Environment variable'dan alınacak veya varsayılan olarak doğrulanmış email
      subject: `${projectName || 'Evart'} - ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #869e9e; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #414042; }
              .value { margin-top: 5px; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Yeni İletişim Formu</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Proje:</div>
                  <div class="value">${projectName || 'Evart'}</div>
                </div>
                <div class="field">
                  <div class="label">Ad:</div>
                  <div class="value">${firstName}</div>
                </div>
                <div class="field">
                  <div class="label">Soyad:</div>
                  <div class="value">${lastName}</div>
                </div>
                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value">${phone}</div>
                </div>
                <div class="field">
                  <div class="label">Konu:</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">Mesaj:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                <p>Bu email Evart web sitesinden gönderilmiştir.</p>
                <p>Gönderim Zamanı: ${new Date().toLocaleString('tr-TR')}</p>
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
Bu email Evart web sitesinden gönderilmiştir.
Gönderim Zamanı: ${new Date().toLocaleString('tr-TR')}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Email gönderilirken bir hata oluştu.' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla gönderildi!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}

