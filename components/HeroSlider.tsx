"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HeroSlider() {
  const { locale } = useTranslations();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});
  const [isSwiperTouching, setIsSwiperTouching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<{ desktop: HTMLVideoElement | null; mobile: HTMLVideoElement | null }>({ desktop: null, mobile: null });

  // Görsel path'lerini dinamik olarak oluştur
  const getImageSrc = (slideIndex: number, device: 'desktop' | 'mobile') => {
    const key = `${slideIndex}-${device}`;
    // EN görselleri yoksa direkt TR kullan (404 hatası önlemek için)
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

  // Video path'lerini oluştur
  const getVideoSrc = (device: 'desktop' | 'mobile') => {
    return `/images/hero-video-${device}.mp4`;
  };

  // Video yükleme hatası durumunda
  const handleVideoError = (device: 'desktop' | 'mobile') => {
    if (!videoErrors[device]) {
      setVideoErrors(prev => ({ ...prev, [device]: true }));
    }
  };

  const slides = [
    {
      id: 1,
      type: 'image' as const,
      link: (locale: string) => `/${locale}/evart-yalikavak`,
    },
    {
      id: 2,
      type: 'image' as const,
      link: (locale: string) => `/${locale}/evart-oran`,
    },
    {
      id: 3,
      type: 'video' as const,
      link: () => '',
    },
  ];

  // Video oynatma kontrolü - aktif slide video ise oynat
  useEffect(() => {
    const videoSlideIndex = slides.findIndex(slide => slide.type === 'video');
    const currentRealIndex = swiperRef.current?.realIndex ?? activeIndex;
    const isVideoSlideActive = currentRealIndex === videoSlideIndex;

    if (isVideoSlideActive) {
      // Desktop video oynat
      if (videoRefs.current.desktop) {
        videoRefs.current.desktop.play().catch(err => {
          console.warn('Desktop video play error:', err);
        });
      }
      // Mobile video oynat
      if (videoRefs.current.mobile) {
        videoRefs.current.mobile.play().catch(err => {
          console.warn('Mobile video play error:', err);
        });
      }
    } else {
      // Video slide aktif değilse duraklat
      if (videoRefs.current.desktop) {
        videoRefs.current.desktop.pause();
      }
      if (videoRefs.current.mobile) {
        videoRefs.current.mobile.pause();
      }
    }
  }, [activeIndex]);

  // Locale değiştiğinde hata durumlarını sıfırla
  useEffect(() => {
    setImageErrors({});
    setVideoErrors({});
  }, [locale]);

  const handleSlideClick = (e: React.MouseEvent, slideIndex: number) => {
    // Swiper'ın drag işlemi varsa link'e gitme
    if (isSwiperTouching) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  return (
    <>
      <section className="relative hero-slider w-full overflow-hidden md:h-[calc(100vh-80px)]">
        <Swiper
          key={locale}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          onTouchStart={() => {
            setIsSwiperTouching(true);
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              setIsSwiperTouching(false);
            }, 100);
          }}
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={300}
          touchRatio={1}
          resistance={true}
          resistanceRatio={0}
          allowTouchMove={true}
          grabCursor={true}
          className="w-full md:h-full"
        >
          {slides.map((slide, index) => {
            const linkHref = slide.link(locale);
            const videoSlideIndex = slides.findIndex(s => s.type === 'video');
            const isVideoSlide = slide.type === 'video';
            const isVideoSlideActive = activeIndex === videoSlideIndex;
            // Video slide'ına yaklaşırken de yükle (bir önceki slide'da)
            const shouldLoadVideo = isVideoSlideActive || 
              (videoSlideIndex !== -1 && (
                activeIndex === (videoSlideIndex - 1 + slides.length) % slides.length ||
                activeIndex === (videoSlideIndex + 1) % slides.length
              ));
            
            const slideContent = (
              <>
                {slide.type === 'image' ? (
                  <>
                    {/* Desktop görsel - CSS ile gizlenir/gösterilir */}
                    <div
                      className="hidden md:block w-full h-full relative"
                      style={{
                        height: 'calc(100vh - 80px)',
                        transform: index === 0 && !isLoaded ? 'scale(1.05)' : 'scale(1)',
                        transition: index === 0 && isLoaded ? 'transform 1.5s ease-out' : 'none',
                      }}
                    >
                      <Image
                        key={`${locale}-desktop-${index}`}
                        src={getImageSrc(index, 'desktop')}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover pointer-events-none select-none"
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        loading={index === 0 || index === activeIndex || index === (activeIndex + 1) % slides.length ? "eager" : "lazy"}
                        quality={95}
                        unoptimized
                        sizes="100vw"
                        onLoad={() => {
                          if (index === 0 && !isLoaded) {
                            setTimeout(() => {
                              setIsLoaded(true);
                            }, 50);
                          }
                        }}
                        onError={() => handleImageError(index, 'desktop')}
                      />
                    </div>
                    {/* Mobile görsel - CSS ile gizlenir/gösterilir */}
                    <div
                      className="block md:hidden w-full relative"
                      style={{
                        transform: index === 0 && !isLoaded ? 'scale(1.05)' : 'scale(1)',
                        transition: index === 0 && isLoaded ? 'transform 1.5s ease-out' : 'none',
                      }}
                    >
                      <Image
                        key={`${locale}-mobile-${index}`}
                        src={getImageSrc(index, 'mobile')}
                        alt={`Slide ${index + 1}`}
                        width={768}
                        height={600}
                        className="w-full h-auto object-contain pointer-events-none select-none"
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        loading={index === 0 || index === activeIndex || index === (activeIndex + 1) % slides.length ? "eager" : "lazy"}
                        quality={95}
                        sizes="100vw"
                        unoptimized
                        onLoad={() => {
                          if (index === 0 && !isLoaded) {
                            setTimeout(() => {
                              setIsLoaded(true);
                            }, 50);
                          }
                        }}
                        onError={() => handleImageError(index, 'mobile')}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Desktop video - CSS ile gizlenir/gösterilir */}
                    <div className="hidden md:block w-full h-full relative" style={{ height: 'calc(100vh - 80px)' }}>
                      {shouldLoadVideo ? (
                        <video
                          ref={(el) => { videoRefs.current.desktop = el; }}
                          autoPlay={isVideoSlideActive}
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className="w-full h-full object-cover pointer-events-none select-none"
                          style={{ height: '100%', width: '100%' }}
                          onError={() => handleVideoError('desktop')}
                        >
                          <source src={getVideoSrc('desktop')} type="video/mp4" />
                        </video>
                      ) : (
                        <div className="w-full h-full bg-black" />
                      )}
                    </div>
                    {/* Mobile video - CSS ile gizlenir/gösterilir */}
                    <div className="block md:hidden w-full relative">
                      {shouldLoadVideo ? (
                        <video
                          ref={(el) => { videoRefs.current.mobile = el; }}
                          autoPlay={isVideoSlideActive}
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className="w-full h-auto object-cover pointer-events-none select-none"
                          onError={() => handleVideoError('mobile')}
                        >
                          <source src={getVideoSrc('mobile')} type="video/mp4" />
                        </video>
                      ) : (
                        <div className="w-full h-auto bg-black" />
                      )}
                    </div>
                  </>
                )}
              </>
            );

            if (slide.type === 'video') {
              return (
                <SwiperSlide key={slide.id} className="md:h-[calc(100vh-80px)]">
                  <div className="w-full md:h-full">
                    {slideContent}
                  </div>
                </SwiperSlide>
              );
            }

            return (
              <SwiperSlide key={slide.id} className="md:h-[calc(100vh-80px)]">
                <Link
                  href={linkHref}
                  onClick={(e) => handleSlideClick(e, index)}
                  className="w-full md:h-full block"
                >
                  {slideContent}
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Pagination Dots */}
        <div className="absolute bottom-[10px] md:bottom-[100px] left-0 right-0 z-20">
          <div className="container-custom">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-3 flex items-center gap-2 w-fit">
              {slides.map((_, index) => {
                // Loop modunda aktif index'i hesapla
                const realIndex = swiperRef.current?.realIndex ?? activeIndex;
                const isActive = realIndex === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (swiperRef.current) {
                        swiperRef.current.slideToLoop(index);
                      }
                    }}
                    className={`md:w-2 md:h-2 w-1 h-1 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-white md:w-8 w-4"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
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
            onError={() => console.warn('Waves video error')}
          >
            <source src="/images/waves.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
