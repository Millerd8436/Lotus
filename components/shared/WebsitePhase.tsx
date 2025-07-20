"use client";

import { useEffect, useState } from "react";
import DeceptiveCheckoutFlow from "./DeceptiveCheckoutFlow";
import {
  EducationalOverlay,
  useEducation,
} from "./providers/EducationProvider";
import { useSimulation } from "./providers/SimulationProvider";
import { LoadingSpinner } from "./ui/LoadingSpinner";

// Phase 1 components (Exploitative)
import AdvancedDarkPatternsDemo from "./AdvancedDarkPatternsDemo";
import DebtTrapMechanism from "./DebtTrapMechanism";

// Phase 4 components (Ethical)
import CoolingOffNotice from "./ethical/CoolingOffNotice";
import EthicalHomepage from "./ethical/EthicalHomepage";
import EthicalLoanCalculator from "./ethical/EthicalLoanCalculator";

interface WebsitePhaseProps {
  phase: 1 | 2 | 3 | 4;
  onPhaseChange?: (phase: 1 | 2 | 3 | 4) => void;
  children?: React.ReactNode;
}

export default function WebsitePhase({
  phase,
  // onPhaseChange - not used
  children,
}: WebsitePhaseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loanAmount, setLoanAmount] = useState(300);
  const [showDarkPatternDemo, setShowDarkPatternDemo] = useState(false);
  // const [showAnnotations, setShowAnnotations] = useState(false); // unused
  const [detectedPatterns, setDetectedPatterns] = useState<string[]>([]);

  const { session, updateSession } = useSimulation();
  const { showEducationalOverlay, toggleEducationalOverlay } = useEducation();

  // Enable annotations for phase 3 (teaching mode)
  useEffect(() => {
    // setShowAnnotations(phase === 3); // unused
  }, [phase]);

  // Phase-specific styling
  const phaseStyles = {
    1: {
      bg: "bg-gradient-to-br from-red-50 to-red-100",
      text: "text-red-900",
      button: "bg-red-600 hover:bg-red-700",
      border: "border-red-200",
      theme: "exploitative" as const,
    },
    2: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100",
      text: "text-blue-900",
      button: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-200",
      theme: "analysis" as const,
    },
    3: {
      bg: "bg-gradient-to-br from-yellow-50 to-orange-100",
      text: "text-orange-900",
      button: "bg-orange-600 hover:bg-orange-700",
      border: "border-orange-200",
      theme: "educational" as const,
    },
    4: {
      bg: "bg-gradient-to-br from-green-50 to-green-100",
      text: "text-green-900",
      button: "bg-green-600 hover:bg-green-700",
      border: "border-green-200",
      theme: "ethical" as const,
    },
  };

  const styles =
    phaseStyles[phase as keyof typeof phaseStyles] || phaseStyles[1];

  const handleGetStarted = () => {
    setIsLoading(true);

    // Log phase interaction
    updateSession({
      phaseInteractions: [
        ...(session.phaseInteractions || []),
        { phase, action: "get_started", timestamp: Date.now() },
      ],
    });

    setTimeout(() => {
      setIsLoading(false);
      if (phase === 1 || phase === 3) {
        setShowCheckout(true);
      } else if (phase === 4) {
        // For ethical phase, show ethical calculator
        setShowCheckout(false);
      }
    }, 1000);
  };

  const handlePatternDetected = (pattern: string, severity: number) => {
    setDetectedPatterns((prev) => [...prev, pattern]);

    // Log pattern detection
    updateSession({
      detectedDarkPatterns: [
        ...(session.detectedDarkPatterns || []),
        { pattern, severity, phase, timestamp: Date.now() },
      ],
    });

    // Show annotation in teaching mode
    if (phase === 3) {
      // Trigger educational overlay for this pattern
      toggleEducationalOverlay();
    }
  };

  // Phase 2 loads automatically after phase 1
  if (phase === 2) {
    // Redirect to reflection page for analysis
    if (typeof window !== "undefined") {
      window.location.href = "/reflection";
    }
    return null;
  }

  // Teaching mode (Phase 3) - Same as Phase 1 but with annotations
  if (showCheckout && (phase === 1 || phase === 3)) {
    return (
      <div className="relative">
        <DeceptiveCheckoutFlow
          loanAmount={loanAmount}
          phase="exploitative"
          onBack={() => setShowCheckout(false)}
        />

        {/* Live annotations for Phase 3 */}
        {phase === 3 && detectedPatterns.length > 0 && (
          <div className="fixed bottom-4 right-4 max-w-sm bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 shadow-lg z-50">
            <h4 className="font-bold text-yellow-800 mb-2">
              🎓 Dark Pattern Detected!
            </h4>
            <p className="text-sm text-yellow-700">
              Latest: {detectedPatterns[detectedPatterns.length - 1]}
            </p>
            <p className="text-xs text-yellow-600 mt-2">
              {detectedPatterns.length} patterns detected so far
            </p>
          </div>
        )}

        {/* Educational overlay for teaching mode */}
        {showEducationalOverlay && (
          <EducationalOverlay
            title="Understanding This Dark Pattern"
            content="This UI element is designed to manipulate your decision-making. Notice how it creates urgency and hides important information."
            onClose={toggleEducationalOverlay}
            showQuiz={true}
          />
        )}
      </div>
    );
  }

  // Ethical phase (Phase 4)
  if (phase === 4) {
    return (
      <div className={`min-h-screen ${styles.bg}`}>
        <CoolingOffNotice />
        <EthicalHomepage />
        <div className="container mx-auto px-4 py-8">
          <EthicalLoanCalculator />
        </div>
      </div>
    );
  }

  // Default view for phases 1 and 3 (before checkout)
  return (
    <div className={`min-h-screen ${styles.bg}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Phase indicator */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
            <span className="text-sm font-medium text-gray-600">
              {phase === 1
                ? "Phase 1: Raw Deception"
                : phase === 3
                ? "Phase 3: Teaching Mode"
                : phase === 4
                ? "Phase 4: Ethical Design"
                : ""}
            </span>
            {phase === 3 && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                Annotations ON
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 border-2 ${styles.border}`}
          >
            {/* Phase-specific content */}
            {(phase === 1 || phase === 3) && (
              <>
                <h1 className={`text-4xl font-bold mb-6 ${styles.text}`}>
                  💰 Quick Cash in Minutes!
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Get up to $1,000 instantly! No credit check required. Apply
                  now and get cash in your account TODAY!
                </p>

                {/* Urgency triggers */}
                <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 mb-6 animate-pulse">
                  <p className="text-red-800 font-bold text-center">
                    ⚡ LIMITED TIME OFFER - Only 3 spots left! ⚡
                  </p>
                </div>

                {/* Loan amount selector */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-4">
                    How much do you need?
                  </label>
                  <div className="flex gap-4 justify-center">
                    {[100, 300, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setLoanAmount(amount);
                          if (phase === 3) {
                            handlePatternDetected(
                              "Anchoring bias with preset amounts",
                              7
                            );
                          }
                        }}
                        className={`px-6 py-3 rounded-lg font-bold transition-all ${
                          loanAmount === amount
                            ? styles.button + " text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hidden terms (dark pattern) */}
                <div className="text-xs text-gray-400 mb-6">
                  <details>
                    <summary
                      className="cursor-pointer hover:text-gray-600"
                      onClick={() =>
                        phase === 3 &&
                        handlePatternDetected("Hidden critical information", 9)
                      }
                    >
                      Terms and conditions apply*
                    </summary>
                    <p className="mt-2">
                      APR ranges from 200% to 800%. Late fees apply. Automatic
                      rollovers enabled.
                    </p>
                  </details>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleGetStarted}
                  className={`w-full py-4 px-8 rounded-lg font-bold text-xl text-white ${styles.button} transform hover:scale-105 transition-all shadow-lg`}
                >
                  {isLoading ? (
                    <LoadingSpinner
                      size="sm"
                      theme={
                        styles.theme === "educational"
                          ? "neutral"
                          : styles.theme
                      }
                    />
                  ) : (
                    "Get Cash Now →"
                  )}
                </button>

                {/* Fake testimonials */}
                <div className="mt-8 pt-8 border-t">
                  <p className="text-sm text-gray-600 italic">
                    "Got my money in 10 minutes!" - Sarah K.
                  </p>
                  {phase === 3 && (
                    <p className="text-xs text-orange-600 mt-1">
                      ⚠️ These testimonials may be fabricated
                    </p>
                  )}
                </div>

                {/* Demo other dark patterns button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowDarkPatternDemo(true)}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    View more dark patterns demo
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Additional components for demonstration */}
          {showDarkPatternDemo && (
            <div className="mt-8">
              <AdvancedDarkPatternsDemo
                onPatternDetected={handlePatternDetected}
              />
            </div>
          )}

          {/* Show debt trap mechanism for phase 1 */}
          {phase === 1 && session.exploitativeData && (
            <div className="mt-8">
              <DebtTrapMechanism />
            </div>
          )}

          {/* Render children if provided */}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
}
