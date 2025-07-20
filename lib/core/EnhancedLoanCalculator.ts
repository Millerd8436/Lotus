/**
 * EnhancedLoanCalculator - 2025 Ethical Alternatives Implementation
 *
 * Based on research and successful programs:
 * - Possible Finance: Installment loans with payment flexibility
 * - Southern Bancorp MOD: 0% APR with mandatory savings
 * - Credit Union PAL: Payday Alternative Loans
 * - Citibank Checking Plus: Overdraft line of credit
 * - Fig Loans: Building credit with small installment loans
 * - Brigit: Salary advance without fees
 */

export interface EthicalLoanOption {
  id: string;
  name: string;
  provider: string;
  type:
    | "installment"
    | "salary_advance"
    | "credit_line"
    | "savings_based"
    | "pal";
  description: string;
  features: string[];
  requirements: string[];
  pros: string[];
  cons: string[];
  realWorldExample: string;
  impactScore: number; // 1-10, higher is better for consumer
}

export interface LoanComparison {
  amount: number;
  term: number; // days
  predatoryOption: LoanDetails;
  ethicalOptions: EthicalLoanDetails[];
  recommendations: string[];
}

export interface LoanDetails {
  provider: string;
  apr: number;
  fees: {
    origination: number;
    late: number;
    nsf: number;
    rollover?: number;
  };
  totalCost: number;
  biweeklyPayment: number;
  totalInterest: number;
  effectiveAPR: number;
}

export interface EthicalLoanDetails extends LoanDetails {
  optionId: string;
  buildsCreditScore: boolean;
  flexiblePayments: boolean;
  noDebtTrap: boolean;
  financialEducation: boolean;
  emergencyFund: boolean;
}

export class EnhancedLoanCalculator {
  private static ethicalOptions: Map<string, EthicalLoanOption> = new Map();

  static {
    this.initializeEthicalOptions();
  }

  private static initializeEthicalOptions(): void {
    // 1. POSSIBLE FINANCE MODEL
    this.ethicalOptions.set("possible_finance", {
      id: "possible_finance",
      name: "Possible Finance Model",
      provider: "Possible Finance",
      type: "installment",
      description:
        "Installment loans up to $500 with payment flexibility and no late fees",
      features: [
        "Repay in 4 installments over 8 weeks",
        "Reschedule payments up to 29 days",
        "No late fees",
        "Reports to credit bureaus",
        "Mobile app with financial tools",
        "APR capped at 150% (vs 400%+ payday)",
      ],
      requirements: [
        "Bank account with 3+ months history",
        "Recurring income deposits",
        "No outstanding Possible loans",
        "Valid ID and SSN",
      ],
      pros: [
        "Builds credit score",
        "Flexible repayment",
        "No debt trap cycle",
        "Lower cost than payday loans",
        "Quick funding (1-2 hours)",
      ],
      cons: [
        "Still expensive (150% APR)",
        "Limited availability (some states)",
        "Requires smartphone",
        "Bank account required",
      ],
      realWorldExample:
        "User borrows $200, pays back $232 over 8 weeks ($58/biweekly)",
      impactScore: 7,
    });

    // 2. SOUTHERN BANCORP MOD SYSTEM
    this.ethicalOptions.set("southern_bancorp_mod", {
      id: "southern_bancorp_mod",
      name: "MOD (Money on Demand)",
      provider: "Southern Bancorp",
      type: "savings_based",
      description: "0% APR emergency loans with mandatory savings component",
      features: [
        "0% APR on loans",
        "$15 flat fee only",
        "Automatic savings plan",
        "Financial counseling included",
        "Builds emergency fund",
        "No credit check required",
      ],
      requirements: [
        "Open MOD savings account",
        "Direct deposit setup",
        "Complete financial wellness course",
        "Agree to save 10% of loan amount",
      ],
      pros: [
        "Zero interest charges",
        "Builds emergency savings",
        "Free financial education",
        "No debt cycle possible",
        "Improves financial habits",
      ],
      cons: [
        "Limited to Southern Bancorp areas",
        "Requires account opening",
        "Mandatory savings lock-in",
        "Lower loan amounts initially",
      ],
      realWorldExample:
        "Borrow $300, pay $15 fee, save $30 automatically, total cost: $315",
      impactScore: 10,
    });

    // 3. CREDIT UNION PAL PROGRAMS
    this.ethicalOptions.set("credit_union_pal", {
      id: "credit_union_pal",
      name: "PAL (Payday Alternative Loan)",
      provider: "Federal Credit Unions",
      type: "pal",
      description:
        "Regulated small-dollar loans from credit unions with 28% APR cap",
      features: [
        "APR capped at 28%",
        "Loan amounts: $200-$1,000",
        "Terms: 1-6 months",
        "Application fee max $20",
        "No rollovers allowed",
        "Builds credit union relationship",
      ],
      requirements: [
        "Credit union membership (1+ month)",
        "Proof of income",
        "Valid checking account",
        "No outstanding PAL loans",
      ],
      pros: [
        "Very low APR (28% max)",
        "Regulated by NCUA",
        "No prepayment penalties",
        "Builds institutional relationship",
        "Access to other services",
      ],
      cons: [
        "Must join credit union",
        "Membership waiting period",
        "Limited to 3 PALs in 6 months",
        "Not all credit unions offer",
      ],
      realWorldExample:
        "Borrow $500 for 3 months at 28% APR, total repayment: $517.50",
      impactScore: 9,
    });

    // 4. CITIBANK CHECKING PLUS
    this.ethicalOptions.set("checking_plus_overdraft", {
      id: "checking_plus_overdraft",
      name: "Checking Plus (Overdraft Line)",
      provider: "Major Banks (Citi model)",
      type: "credit_line",
      description:
        "Pre-approved credit line linked to checking for overdraft protection",
      features: [
        "Credit line: $500-$5,000",
        "Only pay interest on amount used",
        "Automatic overdraft coverage",
        "Lower APR than credit cards",
        "No per-transaction fees",
        "Revolving credit access",
      ],
      requirements: [
        "Checking account with bank",
        "Good account history",
        "Credit check required",
        "Minimum income requirements",
      ],
      pros: [
        "Prevents overdraft fees",
        "Lower cost than payday loans",
        "Flexible repayment",
        "Builds credit history",
        "Instant availability",
      ],
      cons: [
        "Requires good credit",
        "Can enable overspending",
        "Variable interest rates",
        "Annual fees possible",
      ],
      realWorldExample:
        "Use $300 from credit line, pay 18% APR, ~$4.50/month interest",
      impactScore: 8,
    });

    // 5. FIG LOANS MODEL
    this.ethicalOptions.set("fig_loans", {
      id: "fig_loans",
      name: "Fig Loans Model",
      provider: "Fig Loans",
      type: "installment",
      description:
        "Small installment loans that build credit and financial wellness",
      features: [
        "Loans up to $500",
        "4-month terms",
        "Reports to all 3 credit bureaus",
        "Financial literacy resources",
        "No prepayment penalties",
        "Emergency fund savings option",
      ],
      requirements: [
        "Bank account (3+ months)",
        "Proof of income ($1,400+/month)",
        "No recent NSFs",
        "Valid ID and SSN",
      ],
      pros: [
        "Builds credit score",
        "Lower APR than payday",
        "Financial education included",
        "Transparent pricing",
        "Community-focused",
      ],
      cons: [
        "Still high APR (50-200%)",
        "Limited state availability",
        "Income requirements",
        "Not for emergencies (1-2 day funding)",
      ],
      realWorldExample: "Borrow $300, pay back $360 over 4 months ($90/month)",
      impactScore: 7,
    });

    // 6. BRIGIT SALARY ADVANCE
    this.ethicalOptions.set("brigit_advance", {
      id: "brigit_advance",
      name: "Brigit Salary Advance",
      provider: "Brigit",
      type: "salary_advance",
      description: "Fee-free salary advances up to $250 based on earnings",
      features: [
        "Advances up to $250",
        "No interest or fees on advances",
        "Automatic repayment from paycheck",
        "Overdraft predictions",
        "Financial health monitoring",
        "Optional tips only",
      ],
      requirements: [
        "Regular income ($1,500+/month)",
        "Connected bank account",
        "Positive bank balance",
        "Subscription: $9.99/month",
      ],
      pros: [
        "No interest charges",
        "No late fees",
        "Instant transfers available",
        "Budgeting tools included",
        "Overdraft prevention",
      ],
      cons: [
        "Monthly subscription required",
        "Limited advance amount",
        "Requires steady income",
        "Bank connection needed",
      ],
      realWorldExample:
        "Advance $200, pay $9.99 monthly subscription, no other fees",
      impactScore: 8,
    });
  }

  // Calculate and compare loan options
  static compareLoanOptions(amount: number, termDays: number): LoanComparison {
    // Calculate predatory payday loan
    const predatory = this.calculatePredatoryLoan(amount, termDays);

    // Calculate all ethical alternatives
    const ethicalOptions: EthicalLoanDetails[] = [];

    // Possible Finance calculation
    if (amount <= 500) {
      ethicalOptions.push(this.calculatePossibleFinance(amount));
    }

    // Southern Bancorp MOD
    ethicalOptions.push(this.calculateSouthernBancorpMOD(amount));

    // Credit Union PAL
    if (amount >= 200 && amount <= 1000) {
      ethicalOptions.push(this.calculateCreditUnionPAL(amount, termDays));
    }

    // Checking Plus
    ethicalOptions.push(this.calculateCheckingPlus(amount, termDays));

    // Fig Loans
    if (amount <= 500) {
      ethicalOptions.push(this.calculateFigLoans(amount));
    }

    // Brigit Advance
    if (amount <= 250) {
      ethicalOptions.push(this.calculateBrigitAdvance(amount));
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      amount,
      termDays,
      ethicalOptions
    );

    return {
      amount,
      term: termDays,
      predatoryOption: predatory,
      ethicalOptions: ethicalOptions.sort((a, b) => a.totalCost - b.totalCost),
      recommendations,
    };
  }

  // Calculate predatory payday loan for comparison
  private static calculatePredatoryLoan(
    amount: number,
    termDays: number
  ): LoanDetails {
    const fee = amount * 0.15; // $15 per $100
    const apr = (fee / amount) * (365 / termDays) * 100;

    return {
      provider: "Typical Payday Lender",
      apr: Math.round(apr),
      fees: {
        origination: fee,
        late: 50,
        nsf: 35,
        rollover: fee,
      },
      totalCost: amount + fee,
      biweeklyPayment: amount + fee, // Due in full
      totalInterest: fee,
      effectiveAPR: apr,
    };
  }

  // Calculate Possible Finance option
  private static calculatePossibleFinance(amount: number): EthicalLoanDetails {
    const apr = 150;
    const termDays = 56; // 8 weeks
    const interest = (amount * (apr / 100) * termDays) / 365;
    const totalCost = amount + interest;

    return {
      optionId: "possible_finance",
      provider: "Possible Finance",
      apr: 150,
      fees: {
        origination: 0,
        late: 0,
        nsf: 0,
      },
      totalCost: Math.round(totalCost * 100) / 100,
      biweeklyPayment: Math.round((totalCost / 4) * 100) / 100,
      totalInterest: Math.round(interest * 100) / 100,
      effectiveAPR: 150,
      buildsCreditScore: true,
      flexiblePayments: true,
      noDebtTrap: true,
      financialEducation: true,
      emergencyFund: false,
    };
  }

  // Calculate Southern Bancorp MOD
  private static calculateSouthernBancorpMOD(
    amount: number
  ): EthicalLoanDetails {
    const fee = 15;
    const mandatorySavings = amount * 0.1;

    return {
      optionId: "southern_bancorp_mod",
      provider: "Southern Bancorp MOD",
      apr: 0,
      fees: {
        origination: fee,
        late: 0,
        nsf: 0,
      },
      totalCost: amount + fee,
      biweeklyPayment: (amount + fee) / 4,
      totalInterest: 0,
      effectiveAPR: 0,
      buildsCreditScore: false,
      flexiblePayments: true,
      noDebtTrap: true,
      financialEducation: true,
      emergencyFund: true,
    };
  }

  // Calculate Credit Union PAL
  private static calculateCreditUnionPAL(
    amount: number,
    termDays: number
  ): EthicalLoanDetails {
    const apr = 28;
    const applicationFee = 20;
    const monthlyRate = apr / 100 / 12;
    const termMonths = Math.ceil(termDays / 30);

    // Calculate monthly payment
    const monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);

    const totalCost = monthlyPayment * termMonths + applicationFee;
    const totalInterest = totalCost - amount - applicationFee;

    return {
      optionId: "credit_union_pal",
      provider: "Credit Union PAL",
      apr: 28,
      fees: {
        origination: applicationFee,
        late: 25,
        nsf: 0,
      },
      totalCost: Math.round(totalCost * 100) / 100,
      biweeklyPayment: Math.round((monthlyPayment / 2.17) * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      effectiveAPR: 28,
      buildsCreditScore: true,
      flexiblePayments: false,
      noDebtTrap: true,
      financialEducation: true,
      emergencyFund: false,
    };
  }

  // Calculate Checking Plus overdraft line
  private static calculateCheckingPlus(
    amount: number,
    termDays: number
  ): EthicalLoanDetails {
    const apr = 18;
    const dailyRate = apr / 100 / 365;
    const interest = amount * dailyRate * termDays;

    return {
      optionId: "checking_plus_overdraft",
      provider: "Bank Overdraft Line",
      apr: 18,
      fees: {
        origination: 0,
        late: 0,
        nsf: 0,
      },
      totalCost: amount + interest,
      biweeklyPayment:
        Math.round(((amount + interest) / (termDays / 14)) * 100) / 100,
      totalInterest: Math.round(interest * 100) / 100,
      effectiveAPR: 18,
      buildsCreditScore: true,
      flexiblePayments: true,
      noDebtTrap: true,
      financialEducation: false,
      emergencyFund: false,
    };
  }

  // Calculate Fig Loans option
  private static calculateFigLoans(amount: number): EthicalLoanDetails {
    const apr = 100; // Average of their range
    const termDays = 120; // 4 months
    const interest = (amount * (apr / 100) * termDays) / 365;
    const totalCost = amount + interest;

    return {
      optionId: "fig_loans",
      provider: "Fig Loans",
      apr: 100,
      fees: {
        origination: 0,
        late: 15,
        nsf: 0,
      },
      totalCost: Math.round(totalCost * 100) / 100,
      biweeklyPayment: Math.round((totalCost / 8) * 100) / 100,
      totalInterest: Math.round(interest * 100) / 100,
      effectiveAPR: 100,
      buildsCreditScore: true,
      flexiblePayments: false,
      noDebtTrap: true,
      financialEducation: true,
      emergencyFund: true,
    };
  }

  // Calculate Brigit Advance
  private static calculateBrigitAdvance(amount: number): EthicalLoanDetails {
    const monthlyFee = 9.99;
    const termDays = 30; // Typical paycheck cycle

    return {
      optionId: "brigit_advance",
      provider: "Brigit",
      apr: 0,
      fees: {
        origination: 0,
        late: 0,
        nsf: 0,
      },
      totalCost: amount + monthlyFee,
      biweeklyPayment: amount / 2,
      totalInterest: 0,
      effectiveAPR: 0,
      buildsCreditScore: false,
      flexiblePayments: true,
      noDebtTrap: true,
      financialEducation: true,
      emergencyFund: false,
    };
  }

  // Generate personalized recommendations
  private static generateRecommendations(
    amount: number,
    termDays: number,
    ethicalOptions: EthicalLoanDetails[]
  ): string[] {
    const recommendations: string[] = [];

    // Best overall option
    const lowestCost = ethicalOptions[0];
    recommendations.push(
      `💰 Best Value: ${this.getOptionName(lowestCost.optionId)} - ` +
        `Save ${(((391 - (lowestCost.effectiveAPR || 0)) / 391) * 100).toFixed(
          0
        )}% vs payday loan`
    );

    // Credit building option
    const creditBuilder = ethicalOptions.find((opt) => opt.buildsCreditScore);
    if (creditBuilder) {
      recommendations.push(
        `📈 Build Credit: ${this.getOptionName(creditBuilder.optionId)} - ` +
          `Reports to credit bureaus while providing emergency funds`
      );
    }

    // Emergency fund option
    const savingsBuilder = ethicalOptions.find((opt) => opt.emergencyFund);
    if (savingsBuilder) {
      recommendations.push(
        `🏦 Build Savings: ${this.getOptionName(savingsBuilder.optionId)} - ` +
          `Helps create emergency fund to prevent future borrowing`
      );
    }

    // Flexibility option
    const flexible = ethicalOptions.find((opt) => opt.flexiblePayments);
    if (flexible) {
      recommendations.push(
        `🔄 Most Flexible: ${this.getOptionName(flexible.optionId)} - ` +
          `Allows payment rescheduling without penalties`
      );
    }

    // Warning about payday loans
    recommendations.push(
      `⚠️ Avoid Payday Loans: They charge 391% APR average, ` +
        `creating debt cycles where 80% of borrowers can't repay on time`
    );

    // Emergency resources
    recommendations.push(
      `🆘 Also Consider: Local nonprofits, payment plans with creditors, ` +
        `or 211 helpline for emergency assistance`
    );

    return recommendations;
  }

  // Get friendly option name
  private static getOptionName(optionId: string): string {
    const option = this.ethicalOptions.get(optionId);
    return option?.name || "Unknown Option";
  }

  // Get detailed option information
  static getOptionDetails(optionId: string): EthicalLoanOption | undefined {
    return this.ethicalOptions.get(optionId);
  }

  // Get all available options
  static getAllOptions(): EthicalLoanOption[] {
    return Array.from(this.ethicalOptions.values());
  }

  // Check eligibility for options
  static checkEligibility(
    amount: number,
    hasBank: boolean,
    hasSteadyIncome: boolean,
    creditScore?: number
  ): string[] {
    const eligible: string[] = [];

    // Check each option's requirements
    if (amount <= 500 && hasBank && hasSteadyIncome) {
      eligible.push("possible_finance");
      eligible.push("fig_loans");
    }

    if (hasBank && hasSteadyIncome) {
      eligible.push("southern_bancorp_mod");
    }

    if (amount >= 200 && amount <= 1000 && hasBank) {
      eligible.push("credit_union_pal");
    }

    if (creditScore && creditScore >= 600 && hasBank) {
      eligible.push("checking_plus_overdraft");
    }

    if (amount <= 250 && hasSteadyIncome && hasBank) {
      eligible.push("brigit_advance");
    }

    return eligible;
  }
}

// Export for use in components
export const enhancedLoanCalculator = EnhancedLoanCalculator;
