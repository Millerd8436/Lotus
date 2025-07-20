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
}

const alternatives: Alternative[] = [
  {
    name: "Credit Union PALs (Payday Alternative Loans)",
    description:
      "Federally regulated loans from credit unions designed to be affordable.",
    pros: ["Lower APR (capped at 28%)", "Longer repayment terms"],
    cons: ["Requires credit union membership", "May have processing time"],
    icon: Landmark,
  },
  {
    name: "Community Support & Non-Profits",
    description: "Local charities or religious organizations offer assistance.",
    pros: ["Often zero-interest or grants", "Focus on community well-being"],
    cons: ["Limited availability", "May have specific eligibility criteria"],
    icon: HeartHandshake,
  },
  {
    name: "Negotiating with Creditors",
    description:
      "Contacting your utility company or landlord to request a payment plan.",
    pros: ["No new debt incurred", "Directly addresses the root problem"],
    cons: ["Not guaranteed to succeed", "Requires direct communication"],
    icon: Users,
  },
  {
    name: "Personal Savings or Emergency Fund",
    description: "Using your own funds set aside for unexpected expenses.",
    pros: ["No interest, no debt", "Instant access"],
    cons: ["Depletes your safety net", "Not everyone has one"],
    icon: PiggyBank,
  },
];

const AlternativesStep = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800">
          Before You Borrow: Explore Your Alternatives
        </h3>
        <p className="text-gray-600 mt-2">
          This loan is just one option. Others may be cheaper and safer for your
          financial health.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {alternatives.map((alt) => (
          <Card key={alt.name} className="p-4 flex flex-col">
            <div className="flex items-center mb-3">
              <alt.icon className="w-8 h-8 text-blue-600 mr-4" />
              <h4 className="font-semibold text-lg text-blue-900">
                {alt.name}
              </h4>
            </div>
            <p className="text-sm text-gray-600 flex-grow">{alt.description}</p>
            <div className="mt-4 text-sm">
              <p className="font-semibold text-green-700">
                Pros: {alt.pros.join(", ")}
              </p>
              <p className="font-semibold text-red-700 mt-1">
                Cons: {alt.cons.join(", ")}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AlternativesStep;
