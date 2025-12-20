/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'unpkg.com' }
    ],
  },
  typescript: {
    ignoreBuildErrors: false
  },
  // Turbopack configuration
  turbopack: {},

  // For external packages in server components
  serverExternalPackages: [],

  reactStrictMode: true,
};

module.exports = nextConfig;
