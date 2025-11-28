# Resend Email Servisi Kurulum Rehberi

## 🔧 Sorun: "Bir hata oluştu. Lütfen tekrar deneyin." Hatası

Bu hata genellikle Resend API yapılandırması eksik olduğunda oluşur. Aşağıdaki adımları takip edin.

## 📋 Adım Adım Kurulum

### 1. Resend Hesabı Oluşturma ve API Key Alma

1. [resend.com](https://resend.com) adresine gidin
2. "Sign Up" ile hesap oluşturun (ücretsiz plan yeterli)
3. Dashboard'a giriş yapın
4. Sol menüden **"API Keys"** seçin
5. **"Create API Key"** butonuna tıklayın
6. Key'e bir isim verin (örn: "Evart Production")
7. **"Create"** butonuna tıklayın
8. **ÖNEMLİ:** API Key'i kopyalayın (sadece bir kez gösterilir!)
   - Format: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2. Resend'de Domain Doğrulama (Önemli!)

**Test Modu:**
- Resend test modunda sadece **doğrulanmış email adreslerine** gönderim yapabilir
- Test için: Resend Dashboard → **"Emails"** → **"Add Email Address"**
- Email adresinize gelen doğrulama linkine tıklayın

**Production Modu (Önerilen):**
- Domain doğrulaması yaparak herhangi bir email adresine gönderebilirsiniz
- Resend Dashboard → **"Domains"** → **"Add Domain"**
- Domain'inizi girin (örn: `evartlife.com`)
- DNS kayıtlarını GoDaddy'ye ekleyin (Resend size gösterecek)
- DNS kayıtları aktif olunca domain doğrulanır (1-24 saat)

### 3. Vercel'de Environment Variables Ekleme

1. [Vercel Dashboard](https://vercel.com/dashboard) → Projenizi seçin
2. **Settings** → **Environment Variables** sekmesine gidin
3. Aşağıdaki environment variable'ları ekleyin:

#### Gerekli Environment Variables:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Nasıl Ekle:**
- **Key:** `RESEND_API_KEY`
- **Value:** Resend'den kopyaladığınız API key
- **Environment:** Production, Preview, Development (hepsini seçin)
- **"Save"** butonuna tıklayın

#### Opsiyonel Environment Variables:

```
CONTACT_EMAIL=info@evartlife.com
RESEND_FROM_EMAIL=noreply@evartlife.com
```

**Açıklama:**
- `CONTACT_EMAIL`: Form mesajlarının gönderileceği email adresi
- `RESEND_FROM_EMAIL`: Gönderen email adresi (domain doğrulandıktan sonra `@evartlife.com` kullanabilirsiniz)

### 4. Vercel Deployment'ı Yeniden Başlatma

Environment variable'ları ekledikten sonra:

1. Vercel Dashboard → **Deployments**
2. En son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçin
4. Veya yeni bir commit push edin (otomatik deploy olur)

### 5. Test Etme

1. Sitenizdeki iletişim formunu doldurun
2. Formu gönderin
3. **Browser Console'u açın** (F12 → Console)
4. Hata mesajlarını kontrol edin
5. Vercel Dashboard → **Deployments** → **Functions** → **Logs** bölümünden server-side logları kontrol edin

## 🔍 Sorun Giderme

### Hata: "Email servisi yapılandırılmamış"
- **Çözüm:** `RESEND_API_KEY` environment variable'ı Vercel'de tanımlı değil
- Kontrol: Vercel Dashboard → Settings → Environment Variables

### Hata: "Domain doğrulanmamış" veya "testing emails"
- **Çözüm 1:** Resend Dashboard → Emails → Email adresinizi doğrulayın
- **Çözüm 2:** Domain doğrulaması yapın (production için önerilen)

### Hata: "API key geçersiz"
- **Çözüm:** API key'i kontrol edin, yanlış kopyalanmış olabilir
- Yeni bir API key oluşturup Vercel'de güncelleyin

### Hata: "From email doğrulanmamış"
- **Çözüm:** Resend'de gönderen email adresini doğrulayın
- Veya domain doğrulaması yapın (daha iyi çözüm)

### Form gönderiliyor ama email gelmiyor
1. Resend Dashboard → **"Emails"** → **"Logs"** bölümünü kontrol edin
2. Email'in gönderilip gönderilmediğini görün
3. Spam klasörünü kontrol edin
4. Email adresinin doğru olduğundan emin olun

## 📝 Önemli Notlar

1. **API Key Güvenliği:**
   - API key'i asla GitHub'a commit etmeyin
   - `.env` dosyasını `.gitignore`'a ekleyin (zaten ekli)
   - Sadece Vercel'de environment variable olarak saklayın

2. **Resend Limitleri (Ücretsiz Plan):**
   - Aylık 3,000 email
   - Günlük 100 email
   - Yeterli mi? Evet, çoğu proje için yeterli

3. **Domain Doğrulama:**
   - Domain doğrulaması yapmadan da çalışır (sadece doğrulanmış email'lere gönderir)
   - Production için domain doğrulaması önerilir

4. **Test Modu:**
   - Test modunda sadece doğrulanmış email adreslerine gönderim yapılır
   - Production'da domain doğrulaması yapıldıktan sonra herhangi bir email adresine gönderebilirsiniz

## 🔗 Yararlı Linkler

- [Resend Dashboard](https://resend.com/emails)
- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## ✅ Kontrol Listesi

- [ ] Resend hesabı oluşturuldu
- [ ] API key alındı ve kopyalandı
- [ ] Vercel'de `RESEND_API_KEY` environment variable eklendi
- [ ] Email adresi veya domain Resend'de doğrulandı
- [ ] Vercel deployment yeniden başlatıldı
- [ ] Form test edildi ve çalışıyor
- [ ] Email'ler başarıyla gönderiliyor

