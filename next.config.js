/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // We're handling type checking separately, so we can ignore build errors here.
    ignoreBuildErrors: false,
  },
  compiler: {
    // Disabling these for the build to avoid potential issues
    // removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: [
      "vercel.app",
      "railway.app",
      "localhost",
      "images.unsplash.com",
      "via.placeholder.com",
      "picsum.photos",
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": ".",
      "@/lib": "./lib",
      "@/components": "./components",
      "@/app": "./app",
      "@/public": "./public",
      "@/data": "./data",
      "@/types": "./types",
      "@/utils": "./lib/utils",
    };
    return config;
  },
};

module.exports = nextConfig;
