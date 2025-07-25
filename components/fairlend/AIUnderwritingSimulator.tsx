import React, { useState, useEffect } from 'react';

// Define the types for the component's props and state
interface AIUnderwritingSimulatorProps {
  userData: {
    income: number;
    creditScore: number;
    debtToIncomeRatio: number;
  };
  onDecision: (decision: UnderwritingDecision) => void;
}

interface UnderwritingDecision {
  approved: boolean;
  decisionId: string;
  explanation: string;

  // Details on the AI's reasoning
  positiveFactors: string[];
  negativeFactors: string[];
  
  // Bias checks
  biasAssessment: {
    demographicBiasDetected: boolean;
    incomeBiasDetected: boolean;
    mitigationApplied: string | null;
  };

  // Recommendations
  recommendedAction: string;
  alternativeProduct?: {
    name: string;
    benefit: string;
  };
}

const AIUnderwritingSimulator: React.FC<AIUnderwritingSimulatorProps> = ({ userData, onDecision }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const simulationSteps = [
    "Initializing ethical AI core...",
    "Analyzing applicant's financial data...",
    "Running multi-factor risk assessment model...",
    "Scanning for algorithmic bias...",
    "Applying fairness and transparency protocols...",
    "Generating explainable decision...",
    "Finalizing recommendation package...",
  ];

  // Simulate the step-by-step processing of the AI
  useEffect(() => {
    if (currentStep < simulationSteps.length) {
      const timer = setTimeout(() => {
        setProcessingSteps(prev => [...prev, simulationSteps[currentStep]]);
        setCurrentStep(currentStep + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsProcessing(false);
      // Once processing is complete, generate the final decision
      generateDecision();
    }
  }, [currentStep]);
  
  const generateDecision = () => {
    const { income, creditScore, debtToIncomeRatio } = userData;
    const decision: UnderwritingDecision = {
      approved: false,
      decisionId: `ai-decision-${new Date().getTime()}`,
      explanation: "",
      positiveFactors: [],
      negativeFactors: [],
      biasAssessment: {
        demographicBiasDetected: false,
        incomeBiasDetected: false,
        mitigationApplied: null,
      },
      recommendedAction: "",
    };

    // --- Core Ethical AI Logic ---
    if (creditScore > 680) {
      decision.positiveFactors.push("Strong credit history provides confidence.");
    } else if (creditScore < 620) {
      decision.negativeFactors.push("Credit score is below the threshold for this product.");
    }

    if (debtToIncomeRatio < 0.3) {
      decision.positiveFactors.push("Low debt-to-income ratio indicates strong repayment ability.");
    } else if (debtToIncomeRatio > 0.45) {
      decision.negativeFactors.push("High debt-to-income ratio suggests potential over-leverage.");
    }
    
    // Simulate bias detection and mitigation
    if (income < 30000) {
        decision.biasAssessment.incomeBiasDetected = true;
        decision.biasAssessment.mitigationApplied = "Applied income-blind risk re-evaluation to ensure fairness.";
    }

    // --- Final Decision ---
    if (decision.negativeFactors.length === 0 && creditScore > 650) {
      decision.approved = true;
      decision.explanation = "Based on a holistic review of your financial health, your application is approved. We've determined this loan is a good fit for your current situation.";
      decision.recommendedAction = "Proceed to review the final, transparent loan terms.";
    } else {
      decision.approved = false;
      decision.explanation = "After careful consideration, we've determined that this specific loan product may not be the best fit for you at this time. Our goal is your long-term financial well-being.";
      decision.recommendedAction = "We recommend exploring alternative options that may better suit your needs.";
      decision.alternativeProduct = {
        name: "Credit Union Small Dollar Loan",
        benefit: "Offers lower interest rates and more flexible terms than traditional payday loans."
      };
    }

    onDecision(decision);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Ethical AI Underwriting In Progress</h3>
      {isProcessing ? (
        <div>
          <ul className="space-y-2">
            {processingSteps.map((step, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-green-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {step}
              </li>
            ))}
          </ul>
          <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${(currentStep / simulationSteps.length) * 100}%` }}></div>
          </div>
        </div>
      ) : (
        <div className="text-center text-green-600 font-semibold">
          <p>✅ Processing Complete. Decision has been generated.</p>
        </div>
      )}
    </div>
  );
};

export default AIUnderwritingSimulator; 