/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false, // ← CHANGE THIS: Enable optimization for local images
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'unpkg.com' }
    ],
  },
  typescript: {
    ignoreBuildErrors: false
  },
  turbopack: {},
  serverExternalPackages: [],
  reactStrictMode: true,
};

module.exports = nextConfig;
