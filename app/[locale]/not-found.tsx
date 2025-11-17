"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations } from "@/hooks/useTranslations";

export default function NotFound() {
  const { t, locale } = useTranslations();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Ana Banner */}
      <section className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden" style={{ backgroundColor: "#869e9e" }}>
        {/* Absolute Yazılar */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container-custom text-center relative z-10">
            <h1 
              className={`font-gotham-bold uppercase text-6xl md:text-8xl lg:text-9xl text-white mb-4 transition-all duration-1000 ${
                isMounted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('notFound.title')}
            </h1>
            <p 
              className={`font-questa-regular text-2xl md:text-3xl lg:text-4xl text-white transition-all duration-1000 ${
                isMounted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {t('notFound.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* İçerik Bölümü */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-gotham-book text-base md:text-lg mb-8 leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              {t('notFound.description')}
            </p>

            {/* Ana Sayfaya Dön Butonu */}
            <Link 
              href={`/${locale}`}
              className="inline-block font-gotham-bold text-white uppercase transition-all duration-300 hover:bg-[#6d8a8a]"
              style={{
                backgroundColor: "#869e9e",
                padding: "12px 32px",
              }}
            >
              {t('notFound.backHome')}
            </Link>
          </div>
        </div>
      </section>

      {/* Hızlı Linkler */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h3 className="font-gotham-bold uppercase text-xl md:text-2xl text-center mb-8" style={{ color: "#414042" }}>
            {t('notFound.popularPages')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link 
              href={`/${locale}/about`}
              className="text-center p-6 bg-white hover:bg-[#869e9e] hover:text-white transition-all duration-300 rounded-lg"
            >
              <p className="font-gotham-bold uppercase text-lg" style={{ color: "inherit" }}>
                {t('nav.about')}
              </p>
            </Link>
            <Link 
              href={`/${locale}/evart-oran`}
              className="text-center p-6 bg-white hover:bg-[#869e9e] hover:text-white transition-all duration-300 rounded-lg"
            >
              <p className="font-gotham-bold uppercase text-lg" style={{ color: "inherit" }}>
                {t('nav.evartOran')}
              </p>
            </Link>
            <Link 
              href={`/${locale}/evart-yalikavak`}
              className="text-center p-6 bg-white hover:bg-[#869e9e] hover:text-white transition-all duration-300 rounded-lg"
            >
              <p className="font-gotham-bold uppercase text-lg" style={{ color: "inherit" }}>
                {t('nav.evartYalikavak')}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

