'use client';

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface SimpleImageSliderProps {
  image1: string;
  image2: string;
  alt1?: string;
  alt2?: string;
}

export default function SimpleImageSlider({ image1, image2, alt1 = "Image 1", alt2 = "Image 2" }: SimpleImageSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const isDraggingFromHandleRef = useRef(false);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clampedPercentage);
  };

  const handleMouseDown = (e: MouseEvent) => {
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

  const handleTouchStartNative = (e: TouchEvent) => {
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
  };

  const handleTouchMoveNative = (e: TouchEvent) => {
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
  };

  const handleTouchEndNative = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    isDraggingFromHandleRef.current = false;
    touchStartRef.current = null;
  };

  useEffect(() => {
    const container = containerRef.current;
    const handle = handleRef.current;
    if (!container) return;

    // Handle'a mouse event listener'ları ekle (sadece handle'dan tutulduğunda)
    const handleMouseDownNative = (e: MouseEvent) => {
      e.preventDefault();
      handleMouseDown(e);
    };

    // Handle'a touch event listener'ları ekle
    if (handle) {
      handle.addEventListener('mousedown', handleMouseDownNative);
      handle.addEventListener('touchstart', handleTouchStartNative, { passive: false });
    }

    // Container'a touchmove ve touchend ekle (handle'dan çıkınca da takip edebilmek için)
    container.addEventListener('touchmove', handleTouchMoveNative, { passive: false });
    container.addEventListener('touchend', handleTouchEndNative, { passive: false });
    container.addEventListener('touchcancel', handleTouchEndNative, { passive: false });

    return () => {
      if (handle) {
        handle.removeEventListener('mousedown', handleMouseDownNative);
        handle.removeEventListener('touchstart', handleTouchStartNative);
      }
      container.removeEventListener('touchmove', handleTouchMoveNative);
      container.removeEventListener('touchend', handleTouchEndNative);
      container.removeEventListener('touchcancel', handleTouchEndNative);
    };
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden cursor-col-resize"
      style={{ touchAction: 'none' }}
    >
      {/* İlk Görsel - Arka Plan */}
      <div className="absolute inset-0">
        <Image
          src={image1}
          alt={alt1}
          fill
          className="object-cover"
          quality={85}
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>

      {/* İkinci Görsel - Perde Efekti */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <Image
          src={image2}
          alt={alt2}
          fill
          className="object-cover"
          quality={85}
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>

      {/* Slider Handle */}
      <div
        ref={handleRef}
        data-slider-handle
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10 touch-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Arrow İkonu */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none">
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
  );
}

