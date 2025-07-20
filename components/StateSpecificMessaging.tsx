"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface StateRegulation {
  state: string;
  maxAPR: number;
  maxLoanAmount: number;
  cooldownPeriod: number;
  rolloversAllowed: number;
  isRegulated: boolean;
  specificRules: string[];
}

export const StateSpecificMessaging: React.FC<{
  userState: string;
  loanAmount: number;
  onStateChange?: (state: string) => void;
}> = ({ userState, loanAmount, onStateChange }) => {
  const [selectedState, setSelectedState] = useState(userState);
  const [showComparison, setShowComparison] = useState(false);

  const stateRegulations: Record<string, StateRegulation> = {
    CA: {
      state: "California",
      maxAPR: 460,
      maxLoanAmount: 300,
      cooldownPeriod: 0,
      rolloversAllowed: 0,
      isRegulated: true,
      specificRules: [
        "Maximum loan amount: $300",
        "Maximum fee: 15% of loan amount",
        "No rollovers permitted",
        "Cooling-off period between loans",
      ],
    },
    TX: {
      state: "Texas",
      maxAPR: 664,
      maxLoanAmount: 1800,
      cooldownPeriod: 0,
      rolloversAllowed: 999,
      isRegulated: false,
      specificRules: [
        "No maximum loan amount",
        "No APR cap",
        "Unlimited rollovers allowed",
        "Minimal consumer protections",
      ],
    },
    NY: {
      state: "New York",
      maxAPR: 25,
      maxLoanAmount: 0,
      cooldownPeriod: 0,
      rolloversAllowed: 0,
      isRegulated: true,
      specificRules: [
        "Payday loans are illegal",
        "Maximum APR: 25%",
        "Criminal usury above 25% APR",
        "Strong consumer protections",
      ],
    },
    FL: {
      state: "Florida",
      maxAPR: 391,
      maxLoanAmount: 500,
      cooldownPeriod: 24,
      rolloversAllowed: 1,
      isRegulated: true,
      specificRules: [
        "Maximum loan amount: $500",
        "24-hour cooling-off period",
        "60-day grace period option",
        "Database tracking required",
      ],
    },
  };

  const currentRegulation =
    stateRegulations[selectedState] || stateRegulations.TX;

  const calculateFees = (state: string) => {
    const reg = stateRegulations[state];
    if (!reg || reg.maxLoanAmount === 0) return 0;

    const effectiveLoanAmount =
      Math.min(loanAmount, reg.maxLoanAmount || loanAmount);
    const dailyRate = reg.maxAPR / 365 / 100;
    const fees = effectiveLoanAmount * dailyRate * 14; // 14-day loan
    return Math.round(fees);
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    onStateChange?.(state);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6">
        <h3 className="text-2xl font-bold mb-4">
          State-Specific Lending Rules
        </h3>

        {/* State Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Your State:
          </label>
          <select
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            {Object.entries(stateRegulations).map(([code, reg]) => (
              <option key={code} value={code}>
                {reg.state} ({code})
              </option>
            ))}
          </select>
        </div>

        {/* Current State Information */}
        <div
          className={`p-4 rounded-lg mb-6 ${
            currentRegulation.isRegulated ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <h4 className="font-bold mb-2">
            {currentRegulation.state} Regulations
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Maximum APR</p>
              <p className="text-xl font-bold">{currentRegulation.maxAPR}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Max Loan Amount</p>
              <p className="text-xl font-bold">
                {currentRegulation.maxLoanAmount === 0
                  ? "Prohibited"
                  : `$${currentRegulation.maxLoanAmount}`}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rollovers Allowed</p>
              <p className="text-xl font-bold">
                {currentRegulation.rolloversAllowed === 999
                  ? "Unlimited"
                  : currentRegulation.rolloversAllowed}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Your Loan Cost</p>
              <p className="text-xl font-bold">
                ${calculateFees(selectedState)} in fees
              </p>
            </div>
          </div>
        </div>

        {/* State Rules */}
        <div className="mb-6">
          <h4 className="font-bold mb-2">
            Key Rules in {currentRegulation.state}:
          </h4>
          <ul className="space-y-2">
            {currentRegulation.specificRules.map((rule, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Compare States Button */}
        <Button
          onClick={() => setShowComparison(!showComparison)}
          variant="outline"
          size="medium"
          className="w-full"
        >
          {showComparison ? "Hide" : "Show"} State Comparison
        </Button>

        {/* State Comparison Table */}
        {showComparison && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">State</th>
                  <th className="border p-2 text-right">Max APR</th>
                  <th className="border p-2 text-right">Max Loan</th>
                  <th className="border p-2 text-right">14-Day Fee</th>
                  <th className="border p-2 text-center">Regulated</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stateRegulations).map(([code, reg]) => (
                  <tr key={code} className={code === selectedState ? "bg-blue-50" : ""}>
                    <td className="border p-2">{reg.state}</td>
                    <td className="border p-2 text-right">{reg.maxAPR}%</td>
                    <td className="border p-2 text-right">
                      {reg.maxLoanAmount === 0
                        ? "Prohibited"
                        : `$${reg.maxLoanAmount}`}
                    </td>
                    <td className="border p-2 text-right">${calculateFees(code)}</td>
                    <td className="border p-2 text-center">
                      {reg.isRegulated ? "✅" : "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Educational Message */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 Did you know?</strong> Payday loan regulations vary
            dramatically by state. Some states cap APRs at 36% or less, while
            others have no limits at all. Always check your state's regulations
            before taking out a loan.
          </p>
        </div>
      </Card>
    </div>
  );
                      state.isRestricted ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <td className="p-2 font-medium">{state.stateName}</td>
                    <td className="text-center p-2">{state.apr}%</td>
                    <td className="text-center p-2">${state.maxLoanAmount}</td>
                    <td className="text-center p-2">
                      {state.isRestricted ? "🛡️ Protected" : "⚠️ High Risk"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Educational Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Did you know?</strong> States with strong payday loan
          regulations see 40% fewer complaints and save consumers millions in
          predatory fees annually.
        </p>
      </div>
    </div>
  );
};

export default StateSpecificMessaging;
