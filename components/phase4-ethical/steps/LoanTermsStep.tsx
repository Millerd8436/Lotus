"use client";

import React from 'react';
import { Card } from '@/components/shared/Card';
import { Input } from '@/components/shared/Input';

interface LoanTermsStepProps {
  loanAmount: number;
  onLoanAmountChange: (amount: number) => void;
  apr: number;
  fees: {
    origination: number;
  };
  totalCost: number;
}

const LoanTermsStep: React.FC<LoanTermsStepProps> = ({
  loanAmount,
  onLoanAmountChange,
  apr,
  fees,
  totalCost
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Review Your Loan Terms</h3>
      <p className="text-gray-700 mb-4">
        Review the transparent cost breakdown of your loan below.
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount
          </label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => onLoanAmountChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Loan Amount:</span>
            <span className="font-medium">${loanAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">APR:</span>
            <span className="font-medium">{apr.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Origination Fee:</span>
            <span className="font-medium">${fees.origination.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="font-semibold">Total Cost:</span>
            <span className="font-semibold text-lg">${totalCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Transparent Pricing</h4>
          <p className="text-sm text-blue-800">
            All fees and costs are clearly displayed above. There are no hidden charges or surprise fees.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LoanTermsStep;
