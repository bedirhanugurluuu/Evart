import type { Metadata } from "next";
import ContactClient from "../[locale]/contact/ContactClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata(): Metadata {
  return {
    title: "İletişim | Evart - Ankara & Bodrum Ofisleri",
    description: "Evart ile iletişime geçin. Ankara Çankaya ve Bodrum Yalıkavak ofislerimizden bize ulaşın. Evart Oran ve Evart Yalıkavak projeleri hakkında bilgi alın. 0532 510 12 31",
    keywords: ["iletişim", "evart iletişim", "ankara ofis", "bodrum ofis", "gayrimenkul danışmanlık", "evart"],
    alternates: {
      canonical: `${baseUrl}/contact`,
      languages: {
        'tr': `${baseUrl}/contact`,
        'en': `${baseUrl}/en/contact`,
        'x-default': `${baseUrl}/contact`,
      },
    },
    openGraph: {
      title: "İletişim | Evart - Ankara & Bodrum Ofisleri",
      description: "Evart ile iletişime geçin. Ankara Çankaya ve Bodrum Yalıkavak ofislerimizden bize ulaşın. Evart Oran ve Evart Yalıkavak projeleri hakkında bilgi alın.",
      url: `${baseUrl}/contact`,
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/about-banner.jpg`,
          width: 1200,
          height: 630,
          alt: "İletişim",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "İletişim | Evart - Ankara & Bodrum Ofisleri",
      description: "Evart ile iletişime geçin.",
      images: [`${baseUrl}/images/about-banner.jpg`],
    },
  };
}

export default function Contact() {
  // ContactPage structured data
  const contactPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "İletişim",
    "description": "Evart ile iletişime geçin. Ankara ve Bodrum ofislerimizden bize ulaşın.",
    "url": `${baseUrl}/contact`,
    "inLanguage": "tr-TR",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Evart",
      "url": baseUrl
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Evart",
      "url": baseUrl,
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+90-532-510-12-31",
          "contactType": "customer service",
          "areaServed": ["TR"],
          "availableLanguage": ["Turkish", "English"]
        }
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "İlkbahar Mahallesi, Galip Erdem Caddesi, Güney Park Evleri Karşısı",
          "addressLocality": "Çankaya",
          "addressRegion": "Ankara",
          "postalCode": "06550",
          "addressCountry": "TR"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "Dirmil, İnönü Cd.",
          "addressLocality": "Bodrum",
          "addressRegion": "Muğla",
          "postalCode": "48400",
          "addressCountry": "TR"
        }
      ]
    }
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "İletişim",
        "item": `${baseUrl}/contact`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      <ContactClient />
    </>
  );
}

