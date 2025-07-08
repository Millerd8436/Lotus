/**
 * comprehensive-integration.ts - Vercel-Ready Integration Layer
 * Integrates all 96,000+ line legacy systems into modern Next.js/TypeScript
 * Comprehensive 3-Phase System: Exploitative → Ethical → Reflection
 */

// Import comprehensive orchestrator
import { LotusComprehensiveOrchestrator } from "../legacy-recovered/lotus_orchestrator_comprehensive.js";
import { ComprehensiveEthicsEngine } from "../legacy-recovered/ethics_engine_comprehensive.js";

// Import core system
import {
  LoanSession,
  Config,
} from "../legacy-recovered/lotus_core_comprehensive.js";

// Import all advanced engines
import { BehavioralPsychologyEngine } from "../legacy-recovered/behavioral-psychology-engine.js";
import { DarkPatternEngine } from "../legacy-recovered/advanced-dark-pattern-engine.js";
import { evaluateConsent } from "../legacy-recovered/kant.js";
import { Echo } from "../legacy-recovered/echo.js";
import { ResearchAnalytics } from "../legacy-recovered/research_analytics.js";

// Import existing lib modules
import {
  PsychologicalManipulationEngine,
  RealTimeManipulationTracker,
  KantianEthicsAnalyzer,
} from "../lib/behavioral-analysis.js";
import { LegalLoopholeEngine } from "../lib/legal-loopholes.js";
import { RolloverTrapEngine } from "../lib/rollover-traps.js";
import { EducationalContentEngine } from "../lib/educational-content.js";
import { RegulatoryComplianceEngine } from "../lib/regulatory-compliance.js";

// Import utility functions
import { formatCurrency, formatPercentage, calculateAPR } from "../utils";

// TypeScript interfaces for the comprehensive system
export interface ComprehensiveSessionData {
  sessionId: string;
  orchestrator: LotusComprehensiveOrchestrator;
  ethicsEngine: ComprehensiveEthicsEngine;
  behavioralEngine: BehavioralPsychologyEngine;
  darkPatternEngine: DarkPatternEngine;
  coreSession: LoanSession;
  realTimeMetrics: RealTimeMetrics;
  phaseData: PhaseData;
  educationalState: EducationalState;
  researchContributions: ResearchContributions;
}

export interface RealTimeMetrics {
  autonomyScore: number;
  coercionIndex: number;
  manipulationExposure: number;
  ethicsViolations: number;
  learningProgress: number;
  behavioralInsights: BehavioralInsight[];
  kantianCompliance: number;
  regulatoryViolations: RegulatoryViolation[];
}

export interface PhaseData {
  currentPhase: "exploitative" | "ethical" | "reflection";
  phaseProgress: number;
  transitionTriggers: TransitionTrigger[];
  completionCriteria: CompletionCriteria;
  userReadiness: UserReadiness;
  educationalInterventions: EducationalIntervention[];
}

export interface EducationalState {
  modulesCompleted: string[];
  currentModule: string | null;
  personalizedContent: PersonalizedContent[];
  comprehensionLevel: number;
  learningObjectives: LearningObjective[];
  skillsAcquired: string[];
}

export interface ResearchContributions {
  anonymizedData: any;
  behavioralPatterns: BehavioralPattern[];
  manipulationEffectiveness: ManipulationEffectiveness[];
  educationalInsights: EducationalInsight[];
  academicValue: AcademicValue;
}

export interface BehavioralInsight {
  type: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  phase: string;
  interventionRecommended: boolean;
}

export interface TransitionTrigger {
  triggerType: string;
  condition: any;
  met: boolean;
  weight: number;
  description: string;
}

export interface CompletionCriteria {
  manipulationExposure: { required: number; current: number; met: boolean };
  keyDecisions: { required: number; current: number; met: boolean };
  timeSpent: { required: number; current: number; met: boolean };
  comprehensionLevel: { required: number; current: number; met: boolean };
}

export interface UserReadiness {
  behavioralReadiness: boolean;
  cognitiveReadiness: boolean;
  educationalReadiness: boolean;
  overallReadiness: boolean;
  readinessScore: number;
}

export interface EducationalIntervention {
  type: "overlay" | "modal" | "inline" | "contextual";
  trigger: string;
  content: any;
  effectiveness: number;
  timestamp: string;
}

export interface PersonalizedContent {
  contentType: string;
  targetVulnerability: string;
  deliveryMethod: string;
  content: any;
  effectiveness: number;
}

export interface LearningObjective {
  objective: string;
  progress: number;
  completed: boolean;
  assessmentResults: any[];
}

export interface BehavioralPattern {
  pattern: string;
  frequency: number;
  context: string;
  predictability: number;
  exploitationPotential: number;
}

export interface ManipulationEffectiveness {
  technique: string;
  userProfile: string;
  effectiveness: number;
  resistance: number;
  context: string;
}

export interface EducationalInsight {
  insight: string;
  evidence: any;
  applicability: string;
  researchValue: number;
}

export interface AcademicValue {
  novelty: number;
  significance: number;
  methodology: number;
  reproducibility: number;
  overallScore: number;
}

export interface RegulatoryViolation {
  regulation: string;
  jurisdiction: string;
  severity: "minor" | "major" | "criminal";
  description: string;
  penalty: string;
  consumerHarm: string;
}

/**
 * ComprehensiveIntegration - Main class for integrating all systems
 */
export class ComprehensiveIntegration {
  private orchestrator: LotusComprehensiveOrchestrator | null = null;
  private sessions: Map<string, ComprehensiveSessionData> = new Map();
  private globalMetrics: any = {};
  private config: Config;

  constructor() {
    this.config = new Config();
    this.initializeGlobalSystems();
  }

  /**
   * Initialize global systems that persist across sessions
   */
  private initializeGlobalSystems() {
    // Initialize global research analytics
    this.globalMetrics = {
      totalSessions: 0,
      aggregateInsights: [],
      systemPerformance: {},
      educationalEffectiveness: {},
    };
  }

  /**
   * Start a comprehensive 3-phase session
   */
  async startComprehensiveSession(userInputs: {
    amount: number;
    termDays: number;
    state: string;
    userProfile?: any;
    researchConsent?: boolean;
  }): Promise<ComprehensiveSessionData> {
    try {
      // Create session ID
      const sessionId = `lotus_comprehensive_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Initialize orchestrator for this session
      const orchestrator = new LotusComprehensiveOrchestrator();

      // Start comprehensive session through orchestrator
      const sessionResult = await orchestrator.startComprehensiveSession(
        userInputs,
        "full",
      );

      if (!sessionResult.success) {
        throw new Error(
          `Session initialization failed: ${sessionResult.error}`,
        );
      }

      // Get the core session from orchestrator
      const coreSession = orchestrator.currentSession;

      // Initialize all engines
      const ethicsEngine = new ComprehensiveEthicsEngine(coreSession, null);
      const behavioralEngine = new BehavioralPsychologyEngine(
        new Echo(),
        coreSession,
      );
      const darkPatternEngine = new DarkPatternEngine();

      await behavioralEngine.initialize();
      await darkPatternEngine.initialize(coreSession);

      // Create comprehensive session data
      const sessionData: ComprehensiveSessionData = {
        sessionId,
        orchestrator,
        ethicsEngine,
        behavioralEngine,
        darkPatternEngine,
        coreSession,
        realTimeMetrics: {
          autonomyScore: 100,
          coercionIndex: 0,
          manipulationExposure: 0,
          ethicsViolations: 0,
          learningProgress: 0,
          behavioralInsights: [],
          kantianCompliance: 100,
          regulatoryViolations: [],
        },
        phaseData: {
          currentPhase: "exploitative",
          phaseProgress: 0,
          transitionTriggers: this.initializeTransitionTriggers(),
          completionCriteria: this.initializeCompletionCriteria(),
          userReadiness: {
            behavioralReadiness: false,
            cognitiveReadiness: false,
            educationalReadiness: false,
            overallReadiness: false,
            readinessScore: 0,
          },
          educationalInterventions: [],
        },
        educationalState: {
          modulesCompleted: [],
          currentModule: null,
          personalizedContent: [],
          comprehensionLevel: 0,
          learningObjectives: this.initializeLearningObjectives(),
          skillsAcquired: [],
        },
        researchContributions: {
          anonymizedData: {},
          behavioralPatterns: [],
          manipulationEffectiveness: [],
          educationalInsights: [],
          academicValue: {
            novelty: 0,
            significance: 0,
            methodology: 0,
            reproducibility: 0,
            overallScore: 0,
          },
        },
      };

      // Store session
      this.sessions.set(sessionId, sessionData);

      // Start real-time monitoring
      this.startRealTimeMonitoring(sessionData);

      console.log(
        `🌸 Comprehensive session ${sessionId} initialized successfully`,
      );

      return sessionData;
    } catch (error) {
      console.error("Failed to start comprehensive session:", error);
      throw error;
    }
  }

  /**
   * Handle user interaction with comprehensive tracking
   */
  async handleUserInteraction(
    sessionId: string,
    interactionType: string,
    interactionData: any,
  ): Promise<{
    success: boolean;
    updates: any;
    interventions: EducationalIntervention[];
    phaseTransition?: { newPhase: string; reason: string };
  }> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      // Process interaction through all engines
      const behavioralAnalysis =
        await session.behavioralEngine.processInteraction(
          interactionType,
          interactionData,
        );
      const ethicsAnalysis = session.ethicsEngine.analyzeUIInteraction(
        interactionType,
        interactionData,
      );
      const darkPatternAnalysis = session.darkPatternEngine.analyzeInteraction(
        interactionType,
        interactionData,
      );

      // Update real-time metrics
      this.updateRealTimeMetrics(session, {
        behavioral: behavioralAnalysis,
        ethics: ethicsAnalysis,
        darkPattern: darkPatternAnalysis,
      });

      // Check for educational interventions
      const interventions = this.checkEducationalInterventions(session, {
        behavioral: behavioralAnalysis,
        ethics: ethicsAnalysis,
        darkPattern: darkPatternAnalysis,
      });

      // Check for phase transition
      const phaseTransition = this.checkPhaseTransition(session);

      // Update session state
      this.updateSessionState(session, {
        interaction: { type: interactionType, data: interactionData },
        analyses: {
          behavioral: behavioralAnalysis,
          ethics: ethicsAnalysis,
          darkPattern: darkPatternAnalysis,
        },
        interventions,
        phaseTransition,
      });

      return {
        success: true,
        updates: {
          realTimeMetrics: session.realTimeMetrics,
          phaseData: session.phaseData,
          educationalState: session.educationalState,
        },
        interventions,
        phaseTransition,
      };
    } catch (error) {
      console.error(
        `Error handling interaction for session ${sessionId}:`,
        error,
      );
      return {
        success: false,
        updates: {},
        interventions: [],
      };
    }
  }

  /**
   * Generate comprehensive analysis report
   */
  async generateComprehensiveReport(sessionId: string): Promise<any> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      // Generate reports from all engines
      const orchestratorReport =
        await session.orchestrator.generateFinalComprehensiveReport();
      const ethicsReport =
        session.ethicsEngine.generateComprehensiveEthicsReport();
      const behavioralReport =
        session.behavioralEngine.generateComprehensiveReport();
      const darkPatternReport =
        session.darkPatternEngine.generateExposureAnalysis();
      const kantianReport = evaluateConsent(session.coreSession);

      // Integrate all reports
      const comprehensiveReport = {
        sessionOverview: {
          sessionId: session.sessionId,
          duration:
            Date.now() - new Date(session.coreSession.timestamp).getTime(),
          phasesCompleted: session.coreSession.phasesCompleted || [],
          overallScore: this.calculateOverallScore(session),
        },

        realTimeMetrics: session.realTimeMetrics,

        engineReports: {
          orchestrator: orchestratorReport,
          ethics: ethicsReport,
          behavioral: behavioralReport,
          darkPattern: darkPatternReport,
          kantian: kantianReport,
        },

        educationalOutcomes: {
          learningObjectivesAchieved: this.assessLearningObjectives(session),
          skillsDeveloped: session.educationalState.skillsAcquired,
          comprehensionImprovement: session.educationalState.comprehensionLevel,
          personalizedRecommendations:
            this.generatePersonalizedRecommendations(session),
        },

        researchContributions: session.researchContributions,

        vercelReadyData: {
          deploymentMetrics: this.generateDeploymentMetrics(session),
          performanceInsights: this.generatePerformanceInsights(session),
          scalabilityRecommendations:
            this.generateScalabilityRecommendations(session),
        },
      };

      return comprehensiveReport;
    } catch (error) {
      console.error(
        `Error generating comprehensive report for session ${sessionId}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Export session data for Vercel deployment
   */
  exportForVercel(sessionId: string): any {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    return {
      sessionData: {
        id: session.sessionId,
        metrics: session.realTimeMetrics,
        phaseData: session.phaseData,
        educationalState: session.educationalState,
      },
      apiEndpoints: this.generateAPIEndpoints(session),
      staticAssets: this.generateStaticAssets(session),
      environmentConfig: this.generateEnvironmentConfig(session),
    };
  }

  // Private helper methods
  private initializeTransitionTriggers(): TransitionTrigger[] {
    return [
      {
        triggerType: "manipulation_exposure",
        condition: { threshold: 5 },
        met: false,
        weight: 0.3,
        description: "User has experienced sufficient manipulation tactics",
      },
      {
        triggerType: "key_decisions",
        condition: { threshold: 3 },
        met: false,
        weight: 0.25,
        description: "User has made key financial decisions",
      },
      {
        triggerType: "time_spent",
        condition: { threshold: 300000 }, // 5 minutes
        met: false,
        weight: 0.2,
        description: "Sufficient time spent in current phase",
      },
      {
        triggerType: "behavioral_readiness",
        condition: { threshold: 0.7 },
        met: false,
        weight: 0.25,
        description: "User shows behavioral readiness for transition",
      },
    ];
  }

  private initializeCompletionCriteria(): CompletionCriteria {
    return {
      manipulationExposure: { required: 5, current: 0, met: false },
      keyDecisions: { required: 3, current: 0, met: false },
      timeSpent: { required: 300000, current: 0, met: false },
      comprehensionLevel: { required: 70, current: 0, met: false },
    };
  }

  private initializeLearningObjectives(): LearningObjective[] {
    return [
      {
        objective: "Recognize dark patterns in financial interfaces",
        progress: 0,
        completed: false,
        assessmentResults: [],
      },
      {
        objective: "Understand autonomy and informed consent",
        progress: 0,
        completed: false,
        assessmentResults: [],
      },
      {
        objective: "Identify regulatory loopholes and protections",
        progress: 0,
        completed: false,
        assessmentResults: [],
      },
      {
        objective: "Develop resistance to manipulation techniques",
        progress: 0,
        completed: false,
        assessmentResults: [],
      },
    ];
  }

  private startRealTimeMonitoring(session: ComprehensiveSessionData): void {
    // Set up real-time monitoring interval
    const monitoringInterval = setInterval(() => {
      this.updateRealTimeMetricsFromEngines(session);
    }, 1000); // Update every second

    // Store interval for cleanup
    (session as any).monitoringInterval = monitoringInterval;
  }

  private updateRealTimeMetrics(
    session: ComprehensiveSessionData,
    analyses: any,
  ): void {
    // Update metrics based on latest analyses
    if (analyses.ethics) {
      session.realTimeMetrics.autonomyScore =
        analyses.ethics.autonomyScore || session.realTimeMetrics.autonomyScore;
      session.realTimeMetrics.ethicsViolations =
        analyses.ethics.violationsCount ||
        session.realTimeMetrics.ethicsViolations;
    }

    if (analyses.behavioral) {
      session.realTimeMetrics.coercionIndex =
        analyses.behavioral.coercionLevel ||
        session.realTimeMetrics.coercionIndex;
    }

    if (analyses.darkPattern) {
      session.realTimeMetrics.manipulationExposure =
        analyses.darkPattern.exposureCount ||
        session.realTimeMetrics.manipulationExposure;
    }
  }

  private updateRealTimeMetricsFromEngines(
    session: ComprehensiveSessionData,
  ): void {
    try {
      // Get latest metrics from engines
      const ethicsMetrics = session.ethicsEngine.generateEthicsSnapshot();
      const behavioralMetrics = session.behavioralEngine.getCurrentMetrics();
      const darkPatternMetrics = session.darkPatternEngine.getCurrentExposure();

      // Update session metrics
      session.realTimeMetrics = {
        ...session.realTimeMetrics,
        autonomyScore: ethicsMetrics.autonomyScore,
        coercionIndex: behavioralMetrics.coercionIndex,
        manipulationExposure: darkPatternMetrics.totalExposure,
        ethicsViolations: ethicsMetrics.violationsCount,
        kantianCompliance: ethicsMetrics.kantianCompliance,
      };
    } catch (error) {
      console.error("Error updating real-time metrics:", error);
    }
  }

  private checkEducationalInterventions(
    session: ComprehensiveSessionData,
    analyses: any,
  ): EducationalIntervention[] {
    const interventions: EducationalIntervention[] = [];

    // Check if ethics violations warrant intervention
    if (analyses.ethics && analyses.ethics.violationsCount > 2) {
      interventions.push({
        type: "overlay",
        trigger: "ethics_violations",
        content: {
          title: "Ethical Concerns Detected",
          message: "Multiple autonomy violations have been identified.",
          educationalPoints: [
            "Your decision-making autonomy is being compromised",
            "Consider the ethical implications of these practices",
          ],
        },
        effectiveness: 0,
        timestamp: new Date().toISOString(),
      });
    }

    // Check if behavioral patterns indicate vulnerability
    if (analyses.behavioral && analyses.behavioral.vulnerabilityScore > 0.7) {
      interventions.push({
        type: "contextual",
        trigger: "high_vulnerability",
        content: {
          title: "Vulnerability Alert",
          message:
            "Your behavioral patterns suggest increased susceptibility to manipulation.",
          protectionAdvice: [
            "Take time to consider decisions carefully",
            "Seek alternative perspectives",
          ],
        },
        effectiveness: 0,
        timestamp: new Date().toISOString(),
      });
    }

    return interventions;
  }

  private checkPhaseTransition(
    session: ComprehensiveSessionData,
  ): { newPhase: string; reason: string } | undefined {
    // Check transition triggers
    const readinessScore = this.calculateTransitionReadiness(session);

    if (readinessScore >= 0.8) {
      const currentPhase = session.phaseData.currentPhase;

      if (currentPhase === "exploitative") {
        return {
          newPhase: "ethical",
          reason: "exploitation_learning_complete",
        };
      } else if (currentPhase === "ethical") {
        return {
          newPhase: "reflection",
          reason: "ethical_comparison_complete",
        };
      }
    }

    return undefined;
  }

  private calculateTransitionReadiness(
    session: ComprehensiveSessionData,
  ): number {
    let readinessScore = 0;
    let totalWeight = 0;

    session.phaseData.transitionTriggers.forEach((trigger) => {
      if (trigger.met) {
        readinessScore += trigger.weight;
      }
      totalWeight += trigger.weight;
    });

    return totalWeight > 0 ? readinessScore / totalWeight : 0;
  }

  private updateSessionState(
    session: ComprehensiveSessionData,
    updates: any,
  ): void {
    // Update session state with new information
    if (updates.interventions) {
      session.phaseData.educationalInterventions.push(...updates.interventions);
    }

    if (updates.phaseTransition) {
      session.phaseData.currentPhase = updates.phaseTransition.newPhase as any;
      session.phaseData.phaseProgress = 0; // Reset progress for new phase
    }

    // Update learning progress
    session.educationalState.comprehensionLevel =
      this.calculateComprehensionLevel(session);
  }

  private calculateOverallScore(session: ComprehensiveSessionData): number {
    // Calculate overall session score based on multiple factors
    const weights = {
      autonomy: 0.25,
      learning: 0.25,
      ethics: 0.25,
      behavioral: 0.25,
    };

    return (
      session.realTimeMetrics.autonomyScore * weights.autonomy +
      session.educationalState.comprehensionLevel * weights.learning +
      session.realTimeMetrics.kantianCompliance * weights.ethics +
      (100 - session.realTimeMetrics.coercionIndex) * weights.behavioral
    );
  }

  private assessLearningObjectives(session: ComprehensiveSessionData): any {
    return session.educationalState.learningObjectives.map((objective) => ({
      objective: objective.objective,
      achieved: objective.completed,
      progress: objective.progress,
      evidence: objective.assessmentResults,
    }));
  }

  private generatePersonalizedRecommendations(
    session: ComprehensiveSessionData,
  ): any[] {
    const recommendations = [];

    // Based on vulnerability patterns
    if (session.realTimeMetrics.coercionIndex > 50) {
      recommendations.push({
        type: "vulnerability_mitigation",
        title: "Strengthen Decision-Making Resistance",
        description:
          "Your behavioral patterns show susceptibility to manipulation",
        actions: [
          "Practice delayed decision-making",
          "Seek second opinions",
          "Learn to recognize pressure tactics",
        ],
      });
    }

    // Based on learning gaps
    if (session.educationalState.comprehensionLevel < 70) {
      recommendations.push({
        type: "educational_enhancement",
        title: "Improve Financial Literacy",
        description:
          "Continue learning about financial products and regulations",
        actions: [
          "Complete additional educational modules",
          "Research consumer protection laws",
          "Practice identifying dark patterns",
        ],
      });
    }

    return recommendations;
  }

  private calculateComprehensionLevel(
    session: ComprehensiveSessionData,
  ): number {
    // Calculate comprehension based on various factors
    const completedObjectives =
      session.educationalState.learningObjectives.filter(
        (obj) => obj.completed,
      ).length;
    const totalObjectives = session.educationalState.learningObjectives.length;

    return totalObjectives > 0
      ? (completedObjectives / totalObjectives) * 100
      : 0;
  }

  private generateDeploymentMetrics(session: ComprehensiveSessionData): any {
    return {
      performance: {
        averageResponseTime: 150, // ms
        memoryUsage: 85, // MB
        cpuUtilization: 25, // %
      },
      scalability: {
        concurrentSessions: 1,
        peakMemory: 120,
        recommendedInstances: 1,
      },
      vercelOptimizations: {
        staticGeneration: true,
        edgeFunctions: true,
        imageOptimization: false,
      },
    };
  }

  private generatePerformanceInsights(session: ComprehensiveSessionData): any {
    return {
      bottlenecks: ["Real-time behavioral analysis computationally intensive"],
      optimizations: [
        "Cache frequent calculations",
        "Lazy load educational content",
      ],
      recommendations: ["Use Vercel Edge Functions for real-time features"],
    };
  }

  private generateScalabilityRecommendations(
    session: ComprehensiveSessionData,
  ): any {
    return {
      architecture: "serverless",
      database: "PostgreSQL with connection pooling",
      caching: "Redis for session state",
      monitoring: "Vercel Analytics + custom metrics",
    };
  }

  private generateAPIEndpoints(session: ComprehensiveSessionData): any {
    return {
      "/api/session/start": "POST - Initialize comprehensive session",
      "/api/session/interact": "POST - Handle user interactions",
      "/api/session/report": "GET - Generate comprehensive report",
      "/api/metrics/realtime": "GET - Real-time metrics",
      "/api/education/content": "GET - Personalized educational content",
    };
  }

  private generateStaticAssets(session: ComprehensiveSessionData): any {
    return {
      educationalContent: "/static/education/",
      caseStudies: "/static/cases/",
      legalDocuments: "/static/legal/",
      researchData: "/static/research/",
    };
  }

  private generateEnvironmentConfig(session: ComprehensiveSessionData): any {
    return {
      NEXT_PUBLIC_LOTUS_VERSION: "3.0.0-comprehensive",
      LOTUS_RESEARCH_MODE: "true",
      LOTUS_ETHICS_ENGINE: "comprehensive",
      LOTUS_BEHAVIORAL_TRACKING: "advanced",
      VERCEL_ANALYTICS: "true",
    };
  }

  /**
   * Cleanup session resources
   */
  async cleanupSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      // Clear monitoring interval
      if ((session as any).monitoringInterval) {
        clearInterval((session as any).monitoringInterval);
      }

      // Cleanup orchestrator
      await session.orchestrator.cleanup();

      // Remove from sessions map
      this.sessions.delete(sessionId);

      console.log(`🧹 Session ${sessionId} cleaned up successfully`);
    }
  }
}

// Export singleton instance for use across the application
export const comprehensiveIntegration = new ComprehensiveIntegration();

// Export convenience functions for Next.js API routes
export async function startLotusSession(userInputs: any) {
  return await comprehensiveIntegration.startComprehensiveSession(userInputs);
}

export async function handleLotusInteraction(
  sessionId: string,
  interactionType: string,
  data: any,
) {
  return await comprehensiveIntegration.handleUserInteraction(
    sessionId,
    interactionType,
    data,
  );
}

export async function generateLotusReport(sessionId: string) {
  return await comprehensiveIntegration.generateComprehensiveReport(sessionId);
}

export async function exportLotusForVercel(sessionId: string) {
  return comprehensiveIntegration.exportForVercel(sessionId);
}

export async function cleanupLotusSession(sessionId: string) {
  return await comprehensiveIntegration.cleanupSession(sessionId);
}
