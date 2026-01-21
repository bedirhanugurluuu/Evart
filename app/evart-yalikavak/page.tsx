import type { Metadata } from "next";
import EvartYalikavakClient from "../[locale]/evart-yalikavak/EvartYalikavakClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata(): Metadata {
  return {
    title: "Evart Yalıkavak",
    description: "Evart Yalıkavak - Bodrum'un ilk rezidans projesi. Şehrin enerjisiyle Bodrum'un ruhu buluşuyor. Yatırım ve yaşam fırsatı.",
    keywords: ["evart yalıkavak", "bodrum rezidans", "bodrum konut", "yalıkavak daire", "bodrum yatırım", "evart"],
    alternates: {
      canonical: `${baseUrl}/evart-yalikavak`,
      languages: {
        'tr': `${baseUrl}/evart-yalikavak`,
        'en': `${baseUrl}/en/evart-yalikavak`,
        'x-default': `${baseUrl}/evart-yalikavak`,
      },
    },
    openGraph: {
      title: "Evart Yalıkavak | Evart",
      description: "Evart Yalıkavak - Bodrum'un ilk rezidans projesi. Şehrin enerjisiyle Bodrum'un ruhu buluşuyor.",
      url: `${baseUrl}/evart-yalikavak`,
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/yalikavak-1.jpg`,
          width: 1200,
          height: 630,
          alt: "Evart Yalıkavak",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Evart Yalıkavak | Evart",
      description: "Evart Yalıkavak - Bodrum'un ilk rezidans projesi.",
      images: [`${baseUrl}/images/yalikavak-1.jpg`],
    },
  };
}

export default function EvartYalikavak() {
  // RealEstateListing structured data
  const realEstateStructuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Evart Yalıkavak",
    "description": "Bodrum'un ilk rezidans projesi. Denize sıfır konum, premium yaşam alanları ve yatırım değeri.",
    "url": `${baseUrl}/evart-yalikavak`,
    "image": `${baseUrl}/images/yalikavak-1.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Yalıkavak",
      "addressLocality": "Bodrum",
      "addressRegion": "Muğla",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.1074",
      "longitude": "27.2574"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "category": "Residential"
    },
    "numberOfRooms": {
      "@type": "QuantitativeValue",
      "value": "1"
    }
  };

  // WebPage structured data
  const webpageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Evart Yalıkavak",
    "description": "Evart Yalıkavak - Bodrum'un ilk rezidans projesi.",
    "url": `${baseUrl}/evart-yalikavak`,
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
        "name": "Evart Yalıkavak",
        "item": `${baseUrl}/evart-yalikavak`
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
      <EvartYalikavakClient />
    </>
  );
}

