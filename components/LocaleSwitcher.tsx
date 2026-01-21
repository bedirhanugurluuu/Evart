'use client';

import React from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Locale, locales, localeNames } from '@/i18n';

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = (params?.locale as Locale) || 'tr';

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname
    let pathWithoutLocale = pathname;
    
    // If current path has locale prefix, remove it
    if (pathname.startsWith(`/${currentLocale}/`) || pathname === `/${currentLocale}`) {
      pathWithoutLocale = pathname.slice(`/${currentLocale}`.length) || '/';
    }
    // If current path is root and we're on TR, path is already without locale
    else if (currentLocale === 'tr' && !pathname.startsWith('/en')) {
      pathWithoutLocale = pathname;
    }
    
    // Build new path: TR uses root, EN uses /en prefix
    let newPath: string;
    if (newLocale === 'tr') {
      // TR: root URL (no /tr prefix)
      newPath = pathWithoutLocale === '/' ? '/' : pathWithoutLocale;
    } else {
      // EN: /en prefix
      newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    }
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale, index) => (
        <React.Fragment key={locale}>
          <button
            onClick={() => {
              if (locale !== currentLocale) {
                switchLocale(locale);
              }
            }}
            className={`font-gotham-bold text-sm uppercase transition-colors ${
              locale === currentLocale
                ? 'text-gray-900 locale-switcher-link'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {localeNames[locale].toUpperCase()}
          </button>
          {index < locales.length - 1 && (
            <span className="text-gray-400 text-sm">-</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

