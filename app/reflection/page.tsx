"use client";

import EthicalFrameworksExplainer from "@/components/reflection/EthicalFrameworksExplainer";
import ReflectionDashboard from "@/components/reflection/ReflectionDashboard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import ModeSelector from "@/components/ui/ModeSelector";
import { AlertTriangle, BookOpen, Brain, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ReflectionPage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Phase 2: Debrief & Analysis
          </h1>
          <p className="text-lg text-gray-700">
            Let's examine what just happened and understand the tactics used
            against you.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="mb-8">
          <ModeSelector />
        </div>

        {/* 2025 Payday Loan Statistics */}
        <Card className="mb-8 p-6 border-2 border-red-200 bg-red-50">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4 text-red-900">
                2025 Payday Loan Industry Statistics
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">
                    The Debt Trap Reality
                  </h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>
                      • <strong>80%</strong> of payday loans are rolled over or
                      renewed
                    </li>
                    <li>
                      • Average borrower is in debt <strong>5 months</strong> of
                      the year
                    </li>
                    <li>
                      • <strong>75%</strong> of borrowers are in debt for 5+
                      months annually
                    </li>
                    <li>
                      • Average APR ranges from <strong>391% to 600%</strong>
                    </li>
                    <li>
                      • <strong>12 million</strong> Americans use payday loans
                      annually
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">
                    Financial Impact
                  </h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>
                      • Average borrower pays <strong>$520</strong> to borrow
                      $375
                    </li>
                    <li>
                      • Payday loan fees cost families{" "}
                      <strong>$9 billion</strong> annually
                    </li>
                    <li>
                      • <strong>50%</strong> of borrowers default within 2 years
                    </li>
                    <li>
                      • Average borrower income: <strong>$30,000/year</strong>
                    </li>
                    <li>
                      • <strong>69%</strong> use loans for recurring expenses
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-100 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>2025 Update:</strong> Despite new regulations in some
                  states, online payday lenders continue to exploit loopholes,
                  with some charging APRs exceeding
                  <strong> 900%</strong> through "rent-a-bank" schemes.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Kantian Ethics Analysis */}
        <Card className="mb-8 p-6 border-2 border-purple-200 bg-purple-50">
          <div className="flex items-start gap-4">
            <Brain className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4 text-purple-900">
                Kantian Ethics & Informed Consent
              </h2>
              <div className="space-y-4 text-purple-800">
                <div>
                  <h3 className="font-semibold mb-2">
                    The Categorical Imperative Violation
                  </h3>
                  <p className="text-sm mb-3">
                    Immanuel Kant's categorical imperative states: "Act only
                    according to that maxim whereby you can at the same time
                    will that it should become a universal law."
                  </p>
                  <p className="text-sm">
                    Payday lenders violate this principle by treating borrowers
                    merely as means to profit, not as ends in themselves. They
                    exploit financial desperation rather than providing genuine
                    assistance.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">
                    Violations of Informed Consent
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">❌</span>
                      <div>
                        <strong>Hidden True Costs:</strong> APR buried in fine
                        print or calculated in misleading ways
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">❌</span>
                      <div>
                        <strong>Artificial Urgency:</strong> Pressure tactics
                        prevent rational decision-making
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">❌</span>
                      <div>
                        <strong>Complexity Overload:</strong> Deliberately
                        confusing terms to obscure understanding
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">❌</span>
                      <div>
                        <strong>Exploitation of Vulnerability:</strong>{" "}
                        Targeting those in crisis when cognitive capacity is
                        impaired
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-purple-100 rounded-lg">
                  <p className="text-sm font-semibold">
                    True informed consent requires: Clear information + Time to
                    consider + Absence of coercion + Mental capacity to
                    understand
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Quiz Section */}
        <Card className="mb-8 p-6 border-2 border-blue-200 bg-blue-50">
          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">
                Test Your Understanding
              </h2>
              {!showQuiz ? (
                <div className="text-center py-8">
                  <p className="text-blue-800 mb-6">
                    Ready to test what you learned about predatory lending
                    tactics?
                  </p>
                  <Button
                    onClick={() => setShowQuiz(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Start Quiz
                  </Button>
                </div>
              ) : (
                <QuizComponent
                  onComplete={(score) => {
                    setQuizScore(score);
                    setShowQuiz(false);
                  }}
                />
              )}

              {quizScore !== null && (
                <div className="text-center py-8">
                  <p className="text-2xl font-bold text-blue-800 mb-4">
                    Your Score: {quizScore}%
                  </p>
                  <Button
                    onClick={() => {
                      setShowQuiz(true);
                      setQuizScore(null);
                    }}
                    variant="outline"
                  >
                    Retake Quiz
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Dark Pattern Analysis */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-gray-700" />
            Dark Patterns You Experienced
          </h2>
          <ReflectionDashboard />
        </div>

        {/* Ethical Frameworks Explainer */}
        <div className="mb-8">
          <EthicalFrameworksExplainer />
        </div>

        {/* Call to Action */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Continue?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/teaching">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Phase 3: See Annotated Version
                </Button>
              </Link>
              <Link href="/ethical">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Phase 4: Ethical Alternative
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Quiz Component
function QuizComponent({
  onComplete,
}: {
  onComplete: (score: number) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "What was the actual APR of the payday loan in Phase 1?",
      options: ["36%", "150%", "391%", "It wasn't clearly shown"],
      correct: 3,
      explanation:
        "The APR was deliberately hidden or minimized - a classic dark pattern",
    },
    {
      question: "Which dark pattern creates false time pressure?",
      options: [
        "Roach motel",
        "Artificial urgency",
        "Hidden costs",
        "Forced continuity",
      ],
      correct: 1,
      explanation:
        "Artificial urgency uses countdown timers and 'limited time' offers",
    },
    {
      question:
        "According to 2025 data, what percentage of payday loans are rolled over?",
      options: ["20%", "50%", "80%", "95%"],
      correct: 2,
      explanation: "80% of payday loans are rolled over, creating debt cycles",
    },
    {
      question: "What is the average total cost to borrow $375?",
      options: ["$400", "$450", "$520", "$750"],
      correct: 2,
      explanation: "The average borrower pays $520 to borrow just $375",
    },
    {
      question: "Which principle of Kantian ethics do payday lenders violate?",
      options: [
        "The golden rule",
        "Treating people as ends, not means",
        "Maximizing happiness",
        "Social contract theory",
      ],
      correct: 1,
      explanation:
        "They treat vulnerable borrowers as means to profit, not as autonomous individuals",
    },
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.filter(
        (answer, index) => answer === questions[index].correct
      ).length;
      const score = Math.round((correctAnswers / questions.length) * 100);
      onComplete(score);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-blue-600">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className="w-48 h-2 bg-blue-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-blue-900">
          {question.question}
        </h3>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-100 transition-all duration-200"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
