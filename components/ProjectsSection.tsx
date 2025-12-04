'use client';

import { useTranslations } from '@/hooks/useTranslations';
import Link from 'next/link';

export default function ProjectsSection() {
  const { t, locale } = useTranslations();
  
  return (
    <section className="w-full">
      {/* Full Width Stripe */}
      <div 
        className="w-full py-6 md:py-8"
        style={{ backgroundColor: "#869e9e" }}
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-40">
            {/* Projelerimizi Keşfedin - 2 Satır */}
            <div className="font-gotham-bold uppercase text-white text-lg md:text-2xl text-center md:text-left">
              {t('home.projectsSection.discover')}
              <br />
              {t('home.projectsSection.discoverLine2')}
            </div>

            {/* Evart Oran ve Evart Yalıkavak - Yan Yana */}
            <div className="flex items-center gap-10 md:gap-40">
              <Link 
                href={`/${locale}/evart-oran`}
                className="font-gotham-book uppercase text-white text-base md:text-xl hover:opacity-80 transition-opacity cursor-pointer"
              >
                {t('home.projectsSection.evartOran')}
              </Link>
              <Link 
                href={`/${locale}/evart-yalikavak`}
                className="font-gotham-book uppercase text-white text-base md:text-xl hover:opacity-80 transition-opacity cursor-pointer"
              >
                {t('home.projectsSection.evartYalikavak')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

