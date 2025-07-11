"use client";

import DarkPatternUI from "@/components/DarkPatternUI";
import Phase1ExploitativeWebsite from "@/components/Phase1ExploitativeWebsite";
import Phase2EthicalWebsite from "@/components/Phase2EthicalWebsite";
import Phase3EducationalReflection from "@/components/Phase3EducationalReflection";
import React, { useEffect, useState } from "react";

/**
 * Main Lotus Payday Loan Simulator Application
 *
 * Consolidated 3-phase educational platform:
 * - Phase 1: Exploitative predatory lending experience
 * - Phase 2: Ethical transparent lending experience
 * - Phase 3: Educational reflection and autonomy theater analysis
 */

type Phase = "phase1" | "phase2" | "phase3" | "phase4";

const LotusSimulator: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<Phase>("phase1");
  const [showPanel, setShowPanel] = useState<boolean>(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedPhase = localStorage.getItem(
      "lotus-current-phase"
    ) as Phase | null;
    const storedShow = localStorage.getItem("lotus-show-panel");
    if (
      storedPhase &&
      ["phase1", "phase2", "phase3", "phase4"].includes(storedPhase)
    ) {
      setCurrentPhase(storedPhase);
    }
    if (storedShow === "false") {
      setShowPanel(false);
    }
  }, []);

  // Persist phase selection
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("lotus-current-phase", currentPhase);
  }, [currentPhase]);

  // Persist panel visibility
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("lotus-show-panel", showPanel.toString());
  }, [showPanel]);

  const totalPhases = 4;
  const phaseDescriptions: Record<
    Phase,
    { title: string; description: string; color: string; hoverColor: string }
  > = {
    phase1: {
      title: "Phase 1 of 4 · 🏦 Professional Predatory Interface",
      description:
        "Experience predatory lending practices with hidden fees, rollover traps, and psychological manipulation.",
      color: "bg-red-600",
      hoverColor: "hover:bg-red-700",
    },
    phase2: {
      title: "Phase 2 of 4 · ✨ Ethical Alternative Interface",
      description:
        "See how transparent, fair lending practices should work with full disclosure and consumer protection.",
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700",
    },
    phase3: {
      title: "Phase 3 of 4 · 📊 Analysis & Behavioral Insights",
      description:
        "Dive into behavioral data and autonomy-theater detection to understand lender tactics.",
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700",
    },
    phase4: {
      title: "Phase 4 of 4 · ⚖️ Comparison Side-by-Side Analysis",
      description:
        "Compare predatory vs. ethical interfaces simultaneously to observe contrasts in real-time.",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
  };

  const renderPhaseSelector = () =>
    showPanel ? (
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 w-80 max-w-full md:max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">🌸 Lotus Simulator</h3>
          <button
            aria-label="Close panel"
            onClick={() => setShowPanel(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2">
          {Object.entries(phaseDescriptions).map(([phase, info]) => (
            <button
              key={phase}
              onClick={() => setCurrentPhase(phase as Phase)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                currentPhase === phase
                  ? `${info.color} text-white`
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{info.title}</span>
              </div>
              <div className="text-sm opacity-90 mt-1">{info.description}</div>
            </button>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-600">
          Educational Platform: {totalPhases} phases available
        </div>
      </div>
    ) : (
      <button
        onClick={() => setShowPanel(true)}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg"
        aria-label="Open simulator panel"
      >
        🌸
      </button>
    );

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case "phase1":
        return <Phase1ExploitativeWebsite />;
      case "phase2":
        return <Phase2EthicalWebsite />;
      case "phase3":
        return <Phase3EducationalReflection />;
      case "phase4":
        return <DarkPatternUI mode="comparison" />;
      default:
        return <Phase1ExploitativeWebsite />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderPhaseSelector()}
      {renderCurrentPhase()}
    </div>
  );
};

export default LotusSimulator;
