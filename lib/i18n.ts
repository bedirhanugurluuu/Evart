import { Locale } from '@/i18n';

// Translation messages type
export type Messages = typeof import('@/messages/tr.json');

// Get translations for a locale
export async function getTranslations(locale: Locale): Promise<Messages> {
  const messages = await import(`@/messages/${locale}.json`);
  return messages.default;
}

