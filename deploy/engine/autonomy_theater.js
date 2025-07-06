/**
 * Autonomy Theater - Ethical Simulation Runtime for Lotus Payday Loan Project
 * 
 * This module provides a meta-layer that evaluates the integrity of user choice
 * during the simulation. It overlays the experience with a philosophical audit
 * engine that identifies where user agency was undermined, simulated, or manipulated.
 * 
 * Instead of focusing solely on loan outcomes, Autonomy Theater focuses on
 * the structure of choice itself: how options were framed, what defaults were shown,
 * how much time was given, and whether the user's autonomy was preserved or subverted.
 */

import { LoanCore } from '../core/loan_core.js';

/**
 * Models coercion and behavioral traps like sunk cost, time pressure, and defaults.
 */
class AutonomyTrap {
    constructor(session, config, ui, echo) {
        this.session = session;
        this.config = config;
        this.ui = ui;
        this.echo = echo;
        
        // Initialize autonomy tracking
        this.autonomyViolations = [];
        this.manipulationTactics = [];
        this.timelineEvents = [];
        this.choiceIntegrityScore = 100;
        
        // Track specific trap types
        this.trapTypes = {
            timePressure: false,
            defaultBias: false,
            sunkCostFallacy: false,
            socialProof: false,
            authorityPressure: false,
            scarcityIllusion: false,
            cognitiveOverload: false,
            darkPatternUI: false
        };
    }

    /**
     * Applies time pressure to the user.
     * @param {number} seconds - The duration of the countdown.
     * @param {string} offerId - A unique identifier for the offer.
     */
    async applyTimePressure(seconds, offerId) {
        this.session.countdownTimerValue = seconds;
        this.trapTypes.timePressure = true;
        this.choiceIntegrityScore -= 15;
        
        // Log the autonomy violation
        this.autonomyViolations.push({
            type: 'time_pressure',
            description: `Artificial urgency created with ${seconds} second countdown`,
            severity: 'high',
            kantianViolation: 'Undermines rational deliberation',
            timestamp: new Date().toISOString()
        });
        
        this.timelineEvents.push({
            event: 'countdown_timer_started',
            offerId: offerId,
            duration: seconds,
            autonomyImpact: 'high_pressure'
        });
        
        await this.ui.showCountdown_Exploit(this.session, this.config, seconds, offerId);
        this.echo.logAction('urgency_cue', { type: 'countdown_timer', offerId, autonomyImpact: 'negative' });
        
        // Tag dark pattern for session tracking
        this.session.tagDarkPattern(`TimePressure_${seconds}sec_${offerId}`);
    }

    /**
     * Presents a misleading testimonial to the user.
     * @param {string} testimonial - The text of the testimonial.
     * @param {string} author - The author of the testimonial.
     */
    presentMisleadingTestimonial(testimonial, author) {
        this.trapTypes.socialProof = true;
        this.choiceIntegrityScore -= 12;
        
        this.autonomyViolations.push({
            type: 'misleading_social_proof',
            description: `Fake testimonial presented: "${testimonial}" - ${author}`,
            severity: 'medium',
            kantianViolation: 'Deception violates duty to truth',
            timestamp: new Date().toISOString()
        });
        
        this.timelineEvents.push({
            event: 'fake_testimonial_shown',
            content: testimonial,
            author: author,
            autonomyImpact: 'deceptive_influence'
        });
        
        this.ui.showFakeTestimonial(testimonial, author);
        this.session.tagDarkPattern("ExploitMech_9_MisleadingTestimonials");
        this.echo.logAction('deception_cue', { 
            type: 'misleading_testimonial', 
            content: testimonial,
            autonomyImpact: 'negative'
        });
    }

    /**
     * Obscures the cancellation flow.
     */
    obscureCancellation() {
        this.trapTypes.darkPatternUI = true;
        this.choiceIntegrityScore -= 18;
        
        this.autonomyViolations.push({
            type: 'obscured_exit',
            description: 'Cancellation process deliberately obscured or complicated',
            severity: 'high',
            kantianViolation: 'Treats user as means to prevent exit',
            timestamp: new Date().toISOString()
        });
        
        this.timelineEvents.push({
            event: 'cancellation_obscured',
            autonomyImpact: 'exit_barriers_erected'
        });
        
        this.ui.obscureCancelFlow_Exploit(this.session, this.config);
        this.echo.logAction('deception_cue', { 
            type: 'obscured_cancellation',
            autonomyImpact: 'negative'
        });
        
        this.session.tagDarkPattern("ObscuredCancellation_ExitBarrier");
    }

    /**
     * Applies default bias manipulation
     * @param {Array} preCheckedOptions - Options that are pre-selected
     */
    applyDefaultBias(preCheckedOptions) {
        this.trapTypes.defaultBias = true;
        this.choiceIntegrityScore -= 10;
        
        this.autonomyViolations.push({
            type: 'default_bias_manipulation',
            description: `Pre-checked options: ${preCheckedOptions.join(', ')}`,
            severity: 'medium',
            kantianViolation: 'Assumes consent without explicit agreement',
            timestamp: new Date().toISOString()
        });
        
        this.timelineEvents.push({
            event: 'default_bias_applied',
            preCheckedOptions: preCheckedOptions,
            autonomyImpact: 'choice_manipulation'
        });
        
        this.echo.logAction('manipulation_cue', {
            type: 'default_bias',
            options: preCheckedOptions,
            autonomyImpact: 'negative'
        });
        
        this.session.tagDarkPattern("DefaultBias_PreChecked");
    }

    /**
     * Creates artificial scarcity
     * @param {string} scarcityMessage - The scarcity message to display
     */
    createArtificialScarcity(scarcityMessage) {
        this.trapTypes.scarcityIllusion = true;
        this.choiceIntegrityScore -= 14;
        
        this.autonomyViolations.push({
            type: 'artificial_scarcity',
            description: `False scarcity claim: "${scarcityMessage}"`,
            severity: 'medium-high',
            kantianViolation: 'Creates false urgency through deception',
            timestamp: new Date().toISOString()
        });
        
        this.timelineEvents.push({
            event: 'artificial_scarcity_created',
            message: scarcityMessage,
            autonomyImpact: 'false_urgency'
        });
        
        this.echo.logAction('manipulation_cue', {
            type: 'artificial_scarcity',
            message: scarcityMessage,
            autonomyImpact: 'negative'
        });
        
        this.session.tagDarkPattern("ArtificialScarcity_FakeUrgency");
    }

    /**
     * Applies cognitive overload to prevent careful consideration
     * @param {string} complexText - Overly complex or lengthy text
     */
    applyCognitiveOverload(complexText) {
        this.trapTypes.cognitiveOverload = true;
        this.choiceIntegrityScore -= 16;
        
        this.autonomyViolations.push({
            type: 'cognitive_overload',
            description: `Excessive complexity introduced: ${complexText.length} characters`,
            severity: 'high',
            kantianViolation: 'Deliberately confuses to prevent informed choice',
            timestamp: new Date().toISOString()
        });
        
        this.timelineEvents.push({
            event: 'cognitive_overload_applied',
            textLength: complexText.length,
            autonomyImpact: 'comprehension_impaired'
        });
        
        this.echo.logAction('manipulation_cue', {
            type: 'cognitive_overload',
            textLength: complexText.length,
            autonomyImpact: 'negative'
        });
        
        this.session.tagDarkPattern("CognitiveOverload_ComplexityAttack");
    }

    /**
     * Triggers sunk cost fallacy
     * @param {number} progressPercentage - How far user has progressed
     */
    triggerSunkCostFallacy(progressPercentage) {
        this.trapTypes.sunkCostFallacy = true;
        this.choiceIntegrityScore -= 13;
        
        this.autonomyViolations.push({
            type: 'sunk_cost_manipulation',
            description: `Progress bar manipulation at ${progressPercentage}% completion`,
            severity: 'medium-high',
            kantianViolation: 'Exploits psychological bias to prevent rational exit',
            timestamp: new Date().toISOString()
        });
        
        this.timelineEvents.push({
            event: 'sunk_cost_triggered',
            progressPercentage: progressPercentage,
            autonomyImpact: 'commitment_escalation'
        });
        
        this.echo.logAction('manipulation_cue', {
            type: 'sunk_cost_fallacy',
            progress: progressPercentage,
            autonomyImpact: 'negative'
        });
        
        this.session.tagDarkPattern(`SunkCost_${progressPercentage}Percent`);
    }

    /**
     * Generates comprehensive autonomy report
     * @returns {Object} - Detailed autonomy analysis
     */
    generateAutonomyReport() {
        const totalViolations = this.autonomyViolations.length;
        const highSeverityViolations = this.autonomyViolations.filter(v => v.severity === 'high').length;
        const activeTrapTypes = Object.keys(this.trapTypes).filter(key => this.trapTypes[key]);
        
        return {
            // Overall Score
            choiceIntegrityScore: Math.max(0, this.choiceIntegrityScore),
            autonomyGrade: this.calculateAutonomyGrade(),
            
            // Violation Analysis
            totalViolations: totalViolations,
            highSeverityViolations: highSeverityViolations,
            violationBreakdown: this.autonomyViolations,
            
            // Trap Analysis
            activeTrapTypes: activeTrapTypes,
            trapTypesSummary: this.trapTypes,
            manipulationTactics: this.manipulationTactics,
            
            // Timeline Analysis
            timelineEvents: this.timelineEvents,
            
            // Kantian Analysis
            kantianViolationsSummary: this.generateKantianSummary(),
            
            // Recommendations
            autonomyRestoration: this.generateRestorationRecommendations(),
            
            // Educational Insights
            educationalInsights: this.generateEducationalInsights(),
            
            // Comparison Data
            comparisonWithEthicalMode: this.generateModeComparison()
        };
    }

    /**
     * Calculates autonomy grade based on choice integrity score
     * @returns {string} - Letter grade A-F
     */
    calculateAutonomyGrade() {
        if (this.choiceIntegrityScore >= 90) return 'A';
        if (this.choiceIntegrityScore >= 80) return 'B';
        if (this.choiceIntegrityScore >= 70) return 'C';
        if (this.choiceIntegrityScore >= 60) return 'D';
        return 'F';
    }

    /**
     * Generates Kantian ethical analysis
     * @returns {Object} - Kantian framework analysis
     */
    generateKantianSummary() {
        const deceptionViolations = this.autonomyViolations.filter(v => 
            v.kantianViolation.includes('Deception') || v.kantianViolation.includes('truth')
        );
        
        const autonomyViolations = this.autonomyViolations.filter(v => 
            v.kantianViolation.includes('autonomy') || v.kantianViolation.includes('rational')
        );
        
        const meansViolations = this.autonomyViolations.filter(v => 
            v.kantianViolation.includes('means')
        );
        
        return {
            categoricalImperativeViolations: {
                universalizabilityTest: deceptionViolations.length > 0 ? 'FAILED' : 'PASSED',
                humanityFormula: meansViolations.length > 0 ? 'FAILED' : 'PASSED',
                autonomyFormula: autonomyViolations.length > 0 ? 'FAILED' : 'PASSED'
            },
            overallKantianAssessment: this.calculateKantianGrade(),
            specificViolations: {
                deception: deceptionViolations,
                autonomyUndermining: autonomyViolations,
                instrumentalization: meansViolations
            }
        };
    }

    /**
     * Calculates overall Kantian ethical assessment
     * @returns {string} - Ethical assessment
     */
    calculateKantianGrade() {
        const kant = this.generateKantianSummary();
        const violations = kant.categoricalImperativeViolations;
        
        if (violations.universalizabilityTest === 'FAILED' || 
            violations.humanityFormula === 'FAILED' || 
            violations.autonomyFormula === 'FAILED') {
            return 'ETHICALLY_PROBLEMATIC';
        }
        return 'ETHICALLY_SOUND';
    }

    /**
     * Generates recommendations for autonomy restoration
     * @returns {Array} - List of restoration recommendations
     */
    generateRestorationRecommendations() {
        const recommendations = [];
        
        if (this.trapTypes.timePressure) {
            recommendations.push('Remove artificial time constraints and allow adequate deliberation time');
        }
        
        if (this.trapTypes.defaultBias) {
            recommendations.push('Make all options explicitly opt-in rather than pre-selected');
        }
        
        if (this.trapTypes.socialProof) {
            recommendations.push('Provide only verified, authentic testimonials or remove social proof elements');
        }
        
        if (this.trapTypes.scarcityIllusion) {
            recommendations.push('Remove false scarcity claims and provide accurate availability information');
        }
        
        if (this.trapTypes.cognitiveOverload) {
            recommendations.push('Simplify language and present information in digestible segments');
        }
        
        if (this.trapTypes.sunkCostFallacy) {
            recommendations.push('Provide clear exit options at every stage without penalty');
        }
        
        if (this.trapTypes.darkPatternUI) {
            recommendations.push('Redesign interface to prioritize user needs over business conversion');
        }
        
        return recommendations;
    }

    /**
     * Generates educational insights about the manipulation techniques
     * @returns {Array} - Educational insights
     */
    generateEducationalInsights() {
        return [
            'Time pressure tactics exploit cognitive biases that impair rational decision-making',
            'Default bias leverages human tendency to accept pre-set options without consideration',
            'Social proof manipulation exploits our reliance on others\' experiences for validation',
            'Artificial scarcity creates false urgency that bypasses careful evaluation',
            'Cognitive overload prevents users from processing important information effectively',
            'Sunk cost fallacy exploitation makes users continue despite better alternatives',
            'Dark UI patterns prioritize business goals over user autonomy and choice'
        ];
    }

    /**
     * Generates comparison with ethical mode
     * @returns {Object} - Mode comparison analysis
     */
    generateModeComparison() {
        return {
            exploitativeModeConcerns: [
                'Multiple autonomy violations detected',
                'Systematic manipulation of user choice',
                'Kantian ethical principles violated',
                'User agency significantly compromised'
            ],
            ethicalModeAlternatives: [
                'Transparent disclosure of all terms',
                'Adequate time for consideration',
                'Opt-in only for additional services',
                'Clear exit options at every stage',
                'Simplified, honest language',
                'No artificial pressure tactics'
            ],
            recommendation: 'The ethical mode preserves user autonomy while the exploitative mode systematically undermines it'
        };
    }
}

/**
 * Runs the autonomy trap simulation.
 * @param {LoanSession} session - The current loan session.
 * @param {Config} config - The application configuration.
 * @param {UI} ui - The UI object.
 * @param {Echo} echo - The Echo object for logging.
 * @returns {AutonomyTrap} - A new AutonomyTrap instance.
 */
function runAutonomyTrap(session, config, ui, echo) {
    return new AutonomyTrap(session, config, ui, echo);
}

/**
 * Generates a report of the autonomy traps encountered.
 * @param {LoanSession} session - The current loan session.
 * @returns {string[]} - A list of the autonomy traps encountered.
 */
function trapReport(session) {
    return session.darkPatternsEncountered;
}

/**
 * Analyzes the autonomy integrity of a completed session
 * @param {LoanSession} session - Completed loan session
 * @param {AutonomyTrap} autonomyTrap - The autonomy trap instance
 * @returns {Object} - Comprehensive autonomy analysis
 */
function analyzeAutonomyIntegrity(session, autonomyTrap) {
    const report = autonomyTrap.generateAutonomyReport();
    
    // Add session-specific data
    report.sessionMetadata = {
        sessionId: session.sessionId,
        mode: session.mode || 'unknown',
        loanAmount: session.amount,
        finalAPR: session.aprCalculated,
        totalCost: session.getCumulativeCost ? session.getCumulativeCost() : 0,
        completionTime: new Date().toISOString()
    };
    
    // Calculate autonomy impact on financial outcomes
    report.financialImpact = {
        costInflation: report.sessionMetadata.totalCost / report.sessionMetadata.loanAmount,
        aprImpact: report.sessionMetadata.finalAPR,
        autonomyCorrelation: 'Lower autonomy scores correlate with higher financial exploitation'
    };
    
    return report;
}

export { AutonomyTrap, runAutonomyTrap, trapReport, analyzeAutonomyIntegrity };
