/**
 * DarkPatternsRegistry - 2025 Enhanced Version
 *
 * Based on research findings from:
 * - CFPB 2025 payday loan enforcement actions
 * - Center for Responsible Lending reports
 * - FDIC analysis of rent-a-bank schemes
 * - Consumer testimonials and class action lawsuits
 */

export interface DarkPattern {
  id: string;
  name: string;
  category:
    | "data_collection"
    | "payment_manipulation"
    | "psychological"
    | "legal_exploitation"
    | "api_abuse";
  description: string;
  implementation: string;
  harmLevel: 1 | 2 | 3 | 4 | 5;
  realWorldExample: string;
  countermeasure?: string;
}

export interface APIExploitation {
  api: string;
  purpose: string;
  dataCollected: string[];
  monetizationMethod: string;
  legalConcerns: string[];
}

export class DarkPatternsRegistry {
  private static patterns: Map<string, DarkPattern> = new Map();
  private static apiExploits: Map<string, APIExploitation> = new Map();

  static {
    // Initialize with 2025 research-based dark patterns
    this.initializePatterns();
    this.initializeAPIExploits();
  }

  private static initializePatterns(): void {
    // 1. PAYMENT MANIPULATION PATTERNS
    this.patterns.set("ach_multiple_attempts", {
      id: "ach_multiple_attempts",
      name: "Multiple ACH Withdrawal Attempts",
      category: "payment_manipulation",
      description:
        "Repeatedly attempting to withdraw funds from different accounts or at different times",
      implementation:
        "System automatically retries failed payments multiple times daily, generating NSF fees",
      harmLevel: 5,
      realWorldExample:
        "MoneyTree and similar lenders attempt withdrawals 3-5 times per day across multiple accounts",
      countermeasure:
        "Limit to single daily attempt, require explicit consent for retries",
    });

    this.patterns.set("payment_splitting", {
      id: "payment_splitting",
      name: "Strategic Payment Splitting",
      category: "payment_manipulation",
      description:
        "Breaking single payment into multiple smaller transactions to maximize NSF fees",
      implementation:
        "Split $300 payment into 6x $50 transactions, each triggering separate NSF fee",
      harmLevel: 5,
      realWorldExample:
        "Documented in 2024 CFPB enforcement actions against multiple lenders",
    });

    this.patterns.set("confession_of_judgment", {
      id: "confession_of_judgment",
      name: "Confession of Judgment Clause",
      category: "legal_exploitation",
      description:
        "Pre-signed legal document waiving borrower's right to defend in court",
      implementation:
        "Hidden in terms, allows instant garnishment without trial",
      harmLevel: 5,
      realWorldExample:
        "Yellowstone Capital used these to seize $25k+ from small businesses",
    });

    // NEW 2025 PATTERNS
    this.patterns.set("tipping_coercion", {
      id: "tipping_coercion",
      name: "Tipping Coercion",
      category: "payment_manipulation",
      description:
        "Forces or heavily pressures users to add 'tips' or 'donations' that function as hidden interest charges",
      implementation:
        "Interface designed to make opting out of tips difficult, with 17+ messages and 13+ clicks required to avoid tipping",
      harmLevel: 5,
      realWorldExample:
        "Dave Inc. FTC enforcement action (2024) - users tricked into 15% tips on $200 advances",
    });

    this.patterns.set("drip_pricing", {
      id: "drip_pricing",
      name: "Drip Pricing",
      category: "payment_manipulation",
      description:
        "Shows attractive base price but gradually adds mandatory fees throughout the process",
      implementation:
        "Initial loan amount shown without fees, then origination fees, processing fees, and insurance added at each step",
      harmLevel: 4,
      realWorldExample:
        "Mike Lindell MyPillow case - $4M loan with hidden 441% APR revealed only after commitment",
    });

    this.patterns.set("merchant_cash_advance_trap", {
      id: "merchant_cash_advance_trap",
      name: "MCA Debt Trap",
      category: "legal_exploitation",
      description:
        "Disguises ultra-high interest loans (400%+ APR) as 'purchase of future receivables' to evade usury laws",
      implementation:
        "Daily ACH withdrawals, stacking multiple advances, using business terminology to avoid loan regulations",
      harmLevel: 5,
      realWorldExample:
        "Par Funding - $118k advance became $3.6M debt through daily withdrawals and reconciliation fees",
    });

    this.patterns.set("rent_a_bank_scheme", {
      id: "rent_a_bank_scheme",
      name: "Rent-a-Bank Partnership",
      category: "legal_exploitation",
      description:
        "Partnering with out-of-state banks to evade state usury laws",
      implementation:
        "WebBank (Utah) or Cross River Bank (NJ) originates loan, immediately sells to non-bank",
      harmLevel: 5,
      realWorldExample:
        "OppFi charges 160% APR in states with 36% caps via FinWise Bank",
    });

    this.patterns.set("embedded_finance_trap", {
      id: "embedded_finance_trap",
      name: "Platform Embedded Lending",
      category: "payment_manipulation",
      description:
        "E-commerce and service platforms offering high-cost loans at point of need",
      implementation:
        "DoorDash, Shopify, Square offering merchant cash advances during business operations",
      harmLevel: 4,
      realWorldExample:
        "UnitedHealthcare Optum Pay Advance - 35% discount on future insurance reimbursements",
    });

    // 2. DATA COLLECTION & API ABUSE
    this.patterns.set("plaid_overdraft_analysis", {
      id: "plaid_overdraft_analysis",
      name: "Bank Data Mining via Plaid",
      category: "api_abuse",
      description:
        "Using banking APIs to analyze overdraft patterns and target vulnerable moments",
      implementation:
        "Plaid API reveals overdraft history, used to time loan offers when account is negative",
      harmLevel: 4,
      realWorldExample:
        "Multiple FinTech lenders analyze 24 months of transaction data",
    });

    this.patterns.set("lead_generation_networks", {
      id: "lead_generation_networks",
      name: "Dark Web Lead Buying",
      category: "data_collection",
      description: "Purchasing borrower data from underground networks",
      implementation:
        'Buy "trigger leads" from credit bureaus, bankruptcy filers, medical debt lists',
      harmLevel: 4,
      realWorldExample:
        'FTC found lenders paying $100+ per "qualified distressed borrower" lead',
    });

    this.patterns.set("social_media_vulnerability", {
      id: "social_media_vulnerability",
      name: "Social Media Vulnerability Scoring",
      category: "data_collection",
      description: "Analyzing social posts for financial stress indicators",
      implementation:
        'API scraping for keywords like "broke", "bills", "emergency", location check-ins at hospitals',
      harmLevel: 3,
      realWorldExample:
        "Facebook ad targeting users who engage with financial hardship content",
    });

    // 3. RENT-A-BANK & REGULATORY EVASION
    this.patterns.set("choice_of_law_manipulation", {
      id: "choice_of_law_manipulation",
      name: "Tribal Sovereignty Exploitation",
      category: "legal_exploitation",
      description: "Claiming tribal immunity to avoid state/federal laws",
      implementation:
        'Loan "originated" on tribal land, claims sovereign immunity from lawsuits',
      harmLevel: 4,
      realWorldExample:
        "Big Picture Loans, Mobiloans claim immunity while charging 600%+ APR",
    });

    // 4. PSYCHOLOGICAL MANIPULATION
    this.patterns.set("false_approval_rates", {
      id: "false_approval_rates",
      name: "Inflated Approval Statistics",
      category: "psychological",
      description: "Claiming 90%+ approval rates to encourage applications",
      implementation:
        'Display "9 out of 10 approved!" but count pre-screening as approval',
      harmLevel: 3,
      realWorldExample:
        "CashNetUSA and others advertise misleading approval rates",
    });

    this.patterns.set("debt_normalization", {
      id: "debt_normalization",
      name: "Debt Cycle Normalization",
      category: "psychological",
      description: "Presenting perpetual debt as normal and expected",
      implementation:
        'Auto-renewal presented as "convenience", loyalty programs for chronic borrowers',
      harmLevel: 4,
      realWorldExample:
        'Advance America "Gold Customer" status for 10+ loans per year',
    });

    // 5. MOBILE APP EXPLOITATION
    this.patterns.set("continuous_location_tracking", {
      id: "continuous_location_tracking",
      name: "Location-Based Loan Pushing",
      category: "data_collection",
      description: "Track user location to push loans near payday competitors",
      implementation:
        "App requests always-on location, sends notifications near competitor stores",
      harmLevel: 3,
      realWorldExample:
        'Dave app sends "need cash?" when user is at Walmart Money Center',
    });

    this.patterns.set("biometric_collection", {
      id: "biometric_collection",
      name: "Unnecessary Biometric Collection",
      category: "data_collection",
      description: "Collecting face/fingerprint data beyond security needs",
      implementation:
        'Forced selfie uploads "for verification", sold to data brokers',
      harmLevel: 3,
      realWorldExample:
        "Multiple apps require video selfies holding ID, retain indefinitely",
    });
  }

  private static initializeAPIExploits(): void {
    // Real APIs used by payday lenders for exploitation
    this.apiExploits.set("plaid", {
      api: "Plaid Banking API",
      purpose: "Deep financial surveillance",
      dataCollected: [
        "All transactions for 24+ months",
        "Account balances in real-time",
        "Overdraft frequency and amounts",
        "Employer payment patterns",
        "Other lenders being paid",
        "Spending categorization",
      ],
      monetizationMethod:
        "Target loans when balance is low, sell aggregated data to brokers",
      legalConcerns: [
        "Excessive data collection",
        "Unclear consent",
        "Data retention policies",
      ],
    });

    this.apiExploits.set("equifax_trigger_leads", {
      api: "Equifax Trigger Lead System",
      purpose: "Real-time notification when someone checks credit",
      dataCollected: [
        "Credit inquiries in real-time",
        "Who pulled credit (indicates shopping)",
        "Credit score changes",
        "New accounts opened",
      ],
      monetizationMethod:
        "Immediately contact consumers who were declined elsewhere",
      legalConcerns: ["FCRA compliance", "Sold without clear consent"],
    });

    this.apiExploits.set("teletrack", {
      api: "TeleTrack/Clarity Services",
      purpose: "Subprime credit bureau for payday loans",
      dataCollected: [
        "All payday loan history",
        "Current outstanding balances",
        "Default history",
        "Bank account closures",
      ],
      monetizationMethod: "Score desperation level, adjust rates accordingly",
      legalConcerns: ["Not covered by FCRA protections", "No dispute rights"],
    });

    this.apiExploits.set("early_warning_services", {
      api: "Early Warning Services (EWS)",
      purpose: "Bank account fraud database",
      dataCollected: [
        "Closed bank accounts",
        "NSF history",
        "Suspected fraud flags",
        "Account ownership verification",
      ],
      monetizationMethod: "Identify unbanked/underbanked for targeting",
      legalConcerns: [
        "Used beyond fraud prevention",
        "Creates financial exclusion",
      ],
    });

    this.apiExploits.set("facebook_custom_audiences", {
      api: "Facebook Custom Audiences",
      purpose: "Hyper-targeted vulnerable populations",
      dataCollected: [
        "Financial interest targeting",
        "Life events (job loss, divorce)",
        "Engagement with financial content",
        "Location patterns",
        "Friend networks in similar situations",
      ],
      monetizationMethod:
        'Upload customer lists to find "lookalikes" in distress',
      legalConcerns: ["Discriminatory targeting", "Privacy violations"],
    });
  }

  static getPattern(id: string): DarkPattern | undefined {
    return this.patterns.get(id);
  }

  static getAPIExploit(api: string): APIExploitation | undefined {
    return this.apiExploits.get(api);
  }

  static getPatternsByCategory(
    category: DarkPattern["category"]
  ): DarkPattern[] {
    return Array.from(this.patterns.values()).filter(
      (p) => p.category === category
    );
  }

  static getHighestHarmPatterns(): DarkPattern[] {
    return Array.from(this.patterns.values())
      .filter((p) => p.harmLevel >= 4)
      .sort((a, b) => b.harmLevel - a.harmLevel);
  }

  static getAllAPIs(): APIExploitation[] {
    return Array.from(this.apiExploits.values());
  }

  static generateExploitationStrategy(borrowerProfile: any): string[] {
    const strategies: string[] = [];

    // Based on borrower vulnerability, suggest exploitation tactics
    if (borrowerProfile.hasOverdrafts) {
      strategies.push("ach_multiple_attempts");
      strategies.push("payment_splitting");
    }

    if (borrowerProfile.creditScore < 600) {
      strategies.push("rent_a_bank_scheme");
      strategies.push("confession_of_judgment");
    }

    if (borrowerProfile.socialMediaActive) {
      strategies.push("social_media_vulnerability");
      strategies.push("continuous_location_tracking");
    }

    return strategies;
  }
}

// Export for use in components
export const darkPatternsRegistry = new DarkPatternsRegistry();
