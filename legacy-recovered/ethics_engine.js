// engine/ethics_engine.js

import { Kant } from "./kant.js";

/**
 * A comprehensive suite for evaluating the ethical dimensions of a loan session,
 * focusing on the principles of informed consent and Kantian ethics.
 */
class EthicsEngine {
  /**
   * Analyzes the entire loan session for ethical violations.
   * @param {LoanSession} session - The loan session to analyze.
   * @returns {object} An object containing the consent status and a list of Kantian violations.
   */
  static analyze(session) {
    const consent = this.checkInformedConsent(session);
    const kantianViolations = Kant.analyze(session);

    return {
      consentStatus: consent,
      kantianViolations: kantianViolations,
    };
  }

  /**
   * Performs a detailed check of the five pillars of informed consent.
   * @param {LoanSession} session - The loan session to check.
   * @returns {object} An object detailing the status of each consent pillar.
   */
  static checkInformedConsent(session) {
    const pillars = {
      capacity:
        session.capacityConfirmed_Age && session.capacityConfirmed_SoundMind,
      disclosure: session.fullDisclosureProvided,
      comprehension: session.quizPassedOverall,
      voluntariness: session.voluntarinessAffirmedByDeclaration,
      authorization: session.consentGiven,
    };

    if (!pillars.capacity)
      this.logConsentViolation(session, "Violation_CapacityNotConfirmed");
    if (!pillars.disclosure)
      this.logConsentViolation(session, "Violation_DisclosureNotProvided");
    if (!pillars.comprehension)
      this.logConsentViolation(session, "Violation_ComprehensionNotMet");
    if (!pillars.voluntariness)
      this.logConsentViolation(session, "Violation_VoluntarinessQuestionable");
    if (!pillars.authorization)
      this.logConsentViolation(session, "Violation_AuthorizationNotGiven");

    return {
      status: Object.values(pillars).every((p) => p)
        ? "COMPLIANT"
        : "VIOLATION",
      pillars: pillars,
      violationCount: Object.values(pillars).filter((p) => !p).length,
      complianceRate:
        (Object.values(pillars).filter((p) => p).length / 5) * 100,
    };
  }

  /**
   * Logs a consent violation for detailed analysis.
   * @param {LoanSession} session - The loan session.
   * @param {string} violationType - The type of violation.
   */
  static logConsentViolation(session, violationType) {
    if (!session.consentViolations) {
      session.consentViolations = [];
    }

    session.consentViolations.push({
      type: violationType,
      timestamp: new Date().toISOString(),
      sessionPhase: session.currentPhase || "unknown",
      context: this.getViolationContext(violationType),
    });

    console.warn(`Consent Violation: ${violationType}`, {
      sessionId: session.sessionId,
      phase: session.currentPhase,
    });
  }

  /**
   * Provides educational context for each type of violation.
   * @param {string} violationType - The type of violation.
   * @returns {string} Educational context.
   */
  static getViolationContext(violationType) {
    const contexts = {
      Violation_CapacityNotConfirmed:
        "Lender failed to verify borrower's capacity to understand loan terms and consequences",
      Violation_DisclosureNotProvided:
        "Required loan terms, fees, and risks were not fully disclosed upfront",
      Violation_ComprehensionNotMet:
        "Borrower did not demonstrate understanding of loan terms through assessment",
      Violation_VoluntarinessQuestionable:
        "Evidence suggests coercion, pressure tactics, or compromised decision-making environment",
      Violation_AuthorizationNotGiven:
        "Borrower did not provide clear, informed authorization for the loan transaction",
    };

    return contexts[violationType] || "Unknown violation type";
  }

  /**
   * Generates a comprehensive ethics report for the session.
   * @param {LoanSession} session - The loan session to analyze.
   * @returns {object} Detailed ethics analysis report.
   */
  static generateEthicsReport(session) {
    const consentAnalysis = this.checkInformedConsent(session);
    const kantianAnalysis = Kant.analyze(session);

    return {
      sessionId: session.sessionId,
      timestamp: new Date().toISOString(),

      // Informed Consent Analysis
      informedConsent: {
        status: consentAnalysis.status,
        complianceRate: consentAnalysis.complianceRate,
        violations: session.consentViolations || [],
        pillarAnalysis: consentAnalysis.pillars,
      },

      // Kantian Ethics Analysis
      kantianEthics: {
        violations: kantianAnalysis,
        humanityRespected: kantianAnalysis.length === 0,
        ethicalScore: Math.max(0, 100 - kantianAnalysis.length * 20),
      },

      // Overall Assessment
      overallEthics: {
        status: this.determineOverallEthicalStatus(
          consentAnalysis,
          kantianAnalysis,
        ),
        riskLevel: this.assessEthicalRisk(session),
        recommendations: this.generateEthicalRecommendations(
          consentAnalysis,
          kantianAnalysis,
        ),
      },

      // Educational Insights
      educationalInsights: this.generateEducationalInsights(
        session,
        consentAnalysis,
        kantianAnalysis,
      ),
    };
  }

  /**
   * Determines the overall ethical status of the loan session.
   */
  static determineOverallEthicalStatus(consentAnalysis, kantianAnalysis) {
    if (
      consentAnalysis.status === "COMPLIANT" &&
      kantianAnalysis.length === 0
    ) {
      return "ETHICAL";
    } else if (
      consentAnalysis.violationCount <= 1 &&
      kantianAnalysis.length <= 1
    ) {
      return "QUESTIONABLE";
    } else {
      return "UNETHICAL";
    }
  }

  /**
   * Assesses the ethical risk level of the lending practices.
   */
  static assessEthicalRisk(session) {
    let riskScore = 0;

    // Check for predatory patterns
    if (session.darkPatternsDetected && session.darkPatternsDetected.length > 3)
      riskScore += 30;
    if (session.rolloverCount > 2) riskScore += 25;
    if (session.totalCost > session.amount * 2) riskScore += 20;
    if (session.timeToDecision < 300000) riskScore += 15; // Less than 5 minutes
    if (session.coercionIndex > 50) riskScore += 20;

    if (riskScore >= 70) return "HIGH";
    if (riskScore >= 40) return "MEDIUM";
    return "LOW";
  }

  /**
   * Generates specific recommendations based on ethical analysis.
   */
  static generateEthicalRecommendations(consentAnalysis, kantianAnalysis) {
    const recommendations = [];

    if (consentAnalysis.violationCount > 0) {
      recommendations.push(
        "Improve informed consent procedures to ensure borrower understanding",
      );
    }

    if (kantianAnalysis.length > 0) {
      recommendations.push(
        "Revise lending practices to respect borrower dignity and autonomy",
      );
    }

    if (consentAnalysis.complianceRate < 80) {
      recommendations.push(
        "Implement comprehensive financial literacy education before loan approval",
      );
    }

    return recommendations;
  }

  /**
   * Generates educational insights for borrower awareness.
   */
  static generateEducationalInsights(
    session,
    consentAnalysis,
    kantianAnalysis,
  ) {
    const insights = [];

    insights.push(
      "Informed consent requires five key elements: capacity, disclosure, comprehension, voluntariness, and authorization",
    );

    if (
      session.darkPatternsDetected &&
      session.darkPatternsDetected.length > 0
    ) {
      insights.push(
        "Dark patterns detected - these are design techniques that manipulate user behavior",
      );
    }

    if (kantianAnalysis.length > 0) {
      insights.push(
        "Kantian ethics requires treating people as ends in themselves, never merely as means",
      );
    }

    return insights;
  }
}

export { EthicsEngine };
