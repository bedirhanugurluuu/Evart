"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";
import { useTranslations } from "@/hooks/useTranslations";

export default function About() {
  const { t } = useTranslations();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <main className="min-h-screen">
      <Header />

      {/* Ana Banner */}
      <section className="relative w-full h-[350px] md:h-[450px] lg:h-[700px] overflow-hidden about-banner">
        {/* Banner Görseli */}
        <Image
          src="/images/about-banner.jpg"
          alt="About Banner"
          fill
          className="object-cover"
          priority
          quality={100}
          unoptimized
          sizes="100vw"
        />

        {/* Absolute Yazılar */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container-custom text-center relative z-10">
            <h1
              className={`font-gotham-bold uppercase text-xl md:text-3xl lg:text-4xl text-white mb-2 md:mb-4 transition-all duration-1000 ${
                isMounted
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('about.banner.title')}
            </h1>
            <p 
              className={`font-questa-regular text-3xl md:text-5xl lg:text-6xl text-white transition-all duration-1000 ${
                isMounted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {t('about.banner.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* İlk Paragraf - Banner Altı */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <p className="font-gotham-book text-center text-base lg:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {t('about.paragraph1')}
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* İki Paragraf */}
      <section className="py-12 md:py-16">
        <div className="container-custom space-y-6 text-center">
          <p className="font-gotham-book text-base lg:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {t('about.paragraph2')}
          </p>
          <p className="font-gotham-book text-base lg:text-lg text-gray-700 leading-relaxed pt-8 max-w-4xl mx-auto">
            <b>{t('about.paragraph3')}</b><br />
            {t('about.paragraph4')}
          </p>
        </div>
      </section>

      {/* İki Görsel - Container Dışında, %60 ve %40 */}
      <section className="w-full max-h-[400px] flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-[60%] h-[400px]">
          <Image
            src="/images/about-image-1.jpg"
            alt="About Image 1"
            fill
            className="relative object-cover"
            unoptimized
            quality={85}
            sizes="60vw"
          />
        </div>
        <div className="relative w-full lg:w-[40%] h-[400px]">
          <Image
            src="/images/about-image-2.jpg"
            alt="About Image 2"
            fill
            className="object-cover"
            unoptimized
            quality={85}
            sizes="40vw"
          />
        </div>
      </section>

      {/* Üç Paragraf */}
      <section className="py-12 md:py-16">
        <div className="container-custom space-y-6 text-center">
          <p className="font-gotham-book text-base lg:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            <b>{t('about.paragraph5')}</b> {t('about.paragraph6')}
          </p>
          <p className="font-gotham-book text-base lg:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            <b>{t('about.paragraph7')}</b> {t('about.paragraph8')}
          </p>
          <p className="font-gotham-book text-base lg:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {t('about.paragraph9')}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

