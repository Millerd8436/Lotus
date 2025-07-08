"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useState } from "react";
import LotusSimulator from "../components/LotusSimulator";

export default function HomePage() {
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(1);
  const [phaseData, setPhaseData] = useState<Record<number, any>>({});

  const handlePhaseComplete = (phase: number, data: any) => {
    setPhaseData((prev) => ({ ...prev, [phase]: data }));

    // Advance to next phase if not at the end
    if (phase < 3) {
      setCurrentPhase((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const resetSimulation = () => {
    setCurrentPhase(1);
    setPhaseData({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🌸</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Lotus Educational Platform
                </h1>
                <p className="text-sm text-gray-600">
                  3-Phase Comprehensive Payday Loan Simulator
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Phase {currentPhase} of 3
              </div>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 border border-pink-200 rounded-md hover:bg-pink-100 transition-colors"
              >
                Reset Simulation
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Phase Progress Indicator */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-8">
              {[
                {
                  phase: 1,
                  label: "🕷️ Exploitative",
                  description: "Experience predatory tactics",
                },
                {
                  phase: 2,
                  label: "✨ Ethical",
                  description: "See transparent alternatives",
                },
                {
                  phase: 3,
                  label: "🪞 Reflection",
                  description: "Analyze and learn",
                },
              ].map(({ phase, label, description }) => (
                <div
                  key={phase}
                  className={`flex items-center space-x-3 ${
                    currentPhase === phase
                      ? "text-pink-600"
                      : currentPhase > phase
                        ? "text-green-600"
                        : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentPhase === phase
                        ? "bg-pink-100 text-pink-600"
                        : currentPhase > phase
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {currentPhase > phase ? "✓" : phase}
                  </div>
                  <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-xs">{description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LotusSimulator
          phase={currentPhase}
          onPhaseComplete={handlePhaseComplete}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Lotus Educational Platform - Comprehensive Payday Loan Simulator
            </p>
            <p className="text-xs text-gray-500 mt-1">
              96,000+ lines of advanced behavioral analysis and educational
              content
            </p>
          </div>
        </div>
      </footer>

      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
