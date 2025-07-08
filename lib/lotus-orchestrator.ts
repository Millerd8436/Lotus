/**
 * lotus-orchestrator.ts - Modern TypeScript Wrapper for Comprehensive Lotus System
 * Vercel-ready integration of the 96,000+ line legacy system
 * Provides type-safe interface for the 3-phase educational platform
 */

// Next.js types will be imported in API routes where needed

// Type definitions for the comprehensive system
export interface LotusConfig {
  apr: number;
  exploitFeeRate: number;
  ethicalFeeRate: number;
  daysToRepay: number;
  riskThreshold: number;
  maxRolloverCount: number;
  stateRules: Record<string, StateRule>;
  features: FeatureFlags;
  darkPatternConfig: DarkPatternConfig;
  educationalConfig: EducationalConfig;
}

export interface StateRule {
  maxAPR: number | "unlimited";
  minTermDays: number;
  allowRollover: boolean;
  maxLoanAmount: number | "unlimited";
  coolingPeriod: number;
  database: boolean;
}

export interface FeatureFlags {
  darkPatterns: boolean;
  ethicalMode: boolean;
  education: boolean;
  research: boolean;
  ghostMode: boolean;
  tracking: boolean;
  compliance: boolean;
  autonomyTheater: boolean;
  behavioralPsychology: boolean;
  legalLoopholes: boolean;
  rolloverTraps: boolean;
  debtCycleSimulation: boolean;
  kant: boolean;
  echo: boolean;
  reflectionDashboard: boolean;
}

export interface DarkPatternConfig {
  urgencyTimer: { enabled: boolean; duration: number };
  autoRenewal: { enabled: boolean; preChecked: boolean };
  feeObfuscation: { enabled: boolean; aprHidden: boolean };
  artificialScarcity: { enabled: boolean; slotsLeft: number };
  socialProof: { enabled: boolean; fakeActivity: boolean };
  lossAversion: { enabled: boolean; emphasizeDefaults: boolean };
  anchoring: { enabled: boolean; showHighAmount: boolean };
  confirmationBias: { enabled: boolean; validateChoices: boolean };
}

export interface EducationalConfig {
  quizRequired: boolean;
  comprehensionCheck: boolean;
  reflectionMandatory: boolean;
  ethicsAnalysis: boolean;
  behavioralInsights: boolean;
  legalEducation: boolean;
  financialLiteracy: boolean;
}

export interface ComprehensiveSessionState {
  sessionId: string;
  timestamp: string;
  currentPhase: "exploitative" | "ethical" | "reflection";

  // Loan details
  amount: number;
  termDays: number;
  state: string;
  fee: number;
  apr: number;
  rolloverCount: number;
  totalCost: number;

  // Tracking data
  darkPatterns: DarkPatternEvent[];
  complianceViolations: ComplianceViolation[];
  behavioralData: BehavioralEvent[];
  decisionPoints: DecisionPoint[];

  // Psychology & ethics
  coercionIndex: number;
  autonomyViolations: AutonomyViolation[];
  kantianAnalysis: KantianAnalysis | null;
  ethicsScore: number;

  // Educational progress
  educationalProgress: EducationalProgress[];
  learningOutcomes: LearningOutcome[];
  reflectionData: ReflectionData | null;

  // Research data
  researchConsent: boolean;
  anonymizedData: boolean;
}

export interface DarkPatternEvent {
  type: string;
  timestamp: string;
  phase: string;
  details: Record<string, any>;
  ethicalConcern: "low" | "medium" | "high" | "critical";
  userResponse?: any;
  effectiveness?: number;
}

export interface ComplianceViolation {
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  phase: string;
  regulatoryFramework: string[];
  potentialPenalty: number;
}

export interface BehavioralEvent {
  eventType: string;
  timestamp: string;
  phase: string;
  data: Record<string, any>;
  psychologicalIndicators: Record<string, string>;
  cognitiveState: CognitiveState;
}

export interface CognitiveState {
  system1_dominance: boolean;
  cognitive_load: number;
  decision_fatigue: number;
  stress_level: number;
  attention_level: number;
}

export interface DecisionPoint {
  type: string;
  timestamp: string;
  phase: string;
  details: Record<string, any>;
  timeToDecision: number | null;
  cognitiveLoad: number;
  pressureFactors: string[];
}

export interface AutonomyViolation {
  type: string;
  severity: string;
  description: string;
  timestamp: string;
}

export interface KantianAnalysis {
  universalizability: number;
  humanityPrinciple: number;
  autonomyRespect: number;
  moralWorth: number;
  categoricalImperative: boolean;
  ethicalAssessment: string;
}

export interface EducationalProgress {
  module: string;
  completion: number;
  comprehension: number;
  timestamp: string;
}

export interface LearningOutcome {
  objective: string;
  achieved: boolean;
  proficiency: number;
  evidence: string[];
}

export interface ReflectionData {
  phasesCompared: string[];
  insights: string[];
  behavioralChanges: string[];
  ethicalReflections: string[];
  futureCommitments: string[];
}

// Modern TypeScript Orchestrator Class
export class LotusOrchestratorModern {
  private static instance: LotusOrchestratorModern | null = null;
  private legacyOrchestrator: any = null;
  private sessions: Map<string, ComprehensiveSessionState> = new Map();
  private config: LotusConfig;

  constructor() {
    this.config = this.getDefaultConfig();
  }

  // Singleton pattern for production deployment
  static getInstance(): LotusOrchestratorModern {
    if (!LotusOrchestratorModern.instance) {
      LotusOrchestratorModern.instance = new LotusOrchestratorModern();
    }
    return LotusOrchestratorModern.instance;
  }

  // Initialize with dynamic imports (Vercel-friendly)
  async initialize(): Promise<void> {
    try {
      // Dynamic import to avoid SSR issues on Vercel
      const { LotusComprehensiveOrchestrator } = await import(
        "../legacy-recovered/lotus_orchestrator_comprehensive.js"
      );
      this.legacyOrchestrator = new LotusComprehensiveOrchestrator();

      console.log(
        "🌸 Modern Lotus Orchestrator initialized with legacy system",
      );
    } catch (error) {
      console.error("Failed to initialize legacy orchestrator:", error);
      // Fallback to basic functionality
      this.initializeFallbackMode();
    }
  }

  // Fallback mode for deployment safety
  private initializeFallbackMode(): void {
    console.log("🔄 Initializing fallback mode");
    this.legacyOrchestrator = {
      startComprehensiveSession: this.fallbackSession.bind(this),
      transitionPhase: this.fallbackTransition.bind(this),
      getCurrentMetrics: this.fallbackMetrics.bind(this),
    };
  }

  // Create a new comprehensive session
  async createSession(userInputs: {
    amount: number;
    termDays: number;
    state: string;
    researchConsent?: boolean;
  }): Promise<{ success: boolean; sessionId?: string; error?: string }> {
    try {
      if (!this.legacyOrchestrator) {
        await this.initialize();
      }

      const sessionId = `lotus_modern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create session state
      const sessionState: ComprehensiveSessionState = {
        sessionId,
        timestamp: new Date().toISOString(),
        currentPhase: "exploitative",
        amount: userInputs.amount,
        termDays: userInputs.termDays,
        state: userInputs.state,
        fee: 0,
        apr: 0,
        rolloverCount: 0,
        totalCost: 0,
        darkPatterns: [],
        complianceViolations: [],
        behavioralData: [],
        decisionPoints: [],
        coercionIndex: 0,
        autonomyViolations: [],
        kantianAnalysis: null,
        ethicsScore: 0,
        educationalProgress: [],
        learningOutcomes: [],
        reflectionData: null,
        researchConsent: userInputs.researchConsent || false,
        anonymizedData: true,
      };

      // Calculate initial loan terms
      this.calculateLoanTerms(sessionState);

      // Store session
      this.sessions.set(sessionId, sessionState);

      // Initialize with legacy system if available
      if (
        this.legacyOrchestrator &&
        typeof this.legacyOrchestrator.startComprehensiveSession === "function"
      ) {
        await this.legacyOrchestrator.startComprehensiveSession(userInputs);
      }

      return { success: true, sessionId };
    } catch (error) {
      console.error("Session creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Get session data
  getSession(sessionId: string): ComprehensiveSessionState | null {
    return this.sessions.get(sessionId) || null;
  }

  // Record dark pattern usage
  recordDarkPattern(
    sessionId: string,
    pattern: {
      type: string;
      details: Record<string, any>;
    },
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const darkPatternEvent: DarkPatternEvent = {
      type: pattern.type,
      timestamp: new Date().toISOString(),
      phase: session.currentPhase,
      details: pattern.details,
      ethicalConcern: this.assessEthicalConcern(pattern.type),
    };

    session.darkPatterns.push(darkPatternEvent);
    this.updateCoercionIndex(session, pattern.type);
  }

  // Record behavioral data
  recordBehavior(
    sessionId: string,
    behavior: {
      eventType: string;
      data: Record<string, any>;
    },
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const behavioralEvent: BehavioralEvent = {
      eventType: behavior.eventType,
      timestamp: new Date().toISOString(),
      phase: session.currentPhase,
      data: behavior.data,
      psychologicalIndicators: this.analyzePsychologicalIndicators(behavior),
      cognitiveState: this.assessCognitiveState(session),
    };

    session.behavioralData.push(behavioralEvent);
  }

  // Transition between phases
  async transitionPhase(
    sessionId: string,
    newPhase: "ethical" | "reflection",
  ): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    try {
      session.currentPhase = newPhase;
      this.calculateLoanTerms(session);

      // Record transition as decision point
      session.decisionPoints.push({
        type: "phase_transition",
        timestamp: new Date().toISOString(),
        phase: newPhase,
        details: { previousPhase: session.currentPhase },
        timeToDecision: null,
        cognitiveLoad: this.calculateCognitiveLoad(session),
        pressureFactors: this.identifyPressureFactors(session),
      });

      // Use legacy system for advanced transition logic
      if (
        this.legacyOrchestrator &&
        typeof this.legacyOrchestrator.transitionPhase === "function"
      ) {
        await this.legacyOrchestrator.transitionPhase(newPhase);
      }

      return true;
    } catch (error) {
      console.error("Phase transition failed:", error);
      return false;
    }
  }

  // Get comprehensive analytics
  getAnalytics(sessionId: string): Record<string, any> | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    return {
      session: {
        id: session.sessionId,
        phase: session.currentPhase,
        duration: Date.now() - new Date(session.timestamp).getTime(),
      },
      loan: {
        amount: session.amount,
        fee: session.fee,
        apr: session.apr,
        totalCost: session.totalCost,
        rolloverCount: session.rolloverCount,
      },
      psychology: {
        coercionIndex: session.coercionIndex,
        ethicsScore: session.ethicsScore,
        autonomyViolations: session.autonomyViolations.length,
        darkPatternExposure: session.darkPatterns.length,
      },
      compliance: {
        violations: session.complianceViolations.length,
        severityBreakdown: this.analyzeViolationSeverity(session),
        regulatoryRisk: this.calculateRegulatoryRisk(session),
      },
      education: {
        progress: session.educationalProgress,
        outcomes: session.learningOutcomes,
        completionRate: this.calculateEducationalCompletion(session),
      },
      research: {
        dataPoints:
          session.behavioralData.length + session.decisionPoints.length,
        consentStatus: session.researchConsent,
        anonymized: session.anonymizedData,
      },
    };
  }

  // Export session data for research
  exportSessionData(sessionId: string, format: "json" | "csv" = "json"): any {
    const session = this.sessions.get(sessionId);
    if (!session || !session.researchConsent) return null;

    const exportData = {
      metadata: {
        sessionId: session.sessionId,
        exportTimestamp: new Date().toISOString(),
        anonymized: session.anonymizedData,
        researchConsent: session.researchConsent,
      },
      analytics: this.getAnalytics(sessionId),
      anonymizedBehavioralData: this.anonymizeBehavioralData(session),
      educationalInsights: this.extractEducationalInsights(session),
      ethicsAnalysis: session.kantianAnalysis,
    };

    return format === "json" ? exportData : this.convertToCSV(exportData);
  }

  // Helper methods
  private getDefaultConfig(): LotusConfig {
    return {
      apr: 24.0,
      exploitFeeRate: 0.3,
      ethicalFeeRate: 0.05,
      daysToRepay: 14,
      riskThreshold: 1.5,
      maxRolloverCount: 8,
      stateRules: {
        CA: {
          maxAPR: 36,
          minTermDays: 31,
          allowRollover: false,
          maxLoanAmount: 300,
          coolingPeriod: 1,
          database: true,
        },
        NY: {
          maxAPR: 25,
          minTermDays: 30,
          allowRollover: false,
          maxLoanAmount: 500,
          coolingPeriod: 1,
          database: true,
        },
        TX: {
          maxAPR: 664,
          minTermDays: 7,
          allowRollover: true,
          maxLoanAmount: 1800,
          coolingPeriod: 0,
          database: false,
        },
        FL: {
          maxAPR: 304,
          minTermDays: 7,
          allowRollover: true,
          maxLoanAmount: 500,
          coolingPeriod: 0,
          database: false,
        },
        GEN: {
          maxAPR: 400,
          minTermDays: 14,
          allowRollover: true,
          maxLoanAmount: 1000,
          coolingPeriod: 0,
          database: false,
        },
      },
      features: {
        darkPatterns: true,
        ethicalMode: true,
        education: true,
        research: true,
        ghostMode: true,
        tracking: true,
        compliance: true,
        autonomyTheater: true,
        behavioralPsychology: true,
        legalLoopholes: true,
        rolloverTraps: true,
        debtCycleSimulation: true,
        kant: true,
        echo: true,
        reflectionDashboard: true,
      },
      darkPatternConfig: {
        urgencyTimer: { enabled: true, duration: 300 },
        autoRenewal: { enabled: true, preChecked: true },
        feeObfuscation: { enabled: true, aprHidden: true },
        artificialScarcity: { enabled: true, slotsLeft: 3 },
        socialProof: { enabled: true, fakeActivity: true },
        lossAversion: { enabled: true, emphasizeDefaults: true },
        anchoring: { enabled: true, showHighAmount: true },
        confirmationBias: { enabled: true, validateChoices: true },
      },
      educationalConfig: {
        quizRequired: true,
        comprehensionCheck: true,
        reflectionMandatory: true,
        ethicsAnalysis: true,
        behavioralInsights: true,
        legalEducation: true,
        financialLiteracy: true,
      },
    };
  }

  private calculateLoanTerms(session: ComprehensiveSessionState): void {
    const phaseConfig = this.getPhaseConfig(session.currentPhase);
    session.fee = session.amount * phaseConfig.feeRate;
    session.apr = this.calculateAPR(
      session.amount,
      session.fee,
      session.termDays,
    );
    session.totalCost = session.amount + session.fee;
  }

  private getPhaseConfig(phase: string): { feeRate: number } {
    const phases = {
      exploitative: { feeRate: this.config.exploitFeeRate },
      ethical: { feeRate: this.config.ethicalFeeRate },
      reflection: { feeRate: this.config.ethicalFeeRate },
    };
    return phases[phase as keyof typeof phases] || phases["exploitative"];
  }

  private calculateAPR(
    principal: number,
    fee: number,
    termDays: number,
  ): number {
    return principal > 0 && termDays > 0
      ? (fee / principal) * (365 / termDays) * 100
      : 0;
  }

  private assessEthicalConcern(
    patternType: string,
  ): "low" | "medium" | "high" | "critical" {
    const concernLevels: Record<
      string,
      "low" | "medium" | "high" | "critical"
    > = {
      urgency_timer: "high",
      auto_renewal: "critical",
      fee_obfuscation: "critical",
      artificial_scarcity: "high",
      social_proof: "medium",
      anchoring: "medium",
    };
    return concernLevels[patternType] || "medium";
  }

  private updateCoercionIndex(
    session: ComprehensiveSessionState,
    patternType: string,
  ): void {
    const weights = {
      urgency_timer: 15,
      auto_renewal: 25,
      fee_obfuscation: 30,
      artificial_scarcity: 20,
      social_proof: 10,
      anchoring: 15,
    };
    const increase = weights[patternType as keyof typeof weights] || 10;
    session.coercionIndex = Math.min(100, session.coercionIndex + increase);
  }

  private analyzePsychologicalIndicators(
    behavior: any,
  ): Record<string, string> {
    // Simplified analysis - full version would use the behavioral psychology engine
    const indicators: Record<string, string> = {};

    if (behavior.eventType === "mouse_movement" && behavior.data.erratic) {
      indicators.stress = "high";
    }
    if (behavior.eventType === "form_interaction" && behavior.data.hesitation) {
      indicators.uncertainty = "medium";
    }

    return indicators;
  }

  private assessCognitiveState(
    session: ComprehensiveSessionState,
  ): CognitiveState {
    return {
      system1_dominance: session.darkPatterns.length > 3,
      cognitive_load: this.calculateCognitiveLoad(session),
      decision_fatigue: Math.min(session.decisionPoints.length * 10, 100),
      stress_level: Math.min(session.coercionIndex, 100),
      attention_level: Math.max(100 - session.coercionIndex, 0),
    };
  }

  private calculateCognitiveLoad(session: ComprehensiveSessionState): number {
    let load = 0;
    load += Math.min(session.amount / 100, 10);
    load +=
      session.darkPatterns.filter(
        (p) => Date.now() - new Date(p.timestamp).getTime() < 300000,
      ).length * 5;
    load += Math.min(session.decisionPoints.length * 2, 20);
    return Math.min(load, 100);
  }

  private identifyPressureFactors(
    session: ComprehensiveSessionState,
  ): string[] {
    const factors: string[] = [];

    const recentPatterns = session.darkPatterns.filter(
      (p) => Date.now() - new Date(p.timestamp).getTime() < 300000,
    );

    if (recentPatterns.some((p) => p.type === "urgency_timer"))
      factors.push("time_pressure");
    if (recentPatterns.some((p) => p.type === "artificial_scarcity"))
      factors.push("scarcity_pressure");
    if (session.rolloverCount > 0) factors.push("debt_pressure");
    if (session.coercionIndex > 50) factors.push("high_coercion");

    return factors;
  }

  private analyzeViolationSeverity(
    session: ComprehensiveSessionState,
  ): Record<string, number> {
    const breakdown = { low: 0, medium: 0, high: 0, critical: 0 };
    session.complianceViolations.forEach((v) => {
      breakdown[v.severity]++;
    });
    return breakdown;
  }

  private calculateRegulatoryRisk(session: ComprehensiveSessionState): number {
    const violations = session.complianceViolations;
    let risk = 0;
    violations.forEach((v) => {
      const weights = { low: 1, medium: 3, high: 7, critical: 15 };
      risk += weights[v.severity];
    });
    return Math.min(risk, 100);
  }

  private calculateEducationalCompletion(
    session: ComprehensiveSessionState,
  ): number {
    if (session.educationalProgress.length === 0) return 0;
    const totalCompletion = session.educationalProgress.reduce(
      (sum, p) => sum + p.completion,
      0,
    );
    return totalCompletion / session.educationalProgress.length;
  }

  private anonymizeBehavioralData(session: ComprehensiveSessionState): any[] {
    return session.behavioralData.map((event) => ({
      eventType: event.eventType,
      timestamp: event.timestamp,
      phase: event.phase,
      psychologicalIndicators: event.psychologicalIndicators,
      cognitiveState: event.cognitiveState,
      // Exclude any potentially identifying data
    }));
  }

  private extractEducationalInsights(session: ComprehensiveSessionState): any {
    return {
      progressMetrics: session.educationalProgress,
      learningOutcomes: session.learningOutcomes,
      behavioralChanges: this.analyzeBehavioralChanges(session),
      ethicalDevelopment: this.analyzeEthicalDevelopment(session),
    };
  }

  private analyzeBehavioralChanges(session: ComprehensiveSessionState): any {
    // Analyze changes in behavior across phases
    const phases = ["exploitative", "ethical", "reflection"];
    const changes: Record<string, any> = {};

    phases.forEach((phase) => {
      const phaseData = session.behavioralData.filter((b) => b.phase === phase);
      changes[phase] = {
        eventCount: phaseData.length,
        avgCognitiveLoad:
          phaseData.reduce(
            (sum, b) => sum + b.cognitiveState.cognitive_load,
            0,
          ) / phaseData.length || 0,
        stressIndicators: phaseData.filter(
          (b) => b.psychologicalIndicators.stress === "high",
        ).length,
      };
    });

    return changes;
  }

  private analyzeEthicalDevelopment(session: ComprehensiveSessionState): any {
    return {
      initialEthicsScore: 0, // Would be calculated from first phase
      finalEthicsScore: session.ethicsScore,
      kantianCompliance:
        session.kantianAnalysis?.categoricalImperative || false,
      autonomyRespect: session.kantianAnalysis?.autonomyRespect || 0,
      ethicalGrowth: session.ethicsScore, // Simplified calculation
    };
  }

  private convertToCSV(data: any): string {
    // Basic CSV conversion - would need full implementation
    return JSON.stringify(data);
  }

  // Fallback methods for when legacy system isn't available
  private async fallbackSession(userInputs: any): Promise<any> {
    console.log("🔄 Using fallback session creation");
    return { success: true, sessionId: `fallback_${Date.now()}` };
  }

  private async fallbackTransition(phase: string): Promise<any> {
    console.log(`🔄 Using fallback phase transition to ${phase}`);
    return { success: true };
  }

  private fallbackMetrics(): any {
    return {
      coercionIndex: 0,
      ethicsScore: 100,
      darkPatternCount: 0,
      message: "Fallback mode - basic metrics only",
    };
  }
}

// Export singleton instance
export const lotusOrchestrator = LotusOrchestratorModern.getInstance();
