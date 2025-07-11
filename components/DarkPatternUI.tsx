/**
 * Advanced Dark Pattern UI Components for Lotus Payday Loan Simulator
 * Educational components that demonstrate predatory lending UI tactics
 * Comprehensive Phase 1: Flashy + Friendly + Fake Institutional styles
 */

"use client";

import React, { useState } from "react";
import { Button } from "./ui/Button";

const DarkPatternUI: React.FC<{
  mode?: "comparison" | "predatory" | "ethical";
  onModeChange?: (mode: string) => void;
  showEducationalAnnotations?: boolean;
  onShowAnnotationsChange?: (value: boolean) => void;
}> = ({
  mode = "comparison",
  onModeChange,
  showEducationalAnnotations = true,
  onShowAnnotationsChange,
}) => {
  const [selectedAmount, setSelectedAmount] = useState(300);

  const renderPredatoryInterface = () => (
    <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-lg border-2 border-red-300 relative">
      <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
        PREDATORY
      </div>
      <h3 className="text-red-700 font-extrabold text-2xl mb-4">
        🚨 EMERGENCY CASH - ACT NOW!
      </h3>
      <div className="bg-red-200 p-4 rounded-md mb-4 text-center border-2 border-dashed border-red-500">
        <div className="text-red-800 font-bold text-lg">
          ⏰ OFFER EXPIRES IN: 04:37
        </div>
        <div className="text-red-700 text-sm">
          Only 2 spots left for instant approval!
        </div>
      </div>
      <div className="mb-4">
        <label className="text-red-800 font-semibold mb-2 block">
          How much cash do you need RIGHT NOW? 💰
        </label>
        <div className="flex gap-2 flex-wrap">
          {[100, 300, 500, 750, 1000].map((amount) => (
            <Button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              variant={selectedAmount === amount ? "danger" : "secondary"}
              className={amount === 1000 ? "transform scale-110" : ""}
            >
              ${amount}
              {amount === 1000 && <div className="text-xs">POPULAR!</div>}
            </Button>
          ))}
        </div>
      </div>
      <div className="bg-red-100 p-4 rounded-md mb-4">
        <div className="text-green-700 font-bold text-2xl">
          You Get: ${selectedAmount}
        </div>
        <div className="text-gray-600">
          Simple payment: ${(selectedAmount * 1.25).toFixed(0)} in 2 weeks
        </div>
        <div className="text-gray-500 text-xs">
          (Fee: $15 per $100 borrowed - just $1/day!)
        </div>
      </div>
      <div className="mb-4 text-sm">
        <label className="flex items-center mb-2">
          <input type="checkbox" defaultChecked className="mr-2" />
          <span>Auto-renew if I can't pay (saves late fees!)</span>
        </label>
        <label className="flex items-center mb-2">
          <input type="checkbox" defaultChecked className="mr-2" />
          <span>Share with partner lenders for better deals</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" defaultChecked className="mr-2" />
          <span>Get exclusive offers via phone & SMS</span>
        </label>
      </div>
      <Button
        variant="danger"
        fullWidth
        className="text-2xl font-extrabold animate-pulse"
      >
        GET MY ${selectedAmount} NOW! 🔥
      </Button>
      <div className="text-xs text-gray-500 mt-2 text-center">
        *Terms, conditions, and 391% APR apply. See buried fine print.
      </div>
    </div>
  );

  const renderEthicalInterface = () => (
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-300 relative">
      <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
        ETHICAL
      </div>
      <h3 className="text-green-800 font-bold text-xl mb-4">
        🌟 Explore Your Financial Options
      </h3>
      <div className="bg-green-100 p-4 rounded-md mb-4 border border-green-200">
        <div className="text-green-800 font-semibold text-base mb-1">
          💡 Take Your Time - No Rush
        </div>
        <div className="text-green-700 text-sm">
          We'll help you find the best solution for your needs. Consider all
          options before borrowing.
        </div>
      </div>
      <div className="mb-4">
        <label className="text-green-800 font-semibold mb-2 block">
          What amount would help your situation?
        </label>
        <div className="flex gap-2 flex-wrap">
          {[100, 300, 500, 750, 1000].map((amount) => (
            <Button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              variant={selectedAmount === amount ? "success" : "secondary"}
            >
              ${amount}
            </Button>
          ))}
        </div>
      </div>
      <div className="bg-green-50 p-4 rounded-md mb-4 border border-green-200">
        <h4 className="text-green-800 font-bold mb-2">
          Complete Cost Breakdown
        </h4>
        <div className="text-sm text-green-800 space-y-1">
          <div>
            Amount you receive: <strong>${selectedAmount}</strong>
          </div>
          <div>
            Fee (15%): <strong>${(selectedAmount * 0.15).toFixed(0)}</strong>
          </div>
          <div>
            Total repayment:{" "}
            <strong>${(selectedAmount * 1.15).toFixed(0)}</strong>
          </div>
          <div className="font-bold text-red-600">
            APR: <strong>143%</strong> (for comparison: credit cards ~25%)
          </div>
        </div>
      </div>
      <div className="bg-yellow-50 p-4 rounded-md mb-4 border border-yellow-200">
        <h4 className="text-yellow-800 font-bold mb-2">
          💡 Consider These Alternatives First:
        </h4>
        <ul className="text-yellow-800 text-sm list-disc list-inside space-y-1">
          <li>Credit union emergency loan (typically 28% APR)</li>
          <li>Employer salary advance or assistance program</li>
          <li>Payment plan with creditor</li>
          <li>Local assistance programs</li>
        </ul>
      </div>
      <div className="mb-4 text-sm">
        <label className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" />
          <span>I have reviewed alternative options above</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>
            Send me educational resources about building emergency savings
          </span>
        </label>
      </div>
      <Button variant="success" fullWidth>
        Get Guidance & Explore Options
      </Button>
      <div className="text-sm text-green-700 mt-2 text-center">
        Take your time. We'll help you make the best financial decision for your
        situation.
      </div>
    </div>
  );

  const renderEducationalAnalysis = () => {
    if (!showEducationalAnnotations) return null;
    return (
      <div className="mt-6 p-6 bg-gray-100 rounded-lg border border-gray-200">
        <h3 className="font-bold mb-4 text-gray-800">
          🎓 Educational Analysis
        </h3>
        <div
          className={`grid ${mode === "comparison" ? "md:grid-cols-2" : ""} gap-8`}
        >
          {(mode === "comparison" || mode === "predatory") && (
            <div>
              <h4 className="text-red-600 font-semibold mb-2">
                🕷️ Dark Patterns Demonstrated:
              </h4>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>Artificial urgency (fake countdown timer)</li>
                <li>False scarcity (“Only 2 spots left”)</li>
                <li>Hidden APR (presenting as daily fee)</li>
                <li>Pre-checked harmful options</li>
                <li>Emotional manipulation (emergency framing)</li>
                <li>Anchoring bias (largest amount highlighted)</li>
                <li>Misleading cost presentation</li>
              </ul>
            </div>
          )}
          {(mode === "comparison" || mode === "ethical") && (
            <div>
              <h4 className="text-green-600 font-semibold mb-2">
                ✨ Ethical Design Principles:
              </h4>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>No artificial time pressure</li>
                <li>Complete cost transparency upfront</li>
                <li>Alternatives presented first</li>
                <li>Honest consent options</li>
                <li>Calm, supportive messaging</li>
                <li>Educational context provided</li>
                <li>User autonomy respected</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (mode === "comparison") {
      return (
        <div className="grid md:grid-cols-2 gap-8 min-h-[600px]">
          {renderPredatoryInterface()}
          {renderEthicalInterface()}
        </div>
      );
    }
    return mode === "predatory"
      ? renderPredatoryInterface()
      : renderEthicalInterface();
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">
          🎭 Dark Patterns vs Ethical Design
        </h2>
        <div className="flex justify-center gap-2 mb-4">
          {["comparison", "predatory", "ethical"].map((modeOption) => (
            <Button
              key={modeOption}
              onClick={() => onModeChange?.(modeOption)}
              variant={mode === modeOption ? "primary" : "secondary"}
              className="capitalize"
            >
              {modeOption}
            </Button>
          ))}
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compare how the same loan product can be presented in manipulative vs
          transparent ways
        </p>
      </div>
      <div className="text-center mb-4">
        <label className="inline-flex items-center text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showEducationalAnnotations}
            onChange={(e) => onShowAnnotationsChange?.(e.target.checked)}
            className="mr-2"
          />
          Show educational annotations
        </label>
      </div>

      {renderContent()}
      {renderEducationalAnalysis()}
    </div>
  );
};

export default DarkPatternUI;
