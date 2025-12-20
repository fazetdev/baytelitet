/** @type {import('next').Next.jsConfig} */
const nextConfig = {
  // AppDir is now standard, so we remove it from experimental
  experimental: {
    // If you had other experimental features, keep them here, 
    // otherwise keep this object empty or remove it.
  },
  images: {
    unoptimized: true, // Helpful for mobile/Termux environments
    domains: ['images.unsplash.com'], // Add any other image providers you use
  },
  // This helps bypass the Turbo WASM issue in some environments
  typescript: {
    ignoreBuildErrors: false, 
  }
};

module.exports = nextConfig;
