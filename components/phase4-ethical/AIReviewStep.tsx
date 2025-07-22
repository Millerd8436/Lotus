import React from 'react';
import AIUnderwritingSimulator from './AIUnderwritingSimulator';

interface IncomeData {
  monthlyIncome: number;
  incomeSource: string;
  employmentType: string;
  isVerified: boolean;
  debtToIncomeRatio?: number;
}

// Define the types for the component's props
interface AIReviewStepProps {
  onDecision: (decision: any) => void;
  affordability: {
    disposableIncome: number;
    canAfford: boolean;
  } | null;
  loanAmount: number;
  incomeData?: IncomeData | null;
}

const AIReviewStep: React.FC<AIReviewStepProps> = ({ onDecision, affordability, loanAmount, incomeData }) => {
  // Use income data from previous steps when available
  const userData = {
    income: incomeData?.monthlyIncome ? incomeData.monthlyIncome * 12 : (affordability ? affordability.disposableIncome * 12 : 55000),
    creditScore: 690,
    debtToIncomeRatio: incomeData?.debtToIncomeRatio || (affordability ? (loanAmount / (affordability.disposableIncome * 12)) : 0.35),
    incomeSource: incomeData?.incomeSource || 'employment',
    employmentType: incomeData?.employmentType || 'full-time',
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">AI Ethical Review</h2>
      <p className="text-center text-gray-600 mb-6">
        Our transparent AI is analyzing your application to ensure this product is a responsible choice for you.
      </p>
      {incomeData && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-medium text-blue-900 mb-2">Reviewing Your Income Information</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>Monthly Income: ${incomeData.monthlyIncome.toLocaleString()}</p>
            <p>Income Source: {incomeData.incomeSource}</p>
            <p>Employment Type: {incomeData.employmentType}</p>
            {incomeData.debtToIncomeRatio && (
              <p>Debt-to-Income Ratio: {(incomeData.debtToIncomeRatio * 100).toFixed(1)}%</p>
            )}
          </div>
        </div>
      )}
      <AIUnderwritingSimulator
        userData={userData}
        onDecision={onDecision}
      />
    </div>
  );
};

export default AIReviewStep; 