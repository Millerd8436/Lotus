/**
 * ui_components/ethicsFeedback.js - Shows user how and where consent was bypassed
 * 
 * Comprehensive ethics feedback system that analyzes and reports on consent violations
 */

export class EthicsFeedback {
    constructor() {
        this.violations = [];
        this.consentEvents = [];
        this.manipulationEvents = [];
        this.ethicalStandards = {
            autonomy: "Respect for user's ability to make informed decisions",
            beneficence: "Actions should benefit the user, not just the provider",
            nonMaleficence: "Do no harm to the user's financial wellbeing",
            justice: "Fair treatment regardless of user's circumstances",
            transparency: "Clear, honest disclosure of all terms and costs",
            consent: "Genuine, informed consent without coercion"
        };
    }

    // Record a consent violation
    recordViolation(violationType, details = {}) {
        const violation = {
            id: this.generateViolationId(),
            timestamp: new Date().toISOString(),
            type: violationType,
            severity: this.calculateSeverity(violationType),
            details,
            ethicalPrinciple: this.mapToEthicalPrinciple(violationType),
            description: this.getViolationDescription(violationType),
            impact: this.assessImpact(violationType, details)
        };

        this.violations.push(violation);
        return violation;
    }

    // Record a consent event for analysis
    recordConsentEvent(eventType, details = {}) {
        const event = {
            timestamp: new Date().toISOString(),
            eventType,
            details,
            ethicalCompliance: this.assessConsentCompliance(eventType, details)
        };

        this.consentEvents.push(event);
        return event;
    }

    // Record a manipulation event
    recordManipulationEvent(manipulationType, details = {}) {
        const event = {
            timestamp: new Date().toISOString(),
            type: manipulationType,
            details,
            manipulationLevel: this.assessManipulationLevel(manipulationType, details),
            ethicalImpact: this.assessEthicalImpact(manipulationType, details)
        };

        this.manipulationEvents.push(event);
        return event;
    }

    // Generate comprehensive ethics feedback report
    generateEthicsFeedback() {
        const report = {
            timestamp: new Date().toISOString(),
            overallEthicsScore: this.calculateOverallEthicsScore(),
            violationSummary: this.generateViolationSummary(),
            consentAnalysis: this.analyzeConsentEvents(),
            manipulationAnalysis: this.analyzeManipulationEvents(),
            recommendations: this.generateRecommendations(),
            complianceReport: this.generateComplianceReport(),
            userImpactAssessment: this.assessUserImpact()
        };

        return report;
    }

    // Calculate overall ethics score (0-100)
    calculateOverallEthicsScore() {
        if (this.violations.length === 0) return 100;

        const severityWeights = {
            CRITICAL: 25,
            HIGH: 15,
            MEDIUM: 10,
            LOW: 5
        };

        let totalDeductions = 0;
        this.violations.forEach(violation => {
            totalDeductions += severityWeights[violation.severity] || 5;
        });

        return Math.max(0, 100 - totalDeductions);
    }

    // Generate violation summary
    generateViolationSummary() {
        const summary = {
            totalViolations: this.violations.length,
            bySeverity: this.groupBySeverity(),
            byPrinciple: this.groupByPrinciple(),
            byType: this.groupByType(),
            timeline: this.createViolationTimeline()
        };

        return summary;
    }

    // Analyze consent events
    analyzeConsentEvents() {
        const analysis = {
            totalEvents: this.consentEvents.length,
            compliantEvents: this.consentEvents.filter(e => e.ethicalCompliance.isCompliant).length,
            complianceRate: 0,
            consentQuality: this.assessConsentQuality(),
            consentIssues: this.identifyConsentIssues()
        };

        analysis.complianceRate = analysis.totalEvents > 0 ? 
            (analysis.compliantEvents / analysis.totalEvents) * 100 : 100;

        return analysis;
    }

    // Analyze manipulation events
    analyzeManipulationEvents() {
        const manipulationLevels = this.manipulationEvents.map(e => e.manipulationLevel);
        
        return {
            totalEvents: this.manipulationEvents.length,
            averageManipulationLevel: manipulationLevels.length > 0 ?
                manipulationLevels.reduce((a, b) => a + b, 0) / manipulationLevels.length : 0,
            highManipulationEvents: this.manipulationEvents.filter(e => e.manipulationLevel >= 8).length,
            manipulationPatterns: this.identifyManipulationPatterns(),
            ethicalImpact: this.calculateTotalEthicalImpact()
        };
    }

    // Generate recommendations for improvement
    generateRecommendations() {
        const recommendations = [];

        // Check for autonomy violations
        if (this.hasViolationType('AUTONOMY_VIOLATION')) {
            recommendations.push({
                principle: 'Autonomy',
                issue: 'User autonomy was not respected',
                recommendation: 'Provide genuine choices without manipulation or coercion',
                priority: 'HIGH'
            });
        }

        // Check for transparency issues
        if (this.hasViolationType('TRANSPARENCY_VIOLATION')) {
            recommendations.push({
                principle: 'Transparency',
                issue: 'Information was hidden or obscured',
                recommendation: 'Provide clear, upfront disclosure of all costs and terms',
                priority: 'CRITICAL'
            });
        }

        // Check for consent issues
        if (this.consentEvents.some(e => !e.ethicalCompliance.isCompliant)) {
            recommendations.push({
                principle: 'Informed Consent',
                issue: 'Consent process was inadequate',
                recommendation: 'Implement comprehensive consent verification with comprehension checks',
                priority: 'HIGH'
            });
        }

        // Check for manipulation
        if (this.manipulationEvents.length > 0) {
            recommendations.push({
                principle: 'Non-maleficence',
                issue: 'Manipulative tactics were used',
                recommendation: 'Remove dark patterns and respect user decision-making process',
                priority: 'CRITICAL'
            });
        }

        return recommendations;
    }

    // Generate compliance report
    generateComplianceReport() {
        const principles = Object.keys(this.ethicalStandards);
        const compliance = {};

        principles.forEach(principle => {
            compliance[principle] = {
                score: this.calculatePrincipleScore(principle),
                violations: this.getViolationsByPrinciple(principle),
                status: this.getPrincipleStatus(principle)
            };
        });

        return {
            principleCompliance: compliance,
            overallCompliance: this.calculateOverallCompliance(compliance),
            criticalIssues: this.identifyCriticalIssues(),
            improvementAreas: this.identifyImprovementAreas()
        };
    }

    // Assess user impact
    assessUserImpact() {
        const impact = {
            financialImpact: this.calculateFinancialImpact(),
            psychologicalImpact: this.calculatePsychologicalImpact(),
            autonomyImpact: this.calculateAutonomyImpact(),
            informationImpact: this.calculateInformationImpact(),
            overallImpact: 'CALCULATING...'
        };

        // Calculate overall impact
        const impacts = [
            impact.financialImpact.severity,
            impact.psychologicalImpact.severity,
            impact.autonomyImpact.severity,
            impact.informationImpact.severity
        ];

        const severityMap = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'CRITICAL': 4 };
        const avgSeverity = impacts.reduce((sum, severity) => sum + severityMap[severity], 0) / impacts.length;

        if (avgSeverity >= 3.5) impact.overallImpact = 'CRITICAL';
        else if (avgSeverity >= 2.5) impact.overallImpact = 'HIGH';
        else if (avgSeverity >= 1.5) impact.overallImpact = 'MEDIUM';
        else impact.overallImpact = 'LOW';

        return impact;
    }

    // Display ethics feedback to user
    displayFeedbackToUser(containerId) {
        const container = document.getElementById(containerId);
        const feedback = this.generateEthicsFeedback();

        const feedbackHTML = `
            <div class="ethics-feedback-panel">
                <div class="feedback-header">
                    <h2>🔍 Ethics & Consent Analysis</h2>
                    <div class="ethics-score ${this.getScoreClass(feedback.overallEthicsScore)}">
                        Ethics Score: ${feedback.overallEthicsScore}/100
                    </div>
                </div>

                <div class="violation-summary">
                    <h3>⚠️ Ethical Violations Detected</h3>
                    <div class="violation-stats">
                        <div>Total: ${feedback.violationSummary.totalViolations}</div>
                        <div>Critical: ${feedback.violationSummary.bySeverity.CRITICAL || 0}</div>
                        <div>High: ${feedback.violationSummary.bySeverity.HIGH || 0}</div>
                        <div>Medium: ${feedback.violationSummary.bySeverity.MEDIUM || 0}</div>
                    </div>
                </div>

                <div class="consent-analysis">
                    <h3>✅ Consent Quality Analysis</h3>
                    <div class="consent-stats">
                        <div>Compliance Rate: ${feedback.consentAnalysis.complianceRate.toFixed(1)}%</div>
                        <div>Quality Score: ${feedback.consentAnalysis.consentQuality.score}/100</div>
                    </div>
                </div>

                <div class="manipulation-analysis">
                    <h3>🎭 Manipulation Detection</h3>
                    <div class="manipulation-stats">
                        <div>Events Detected: ${feedback.manipulationAnalysis.totalEvents}</div>
                        <div>Avg. Manipulation Level: ${feedback.manipulationAnalysis.averageManipulationLevel.toFixed(1)}/10</div>
                        <div>High-Level Events: ${feedback.manipulationAnalysis.highManipulationEvents}</div>
                    </div>
                </div>

                <div class="recommendations">
                    <h3>💡 Ethical Recommendations</h3>
                    <ul>
                        ${feedback.recommendations.map(rec => `
                            <li class="recommendation ${rec.priority.toLowerCase()}">
                                <strong>${rec.principle}:</strong> ${rec.recommendation}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="user-impact">
                    <h3>📊 User Impact Assessment</h3>
                    <div class="impact-grid">
                        <div class="impact-item">
                            <div class="impact-label">Financial Impact</div>
                            <div class="impact-severity ${feedback.userImpactAssessment.financialImpact.severity.toLowerCase()}">
                                ${feedback.userImpactAssessment.financialImpact.severity}
                            </div>
                        </div>
                        <div class="impact-item">
                            <div class="impact-label">Autonomy Impact</div>
                            <div class="impact-severity ${feedback.userImpactAssessment.autonomyImpact.severity.toLowerCase()}">
                                ${feedback.userImpactAssessment.autonomyImpact.severity}
                            </div>
                        </div>
                        <div class="impact-item">
                            <div class="impact-label">Information Impact</div>
                            <div class="impact-severity ${feedback.userImpactAssessment.informationImpact.severity.toLowerCase()}">
                                ${feedback.userImpactAssessment.informationImpact.severity}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = feedbackHTML;
        this.addFeedbackStyling();
    }

    // Helper methods for calculations and assessments
    calculateSeverity(violationType) {
        const severityMap = {
            'HIDDEN_FEES': 'CRITICAL',
            'COERCIVE_CONSENT': 'CRITICAL',
            'FALSE_URGENCY': 'HIGH',
            'MISLEADING_INFORMATION': 'HIGH',
            'AUTONOMY_VIOLATION': 'HIGH',
            'TRANSPARENCY_VIOLATION': 'CRITICAL',
            'MANIPULATION_DETECTED': 'MEDIUM',
            'CONSENT_BYPASS': 'HIGH'
        };
        return severityMap[violationType] || 'MEDIUM';
    }

    mapToEthicalPrinciple(violationType) {
        const principleMap = {
            'HIDDEN_FEES': 'transparency',
            'COERCIVE_CONSENT': 'autonomy',
            'FALSE_URGENCY': 'nonMaleficence',
            'MISLEADING_INFORMATION': 'transparency',
            'AUTONOMY_VIOLATION': 'autonomy',
            'TRANSPARENCY_VIOLATION': 'transparency',
            'MANIPULATION_DETECTED': 'nonMaleficence',
            'CONSENT_BYPASS': 'consent'
        };
        return principleMap[violationType] || 'unknown';
    }

    // Additional helper methods...
    generateViolationId() {
        return 'violation_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }

    getScoreClass(score) {
        if (score >= 80) return 'excellent';
        if (score >= 60) return 'good';
        if (score >= 40) return 'fair';
        return 'poor';
    }

    addFeedbackStyling() {
        if (!document.getElementById('ethics-feedback-styles')) {
            const styles = document.createElement('style');
            styles.id = 'ethics-feedback-styles';
            styles.textContent = `
                .ethics-feedback-panel { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .feedback-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .ethics-score { padding: 10px 20px; border-radius: 20px; font-weight: bold; }
                .ethics-score.excellent { background: #28a745; color: white; }
                .ethics-score.good { background: #ffc107; color: black; }
                .ethics-score.fair { background: #fd7e14; color: white; }
                .ethics-score.poor { background: #dc3545; color: white; }
                .violation-stats, .consent-stats, .manipulation-stats { display: flex; gap: 20px; margin: 10px 0; }
                .recommendation.critical { color: #dc3545; }
                .recommendation.high { color: #fd7e14; }
                .recommendation.medium { color: #ffc107; }
                .impact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
                .impact-item { text-align: center; padding: 10px; background: white; border-radius: 5px; }
                .impact-severity.critical { color: #dc3545; font-weight: bold; }
                .impact-severity.high { color: #fd7e14; font-weight: bold; }
                .impact-severity.medium { color: #ffc107; font-weight: bold; }
                .impact-severity.low { color: #28a745; font-weight: bold; }
            `;
            document.head.appendChild(styles);
        }
    }

    // Placeholder methods for complex calculations
    calculateFinancialImpact() { return { severity: 'MEDIUM', details: 'Hidden fees detected' }; }
    calculatePsychologicalImpact() { return { severity: 'HIGH', details: 'Urgency pressure applied' }; }
    calculateAutonomyImpact() { return { severity: 'HIGH', details: 'Choice manipulation detected' }; }
    calculateInformationImpact() { return { severity: 'CRITICAL', details: 'Key information hidden' }; }
    
    // More placeholder methods for full functionality...
    assessConsentCompliance() { return { isCompliant: false, issues: ['Time pressure', 'Hidden terms'] }; }
    assessManipulationLevel() { return Math.floor(Math.random() * 10) + 1; }
    assessEthicalImpact() { return 'HIGH'; }
    assessConsentQuality() { return { score: 45, issues: ['Insufficient time', 'Complex language'] }; }
    identifyConsentIssues() { return ['Pre-checked boxes', 'Hidden scroll terms']; }
    identifyManipulationPatterns() { return ['Urgency tactics', 'Social proof']; }
    calculateTotalEthicalImpact() { return 'CRITICAL'; }
    hasViolationType(type) { return this.violations.some(v => v.type === type); }
    groupBySeverity() { 
        const groups = {};
        this.violations.forEach(v => {
            groups[v.severity] = (groups[v.severity] || 0) + 1;
        });
        return groups;
    }
    groupByPrinciple() { 
        const groups = {};
        this.violations.forEach(v => {
            groups[v.ethicalPrinciple] = (groups[v.ethicalPrinciple] || 0) + 1;
        });
        return groups;
    }
    groupByType() { 
        const groups = {};
        this.violations.forEach(v => {
            groups[v.type] = (groups[v.type] || 0) + 1;
        });
        return groups;
    }
    createViolationTimeline() { return this.violations.map(v => ({ time: v.timestamp, type: v.type })); }
    calculatePrincipleScore() { return Math.floor(Math.random() * 100); }
    getViolationsByPrinciple() { return []; }
    getPrincipleStatus() { return 'NEEDS_IMPROVEMENT'; }
    calculateOverallCompliance() { return 65; }
    identifyCriticalIssues() { return ['Hidden fees', 'Coercive consent']; }
    identifyImprovementAreas() { return ['Transparency', 'Consent quality']; }
    getViolationDescription() { return 'Ethical violation detected'; }
    assessImpact() { return 'Significant negative impact on user autonomy'; }
}

export default EthicsFeedback;
