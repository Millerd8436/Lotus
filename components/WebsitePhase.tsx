"use client";

import { useState } from "react";
import DeceptiveCheckoutFlow from "./DeceptiveCheckoutFlow";
import { LoadingSpinner } from "./ui";

interface WebsitePhaseProps {
  phase: "exploitative" | "ethical";
  onPhaseChange?: (phase: "exploitative" | "ethical") => void;
}

export default function WebsitePhase({
  phase,
  onPhaseChange,
}: WebsitePhaseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loanAmount, setLoanAmount] = useState(300);

  // Phase-specific styling
  const phaseStyles = {
    exploitative: {
      bg: "bg-gradient-to-br from-red-50 to-red-100",
      text: "text-red-900",
      button: "bg-red-600 hover:bg-red-700",
      border: "border-red-200",
    },
    ethical: {
      bg: "bg-gradient-to-br from-green-50 to-green-100",
      text: "text-green-900",
      button: "bg-green-600 hover:bg-green-700",
      border: "border-green-200",
    },
  };

  const styles = phaseStyles[phase];

  const handleGetStarted = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowCheckout(true);
    }, 1000);
  };

  if (showCheckout) {
    return (
      <DeceptiveCheckoutFlow
        loanAmount={loanAmount}
        phase={phase}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen ${styles.bg}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Phase Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
            <button
              onClick={() => onPhaseChange?.("exploitative")}
              className={`px-4 py-2 rounded ${
                phase === "exploitative"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Exploitative Phase
            </button>
            <button
              onClick={() => onPhaseChange?.("ethical")}
              className={`px-4 py-2 rounded ${
                phase === "ethical"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Ethical Phase
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 border-2 ${styles.border}`}
          >
            <h1 className={`text-4xl font-bold mb-6 ${styles.text}`}>
              {phase === "exploitative"
                ? "💰 Quick Cash in Minutes!"
                : "🌿 Responsible Lending Solutions"}
            </h1>

            <p className="text-xl text-gray-700 mb-8">
              {phase === "exploitative"
                ? "Get up to $1,000 instantly! No credit check required. Apply now and get cash in your account TODAY!"
                : "Explore affordable lending options with transparent terms and your financial wellbeing in mind."}
            </p>

            {phase === "ethical" && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  💡 Before You Borrow
                </h3>
                <p className="text-blue-800">
                  Have you considered these alternatives?
                </p>
                <ul className="list-disc list-inside mt-2 text-blue-700">
                  <li>Local credit union loans (6-28% APR)</li>
                  <li>Payment plans with creditors</li>
                  <li>Employer salary advances</li>
                  <li>Community assistance programs</li>
                </ul>
              </div>
            )}

            {/* Loan Amount Selector */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-4">
                How much do you need?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-2xl font-bold w-24 text-right">
                  ${loanAmount}
                </span>
              </div>
            </div>

            {/* Cost Display */}
            <div className={`border-2 ${styles.border} rounded-lg p-4 mb-6`}>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Repayment:</span>
                <span className="text-2xl font-bold">
                  $
                  {phase === "exploitative"
                    ? Math.round(loanAmount * 1.3)
                    : Math.round(loanAmount * 1.05)}
                </span>
              </div>
              {phase === "ethical" && (
                <div className="text-sm text-gray-500 mt-2">
                  APR: 36% | Term: 3 months | No hidden fees
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleGetStarted}
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg
                ${styles.button} transform transition-all duration-200 
                hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : phase === "exploitative" ? (
                "Get Cash Now! →"
              ) : (
                "Explore Your Options →"
              )}
            </button>

            {phase === "exploitative" && (
              <div className="mt-4 text-center">
                <p className="text-red-600 font-semibold animate-pulse">
                  ⚡ 3 people are viewing this offer right now!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
