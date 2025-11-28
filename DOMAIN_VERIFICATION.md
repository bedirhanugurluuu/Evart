# Resend Domain Doğrulama Rehberi

## 🚨 Sorun: Domain Doğrulanmamış Hatası

Form gönderirken "The evartlife.com domain is not verified" hatası alıyorsunuz.

## ✅ Çözüm Seçenekleri

### Seçenek 1: Test Modu (Hızlı Çözüm - Geçici)

Test için doğrulanmış bir email adresi kullanabilirsiniz:

1. **Resend Dashboard'a gidin:** [resend.com/emails](https://resend.com/emails)
2. **"Add Email Address"** tıklayın
3. Email adresinizi girin (örn: `info@evartlife.com`)
4. Email'inize gelen doğrulama linkine tıklayın
5. **Vercel'de Environment Variable ekleyin:**
   - Key: `RESEND_FROM_EMAIL`
   - Value: Doğrulanmış email adresiniz (örn: `info@evartlife.com`)
   - Veya geçici olarak `onboarding@resend.dev` kullanabilirsiniz (Resend'in test email'i)

**Not:** Test modunda sadece doğrulanmış email adreslerine gönderim yapılabilir.

### Seçenek 2: Domain Doğrulama (Production İçin - Önerilen)

Domain doğrulaması yaparak herhangi bir email adresine gönderebilirsiniz:

#### Adım 1: Resend'de Domain Ekleme

1. [Resend Dashboard](https://resend.com/domains) → **"Domains"** sekmesine gidin
2. **"Add Domain"** butonuna tıklayın
3. Domain'inizi girin: `evartlife.com`
4. **"Add"** butonuna tıklayın

#### Adım 2: DNS Kayıtlarını GoDaddy'ye Ekleme

Resend size şu DNS kayıtlarını verecek (örnek):

**SPF Record:**
```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all
TTL: 3600
```

**DKIM Record (3 adet):**
```
Type: TXT
Name: resend._domainkey
Value: [Resend'in verdiği uzun string]
TTL: 3600
```

**DMARC Record (Opsiyonel ama önerilen):**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@evartlife.com
TTL: 3600
```

#### Adım 3: GoDaddy'de DNS Kayıtlarını Ekleme

1. [GoDaddy.com](https://godaddy.com) → **"My Account"** → **"My Products"**
2. Domain'inizin yanındaki **"DNS"** veya **"Manage DNS"** tıklayın
3. **"Add"** butonuna tıklayın
4. Resend'den aldığınız her DNS kaydını ekleyin:
   - **Type:** Resend'den aldığınız type (genelde TXT)
   - **Name:** Resend'den aldığınız name
   - **Value:** Resend'den aldığınız value
   - **TTL:** 3600 (veya otomatik)

#### Adım 4: DNS Propagation Bekleme

- DNS değişiklikleri **1-24 saat** içinde aktif olur (genelde 1-2 saat)
- Resend dashboard'da domain durumunu kontrol edin
- Tüm kayıtlar doğrulandığında domain "Verified" olarak görünecek

#### Adım 5: Vercel'de Environment Variables Güncelleme

Domain doğrulandıktan sonra:

1. Vercel Dashboard → Project → **Settings** → **Environment Variables**
2. `RESEND_FROM_EMAIL` variable'ını güncelleyin:
   - Value: `noreply@evartlife.com` (veya istediğiniz email)
3. Deployment'ı yeniden başlatın

## 🔍 DNS Kayıtlarını Kontrol Etme

DNS kayıtlarının doğru eklendiğini kontrol edin:

1. [MXToolbox](https://mxtoolbox.com/spf.aspx) - SPF kontrolü
2. [DKIM Validator](https://dkimvalidator.com/) - DKIM kontrolü
3. Resend Dashboard → Domains → Domain durumunu kontrol edin

## ⚠️ Önemli Notlar

1. **Test Modu:**
   - Sadece doğrulanmış email adreslerine gönderim yapılabilir
   - Her yeni email adresi için doğrulama gerekir
   - Ücretsiz plan için yeterli

2. **Domain Doğrulama:**
   - Domain doğrulandıktan sonra o domain'den herhangi bir email adresine gönderebilirsiniz
   - Production için önerilen yöntem
   - DNS kayıtları doğru eklendiğinde otomatik doğrulanır

3. **Email Gönderim Limitleri:**
   - Ücretsiz plan: Aylık 3,000 email, günlük 100 email
   - Çoğu proje için yeterli

## 🚀 Hızlı Test İçin

Şu an için test etmek istiyorsanız:

1. Vercel'de `RESEND_FROM_EMAIL` environment variable'ını ekleyin:
   - Value: `onboarding@resend.dev` (Resend'in test email'i)
2. Deployment'ı yeniden başlatın
3. Formu test edin

**Not:** `onboarding@resend.dev` sadece test için kullanılabilir. Production için domain doğrulaması yapmanız gerekiyor.

## 📝 Kontrol Listesi

- [ ] Resend hesabı oluşturuldu
- [ ] API key Vercel'de eklendi
- [ ] Test modu için email doğrulandı VEYA domain doğrulaması yapıldı
- [ ] DNS kayıtları GoDaddy'ye eklendi (domain doğrulama için)
- [ ] DNS propagation tamamlandı (1-24 saat)
- [ ] Resend dashboard'da domain "Verified" görünüyor
- [ ] Vercel'de `RESEND_FROM_EMAIL` environment variable eklendi
- [ ] Deployment yeniden başlatıldı
- [ ] Form test edildi ve çalışıyor

## 🔗 Yararlı Linkler

- [Resend Domains](https://resend.com/domains)
- [Resend Emails (Test)](https://resend.com/emails)
- [Resend Documentation](https://resend.com/docs)
- [GoDaddy DNS Management](https://www.godaddy.com/help/manage-dns-680)

