import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://evartlife.com').replace(/\/$/, '');

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Root layout mutlaka <html> ve <body> tag'lerine sahip olmalı
  return (
    <html>
      <head>
        {/* Favicon - Google için tüm boyutlar ve formatlar - Yeni isimlerle cache bypass */}
        <link rel="shortcut icon" type="image/x-icon" media="all" href={`${baseUrl}/evart-favicon.ico`} />
        <link rel="icon" type="image/x-icon" href={`${baseUrl}/evart-favicon.ico`} />
        <link rel="icon" type="image/png" sizes="48x48" href={`${baseUrl}/evart-icon-48.png`} />
        <link rel="icon" type="image/png" sizes="96x96" href={`${baseUrl}/evart-icon-96.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${baseUrl}/evart-apple-icon.png`} />
        {/* DNS Preconnect - Vercel ve CDN için */}
        <link rel="dns-prefetch" href="https://evart.vercel.app" />
        <link rel="preconnect" href="https://evart.vercel.app" crossOrigin="anonymous" />
        {/* Google Fonts için preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload kritik font dosyaları */}
        <link
          rel="preload"
          href="/fonts/Gotham-Book.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Gotham-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FuturaPT-Book.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FuturaPT-Demi.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Gotham-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Service Worker 206 hatası için */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZHZ18CS43J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZHZ18CS43J');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

