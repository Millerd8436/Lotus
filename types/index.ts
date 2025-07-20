/**
 * LOTUS PLATFORM - CLEAN CONSOLIDATED TYPES
 * Active types only - no TODOs or duplicates
 */

// ==================== CORE SESSION TYPES ====================
export interface LotusSession {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  currentPhase: 1 | 2 | 3;
  completed: boolean;

  // User tracking
  userProfile: UserProfile;

  // Phase-specific data
  exploitativeData?: any;
  ethicalData?: any;
  analysisData?: any;

  // Overall metrics
  totalManipulationScore: number;
  totalEthicsScore: number;

  // Educational progress
  educationalMilestonesReached: string[];
  visitedPhases: number[];

  // Behavioral insights
  keyDecisionPoints: any[];
  darkPatternsEncountered: any[];
  ethicalPrincipleViolations: any[];
  kantianAnalysis?: any;

  // Machine learning inputs
  mlFeatures?: any;
  predictedOutcomes?: any;

  // NEW MISSING PROPERTIES TO FIX ERRORS
  ethicalAssessment?: {
    loanAmount: string;
    [key: string]: any;
  };
  loanData?: {
    amount?: number;
    fee?: number;
    createdAt?: string;
    termDays?: number;
    [key: string]: any;
  };
  metaConsent?: {
    [key: string]: any;
  };
  ethicalLoanData?: {
    [key: string]: any;
  };
  autonomyViolations?: any[];
  darkPatterns?: any[];
  amount?: number;
  fee?: number;
  createdAt?: string;
  termDays?: number;

  // Progress tracking
  phaseHistory: Array<{
    phase?: number; // backward compatibility
    from?: number; // enhanced navigation tracking
    to?: number;
    timestamp: number;
    route?: string;
  }>;
  currentPhaseStartTime?: Date;
  timeSpentInPhase?: number;

  // Navigation state
  lastVisitedPage?: string;

  // Analytics
  interactionEvents?: Array<{
    type: string;
    timestamp: number;
    data?: any;
  }>;

  // Loan applications
  loanApplications?: any[];

  // Phase interactions
  phaseInteractions?: Array<{
    phase: number;
    action: string;
    timestamp: number;
  }>;

  // Detected patterns
  detectedDarkPatterns?: Array<{
    pattern: string;
    severity: number;
    phase: number;
    timestamp: number;
  }>;
}

// ==================== FORM DATA ====================
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

  // References
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

  // Consents
  achAuthorization: boolean;
  electronicSignature: boolean;
  creditCheck: boolean;
  dataSharing: boolean;
  marketingConsent: boolean;
  autoRenewal: boolean;
  loanInsurance: boolean;
  expressProcessing: boolean;
}

// ==================== USER PROFILE ====================
export interface UserProfile {
  vulnerabilityScore: number;
  decisionMaking: "impulsive" | "hesitant" | "methodical";
  emotionalState: "calm" | "anxious" | "desperate" | "rushed";
  trustLevel: "high" | "medium" | "low";
  cognitiveLoad: "low" | "medium" | "high";
  decisionFatigue: number; // 0-1
  interactionPattern: "scanning" | "focused" | "erratic" | "disengaged";
  inferredGoal: "fastest_cash" | "best_terms" | "exploring" | "undecided";
  financialLiteracy: number; // 0-1
  debtToIncomeRatio: number;
  dehumanizationScore: number; // 0-1
  netUtilityScore: number;
  financialLiteracyLevel: string;
  learningStyle: string;
  vulnerabilities: string[];
  strengths: string[];
  goals: string[];
}

// ==================== DARK PATTERNS ====================
export interface DarkPatternEvent {
  type: string;
  timestamp: string;
  phase: string;
  details: Record<string, any>;
  ethicalConcern: "low" | "medium" | "high" | "critical";
  userResponse?: any;
  effectiveness?: number;
}

export interface AutonomyViolation {
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: string;
  kantianViolation: string;
  hiddenFromUser?: boolean;
  phase?: 1 | 2 | 3;
  coercionLevel?: number;
}

// ==================== BEHAVIORAL TRACKING ====================
export interface BehavioralMetrics {
  mouseMovements: MouseMovement[];
  clickPatterns: ClickPattern[];
  scrollBehavior: ScrollBehavior[];
  formInteractions: FormInteraction[];
  hesitationEvents: HesitationEvent[];
  stressIndicators: StressIndicators;
}

export interface MouseMovement {
  x: number;
  y: number;
  timestamp: number;
  velocity: number;
  acceleration: number;
  jitter: number;
}

export interface ClickPattern {
  element: string;
  timestamp: number;
  position: { x: number; y: number };
  hesitationBefore: number;
  doubleClick: boolean;
  accuracy: number;
}

export interface ScrollBehavior {
  direction: "up" | "down";
  speed: number;
  timestamp: number;
  position: number;
  smoothness: number;
  purpose: "reading" | "scanning" | "searching" | "confused";
}

export interface FormInteraction {
  field: string;
  actionType: "focus" | "blur" | "input" | "delete" | "paste";
  timestamp: number;
  timeSpent: number;
  errors: number;
  hesitation: number;
}

export interface HesitationEvent {
  timestamp: number;
  duration: number;
  location: { x: number; y: number };
  context: string;
  suspected_cause: string;
  severity: number;
}

export interface StressIndicators {
  mouseJitter: number;
  clickAccuracy: number;
  scrollingErratic: number;
  formErrors: number;
  hesitationFrequency: number;
  overallStress: number;
}

// ==================== MANIPULATION TYPES ====================
export type ManipulationType =
  | "artificial_scarcity"
  | "fake_social_proof"
  | "pre_selected_consent"
  | "obfuscated_pricing"
  | "countdown_pressure"
  | "false_authority"
  | "commitment_escalation"
  | "sunk_cost_exploitation"
  | "debt_cycle_encouragement"
  | "rollover_pressure"
  | "upsell_manipulation"
  | "emergency_exploitation";

export type CoercionType =
  | "economic_duress"
  | "time_pressure"
  | "information_asymmetry"
  | "psychological_pressure"
  | "social_pressure"
  | "authority_coercion"
  | "desperation_exploitation"
  | "cognitive_overload";

// ==================== COMPONENT PROPS ====================
export interface DarkPatternComponentProps {
  isEnabled: boolean;
  onInteraction: (event: DarkPatternEvent) => void;
  severity: "low" | "medium" | "high";
  ghostMode?: boolean;
}

export interface LotusSimulatorProps {
  phase: 1 | 2 | 3;
  onPhaseComplete: (phase: number, data: any) => void;
  configuration?: SimulatorConfiguration;
}

export interface SimulatorConfiguration {
  enableBehavioralTracking: boolean;
  enableManipulationDetection: boolean;
  ghostMode: boolean;
  educationalMode: boolean;
  researchMode: boolean;
}

// ==================== INITIALIZATION HELPERS ====================
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
  financialLiteracyLevel: "basic",
  learningStyle: "visual",
  vulnerabilities: [],
  strengths: [],
  goals: [],
});

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
  state: "TX",
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

const generateId = () =>
  `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const getInitialLotusSession = (): LotusSession => ({
  sessionId: generateId(),
  startTime: new Date(),
  currentPhase: 1,
  completed: false,
  userProfile: {
    vulnerabilityScore: 0,
    decisionMaking: "methodical",
    emotionalState: "calm",
    trustLevel: "medium",
    cognitiveLoad: "medium",
    decisionFatigue: 0,
    interactionPattern: "focused",
    inferredGoal: "exploring",
    financialLiteracy: 0,
    debtToIncomeRatio: 0,
    dehumanizationScore: 0,
    netUtilityScore: 0,
    financialLiteracyLevel: "basic",
    learningStyle: "visual",
    vulnerabilities: [],
    strengths: [],
    goals: [],
  },
  totalManipulationScore: 0,
  totalEthicsScore: 0,
  educationalMilestonesReached: [],
  visitedPhases: [],
  keyDecisionPoints: [],
  darkPatternsEncountered: [],
  ethicalPrincipleViolations: [],
  loanApplications: [],
  phaseInteractions: [],
  detectedDarkPatterns: [],
  phaseHistory: [],
});
