import { NextResponse } from "next/server";
import { getAlternativeOptions, getEthicalGuidance } from "./actions";

export const handleEthicalPrinciples = () => {
  return NextResponse.json({
    success: true,
    ethical_principles: {
      transparency: "All costs and terms disclosed upfront",
      user_empowerment: "Education and alternatives always provided",
      fair_pricing: "Reasonable fees, no exploitation of vulnerability",
      no_dark_patterns: "Honest design that respects user autonomy",
      consumer_protection: "Full compliance with consumer protection laws",
      responsible_lending:
        "Only lend when appropriate for user's situation",
      continuous_improvement: "Regular review and enhancement of practices",
    },
    commitment:
      "Our success is measured by customer financial health improvement",
  });
};

export const handleAlternativesDatabase = () => {
  return NextResponse.json({
    success: true,
    alternatives: getAlternativeOptions("TX"),
    philosophy: "The best loan is often no loan at all",
    success_metrics:
      "We measure success by how many people we help avoid debt",
  });
};

export const handleEducationalResources = () => {
  return NextResponse.json({
    success: true,
    resources: getEthicalGuidance(),
    investment_statement:
      "We invest in financial education because informed customers make better decisions",
  });
};

export const handleTransparencyReport = () => {
  return NextResponse.json({
    success: true,
    transparency_report: {
      average_loan_amount: 300,
      average_total_cost: 345,
      percentage_who_found_alternatives: 65,
      customer_satisfaction: 94,
      complaint_resolution_time: "1 business day average",
      regulatory_compliance_score: "100%",
      financial_counseling_referrals: 856,
    },
    methodology: "All metrics independently verified and publicly reported",
  });
};

export const handleApiInfo = () => {
  return NextResponse.json({
    success: true,
    api_info: {
      name: "Phase Two API - Ethical Lending",
      version: "1.0.0",
      description:
        "Transparent, user-empowering alternative to predatory lending",
      principles: [
        "Full transparency",
        "User empowerment",
        "Alternatives first",
        "No manipulation",
      ],
      endpoints: {
        POST: [
          "evaluate_application",
          "calculate_transparent_fees",
          "get_alternatives",
          "financial_guidance",
          "complaint_or_feedback",
        ],
        GET: [
          "ethical_principles",
          "alternatives_database",
          "educational_resources",
          "transparency_report",
        ],
      },
    },
  });
}; 