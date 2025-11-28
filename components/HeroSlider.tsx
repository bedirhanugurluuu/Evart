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

  // Görsel path'lerini dinamik olarak oluştur
  const getImageSrc = (slideIndex: number, device: 'desktop' | 'mobile') => {
    const key = `${slideIndex}-${device}`;
    // EN görselleri yoksa direkt TR kullan (404 hatası önlemek için)
    const useFallback = imageErrors[key] || (locale === 'en');
    const currentLocale = useFallback ? 'tr' : locale;
    // Video slide index 0'da, görsel slide'lar index 1 ve 2'de
    // slideIndex 1 -> hero-slide1, slideIndex 2 -> hero-slide2
    const imageSlideNumber = slideIndex;
    return `/images/hero-slide${imageSlideNumber}-${currentLocale}-${device}.jpg`;
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

  // Video oynatma kontrolü - aktif slide video ise oynat
  useEffect(() => {
    const videoSlideIndex = slides.findIndex(slide => slide.type === 'video');
    const currentRealIndex = swiperRef.current?.realIndex ?? activeIndex;
    const isVideoSlideActive = currentRealIndex === videoSlideIndex;

    if (isVideoSlideActive) {
      // iOS için agresif video oynatma
      const playVideo = (video: HTMLVideoElement | null, device: string) => {
        if (!video) return;
        
        // iOS için webkit-playsinline attribute'u ekle
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('x5-playsinline', 'true');
        
        // Video zaten oynatılıyorsa tekrar başlatma
        if (!video.paused) return;
        
        // Video yüklendiyse direkt oynat
        if (video.readyState >= 2) {
          video.play().catch(err => {
            console.warn(`${device} video play error:`, err);
          });
        } else {
          // Video henüz yüklenmediyse, yüklendikten sonra oynat
          const onCanPlay = () => {
            video.play().catch(err => {
              console.warn(`${device} video play error:`, err);
            });
            video.removeEventListener('canplay', onCanPlay);
          };
          video.addEventListener('canplay', onCanPlay);
          
          // Fallback: 500ms sonra tekrar dene
          setTimeout(() => {
            if (video.readyState >= 2) {
              video.play().catch(err => {
                console.warn(`${device} video play error (retry):`, err);
              });
            }
          }, 500);
          
          // İkinci fallback: 1 saniye sonra tekrar dene
          setTimeout(() => {
            if (video.readyState >= 1) {
              video.play().catch(() => {});
            }
          }, 1000);
        }
      };

      // Desktop video oynat
      playVideo(videoRefs.current.desktop, 'Desktop');
      
      // Mobile video oynat
      playVideo(videoRefs.current.mobile, 'Mobile');
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
                    <div className="hidden md:block w-full h-full relative" style={{ height: 'calc(100vh - 80px)' }}>
                      {shouldLoadVideo ? (
                        <video
                          ref={(el) => { 
                            videoRefs.current.desktop = el;
                            if (el) {
                              // iOS için webkit-playsinline attribute'u ekle
                              el.setAttribute('webkit-playsinline', 'true');
                              el.setAttribute('x5-playsinline', 'true');
                            }
                          }}
                          autoPlay={isVideoSlideActive}
                          loop
                          muted
                          playsInline
                          preload="none"
                          controls={false}
                          disablePictureInPicture
                          disableRemotePlayback
                          className="w-full h-full object-cover object-bottom pointer-events-none select-none"
                          style={{ height: '100%', width: '100%' }}
                          onLoadedData={(e) => {
                            // iOS için: Video yüklendiğinde oynat
                            if (isVideoSlideActive) {
                              const video = e.currentTarget;
                              video.play().catch(() => {});
                            }
                          }}
                          onCanPlay={(e) => {
                            // iOS için: Video oynatılabilir olduğunda oynat
                            if (isVideoSlideActive) {
                              const video = e.currentTarget;
                              video.play().catch(() => {});
                            }
                          }}
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
                          ref={(el) => { 
                            videoRefs.current.mobile = el;
                            if (el) {
                              // iOS için webkit-playsinline attribute'u ekle
                              el.setAttribute('webkit-playsinline', 'true');
                              el.setAttribute('x5-playsinline', 'true');
                            }
                          }}
                          autoPlay={isVideoSlideActive}
                          loop
                          muted
                          playsInline
                          preload="none"
                          controls={false}
                          disablePictureInPicture
                          disableRemotePlayback
                          className="w-full h-auto object-cover object-bottom pointer-events-none select-none"
                          onLoadedData={(e) => {
                            // iOS için: Video yüklendiğinde oynat
                            if (isVideoSlideActive) {
                              const video = e.currentTarget;
                              video.play().catch(() => {});
                            }
                          }}
                          onCanPlay={(e) => {
                            // iOS için: Video oynatılabilir olduğunda oynat
                            if (isVideoSlideActive) {
                              const video = e.currentTarget;
                              video.play().catch(() => {});
                            }
                          }}
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
          className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-lg circle-glow"
          style={{
            filter: 'drop-shadow(0px 4px 16px rgba(22, 149, 136, 0.4))',
          }}
        >
          <video
            ref={(el) => {
              if (el) {
                // iOS için webkit-playsinline attribute'u ekle
                el.setAttribute('webkit-playsinline', 'true');
                el.setAttribute('x5-playsinline', 'true');
              }
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            className="w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
            onLoadedData={(e) => {
              // iOS için: Video yüklendiğinde oynat
              const video = e.currentTarget;
              video.play().catch(() => {});
            }}
            onCanPlay={(e) => {
              // iOS için: Video oynatılabilir olduğunda oynat
              const video = e.currentTarget;
              video.play().catch(() => {});
            }}
            onError={() => console.warn('Waves video error')}
          >
            <source src="/images/waves.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
