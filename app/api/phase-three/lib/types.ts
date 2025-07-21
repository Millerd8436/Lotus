import { NextResponse } from "next/server";
import { DARK_PATTERNS, RESEARCH_DATA, EDUCATIONAL_CONTENT } from "./constants";

export const handleDarkPatternsDatabase = () => {
  return NextResponse.json({
    success: true,
    dark_patterns: DARK_PATTERNS,
    categories: [
      "Deceptive Design",
      "Behavioral Manipulation",
      "Information Asymmetry",
      "Process Friction",
    ],
    harm_assessment: {
      scale: "1-10 (10 = highest harm)",
      criteria: [
        "Financial impact",
        "Psychological manipulation",
        "Difficulty to detect",
        "Frequency of use",
      ],
    },
  });
};

export const handleResearchStatistics = () => {
  return NextResponse.json({
    success: true,
    research_database: RESEARCH_DATA,
    key_statistics: {
      debt_trap_rate: "80% of loans rolled over",
      average_borrower_debt_duration: "5 months per year",
      revenue_from_trapped_borrowers: "75%",
      unauthorized_withdrawal_rate: "32% of borrowers",
      average_nsf_fees: "$105 per borrower",
    },
    methodology_note:
      "Data compiled from peer-reviewed studies, government reports, and industry analysis",
  });
};

export const handleEducationalCatalog = () => {
  return NextResponse.json({
    success: true,
    educational_content: EDUCATIONAL_CONTENT,
    learning_paths: [
      {
        path_name: "Consumer Protection Basics",
        duration: "2 hours",
        topics: [
          "APR calculation",
          "Dark pattern recognition",
          "Complaint process",
        ],
      },
      {
        path_name: "Advanced Financial Literacy",
        duration: "4 hours",
        topics: [
          "Behavioral finance",
          "Alternative lending",
          "Policy analysis",
        ],
      },
    ],
    certification_available: false,
  });
};

export const handlePolicyRecommendations = () => {
  return NextResponse.json({
    success: true,
    policy_recommendations: {
      federal_level: [
        "Nationwide 36% APR cap on consumer loans",
        "Mandatory cooling-off periods",
        "Stronger ability-to-repay requirements",
        "ACH authorization reform",
      ],
      state_level: [
        "Comprehensive payday lending reform",
        "Dark pattern regulation",
        "Consumer education funding",
        "Alternative lending support",
      ],
      industry_level: [
        "Transparent design principles",
        "Ethical lending standards",
        "Consumer-first business models",
        "Harm reduction practices",
      ],
    },
    evidence_base:
      "Recommendations based on research showing 80% debt trap rate and widespread consumer harm",
  });
};

export const handleApiInfo = () => {
  return NextResponse.json({
    success: true,
    api_info: {
      name: "Phase Three API - Educational & Reflection",
      version: "1.0.0",
      description:
        "Comprehensive analysis, education, and research about predatory lending",
      endpoints: {
        POST: [
          "analyze_dark_patterns",
          "get_consumer_protections",
          "get_educational_content",
          "behavioral_analysis",
          "research_lookup",
        ],
        GET: [
          "dark_patterns_database",
          "research_statistics",
          "educational_catalog",
          "policy_recommendations",
        ],
      },
    },
  });
};
