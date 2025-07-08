// next.config.js - Next.js configuration for Vercel deployment
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Enable experimental features for better performance
  experimental: {
    // Enable edge runtime for better performance
    runtime: "experimental-edge",
  },

  // Static file serving from public directory
  trailingSlash: false,

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Redirects for legacy routes (if needed)
  async redirects() {
    return [];
  },

  // API routes configuration
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },

  // Image optimization
  images: {
    domains: [],
    unoptimized: true, // For static export compatibility
  },

  // Output configuration for Vercel
  output: "standalone",

  // Webpack configuration for custom modules
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Allow importing from lib directory
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/lib": "./lib",
      "@/components": "./components",
      "@/pages": "./pages",
      "@/public": "./public",
    };

    return config;
  },
};

module.exports = nextConfig;
