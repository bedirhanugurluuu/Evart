'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.8 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);
  return (
    <section ref={sectionRef} className="py-16">
      <div className="container-custom">
        <div className="text-center">
          {/* Başlık */}
          <h2 className="font-gotham-bold uppercase text-2xl md:text-3xl mb-2" style={{ color: "#414042" }}>
            Yapıtek ANKA İnşaat
          </h2>

          {/* Alt Başlık */}
          <p className="font-questa-regular text-4xl md:text-5xl mb-4" style={{ color: "#414042" }}>
            Güvenle Yükselen Bir Gelecek
          </p>

          {/* 3 Yuvarlak */}
          <div className="flex justify-center items-center gap-2 mb-4">
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

          {/* Uzun Yazı */}
          <p className="font-gotham-book text-base md:text-lg mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
            2014 yılından bu yana inşaat, gayrimenkul, enerji ve dış ticaret alanlarında faaliyet gösteren Yapıtek ANKA İnşaat, her projesinde güven, kalite ve sürdürülebilirliği öncelik haline getirmiştir. Yalnızca sağlam yapılar inşa etmekle kalmayan Yapıtek, aynı zamanda enerji verimliliği yüksek, çevreye duyarlı ve teknolojiyle uyumlu yaşam alanları tasarlayarak sektörde farklı bir konum elde etmiştir.
          </p>

          {/* Devamını Oku */}
          <a 
            href="#" 
            className="font-gotham-light italic text-base md:text-lg inline-block relative read-more-link"
            style={{ color: "#414042" }}
          >
            devamını oku
          </a>
        </div>
      </div>
    </section>
  );
}

