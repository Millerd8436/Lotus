/**
 * Unified Loan Calculator Module
 * Consolidates all APR and fee calculations across the platform
 * Includes 2025 regulatory awareness and dark pattern detection
 */

export interface LoanCalculation {
  principal: number;
  termDays: number;
  stateCode: string;
  vulnerabilityScore?: number;
  darkPatternsApplied: string[];
  regulatoryLoopholes: string[];
}

export interface FeeBreakdown {
  principal: number;
  baseFee: number;
  processingFee: number;
  verificationFee: number;
  achFee: number;
  riskAssessmentFee: number;
  platformFee: number;
  insuranceFee: number;
  lateFee: number;
  rolloverFee: number;
  nsfFee: number;
  tipAmount?: number;
  totalFees: number;
  totalDue: number;
  effectiveAPR: number;
  statedAPR: number;
  hiddenAPR: number;
}

export interface StateRegulation {
  maxAPR: number;
  maxAmount: number;
  maxTermDays: number;
  rolloverLimit: number;
  coolingOffPeriod?: number;
  databaseRequired: boolean;
  confessionOfJudgmentAllowed: boolean;
  tipSolicitationAllowed: boolean;
  rentABankLoophole: boolean;
}

// 2025 Updated State Regulations
export const STATE_REGULATIONS: Record<string, StateRegulation> = {
  TX: {
    maxAPR: 664,
    maxAmount: 1500,
    maxTermDays: 180,
    rolloverLimit: 4,
    databaseRequired: false,
    confessionOfJudgmentAllowed: true,
    tipSolicitationAllowed: true,
    rentABankLoophole: true,
  },
  CA: {
    maxAPR: 36,
    maxAmount: 300,
    maxTermDays: 31,
    rolloverLimit: 0,
    coolingOffPeriod: 7,
    databaseRequired: true,
    confessionOfJudgmentAllowed: false,
    tipSolicitationAllowed: false, // New CA law prohibits
    rentABankLoophole: false,
  },
  NY: {
    maxAPR: 25,
    maxAmount: 500,
    maxTermDays: 30,
    rolloverLimit: 0,
    databaseRequired: true,
    confessionOfJudgmentAllowed: false,
    tipSolicitationAllowed: false, // Proposed NY law
    rentABankLoophole: false,
  },
  // States with rent-a-bank exploitation
  SD: {
    maxAPR: 999999, // No cap
    maxAmount: 999999, // No cap
    maxTermDays: 999999,
    rolloverLimit: 999999,
    databaseRequired: false,
    confessionOfJudgmentAllowed: true,
    tipSolicitationAllowed: true,
    rentABankLoophole: true,
  },
  DEFAULT: {
    maxAPR: 400,
    maxAmount: 500,
    maxTermDays: 14,
    rolloverLimit: 3,
    databaseRequired: false,
    confessionOfJudgmentAllowed: true,
    tipSolicitationAllowed: true,
    rentABankLoophole: false,
  },
};

// 2025 Dark Patterns in Fee Calculation
export const DARK_PATTERN_FEES = {
  drip_pricing: {
    name: "Drip Pricing",
    description: "Fees revealed incrementally throughout checkout",
    example: "Initial $300 shown, but $495 total after all fees",
    impact: 0.65, // 65% increase in total cost
  },
  tip_coercion: {
    name: "Tip Coercion",
    description: "Default tips with manipulative UI to avoid $0",
    example: "15% default tip requiring 13 clicks to remove",
    impact: 0.15, // 15% additional cost
  },
  mca_disguise: {
    name: "Merchant Cash Advance Disguise",
    description: "Loans disguised as 'purchase of future receivables'",
    example: "441% APR disguised as 1.4x factor rate",
    impact: 4.41, // 441% APR
  },
  confession_of_judgment: {
    name: "Confession of Judgment",
    description: "Waiving all legal rights if unable to pay",
    example: "Pre-signed court order allowing instant asset seizure",
    impact: 999, // Unlimited financial harm
  },
};

export class UnifiedLoanCalculator {
  /**
   * Calculate predatory fees with all dark patterns and loopholes
   */
  static calculatePredatoryFees(
    principal: number,
    stateCode: string,
    vulnerabilityScore: number = 5,
    darkPatterns: string[] = []
  ): FeeBreakdown {
    const stateReg = STATE_REGULATIONS[stateCode] || STATE_REGULATIONS.DEFAULT;
    const baseRate = Math.min(stateReg.maxAPR, 664) / 100; // Cap at Texas rate unless rent-a-bank
    const termDays = 14; // Standard payday loan term

    // Base calculation (already predatory)
    const baseFee = Math.floor(principal * (baseRate / 365) * termDays);

    // Layer on exploitative fees
    const processingFee = Math.floor(principal * 0.08); // 8% "processing"
    const verificationFee = 25; // Fixed "verification"
    const achFee = 15; // "ACH setup"
    const riskAssessmentFee = 30 + vulnerabilityScore * 5; // Target vulnerable
    const platformFee = 20; // "Platform maintenance"
    const insuranceFee = 25; // Pre-selected "loan protection"
    const lateFee = 40; // If even 1 day late
    const rolloverFee = 50; // Trap mechanism
    const nsfFee = 35; // Per attempt (multiple daily)

    // Apply dark patterns
    let darkPatternMultiplier = 1;
    let tipAmount = 0;

    if (
      darkPatterns.includes("tip_coercion") &&
      stateReg.tipSolicitationAllowed
    ) {
      tipAmount = Math.floor(principal * 0.15); // 15% default tip
    }

    if (darkPatterns.includes("drip_pricing")) {
      darkPatternMultiplier *= 1.65;
    }

    // Vulnerability exploitation multiplier
    const exploitationMultiplier = 1 + vulnerabilityScore * 0.1;

    const totalFees = Math.floor(
      (baseFee +
        processingFee +
        verificationFee +
        achFee +
        riskAssessmentFee +
        platformFee +
        insuranceFee +
        tipAmount) *
        darkPatternMultiplier *
        exploitationMultiplier
    );

    const totalDue = principal + totalFees;

    // Calculate various APRs
    const effectiveAPR = Math.floor(
      (totalFees / principal) * (365 / termDays) * 100
    );
    const statedAPR = Math.floor(
      (baseFee / principal) * (365 / termDays) * 100
    );
    const hiddenAPR = effectiveAPR - statedAPR;

    return {
      principal,
      baseFee,
      processingFee,
      verificationFee,
      achFee,
      riskAssessmentFee,
      platformFee,
      insuranceFee,
      lateFee,
      rolloverFee,
      nsfFee,
      tipAmount,
      totalFees,
      totalDue,
      effectiveAPR,
      statedAPR,
      hiddenAPR,
    };
  }

  /**
   * Calculate ethical fees with full transparency
   */
  static calculateEthicalFees(
    principal: number,
    termDays: number = 60,
    stateCode: string = "CA"
  ): FeeBreakdown {
    // Use California's 36% APR cap as ethical standard
    const ethicalAPR = 0.36;
    const fee =
      Math.round(((principal * ethicalAPR * termDays) / 365) * 100) / 100;

    return {
      principal,
      baseFee: fee,
      processingFee: 0, // No hidden fees
      verificationFee: 0,
      achFee: 0,
      riskAssessmentFee: 0,
      platformFee: 0,
      insuranceFee: 0,
      lateFee: 0,
      rolloverFee: 0,
      nsfFee: 0,
      tipAmount: 0, // No manipulative tipping
      totalFees: fee,
      totalDue: principal + fee,
      effectiveAPR: 36,
      statedAPR: 36,
      hiddenAPR: 0, // Full transparency
    };
  }

  /**
   * Detect regulatory loopholes being exploited
   */
  static detectLoopholes(
    lenderState: string,
    borrowerState: string,
    loanStructure: string
  ): string[] {
    const loopholes: string[] = [];

    // Rent-a-bank scheme
    if (
      STATE_REGULATIONS[lenderState]?.rentABankLoophole &&
      !STATE_REGULATIONS[borrowerState]?.rentABankLoophole
    ) {
      loopholes.push("rent_a_bank_scheme");
    }

    // MCA disguise
    if (loanStructure === "mca" || loanStructure === "revenue_purchase") {
      loopholes.push("merchant_cash_advance_disguise");
    }

    // Confession of judgment
    if (STATE_REGULATIONS[borrowerState]?.confessionOfJudgmentAllowed) {
      loopholes.push("confession_of_judgment_exploitation");
    }

    // Tip solicitation in prohibited states
    if (
      !STATE_REGULATIONS[borrowerState]?.tipSolicitationAllowed &&
      loanStructure.includes("tip")
    ) {
      loopholes.push("illegal_tip_solicitation");
    }

    return loopholes;
  }

  /**
   * Calculate true cost including all hidden fees and rollovers
   */
  static calculateDebtTrapCost(
    initialPrincipal: number,
    monthsInDebt: number = 5, // Average per research
    rolloverCount: number = 8 // Average per research
  ): {
    totalPaid: number;
    principalPaid: number;
    feesPaid: number;
    stillOwed: number;
    effectiveAPR: number;
  } {
    const rolloverFee = 50;
    const biweeklyFee = Math.floor(initialPrincipal * 0.15); // Typical rollover fee

    const totalFeesPaid = (rolloverFee + biweeklyFee) * rolloverCount;
    const totalPaid = totalFeesPaid; // Principal never reduces in debt trap
    const stillOwed = initialPrincipal; // Still owe full amount

    // Calculate effective APR over actual time period
    const daysInDebt = monthsInDebt * 30;
    const effectiveAPR = Math.floor(
      (totalFeesPaid / initialPrincipal) * (365 / daysInDebt) * 100
    );

    return {
      totalPaid,
      principalPaid: 0,
      feesPaid: totalFeesPaid,
      stillOwed,
      effectiveAPR,
    };
  }
}

// Export for use across all phases
export default UnifiedLoanCalculator;
