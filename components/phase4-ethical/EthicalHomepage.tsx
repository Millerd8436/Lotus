"use client";

import { useState } from "react";
import { Stepper } from "react-form-stepper";
import FinancialSelfAssessment from "./FinancialSelfAssessment";
import LoanAffordabilityCalculator from "./LoanAffordabilityCalculator";
import CoolingOffPeriod from "./CoolingOffPeriod";
import AIReviewStep from "./AIReviewStep";
import HyperPersonalizedGuidance from "./HyperPersonalizedGuidance";
import InformedConsentStep from "./InformedConsentStep";
import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Input } from "@/components/shared/Input";
import { EnhancedLoanCalculator } from "@/core/core/EnhancedLoanCalculator";
import { type UnderwritingDecision } from "./AIUnderwritingSimulator";
// Note: Removed LegalCaseNotice as it seems specific to a regulated flow we are replacing.

interface AffordabilityData {
  disposableIncome: number;
  canAfford: boolean;
}

export default function EthicalHomepage() {
  // Renamed from RedesignPage
  const [activeStep, setActiveStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState(500);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [aiDecision, setAiDecision] = useState<UnderwritingDecision | null>(
    null
  );
  const [affordabilityData, setAffordabilityData] =
    useState<AffordabilityData | null>(null);

  const regulatedLoan =
    EnhancedLoanCalculator.calculateRegulatedLoan(loanAmount);

  const handleAIDecision = (decision: UnderwritingDecision) => {
    setAiDecision(decision);
  };

  const handleAffordabilityChange = (data: AffordabilityData) => {
    setAffordabilityData(data);
  };

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const steps = [
    { label: "Self-Assessment" },
    { label: "Affordability" },
    { label: "Terms" },
    { label: "AI Review" },
    { label: "Cooling Off" },
    { label: "Final Confirmation" },
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
            onAffordabilityChange={handleAffordabilityChange}
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
          </Card>
        );
      case 3:
        return (
          <div>
            <AIReviewStep
              onDecision={handleAIDecision}
              affordability={affordabilityData}
              loanAmount={loanAmount}
            />
            {aiDecision && (
              <HyperPersonalizedGuidance
                decision={aiDecision}
                loanAmount={loanAmount}
              />
            )}
          </div>
        );
      case 4:
        return (
          <CoolingOffPeriod onConfirm={handleNextStep} onCancel={handlePrevStep} />
        );
      case 5:
        return (
          <InformedConsentStep
            loanAmount={loanAmount}
            totalRepayment={regulatedLoan.totalCost}
            apr={regulatedLoan.apr}
            onConfirm={() => {
              console.log("Application Submitted with full consent.");
              setApplicationSubmitted(true);
              setActiveStep((prev) => prev + 1);
            }}
          />
        );
      case 6:
        return (
          <Card className="p-6 text-center bg-green-50">
            <h2 className="text-2xl font-bold mb-4 text-green-800">
              Application Successfully Submitted!
            </h2>
            <p className="text-gray-700">
              Thank you for choosing a transparent and ethical lending option.
              You will receive a confirmation email shortly.
            </p>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl bg-gray-50">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Ethical & Transparent Lending
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          A better way to borrow, designed for your well-being.
        </p>
      </header>
      <Stepper steps={steps} activeStep={activeStep} />
      <div className="my-8">{renderStepContent()}</div>

      {activeStep < steps.length && (
        <div className="flex justify-between">
          <Button
            onClick={() => setActiveStep((prev) => prev - 1)}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (activeStep === 1 && !affordabilityData?.canAfford) return;
              if (activeStep === 3 && !aiDecision) return;
              setActiveStep((prev) => prev + 1);
            }}
            disabled={activeStep === steps.length - 1 || activeStep === 5}
          >
            {activeStep === 3 && !aiDecision ? "Awaiting AI..." : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}
