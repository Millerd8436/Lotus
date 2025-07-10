// next.config.js - Comprehensive Vercel optimization for TypeScript/Next.js projects
/** @type {import('next').NextConfig} */

// Deployment platform detection (Vercel-first for TypeScript projects)
const isVercelDeploy = process.env.VERCEL === '1';
const isRailwayDeploy = process.env.RAILWAY_ENVIRONMENT;
const isStaticExport = process.env.NEXT_EXPORT === '1';

// Primary: Vercel (serverless, TypeScript-optimized)
// Secondary: Railway (standalone, cost-effective)
// Fallback: Static export
const outputMode = isStaticExport ? 'export' : 
                  isRailwayDeploy ? 'standalone' : 
                  undefined; // Default to Vercel serverless

console.log('⚡ Vercel-Optimized TypeScript Configuration:');
console.log('- Platform: Vercel (Primary for TS/JS/TSX) | Railway (Cost Alternative)');
console.log('- Output Mode:', outputMode || 'serverless (Vercel-optimized)');
console.log('- TypeScript Build:', 'Comprehensive Vercel optimizations enabled');
console.log('- Performance:', 'Advanced bundling and caching enabled');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // TypeScript compilation optimizations
  typescript: {
    // Enable build-time type checking for better TS/TSX experience
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: false, // Strict TypeScript checking
  },

  // Vercel-optimized output (undefined = serverless)
  ...(outputMode && { output: outputMode }),

  // Enhanced performance optimizations for Vercel
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'react',
      'react-dom', 
      'next',
      '@types/node',
      'lodash',
      'date-fns'
    ],
    serverComponentsExternalPackages: [],
    // Vercel-specific TypeScript optimizations
    turbo: {
      rules: {
        '*.ts': {
          loaders: ['@vercel/build-utils'],
          as: '*.js',
        },
        '*.tsx': {
          loaders: ['@vercel/build-utils'],
          as: '*.jsx',
        },
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Advanced compiler optimizations for TypeScript
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    // Enhanced TypeScript compilation
    styledComponents: true,
  },

  // Static file serving optimizations
  trailingSlash: false,

  // Environment variables
  env: {
    DEPLOYMENT_PLATFORM: isVercelDeploy ? 'vercel' : isRailwayDeploy ? 'railway' : 'other',
    TYPESCRIPT_BUILD: 'vercel-optimized',
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Redirects for legacy routes (Vercel edge functions)
  async redirects() {
    return [];
  },

  // API routes (TypeScript-optimized for Vercel edge functions)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },

  // Enhanced image optimization for Vercel
  images: {
    domains: [
      'vercel.app',
      'railway.app',
      'localhost',
      'images.unsplash.com',
      'via.placeholder.com',
      'picsum.photos'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Use unoptimized images for static export only
    ...(isStaticExport && { unoptimized: true }),
  },

  // Comprehensive security headers for Vercel
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Advanced webpack configuration for Vercel optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Enhanced TypeScript path resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": ".",
      "@/lib": "./lib",
      "@/components": "./components",
      "@/app": "./app",
      "@/pages": "./pages",
      "@/public": "./public",
      "@/data": "./data",
      "@/types": "./types",
      "@/utils": "./lib/utils",
    };

    // TypeScript module resolution enhancements
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

    // Performance optimizations for Vercel
    if (!dev && !isServer) {
      // Bundle analyzer in production
      if (process.env.ANALYZE) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../bundle-analysis.html',
          })
        );
      }

      // Optimize chunks for Vercel serverless functions
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 20,
            reuseExistingChunk: true,
          },
          typescript: {
            test: /[\\/]node_modules[\\/](@types|typescript)[\\/]/,
            name: 'typescript',
            priority: 30,
            reuseExistingChunk: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };

      // Minimize bundle size for Vercel
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Tree shaking optimizations
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: [
            ['import', {
              libraryName: 'lodash',
              libraryDirectory: '',
              camel2DashComponentName: false,
            }, 'lodash'],
          ],
        },
      },
    });

    return config;
  },

  // Vercel performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
