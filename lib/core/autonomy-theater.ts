import { AutonomyViolation, LotusSession } from "../../types/lotus";

/**
 * @file Centralized logic for the Autonomy Theater educational framework.
 * This module manages the state, violations, and reporting for the three-phase
 * analysis of user autonomy during the lending simulation.
 */

export interface AutonomyReport {
  sessionId: string;
  phase: 1 | 2 | 3;
  totalViolations: number;
  severityBreakdown: Record<string, number>;
  coercionIndex: number;
  autonomyScore: number;
  recommendations: string[];
  detailedAnalysis: string;
  timestamp: string;
}

export interface ThreePhaseAutonomyTheater {
  currentPhase: 1 | 2 | 3;
  session: LotusSession;
  options: any;
  applyExploitativeTimePressure: (
    seconds: number,
    context: string
  ) => Promise<void>;
  createArtificialScarcity: (message: string) => void;
  generateReport: () => AutonomyReport;
  trackViolation: (violation: AutonomyViolation) => void;
}

/**
 * Creates and configures an instance of the ThreePhaseAutonomyTheater.
 * This factory function initializes the theater for a specific phase of the simulation,
 * providing the necessary tools to track and analyze autonomy violations.
 *
 * @param phase The current simulation phase (1, 2, or 3).
 * @param session The active user session data.
 * @param options Additional configuration for the theater.
 * @returns An initialized ThreePhaseAutonomyTheater instance.
 */
export const createPhaseAutonomyTheater = (
  phase: 1 | 2 | 3,
  session: LotusSession,
  options: any
): ThreePhaseAutonomyTheater => {
  return {
    currentPhase: phase,
    session,
    options,
    applyExploitativeTimePressure: async (seconds: number, context: string) => {
      // Future implementation: simulate high-pressure tactics
      console.log(`Applying time pressure: ${seconds}s in context: ${context}`);
    },
    createArtificialScarcity: (message: string) => {
      // Future implementation: simulate fake scarcity
      console.log(`Creating artificial scarcity: ${message}`);
    },
    generateReport: (): AutonomyReport => {
      const autonomyScore = Math.max(
        0,
        100 -
          (session.coercionIndex * 10 + session.autonomyViolations.length * 5)
      );
      return {
        sessionId: session.id,
        phase: phase,
        totalViolations: session.autonomyViolations.length,
        severityBreakdown: session.autonomyViolations.reduce(
          (acc, v) => {
            acc[v.severity] = (acc[v.severity] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        ),
        coercionIndex: session.coercionIndex,
        autonomyScore: autonomyScore,
        recommendations:
          autonomyScore < 70
            ? [
                "Practice the 24-hour cooling-off rule.",
                "Verify all claims with a third-party source.",
                "Always seek and compare alternatives before deciding.",
              ]
            : ["Continue to scrutinize financial products for hidden terms."],
        detailedAnalysis: `Phase ${phase} analysis detected ${session.autonomyViolations.length} autonomy violations, resulting in a manipulation score of ${100 - autonomyScore}.`,
        timestamp: new Date().toISOString(),
      };
    },
    trackViolation: (violation: AutonomyViolation) => {
      if (!session.autonomyViolations) {
        session.autonomyViolations = [];
      }
      session.autonomyViolations.push({ ...violation, phase });
    },
  };
};
