"use client";

import React from "react";
import { Button } from "../ui/Button";

interface EthicalLoanSummaryProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  loanTerms: {
    principal: string;
    termInMonths: number;
    interest: string;
    applicationFee: string;
    totalRepayment: string;
    monthlyPayment: string;
    apr: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

const EthicalLoanSummary: React.FC<EthicalLoanSummaryProps> = ({
  formData,
  loanTerms,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Please Confirm Your Loan
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Review all the details below before finalizing your application.
      </p>

      {/* --- User Information Review --- */}
      <div className="mb-8 p-4 border rounded-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Your Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-500">Full Name:</span>
            <p className="font-semibold text-gray-800">
              {formData.firstName} {formData.lastName}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-500">Email:</span>
            <p className="font-semibold text-gray-800">{formData.email}</p>
          </div>
        </div>
      </div>

      {/* --- Loan Terms Review --- */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Final Loan Terms
        </h2>
        <div className="flex justify-between items-baseline">
          <span className="text-gray-600">Amount Borrowed:</span>
          <span className="text-2xl font-bold text-gray-800">
            ${loanTerms.principal}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Interest:</span>
          <span className="font-mono text-gray-800">${loanTerms.interest}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Application Fee:</span>
          <span className="font-mono text-gray-800">
            ${loanTerms.applicationFee}
          </span>
        </div>
        <hr className="border-dashed" />
        <div className="flex justify-between items-baseline text-blue-600">
          <span className="font-bold">Total You Repay:</span>
          <span className="text-2xl font-bold">
            ${loanTerms.totalRepayment}
          </span>
        </div>
        <div className="flex justify-between items-baseline text-blue-600">
          <span className="font-bold">Effective APR:</span>
          <span className="text-2xl font-bold">{loanTerms.apr}%</span>
        </div>
        <div className="mt-4 p-4 bg-white rounded-md text-center">
          <p className="font-bold text-lg text-gray-800">
            {loanTerms.termInMonths} Monthly Payments of
          </p>
          <p className="font-bold text-3xl text-green-600">
            ${loanTerms.monthlyPayment}
          </p>
        </div>
      </div>

      {/* --- Confirmation and Actions --- */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 mb-4">
          By clicking "Agree & Accept Loan", you are electronically signing and
          agreeing to the terms of this loan. You have the right to cancel this
          loan within 3 business days without penalty.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={onCancel} variant="secondary" size="lg">
            Cancel & Review
          </Button>
          <Button onClick={onConfirm} size="lg">
            Agree & Accept Loan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EthicalLoanSummary;
