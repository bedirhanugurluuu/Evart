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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://evart.com';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return {
    title: params.locale === 'tr' ? "Ana Sayfa" : "Home",
    description: "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri. Evart Oran ve Evart Yalıkavak ile yaşam hayaliniz bir mesaj uzağınızda.",
    alternates: {
      canonical: `${baseUrl}/${params.locale}`,
    },
    openGraph: {
      title: "Evart - Premium Gayrimenkul Çözümleri",
      description: "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri.",
      url: `${baseUrl}/${params.locale}`,
      images: [`${baseUrl}/images/og-image.jpg`],
    },
  };
}

export default function Home({ params }: { params: { locale: Locale } }) {
  return (
    <main className="min-h-screen">
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

