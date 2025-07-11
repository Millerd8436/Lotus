import { AutonomyViolation, DarkPatternEvent } from "./lotus";

// ------------------- Core Data Structures -------------------

/**
 * A comprehensive, realistic model for form data collected in a predatory context.
 * This is the single source of truth for the exploitative loan application.
 */
export interface RealisticFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  ssn: string;
  dob: string;

  // Address Information
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  timeAtAddress: string;
  housingType: "own" | "rent" | "other";
  monthlyRent?: number;

  // Employment Information
  employmentStatus: "employed" | "self-employed" | "benefits" | "retired";
  employer: string;
  jobTitle: string;
  workPhone: string;
  timeAtJob: string;
  payFrequency: "weekly" | "biweekly" | "monthly" | "other";
  nextPayDate: string;
  monthlyIncome: number;
  incomeSource: "employment" | "benefits" | "other";

  // Banking Information
  bankName: string;
  accountType: "checking" | "savings";
  routingNumber: string;
  accountNumber: string;
  bankingTime: string;
  onlineBankingUsername?: string;

  // Identity Verification
  driversLicenseNumber: string;
  driversLicenseState: string;
  driversLicenseExp: string;

  // References (for collections)
  reference1Name: string;
  reference1Phone: string;
  reference1Relationship: string;
  reference2Name: string;
  reference2Phone: string;
  reference2Relationship: string;

  // Loan Information
  loanAmount: number;
  loanPurpose: string;
  previousPaydayLoan: boolean;

  // Consents (mostly pre-checked)
  achAuthorization: boolean;
  electronicSignature: boolean;
  creditCheck: boolean;
  dataSharing: boolean;
  marketingConsent: boolean;
  autoRenewal: boolean;
  loanInsurance: boolean;
  expressProcessing: boolean;
}

/**
 * Represents the dynamically analyzed psychological and financial state of the user.
 * This is the core profile used by the BehavioralPsychologyEngine.
 */
export interface UserProfile {
  vulnerabilityScore: number;
  decisionMaking: "impulsive" | "hesitant" | "methodical";
  emotionalState: "calm" | "anxious" | "desperate" | "rushed";
  trustLevel: "high" | "medium" | "low";
  cognitiveLoad: "low" | "medium" | "high";
  decisionFatigue: number; // 0-1
  interactionPattern: "scanning" | "focused" | "erratic" | "disengaged";
  inferredGoal: "fastest_cash" | "best_terms" | "exploring" | "undecided";
  financialLiteracy: number; // 0-1, inferred
  debtToIncomeRatio: number; // percentage
  dehumanizationScore: number; // 0-1
  netUtilityScore: number; // Can be negative
}

/**
 * A simplified session object for the simulation, focused on what's needed for the reflection phase.
 * In a real application, this would be much more comprehensive.
 */
export interface LotusSession {
  id: string;
  startTime: Date;
  exploitativeData: Partial<RealisticFormData>;
  ethicalData: any; // Placeholder for ethical phase data
  autonomyViolations: AutonomyViolation[];
  darkPatterns: DarkPatternEvent[];
}

// ------------------- Initialization Helpers -------------------

/**
 * Returns a neutral starting behavioral profile for the simulation.
 */
export const getInitialUserProfile = (): UserProfile => ({
  vulnerabilityScore: 0,
  decisionMaking: "hesitant",
  emotionalState: "calm",
  trustLevel: "medium",
  cognitiveLoad: "low",
  decisionFatigue: 0,
  interactionPattern: "focused",
  inferredGoal: "exploring",
  financialLiteracy: 0.5,
  debtToIncomeRatio: 0,
  dehumanizationScore: 0,
  netUtilityScore: 0,
});

/**
 * Returns an empty but valid initial form data structure.
 * Ensures components can safely initialize without undefined checks.
 */
export const getInitialFormData = (): RealisticFormData => ({
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phone: "",
  alternatePhone: "",
  ssn: "",
  dob: "",
  streetAddress: "",
  city: "",
  state: "TX", // Default to a high-cost state
  zipCode: "",
  timeAtAddress: "",
  housingType: "rent",
  monthlyRent: 0,
  employmentStatus: "employed",
  employer: "",
  jobTitle: "",
  workPhone: "",
  timeAtJob: "",
  payFrequency: "biweekly",
  nextPayDate: "",
  monthlyIncome: 0,
  incomeSource: "employment",
  bankName: "",
  accountType: "checking",
  routingNumber: "",
  accountNumber: "",
  bankingTime: "",
  onlineBankingUsername: "",
  driversLicenseNumber: "",
  driversLicenseState: "",
  driversLicenseExp: "",
  reference1Name: "",
  reference1Phone: "",
  reference1Relationship: "",
  reference2Name: "",
  reference2Phone: "",
  reference2Relationship: "",
  loanAmount: 500,
  loanPurpose: "",
  previousPaydayLoan: false,
  achAuthorization: true,
  electronicSignature: true,
  creditCheck: true,
  dataSharing: true,
  marketingConsent: true,
  autoRenewal: true,
  loanInsurance: true,
  expressProcessing: true,
});

/**
 * Creates a fresh, empty LotusSession for a new simulation run.
 */
export const getInitialLotusSession = (): LotusSession => ({
  id: `session_${Date.now()}`,
  startTime: new Date(),
  exploitativeData: getInitialFormData(),
  ethicalData: {},
  autonomyViolations: [],
  darkPatterns: [],
});
