// Import the canonical session type
import { LotusSession, getInitialFormData } from "@/types";

import { AutonomyViolation } from "@/types";

// This file seems to be a more detailed, backend-focused session manager
// that is NOT CURRENTLY USED by the main simulation components.
// The core simulation now uses the simpler SimulationProvider.
// However, to fix the type errors, we will align its local interfaces
// with the canonical ones.

export interface UserChoice {
  type: string;
  data: any;
  timestamp: string;
  phase: number;
  timeFromStart: number;
  hesitationTime: number;
  cognitiveLoad: number;
  emotionalState: string;
  manipulationContext: string;
  freeWillIndex: number;
}

// REMOVED local, conflicting LotusSession interface.
// The imported LotusSession from types/shared.ts is now the standard.

export interface SessionConfig {
  enableDarkPatterns: boolean;
  enableEducationalMode: boolean;
  enableBehavioralTracking: boolean;
  enableEthicsAnalysis: boolean;
  phase: 1 | 2 | 3;
}

export interface SessionMetrics {
  autonomyScore: number;
  coercionIndex: number;
  manipulationExposure: number;
  decisionQuality: number;
  vulnerabilityIndex: number;
  psychologicalStress: number;
}

export class SessionManager {
  private session!: LotusSession; // Use definite assignment assertion since it's initialized in initializeSession
  private config: SessionConfig;
  private metrics: SessionMetrics;
  private userChoices: UserChoice[] = [];
  private autonomyViolations: AutonomyViolation[] = [];
  private behavioralData: any[] = [];
  private startTime: number;

  constructor(config: SessionConfig) {
    this.config = config;
    this.startTime = Date.now();
    this.metrics = {
      autonomyScore: 100,
      coercionIndex: 0,
      manipulationExposure: 0,
      decisionQuality: 100,
      vulnerabilityIndex: 0,
      psychologicalStress: 0,
    };
  }

  initializeSession(initialData: Partial<LotusSession>): LotusSession {
    this.session = {
      id: `lotus_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionId: `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
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
      ...initialData,
    };

    return this.session;
  }

  recordUserChoice(choice: Omit<UserChoice, "timestamp">): void {
    const fullChoice: UserChoice = {
      ...choice,
      timestamp: new Date().toISOString(),
    };
    this.userChoices.push(fullChoice);
    this.updateMetrics(choice);
  }

  recordAutonomyViolation(
    violation: Omit<AutonomyViolation, "timestamp">
  ): void {
    const fullViolation: AutonomyViolation = {
      ...violation,
      timestamp: new Date().toISOString(),
    };
    this.autonomyViolations.push(fullViolation);
    this.degradeAutonomyScore(violation.severity);
  }

  recordBehavioralData(eventType: string, data: any): void {
    this.behavioralData.push({
      eventType,
      data,
      timestamp: Date.now(),
      timeFromStart: Date.now() - this.startTime,
    });
  }

  private updateMetrics(choice: Omit<UserChoice, "timestamp">): void {
    // Update coercion index based on choice context
    if (choice.type === "loan_application" && this.config.phase === 1) {
      this.metrics.coercionIndex += 0.1;
    }

    // Update manipulation exposure
    if (choice.manipulationContext) {
      this.metrics.manipulationExposure += 1;
    }

    // Update decision quality based on hesitation time
    if (choice.hesitationTime > 5000) {
      this.metrics.decisionQuality += 5; // More time = better decision
    } else if (choice.hesitationTime < 1000) {
      this.metrics.decisionQuality -= 10; // Too quick = potential manipulation
    }
  }

  private degradeAutonomyScore(severity: string): void {
    const degradationMap: Record<string, number> = {
      low: 5,
      medium: 15,
      "medium-high": 25,
      high: 35,
      extreme: 50,
    };

    this.metrics.autonomyScore = Math.max(
      0,
      this.metrics.autonomyScore - (degradationMap[severity] || 10)
    );
  }

  getSession(): LotusSession {
    return this.session;
  }

  getMetrics(): SessionMetrics {
    return this.metrics;
  }

  getUserChoices(): UserChoice[] {
    return this.userChoices;
  }

  getAutonomyViolations(): AutonomyViolation[] {
    return this.autonomyViolations;
  }

  getBehavioralData(): any[] {
    return this.behavioralData;
  }

  transitionToPhase(phase: 1 | 2 | 3): void {
    this.config.phase = phase;

    // Adjust configuration based on phase
    switch (phase) {
      case 1:
        this.config.enableDarkPatterns = true;
        this.config.enableEducationalMode = false;
        break;
      case 2:
        this.config.enableDarkPatterns = false;
        this.config.enableEducationalMode = true;
        break;
      case 3:
        this.config.enableDarkPatterns = false;
        this.config.enableEducationalMode = true;
        this.config.enableEthicsAnalysis = true;
        break;
    }
  }

  generateSessionReport(): any {
    return {
      session: this.session,
      metrics: this.metrics,
      userChoices: this.userChoices,
      autonomyViolations: this.autonomyViolations,
      behavioralData: this.behavioralData,
      duration: Date.now() - this.startTime,
      phase: this.config.phase,
    };
  }
}
