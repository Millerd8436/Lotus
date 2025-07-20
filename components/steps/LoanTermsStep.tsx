"use client";

import { Card } from "@/components/ui/Card";
import React, { useState } from "react";
import EthicalLoanCalculator, {
  LoanCalculation,
} from "../EthicalLoanCalculator";

interface LoanTermsStepProps {
  initialAmount: number;
  onCalculationChange: (details: LoanCalculation | null) => void;
}

const LoanTermsStep: React.FC<LoanTermsStepProps> = ({
  initialAmount,
  onCalculationChange,
}) => {
  const [loanDetails, setLoanDetails] = useState<LoanCalculation | null>(null);

  const handleCalcChange = (details: LoanCalculation) => {
    setLoanDetails(details);
    onCalculationChange(details);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800">
          Transparent Loan Terms
        </h3>
        <p className="text-gray-600 mt-2">
          No hidden fees, no complex jargon. Here's exactly what you'll pay.
        </p>
      </div>
      <EthicalLoanCalculator
        initialAmount={initialAmount}
        onCalculationChange={handleCalcChange}
      />
      {loanDetails && (
        <Card className="bg-gray-50 p-6">
          <h4 className="font-semibold text-lg mb-4">Your Commitment</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Principal:</span>
              <span className="font-mono">
                ${loanDetails.principal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Fees:</span>
              <span className="font-mono">
                ${loanDetails.totalFees.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-2 mt-2">
              <span>Total Repayment:</span>
              <span className="font-mono">
                ${loanDetails.totalRepayment.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>APR:</span>
              <span className="font-mono">{loanDetails.apr}%</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Repayment Date:</span>
              <span className="font-mono">{loanDetails.repaymentDate}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LoanTermsStep;
