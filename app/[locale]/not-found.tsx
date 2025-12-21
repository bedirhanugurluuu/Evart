"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations } from "@/hooks/useTranslations";
import { Locale } from "@/i18n";

export default function NotFound({ params }: { params: { locale: Locale } }) {
  const { t, locale } = useTranslations();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Ana Banner - Modern ve Çekici */}
      <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#869e9e" }}>
        {/* Arka Plan Deseni */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Ana İçerik */}
        <div className="container-custom text-center relative z-10 py-20">
          {/* 404 Numarası - Büyük ve Animasyonlu */}
          <div className="relative inline-block mb-8">
            <h1 
              className={`font-gotham-bold uppercase text-8xl md:text-[12rem] lg:text-[16rem] text-white transition-all duration-1000 ${
                isMounted 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
              style={{ 
                transitionDelay: '100ms',
                textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em'
              }}
            >
              {t('notFound.title')}
            </h1>
            {/* Dekoratif Çizgi */}
            <div 
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-white transition-all duration-1000 ${
                isMounted 
                  ? 'w-full opacity-100' 
                  : 'w-0 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            ></div>
          </div>

          {/* Alt Başlık */}
          <p 
            className={`font-questa-regular text-3xl md:text-4xl lg:text-5xl text-white mb-6 transition-all duration-1000 ${
              isMounted 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {t('notFound.subtitle')}
          </p>

          {/* Açıklama */}
          <p 
            className={`font-gotham-book text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 transition-all duration-1000 ${
              isMounted 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            {t('notFound.description')}
          </p>

          {/* Ana Sayfaya Dön Butonu */}
          <Link 
            href={`/${locale}`}
            className={`inline-block font-gotham-bold text-white uppercase transition-all duration-300 hover:bg-[#6d8a8a] hover:scale-105 hover:shadow-lg ${
              isMounted 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              backgroundColor: "#869e9e",
              padding: "16px 40px",
              transitionDelay: '700ms',
              border: '2px solid white'
            }}
          >
            {t('notFound.backHome')}
          </Link>
        </div>

        {/* Dekoratif Elementler */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Hızlı Linkler Bölümü */}
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="container-custom">
          <h3 
            className={`font-gotham-bold uppercase text-2xl md:text-3xl text-center mb-12 transition-all duration-1000 ${
              isMounted 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              color: "#414042",
              transitionDelay: '800ms'
            }}
          >
            {t('notFound.popularPages')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { href: `/${locale}/about`, label: t('nav.about') },
              { href: `/${locale}/evart-oran`, label: t('nav.evartOran') },
              { href: `/${locale}/evart-yalikavak`, label: t('nav.evartYalikavak') }
            ].map((item, index) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`text-center p-8 bg-white hover:bg-[#869e9e] hover:text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 ${
                  isMounted 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${900 + index * 100}ms`,
                  border: '1px solid #e5e7eb'
                }}
              >
                <p className="font-gotham-bold uppercase text-lg md:text-xl" style={{ color: "inherit" }}>
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

