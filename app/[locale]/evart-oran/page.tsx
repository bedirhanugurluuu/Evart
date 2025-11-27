import type { Metadata } from "next";
import { Locale } from "@/i18n";
import EvartOranClient from "./EvartOranClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isTr = params.locale === 'tr';
  
  return {
    title: isTr ? "Evart Oran" : "Evart Oran",
    description: isTr 
      ? "Evart Oran - Ankara'nın kalbinde modern ve akıllı yaşam. Premium konut projesi ile hayalinizdeki yaşamı keşfedin."
      : "Evart Oran - Modern and smart living in the heart of Ankara. Discover your dream life with our premium residential project.",
    keywords: isTr
      ? ["evart oran", "ankara konut", "premium daire", "akıllı ev", "rezidans ankara", "evart"]
      : ["evart oran", "ankara residential", "premium apartment", "smart home", "residence ankara", "evart"],
    alternates: {
      canonical: `${baseUrl}/${params.locale}/evart-oran`,
      languages: {
        'tr': `${baseUrl}/tr/evart-oran`,
        'en': `${baseUrl}/en/evart-oran`,
        'x-default': `${baseUrl}/tr/evart-oran`, // Varsayılan dil TR
      },
    },
    openGraph: {
      title: isTr ? "Evart Oran | Evart" : "Evart Oran | Evart",
      description: isTr 
        ? "Evart Oran - Ankara'nın kalbinde modern ve akıllı yaşam."
        : "Evart Oran - Modern and smart living in the heart of Ankara.",
      url: `${baseUrl}/${params.locale}/evart-oran`,
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
  return <EvartOranClient />;
}

