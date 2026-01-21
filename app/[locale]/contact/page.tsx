import type { Metadata } from "next";
import { Locale } from "@/i18n";
import ContactClient from "./ContactClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isTr = params.locale === 'tr';
  
  return {
    title: isTr ? "İletişim | Evart - Ankara & Bodrum Ofisleri" : "Contact | Evart - Ankara & Bodrum Offices",
    description: isTr 
      ? "Evart ile iletişime geçin. Ankara Çankaya ve Bodrum Yalıkavak ofislerimizden bize ulaşın. Evart Oran ve Evart Yalıkavak projeleri hakkında bilgi alın. 0532 510 12 31"
      : "Contact Evart. Reach us from our Ankara Çankaya and Bodrum Yalıkavak offices. Get information about Evart Oran and Evart Yalıkavak projects. +90 532 510 12 31",
    keywords: isTr
      ? ["iletişim", "evart iletişim", "ankara ofis", "bodrum ofis", "gayrimenkul danışmanlık", "evart"]
      : ["contact", "evart contact", "ankara office", "bodrum office", "real estate consultation", "evart"],
    alternates: {
      canonical: isTr ? `${baseUrl}/contact` : `${baseUrl}/${params.locale}/contact`, // TR is at root
      languages: {
        'tr': `${baseUrl}/contact`, // TR is at root, no /tr
        'en': `${baseUrl}/en/contact`,
        'x-default': `${baseUrl}/contact`, // Default is root (TR)
      },
    },
    openGraph: {
      title: isTr ? "İletişim | Evart - Ankara & Bodrum Ofisleri" : "Contact | Evart - Ankara & Bodrum Offices",
      description: isTr 
        ? "Evart ile iletişime geçin. Ankara Çankaya ve Bodrum Yalıkavak ofislerimizden bize ulaşın. Evart Oran ve Evart Yalıkavak projeleri hakkında bilgi alın."
        : "Contact Evart. Reach us from our Ankara Çankaya and Bodrum Yalıkavak offices. Get information about Evart Oran and Evart Yalıkavak projects.",
      url: isTr ? `${baseUrl}/contact` : `${baseUrl}/${params.locale}/contact`,
      locale: params.locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/about-banner.jpg`,
          width: 1200,
          height: 630,
          alt: isTr ? "İletişim" : "Contact",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isTr ? "İletişim | Evart" : "Contact | Evart",
      description: isTr 
        ? "Evart ile iletişime geçin."
        : "Contact Evart.",
      images: [`${baseUrl}/images/about-banner.jpg`],
    },
  };
}

export default function Contact({ params }: { params: { locale: Locale } }) {
  const isTr = params.locale === 'tr';
  
  // ContactPage structured data
  const contactPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": isTr ? "İletişim" : "Contact",
    "description": isTr 
      ? "Evart ile iletişime geçin. Ankara ve Bodrum ofislerimizden bize ulaşın."
      : "Contact Evart. Reach us from our Ankara and Bodrum offices.",
    "url": `${baseUrl}/${params.locale}/contact`,
    "inLanguage": params.locale === 'tr' ? 'tr-TR' : 'en-US',
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
        "name": isTr ? "Ana Sayfa" : "Home",
        "item": `${baseUrl}/${params.locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isTr ? "İletişim" : "Contact",
        "item": `${baseUrl}/${params.locale}/contact`
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
