import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // ✅ Allow images from Cloudinary
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint during production builds
  },
};

export default nextConfig;
