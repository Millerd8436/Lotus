/**
 *  LOTUS PLATFORM - CONSOLIDATED TYPES
 * All TypeScript interfaces in one file
 */

// Core Lotus Type Definitions for the Comprehensive Educational Platform
// NOTE: This file contains a mix of currently used and aspirational types.
// Many of these have been superseded by the centralized types in `types/shared.ts`
// or represent future, unimplemented features. They are commented out to
// reduce confusion and will be removed or implemented in future work.

// export interface LoanSession {
//   sessionId: string;
//   timestamp: string;
//   currentPhase: "exploitative" | "ethical" | "reflection";
//   amount: number;
//   termDays: number;
//   state: string;
//   fee: number;
//   apr: number;
//   rolloverCount: number;
//   totalCost: number;
//   researchConsent: boolean;
//   anonymizedData: boolean;
// }

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

// TODO: Future implementation
// export interface BehavioralEvent {
//   eventType: string;
//   timestamp: string;
//   phase: string;
//   data: Record<string, any>;
//   psychologicalIndicators: Record<string, string>;
//   cognitiveState: CognitiveState;
// }

// TODO: Future implementation
// export interface CognitiveState {
//   system1_dominance: boolean;
//   cognitive_load: number;
//   decision_fatigue: number;
//   stress_level: number;
//   attention_level: number;
// }

// TODO: Future implementation
// export interface KantianAnalysis {
//   universalizability: number;
//   humanityPrinciple: number;
//   autonomyRespect: number;
//   moralWorth: number;
//   categoricalImperative: boolean;
//   ethicalAssessment: string;
// }

// TODO: Future implementation
// export interface EducationalProgress {
//   module: string;
//   completion: number;
//   comprehension: number;
//   timestamp: string;
// }

// TODO: Future implementation
// export interface LearningOutcome {
//   objective: string;
//   achieved: boolean;
//   proficiency: number;
//   evidence: string[];
// }

// TODO: Future implementation
// export interface ReflectionData {
//   phasesCompared: string[];
//   insights: string[];
//   behavioralChanges: string[];
//   ethicalReflections: string[];
//   futureCommitments: string[];
// }

// TODO: Future implementation
// export interface StateRegulation {
//   state: string;
//   maxAPR: number;
//   minTermDays: number;
//   allowRollover: boolean;
//   maxRollovers: number;
//   coolingOffPeriod: number;
//   description: string;
//   consumerProtections: string[];
//   regulatoryAgency: string;
//   enforcementStrength: number;
//   industryInfluence: number;
// }

// TODO: Future implementation
// export interface ComprehensiveSessionState extends LoanSession {
//   darkPatterns: DarkPatternEvent[];
//   complianceViolations: any[];
//   behavioralData: BehavioralEvent[];
//   decisionPoints: any[];
//   coercionIndex: number;
//   autonomyViolations: AutonomyViolation[];
//   kantianAnalysis: KantianAnalysis | null;
//   ethicsScore: number;
//   educationalProgress: EducationalProgress[];
//   learningOutcomes: LearningOutcome[];
//   reflectionData: ReflectionData | null;
// }

// NOTE: This is superseded by LotusSession in `types/shared.ts`
// export interface UserChoice {
//   type: string;
//   data: any;
//   timestamp: string;
//   phase: number;
//   timeFromStart: number;
//   manipulationPresent: boolean;
//   autonomyImpact: "low" | "medium" | "high";
//   coercionLevel: number;
// }

// NOTE: This is superseded by LotusSession in `types/shared.ts`
// export interface LotusSession {
//   id: string;
//   startTime: Date;
//   currentPhase: 1 | 2 | 3;
//   exploitativeData: any;
//   ethicalData: any;
//   analysisData: any;
//   userChoices: UserChoice[];
//   coercionIndex: number;
//   autonomyViolations: AutonomyViolation[];
//   trapEngineState: TrapEngineState;
//   darkPatterns: DarkPatternEvent[];
// }

// TODO: Future implementation
// export interface TrapEngineState {
//   activeTraps: Map<string, any>;
//   ghostModeEnabled: boolean;
//   exploitationLevel: number;
//   coercionIndex: number;
//   rolloverTraps: any[];
//   achExploitationActive: boolean;
//   upsellEngineState: UpsellEngineState;
//   usurySkirterActive: UsurySkirterState;
// }

// TODO: Future implementation
// export interface UpsellEngineState {
//   loanCount: number;
//   qualificationLevel: string;
//   upsellTriggers: any[];
//   congratulationMessages: any[];
// }

// TODO: Future implementation
// export interface UsurySkirterState {
//   currentLoophole: string;
//   legalJustification: string;
//   stateApplicable: string[];
//   aprBypass: number;
// }

// REMOVED ThreePhaseAutonomyTheater and AutonomyReport, now imported from lib/core/autonomy-theater.ts

// Helper function for creating autonomy theater has been moved to lib/core/autonomy-theater.ts

// Additional missing classes/interfaces
// TODO: Future implementation
// export interface BehavioralTracker {
//   startTracking: () => void;
//   stopTracking: () => void;
//   recordManipulationExposure: (type: string, category: string) => void;
//   recordInteraction: (data: any) => void;
//   getClickPattern: () => any;
//   getHesitationEvents: () => any;
//   getStressLevel: () => number;
//   getCognitiveLoad: () => number;
//   getDecisionTime: () => number;
// }

// TODO: Future implementation
// export interface PsychologicalManipulationEngine {
//   createUserProfile: (data: any) => any;
// }

// TODO: Future implementation
// export interface RealTimeManipulationTracker {
//   analyzeCurrentExposure: (data: any) => any;
//   recordManipulationSuccess: (data: any) => void;
// }

// TODO: Future implementation
// export interface KantianEthicsAnalyzer {
//   analyzeChoice: (data: any) => any;
// }

// TODO: Future implementation
// export interface UserChoiceAnalysisEngine {
//   analyzeDecision: (data: any) => any;
// }

// TODO: Future implementation
// export interface LegalLoopholeEngine {
//   identifyApplicableLoopholes: (state: string, data: any) => any;
// }

// TODO: Future implementation
// export interface RolloverTrapEngine {
//   calculateRolloverProbability: (data: any) => number;
//   calculateOptimalRolloverTiming: (probability: number) => number;
// }

// TODO: Future implementation
// export interface CaseStudyDatabase {
//   // Implementation details
// }

// TODO: Future implementation
// export interface EducationalContentEngine {
//   // Implementation details
// }

// TODO: Future implementation
// export interface RegulatoryComplianceEngine {
//   // Implementation details
// }

// Dark Pattern Types
// TODO: Future implementation
// export interface DarkPattern {
//   id: string;
//   name: string;
//   description: string;
//   category:
//     | "urgency"
//     | "scarcity"
//     | "social_proof"
//     | "obfuscation"
//     | "coercion";
//   severity: "low" | "medium" | "high" | "critical";
//   ethicalConcern: string;
//   psychologicalBasis: string;
//   countermeasures: string[];
// }

// TODO: Future implementation
// export interface DarkPatternInstance {
//   patternId: string;
//   timestamp: string;
//   context: string;
//   userResponse?: any;
//   effectiveness: number;
//   ethicalViolation: string;
// }

// Educational Content Types
// TODO: Future implementation
// export interface EducationalModule {
//   id: string;
//   title: string;
//   description: string;
//   content: string;
//   difficulty: "beginner" | "intermediate" | "advanced";
//   prerequisites: string[];
//   learningObjectives: string[];
//   assessmentQuestions: AssessmentQuestion[];
// }

// TODO: Future implementation
// export interface AssessmentQuestion {
//   id: string;
//   question: string;
//   type: "multiple_choice" | "true_false" | "short_answer";
//   options?: string[];
//   correctAnswer: string | string[];
//   explanation: string;
//   difficulty: "easy" | "medium" | "hard";
// }

// Behavioral Analysis Types
// TODO: Future implementation
// export interface BehavioralProfile {
//   userId: string;
//   sessionId: string;
//   vulnerabilityFactors: string[];
//   manipulationSusceptibility: Record<string, number>;
//   decisionPatterns: DecisionPattern[];
//   cognitiveBiases: string[];
//   protectiveFactors: string[];
// }

// TODO: Future implementation
// export interface DecisionPattern {
//   type: string;
//   frequency: number;
//   context: string;
//   outcome: string;
//   timestamp: string;
// }

// Research and Analytics Types
// TODO: Future implementation
// export interface ResearchData {
//   sessionId: string;
//   timestamp: string;
//   anonymizedData: boolean;
//   consentGiven: boolean;
//   dataType: "behavioral" | "educational" | "analytical";
//   data: Record<string, any>;
// }

// TODO: Future implementation
// export interface AnalyticsEvent {
//   eventType: string;
//   timestamp: string;
//   sessionId: string;
//   userId?: string;
//   data: Record<string, any>;
//   anonymized: boolean;
// }

// UI and Component Types
// TODO: Future implementation
// export interface UIState {
//   currentPhase: number;
//   ghostMode: boolean;
//   educationalOverlay: boolean;
//   darkPatternHighlights: boolean;
//   consentBarVisible: boolean;

//   modalOpen: boolean;
//   currentModal: string | null;
// }

// TODO: Future implementation
// export interface ComponentProps {
//   session: LoanSession;
//   onPhaseComplete: (phase: number) => void;
//   onSessionUpdate: (session: LoanSession) => void;
//   onDarkPatternDetected: (pattern: DarkPatternInstance) => void;
//   onEducationalProgress: (progress: EducationalProgress) => void;
// }

// Configuration Types
// TODO: Future implementation
// export interface AppConfig {
//   version: string;
//   environment: "development" | "staging" | "production";
//   features: {
//     ghostMode: boolean;
//     comprehensiveAnalytics: boolean;
//     researchDataCollection: boolean;
//     kantianAnalysis: boolean;
//     behavioralTracking: boolean;
//   };
//   api: {
//     baseUrl: string;
//     endpoints: Record<string, string>;
//   };
//   analytics: {
//     enabled: boolean;
//     anonymization: boolean;
//     consentRequired: boolean;
//   };
// }

// Error and Validation Types
// TODO: Future implementation
// export interface ValidationError {
//   field: string;
//   message: string;
//   severity: "error" | "warning" | "info";
// }

// TODO: Future implementation
// export interface AppError {
//   code: string;
//   message: string;
//   details?: any;
//   timestamp: string;
//   sessionId?: string;
// }

// Utility functions
// NOTE: These are duplicated in `lib/utils.ts` and should be removed from here.
// export const formatCurrency = (amount: number): string => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(amount);
// };

// export const calculateAPR = (
//   principal: number,
//   fee: number,
//   termDays: number
// ): number => {
//   return (fee / principal) * (365 / termDays) * 100;
// };

// All types are already exported above

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
  startTime: string;
  exploitativeData: RealisticFormData; // No longer partial, expects a full object.
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
  financialLiteracyLevel: "basic",
  learningStyle: "visual",
  vulnerabilities: [],
  strengths: [],
  goals: [],
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
  sessionId: `session_${Date.now()}`,
  userId: "",
  timestamp: new Date().toISOString(),
  startTime: new Date().toISOString(),
  exploitativeData: getInitialFormData(),
  ethicalData: {},
  autonomyViolations: [],
  darkPatterns: [],
  amount: 0,
  state: "",
  mode: "exploitative",
  termDays: 0,
  fee: 0,
  apr: 0,
  totalCost: 0,
  rolloverCount: 0,
  psychologicalProfile: {} as any,
  vulnerabilityScore: 0,
  coercionTimeline: [],
  manipulationExposure: [],
  behavioralMetrics: {} as any,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  completed: false,
  phase: 1,
});

/**
 * LOTUS ADVANCED TYPE DEFINITIONS
 * Comprehensive TypeScript interfaces for the 96,000+ line Lotus system
 */

// ====================
// CORE SYSTEM TYPES
// ====================

export interface LotusSession {
  id: string;
  sessionId: string;
  userId?: string;
  timestamp: string;

  // Loan Details
  amount: number;
  state: string;
  mode: "exploitative" | "ethical" | "comparison";
  termDays: number;

  // Financial Data
  fee: number;
  apr: number;
  totalCost: number;
  rolloverCount: number;

  // Advanced Analytics
  psychologicalProfile: PsychologicalProfile;
  vulnerabilityScore: number;
  coercionTimeline: CoercionEvent[];
  manipulationExposure: ManipulationEvent[];
  behavioralMetrics: BehavioralMetrics;

  // Session Metadata
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  phase: 1 | 2 | 3;
}

// ====================
// PSYCHOLOGICAL PROFILING
// ====================

export interface PsychologicalProfile {
  vulnerabilityFactors: VulnerabilityFactor[];
  behavioralPatterns: BehavioralPattern[];
  manipulationSusceptibility: ManipulationSusceptibility;
  decisionMakingStyle: DecisionMakingStyle;
  stressResponsePattern: StressResponse;
  financialLiteracyLevel: FinancialLiteracy;
  cognitiveLoad: CognitiveLoadAssessment;
}

export interface VulnerabilityFactor {
  type:
    | "financial_stress"
    | "debt_cycle_risk"
    | "inexperience"
    | "financial_literacy"
    | "situational_pressure";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  exploitationRisk: string;
  evidenceSources: string[];
  confidenceLevel: number;
}

export interface BehavioralPattern {
  pattern: string;
  frequency: number;
  context: string[];
  implications: string[];
  manipulationVulnerability: number;
}

export interface ManipulationSusceptibility {
  socialProof: number;
  authority: number;
  scarcity: number;
  reciprocity: number;
  commitment: number;
  liking: number;
  overallScore: number;
  primaryVulnerabilities: string[];
}

export interface DecisionMakingStyle {
  type: "impulsive" | "deliberative" | "balanced" | "stressed" | "overwhelmed";
  characteristics: string[];
  exploitationRisk: string;
  timeToDecision: number;
  informationProcessingStyle: "fast" | "slow" | "mixed";
}

export interface StressResponse {
  level: "low" | "moderate" | "high" | "extreme";
  indicators: string[];
  vulnerability: string;
  physiologicalMarkers: PhysiologicalMarkers;
}

export interface PhysiologicalMarkers {
  mouseJitter: number;
  clickAccuracy: number;
  scrollingErratic: number;
  formErrors: number;
  hesitationFrequency: number;
  responseTime: number;
}

export interface FinancialLiteracy {
  level: "basic" | "intermediate" | "advanced" | "expert";
  knowledgeAreas: FinancialKnowledgeArea[];
  overallScore: number;
  deficits: string[];
  strengths: string[];
}

export interface FinancialKnowledgeArea {
  area: string;
  score: number;
  tested: boolean;
  evidence: string[];
}

export interface CognitiveLoadAssessment {
  currentLoad: number;
  capacity: number;
  overloadRisk: number;
  factors: CognitiveLoadFactor[];
}

export interface CognitiveLoadFactor {
  factor: string;
  impact: number;
  description: string;
}

// ====================
// MANIPULATION DETECTION
// ====================

export interface ManipulationEvent {
  id: string;
  timestamp: Date;
  type: ManipulationType;
  element: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  effectiveness: ManipulationEffectiveness;
  userResponse: UserResponse;
  ethicalViolation: EthicalViolation;
  legalImplications: LegalImplication[];
}

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

export interface ManipulationEffectiveness {
  score: number;
  factors: EffectivenessFactor[];
  userResistance: number;
  timeToInfluence: number;
}

export interface EffectivenessFactor {
  factor: string;
  weight: number;
  contribution: number;
}

export interface UserResponse {
  responseType: "influenced" | "resistant" | "neutral" | "confused";
  responseTime: number;
  hesitationLevel: number;
  subsequentBehavior: string[];
  emotionalState: EmotionalState;
}

export interface EmotionalState {
  primary: string;
  intensity: number;
  indicators: string[];
  manipulationImpact: number;
}

export interface EthicalViolation {
  type: string;
  severity: "minor" | "moderate" | "severe" | "egregious";
  description: string;
  kantianAnalysis: KantianAnalysis;
  utilitarianAnalysis: UtilitarianAnalysis;
  virtue_ethics_analysis: VirtueEthicsAnalysis;
}

export interface KantianAnalysis {
  categorical_imperative_violation: boolean;
  universalizability_test: string;
  humanity_principle_violation: boolean;
  analysis: string;
}

export interface UtilitarianAnalysis {
  overall_harm: number;
  beneficiaries: string[];
  victims: string[];
  net_utility: number;
  analysis: string;
}

export interface VirtueEthicsAnalysis {
  virtues_violated: string[];
  character_implications: string;
  virtue_score: number;
  analysis: string;
}

export interface LegalImplication {
  jurisdiction: string;
  violation_type: string;
  statute: string;
  penalty_range: string;
  enforcement_likelihood: number;
  precedent_cases: PrecedentCase[];
}

export interface PrecedentCase {
  case_name: string;
  year: number;
  outcome: string;
  relevance: number;
  citation: string;
}

// ====================
// COERCION MEASUREMENT
// ====================

export interface CoercionEvent {
  id: string;
  timestamp: Date;
  type: CoercionType;
  severity: number;
  description: string;
  context: CoercionContext;
  effectiveness: number;
  userState: UserState;
  ethicalAnalysis: EthicalAnalysis;
}

export type CoercionType =
  | "economic_duress"
  | "time_pressure"
  | "information_asymmetry"
  | "psychological_pressure"
  | "social_pressure"
  | "authority_coercion"
  | "desperation_exploitation"
  | "cognitive_overload";

export interface CoercionContext {
  situationalFactors: string[];
  userVulnerabilities: string[];
  environmental_pressures: string[];
  power_dynamics: PowerDynamics;
}

export interface PowerDynamics {
  power_imbalance: number;
  information_asymmetry: number;
  economic_desperation: number;
  institutional_authority: number;
}

export interface UserState {
  stress_level: number;
  cognitive_capacity: number;
  emotional_state: string;
  financial_pressure: number;
  autonomy_level: number;
}

export interface EthicalAnalysis {
  autonomy_violation: AutonomyViolation;
  beneficence_analysis: BeneficenceAnalysis;
  justice_analysis: JusticeAnalysis;
  overall_ethical_score: number;
}

export interface AutonomyViolation {
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  kantianViolation: string;
  hiddenFromUser?: boolean;
  timestamp: string;
  impact_on_choice: number;
  recovery_difficulty: number;
}

export interface BeneficenceAnalysis {
  harm_to_user: number;
  benefit_to_lender: number;
  net_harm: number;
  harm_types: string[];
}

export interface JusticeAnalysis {
  fairness_violation: boolean;
  distributive_justice: number;
  procedural_justice: number;
  corrective_justice_needed: boolean;
}

// ====================
// BEHAVIORAL TRACKING
// ====================

export interface BehavioralMetrics {
  mouseMovements: MouseMovement[];
  clickPatterns: ClickPattern[];
  scrollBehavior: ScrollBehavior[];
  formInteractions: FormInteraction[];
  hesitationEvents: HesitationEvent[];
  focusPatterns: FocusPattern[];
  readingBehavior: ReadingBehavior;
  decisionTiming: DecisionTiming;
  stressIndicators: StressIndicators;
  attentionPatterns: AttentionPattern[];
}

export interface MouseMovement {
  x: number;
  y: number;
  timestamp: number;
  velocity: number;
  acceleration: number;
  jitter: number;
  confidence: number;
}

export interface ClickPattern {
  element: string;
  timestamp: number;
  position: { x: number; y: number };
  hesitationBefore: number;
  doubleClick: boolean;
  accuracy: number;
  force?: number;
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
  value_length?: number;
}

export interface HesitationEvent {
  timestamp: number;
  duration: number;
  location: { x: number; y: number };
  context: string;
  suspected_cause: string;
  severity: number;
}

export interface FocusPattern {
  element: string;
  timestamp: number;
  duration: number;
  attention_quality: number;
  distractions: number;
}

export interface ReadingBehavior {
  wordsPerMinute: number;
  comprehensionScore: number;
  skimmingDetected: boolean;
  backtrackingFrequency: number;
  focusAreas: string[];
  timeSpentReading: number;
}

export interface DecisionTiming {
  timeToDecision: number;
  deliberationPeriod: number;
  impulsiveDecisions: number;
  reversedDecisions: number;
  decisionConfidence: number;
}

export interface StressIndicators {
  mouseJitter: number;
  clickAccuracy: number;
  scrollingErratic: number;
  formErrors: number;
  hesitationFrequency: number;
  overallStress: number;
  physiological_markers: PhysiologicalMarkers;
}

export interface AttentionPattern {
  element: string;
  duration: number;
  intensity: number;
  timestamp: number;
  type: "focused" | "scanning" | "confused" | "distracted";
}

// ====================
// EDUCATIONAL SYSTEM
// ====================

export interface EducationalModule {
  id: string;
  title: string;
  learningObjectives: string[];
  content: EducationalContent;
  assessments: Assessment[];
  interactiveElements: InteractiveElement[];
  completionCriteria: CompletionCriteria;
  personalization: PersonalizationData;
}

export interface EducationalContent {
  introduction: string;
  sections: ContentSection[];
  summary: string;
  resources: Resource[];
  references: Reference[];
}

export interface ContentSection {
  title: string;
  content: string;
  examples: Example[];
  exercises: Exercise[];
  media: MediaElement[];
}

export interface Assessment {
  id: string;
  type: "quiz" | "scenario" | "case_study" | "simulation";
  questions: Question[];
  passingScore: number;
  adaptive: boolean;
}

export interface Question {
  id: string;
  type: "multiple_choice" | "true_false" | "scenario" | "open_ended";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: number;
}

export interface InteractiveElement {
  id: string;
  type: "calculator" | "simulator" | "game" | "visualization";
  parameters: Record<string, any>;
  learningGoals: string[];
}

export interface CompletionCriteria {
  minimumScore: number;
  requiredSections: string[];
  timeRequirement?: number;
  practiceExercises: number;
}

export interface PersonalizationData {
  userProfile: UserProfile;
  adaptations: Adaptation[];
  progressTracking: ProgressData;
}

export interface UserProfile {
  financialLiteracyLevel: string;
  learningStyle: string;
  vulnerabilities: string[];
  strengths: string[];
  goals: string[];
}

export interface Adaptation {
  type: string;
  reason: string;
  modification: string;
  effectiveness: number;
}

export interface ProgressData {
  moduleProgress: ModuleProgress[];
  overallCompletion: number;
  skillsAcquired: string[];
  areasNeedingWork: string[];
}

export interface ModuleProgress {
  moduleId: string;
  completion: number;
  score: number;
  timeSpent: number;
  attempts: number;
}

// ====================
// LEGAL & REGULATORY
// ====================

export interface RegulatoryFramework {
  jurisdiction: string;
  regulations: Regulation[];
  loopholes: Loophole[];
  enforcement: EnforcementData;
  recentChanges: RegulatoryChange[];
}

export interface Regulation {
  id: string;
  name: string;
  description: string;
  requirements: Requirement[];
  penalties: Penalty[];
  exemptions: Exemption[];
  effectiveDate: Date;
}

export interface Requirement {
  type: string;
  description: string;
  applicability: string[];
  enforcementLevel: number;
}

export interface Penalty {
  violationType: string;
  penaltyRange: string;
  enforcementFrequency: number;
  precedentCases: string[];
}

export interface Exemption {
  type: string;
  conditions: string[];
  prevalence: number;
  abuse_potential: number;
}

export interface Loophole {
  id: string;
  name: string;
  mechanism: string;
  effectiveness: number;
  legalRisk: number;
  implementations: LoopholeImplementation[];
  countermeasures: Countermeasure[];
}

export interface LoopholeImplementation {
  description: string;
  example: string;
  statesUsing: string[];
  courtChallenges: CourtChallenge[];
}

export interface CourtChallenge {
  case: string;
  outcome: string;
  precedent: string;
  year: number;
}

export interface Countermeasure {
  type: string;
  description: string;
  effectiveness: number;
  implementationCost: number;
}

export interface EnforcementData {
  agency: string;
  enforcement_rate: number;
  typical_penalties: string[];
  recent_actions: EnforcementAction[];
}

export interface EnforcementAction {
  date: Date;
  company: string;
  violation: string;
  penalty: string;
  outcome: string;
}

export interface RegulatoryChange {
  date: Date;
  type:
    | "new_regulation"
    | "amendment"
    | "interpretation"
    | "enforcement_change";
  description: string;
  impact: string;
  industry_response: string;
}

// ====================
// CASE STUDIES
// ====================

export interface CaseStudy {
  id: string;
  title: string;
  type: "criminal" | "civil" | "regulatory" | "bankruptcy" | "class_action";
  jurisdiction: string;
  date: Date;
  parties: Party[];
  facts: CaseFacts;
  legalIssues: LegalIssue[];
  outcome: CaseOutcome;
  precedentValue: number;
  lessons: Lesson[];
}

export interface Party {
  name: string;
  role: "plaintiff" | "defendant" | "regulator" | "witness";
  description: string;
}

export interface CaseFacts {
  background: string;
  timeline: TimelineEvent[];
  key_documents: Document[];
  financial_impact: FinancialImpact;
}

export interface TimelineEvent {
  date: Date;
  event: string;
  significance: string;
}

export interface Document {
  type: string;
  description: string;
  significance: string;
  public_available: boolean;
}

export interface FinancialImpact {
  total_harm: number;
  affected_consumers: number;
  company_revenue: number;
  penalties_imposed: number;
  restitution_ordered: number;
}

export interface LegalIssue {
  issue: string;
  law_applied: string;
  arguments: Argument[];
  resolution: string;
}

export interface Argument {
  party: string;
  position: string;
  legal_basis: string;
  outcome: string;
}

export interface CaseOutcome {
  result: string;
  penalties: string[];
  injunctive_relief: string[];
  precedent_set: string;
  industry_impact: string;
}

export interface Lesson {
  category: string;
  lesson: string;
  application: string;
  prevention: string;
}

// ====================
// UTILITY TYPES
// ====================

export interface UserChoice {
  id: string;
  timestamp: Date;
  choice: string;
  context: string;
  manipulationPresent: boolean;
  autonomyImpact: "low" | "medium" | "high";
  coercionLevel: number;
  alternatives_presented: boolean;
  information_quality: "poor" | "adequate" | "good" | "excellent";
}

export interface Example {
  title: string;
  description: string;
  code?: string;
  media?: string;
  interactive?: boolean;
}

export interface Exercise {
  title: string;
  description: string;
  type: "practice" | "quiz" | "simulation";
  difficulty: number;
}

export interface MediaElement {
  type: "image" | "video" | "audio" | "animation";
  url: string;
  caption: string;
  accessibility: string;
}

export interface Resource {
  title: string;
  type: "website" | "document" | "video" | "tool";
  url: string;
  description: string;
}

export interface Reference {
  title: string;
  authors: string[];
  publication: string;
  year: number;
  url?: string;
}

// ====================
// COMPONENT PROPS
// ====================

export interface DarkPatternComponentProps {
  isEnabled: boolean;
  onInteraction: (event: ManipulationEvent) => void;
  severity: "low" | "medium" | "high";
  ghostMode?: boolean;
}

export interface BehavioralTrackerProps {
  onBehaviorUpdate: (metrics: BehavioralMetrics) => void;
  sensitivity: number;
  trackingEnabled: boolean;
}

export interface EducationalContentProps {
  module: EducationalModule;
  userProgress: ProgressData;
  onProgressUpdate: (progress: ModuleProgress) => void;
  personalized: boolean;
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
