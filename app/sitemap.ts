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

  // 2. TR sayfaları (root URL'de - /tr yok)
  const trPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const }, // Already added as root
    { path: 'about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: 'evart-oran', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'evart-yalikavak', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'contact', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  // TR pages at root (no /tr prefix)
  trPages.forEach(page => {
    if (page.path !== '') { // Skip root, already added
      sitemapEntries.push({
        url: `${baseUrl}/${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  });

  // 3. EN sayfaları (/en prefix ile)
  const enPages = [
    { path: '', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: 'evart-oran', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'evart-yalikavak', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'contact', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  enPages.forEach(page => {
    sitemapEntries.push({
      url: `${baseUrl}/en${page.path ? `/${page.path}` : ''}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  return sitemapEntries;
}

