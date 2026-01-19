import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root path (/) - let it be handled by app/page.tsx for proper SEO
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has a locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect if there is no locale (except root)
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Redirect to the new URL
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), static files, and assets
    '/((?!_next|api|favicon.ico|evart-favicon.ico|evart-icon-48.png|evart-icon-96.png|evart-apple-icon.png|logo.png|images|fonts|.*\\..*).*)',
  ],
};

