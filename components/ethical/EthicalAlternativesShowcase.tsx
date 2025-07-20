"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { enhancedLoanCalculator } from "@/lib/core/EnhancedLoanCalculator";
import {
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";

export function EthicalAlternativesShowcase() {
  const [loanAmount, setLoanAmount] = useState(300);
  const [comparison, setComparison] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showEducation, setShowEducation] = useState(false);

  const calculateComparison = () => {
    const comp = enhancedLoanCalculator.compareLoanOptions(loanAmount, 14);
    setComparison(comp);
  };

  React.useEffect(() => {
    calculateComparison();
  }, [loanAmount]);

  const getOptionIcon = (type: string) => {
    switch (type) {
      case "installment":
        return <TrendingUp className="w-5 h-5" />;
      case "salary_advance":
        return <Clock className="w-5 h-5" />;
      case "credit_line":
        return <Shield className="w-5 h-5" />;
      case "savings_based":
        return <Sparkles className="w-5 h-5" />;
      case "pal":
        return <Building className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };

  const formatAPR = (apr: number) => {
    if (apr === 0) return "0% (No Interest)";
    if (apr < 50) return `${apr}% APR ✅`;
    if (apr < 100) return `${apr}% APR ⚠️`;
    return `${apr}% APR ❌`;
  };

  const options = enhancedLoanCalculator.getAllOptions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600" />
          Ethical Loan Alternatives (2025)
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Real alternatives to predatory payday loans that help build financial
          stability
        </p>

        {/* Loan Amount Selector */}
        <div className="flex items-center gap-4">
          <label className="font-semibold">I need to borrow:</label>
          <div className="flex gap-2">
            {[100, 200, 300, 500].map((amount) => (
              <Button
                key={amount}
                variant={loanAmount === amount ? "default" : "outline"}
                onClick={() => setLoanAmount(amount)}
                size="sm"
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Comparison Summary */}
      {comparison && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">
            Cost Comparison for ${loanAmount}
          </h3>

          {/* Predatory vs Best Ethical */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 dark:text-red-200">
                ❌ Typical Payday Loan
              </h4>
              <div className="mt-2 space-y-1 text-sm">
                <div>APR: {comparison.predatoryOption.apr}%</div>
                <div>Total Cost: ${comparison.predatoryOption.totalCost}</div>
                <div>Fees: ${comparison.predatoryOption.fees.origination}</div>
                <div className="text-red-600 font-semibold">
                  Due in Full: {comparison.term} days
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                ✅ Best Ethical Option
              </h4>
              {comparison.ethicalOptions[0] && (
                <div className="mt-2 space-y-1 text-sm">
                  <div>Provider: {comparison.ethicalOptions[0].provider}</div>
                  <div>APR: {formatAPR(comparison.ethicalOptions[0].apr)}</div>
                  <div>
                    Total Cost: ${comparison.ethicalOptions[0].totalCost}
                  </div>
                  <div className="text-green-600 font-semibold">
                    You Save: $
                    {(
                      comparison.predatoryOption.totalCost -
                      comparison.ethicalOptions[0].totalCost
                    ).toFixed(2)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">
              📋 Personalized Recommendations
            </h4>
            <ul className="space-y-1 text-sm">
              {comparison.recommendations.map((rec: string, i: number) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </Card>
      )}

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option) => (
          <Card
            key={option.id}
            className={`p-6 cursor-pointer transition-all ${
              selectedOption === option.id
                ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20"
                : "hover:shadow-lg"
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  {getOptionIcon(option.type)}
                  {option.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.provider}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {option.impactScore}/10
                </div>
                <div className="text-xs text-gray-500">Impact Score</div>
              </div>
            </div>

            <p className="text-sm mb-4">{option.description}</p>

            {/* Key Features */}
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
              <ul className="space-y-1">
                {option.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="text-sm flex items-start gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real World Example */}
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
              <strong>Example:</strong> {option.realWorldExample}
            </div>

            {/* Expanded Details */}
            {selectedOption === option.id && (
              <div className="mt-4 pt-4 border-t dark:border-gray-700 space-y-4">
                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {option.requirements.map((req, i) => (
                      <li key={i} className="text-sm flex items-start gap-1">
                        <span className="text-blue-500">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pros */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Pros:</h4>
                  <ul className="space-y-1">
                    {option.pros.map((pro, i) => (
                      <li key={i} className="text-sm flex items-start gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Cons:</h4>
                  <ul className="space-y-1">
                    {option.cons.map((con, i) => (
                      <li key={i} className="text-sm flex items-start gap-1">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Learn more about ${option.name} at their website`);
                  }}
                >
                  Learn More About {option.name}
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Educational Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Why These Alternatives Matter
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEducation(!showEducation)}
          >
            {showEducation ? "Hide" : "Learn More"}
          </Button>
        </div>

        {showEducation && (
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                The Payday Loan Trap
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • 80% of payday loans are rolled over or renewed within 14
                  days
                </li>
                <li>
                  • Average borrower remains in debt for 5 months of the year
                </li>
                <li>
                  • Borrowers pay an average of $520 in fees to borrow $375
                </li>
                <li>• 12 million Americans use payday loans annually</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">
                How Ethical Alternatives Help
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Lower APRs mean less money paid in interest</li>
                <li>• Installment payments prevent debt cycles</li>
                <li>• Credit reporting helps build financial future</li>
                <li>• Financial education prevents future emergencies</li>
                <li>• Savings components build emergency funds</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Additional Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>• Call 211 for local emergency assistance</li>
                <li>• Contact creditors directly for payment plans</li>
                <li>• Visit CFPB.gov for financial tools and complaints</li>
                <li>• Check with local nonprofits and churches</li>
                <li>• Ask employer about salary advances</li>
              </ul>
            </div>
          </div>
        )}
      </Card>

      {/* Call to Action */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h3 className="text-xl font-bold mb-4">
          Ready to Break Free from Predatory Lending?
        </h3>
        <p className="mb-4">
          Choose an ethical alternative above and take the first step toward
          financial freedom. Remember: you have options beyond payday loans.
        </p>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => alert("Connect with a financial counselor")}
          >
            Get Free Financial Counseling
          </Button>
          <Button
            variant="secondary"
            onClick={() => alert("View eligibility checker")}
          >
            Check Your Eligibility
          </Button>
        </div>
      </Card>
    </div>
  );
}
