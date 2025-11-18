"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/hooks/useTranslations";

export default function ImageComparisonSlider() {
  const { t, locale } = useTranslations();
  const [sliderPosition, setSliderPosition] = useState(50); // 0-100 arası
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingFromHandleRef = useRef(false);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clampedPercentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Sadece handle'dan tutulduğunda başlat
    const target = e.target as HTMLElement;
    const isHandle = target.closest('[data-slider-handle]');
    
    if (!isHandle) return;
    
    isDraggingFromHandleRef.current = true;
    setIsDragging(true);
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isDraggingFromHandleRef.current || !touchStartRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    
    // Yatay hareket varsa scroll'u engelle ve slider'ı güncelle
    if (deltaX > 5 || (deltaX > deltaY && deltaX > 3)) {
      e.preventDefault();
      e.stopPropagation();
      updateSliderPosition(touch.clientX);
      // Touch pozisyonunu güncelle ki sürekli hareket edebilsin
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    isDraggingFromHandleRef.current = false;
    touchStartRef.current = null;
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    // Mobilde parallax animasyonunu kapat
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
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
    <div ref={sectionRef} className="w-full flex flex-col lg:flex-row pt-24 relative overflow-hidden">

      {/* Sol Taraf - %70 */}
      <div 
        ref={containerRef}
        className={`relative image-comparison-slider w-[100%] lg:w-[65%] h-[175px] md:h-[550px] overflow-hidden cursor-col-resize transition-all duration-1000 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-70'
        }`}
        style={{
          borderRadius: '0 142px 142px 0',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* İlk Görsel - Arka Plan */}
        <div className="absolute inset-0">
          <Image
            src="/images/project-1.jpg"
            alt="Before"
            width={1092}
            height={875}
            className="w-full h-full object-contain md:object-cover"
            style={{
              borderRadius: '0 142px 142px 0',
            }}
            quality={100}
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 50vw"
          />
        </div>

        {/* İkinci Görsel - Perde Efekti */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            borderRadius: '0 142px 142px 0',
          }}
        >
          <Image
            src="/images/project-2.jpg"
            alt="After"
            width={1092}
            height={875}
            className="w-full h-full object-contain md:object-cover"
            style={{
              borderRadius: '0 142px 142px 0',
            }}
            quality={100}
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 50vw"
          />
        </div>

        {/* Slider Handle - Ortada */}
        <div
          data-slider-handle
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 touch-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleMouseDown}
        >
          {/* Arrow İkonu - Sağa Sola */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <svg
              className="w-6 h-6 text-gray-800 -ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Sağ Taraf - %30 */}
      <div className={`w-[100%] lg:w-[35%] px-4 py-12 lg:px-12 flex flex-col justify-center items-center md:items-start relative transition-all duration-1000 ease-out delay-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-70'
      }`}>
        
      {/* Circular Text Animation - Üstte */}
      <div className="absolute top-2 right-5 lg:left-12 transform z-30 w-16 h-16 md:w-32 md:h-32">
        {/* Dönen Text SVG */}
        <svg className="w-full h-full animate-spin-slow absolute inset-0" viewBox="0 0 200 200" style={{ transformOrigin: 'center' }}>
          <defs>
            <path
              id="circle-path"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              fill="none"
            />
          </defs>
          <text
            fontSize="14"
            fill="#869e9e"
            letterSpacing="0.15em"
            fontFamily="Gotham, sans-serif"
            fontWeight="500"
          >
            <textPath href="#circle-path" startOffset="0%">
              MOVE IN NOW PAY IN INSTALLMENTS
            </textPath>
          </text>
        </svg>
        
        {/* Güneş SVG - Ortada (Dönmüyor) */}
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="20"
            fill="#869e9e"
            className="drop-shadow-lg"
          />
          {/* Güneş Işınları */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const x1 = 100 + Math.cos(angle) * 25;
            const y1 = 100 + Math.sin(angle) * 25;
            const x2 = 100 + Math.cos(angle) * 32;
            const y2 = 100 + Math.sin(angle) * 32;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#869e9e"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
        {/* Başlık */}
        <h2 className="font-gotham-bold uppercase text-center md:text-left text-base md:text-2xl mb-4 md:mb-6" style={{ color: "#414042" }}>
          {t('home.imageComparisonSlider.title')}
        </h2>

        {/* Uzun Yazı */}
        <p className="font-gotham-book text-center md:text-left text-sm md:text-lg mb-4 md:mb-6 leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
          {t('home.imageComparisonSlider.description')}
        </p>

        {/* Devamını Oku */}
        <Link 
          href={`/${locale}/evart-oran`} 
          className="font-gotham-light italic text-center md:text-left text-sm md:text-base inline-block relative read-more-link w-fit"
          style={{ color: "#414042" }}
        >
          {t('home.imageComparisonSlider.readMore')}
        </Link>
      </div>
    </div>
  );
}

