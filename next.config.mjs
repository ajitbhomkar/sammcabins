/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed images config to allow all local images
  typescript: {
    ignoreBuildErrors: false,
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Reduce memory usage
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  // Enable caching
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;