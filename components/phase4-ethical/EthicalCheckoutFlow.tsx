"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConsumerProtectionEngine } from "@/lib/core/ConsumerProtectionEngine";
import {
  BookOpen,
  Calculator,
  CheckCircle,
  Heart,
  Lightbulb,
  Scale,
  Timer,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { LoanCalculation } from "./EthicalLoanCalculator";
import AlternativesStep from "@/components/steps/AlternativesStep";
import ConfirmationStep from "@/components/steps/ConfirmationStep";
import CoolingOffStep from "@/components/steps/CoolingOffStep";
import EthicalPrinciplesStep from "@/components/steps/EthicalPrinciplesStep";
import FinalConsentStep from "@/components/steps/FinalConsentStep";
import FinancialEducationStep from "@/components/steps/FinancialEducationStep";
import LoanTermsStep from "@/components/steps/LoanTermsStep";

interface BelmontPrinciple {
  name: string;
  description: string;
  implementation: string;
}

const EthicalCheckoutFlow: React.FC<{
  loanAmount: number;
  onBack: () => void;
}> = ({ loanAmount: initialAmount, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState(initialAmount);
  const [hasReadEducation, setHasReadEducation] = useState(false);
  const [hasReviewedAlternatives, setHasReviewedAlternatives] = useState(false);
  const [loanCalculation, setLoanCalculation] =
    useState<LoanCalculation | null>(null);
  const [coolingOffCompleted, setCoolingOffCompleted] = useState(false);
  const [consentItems, setConsentItems] = useState<Record<string, boolean>>({});
  const [finalConsent, setFinalConsent] = useState(false);
  const [feelsRespected, setFeelsRespected] = useState<boolean | null>(null);

  const resetState = () => {
    setCurrentStep(0);
    setLoanAmount(initialAmount);
    setHasReadEducation(false);
    setHasReviewedAlternatives(false);
    setLoanCalculation(null);
    setCoolingOffCompleted(false);
    setConsentItems({});
    setFinalConsent(false);
    setFeelsRespected(null);
  };

  const ethicalAlternatives = ConsumerProtectionEngine.getEthicalAlternatives(
    loanAmount,
    "US" // Placeholder state
  );

  const belmontPrinciples: BelmontPrinciple[] = [
    {
      name: "Respect for Persons (Autonomy)",
      description:
        "Treat individuals as autonomous agents capable of making their own informed choices.",
      implementation:
        "We provide full transparency, a 24-hour cooling-off period, and a meta-consent check to ensure your decision is truly your own.",
    },
    {
      name: "Beneficence (Do Good)",
      description:
        "Maximize potential benefits and act in the best interests of the individual.",
      implementation:
        "We offer free financial counseling and proactively present lower-cost alternatives, even if it means you don't take our loan.",
    },
    {
      name: "Non-Maleficence (Do No Harm)",
      description:
        "Minimize the risks of harm and avoid exploiting vulnerabilities.",
      implementation:
        "Our loans have a 36% APR cap and clear terms to prevent debt traps. We conduct an affordability check to ensure the loan is manageable.",
    },
    {
      name: "Justice (Fairness)",
      description:
        "Ensure the burdens and benefits of the process are distributed equitably.",
      implementation:
        "Our terms are the same for everyone, regardless of background. We also contribute a portion of our proceeds to community financial literacy programs.",
    },
  ];

  const steps = [
    {
      title: "Ethical Principles Foundation",
      subtitle: "Our Commitment to the Belmont Report",
      icon: <Scale className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Financial Education",
      subtitle: "Understanding Loan Costs & Risks",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Alternative Solutions",
      subtitle: "Better Options Available",
      icon: <Lightbulb className="w-6 h-6 text-yellow-600" />,
    },
    {
      title: "Financial Assessment",
      subtitle: "Can You Afford This Loan?",
      icon: <Calculator className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Mandatory Cooling-Off",
      subtitle: "24-Hour Reflection Period",
      icon: <Timer className="w-6 h-6 text-red-600" />,
    },
    {
      title: "Financial Counseling",
      subtitle: "Free Expert Guidance",
      icon: <Users className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: "Informed Consent",
      subtitle: "Your Autonomous Decision",
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Final Confirmation",
      subtitle: "Ensuring Voluntary Choice",
      icon: <Heart className="w-6 h-6 text-purple-600" />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return hasReadEducation;
      case 2:
        return hasReviewedAlternatives;
      case 4:
        return coolingOffCompleted;
      case 5:
        return finalConsent;
      case 6:
        return feelsRespected === true;
      default:
        return true;
    }
  };

  const currentStepData = steps[currentStep] || steps[0];
  // const loanDetails = calculateLoan(); // No longer needed

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌸 Ethical Lending with Belmont Principles
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Guided by respect for human dignity and your autonomous choice
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[800px]">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 relative">
                <div
                  className={`flex flex-col items-center ${
                    index <= currentStep ? "text-purple-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      index < currentStep
                        ? "bg-purple-600 border-purple-600 text-white"
                        : index === currentStep
                        ? "border-purple-600 bg-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="text-xs mt-2 text-center max-w-20">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-6 left-1/2 w-full h-0.5 ${
                      index < currentStep ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 mb-6 border-2 border-purple-200 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            {currentStepData?.icon}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {currentStepData?.title}
              </h2>
              <p className="text-gray-600">{currentStepData?.subtitle}</p>
            </div>
          </div>

          {/* Step 0: Ethical Principles Foundation */}
          {currentStep === 0 && <EthicalPrinciplesStep />}

          {/* Step 1: Financial Education */}
          {currentStep === 1 && (
            <FinancialEducationStep
              loanAmount={loanAmount}
              hasReadEducation={hasReadEducation}
              onReadEducationChange={setHasReadEducation}
            />
          )}

          {/* Step 2: Alternatives */}
          {currentStep === 2 && <AlternativesStep />}

          {/* Step 3: Loan Terms & Calculator */}
          {currentStep === 3 && (
            <LoanTermsStep
              initialAmount={loanAmount}
              onCalculationChange={setLoanCalculation}
            />
          )}

          {/* Step 4: Cooling-Off Period */}
          {currentStep === 4 && (
            <CoolingOffStep
              onCoolingOffComplete={() => setCoolingOffCompleted(true)}
            />
          )}

          {/* Step 5: Final Consent (Meta-Consent) */}
          {currentStep === 5 && (
            <FinalConsentStep
              consentItems={consentItems}
              onConsentChange={(key, value) =>
                setConsentItems((prev) => ({ ...prev, [key]: value }))
              }
            />
          )}

          {/* Step 6: Informed Consent */}
          {currentStep === 6 && (
            <ConfirmationStep
              feelsRespected={feelsRespected}
              onSetFeelsRespected={setFeelsRespected}
            />
          )}

          {/* Final Step: Submission Success/Fail */}
          {currentStep === 7 && (
            <div className="text-center">
              <h3 className="text-3xl font-bold text-purple-800 mb-4">
                Thank You for Your Application!
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Your ethical application has been submitted. We will review it
                and get back to you shortly.
              </p>
              <p className="text-gray-600">
                If you have any questions or need immediate assistance, please
                contact our ethics helpline at 1-800-LOTUS-ETHICS.
              </p>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button onClick={handleBack} variant="secondary" className="px-6">
            {currentStep === 0 ? "Cancel" : "Back"}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={canProceed() ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            {currentStep === steps.length - 1
              ? "Complete Ethical Application"
              : "Continue"}
          </Button>
        </div>

        {/* Help Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 space-y-2">
          <p>🌸 Questions? Call our ethics helpline: 1-800-LOTUS-ETHICS</p>
          <p>
            📧 Email: ethics@lotus-lending.org |
            <Link
              href="/ethics-policy"
              className="text-purple-600 hover:underline ml-1"
            >
              Read our full ethics policy
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            This process follows Kantian categorical imperative principles and
            respects your fundamental human dignity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EthicalCheckoutFlow;
