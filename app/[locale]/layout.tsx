import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import type { ReactNode } from "react";
import { Locale } from "@/i18n";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return {
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
    alternates: {
      languages: {
        'tr': `${baseUrl}/tr`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/tr`, // Varsayılan dil TR
      },
    },
    openGraph: {
      type: "website",
      locale: params.locale === 'tr' ? 'tr_TR' : 'en_US',
      url: `${baseUrl}/${params.locale}`,
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
      google: 'XCfBCY3DsvFjlTJOZ1ip-exJpCpJeunzgtMoRUOppas',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { locale: Locale };
}>) {
  return (
    <html lang={params.locale}>
      <head>
        {/* Favicon - Google için açık link etiketleri */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* DNS Preconnect - Vercel ve CDN için */}
        <link rel="dns-prefetch" href="https://evart.vercel.app" />
        <link rel="preconnect" href="https://evart.vercel.app" crossOrigin="anonymous" />
        {/* Google Fonts için preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload kritik görsel - LCP için (Hero Slider) */}
        <link
          rel="preload"
          href={`/images/hero-slide1-${params.locale === 'en' ? 'tr' : params.locale}-desktop.jpg`}
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
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZHZ18CS43J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZHZ18CS43J');
          `}
        </Script>
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
                "streetAddress": "İlkbahar Mahallesi, Galip Erdem Caddesi, Güney Park Evleri Karşısı,",
                "addressLocality": "Çankaya",
                "addressRegion": "Ankara",
                "postalCode": "48400",
                "addressCountry": "TR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+90-532-389-00-87",
                "contactType": "customer service",
                "areaServed": "TR",
                "availableLanguage": ["Turkish", "English"]
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

