/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  turbopack: {}, // disables Turbopack errors
};

module.exports = nextConfig;
