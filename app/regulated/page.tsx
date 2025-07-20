"use client";

import { LegalCaseNotice } from "@/components/regulated/LegalCaseNotice";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { EnhancedLoanCalculator } from "@/lib/core/EnhancedLoanCalculator";
import { useState } from "react";

export default function RegulatedPage() {
  const [loanAmount, setLoanAmount] = useState(500);
  const [hasUsedExtension, setHasUsedExtension] = useState(false);
  const [showAffordabilityCheck, setShowAffordabilityCheck] = useState(false);
  const [bankBalance, setBankBalance] = useState(1000); // Mock bank balance
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const regulatedLoan =
    EnhancedLoanCalculator.calculateRegulatedLoan(loanAmount);

  const canAffordLoan = bankBalance > regulatedLoan.totalCost;

  const handleRequestExtension = () => {
    if (!hasUsedExtension) {
      setHasUsedExtension(true);
      alert(
        "Your one-time 0% extension has been granted. Your new due date is in 30 days."
      );
    }
  };

  const handleAffordabilityCheck = () => {
    setShowAffordabilityCheck(true);
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    setQuizCorrect(isCorrect);
  };

  const handleSubmitApplication = () => {
    const sessionId = `REG-${Date.now()}`;
    console.log("Saving session:", {
      sessionId,
      loanAmount,
      regulatedLoan,
      affordabilityCheck: {
        run: showAffordabilityCheck,
        passed: canAffordLoan,
      },
      quizPassed: quizCorrect,
    });
    setApplicationSubmitted(true);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Regulated Loan Offer (CFPB & State Law Compliant)
      </h1>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Loan Terms</h2>

        <div className="mb-4">
          <label htmlFor="loanAmount" className="block text-sm font-medium">
            Loan Amount
          </label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <div className="space-y-2">
          <p>
            <strong>Advertised APR:</strong> {regulatedLoan.apr.toFixed(2)}%
          </p>
          <p>
            <strong>Origination Fee:</strong> $
            {regulatedLoan.fees.origination.toFixed(2)}
          </p>
          <p>
            <strong>Total Repayment:</strong> $
            {regulatedLoan.totalCost.toFixed(2)}
          </p>
        </div>

        <LegalCaseNotice
          capApplied={regulatedLoan.capApplied}
          caseNotice={regulatedLoan.caseNotice}
        />

        <div className="mt-6 space-y-4">
          <Button
            onClick={handleRequestExtension}
            disabled={hasUsedExtension}
            className="w-full"
          >
            {hasUsedExtension
              ? "Extension Used"
              : "Request 0% Extension (1-time)"}
          </Button>

          <Button
            onClick={handleAffordabilityCheck}
            className="w-full"
            variant="secondary"
          >
            Run Affordability Check
          </Button>

          {showAffordabilityCheck && (
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
                {regulatedLoan.totalCost.toFixed(2)}
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
          )}

          <div className="mt-6 p-4 border-t">
            <h3 className="font-semibold mb-2">
              Mandatory Plain-Language Quiz
            </h3>
            <p className="text-sm mb-4">
              To ensure you understand the terms, please answer the following
              question:
            </p>
            <p className="mb-2">
              Which of these is the Annual Percentage Rate (APR)?
            </p>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" onClick={() => handleQuizAnswer(false)}>
                ${regulatedLoan.fees.origination.toFixed(2)} (The fee amount)
              </Button>
              <Button variant="outline" onClick={() => handleQuizAnswer(true)}>
                {regulatedLoan.apr.toFixed(2)}% (The yearly interest percent)
              </Button>
              <Button variant="outline" onClick={() => handleQuizAnswer(false)}>
                ${loanAmount} (The loan principal)
              </Button>
            </div>
            {quizCorrect === false && (
              <div className="mt-2 text-red-600">
                <p>That is not correct. Please try again.</p>
                <a
                  href="https://www.consumerfinance.gov/ask-cfpb/what-is-an-annual-percentage-rate-apr-en-1062/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Learn more about APR
                </a>
              </div>
            )}
            {quizCorrect === true && (
              <div className="mt-2 text-green-600">
                <p>Correct! You have successfully identified the APR.</p>
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmitApplication}
            disabled={!quizCorrect || applicationSubmitted}
            className="w-full"
          >
            {applicationSubmitted
              ? "Application Submitted"
              : "Submit Application"}
          </Button>

          {applicationSubmitted && (
            <div className="p-4 bg-blue-100 rounded text-center">
              <h3 className="font-semibold">Application Recorded</h3>
              <p className="text-sm">
                Your session (ID: REG-{Date.now()}) has been saved.
              </p>
              <p className="text-xs mt-2">
                <strong>Consumer Rights Notice:</strong> You have 24 hours to
                cancel this loan with no penalty.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
