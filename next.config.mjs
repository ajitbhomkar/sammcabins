/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you use only local images, you can remove the images config entirely.
  // If you need remote images, use remotePatterns as below:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all domains, or specify your domain(s)
      },
    ],
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