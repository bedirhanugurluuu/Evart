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
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const videoRefs = useRef<{ desktop: HTMLVideoElement | null; mobile: HTMLVideoElement | null }>({ desktop: null, mobile: null });
  const wavesVideoRef = useRef<HTMLVideoElement | null>(null);

  // Görsel path'lerini dinamik olarak oluştur
  const getImageSrc = (slideIndex: number, device: 'desktop' | 'mobile') => {
    const key = `${slideIndex}-${device}`;
    // EN görselleri yoksa (hata varsa) TR'ye fallback yap
    // Önce mevcut locale'i kullan, hata olursa TR'ye geç
    const useFallback = imageErrors[key];
    const currentLocale = useFallback ? 'tr' : locale;
    // Video slide index 0'da, görsel slide'lar index 1 ve 2'de
    // Slide sırası: 1. Video, 2. Oran (hero-slide2), 3. Yalıkavak (hero-slide1)
    // Görsel mapping: index 1 -> hero-slide2 (Oran), index 2 -> hero-slide1 (Yalıkavak)
    const imageSlideNumber = slideIndex === 1 ? 2 : slideIndex === 2 ? 1 : slideIndex;
    return `/images/hero-slide${imageSlideNumber}-${currentLocale}-${device}.jpg`;
  };

  // Görsel yükleme hatası durumunda TR'ye fallback yap
  const handleImageError = (slideIndex: number, device: 'desktop' | 'mobile') => {
    const key = `${slideIndex}-${device}`;
    if (!imageErrors[key]) {
      setImageErrors(prev => ({ ...prev, [key]: true }));
    }
  };

  // Video path'lerini dinamik olarak oluştur
  const getVideoSrc = (device: 'desktop' | 'mobile') => {
    const key = device;
    // EN videoları yoksa (hata varsa) TR'ye fallback yap
    // Önce mevcut locale'i kullan, hata olursa TR'ye geç
    const useFallback = videoErrors[key];
    const currentLocale = useFallback ? 'tr' : locale;
    return `/images/hero-video-${currentLocale}-${device}.mp4`;
  };

  // Video yükleme hatası durumunda TR'ye fallback yap
  const handleVideoError = (device: 'desktop' | 'mobile') => {
    const key = device;
    if (!videoErrors[key]) {
      setVideoErrors(prev => ({ ...prev, [key]: true }));
    }
  };

  const slides = [
    {
      id: 1,
      type: 'video' as const,
      link: () => '',
    },
    {
      id: 2,
      type: 'image' as const,
      link: (locale: string) => `/${locale}/evart-yalikavak`,
    },
    {
      id: 3,
      type: 'image' as const,
      link: (locale: string) => `/${locale}/evart-oran`,
    },
  ];


  // Locale değiştiğinde hata durumlarını sıfırla
  useEffect(() => {
    setImageErrors({});
    setVideoErrors({});
  }, [locale]);

  // Video'ları başlat - iOS için
  useEffect(() => {
    const initVideos = () => {
      // Mobile video
      const mobileVideo = videoRefs.current.mobile;
      if (mobileVideo) {
        mobileVideo.muted = true;
        mobileVideo.playsInline = true;
        mobileVideo.autoplay = true;
        mobileVideo.loop = true;
        // iOS bazen play() çağrısı bekler
        mobileVideo.play().catch(() => {
          console.warn("Mobile video autoplay engellendi, kullanıcı dokunmalı");
        });
      }

      // Desktop video
      const desktopVideo = videoRefs.current.desktop;
      if (desktopVideo) {
        desktopVideo.muted = true;
        desktopVideo.playsInline = true;
        desktopVideo.autoplay = true;
        desktopVideo.loop = true;
        // iOS bazen play() çağrısı bekler
        desktopVideo.play().catch(() => {
          console.warn("Desktop video autoplay engellendi, kullanıcı dokunmalı");
        });
      }

      // Waves video
      const wavesVideo = wavesVideoRef.current;
      if (wavesVideo) {
        wavesVideo.muted = true;
        wavesVideo.playsInline = true;
        wavesVideo.autoplay = true;
        wavesVideo.loop = true;
        // iOS bazen play() çağrısı bekler
        wavesVideo.play().catch(() => {
          console.warn("Waves video autoplay engellendi, kullanıcı dokunmalı");
        });
      }
    };

    // Kısa bir gecikme ile başlat (DOM hazır olsun)
    const timer = setTimeout(initVideos, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSlideClick = (e: React.MouseEvent) => {
    // Mouse tıklaması ise her zaman izin ver (touch event değilse)
    if (!touchStartPos) {
      return; // Normal tıklama, izin ver
    }
    
    // Eğer gerçek bir swipe/drag işlemi varsa link'e gitme
    if (isSwiperTouching && touchStartPos) {
      const deltaX = Math.abs((e.clientX || 0) - touchStartPos.x);
      const deltaY = Math.abs((e.clientY || 0) - touchStartPos.y);
      // Eğer yatay hareket dikey hareketten fazlaysa ve 10px'den fazlaysa swipe'dır
      const isSwipe = deltaX > 10 && deltaX > deltaY;
      if (isSwipe) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
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
          onTouchStart={(swiper, event) => {
            if (event instanceof TouchEvent) {
              const touch = event.touches?.[0] || event.changedTouches?.[0];
              if (touch) {
                setTouchStartPos({ x: touch.clientX, y: touch.clientY });
                setIsSwiperTouching(true);
              }
            }
          }}
          onTouchEnd={(swiper, event) => {
            if (event instanceof TouchEvent) {
              const touch = event.changedTouches?.[0];
              if (touch && touchStartPos) {
                const deltaX = Math.abs(touch.clientX - touchStartPos.x);
                const deltaY = Math.abs(touch.clientY - touchStartPos.y);
                // Eğer yatay hareket dikey hareketten fazlaysa ve 10px'den fazlaysa swipe'dır
                const isSwipe = deltaX > 10 && deltaX > deltaY;
                if (!isSwipe) {
                  setIsSwiperTouching(false);
                }
              }
            }
            setTimeout(() => {
              setIsSwiperTouching(false);
              setTouchStartPos(null);
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
                      }}
                    >
                      <Image
                        key={`${locale}-desktop-${index}`}
                        src={getImageSrc(index, 'desktop')}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover pointer-events-none select-none"
                        priority={index === 1}
                        fetchPriority={index === 1 ? "high" : "auto"}
                        loading={index === 1 || index === activeIndex || index === (activeIndex + 1) % slides.length ? "eager" : "lazy"}
                        quality={95}
                        unoptimized
                        sizes="100vw"
                        onLoad={() => {
                          if (index === 1 && !isLoaded) {
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
                    >
                      <Image
                        key={`${locale}-mobile-${index}`}
                        src={getImageSrc(index, 'mobile')}
                        alt={`Slide ${index + 1}`}
                        width={768}
                        height={600}
                        className="w-full h-auto object-contain pointer-events-none select-none"
                        priority={index === 1}
                        fetchPriority={index === 1 ? "high" : "auto"}
                        loading={index === 1 || index === activeIndex || index === (activeIndex + 1) % slides.length ? "eager" : "lazy"}
                        quality={95}
                        sizes="100vw"
                        unoptimized
                        onLoad={() => {
                          if (index === 1 && !isLoaded) {
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
                    <div 
                      className="hidden md:block w-full h-full relative" 
                      style={{ height: 'calc(100vh - 80px)' }}
                      onClick={() => {
                        // Kullanıcı tıklayınca video'yu başlat
                        if (videoRefs.current.desktop) {
                          videoRefs.current.desktop.play().catch(() => {});
                        }
                      }}
                    >
                      {shouldLoadVideo ? (
                        <video
                          ref={(el) => { videoRefs.current.desktop = el; }}
                          preload="auto"
                          autoPlay
                          muted
                          playsInline
                          loop
                          controls={false}
                          disablePictureInPicture
                          disableRemotePlayback
                          className="w-full h-full object-cover object-bottom pointer-events-none select-none"
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
                    <div 
                      className="block md:hidden w-full relative"
                      onClick={() => {
                        // Kullanıcı tıklayınca video'yu başlat
                        if (videoRefs.current.mobile) {
                          videoRefs.current.mobile.play().catch(() => {});
                        }
                      }}
                    >
                      {shouldLoadVideo ? (
                        <video
                          ref={(el) => { videoRefs.current.mobile = el; }}
                          preload="auto"
                          autoPlay
                          muted
                          playsInline
                          loop
                          controls={false}
                          disablePictureInPicture
                          disableRemotePlayback
                          className="w-full h-auto object-cover object-bottom pointer-events-none select-none"
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
                  onClick={handleSlideClick}
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
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-3 flex items-center gap-2 w-fit ml-auto">
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
          className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-lg circle-glow cursor-pointer"
          style={{
            filter: 'drop-shadow(0px 4px 16px rgba(22, 149, 136, 0.4))',
          }}
          onClick={() => {
            // Kullanıcı tıklayınca waves video'yu başlat
            if (wavesVideoRef.current) {
              wavesVideoRef.current.play().catch(() => {});
            }
          }}
        >
          <video
            ref={(el) => { wavesVideoRef.current = el; }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
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
