import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🌸 Lotus Educational Platform - Comprehensive Payday Loan Simulator",
  description:
    "Advanced 3-Phase educational platform exposing predatory lending practices through interactive simulation with 96,000+ lines of behavioral analysis.",
  keywords: [
    "financial education",
    "payday loans",
    "predatory lending",
    "consumer protection",
    "dark patterns",
    "behavioral economics",
    "financial literacy",
    "educational simulation",
  ],
  authors: [{ name: "Lotus Research Team" }],
  openGraph: {
    title: "Lotus Educational Platform",
    description: "Comprehensive payday loan simulator for financial education",
    type: "website",
    siteName: "Lotus Educational Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus Educational Platform",
    description: "Learn about predatory lending through interactive simulation",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">{children}</div>

        {/* Educational Notice */}
        <div
          id="educational-notice"
          className="fixed bottom-4 right-4 max-w-sm bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800 shadow-lg z-50"
          style={{ display: "none" }}
        >
          <div className="flex items-start space-x-2">
            <span className="text-yellow-500">⚠️</span>
            <div>
              <div className="font-medium">Educational Simulation</div>
              <div className="mt-1">
                This is a learning tool. No real financial products are offered.
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
