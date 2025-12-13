/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export yerine normal Next.js kullanıyoruz (API routes için gerekli)
  // output: 'export', // API routes çalışması için kaldırıldı
  images: {
    // Image optimization aktif (production'da otomatik optimize eder)
    // unoptimized: true, // Kaldırıldı - artık Next.js image optimization kullanılacak
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compress ve optimize
  compress: true,
  // Production optimizations
  swcMinify: true,
  // Modern tarayıcıları hedefle - eski JavaScript polyfill'lerini kaldır
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Modern ES6+ kodunu çevirme - modern tarayıcılar için
  experimental: {
    optimizePackageImports: ['@/components', 'swiper'],
    // Partial prerendering - daha hızlı sayfa yükleme
    ppr: false, // Next.js 15'te aktif olacak
  },
  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  // Experimental features for better performance
  // optimizeCss kaldırıldı - critters dependency gerektiriyor ve build hatası veriyor
  // experimental: {
  //   optimizeCss: true,
  // },
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          // Video dosyaları için range request desteği
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

