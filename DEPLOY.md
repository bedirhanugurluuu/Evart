# Vercel'e Deploy Etme Rehberi

## 1. Git Repository Hazırlığı

### Terminal'de şu komutları çalıştırın:

```bash
# Git repository'yi başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit'i yap
git commit -m "Initial commit"

# GitHub repository'nizi remote olarak ekleyin (Evart repository'nizin URL'si ile değiştirin)
git remote add origin https://github.com/KULLANICI_ADINIZ/Evart.git

# Branch'i main olarak ayarlayın
git branch -M main

# GitHub'a push edin
git push -u origin main
```

## 2. Vercel'e Deploy

### Seçenek 1: Vercel Dashboard Üzerinden (Önerilen)

1. https://vercel.com adresine gidin ve GitHub hesabınızla giriş yapın
2. "Add New Project" butonuna tıklayın
3. GitHub repository'nizden "Evart" projesini seçin
4. Vercel otomatik olarak Next.js projesini algılayacak
5. Build Settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (otomatik algılanır)
   - Output Directory: `.next` (otomatik algılanır)
6. Environment Variables: Şu an için gerekli değil (statik site)
7. "Deploy" butonuna tıklayın

### Seçenek 2: Vercel CLI ile

```bash
# Vercel CLI'yi global olarak yükleyin
npm install -g vercel

# Proje dizininde
vercel

# İlk deploy için:
# - Set up and deploy? Yes
# - Which scope? Hesabınızı seçin
# - Link to existing project? No
# - Project name: evart (veya istediğiniz isim)
# - Directory: ./
# - Override settings? No
```

## 3. Önemli Notlar

- Proje statik export kullanıyor (`next.config.js` içinde `output: 'export'`)
- Build komutu: `npm run build`
- Output klasörü: `out` (Next.js static export için)
- Font dosyaları `/public/fonts/` klasöründe olmalı
- Görseller `/public/images/` klasöründe olmalı
- Logo `/public/logo.png` konumunda olmalı

## 4. Build Kontrolü

Deploy öncesi lokal olarak build test edin:

```bash
npm run build
```

Build başarılı olursa `out` klasörü oluşacak. Bu klasörü kontrol edin.

## 5. Sorun Giderme

- Build hatası alırsanız, `package.json` içindeki script'leri kontrol edin
- Font dosyaları eksikse, `/public/fonts/` klasörünü kontrol edin
- Görseller yüklenmiyorsa, `/public/images/` klasörünü kontrol edin

