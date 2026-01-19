import type { Metadata } from "next";
import { defaultLocale } from "@/i18n";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata(): Metadata {
  return {
    title: "Evart - Premium Gayrimenkul Çözümleri | Ankara & Bodrum",
    description: "Evart ile hayalinizdeki eve kavuşun. Ankara Çankaya'da Evart Oran, Bodrum Yalıkavak'ta Evart Yalıkavak premium konut projeleri. Akıllı ev sistemleri, modern mimari ve yatırım değeri.",
    alternates: {
      canonical: `${baseUrl}/tr`, // Canonical TR'ye yönlendir
      languages: {
        'tr': `${baseUrl}/tr`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/tr`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootPage() {
  // Client-side redirect with canonical and hreflang for SEO
  // Metadata already includes canonical and hreflang
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace('${baseUrl}/${defaultLocale}');`,
        }}
      />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${baseUrl}/${defaultLocale}`} />
      </noscript>
    </>
  );
}

