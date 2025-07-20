"use client";

import { Card } from "@/components/ui/Card";
import React from "react";

interface FinalConsentStepProps {
  consentItems: Record<string, boolean>;
  onConsentChange: (key: string, value: boolean) => void;
}

const consentChecks = {
  understandAPR:
    "I fully understand the Annual Percentage Rate (APR) and how it affects the total cost.",
  understandTotalCost:
    "I know the exact total amount I must repay, including all fees.",
  exploredAlternatives:
    "I have considered the lower-cost alternatives presented and still choose this option.",
  canAffordPayments:
    "I have reviewed my budget and am confident I can make the repayment without financial hardship.",
  rightToCancel:
    "I understand I have a legal right to cancel this loan within a specific timeframe without penalty.",
  noCoercion:
    "I confirm that I am not being pressured or coerced into taking this loan by any person.",
  voluntaryDecision:
    "This is my own voluntary decision, made with a clear and sound mind after careful reflection.",
  fullDisclosure:
    "I acknowledge that the lender has provided a full and transparent disclosure of all terms.",
};

const FinalConsentStep: React.FC<FinalConsentStepProps> = ({
  consentItems,
  onConsentChange,
}) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-green-50 border-green-200">
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          Final Informed Consent Checklist
        </h3>
        <p className="text-green-700 mb-6">
          Please confirm each point to ensure your decision is fully informed
          and voluntary. This is for your protection.
        </p>
        <div className="space-y-5">
          {Object.entries(consentChecks).map(([key, text]) => (
            <label
              key={key}
              className="flex items-start gap-4 p-4 bg-white rounded-lg border-2 border-green-200 cursor-pointer hover:border-green-400 transition"
            >
              <input
                type="checkbox"
                checked={consentItems[key] || false}
                onChange={(e) => onConsentChange(key, e.target.checked)}
                className="mt-1 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="text-gray-800">{text}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FinalConsentStep;
