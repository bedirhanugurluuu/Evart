import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://evart.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Evart - Premium Gayrimenkul Çözümleri",
    template: "%s | Evart"
  },
  description: "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri. Evart Oran ve Evart Yalıkavak ile yaşam hayaliniz bir mesaj uzağınızda.",
  keywords: ["evart", "gayrimenkul", "konut", "ankara", "bodrum", "evart oran", "evart yalıkavak", "premium konut", "lüks daire"],
  authors: [{ name: "Evart" }],
  creator: "Evart",
  publisher: "Evart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: baseUrl,
    siteName: "Evart",
    title: "Evart - Premium Gayrimenkul Çözümleri",
    description: "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri.",
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Evart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evart - Premium Gayrimenkul Çözümleri",
    description: "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri.",
    images: [`${baseUrl}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification code buraya eklenebilir
    // google: 'your-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* DNS Preconnect - Vercel ve CDN için */}
        <link rel="dns-prefetch" href="https://evart.vercel.app" />
        <link rel="preconnect" href="https://evart.vercel.app" crossOrigin="anonymous" />
        {/* Google Fonts için preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload kritik görsel - LCP için */}
        <link
          rel="preload"
          href="/images/Slider.png"
          as="image"
          fetchPriority="high"
        />
        {/* Preload kritik font dosyaları */}
        <link
          rel="preload"
          href="/fonts/Gotham-Book.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Gotham-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FuturaPT-Book.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FuturaPT-Demi.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Gotham-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Service Worker 206 hatası için - Video dosyalarını cache'den hariç tut */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body>
        {children}
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Evart",
              "url": baseUrl,
              "logo": `${baseUrl}/logo.png`,
              "description": "Premium gayrimenkul çözümleri ile hayalinizdeki eve kavuşun",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dirmil, İnönü Cd.",
                "addressLocality": "Bodrum",
                "addressRegion": "Muğla",
                "postalCode": "48400",
                "addressCountry": "TR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+90-532-510-12-31",
                "contactType": "customer service",
                "areaServed": "TR",
                "availableLanguage": ["Turkish"]
              },
              "sameAs": [
                // Sosyal medya linkleri buraya eklenebilir
              ]
            })
          }}
        />
      </body>
    </html>
  );
}

