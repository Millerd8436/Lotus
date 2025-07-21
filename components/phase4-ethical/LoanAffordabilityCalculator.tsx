import React, { useState, useEffect } from 'react';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

interface LoanAffordabilityCalculatorProps {
  loanAmount: number;
  totalRepayment: number;
  onAffordabilityChange: (data: { disposableIncome: number, canAfford: boolean }) => void;
}

const LoanAffordabilityCalculator: React.FC<LoanAffordabilityCalculatorProps> = ({ loanAmount, totalRepayment, onAffordabilityChange }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(3000); // Example value
  const [monthlyExpenses, setMonthlyExpenses] = useState(1800); // Example value
  const [showProjection, setShowProjection] = useState(false);

  const netMonthlyCashflow = monthlyIncome - monthlyExpenses;
  const loanRepaymentMonthly = totalRepayment / 3; // Simplified 3-month repayment
  const netCashflowWithLoan = netMonthlyCashflow - loanRepaymentMonthly;

  useEffect(() => {
    if (showProjection) {
      onAffordabilityChange({
        disposableIncome: netMonthlyCashflow,
        canAfford: netCashflowWithLoan >= 0,
      });
    }
  }, [netMonthlyCashflow, netCashflowWithLoan, onAffordabilityChange, showProjection]);

  const handleCalculateClick = () => {
    setShowProjection(true);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Loan Affordability Calculator</h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Let's get a clear picture of your finances to see how this loan fits into your budget.
      </p>
      <div className="space-y-4">
        <div>
          <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700">
            Your Approximate Monthly Income
          </label>
          <Input
            id="monthlyIncome"
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="mt-1"
            placeholder="$3000"
          />
        </div>
        <div>
          <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-gray-700">
            Your Approximate Monthly Expenses
          </label>
          <Input
            id="monthlyExpenses"
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            className="mt-1"
            placeholder="$1800"
          />
        </div>
        <div>
          <Button onClick={handleCalculateClick} className="w-full">
            {showProjection ? 'Recalculate Projection' : 'Calculate Financial Projection'}
          </Button>
        </div>
        
        {showProjection && (
          <div className="mt-6 animate-fade-in">
            <h3 className="font-semibold text-gray-800 mb-3 text-lg text-center">Your Financial Future (3-Month Projection)</h3>
            <div className="space-y-2 text-sm p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between">
                <strong>Monthly Income:</strong>
                <span className="text-green-600 font-medium">${monthlyIncome.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <strong>Monthly Expenses:</strong>
                <span className="text-red-600 font-medium">-${monthlyExpenses.toFixed(2)}</span>
              </div>
              <p className="border-t pt-2 mt-2 flex justify-between">
                <strong>Net Monthly Cashflow:</strong>
                <span className="font-bold text-blue-600">${netMonthlyCashflow.toFixed(2)}</span>
              </p>
            </div>
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 text-center">With This Loan:</h4>
              <div className="space-y-2 text-sm mt-2">
                 <div className="flex justify-between">
                  <strong>Monthly Repayment (for 3 mo):</strong>
                  <span className="text-red-600 font-medium">-${loanRepaymentMonthly.toFixed(2)}</span>
                </div>
                <p className="border-t pt-2 mt-2 flex justify-between text-base">
                  <strong>Projected Net Cashflow:</strong>
                  <span className={`font-bold ${netCashflowWithLoan >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    ${netCashflowWithLoan.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
             <p className={`text-center mt-4 font-semibold ${netCashflowWithLoan >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              {netCashflowWithLoan >= 0 ? 'This loan appears to be manageable within your budget.' : 'Warning: This loan would leave you with a negative monthly cashflow.'}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LoanAffordabilityCalculator;
