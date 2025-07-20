"use client";

import WebsitePhase from "@/components/WebsitePhase";
import { useSimulation } from "@/components/providers/SimulationProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EthicalApplicationPage() {
  const router = useRouter();
  const { session, updateSession } = useSimulation();
  const [step, setStep] = useState(1);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState("");

  const assessment = session.ethicalAssessment || { loanAmount: "300" };
  const loanAmount = parseFloat(assessment.loanAmount) || 300;

  // Calculate fees transparently
  const calculateTransparentFees = () => {
    const principal = loanAmount;
    const interestRate = 0.24; // 24% APR (ethical rate)
    const termDays = 30; // 30-day term instead of 14
    const dailyRate = interestRate / 365;
    const interest = principal * dailyRate * termDays;
    const educationFund = 1; // $1 to financial education
    const total = principal + interest + educationFund;

    return {
      principal,
      interest: parseFloat(interest.toFixed(2)),
      educationFund,
      total: parseFloat(total.toFixed(2)),
      apr: 24,
      termDays,
    };
  };

  const fees = calculateTransparentFees();

  const handleQuizSubmit = () => {
    if (quizAnswer === "C") {
      setStep(3);
      updateSession({
        interactionEvents: [
          ...(session.interactionEvents || []),
          {
            type: "passed_comprehension_quiz",
            timestamp: Date.now(),
          },
        ],
      });
    } else {
      alert(
        "That's not correct. APR is the Annual Percentage Rate - the yearly cost of the loan. Please try again."
      );
    }
  };

  const handleFinalSubmit = () => {
    updateSession({
      ethicalLoanData: {
        ...fees,
        reflectionAnswer,
        agreedToTerms,
        applicationTime: new Date().toISOString(),
      },
    });
    router.push("/ethical/complete");
  };

  return (
    <WebsitePhase phase={4}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Step 1: Transparent Cost-Benefit Ledger */}
          {step === 1 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                Complete Cost Transparency
              </h2>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-4">Your Loan Breakdown</h3>

                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">Principal (amount you need)</td>
                      <td className="py-3 text-right font-mono">
                        ${fees.principal.toFixed(2)}
                      </td>
                      <td className="py-3 pl-4 text-sm text-gray-600">
                        → funds for your use
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">
                        Interest ({fees.apr}% APR for {fees.termDays} days)
                      </td>
                      <td className="py-3 text-right font-mono">
                        ${fees.interest.toFixed(2)}
                      </td>
                      <td className="py-3 pl-4 text-sm text-gray-600">
                        → covers our costs
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Education Fund Contribution</td>
                      <td className="py-3 text-right font-mono">
                        ${fees.educationFund.toFixed(2)}
                      </td>
                      <td className="py-3 pl-4 text-sm text-gray-600">
                        → financial literacy programs
                      </td>
                    </tr>
                    <tr className="font-bold text-lg">
                      <td className="py-3">Total to Repay</td>
                      <td className="py-3 text-right font-mono">
                        ${fees.total.toFixed(2)}
                      </td>
                      <td className="py-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    ✓ What's Different Here
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• 24% APR vs typical 400%+ payday loan rates</li>
                    <li>• 30-day term vs typical 14-day term</li>
                    <li>• No hidden fees or surprise charges</li>
                    <li>• No automatic renewals or rollovers</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Important Reminders</h4>
                  <ul className="text-sm space-y-1">
                    <li>• This is still expensive credit</li>
                    <li>• Only borrow what you can repay</li>
                    <li>• Consider alternatives first</li>
                    <li>• You can cancel within 24 hours at no cost</li>
                  </ul>
                </div>
              </div>

              <Button className="w-full" onClick={() => setStep(2)}>
                I Understand the Costs →
              </Button>
            </Card>
          )}

          {/* Step 2: Mandatory Comprehension Quiz */}
          {step === 2 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Comprehension Check</h2>

              <p className="text-gray-700 mb-6">
                To ensure you fully understand the loan terms, please answer
                this question:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="font-semibold mb-4">
                  Which of these is the Annual Percentage Rate (APR) for your
                  loan?
                </p>

                <div className="space-y-3">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="quiz"
                      value="A"
                      checked={quizAnswer === "A"}
                      onChange={(e) => setQuizAnswer(e.target.value)}
                      className="mr-3"
                    />
                    <span>A) The loan principal (${fees.principal})</span>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="quiz"
                      value="B"
                      checked={quizAnswer === "B"}
                      onChange={(e) => setQuizAnswer(e.target.value)}
                      className="mr-3"
                    />
                    <span>B) The fee amount (${fees.interest})</span>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="radio"
                      name="quiz"
                      value="C"
                      checked={quizAnswer === "C"}
                      onChange={(e) => setQuizAnswer(e.target.value)}
                      className="mr-3"
                    />
                    <span>C) The yearly interest rate ({fees.apr}%)</span>
                  </label>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                This ensures you understand a key term that many borrowers miss,
                leading to unexpected costs.
              </p>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  ← Review Costs
                </Button>

                <Button
                  className="flex-1"
                  onClick={handleQuizSubmit}
                  disabled={!quizAnswer}
                >
                  Submit Answer
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Terms Agreement & Reflection */}
          {step === 3 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                Final Agreement & Reflection
              </h2>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
                <h3 className="font-bold mb-4">Loan Agreement Terms</h3>

                <div className="space-y-4 text-sm">
                  <section>
                    <h4 className="font-semibold">1. Loan Details</h4>
                    <p>
                      You are borrowing ${fees.principal} for {fees.termDays}{" "}
                      days at an APR of {fees.apr}%.
                    </p>
                    <p>Total repayment amount: ${fees.total}</p>
                    <p>
                      Due date:{" "}
                      {new Date(
                        Date.now() + fees.termDays * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold">2. Your Rights</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Cancel within 24 hours at no cost</li>
                      <li>No prepayment penalties</li>
                      <li>Clear payment schedule with no hidden fees</li>
                      <li>
                        Protection from harassment or unfair collection
                        practices
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="font-semibold">3. Repayment</h4>
                    <p>One payment of ${fees.total} due on the due date.</p>
                    <p>
                      No automatic renewals. If you cannot pay, contact us to
                      discuss options.
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold">4. Privacy</h4>
                    <p>
                      Your data will never be sold. We only share information as
                      required by law.
                    </p>
                  </section>
                </div>
              </div>

              <label className="flex items-start mb-6">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 mr-3"
                />
                <span className="text-sm">
                  I have read, understood, and agree to these terms. I am
                  entering this agreement voluntarily and believe it is in my
                  best interest.
                </span>
              </label>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold mb-3">Reflection Question</h4>
                <p className="text-sm mb-3">
                  In one sentence, why did you choose to proceed with this loan?
                </p>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                  placeholder="Your answer helps us ensure we're truly serving your needs..."
                  value={reflectionAnswer}
                  onChange={(e) => setReflectionAnswer(e.target.value)}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleFinalSubmit}
                disabled={!agreedToTerms || !reflectionAnswer.trim()}
              >
                Complete Application
              </Button>
            </Card>
          )}
        </div>
      </div>
    </WebsitePhase>
  );
}
