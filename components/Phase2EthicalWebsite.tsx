"use client";

import React, { useMemo, useState } from "react";
import CoolingOffNotice from "./ethical/CoolingOffNotice";
import { Button } from "./ui/Button";
import { Checkbox } from "./ui/Checkbox";
import { Slider } from "./ui/Slider";

// --- Constants for Ethical Loan Calculations (PALs Model) ---
const MAX_APR = 28.0; // Maximum 28% APR for PALs I
const MAX_APPLICATION_FEE = 20.0; // Maximum $20 application fee

// --- Helper Function for Ethical Calculation ---
const calculateEthicalLoan = (principal: number, termInMonths: number) => {
  // Convert APR from percentage to a decimal for calculations
  const annualRateDecimal = MAX_APR / 100;

  // Calculate interest based on a simple interest formula
  const termInYears = termInMonths / 12;
  const interest = principal * annualRateDecimal * termInYears;

  // Total cost includes principal, interest, and the one-time application fee
  const totalRepayment = principal + interest + MAX_APPLICATION_FEE;

  // Recalculate the true APR including the application fee
  const totalFinanceCharge = interest + MAX_APPLICATION_FEE;
  // Handle the edge case of a 0-year term to avoid division by zero
  const trueAPR =
    termInYears > 0 ? (totalFinanceCharge / principal / termInYears) * 100 : 0;

  return {
    principal: principal.toFixed(2),
    termInMonths,
    interest: interest.toFixed(2),
    applicationFee: MAX_APPLICATION_FEE.toFixed(2),
    totalRepayment: totalRepayment.toFixed(2),
    monthlyPayment: (totalRepayment / termInMonths).toFixed(2),
    apr: trueAPR.toFixed(2),
  };
};

const Phase2EthicalWebsite: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // Loan amount constrained by PALs rules ($200-$1000)
  const [loanAmount, setLoanAmount] = useState<number>(500);
  // Payback period constrained by PALs rules (1-6 months)
  const [paybackPeriod, setPaybackPeriod] = useState<number>(3); // in months
  const [understandsTerms, setUnderstandsTerms] = useState<boolean>(false);

  const loanTerms = useMemo(
    () => calculateEthicalLoan(loanAmount, paybackPeriod),
    [loanAmount, paybackPeriod]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (understandsTerms) {
      setIsSubmitted(true);
    } else {
      alert(
        "Please check the box to confirm you understand the total cost of your loan."
      );
    }
  };

  const renderApplicationForm = () => (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Transparent Loan Application
      </h1>
      <p className="text-gray-600 mb-6">
        We believe in clear, upfront terms. No hidden fees, no surprises. This
        calculator is based on the federal Payday Alternative Loan (PAL) model.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- LOAN CONTROLS --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="loanAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Loan Amount:{" "}
              <span className="font-bold text-blue-600">${loanAmount}</span>
            </label>
            <Slider
              id="loanAmount"
              min={200} // PALs Minimum
              max={1000} // PALs Maximum
              step={50}
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0] || 0)}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>$200</span>
              <span>$1000</span>
            </div>
          </div>
          <div>
            <label
              htmlFor="paybackPeriod"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Payback Period:{" "}
              <span className="font-bold text-blue-600">
                {paybackPeriod} months
              </span>
            </label>
            <Slider
              id="paybackPeriod"
              min={1} // PALs Minimum
              max={6} // PALs Maximum
              step={1}
              value={[paybackPeriod]}
              onValueChange={(value) => setPaybackPeriod(value[0] || 0)}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 month</span>
              <span>6 months</span>
            </div>
          </div>
          <div className="pt-4">
            <div className="flex items-start">
              <Checkbox
                id="understandsTerms"
                checked={understandsTerms}
                onCheckedChange={(checked: boolean) =>
                  setUnderstandsTerms(checked)
                }
              />
              <div className="ml-3 text-sm">
                <label
                  htmlFor="understandsTerms"
                  className="font-medium text-gray-700"
                >
                  I understand the total cost and repayment schedule of my loan.
                </label>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            fullWidth
            disabled={!understandsTerms}
            size="lg"
          >
            Confirm & Submit Application
          </Button>
        </form>

        {/* --- TOTAL COST CALCULATOR --- */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 space-y-4">
          <h3 className="text-xl font-bold text-gray-800 text-center">
            Total Cost of Your Loan
          </h3>
          <div className="flex justify-between items-baseline">
            <span className="text-gray-600">Amount Borrowed:</span>
            <span className="text-2xl font-bold text-gray-800">
              ${loanTerms.principal}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              Total Interest (at {MAX_APR}%):
            </span>
            <span className="font-mono text-gray-800">
              ${loanTerms.interest}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Application Fee:</span>
            <span className="font-mono text-gray-800">
              ${loanTerms.applicationFee}
            </span>
          </div>
          <hr className="border-dashed" />
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-gray-800">Total You Repay:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${loanTerms.totalRepayment}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-gray-800">Effective APR:</span>
            <span className="text-2xl font-bold text-blue-600">
              {loanTerms.apr}%
            </span>
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
      </div>
    </div>
  );

  return isSubmitted ? <CoolingOffNotice /> : renderApplicationForm();
};

export default Phase2EthicalWebsite;
