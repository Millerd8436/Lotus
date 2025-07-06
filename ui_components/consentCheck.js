/**
 * ui_components/consentCheck.js - Enforces explicit informed consent with feedback
 * 
 * Comprehensive consent verification system that tracks consent quality and provides feedback
 */

export class ConsentCheck {
    constructor() {
        this.consentHistory = [];
        this.consentStandards = {
            minimumReadTime: 3000, // 3 seconds minimum
            requiredScrollPercentage: 80, // Must scroll through 80% of terms
            comprehensionQuestions: true,
            coolingOffPeriod: 5000, // 5 second cooling off
            explicitAgreement: true
        };
        this.consentMetrics = {
            timeSpent: 0,
            scrollPercentage: 0,
            questionsAnswered: 0,
            questionsCorrect: 0,
            hasReadTerms: false,
            hasComprehension: false
        };
    }

    // Initialize consent tracking for a document/terms
    initializeConsentTracking(termsElementId, options = {}) {
        this.consentMetrics = {
            timeSpent: 0,
            scrollPercentage: 0,
            questionsAnswered: 0,
            questionsCorrect: 0,
            hasReadTerms: false,
            hasComprehension: false,
            startTime: Date.now()
        };

        const termsElement = document.getElementById(termsElementId);
        if (termsElement) {
            this.trackScrollBehavior(termsElement);
            this.trackTimeSpent();
        }

        return this.consentMetrics;
    }

    // Track scroll behavior to ensure user reads terms
    trackScrollBehavior(element) {
        let maxScrollPercentage = 0;
        
        element.addEventListener('scroll', () => {
            const scrollTop = element.scrollTop;
            const scrollHeight = element.scrollHeight - element.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            maxScrollPercentage = Math.max(maxScrollPercentage, scrollPercentage);
            this.consentMetrics.scrollPercentage = maxScrollPercentage;
            
            if (maxScrollPercentage >= this.consentStandards.requiredScrollPercentage) {
                this.consentMetrics.hasReadTerms = true;
            }
        });
    }

    // Track time spent reading
    trackTimeSpent() {
        setInterval(() => {
            if (this.consentMetrics.startTime) {
                this.consentMetrics.timeSpent = Date.now() - this.consentMetrics.startTime;
            }
        }, 1000);
    }

    // Present comprehension questions
    async presentComprehensionQuestions(questions) {
        const results = [];
        
        for (const question of questions) {
            const userAnswer = await this.askComprehensionQuestion(question);
            const isCorrect = this.evaluateAnswer(question, userAnswer);
            
            results.push({
                question: question.text,
                userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect,
                feedback: isCorrect ? question.correctFeedback : question.incorrectFeedback
            });
            
            this.consentMetrics.questionsAnswered++;
            if (isCorrect) this.consentMetrics.questionsCorrect++;
        }
        
        this.consentMetrics.hasComprehension = 
            (this.consentMetrics.questionsCorrect / this.consentMetrics.questionsAnswered) >= 0.8;
        
        return results;
    }

    // Ask a single comprehension question
    async askComprehensionQuestion(question) {
        return new Promise((resolve) => {
            // Create question modal
            const modal = document.createElement('div');
            modal.className = 'consent-question-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Comprehension Check</h3>
                    <p>${question.text}</p>
                    <div class="question-options">
                        ${question.options.map((option, index) => `
                            <button class="option-btn" data-answer="${option.value}">${option.text}</button>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // Add styles
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.8); display: flex; align-items: center;
                justify-content: center; z-index: 10000;
            `;
            
            modal.querySelector('.modal-content').style.cssText = `
                background: white; padding: 20px; border-radius: 8px; max-width: 500px;
                margin: 20px; color: black;
            `;
            
            // Handle answer selection
            modal.addEventListener('click', (e) => {
                if (e.target.classList.contains('option-btn')) {
                    const answer = e.target.dataset.answer;
                    document.body.removeChild(modal);
                    resolve(answer);
                }
            });
            
            document.body.appendChild(modal);
        });
    }

    // Evaluate comprehension answer
    evaluateAnswer(question, userAnswer) {
        return userAnswer === question.correctAnswer;
    }

    // Check if consent meets standards
    isConsentValid() {
        const standards = this.consentStandards;
        const metrics = this.consentMetrics;
        
        return {
            isValid: 
                metrics.timeSpent >= standards.minimumReadTime &&
                metrics.scrollPercentage >= standards.requiredScrollPercentage &&
                metrics.hasComprehension,
            timeRequirementMet: metrics.timeSpent >= standards.minimumReadTime,
            scrollRequirementMet: metrics.scrollPercentage >= standards.requiredScrollPercentage,
            comprehensionRequirementMet: metrics.hasComprehension,
            metrics: metrics
        };
    }

    // Provide consent feedback
    generateConsentFeedback() {
        const validation = this.isConsentValid();
        const feedback = {
            overall: validation.isValid ? 'VALID' : 'INVALID',
            issues: [],
            recommendations: [],
            score: this.calculateConsentScore(),
            details: validation
        };

        if (!validation.timeRequirementMet) {
            feedback.issues.push(`Insufficient time spent reading (${this.consentMetrics.timeSpent}ms < ${this.consentStandards.minimumReadTime}ms required)`);
            feedback.recommendations.push('Take more time to carefully read all terms and conditions');
        }

        if (!validation.scrollRequirementMet) {
            feedback.issues.push(`Did not scroll through enough content (${this.consentMetrics.scrollPercentage.toFixed(1)}% < ${this.consentStandards.requiredScrollPercentage}% required)`);
            feedback.recommendations.push('Scroll through and read the entire document');
        }

        if (!validation.comprehensionRequirementMet) {
            feedback.issues.push(`Insufficient comprehension demonstrated (${this.consentMetrics.questionsCorrect}/${this.consentMetrics.questionsAnswered} correct)`);
            feedback.recommendations.push('Review the terms again and ensure you understand all key points');
        }

        return feedback;
    }

    // Calculate consent quality score
    calculateConsentScore() {
        const metrics = this.consentMetrics;
        const standards = this.consentStandards;
        
        let score = 0;
        
        // Time component (25 points)
        score += Math.min(25, (metrics.timeSpent / standards.minimumReadTime) * 25);
        
        // Scroll component (25 points)
        score += Math.min(25, (metrics.scrollPercentage / standards.requiredScrollPercentage) * 25);
        
        // Comprehension component (50 points)
        if (metrics.questionsAnswered > 0) {
            score += (metrics.questionsCorrect / metrics.questionsAnswered) * 50;
        }
        
        return Math.round(score);
    }

    // Record consent event
    recordConsentEvent(eventType, details = {}) {
        const event = {
            timestamp: new Date().toISOString(),
            eventType,
            details,
            metrics: { ...this.consentMetrics }
        };
        
        this.consentHistory.push(event);
        return event;
    }

    // Get consent history
    getConsentHistory() {
        return this.consentHistory;
    }

    // Reset consent tracking
    resetConsentTracking() {
        this.consentMetrics = {
            timeSpent: 0,
            scrollPercentage: 0,
            questionsAnswered: 0,
            questionsCorrect: 0,
            hasReadTerms: false,
            hasComprehension: false
        };
    }

    // Generate comprehensive consent report
    generateConsentReport() {
        return {
            timestamp: new Date().toISOString(),
            consentScore: this.calculateConsentScore(),
            feedback: this.generateConsentFeedback(),
            metrics: this.consentMetrics,
            history: this.consentHistory,
            standards: this.consentStandards
        };
    }
}

export default ConsentCheck;
