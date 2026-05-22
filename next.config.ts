import path from 'path';
import type { NextConfig } from 'next';
import dotenv from 'dotenv';

const cwd = process.cwd();
const maybeRoot = path.resolve(cwd, '..', '..');
[
  path.join(maybeRoot, '.env'),
  path.join(maybeRoot, '.env.local'),
  path.join(cwd, '.env'),
  path.join(cwd, '.env.local'),
].forEach((envPath) => dotenv.config({ path: envPath }));

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,

  // Redirect old /bookings (owner dashboard) to /dashboard/bookings so it doesn't collide with public /book/*
  async redirects() {
    return [
      { source: '/bookings', destination: '/dashboard/transactions', permanent: true },
      { source: '/dashboard/bookings', destination: '/dashboard/transactions', permanent: true },
    ];
  },

  // Serve V2 at /v2 path in production (sque.ai/v2/*). In dev, no basePath so localhost/ works.
  ...(isDev ? {} : { basePath: '/v2' }),

  // Allowed remote image routes 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'videos.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Allow dev access from LAN IP (e.g. 192.168.0.12) and localhost to avoid cross-origin warning
  allowedDevOrigins: [
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'http://192.168.0.12:3001',
    'http://192.168.0.12:3003',
  ],

  // Optimize package imports for faster builds
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
    ],
  },
};


// Only wrap with Sentry in production builds (faster dev builds)
const finalConfig = nextConfig;

export default finalConfig;
