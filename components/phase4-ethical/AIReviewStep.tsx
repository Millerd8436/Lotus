import React from 'react';
import AIUnderwritingSimulator from './AIUnderwritingSimulator';

// Define the types for the component's props
interface AIReviewStepProps {
  onDecision: (decision: any) => void;
  affordability: {
    disposableIncome: number;
    canAfford: boolean;
  } | null;
  loanAmount: number;
}

const AIReviewStep: React.FC<AIReviewStepProps> = ({ onDecision, affordability, loanAmount }) => {
  // For now, we'll use mock user data.
  // In a real application, this would come from previous steps.
  const userData = {
    income: affordability ? affordability.disposableIncome * 12 : 55000,
    creditScore: 690,
    debtToIncomeRatio: affordability ? (loanAmount / (affordability.disposableIncome * 12)) : 0.35,
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">AI Ethical Review</h2>
      <p className="text-center text-gray-600 mb-6">
        Our transparent AI is analyzing your application to ensure this product is a responsible choice for you.
      </p>
      <AIUnderwritingSimulator
        userData={userData}
        onDecision={onDecision}
      />
    </div>
  );
};

export default AIReviewStep; 