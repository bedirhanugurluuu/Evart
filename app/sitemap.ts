import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');
  const locales = ['tr', 'en'];
  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: 'about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: 'evart-oran', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'evart-yalikavak', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'contact', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    pages.forEach(page => {
      const urlPath = page.path ? `${locale}/${page.path}` : locale;
      sitemapEntries.push({
        url: `${baseUrl}/${urlPath}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    });
  });

  return sitemapEntries;
}

