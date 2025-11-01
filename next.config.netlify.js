/**
 * Next.js config for Netlify static export
 * 
 * Sử dụng khi muốn deploy static site lên Netlify
 * Build command: next build --config next.config.netlify.js
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static export for Netlify
  trailingSlash: true,
  distDir: 'out',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'seoulkimchi.com.vn' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }
    ],
    unoptimized: true  // Required for static export
  }
};

module.exports = nextConfig;
