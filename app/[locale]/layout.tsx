import type { Metadata } from "next";
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
        'tr': baseUrl, // TR is at root, no /tr
        'en': `${baseUrl}/en`,
        'x-default': baseUrl, // Default is root (TR)
      },
    },
    openGraph: {
      type: "website",
      locale: params.locale === 'tr' ? 'tr_TR' : 'en_US',
      url: params.locale === 'tr' ? baseUrl : `${baseUrl}/${params.locale}`,
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
        { url: '/evart-icon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/evart-icon-96.png', sizes: '96x96', type: 'image/png' },
        { url: '/evart-favicon.ico', sizes: 'any', type: 'image/x-icon' },
      ],
      shortcut: '/evart-favicon.ico',
      apple: [
        { url: '/evart-apple-icon.png', sizes: '180x180', type: 'image/png' },
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
    <>
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
    </>
  );
}

