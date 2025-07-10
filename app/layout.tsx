import type { Metadata } from "next";

import React from "react";
import { EducationProvider } from "../components/providers/EducationProvider";
import { SimulationProvider } from "../components/providers/SimulationProvider";
import ModeSelector from "../components/ui/ModeSelector";
import "./globals.css";



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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body style={{ background: "#f3f4f6", minHeight: "100vh" }}>
        <SimulationProvider>
          <EducationProvider>
            {/* Mode selector at the top */}
            <ModeSelector />
            
            {/* Render children as-is; mode is now determined by route */}
            {children}
          </EducationProvider>
        </SimulationProvider>
      </body>
    </html>
  );
}
