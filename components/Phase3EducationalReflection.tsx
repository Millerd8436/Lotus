"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Phase 3: Educational Reflection & Autonomy Theater
 *
 * Comprehensive analysis and education component featuring:
 * - Side-by-side comparison of Phase 1 vs Phase 2
 * - Autonomy theater detection and analysis
 * - Interactive quizzes and educational content
 * - Behavioral pattern analysis
 * - Research findings about predatory lending
 * - Consumer protection information
 */

interface ComparisonData {
  category: string;
  exploitative: string;
  ethical: string;
  impact: string;
  autonomyViolation: "High" | "Medium" | "Low" | "None";
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "dark-patterns" | "fees" | "rights" | "alternatives";
}

const Phase3EducationalReflection: React.FC = () => {
  const [currentView, setCurrentView] = useState("overview");
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [autonomyScore, setAutonomyScore] = useState(0);

  const comparisonData: ComparisonData[] = [
    {
      category: "Initial Hook",
      exploitative: "Fake urgency timers, scarcity claims, aggressive CTAs",
      ethical: "Clear value proposition, honest terms, no pressure",
      impact: "Creates panic decisions vs informed choices",
      autonomyViolation: "High",
    },
    {
      category: "Fee Disclosure",
      exploitative: "Drip pricing - fees revealed progressively",
      ethical: "Full cost breakdown upfront with APR",
      impact: "Hidden costs vs transparent pricing",
      autonomyViolation: "High",
    },
    {
      category: "Add-on Services",
      exploitative: "Pre-selected, confirmshaming opt-outs",
      ethical: "All services opt-in only with clear benefits",
      impact: "Unwanted charges vs conscious choices",
      autonomyViolation: "High",
    },
    {
      category: "Application Process",
      exploitative: "Progressive complexity, roach motel pattern",
      ethical: "Clear steps, easy cancellation available",
      impact: "Trapped in process vs free to leave",
      autonomyViolation: "Medium",
    },
    {
      category: "Loan Terms",
      exploitative: "664% APR, rollover traps, NSF fees",
      ethical: "36% APR, no rollovers, fair collection",
      impact: "Debt cycle vs manageable repayment",
      autonomyViolation: "High",
    },
    {
      category: "Data Privacy",
      exploitative: "Pre-consented sharing, lead generation",
      ethical: "No data sharing, explicit consent only",
      impact: "Privacy violation vs data protection",
      autonomyViolation: "High",
    },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: "dark-pattern-1",
      question: "What is 'confirmshaming' in the context of predatory lending?",
      options: [
        "Asking for confirmation before loan approval",
        "Using guilt-inducing language to prevent opt-outs",
        "Confirming the borrower's shame about needing money",
        "Double-checking loan terms for accuracy",
      ],
      correctAnswer: 1,
      explanation:
        "Confirmshaming uses guilt-inducing language like 'Only irresponsible borrowers skip this protection' to manipulate users into selecting unwanted add-ons.",
      category: "dark-patterns",
    },
    {
      id: "fees-1",
      question: "What was the real APR in the exploitative Phase 1 example?",
      options: ["36%", "391%", "664%", "1,000%"],
      correctAnswer: 2,
      explanation:
        "The exploitative example showed 664% APR, which is typical for predatory payday loans in states with weak usury laws.",
      category: "fees",
    },
    {
      id: "rights-1",
      question:
        "Under the Fair Debt Collection Practices Act, which is prohibited?",
      options: [
        "Calling during business hours",
        "Threatening legal action they can't take",
        "Sending written notices",
        "Calling once per day",
      ],
      correctAnswer: 1,
      explanation:
        "The FDCPA prohibits debt collectors from making threats they cannot or will not carry out, including false legal threats.",
      category: "rights",
    },
    {
      id: "alternatives-1",
      question:
        "What is the maximum APR for Credit Union Payday Alternative Loans (PALs)?",
      options: ["18%", "28%", "36%", "48%"],
      correctAnswer: 1,
      explanation:
        "Credit Union PALs have a maximum APR of 28%, making them much more affordable than traditional payday loans.",
      category: "alternatives",
    },
  ];

  const autonomyTheaterMetrics = useMemo(
    () => [
      {
        category: "Progressive Disclosure",
        violation: "Form expands from 3 to 15+ fields",
        description: "Simple signup becomes complex application",
        severity: "High" as const,
        realWorldImpact: "Users invested too much time to quit",
      },
      {
        pattern: "Fake Urgency Creation",
        description: "Countdown timers that reset, artificial scarcity claims",
        severity: "High",
        frequency: 85,
        impact: "Forces rushed decisions, bypasses rational thinking",
      },
      {
        pattern: "Drip Pricing Concealment",
        description: "Progressive fee disclosure to hide true costs",
        severity: "Critical",
        frequency: 92,
        impact: "Prevents informed cost comparison, enables price manipulation",
      },
      {
        pattern: "Preselection Manipulation",
        description: "Pre-checked boxes with confirmshaming language",
        severity: "High",
        frequency: 78,
        impact: "Generates unwanted charges, exploits user inattention",
      },
      {
        pattern: "Roach Motel Process",
        description: "Easy to enter, difficult to exit application flow",
        severity: "Medium",
        frequency: 65,
        impact: "Traps users in process, prevents backing out",
      },
      {
        pattern: "Authority Deception",
        description:
          "Fake trust badges, false testimonials, manufactured credibility",
        severity: "High",
        frequency: 89,
        impact: "Bypasses skepticism, creates false sense of security",
      },
    ],
    []
  );

  const calculateAutonomyScore = useCallback(() => {
    const totalViolations = autonomyTheaterMetrics.reduce((sum, metric) => {
      const severityWeight =
        metric.severity === "High"
          ? 4
          : metric.severity === "Medium"
            ? 3
            : metric.severity === "Low"
              ? 2
              : 1;
      return sum + severityWeight;
    }, 0);

    setAutonomyScore(Math.round(totalViolations * 10));
  }, [autonomyTheaterMetrics]);

  const submitQuiz = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Educational Analysis & Reflection
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Compare the two lending experiences and understand the psychology
          behind predatory practices
        </p>
      </div>

      {/* Autonomy Theater Summary */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-red-800 mb-4">
          🎭 Autonomy Theater Detection
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-red-700 mb-4">
              "Autonomy Theater" refers to the illusion of choice and control
              while actually constraining user decisions through manipulation.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Manipulation Patterns Detected:</span>
                <span className="font-bold">
                  {autonomyTheaterMetrics.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Severity:</span>
                <span className="font-bold text-red-600">High</span>
              </div>
              <div className="flex justify-between">
                <span>Autonomy Violation Score:</span>
                <span className="font-bold text-red-600">
                  {autonomyScore}/100
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">
              Most Common Violations:
            </h4>
            <div className="space-y-2 text-sm">
              {autonomyTheaterMetrics.slice(0, 3).map((metric, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      metric.severity === "Critical"
                        ? "bg-red-600"
                        : metric.severity === "High"
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                    }`}
                  ></span>
                  <span>{metric.pattern}</span>
                  <span className="text-gray-500">({metric.frequency}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phase Comparison Grid */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Phase Comparison Analysis
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-3 text-left">Category</th>
                <th className="border p-3 text-left bg-red-50">
                  Phase 1: Exploitative
                </th>
                <th className="border p-3 text-left bg-green-50">
                  Phase 2: Ethical
                </th>
                <th className="border p-3 text-left">Impact</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3 font-semibold">{row.category}</td>
                  <td className="border p-3 text-sm bg-red-50">
                    {row.exploitative}
                  </td>
                  <td className="border p-3 text-sm bg-green-50">
                    {row.ethical}
                  </td>
                  <td className="border p-3 text-sm">{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setCurrentView("autonomy")}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          🎭 Autonomy Theater Analysis
        </button>
        <button
          onClick={() => setCurrentView("quiz")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          📝 Knowledge Quiz
        </button>
        <button
          onClick={() => setCurrentView("research")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          📊 Research Findings
        </button>
      </div>
    </div>
  );

  const renderAutonomyTheater = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-4">
          🎭 Autonomy Theater Analysis
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          How predatory lenders create the illusion of choice while manipulating
          your decisions
        </p>
      </div>

      {/* Autonomy Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {autonomyTheaterMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-gray-800">
                {metric.pattern}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${
                  metric.severity === "Critical"
                    ? "bg-red-600 text-white"
                    : metric.severity === "High"
                      ? "bg-orange-500 text-white"
                      : metric.severity === "Medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-400 text-white"
                }`}
              >
                {metric.severity}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{metric.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Frequency:</span>
                <span className="font-bold">{metric.frequency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metric.frequency}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-700 mt-2">
                <strong>Impact:</strong> {metric.impact}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Autonomy Score */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-red-800 mb-4">
          Overall Autonomy Violation Score
        </h3>
        <div className="text-6xl font-black text-red-600 mb-4">
          {autonomyScore}/100
        </div>
        <p className="text-red-700 text-lg">
          This score represents the cumulative impact of manipulation tactics on
          user autonomy. Higher scores indicate more severe violations of user
          agency and informed consent.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentView("overview")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          Back to Overview
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">
          📝 Knowledge Assessment
        </h2>
        <p className="text-xl text-gray-600">
          Test your understanding of predatory lending practices
        </p>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Question {currentQuiz + 1} of {quizQuestions.length}
              </h3>
              <div className="text-sm text-gray-600">
                {Math.round((currentQuiz / quizQuestions.length) * 100)}%
                Complete
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentQuiz / quizQuestions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800">
              {quizQuestions[currentQuiz]?.question}
            </h4>

            <div className="space-y-3">
              {quizQuestions[currentQuiz]?.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuiz}`}
                    value={index}
                    onChange={() => {
                      const newAnswers = [...quizAnswers];
                      newAnswers[currentQuiz] = index;
                      setQuizAnswers(newAnswers);
                    }}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuiz((prev) => Math.max(0, prev - 1))}
                disabled={currentQuiz === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              {currentQuiz < quizQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuiz((prev) => prev + 1)}
                  disabled={quizAnswers[currentQuiz] === undefined}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submitQuiz}
                  disabled={quizAnswers[currentQuiz] === undefined}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">Quiz Results</h3>

          <div className="space-y-6">
            {quizQuestions.map((question, index) => {
              const userAnswer = quizAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <div className="flex items-center mb-2">
                    <span
                      className={`mr-3 ${isCorrect ? "text-green-600" : "text-red-600"}`}
                    >
                      {isCorrect ? "✓" : "✗"}
                    </span>
                    <h4 className="font-semibold">{question.question}</h4>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Your answer:</span>{" "}
                      {userAnswer !== undefined
                        ? question.options[userAnswer]
                        : "No answer"}
                    </div>
                    {!isCorrect && (
                      <div>
                        <span className="font-medium">Correct answer:</span>{" "}
                        {question.options[question.correctAnswer]}
                      </div>
                    )}
                    <div className="text-gray-600">
                      <span className="font-medium">Explanation:</span>{" "}
                      {question.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <div className="text-3xl font-bold mb-4">
              Score:{" "}
              <span
                className={getScoreColor(
                  Math.round(
                    (quizAnswers.filter(
                      (ans, i) =>
                        ans !== undefined &&
                        quizQuestions[i] &&
                        ans === quizQuestions[i].correctAnswer
                    ).length /
                      quizQuestions.length) *
                      100
                  )
                )}
              >
                {Math.round(
                  (quizAnswers.filter(
                    (ans, i) =>
                      ans !== undefined &&
                      quizQuestions[i] &&
                      ans === quizQuestions[i].correctAnswer
                  ).length /
                    quizQuestions.length) *
                    100
                )}
                %
              </span>
            </div>

            <button
              onClick={() => setCurrentView("overview")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Back to Overview
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderResearch = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-purple-600 mb-4">
          📊 Research Findings
        </h2>
        <p className="text-xl text-gray-600">
          Real data about predatory lending practices
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            ACH Exploitation Statistics
          </h3>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-red-600">32%</div>
              <div className="text-red-700">
                of borrowers suffer unauthorized ACH withdrawals
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">$35</div>
              <div className="text-orange-700">
                average NSF fee per failed attempt
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">5.7</div>
              <div className="text-yellow-700">
                average withdrawal attempts per failed payment
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Rollover Trap Statistics
          </h3>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-red-600">80%</div>
              <div className="text-red-700">
                of payday loan revenue comes from borrowers trapped in debt
                cycles
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">10</div>
              <div className="text-orange-700">
                average number of rollovers per borrower per year
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">$520</div>
              <div className="text-yellow-700">
                average annual fees paid by chronic borrowers
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentView("overview")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          Back to Overview
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    calculateAutonomyScore();
  }, [calculateAutonomyScore]);

  // Main render logic
  switch (currentView) {
    case "autonomy":
      return renderAutonomyTheater();
    case "quiz":
      return renderQuiz();
    case "research":
      return renderResearch();
    default:
      return renderOverview();
  }
};

export default Phase3EducationalReflection;
