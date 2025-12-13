"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/hooks/useTranslations";

export default function ImageComparisonSliderReverse() {
  const { t, locale } = useTranslations();
  const [sliderPosition, setSliderPosition] = useState(50); // 0-100 arası
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingFromHandleRef = useRef(false);
  const isDraggingRef = useRef(false);

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
    isDraggingRef.current = true;
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    updateSliderPosition(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Sadece handle'dan tutulduğunda başlat
    const target = e.target as HTMLElement;
    const isHandle = target.closest('[data-slider-handle]');
    
    if (!isHandle) return;
    
    isDraggingFromHandleRef.current = true;
    isDraggingRef.current = true;
    setIsDragging(true);
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    updateSliderPosition(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current || !isDraggingFromHandleRef.current || !touchStartRef.current) return;
    
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
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
    isDraggingFromHandleRef.current = false;
    touchStartRef.current = null;
  }, []);

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

  // Touch event listener'ları native olarak ekle (passive: false ile)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

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
    <div ref={sectionRef} className="w-full flex flex-col lg:flex-row pt-12 md:pt-24 relative overflow-hidden">
      {/* Sol Taraf - %35 - Yazı */}
      <div className={`w-[100%] lg:w-[35%] order-2 lg:order-1 px-4 py-12 lg:px-12 flex flex-col justify-center items-center md:items-start relative transition-all duration-1000 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-70'
      }`}>
        {/* Başlık */}
        <h2 className="font-gotham-bold uppercase text-center md:text-left text-base md:text-2xl mb-4 md:mb-6" style={{ color: "#414042" }}>
          {t('home.imageComparisonSliderReverse.title')}
        </h2>

        {/* Uzun Yazı */}
        <p className="font-gotham-book text-center md:text-left text-sm md:text-lg mb-4 md:mb-6 leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
          {t('home.imageComparisonSliderReverse.description')}
        </p>

        {/* Devamını Oku */}
        <Link 
          href={`/${locale}/evart-yalikavak`} 
          className="font-gotham-light italic text-center md:text-left text-sm md:text-base inline-block relative read-more-link w-fit"
          style={{ color: "#414042" }}
        >
          {t('home.imageComparisonSliderReverse.readMore')}
        </Link>
      </div>

      {/* Sağ Taraf - %65 - Resimler */}
      <div 
        ref={containerRef}
        className={`image-comparison relative image-comparison-slider order-1 lg:order-2 image-comparison-slider w-[100%] lg:w-[65%] h-[175px] md:h-[550px] overflow-hidden cursor-col-resize transition-all duration-1000 ease-out delay-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-70'
        }`}
        style={{
          borderRadius: '142px 0 0 142px',
        }}
      >
        {/* İlk Görsel - Arka Plan */}
        <div className="absolute inset-0">
          <Image
            src="/images/project-3.jpg"
            alt="Before"
            width={1092}
            height={875}
            className="w-full h-full object-contain md:object-cover"
            style={{
              borderRadius: '142px 0 0 142px',
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
            clipPath: `inset(0 0 0 ${sliderPosition}%)`,
            borderRadius: '142px 0 0 142px',
          }}
        >
          <Image
            src="/images/project-4.jpg"
            alt="After"
            width={1092}
            height={875}
            className="w-full h-full object-contain md:object-cover"
            style={{
              borderRadius: '142px 0 0 142px',
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
    </div>
  );
}

