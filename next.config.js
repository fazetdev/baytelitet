/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'unpkg.com' }
    ],
  },
  typescript: {
    ignoreBuildErrors: false
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
