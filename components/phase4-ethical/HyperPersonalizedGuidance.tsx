import React, { useState } from 'react';
import { type UnderwritingDecision } from './AIUnderwritingSimulator';
import { Card } from '@/components/shared/Card'; // Corrected import path
import { HeartHandshake, Landmark, PiggyBank, Users } from "lucide-react";

// The alternatives data structure from EthicalAlternativesShowcase.tsx
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

interface HyperPersonalizedGuidanceProps {
  decision: UnderwritingDecision;
  loanAmount: number; // Pass down loanAmount
}

const HyperPersonalizedGuidance: React.FC<HyperPersonalizedGuidanceProps> = ({ decision, loanAmount }) => {
  const [activeTab, setActiveTab] = useState<'strengths' | 'opportunities'>('strengths');

  const { positiveFactors, negativeFactors, approved } = decision;

  const financialHealthScore = Math.max(0, 100 - (negativeFactors.length * 25) + (positiveFactors.length * 15));
  
  // Simplified utility score from EmpowermentDashboard
  const lenderProfit = loanAmount * 0.03; 
  const userBenefit = loanAmount * 0.1; 
  const positiveUtilityScore = lenderProfit + userBenefit;


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-6 animate-fade-in">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Your Personalized Financial Snapshot</h3>
      
      {/* Score Gauges */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        {/* Financial Health Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-24">
            <svg className="w-full h-full" viewBox="0 0 180 90">
              <path d="M 10 80 A 80 80 0 0 1 170 80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
              <path
                d="M 10 80 A 80 80 0 0 1 170 80"
                fill="none"
                stroke={financialHealthScore > 75 ? "#10b981" : financialHealthScore > 40 ? "#f59e0b" : "#ef4444"}
                strokeWidth="20"
                strokeDasharray={`${(financialHealthScore / 100) * 251.2}, 251.2`}
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            <div className="absolute bottom-0 w-full text-center">
              <span className="text-2xl font-bold">{financialHealthScore}</span>
              <span className="text-sm text-gray-500">/100</span>
              <p className="text-xs text-gray-600 font-semibold">Financial Health Score</p>
            </div>
          </div>
        </div>
        
        {/* Positive Net Utility Score */}
        {approved && (
           <div className="flex flex-col items-center">
             <div className="p-4 bg-green-50 rounded-full w-24 h-24 flex items-center justify-center border-2 border-green-200">
                <span className="text-2xl font-bold text-green-700">{positiveUtilityScore.toFixed(0)}</span>
             </div>
             <p className="text-xs text-gray-600 font-semibold mt-2">Positive Net Utility</p>
             <p className="text-xs text-gray-500">(A loan that benefits everyone)</p>
           </div>
        )}
      </div>
      
      {/* Tab Navigation */}
      <div className="flex justify-center border-b mb-4">
        <button 
          className={`py-2 px-4 font-semibold ${activeTab === 'strengths' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('strengths')}
        >
          Strengths
        </button>
        <button 
          className={`py-2 px-4 font-semibold ${activeTab === 'opportunities' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('opportunities')}
        >
          Opportunities
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'strengths' && (
          <div className="p-4 bg-green-50 rounded-lg">
            <ul className="space-y-2">
              {positiveFactors.map((factor, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'opportunities' && (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <ul className="space-y-2">
              {negativeFactors.map((factor, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-500 mr-2">!</span>
                  <span className="text-gray-700">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actionable Advice */}
      <div className="mt-6">
        <h4 className="font-bold text-lg mb-2 text-center">Actionable Advice</h4>
        {!approved ? (
          <div className="mt-4">
             <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
              This Loan Isn't a Good Fit, But Here Are Safer Alternatives
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {alternatives.map((alt) => (
                <Card key={alt.name} className="p-6 flex flex-col hover:shadow-md transition-shadow">
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
          </div>
        ) : (
          <div className="p-4 bg-green-100 border border-green-200 rounded-lg text-center">
            <p className="font-semibold text-green-800">You're on the right track!</p>
            <p className="text-md mt-1 text-green-700">Continue managing your finances responsibly. This loan appears to be a good fit for your current situation.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default HyperPersonalizedGuidance; 