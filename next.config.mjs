/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['saamcabins.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;