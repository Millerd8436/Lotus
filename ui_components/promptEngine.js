// ui_components/promptEngine.js

/**
 * Comprehensive Prompt Engine for Dark Pattern Implementation
 * Implements sophisticated persuasion and manipulation techniques
 */

class PromptEngine {
    constructor() {
        this.promptHistory = [];
        this.userProfile = {
            vulnerability: 'medium',
            responsePattern: 'neutral',
            suspicion: 'low'
        };
        this.manipulationTechniques = {
            scarcity: true,
            authority: true,
            social_proof: true,
            commitment: true,
            urgency: true,
            fear: true,
            reciprocity: true
        };
    }

    /**
     * Generate contextual prompts based on user behavior and vulnerability
     */
    generatePrompt(context, darkPatternType) {
        const prompt = {
            id: `prompt_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: darkPatternType,
            context: context,
            technique: this._selectTechnique(context),
            content: null,
            effectiveness: null
        };

        switch (darkPatternType) {
            case 'urgency':
                prompt.content = this._generateUrgencyPrompt(context);
                break;
            case 'scarcity':
                prompt.content = this._generateScarcityPrompt(context);
                break;
            case 'authority':
                prompt.content = this._generateAuthorityPrompt(context);
                break;
            case 'social_proof':
                prompt.content = this._generateSocialProofPrompt(context);
                break;
            case 'fear':
                prompt.content = this._generateFearPrompt(context);
                break;
            case 'reciprocity':
                prompt.content = this._generateReciprocityPrompt(context);
                break;
            case 'commitment':
                prompt.content = this._generateCommitmentPrompt(context);
                break;
            case 'cognitive_load':
                prompt.content = this._generateCognitiveLoadPrompt(context);
                break;
            default:
                prompt.content = this._generateGenericPrompt(context);
        }

        this.promptHistory.push(prompt);
        return prompt;
    }

    /**
     * Urgency-based prompts with time pressure
     */
    _generateUrgencyPrompt(context) {
        const urgencyPrompts = [
            {
                text: "⏰ This offer expires in 3 minutes! Don't miss your chance for instant cash!",
                visual: "timer",
                audio: "tick",
                manipulation_level: "high"
            },
            {
                text: "🔥 FLASH APPROVAL! Complete now before rates go up tomorrow!",
                visual: "flash",
                audio: "alert",
                manipulation_level: "extreme"
            },
            {
                text: "💨 Only 2 spots left for today's special rate - secure yours now!",
                visual: "countdown",
                audio: "heartbeat",
                manipulation_level: "high"
            }
        ];
        
        return this._selectPromptByVulnerability(urgencyPrompts);
    }

    /**
     * Scarcity-based prompts creating artificial limitation
     */
    _generateScarcityPrompt(context) {
        const scarcityPrompts = [
            {
                text: "⚠️ Limited funds available - only $50,000 left in today's pool!",
                visual: "progress_bar",
                audio: null,
                manipulation_level: "medium"
            },
            {
                text: "🎯 You're pre-approved! But this exclusive offer is only for the next 10 customers.",
                visual: "exclusivity_badge",
                audio: null,
                manipulation_level: "high"
            },
            {
                text: "📍 Based on your location, you qualify for our last available slot today.",
                visual: "location_pin",
                audio: null,
                manipulation_level: "medium"
            }
        ];

        return this._selectPromptByVulnerability(scarcityPrompts);
    }

    /**
     * Authority-based prompts using false expertise
     */
    _generateAuthorityPrompt(context) {
        const authorityPrompts = [
            {
                text: "👨‍💼 Financial Expert Recommendation: 'This is your best option for immediate relief.'",
                visual: "expert_photo",
                audio: null,
                manipulation_level: "high"
            },
            {
                text: "🏆 Award-winning lender trusted by 2 million Americans. Join them today!",
                visual: "awards_banner",
                audio: null,
                manipulation_level: "medium"
            },
            {
                text: "📜 Regulated by state authorities - your safety is our priority.",
                visual: "official_seal",
                audio: null,
                manipulation_level: "medium"
            }
        ];

        return this._selectPromptByVulnerability(authorityPrompts);
    }

    /**
     * Social proof prompts with fake testimonials
     */
    _generateSocialProofPrompt(context) {
        const socialProofPrompts = [
            {
                text: "💬 'This saved my family!' - Jennifer K., verified customer",
                visual: "customer_photo",
                audio: null,
                manipulation_level: "high"
            },
            {
                text: "📊 847 people in your area got approved this week. Join them!",
                visual: "statistics_chart",
                audio: null,
                manipulation_level: "medium"
            },
            {
                text: "⭐⭐⭐⭐⭐ 4.9/5 stars from 15,432 satisfied customers",
                visual: "star_rating",
                audio: null,
                manipulation_level: "medium"
            }
        ];

        return this._selectPromptByVulnerability(socialProofPrompts);
    }

    /**
     * Fear-based prompts exploiting desperation
     */
    _generateFearPrompt(context) {
        const fearPrompts = [
            {
                text: "⚡ Avoid late fees and penalties - get cash before your bills are due!",
                visual: "warning_icon",
                audio: "warning",
                manipulation_level: "high"
            },
            {
                text: "🚨 Don't let your credit score drop further. Act now to protect your future!",
                visual: "credit_alert",
                audio: "siren",
                manipulation_level: "extreme"
            },
            {
                text: "💔 Emergency funds when life hits hard. We understand your pain.",
                visual: "empathy_image",
                audio: null,
                manipulation_level: "high"
            }
        ];

        return this._selectPromptByVulnerability(fearPrompts);
    }

    /**
     * Reciprocity prompts creating false obligation
     */
    _generateReciprocityPrompt(context) {
        const reciprocityPrompts = [
            {
                text: "🎁 We've already saved you a spot. Complete your application to claim it!",
                visual: "gift_box",
                audio: null,
                manipulation_level: "medium"
            },
            {
                text: "💝 As a thank you for visiting, here's an exclusive $50 discount on fees!",
                visual: "discount_badge",
                audio: null,
                manipulation_level: "medium"
            },
            {
                text: "🤝 We've pre-approved you as a courtesy. Show your appreciation by accepting today!",
                visual: "handshake",
                audio: null,
                manipulation_level: "high"
            }
        ];

        return this._selectPromptByVulnerability(reciprocityPrompts);
    }

    /**
     * Commitment prompts using consistency principle
     */
    _generateCommitmentPrompt(context) {
        const commitmentPrompts = [
            {
                text: "✅ You said you needed help. Let us help you follow through on that commitment.",
                visual: "checkmark",
                audio: null,
                manipulation_level: "medium"
            },
            {
                text: "📝 Complete what you started. You're 90% done with your application!",
                visual: "progress_90",
                audio: null,
                manipulation_level: "high"
            },
            {
                text: "💪 You're taking control of your finances. Finish strong with this final step!",
                visual: "strength_icon",
                audio: null,
                manipulation_level: "medium"
            }
        ];

        return this._selectPromptByVulnerability(commitmentPrompts);
    }

    /**
     * Cognitive load prompts creating confusion
     */
    _generateCognitiveLoadPrompt(context) {
        const cognitivePrompts = [
            {
                text: "📊 Variable APR: 15.99%-399.99% based on creditworthiness, state regulations, and current market conditions. Terms subject to change. See full disclosure.",
                visual: "complex_chart",
                audio: null,
                manipulation_level: "extreme"
            },
            {
                text: "⚖️ By proceeding, you agree to binding arbitration, automatic renewal terms, and collection procedures as outlined in sections 4.2.1-4.2.15 of the user agreement.",
                visual: "legal_text",
                audio: null,
                manipulation_level: "extreme"
            }
        ];

        return this._selectPromptByVulnerability(cognitivePrompts);
    }

    /**
     * Select prompt based on user vulnerability level
     */
    _selectPromptByVulnerability(prompts) {
        const vulnerabilityIndex = {
            'low': 0,
            'medium': 1,
            'high': Math.min(2, prompts.length - 1)
        };

        const index = vulnerabilityIndex[this.userProfile.vulnerability] || 0;
        return prompts[Math.min(index, prompts.length - 1)];
    }

    /**
     * Select manipulation technique based on context
     */
    _selectTechnique(context) {
        const activeThemes = Object.keys(this.manipulationTechniques)
            .filter(technique => this.manipulationTechniques[technique]);

        if (context.timeOnPage > 300) return 'urgency';
        if (context.formProgress > 0.5) return 'commitment';
        if (context.hesitation) return 'social_proof';
        
        return activeThemes[Math.floor(Math.random() * activeThemes.length)];
    }

    /**
     * Update user profile based on interactions
     */
    updateUserProfile(interaction) {
        // Increase vulnerability if user responds to manipulation
        if (interaction.responded_to_manipulation) {
            this.userProfile.vulnerability = this._increaseVulnerability();
        }

        // Track response patterns
        this.userProfile.responsePattern = interaction.response_type;
        
        // Adjust suspicion level
        if (interaction.questioned_terms) {
            this.userProfile.suspicion = 'high';
        }
    }

    /**
     * Increase vulnerability level
     */
    _increaseVulnerability() {
        const levels = ['low', 'medium', 'high'];
        const currentIndex = levels.indexOf(this.userProfile.vulnerability);
        return levels[Math.min(currentIndex + 1, levels.length - 1)];
    }

    /**
     * Generate contextual popup messages
     */
    generatePopup(trigger) {
        const popups = {
            exit_intent: {
                title: "Wait! Don't Leave Empty-Handed!",
                message: "We've prepared a special offer just for you. Get $500 instantly approved!",
                buttons: ["Get My $500", "No Thanks"],
                manipulation_level: "extreme"
            },
            form_hesitation: {
                title: "Need Help?",
                message: "Our loan specialist is standing by to personally assist you. No obligation!",
                buttons: ["Get Help Now", "Continue Alone"],
                manipulation_level: "medium"
            },
            time_spent: {
                title: "⏰ Your Session Expires Soon",
                message: "To maintain security, this pre-approval expires in 5 minutes.",
                buttons: ["Complete Now", "Start Over"],
                manipulation_level: "high"
            }
        };

        return popups[trigger] || null;
    }

    /**
     * Generate adaptive messaging based on user behavior
     */
    generateAdaptiveMessage(userBehavior) {
        const messages = {
            multiple_visits: "Welcome back! Your previous application is still available.",
            quick_bounce: "Wait! See what you qualify for in just 60 seconds.",
            price_sensitive: "Lower rates available for a limited time today.",
            comparison_shopping: "Don't let other sites take advantage of you. We offer the best rates.",
            mobile_user: "Apply in 2 minutes from your phone. No paperwork needed."
        };

        return messages[userBehavior] || "Get the cash you need today.";
    }

    /**
     * Get manipulation effectiveness metrics
     */
    getManipulationMetrics() {
        const totalPrompts = this.promptHistory.length;
        const effectivePrompts = this.promptHistory.filter(p => p.effectiveness === 'high').length;
        
        return {
            total_prompts: totalPrompts,
            effective_prompts: effectivePrompts,
            effectiveness_rate: totalPrompts > 0 ? (effectivePrompts / totalPrompts) * 100 : 0,
            manipulation_techniques_used: Object.keys(this.manipulationTechniques).filter(key => this.manipulationTechniques[key]),
            user_vulnerability_level: this.userProfile.vulnerability,
            user_response_pattern: this.userProfile.responsePattern,
            most_effective_technique: this._getMostEffectiveTechnique(),
            total_manipulation_score: this._calculateTotalManipulationScore()
        };
    }

    /**
     * Get most effective manipulation technique
     */
    _getMostEffectiveTechnique() {
        const techniques = {};
        this.promptHistory.forEach(prompt => {
            if (prompt.effectiveness === 'high') {
                techniques[prompt.technique] = (techniques[prompt.technique] || 0) + 1;
            }
        });

        return Object.keys(techniques).reduce((a, b) => 
            techniques[a] > techniques[b] ? a : b, null) || 'none';
    }

    /**
     * Calculate total manipulation score
     */
    _calculateTotalManipulationScore() {
        let score = 0;
        this.promptHistory.forEach(prompt => {
            switch(prompt.manipulation_level) {
                case 'extreme': score += 4; break;
                case 'high': score += 3; break;
                case 'medium': score += 2; break;
                case 'low': score += 1; break;
            }
        });
        return score;
    }

    /**
     * Reset engine state
     */
    reset() {
        this.promptHistory = [];
        this.userProfile = {
            vulnerability: 'medium',
            responsePattern: 'neutral',
            suspicion: 'low'
        };
    }

    // RECOVERED: Manipulation report generation methods
    generateManipulationReport() {
        return {
            session_summary: {
                total_prompts: this.promptHistory.length,
                manipulation_score: this._calculateTotalManipulationScore(),
                user_vulnerability: this.userProfile.vulnerability,
                most_effective_technique: this._getMostEffectiveTechnique()
            },
            warning_signs: this._getWarningSignsCount(),
            user_awareness: this._assessUserAwareness(),
            manipulation_timeline: this._getManipulationTimeline(),
            ethical_concerns: this._assessEthicalConcerns(),
            recommendations: this._generateRecommendations()
        };
    }

    _getWarningSignsCount() {
        let warningCount = 0;
        this.promptHistory.forEach(prompt => {
            if (prompt.manipulation_level === 'extreme') warningCount += 3;
            else if (prompt.manipulation_level === 'high') warningCount += 2;
            else if (prompt.manipulation_level === 'medium') warningCount += 1;
        });
        return {
            total_warnings: warningCount,
            severity: warningCount > 20 ? 'extreme' : warningCount > 10 ? 'high' : 'moderate'
        };
    }

    _assessUserAwareness() {
        const suspicionLevel = this.userProfile.suspicion;
        const responsePattern = this.userProfile.responsePattern;
        
        return {
            suspicion_level: suspicionLevel,
            response_pattern: responsePattern,
            manipulation_resistance: suspicionLevel === 'high' ? 'strong' : 
                                   suspicionLevel === 'medium' ? 'moderate' : 'weak',
            recommendations: this._generateUserRecommendations()
        };
    }

    _getManipulationTimeline() {
        return this.promptHistory.map((prompt, index) => ({
            sequence: index + 1,
            technique: prompt.technique,
            manipulation_level: prompt.manipulation_level,
            timestamp: prompt.timestamp,
            effectiveness: prompt.effectiveness || 'unknown'
        }));
    }

    _assessEthicalConcerns() {
        const extremeCount = this.promptHistory.filter(p => p.manipulation_level === 'extreme').length;
        const highCount = this.promptHistory.filter(p => p.manipulation_level === 'high').length;
        
        return {
            extreme_manipulation_count: extremeCount,
            high_manipulation_count: highCount,
            ethical_score: Math.max(0, 100 - (extremeCount * 10 + highCount * 5)),
            concerns: this._listEthicalConcerns()
        };
    }

    _listEthicalConcerns() {
        const concerns = [];
        
        if (this.promptHistory.some(p => p.technique === 'fear')) {
            concerns.push('Exploitation of user desperation and fear');
        }
        if (this.promptHistory.some(p => p.technique === 'urgency')) {
            concerns.push('Artificial time pressure preventing informed decisions');
        }
        if (this.promptHistory.some(p => p.technique === 'social_proof')) {
            concerns.push('Use of potentially fabricated testimonials');
        }
        if (this.promptHistory.some(p => p.technique === 'cognitive_load')) {
            concerns.push('Deliberate confusion to prevent comprehension');
        }
        
        return concerns;
    }

    _generateRecommendations() {
        return [
            'Implement informed consent procedures',
            'Provide clear, plain-language disclosures',
            'Remove time pressure tactics',
            'Eliminate fabricated social proof',
            'Add cooling-off periods',
            'Provide financial counseling resources'
        ];
    }

    _generateUserRecommendations() {
        return [
            'Take time to read all terms carefully',
            'Compare multiple options before deciding',
            'Consult with financial counselors',
            'Be wary of high-pressure tactics',
            'Consider alternative funding sources'
        ];
    }
}

// Export the class
export { PromptEngine };
