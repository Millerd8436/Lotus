import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface LoanAffordabilityCalculatorProps {
  loanAmount: number;
  totalRepayment: number;
}

const LoanAffordabilityCalculator: React.FC<LoanAffordabilityCalculatorProps> = ({ loanAmount, totalRepayment }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [affordabilityResult, setAffordabilityResult] = useState<string | null>(null);

  const calculateAffordability = () => {
    const disposableIncome = monthlyIncome - monthlyExpenses;
    if (disposableIncome < totalRepayment) {
      setAffordabilityResult('Based on your income and expenses, this loan is likely unaffordable and could lead to financial hardship.');
    } else {
      setAffordabilityResult('Based on your income and expenses, this loan appears to be affordable. However, please consider any unexpected expenses that may arise.');
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Loan Affordability Calculator</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="monthlyIncome" className="block text-sm font-medium">
            Monthly Income
          </label>
          <Input
            id="monthlyIncome"
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="monthlyExpenses" className="block text-sm font-medium">
            Monthly Expenses
          </label>
          <Input
            id="monthlyExpenses"
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            className="mt-1"
          />
        </div>
        <div>
          <Button onClick={calculateAffordability} className="w-full">
            Calculate Affordability
          </Button>
        </div>
        {affordabilityResult && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p>{affordabilityResult}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LoanAffordabilityCalculator;
