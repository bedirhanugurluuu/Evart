import type { Metadata } from "next";
import { Locale } from "@/i18n";
import AboutClient from "./AboutClient";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evart.com').replace(/\/$/, '');

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isTr = params.locale === 'tr';
  
  return {
    title: isTr ? "Hakkımızda" : "About Us",
    description: isTr 
      ? "Yapıtek ANKA İnşaat hakkında bilgi edinin. 2014'ten beri güven, kalite ve sürdürülebilirlik odaklı gayrimenkul projeleri geliştiriyoruz."
      : "Learn about Yapıtek ANKA İnşaat. We have been developing real estate projects focused on trust, quality and sustainability since 2014.",
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
      title: isTr ? "Hakkımızda | Evart" : "About Us | Evart",
      description: isTr 
        ? "Yapıtek ANKA İnşaat hakkında bilgi edinin. Güven, kalite ve sürdürülebilirlik odaklı gayrimenkul projeleri."
        : "Learn about Yapıtek ANKA İnşaat. Real estate projects focused on trust, quality and sustainability.",
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
  return <AboutClient />;
}

