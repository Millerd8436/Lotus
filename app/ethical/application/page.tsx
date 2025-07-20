"use client";

import WebsitePhase from "@/components/WebsitePhase";
import { useSimulation } from "@/components/providers/SimulationProvider";
import { LegalCaseNotice } from "@/components/regulated/LegalCaseNotice";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EnhancedLoanCalculator } from "@/lib/core/EnhancedLoanCalculator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EthicalApplicationPage() {
  const router = useRouter();
  const { session, updateSession } = useSimulation();
  const [step, setStep] = useState(1);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState("");
  const [feelsPressured, setFeelsPressured] = useState<boolean | null>(null);
  const [showAffordabilityCheck, setShowAffordabilityCheck] = useState(false);
  const [bankBalance, setBankBalance] = useState(1000); // Mock bank balance
  const [hasUsedExtension, setHasUsedExtension] = useState(false);
  const [inCoolingOffPeriod, setInCoolingOffPeriod] = useState(false);

  const assessment = session.ethicalAssessment || { loanAmount: "300" };
  const loanAmount = parseFloat(assessment.loanAmount) || 300;

  const regulatedLoan =
    EnhancedLoanCalculator.calculateRegulatedLoan(loanAmount);
  const { ethical: fees, exploitative: predatoryFees } =
    EnhancedLoanCalculator.compareLoans(loanAmount);

  const canAffordLoan = bankBalance > fees.totalRepaid;

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

  const handleAgreementSubmit = () => {
    if (agreedToTerms && reflectionAnswer.trim()) {
      setShowAffordabilityCheck(true);
    }
  };

  const handleRequestExtension = () => {
    if (!hasUsedExtension) {
      setHasUsedExtension(true);
      alert(
        "Your one-time 0% extension has been granted. Your new due date is in 30 days."
      );
    }
  };

  const handleMetaConsentSubmit = () => {
    if (feelsPressured) {
      router.push("/ethical/counseling");
    } else {
      updateSession({
        ...session,
        ethicalLoanData: {
          ...fees,
          reflectionAnswer,
          agreedToTerms,
          applicationTime: new Date().toISOString(),
          metaConsent: {
            feelsPressured: false,
            timestamp: new Date().toISOString(),
          },
        },
        interactionEvents: [
          ...(session.interactionEvents || []),
          {
            type: "completed_ethical_application",
            timestamp: Date.now(),
          },
        ],
      });
      setInCoolingOffPeriod(true);
      router.push("/ethical/complete");
    }
  };

  useEffect(() => {
    if (inCoolingOffPeriod) {
      const timer = setTimeout(() => {
        setInCoolingOffPeriod(false);
      }, 24 * 60 * 60 * 1000); // 24-hour cooling-off period

      return () => clearTimeout(timer);
    }
  }, [inCoolingOffPeriod]);

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

              <LegalCaseNotice
                capApplied={regulatedLoan.capApplied}
                caseNotice={regulatedLoan.caseNotice}
              />

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
                        → Funds directly deposited to your account.
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
                        → Covers our operational costs to provide this service.
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">"Transparency Tax"</td>
                      <td className="py-3 text-right font-mono">
                        ${fees.transparencyTax.toFixed(2)}
                      </td>
                      <td className="py-3 pl-4 text-sm text-gray-600">
                        → Funds our financial education and outreach programs.
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Education Fund Contribution</td>
                      <td className="py-3 text-right font-mono">
                        ${fees.educationFund.toFixed(2)}
                      </td>
                      <td className="py-3 pl-4 text-sm text-gray-600">
                        → Contributes to free financial literacy resources for
                        everyone.
                      </td>
                    </tr>
                    <tr className="font-bold text-lg">
                      <td className="py-3">Total to Repay</td>
                      <td className="py-3 text-right font-mono">
                        ${fees.totalRepaid.toFixed(2)}
                      </td>
                      <td></td>
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
                    <li>
                      • {fees.apr}% APR vs. typical{" "}
                      {predatoryFees.apr.toFixed(0)}%+ payday loan rates
                    </li>
                    <li>• {fees.termDays}-day term vs. typical 14-day term</li>
                    <li>• No hidden fees or surprise charges</li>
                    <li>• No automatic renewals or rollovers</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Comparison: Predatory Loan
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      • Total to Repay: ${predatoryFees.totalRepaid.toFixed(2)}
                    </li>
                    <li>• APR: {predatoryFees.apr.toFixed(2)}%</li>
                    <li>
                      • Hidden Fees: $
                      {(
                        predatoryFees.fees.total -
                        predatoryFees.fees.origination
                      ).toFixed(2)}
                    </li>
                  </ul>
                </div>
              </div>

              <Button className="w-full" onClick={() => setStep(2)}>
                I Understand the Costs →
              </Button>
              <Button
                onClick={handleRequestExtension}
                disabled={hasUsedExtension || inCoolingOffPeriod}
                className="w-full mt-4"
              >
                {hasUsedExtension
                  ? "Extension Used"
                  : "Request 0% Extension (1-time)"}
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

              {quizAnswer && quizAnswer !== "C" && (
                <div className="text-red-600 mb-4">
                  <p>
                    That's not correct. The APR is the Annual Percentage Rate,
                    which is the yearly interest rate.
                  </p>
                  <a
                    href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-an-interest-rate-and-the-annual-percentage-rate-apr-en-135/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Learn more about APR
                  </a>
                </div>
              )}

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
                    <p>Total repayment amount: ${fees.totalRepaid}</p>
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
                    <p>
                      One payment of ${fees.totalRepaid} due on the due date.
                    </p>
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
                onClick={handleAgreementSubmit}
                disabled={!agreedToTerms || !reflectionAnswer.trim()}
              >
                Continue to Final Check →
              </Button>
            </Card>
          )}

          {/* Step 4: Affordability Check */}
          {showAffordabilityCheck && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Affordability Check</h2>
              <div
                className={`p-4 rounded ${
                  canAffordLoan ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <h3 className="font-semibold">Affordability Check Results</h3>
                <p>
                  <strong>Mock Bank Balance:</strong> ${bankBalance}
                </p>
                <p>
                  <strong>Loan Repayment:</strong> $
                  {fees.totalRepaid.toFixed(2)}
                </p>
                <p
                  className={`font-bold ${
                    canAffordLoan ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {canAffordLoan
                    ? "✅ Loan appears affordable based on your balance."
                    : "❌ WARNING: Loan repayment exceeds your current balance."}
                </p>
              </div>
              <Button className="w-full mt-4" onClick={() => setStep(4)}>
                Continue to Meta-Consent →
              </Button>
            </Card>
          )}

          {/* Step 5: Meta-Consent Confirmation */}
          {step === 4 && !showAffordabilityCheck && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                Meta-Consent Confirmation
              </h2>
              <p className="text-gray-700 mb-6">
                As a final step to uphold our ethical commitment, please answer
                the following question. This ensures your decision is truly
                voluntary and free from manipulation, a core tenet of respecting
                your autonomy.
              </p>
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <p className="font-semibold mb-4">
                  Do you feel any pressure or unfair nudging right now?
                </p>
                <div className="flex gap-4">
                  <Button
                    variant={feelsPressured === true ? "danger" : "outline"}
                    className="flex-1"
                    onClick={() => setFeelsPressured(true)}
                  >
                    Yes, I feel pressured
                  </Button>
                  <Button
                    variant={feelsPressured === false ? "primary" : "outline"}
                    className="flex-1"
                    onClick={() => setFeelsPressured(false)}
                  >
                    No, I feel free to choose
                  </Button>
                </div>
              </div>
              {feelsPressured === true && (
                <div className="text-center text-red-600 mb-4">
                  <p>
                    If you feel pressured, we recommend exploring our support
                    resources instead.
                  </p>
                </div>
              )}
              <Button
                className="w-full mt-4"
                onClick={handleMetaConsentSubmit}
                disabled={feelsPressured === null}
              >
                {feelsPressured
                  ? "Get Support Resources"
                  : "Complete Application"}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </WebsitePhase>
  );
}
