 import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000"
       }
    ],
  } 
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform({
    persist: {
      path: "../db/db-tmp/v3"
    }
  });
}

export default nextConfig;
