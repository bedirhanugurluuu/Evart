"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useTranslations } from "@/hooks/useTranslations";

export default function Contact() {
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
      
      {/* Ana Banner */}
      <section className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden about-banner">
        {/* Banner Görseli */}
        <Image
          src="/images/about-banner.jpg"
          alt="İletişim Banner"
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
              className={`font-gotham-bold uppercase text-xl md:text-3xl lg:text-4xl text-white mb-1 md:mb-4 transition-all duration-1000 ${
                isMounted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('contact.banner.title')}
            </h1>
            <p 
              className={`font-questa-regular text-3xl md:text-5xl lg:text-6xl text-white transition-all duration-1000 ${
                isMounted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {t('contact.banner.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* İletişim Formu ve Bilgileri */}
      <section ref={sectionRef} className="py-20 overflow-hidden">
        <div className="container-custom">
          <ContactForm />
        </div>
      </section>

      {/* İletişim Bilgileri Detaylı */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Adres 1 - Bodrum */}
            <div 
              className={`text-center transition-all duration-1000 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <a 
                href="https://maps.app.goo.gl/yx9jgf11HdH7KZjz5"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#869e9e] hover:scale-110"
                    style={{ 
                      border: "2px solid #869e9e",
                    }}
                  >
                    <svg
                      className="w-8 h-8"
                      style={{ color: "#869e9e" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-gotham-bold uppercase text-base md:text-xl mb-1 md:mb-3" style={{ color: "#414042" }}>
                  {t('contact.address.bodrum.title')}
                </h3>
                <p className="font-gotham-book text-sm md:text-base leading-relaxed" style={{ color: "#414042" }}>
                  {t('contact.address.bodrum.line1')}<br />
                  {t('contact.address.bodrum.line2')}
                </p>
              </a>
            </div>

            {/* Adres 2 - Ankara */}
            <div 
              className={`text-center transition-all duration-1000 ease-out delay-200 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <a 
                href="https://maps.app.goo.gl/sa1BAq3YpXs3XXpG9"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity"
              >
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#869e9e] hover:scale-110"
                    style={{ 
                      border: "2px solid #869e9e",
                    }}
                  >
                    <svg
                      className="w-8 h-8"
                      style={{ color: "#869e9e" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-gotham-bold uppercase text-base md:text-xl mb-1 md:mb-3" style={{ color: "#414042" }}>
                  {t('contact.address.ankara.title')}
                </h3>
                <p className="font-gotham-book text-sm md:text-base leading-relaxed" style={{ color: "#414042" }}>
                  {t('contact.address.ankara.line1')}<br />
                  {t('contact.address.ankara.line2')}<br />
                  {t('contact.address.ankara.line3')}
                </p>
              </a>
            </div>

            {/* Telefon */}
            <div 
              className={`text-center transition-all duration-1000 ease-out delay-400 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#869e9e] hover:scale-110"
                  style={{ 
                    border: "2px solid #869e9e",
                  }}
                >
                  <svg
                    className="w-8 h-8"
                    style={{ color: "#869e9e" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-gotham-bold uppercase text-base md:text-xl mb-1 md:mb-3" style={{ color: "#414042" }}>
                {t('contact.phone.title')}
              </h3>
              <p className="font-gotham-book text-sm md:text-base leading-relaxed" style={{ color: "#414042" }}>
                <a href="tel:+905325101231" className="hover:text-[#869e9e] transition-colors">
                  0532 389 00 87
                </a>
                <br />
                <a href="tel:4440456" className="hover:text-[#869e9e] transition-colors">
                  444 0 456
                </a>
              </p>
            </div>

            {/* E-posta */}
            <div 
              className={`text-center transition-all duration-1000 ease-out delay-600 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#869e9e] hover:scale-110"
                  style={{ 
                    border: "2px solid #869e9e",
                  }}
                >
                  <svg
                    className="w-8 h-8"
                    style={{ color: "#869e9e" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-gotham-bold uppercase text-xl mb-3" style={{ color: "#414042" }}>
                {t('contact.email.title')}
              </h3>
              <p className="font-gotham-book text-base leading-relaxed" style={{ color: "#414042" }}>
                <a href="mailto:info@evart.com" className="hover:text-[#869e9e] transition-colors">
                  info@evart.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Harita veya Görsel Bölümü */}
      <section className="w-full h-[400px] md:h-[500px]">
        <div className="w-full h-full">
          {/* Google Maps iframe veya görsel */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d49007.49454221511!2d32.859867!3d39.852541!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d345002a2e5265%3A0x8e3c2f26485648!2sEvart%20Oran%20Sat%C4%B1%C5%9F%20Ofisi!5e0!3m2!1str!2sus!4v1763145470385!5m2!1str!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      <Footer />
    </main>
  );
}
