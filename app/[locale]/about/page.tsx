import type { Metadata } from "next";
import { Locale } from "@/i18n";
import AboutClient from "./AboutClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isTr = params.locale === 'tr';
  
  return {
    title: isTr ? "Hakkımızda | Evart - Yapıtek ANKA İnşaat" : "About Us | Evart - Yapıtek ANKA Construction",
    description: isTr 
      ? "Yapıtek ANKA İnşaat hakkında bilgi edinin. 2014'ten beri güven, kalite ve sürdürülebilirlik odaklı gayrimenkul projeleri geliştiriyoruz. Evart markası ile Ankara ve Bodrum'da premium yaşam alanları."
      : "Learn about Yapıtek ANKA Construction. We have been developing real estate projects focused on trust, quality and sustainability since 2014. Premium living spaces in Ankara and Bodrum with the Evart brand.",
    keywords: isTr
      ? ["hakkımızda", "yapıtek anka", "gayrimenkul", "inşaat", "evart", "ankara", "bodrum"]
      : ["about us", "yapıtek anka", "real estate", "construction", "evart", "ankara", "bodrum"],
    alternates: {
      canonical: `${baseUrl}/${params.locale}/about`,
      languages: {
        'tr': `${baseUrl}/tr/about`,
        'en': `${baseUrl}/en/about`,
        'x-default': `${baseUrl}/tr/about`, // Varsayılan dil TR
      },
    },
    openGraph: {
      title: isTr ? "Hakkımızda | Evart - Yapıtek ANKA İnşaat" : "About Us | Evart - Yapıtek ANKA Construction",
      description: isTr 
        ? "Yapıtek ANKA İnşaat hakkında bilgi edinin. 2014'ten beri güven, kalite ve sürdürülebilirlik odaklı gayrimenkul projeleri geliştiriyoruz. Evart markası ile premium yaşam alanları."
        : "Learn about Yapıtek ANKA Construction. We have been developing real estate projects focused on trust, quality and sustainability since 2014. Premium living spaces with the Evart brand.",
      url: `${baseUrl}/${params.locale}/about`,
      locale: params.locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/about-banner.jpg`,
          width: 1200,
          height: 630,
          alt: isTr ? "Hakkımızda" : "About Us",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isTr ? "Hakkımızda | Evart" : "About Us | Evart",
      description: isTr 
        ? "Yapıtek ANKA İnşaat hakkında bilgi edinin."
        : "Learn about Yapıtek ANKA İnşaat.",
      images: [`${baseUrl}/images/about-banner.jpg`],
    },
  };
}

export default function About({ params }: { params: { locale: Locale } }) {
  const isTr = params.locale === 'tr';
  
  // WebPage structured data
  const webpageStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": isTr ? "Hakkımızda" : "About Us",
    "description": isTr 
      ? "Yapıtek ANKA İnşaat hakkında bilgi. 2014'ten beri güven, kalite ve sürdürülebilirlik odaklı gayrimenkul projeleri."
      : "Information about Yapıtek ANKA Construction. Real estate projects focused on trust, quality and sustainability since 2014.",
    "url": `${baseUrl}/${params.locale}/about`,
    "inLanguage": params.locale === 'tr' ? 'tr-TR' : 'en-US',
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
      "description": isTr 
        ? "İnşaat, gayrimenkul, enerji ve dış ticaret alanlarında faaliyet gösteren güvenilir inşaat firması."
        : "Reliable construction company operating in construction, real estate, energy and foreign trade."
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
        "name": isTr ? "Ana Sayfa" : "Home",
        "item": `${baseUrl}/${params.locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isTr ? "Hakkımızda" : "About Us",
        "item": `${baseUrl}/${params.locale}/about`
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

