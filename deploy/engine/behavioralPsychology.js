/**
 * Comprehensive Behavioral Psychology Engine for Lotus Simulation
 * 
 * This module provides deep behavioral psychology integration, tracking cognitive biases,
 * decision patterns, and psychological manipulation techniques in real-time.
 */

export class BehavioralPsychologyEngine {
    constructor(echo, session) {
        this.echo = echo;
        this.session = session;
        
        // Comprehensive bias tracking
        this.cognitiveBiases = {
            anchoring: { detected: false, instances: [], severity: 0 },
            availability: { detected: false, instances: [], severity: 0 },
            confirmation: { detected: false, instances: [], severity: 0 },
            loss_aversion: { detected: false, instances: [], severity: 0 },
            present_bias: { detected: false, instances: [], severity: 0 },
            sunk_cost: { detected: false, instances: [], severity: 0 },
            social_proof: { detected: false, instances: [], severity: 0 },
            authority_bias: { detected: false, instances: [], severity: 0 },
            scarcity_bias: { detected: false, instances: [], severity: 0 },
            default_bias: { detected: false, instances: [], severity: 0 }
        };

        // Decision-making patterns
        this.decisionPatterns = {
            system1_activation: 0, // Fast, automatic thinking
            system2_engagement: 0, // Slow, deliberate thinking
            cognitive_load: 0,
            decision_fatigue: 0,
            emotional_state: 'neutral',
            stress_indicators: []
        };

        // Psychological manipulation tactics detected
        this.manipulationTactics = {
            time_pressure: [],
            emotional_appeals: [],
            social_pressure: [],
            artificial_scarcity: [],
            complexity_overwhelm: [],
            false_reassurance: [],
            commitment_escalation: []
        };

        // Real-time psychological monitoring
        this.psychologicalMetrics = {
            attention_tracking: [],
            decision_speed: [],
            hesitation_patterns: [],
            reversal_behaviors: [],
            stress_responses: []
        };

        this.startTime = Date.now();
        this.setupBehavioralTracking();
    }

    setupBehavioralTracking() {
        // Track mouse movement patterns (stress indicators)
        document.addEventListener('mousemove', (e) => {
            this.trackMouseBehavior(e);
        });

        // Track scroll patterns (attention indicators)
        document.addEventListener('scroll', (e) => {
            this.trackScrollBehavior(e);
        });

        // Track form interaction patterns
        document.addEventListener('input', (e) => {
            this.trackInputBehavior(e);
        });

        // Track click hesitation patterns
        document.addEventListener('mousedown', (e) => {
            this.trackClickBehavior(e, 'mousedown');
        });

        document.addEventListener('mouseup', (e) => {
            this.trackClickBehavior(e, 'mouseup');
        });
    }

    // Detect anchoring bias in financial decision-making
    detectAnchoringBias(firstValue, userValue, context = '') {
        const bias = this.cognitiveBiases.anchoring;
        
        // Calculate anchoring effect
        const anchoringStrength = Math.abs(userValue - firstValue) / firstValue;
        
        const instance = {
            timestamp: new Date().toISOString(),
            anchorValue: firstValue,
            userValue: userValue,
            anchoringStrength: anchoringStrength,
            context: context,
            severity: anchoringStrength < 0.1 ? 'high' : anchoringStrength < 0.3 ? 'medium' : 'low'
        };

        bias.instances.push(instance);
        bias.detected = true;
        bias.severity = Math.max(bias.severity, this.calculateBiasSeverity(anchoringStrength));

        this.echo.logAction('cognitive_bias_detected', {
            type: 'anchoring',
            instance: instance,
            educational_note: 'Anchoring bias: First number seen disproportionately influences subsequent judgments'
        });

        return instance;
    }

    // Detect sunk cost fallacy in loan decisions
    detectSunkCostFallacy(investmentAmount, additionalCost, userDecision) {
        const bias = this.cognitiveBiases.sunk_cost;
        
        const sunkCostRatio = investmentAmount / (investmentAmount + additionalCost);
        
        const instance = {
            timestamp: new Date().toISOString(),
            priorInvestment: investmentAmount,
            additionalCost: additionalCost,
            userDecision: userDecision,
            sunkCostRatio: sunkCostRatio,
            severity: sunkCostRatio > 0.7 ? 'high' : sunkCostRatio > 0.4 ? 'medium' : 'low'
        };

        if (userDecision === 'continue' && sunkCostRatio > 0.3) {
            bias.instances.push(instance);
            bias.detected = true;
            bias.severity = Math.max(bias.severity, this.calculateBiasSeverity(sunkCostRatio));

            this.echo.logAction('cognitive_bias_detected', {
                type: 'sunk_cost',
                instance: instance,
                educational_note: 'Sunk cost fallacy: Continuing investment to justify past decisions rather than evaluating future value'
            });
        }

        return instance;
    }

    // Detect present bias (hyperbolic discounting)
    detectPresentBias(immediateReward, futureReward, timeDelay, userChoice) {
        const bias = this.cognitiveBiases.present_bias;
        
        // Calculate rational choice based on fair discount rate (e.g., 5% annually)
        const fairDiscountRate = 0.05;
        const discountedFutureValue = futureReward / Math.pow(1 + fairDiscountRate, timeDelay / 365);
        const rationalChoice = immediateReward > discountedFutureValue ? 'immediate' : 'future';
        
        const instance = {
            timestamp: new Date().toISOString(),
            immediateReward: immediateReward,
            futureReward: futureReward,
            timeDelay: timeDelay,
            userChoice: userChoice,
            rationalChoice: rationalChoice,
            biasDetected: userChoice !== rationalChoice && userChoice === 'immediate',
            severity: this.calculatePresentBiasSeverity(immediateReward, futureReward, timeDelay)
        };

        if (instance.biasDetected) {
            bias.instances.push(instance);
            bias.detected = true;
            bias.severity = Math.max(bias.severity, instance.severity);

            this.echo.logAction('cognitive_bias_detected', {
                type: 'present_bias',
                instance: instance,
                educational_note: 'Present bias: Overvaluing immediate rewards relative to future benefits'
            });
        }

        return instance;
    }

    // Detect loss aversion in financial framing
    detectLossAversion(framingType, userResponse, expectedResponse) {
        const bias = this.cognitiveBiases.loss_aversion;
        
        const instance = {
            timestamp: new Date().toISOString(),
            framingType: framingType, // 'gain' or 'loss'
            userResponse: userResponse,
            expectedResponse: expectedResponse,
            lossAversionDetected: framingType === 'loss' && userResponse !== expectedResponse,
            context: 'Financial product framing experiment'
        };

        if (instance.lossAversionDetected) {
            bias.instances.push(instance);
            bias.detected = true;
            bias.severity = Math.max(bias.severity, 2); // Moderate severity

            this.echo.logAction('cognitive_bias_detected', {
                type: 'loss_aversion',
                instance: instance,
                educational_note: 'Loss aversion: Fear of losses outweighs equivalent gains'
            });
        }

        return instance;
    }

    // Detect System 1 vs System 2 thinking patterns
    analyzeDecisionSystem(decisionTime, complexity, pressure) {
        const patterns = this.decisionPatterns;
        
        // System 1 indicators: fast decisions, low complexity tolerance, high pressure response
        const system1Score = this.calculateSystem1Score(decisionTime, complexity, pressure);
        
        // System 2 indicators: deliberate decisions, complexity handling, pressure resistance
        const system2Score = this.calculateSystem2Score(decisionTime, complexity, pressure);
        
        if (system1Score > system2Score) {
            patterns.system1_activation += 1;
            this.echo.logAction('decision_system_analysis', {
                system: 'System 1',
                decisionTime: decisionTime,
                complexity: complexity,
                pressure: pressure,
                educational_note: 'System 1 thinking: Fast, automatic, potentially exploitable by dark patterns'
            });
        } else {
            patterns.system2_engagement += 1;
            this.echo.logAction('decision_system_analysis', {
                system: 'System 2',
                decisionTime: decisionTime,
                complexity: complexity,
                pressure: pressure,
                educational_note: 'System 2 thinking: Slow, deliberate, more resistant to manipulation'
            });
        }

        return { system1Score, system2Score, dominantSystem: system1Score > system2Score ? 'System 1' : 'System 2' };
    }

    // Track manipulation tactics used against user
    recordManipulationTactic(tacticType, details) {
        const tactics = this.manipulationTactics;
        
        if (!tactics[tacticType]) {
            tactics[tacticType] = [];
        }

        const tacticsInstance = {
            timestamp: new Date().toISOString(),
            type: tacticType,
            details: details,
            psychologicalTarget: this.identifyPsychologicalTarget(tacticType),
            effectiveness: this.assessManipulationEffectiveness(tacticType, details),
            ethicalConcern: this.assessEthicalConcern(tacticType)
        };

        tactics[tacticType].push(tacticsInstance);

        this.echo.logAction('manipulation_tactic_detected', {
            tactic: tacticType,
            instance: tacticsInstance,
            educational_note: this.getManipulationEducationalNote(tacticType)
        });

        return tacticsInstance;
    }

    // Real-time stress and cognitive load monitoring
    trackMouseBehavior(event) {
        const metrics = this.psychologicalMetrics;
        
        // Erratic mouse movement can indicate stress or uncertainty
        const mouseData = {
            timestamp: Date.now(),
            x: event.clientX,
            y: event.clientY,
            speed: this.calculateMouseSpeed(event),
            acceleration: this.calculateMouseAcceleration(event)
        };

        metrics.attention_tracking.push(mouseData);

        // Detect stress patterns
        if (mouseData.speed > this.getStressThreshold() || mouseData.acceleration > this.getAccelerationThreshold()) {
            this.psychologicalMetrics.stress_responses.push({
                timestamp: mouseData.timestamp,
                type: 'erratic_mouse_movement',
                intensity: this.calculateStressIntensity(mouseData)
            });
        }
    }

    trackScrollBehavior(event) {
        // Rapid scrolling or scroll reversals can indicate confusion or overwhelm
        const scrollData = {
            timestamp: Date.now(),
            scrollY: window.scrollY,
            direction: this.calculateScrollDirection(),
            speed: this.calculateScrollSpeed()
        };

        this.psychologicalMetrics.attention_tracking.push(scrollData);

        // Detect cognitive overload patterns
        if (scrollData.speed > this.getCognitiveOverloadThreshold()) {
            this.decisionPatterns.cognitive_load += 1;
        }
    }

    trackInputBehavior(event) {
        // Hesitation in form filling can indicate uncertainty
        const inputData = {
            timestamp: Date.now(),
            fieldType: event.target.type,
            fieldName: event.target.name || event.target.id,
            hesitationTime: this.calculateInputHesitation(event),
            corrections: this.trackInputCorrections(event)
        };

        this.psychologicalMetrics.hesitation_patterns.push(inputData);
    }

    trackClickBehavior(event, phase) {
        // Time between mousedown and mouseup can indicate hesitation
        if (phase === 'mousedown') {
            this.clickStartTime = Date.now();
        } else if (phase === 'mouseup' && this.clickStartTime) {
            const hesitationTime = Date.now() - this.clickStartTime;
            
            if (hesitationTime > 100) { // More than 100ms indicates hesitation
                this.psychologicalMetrics.hesitation_patterns.push({
                    timestamp: Date.now(),
                    type: 'click_hesitation',
                    duration: hesitationTime,
                    element: event.target.tagName,
                    context: this.getCurrentDecisionContext()
                });
            }
        }
    }

    // Generate comprehensive behavioral psychology report
    generateBehavioralReport() {
        const report = {
            sessionId: this.session.sessionId,
            timestamp: new Date().toISOString(),
            sessionDuration: Date.now() - this.startTime,
            
            // Cognitive bias analysis
            cognitiveBiasProfile: this.generateBiasProfile(),
            
            // Decision-making analysis
            decisionMakingProfile: this.generateDecisionProfile(),
            
            // Manipulation vulnerability assessment
            manipulationVulnerability: this.assessManipulationVulnerability(),
            
            // Psychological stress indicators
            stressProfile: this.generateStressProfile(),
            
            // Educational insights
            behavioralInsights: this.generateBehavioralInsights(),
            
            // Recommendations for awareness
            personalizedRecommendations: this.generatePersonalizedRecommendations()
        };

        return report;
    }

    generateBiasProfile() {
        const profile = {};
        
        Object.entries(this.cognitiveBiases).forEach(([biasType, biasData]) => {
            profile[biasType] = {
                detected: biasData.detected,
                instanceCount: biasData.instances.length,
                averageSeverity: biasData.severity,
                latestInstance: biasData.instances[biasData.instances.length - 1] || null,
                vulnerabilityLevel: this.calculateVulnerabilityLevel(biasData)
            };
        });

        return profile;
    }

    generateDecisionProfile() {
        const patterns = this.decisionPatterns;
        
        return {
            system1Dominance: patterns.system1_activation / (patterns.system1_activation + patterns.system2_engagement),
            averageCognitiveLoad: patterns.cognitive_load,
            decisionFatigueLevel: patterns.decision_fatigue,
            emotionalInfluence: patterns.emotional_state,
            stressFactors: patterns.stress_indicators.length,
            decisionQuality: this.calculateDecisionQuality()
        };
    }

    assessManipulationVulnerability() {
        const tacticsCount = Object.values(this.manipulationTactics).reduce((sum, tactics) => sum + tactics.length, 0);
        const effectiveTactics = this.countEffectiveTactics();
        
        return {
            totalTacticsExposed: tacticsCount,
            effectiveTactics: effectiveTactics,
            vulnerabilityScore: (effectiveTactics / Math.max(tacticsCount, 1)) * 100,
            mostVulnerableTo: this.identifyMostEffectiveTacticType(),
            resilienceFactors: this.identifyResilienceFactors()
        };
    }

    generateStressProfile() {
        const stressResponses = this.psychologicalMetrics.stress_responses;
        
        return {
            stressEventCount: stressResponses.length,
            averageStressIntensity: stressResponses.reduce((sum, event) => sum + event.intensity, 0) / stressResponses.length || 0,
            stressPattern: this.analyzeStressPattern(),
            stressors: this.identifyPrimaryStressors(),
            copingMechanisms: this.identifyCopingMechanisms()
        };
    }

    generateBehavioralInsights() {
        return [
            `You demonstrated ${this.decisionPatterns.system1_activation > this.decisionPatterns.system2_engagement ? 'primarily System 1' : 'primarily System 2'} thinking patterns`,
            `${Object.values(this.cognitiveBiases).filter(b => b.detected).length} cognitive biases were detected in your decision-making`,
            `Your vulnerability to manipulation tactics is ${this.assessManipulationVulnerability().vulnerabilityScore.toFixed(1)}%`,
            `Primary decision-making challenges: ${this.identifyPrimaryDecisionChallenges().join(', ')}`,
            `Strongest bias tendencies: ${this.identifyStrongestBiases().join(', ')}`
        ];
    }

    generatePersonalizedRecommendations() {
        const recommendations = [];
        const biasProfile = this.generateBiasProfile();
        const decisionProfile = this.generateDecisionProfile();
        
        // Bias-specific recommendations
        if (biasProfile.anchoring.detected) {
            recommendations.push("Practice questioning first numbers you see in financial decisions - they may be designed to influence you");
        }
        
        if (biasProfile.sunk_cost.detected) {
            recommendations.push("When evaluating continuation of financial commitments, focus on future costs/benefits, not past investments");
        }
        
        if (decisionProfile.system1Dominance > 0.7) {
            recommendations.push("You tend toward quick decisions - practice taking deliberate breaks before important financial choices");
        }
        
        if (this.assessManipulationVulnerability().vulnerabilityScore > 50) {
            recommendations.push("You showed sensitivity to manipulation tactics - be especially cautious of time pressure and emotional appeals");
        }

        return recommendations;
    }

    // Helper methods for calculations
    calculateBiasSeverity(metric) {
        if (metric > 0.7) return 3; // High
        if (metric > 0.4) return 2; // Medium
        return 1; // Low
    }

    calculateSystem1Score(decisionTime, complexity, pressure) {
        let score = 0;
        if (decisionTime < 3000) score += 2; // Less than 3 seconds
        if (complexity > 5 && decisionTime < 10000) score += 2; // Quick decision despite complexity
        if (pressure > 3) score += 1; // High pressure environment
        return score;
    }

    calculateSystem2Score(decisionTime, complexity, pressure) {
        let score = 0;
        if (decisionTime > 10000) score += 2; // More than 10 seconds
        if (complexity > 5 && decisionTime > 15000) score += 2; // Deliberate with complexity
        if (pressure > 3 && decisionTime > 5000) score += 1; // Resisted pressure
        return score;
    }

    calculatePresentBiasSeverity(immediate, future, delay) {
        const impliedDiscountRate = (future - immediate) / immediate / (delay / 365);
        if (impliedDiscountRate > 1.0) return 3; // Very high discount rate
        if (impliedDiscountRate > 0.3) return 2; // High discount rate
        return 1; // Moderate discount rate
    }

    identifyPsychologicalTarget(tacticType) {
        const targets = {
            time_pressure: 'System 1 thinking, present bias',
            emotional_appeals: 'Emotional decision-making, bypassing rational analysis',
            social_pressure: 'Social proof bias, conformity tendency',
            artificial_scarcity: 'Loss aversion, fear of missing out',
            complexity_overwhelm: 'Cognitive overload, decision fatigue',
            false_reassurance: 'Authority bias, trust exploitation',
            commitment_escalation: 'Sunk cost fallacy, consistency principle'
        };
        return targets[tacticType] || 'General decision-making vulnerability';
    }

    getManipulationEducationalNote(tacticType) {
        const notes = {
            time_pressure: 'Time pressure activates System 1 thinking, reducing careful consideration',
            emotional_appeals: 'Emotional appeals bypass rational analysis and exploit psychological vulnerabilities',
            social_pressure: 'Social proof exploits our tendency to follow others, even without verification',
            artificial_scarcity: 'Fake scarcity creates urgency and fear of loss to pressure quick decisions',
            complexity_overwhelm: 'Information overload prevents careful analysis and increases reliance on shortcuts',
            false_reassurance: 'Authority figures or credentials used to reduce skepticism and questioning',
            commitment_escalation: 'Small commitments used to justify progressively larger ones'
        };
        return notes[tacticType] || 'Psychological manipulation technique detected';
    }

    // Additional helper methods would be implemented here...
    calculateMouseSpeed(event) { return 0; } // Placeholder
    calculateMouseAcceleration(event) { return 0; } // Placeholder
    getStressThreshold() { return 100; } // Placeholder
    getAccelerationThreshold() { return 50; } // Placeholder
    calculateStressIntensity(mouseData) { return 1; } // Placeholder
    calculateScrollDirection() { return 'down'; } // Placeholder
    calculateScrollSpeed() { return 0; } // Placeholder
    getCognitiveOverloadThreshold() { return 1000; } // Placeholder
    calculateInputHesitation(event) { return 0; } // Placeholder
    trackInputCorrections(event) { return 0; } // Placeholder
    getCurrentDecisionContext() { return 'unknown'; } // Placeholder
    calculateVulnerabilityLevel(biasData) { return 'medium'; } // Placeholder
    calculateDecisionQuality() { return 50; } // Placeholder
    countEffectiveTactics() { return 0; } // Placeholder
    identifyMostEffectiveTacticType() { return 'time_pressure'; } // Placeholder
    identifyResilienceFactors() { return []; } // Placeholder
    analyzeStressPattern() { return 'increasing'; } // Placeholder
    identifyPrimaryStressors() { return ['time_pressure']; } // Placeholder
    identifyCopingMechanisms() { return []; } // Placeholder
    identifyPrimaryDecisionChallenges() { return ['time_pressure']; } // Placeholder
    identifyStrongestBiases() { return ['anchoring']; } // Placeholder
    assessManipulationEffectiveness(tacticType, details) { return 0.5; } // Placeholder
    assessEthicalConcern(tacticType) { return 'medium'; } // Placeholder
}

export { BehavioralPsychologyEngine };
