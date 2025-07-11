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
