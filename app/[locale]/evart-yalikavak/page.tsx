import type { Metadata } from "next";
import { Locale } from "@/i18n";
import EvartYalikavakClient from "./EvartYalikavakClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evart.com').replace(/\/$/, '');

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isTr = params.locale === 'tr';
  
  return {
    title: isTr ? "Evart Yalıkavak" : "Evart Yalıkavak",
    description: isTr 
      ? "Evart Yalıkavak - Bodrum'un ilk rezidans projesi. Şehrin enerjisiyle Bodrum'un ruhu buluşuyor. Yatırım ve yaşam fırsatı."
      : "Evart Yalıkavak - Bodrum's first residence project. The energy of the city meets the soul of Bodrum. Investment and living opportunity.",
    keywords: isTr
      ? ["evart yalıkavak", "bodrum rezidans", "bodrum konut", "yalıkavak daire", "bodrum yatırım", "evart"]
      : ["evart yalikavak", "bodrum residence", "bodrum residential", "yalikavak apartment", "bodrum investment", "evart"],
    alternates: {
      canonical: `${baseUrl}/${params.locale}/evart-yalikavak`,
      languages: {
        'tr': `${baseUrl}/tr/evart-yalikavak`,
        'en': `${baseUrl}/en/evart-yalikavak`,
        'x-default': `${baseUrl}/tr/evart-yalikavak`, // Varsayılan dil TR
      },
    },
    openGraph: {
      title: isTr ? "Evart Yalıkavak | Evart" : "Evart Yalıkavak | Evart",
      description: isTr 
        ? "Evart Yalıkavak - Bodrum'un ilk rezidans projesi. Şehrin enerjisiyle Bodrum'un ruhu buluşuyor."
        : "Evart Yalıkavak - Bodrum's first residence project. The energy of the city meets the soul of Bodrum.",
      url: `${baseUrl}/${params.locale}/evart-yalikavak`,
      locale: params.locale === 'tr' ? 'tr_TR' : 'en_US',
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
      title: isTr ? "Evart Yalıkavak | Evart" : "Evart Yalıkavak | Evart",
      description: isTr 
        ? "Evart Yalıkavak - Bodrum'un ilk rezidans projesi."
        : "Evart Yalıkavak - Bodrum's first residence project.",
      images: [`${baseUrl}/images/yalikavak-1.jpg`],
    },
  };
}

export default function EvartYalikavak({ params }: { params: { locale: Locale } }) {
  return <EvartYalikavakClient />;
}

