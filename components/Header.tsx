"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Evart Logo"
              className="h-16 w-auto"
              loading="eager"
            />
          </Link>

          {/* Desktop Menu - Kalan genişliğin tam ortasında */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            <Link href="/about" className="hover:text-gray-900 text-lg transition font-gotham-regular nav-link">
              Hakkımızda
            </Link>
            <Link href="/oran" className="hover:text-gray-900 text-lg transition font-gotham-regular nav-link">
              Evart Oran
            </Link>
            <Link href="#" className="hover:text-gray-900 text-lg transition font-gotham-regular nav-link">
              Evart Yalıkavak
            </Link>
            <Link href="#" className="hover:text-gray-900 text-lg transition font-gotham-regular nav-link">
              İletişim
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 ml-auto"
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
                href="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="font-gotham-book text-xl text-gray-700 hover:text-gray-900 transition-colors"
              >
                Hakkımızda
              </Link>
              <Link 
                href="/oran" 
                onClick={() => setIsMenuOpen(false)}
                className="font-gotham-book text-xl text-gray-700 hover:text-gray-900 transition-colors"
              >
                Evart Oran
              </Link>
              <Link 
                href="#" 
                onClick={() => setIsMenuOpen(false)}
                className="font-gotham-book text-xl text-gray-700 hover:text-gray-900 transition-colors"
              >
                Evart Yalıkavak
              </Link>
              <Link 
                href="#" 
                onClick={() => setIsMenuOpen(false)}
                className="font-gotham-book text-xl text-gray-700 hover:text-gray-900 transition-colors"
              >
                İletişim
              </Link>
            </nav>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
    </header>
  );
}

