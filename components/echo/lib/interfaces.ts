import { EducationalAnnotation } from "@/core/core/CentralizedDarkPatternEngine";

export interface AnnotationOverlay extends EducationalAnnotation {
  isVisible: boolean;
}

export interface DarkPatternDetection {
  pattern: string;
  confidence: number;
  elements: string[];
  harm_estimate: number;
  cfpb_violation: boolean;
  protection_action: string;
}

export interface CostTransparencyCalculation {
  advertised_cost: number;
  true_cost: number;
  hidden_fees: { name: string; amount: number }[];
  effective_apr: number;
  comparison_to_alternatives: {
    credit_union: number;
    credit_card: number;
    employer_advance: number;
  };
}

export interface AlternativeRecommendation {
  type: "credit_union" | "employer" | "community" | "emergency_assistance";
  name: string;
  description: string;
  cost_savings: number;
  contact_info: string;
  how_to_apply: string;
  availability_check: string;
}

export interface Alternative {
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

export interface AlternativeSolutionRecommenderProps {
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

export interface DetectedScheme {
  type:
    | "tip_coercion"
    | "daily_debit"
    | "confession_judgment"
    | "rent_a_bank"
    | "salary_advance";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  evidence: string[];
  explanation: string;
  consumerRisk: string;
  protectiveAction: string;
}

export interface EducationalInteraction {
  timestamp: Date;
  schemeType: string;
  educationalContent: string;
  userAction: "viewed" | "dismissed" | "learned_more" | "took_action";
  comprehensionScore?: number;
}

export interface FintechEducationModuleProps {
  detectedSchemes: DetectedScheme[];
  currentLoanTerms: any;
  onEducationalInteraction: (interaction: EducationalInteraction) => void;
}

export interface LiveAPRTransparencyToolProps {
  loanAmount: number;
  termDays: number;
  fees: Array<{
    name: string;
    amount: number;
    hidden: boolean;
    mandatory: boolean;
    timing: "upfront" | "ongoing" | "end";
  }>;
  interestRate: number;
  onAPRExposure: (exposure: APRExposureData) => void;
}

export interface APRExposureData {
  displayedAPR: number;
  trueAPR: number;
  discrepancy: number;
  hiddenFees: number;
  totalCost: number;
  manipulationSeverity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  exposedTricks: string[];
}

export interface FeeBreakdown {
  name: string;
  amount: number;
  description: string;
  hidden: boolean;
  annualizedCost: number;
  manipulationTactic?: string | undefined;
}

export interface DeceptionPattern {
  id: string;
  name: string;
  type: "dark_pattern" | "manipulation" | "legal_violation" | "hidden_cost";
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  userAction: string;
  impact: string;
  protection: string;
  detectedAt: Date;
}

export interface DeceptionStats {
  totalDeceptions: number;
  criticalCount: number;
  hiddenCosts: number;
  manipulationAttempts: number;
  userVulnerabilityScore: number;
}
