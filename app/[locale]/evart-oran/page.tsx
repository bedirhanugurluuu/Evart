"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SimpleImageSlider from "@/components/SimpleImageSlider";
import { useTranslations } from "@/hooks/useTranslations";

export default function EvartOran() {
  const { t } = useTranslations();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Ana Banner - About sayfasındaki gibi ama absolute yazı yok */}
      <section className="relative w-full h-[350px] md:h-[450px] lg:h-[700px] overflow-hidden">
        {/* Banner Görseli */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/oran-about.png"
            alt="Evart Oran Banner"
            fill
            className="object-cover"
            priority
            quality={100}
            unoptimized
            sizes="100vw"
          />
        </div>
      </section>

      {/* Başlık Bölümü - Container içinde */}
      <section ref={sectionRef} className="py-20 overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Sol Taraf - Başlık ve Noktalar */}
            <div 
              className={`text-center md:text-left transition-all duration-1000 ease-out ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            >
              <h2 className="font-gotham-bold uppercase text-xl md:text-2xl mb-2" style={{ color: "#414042" }}>
                {t('evartOran.banner.title')}
              </h2>
              <p className="font-questa-regular text-2xl md:text-3xl mb-4" style={{ color: "#414042" }}>
                {t('evartOran.banner.subtitle')}
              </p>
              {/* 3 Yuvarlak */}
              <div className="flex justify-center md:justify-start items-center gap-2">
                <div 
                  className="md:w-3 md:h-3 rounded-full dot-bounce"
                  style={{ 
                    backgroundColor: "#869e9e",
                    animationDelay: '0s'
                  }}
                ></div>
                <div 
                  className="md:w-3 md:h-3 rounded-full dot-bounce"
                  style={{ 
                    backgroundColor: "#869e9e",
                    animationDelay: '0.15s'
                  }}
                ></div>
                <div 
                  className="md:w-3 md:h-3 rounded-full dot-bounce"
                  style={{ 
                    backgroundColor: "#869e9e",
                    animationDelay: '0.3s'
                  }}
                ></div>
              </div>
              <p className="font-gotham-book text-base mt-4" style={{ color: "#414042", lineHeight: "1.2" }}>
                {t('evartOran.description')}
              </p>
            </div>
            {/* Sağ Taraf - Görsel */}
            <div 
              className={`relative w-full h-[400px] lg:h-[600px] transition-all duration-1000 ease-out delay-200 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            >
              <Image
                src="/images/oran-1.jpg"
                alt="Ankara"
                fill
                className="object-cover"
                quality={95}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - 30% Sol (Yazı) / 70% Sağ (Slider) */}
      <section className="py-8">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Sol 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1" style={{ backgroundColor: "#9dc4c2" }}>
              <div>
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartOran.section1.title')}
                </p>
                <p className="font-gotham-book uppercase text-xl md:text-2xl text-white">
                  {t('evartOran.section1.subtitle')}
                </p>
              </div>
            </div>
            {/* Sağ 70% - Slider */}
            <div className="lg:col-span-7">
              <SimpleImageSlider 
                image1="/images/oran-2.jpg"
                image2="/images/oran-3.jpg"
                alt1="Yaşam 1"
                alt2="Yaşam 2"
              />
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base text-left max-w-2xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartOran.section1.description').replace(/<br>/g, '<br />') }} />
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - 70% Sol (Slider) / 30% Sağ (Yazı) */}
      <section className="py-8">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Sol 70% - Slider */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <SimpleImageSlider 
                image1="/images/oran-4.jpg"
                image2="/images/oran-5.jpg"
                alt1="Yaşam 3"
                alt2="Yaşam 4"
              />
            </div>
            {/* Sağ 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1 order-1 lg:order-2" style={{ backgroundColor: "#9dc4c2" }}>
              <div className="text-center">
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartOran.section2.title')}
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  {t('evartOran.section2.subtitle')}
                </p>
              </div>
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartOran.section2.description').replace(/<br>/g, '<br />').replace(/<b>/g, '<b style="font-weight: 500">') }} />
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 - 30% Sol (Yazı) / 70% Sağ (Slider) */}
      <section className="py-8">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Sol 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1" style={{ backgroundColor: "#9dc4c2" }}>
              <div>
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartOran.section3.title')}
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-xl text-white">
                  {t('evartOran.section3.subtitle')}
                </p>
              </div>
            </div>
            {/* Sağ 70% - Slider */}
            <div className="lg:col-span-7">
              <SimpleImageSlider
                image1="/images/oran-6.jpg"
                image2="/images/oran-7.jpg"
                alt1="Yaşam 5"
                alt2="Yaşam 6"
              />
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base text-left max-w-2xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartOran.section3.description').replace(/<br>/g, '<br />') }} />
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 - 70% Sol (Slider) / 30% Sağ (Yazı) */}
      <section className="py-8">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Sol 70% - Slider */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <SimpleImageSlider
                image1="/images/oran-8.jpg"
                image2="/images/oran-9.jpg"
                alt1="Yaşam 7"
                alt2="Yaşam 8"
              />
            </div>
            {/* Sağ 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1 order-1 lg:order-2" style={{ backgroundColor: "#9dc4c2" }}>
              <div className="text-center">
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartOran.section4.title')}
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-xl text-white">
                  {t('evartOran.section4.subtitle')}
                </p>
              </div>
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base text-left max-w-2xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartOran.section4.description').replace(/<br>/g, '<br />') }} />
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 - 30% Sol (Yazı) / 70% Sağ (Slider) */}
      <section className="py-8">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Sol 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1" style={{ backgroundColor: "#9dc4c2" }}>
              <div>
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartOran.section5.title')}
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-xl text-white">
                  {t('evartOran.section5.subtitle')}
                </p>
              </div>
            </div>
            {/* Sağ 70% - Slider */}
            <div className="lg:col-span-7">
              <SimpleImageSlider
                image1="/images/oran-10.jpg"
                image2="/images/oran-11.jpg"
                alt1="Yaşam 9"
                alt2="Yaşam 10"
              />
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base text-left max-w-2xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartOran.section5.description').replace(/<br>/g, '<br />') }} />
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 - 30% Sağ (Yazı) / 70% sol (Resim) */}
      <section className="py-8 pb-16">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Sağ 70% - Resim */}
            <div className="lg:col-span-7 relative h-[200px] md:h-[300px] lg:h-[400px] lg:order-1 order-2">
              <Image
                src="/images/oran-12.jpg"
                alt="Yaşam 11"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, 70vw"
              />
            </div>
            
            {/* Sol 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1 lg:order-2 order-1" style={{ backgroundColor: "#9dc4c2" }}>
              <div>
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartOran.section6.title')}
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  {t('evartOran.section6.subtitle')}
                </p>
              </div>
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartOran.section6.description').replace(/<br>/g, '<br />') }} />
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

