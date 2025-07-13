"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

/**
 * Professional ModeSelector - Navigate between all phases of the educational platform.
 * Phase 1: Professional Predatory Interface (/)
 * Phase 2: Ethical Alternative Interface (/ethical)
 * Phase 3: Reflection & Analysis (/reflection) - includes comparison functionality
 */
const ModeSelector: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getPhase = () => {
    if (pathname === "/ethical") return 2;
    if (pathname === "/reflection") return 3;
    return 1;
  };

  const phase = getPhase();

  const handlePhaseTransition = async (newPhase: number, route: string) => {
    if (phase === newPhase) return;

    setIsTransitioning(true);

    // Smooth transition with professional loading
    await new Promise((resolve) => setTimeout(resolve, 300));
    router.push(route);

    // Reset transition state
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const phases = [
    {
      id: 1,
      route: "/",
      title: "Professional",
      subtitle: "Predatory Interface",
      icon: "🏦",
      description: "Experience professional predatory lending",
      color: "#dc2626",
    },
    {
      id: 2,
      route: "/ethical",
      title: "Ethical",
      subtitle: "Alternative Interface",
      icon: "✨",
      description: "Compare with ethical lending practices",
      color: "#16a34a",
    },
    {
      id: 3,
      route: "/reflection",
      title: "Analysis",
      subtitle: "Analysis & Education",
      icon: "📊",
      description: "Analyze patterns & compare all phases",
      color: "#0284c7", // A professional, serious blue
    },
  ];

  return (
    <div className="professional-mode-selector">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b-2 border-slate-200 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-slate-700 bg-clip-text text-transparent">
                Lotus
              </div>
              <div className="hidden sm:block text-sm text-slate-600 font-medium">
                Professional Payday Loan Simulator
              </div>
            </div>

            {/* Professional Progress Indicator */}
            <div className="flex items-center space-x-2">
              <div className="text-xs text-slate-500 font-medium">
                Phase {phase} of 3
              </div>
              <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-600 to-slate-700 transition-all duration-500"
                  style={{ width: `${(phase / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Phase Navigation */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex space-x-1 p-2">
              {phases.map((phaseData) => (
                <button
                  key={phaseData.id}
                  onClick={() =>
                    handlePhaseTransition(phaseData.id, phaseData.route)
                  }
                  disabled={isTransitioning || phase === phaseData.id}
                  className={`
                    relative group flex items-center space-x-3 px-6 py-4 rounded-lg font-medium text-sm transition-all duration-300
                    ${
                      phase === phaseData.id
                        ? "shadow-lg transform scale-105 text-white"
                        : "hover:bg-slate-50 hover:shadow-md"
                    }
                    ${isTransitioning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  `}
                  style={{
                    background:
                      phase === phaseData.id
                        ? `linear-gradient(135deg, ${phaseData.color}, ${phaseData.color}dd)`
                        : "white",
                    color: phase === phaseData.id ? "white" : phaseData.color,
                    border: `2px solid ${phaseData.color}`,
                    boxShadow:
                      phase === phaseData.id
                        ? `0 8px 25px ${phaseData.color}25`
                        : "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Phase Icon */}
                  <div className="text-xl">{phaseData.icon}</div>

                  {/* Phase Info */}
                  <div className="flex flex-col items-start">
                    <div className="font-bold text-sm">{phaseData.title}</div>
                    <div
                      className={`text-xs ${phase === phaseData.id ? "text-white/80" : "text-slate-500"}`}
                    >
                      {phaseData.subtitle}
                    </div>
                  </div>

                  {/* Active Phase Indicator */}
                  {phase === phaseData.id && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white shadow-md">
                      <div className="w-full h-full rounded-full bg-gradient-to-r from-sky-600 to-slate-700 animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Status Bar */}
      <div className="bg-slate-50 border-b border-slate-200 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Simulation Active</span>
              </div>
              <div className="hidden sm:block">
                Educational Platform • Academic Research • Consumer Protection
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-slate-500">
                {getCurrentPhaseStatus(phase)}
              </div>
              {isTransitioning && (
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  <span>Transitioning...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get current phase status
function getCurrentPhaseStatus(phase: number): string {
  const statuses = {
    1: "🏦 Professional Predatory Interface",
    2: "✨ Ethical Alternative Interface",
    3: "📊 Analysis & Education",
  };
  return statuses[phase as keyof typeof statuses] || "Unknown Phase";
}

export default ModeSelector;
