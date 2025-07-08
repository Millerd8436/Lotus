// Core Lotus Types for Comprehensive 3-Phase System
// Re-exports from advanced type system for comprehensive 96,000+ line codebase

export * from "./advanced-lotus";

// Legacy compatibility types (maintained for backward compatibility)
export interface LotusSession {
  id: string;
  startTime: Date;
  currentPhase: 1 | 2 | 3;
  exploitativeData: ExploitativePhaseData | null;
  ethicalData: EthicalPhaseData | null;
  analysisData: AnalysisPhaseData | null;
  userChoices: UserChoice[];
  coercionIndex: number;
  autonomyViolations: AutonomyViolation[];
  trapEngineState: TrapEngineState;

  // Enhanced 3-phase tracking
  darkPatterns?: DarkPatternEvent[];
  amount?: number;
  state?: string;
  fee?: number;
  apr?: number;
  totalCost?: number;
  termDays?: number;
  rolloverCount?: number;
  mode?: "exploitative" | "ethical";
  createdAt?: string;
}

export interface ExploitativePhaseData {
  loanAmount: number;
  state: string;
  rolloverCount: number;
  totalFeesAccumulated: number;
  aprExposed: number;
  manipulationTacticsUsed: string[];
  timeUnderPressure: number;
  autoRenewalAccepted: boolean;
  achDebitAuthorized: boolean;
  upsellsPresented: UpsellOffer[];
  debtTrapEngaged: boolean;
}

export interface EthicalPhaseData {
  loanAmount: number;
  state: string;
  transparentAPR: number;
  explicitConsentGiven: string[];
  ethicalTermsAccepted: boolean;
  comparisonShown: boolean;
  educationalModulesCompleted: string[];
  ethicalScore: number;
}

export interface AnalysisPhaseData {
  coercionIndex: number;
  behavioralMirror: BehavioralMirror;
  choiceHeatmap: ChoiceHeatmapSlot[];
  autonomyReport: AutonomyReport;
  kantianAnalysis: KantianEthicsAnalysis;
  educationalQuizzes: QuizResult[];
  ethicalScorecard: EthicalScorecard;
  recommendationsGenerated: string[];
}

export interface UserChoice {
  type: string;
  data: any;
  timestamp: string;
  phase: number;
  timeFromStart: number;
  manipulationPresent: boolean;
  autonomyImpact: "low" | "medium" | "high";
  coercionLevel: number;
}

export interface AutonomyViolation {
  type: string;
  description: string;
  severity: "low" | "medium" | "medium-high" | "high";
  kantianViolation: string;
  timestamp: string;
  hiddenFromUser: boolean;

  // Enhanced 3-phase tracking
  phase?: 1 | 2 | 3;
  coercionLevel?: number;
}

export interface TrapEngineState {
  activeTraps: Map<string, boolean>;
  ghostModeEnabled: boolean;
  exploitationLevel: number;
  coercionIndex: number;
  rolloverTraps: RolloverTrap[];
  achExploitationActive: boolean;
  upsellEngineState: UpsellEngineState;
  usurySkirterActive: LoopholeStrategy;
}

export interface RolloverTrap {
  trigger: string;
  message: string;
  coercionLevel: "medium" | "high" | "extreme" | "predatory";
  psychologyUsed: string;
  successRate: number;
}

export interface UpsellEngineState {
  loanCount: number;
  qualificationLevel: string;
  upsellTriggers: UpsellTrigger[];
  congratulationMessages: string[];
}

export interface UpsellTrigger {
  trigger: string;
  amount: number;
  requiredRollovers: number;
}

export interface UpsellOffer {
  amount: number;
  message: string;
  accepted: boolean;
  coercionTacticsUsed: string[];
  timestamp: string;
}

export interface LoopholeStrategy {
  currentLoophole: "flatFee" | "csoBrokerage" | "tribalCharter" | "rentABank";
  legalJustification: string;
  stateApplicable: string[];
  aprBypass: number;
}

export interface BehavioralMirror {
  choiceHeatmap: ChoiceHeatmapSlot[];
  invisibleTraps: InvisibleTrap[];
  fakeToggles: FakeToggle[];
  buriedDisclosures: BuriedDisclosure[];
  youThoughtYouChose: ChoiceIllusion[];
  coercionTimeline: CoercionTimelineEvent[];
  autonomyViolationSummary: AutonomyViolationSummary;
}

export interface ChoiceHeatmapSlot {
  timeSlot: number;
  manipulationIntensity: number;
  violationTypes: string[];
  violationCount: number;
  highSeverityCount: number;
}

export interface InvisibleTrap {
  trap: string;
  description: string;
  hiddenness: number;
  userLikelyNoticed: boolean;
  severity: string;
  kantianViolation: string;
}

export interface FakeToggle {
  element: string;
  appearance: string;
  reality: string;
  coercionLevel: string;
  autonomyImpact: string;
}

export interface BuriedDisclosure {
  disclosure: string;
  buriedMethod: string;
  shouldHaveBeen: string;
  ethicalViolation: string;
  severity: string;
}

export interface ChoiceIllusion {
  userThought: string;
  reality: string;
  manipulation: string;
  autonomyImpact: string;
}

export interface CoercionTimelineEvent {
  event: string;
  timestamp: string;
  cumulativeCoercionScore: number;
  autonomyImpact: string;
}

export interface AutonomyViolationSummary {
  totalViolations: number;
  violationsByType: Record<string, number>;
  violationsBySeverity: Record<string, number>;
  mostCommonViolation: string;
  averageSeverityScore: number;
  kantianEthicsAssessment: KantianEthicsAnalysis;
}

export interface AutonomyReport {
  choiceIntegrityScore: number;
  violations: AutonomyViolation[];
  activeTrapTypes: string[];
  timeline: TimelineEvent[];
  ethicalAssessment: string;
  autonomyViolationSummary: AutonomyViolationSummary;
}

export interface TimelineEvent {
  event: string;
  timestamp: string;
  choiceIntegrityScore?: number;
  offerId?: string;
  duration?: number;
  autonomyImpact?: string;
}

export interface KantianEthicsAnalysis {
  universalizabilityTest: "PASSED" | "FAILED";
  humanityFormula: "PASSED" | "FAILED";
  autonomyFormula: "PASSED" | "FAILED";
  overallAssessment: "ETHICALLY_SOUND" | "ETHICALLY_PROBLEMATIC";
  ethicalScore: number;
}

export interface EthicalScorecard {
  autonomyRespect: number;
  transparencyScore: number;
  consentValidityScore: number;
  informationIntegrityScore: number;
  fairnessScore: number;
  overallEthicalGrade: "A" | "B" | "C" | "D" | "F";
  averageScore: number;
  ethicalStatus: "ETHICAL" | "QUESTIONABLE" | "UNETHICAL";
}

export interface QuizResult {
  moduleId: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
}

export interface EducationalModule {
  title: string;
  concepts: string[];
  quiz: Quiz;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface StateRegulation {
  maxAPR: number;
  minTermDays: number;
  allowRollover: boolean;
  description: string;
}

export interface LoanCalculation {
  principal: number;
  termDays: number;
  fee: number;
  apr: number;
  loopholeUsed?: string;
  legalWorkaround?: string;
  timestamp: string;
}

// API Types for Vercel Backend
export interface LotusAPIRequest {
  sessionId: string;
  action: "calculate-loan" | "track-choice" | "get-analysis" | "complete-phase";
  data: any;
}

export interface LotusAPIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Component Props Types
export interface LotusSimulatorProps {
  session: LotusSession;
  onSessionUpdate: (session: LotusSession) => void;
}

export interface PhaseComponentProps {
  session: LotusSession;
  onPhaseComplete: (phaseData: any) => void;
  onChoiceTracked: (choice: UserChoice) => void;
}

// Enhanced dark pattern tracking for 3-phase system
export interface DarkPatternEvent {
  type: string;
  timestamp: string;
  phase: 1 | 2 | 3;
  severity: "low" | "medium" | "high" | "critical";
  details?: any;
}
