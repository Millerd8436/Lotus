/**
 * autonomy_theater.js - Condensed Ethical Simulation Engine for Lotus
 * Tracks autonomy violations and manipulation tactics - GitHub Pages compatible
 */

import { Config, LoanSession } from './lotus_core.js';

// Condensed Autonomy Trap class with all essential tracking
class AutonomyTrap {
    constructor(session, config, ui, echo) {
        this.session = session; this.config = config; this.ui = ui; this.echo = echo;
        this.autonomyViolations = []; this.manipulationTactics = []; this.timelineEvents = [];
        this.choiceIntegrityScore = 100;
        this.trapTypes = { timePressure: false, defaultBias: false, sunkCostFallacy: false, 
                          socialProof: false, authorityPressure: false, scarcityIllusion: false,
                          cognitiveOverload: false, darkPatternUI: false };
    }

    async applyTimePressure(seconds, offerId) {
        this.session.countdownTimerValue = seconds;
        this.trapTypes.timePressure = true;
        this.choiceIntegrityScore -= 15;
        
        this.autonomyViolations.push({
            type: 'time_pressure', description: `Artificial urgency created with ${seconds} second countdown`,
            severity: 'high', kantianViolation: 'Undermines rational deliberation', timestamp: new Date().toISOString()
        });
        
        this.timelineEvents.push({ event: 'countdown_timer_started', offerId, duration: seconds, autonomyImpact: 'high_pressure' });
        
        if (this.ui?.showCountdown_Exploit) await this.ui.showCountdown_Exploit(this.session, this.config, seconds, offerId);
        this.echo?.logAction('urgency_cue', { type: 'countdown_timer', offerId, autonomyImpact: 'negative' });
        this.session.tagDarkPattern(`TimePressure_${seconds}sec_${offerId}`);
    }

    presentMisleadingTestimonial(testimonial, author) {
        this.trapTypes.socialProof = true;
        this.choiceIntegrityScore -= 12;
        
        this.autonomyViolations.push({
            type: 'misleading_social_proof', description: `Fake testimonial: "${testimonial}" - ${author}`,
            severity: 'medium', kantianViolation: 'Deception violates duty to truth', timestamp: new Date().toISOString()
        });
        
        this.timelineEvents.push({ event: 'fake_testimonial_shown', content: testimonial, author, autonomyImpact: 'deceptive_influence' });
        this.session.tagDarkPattern('MisleadingTestimonial');
        this.echo?.logAction('social_proof_manipulation', { testimonial, author });
    }

    createSunkCostPressure(investment) {
        this.trapTypes.sunkCostFallacy = true;
        this.choiceIntegrityScore -= 10;
        
        this.autonomyViolations.push({
            type: 'sunk_cost_manipulation', description: `Leveraging user's invested time/data: ${investment}`,
            severity: 'medium', kantianViolation: 'Exploits cognitive bias to prevent rational choice', timestamp: new Date().toISOString()
        });
        
        this.session.tagDarkPattern('SunkCostPressure');
    }

    applyDefaultBias(preCheckedOptions) {
        this.trapTypes.defaultBias = true;
        this.choiceIntegrityScore -= 10;
        this.autonomyViolations.push({
            type: 'default_bias_manipulation', description: `Pre-checked options: ${preCheckedOptions.join(', ')}`,
            severity: 'medium', kantianViolation: 'Assumes consent without explicit agreement', timestamp: new Date().toISOString()
        });
        this.session.tagDarkPattern('DefaultBias_PreChecked');
    }

    createArtificialScarcity(scarcityMessage) {
        this.trapTypes.scarcityIllusion = true;
        this.choiceIntegrityScore -= 14;
        this.autonomyViolations.push({
            type: 'artificial_scarcity', description: `False scarcity claim: "${scarcityMessage}"`,
            severity: 'medium-high', kantianViolation: 'Creates false urgency through deception', timestamp: new Date().toISOString()
        });
        this.session.tagDarkPattern('ArtificialScarcity_FakeUrgency');
    }

    applyCognitiveOverload(complexText) {
        this.trapTypes.cognitiveOverload = true;
        this.choiceIntegrityScore -= 16;
        this.autonomyViolations.push({
            type: 'cognitive_overload', description: `Excessive complexity: ${complexText.length} characters`,
            severity: 'high', kantianViolation: 'Deliberately confuses to prevent informed choice', timestamp: new Date().toISOString()
        });
        this.session.tagDarkPattern('CognitiveOverload_ComplexityAttack');
    }

    getAutonomyReport() {
        return {
            choiceIntegrityScore: this.choiceIntegrityScore,
            violations: this.autonomyViolations,
            activeTrapTypes: Object.keys(this.trapTypes).filter(key => this.trapTypes[key]),
            timeline: this.timelineEvents,
            ethicalAssessment: this.generateEthicalAssessment(),
            kantianAnalysis: this.generateKantianSummary(),
            recommendations: this.generateRestorationRecommendations()
        };
    }

    generateEthicalAssessment() {
        const score = this.choiceIntegrityScore;
        if (score >= 90) return 'High autonomy preservation - Ethical choice environment';
        if (score >= 70) return 'Moderate autonomy concerns - Some manipulation detected';
        if (score >= 50) return 'Significant autonomy violations - Choice integrity compromised';
        return 'Severe autonomy violations - Highly manipulative environment';
    }

    generateKantianSummary() {
        const deceptionCount = this.autonomyViolations.filter(v => v.kantianViolation.includes('Deception')).length;
        const autonomyCount = this.autonomyViolations.filter(v => v.kantianViolation.includes('autonomy')).length;
        const meansCount = this.autonomyViolations.filter(v => v.kantianViolation.includes('means')).length;
        
        return {
            universalizabilityTest: deceptionCount > 0 ? 'FAILED' : 'PASSED',
            humanityFormula: meansCount > 0 ? 'FAILED' : 'PASSED',
            autonomyFormula: autonomyCount > 0 ? 'FAILED' : 'PASSED',
            overallAssessment: (deceptionCount + autonomyCount + meansCount) > 0 ? 'ETHICALLY_PROBLEMATIC' : 'ETHICALLY_SOUND'
        };
    }

    generateRestorationRecommendations() {
        const recs = [];
        if (this.trapTypes.timePressure) recs.push('Remove artificial time constraints');
        if (this.trapTypes.defaultBias) recs.push('Make all options explicitly opt-in');
        if (this.trapTypes.socialProof) recs.push('Provide only verified testimonials');
        if (this.trapTypes.scarcityIllusion) recs.push('Remove false scarcity claims');
        if (this.trapTypes.cognitiveOverload) recs.push('Simplify language and information');
        if (this.trapTypes.sunkCostFallacy) recs.push('Provide clear exit options');
        return recs;
    }
}

// Condensed behavioral psychology engine
export class BehavioralPsychologyEngine {
    constructor() {
        this.activeExperiments = new Map();
        this.behavioralData = [];
    }

    runExperiment(type, config) {
        this.activeExperiments.set(type, { config, startTime: Date.now() });
        this.behavioralData.push({ type, config, timestamp: new Date().toISOString() });
    }

    getBehavioralReport() {
        return {
            experiments: Array.from(this.activeExperiments.entries()),
            dataPoints: this.behavioralData,
            summary: `${this.behavioralData.length} behavioral data points collected`
        };
    }
}

// Export functions
export function runAutonomyTrap(session, config, ui, echo) {
    return new AutonomyTrap(session, config, ui, echo);
}

export function analyzeAutonomyIntegrity(session, autonomyTrap) {
    const report = autonomyTrap.getAutonomyReport();
    report.sessionMetadata = {
        sessionId: session.sessionId, mode: session.mode || 'unknown',
        loanAmount: session.amount, finalAPR: session.apr, totalCost: session.totalCost
    };
    return report;
}

export { AutonomyTrap };
