"use client";

import {
  EVART_ORAN_LOFT_IMAGES,
  EVART_ORAN_1PLUS1_IMAGES,
  EVART_ORAN_2PLUS1_IMAGES,
} from "../lib/evart-oran-sample-units-media";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "@/hooks/useTranslations";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SLIDE_W = 600;
const SLIDE_H = 480;

function slideWidthClass() {
  return "w-[min(600px,calc(100vw-7rem))]";
}

type CarouselProps = {
  headingId: string;
  kickerKey: "sample1Plus1Kicker" | "sample2Plus1Kicker";
  titleKey: "sample1Plus1Title" | "sample2Plus1Title";
  slideAltKey: "sample1Plus1SlideAlt" | "sample2Plus1SlideAlt";
  images: readonly string[];
};

function UnitCarousel({
  headingId,
  kickerKey,
  titleKey,
  slideAltKey,
  images,
}: CarouselProps) {
  const { t } = useTranslations();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);

  const slides = useMemo(
    () =>
      images.map((src, i) => ({
        src,
        key: `${src}-${i}`,
      })),
    [images],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    queueMicrotask(onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const dotCount = emblaApi?.scrollSnapList().length ?? slides.length;

  return (
    <section
      className="w-full text-[#1f3a40] pt-6 lg:pt-10"
      aria-labelledby={headingId}
    >
      <p className="px-4 text-center tracking-tight text-[#0f677d]">
        {t(`ProjectEvartOran.${kickerKey}`)}
      </p>
      <h2
        id={headingId}
        className="px-4 pb-6 pt-6 text-center font-serif text-3xl tracking-tight text-[#1f3a40] md:text-5xl md:pb-10"
      >
        {t(`ProjectEvartOran.${titleKey}`)}
      </h2>

      <div className="relative w-full">
        <button
          type="button"
          aria-label={t("PhotoGallery.prev")}
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#0003] text-white transition-all duration-150 active:scale-[0.92] md:left-5 md:h-12 md:w-12"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              d="M15 18l-6-6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label={t("PhotoGallery.next")}
          onClick={scrollNext}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#0003] text-white transition-all duration-150 active:scale-[0.92] md:right-5 md:h-12 md:w-12"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path
              d="M9 6l6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className={`overflow-hidden transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          ref={(node) => {
            emblaRef(node);
            viewportRef.current = node;
          }}
        >
          <div className="flex touch-pan-y gap-6">
            {slides.map((slide, index) => (
              <div
                key={slide.key}
                className={`relative shrink-0 overflow-hidden bg-[#d1dfdf]/40 ${slideWidthClass()}`}
                style={{ height: SLIDE_H }}
              >
                <img
                  src={slide.src}
                  alt={
                    slideAltKey === "sample1Plus1SlideAlt"
                      ? `${t("ProjectEvartOran.sample1Plus1SlideAlt")} ${index + 1}`
                      : `${t("ProjectEvartOran.sample2Plus1SlideAlt")} ${index + 1}`
                  }
                  width={SLIDE_W}
                  height={SLIDE_H}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) min(600px, 100vw), 600px"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[#000000]/20"
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-2 px-4"
          role="tablist"
          aria-label={t("PhotoGallery.dotsLabel")}
        >
          {Array.from({ length: dotCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-label={`${t("PhotoGallery.goToSlide")} ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 cursor-pointer rounded-full transition-all duration-200 active:scale-75 ${
                selected === i
                  ? "w-8 bg-[#f9f6f3]"
                  : "w-2 bg-[#f9f6f3]/30 hover:bg-[#f9f6f3]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function EvartOranSampleCarousels() {
  const { t } = useTranslations();

  return (
    <div className="border-t border-[#d1dfe0] px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-[1200px]">
        <UnitCarousel
          headingId="evart-oran-sample-1plus1-heading"
          kickerKey="sample1Plus1Kicker"
          titleKey="sample1Plus1Title"
          slideAltKey="sample1Plus1SlideAlt"
          images={EVART_ORAN_1PLUS1_IMAGES}
        />
        <UnitCarousel
          headingId="evart-oran-sample-2plus1-heading"
          kickerKey="sample2Plus1Kicker"
          titleKey="sample2Plus1Title"
          slideAltKey="sample2Plus1SlideAlt"
          images={EVART_ORAN_2PLUS1_IMAGES}
        />
        <section
          className="w-full pb-2 pt-10 text-[#1f3a40] lg:pt-14"
          aria-labelledby="evart-oran-sample-loft-heading"
        >
          <p className="px-4 text-center tracking-tight text-[#0f677d]">
            {t("ProjectEvartOran.sampleLoftKicker")}
          </p>
          <h2
            id="evart-oran-sample-loft-heading"
            className="px-4 pb-8 pt-6 text-center font-serif text-3xl tracking-tight text-[#1f3a40] md:text-5xl"
          >
            {t("ProjectEvartOran.sampleLoftTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:flex md:gap-5">
            {EVART_ORAN_LOFT_IMAGES.map((src: string, index: number) => (
              <div
                key={src}
                className={`relative overflow-hidden bg-[#d1dfdf]/40 ${
                  index === 2
                    ? "aspect-4/3 md:w-[20%] md:aspect-3/4"
                    : "aspect-4/3 md:w-[40%]"
                }`}
              >
                <img
                  src={src}
                  alt={`${t("ProjectEvartOran.sampleLoftImageAlt")} ${index + 1}`}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
