"use client";

import { Card } from "@/components/shared/Card";
import React, { useEffect, useState } from "react";

interface FintechEducationModuleProps {
  detectedSchemes: DetectedScheme[];
  currentLoanTerms: any;
  onEducationalInteraction: (interaction: EducationalInteraction) => void;
}

interface DetectedScheme {
  type:
    | "tip_coercion"
    | "daily_debit"
    | "confession_judgment"
    | "rent_a_bank"
    | "salary_advance";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  evidence: string[];
  explanation: string;
  consumerRisk: string;
  protectiveAction: string;
}

interface EducationalInteraction {
  timestamp: Date;
  schemeType: string;
  educationalContent: string;
  userAction: "viewed" | "dismissed" | "learned_more" | "took_action";
  comprehensionScore?: number;
}

export const FintechEducationModule: React.FC<FintechEducationModuleProps> = ({
  detectedSchemes,
  currentLoanTerms,
  onEducationalInteraction,
}) => {
  const [activeScheme, setActiveScheme] = useState<DetectedScheme | null>(null);
  const [educationHistory, setEducationHistory] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    // Auto-show education for critical schemes
    const criticalScheme = detectedSchemes.find(
      (s) => s.severity === "CRITICAL"
    );
    if (criticalScheme && !educationHistory.includes(criticalScheme.type)) {
      setActiveScheme(criticalScheme);
    }
  }, [detectedSchemes]);

  const getSchemeEducation = (schemeType: string) => {
    const educationContent = {
      tip_coercion: {
        title: "🚨 Tip Coercion Detected",
        description:
          "This app is using 'tip' language to disguise high-interest loans",
        explanation: `
          Fintech apps increasingly use "tip" language to make loans seem like voluntary gratuities. 
          This is a psychological manipulation tactic that:
          
          • Makes loans feel voluntary and guilt-free
          • Obscures the true nature of the financial obligation
          • Often results in higher effective interest rates
          • May not be clearly disclosed as debt in credit reporting
          
          The app may suggest "tipping" amounts that correspond to extremely high APRs.
        `,
        warning:
          "Tips are actually loans with interest - you're legally obligated to repay them",
        legalContext:
          "CFPB has indicated that 'tip' loans may be deceptive if they obscure the true nature of the financial product",
        protectiveActions: [
          "Calculate the APR of the 'tip' amount",
          "Ask for clear loan documentation",
          "Compare with traditional loan products",
          "Understand your repayment obligations",
        ],
        redFlags: [
          "Suggested tip amounts that seem high relative to the advance",
          "Pressure to tip higher amounts",
          "Unclear documentation about repayment terms",
          "Difficulty opting out of tips",
        ],
      },
      daily_debit: {
        title: "🏦 Daily Debit Scheme Identified",
        description:
          "This lender uses daily debiting to maximize payments and control your account",
        explanation: `
          Daily debit schemes automatically withdraw small amounts daily rather than monthly payments.
          This tactic:
          
          • Maximizes cash flow for the lender
          • Makes the true cost harder to calculate
          • Increases NSF fee opportunities
          • Maintains constant access to your account
          • Can destabilize your cash flow
          
          Daily debiting often results in paying more over time compared to traditional repayment schedules.
        `,
        warning:
          "Daily debiting can quickly drain your account and trigger overdraft fees",
        legalContext:
          "Some states restrict daily debiting frequency to protect consumers from cash flow disruption",
        protectiveActions: [
          "Calculate total cost versus monthly payments",
          "Monitor your account balance daily",
          "Ensure sufficient funds before each debit",
          "Understand your rights to revoke ACH authorization",
        ],
        redFlags: [
          "Daily or multiple weekly withdrawals",
          "Variable debit amounts",
          "Pressure to provide ACH authorization",
          "Unclear total payment calculations",
        ],
      },
      confession_judgment: {
        title: "⚖️ Confession of Judgment Clause Found",
        description:
          "This contract includes confession of judgment - you're waiving critical legal rights",
        explanation: `
          Confession of judgment clauses allow lenders to obtain court judgments against you 
          WITHOUT a trial or your presence in court. This means:
          
          • The lender can garnish wages immediately upon default
          • You waive your right to defend yourself in court
          • Collection can happen in any state, not just where you live
          • Bank accounts can be frozen without notice
          • You may not even know a judgment was entered
          
          This is one of the most dangerous clauses in lending contracts.
        `,
        warning:
          "You're signing away fundamental legal protections - this could devastate your finances",
        legalContext:
          "Confession of judgment is banned in many states and prohibited in federal credit laws",
        protectiveActions: [
          "NEVER sign a confession of judgment clause",
          "Seek legal counsel before signing",
          "Look for alternative lenders without this clause",
          "Contact your state attorney general if pressured to sign",
        ],
        redFlags: [
          "Any mention of 'confession of judgment'",
          "Waiving right to court proceedings",
          "Consent to jurisdiction in other states",
          "Authorization for immediate wage garnishment",
        ],
      },
      rent_a_bank: {
        title: "🏛️ Rent-a-Bank Scheme Detected",
        description:
          "This lender is using a bank partnership to evade state interest rate limits",
        explanation: `
          Rent-a-bank schemes involve non-bank lenders partnering with banks to claim federal 
          preemption from state usury laws. This allows them to:
          
          • Charge interest rates above state limits
          • Evade state consumer protections
          • Claim federal banking exemptions
          • Transfer legal liability to partner banks
          
          The FDIC and OCC have issued guidance restricting these arrangements, but they persist.
        `,
        warning:
          "This loan may violate your state's interest rate caps through regulatory arbitrage",
        legalContext:
          "Rent-a-bank schemes may violate the true lender doctrine and state partnership laws",
        protectiveActions: [
          "Check your state's maximum interest rates",
          "File complaints with state and federal regulators",
          "Document the true lender relationship",
          "Seek alternatives within state rate limits",
        ],
        redFlags: [
          "Partnership with out-of-state banks",
          "Interest rates above state limits",
          "Confusing lender identity documentation",
          "Claims of federal preemption",
        ],
      },
      salary_advance: {
        title: "💰 Employer Salary Advance Manipulation",
        description:
          "This 'advance' is actually a high-cost loan disguised as an employee benefit",
        explanation: `
          Employer-sponsored salary advance programs often market themselves as employee benefits
          but function as high-cost loans. These programs:
          
          • Charge fees equivalent to high APRs
          • Create dependency cycles
          • May report to credit bureaus
          • Often include mandatory tips or fees
          • Can affect employment if overused
          
          True salary advances should be free or very low cost.
        `,
        warning:
          "Workplace lending can affect your employment and create financial dependency",
        legalContext:
          "CFPB considers workplace lending subject to Truth in Lending Act requirements",
        protectiveActions: [
          "Calculate the APR of all fees",
          "Understand employment policy impacts",
          "Compare with traditional lending options",
          "Ask HR about free advance options",
        ],
        redFlags: [
          "Fees for salary advances",
          "Mandatory tips or subscriptions",
          "Credit reporting for advances",
          "Pressure from employer to use service",
        ],
      },
    };

    return educationContent[schemeType as keyof typeof educationContent];
  };

  const handleEducationalInteraction = (
    action: string,
    scheme: DetectedScheme
  ) => {
    const interaction: EducationalInteraction = {
      timestamp: new Date(),
      schemeType: scheme.type,
      educationalContent: getSchemeEducation(scheme.type)?.title || "",
      userAction: action as any,
      comprehensionScore: showQuiz ? quizScore ?? 0 : undefined,
    };

    onEducationalInteraction(interaction);

    if (action === "viewed") {
      setEducationHistory((prev) => [...prev, scheme.type]);
    }
  };

  const getSchemeQuiz = (schemeType: string) => {
    const quizzes = {
      tip_coercion: {
        question:
          "What should you do if an app asks for a 'tip' on a cash advance?",
        options: [
          "Always tip the maximum to show gratitude",
          "Calculate the APR and compare to loan alternatives",
          "Tip whatever feels right",
          "Ignore it since tips are optional",
        ],
        correct: 1,
        explanation:
          "Always calculate the APR of 'tips' as they are actually loan interest charges.",
      },
      daily_debit: {
        question: "Why are daily debit schemes potentially harmful?",
        options: [
          "They're more convenient than monthly payments",
          "They help build credit faster",
          "They can destabilize cash flow and increase overdraft fees",
          "They're required by federal law",
        ],
        correct: 2,
        explanation:
          "Daily debiting can quickly drain accounts and trigger expensive overdraft fees.",
      },
      confession_judgment: {
        question:
          "What does a confession of judgment clause allow a lender to do?",
        options: [
          "Charge higher interest rates",
          "Report to credit bureaus immediately",
          "Obtain court judgments without a trial",
          "Extend the loan term automatically",
        ],
        correct: 2,
        explanation:
          "Confession of judgment allows wage garnishment and asset seizure without court proceedings.",
      },
    };

    return quizzes[schemeType as keyof typeof quizzes];
  };

  const renderSchemeAlert = (scheme: DetectedScheme) => {
    const education = getSchemeEducation(scheme.type);
    if (!education) return null;

    const severityColors = {
      CRITICAL: "bg-red-600 border-red-700",
      HIGH: "bg-orange-500 border-orange-600",
      MEDIUM: "bg-yellow-500 border-yellow-600",
      LOW: "bg-blue-500 border-blue-600",
    };

    return (
      <Card
        className={`border-2 ${
          severityColors[scheme.severity]
        } text-white p-4 mb-4`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{education.title}</h3>
          <button
            onClick={() => setActiveScheme(null)}
            className="text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>

        <p className="mb-3 text-white/90">{education.description}</p>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold mb-1">⚠️ Warning:</h4>
            <p className="text-sm text-white/90">{education.warning}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-1">Red Flags Detected:</h4>
            <ul className="text-sm space-y-1">
              {scheme.evidence.map((evidence, index) => (
                <li key={index} className="text-white/90">
                  • {evidence}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveScheme(scheme);
                handleEducationalInteraction("learned_more", scheme);
              }}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
            >
              Learn More
            </button>
            <button
              onClick={() => {
                setShowQuiz(true);
                handleEducationalInteraction("viewed", scheme);
              }}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
            >
              Take Quiz
            </button>
            <button
              onClick={() =>
                handleEducationalInteraction("took_action", scheme)
              }
              className="bg-white text-black hover:bg-white/90 px-3 py-1 rounded text-sm font-medium"
            >
              Find Alternatives
            </button>
          </div>
        </div>
      </Card>
    );
  };

  const renderDetailedEducation = (scheme: DetectedScheme) => {
    const education = getSchemeEducation(scheme.type);
    if (!education) return null;

    return (
      <Card className="p-6 border-2 border-red-200">
        <h2 className="text-2xl font-bold mb-4 text-red-600">
          {education.title}
        </h2>

        <div className="prose max-w-none mb-6">
          <div className="whitespace-pre-line text-gray-700">
            {education.explanation}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-red-600 mb-2">
              🚩 Red Flags to Watch For:
            </h3>
            <ul className="space-y-1 text-sm">
              {education.redFlags.map((flag, index) => (
                <li key={index} className="text-gray-700">
                  • {flag}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-green-600 mb-2">
              🛡️ Protective Actions:
            </h3>
            <ul className="space-y-1 text-sm">
              {education.protectiveActions.map((action, index) => (
                <li key={index} className="text-gray-700">
                  • {action}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Legal Context:</h4>
          <p className="text-sm text-yellow-700">{education.legalContext}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Test Understanding
          </button>
          <button
            onClick={() => handleEducationalInteraction("took_action", scheme)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Find Safer Alternatives
          </button>
          <button
            onClick={() => setActiveScheme(null)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </Card>
    );
  };

  const renderQuiz = (scheme: DetectedScheme) => {
    const quiz = getSchemeQuiz(scheme.type);
    if (!quiz) return null;

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = () => {
      const isCorrect = selectedAnswer === quiz.correct;
      setQuizScore(isCorrect ? 100 : 0);
      setShowResult(true);

      handleEducationalInteraction("learned_more", scheme);
    };

    return (
      <Card className="p-6 border-2 border-blue-200">
        <h3 className="text-xl font-bold mb-4 text-blue-600">
          📝 Understanding Check
        </h3>

        <div className="mb-4">
          <p className="font-medium mb-3">{quiz.question}</p>

          <div className="space-y-2">
            {quiz.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="quiz"
                  value={index}
                  checked={selectedAnswer === index}
                  onChange={() => setSelectedAnswer(index)}
                  className="text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Submit Answer
          </button>
        ) : (
          <div
            className={`p-4 rounded-lg ${
              selectedAnswer === quiz.correct
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p
              className={`font-medium ${
                selectedAnswer === quiz.correct
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {selectedAnswer === quiz.correct ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            <p className="text-sm text-gray-700 mt-1">{quiz.explanation}</p>

            <button
              onClick={() => setShowQuiz(false)}
              className="mt-3 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
            >
              Continue
            </button>
          </div>
        )}
      </Card>
    );
  };

  // Show scheme alerts in order of severity
  const sortedSchemes = [...detectedSchemes].sort((a, b) => {
    const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });

  return (
    <div className="space-y-4">
      {/* Critical schemes always visible */}
      {sortedSchemes
        .filter((scheme) => scheme.severity === "CRITICAL")
        .map((scheme, index) => (
          <div key={`critical-${index}`}>{renderSchemeAlert(scheme)}</div>
        ))}

      {/* Other schemes */}
      {sortedSchemes
        .filter((scheme) => scheme.severity !== "CRITICAL")
        .slice(0, 2) // Limit to avoid overwhelming
        .map((scheme, index) => (
          <div key={`other-${index}`}>{renderSchemeAlert(scheme)}</div>
        ))}

      {/* Detailed education modal */}
      {activeScheme && !showQuiz && renderDetailedEducation(activeScheme)}

      {/* Quiz modal */}
      {showQuiz && activeScheme && renderQuiz(activeScheme)}

      {/* Summary for developers */}
      {detectedSchemes.length > 0 && (
        <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
          Education module active: {detectedSchemes.length} scheme(s) detected,
          {educationHistory.length} viewed, quiz score: {quizScore}%
        </div>
      )}
    </div>
  );
};
