"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
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
              404
            </h1>
            <p 
              className={`font-questa-regular text-2xl md:text-3xl lg:text-4xl text-white transition-all duration-1000 ${
                isMounted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Sayfa Bulunamadı
            </p>
          </div>
        </div>
      </section>

      {/* İçerik Bölümü */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-gotham-bold uppercase text-2xl md:text-3xl mb-4" style={{ color: "#414042" }}>
              Üzgünüz
            </h2>
            <p className="font-questa-regular text-3xl md:text-4xl mb-6" style={{ color: "#414042" }}>
              Aradığınız sayfa mevcut değil
            </p>
            
            {/* 3 Yuvarlak */}
            <div className="flex justify-center items-center gap-2 mb-8">
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

            <p className="font-gotham-book text-base md:text-lg mb-8 leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. 
              Ana sayfaya dönerek sitemizi keşfedebilirsiniz.
            </p>

            {/* Ana Sayfaya Dön Butonu */}
            <Link 
              href="/"
              className="inline-block font-gotham-bold text-white uppercase transition-all duration-300 hover:bg-[#6d8a8a]"
              style={{
                backgroundColor: "#869e9e",
                padding: "12px 32px",
              }}
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </section>

      {/* Hızlı Linkler */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h3 className="font-gotham-bold uppercase text-xl md:text-2xl text-center mb-8" style={{ color: "#414042" }}>
            Popüler Sayfalar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link 
              href="/about"
              className="text-center p-6 bg-white hover:bg-[#869e9e] hover:text-white transition-all duration-300 rounded-lg"
            >
              <p className="font-gotham-bold uppercase text-lg" style={{ color: "inherit" }}>
                Hakkımızda
              </p>
            </Link>
            <Link 
              href="/evart-oran"
              className="text-center p-6 bg-white hover:bg-[#869e9e] hover:text-white transition-all duration-300 rounded-lg"
            >
              <p className="font-gotham-bold uppercase text-lg" style={{ color: "inherit" }}>
                Evart Oran
              </p>
            </Link>
            <Link 
              href="/evart-yalikavak"
              className="text-center p-6 bg-white hover:bg-[#869e9e] hover:text-white transition-all duration-300 rounded-lg"
            >
              <p className="font-gotham-bold uppercase text-lg" style={{ color: "inherit" }}>
                Evart Yalıkavak
              </p>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

