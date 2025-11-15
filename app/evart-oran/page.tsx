"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SimpleImageSlider from "@/components/SimpleImageSlider";

export default function EvartOran() {
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
      <section className="relative w-full h-[800px] md:h-[600px] lg:h-[800px] overflow-visible about-banner pb-32 md:pb-40 lg:pb-48">
        {/* Banner Görseli */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/about-banner.jpg"
            alt="Evart Oran Banner"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>

        {/* Contact Form - Absolute position ile banner üzerinde */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10">
          <div className="container-custom">
            <ContactForm projectName="Evart Oran" absoluteOverlay={true} />
          </div>
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
              <h2 className="font-gotham-bold uppercase text-2xl md:text-3xl mb-2" style={{ color: "#414042" }}>
                Ankara'nın kalbinde
              </h2>
              <p className="font-questa-regular text-3xl md:text-4xl mb-4" style={{ color: "#414042" }}>
                Seçkin Bir Yaşam
              </p>
              {/* 3 Yuvarlak */}
              <div className="flex justify-center md:justify-start items-center gap-2">
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
                Evart Oran, yalnızca bir konut projesi değil; geleceğin yaşam standartlarını bugünden inşa eden bir vizyonun yansımasıdır. Çankaya Oran'da, büyükelçiliklerin ve prestijli kurumların merkezinde konumlanan proje; modern mimarisi, yüksek kira potansiyeli ve yatırım değeriyle öne çıkıyor.
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
                quality={85}
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
                <p className="font-questa-regular text-3xl md:text-5xl mb-2 text-white">
                  Yaşam Biçimi:
                </p>
                <p className="font-gotham-book uppercase text-xl md:text-3xl text-white">
                  şehirli & prestijli
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
            <p className="font-gotham-book text-base md:text-lg text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              Ankara'nın en seçkin bölgelerinden birinde yer alan Evart Oran, şehrin dinamizmini yüksek yaşam kalitesiyle buluşturuyor.<br></br>
              • 1+1 ve 2+1 esnek daire seçenekleri<br></br>
              • Farklı yaşam tarzlarına uyumlu<br></br>
              • Modern rezidans konsepti ferah, işlevsel ve şık yaşam alanları<br></br>
              • Üniversitelere, alışveriş merkezlerine ve sosyal yaşama yakınlık<br></br>
              • konforlu şehir yaşamı<br></br><br></br>

              Atakule'ye 5 dakika, Kuzu Effect AVM'ye 1 dakika, ODTÜ'ye 10 dakika mesafede olan Evart Oran, konumu itibarıyla hem genç profesyoneller hem de yatırımcılar için ideal bir tercihtir.
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
                <p className="font-questa-regular text-3xl md:text-5xl mb-2 text-white">
                  Sosyal Alanlar:
                </p>
                <p className="font-gotham-book uppercase text-xl md:text-3xl text-white">
                  Konfor & Güven
                </p>
              </div>
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base md:text-lg text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              Evart Oran, yalnızca dairelerden ibaret değil; sosyal yaşamı zenginleştiren alanlarıyla öne çıkar. Modern mimarisi, estetik detayları ve konfor odaklı yaklaşımıyla şehir yaşamına yeni bir soluk getirir.<br></br><br></br>
                <br></br>
              <b>Evart Oran'da sizi, ayrıcalıklı bir sosyal yaşam deneyimi bekliyor.</b>
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
                <p className="font-questa-regular text-3xl md:text-5xl mb-2 text-white">
                  Yatırım Fırsatları:
                </p>
                <p className="font-gotham-book uppercase text-xl md:text-2xl text-white">
                  Gücünü Konumdan Alır!
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
            <p className="font-gotham-book text-base md:text-lg text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              Çankaya Oran, Ankara'nın en hızlı değer kazanan bölgelerinden biridir.<br></br>
              • Yüksek kira getirisi potansiyeli<br></br>
              • Prestijli büyükelçilik bölgesi avantajı<br></br>
              • Hem kısa vadede kazandıran hem uzun vadede değerini artıran yatırım modeli
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
                <p className="font-questa-regular text-3xl md:text-5xl mb-2 text-white">
                  Yaşam + Yatırım:
                </p>
                <p className="font-gotham-book uppercase text-xl md:text-2xl text-white">
                  Çift Kazanç
                </p>
              </div>
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base md:text-lg text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              Evart Oran, hem sakinlerine huzurlu bir yaşam sunar hem de yatırımcısına güçlü bir değer kazandırır. Esnek daire tipolojileri ve merkezi konumu sayesinde, geleceğe güvenle bakan bir yatırımın kapılarını açar.<br></br><br></br>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

