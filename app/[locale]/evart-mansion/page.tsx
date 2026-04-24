import type { Metadata } from "next";
import { Locale } from "@/i18n";
import EvartMansionClient from "./EvartMansionClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://evartlife.com").replace(/\/$/, "");

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isTr = params.locale === "tr";

  return {
    title: isTr
      ? "Evart Mansion Yalıkavak | Ayrıcalıklı Malikane Yaşamı"
      : "Evart Mansion Yalikavak | Exclusive Mansion Living",
    description: isTr
      ? "Evart Mansion Yalıkavak, Bodrum'da yalnızca 28 malikaneden oluşan düşük yoğunluklu ve yüksek standartlı bir yaşam projesidir."
      : "Evart Mansion Yalikavak is a low-density premium living project in Bodrum with only 28 exclusive mansions.",
    alternates: {
      canonical: isTr ? `${baseUrl}/evart-mansion` : `${baseUrl}/${params.locale}/evart-mansion`,
      languages: {
        tr: `${baseUrl}/evart-mansion`,
        en: `${baseUrl}/en/evart-mansion`,
        "x-default": `${baseUrl}/evart-mansion`,
      },
    },
    openGraph: {
      title: "Evart Mansion Yalıkavak | Evart",
      description: isTr
        ? "Bodrum'da sınırlı sayıda malikane yaşamı."
        : "Limited-edition mansion living in Bodrum.",
      url: isTr ? `${baseUrl}/evart-mansion` : `${baseUrl}/${params.locale}/evart-mansion`,
      locale: isTr ? "tr_TR" : "en_US",
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
  };
}

export default function EvartMansion() {
  return <EvartMansionClient />;
}
