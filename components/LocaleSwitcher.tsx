'use client';

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
    if (pathname.startsWith(`/${currentLocale}`)) {
      pathWithoutLocale = pathname.slice(`/${currentLocale}`.length) || '/';
    }
    // Add new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          // Aktif olmayan dile geç
          const otherLocale = currentLocale === 'tr' ? 'en' : 'tr';
          switchLocale(otherLocale);
        }}
        className="font-gotham-bold text-sm text-gray-900 locale-switcher-link uppercase"
      >
        {localeNames[currentLocale].toUpperCase()}
      </button>
    </div>
  );
}

