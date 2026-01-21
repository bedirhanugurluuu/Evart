import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/favicon.ico',
          '/evart-favicon.ico',
          '/evart-icon-48.png',
          '/evart-icon-96.png',
          '/evart-apple-icon.png',
          '/fonts/',
          '/images/',
        ],
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}sitemap.xml`,
  };
}

