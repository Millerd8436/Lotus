// engine/ethics_engine.js

import { Kant } from './kant.js';

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
            capacity: session.capacityConfirmed_Age && session.capacityConfirmed_SoundMind,
            disclosure: session.fullDisclosureProvided,
            comprehension: session.quizPassedOverall,
            voluntariness: session.voluntarinessAffirmedByDeclaration,
            authorization: session.consentGiven,
        };

        if (!pillars.capacity) this.logConsentViolation(session, "Violation_CapacityNotConfirmed");
        if (!pillars.disclosure) this.logConsentViolation(session, "Violation_DisclosureNotProvided");
        if (!pillars.comprehension) this.logConsentViolation(session, "Violation_ComprehensionNotMet");
        if (!pillars.voluntariness) this.logConsentViolation(session, "Violation_VoluntarinessQuestionable");
        if (!pillars.authorization) this.logConsentViolation(session, "Violation_AuthorizationNotGiven");

        return pillars;
    }

    /**
     * Logs a specific consent violation to the session.
     * @param {LoanSession} session - The loan session.
     * @param {string} violation - A string identifier for the violation.
     */
    static logConsentViolation(session, violation) {
        session.tagDarkPattern(violation); // Using existing method to log ethical failures
        console.error(`ETHICS VIOLATION: ${violation}`);
    }
}

// These functions are now part of the EthicsEngine class structure
// and can be removed if they are not used elsewhere.
// For now, they are kept for compatibility.
const checkConsent = (session) => EthicsEngine.checkInformedConsent(session);
const logConsentViolation = (session, violation) => EthicsEngine.logConsentViolation(session, violation);
const analyzeKantianViolations = (session) => Kant.analyze(session);


export { EthicsEngine, checkConsent, logConsentViolation, analyzeKantianViolations };
