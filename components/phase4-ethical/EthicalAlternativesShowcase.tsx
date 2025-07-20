"use client";

import { Card } from "@/components/ui/Card";
import { HeartHandshake, Landmark, PiggyBank, Users } from "lucide-react";
import React from "react";

interface Alternative {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  icon: React.ElementType;
  costImpact: "low" | "medium" | "high" | "variable";
}

const alternatives: Alternative[] = [
  {
    name: "Credit Union PALs",
    description:
      "Payday Alternative Loans from federal credit unions are designed to be affordable alternatives to traditional payday loans.",
    pros: [
      "Lower APR (capped at 28%)",
      "Longer repayment terms",
      "Builds credit history",
    ],
    cons: ["Requires credit union membership", "Loan amounts may be limited"],
    icon: Landmark,
    costImpact: "low",
  },
  {
    name: "Negotiating with Creditors",
    description:
      "Contacting your utility company, landlord, or other creditors to request a payment plan or temporary reduction.",
    pros: [
      "No new debt is incurred",
      "Directly addresses the root financial issue",
    ],
    cons: ["Success is not guaranteed", "Requires proactive communication"],
    icon: Users,
    costImpact: "low",
  },
  {
    name: "Community Support & Non-Profits",
    description:
      "Local charities, religious organizations, or community groups often offer financial assistance or grants.",
    pros: [
      "Often zero-interest or a grant (no repayment)",
      "Focus on community well-being",
    ],
    cons: ["Limited availability", "May have specific eligibility criteria"],
    icon: HeartHandshake,
    costImpact: "low",
  },
  {
    name: "Personal Savings",
    description:
      "Using your own funds set aside in an emergency fund or savings account.",
    pros: ["No interest, no debt", "Instant access to funds"],
    cons: [
      "Depletes your financial safety net",
      "Not everyone has sufficient savings",
    ],
    icon: PiggyBank,
    costImpact: "low",
  },
];

const EthicalAlternativesShowcase = () => {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Exploring Safer Alternatives
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {alternatives.map((alt) => (
          <Card key={alt.name} className="p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <alt.icon className="w-10 h-10 text-blue-600 mr-4" />
              <h3 className="font-bold text-lg">{alt.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {alt.description}
            </p>
            <div>
              <h4 className="font-semibold text-sm mb-2">Pros:</h4>
              <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                {alt.pros.map((pro, i) => (
                  <li key={i}>{pro}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">Cons:</h4>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {alt.cons.map((con, i) => (
                  <li key={i}>{con}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default EthicalAlternativesShowcase;
