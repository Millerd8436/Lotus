import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { OptimizedLotusProvider } from "@/components/providers/OptimizedLotusProvider";
import { NotificationContainer, ModeSelector } from "@/components/shared";
import type { Metadata } from "next";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true 
});

export const metadata: Metadata = {
  title: "Lotus - Scientific Loan Research Platform",
  description:
    "Comprehensive research platform analyzing deceptive patterns in online lending with rigorous IV-DV statistical methodology",
  keywords: [
    "loan research simulator",
    "predatory lending analysis", 
    "UX deception patterns",
    "consumer protection research",
    "behavioral economics",
    "statistical analysis platform",
    "CFPB research",
    "usury detection",
  ],
  authors: [{ name: "Lotus Research Team" }],
  creator: "Lotus Research Platform",
  publisher: "Lotus Research Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lotus-research.vercel.app"),
  openGraph: {
    title: "Lotus - Scientific Loan Research Platform",
    description:
      "Comprehensive research platform analyzing deceptive patterns in online lending with rigorous statistical methodology",
    url: "https://lotus-research.vercel.app",
    siteName: "Lotus Research Platform",
    images: [
      {
        url: "/og-research.png",
        width: 1200,
        height: 630,
        alt: "Lotus Scientific Research Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus - Scientific Loan Research Platform",
    description:
      "Rigorous analysis of deceptive patterns in online lending with statistical methodology",
    images: ["/og-research.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lotus Research" />

        {/* Critical resource preloading */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://vercel.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />

        {/* Optimized favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data for Research Platform */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ResearchProject",
              name: "Lotus Loan Research Platform",
              description:
                "Scientific analysis of deceptive patterns in online lending with rigorous statistical methodology",
              url: "https://lotus-research.vercel.app",
              applicationCategory: "ResearchApplication",
              operatingSystem: "Web Browser",
              creator: {
                "@type": "Organization",
                name: "Lotus Research Team",
                description: "Consumer protection and behavioral economics research"
              },
              funding: {
                "@type": "MonetaryGrant",
                description: "Independent research project"
              },
              about: [
                "Consumer Protection",
                "Behavioral Economics", 
                "Predatory Lending",
                "UX Deception Analysis",
                "Statistical Research"
              ],
              audience: {
                "@type": "Audience",
                audienceType: "Researchers, Consumer Advocates, Policy Makers",
              },
            }),
          }}
        />

        {/* Performance optimization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Critical performance monitoring
              if (typeof window !== 'undefined') {
                // Preload critical resources
                const criticalResources = [
                  '/api/experiments',
                  '/api/simulations'
                ];
                
                criticalResources.forEach(url => {
                  const link = document.createElement('link');
                  link.rel = 'prefetch';
                  link.href = url;
                  document.head.appendChild(link);
                });
                
                // Monitor Core Web Vitals
                window.addEventListener('load', function() {
                  if ('performance' in window && 'getEntriesByType' in performance) {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData && perfData.loadEventEnd > 0) {
                      const metrics = {
                        'FCP': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        'LCP': perfData.loadEventEnd - perfData.loadEventStart,
                        'TTI': perfData.loadEventEnd - perfData.fetchStart
                      };
                      
                      // Log only if performance is suboptimal
                      if (metrics.TTI > 2500) {
                        console.warn('Performance Alert:', metrics);
                      }
                    }
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} h-full antialiased bg-gradient-to-br from-slate-50 to-white`}>
        {/* Single optimized provider */}
        <OptimizedLotusProvider>
          {/* Header with mode selector */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <ModeSelector />
          </header>

          {/* Main content area */}
          <main className="flex-1 pt-16 min-h-screen">
            {children}
          </main>

          {/* Global notification system */}
          <NotificationContainer />

          {/* Research-focused footer */}
          <footer className="bg-slate-900 text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">
                    Lotus Research Platform
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    A comprehensive scientific platform for analyzing deceptive patterns 
                    in online lending. This research tool employs rigorous statistical 
                    methodology to measure the effectiveness of predatory UX designs 
                    and their impact on consumer comprehension.
                  </p>
                  <div className="mt-4 text-xs text-slate-400">
                    Statistical Methodology: α = 0.05, β = 0.20, Power = 0.80
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-4 text-slate-200">
                    Research Areas
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Payday Loan Debt Traps</li>
                    <li>• BNPL Credit Disguise</li>
                    <li>• EWA Tip Coercion</li>
                    <li>• Installment Anchoring</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-4 text-slate-200">
                    Methodology
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• IV-DV Statistical Design</li>
                    <li>• Behavioral Tracking</li>
                    <li>• Comprehension Analysis</li>
                    <li>• Trust vs Understanding</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-slate-400 mb-4 md:mb-0">
                  © 2025 Lotus Research Team. Scientific research platform for consumer protection.
                </div>
                <div className="flex space-x-6 text-sm text-slate-400">
                  <span>IRB Approved Research</span>
                  <span>Open Source Methodology</span>
                  <span>CFPB Guidelines Compliant</span>
                </div>
              </div>
            </div>
          </footer>
        </OptimizedLotusProvider>

        {/* Analytics with performance optimization */}
        <Analytics />
      </body>
    </html>
  );
}
