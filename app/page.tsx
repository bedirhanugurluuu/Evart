import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import ImageComparisonSliderReverse from "@/components/ImageComparisonSliderReverse";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://evart.com';

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description: "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri. Evart Oran ve Evart Yalıkavak ile yaşam hayaliniz bir mesaj uzağınızda.",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Evart - Premium Gayrimenkul Çözümleri",
    description: "Evart ile hayalinizdeki eve kavuşun. Ankara ve Bodrum'da seçkin konut projeleri.",
    url: baseUrl,
    images: [`${baseUrl}/images/og-image.jpg`],
  },
};

export default function Home() {
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

