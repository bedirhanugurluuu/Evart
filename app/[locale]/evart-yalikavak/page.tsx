"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SimpleImageSlider from "@/components/SimpleImageSlider";
import { useTranslations } from "@/hooks/useTranslations";

export default function EvartYalikavak() {
  const { t, locale } = useTranslations();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  // Banner görsel path'lerini dinamik olarak oluştur
  const getBannerImageSrc = (device: 'desktop' | 'mobile') => {
    const key = `banner-${device}`;
    // Eğer bu görsel için hata varsa TR'yi kullan
    const useFallback = imageErrors[key];
    const currentLocale = useFallback ? 'tr' : locale;
    return `/images/yalikavak-about-${currentLocale}-${device}.png`;
  };

  // Görsel yükleme hatası durumunda TR'ye fallback yap
  const handleImageError = (device: 'desktop' | 'mobile') => {
    const key = `banner-${device}`;
    if (!imageErrors[key]) {
      setImageErrors(prev => ({ ...prev, [key]: true }));
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Locale değiştiğinde hata durumlarını sıfırla
  useEffect(() => {
    setImageErrors({});
  }, [locale]);

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
      <section className="relative w-full h-[400px] md:h-[400px] overflow-hidden">
        {/* Banner Görseli - Desktop */}
        <div className="absolute inset-0 overflow-hidden hidden md:block">
          <Image
            src={getBannerImageSrc('desktop')}
            alt="Evart Yalıkavak Banner"
            fill
            className="object-cover"
            priority
            quality={100}
            unoptimized
            sizes="100vw"
            onError={() => handleImageError('desktop')}
          />
        </div>
        {/* Banner Görseli - Mobile */}
        <div className="absolute inset-0 overflow-hidden block md:hidden">
          <Image
            src={getBannerImageSrc('mobile')}
            alt="Evart Yalıkavak Banner"
            fill
            className="object-cover"
            priority
            quality={100}
            unoptimized
            sizes="100vw"
            onError={() => handleImageError('mobile')}
          />
        </div>
      </section>

      {/* Başlık Bölümü - Container içinde */}
      <section ref={sectionRef} className="py-20 overflow-hidden">
        <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 md:gap-12 items-center">
            {/* Sol Taraf - Başlık ve Noktalar */}
            <div 
              className={`text-center md:text-left transition-all duration-1000 ease-out ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            >
              <h2 className="font-gotham-bold uppercase text-xl md:text-2xl mb-2" style={{ color: "#414042" }}>
                {t('evartYalikavak.banner.title')}
              </h2>
              <p className="font-questa-regular text-2xl md:text-3xl mb-4" style={{ color: "#414042" }}>
                {t('evartYalikavak.banner.subtitle')}
              </p>
              {/* 3 Yuvarlak */}
              <div className="flex justify-center md:justify-start items-center gap-2 mb-6">
                <div 
                  className="md:w-4 md:h-4 w-3 h-3 rounded-full dot-bounce"
                  style={{ 
                    backgroundColor: "#869e9e",
                    animationDelay: '0s'
                  }}
                ></div>
                <div 
                  className="md:w-4 md:h-4 w-3 h-3 rounded-full dot-bounce"
                  style={{ 
                    backgroundColor: "#869e9e",
                    animationDelay: '0.15s'
                  }}
                ></div>
                <div 
                  className="md:w-4 md:h-4 w-3 h-3 rounded-full dot-bounce"
                  style={{ 
                    backgroundColor: "#869e9e",
                    animationDelay: '0.3s'
                  }}
                ></div>
              </div>
              <p className="font-gotham-book text-base md:text-lg mt-4" style={{ color: "#414042", lineHeight: "1.2" }}>
                {t('evartYalikavak.description')}
              </p>
            </div>
            {/* Sağ Taraf - Görsel */}
            <div 
              className={`relative w-full h-[400px] lg:h-[650px] transition-all duration-1000 ease-out delay-200 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            >
              <Image
                src="/images/yalikavak-1.jpg"
                alt="Yalıkavak"
                fill
                className="object-cover"
                quality={95}
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 - 30% Sol (Yazı) / 70% Sağ (Resim) */}
      <section className="py-8">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Sol 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1" style={{ backgroundColor: "#9dc4c2" }}>
              <div>
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartYalikavak.section1.title')}
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  {t('evartYalikavak.section1.subtitle')}
                </p>
              </div>
            </div>
            {/* Sağ 70% - Resim */}
            <div className="lg:col-span-7 relative h-[200px] md:h-[300px] lg:h-[400px]">
              <Image
                src="/images/yalikavak-2.jpg"
                alt="Yaşam 1"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, 70vw"
              />
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base md:text-lg text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartYalikavak.section1.description').replace(/<br>/g, '<br />') }} />
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
                image1="/images/yalikavak-3.jpg"
                image2="/images/yalikavak-4.jpg"
                alt1="Yaşam 3"
                alt2="Yaşam 4"
              />
            </div>
            {/* Sağ 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1 order-1 lg:order-2" style={{ backgroundColor: "#9dc4c2" }}>
              <div className="text-center">
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartYalikavak.section2.title')}
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  {t('evartYalikavak.section2.subtitle')}
                </p>
              </div>
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base md:text-lg text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartYalikavak.section2.description').replace(/<br>/g, '<br />') }} />
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 - 30% Sol (Yazı) / 70% Sağ (Resim) */}
      <section className="py-8">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Sol 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1" style={{ backgroundColor: "#9dc4c2" }}>
              <div>
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartYalikavak.section3.title')}
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  {t('evartYalikavak.section3.subtitle')}
                </p>
              </div>
            </div>
            {/* Sağ 70% - Resim */}
            <div className="lg:col-span-7 relative h-[200px] md:h-[300px] lg:h-[400px]">
              <Image
                src="/images/yalikavak-5.jpg"
                alt="Yaşam 5"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, 70vw"
              />
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base md:text-lg text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartYalikavak.section3.description').replace(/<br>/g, '<br />') }} />
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 - 70% Sol (Slider) / 30% Sağ (Yazı) */}
      <section className="py-8 pb-16">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Sol 70% - Slider */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <SimpleImageSlider
                image1="/images/yalikavak-6.jpg"
                image2="/images/yalikavak-7.jpg"
                alt1="Yaşam 7"
                alt2="Yaşam 8"
              />
            </div>
            {/* Sağ 30% - Yazı */}
            <div className="lg:col-span-3 flex text-center items-center justify-center py-8 lg:py-0 px-1 order-1 lg:order-2" style={{ backgroundColor: "#9dc4c2" }}>
              <div className="text-center">
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  {t('evartYalikavak.section4.title')}
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  {t('evartYalikavak.section4.subtitle')}
                </p>
              </div>
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base md:text-lg text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              <span dangerouslySetInnerHTML={{ __html: t('evartYalikavak.section4.description').replace(/<br>/g, '<br />') }} />
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

