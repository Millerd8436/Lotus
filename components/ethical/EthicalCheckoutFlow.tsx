"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EnhancedLoanCalculator } from "@/lib/core/EnhancedLoanCalculator";
import {
  Calculator,
  Clock,
  FileText,
  Heart,
  Info,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface EthicalCheckoutFlowProps {
  loanAmount: number;
  onBack: () => void;
}

const EthicalCheckoutFlow: React.FC<EthicalCheckoutFlowProps> = ({
  loanAmount: initialAmount,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState(initialAmount);
  const [hasReadEducation, setHasReadEducation] = useState(false);
  const [hasReviewedAlternatives, setHasReviewedAlternatives] = useState(false);
  const [coolingOffAcknowledged, setCoolingOffAcknowledged] = useState(false);
  const [consentItems, setConsentItems] = useState<Record<string, boolean>>({
    understandAPR: false,
    understandTotalCost: false,
    exploredAlternatives: false,
    canAffordPayments: false,
    rightToCancel: false,
  });

  const steps = [
    {
      title: "Welcome & Education",
      subtitle: "Understanding Your Options",
      icon: <Heart className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Financial Assessment",
      subtitle: "Can You Afford This Loan?",
      icon: <Calculator className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Alternative Options",
      subtitle: "Better Solutions Available",
      icon: <Users className="w-6 h-6 text-purple-600" />,
    },
    {
      title: "Clear Terms & Costs",
      subtitle: "Full Transparency",
      icon: <FileText className="w-6 h-6 text-orange-600" />,
    },
    {
      title: "Cooling-Off Period",
      subtitle: "Time to Consider",
      icon: <Clock className="w-6 h-6 text-red-600" />,
    },
    {
      title: "Informed Consent",
      subtitle: "Your Decision",
      icon: <Shield className="w-6 h-6 text-green-600" />,
    },
  ];

  const calculateLoan = () => {
    const comparison = EnhancedLoanCalculator.compareLoanOptions(
      loanAmount,
      30
    );
    return comparison;
  };

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
      case 0:
        return hasReadEducation;
      case 2:
        return hasReviewedAlternatives;
      case 4:
        return coolingOffAcknowledged;
      case 5:
        return Object.values(consentItems).every((v) => v);
      default:
        return true;
    }
  };

  const currentStepData = steps[currentStep];
  const loanDetails = calculateLoan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Ethical Loan Application
          </h1>
          <p className="text-gray-600">
            We're committed to your financial wellbeing
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 relative">
                <div
                  className={`flex flex-col items-center ${
                    index <= currentStep ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      index < currentStep
                        ? "bg-green-600 border-green-600 text-white"
                        : index === currentStep
                        ? "border-green-600 bg-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 ${
                      index < currentStep ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            {currentStepData.icon}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600">{currentStepData.subtitle}</p>
            </div>
          </div>

          {/* Step 0: Education */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Before You Borrow: Important Information
                </h3>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start gap-2">
                    <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>
                      Small dollar loans should only be used for true
                      emergencies
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>
                      Our maximum APR is 36% - far below industry standards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>
                      We offer free financial counseling to all applicants
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>
                      You have the right to cancel within 3 business days
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-3">
                  Warning Signs to Avoid
                </h3>
                <ul className="space-y-2 text-yellow-800 text-sm">
                  <li>• Lenders charging over 36% APR</li>
                  <li>• Pressure to decide immediately</li>
                  <li>• Hidden fees or unclear terms</li>
                  <li>• Automatic renewal without consent</li>
                  <li>• Access to your bank account for any amount</li>
                </ul>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasReadEducation}
                  onChange={(e) => setHasReadEducation(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-gray-700">
                  I have read and understood this important information
                </span>
              </label>
            </div>
          )}

          {/* Step 1: Financial Assessment */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Loan Amount</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$100</span>
                    <span className="text-2xl font-bold text-gray-800">
                      ${loanAmount}
                    </span>
                    <span>$1,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3">
                  Your Loan Details (30 days)
                </h3>
                <div className="space-y-2 text-green-800">
                  <div className="flex justify-between">
                    <span>Amount Borrowed:</span>
                    <span className="font-semibold">${loanAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest (36% APR):</span>
                    <span className="font-semibold">
                      ${(loanAmount * 0.03).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Origination Fee:</span>
                    <span className="font-semibold">$0</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-green-300">
                    <span>Total to Repay:</span>
                    <span>${(loanAmount * 1.03).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Can you afford this payment?</strong> Your monthly
                  payment would be ${(loanAmount * 1.03).toFixed(2)}. Make sure
                  this fits comfortably in your budget.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Alternatives */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-4">
                  Have You Considered These Alternatives?
                </h3>
                <div className="space-y-4">
                  {loanDetails.ethicalOptions.map((option, index) => (
                    <Card key={index} className="p-4 border-purple-300">
                      <h4 className="font-semibold text-purple-800 mb-2">
                        {option.provider}
                      </h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>APR: {option.apr}%</p>
                        <p>Total Cost: ${option.totalCost.toFixed(2)}</p>
                        <p className="text-xs">
                          You save: $
                          {(
                            loanDetails.predatoryOption.totalCost -
                            option.totalCost
                          ).toFixed(2)}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Free Resources:</strong> Contact 211 for emergency
                  assistance, or speak with our financial counselor at no
                  charge.
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasReviewedAlternatives}
                  onChange={(e) => setHasReviewedAlternatives(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-gray-700">
                  I have reviewed these alternatives and still wish to proceed
                </span>
              </label>
            </div>
          )}

          {/* Step 3: Clear Terms */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card className="p-6 bg-orange-50 border-orange-200">
                <h3 className="font-bold text-orange-900 mb-4">
                  Complete Loan Terms - No Hidden Fees
                </h3>
                <div className="space-y-3 text-orange-800">
                  <div className="p-3 bg-white rounded">
                    <div className="font-semibold">
                      Annual Percentage Rate (APR)
                    </div>
                    <div className="text-2xl font-bold">36%</div>
                    <div className="text-sm">
                      This is the yearly cost of your loan
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded">
                    <div className="font-semibold">Payment Schedule</div>
                    <div>
                      One payment of ${(loanAmount * 1.03).toFixed(2)} due in 30
                      days
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded">
                    <div className="font-semibold">No Additional Fees</div>
                    <ul className="text-sm mt-1">
                      <li>✓ No origination fee</li>
                      <li>✓ No prepayment penalty</li>
                      <li>✓ No late fees for first 5 days</li>
                      <li>✓ No rollover fees (rollovers not offered)</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Your Rights:</strong> You can prepay at any time
                  without penalty. You have 3 business days to cancel for a full
                  refund.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Cooling Off */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-red-600" />
                  <h3 className="font-bold text-red-900 text-xl">
                    24-Hour Cooling-Off Period
                  </h3>
                </div>
                <div className="space-y-4 text-red-800">
                  <p>
                    We require a 24-hour waiting period before finalizing any
                    loan. This gives you time to:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Sleep on your decision</li>
                    <li>• Discuss with family or friends</li>
                    <li>• Explore other options</li>
                    <li>• Review your budget again</li>
                  </ul>
                  <p className="font-semibold">
                    You will receive an email to continue your application
                    tomorrow.
                  </p>
                </div>
              </div>

              <Card className="p-4 bg-blue-50">
                <p className="text-sm text-blue-800">
                  <strong>Free Financial Counseling:</strong> Would you like to
                  speak with our financial counselor during this time? Call
                  1-800-XXX-XXXX
                </p>
              </Card>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={coolingOffAcknowledged}
                  onChange={(e) => setCoolingOffAcknowledged(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-gray-700">
                  I understand I must wait 24 hours before my loan can be
                  processed
                </span>
              </label>
            </div>
          )}

          {/* Step 5: Informed Consent */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="font-bold text-green-900 mb-4">
                  Final Confirmation - Please Read Carefully
                </h3>
                <div className="space-y-4">
                  {Object.entries({
                    understandAPR:
                      "I understand the APR is 36% and the total I will repay",
                    understandTotalCost: `I understand I will pay back $${(
                      loanAmount * 1.03
                    ).toFixed(2)} total`,
                    exploredAlternatives:
                      "I have explored alternatives and still wish to proceed",
                    canAffordPayments:
                      "I have reviewed my budget and can afford this payment",
                    rightToCancel:
                      "I understand I can cancel within 3 business days",
                  }).map(([key, text]) => (
                    <label
                      key={key}
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={consentItems[key]}
                        onChange={(e) =>
                          setConsentItems({
                            ...consentItems,
                            [key]: e.target.checked,
                          })
                        }
                        className="mt-1"
                      />
                      <span className="text-gray-700">{text}</span>
                    </label>
                  ))}
                </div>
              </Card>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Remember:</strong> This loan will be automatically
                  deposited after the 24-hour waiting period. You will receive
                  reminders before your payment is due.
                </p>
              </div>
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
            className={canProceed() ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {currentStep === steps.length - 1
              ? "Submit Application"
              : "Continue"}
          </Button>
        </div>

        {/* Help Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Need help? Call us at 1-800-XXX-XXXX or{" "}
            <Link href="/help" className="text-blue-600 hover:underline">
              visit our help center
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EthicalCheckoutFlow;
