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


const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  reactStrictMode: true,



  // Optional subpath deploy (e.g. sque.ai/v2). Set NEXT_PUBLIC_BASE_PATH=/v2 there.
  // Unset = site root (Netlify, Vercel, local prod builds).
  ...(process.env.NEXT_PUBLIC_BASE_PATH?.trim()
    ? { basePath: process.env.NEXT_PUBLIC_BASE_PATH.trim().replace(/\/$/, '') }
    : {}),

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
