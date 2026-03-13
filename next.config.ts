import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'souqshamel.com',
        port: '',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'souqshamel.com',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);