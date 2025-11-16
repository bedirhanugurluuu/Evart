"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";

export default function About() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Ana Banner */}
      <section className="relative w-full h-[400px] md:h-[600px] lg:h-[650px] overflow-hidden about-banner">
        {/* Banner Görseli */}
        <Image
          src="/images/about-banner.jpg"
          alt="About Banner"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        
        {/* Absolute Yazılar */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container-custom text-center relative z-10">
            <h1 
              className={`font-gotham-bold uppercase text-2xl md:text-3xl lg:text-4xl text-white mb-4 transition-all duration-1000 ${
                isMounted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Yapıtek ANKA İnşaat
            </h1>
            <p 
              className={`font-questa-regular text-4xl md:text-5xl lg:text-6xl text-white transition-all duration-1000 ${
                isMounted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Güvenle Yükselen Bir Gelecek
            </p>
          </div>
        </div>
      </section>

      {/* İlk Paragraf - Banner Altı */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <p className="font-gotham-book text-center text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            2014 yılından bu yana inşaat, gayrimenkul, enerji ve dış ticaret alanlarında faaliyet gösteren Yapıtek ANKA İnşaat, her projesinde güven, kalite ve sürdürülebilirliği öncelik haline getirmiştir. Yalnızca sağlam yapılar inşa etmekle kalmayan Yapıtek, aynı zamanda enerji verimliliği yüksek, çevreye duyarlı ve teknolojiyle uyumlu yaşam alanları tasarlayarak sektörde farklı bir konum elde etmiştir.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* İki Paragraf */}
      <section className="py-12 md:py-16">
        <div className="container-custom space-y-6 text-center">
          <p className="font-gotham-book text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Enerji sektöründe yönlü sondaj ve saha kurulumlarıyla ülkemizin altyapısına katkı sunan, güçlü ithalat–ihracat ağıyla da uluslararası pazarda etkin rol oynayan Yapıtek, mühendislik deneyimini global vizyonla birleştirmektedir.
          </p>
          <p className="font-gotham-book text-lg lg:text-xl text-gray-700 leading-relaxed pt-8 max-w-4xl mx-auto">
            <b>Evart – Yapıdan Fazlası, Bir Yaşam Biçimi</b><br />
            Yapıtek'in deneyiminden doğan Evart markası, yalnızca inşaat projeleri geliştirmek için değil; estetik, fonksiyon ve yatırım değerini bir araya getiren yaşam konseptleri yaratmak için tasarlanmıştır. Evart, her projesinde bulunduğu şehrin dokusunu modern mimariyle harmanlayarak, kullanıcılarına "sadece bir ev değil, bir yaşam biçimi" sunmayı hedefler.
          </p>
        </div>
      </section>

      {/* İki Görsel - Container Dışında, %60 ve %40 */}
      <section className="w-full max-h-[400px] flex">
        <div className="relative w-[60%] h-[400px]">
          <Image
            src="/images/about-image-1.jpg"
            alt="About Image 1"
            fill
            className="object-cover"
            quality={85}
            sizes="60vw"
          />
        </div>
        <div className="relative w-[40%] h-[400px]">
          <Image
            src="/images/about-image-2.jpg"
            alt="About Image 2"
            fill
            className="object-cover"
            quality={85}
            sizes="40vw"
          />
        </div>
      </section>

      {/* Üç Paragraf */}
      <section className="py-12 md:py-16">
        <div className="container-custom space-y-6 text-center">
          <p className="font-gotham-book text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            <b>Evart Oran:</b> Ankara'nın prestijli Çankaya bölgesinde, büyükelçiliklere komşu konumuyla şehrin merkezinde seçkin bir yaşam sunar. Modern rezidans konsepti, yüksek kira potansiyeli ve esnek daire tipolojileriyle hem yaşam hem de yatırım değeri yaratır.
          </p>
          <p className="font-gotham-book text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            <b>Evart Yalıkavak:</b> Bodrum'un ilk rezidans projesi olarak şehrin enerjisini, denizin ve doğanın huzuruyla buluşturur. Bahçe ve çatı dubleksleri, sosyal yaşam alanları ve profesyonel yatırım modeliyle Türkiye'de benzersiz bir konsepttir.
          </p>
          <p className="font-gotham-book text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Yapıtek ANKA İnşaat, sağlamlığı ve güveni temsil ederken; Evart markası bu sağlam temeli estetik, yenilikçi mimari ve yatırım bilinciyle taçlandırır. İşte bu ayrışma sayesinde Evart projeleri yalnızca bugünün ihtiyaçlarını karşılamakla kalmaz, geleceğin beklentilerini de şekillendirir.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

