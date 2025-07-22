"use client";

import React, { useState } from "react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface IncomeVerificationStepProps {
  onNext: () => void;
  onPrevious: () => void;
  onIncomeVerified: (data: IncomeData) => void;
}

interface IncomeData {
  monthlyIncome: number;
  incomeSource: string;
  employmentType: string;
  isVerified: boolean;
  debtToIncomeRatio?: number;
}

export const IncomeVerificationStep: React.FC<IncomeVerificationStepProps> = ({
  onNext,
  onPrevious,
  onIncomeVerified,
}) => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [monthlyDebts, setMonthlyDebts] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  const handleVerification = () => {
    const income = parseFloat(monthlyIncome);
    const debts = parseFloat(monthlyDebts) || 0;
    const debtToIncomeRatio = debts / income;

    const incomeData: IncomeData = {
      monthlyIncome: income,
      incomeSource,
      employmentType,
      isVerified: true,
      debtToIncomeRatio,
    };

    setIsVerified(true);
    onIncomeVerified(incomeData);
  };

  const isFormValid = monthlyIncome && incomeSource && employmentType;
  const income = parseFloat(monthlyIncome) || 0;
  const debts = parseFloat(monthlyDebts) || 0;
  const debtToIncomeRatio = income > 0 ? (debts / income) * 100 : 0;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Income Verification
          </h2>
          <p className="text-gray-600">
            We need to verify your income to ensure you can comfortably repay the loan
          </p>
        </div>

        {/* Educational Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">
                Why We Ask for Income Information
              </h3>
              <p className="text-sm text-blue-800">
                We use your income information to calculate your debt-to-income ratio and ensure 
                you can afford the loan payments without financial strain. This protects you from 
                taking on unmanageable debt.
              </p>
              <button
                onClick={() => setShowEducation(!showEducation)}
                className="text-sm text-blue-600 hover:text-blue-700 underline mt-2"
              >
                {showEducation ? "Hide" : "Learn more about responsible lending"}
              </button>
            </div>
          </div>
        </div>

        {showEducation && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Responsible Lending Standards</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Debt-to-income ratio should ideally be below 36%</li>
              <li>• We verify income to prevent over-lending</li>
              <li>• Your employment stability affects loan terms</li>
              <li>• We're required by law to assess your ability to repay</li>
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Gross Income *
            </label>
            <Input
              id="monthlyIncome"
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="Enter your monthly income"
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Include all sources of regular income
            </p>
          </div>

          <div>
            <label htmlFor="monthlyDebts" className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Debt Payments
            </label>
            <Input
              id="monthlyDebts"
              type="number"
              value={monthlyDebts}
              onChange={(e) => setMonthlyDebts(e.target.value)}
              placeholder="Total monthly debt payments"
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Credit cards, loans, rent/mortgage, etc.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="incomeSource" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Income Source *
            </label>
            <select
              id="incomeSource"
              value={incomeSource}
              onChange={(e) => setIncomeSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select income source</option>
              <option value="employment">Employment</option>
              <option value="self-employed">Self-Employed</option>
              <option value="benefits">Government Benefits</option>
              <option value="pension">Pension/Retirement</option>
              <option value="disability">Disability Benefits</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type *
            </label>
            <select
              id="employmentType"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select employment type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract/Freelance</option>
              <option value="temporary">Temporary</option>
              <option value="retired">Retired</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>
        </div>

        {/* Debt-to-Income Ratio Display */}
        {income > 0 && (
          <div className={`border rounded-lg p-4 ${
            debtToIncomeRatio > 36 ? 'bg-red-50 border-red-200' : 
            debtToIncomeRatio > 28 ? 'bg-yellow-50 border-yellow-200' : 
            'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {debtToIncomeRatio > 36 ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <h3 className="font-medium">
                Debt-to-Income Ratio: {debtToIncomeRatio.toFixed(1)}%
              </h3>
            </div>
            <p className={`text-sm ${
              debtToIncomeRatio > 36 ? 'text-red-700' : 
              debtToIncomeRatio > 28 ? 'text-yellow-700' : 
              'text-green-700'
            }`}>
              {debtToIncomeRatio > 36 
                ? "Your debt-to-income ratio is high. We may need to discuss alternative options or a smaller loan amount."
                : debtToIncomeRatio > 28
                ? "Your debt-to-income ratio is manageable but approaching recommended limits."
                : "Your debt-to-income ratio looks healthy for taking on additional debt."
              }
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleVerification}
            disabled={!isFormValid}
            className="flex-1"
          >
            {isVerified ? "✓ Income Verified" : "Verify Income"}
          </Button>
        </div>

        {isVerified && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="font-medium text-green-900">Income Successfully Verified</p>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Your income information has been verified and you can proceed to the next step.
            </p>
          </div>
        )}

        <div className="flex justify-between pt-4 border-t">
          <Button onClick={onPrevious} variant="outline">
            Previous
          </Button>
          <Button onClick={onNext} disabled={!isVerified}>
            Continue
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default IncomeVerificationStep; 