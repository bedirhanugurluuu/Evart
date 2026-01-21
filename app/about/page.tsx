import type { Metadata } from "next";
import AboutClient from "../[locale]/about/AboutClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata(): Metadata {
  return {
    title: "Hakkımızda | Evart - Yapıtek ANKA İnşaat",
    description: "Yapıtek ANKA İnşaat hakkında bilgi edinin. 2014'ten beri güven, kalite ve sürdürülebilirlik odaklı gayrimenkul projeleri geliştiriyoruz. Evart markası ile Ankara ve Bodrum'da premium yaşam alanları.",
    keywords: ["hakkımızda", "yapıtek anka", "gayrimenkul", "inşaat", "evart", "ankara", "bodrum"],
    alternates: {
      canonical: `${baseUrl}/about`,
      languages: {
        'tr': `${baseUrl}/about`,
        'en': `${baseUrl}/en/about`,
        'x-default': `${baseUrl}/about`,
      },
    },
    openGraph: {
      title: "Hakkımızda | Evart - Yapıtek ANKA İnşaat",
      description: "Yapıtek ANKA İnşaat hakkında bilgi edinin. 2014'ten beri güven, kalite ve sürdürülebilirlik odaklı gayrimenkul projeleri geliştiriyoruz. Evart markası ile premium yaşam alanları.",
      url: `${baseUrl}/about`,
      locale: 'tr_TR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/about-banner.jpg`,
          width: 1200,
          height: 630,
          alt: "Hakkımızda",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Hakkımızda | Evart - Yapıtek ANKA İnşaat",
      description: "Yapıtek ANKA İnşaat hakkında bilgi edinin.",
      images: [`${baseUrl}/images/about-banner.jpg`],
    },
  };
}

export default function About() {
  // WebPage structured data
  const webpageStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Hakkımızda",
    "description": "Yapıtek ANKA İnşaat hakkında bilgi. 2014'ten beri güven, kalite ve sürdürülebilirlik odaklı gayrimenkul projeleri.",
    "url": `${baseUrl}/about`,
    "inLanguage": "tr-TR",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Evart",
      "url": baseUrl
    },
    "about": {
      "@type": "Organization",
      "name": "Yapıtek ANKA İnşaat",
      "alternateName": "Yapıtek ANKA Construction",
      "foundingDate": "2014",
      "description": "İnşaat, gayrimenkul, enerji ve dış ticaret alanlarında faaliyet gösteren güvenilir inşaat firması."
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
        "name": "Hakkımızda",
        "item": `${baseUrl}/about`
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
      <AboutClient />
    </>
  );
}

