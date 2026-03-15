import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher for internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
