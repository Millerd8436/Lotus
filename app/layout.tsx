import UnifiedHeader from "@/components/phase4-ethical/EthicalHeader";
import { EducationProvider } from "@/components/providers/EducationProvider";
import { SimulationProvider } from "@/components/providers/SimulationProvider";
import { NotificationContainer } from "@/components/shared/InteractiveElements";
import { PageLoadingOverlay } from "@/components/shared/LoadingSpinner";
import ModeSelector from "@/components/shared/ModeSelector";
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
    "Kantian ethics",
    "consumer protection",
    "dark patterns",
    "fintech analysis",
  ],
  authors: [{ name: "MCP Professional Services" }],
  openGraph: {
    title: "Lotus - Advanced Educational Payday Loan Simulator",
    description: "Uncover predatory lending tactics and explore ethical finance.",
    url: "https://lotus-simulator.vercel.app",
    siteName: "Lotus Simulator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lotus - Advanced Educational Payday Loan Simulator",
    description: "Uncover predatory lending tactics and explore ethical finance.",
    creator: "@mcp_services",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
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
    <html lang="en">
      <body className={inter.className}>
        <EducationProvider>
          <SimulationProvider>
            <UnifiedHeader />
            <ModeSelector />
            <main>{children}</main>
            <NotificationContainer />
            <PageLoadingOverlay isVisible={false} />
          </SimulationProvider>
        </EducationProvider>
      </body>
    </html>
  );
}
