import { EducationProvider } from "@/components/providers/EducationProvider";
import { SimulationProvider } from "@/components/providers/SimulationProvider";
import { NotificationContainer } from "@/components/ui/InteractiveElements";
import { PageLoadingOverlay } from "@/components/ui/LoadingSpinner";
import ModeSelector from "@/components/ui/ModeSelector";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lotus - Professional Payday Loan Simulator",
  description:
    "Comprehensive 3-Phase Educational Platform: Experience predatory lending, ethical alternatives, and behavioral analysis",
  keywords: [
    "payday loan simulator",
    "predatory lending education",
    "financial literacy",
    "consumer protection",
    "dark patterns",
    "behavioral analysis",
    "ethical lending",
    "educational platform",
  ],
  authors: [{ name: "Lotus Research Team" }],
  creator: "Lotus Educational Platform",
  publisher: "Lotus Research Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lotus-simulator.com"),
  openGraph: {
    title: "Lotus - Professional Payday Loan Simulator",
    description:
      "Comprehensive educational platform demonstrating predatory lending practices and ethical alternatives",
    url: "https://lotus-simulator.com",
    siteName: "Lotus Simulator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lotus Payday Loan Simulator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus - Professional Payday Loan Simulator",
    description:
      "Comprehensive educational platform demonstrating predatory lending practices and ethical alternatives",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
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
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lotus Simulator" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
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

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalApplication",
              name: "Lotus Payday Loan Simulator",
              description:
                "Comprehensive educational platform demonstrating predatory lending practices and ethical alternatives",
              url: "https://lotus-simulator.com",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "Lotus Research Team",
              },
              educationalUse: ["Simulation", "Analysis", "Education"],
              learningResourceType: [
                "Interactive Resource",
                "Simulation",
                "Educational Tool",
              ],
              audience: {
                "@type": "Audience",
                audienceType: "Students, Researchers, Consumer Advocates",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} h-full antialiased`}>
        <div id="root" className="h-full">
          <SimulationProvider>
            <EducationProvider>
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
                {/* Professional Header with Mode Selector */}
                <ModeSelector />

                {/* Main Content Area */}
                <main className="flex-1">{children}</main>

                {/* Notification Container for Global Notifications */}
                <NotificationContainer>
                  {/* Notifications will be rendered here */}
                </NotificationContainer>

                {/* Page Loading Overlay */}
                <PageLoadingOverlay
                  isVisible={false}
                  message="Loading..."
                  theme="professional"
                />

                {/* Footer */}
                <footer className="bg-slate-900 text-white py-8 mt-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="col-span-1 md:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">
                          Lotus Educational Platform
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          A comprehensive educational simulator designed to
                          demonstrate predatory lending practices, ethical
                          alternatives, and behavioral analysis. This platform
                          serves as a research tool for understanding consumer
                          protection and financial literacy.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-4 text-slate-200">
                          Educational Resources
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li>• Consumer Protection</li>
                          <li>• Financial Literacy</li>
                          <li>• Behavioral Analysis</li>
                          <li>• Regulatory Framework</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-4 text-slate-200">
                          Research Focus
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li>• Dark Pattern Analysis</li>
                          <li>• Vulnerability Assessment</li>
                          <li>• Ethical Design Principles</li>
                          <li>• Policy Recommendations</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                      <div className="text-sm text-slate-400 mb-4 md:mb-0">
                        © 2024 Lotus Research Team. Educational platform for
                        research and consumer protection.
                      </div>
                      <div className="flex space-x-6 text-sm text-slate-400">
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          Privacy Policy
                        </a>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          Terms of Use
                        </a>
                        <a
                          href="#"
                          className="hover:text-white transition-colors"
                        >
                          Research Methodology
                        </a>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </EducationProvider>
          </SimulationProvider>
        </div>

        {/* Performance Monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  if ('performance' in window) {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      console.log('Page Load Performance:', {
                        'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart + 'ms',
                        'Page Load Complete': perfData.loadEventEnd - perfData.loadEventStart + 'ms',
                        'Total Load Time': perfData.loadEventEnd - perfData.fetchStart + 'ms'
                      });
                    }
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
