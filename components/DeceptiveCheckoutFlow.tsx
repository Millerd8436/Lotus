"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import RealTimeAnnotation from "./shared/RealTimeAnnotation";
import InitialCaptureStep from "./phase1-exploitative/steps/InitialCaptureStep";
import IncomeVerificationStep from "./phase1-exploitative/steps/IncomeVerificationStep";
import EmergencyContactsStep from "./phase1-exploitative/steps/EmergencyContactsStep";
import AddOnsStep from "./phase1-exploitative/steps/AddOnsStep";
import FinalAuthorizationStep from "./phase1-exploitative/steps/FinalAuthorizationStep";

interface DeceptiveCheckoutFlowProps {
  loanAmount: number;
  phase: 1 | 3;
  onBack: () => void;
  onPatternDetected: (pattern: string, severity: number) => void;
}

interface Fee {
  label: string;
  amount: number;
  type: "principal" | "fee" | "hidden" | "optional" | "penalty";
  revealed: boolean;
  justification: string;
  color: string;
}

export const DeceptiveCheckoutFlow: React.FC<DeceptiveCheckoutFlowProps> = ({
  initialData,
  onComplete,
  phase,
  onPatternDetected,
}) => {
  const [formData, setFormData] = useState({
    ...initialData,
    ssn: "",
    employer: "",
    monthlyIncome: "",
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    expressProcessing: true, // Pre-checked
    loanInsurance: true, // Pre-checked
    autoRenewal: true, // Pre-checked
  });
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFees, setShowFees] = useState(false);
  const [showAPR, setShowAPR] = useState(false);
  const [vulnerabilityScore, setVulnerabilityScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(297);
  const [cancelAttempts, setCancelAttempts] = useState(0);
  const [showCancelWarning, setShowCancelWarning] = useState(false);

  // State-specific data
  const stateAPRs: Record<string, number> = {
    TX: 664,
    CA: 460,
    FL: 391,
    NY: 25, // Capped state
  };

  const phases = [
    { id: 1, name: "Quick Info", fields: 3 },
    { id: 2, name: "Verification", fields: 8 },
    { id: 3, name: "Add-ons", fields: 5 },
    { id: 4, name: "Final Setup", fields: 4 },
  ];

  const calculateProgress = () => {
    return (currentPhase / phases.length) * 100;
  };

  const handlePhaseComplete = (data: any) => {
    setFormData({ ...formData, ...data });

    // Add fees progressively
    if (currentPhase === 2) {
      setFormData((prev) => ({
        ...prev,
        totalFees: (prev.totalFees || 0) + 25, // "Processing fee"
      }));
    } else if (currentPhase === 3) {
      setFormData((prev) => ({
        ...prev,
        totalFees: (prev.totalFees || 0) + 35, // "Insurance"
        totalFees: (prev) => prev + 25, // "Express processing"
      }));
    } else if (currentPhase === 4) {
      setShowAPR(true); // Finally reveal APR
    }

    if (currentPhase < 4) {
      setCurrentPhase((prev) => prev + 1);
    } else {
      onComplete({
        ...formData,
        totalFees: formData.totalFees || 0,
        apr: stateAPRs[formData.state] || 391,
      });
    }
  };

  // Initialize fees
  const initializeFees = () => {
    const baseFees: Fee[] = [
      {
        label: "Loan Amount",
        amount: 300,
        type: "principal",
        revealed: true,
        justification: "Your requested amount",
        color: "#4caf50",
      },
      {
        label: "Simple Fee",
        amount: 45,
        type: "fee",
        revealed: true,
        justification: "One-time processing fee",
        color: "#ff9800",
      },
      {
        label: "Verification Fee",
        amount: 25,
        type: "hidden",
        revealed: false,
        justification: "Identity verification required",
        color: "#ff5722",
      },
      {
        label: "ACH Setup Fee",
        amount: 15,
        type: "hidden",
        revealed: false,
        justification: "Bank connection setup",
        color: "#ff5722",
      },
      {
        label: "Risk Assessment",
        amount: 35,
        type: "hidden",
        revealed: false,
        justification: "Automated risk evaluation",
        color: "#f44336",
      },
      {
        label: "Platform Fee",
        amount: 20,
        type: "hidden",
        revealed: false,
        justification: "System maintenance",
        color: "#f44336",
      },
      {
        label: "Insurance (Pre-selected)",
        amount: 25,
        type: "optional",
        revealed: false,
        justification: "Loan protection insurance",
        color: "#9c27b0",
      },
      {
        label: "Express Processing",
        amount: 30,
        type: "optional",
        revealed: false,
        justification: "Same-day funding",
        color: "#9c27b0",
      },
      {
        label: "Late Payment Fee",
        amount: 40,
        type: "penalty",
        revealed: false,
        justification: "If payment is late",
        color: "#d32f2f",
      },
      {
        label: "Rollover Fee",
        amount: 50,
        type: "penalty",
        revealed: false,
        justification: "If loan is extended",
        color: "#d32f2f",
      },
      {
        label: "NSF Fee (Per Attempt)",
        amount: 35,
        type: "penalty",
        revealed: false,
        justification: "Bank rejection fee",
        color: "#d32f2f",
      },
    ];
    setFormData((prev) => ({ ...prev, fees: baseFees }));
  };

  // Calculate vulnerability score based on form data
  const calculateVulnerabilityScore = useCallback(() => {
    let score = 0;
    const income = parseInt(formData.income?.replace(/\D/g, "") || "0");

    if (income < 2000) score += 3;
    if (formData.employment?.toLowerCase().includes("part") ||
        formData.employment?.toLowerCase().includes("temp")) score += 2;
    if (formData.bankName?.toLowerCase().includes("check") ||
        formData.bankName?.toLowerCase().includes("cash")) score += 2;
    if (currentStep >= 2) score += 1;

    setVulnerabilityScore(score);
  }, [formData.income, formData.employment, formData.bankName, currentStep]);

  // Urgency timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Progressive fee revelation
  useEffect(() => {
    if (currentStep >= 1) {
      setFormData((prev) => ({
        ...prev,
        fees: prev.fees.map((fee) =>
          fee.type === "hidden" &&
          ["Verification Fee", "ACH Setup Fee"].includes(fee.label)
            ? { ...fee, revealed: true }
            : fee
        ),
      }));
    }
    if (currentStep >= 2) {
      setFormData((prev) => ({
        ...prev,
        fees: prev.fees.map((fee) =>
          fee.type === "hidden" &&
          ["Risk Assessment", "Platform Fee"].includes(fee.label)
            ? { ...fee, revealed: true }
            : fee
        ),
      }));
    }
    if (currentStep >= 3) {
      setFormData((prev) => ({
        ...prev,
        fees: prev.fees.map((fee) =>
          fee.type === "optional" || fee.type === "penalty"
            ? { ...fee, revealed: true }
            : fee
        ),
      }));
    }
  }, [currentStep]);

  // Initialize fees on mount
  useEffect(() => {
    initializeFees();
  }, []);

  // Update vulnerability score when form data changes
  useEffect(() => {
    calculateVulnerabilityScore();
  }, [calculateVulnerabilityScore]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleCancel = () => {
    // Implement cancel logic
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateTotal = () => {
    return formData.fees
      .filter((fee) => fee.revealed)
      .reduce((sum, fee) => sum + fee.amount, 0);
  };

  const calculateAPR = () => {
    const principal = 300;
    const totalFeesAmount = formData.fees
      .filter((fee) => fee.revealed && fee.type !== "principal")
      .reduce((sum, fee) => sum + fee.amount, 0);
    const termDays = 14;
    const apr = (totalFeesAmount / principal) * (365 / termDays) * 100;
    return Math.round(apr);
  };

  const revealedFees = formData.fees.filter((fee) => fee.revealed);
  const totalAmount = calculateTotal();
  const apr = calculateAPR();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <InitialCaptureStep
            onNext={handleNext}
            onCancel={handleCancel}
            phase={phase}
            onPatternDetected={onPatternDetected}
          />
        );
      case 1:
        return (
          <IncomeVerificationStep
            onNext={handleNext}
            onCancel={handleCancel}
            phase={phase}
            onPatternDetected={onPatternDetected}
          />
        );
      case 2:
        return (
          <EmergencyContactsStep
            onNext={handleNext}
            onCancel={handleCancel}
            phase={phase}
            onPatternDetected={onPatternDetected}
          />
        );
      case 3:
        return (
          <AddOnsStep
            onNext={handleNext}
            onCancel={handleCancel}
            phase={phase}
            onPatternDetected={onPatternDetected}
          />
        );
      case 4:
        return (
          <FinalAuthorizationStep
            onNext={() => onComplete(formData)}
            onCancel={handleCancel}
            phase={phase}
            onPatternDetected={onPatternDetected}
          />
        );
      default:
        return <div>Error: Invalid checkout step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="sticky top-16 bg-white shadow-sm z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Application Progress</h2>
            <span className="text-sm text-gray-600">
              Step {currentPhase} of {phases.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Fake urgency timer */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 rounded-lg mb-6 text-center animate-pulse">
          <p className="text-xl font-bold">
            ⏰ Limited Time Pre-Approval Expires In: {formatTime(timeLeft)}
          </p>
          <p className="text-sm opacity-90">
            This exclusive offer may not be available again!
          </p>
        </div>

        {/* Social proof banner */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-gray-300">
          <div className="text-sm text-gray-700">
            🔥 <strong>347 people</strong> applied in the last hour •{" "}
            <strong>Sarah from Dallas</strong> just got approved for $500
          </div>
        </div>

        {renderStep()}

        {/* Cancel warning modal */}
        {showCancelWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md">
              <h3 className="text-xl font-bold mb-4 text-red-600">
                ⚠️ Are you sure you want to leave?
              </h3>
              <p className="mb-4">
                You're so close to getting the funds you need! Your pre-approval
                will be lost if you leave now.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => setShowCancelWarning(false)}
                  className="flex-1"
                >
                  Stay & Get My Money
                </Button>
                <Button
                  onClick={() => {
                    setShowCancelWarning(false);
                    handleCancel();
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Leave Anyway
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Educational overlay */}
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
          <h4 className="font-bold text-sm mb-2">🎓 Dark Pattern Active:</h4>
          <p className="text-xs">{/* currentStepData.deceptiveTactic */}</p>
          <p className="text-xs mt-1">Vulnerability Score: {vulnerabilityScore}/8</p>
        </div>
      </div>
    </div>
  );
};

export default DeceptiveCheckoutFlow;
