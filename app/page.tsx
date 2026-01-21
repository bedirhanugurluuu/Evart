import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import ImageComparisonSliderReverse from "@/components/ImageComparisonSliderReverse";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export function generateMetadata(): Metadata {
  // Root URL (/) shows TR content by default - no /tr in URL
  return {
    title: "Evart - Premium Gayrimenkul Çözümleri | Ankara & Bodrum",
    description: "Evart ile hayalinizdeki eve kavuşun. Ankara Çankaya'da Evart Oran, Bodrum Yalıkavak'ta Evart Yalıkavak premium konut projeleri. Akıllı ev sistemleri, modern mimari ve yatırım değeri.",
    keywords: ["evart", "gayrimenkul", "konut", "ankara", "bodrum", "evart oran", "evart yalikavak", "ana sayfa"],
    alternates: {
      canonical: baseUrl, // Root URL is canonical for TR
      languages: {
        'tr': baseUrl, // TR is at root
        'en': `${baseUrl}/en`,
        'x-default': baseUrl, // Default is root (TR)
      },
    },
    openGraph: {
      title: "Evart - Premium Gayrimenkul Çözümleri | Ankara & Bodrum",
      description: "Evart ile hayalinizdeki eve kavuşun. Ankara Çankaya'da Evart Oran, Bodrum Yalıkavak'ta Evart Yalıkavak premium konut projeleri. Akıllı ev sistemleri ve modern mimari.",
      url: baseUrl,
      locale: 'tr_TR',
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
      title: "Evart - Premium Gayrimenkul Çözümleri",
      description: "Evart ile hayalinizdeki eve kavuşun.",
      images: [`${baseUrl}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootPage() {
  // Root page shows TR content directly (no redirect, no /tr in URL)
  const isTr = true;
  const videoLocale = 'tr';
  
  // Website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Evart",
    "alternateName": "Evart Premium Real Estate",
    "url": baseUrl,
    "description": "Evart - Premium gayrimenkul çözümleri. Ankara ve Bodrum'da seçkin konut projeleri.",
    "inLanguage": ['tr-TR', 'en-US'],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}?q={search_term_string}`
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
        "name": "Ana Sayfa",
        "item": baseUrl
      }
    ]
  };
  
  // Video structured data
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Evart - Premium Gayrimenkul Çözümleri",
    "description": "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri.",
    "thumbnailUrl": [
      `${baseUrl}/images/og-image.jpg`,
      `${baseUrl}/images/hero-slide1-${videoLocale}-desktop.jpg`
    ],
    "uploadDate": new Date().toISOString().split('T')[0],
    "contentUrl": `${baseUrl}/images/hero-video-${videoLocale}-desktop.mp4`,
    "embedUrl": baseUrl,
    "duration": "PT30S",
    "inLanguage": "tr",
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
      "target": baseUrl
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

