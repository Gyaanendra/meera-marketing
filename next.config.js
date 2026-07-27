/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', '@studio-freight/lenis'],
  },
};

module.exports = nextConfig;