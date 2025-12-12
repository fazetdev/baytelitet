/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable Turbopack for Next.js 16
  experimental: {
    // Correct key is 'turbopack' not 'turbo'
    turbopack: {
      // Turbopack configuration
    }
  }
}

module.exports = nextConfig
