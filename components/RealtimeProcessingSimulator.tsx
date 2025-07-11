import React, { useEffect, useState } from "react";

interface RealtimeProcessingSimulatorProps {
  applicationData?: ApplicationData;
  onProcessingComplete?: (result: ProcessingResult) => void;
}

interface ApplicationData {
  name: string;
  income: number;
  employment: string;
  vulnerabilityScore: number;
  requestedAmount: number;
}

interface ProcessingResult {
  approved: boolean;
  approval_reason: string;
  final_amount: number;
  interest_rate: number;
  fees: FeeBreakdown;
  conditions: string[];
  next_steps: string[];
}

interface FeeBreakdown {
  processing_fee: number;
  verification_fee: number;
  risk_fee: number;
  insurance_fee: number;
  total_fees: number;
}

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  duration: number;
  status: "pending" | "processing" | "complete" | "failed";
  result?: string;
  critical: boolean;
}

const RealtimeProcessingSimulator: React.FC<
  RealtimeProcessingSimulatorProps
> = ({
  applicationData = {
    name: "John Doe",
    income: 2800,
    employment: "Full-time",
    vulnerabilityScore: 6,
    requestedAmount: 300,
  },
  onProcessingComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProcessingStep[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [showLiveUpdates, setShowLiveUpdates] = useState(true);
  const [liveMessages, setLiveMessages] = useState<string[]>([]);

  const initializeSteps = (): ProcessingStep[] => [
    {
      id: "identity_verification",
      name: "Identity Verification",
      description: "Verifying personal information and identity documents",
      duration: 3000,
      status: "pending",
      critical: true,
    },
    {
      id: "income_verification",
      name: "Income Verification",
      description: "Analyzing employment and income stability",
      duration: 4000,
      status: "pending",
      critical: true,
    },
    {
      id: "credit_check",
      name: "Credit Assessment",
      description: "Reviewing credit history and payment patterns",
      duration: 2500,
      status: "pending",
      critical: false,
    },
    {
      id: "bank_verification",
      name: "Bank Account Verification",
      description: "Validating banking information and account status",
      duration: 3500,
      status: "pending",
      critical: true,
    },
    {
      id: "risk_assessment",
      name: "Risk Analysis",
      description: "Calculating risk profile and loan terms",
      duration: 2000,
      status: "pending",
      critical: true,
    },
    {
      id: "compliance_check",
      name: "Regulatory Compliance",
      description: "Ensuring compliance with state and federal regulations",
      duration: 1500,
      status: "pending",
      critical: false,
    },
    {
      id: "final_review",
      name: "Final Review",
      description: "A senior loan officer is reviewing your application.",
      duration: 5000,
      status: "pending",
      critical: true,
    },
    {
      id: "final_approval",
      name: "Final Decision",
      description: "Generating final approval decision and terms",
      duration: 2000,
      status: "pending",
      critical: true,
    },
  ];

  useEffect(() => {
    setSteps(initializeSteps());
  }, []);

  const addLiveMessage = (message: string) => {
    setLiveMessages((prev) => [
      ...prev.slice(-4),
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);
  };

  const processStep = async (stepIndex: number): Promise<void> => {
    const step = steps[stepIndex];
    if (!step) return;

    // Update step status to processing
    setSteps((prev) =>
      prev.map((s, i) => (i === stepIndex ? { ...s, status: "processing" } : s))
    );

    addLiveMessage(`Processing ${step.name}...`);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, step.duration));

    // Generate realistic results based on step
    let result = "";
    let status: ProcessingStep["status"] = "complete";

    switch (step.id) {
      case "identity_verification":
        result = `Identity confirmed: ${applicationData.name}`;
        addLiveMessage("✅ Identity verified successfully");
        break;
      case "income_verification":
        result = `Income verified: $${applicationData.income}/month`;
        addLiveMessage(
          `✅ Monthly income confirmed: $${applicationData.income}`
        );
        break;
      case "credit_check":
        result =
          applicationData.vulnerabilityScore > 7
            ? "Poor credit score detected"
            : "Fair credit profile";
        addLiveMessage(`- Credit assessment complete`);
        break;
      case "bank_verification":
        result = "Active checking account verified";
        addLiveMessage("✅ Bank account validated");
        break;
      case "risk_assessment":
        const riskLevel =
          applicationData.vulnerabilityScore > 6
            ? "High Value Customer"
            : "Standard Risk";
        result = `Risk level: ${riskLevel}`;
        addLiveMessage(`- Risk analysis: ${riskLevel}`);
        break;
      case "compliance_check":
        result = "All regulatory requirements met";
        addLiveMessage("- Compliance verified");
        break;
      case "final_review":
        result = "Senior underwriter approved application.";
        addLiveMessage(
          "🎉 CONGRATULATIONS! A senior loan officer has APPROVED your application!"
        );
        break;
      case "final_approval":
        result = "Application approved with conditions";
        addLiveMessage("🚀 Your funds are being prepared for deposit!");
        break;
    }

    // Update step with result
    setSteps((prev) =>
      prev.map((s, i) => (i === stepIndex ? { ...s, status, result } : s))
    );
  };

  const runProcessing = async () => {
    setIsProcessing(true);
    setLiveMessages([]);
    addLiveMessage("🚀 Starting application processing...");

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await processStep(i);

      // Small delay between steps for realism
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Generate final result
    const fees: FeeBreakdown = {
      processing_fee: 45,
      verification_fee: 25 + applicationData.vulnerabilityScore * 5,
      risk_fee: applicationData.vulnerabilityScore * 10,
      insurance_fee: 25,
      total_fees: 0,
    };
    fees.total_fees =
      fees.processing_fee +
      fees.verification_fee +
      fees.risk_fee +
      fees.insurance_fee;

    const result: ProcessingResult = {
      approved: true,
      approval_reason: `Approved based on verified income of $${applicationData.income}/month and stable employment`,
      final_amount: applicationData.requestedAmount,
      interest_rate: Math.min(
        664,
        400 + applicationData.vulnerabilityScore * 30
      ),
      fees,
      conditions: [
        "ACH authorization required for repayment",
        "Loan must be repaid in full by due date",
        "Additional fees apply for late payments",
        "Rollover options available if needed",
      ],
      next_steps: [
        "Review and sign electronic loan documents",
        "Verify ACH payment authorization",
        "Funds will be deposited within 24 hours",
        "Repayment will be automatically withdrawn on due date",
      ],
    };

    setIsProcessing(false);
    setProcessingComplete(true);
    onProcessingComplete?.(result);
  };

  const resetProcessing = () => {
    setSteps(initializeSteps());
    setCurrentStep(0);
    setIsProcessing(false);
    setProcessingComplete(false);
    setLiveMessages([]);
  };

  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto border-4 border-purple-500">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
          {processingComplete
            ? "✅ Processing Complete!"
            : "⚙️ Processing Your Loan..."}
        </h2>
        <p className="text-gray-400">
          This should only take a few moments. Please do not close this window.
        </p>
      </div>

      {!isProcessing && !processingComplete && (
        <div className="text-center">
          <button
            onClick={runProcessing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🚀 Start Secure Processing
          </button>
        </div>
      )}

      {isProcessing && !processingComplete && (
        <div>
          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-8 mb-6 border-2 border-gray-600 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-in-out text-right pr-2 text-sm font-bold flex items-center justify-end"
              style={{ width: `${progress}%` }}
            >
              {Math.round(progress)}%
            </div>
          </div>

          {/* Current Step Display */}
          <div className="text-center mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="text-lg font-bold text-yellow-400 animate-pulse">
              {steps[currentStep]?.name || "Finalizing..."}
            </div>
            <div className="text-gray-300 text-sm">
              {steps[currentStep]?.description}
            </div>
          </div>

          {/* Live Update Ticker */}
          {showLiveUpdates && (
            <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-700 h-48 overflow-hidden relative">
              <h4 className="font-bold text-gray-300 mb-2 text-sm">
                Live Status Updates:
              </h4>
              <div className="space-y-2">
                {liveMessages.map((msg, index) => (
                  <div
                    key={index}
                    className="text-sm text-green-300 font-mono animate-fade-in-up"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {processingComplete && (
        <div className="text-center p-8 bg-green-500 bg-opacity-20 rounded-xl border-2 border-green-500">
          <h3 className="text-3xl font-bold text-green-300 mb-2">
            🎉 Congratulations, {applicationData.name}! 🎉
          </h3>
          <p className="text-lg text-gray-200">
            You've been APPROVED for{" "}
            <span className="font-bold text-yellow-300">
              ${applicationData.requestedAmount}
            </span>
            !
          </p>
          <p className="text-gray-300 mt-2">
            Your funds are being prepared for an instant bank deposit.
          </p>
          <button
            onClick={resetProcessing}
            className="mt-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Process Another
          </button>
        </div>
      )}
    </div>
  );
};

export default RealtimeProcessingSimulator;
