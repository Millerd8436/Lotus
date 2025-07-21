"use client";

import { useState } from "react";
import { Stepper } from "react-form-stepper";
import FinancialSelfAssessment from "@/components/phase4-ethical/FinancialSelfAssessment";
import LoanAffordabilityCalculator from "@/components/phase4-ethical/LoanAffordabilityCalculator";
import CoolingOffPeriod from "@/components/phase4-ethical/CoolingOffPeriod";
import { LegalCaseNotice } from "@/components/regulated/LegalCaseNotice";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { EnhancedLoanCalculator } from "@/lib/core/EnhancedLoanCalculator";

export default function RedesignPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState(500);
  const [hasUsedExtension, setHasUsedExtension] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const regulatedLoan =
    EnhancedLoanCalculator.calculateRegulatedLoan(loanAmount);

  const handleSubmitApplication = () => {
    const sessionId = `REG-${Date.now()}`;
    console.log("Saving session:", {
      sessionId,
      loanAmount,
      regulatedLoan,
    });
    setApplicationSubmitted(true);
  };

  const steps = [
    { label: "Self-Assessment" },
    { label: "Affordability" },
    { label: "Terms" },
    { label: "Cooling Off" },
    { label: "Confirmation" },
  ];

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <FinancialSelfAssessment />;
      case 1:
        return (
          <LoanAffordabilityCalculator
            loanAmount={loanAmount}
            totalRepayment={regulatedLoan.totalCost}
          />
        );
      case 2:
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Loan Terms</h2>

            <div className="mb-4">
              <label htmlFor="loanAmount" className="block text-sm font-medium">
                Loan Amount
              </label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <p>
                <strong>Advertised APR:</strong> {regulatedLoan.apr.toFixed(2)}%
              </p>
              <p>
                <strong>Origination Fee:</strong> $
                {regulatedLoan.fees.origination.toFixed(2)}
              </p>
              <p>
                <strong>Total Repayment:</strong> $
                {regulatedLoan.totalCost.toFixed(2)}
              </p>
            </div>

            <LegalCaseNotice
              capApplied={regulatedLoan.capApplied}
              caseNotice={regulatedLoan.caseNotice}
            />
          </Card>
        );
      case 3:
        return (
          <CoolingOffPeriod
            onConfirm={() => setActiveStep(4)}
            onCancel={() => setActiveStep(0)}
          />
        );
      case 4:
        return (
          <Card className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Application Submitted!
            </h2>
            <p>Your loan is being processed.</p>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Ethical Redesign (CFPB & State Law Compliant)
      </h1>
      <Stepper steps={steps} activeStep={activeStep} />
      <div className="my-8">{renderStepContent()}</div>
      <div className="flex justify-between">
        <Button
          onClick={() => setActiveStep((prev) => prev - 1)}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          onClick={() => setActiveStep((prev) => prev + 1)}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
