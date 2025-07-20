import {
  BehavioralManipulationAssessment,
  BehavioralManipulationEngine,
} from "@/lib/behavioral/BehavioralManipulationEngine";
import {
  KantianAssessment,
  KantianEthicsEngine,
} from "@/lib/ethics/KantianEthicsEngine";
import {
  CFPB2025ComplianceEngine,
  CFPBComplianceAssessment,
} from "@/lib/regulatory/CFPB2025ComplianceEngine";
import { LotusSession } from "@/types";

export interface EthicalAlternative {
  id: string;
  type:
    | "credit_union_pal"
    | "employer_advance"
    | "community_program"
    | "emergency_assistance"
    | "budgeting_tool"
    | "side_income"
    | "credit_card_advance"
    | "family_loan";
  name: string;
  provider: string;
  description: string;
  apr: number;
  totalCost?: (loanAmount: number) => number;
  requirements: string[];
  timeToFunding: string;
  pros: string[];
  cons: string[];
  howToApply: string;
  contactInfo?: {
    phone?: string;
    website?: string;
  };
}

export interface ConsumerRights {
  federal: {
    tila: string;
    fdcpa: string;
  };
  state: {
    [stateCode: string]: {
      usuryCap?: number;
      coolingOffPeriod?: string;
    };
  };
}

export class ConsumerProtectionEngine {
  private static alternatives: EthicalAlternative[] = [
    {
      id: "pal-i",
      type: "credit_union_pal",
      name: "Credit Union PAL",
      provider: "Federal Credit Union",
      description:
        "Federal credit unions offer PALs with much lower rates than payday loans. PAL I allows $200-$1,000 loans.",
      apr: 28,
      totalCost: (loanAmount) => loanAmount + (loanAmount * 0.28 * 60) / 365,
      requirements: ["Credit union membership ($5-25 fee)"],
      timeToFunding: "1-2 business days",
      pros: ["Builds credit history", "Lower rates", "Financial counseling"],
      cons: [
        "May require credit union membership fee",
        "Not all credit unions offer PALs",
      ],
      howToApply: "Visit mycreditunion.gov to find local options",
      contactInfo: {
        website:
          "https://www.mycreditunion.gov/about-credit-unions/credit-union-locator",
      },
    },
    {
      id: "employer-advance",
      type: "employer_advance",
      name: "Employer Salary Advance",
      provider: "Your Employer HR Department",
      description:
        "Many employers offer salary advances or emergency loans to employees at no or low cost.",
      apr: 0,
      totalCost: (loanAmount) => loanAmount,
      requirements: ["Employment verification"],
      timeToFunding: "Same day to 3 days",
      pros: ["No interest", "Payroll deduction", "No credit check"],
      cons: [
        "May affect relationship with employer",
        "Not all employers offer programs",
      ],
      howToApply: "Contact HR or employee assistance program",
    },
    {
      id: "community-fund",
      type: "community_program",
      name: "Community Emergency Fund",
      provider: "Local Nonprofit Organizations",
      description:
        "Community organizations, churches, and nonprofits often provide emergency financial assistance.",
      apr: 0,
      totalCost: (loanAmount) => loanAmount * 0.1, // Often grants
      requirements: ["Income verification, emergency proof"],
      timeToFunding: "1-5 business days",
      pros: ["Often grants", "Additional resources", "Long-term support"],
      cons: ["Limited funding", "May have waiting lists"],
      howToApply: "Call 211 or visit United Way website",
      contactInfo: {
        phone: "211",
        website: "https://www.211.org",
      },
    },
    {
      id: "credit-card-advance",
      type: "credit_card_advance",
      name: "Credit Card Cash Advance",
      provider: "Your Credit Card Company",
      description: "Using an existing credit card to get a cash advance.",
      apr: 25,
      totalCost: (loanAmount) =>
        loanAmount + (loanAmount * 0.25 * 30) / 365 + 5,
      requirements: ["Existing credit card with available credit"],
      timeToFunding: "Immediate",
      pros: ["Immediate access", "Known terms"],
      cons: ["May affect credit score", "Higher interest rate than purchases"],
      howToApply: "Use existing card or contact card company",
    },
    {
      id: "family-loan",
      type: "family_loan",
      name: "Family/Friends Loan",
      provider: "Personal Network",
      description: "A personal loan from family or friends.",
      apr: 0,
      totalCost: (loanAmount) => loanAmount,
      requirements: ["Personal relationship"],
      timeToFunding: "Immediate to 1 day",
      pros: ["No interest", "Flexible terms"],
      cons: ["May strain relationships if not handled carefully"],
      howToApply: "Consider a formal agreement to protect the relationship",
    },
  ];

  static getEthicalAlternatives(
    loanAmount: number,
    stateCode: string
  ): EthicalAlternative[] {
    // In a real implementation, this could be filtered by state regulations
    return this.alternatives.filter((alt) => {
      if (alt.type === "credit_union_pal" && loanAmount > 2000) return false;
      return true;
    });
  }

  static getConsumerRights(stateCode: string): ConsumerRights {
    // This would be populated from a comprehensive regulatory data source
    return {
      federal: {
        tila: "The Truth in Lending Act requires lenders to disclose the APR and total cost of a loan.",
        fdcpa:
          "The Fair Debt Collection Practices Act prohibits abusive and harassing debt collection tactics.",
      },
      state: {
        [stateCode]: {
          // Placeholder, would be dynamically populated
          usuryCap: 36,
          coolingOffPeriod: "3 days",
        },
      },
    };
  }

  static generateComprehensiveAnalysis(session: LotusSession): {
    kantian: KantianAssessment;
    cfpb: CFPBComplianceAssessment;
    behavioral: BehavioralManipulationAssessment;
  } {
    // This is where we integrate all our analysis engines
    const practiceData = this.transformSessionToPracticeData(session);

    const kantian = KantianEthicsEngine.assessLendingPractice(practiceData);
    const cfpb = CFPB2025ComplianceEngine.assessCompliance(practiceData);
    const behavioral =
      BehavioralManipulationEngine.assessManipulation(practiceData);

    return { kantian, cfpb, behavioral };
  }

  private static transformSessionToPracticeData(session: LotusSession): any {
    // This function would map the session data to the formats expected
    // by the analysis engines. This is a simplified example.
    const darkPatterns =
      session.darkPatternsEncountered?.map((p) => p.type) || [];

    return {
      loanTerms: session.loanData || {},
      darkPatterns: darkPatterns,
      userVulnerabilities: session.userProfile?.vulnerabilities || [],
      marketingTactics: [], // Would need to be tracked in the session
      consentMechanisms: [], // Would need to be tracked in the session
      feeStructure: {
        totalFees: session.loanData?.fee || 0,
        loanAmount: session.loanData?.amount || 0,
        hidden: darkPatterns.includes("hidden_fees"),
        fees: [{ name: "processing", amount: session.loanData?.fee || 0 }],
      },
      disclosures: [], // Would need to be tracked in the session
      dataCollection: {
        excessive: darkPatterns.includes("data_harvesting"),
      },
      userInterface: {
        darkPatterns: darkPatterns,
      },
      targetingCriteria: {
        lowIncome: true, // Example
      },
      platformFeatures: {
        ai: {
          behavioralManipulation: darkPatterns.includes("ai_manipulation"),
        },
      },
      consentFlow: {
        preCheckedBoxes: darkPatterns.includes("pre_checked_consent"),
        buriedInTerms: darkPatterns.includes("buried_terms"),
      },
    };
  }
}
