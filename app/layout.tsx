import type { Metadata } from "next";
import React from "react";
import { EducationProvider } from "../components/providers/EducationProvider";
import { SimulationProvider } from "../components/providers/SimulationProvider";
import ModeSelector from "../components/ui/ModeSelector";
import "./globals.css";

// The 'inter' font subset is not actively used in the current design.
// Removing the variable to clean up the linter warnings.
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🌸 Lotus Educational Platform - Comprehensive Payday Loan Simulator",
  description: "A comprehensive simulation to educate on predatory lending.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
