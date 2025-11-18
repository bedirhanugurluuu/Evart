'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';

export default function AboutSection() {
  const { t, locale } = useTranslations();
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
    <section ref={sectionRef} className="py-8 md:py-16">
      <div className="container-custom">
        <div className="text-center">
          {/* Başlık */}
          <h2 className="font-gotham-bold uppercase text-xl md:text-3xl mb-2" style={{ color: "#414042" }}>
            {t('home.aboutSection.title')}
          </h2>

          {/* Alt Başlık */}
          <p className="font-questa-regular text-3xl md:text-5xl mb-4" style={{ color: "#414042" }}>
            {t('home.aboutSection.subtitle')}
          </p>

          {/* 3 Yuvarlak */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <div 
              className="md:w-4 md:h-4 w-2 h-2 rounded-full dot-bounce"
              style={{ 
                backgroundColor: "#869e9e",
                animationDelay: '0s'
              }}
            ></div>
            <div 
              className="md:w-4 md:h-4 w-2 h-2 rounded-full dot-bounce"
              style={{ 
                backgroundColor: "#869e9e",
                animationDelay: '0.15s'
              }}
            ></div>
            <div 
              className="md:w-4 md:h-4 w-2 h-2 rounded-full dot-bounce"
              style={{ 
                backgroundColor: "#869e9e",
                animationDelay: '0.3s'
              }}
            ></div>
          </div>

          {/* Uzun Yazı */}
          <p className="font-gotham-book text-sm md:text-lg mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
            {t('home.aboutSection.description')}
          </p>

          {/* Devamını Oku */}
          <Link 
            href={`/${locale}/about`} 
            className="font-gotham-light italic text-sm md:text-lg inline-block relative read-more-link"
            style={{ color: "#414042" }}
          >
            {t('home.aboutSection.readMore')}
          </Link>
        </div>
      </div>
    </section>
  );
}

