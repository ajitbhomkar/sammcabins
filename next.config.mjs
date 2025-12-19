/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['saamcabins.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
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