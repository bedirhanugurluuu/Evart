import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');
  const defaultLocale = 'tr'; // Varsayılan dil TR
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. ROOT URL - En yüksek öncelik (ŞART - Google için ana sayfa)
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // 2. Ana dil sayfaları (TR - priority 1.0, EN - priority 0.9)
  const pages = [
    { path: '', priority: { tr: 1.0, en: 0.9 }, changeFrequency: 'weekly' as const },
    { path: 'about', priority: { tr: 0.8, en: 0.8 }, changeFrequency: 'monthly' as const },
    { path: 'evart-oran', priority: { tr: 0.9, en: 0.9 }, changeFrequency: 'weekly' as const },
    { path: 'evart-yalikavak', priority: { tr: 0.9, en: 0.9 }, changeFrequency: 'weekly' as const },
    { path: 'contact', priority: { tr: 0.7, en: 0.7 }, changeFrequency: 'monthly' as const },
  ];

  pages.forEach(page => {
    // TR (varsayılan dil - yüksek öncelik)
    sitemapEntries.push({
      url: `${baseUrl}/tr${page.path ? `/${page.path}` : ''}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority.tr,
    });

    // EN (ikincil dil - daha düşük öncelik)
    sitemapEntries.push({
      url: `${baseUrl}/en${page.path ? `/${page.path}` : ''}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority.en,
    });
  });

  return sitemapEntries;
}

