# SEO ve Performans İyileştirmeleri

## ✅ Tamamlanan SEO İyileştirmeleri

### 1. Sitemap.xml
- ✅ `app/sitemap.ts` oluşturuldu
- ✅ Tüm sayfalar için dinamik sitemap
- ✅ Priority ve changeFrequency ayarları

### 2. Robots.txt
- ✅ `app/robots.ts` oluşturuldu
- ✅ API routes ve _next klasörü engellendi
- ✅ Sitemap referansı eklendi

### 3. Metadata İyileştirmeleri
- ✅ Ana layout'ta kapsamlı metadata
- ✅ Her sayfa için özel metadata (layout.tsx dosyalarında)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Keywords ve description

### 4. Schema.org Structured Data
- ✅ Organization schema (ana layout'ta)
- ✅ Adres ve iletişim bilgileri
- ✅ LD+JSON formatında

## ✅ Tamamlanan Performans İyileştirmeleri

### 1. Next.js Config Optimizasyonları
- ✅ Image optimization aktif
- ✅ AVIF ve WebP format desteği
- ✅ SWC minification
- ✅ CSS optimization
- ✅ Compression aktif

### 2. Cache Headers
- ✅ Font dosyaları için uzun süreli cache (1 yıl)
- ✅ Image dosyaları için uzun süreli cache (1 yıl)
- ✅ Security headers eklendi

### 3. Font Optimizasyonları
- ✅ Font preload (kritik fontlar)
- ✅ font-display: swap (zaten mevcut)
- ✅ CrossOrigin ayarları

## 📋 Yapılması Gerekenler

### SEO
1. **OG Image Oluştur**
   - `/public/images/og-image.jpg` dosyası oluşturulmalı
   - Boyut: 1200x630px
   - Her sayfa için özel OG image'ler oluşturulabilir

2. **Google Search Console**
   - Site doğrulaması yapılmalı
   - `app/layout.tsx` içindeki verification code güncellenmeli

3. **Sosyal Medya Linkleri**
   - `app/layout.tsx` içindeki Schema.org `sameAs` array'ine sosyal medya linkleri eklenmeli

4. **Alt Text Kontrolü**
   - Tüm görsellerde `alt` attribute'ları kontrol edilmeli
   - SEO için anlamlı alt text'ler kullanılmalı

### Performans
1. **Image Optimization**
   - `<img>` tag'leri yerine Next.js `<Image>` component'i kullanılmalı
   - Örnek: `import Image from 'next/image'`
   - Lazy loading otomatik olarak çalışır

2. **Code Splitting**
   - Büyük component'ler için dynamic import kullanılabilir
   - Örnek: `const Component = dynamic(() => import('./Component'))`

3. **Bundle Size Analizi**
   - `npm run build` sonrası bundle size kontrol edilmeli
   - Gereksiz dependency'ler kaldırılmalı

4. **Environment Variables**
   - `.env.local` dosyasına `NEXT_PUBLIC_SITE_URL` eklenmeli
   - Örnek: `NEXT_PUBLIC_SITE_URL=https://evart.com`

## 🔧 Environment Variables

`.env.local` dosyasına eklenmesi gerekenler:

```env
NEXT_PUBLIC_SITE_URL=https://evart.com
```

## 📊 Performans Metrikleri

Production build sonrası kontrol edilmesi gerekenler:
- Lighthouse Score (hedef: 90+)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)

## 🚀 Deployment Notları

1. **Vercel Deployment**
   - Environment variables Vercel dashboard'dan eklenmeli
   - `NEXT_PUBLIC_SITE_URL` production URL'i olmalı

2. **Static Export (Eğer gerekirse)**
   - API routes kullanılıyorsa `output: 'export'` kaldırılmalı
   - Şu anda kaldırıldı çünkü API routes var

3. **Image Optimization**
   - Vercel'de otomatik çalışır
   - Custom image domain kullanılıyorsa `images.domains` eklenmeli

