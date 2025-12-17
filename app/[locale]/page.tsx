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
    title: "Evart",
    description: isTr 
      ? "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri. Evart Oran ve Evart Yalıkavak ile yaşam hayaliniz bir mesaj uzağınızda."
      : "Find your dream home with Evart. Premium residential projects in Ankara and Bodrum. Your dream life is just a message away with Evart Oran and Evart Yalıkavak.",
    keywords: isTr
      ? ["evart", "gayrimenkul", "konut", "ankara", "bodrum", "evart oran", "evart yalikavak", "ana sayfa"]
      : ["evart", "real estate", "residential", "ankara", "bodrum", "evart oran", "evart yalikavak", "home"],
    alternates: {
      canonical: `${baseUrl}/${params.locale}`,
      languages: {
        'tr': `${baseUrl}/tr`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/tr`, // Varsayılan dil TR
      },
    },
    openGraph: {
      title: isTr ? "Evart - Premium Gayrimenkul Çözümleri" : "Evart - Premium Real Estate Solutions",
      description: isTr 
        ? "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri."
        : "Find your dream home with Evart. Premium residential projects in Ankara and Bodrum.",
      url: `${baseUrl}/${params.locale}`,
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

