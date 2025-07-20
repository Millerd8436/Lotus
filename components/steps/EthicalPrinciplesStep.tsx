"use client";

import { CheckCircle, Heart, Scale, Shield } from "lucide-react";

interface BelmontPrinciple {
  name: string;
  description: string;
  implementation: string;
}

const belmontPrinciples: BelmontPrinciple[] = [
  {
    name: "Respect for Persons (Autonomy)",
    description:
      "Treat individuals as autonomous agents capable of making their own informed choices.",
    implementation:
      "We provide full transparency, a 24-hour cooling-off period, and a meta-consent check to ensure your decision is truly your own.",
  },
  {
    name: "Beneficence (Do Good)",
    description:
      "Maximize potential benefits and act in the best interests of the individual.",
    implementation:
      "We offer free financial counseling and proactively present lower-cost alternatives, even if it means you don't take our loan.",
  },
  {
    name: "Non-Maleficence (Do No Harm)",
    description:
      "Minimize the risks of harm and avoid exploiting vulnerabilities.",
    implementation:
      "Our loans have a 36% APR cap and clear terms to prevent debt traps. We conduct an affordability check to ensure the loan is manageable.",
  },
  {
    name: "Justice (Fairness)",
    description:
      "Ensure the burdens and benefits of the process are distributed equitably.",
    implementation:
      "Our terms are the same for everyone, regardless of background. We also contribute a portion of our proceeds to community financial literacy programs.",
  },
];

const EthicalPrinciplesStep = () => {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="font-semibold text-purple-900 mb-4 text-xl">
          Our Ethical Foundation: The Belmont Report
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {belmontPrinciples.map((principle, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-purple-300"
            >
              <h4 className="font-semibold text-purple-800 mb-2">
                {principle.name}
              </h4>
              <p className="text-sm text-purple-700 mb-2">
                {principle.description}
              </p>
              <div className="text-sm text-purple-600">
                <strong>How we implement this:</strong>{" "}
                {principle.implementation}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-900 mb-3">
          What This Means For You
        </h3>
        <ul className="space-y-3 text-green-800">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>We will never pressure or rush your decision.</span>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>
              We actively work to prevent harm by capping rates and checking
              affordability.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Heart className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>
              We are committed to your well-being by providing better
              alternatives and free counseling.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Scale className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>Our process is fair and transparent for everyone.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EthicalPrinciplesStep;
