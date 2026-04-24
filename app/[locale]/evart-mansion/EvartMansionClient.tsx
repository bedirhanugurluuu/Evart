"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EVART_MANSION_MEDIA } from "@/lib/evart-mansion-media";
import { useTranslations } from "@/hooks/useTranslations";
import Link from "next/link";

type LocationMetric = { label: string; value: string };
type SectionItem = {
  kicker: string;
  title: string;
  subtitle?: string;
  body: string;
  body2?: string;
  bullets?: string[];
  metrics?: LocationMetric[];
  imageAlt: string;
};

export default function EvartMansionClient() {
  const { t, raw } = useTranslations();
  const sections = raw<SectionItem[]>("ProjectEvartEstates.sections");
  const contentSections = sections.slice(0);

  return (
    <main className="min-h-screen bg-[#f9f6f3]">
      <Header />
      <article
        id="project-icerik"
        className="relative z-10 bg-[#f9f6f3] text-[#1f3a40]"
      >
        <section className="relative w-full h-[400px] md:h-[400px] overflow-hidden">
          <img
            src="/images/evart-estates.jpeg"
            alt={t("ProjectEvartEstates.hero.imageAlt")}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex items-center px-6 lg:px-10">
            <div className="mx-auto w-full max-w-[1200px] text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
                {t("ProjectEvartEstates.hero.title")}
              </p>
              <h1 className="mt-3 max-w-3xl font-serif text-4xl tracking-tight md:text-5xl">
                {t("ProjectEvartEstates.hero.subtitle")}
              </h1>
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/90 md:text-base">
                {t("ProjectEvartEstates.hero.description")}
              </p>
            </div>
          </div>
        </section>

        {contentSections.map((section, index) => {
          const mediaSrc = EVART_MANSION_MEDIA[(index + 0) % EVART_MANSION_MEDIA.length];
          const imageRight = index % 2 === 1;

          return (
            <section
              key={`${section.kicker}-${section.title}-${index}`}
              className="border-t border-[#d1dfe0] px-6 py-16 lg:px-10 lg:py-24"
            >
            <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className={imageRight ? "order-2" : "order-1"}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0f677d]">
                    {section.kicker}
                </p>
                <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
                    {section.title}
                </h2>
                {section.subtitle ? (
                    <p className="mt-4 text-lg font-medium text-[#0f677d] md:text-xl">
                    {section.subtitle}
                    </p>
                ) : null}
                <p className="mt-6 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
                    {section.body}
                </p>
                {section.body2 ? (
                    <p className="mt-4 text-sm leading-relaxed text-[#1f3a40]/88 md:text-base md:leading-relaxed">
                    {section.body2}
                    </p>
                ) : null}
                {section.bullets?.length ? (
                    <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#1f3a40]/90 md:text-base">
                    {section.bullets.map((line) => (
                        <li key={line} className="flex gap-2">
                        <span className="text-[#0f677d]" aria-hidden>
                            ·
                        </span>
                        <span>{line}</span>
                        </li>
                    ))}
                    </ul>
                ) : null}
                {section.metrics?.length ? (
                    <dl className="mt-6 space-y-3 border border-[#d1dfe0] bg-white/80 p-5">
                    {section.metrics.map((metric) => (
                        <div
                        key={metric.label}
                        className="flex items-baseline justify-between gap-4 border-b border-[#d1dfe0]/80 pb-3 last:border-0 last:pb-0"
                        >
                        <dt className="text-sm text-[#1f3a40]/80">{metric.label}</dt>
                        <dd className="font-serif text-lg text-[#0f677d]">{metric.value}</dd>
                        </div>
                    ))}
                    </dl>
                ) : null}
                </div>

                <div
                className={`relative aspect-4/3 overflow-hidden bg-[#d1dfdf]/50 ${imageRight ? "order-1" : "order-2"}`}
                >
                <img
                    src={mediaSrc}
                    alt={section.imageAlt}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    decoding="async"
                />
                </div>
            </div>
            </section>
          );
        })}
      </article>
      <Footer />
    </main>
  );
}
