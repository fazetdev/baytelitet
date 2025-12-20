/** @type {import('next').Next.jsConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'unpkg.com',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: false, 
  }
};

module.exports = nextConfig;
