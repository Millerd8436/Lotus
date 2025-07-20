"use client";

import { Card } from "@/components/shared/Card";
import React, { useEffect, useState } from "react";

interface AlternativeSolutionRecommenderProps {
  userLocation?: {
    state: string;
    zipCode: string;
    city: string;
  };
  loanAmount: number;
  urgencyLevel: "low" | "medium" | "high" | "emergency";
  userProfile: {
    employmentStatus: string;
    hasChecking: boolean;
    hasSavings: boolean;
    creditUnionMember: boolean;
  };
  onAlternativeSelected: (alternative: Alternative) => void;
}

interface Alternative {
  id: string;
  type:
    | "credit_union_pal"
    | "employer_advance"
    | "community_program"
    | "emergency_assistance"
    | "budgeting_tool"
    | "side_income";
  title: string;
  description: string;
  cost: string;
  timeToAccess: string;
  requirements: string[];
  pros: string[];
  cons: string[];
  contactInfo?: {
    phone?: string;
    website?: string;
    address?: string;
  };
  applicationSteps: string[];
  realUserReviews?: string[];
  eligibilityScore: number; // 0-100 based on user profile
}

export const AlternativeSolutionRecommender: React.FC<
  AlternativeSolutionRecommenderProps
> = ({
  userLocation,
  loanAmount,
  urgencyLevel,
  userProfile,
  onAlternativeSelected,
}) => {
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const recommendations = generateRecommendations();
    setAlternatives(recommendations);

    // Auto-expand if high urgency and good alternatives available
    if (
      urgencyLevel === "emergency" &&
      recommendations.some((a) => a.eligibilityScore > 70)
    ) {
      setIsExpanded(true);
    }
  }, [userLocation, loanAmount, urgencyLevel, userProfile]);

  const generateRecommendations = (): Alternative[] => {
    const recommendations: Alternative[] = [];

    // Credit Union PALs (Payday Alternative Loans)
    if (loanAmount <= 2000) {
      recommendations.push({
        id: "pal-i",
        type: "credit_union_pal",
        title: "Credit Union PAL (Payday Alternative Loan)",
        description:
          "Federal credit unions offer PALs with much lower rates than payday loans. PAL I allows $200-$1,000 loans.",
        cost: "28% APR maximum (federal limit)",
        timeToAccess: "1-3 business days",
        requirements: [
          "Credit union membership (can join same day)",
          "Member for at least 1 month for existing members",
          "Some credit unions waive waiting period",
        ],
        pros: [
          "APR capped at 28% by federal law",
          "Builds credit when paid on time",
          "No rollover fees",
          "Access to financial counseling",
        ],
        cons: [
          "May require credit union membership fee ($5-25)",
          "Not all credit unions offer PALs",
          "May have minimum credit score requirements",
        ],
        contactInfo: {
          website:
            "https://www.mycreditunion.gov/about-credit-unions/credit-union-locator",
          phone: "1-800-358-5710",
        },
        applicationSteps: [
          "Find credit unions near you using NCUA locator",
          "Call or visit to ask about PAL programs",
          "Join credit union (usually $5-25)",
          "Apply for PAL loan",
          "Receive funds in 1-3 days",
        ],
        realUserReviews: [
          '"Got $500 PAL at 18% APR instead of 400% payday loan - saved hundreds" - Maria K.',
          '"Credit union helped me build credit while borrowing responsibly" - James T.',
        ],
        eligibilityScore: calculateEligibilityScore("credit_union_pal"),
      });
    }

    // PAL II for larger amounts
    if (loanAmount > 200 && loanAmount <= 2000) {
      recommendations.push({
        id: "pal-ii",
        type: "credit_union_pal",
        title: "Credit Union PAL II (Extended Term)",
        description:
          "PAL II offers $200-$2,000 with longer repayment terms and no waiting period for established members.",
        cost: "28% APR maximum, typically 15-25%",
        timeToAccess: "Same day to 2 business days",
        requirements: [
          "Credit union membership",
          "No waiting period required",
          "Existing relationship helpful but not required",
        ],
        pros: [
          "Higher loan amounts up to $2,000",
          "Longer repayment terms (2-12 months)",
          "No waiting period",
          "Rate shopping encouraged",
        ],
        cons: [
          "Fewer credit unions offer PAL II",
          "May require direct deposit",
          "Credit check typically required",
        ],
        contactInfo: {
          website:
            "https://www.ncua.gov/consumers/loans/payday-alternative-loans",
          phone: "1-703-518-6300",
        },
        applicationSteps: [
          "Search for PAL II providers online",
          "Compare rates and terms",
          "Apply online or in person",
          "Provide income documentation",
          "Receive funds quickly upon approval",
        ],
        eligibilityScore: calculateEligibilityScore("credit_union_pal"),
      });
    }

    // Employer-based advances
    if (userProfile.employmentStatus === "employed") {
      recommendations.push({
        id: "employer-advance",
        type: "employer_advance",
        title: "Employer Salary Advance",
        description:
          "Many employers offer salary advances or emergency loans to employees at no or low cost.",
        cost: "Often free, sometimes small processing fee",
        timeToAccess: "Same day to 3 days",
        requirements: [
          "Full-time or regular part-time employment",
          "Good standing with employer",
          "May require manager approval",
        ],
        pros: [
          "Usually free or very low cost",
          "Fast access",
          "No credit check",
          "Deducted from future paychecks",
        ],
        cons: [
          "May affect relationship with employer",
          "Limited to portion of earned wages",
          "Not all employers offer programs",
        ],
        applicationSteps: [
          "Check employee handbook for advance policies",
          "Contact HR or payroll department",
          "Submit advance request form",
          "Provide explanation of need",
          "Advance deducted from next paycheck(s)",
        ],
        eligibilityScore: calculateEligibilityScore("employer_advance"),
      });
    }

    // Emergency assistance programs
    if (urgencyLevel === "emergency" || loanAmount <= 500) {
      recommendations.push({
        id: "emergency-assistance",
        type: "emergency_assistance",
        title: "Local Emergency Assistance Programs",
        description:
          "Community organizations, churches, and nonprofits often provide emergency financial assistance.",
        cost: "Free (grants, not loans)",
        timeToAccess: "Same day to 1 week",
        requirements: [
          "Proof of financial hardship",
          "Local residency requirements",
          "May require counseling session",
        ],
        pros: [
          "Free money (grants, not loans)",
          "No repayment required",
          "Often includes financial counseling",
          "May provide ongoing support",
        ],
        cons: [
          "Limited funding availability",
          "May have waiting lists",
          "Documentation requirements",
          "One-time assistance limits",
        ],
        contactInfo: getLocalAssistanceContacts(),
        applicationSteps: [
          "Call 2-1-1 for local resource directory",
          "Contact local United Way chapter",
          "Visit community action agencies",
          "Check with local religious organizations",
          "Apply to multiple programs to increase chances",
        ],
        realUserReviews: [
          '"Local church helped with $300 electric bill - no questions asked" - Sarah M.',
          '"United Way connected me with rent assistance same day" - David L.',
        ],
        eligibilityScore: calculateEligibilityScore("emergency_assistance"),
      });
    }

    // Budgeting and financial planning tools
    recommendations.push({
      id: "budgeting-tools",
      type: "budgeting_tool",
      title: "Free Financial Planning and Budgeting Help",
      description:
        "Address the root cause with free budgeting tools and financial counseling.",
      cost: "Free",
      timeToAccess: "Immediate to 1 week",
      requirements: [
        "Willingness to review finances",
        "Basic documentation of income/expenses",
      ],
      pros: [
        "Addresses underlying financial issues",
        "Free professional guidance",
        "Long-term financial health improvement",
        "Online and in-person options",
      ],
      cons: [
        "Doesn't provide immediate cash",
        "Requires time and effort",
        "May reveal difficult financial realities",
      ],
      contactInfo: {
        website: "https://www.nfcc.org",
        phone: "1-800-388-2227",
      },
      applicationSteps: [
        "Contact National Foundation for Credit Counseling",
        "Schedule free consultation",
        "Gather financial documents",
        "Work with counselor to create plan",
        "Implement budgeting strategies",
      ],
      eligibilityScore: 100, // Always relevant
    });

    // Side income opportunities
    if (loanAmount <= 1000 && urgencyLevel !== "emergency") {
      recommendations.push({
        id: "side-income",
        type: "side_income",
        title: "Quick Side Income Opportunities",
        description:
          "Earn extra money through gig work, selling items, or temporary services.",
        cost: "Free to start",
        timeToAccess: "Immediate to 1 week",
        requirements: [
          "Time availability",
          "Transportation (for some options)",
          "Basic skills or items to sell",
        ],
        pros: [
          "No debt incurred",
          "Can continue earning ongoing",
          "Builds financial resilience",
          "Many options available",
        ],
        cons: [
          "Time and effort required",
          "Income not guaranteed",
          "May require upfront costs",
          "Tax implications",
        ],
        applicationSteps: [
          "Inventory items you can sell online",
          "Sign up for gig economy apps",
          "Offer services to neighbors/friends",
          "Look for temporary/part-time work",
          "Consider skills-based freelancing",
        ],
        eligibilityScore: calculateEligibilityScore("side_income"),
      });
    }

    return recommendations.sort(
      (a, b) => b.eligibilityScore - a.eligibilityScore
    );
  };

  const calculateEligibilityScore = (type: string): number => {
    let score = 50; // Base score

    switch (type) {
      case "credit_union_pal":
        if (userProfile.creditUnionMember) score += 30;
        if (userProfile.hasChecking) score += 20;
        if (loanAmount <= 1000) score += 20;
        if (urgencyLevel !== "emergency") score += 10; // PALs take time
        break;

      case "employer_advance":
        if (userProfile.employmentStatus === "employed") score += 40;
        if (loanAmount <= 500) score += 20;
        if (urgencyLevel === "high" || urgencyLevel === "emergency")
          score += 20;
        break;

      case "emergency_assistance":
        if (urgencyLevel === "emergency") score += 30;
        if (loanAmount <= 300) score += 30;
        score += 20; // Always worth trying
        break;

      case "side_income":
        if (urgencyLevel === "low" || urgencyLevel === "medium") score += 20;
        if (loanAmount <= 500) score += 20;
        score += 10; // Generally available option
        break;
    }

    return Math.min(100, Math.max(0, score));
  };

  const getLocalAssistanceContacts = () => {
    // In real implementation, this would use geolocation/zip code
    return {
      phone: "2-1-1",
      website: "https://www.211.org",
      address: "Call 2-1-1 for local resources",
    };
  };

  const getCategoryIcon = (type: string) => {
    const icons = {
      credit_union_pal: "🏛️",
      employer_advance: "💼",
      emergency_assistance: "🆘",
      budgeting_tool: "📊",
      side_income: "💪",
    };
    return icons[type as keyof typeof icons] || "💡";
  };

  const getUrgencyMessage = () => {
    switch (urgencyLevel) {
      case "emergency":
        return "🚨 Emergency financial situation detected. Here are immediate alternatives:";
      case "high":
        return "⚡ High urgency detected. Consider these faster alternatives:";
      case "medium":
        return "⏰ You have some time. These alternatives can save you money:";
      default:
        return "✅ You have options. Consider these alternatives to avoid high-cost debt:";
    }
  };

  const filteredAlternatives =
    selectedCategory === "all"
      ? alternatives
      : alternatives.filter((alt) => alt.type === selectedCategory);

  return (
    <div className="fixed bottom-4 left-4 max-w-lg z-50">
      {/* Minimized state */}
      {!isExpanded && (
        <div
          className="bg-green-600 text-white p-3 rounded-lg cursor-pointer shadow-lg hover:bg-green-700 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <div>
              <div className="font-bold">Better Alternatives Available!</div>
              <div className="text-sm">
                {alternatives.length} options found • Up to{" "}
                {Math.max(
                  ...alternatives.map(
                    (a) =>
                      100 -
                      (parseInt(a.cost.match(/\d+/)?.[0] || "400") * 100) / 400
                  )
                )}
                % savings
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded state */}
      {isExpanded && (
        <Card className="p-4 shadow-xl border-2 border-green-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg text-green-600">
              💡 Better Alternatives Found
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-gray-700 mb-4">{getUrgencyMessage()}</p>

          {/* Category filter */}
          <div className="flex gap-1 mb-4 text-xs overflow-x-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-2 py-1 rounded whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100"
              }`}
            >
              All ({alternatives.length})
            </button>
            {[
              "credit_union_pal",
              "employer_advance",
              "emergency_assistance",
              "budgeting_tool",
            ].map((category) => {
              const count = alternatives.filter(
                (a) => a.type === category
              ).length;
              if (count === 0) return null;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 py-1 rounded whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100"
                  }`}
                >
                  {getCategoryIcon(category)} ({count})
                </button>
              );
            })}
          </div>

          {/* Alternatives list */}
          <div className="space-y-3">
            {filteredAlternatives.slice(0, 3).map((alternative) => (
              <div
                key={alternative.id}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getCategoryIcon(alternative.type)}
                    </span>
                    <h4 className="font-semibold text-sm">
                      {alternative.title}
                    </h4>
                  </div>
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {alternative.eligibilityScore}% match
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-2">
                  {alternative.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <span className="font-medium">Cost:</span>{" "}
                    {alternative.cost}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span>{" "}
                    {alternative.timeToAccess}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onAlternativeSelected(alternative)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Get Details
                  </button>
                  {alternative.contactInfo?.phone && (
                    <button
                      onClick={() =>
                        window.open(`tel:${alternative.contactInfo?.phone}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Call Now
                    </button>
                  )}
                  {alternative.contactInfo?.website && (
                    <button
                      onClick={() =>
                        window.open(alternative.contactInfo?.website, "_blank")
                      }
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Visit Site
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredAlternatives.length > 3 && (
            <div className="text-center mt-3">
              <button
                onClick={() => {
                  if (filteredAlternatives[0]) {
                    onAlternativeSelected(filteredAlternatives[0]);
                  }
                }}
                className="text-green-600 hover:text-green-700 text-sm"
              >
                Show {filteredAlternatives.length - 3} more alternatives
              </button>
            </div>
          )}

          {/* Emergency resources */}
          {urgencyLevel === "emergency" && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-600 text-sm mb-2">
                🆘 Emergency Resources
              </h4>
              <div className="text-xs space-y-1">
                <div>• Call 2-1-1 for immediate local assistance</div>
                <div>• Contact local food banks and churches</div>
                <div>• Apply for emergency government benefits</div>
                <div>• Reach out to family and friends</div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
            <strong>Important:</strong> These alternatives may take time to
            access. Start applications early and consider multiple options
            simultaneously.
          </div>
        </Card>
      )}
    </div>
  );
};
