/**
 * UnifiedLoanEngine - 2025 Comprehensive Loan Calculation System
 *
 * Consolidates all loan calculation functionality with strategy pattern
 * for different calculation modes and enhanced 2025 fintech regulations
 */

// Strategy Interfaces
export interface LoanCalculationStrategy {
  id: string;
  name: string;
  calculateFees(
    principal: number,
    termDays: number,
    options?: any
  ): LoanCalculationResult;
  getAPR(principal: number, fees: number, termDays: number): number;
  validateLoan(principal: number, userProfile?: UserProfile): ValidationResult;
}

// Core Types
export interface LoanCalculationResult {
  principal: number;
  termDays: number;
  fees: FeeBreakdown;
  totalDue: number;
  apr: number;
  effectiveAPR: number;
  dailyCost: number;
  weeklyPayment: number;
  warnings: string[];
  recommendations: string[];
  ethicalScore: number;
  kantianCompliance: KantianAssessment;
  regulatoryCompliance: RegulatoryCompliance;
}

export interface FeeBreakdown {
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
  confessionOfJudgmentFee?: number;
  totalFees: number;
  hiddenFees: string[];
}

export interface UserProfile {
  vulnerabilityScore: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore?: number;
  stateCode: string;
  hasBank: boolean;
  hasSteadyIncome: boolean;
  emergencyFundLevel: "none" | "minimal" | "adequate";
  priorLoans: number;
  demographicRisk: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  affordabilityScore: number;
  ethicalConcerns: string[];
}

export interface KantianAssessment {
  respectsAutonomy: boolean;
  treatsPeopleAsEnds: boolean;
  universalizableMaxim: boolean;
  goodWillBased: boolean;
  score: number;
  violations: string[];
}

export interface RegulatoryCompliance {
  federalCompliant: boolean;
  stateCompliant: boolean;
  cfpbCompliant: boolean;
  violatedLaws: string[];
  requiredDisclosures: string[];
  coolingOffRequired: boolean;
  usuryViolation: boolean;
}

export interface EthicalAlternative {
  id: string;
  name: string;
  provider: string;
  type:
    | "credit_union_pal"
    | "employer_advance"
    | "community_loan"
    | "credit_card"
    | "emergency_assistance";
  apr: number;
  totalCost: number;
  requirements: string[];
  timeToFunding: string;
  advantages: string[];
  howToApply: string;
  contactInfo: string;
  availabilityByState: Record<string, boolean>;
}

// Strategy Implementations
class PredatoryLoanStrategy implements LoanCalculationStrategy {
  id = "predatory";
  name = "Predatory/Exploitative Lending";

  calculateFees(
    principal: number,
    termDays: number,
    options: any = {}
  ): LoanCalculationResult {
    const {
      vulnerabilityScore = 5,
      stateCode = "TX",
      darkPatterns = [],
    } = options;

    // Base predatory fee structure
    const baseFeeRate = 0.15 + vulnerabilityScore * 0.02; // 15-35% base fee
    const baseFee = principal * baseFeeRate;

    // 2025 Enhanced predatory tactics
    const fees: FeeBreakdown = {
      baseFee,
      processingFee: principal * 0.05, // 5%
      verificationFee: Math.min(50, principal * 0.03),
      achFee: 25,
      riskAssessmentFee: principal * 0.02,
      platformFee: principal * 0.03,
      insuranceFee: principal * 0.04,
      lateFee: principal * 0.2, // 20% late fee
      rolloverFee: principal * 0.15, // 15% rollover
      nsfFee: 35,
      tipAmount: darkPatterns.includes("forced_tip") ? principal * 0.08 : 0,
      confessionOfJudgmentFee: darkPatterns.includes("confession_judgment")
        ? 150
        : 0,
      totalFees: 0,
      hiddenFees: [
        "Daily ACH retry fees",
        "Third-party collection fees",
        "Legal processing fees",
      ],
    };

    fees.totalFees =
      Object.values(fees).reduce(
        (sum, fee) => (typeof fee === "number" ? sum + fee : sum),
        0
      ) - fees.totalFees;

    const totalDue = principal + fees.totalFees;
    const apr = this.getAPR(principal, fees.totalFees, termDays);
    const effectiveAPR = this.calculateEffectiveAPR(
      principal,
      fees,
      termDays,
      darkPatterns
    );

    return {
      principal,
      termDays,
      fees,
      totalDue,
      apr,
      effectiveAPR,
      dailyCost: totalDue / termDays,
      weeklyPayment: totalDue / (termDays / 7),
      warnings: [
        "Extremely high APR exceeds 400%",
        "Debt trap risk - 80% of borrowers cannot repay on time",
        "Hidden fees may apply during collection process",
        "Confession of judgment allows asset seizure without notice",
      ],
      recommendations: [],
      ethicalScore: 1, // Extremely low
      kantianCompliance: this.assessKantianCompliance("predatory"),
      regulatoryCompliance: this.assessRegulatoryCompliance(
        principal,
        fees,
        stateCode
      ),
    };
  }

  getAPR(principal: number, fees: number, termDays: number): number {
    return (fees / principal) * (365 / termDays) * 100;
  }

  calculateEffectiveAPR(
    principal: number,
    fees: FeeBreakdown,
    termDays: number,
    darkPatterns: string[]
  ): number {
    // Account for rollover probability and compounding fees
    const rolloverProbability = 0.8; // 80% chance of rollover
    const avgRollovers = 4.2; // Industry average

    const totalFeesWithRollovers =
      fees.totalFees + fees.rolloverFee * avgRollovers * rolloverProbability;

    return (
      (totalFeesWithRollovers / principal) *
      (365 / (termDays * (1 + avgRollovers))) *
      100
    );
  }

  validateLoan(principal: number, userProfile?: UserProfile): ValidationResult {
    return {
      isValid: true, // Predatory lenders approve almost everyone
      errors: [],
      warnings: [
        "High risk of debt trap",
        "Consider alternatives before proceeding",
        "This loan may not be affordable based on your income",
      ],
      suggestions: [],
      affordabilityScore: 2,
      ethicalConcerns: [
        "Targeting vulnerable populations",
        "Debt trap business model",
        "Excessive fees and interest",
      ],
    };
  }

  private assessKantianCompliance(type: string): KantianAssessment {
    return {
      respectsAutonomy: false,
      treatsPeopleAsEnds: false,
      universalizableMaxim: false,
      goodWillBased: false,
      score: 0,
      violations: [
        "Treats borrowers as mere means to profit",
        "Uses deception and manipulation",
        "Cannot be universalized without societal harm",
        "Motivated by profit, not borrower welfare",
      ],
    };
  }

  private assessRegulatoryCompliance(
    principal: number,
    fees: FeeBreakdown,
    stateCode: string
  ): RegulatoryCompliance {
    const stateUsuryCap = this.getStateUsuryCap(stateCode);
    const calculatedAPR = this.getAPR(principal, fees.totalFees, 14);

    return {
      federalCompliant: false,
      stateCompliant: calculatedAPR <= stateUsuryCap,
      cfpbCompliant: false,
      violatedLaws: [
        "CFPB Abusive Practices prohibition",
        "Truth in Lending Act disclosure requirements",
        stateUsuryCap < calculatedAPR ? `${stateCode} usury laws` : "",
      ].filter(Boolean),
      requiredDisclosures: [
        "True APR including all fees",
        "Total repayment amount",
        "Payment schedule",
        "Right to cancel within 3 days",
      ],
      coolingOffRequired: true,
      usuryViolation: calculatedAPR > stateUsuryCap,
    };
  }

  private getStateUsuryCap(stateCode: string): number {
    const stateUsuryCaps: Record<string, number> = {
      NY: 16,
      CA: 36,
      TX: 999,
      FL: 18,
      IL: 36,
      PA: 6,
      OH: 8,
      GA: 16,
      NC: 36,
      MI: 7,
    };
    return stateUsuryCaps[stateCode] || 36;
  }
}

class EthicalLoanStrategy implements LoanCalculationStrategy {
  id = "ethical";
  name = "Ethical/Dignity-Respecting Lending";

  calculateFees(
    principal: number,
    termDays: number,
    options: any = {}
  ): LoanCalculationResult {
    // Ethical fee structure based on actual cost + reasonable profit
    const operationalCostRate = 0.08; // 8% for legitimate operational costs
    const reasonableProfitRate = 0.04; // 4% reasonable profit margin

    const fees: FeeBreakdown = {
      baseFee: principal * operationalCostRate,
      processingFee: 5, // Actual processing cost
      verificationFee: 0, // Included in operational costs
      achFee: 0, // No additional ACH fees
      riskAssessmentFee: 0, // Included in operational costs
      platformFee: 0, // No platform fees
      insuranceFee: 0, // Optional, not mandatory
      lateFee: 10, // Reasonable late fee
      rolloverFee: 0, // No rollover allowed
      nsfFee: 0, // No excessive NSF fees
      tipAmount: 0, // No tips required
      confessionOfJudgmentFee: 0, // Not allowed
      totalFees: 0,
      hiddenFees: [], // Complete transparency
    };

    fees.totalFees = fees.baseFee + fees.processingFee + fees.lateFee;

    const totalDue = principal + fees.totalFees;
    const apr = this.getAPR(principal, fees.totalFees, termDays);

    return {
      principal,
      termDays,
      fees,
      totalDue,
      apr,
      effectiveAPR: apr, // No hidden compounding
      dailyCost: totalDue / termDays,
      weeklyPayment: totalDue / (termDays / 7),
      warnings: [],
      recommendations: [
        "Consider building emergency fund to avoid future borrowing",
        "Free financial counseling available",
        "Explore income-based repayment options",
      ],
      ethicalScore: 9,
      kantianCompliance: this.assessKantianCompliance(),
      regulatoryCompliance: this.assessRegulatoryCompliance(principal, fees),
    };
  }

  getAPR(principal: number, fees: number, termDays: number): number {
    return (fees / principal) * (365 / termDays) * 100;
  }

  validateLoan(principal: number, userProfile?: UserProfile): ValidationResult {
    if (!userProfile) {
      return {
        isValid: false,
        errors: ["Cannot validate without borrower profile"],
        warnings: [],
        suggestions: ["Please provide income and expense information"],
        affordabilityScore: 0,
        ethicalConcerns: [],
      };
    }

    const monthlyPayment = principal / (userProfile.monthlyIncome || 1);
    const isAffordable = monthlyPayment <= 0.05; // Max 5% of monthly income

    return {
      isValid: isAffordable,
      errors: isAffordable ? [] : ["Loan amount exceeds affordable limits"],
      warnings: [],
      suggestions: isAffordable
        ? []
        : [
            "Consider smaller loan amount",
            "Explore emergency assistance programs",
            "Speak with financial counselor",
          ],
      affordabilityScore: isAffordable ? 8 : 3,
      ethicalConcerns: [],
    };
  }

  private assessKantianCompliance(): KantianAssessment {
    return {
      respectsAutonomy: true,
      treatsPeopleAsEnds: true,
      universalizableMaxim: true,
      goodWillBased: true,
      score: 9,
      violations: [],
    };
  }

  private assessRegulatoryCompliance(
    principal: number,
    fees: FeeBreakdown
  ): RegulatoryCompliance {
    return {
      federalCompliant: true,
      stateCompliant: true,
      cfpbCompliant: true,
      violatedLaws: [],
      requiredDisclosures: [
        "Complete fee breakdown provided",
        "APR clearly stated",
        "Total cost transparent",
        "No hidden fees or penalties",
      ],
      coolingOffRequired: false,
      usuryViolation: false,
    };
  }
}

class RegulatedLoanStrategy implements LoanCalculationStrategy {
  id = "regulated";
  name = "Regulated/CFPB Compliant Lending";

  calculateFees(
    principal: number,
    termDays: number,
    options: any = {}
  ): LoanCalculationResult {
    const { stateCode = "CA" } = options;
    const maxAPR = this.getRegulatedAPRCap(stateCode);

    // Calculate fees within regulatory limits
    const maxAllowedFees = principal * (maxAPR / 100) * (termDays / 365);

    const fees: FeeBreakdown = {
      baseFee: Math.min(principal * 0.1, maxAllowedFees * 0.7),
      processingFee: Math.min(25, maxAllowedFees * 0.1),
      verificationFee: Math.min(15, maxAllowedFees * 0.05),
      achFee: 5,
      riskAssessmentFee: Math.min(20, maxAllowedFees * 0.08),
      platformFee: 0,
      insuranceFee: 0, // Must be optional
      lateFee: Math.min(25, principal * 0.05),
      rolloverFee: 0, // Limited by regulation
      nsfFee: 15, // Regulated amount
      tipAmount: 0, // Not allowed in regulated environment
      confessionOfJudgmentFee: 0, // Prohibited
      totalFees: 0,
      hiddenFees: [],
    };

    fees.totalFees =
      Object.values(fees).reduce(
        (sum, fee) => (typeof fee === "number" ? sum + fee : sum),
        0
      ) - fees.totalFees;

    // Ensure we don't exceed regulatory caps
    if (fees.totalFees > maxAllowedFees) {
      const scaleFactor = maxAllowedFees / fees.totalFees;
      Object.keys(fees).forEach((key) => {
        if (
          typeof fees[key as keyof FeeBreakdown] === "number" &&
          key !== "totalFees"
        ) {
          (fees as any)[key] *= scaleFactor;
        }
      });
      fees.totalFees = maxAllowedFees;
    }

    const totalDue = principal + fees.totalFees;
    const apr = this.getAPR(principal, fees.totalFees, termDays);

    return {
      principal,
      termDays,
      fees,
      totalDue,
      apr: Math.min(apr, maxAPR),
      effectiveAPR: Math.min(apr, maxAPR),
      dailyCost: totalDue / termDays,
      weeklyPayment: totalDue / (termDays / 7),
      warnings: [
        "APR capped by state regulation",
        "Cooling-off period applies",
        "Right to cancel within 3 business days",
      ],
      recommendations: [
        "Free financial counseling available",
        "Consider credit union alternatives",
        "Emergency assistance programs may be available",
      ],
      ethicalScore: 6,
      kantianCompliance: this.assessKantianCompliance(),
      regulatoryCompliance: this.assessRegulatoryCompliance(),
    };
  }

  getAPR(principal: number, fees: number, termDays: number): number {
    return (fees / principal) * (365 / termDays) * 100;
  }

  validateLoan(principal: number, userProfile?: UserProfile): ValidationResult {
    // Implement ability-to-repay assessment
    if (!userProfile) {
      return {
        isValid: false,
        errors: ["Ability-to-repay verification required"],
        warnings: [],
        suggestions: ["Income verification required"],
        affordabilityScore: 0,
        ethicalConcerns: [],
      };
    }

    const debtToIncomeRatio = principal / (userProfile.monthlyIncome || 1);
    const isAffordable = debtToIncomeRatio <= 0.2; // Max 20% of monthly income

    return {
      isValid: isAffordable,
      errors: isAffordable ? [] : ["Fails ability-to-repay assessment"],
      warnings: isAffordable ? [] : ["High debt-to-income ratio"],
      suggestions: [
        "Consider smaller amount",
        "Explore payment plan options",
        "Financial counseling recommended",
      ],
      affordabilityScore: isAffordable ? 6 : 2,
      ethicalConcerns: isAffordable ? [] : ["Affordability concerns"],
    };
  }

  private getRegulatedAPRCap(stateCode: string): number {
    const regulatedCaps: Record<string, number> = {
      CA: 36,
      NY: 36,
      IL: 36,
      NC: 36,
      CO: 36,
      NJ: 30,
      CT: 36,
      MA: 23,
      VT: 18,
      NH: 36,
    };
    return regulatedCaps[stateCode] || 36; // Default to 36% federal recommendation
  }

  private assessKantianCompliance(): KantianAssessment {
    return {
      respectsAutonomy: true,
      treatsPeopleAsEnds: true,
      universalizableMaxim: true,
      goodWillBased: false, // Still profit-motivated but regulated
      score: 6,
      violations: [],
    };
  }

  private assessRegulatoryCompliance(): RegulatoryCompliance {
    return {
      federalCompliant: true,
      stateCompliant: true,
      cfpbCompliant: true,
      violatedLaws: [],
      requiredDisclosures: [
        "TILA-compliant disclosures",
        "State-mandated warnings",
        "Cooling-off period notice",
        "Alternative resources information",
      ],
      coolingOffRequired: true,
      usuryViolation: false,
    };
  }
}

// Main Engine
export class UnifiedLoanEngine {
  private strategies: Map<string, LoanCalculationStrategy> = new Map();
  private ethicalAlternatives: EthicalAlternative[] = [];

  constructor() {
    this.initializeStrategies();
    this.initializeEthicalAlternatives();
  }

  private initializeStrategies(): void {
    const strategies = [
      new PredatoryLoanStrategy(),
      new EthicalLoanStrategy(),
      new RegulatedLoanStrategy(),
    ];

    strategies.forEach((strategy) => {
      this.strategies.set(strategy.id, strategy);
    });
  }

  calculate(
    strategyId: string,
    principal: number,
    termDays: number,
    options?: any
  ): LoanCalculationResult {
    const strategy = this.strategies.get(strategyId);
    if (!strategy) {
      throw new Error(`Unknown calculation strategy: ${strategyId}`);
    }

    return strategy.calculateFees(principal, termDays, options);
  }

  compare(
    principal: number,
    termDays: number,
    userProfile?: UserProfile
  ): {
    predatory: LoanCalculationResult;
    ethical: LoanCalculationResult;
    regulated: LoanCalculationResult;
    alternatives: EthicalAlternative[];
    recommendation: string;
  } {
    const predatory = this.calculate("predatory", principal, termDays, {
      vulnerabilityScore: userProfile?.vulnerabilityScore || 5,
      stateCode: userProfile?.stateCode || "TX",
      darkPatterns: ["forced_tip", "confession_judgment"],
    });

    const ethical = this.calculate("ethical", principal, termDays);

    const regulated = this.calculate("regulated", principal, termDays, {
      stateCode: userProfile?.stateCode || "CA",
    });

    const alternatives = this.findAlternatives(principal, userProfile);

    return {
      predatory,
      ethical,
      regulated,
      alternatives,
      recommendation: this.generateRecommendation(
        predatory,
        ethical,
        regulated,
        alternatives
      ),
    };
  }

  findAlternatives(
    principal: number,
    userProfile?: UserProfile
  ): EthicalAlternative[] {
    return this.ethicalAlternatives
      .filter((alt) => {
        if (
          userProfile?.stateCode &&
          !alt.availabilityByState[userProfile.stateCode]
        ) {
          return false;
        }

        if (alt.type === "credit_union_pal" && principal > 1000) {
          return false;
        }

        if (alt.type === "employer_advance" && !userProfile?.hasSteadyIncome) {
          return false;
        }

        return true;
      })
      .sort((a, b) => a.apr - b.apr);
  }

  private generateRecommendation(
    predatory: LoanCalculationResult,
    ethical: LoanCalculationResult,
    regulated: LoanCalculationResult,
    alternatives: EthicalAlternative[]
  ): string {
    if (alternatives.length > 0) {
      const bestAlt = alternatives[0];
      return `Strongly recommend ${bestAlt.name} (${
        bestAlt.apr
      }% APR) instead of payday loans (${predatory.apr.toFixed(
        0
      )}% APR). You would save $${(
        predatory.totalDue - bestAlt.totalCost
      ).toFixed(2)}.`;
    }

    if (ethical.ethicalScore > 7) {
      return `If you must borrow, the ethical option at ${ethical.apr.toFixed(
        1
      )}% APR is far better than predatory lending at ${predatory.apr.toFixed(
        0
      )}% APR.`;
    }

    return `Consider all alternatives before borrowing. The true cost of this loan would be ${predatory.apr.toFixed(
      0
    )}% APR.`;
  }

  private initializeEthicalAlternatives(): void {
    this.ethicalAlternatives = [
      {
        id: "credit_union_pal",
        name: "Credit Union PAL (Payday Alternative Loan)",
        provider: "Federal Credit Unions",
        type: "credit_union_pal",
        apr: 28,
        totalCost: 0, // Will be calculated based on amount
        requirements: ["Credit union membership", "Basic income verification"],
        timeToFunding: "1-2 business days",
        advantages: [
          "Builds credit history",
          "Lower rates",
          "Financial counseling",
        ],
        howToApply: "Visit mycreditunion.gov to find local options",
        contactInfo: "Call 1-800-CREDIT-U for assistance",
        availabilityByState: {
          CA: true,
          NY: true,
          TX: true,
          FL: true,
          IL: true,
          PA: true,
          OH: true,
          GA: true,
          NC: true,
          MI: true,
        },
      },
      {
        id: "employer_advance",
        name: "Employer Emergency Advance",
        provider: "Your Employer HR Department",
        type: "employer_advance",
        apr: 0,
        totalCost: 0,
        requirements: ["Current employment", "HR approval"],
        timeToFunding: "Same day to 3 days",
        advantages: ["No interest", "Payroll deduction", "No credit check"],
        howToApply: "Contact HR or employee assistance program",
        contactInfo: "Speak with your HR representative",
        availabilityByState: Object.fromEntries(
          ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI"].map(
            (state) => [state, true]
          )
        ),
      },
      {
        id: "community_assistance",
        name: "Community Emergency Fund",
        provider: "Local Nonprofit Organizations",
        type: "emergency_assistance",
        apr: 0,
        totalCost: 0,
        requirements: ["Income verification", "Emergency documentation"],
        timeToFunding: "1-5 business days",
        advantages: [
          "Often grants (no repayment)",
          "Additional resources",
          "Long-term support",
        ],
        howToApply: "Call 211 or visit United Way website",
        contactInfo: "Dial 2-1-1 for local assistance",
        availabilityByState: Object.fromEntries(
          ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI"].map(
            (state) => [state, true]
          )
        ),
      },
    ];
  }

  // Utility methods for enhanced functionality
  calculateDebtTrapProbability(result: LoanCalculationResult): number {
    if (result.apr > 300) return 0.85; // 85% chance with predatory loans
    if (result.apr > 100) return 0.45; // 45% chance with high-rate loans
    if (result.apr > 36) return 0.15; // 15% chance with moderate rates
    return 0.05; // 5% chance with ethical rates
  }

  getStateSpecificWarnings(stateCode: string): string[] {
    const stateWarnings: Record<string, string[]> = {
      CA: [
        "California has 36% APR cap",
        "Additional state disclosure requirements apply",
      ],
      NY: ["New York prohibits confession of judgment", "Usury cap is 16%"],
      TX: ["Texas allows high interest rates", "Limited consumer protections"],
      NC: [
        "North Carolina prohibits payday lending",
        "Consider credit union alternatives",
      ],
    };

    return stateWarnings[stateCode] || [];
  }

  generateEducationalContent(result: LoanCalculationResult): {
    conceptsToLearn: string[];
    resourceLinks: string[];
    nextSteps: string[];
  } {
    return {
      conceptsToLearn: [
        "Annual Percentage Rate (APR) vs. fee amount",
        "Debt-to-income ratio calculation",
        "Alternative borrowing options",
        "Building emergency savings",
      ],
      resourceLinks: [
        "https://www.consumerfinance.gov/ask-cfpb/",
        "https://www.nfcc.org/ (National Foundation for Credit Counseling)",
        "https://www.mycreditunion.gov/",
        "https://www.benefits.gov/",
      ],
      nextSteps: [
        "Contact free financial counselor",
        "Research local credit unions",
        "Explore emergency assistance programs",
        "Create emergency fund plan",
      ],
    };
  }
}

export default UnifiedLoanEngine;
