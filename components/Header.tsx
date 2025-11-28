"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const { t, locale } = useTranslations();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Aktif sayfa kontrolü
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === `/${locale}` || pathname === '/tr' || pathname === '/en';
    }
    return pathname === `/${locale}${path}` || pathname === path;
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav className="container-custom py-2">
        <div className="flex items-center">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Evart Logo"
              width={120}
              height={64}
              className="h-12 md:h-16 w-auto"
              priority
              quality={90}
            />
          </Link>

          {/* Desktop Menu - Kalan genişliğin tam ortasında */}
          <div className="hidden lg:flex flex-1 items-center uppercase justify-center space-x-8">
            <Link 
              href={`/${locale}/about`} 
              className={`hover:text-gray-900 text-base transition font-gotham-book nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
            >
              {t('nav.about')}
            </Link>
            <Link 
              href={`/${locale}/evart-oran`} 
              className={`hover:text-gray-900 text-base transition font-gotham-book nav-link ${isActive('/evart-oran') ? 'nav-link-active' : ''}`}
            >
              {t('nav.evartOran')}
            </Link>
            <Link 
              href={`/${locale}/evart-yalikavak`} 
              className={`hover:text-gray-900 text-base transition font-gotham-book nav-link ${isActive('/evart-yalikavak') ? 'nav-link-active' : ''}`}
            >
              {t('nav.evartYalikavak')}
            </Link>
            <Link 
              href={`/${locale}/contact`} 
              className={`hover:text-gray-900 text-base transition font-gotham-book nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Locale Switcher */}
          <div className="hidden lg:flex items-center ml-4">
            <LocaleSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Sağdan Full Açılan */}
        <div 
          className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full p-8">
            {/* Close Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900"
                aria-label="Close Menu"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col space-y-6">
              <Link 
                href={`/${locale}/about`} 
                onClick={() => setIsMenuOpen(false)}
                className={`font-gotham-book text-xl text-gray-700 hover:text-gray-900 transition-colors nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
              >
                {t('nav.about')}
              </Link>
              <Link 
                href={`/${locale}/evart-oran`} 
                onClick={() => setIsMenuOpen(false)}
                className={`font-gotham-book text-xl text-gray-700 hover:text-gray-900 transition-colors nav-link ${isActive('/evart-oran') ? 'nav-link-active' : ''}`}
              >
                {t('nav.evartOran')}
              </Link>
              <Link 
                href={`/${locale}/evart-yalikavak`} 
                onClick={() => setIsMenuOpen(false)}
                className={`font-gotham-book text-xl text-gray-700 hover:text-gray-900 transition-colors nav-link ${isActive('/evart-yalikavak') ? 'nav-link-active' : ''}`}
              >
                {t('nav.evartYalikavak')}
              </Link>
              <Link 
                href={`/${locale}/contact`} 
                onClick={() => setIsMenuOpen(false)}
                className={`font-gotham-book text-xl text-gray-700 hover:text-gray-900 transition-colors nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
              >
                {t('nav.contact')}
              </Link>
            </nav>

            {/* Locale Switcher - Mobile */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <LocaleSwitcher />
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
    </header>
  );
}

