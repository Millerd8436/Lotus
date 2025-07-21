"use client";

import React from "react";

interface FinancialEducationStepProps {
  loanAmount: number;
  hasReadEducation: boolean;
  onReadEducationChange: (checked: boolean) => void;
}

const FinancialEducationStep: React.FC<FinancialEducationStepProps> = ({
  loanAmount,
  hasReadEducation,
  onReadEducationChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">
          Understanding Small Dollar Loans: The Complete Picture
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              ✅ When Loans Make Sense
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• True emergency (medical, car repair)</li>
              <li>• You have steady income</li>
              <li>• You can repay in 30-60 days</li>
              <li>• No other options available</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">
              ❌ When to Avoid Loans
            </h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Paying for wants vs needs</li>
              <li>• Income is uncertain</li>
              <li>• Already struggling with debt</li>
              <li>• Better alternatives exist</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-900 mb-3">
          The True Cost of Borrowing
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Amount You Need:</span>
              <span className="text-xl font-bold text-green-600">
                ${loanAmount}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Our Ethical Rate (36% APR):</span>
              <span className="text-xl font-bold text-blue-600">
                ${((loanAmount * 0.36 * 60) / 365).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 border-t pt-2">
              <span className="font-semibold">Total You Repay:</span>
              <span className="text-2xl font-bold text-purple-600">
                ${(loanAmount + (loanAmount * 0.36 * 60) / 365 + 1).toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Compare to typical payday loan: ${(loanAmount * 3.91).toFixed(2)}{" "}
              for same amount!
            </div>
          </div>
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={hasReadEducation}
          onChange={(e) => onReadEducationChange(e.target.checked)}
          className="mt-1"
        />
        <span className="text-gray-700">
          I have read and understood the complete cost information and when
          loans make sense
        </span>
      </label>
    </div>
  );
};

export default FinancialEducationStep;
