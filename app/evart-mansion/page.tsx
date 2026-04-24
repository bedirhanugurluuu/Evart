import type { Metadata } from "next";
import EvartMansionClient from "../[locale]/evart-mansion/EvartMansionClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://evartlife.com").replace(/\/$/, "");

export function generateMetadata(): Metadata {
  return {
    title: "Evart Mansion Yalıkavak | Ayrıcalıklı Malikane Yaşamı",
    description:
      "Evart Mansion Yalıkavak, Bodrum'da yalnızca 28 malikaneden oluşan düşük yoğunluklu ve yüksek standartlı bir yaşam projesidir.",
    alternates: {
      canonical: `${baseUrl}/evart-mansion`,
      languages: {
        tr: `${baseUrl}/evart-mansion`,
        en: `${baseUrl}/en/evart-mansion`,
        "x-default": `${baseUrl}/evart-mansion`,
      },
    },
    openGraph: {
      title: "Evart Mansion Yalıkavak | Evart",
      description: "Bodrum'da sınırlı sayıda malikane yaşamı.",
      url: `${baseUrl}/evart-mansion`,
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/evart-estates.jpeg`,
          width: 1200,
          height: 630,
          alt: "Evart Mansion Yalikavak",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Evart Mansion Yalıkavak | Evart",
      description: "Bodrum'da sınırlı sayıda malikane yaşamı.",
      images: [`${baseUrl}/images/evart-estates.jpeg`],
    },
  };
}

export default function EvartMansion() {
  return <EvartMansionClient />;
}
