"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";

export default function HeroSlider() {
  const { locale } = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isHorizontalSwipeRef = useRef(false);
  const clickStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Görsel path'lerini dinamik olarak oluştur
  const getImageSrc = (slideIndex: number, device: 'desktop' | 'mobile') => {
    const key = `${slideIndex}-${device}`;
    // Eğer bu görsel için hata varsa TR'yi kullan
    // EN locale'inde görseller yoksa direkt TR'yi kullan (EN görselleri eklendiğinde bu kontrolü kaldırabilirsiniz)
    const useFallback = imageErrors[key] || (locale === 'en');
    const currentLocale = useFallback ? 'tr' : locale;
    return `/images/hero-slide${slideIndex + 1}-${currentLocale}-${device}.jpg`;
  };

  // Görsel yükleme hatası durumunda TR'ye fallback yap
  const handleImageError = (slideIndex: number, device: 'desktop' | 'mobile') => {
    const key = `${slideIndex}-${device}`;
    if (!imageErrors[key]) {
      setImageErrors(prev => ({ ...prev, [key]: true }));
    }
  };

  const slides = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  // Scale animasyonu için - ilk görsel yüklendiğinde başlat

  const handleStart = (clientX: number, clientY: number) => {
    setStartX(clientX);
    setStartY(clientY);
    setIsDragging(true);
    setDragOffset(0);
    clickStartRef.current = { x: clientX, y: clientY, time: Date.now() };
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - startX;
    setDragOffset(offset);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50; // Minimum swipe mesafesi
    const slideWidth = window.innerWidth;
    const percentage = (dragOffset / slideWidth) * 100;

    if (Math.abs(percentage) > 10 || Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Sağa kaydırma - önceki slide (infinite)
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else if (dragOffset < 0) {
        // Sola kaydırma - sonraki slide (infinite)
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    clickStartRef.current = null;
  };

  const handleSlideClick = (e: React.MouseEvent, slideIndex: number) => {
    // Eğer drag işlemi varsa veya çok fazla hareket varsa link'e gitme
    if (isDragging || Math.abs(dragOffset) > 10) {
      e.preventDefault();
      return;
    }

    // Tıklama pozisyonunu kontrol et
    if (clickStartRef.current) {
      const deltaX = Math.abs(e.clientX - clickStartRef.current.x);
      const deltaY = Math.abs(e.clientY - clickStartRef.current.y);
      const deltaTime = Date.now() - clickStartRef.current.time;
      
      // Eğer çok fazla hareket varsa veya çok uzun süre basılı tutulduysa link'e gitme
      if (deltaX > 10 || deltaY > 10 || deltaTime > 300) {
        e.preventDefault();
        return;
      }
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
    isHorizontalSwipeRef.current = false;
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !touchStartRef.current) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    
    // Yatay hareket dikey hareketten fazlaysa scroll'u engelle
    if (deltaX > deltaY && deltaX > 10) {
      isHorizontalSwipeRef.current = true;
      e.preventDefault();
      e.stopPropagation();
      handleMove(touch.clientX);
      // Touch pozisyonunu güncelle
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    } else if (isHorizontalSwipeRef.current && deltaX > 5) {
      // Zaten yatay swipe başladıysa devam et
      e.preventDefault();
      e.stopPropagation();
      handleMove(touch.clientX);
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
    isHorizontalSwipeRef.current = false;
    touchStartRef.current = null;
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
    <section 
      className="relative hero-slider w-full overflow-hidden cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider Images */}
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex"
          style={{
            transform: `translateX(calc(${-currentSlide * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {slides.map((slide, index) => {
            const linkHref = index === 0 
              ? `/${locale}/evart-yalikavak` 
              : `/${locale}/evart-oran`;
            
            return (
              <Link
                key={slide.id}
                href={linkHref}
                onClick={(e) => handleSlideClick(e, index)}
                className="w-full flex-shrink-0 relative overflow-hidden block"
              >
                {/* Desktop görsel */}
                <div
                  className="hidden md:block w-full h-full"
                  style={{
                    transform: index === 0 && !isLoaded ? 'scale(1.05)' : 'scale(1)',
                    transition: index === 0 && isLoaded ? 'transform 1.5s ease-out' : 'none',
                  }}
                >
                  <Image
                    src={getImageSrc(index, 'desktop')}
                    alt={`Slide ${index + 1}`}
                    width={1920}
                    height={800}
                    className="w-full h-auto object-cover pointer-events-none select-none"
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={95}
                    sizes="100vw"
                    style={{ height: 'calc(100vh - 80px)' }}
                    onLoad={() => {
                      if (index === 0 && !isLoaded) {
                        // Görsel yüklendikten sonra kısa bir gecikme ile animasyonu başlat
                        setTimeout(() => {
                          setIsLoaded(true);
                        }, 50);
                      }
                    }}
                    onError={() => handleImageError(index, 'desktop')}
                  />
                </div>
                {/* Mobile görsel */}
                <div
                  className="block md:hidden w-full h-full"
                  style={{
                    transform: index === 0 && !isLoaded ? 'scale(1.05)' : 'scale(1)',
                    transition: index === 0 && isLoaded ? 'transform 1.5s ease-out' : 'none',
                  }}
                >
                  <Image
                    src={getImageSrc(index, 'mobile')}
                    alt={`Slide ${index + 1}`}
                    width={768}
                    height={600}
                    className="w-full h-auto object-contain pointer-events-none select-none"
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={95}
                    sizes="100vw"
                    onLoad={() => {
                      if (index === 0 && !isLoaded) {
                        // Görsel yüklendikten sonra kısa bir gecikme ile animasyonu başlat
                        setTimeout(() => {
                          setIsLoaded(true);
                        }, 50);
                      }
                    }}
                    onError={() => handleImageError(index, 'mobile')}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator - Sol alt köşede, 100px yukarıda */}
      <div className="absolute bottom-[10px] md:bottom-[100px] left-0 right-0 z-20">
        <div className="container-custom">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-3 flex items-center gap-2 w-fit">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`md:w-2 md:h-2 w-1 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white md:w-8 w-4"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Rotating Circle with Video - En altta, yarısı slider içinde */}
    <div className="relative flex justify-center -mt-[50px] left-1/2 transform -translate-x-1/2 z-20">
      <div 
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-lg circle-glow"
        style={{
          filter: 'drop-shadow(0px 4px 16px rgba(22, 149, 136, 0.4))',
        }}
      >
        <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
            onError={() => setVideoError(true)}
          >
            <source src="/images/waves.mp4" type="video/mp4" />
          </video>
      </div>
    </div>

  </>
  );
}

