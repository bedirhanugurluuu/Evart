"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ImageComparisonSliderReverse() {
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
      {/* Sol Taraf - %35 - Yazı */}
      <div className={`w-[100%] lg:w-[35%] order-2 lg:order-1 px-4 py-12 lg:px-12 flex flex-col justify-center relative transition-all duration-1000 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-70'
      }`}>
        {/* Başlık */}
        <h2 className="font-gotham-bold uppercase text-xl md:text-3xl mb-6" style={{ color: "#414042" }}>
          evart yalıkavak - bodrum
        </h2>

        {/* Uzun Yazı */}
        <p className="font-gotham-book text-lg md:text-xl mb-6 leading-relaxed" style={{ color: "#414042", lineHeight: "1.2" }}>
          Evart Yalıkavak, Bodrum'un en gözde lokasyonlarından birinde, denize sıfır konumda yer alan lüks bir yaşam projesidir. Ege'nin büyüleyici manzarasına sahip bu özel proje, modern mimari tasarımı ve premium yaşam alanları ile dikkat çekmektedir. Geniş terasları, özel plajı ve dünya standartlarında sosyal tesisleri ile Evart Yalıkavak, hayalinizdeki yaşamı sunmaktadır.
        </p>

        {/* Devamını Oku */}
        <Link 
          href="/evart-yalikavak" 
          className="font-gotham-light italic text-sm md:text-base inline-block relative read-more-link w-fit"
          style={{ color: "#414042" }}
        >
          devamını oku
        </Link>
      </div>

      {/* Sağ Taraf - %65 - Resimler */}
      <div 
        ref={containerRef}
        className={`relative image-comparison-slider order-1 lg:order-2 image-comparison-slider w-[100%] lg:w-[65%] h-[500px] md:h-[690px] overflow-hidden cursor-col-resize transition-all duration-1000 ease-out delay-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-70'
        }`}
        style={{
          borderRadius: '142px 0 0 142px',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* İlk Görsel - Arka Plan */}
        <div className="absolute inset-0">
          <Image
            src="/images/project-3.jpg"
            alt="Before"
            width={1092}
            height={875}
            className="w-full h-full object-cover"
            style={{
              borderRadius: '142px 0 0 142px',
            }}
            quality={70}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
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
            className="w-full h-full object-cover"
            style={{
              borderRadius: '142px 0 0 142px',
            }}
            quality={70}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
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

