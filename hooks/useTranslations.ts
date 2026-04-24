'use client';

import { useParams } from 'next/navigation';
import { Locale, defaultLocale, locales } from '@/i18n';
import trMessages from '@/messages/tr.json';
import enMessages from '@/messages/en.json';

const messages = {
  tr: trMessages,
  en: enMessages,
};

export function useTranslations() {
  const params = useParams();
  const paramLocale = params?.locale;
  const normalizedLocale = Array.isArray(paramLocale) ? paramLocale[0] : paramLocale;
  const locale = (normalizedLocale && locales.includes(normalizedLocale as Locale)
    ? (normalizedLocale as Locale)
    : defaultLocale);

  const getValueByKey = (key: string): unknown => {
    const keys = key.split('.');
    let value: any = messages[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value;
  };

  const t = (key: string): string => {
    const value = getValueByKey(key);
    return typeof value === 'string' ? value : key;
  };

  const raw = <T = unknown>(key: string): T => {
    const value = getValueByKey(key);
    return (value ?? key) as T;
  };

  return { t, raw, locale };
}

