"use client";

import WebsitePhase from "@/components/WebsitePhase";
import { useSimulation } from "@/components/providers/SimulationProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EthicalAssessmentPage() {
  const router = useRouter();
  const { updateSession } = useSimulation();
  const [step, setStep] = useState(1);
  const [assessment, setAssessment] = useState({
    loanAmount: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    existingDebt: "",
    loanPurpose: "",
    exploredAlternatives: false,
    understandsRisks: false,
  });
  const [affordabilityResult, setAffordabilityResult] = useState<string | null>(
    null
  );
  const [metaConsent, setMetaConsent] = useState({
    feelsPressured: false,
    needsMoreTime: false,
    fullyUnderstands: false,
  });

  const calculateAffordability = () => {
    const income = parseFloat(assessment.monthlyIncome) || 0;
    const expenses = parseFloat(assessment.monthlyExpenses) || 0;
    const debt = parseFloat(assessment.existingDebt) || 0;
    const requestedLoan = parseFloat(assessment.loanAmount) || 0;

    const disposableIncome = income - expenses - debt;
    const loanPayment = requestedLoan * 1.15; // Including fees

    if (disposableIncome < 0) {
      return "not-affordable";
    } else if (loanPayment > disposableIncome * 0.5) {
      return "high-risk";
    } else if (loanPayment > disposableIncome * 0.25) {
      return "moderate-risk";
    } else {
      return "manageable";
    }
  };

  const handleAssessmentSubmit = () => {
    const result = calculateAffordability();
    setAffordabilityResult(result);
    updateSession({
      ethicalAssessment: {
        ...assessment,
        affordabilityResult: result,
        timestamp: new Date().toISOString(),
      },
    });
    setStep(2);
  };

  const handleMetaConsentSubmit = () => {
    if (metaConsent.feelsPressured || metaConsent.needsMoreTime) {
      // Pause the process if user feels pressured
      router.push("/ethical/counseling");
    } else if (metaConsent.fullyUnderstands) {
      updateSession({
        metaConsent: {
          ...metaConsent,
          timestamp: new Date().toISOString(),
        },
      });
      router.push("/ethical/application");
    }
  };

  return (
    <WebsitePhase phase={4}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-blue-600 text-white" : "bg-gray-300"
                }`}
              >
                1
              </div>
              <div className="w-16 h-1 bg-gray-300">
                <div
                  className={`h-full bg-blue-600 transition-all ${
                    step >= 2 ? "w-full" : "w-0"
                  }`}
                />
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-blue-600 text-white" : "bg-gray-300"
                }`}
              >
                2
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Financial Assessment</span>
              <span>Consent Check</span>
            </div>
          </div>

          {/* Step 1: Financial Assessment */}
          {step === 1 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                Financial Self-Assessment
              </h2>

              <p className="text-gray-700 mb-6">
                Let's understand your financial situation to ensure any loan
                would genuinely help rather than harm your financial health.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    How much do you need to borrow?
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={assessment.loanAmount}
                    onChange={(e) =>
                      setAssessment({
                        ...assessment,
                        loanAmount: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    What is the loan for?
                  </label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={assessment.loanPurpose}
                    onChange={(e) =>
                      setAssessment({
                        ...assessment,
                        loanPurpose: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a purpose</option>
                    <option value="emergency">Medical emergency</option>
                    <option value="bills">Utility bills</option>
                    <option value="rent">Rent/Mortgage</option>
                    <option value="car">Car repair</option>
                    <option value="other">Other essential expense</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Monthly income after taxes
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={assessment.monthlyIncome}
                    onChange={(e) =>
                      setAssessment({
                        ...assessment,
                        monthlyIncome: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Monthly essential expenses (rent, food, utilities)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={assessment.monthlyExpenses}
                    onChange={(e) =>
                      setAssessment({
                        ...assessment,
                        monthlyExpenses: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Existing monthly debt payments
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={assessment.existingDebt}
                    onChange={(e) =>
                      setAssessment({
                        ...assessment,
                        existingDebt: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={assessment.exploredAlternatives}
                      onChange={(e) =>
                        setAssessment({
                          ...assessment,
                          exploredAlternatives: e.target.checked,
                        })
                      }
                      className="mr-3"
                    />
                    <span className="text-sm">
                      I have explored alternatives like payment plans,
                      assistance programs, and credit unions
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={assessment.understandsRisks}
                      onChange={(e) =>
                        setAssessment({
                          ...assessment,
                          understandsRisks: e.target.checked,
                        })
                      }
                      className="mr-3"
                    />
                    <span className="text-sm">
                      I understand payday loans have very high interest rates
                      and can lead to debt cycles
                    </span>
                  </label>
                </div>

                <Button
                  className="w-full"
                  onClick={handleAssessmentSubmit}
                  disabled={
                    !assessment.loanAmount ||
                    !assessment.monthlyIncome ||
                    !assessment.loanPurpose ||
                    !assessment.exploredAlternatives ||
                    !assessment.understandsRisks
                  }
                >
                  Continue to Results
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Affordability Results & Meta-Consent */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Affordability Result */}
              <Card
                className={`p-6 ${
                  affordabilityResult === "not-affordable"
                    ? "border-red-500 bg-red-50"
                    : affordabilityResult === "high-risk"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-green-500 bg-green-50"
                }`}
              >
                <h3 className="text-xl font-bold mb-4">
                  Affordability Assessment Result
                </h3>

                {affordabilityResult === "not-affordable" && (
                  <>
                    <p className="text-red-800 mb-4">
                      ⚠️ <strong>Not Recommended:</strong> Based on your
                      financial information, this loan would likely cause
                      significant financial hardship.
                    </p>
                    <p className="text-sm mb-4">
                      We strongly recommend exploring these alternatives
                      instead:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                      <li>Contact a nonprofit credit counseling agency</li>
                      <li>Negotiate payment plans with creditors</li>
                      <li>Apply for emergency assistance programs</li>
                      <li>Consider a credit union small-dollar loan</li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/ethical/resources")}
                    >
                      View Alternative Resources
                    </Button>
                  </>
                )}

                {affordabilityResult === "high-risk" && (
                  <>
                    <p className="text-yellow-800 mb-4">
                      ⚠️ <strong>High Risk:</strong> This loan would consume a
                      significant portion of your disposable income, making
                      repayment challenging.
                    </p>
                    <p className="text-sm">
                      Consider borrowing a smaller amount or exploring
                      alternatives first.
                    </p>
                  </>
                )}

                {affordabilityResult === "moderate-risk" && (
                  <>
                    <p className="text-green-800 mb-4">
                      ℹ️ <strong>Proceed with Caution:</strong> While you may be
                      able to repay this loan, it will still be a significant
                      financial burden.
                    </p>
                  </>
                )}

                {affordabilityResult === "manageable" && (
                  <>
                    <p className="text-green-800 mb-4">
                      ✓ <strong>Potentially Manageable:</strong> Your finances
                      suggest you could repay this loan, but remember the high
                      cost of payday lending.
                    </p>
                  </>
                )}
              </Card>

              {/* Meta-Consent Check */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Consent Verification</h3>

                <p className="text-gray-700 mb-6">
                  Before proceeding, we want to ensure your decision is truly
                  voluntary and free from pressure.
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold mb-2">
                      Do you feel any pressure or unfair nudging right now?
                    </p>
                    <div className="space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="pressure"
                          checked={metaConsent.feelsPressured === true}
                          onChange={() =>
                            setMetaConsent({
                              ...metaConsent,
                              feelsPressured: true,
                            })
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="pressure"
                          checked={metaConsent.feelsPressured === false}
                          onChange={() =>
                            setMetaConsent({
                              ...metaConsent,
                              feelsPressured: false,
                            })
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold mb-2">
                      Would you like more time to consider this decision?
                    </p>
                    <div className="space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="time"
                          checked={metaConsent.needsMoreTime === true}
                          onChange={() =>
                            setMetaConsent({
                              ...metaConsent,
                              needsMoreTime: true,
                            })
                          }
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="time"
                          checked={metaConsent.needsMoreTime === false}
                          onChange={() =>
                            setMetaConsent({
                              ...metaConsent,
                              needsMoreTime: false,
                            })
                          }
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={metaConsent.fullyUnderstands}
                      onChange={(e) =>
                        setMetaConsent({
                          ...metaConsent,
                          fullyUnderstands: e.target.checked,
                        })
                      }
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm">
                      I fully understand the terms, costs, and risks of this
                      loan. I am making this decision voluntarily without
                      pressure, and I believe it is in my best interest given my
                      circumstances.
                    </span>
                  </label>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push("/ethical")}
                  >
                    ← Return Home
                  </Button>

                  <Button
                    className="flex-1"
                    onClick={handleMetaConsentSubmit}
                    disabled={!metaConsent.fullyUnderstands}
                  >
                    {metaConsent.feelsPressured || metaConsent.needsMoreTime
                      ? "Get Support"
                      : "Continue to Application"}
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </WebsitePhase>
  );
}
