'use client';

import { useParams } from 'next/navigation';
import { Locale } from '@/i18n';
import trMessages from '@/messages/tr.json';
import enMessages from '@/messages/en.json';

const messages = {
  tr: trMessages,
  en: enMessages,
};

export function useTranslations() {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'tr';
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, locale };
}

