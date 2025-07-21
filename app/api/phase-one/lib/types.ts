import { NextResponse } from "next/server";
import { STATE_REGULATIONS } from "./constants";

export const handleStateRegulations = () => {
  return NextResponse.json({
    success: true,
    state_regulations: STATE_REGULATIONS,
    exploitation_analysis: {
      highest_apr_states: ["TX", "OH", "FL"],
      lowest_protection_states: ["TX", "OH", "FL"],
      regulatory_arbitrage: "Lenders incorporate in high-APR states",
    },
  });
};

export const handleResearchStatistics = () => {
  return NextResponse.json({
    success: true,
    research_findings: {
      debt_trap_statistics: {
        percent_loans_rolled_over: 80,
        percent_on_time_payment: 15,
        percent_revenue_from_trapped_customers: 75,
        average_loan_sequence_length: 8,
        median_borrower_fees_vs_principal: 1.8,
      },
      ach_exploitation: {
        percent_unauthorized_withdrawals: 32,
        average_nsf_fees_per_borrower: 105,
        multiple_attempt_frequency: 78,
      },
      targeting_vulnerable_populations: {
        percent_elderly_borrowers: 12,
        percent_disability_recipients: 8,
        percent_monthly_benefit_borrowers_trapped_all_year: 20,
      },
    },
  });
};

export const handleApiInfo = () => {
  return NextResponse.json({
    success: true,
    api_info: {
      name: "Phase One API - Predatory Lending Simulation",
      version: "1.0.0",
      description:
        "Consolidated API for simulating predatory lending practices based on research",
      endpoints: {
        POST: [
          "loan_application",
          "calculate_fees",
          "rollover_simulation",
          "ach_exploitation",
        ],
        GET: ["state_regulations", "research_statistics"],
      },
    },
  });
}; 