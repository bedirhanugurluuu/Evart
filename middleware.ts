import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root path (/) - shows TR content directly, no redirect
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Redirect /tr and /tr/* to / and /* (TR is default, no /tr in URL)
  if (pathname === '/tr' || pathname === '/tr/') {
    request.nextUrl.pathname = '/';
    return NextResponse.redirect(request.nextUrl, 301); // Permanent redirect
  }
  
  if (pathname.startsWith('/tr/')) {
    // Remove /tr prefix
    request.nextUrl.pathname = pathname.replace('/tr', '');
    return NextResponse.redirect(request.nextUrl, 301); // Permanent redirect
  }

  // Check if there is any supported locale in the pathname (only /en now)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has a locale (like /en), continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // For any other path without locale, assume TR (default) and continue
  // No redirect needed - it's already at root level
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), static files, and assets
    '/((?!_next|api|favicon.ico|evart-favicon.ico|evart-icon-48.png|evart-icon-96.png|evart-apple-icon.png|logo.png|images|fonts|.*\\..*).*)',
  ],
};

