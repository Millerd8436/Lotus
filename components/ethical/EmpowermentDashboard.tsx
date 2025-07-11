// components/ethical/EmpowermentDashboard.tsx
"use client";

import React from "react";
import { Button } from "../ui/Button";

interface EmpowermentDashboardProps {
  loanAmount: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  onConfirm: () => void;
  isConfirmed: boolean;
}

const EmpowermentDashboard: React.FC<EmpowermentDashboardProps> = ({
  loanAmount,
  monthlyIncome,
  monthlyExpenses,
  onConfirm,
  isConfirmed,
}) => {
  const netMonthlyCashflow = monthlyIncome - monthlyExpenses;
  const loanRepayment = loanAmount / 3; // Simplified 3-month repayment
  const netCashflowWithLoan = netMonthlyCashflow - loanRepayment;

  const lenderProfit = loanAmount * 0.03; // Simplified 3% profit margin for ethical lender
  const userBenefit = loanAmount * 0.1; // User gets more value than the loan cost (e.g., avoiding bigger fees)
  const positiveUtilityScore = lenderProfit + userBenefit;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-500 sticky top-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        ✅ Empowerment Dashboard
      </h3>

      <div className="space-y-6">
        {/* Financial Future Projection */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">
            Your Financial Future (3-Month Projection)
          </h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Monthly Income:</strong>{" "}
              <span className="text-green-600">
                ${monthlyIncome.toFixed(2)}
              </span>
            </p>
            <p>
              <strong>Monthly Expenses:</strong>{" "}
              <span className="text-red-600">
                -${monthlyExpenses.toFixed(2)}
              </span>
            </p>
            <p className="border-t pt-2 mt-2">
              <strong>Net Monthly Cashflow:</strong>{" "}
              <span className="font-bold text-blue-600">
                ${netMonthlyCashflow.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <h5 className="font-bold text-blue-700">With This Loan:</h5>
            <p className="text-sm">
              <strong>Monthly Repayment (3 mo):</strong>{" "}
              <span className="text-red-600">-${loanRepayment.toFixed(2)}</span>
            </p>
            <p className="text-sm">
              <strong>Projected Net Cashflow:</strong>{" "}
              <span className="font-bold text-green-700">
                ${netCashflowWithLoan.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* Positive Net Utility */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">
            Positive Net Utility Score
          </h4>
          <p className="text-2xl font-bold text-green-600 text-center">
            {positiveUtilityScore.toFixed(0)}
          </p>
          <p className="text-xs text-center text-gray-500 mt-1">
            A loan that benefits everyone.
          </p>
        </div>

        {/* Informed Consent Checklist */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">
            Informed Consent Checklist
          </h4>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-800">
              Please review and confirm you understand the following before
              submitting:
            </p>
            <ul className="list-disc list-inside text-xs mt-2 space-y-1">
              <li>You are borrowing ${loanAmount}.</li>
              <li>
                You will repay a total of $
                {(loanAmount + lenderProfit).toFixed(2)}.
              </li>
              <li>The APR is 36%.</li>
              <li>Payments can be cancelled anytime.</li>
            </ul>
            <Button
              onClick={onConfirm}
              disabled={isConfirmed}
              className="w-full mt-4"
            >
              {isConfirmed ? "✅ Confirmed" : "I Understand and Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpowermentDashboard;
