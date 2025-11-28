# Basit Email Kurulumu (Domain Doğrulaması GEREKMEZ)

## 🎯 Ne Yapıyoruz?

Sadece form mesajlarını almak istiyorsunuz. Domain doğrulamasına **GEREK YOK**!

- **FROM email:** Resend'de doğrulanmış bir email (kendi email'iniz)
- **TO email:** Form mesajlarının gideceği email (info@evartlife.com - doğrulama gerekmez)

## ✅ Adım Adım (5 Dakika)

### 1. Resend'de Email Doğrulama

1. [Resend Dashboard](https://resend.com/emails) → **"Emails"** sekmesine gidin
2. **"Add Email Address"** butonuna tıklayın
3. Kendi email adresinizi girin (örn: `info@evartlife.com` veya Gmail adresiniz)
4. **"Add"** butonuna tıklayın
5. Email'inize gelen doğrulama linkine tıklayın
6. ✅ Email doğrulandı!

**Not:** Domain doğrulaması yapmıyoruz, sadece email adresini doğruluyoruz.

### 2. Vercel'de Environment Variables

1. [Vercel Dashboard](https://vercel.com/dashboard) → Projenizi seçin
2. **Settings** → **Environment Variables**
3. Şu variable'ları ekleyin:

#### RESEND_API_KEY (Zaten var mı kontrol edin)
- **Key:** `RESEND_API_KEY`
- **Value:** Resend'den aldığınız API key
- **Environment:** Production, Preview, Development

#### RESEND_FROM_EMAIL (YENİ EKLEYİN)
- **Key:** `RESEND_FROM_EMAIL`
- **Value:** Resend'de doğruladığınız email adresi (örn: `info@evartlife.com`)
- **Environment:** Production, Preview, Development

#### CONTACT_EMAIL (Opsiyonel - Form mesajlarının gideceği adres)
- **Key:** `CONTACT_EMAIL`
- **Value:** Form mesajlarının gideceği email (örn: `info@evartlife.com`)
- **Environment:** Production, Preview, Development

**Not:** `CONTACT_EMAIL` eklemezseniz, kod otomatik olarak `info@evartlife.com` kullanır.

### 3. Deployment'ı Yeniden Başlatın

1. Vercel Dashboard → **Deployments**
2. En son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçin
4. Veya yeni bir commit push edin

### 4. Test Edin

1. Sitenizdeki formu doldurun
2. Gönderin
3. Email'inizi kontrol edin - form mesajı gelmiş olmalı!

## 🔍 Sorun Giderme

### "Email adresi doğrulanmamış" hatası
- Resend → Emails → Email'inizin "Verified" olduğundan emin olun
- Doğrulama email'i gelmediyse spam klasörünü kontrol edin

### "API key geçersiz" hatası
- Vercel'de `RESEND_API_KEY` variable'ının doğru olduğundan emin olun
- Resend Dashboard → API Keys → Yeni bir key oluşturup Vercel'de güncelleyin

### Email gelmiyor
- Spam klasörünü kontrol edin
- Resend Dashboard → Emails → Logs → Email'in gönderilip gönderilmediğini kontrol edin
- `CONTACT_EMAIL` variable'ının doğru olduğundan emin olun

## 📝 Özet

✅ **YAPILACAKLAR:**
1. Resend'de email adresinizi doğrulayın (5 dakika)
2. Vercel'de `RESEND_FROM_EMAIL` ekleyin
3. Deployment'ı yeniden başlatın
4. Test edin

❌ **YAPMAYACAKLAR:**
- Domain doğrulaması (GEREKMEZ)
- DNS kayıtları ekleme (GEREKMEZ)
- GoDaddy'de değişiklik (GEREKMEZ)

## 🎉 Sonuç

Bu kadar! Domain doğrulamasına gerek yok. Sadece email adresinizi doğrulayın ve form mesajlarını alın.

