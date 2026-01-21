import type { Metadata } from "next";
import EvartOranClient from "../[locale]/evart-oran/EvartOranClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata(): Metadata {
  return {
    title: "Evart Oran - Ankara Çankaya Premium Konut Projesi | Akıllı Ev Sistemleri",
    description: "Evart Oran - Ankara Çankaya Oran'da premium konut projesi. Akıllı ev sistemleri, modern mimari, yüksek kira getirisi potansiyeli. 1+1 ve 2+1 esnek daire seçenekleri. Büyükelçilik bölgesi, prestijli lokasyon.",
    keywords: ["evart oran", "ankara konut", "premium daire", "akıllı ev", "rezidans ankara", "evart"],
    alternates: {
      canonical: `${baseUrl}/evart-oran`,
      languages: {
        'tr': `${baseUrl}/evart-oran`,
        'en': `${baseUrl}/en/evart-oran`,
        'x-default': `${baseUrl}/evart-oran`,
      },
    },
    openGraph: {
      title: "Evart Oran - Ankara Çankaya Premium Konut Projesi",
      description: "Evart Oran - Ankara Çankaya Oran'da premium konut projesi. Akıllı ev sistemleri, modern mimari, yüksek kira getirisi potansiyeli. Büyükelçilik bölgesi, prestijli lokasyon.",
      url: `${baseUrl}/evart-oran`,
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/oran-1.jpg`,
          width: 1200,
          height: 630,
          alt: "Evart Oran",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Evart Oran - Ankara Çankaya Premium Konut Projesi",
      description: "Evart Oran - Ankara Çankaya Oran'da premium konut projesi.",
      images: [`${baseUrl}/images/oran-1.jpg`],
    },
  };
}

export default function EvartOran() {
  // RealEstateListing structured data
  const realEstateStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Evart Oran",
    "description": "Ankara Çankaya Oran'da premium konut projesi. Akıllı ev sistemleri, modern mimari ve yatırım değeri.",
    "url": `${baseUrl}/evart-oran`,
    "image": `${baseUrl}/images/oran-1.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Çankaya Oran",
      "addressLocality": "Ankara",
      "addressRegion": "Çankaya",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.9042",
      "longitude": "32.8543"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "category": "Residential"
    },
    "numberOfRooms": {
      "@type": "QuantitativeValue",
      "value": "1-2"
    }
  };

  // WebPage structured data
  const webpageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Evart Oran",
    "description": "Evart Oran - Ankara Çankaya Oran'da premium konut projesi.",
    "url": `${baseUrl}/evart-oran`,
    "inLanguage": "tr-TR",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Evart",
      "url": baseUrl
    },
    "mainEntity": realEstateStructuredData
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
        "name": "Evart Oran",
        "item": `${baseUrl}/evart-oran`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      <EvartOranClient />
    </>
  );
}

