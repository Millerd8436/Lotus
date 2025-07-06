// research/research_analytics.js
// Advanced Research and Analytics Module for Lotus Simulation

export class ResearchAnalytics {
    constructor() {
        this.sessionData = {
            sessionId: this.generateSessionId(),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            darkPatternsDetected: [],
            educationalModulesShown: [],
            complianceViolations: [],
            userInteractions: [],
            decisionPoints: [],
            knowledgeAssessments: [],
            ethicalViolations: [],
            regulatoryFlags: []
        };
        this.researchMode = false;
        this.complianceMode = false;
        this.educationalMode = false;
    }

    generateSessionId() {
        return 'LOTUS_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    enableResearchMode() {
        this.researchMode = true;
        document.getElementById('research-dashboard')?.classList.remove('hidden');
        document.getElementById('session-id').textContent = this.sessionData.sessionId;
        this.updateDashboard();
    }

    enableComplianceMode() {
        this.complianceMode = true;
        document.getElementById('compliance-tracker')?.classList.remove('hidden');
        this.updateComplianceDisplay();
    }

    enableEducationalMode() {
        this.educationalMode = true;
        document.getElementById('education-progress')?.classList.remove('hidden');
        this.updateEducationalProgress();
    }

    // Track dark patterns detected during simulation
    recordDarkPattern(patternType, description, severity = 'medium') {
        const darkPattern = {
            timestamp: new Date().toISOString(),
            type: patternType,
            description: description,
            severity: severity,
            context: this.getCurrentContext()
        };
        
        this.sessionData.darkPatternsDetected.push(darkPattern);
        this.updateDashboard();
        
        // Log for research purposes
        console.log('🚨 Dark Pattern Detected:', darkPattern);
    }

    // Track educational modules shown
    recordEducationalModule(moduleId, moduleName, completionTime = null) {
        const module = {
            timestamp: new Date().toISOString(),
            moduleId: moduleId,
            moduleName: moduleName,
            completionTime: completionTime,
            userEngagement: this.calculateEngagement()
        };
        
        this.sessionData.educationalModulesShown.push(module);
        this.updateDashboard();
        this.updateEducationalProgress();
    }

    // Track regulatory compliance violations
    recordComplianceViolation(violationType, regulation, description) {
        const violation = {
            timestamp: new Date().toISOString(),
            type: violationType,
            regulation: regulation,
            description: description,
            severity: this.calculateViolationSeverity(violationType)
        };
        
        this.sessionData.complianceViolations.push(violation);
        this.updateComplianceDisplay();
    }

    // Track user decision points for behavioral analysis
    recordDecisionPoint(decisionType, options, chosenOption, timeToDecide) {
        const decision = {
            timestamp: new Date().toISOString(),
            type: decisionType,
            options: options,
            chosen: chosenOption,
            decisionTime: timeToDecide,
            context: this.getCurrentContext()
        };
        
        this.sessionData.decisionPoints.push(decision);
    }

    // Knowledge assessment tracking
    recordKnowledgeAssessment(questionType, correct, userAnswer, correctAnswer) {
        const assessment = {
            timestamp: new Date().toISOString(),
            questionType: questionType,
            correct: correct,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            attempts: 1
        };
        
        this.sessionData.knowledgeAssessments.push(assessment);
        this.updateEducationalProgress();
    }

    updateDashboard() {
        if (!this.researchMode) return;
        
        document.getElementById('dark-pattern-count').textContent = 
            this.sessionData.darkPatternsDetected.length;
        document.getElementById('education-module-count').textContent = 
            this.sessionData.educationalModulesShown.length;
    }

    updateComplianceDisplay() {
        if (!this.complianceMode) return;
        
        const cfpbCompliance = this.checkCFPBCompliance();
        const stateCompliance = this.checkStateCompliance();
        const usoryViolations = this.sessionData.complianceViolations.filter(v => 
            v.type === 'usury_violation').length;
        
        document.getElementById('cfpb-compliance').textContent = cfpbCompliance ? '✅ COMPLIANT' : '❌ VIOLATION';
        document.getElementById('cfpb-compliance').className = cfpbCompliance ? 'font-bold text-green-300' : 'font-bold text-red-300';
        
        document.getElementById('state-compliance').textContent = stateCompliance ? '✅ COMPLIANT' : '❌ VIOLATION';
        document.getElementById('state-compliance').className = stateCompliance ? 'font-bold text-green-300' : 'font-bold text-red-300';
        
        document.getElementById('usury-violations').textContent = usoryViolations;
    }

    updateEducationalProgress() {
        if (!this.educationalMode) return;
        
        const totalModules = 25; // Total available educational modules
        const completedModules = this.sessionData.educationalModulesShown.length;
        const progressPercentage = Math.min((completedModules / totalModules) * 100, 100);
        
        document.getElementById('learning-progress-bar').style.width = progressPercentage + '%';
        document.getElementById('learning-percentage').textContent = Math.round(progressPercentage) + '% Complete';
        
        // Update knowledge areas
        const knowledgeAreas = this.getKnowledgeAreasCovered();
        const knowledgeElement = document.getElementById('knowledge-areas');
        if (knowledgeElement) {
            knowledgeElement.innerHTML = knowledgeAreas.map(area => 
                `<div class="flex items-center"><span class="text-green-400 mr-1">✓</span> ${area}</div>`
            ).join('');
        }
    }

    getKnowledgeAreasCovered() {
        const areas = new Set();
        this.sessionData.educationalModulesShown.forEach(module => {
            if (module.moduleId.includes('Usury')) areas.add('Usury Laws & Evasion');
            if (module.moduleId.includes('Kantian')) areas.add('Kantian Ethics');
            if (module.moduleId.includes('CFPB')) areas.add('Federal Regulations');
            if (module.moduleId.includes('Earnin')) areas.add('EWA App Analysis');
            if (module.moduleId.includes('Tribal')) areas.add('Tribal Sovereignty Issues');
            if (module.moduleId.includes('RentABank')) areas.add('Rent-a-Bank Schemes');
            if (module.moduleId.includes('DarkPattern')) areas.add('Dark Pattern Recognition');
            if (module.moduleId.includes('APR')) areas.add('APR Calculation Methods');
        });
        return Array.from(areas);
    }

    checkCFPBCompliance() {
        // Check for major CFPB violations
        const violations = this.sessionData.complianceViolations.filter(v => 
            v.regulation.includes('CFPB') || v.regulation.includes('12 CFR 1041'));
        return violations.length === 0;
    }

    checkStateCompliance() {
        // Check for state law violations
        const violations = this.sessionData.complianceViolations.filter(v => 
            v.regulation.includes('State') || v.type === 'usury_violation');
        return violations.length === 0;
    }

    calculateEngagement() {
        // Simple engagement metric based on time and interactions
        return {
            timeOnPage: Date.now() - new Date(this.sessionData.timestamp).getTime(),
            interactionCount: this.sessionData.userInteractions.length
        };
    }

    calculateViolationSeverity(violationType) {
        const severityMap = {
            'usury_violation': 'high',
            'dark_pattern': 'medium',
            'disclosure_failure': 'high',
            'consent_violation': 'high',
            'regulatory_evasion': 'high',
            'deceptive_practice': 'medium'
        };
        return severityMap[violationType] || 'low';
    }

    getCurrentContext() {
        return {
            currentStep: window.currentSimulationStep || 'unknown',
            mode: window.currentSimulationMode || 'unknown',
            userAgent: navigator.userAgent.substr(0, 100)
        };
    }

    // Export research data in multiple formats
    exportToCSV() {
        const csvData = this.generateCSVData();
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lotus_research_data_${this.sessionData.sessionId}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    exportToJSON() {
        const jsonData = JSON.stringify(this.sessionData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lotus_research_data_${this.sessionData.sessionId}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    generateResearchReport() {
        const report = {
            executive_summary: this.generateExecutiveSummary(),
            dark_patterns_analysis: this.analyzeDarkPatterns(),
            educational_effectiveness: this.analyzeEducationalEffectiveness(),
            compliance_analysis: this.analyzeCompliance(),
            user_behavior_insights: this.analyzeUserBehavior(),
            recommendations: this.generateRecommendations()
        };
        
        return report;
    }

    generateExecutiveSummary() {
        return {
            sessionId: this.sessionData.sessionId,
            duration: Date.now() - new Date(this.sessionData.timestamp).getTime(),
            darkPatternsDetected: this.sessionData.darkPatternsDetected.length,
            educationalModulesCompleted: this.sessionData.educationalModulesShown.length,
            complianceViolations: this.sessionData.complianceViolations.length,
            knowledgeAssessmentScore: this.calculateKnowledgeScore(),
            overallRiskScore: this.calculateRiskScore()
        };
    }

    analyzeDarkPatterns() {
        const patterns = this.sessionData.darkPatternsDetected;
        const analysis = {
            totalPatterns: patterns.length,
            patternsByType: {},
            severityDistribution: { high: 0, medium: 0, low: 0 },
            timeDistribution: this.analyzePatternTiming(patterns)
        };
        
        patterns.forEach(pattern => {
            analysis.patternsByType[pattern.type] = (analysis.patternsByType[pattern.type] || 0) + 1;
            analysis.severityDistribution[pattern.severity]++;
        });
        
        return analysis;
    }

    analyzeEducationalEffectiveness() {
        const modules = this.sessionData.educationalModulesShown;
        const assessments = this.sessionData.knowledgeAssessments;
        
        return {
            modulesShown: modules.length,
            averageEngagement: this.calculateAverageEngagement(),
            knowledgeRetention: this.calculateKnowledgeRetention(),
            moduleEffectiveness: this.rankModuleEffectiveness()
        };
    }

    analyzeCompliance() {
        return {
            totalViolations: this.sessionData.complianceViolations.length,
            violationsByType: this.groupViolationsByType(),
            severityAnalysis: this.analyzeViolationSeverity(),
            regulatoryGaps: this.identifyRegulatoryGaps()
        };
    }

    generateCSVData() {
        let csv = 'Timestamp,Event_Type,Description,Severity,Context\n';
        
        // Add dark patterns
        this.sessionData.darkPatternsDetected.forEach(pattern => {
            csv += `${pattern.timestamp},Dark_Pattern,"${pattern.description}",${pattern.severity},"${JSON.stringify(pattern.context)}"\n`;
        });
        
        // Add educational modules
        this.sessionData.educationalModulesShown.forEach(module => {
            csv += `${module.timestamp},Educational_Module,"${module.moduleName}",info,"${module.moduleId}"\n`;
        });
        
        // Add compliance violations
        this.sessionData.complianceViolations.forEach(violation => {
            csv += `${violation.timestamp},Compliance_Violation,"${violation.description}",${violation.severity},"${violation.regulation}"\n`;
        });
        
        return csv;
    }

    calculateKnowledgeScore() {
        if (this.sessionData.knowledgeAssessments.length === 0) return 0;
        const correct = this.sessionData.knowledgeAssessments.filter(a => a.correct).length;
        return (correct / this.sessionData.knowledgeAssessments.length) * 100;
    }

    calculateRiskScore() {
        const darkPatternWeight = this.sessionData.darkPatternsDetected.length * 10;
        const violationWeight = this.sessionData.complianceViolations.length * 15;
        const educationBonus = this.sessionData.educationalModulesShown.length * -2;
        
        return Math.max(0, Math.min(100, darkPatternWeight + violationWeight + educationBonus));
    }

    // Additional helper methods would go here...
    analyzePatternTiming(patterns) {
        // Analyze when dark patterns typically appear
        return patterns.map(p => new Date(p.timestamp).getTime());
    }

    calculateAverageEngagement() {
        const engagements = this.sessionData.educationalModulesShown.map(m => m.userEngagement);
        if (engagements.length === 0) return 0;
        
        const totalTime = engagements.reduce((sum, e) => sum + (e?.timeOnPage || 0), 0);
        return totalTime / engagements.length;
    }

    calculateKnowledgeRetention() {
        // Calculate how well knowledge is retained across assessments
        const assessments = this.sessionData.knowledgeAssessments;
        if (assessments.length < 2) return 0;
        
        const recent = assessments.slice(-5); // Last 5 assessments
        const correct = recent.filter(a => a.correct).length;
        return (correct / recent.length) * 100;
    }

    rankModuleEffectiveness() {
        // Rank educational modules by effectiveness (engagement + knowledge retention)
        const moduleStats = {};
        this.sessionData.educationalModulesShown.forEach(module => {
            if (!moduleStats[module.moduleId]) {
                moduleStats[module.moduleId] = {
                    viewCount: 0,
                    totalEngagement: 0,
                    avgEngagement: 0
                };
            }
            moduleStats[module.moduleId].viewCount++;
            moduleStats[module.moduleId].totalEngagement += module.userEngagement?.timeOnPage || 0;
        });
        
        // Calculate averages
        Object.keys(moduleStats).forEach(moduleId => {
            const stats = moduleStats[moduleId];
            stats.avgEngagement = stats.totalEngagement / stats.viewCount;
        });
        
        return moduleStats;
    }

    groupViolationsByType() {
        const grouped = {};
        this.sessionData.complianceViolations.forEach(violation => {
            if (!grouped[violation.type]) grouped[violation.type] = 0;
            grouped[violation.type]++;
        });
        return grouped;
    }

    analyzeViolationSeverity() {
        const severity = { high: 0, medium: 0, low: 0 };
        this.sessionData.complianceViolations.forEach(violation => {
            severity[violation.severity]++;
        });
        return severity;
    }

    identifyRegulatoryGaps() {
        // Identify areas where regulation is lacking or unclear
        const gaps = [];
        const violations = this.sessionData.complianceViolations;
        
        if (violations.some(v => v.type === 'regulatory_evasion')) {
            gaps.push('Regulatory evasion tactics detected - potential gap in oversight');
        }
        
        if (violations.some(v => v.regulation.includes('tribal'))) {
            gaps.push('Tribal sovereignty loophole exploitation - federal/state coordination needed');
        }
        
        return gaps;
    }
}

// Export for use in main application
export default ResearchAnalytics;
