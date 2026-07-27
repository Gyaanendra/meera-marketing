/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.24'],
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', '@studio-freight/lenis'],
  },
};

module.exports = nextConfig;