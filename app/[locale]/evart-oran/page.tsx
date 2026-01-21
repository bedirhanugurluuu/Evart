import type { Metadata } from "next";
import { Locale } from "@/i18n";
import EvartOranClient from "./EvartOranClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isTr = params.locale === 'tr';
  
  return {
    title: isTr ? "Evart Oran - Ankara Çankaya Premium Konut Projesi | Akıllı Ev Sistemleri" : "Evart Oran - Premium Residential Project in Ankara Çankaya | Smart Home Systems",
    description: isTr 
      ? "Evart Oran - Ankara Çankaya Oran'da premium konut projesi. Akıllı ev sistemleri, modern mimari, yüksek kira getirisi potansiyeli. 1+1 ve 2+1 esnek daire seçenekleri. Büyükelçilik bölgesi, prestijli lokasyon."
      : "Evart Oran - Premium residential project in Ankara Çankaya Oran. Smart home systems, modern architecture, high rental income potential. Flexible 1+1 and 2+1 apartment options. Embassy district, prestigious location.",
    keywords: isTr
      ? ["evart oran", "ankara konut", "premium daire", "akıllı ev", "rezidans ankara", "evart"]
      : ["evart oran", "ankara residential", "premium apartment", "smart home", "residence ankara", "evart"],
    alternates: {
      canonical: isTr ? `${baseUrl}/evart-oran` : `${baseUrl}/${params.locale}/evart-oran`, // TR is at root
      languages: {
        'tr': `${baseUrl}/evart-oran`, // TR is at root, no /tr
        'en': `${baseUrl}/en/evart-oran`,
        'x-default': `${baseUrl}/evart-oran`, // Default is root (TR)
      },
    },
    openGraph: {
      title: isTr ? "Evart Oran - Ankara Çankaya Premium Konut Projesi" : "Evart Oran - Premium Residential Project in Ankara Çankaya",
      description: isTr 
        ? "Evart Oran - Ankara Çankaya Oran'da premium konut projesi. Akıllı ev sistemleri, modern mimari, yüksek kira getirisi potansiyeli. Büyükelçilik bölgesi, prestijli lokasyon."
        : "Evart Oran - Premium residential project in Ankara Çankaya Oran. Smart home systems, modern architecture, high rental income potential. Embassy district, prestigious location.",
      url: isTr ? `${baseUrl}/evart-oran` : `${baseUrl}/${params.locale}/evart-oran`,
      locale: params.locale === 'tr' ? 'tr_TR' : 'en_US',
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
      title: isTr ? "Evart Oran | Evart" : "Evart Oran | Evart",
      description: isTr 
        ? "Evart Oran - Ankara'nın kalbinde modern yaşam."
        : "Evart Oran - Modern living in the heart of Ankara.",
      images: [`${baseUrl}/images/oran-1.jpg`],
    },
  };
}

export default function EvartOran({ params }: { params: { locale: Locale } }) {
  const isTr = params.locale === 'tr';
  
  // RealEstateListing structured data
  const realEstateStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Evart Oran",
    "description": isTr 
      ? "Ankara Çankaya Oran'da premium konut projesi. Akıllı ev sistemleri, modern mimari ve yatırım değeri."
      : "Premium residential project in Ankara Çankaya Oran. Smart home systems, modern architecture and investment value.",
    "url": `${baseUrl}/${params.locale}/evart-oran`,
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
    "description": isTr 
      ? "Evart Oran - Ankara Çankaya Oran'da premium konut projesi."
      : "Evart Oran - Premium residential project in Ankara Çankaya Oran.",
    "url": `${baseUrl}/${params.locale}/evart-oran`,
    "inLanguage": params.locale === 'tr' ? 'tr-TR' : 'en-US',
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
        "name": isTr ? "Ana Sayfa" : "Home",
        "item": `${baseUrl}/${params.locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Evart Oran",
        "item": `${baseUrl}/${params.locale}/evart-oran`
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

