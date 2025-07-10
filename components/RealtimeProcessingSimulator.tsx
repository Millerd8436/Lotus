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
  const [_showLiveUpdates, _setShowLiveUpdates] = useState(true);
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
    setLiveMessages((prev) => [...prev.slice(-4), message]);
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
        addLiveMessage("✓ Identity verified successfully");
        break;
      case "income_verification":
        result = `Income verified: $${applicationData.income}/month`;
        addLiveMessage(
          `✓ Monthly income confirmed: $${applicationData.income}`
        );
        break;
      case "credit_check":
        result =
          applicationData.vulnerabilityScore > 7
            ? "Poor credit score detected"
            : "Fair credit profile";
        addLiveMessage(`✓ Credit assessment complete`);
        break;
      case "bank_verification":
        result = "Active checking account verified";
        addLiveMessage("✓ Bank account validated");
        break;
      case "risk_assessment":
        const riskLevel =
          applicationData.vulnerabilityScore > 6
            ? "High Value Customer"
            : "Standard Risk";
        result = `Risk level: ${riskLevel}`;
        addLiveMessage(`✓ Risk analysis: ${riskLevel}`);
        break;
      case "compliance_check":
        result = "All regulatory requirements met";
        addLiveMessage("✓ Compliance verified");
        break;
      case "final_approval":
        result = "Application approved with conditions";
        addLiveMessage("🎉 Application approved!");
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

  return (
    <div
      className="realtime-processing-simulator"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #059669, #10b981)",
          color: "white",
          padding: "2rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}
        >
          ⚡ Real-Time Application Processing
        </h2>
        <p style={{ margin: 0, fontSize: "1rem", opacity: 0.9 }}>
          Your application is being processed using advanced verification
          systems
        </p>
      </div>

      {!isProcessing && !processingComplete && (
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 1.5rem 0",
              fontSize: "1.3rem",
              fontWeight: "bold",
            }}
          >
            📋 Application Summary
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <strong>Applicant:</strong> {applicationData.name}
            </div>
            <div>
              <strong>Monthly Income:</strong> ${applicationData.income}
            </div>
            <div>
              <strong>Employment:</strong> {applicationData.employment}
            </div>
            <div>
              <strong>Requested Amount:</strong> $
              {applicationData.requestedAmount}
            </div>
          </div>

          <button
            onClick={runProcessing}
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(90deg, #059669, #10b981)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🚀 Start Real-Time Processing
          </button>
        </div>
      )}

      {(isProcessing || processingComplete) && (
        <>
          {/* Processing Steps */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                margin: "0 0 1.5rem 0",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              🔄 Processing Steps
            </h3>

            <div style={{ display: "grid", gap: "1rem" }}>
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    background:
                      step.status === "complete"
                        ? "#f0f9ff"
                        : step.status === "processing"
                          ? "#fffbeb"
                          : step.status === "failed"
                            ? "#fef2f2"
                            : "#f9fafb",
                    border: `1px solid ${
                      step.status === "complete"
                        ? "#0ea5e9"
                        : step.status === "processing"
                          ? "#f59e0b"
                          : step.status === "failed"
                            ? "#ef4444"
                            : "#e5e7eb"
                    }`,
                    borderRadius: "8px",
                    opacity:
                      index <= currentStep || processingComplete ? 1 : 0.5,
                  }}
                >
                  <div style={{ marginRight: "1rem", fontSize: "1.5rem" }}>
                    {step.status === "complete"
                      ? "✅"
                      : step.status === "processing"
                        ? "⏳"
                        : step.status === "failed"
                          ? "❌"
                          : "⚪"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontWeight: "bold", marginBottom: "0.25rem" }}
                    >
                      {step.name}
                      {step.critical && (
                        <span
                          style={{
                            background: "#ef4444",
                            color: "white",
                            padding: "0.125rem 0.375rem",
                            borderRadius: "3px",
                            fontSize: "0.7rem",
                            marginLeft: "0.5rem",
                          }}
                        >
                          REQUIRED
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "#666",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {step.description}
                    </div>
                    {step.result && (
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#059669",
                          fontWeight: "500",
                        }}
                      >
                        ✓ {step.result}
                      </div>
                    )}
                  </div>
                  {step.status === "processing" && (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid #f3f4f6",
                        borderTop: "2px solid #f59e0b",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Live Updates */}
          {_showLiveUpdates && (
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "2rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 1rem 0",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                }}
              >
                📡 Live Processing Updates
              </h4>
              <div
                style={{
                  background: "#000",
                  color: "#00ff00",
                  padding: "1rem",
                  borderRadius: "6px",
                  fontFamily: "Courier, monospace",
                  fontSize: "0.85rem",
                  minHeight: "120px",
                  overflow: "hidden",
                }}
              >
                {liveMessages.map((message, index) => (
                  <div key={index} style={{ marginBottom: "0.25rem" }}>
                    [{new Date().toLocaleTimeString()}] {message}
                  </div>
                ))}
                {isProcessing && (
                  <div style={{ opacity: 0.7 }}>
                    <span style={{ animation: "blink 1s infinite" }}>▋</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Processing Complete */}
          {processingComplete && (
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
                <h3
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#059669",
                  }}
                >
                  Application Approved!
                </h3>
                <p style={{ margin: 0, fontSize: "1rem", color: "#666" }}>
                  Your loan has been processed and approved in real-time
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={resetProcessing}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  🔄 Process Another Application
                </button>
                <button
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "linear-gradient(90deg, #059669, #10b981)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                  }}
                >
                  ✍️ Proceed to Document Signing
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Educational Overlay */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "1rem",
          borderRadius: "8px",
          fontSize: "0.8rem",
          maxWidth: "250px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          zIndex: 999,
        }}
      >
        <strong>🎓 Educational: Real-Time Processing</strong>
        <br />• Simulated automated decision making
        <br />• Shows how vulnerability scoring works
        <br />• Demonstrates speed vs. thoroughness
        <br />• Real lenders use similar algorithms
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RealtimeProcessingSimulator;
