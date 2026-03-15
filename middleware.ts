import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const PROTECTED_ROUTES = ['/profile', '/my-ads', '/favorites', '/add-ad'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if it's a protected route
  // Handles locale-prefixed routes like /ar/profile, /en/my-ads, etc.
  const isProtected = PROTECTED_ROUTES.some(route => {
    // Check exact match or start with for the route
    const isDirectMatch = pathname === route || pathname.startsWith(`${route}/`);
    
    // Check match with locale prefix
    const isLocaleMatch = routing.locales.some(locale => 
      pathname === `/${locale}${route}` || pathname.startsWith(`/${locale}${route}/`)
    );
    
    return isDirectMatch || isLocaleMatch;
  });

  const token = request.cookies.get('auth_token')?.value;

  if (isProtected && !token) {
    // Extract locale from path to preserve it in redirect
    const segments = pathname.split('/');
    const firstSegment = segments[1];
    const locale = routing.locales.includes(firstSegment as any) ? firstSegment : routing.defaultLocale;
    
    const loginUrl = new URL(`/${locale}/sign-in`, request.url);
    // Note: The user had a 'sign-in' page in history, checking if it exists
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  // Matcher for internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
