import { NextRequest, NextResponse } from "next/server";
import { LoanApplication, PsychologicalTriggers, UserTrackingData } from "./interfaces";
import { UnifiedLoanCalculator } from "@/core/core/LoanCalculator";

// Vulnerability assessment algorithm
function calculateVulnerabilityScore(application: LoanApplication): number {
  let score = 0;

  // Income-based vulnerability
  if (application.income < 2000) {
    score += 3;
  } else if (application.income < 3000) {
    score += 2;
  } else if (application.income < 4000) {
    score += 1;
  }

  // Employment instability
  if (application.employment.toLowerCase().includes("part")) {
    score += 2;
  }
  if (application.employment.toLowerCase().includes("temp")) {
    score += 2;
  }
  if (application.employment.toLowerCase().includes("gig")) {
    score += 1;
  }

  // Banking status (underbanked indicators)
  if (application.bankName.toLowerCase().includes("check")) {
    score += 2;
  }
  if (application.bankName.toLowerCase().includes("cash")) {
    score += 2;
  }
  if (application.bankName.toLowerCase().includes("money")) {
    score += 1;
  }

  // Demographic targeting (research shows elderly/disability recipients targeted)
  // This would be implemented based on additional data points

  return Math.min(score, 10);
}

// Generate psychological triggers based on vulnerability
function generatePsychologicalTriggers(
  vulnerabilityScore: number
): PsychologicalTriggers {
  const base_triggers: PsychologicalTriggers = {
    urgency_level: Math.min(vulnerabilityScore + 2, 10),
    scarcity_messaging: [
      "Only 3 spots left for instant approval",
      "This pre-approved offer expires in 24 hours",
      "Limited time: No credit check required",
    ],
    social_proof: [
      "347 people applied in the last hour",
      "Sarah from Dallas just got approved for $500",
      "Over 10,000 satisfied customers this month",
    ],
    authority_badges: [
      "BBB Accredited Business",
      "SSL Secured Application",
      "Licensed in 50 States",
      "As Seen on TV",
    ],
    vulnerability_targeting: [],
    gamification_elements: [
      "Unlock VIP status with your first loan",
      "Earn rewards for quick repayment",
      "Join our loyalty program",
    ],
  };

  // Enhanced targeting for vulnerable populations
  if (vulnerabilityScore >= 7) {
    base_triggers.vulnerability_targeting = [
      "Emergency financial assistance available",
      "No judgment, we understand financial struggles",
      "Designed for people with imperfect credit",
      "Get cash when banks say no",
    ];
  } else if (vulnerabilityScore >= 4) {
    base_triggers.vulnerability_targeting = [
      "Fast approval for working professionals",
      "Bridge the gap until payday",
      "Flexible options for your situation",
    ];
  }

  return base_triggers;
}

// Track user behavior for manipulation
function trackUserBehavior(request: NextRequest): UserTrackingData {
  const headers = request.headers;
  const userAgent = headers.get("user-agent") || "";
  const referer = headers.get("referer") || "";

  // Analyze user agent and referer for targeting
  const isMobile = userAgent.toLowerCase().includes("mobile");
  const isFromSocialMedia =
    referer.includes("facebook") || referer.includes("instagram");
  const isDirectVisit = !referer;

  // Simulate tracking data based on user behavior
  return {
    session_id: Date.now().toString(),
    page_views: Math.floor(Math.random() * 10) + 1,
    time_on_site: Math.floor(Math.random() * 300) + 60,
    form_interactions: Math.floor(Math.random() * 5) + 1,
    cancel_attempts: Math.floor(Math.random() * 3),
    vulnerability_indicators: [
      "multiple_form_attempts",
      "long_session_duration",
      "repeated_visits",
      isMobile ? "mobile_device_usage" : "desktop_usage",
      isFromSocialMedia ? "social_media_referral" : "direct_traffic",
      isDirectVisit ? "desperate_direct_search" : "referral_traffic",
    ],
    financial_stress_score: Math.floor(Math.random() * 10) + 1,
    manipulation_susceptibility: Math.floor(Math.random() * 8) + 1,
    target_profile: "high_value_vulnerable",
  };
}

// Simulate rollover mechanism
function simulateRollover(originalAmount: number, rolloverCount: number): any {
  const rolloverFee = 50;
  const compoundedFees = rolloverFee * (rolloverCount + 1);

  return {
    original_principal: originalAmount,
    rollover_count: rolloverCount,
    rollover_fee: rolloverFee,
    new_total_due: originalAmount + compoundedFees,
    total_fees_paid: compoundedFees,
    principal_paid: 0, // Research shows principal never reduces
    new_due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    trap_status: rolloverCount >= 3 ? "deep_trap" : "entering_trap",
    profitability_score: rolloverCount * 2.5, // Higher rollovers = higher profit
  };
}

export const handleLoanApplication = (request: NextRequest, data: any) => {
  const application: LoanApplication = data;
  const vulnerabilityScore = calculateVulnerabilityScore(application);
  const state = "TX"; // Default to Texas (highest APR allowed)

  // Use unified calculator with 2025 dark patterns
  const fees = UnifiedLoanCalculator.calculatePredatoryFees(
    data.amount || 300,
    state,
    vulnerabilityScore,
    ["drip_pricing", "tip_coercion"] // 2025 patterns
  );

  const triggers = generatePsychologicalTriggers(vulnerabilityScore);
  const tracking = trackUserBehavior(request);

  return NextResponse.json({
    success: true,
    application_id: Date.now().toString(),
    vulnerability_score: vulnerabilityScore,
    fee_structure: fees,
    psychological_triggers: triggers,
    tracking_data: tracking,
    approval_status: "pre_approved",
    exploitation_profile: {
      target_type:
        vulnerabilityScore >= 7
          ? "high_value_vulnerable"
          : "standard_target",
      estimated_lifetime_value: fees.totalFees * (2 + vulnerabilityScore),
      rollover_probability: Math.min(80 + vulnerabilityScore * 2, 95),
      extraction_strategy: "maximize_fees_minimize_principal_reduction",
    },
  });
};

export const handleCalculateFees = (data: any) => {
  const { amount, state: userState, vulnerability } = data;
  const feeStructure = UnifiedLoanCalculator.calculatePredatoryFees(
    amount,
    userState,
    vulnerability || 0,
    ["drip_pricing", "mca_disguise", "confession_of_judgment"]
  );

  return NextResponse.json({
    success: true,
    fee_breakdown: feeStructure,
    comparison: {
      ethical_alternative: UnifiedLoanCalculator.calculateEthicalFees(
        amount,
        60
      ),
      predatory_reality: feeStructure,
    },
  });
};

export const handleRolloverSimulation = (data: any) => {
  const { original_amount, rollover_count } = data;
  const rolloverData = simulateRollover(original_amount, rollover_count);

  return NextResponse.json({
    success: true,
    rollover_data: rolloverData,
    research_statistics: {
      percent_loans_rolled_over: 80,
      percent_on_time_payment: 15,
      percent_revenue_from_trapped_borrowers: 75,
      average_rollovers_per_loan: 8,
    },
  });
};

export const handleAchExploitation = (data: any) => {
  const { account_info, payment_amount } = data;

  // Analyze account info for exploitation potential
  const account_type = account_info?.account_type || "checking";
  const bank_name = account_info?.bank_name || "unknown";
  const is_credit_union = bank_name
    .toLowerCase()
    .includes("credit union");

  return NextResponse.json({
    success: true,
    ach_simulation: {
      authorized_amount: payment_amount,
      account_analysis: {
        account_type,
        bank_name,
        exploitation_risk: is_credit_union ? "low" : "high",
        multiple_attempt_likelihood: is_credit_union ? 20 : 85,
      },
      unauthorized_attempts: [
        {
          amount: payment_amount,
          purpose: "duplicate_payment",
          status: "failed",
        },
        {
          amount: payment_amount,
          purpose: "retry_attempt",
          status: "failed",
        },
        {
          amount: payment_amount,
          purpose: "alternative_account",
          status: "success",
        },
      ],
      nsf_fees_generated: 70, // 2 failed attempts × $35
      total_extracted: payment_amount + 70,
      research_data: {
        percent_borrowers_unauthorized_withdrawals: 32,
        average_nsf_fees_per_borrower: 105,
        multiple_attempt_strategy: "standard_industry_practice",
      },
    },
  });
}; 