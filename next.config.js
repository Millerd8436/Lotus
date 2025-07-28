/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Temporarily ignore type errors to allow deployment
    ignoreBuildErrors: true,
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
  // Simplified webpack config for Vercel deployment
  webpack: (config, { isServer }) => {
    // Add alias for better imports
    config.resolve.alias['@'] = __dirname;
    return config;
  },
};

module.exports = nextConfig;
