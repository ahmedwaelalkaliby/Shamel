import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const PROTECTED_ROUTES = ['/profile', '/my-ads', '/favorites', '/add-ad'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isProtected = PROTECTED_ROUTES.some(route => {
    const isDirectMatch = pathname === route || pathname.startsWith(`${route}/`);
    const isLocaleMatch = routing.locales.some(locale => 
      pathname === `/${locale}${route}` || pathname.startsWith(`/${locale}${route}/`)
    );
    
    return isDirectMatch || isLocaleMatch;
  });

  const token = request.cookies.get('auth_token')?.value;

  if (isProtected && !token) {
    const segments = pathname.split('/');
    const firstSegment = segments[1];
    const locale = routing.locales.includes(firstSegment as any) ? firstSegment : routing.defaultLocale;
    const loginUrl = new URL(`/${locale}/sign-in`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
