import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import ImageComparisonSliderReverse from "@/components/ImageComparisonSliderReverse";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Locale } from "@/i18n";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const isTr = params.locale === 'tr';
  
  return {
    title: isTr ? "Evart - Premium Gayrimenkul Çözümleri | Ankara & Bodrum" : "Evart - Premium Real Estate Solutions | Ankara & Bodrum",
    description: isTr 
      ? "Evart ile hayalinizdeki eve kavuşun. Ankara Çankaya'da Evart Oran, Bodrum Yalıkavak'ta Evart Yalıkavak premium konut projeleri. Akıllı ev sistemleri, modern mimari ve yatırım değeri."
      : "Find your dream home with Evart. Premium residential projects: Evart Oran in Ankara Çankaya, Evart Yalıkavak in Bodrum. Smart home systems, modern architecture and investment value.",
    keywords: isTr
      ? ["evart", "gayrimenkul", "konut", "ankara", "bodrum", "evart oran", "evart yalikavak", "ana sayfa"]
      : ["evart", "real estate", "residential", "ankara", "bodrum", "evart oran", "evart yalikavak", "home"],
    alternates: {
      canonical: params.locale === 'tr' ? baseUrl : `${baseUrl}/${params.locale}`, // TR is at root
      languages: {
        'tr': baseUrl, // TR is at root, no /tr
        'en': `${baseUrl}/en`,
        'x-default': baseUrl, // Default is root (TR)
      },
    },
    openGraph: {
      title: isTr ? "Evart - Premium Gayrimenkul Çözümleri | Ankara & Bodrum" : "Evart - Premium Real Estate Solutions | Ankara & Bodrum",
      description: isTr 
        ? "Evart ile hayalinizdeki eve kavuşun. Ankara Çankaya'da Evart Oran, Bodrum Yalıkavak'ta Evart Yalıkavak premium konut projeleri. Akıllı ev sistemleri ve modern mimari."
        : "Find your dream home with Evart. Premium residential projects: Evart Oran in Ankara Çankaya, Evart Yalıkavak in Bodrum. Smart home systems and modern architecture.",
      url: params.locale === 'tr' ? baseUrl : `${baseUrl}/${params.locale}`,
      locale: params.locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Evart",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isTr ? "Evart - Premium Gayrimenkul Çözümleri" : "Evart - Premium Real Estate Solutions",
      description: isTr 
        ? "Evart ile hayalinizdeki eve kavuşun."
        : "Find your dream home with Evart.",
      images: [`${baseUrl}/images/og-image.jpg`],
    },
  };
}

export default function Home({ params }: { params: { locale: Locale } }) {
  const isTr = params.locale === 'tr';
  const videoLocale = params.locale;
  
  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Evart",
    "alternateName": "Evart Premium Real Estate",
    "url": baseUrl,
    "description": isTr 
      ? "Evart - Premium gayrimenkul çözümleri. Ankara ve Bodrum'da seçkin konut projeleri."
      : "Evart - Premium real estate solutions. Exclusive residential projects in Ankara and Bodrum.",
    "inLanguage": [params.locale === 'tr' ? 'tr-TR' : 'en-US', params.locale === 'tr' ? 'en-US' : 'tr-TR'],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${params.locale}?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Evart",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
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
      }
    ]
  };
  
  // Video structured data for Google
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": isTr ? "Evart - Premium Gayrimenkul Çözümleri" : "Evart - Premium Real Estate Solutions",
    "description": isTr 
      ? "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri."
      : "Find your dream home with Evart. Premium residential projects in Ankara and Bodrum.",
    "thumbnailUrl": [
      `${baseUrl}/images/og-image.jpg`,
      `${baseUrl}/images/hero-slide1-${videoLocale}-desktop.jpg`
    ],
    "uploadDate": new Date().toISOString().split('T')[0],
    "contentUrl": `${baseUrl}/images/hero-video-${videoLocale}-desktop.mp4`,
    "embedUrl": `${baseUrl}/${params.locale}`,
    "duration": "PT30S",
    "inLanguage": videoLocale === 'tr' ? 'tr' : 'en',
    "publisher": {
      "@type": "Organization",
      "name": "Evart",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": `${baseUrl}/${params.locale}`
    }
  };

  return (
    <main className="min-h-screen">
      {/* Website Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData)
        }}
      />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      {/* Video Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData)
        }}
      />
      <Header />
      <HeroSlider />
      <AboutSection />
      <ProjectsSection />
      <ImageComparisonSlider />
      <ImageComparisonSliderReverse />
      <div className="container-custom py-16 lg:py-24">
        <ContactForm projectName="Evart Anasayfa Form" />
      </div>
      <Footer />
    </main>
  );
}

