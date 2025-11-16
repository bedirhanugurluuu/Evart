"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SimpleImageSlider from "@/components/SimpleImageSlider";

export default function EvartYalikavak() {
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
      <section className="relative w-full h-[800px] md:h-[600px] lg:h-[650px] overflow-visible about-banner pb-32 md:pb-40 lg:pb-48">
        {/* Banner Görseli */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/about-banner.jpg"
            alt="Evart Yalıkavak Banner"
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
            <ContactForm projectName="Yalıkavak" absoluteOverlay={true} />
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
              <h2 className="font-gotham-bold uppercase text-xl md:text-2xl mb-2" style={{ color: "#414042" }}>
                Şehrin Enerjisiyle
              </h2>
              <p className="font-questa-regular text-2xl md:text-3xl mb-4" style={{ color: "#414042" }}>
                Bodrum’un ruhu buluşuyor
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
              <p className="font-gotham-book text-base mt-4" style={{ color: "#414042", lineHeight: "1.2" }}>
                Evart Yalıkavak, Bodrum’un ilk rezidans projesi olarak yalnızca bir yaşam alanı değil, aynı zamanda yeni bir yaşam biçimi sunuyor. Geleneksel Bodrum mimarisini modern şehirli bir yaklaşımla harmanlayan proje, hem kazandıran bir yatırım modeli hem de ayrıcalıklı bir yaşam deneyimi vaat ediyor.
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
                <p className="font-questa-regular text-2xl md:text-4xl mb-2 text-white">
                  Yaşam Biçimi:
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  Şehirli & Dingin
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
            <p className="font-gotham-book text-base text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              Burada yalnızca bir daireye değil; şehrin hızını Bodrum’un dinginliğiyle buluşturan özgün bir yaşam kültürüne sahip oluyorsunuz. Bahçe dubleksleri sabah uyandığınızda doğrudan havuza açılırken, çatı dubleksleri yüksek tavanlarıyla modern rezidans ferahlığını sunuyor.
              <br></br><br></br>
              Her daire 43–45 m² aralığında kompakt ama fonksiyonel 1+1 planlarda tasarlandı. Modüler mimari sayesinde birleştirme imkânı ile büyüyebilen, esnek yaşam alanları oluşturmak mümkün.<br></br><br></br>
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
                  Sosyal Alanlar:
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  Birlikte Yaşama Sanatı
                </p>
              </div>
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              Evart Yalıkavak’ta ortak alanlar sıradan değil, yaşamın merkezi:<br></br>
              • Ortak havuz: Gün boyu serinleme, akşamları sosyalleşme imkânı<br></br>
              • Geniş sosyal bahçe: Sabah kahveleri, akşam sohbetleri ve yeni dostlukların<br></br>
              doğduğu alan<br></br>
              • Kapalı garaj: Konfor ve güvenliği aynı anda sunar
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
                  Yatırım Fırsatları:
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  Gücünü Konumdan Alır!
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
            <p className="font-gotham-book text-base text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              Evart Yalıkavak, Bodrum’un en yüksek kira getirisi potansiyeline sahip bölgelerinden birinde konumlanıyor.<br></br>
              • Profesyonel kiralama yönetimi<br></br>
              • Şeffaf gelir modeli ve merkezi kontrol<br></br>
              • Turistik kısa dönem kiralamalarla hızlanan yatırım geri dönüşü<br></br><br></br>

              Bodrum’da ortalama ROI 12 yıl iken, Evart Yalıkavak’ta bu süre turistik kiralamalarla 6–10 yıla kadar düşüyor.
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
                  Yaşam + Yatırım:
                </p>
                <p className="font-gotham-book uppercase text-lg md:text-2xl text-white">
                  Çift Değer
                </p>
              </div>
            </div>
          </div>
          {/* Altında Yazı */}
          <div className="container-custom mt-16">
            <p className="font-gotham-book text-base text-left max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
              Tüm birimler ticari bağımsız bölüm tapusu ile teslim ediliyor. Bu sayede evinizi ister yaşam alanı, ister ofis, isterse yatırım amaçlı kullanabilirsiniz. Home-office kültürünün yükselişiyle birleştiğinde, Evart Yalıkavak çok yönlü bir yatırım fırsatına dönüşüyor.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

