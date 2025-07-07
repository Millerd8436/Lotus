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
        this.realTimeMetrics = {
            sessionDuration: 0,
            clickCount: 0,
            scrollDistance: 0,
            pageVisibility: 'visible',
            attentionScore: 100
        };
        this.startTime = Date.now();
    }

    generateSessionId() {
        return 'LOTUS_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    initialize() {
        this.setupEventTracking();
        this.startRealTimeMetrics();
        console.log('🔬 Research Analytics Initialized', { sessionId: this.sessionData.sessionId });
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
            context: this.getCurrentContext(),
            userResponse: null // To be filled when user responds
        };
        
        this.sessionData.darkPatternsDetected.push(darkPattern);
        
        if (this.researchMode) {
            this.updateDashboard();
        }
        
        console.log('🎭 Dark Pattern Detected:', darkPattern);
        return darkPattern.timestamp; // Return ID for later reference
    }

    // Record educational module interactions
    recordEducationalModule(moduleId, moduleTitle, completionStatus = 'viewed') {
        const educationalRecord = {
            timestamp: new Date().toISOString(),
            moduleId: moduleId,
            title: moduleTitle,
            status: completionStatus,
            timeSpent: 0,
            interactionCount: 0
        };
        
        this.sessionData.educationalModulesShown.push(educationalRecord);
        
        if (this.educationalMode) {
            this.updateEducationalProgress();
        }
        
        return educationalRecord;
    }

    // Track compliance violations
    recordComplianceViolation(violationType, description, regulatoryFramework = 'General') {
        const violation = {
            timestamp: new Date().toISOString(),
            type: violationType,
            description: description,
            framework: regulatoryFramework,
            severity: this.assessViolationSeverity(violationType),
            remediation: this.getRemediationSuggestion(violationType)
        };
        
        this.sessionData.complianceViolations.push(violation);
        
        if (this.complianceMode) {
            this.updateComplianceDisplay();
        }
        
        console.warn('⚖️ Compliance Violation:', violation);
        return violation;
    }

    // Track user interactions and decision points
    recordUserInteraction(interactionType, element, value = null) {
        const interaction = {
            timestamp: new Date().toISOString(),
            type: interactionType,
            element: element,
            value: value,
            pageContext: window.location.pathname,
            scrollPosition: window.scrollY
        };
        
        this.sessionData.userInteractions.push(interaction);
        this.realTimeMetrics.clickCount++;
        
        // Update attention score based on interaction patterns
        this.updateAttentionScore(interaction);
    }

    // Record significant decision points
    recordDecisionPoint(decisionType, options, userChoice, timeToDecision = null) {
        const decision = {
            timestamp: new Date().toISOString(),
            type: decisionType,
            options: options,
            userChoice: userChoice,
            timeToDecision: timeToDecision,
            context: this.getCurrentContext(),
            cognitiveLoad: this.assessCognitiveLoad(),
            pressureLevel: this.assessPressureLevel()
        };
        
        this.sessionData.decisionPoints.push(decision);
        console.log('🧠 Decision Point Recorded:', decision);
        return decision;
    }

    // Record knowledge assessment results
    recordKnowledgeAssessment(assessmentType, questions, answers, score) {
        const assessment = {
            timestamp: new Date().toISOString(),
            type: assessmentType,
            questionCount: questions.length,
            correctAnswers: answers.filter(a => a.correct).length,
            score: score,
            timeSpent: 0, // To be calculated
            difficulty: this.calculateAssessmentDifficulty(questions),
            learningObjectives: this.extractLearningObjectives(questions)
        };
        
        this.sessionData.knowledgeAssessments.push(assessment);
        return assessment;
    }

    // Setup comprehensive event tracking
    setupEventTracking() {
        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            this.trackMouseMovement(e);
        });

        // Scroll tracking
        document.addEventListener('scroll', () => {
            this.realTimeMetrics.scrollDistance = window.scrollY;
        });

        // Page visibility tracking
        document.addEventListener('visibilitychange', () => {
            this.realTimeMetrics.pageVisibility = document.hidden ? 'hidden' : 'visible';
            if (document.hidden) {
                this.recordUserInteraction('page_hidden', 'document');
            } else {
                this.recordUserInteraction('page_visible', 'document');
            }
        });

        // Form interaction tracking
        document.addEventListener('input', (e) => {
            this.recordUserInteraction('input', e.target.name || e.target.id, e.target.value);
        });

        // Click tracking
        document.addEventListener('click', (e) => {
            this.recordUserInteraction('click', e.target.tagName, e.target.textContent?.substring(0, 50));
        });
    }

    // Start real-time metrics collection
    startRealTimeMetrics() {
        setInterval(() => {
            this.realTimeMetrics.sessionDuration = Date.now() - this.startTime;
            if (this.researchMode) {
                this.updateRealTimeDisplay();
            }
        }, 1000);
    }

    // Track mouse movement patterns for stress/attention indicators
    trackMouseMovement(event) {
        // Store recent mouse positions for pattern analysis
        if (!this.mousePositions) {
            this.mousePositions = [];
        }
        
        this.mousePositions.push({
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now()
        });
        
        // Keep only recent positions (last 5 seconds)
        const fiveSecondsAgo = Date.now() - 5000;
        this.mousePositions = this.mousePositions.filter(pos => pos.timestamp > fiveSecondsAgo);
        
        // Analyze movement patterns for stress indicators
        if (this.mousePositions.length > 10) {
            this.analyzeMousePatterns();
        }
    }

    // Analyze mouse movement patterns for behavioral insights
    analyzeMousePatterns() {
        if (this.mousePositions.length < 10) return;
        
        // Calculate movement speed and smoothness
        let totalDistance = 0;
        let directionChanges = 0;
        
        for (let i = 1; i < this.mousePositions.length; i++) {
            const prev = this.mousePositions[i - 1];
            const curr = this.mousePositions[i];
            
            const distance = Math.sqrt(
                Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
            );
            totalDistance += distance;
            
            // Detect direction changes (indicators of hesitation/uncertainty)
            if (i > 1) {
                const prevDirection = Math.atan2(
                    this.mousePositions[i - 1].y - this.mousePositions[i - 2].y,
                    this.mousePositions[i - 1].x - this.mousePositions[i - 2].x
                );
                const currDirection = Math.atan2(curr.y - prev.y, curr.x - prev.x);
                
                if (Math.abs(currDirection - prevDirection) > Math.PI / 4) {
                    directionChanges++;
                }
            }
        }
        
        const averageSpeed = totalDistance / this.mousePositions.length;
        const hesitationScore = directionChanges / this.mousePositions.length;
        
        // Record behavioral indicators
        if (hesitationScore > 0.3 || averageSpeed > 50) {
            this.recordUserInteraction('mouse_pattern_analysis', 'movement', {
                averageSpeed,
                hesitationScore,
                interpretation: hesitationScore > 0.3 ? 'high_uncertainty' : 'normal'
            });
        }
    }

    // Update attention score based on interaction patterns
    updateAttentionScore(interaction) {
        const currentTime = Date.now();
        const timeSinceLastInteraction = currentTime - (this.lastInteractionTime || currentTime);
        
        // Decrease attention for long periods without interaction
        if (timeSinceLastInteraction > 30000) { // 30 seconds
            this.realTimeMetrics.attentionScore = Math.max(0, this.realTimeMetrics.attentionScore - 10);
        }
        
        // Increase attention for meaningful interactions
        if (['click', 'input', 'scroll'].includes(interaction.type)) {
            this.realTimeMetrics.attentionScore = Math.min(100, this.realTimeMetrics.attentionScore + 2);
        }
        
        this.lastInteractionTime = currentTime;
    }

    // Assess cognitive load based on current context
    assessCognitiveLoad() {
        let cognitiveLoad = 0;
        
        // Factor in number of elements on screen
        const interactiveElements = document.querySelectorAll('button, input, select, a').length;
        cognitiveLoad += Math.min(interactiveElements * 2, 20);
        
        // Factor in amount of text
        const textLength = document.body.textContent.length;
        cognitiveLoad += Math.min(textLength / 1000, 15);
        
        // Factor in recent dark patterns
        const recentPatterns = this.sessionData.darkPatternsDetected.filter(
            p => Date.now() - new Date(p.timestamp).getTime() < 60000
        ).length;
        cognitiveLoad += recentPatterns * 10;
        
        return Math.min(cognitiveLoad, 100);
    }

    // Assess psychological pressure level
    assessPressureLevel() {
        let pressureLevel = 0;
        
        // Check for urgency timers
        const timers = document.querySelectorAll('[class*="timer"], [class*="countdown"]');
        pressureLevel += timers.length * 15;
        
        // Check for scarcity messaging
        const scarcityTerms = ['limited', 'only', 'hurry', 'expires', 'last chance'];
        const bodyText = document.body.textContent.toLowerCase();
        const scarcityCount = scarcityTerms.reduce((count, term) => {
            return count + (bodyText.match(new RegExp(term, 'g')) || []).length;
        }, 0);
        pressureLevel += scarcityCount * 5;
        
        // Check for recent dark patterns with high severity
        const highSeverityPatterns = this.sessionData.darkPatternsDetected.filter(
            p => p.severity === 'high' && Date.now() - new Date(p.timestamp).getTime() < 120000
        ).length;
        pressureLevel += highSeverityPatterns * 20;
        
        return Math.min(pressureLevel, 100);
    }

    // Get current context for contextual analysis
    getCurrentContext() {
        return {
            url: window.location.href,
            title: document.title,
            activeElement: document.activeElement?.tagName || 'none',
            scrollPosition: window.scrollY,
            viewportSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }

    // Assess severity of compliance violations
    assessViolationSeverity(violationType) {
        const severityMap = {
            'consent_not_obtained': 'critical',
            'disclosure_incomplete': 'high',
            'apr_obfuscation': 'high',
            'dark_pattern_deception': 'medium',
            'rollover_excessive': 'high',
            'collection_illegal': 'critical'
        };
        
        return severityMap[violationType] || 'medium';
    }

    // Get remediation suggestions for violations
    getRemediationSuggestion(violationType) {
        const remediationMap = {
            'consent_not_obtained': 'Implement clear consent mechanism with informed agreement',
            'disclosure_incomplete': 'Provide full disclosure of all fees, terms, and risks',
            'apr_obfuscation': 'Display APR prominently alongside fee amounts',
            'dark_pattern_deception': 'Remove deceptive UI patterns and implement transparent design',
            'rollover_excessive': 'Implement rollover limits and cooling-off periods',
            'collection_illegal': 'Review collection practices for legal compliance'
        };
        
        return remediationMap[violationType] || 'Review practice for regulatory compliance';
    }

    // Calculate assessment difficulty
    calculateAssessmentDifficulty(questions) {
        // Simple heuristic based on question complexity
        const avgLength = questions.reduce((sum, q) => sum + q.text.length, 0) / questions.length;
        const optionCount = questions.reduce((sum, q) => sum + q.options.length, 0) / questions.length;
        
        if (avgLength > 200 || optionCount > 4) return 'hard';
        if (avgLength > 100 || optionCount > 3) return 'medium';
        return 'easy';
    }

    // Extract learning objectives from questions
    extractLearningObjectives(questions) {
        // Extract key concepts from question text
        const allText = questions.map(q => q.text).join(' ').toLowerCase();
        
        const concepts = [];
        if (allText.includes('apr') || allText.includes('interest')) concepts.push('APR Understanding');
        if (allText.includes('fee') || allText.includes('cost')) concepts.push('Fee Structure');
        if (allText.includes('rollover') || allText.includes('extension')) concepts.push('Rollover Mechanics');
        if (allText.includes('consent') || allText.includes('agreement')) concepts.push('Informed Consent');
        if (allText.includes('dark pattern') || allText.includes('deception')) concepts.push('Dark Pattern Recognition');
        
        return concepts;
    }

    // Update research dashboard display
    updateDashboard() {
        const dashboard = document.getElementById('research-metrics');
        if (!dashboard) return;
        
        dashboard.innerHTML = `
            <div class="metrics-grid">
                <div class="metric">
                    <h4>Dark Patterns</h4>
                    <span class="value">${this.sessionData.darkPatternsDetected.length}</span>
                </div>
                <div class="metric">
                    <h4>Compliance Issues</h4>
                    <span class="value">${this.sessionData.complianceViolations.length}</span>
                </div>
                <div class="metric">
                    <h4>Educational Modules</h4>
                    <span class="value">${this.sessionData.educationalModulesShown.length}</span>
                </div>
                <div class="metric">
                    <h4>Decision Points</h4>
                    <span class="value">${this.sessionData.decisionPoints.length}</span>
                </div>
            </div>
        `;
    }

    // Update real-time display
    updateRealTimeDisplay() {
        const realTimeDisplay = document.getElementById('real-time-metrics');
        if (!realTimeDisplay) return;
        
        const duration = Math.floor(this.realTimeMetrics.sessionDuration / 1000);
        
        realTimeDisplay.innerHTML = `
            <div class="real-time-grid">
                <div class="metric">
                    <h5>Session Duration</h5>
                    <span>${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}</span>
                </div>
                <div class="metric">
                    <h5>Attention Score</h5>
                    <span>${this.realTimeMetrics.attentionScore}%</span>
                </div>
                <div class="metric">
                    <h5>Interactions</h5>
                    <span>${this.realTimeMetrics.clickCount}</span>
                </div>
                <div class="metric">
                    <h5>Cognitive Load</h5>
                    <span>${this.assessCognitiveLoad()}%</span>
                </div>
            </div>
        `;
    }

    // Update compliance display
    updateComplianceDisplay() {
        const complianceDisplay = document.getElementById('compliance-status');
        if (!complianceDisplay) return;
        
        const criticalViolations = this.sessionData.complianceViolations.filter(v => v.severity === 'critical').length;
        const totalViolations = this.sessionData.complianceViolations.length;
        
        complianceDisplay.innerHTML = `
            <div class="compliance-summary">
                <div class="status ${criticalViolations > 0 ? 'critical' : totalViolations > 0 ? 'warning' : 'compliant'}">
                    ${criticalViolations > 0 ? 'CRITICAL VIOLATIONS' : totalViolations > 0 ? 'VIOLATIONS DETECTED' : 'COMPLIANT'}
                </div>
                <div class="violation-count">
                    <span>Total Violations: ${totalViolations}</span>
                    <span>Critical: ${criticalViolations}</span>
                </div>
            </div>
        `;
    }

    // Update educational progress display
    updateEducationalProgress() {
        const progressDisplay = document.getElementById('education-metrics');
        if (!progressDisplay) return;
        
        const completedModules = this.sessionData.educationalModulesShown.filter(m => m.status === 'completed').length;
        const totalModules = this.sessionData.educationalModulesShown.length;
        const assessments = this.sessionData.knowledgeAssessments.length;
        
        progressDisplay.innerHTML = `
            <div class="education-summary">
                <div class="progress-metric">
                    <h5>Modules Completed</h5>
                    <span>${completedModules}/${totalModules}</span>
                </div>
                <div class="progress-metric">
                    <h5>Assessments Taken</h5>
                    <span>${assessments}</span>
                </div>
                <div class="progress-metric">
                    <h5>Average Score</h5>
                    <span>${this.calculateAverageAssessmentScore()}%</span>
                </div>
            </div>
        `;
    }

    // Calculate average assessment score
    calculateAverageAssessmentScore() {
        if (this.sessionData.knowledgeAssessments.length === 0) return 0;
        
        const totalScore = this.sessionData.knowledgeAssessments.reduce((sum, assessment) => sum + assessment.score, 0);
        return Math.round(totalScore / this.sessionData.knowledgeAssessments.length);
    }

    // Generate comprehensive analytics report
    generateComprehensiveReport() {
        return {
            sessionMetadata: {
                sessionId: this.sessionData.sessionId,
                timestamp: this.sessionData.timestamp,
                duration: this.realTimeMetrics.sessionDuration,
                environment: {
                    userAgent: this.sessionData.userAgent,
                    screenResolution: this.sessionData.screenResolution,
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }
            },
            
            behavioralAnalytics: {
                interactionCount: this.sessionData.userInteractions.length,
                decisionPoints: this.sessionData.decisionPoints.length,
                averageDecisionTime: this.calculateAverageDecisionTime(),
                attentionMetrics: {
                    finalAttentionScore: this.realTimeMetrics.attentionScore,
                    pageVisibilityChanges: this.sessionData.userInteractions.filter(i => i.type.includes('page_')).length
                },
                cognitiveLoadProfile: this.generateCognitiveLoadProfile()
            },
            
            darkPatternAnalysis: {
                totalDetected: this.sessionData.darkPatternsDetected.length,
                severityBreakdown: this.generateSeverityBreakdown(),
                patterns: this.sessionData.darkPatternsDetected
            },
            
            complianceAnalysis: {
                violationCount: this.sessionData.complianceViolations.length,
                criticalViolations: this.sessionData.complianceViolations.filter(v => v.severity === 'critical'),
                riskAssessment: this.generateRiskAssessment()
            },
            
            educationalAnalysis: {
                modulesEngaged: this.sessionData.educationalModulesShown.length,
                completionRate: this.calculateModuleCompletionRate(),
                assessmentPerformance: this.generateAssessmentSummary(),
                learningObjectivesCovered: this.getLearningObjectivesCovered()
            },
            
            recommendations: this.generateRecommendations()
        };
    }

    // Helper methods for report generation
    calculateAverageDecisionTime() {
        const decisionsWithTime = this.sessionData.decisionPoints.filter(d => d.timeToDecision);
        if (decisionsWithTime.length === 0) return 0;
        
        const totalTime = decisionsWithTime.reduce((sum, d) => sum + d.timeToDecision, 0);
        return totalTime / decisionsWithTime.length;
    }

    generateCognitiveLoadProfile() {
        const recentInteractions = this.sessionData.userInteractions.slice(-20);
        const loadEvents = recentInteractions.map(interaction => ({
            timestamp: interaction.timestamp,
            estimatedLoad: this.assessCognitiveLoad()
        }));
        
        return {
            peakLoad: Math.max(...loadEvents.map(e => e.estimatedLoad)),
            averageLoad: loadEvents.reduce((sum, e) => sum + e.estimatedLoad, 0) / loadEvents.length,
            loadEvents: loadEvents
        };
    }

    generateSeverityBreakdown() {
        const breakdown = { low: 0, medium: 0, high: 0, critical: 0 };
        this.sessionData.darkPatternsDetected.forEach(pattern => {
            breakdown[pattern.severity] = (breakdown[pattern.severity] || 0) + 1;
        });
        return breakdown;
    }

    generateRiskAssessment() {
        const criticalCount = this.sessionData.complianceViolations.filter(v => v.severity === 'critical').length;
        const highCount = this.sessionData.complianceViolations.filter(v => v.severity === 'high').length;
        
        let riskLevel = 'LOW';
        if (criticalCount > 0) riskLevel = 'CRITICAL';
        else if (highCount > 2) riskLevel = 'HIGH';
        else if (this.sessionData.complianceViolations.length > 0) riskLevel = 'MEDIUM';
        
        return {
            level: riskLevel,
            score: Math.min(100, (criticalCount * 40) + (highCount * 20) + (this.sessionData.complianceViolations.length * 5)),
            factors: this.identifyRiskFactors()
        };
    }

    calculateModuleCompletionRate() {
        if (this.sessionData.educationalModulesShown.length === 0) return 0;
        
        const completed = this.sessionData.educationalModulesShown.filter(m => m.status === 'completed').length;
        return (completed / this.sessionData.educationalModulesShown.length) * 100;
    }

    generateAssessmentSummary() {
        return {
            totalAssessments: this.sessionData.knowledgeAssessments.length,
            averageScore: this.calculateAverageAssessmentScore(),
            difficultyDistribution: this.getDifficultyDistribution()
        };
    }

    getLearningObjectivesCovered() {
        const allObjectives = this.sessionData.knowledgeAssessments
            .flatMap(assessment => assessment.learningObjectives || []);
        return [...new Set(allObjectives)];
    }

    identifyRiskFactors() {
        const factors = [];
        
        if (this.sessionData.complianceViolations.some(v => v.type === 'consent_not_obtained')) {
            factors.push('Informed consent not properly obtained');
        }
        
        if (this.sessionData.darkPatternsDetected.some(p => p.severity === 'high')) {
            factors.push('High-severity dark patterns detected');
        }
        
        if (this.assessPressureLevel() > 60) {
            factors.push('High psychological pressure environment');
        }
        
        return factors;
    }

    getDifficultyDistribution() {
        const distribution = { easy: 0, medium: 0, hard: 0 };
        this.sessionData.knowledgeAssessments.forEach(assessment => {
            distribution[assessment.difficulty] = (distribution[assessment.difficulty] || 0) + 1;
        });
        return distribution;
    }

    generateRecommendations() {
        const recommendations = [];
        
        // Dark pattern recommendations
        if (this.sessionData.darkPatternsDetected.length > 3) {
            recommendations.push({
                category: 'dark_patterns',
                priority: 'high',
                recommendation: 'Reduce use of dark patterns to improve user experience and ethical compliance'
            });
        }
        
        // Compliance recommendations
        if (this.sessionData.complianceViolations.some(v => v.severity === 'critical')) {
            recommendations.push({
                category: 'compliance',
                priority: 'critical',
                recommendation: 'Address critical compliance violations immediately to avoid regulatory issues'
            });
        }
        
        // Educational recommendations
        if (this.calculateModuleCompletionRate() < 50) {
            recommendations.push({
                category: 'education',
                priority: 'medium',
                recommendation: 'Improve educational content engagement to enhance user understanding'
            });
        }
        
        return recommendations;
    }

    // Export data for research purposes
    exportData() {
        return {
            sessionData: this.sessionData,
            realTimeMetrics: this.realTimeMetrics,
            comprehensiveReport: this.generateComprehensiveReport(),
            exportTimestamp: new Date().toISOString()
        };
    }

    // Reset analytics for new session
    reset() {
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
        
        this.realTimeMetrics = {
            sessionDuration: 0,
            clickCount: 0,
            scrollDistance: 0,
            pageVisibility: 'visible',
            attentionScore: 100
        };
        
        this.startTime = Date.now();
        this.mousePositions = [];
        this.lastInteractionTime = null;
    }
}

export { ResearchAnalytics };
