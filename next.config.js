/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'seoulkimchi.com.vn' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }
    ]
  },
  // Removed output: 'export' to enable API routes for Vercel deployment
  trailingSlash: true
};

module.exports = nextConfig;

