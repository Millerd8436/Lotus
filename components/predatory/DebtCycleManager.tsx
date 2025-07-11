// components/predatory/DebtCycleManager.tsx
"use client";

import trapScenarios from "@/data/trap_scenarios.json";
import React, { useState } from "react";
import { Button } from "../ui/Button";

interface DebtCycleManagerProps {
  initialLoanAmount: number;
  onComplete: (finalDebt: number, feesPaid: number) => void;
}

const DebtCycleManager: React.FC<DebtCycleManagerProps> = ({
  initialLoanAmount,
  onComplete,
}) => {
  const scenario = trapScenarios.trap_scenarios.debt_cycle_rollover;
  const [cycleIndex, setCycleIndex] = useState(1); // Start at the first rollover opportunity

  const currentStep = scenario.progression[cycleIndex];
  const previousStep = scenario.progression[cycleIndex - 1];

  const handleRollover = () => {
    if (cycleIndex < scenario.progression.length - 1) {
      setCycleIndex(cycleIndex + 1);
    } else {
      // Final step
      onComplete(
        scenario.final_outcome.still_owed,
        scenario.final_outcome.total_fees_paid
      );
    }
  };

  const handlePayInFull = () => {
    if (!previousStep) return;
    onComplete(0, previousStep.total_owed - initialLoanAmount);
  };

  // Prevent rendering if the data is somehow out of bounds
  if (!currentStep || !previousStep) {
    return (
      <div className="text-center text-red-500">
        An error occurred while processing the scenario.
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl mx-auto border-4 border-red-500 animate-pulse-slow">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-red-600">
          Action Required: Payment Due
        </h2>
        <p className="mt-2 text-md text-gray-600">
          Your loan of <span className="font-bold">${initialLoanAmount}</span>{" "}
          is due. You currently owe{" "}
          <span className="font-bold text-red-700">
            ${previousStep.total_owed}
          </span>
          .
        </p>
      </div>

      <div className="p-6 bg-red-50 rounded-lg border border-red-200">
        <h3 className="font-bold text-lg text-gray-800">Your Situation:</h3>
        <p className="mt-2 text-gray-700">{currentStep.notes}</p>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Original Loan:</span>
            <span className="font-mono">${initialLoanAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>New Fees This Cycle:</span>
            <span className="font-mono text-red-500">
              +${currentStep.new_fee}
            </span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>New Total Owed:</span>
            <span className="font-mono">${currentStep.total_owed}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-center font-bold text-gray-800">
          What do you want to do?
        </h3>
        <Button
          onClick={handleRollover}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-3 text-lg hover:from-yellow-600 hover:to-orange-700 shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          {cycleIndex < scenario.progression.length - 1
            ? `Pay \$${currentStep.new_fee} Fee & Extend Loan`
            : "Acknowledge Final Debt"}
        </Button>
        <Button
          onClick={handlePayInFull}
          variant="secondary"
          className="w-full"
        >
          Pay in Full: ${previousStep.total_owed}
        </Button>
      </div>
      <p className="text-xs text-center text-gray-500 pt-4">
        By extending, you agree to our terms and conditions.
      </p>
    </div>
  );
};

export default DebtCycleManager;
