import type { Metadata } from "next";
import { Locale } from "@/i18n";
import ContactClient from "./ContactClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isTr = params.locale === 'tr';
  
  return {
    title: isTr ? "İletişim" : "Contact",
    description: isTr 
      ? "Evart ile iletişime geçin. Ankara ve Bodrum ofislerimizden bize ulaşın. Projelerimiz hakkında bilgi alın."
      : "Contact Evart. Reach us from our Ankara and Bodrum offices. Get information about our projects.",
    keywords: isTr
      ? ["iletişim", "evart iletişim", "ankara ofis", "bodrum ofis", "gayrimenkul danışmanlık", "evart"]
      : ["contact", "evart contact", "ankara office", "bodrum office", "real estate consultation", "evart"],
    alternates: {
      canonical: `${baseUrl}/${params.locale}/contact`,
      languages: {
        'tr': `${baseUrl}/tr/contact`,
        'en': `${baseUrl}/en/contact`,
        'x-default': `${baseUrl}/tr/contact`, // Varsayılan dil TR
      },
    },
    openGraph: {
      title: isTr ? "İletişim | Evart" : "Contact | Evart",
      description: isTr 
        ? "Evart ile iletişime geçin. Ankara ve Bodrum ofislerimizden bize ulaşın."
        : "Contact Evart. Reach us from our Ankara and Bodrum offices.",
      url: `${baseUrl}/${params.locale}/contact`,
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
  return <ContactClient />;
}
