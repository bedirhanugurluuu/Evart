"use client";

import { useState, useEffect, useRef } from "react";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isHorizontalSwipeRef = useRef(false);

  const slides = [
    {
      id: 1,
      image: "/images/Slider.png",
    },
    {
      id: 2,
      image: "/images/Slider.png",
    },
    {
      id: 3,
      image: "/images/Slider.png",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleStart = (clientX: number, clientY: number) => {
    setStartX(clientX);
    setStartY(clientY);
    setIsDragging(true);
    setDragOffset(0);
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
      className="relative hero-slider h-auto max-h-[400px] md:max-h-[600px] lg:max-h-[1200px] w-full overflow-hidden cursor-grab active:cursor-grabbing"
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
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0"
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto max-h-[400px] md:max-h-[600px] lg:max-h-[1200px] object-contain pointer-events-none select-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="container-custom w-full pointer-events-none">
          <div className="flex justify-end pointer-events-none">
            <div className="text-left max-w- pointer-events-auto">
              <p 
                className={`font-futura uppercase font-regular text-2xl md:text-4xl lg:text-6xl mb-2 transition-all duration-1000 ${
                  isMounted 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                şehrin enerjisiyle
              </p>
              <h1 
                className={`font-futura-demi uppercase text-2xl md:text-4xl lg:text-6xl mb-4 md:mb-8 leading-tight transition-all duration-1000 ${
                  isMounted 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ color: "#435d5d", transitionDelay: '400ms' }}
              >
                bodrum'un
                <br />
                ruhu buluşuyor
              </h1>
              <button 
                className={`hero-discover-btn font-medium text-xs md:text-sm text-white uppercase transition-all duration-1000 relative ${
                  isMounted 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: '600ms',
                }}
              >
                Şimdi keşfet
              </button>
            </div>
          </div>
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

    {/* Rotating Circle with GIF - En altta, yarısı slider içinde */}
    <div className="relative flex justify-center -mt-[50px] left-1/2 transform -translate-x-1/2 z-20">
      <div 
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-lg circle-glow"
        style={{
          filter: 'drop-shadow(0px 4px 16px rgba(22, 149, 136, 0.4))',
        }}
      >
        <img
          src="/images/wave.gif"
          alt="Loading"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

  </>
  );
}

