"use client";

import { useEducation } from "@/components/providers/EducationProvider";
import usuryLaws from "@/data/usury_laws_loopholes_2025.json";
import {
  ArrowRightIcon,
  BanknotesIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ScaleIcon,
  ShieldExclamationIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Annotation {
  id: string;
  stepId: string;
  triggerElement?: string; // CSS selector
  title: string;
  description: string;
  darkPattern: string;
  kantianViolation?: string;
  legalContext?: string;
  psychologicalTrick?: string;
  realWorldImpact?: string;
  protectionTip: string;
  severity: "critical" | "high" | "medium" | "low";
  position?: "top" | "bottom" | "left" | "right";
  additionalResources?: {
    title: string;
    url: string;
  }[];
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const annotations: Annotation[] = [
  {
    id: "initial-simplicity",
    stepId: "basic-info",
    triggerElement: "input[name='firstName']",
    title: "🪤 The Commitment Trap Begins",
    description:
      "They ask for just 3 pieces of info to seem simple, but it's actually a 15+ step process!",
    darkPattern: "Progressive Disclosure / Foot-in-the-door",
    kantianViolation:
      "Violates informed consent by hiding the true complexity upfront",
    psychologicalTrick: "Once you start, commitment bias makes you continue",
    realWorldImpact: "80% who start will complete despite red flags",
    protectionTip:
      "Always ask: 'How many steps total?' and 'What info will you need?' before starting",
    severity: "high",
    position: "right",
    quizQuestion: {
      question: "Why do they only ask for 3 things initially?",
      options: [
        "To save time",
        "To get you psychologically committed before revealing complexity",
        "Because that's all they need",
        "For security reasons",
      ],
      correctIndex: 1,
      explanation:
        "This is the 'foot-in-the-door' technique - small commitment leads to bigger ones",
    },
  },
  {
    id: "fake-progress",
    stepId: "loan-amount",
    triggerElement: ".progress-bar",
    title: "📊 Deceptive Progress Indicators",
    description:
      "The progress bar jumps from 10% to 90% to make you feel almost done, but you're only 20% through!",
    darkPattern: "False Progress / Sunk Cost Manipulation",
    psychologicalTrick:
      "Creates illusion of being 'almost done' to prevent abandonment",
    realWorldImpact: "Increases completion by 40% vs honest progress bars",
    protectionTip:
      "Count actual steps yourself, don't trust their progress indicators",
    severity: "medium",
    position: "bottom",
  },
  {
    id: "amount-anchoring",
    stepId: "loan-amount",
    triggerElement: "input[name='loanAmount']",
    title: "💵 Amount Anchoring Trick",
    description:
      "They suggest $500 as default, making you borrow more than needed. Most only need $200-300!",
    darkPattern: "Anchoring Bias Exploitation",
    legalContext:
      "No regulations on suggested amounts - pure profit maximization",
    psychologicalTrick: "First number seen becomes reference point",
    realWorldImpact: "Average loan 67% higher with anchoring",
    protectionTip:
      "Calculate exactly what you need BEFORE seeing their suggestions",
    severity: "high",
    position: "right",
  },
  {
    id: "data-collection",
    stepId: "personal-info",
    triggerElement: "input[name='ssn']",
    title: "🎯 Data Harvesting Alert",
    description:
      "Your SSN + personal data will be sold to 200+ companies for $15-30, even if you cancel!",
    darkPattern: "Data Monetization / Privacy Zuckering",
    kantianViolation: "Uses you as means to profit, not treating you as an end",
    legalContext: "Buried in Terms of Service page 47, paragraph 3",
    realWorldImpact: "Expect 50+ spam calls/texts per week",
    protectionTip: "Use Google Voice number, consider SSN monitoring service",
    severity: "critical",
    position: "left",
    additionalResources: [
      {
        title: "How to freeze your credit",
        url: "https://www.consumer.ftc.gov/articles/0497-credit-freeze-faqs",
      },
    ],
  },
  {
    id: "employment-trap",
    stepId: "employment",
    triggerElement: "input[name='employer']",
    title: "📞 Workplace Harassment Setup",
    description:
      "They'll call your employer repeatedly if you're late, potentially getting you fired!",
    darkPattern: "Social Pressure / Reputation Damage",
    psychologicalTrick: "Fear of workplace embarrassment ensures payment",
    realWorldImpact: "12% report job loss due to collector calls",
    protectionTip: "Give main company number only, never direct supervisor",
    severity: "critical",
    position: "top",
  },
  {
    id: "bank-danger",
    stepId: "bank-connection",
    triggerElement: ".plaid-link",
    title: "🚨 CRITICAL: Bank Access Danger",
    description:
      "They'll analyze your spending to time collections and attempt multiple withdrawals!",
    darkPattern: "Financial Surveillance / ACH Abuse",
    kantianViolation:
      "Coercive - exploits desperation to gain dangerous access",
    legalContext: "Can attempt withdrawals even after you revoke consent",
    realWorldImpact:
      "Average 6.2 withdrawal attempts, causing $350 in overdrafts",
    protectionTip:
      "NEVER give bank login. Open separate account if you must proceed",
    severity: "critical",
    position: "top",
    quizQuestion: {
      question: "What can lenders do with bank access?",
      options: [
        "Only deposit your loan",
        "Verify your account",
        "Time collections and attempt multiple withdrawals",
        "Nothing without permission",
      ],
      correctIndex: 2,
      explanation:
        "They analyze spending patterns and drain accounts with repeated attempts",
    },
  },
  {
    id: "references-harassment",
    stepId: "references",
    triggerElement: "input[name='reference1']",
    title: "👥 Creating Your Harassment List",
    description:
      "These aren't 'references' - they're targets for aggressive debt collection!",
    darkPattern: "Social Network Exploitation",
    psychologicalTrick: "Weaponizes your relationships against you",
    realWorldImpact: "References receive 10-20 calls/day from collectors",
    protectionTip: "Leave blank or use 555-1212. NOT required by law!",
    severity: "high",
    position: "right",
  },
  {
    id: "hidden-addons",
    stepId: "add-ons",
    triggerElement: "input[type='checkbox']",
    title: "💸 Pre-Checked Profit Padding",
    description:
      "These pre-checked boxes add $75+ in pure profit. 'Credit Protection' protects nothing!",
    darkPattern: "Sneak into Basket / Default Bias",
    legalContext:
      "FTC says pre-checking violates ROSCA, but enforcement is weak",
    psychologicalTrick: "People rarely uncheck boxes (87% leave them)",
    realWorldImpact: "Adds 20% to total cost for zero benefit",
    protectionTip: "UNCHECK EVERYTHING. These are never beneficial",
    severity: "high",
    position: "left",
  },
  {
    id: "fake-urgency",
    stepId: "review",
    triggerElement: ".countdown-timer",
    title: "⏰ Manufactured Panic",
    description:
      "This countdown is FAKE! Refreshing the page resets it. Pure psychological manipulation.",
    darkPattern: "False Scarcity / Time Pressure",
    kantianViolation:
      "Prevents rational deliberation required for true consent",
    psychologicalTrick: "Stress hormones override logical thinking",
    realWorldImpact:
      "Decisions made under time pressure 3x more likely to be regretted",
    protectionTip: "Screenshot everything, close tab, review when calm",
    severity: "critical",
    position: "top",
  },
  {
    id: "apr-burial",
    stepId: "terms",
    triggerElement: ".terms-text",
    title: "📜 391% APR Hidden in Plain Sight",
    description:
      "After 14 steps, they finally show the illegal-in-17-states interest rate!",
    darkPattern: "Information Burial / Sunk Cost",
    legalContext: `Violates usury laws in: ${usuryLaws.usury_laws_by_state.states_with_bans.states
      .map((s) => s.state)
      .slice(0, 5)
      .join(", ")} + 12 more`,
    kantianViolation:
      "Denies ability to make informed choice by hiding key info",
    realWorldImpact: "$520 in fees to borrow $375 over 5 months",
    protectionTip: "APR must be shown upfront - report to CFPB if not",
    severity: "critical",
    position: "right",
    additionalResources: [
      {
        title: "File CFPB Complaint",
        url: "https://www.consumerfinance.gov/complaint/",
      },
    ],
  },
  {
    id: "rollover-trap",
    stepId: "payment-schedule",
    triggerElement: ".payment-date",
    title: "🔄 The Debt Trap Revealed",
    description:
      "80% can't pay in 2 weeks. They're counting on rollovers where the REAL profit is!",
    darkPattern: "Debt Trap Design",
    psychologicalTrick: "Optimism bias makes you think you'll be the 20%",
    realWorldImpact: "Average 10 rollovers, 5 months trapped, $520 in fees",
    protectionTip:
      "If you can't save this amount monthly, you can't afford this loan",
    severity: "critical",
    position: "bottom",
  },
  {
    id: "consent-theater",
    stepId: "final-consent",
    triggerElement: "button[type='submit']",
    title: "🎭 Consent Theater Finale",
    description:
      "This isn't real consent - it's coercion wrapped in legal language!",
    darkPattern: "Autonomy Theater",
    kantianViolation:
      "All 4 conditions for informed consent violated:\n1. Hidden information\n2. Time pressure\n3. Financial coercion\n4. Obscured consequences",
    realWorldImpact: "You're 'agreeing' to financial servitude",
    protectionTip: "You have 1 business day to cancel (Truth in Lending Act)",
    severity: "critical",
    position: "top",
    quizQuestion: {
      question: "Is this true informed consent?",
      options: [
        "Yes, you clicked agree",
        "No, critical info was hidden and you were pressured",
        "Yes, if you read the terms",
        "Depends on your education",
      ],
      correctIndex: 1,
      explanation:
        "Kant: True consent requires full info, time to think, freedom from coercion",
    },
  },
];

interface EducationalAnnotationSystemProps {
  currentStep: string;
  isEnabled: boolean;
  onAnnotationView?: (annotation: Annotation) => void;
}

export function EducationalAnnotationSystem({
  currentStep,
  isEnabled,
  onAnnotationView,
}: EducationalAnnotationSystemProps) {
  const [activeAnnotations, setActiveAnnotations] = useState<Annotation[]>([]);
  const [viewedAnnotations, setViewedAnnotations] = useState<Set<string>>(
    new Set()
  );
  const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(
    null
  );
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<Annotation | null>(null);
  const { trackInteraction } = useEducation();
  const annotationRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Get annotations for current step
  useEffect(() => {
    if (!isEnabled) return;

    const stepAnnotations = annotations.filter((a) => a.stepId === currentStep);
    setActiveAnnotations(stepAnnotations);

    // Auto-show first annotation for critical items
    const criticalAnnotation = stepAnnotations.find(
      (a) => a.severity === "critical"
    );
    if (criticalAnnotation && !viewedAnnotations.has(criticalAnnotation.id)) {
      setTimeout(() => {
        setSelectedAnnotation(criticalAnnotation);
        handleAnnotationView(criticalAnnotation);
      }, 500);
    }
  }, [currentStep, isEnabled]);

  const handleAnnotationView = (annotation: Annotation) => {
    setViewedAnnotations((prev) => new Set(prev).add(annotation.id));
    trackInteraction("annotation_viewed", {
      annotationId: annotation.id,
      step: currentStep,
      severity: annotation.severity,
    });
    onAnnotationView?.(annotation);
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 border-red-500 text-red-900";
      case "high":
        return "bg-orange-100 border-orange-500 text-orange-900";
      case "medium":
        return "bg-yellow-100 border-yellow-500 text-yellow-900";
      default:
        return "bg-blue-100 border-blue-500 text-blue-900";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <ShieldExclamationIcon className="w-5 h-5" />;
      case "high":
        return <ExclamationTriangleIcon className="w-5 h-5" />;
      case "medium":
        return <ExclamationCircleIcon className="w-5 h-5" />;
      default:
        return <InformationCircleIcon className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* Floating Annotation Indicators */}
      <AnimatePresence>
        {isEnabled &&
          activeAnnotations.map((annotation) => (
            <motion.div
              key={annotation.id}
              ref={(el) => {
                if (el) annotationRefs.current.set(annotation.id, el);
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`fixed z-50 ${
                annotation.severity === "critical" ? "animate-pulse" : ""
              }`}
              style={{
                // Position based on trigger element or default position
                top: "50%",
                right: "2rem",
              }}
            >
              <button
                onClick={() => {
                  setSelectedAnnotation(annotation);
                  handleAnnotationView(annotation);
                }}
                onMouseEnter={() => setHoveredAnnotation(annotation.id)}
                onMouseLeave={() => setHoveredAnnotation(null)}
                className={`
                relative p-3 rounded-full shadow-lg transition-all
                ${getSeverityStyles(annotation.severity)}
                ${viewedAnnotations.has(annotation.id) ? "opacity-70" : ""}
                hover:scale-110 cursor-pointer
              `}
              >
                {getSeverityIcon(annotation.severity)}

                {/* Badge for unviewed */}
                {!viewedAnnotations.has(annotation.id) && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                )}
              </button>

              {/* Hover Preview */}
              <AnimatePresence>
                {hoveredAnnotation === annotation.id && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-full mr-3 top-0 w-64 p-3 bg-white rounded-lg shadow-xl border"
                  >
                    <h4 className="font-semibold text-sm mb-1">
                      {annotation.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {annotation.darkPattern}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Full Annotation Modal */}
      <AnimatePresence>
        {selectedAnnotation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelectedAnnotation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div
                className={`p-6 border-b ${getSeverityStyles(
                  selectedAnnotation.severity
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(selectedAnnotation.severity)}
                    <h2 className="text-xl font-bold">
                      {selectedAnnotation.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedAnnotation(null)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Main Description */}
                <div>
                  <p className="text-gray-700">
                    {selectedAnnotation.description}
                  </p>
                </div>

                {/* Dark Pattern */}
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-600">
                      Dark Pattern:
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
                      {selectedAnnotation.darkPattern}
                    </span>
                  </div>
                  {selectedAnnotation.psychologicalTrick && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Psychology:</span>{" "}
                      {selectedAnnotation.psychologicalTrick}
                    </p>
                  )}
                </div>

                {/* Kantian Ethics Violation */}
                {selectedAnnotation.kantianViolation && (
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ScaleIcon className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">
                        Ethical Violation:
                      </span>
                    </div>
                    <p className="text-sm text-purple-700 whitespace-pre-line">
                      {selectedAnnotation.kantianViolation}
                    </p>
                  </div>
                )}

                {/* Legal Context */}
                {selectedAnnotation.legalContext && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpenIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">
                        Legal Context:
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      {selectedAnnotation.legalContext}
                    </p>
                  </div>
                )}

                {/* Real World Impact */}
                {selectedAnnotation.realWorldImpact && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BanknotesIcon className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">
                        Real Impact:
                      </span>
                    </div>
                    <p className="text-sm text-red-700">
                      {selectedAnnotation.realWorldImpact}
                    </p>
                  </div>
                )}

                {/* Protection Tip */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">
                      How to Protect Yourself:
                    </span>
                  </div>
                  <p className="text-sm text-green-700 font-medium">
                    {selectedAnnotation.protectionTip}
                  </p>
                </div>

                {/* Quiz Question */}
                {selectedAnnotation.quizQuestion && (
                  <QuizComponent
                    question={selectedAnnotation.quizQuestion}
                    onAnswer={(correct) => {
                      trackInteraction("annotation_quiz_answered", {
                        annotationId: selectedAnnotation.id,
                        correct,
                      });
                    }}
                  />
                )}

                {/* Additional Resources */}
                {selectedAnnotation.additionalResources && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Learn More:
                    </h4>
                    <div className="space-y-2">
                      {selectedAnnotation.additionalResources.map(
                        (resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <ArrowRightIcon className="w-4 h-4" />
                            {resource.title}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {viewedAnnotations.size} of {annotations.length} annotations
                    viewed
                  </div>
                  <button
                    onClick={() => setSelectedAnnotation(null)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Tracker */}
      {isEnabled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm"
        >
          <h4 className="text-sm font-semibold mb-2">
            Dark Patterns Discovered:
          </h4>
          <div className="flex flex-wrap gap-2">
            {annotations.map((annotation) => (
              <div
                key={annotation.id}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  ${
                    viewedAnnotations.has(annotation.id)
                      ? getSeverityStyles(annotation.severity)
                      : "bg-gray-200 text-gray-400"
                  }
                `}
              >
                {annotation.id.substring(0, 2).toUpperCase()}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-600">
            {Math.round((viewedAnnotations.size / annotations.length) * 100)}%
            Complete
          </div>
        </motion.div>
      )}
    </>
  );
}

// Quiz Component
function QuizComponent({
  question,
  onAnswer,
}: {
  question: NonNullable<Annotation["quizQuestion"]>;
  onAnswer: (correct: boolean) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    onAnswer(index === question.correctIndex);
  };

  return (
    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <h4 className="font-semibold text-yellow-800 mb-3">Quick Check:</h4>
      <p className="text-sm text-gray-700 mb-3">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={showResult}
            className={`
              w-full text-left p-3 rounded-lg border transition-all text-sm
              ${
                showResult
                  ? idx === question.correctIndex
                    ? "bg-green-100 border-green-400 text-green-800"
                    : idx === selectedAnswer
                    ? "bg-red-100 border-red-400 text-red-800"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <p className="mt-3 text-sm text-gray-700">
          <span className="font-semibold">Explanation:</span>{" "}
          {question.explanation}
        </p>
      )}
    </div>
  );
}

export default EducationalAnnotationSystem;
