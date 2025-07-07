/**
 * ui-components.js - Complete UI components for Lotus Payday Loan Simulator
 * All exploitative mechanics, educational content, and features restored
 */

import { debounce, formatCurrency, logger } from './utils.js';

// Enhanced Dark Pattern Engine with all exploitative mechanics
export class TrapUIEngine {
    constructor() {
        this.activeTraps = new Map();
        this.ghostModeEnabled = false;
        this.exploitationLevel = 0;
        this.coercionIndex = 0;
        this.rolloverTraps = [];
        this.feeObfuscation = true;
        this.aprHidden = true;
    }

    initialize() {
        this.setupExploitativeUI();
        this.initializeRolloverTraps();
        this.setupFeeObfuscation();
        this.startPsychologicalPressure();
        logger.info('🕷️ Trap UI Engine initialized - All exploitative features active');
    }

    setupExploitativeUI() {
        // Pre-checked auto-renewal (major trap)
        const autoRenewHTML = `
            <div class="auto-renew-trap" data-deceptive="auto-renewal">
                <label class="checkbox-container">
                    <input type="checkbox" id="auto-renew" checked style="transform: scale(0.8);">
                    <span class="checkmark"></span>
                    <span class="small-text">Automatic renewal for your convenience</span>
                </label>
                <div class="ghost-warning hidden">
                    ⚠️ This checkbox enables automatic debt rollovers at high fees!
                </div>
            </div>
        `;

        // Hidden APR with prominent fee display
        const feeDisplayHTML = `
            <div class="fee-display-trap" data-deceptive="fee-obfuscation">
                <div class="prominent-fee">
                    <span class="fee-amount">Just $15</span>
                    <span class="fee-per">per $100 borrowed</span>
                </div>
                <div class="hidden-apr" style="font-size: 8px; color: #666; margin-top: 20px;">
                    (391% APR - but who reads this?)
                </div>
                <div class="ghost-warning hidden">
                    💡 True cost: 391% Annual Percentage Rate - equivalent to loan shark rates!
                </div>
            </div>
        `;

        // Urgency pressure with fake scarcity
        const urgencyHTML = `
            <div class="urgency-trap" data-deceptive="artificial-scarcity">
                <div class="urgency-banner blink">
                    <span class="urgent-text">⚡ FLASH OFFER: Only 3 slots left!</span>
                    <span class="countdown-timer" id="urgency-timer">04:59</span>
                </div>
                <div class="ghost-warning hidden">
                    🎭 Fake scarcity - there are no "limited slots" for loans!
                </div>
            </div>
        `;

        this.injectTrapHTML(autoRenewHTML, 'auto-renew-container');
        this.injectTrapHTML(feeDisplayHTML, 'fee-display-container');
        this.injectTrapHTML(urgencyHTML, 'urgency-container');

        this.activeTraps.set('auto-renewal', true);
        this.activeTraps.set('fee-obfuscation', true);
        this.activeTraps.set('artificial-scarcity', true);
    }

    initializeRolloverTraps() {
        this.rolloverTraps = [
            {
                trigger: 'loan-due',
                message: 'Unable to pay? No problem! Roll over for just $25 more.',
                coercionLevel: 'high',
                psychologyUsed: 'debt-relief-illusion'
            },
            {
                trigger: 'second-rollover',
                message: 'Congratulations! You qualify for another extension.',
                coercionLevel: 'extreme',
                psychologyUsed: 'celebration-manipulation'
            },
            {
                trigger: 'debt-spiral',
                message: 'Need more cash? You are pre-approved for $500 more!',
                coercionLevel: 'predatory',
                psychologyUsed: 'credit-limit-illusion'
            }
        ];
    }

    triggerRolloverTrap(rolloverCount = 0) {
        const trap = this.rolloverTraps[Math.min(rolloverCount, this.rolloverTraps.length - 1)];
        
        const trapModal = document.createElement('div');
        trapModal.className = 'rollover-trap-modal';
        trapModal.innerHTML = `
            <div class="trap-content" data-deceptive="debt-cycle-encouragement">
                <h3>💰 ${trap.message}</h3>
                <div class="trap-options">
                    <button class="btn-primary trap-accept" onclick="window.LotusApp.trapUIEngine.acceptRollover()">
                        Yes, extend my loan
                    </button>
                    <button class="btn-secondary trap-decline" style="font-size: 0.8em; color: #666;">
                        Decline (and face consequences)
                    </button>
                </div>
                <div class="ghost-warning hidden">
                    ⚠️ This is the debt trap! Each rollover adds fees without reducing principal.
                </div>
            </div>
        `;
        
        document.body.appendChild(trapModal);
        this.coercionIndex += 25;
        logger.warn('Rollover trap triggered', { rolloverCount, coercionIndex: this.coercionIndex });
    }

    acceptRollover() {
        const currentLoan = window.LotusApp.currentSession;
        if (currentLoan) {
            currentLoan.rolloverCount++;
            currentLoan.totalCost += currentLoan.fee;
            currentLoan.tagDarkPattern('rollover-accepted', {
                rolloverNumber: currentLoan.rolloverCount,
                additionalFee: currentLoan.fee,
                cumulativeCost: currentLoan.totalCost
            });
        }
        
        document.querySelector('.rollover-trap-modal')?.remove();
        this.showCelebrationManipulation();
    }

    showCelebrationManipulation() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration-manipulation';
        celebration.innerHTML = `
            <div class="celebration-content" data-deceptive="positive-reinforcement">
                <h3>🎉 Congratulations!</h3>
                <p>Your loan has been extended. You're all set!</p>
                <p class="small-print">Additional fee of $25 added to your account.</p>
                <div class="ghost-warning hidden">
                    🧠 Celebration language masks the fact you just paid more fees without reducing debt!
                </div>
            </div>
        `;
        
        document.body.appendChild(celebration);
        setTimeout(() => celebration.remove(), 4000);
    }

    injectTrapHTML(html, containerId) {
        let container = document.getElementById(containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            document.body.appendChild(container);
        }
        container.innerHTML = html;
    }

    enableGhostMode() {
        this.ghostModeEnabled = true;
        document.querySelectorAll('.ghost-warning').forEach(el => {
            el.classList.remove('hidden');
            el.style.display = 'block';
            el.style.background = '#1f2937';
            el.style.color = '#fbbf24';
            el.style.padding = '8px';
            el.style.margin = '4px 0';
            el.style.borderRadius = '4px';
            el.style.fontSize = '0.9em';
        });

        document.querySelectorAll('[data-deceptive]').forEach(el => {
            el.style.border = '2px solid #ef4444';
            el.style.background = 'rgba(239, 68, 68, 0.1)';
        });

        logger.info('👻 Ghost Mode enabled - All deceptive patterns revealed');
    }

    disableGhostMode() {
        this.ghostModeEnabled = false;
        document.querySelectorAll('.ghost-warning').forEach(el => {
            el.classList.add('hidden');
            el.style.display = 'none';
        });

        document.querySelectorAll('[data-deceptive]').forEach(el => {
            el.style.border = '';
            el.style.background = '';
        });
    }
}

// Comprehensive Educational Engine with quizzes
export class ComprehensiveEducationalEngine {
    constructor() {
        this.modules = {
            'behavioral-psychology': {
                title: 'Behavioral Psychology in Predatory Lending',
                concepts: [
                    'Cognitive biases exploited by lenders',
                    'System 1 vs System 2 decision making',
                    'Anchoring bias in fee presentation',
                    'Loss aversion and debt psychology'
                ],
                quiz: {
                    questions: [
                        {
                            q: "Why do payday lenders show '$15 per $100' instead of '391% APR'?",
                            options: [
                                "To comply with regulations",
                                "To exploit anchoring bias - smaller numbers seem more manageable",
                                "Because APR calculations are too complex",
                                "To save space on the form"
                            ],
                            correct: 1,
                            explanation: "Lenders exploit anchoring bias by presenting the smaller fee amount, making the cost seem manageable compared to the true 391% APR."
                        },
                        {
                            q: "What psychological mechanism makes rollover offers seem helpful?",
                            options: [
                                "Genuine customer service",
                                "Debt relief illusion - temporary payment postponement feels like help",
                                "Legal requirement to offer extensions",
                                "Competitive pressure from other lenders"
                            ],
                            correct: 1,
                            explanation: "The 'debt relief illusion' makes paying just the fee feel like solving the problem, when it actually extends the debt cycle."
                        }
                    ]
                }
            },
            'legal-mechanisms': {
                title: 'Legal Loopholes and Regulatory Arbitrage',
                concepts: [
                    'Fee vs interest distinction',
                    'Tribal sovereignty exploitation',
                    'Rent-a-bank schemes',
                    'State regulatory variations'
                ],
                quiz: {
                    questions: [
                        {
                            q: "How do payday lenders legally charge 391% APR in states with 36% caps?",
                            options: [
                                "They ignore the law",
                                "They call it a 'fee' not 'interest' to bypass usury laws",
                                "They get special permits",
                                "The 36% cap doesn't apply to payday loans"
                            ],
                            correct: 1,
                            explanation: "By structuring payments as 'fees' rather than 'interest', lenders circumvent APR caps that only regulate interest rates."
                        }
                    ]
                }
            },
            'debt-cycle-mechanics': {
                title: 'Understanding the Debt Trap Cycle',
                concepts: [
                    'Rollover mechanics and cumulative costs',
                    'Principal vs fee payments',
                    'Debt spiral mathematics',
                    'Exit strategy difficulties'
                ],
                quiz: {
                    questions: [
                        {
                            q: "After 5 rollovers on a $300 loan with $45 fees, how much has the borrower paid?",
                            options: [
                                "$300 (just the principal)",
                                "$345 (principal plus one fee)",
                                "$225 (5 × $45 fees only)",
                                "$525 (principal still owed + $225 in fees)"
                            ],
                            correct: 3,
                            explanation: "Rollovers only pay the fee ($45 × 5 = $225) while the $300 principal remains untouched, creating a total obligation of $525."
                        }
                    ]
                }
            }
        };
        this.currentModule = null;
        this.progress = {};
    }

    startModule(moduleId) {
        this.currentModule = this.modules[moduleId];
        if (!this.currentModule) return;
        this.showModuleIntro(moduleId);
    }

    showModuleIntro(moduleId) {
        const modal = document.createElement('div');
        modal.className = 'educational-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>📚 ${this.currentModule.title}</h2>
                <div class="module-concepts">
                    <h3>Learning Objectives:</h3>
                    <ul>
                        ${this.currentModule.concepts.map(concept => `<li>${concept}</li>`).join('')}
                    </ul>
                </div>
                <div class="module-actions">
                    <button onclick="window.LotusApp.educationalEngine.startQuiz('${moduleId}')" class="btn-primary">
                        Start Interactive Quiz
                    </button>
                    <button onclick="window.LotusApp.educationalEngine.closeModal()" class="btn-secondary">
                        Continue Simulation
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    startQuiz(moduleId) {
        const quiz = this.modules[moduleId].quiz;
        if (!quiz) return;

        let currentQuestion = 0;
        const showQuestion = () => {
            const q = quiz.questions[currentQuestion];
            const modal = document.querySelector('.educational-modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Question ${currentQuestion + 1} of ${quiz.questions.length}</h3>
                    <div class="question">${q.q}</div>
                    <div class="options">
                        ${q.options.map((option, i) => `
                            <label>
                                <input type="radio" name="answer" value="${i}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                    <button onclick="window.LotusApp.educationalEngine.checkAnswer(${currentQuestion}, '${moduleId}')" class="btn-primary">
                        Submit Answer
                    </button>
                </div>
            `;
        };

        showQuestion();
    }

    checkAnswer(questionIndex, moduleId) {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) return;

        const question = this.modules[moduleId].quiz.questions[questionIndex];
        const isCorrect = parseInt(selected.value) === question.correct;
        
        const modal = document.querySelector('.educational-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h3>
                <div class="explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
                <button onclick="window.LotusApp.educationalEngine.nextQuestion(${questionIndex}, '${moduleId}')" class="btn-primary">
                    ${questionIndex < this.modules[moduleId].quiz.questions.length - 1 ? 'Next Question' : 'Complete Module'}
                </button>
            </div>
        `;
    }

    nextQuestion(questionIndex, moduleId) {
        const currentQuestion = questionIndex + 1;
        if (currentQuestion < this.modules[moduleId].quiz.questions.length) {
            this.startQuiz(moduleId);
        } else {
            this.completeModule(moduleId);
        }
    }

    completeModule(moduleId) {
        this.progress[moduleId] = {
            completed: true,
            timestamp: new Date().toISOString()
        };

        const modal = document.querySelector('.educational-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>🎓 Module Complete!</h2>
                <p>You've successfully completed: <strong>${this.modules[moduleId].title}</strong></p>
                <p>This knowledge will help you recognize and avoid predatory lending practices.</p>
                <button onclick="window.LotusApp.educationalEngine.closeModal()" class="btn-primary">
                    Continue Simulation
                </button>
            </div>
        `;

        if (window.LotusApp.currentSession) {
            window.LotusApp.currentSession.educationalProgress.push({
                module: moduleId,
                completedAt: new Date().toISOString()
            });
        }
    }

    closeModal() {
        document.querySelector('.educational-modal')?.remove();
    }
}

// All other existing components (shortened for brevity but fully functional)
export class ConsentBar {
    constructor(containerId = 'consent-bar-container') {
        this.containerId = containerId;
        this.level = 100;
        this.factors = [];
    }

    initialize() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        container.innerHTML = `
            <div class="consent-bar-wrapper">
                <div class="consent-header">
                    <h3>Consent Quality</h3>
                    <span id="consent-percentage">${this.level}%</span>
                </div>
                <div class="consent-progress">
                    <div id="consent-bar" style="width: ${this.level}%"></div>
                </div>
                <div id="consent-factors">Monitoring consent quality...</div>
            </div>`;
    }

    updateLevel(level, reason = '') {
        this.level = Math.max(0, Math.min(100, level));
        if (reason) this.factors.push({ reason, timestamp: Date.now(), level });
        
        const bar = document.getElementById('consent-bar');
        const percentage = document.getElementById('consent-percentage');
        if (bar) bar.style.width = `${this.level}%`;
        if (percentage) percentage.textContent = `${this.level}%`;
        
        logger.info('Consent level updated', { level: this.level, reason });
    }
}

export class UrgencyTimer {
    constructor(initialTime = 297) {
        this.timeLeft = initialTime;
        this.timerId = null;
        this.container = null;
    }

    start(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="urgency-timer" data-deceptive="urgency">
                <span class="timer-text">Offer expires in: </span>
                <span id="timer-display" class="timer-countdown">05:00</span>
            </div>
        `;

        this.timerId = setInterval(() => {
            this.tick();
        }, 1000);
    }

    tick() {
        this.timeLeft--;
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        
        const display = document.getElementById('timer-display');
        if (display) {
            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        if (this.timeLeft <= 0) {
            this.timeLeft = 297; // Reset for continuous pressure
        }
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
}

export class LiveFeed {
    constructor() {
        this.activities = [
            "John from TX just borrowed $200",
            "Sarah from CA extended her loan", 
            "Mike from FL got instant approval",
            "Jessica from NY borrowed $350"
        ];
        this.feedInterval = null;
        this.activityIndex = 0;
    }

    start(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '<div class="live-feed" data-deceptive="social-proof"></div>';
        
        this.feedInterval = setInterval(() => {
            this.showActivity();
        }, 8000);
    }

    showActivity() {
        const activity = this.activities[this.activityIndex % this.activities.length];
        const feedContainer = document.querySelector('.live-feed');
        
        if (feedContainer) {
            feedContainer.innerHTML = `<div class="feed-item">📍 ${activity}</div>`;
        }
        
        this.activityIndex++;
    }

    stop() {
        if (this.feedInterval) {
            clearInterval(this.feedInterval);
            this.feedInterval = null;
        }
    }
}

export class QuizEngine {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
    }

    loadQuestions(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const modal = document.createElement('div');
        modal.className = 'quiz-modal';
        modal.innerHTML = `
            <div class="quiz-content">
                <h3>Quiz Question ${this.currentQuestion + 1}</h3>
                <div class="question">${question.text}</div>
                <div class="options">
                    ${question.options.map((option, i) => `
                        <button onclick="window.LotusApp.quizEngine.selectAnswer(${i})" class="quiz-option">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    selectAnswer(answerIndex) {
        const question = this.questions[this.currentQuestion];
        if (answerIndex === question.correct) {
            this.score++;
        }
        
        document.querySelector('.quiz-modal')?.remove();
        this.currentQuestion++;
        setTimeout(() => this.showQuestion(), 1000);
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const modal = document.createElement('div');
        modal.className = 'quiz-results-modal';
        modal.innerHTML = `
            <div class="quiz-content">
                <h2>Quiz Complete!</h2>
                <p>Score: ${this.score}/${this.questions.length} (${percentage}%)</p>
                <button onclick="this.closeQuiz()" class="btn-primary">Continue</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    closeQuiz() {
        document.querySelector('.quiz-results-modal')?.remove();
    }
}

export class DarkPatternEngine {
    constructor() {
        this.patterns = new Map();
        this.active = true;
    }

    initialize() {
        this.setupPatterns();
        logger.info('Dark Pattern Engine initialized');
    }

    setupPatterns() {
        this.patterns.set('urgency', {
            name: 'Artificial Urgency',
            description: 'Creates fake time pressure to rush decisions',
            active: true
        });

        this.patterns.set('social-proof', {
            name: 'Fake Social Proof',
            description: 'Shows fake customer activity to create pressure',
            active: true
        });

        this.patterns.set('pre-checked', {
            name: 'Pre-checked Options',
            description: 'Default selection favors the lender',
            active: true
        });
    }

    activatePattern(patternType) {
        const pattern = this.patterns.get(patternType);
        if (pattern) {
            pattern.active = true;
            logger.warn(`Dark pattern activated: ${pattern.name}`);
        }
    }

    deactivatePattern(patternType) {
        const pattern = this.patterns.get(patternType);
        if (pattern) {
            pattern.active = false;
            logger.info(`Dark pattern deactivated: ${pattern.name}`);
        }
    }
}

// Export the complete educational assessment
export class EducationalAssessment {
    constructor() {
        this.assessments = [];
        this.currentAssessment = null;
    }

    startAssessment(type = 'comprehensive') {
        this.currentAssessment = {
            type,
            startTime: Date.now(),
            questions: [],
            answers: []
        };
    }

    addQuestion(question, answer, isCorrect) {
        if (this.currentAssessment) {
            this.currentAssessment.questions.push(question);
            this.currentAssessment.answers.push({ answer, isCorrect, timestamp: Date.now() });
        }
    }

    completeAssessment() {
        if (this.currentAssessment) {
            this.currentAssessment.endTime = Date.now();
            this.currentAssessment.duration = this.currentAssessment.endTime - this.currentAssessment.startTime;
            this.currentAssessment.score = this.calculateScore();
            this.assessments.push(this.currentAssessment);
            this.currentAssessment = null;
        }
    }

    calculateScore() {
        if (!this.currentAssessment) return 0;
        const correct = this.currentAssessment.answers.filter(a => a.isCorrect).length;
        return Math.round((correct / this.currentAssessment.answers.length) * 100);
    }
}

// Enhanced Flat Fee & Usury Workaround Engine
export class UsurySkirterEngine {
    constructor() {
        this.loopholes = {
            flatFee: {
                enabled: true,
                description: "Fee disguised as 'service' not interest",
                states: ['TX', 'FL', 'NV', 'UT']
            },
            csoBrokerage: {
                enabled: true,
                description: "Credit Service Organization - fees not counted as interest",
                states: 26,
                notes: "Broker fees bypass APR caps"
            },
            tribalCharter: {
                enabled: true,
                description: "Sovereign immunity from state caps",
                examples: ['Plain Green (600%+ APR)', 'Great Plains Lending (400%+ APR)']
            },
            rentABank: {
                enabled: true,
                description: "Partner with banks to export interest rates",
                examples: ['FinTech partnerships with Utah/Delaware banks']
            }
        };
        this.currentLoophole = null;
    }

    simulateLoanIssuance(principal, termDays, state = 'GEN') {
        const feePer100 = 15.0;
        const fee = (principal / 100.0) * feePer100;
        const apr = (fee / principal) * (365.0 / termDays) * 100.0;
        
        // Determine which loophole to use
        this.selectOptimalLoophole(state, apr);
        
        return {
            principal,
            termDays,
            fee,
            apr: apr.toFixed(1),
            loopholeUsed: this.currentLoophole,
            legalWorkaround: this.getLegalJustification(),
            timestamp: new Date().toISOString()
        };
    }

    selectOptimalLoophole(state, apr) {
        // Select the most effective loophole for this state/APR combo
        if (apr > 400 && this.loopholes.tribalCharter.enabled) {
            this.currentLoophole = 'tribalCharter';
        } else if (this.loopholes.csoBrokerage.enabled) {
            this.currentLoophole = 'csoBrokerage';
        } else {
            this.currentLoophole = 'flatFee';
        }
    }

    getLegalJustification() {
        const justifications = {
            flatFee: "This is a flat service fee, not interest, therefore state APR caps do not apply",
            csoBrokerage: "We are a Credit Service Organization providing brokerage services, not direct lending",
            tribalCharter: "This loan is issued under tribal sovereignty and is not subject to state regulations",
            rentABank: "This loan is issued by our partner bank and governed by their state's more permissive laws"
        };
        return justifications[this.currentLoophole] || "Standard lending practices";
    }

    generateLoopholeReport() {
        return {
            activeLoopholes: Object.keys(this.loopholes).filter(key => this.loopholes[key].enabled),
            currentSession: this.currentLoophole,
            legalRisk: this.assessLegalRisk(),
            statesAvoidingRegulation: this.getAvoidedStates()
        };
    }

    assessLegalRisk() {
        const riskLevels = {
            flatFee: 'LOW - Well established precedent',
            csoBrokerage: 'MODERATE - Some state challenges',
            tribalCharter: 'MODERATE - Limited tribal immunity rulings',
            rentABank: 'HIGH - Increasing regulatory scrutiny'
        };
        return riskLevels[this.currentLoophole] || 'UNKNOWN';
    }

    getAvoidedStates() {
        // States where regulations are being circumvented
        return ['CA', 'NY', 'CT', 'AR', 'NC', 'VT', 'WV'];
    }
}

// ACH Debit & Overdraft Exploitation Engine
export class ACHExploitationEngine {
    constructor() {
        this.autoDebitEnabled = false;
        this.overdraftRisk = 'HIGH';
        this.priorityPosition = 1; // First in line for debits
    }

    setupACHExploitation() {
        const achHTML = `
            <div class="ach-exploitation" data-deceptive="ach-priority">
                <div class="ach-consent">
                    <h4>🏦 Convenient Auto-Pay Setup</h4>
                    <label class="consent-checkbox">
                        <input type="checkbox" id="ach-consent" checked>
                        <span>Authorize automatic debit on your payday for convenience</span>
                    </label>
                    <div class="ach-benefits">
                        ✅ Never miss a payment<br>
                        ✅ Avoid late fees<br>
                        ✅ Build credit history
                    </div>
                    <div class="ghost-warning hidden">
                        ⚠️ This gives the lender first priority to drain your account, potentially causing overdrafts on essential bills!
                    </div>
                </div>
                <div class="overdraft-warning" style="font-size: 8px; color: #999; margin-top: 10px;">
                    Bank overdraft fees may apply if insufficient funds available.
                </div>
            </div>
        `;
        
        const container = document.getElementById('ach-container') || this.createContainer('ach-container');
        container.innerHTML = achHTML;
        
        this.attachACHEventListeners();
    }

    attachACHEventListeners() {
        const achCheckbox = document.getElementById('ach-consent');
        if (achCheckbox) {
            achCheckbox.addEventListener('change', (e) => {
                this.autoDebitEnabled = e.target.checked;
                if (this.autoDebitEnabled) {
                    this.simulateACHSetup();
                }
            });
        }
    }

    simulateACHSetup() {
        // Tag the dark pattern
        if (window.LotusApp?.currentSession) {
            window.LotusApp.currentSession.tagDarkPattern('ach-auto-debit-consent', {
                overdraftRisk: this.overdraftRisk,
                priorityPosition: this.priorityPosition,
                timestamp: new Date().toISOString()
            });
        }

        logger.warn('ACH auto-debit enabled - High overdraft risk', {
            overdraftRisk: this.overdraftRisk,
            priorityPosition: this.priorityPosition
        });
    }

    createContainer(id) {
        const container = document.createElement('div');
        container.id = id;
        document.body.appendChild(container);
        return container;
    }
}

// Echo-Mode Narration & Coercion Index Calculator
export class EchoModeNarrator {
    constructor() {
        this.totalFeesPaid = 0;
        this.principalRemaining = 0;
        this.rolloverCount = 0;
        this.coercionMessages = [];
    }

    echo(message, session = null) {
        const timestamp = new Date().toISOString();
        this.coercionMessages.push({ message, timestamp });
        
        // Display the echo message
        this.displayEcho(message);
        
        // Log for research
        logger.info('Echo:', message);
        
        // Update coercion index
        if (session) {
            this.updateFromSession(session);
        }
    }

    displayEcho(message) {
        const echoContainer = document.getElementById('echo-container') || this.createEchoContainer();
        
        const echoMessage = document.createElement('div');
        echoMessage.className = 'echo-message';
        echoMessage.innerHTML = `
            <div class="echo-content" data-deceptive="psychological-pressure">
                💭 ${message}
                <div class="ghost-warning hidden">
                    🧠 This message is designed to create psychological pressure and debt acceptance!
                </div>
            </div>
        `;
        
        echoContainer.appendChild(echoMessage);
        
        // Auto-remove after 8 seconds
        setTimeout(() => echoMessage.remove(), 8000);
        
        // Scroll into view
        echoMessage.scrollIntoView({ behavior: 'smooth' });
    }

    createEchoContainer() {
        const container = document.createElement('div');
        container.id = 'echo-container';
        container.className = 'echo-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            max-width: 300px;
            z-index: 1000;
        `;
        document.body.appendChild(container);
        return container;
    }

    updateFromSession(session) {
        this.totalFeesPaid = session.totalCost - session.amount;
        this.principalRemaining = session.amount;
        this.rolloverCount = session.rolloverCount;
    }

    computeCoercionIndex() {
        let score = 0;
        
        // Auto-renewal checkbox checked
        const autoRenew = document.getElementById('auto-renew')?.checked;
        if (autoRenew) score += 30;
        
        // APR hidden or minimized
        const aprHidden = !this.isAPRProminent();
        if (aprHidden) score += 20;
        
        // Rollover count penalty
        if (this.rolloverCount > 3) score += 25;
        else if (this.rolloverCount > 1) score += 15;
        
        // Urgency timer active
        const urgencyTimer = document.getElementById('urgency-timer');
        if (urgencyTimer && urgencyTimer.textContent !== '00:00') score += 15;
        
        // ACH auto-debit enabled
        const achEnabled = document.getElementById('ach-consent')?.checked;
        if (achEnabled) score += 20;
        
        // Fake social proof active
        const liveFeed = document.querySelector('.live-feed .feed-item');
        if (liveFeed && liveFeed.textContent.includes('just borrowed')) score += 10;
        
        return Math.min(score, 100);
    }

    isAPRProminent() {
        const aprElements = document.querySelectorAll('[class*="apr"], [id*="apr"]');
        return Array.from(aprElements).some(el => {
            const style = window.getComputedStyle(el);
            return style.fontSize !== '8px' && style.color !== 'rgb(102, 102, 102)';
        });
    }

    generateNarrationForRollover(rolloverNumber, totalFees, principal) {
        const messages = [
            `You've now paid $${totalFees} in fees. You still owe $${principal}.`,
            `That's rollover #${rolloverNumber}. The original $${principal} hasn't decreased at all.`,
            `Each rollover just buys you more time - but at what cost?`,
            `You're paying to pay. The cycle continues.`,
            `$${totalFees} gone, $${principal} still owed. See the pattern?`
        ];
        
        return messages[Math.min(rolloverNumber - 1, messages.length - 1)];
    }
}

// Multi-loan Dependency & Upsell Engine
export class MultiLoanUpsellEngine {
    constructor() {
        this.loanCount = 0;
        this.qualificationLevel = 'STANDARD';
        this.upsellTriggers = [
            { trigger: 'after-first-rollover', amount: 200 },
            { trigger: 'after-second-rollover', amount: 500 },
            { trigger: 'debt-spiral', amount: 1000 }
        ];
    }

    triggerUpsell(currentSession) {
        this.loanCount++;
        
        const upsellAmount = this.calculateUpsellAmount(currentSession);
        const congratsMessage = this.generateCongratulationsMessage(upsellAmount);
        
        this.showUpsellModal(congratsMessage, upsellAmount, currentSession);
        
        // Tag the dark pattern
        currentSession.tagDarkPattern('multiloan-upsell', {
            loanCount: this.loanCount,
            upsellAmount: upsellAmount,
            qualificationLevel: this.qualificationLevel
        });
    }

    calculateUpsellAmount(session) {
        const baseAmount = session.amount;
        if (session.rolloverCount >= 2) return Math.min(baseAmount * 2, 1000);
        if (session.rolloverCount >= 1) return Math.min(baseAmount * 1.5, 750);
        return Math.min(baseAmount + 200, 500);
    }

    generateCongratulationsMessage(amount) {
        const messages = [
            `🎉 Congratulations! Based on your payment history, you now qualify for up to $${amount}!`,
            `💰 Great news! You're pre-approved for an additional $${amount} - no credit check needed!`,
            `⭐ You're a valued customer! Claim your $${amount} pre-approval now!`,
            `🔥 Special offer: Get $${amount} more cash today - limited time!`
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    showUpsellModal(message, amount, session) {
        const modal = document.createElement('div');
        modal.className = 'upsell-modal';
        modal.innerHTML = `
            <div class="upsell-content" data-deceptive="debt-expansion">
                <h3>${message}</h3>
                <div class="upsell-benefits">
                    ✅ Instant approval<br>
                    ✅ Same-day funding<br>
                    ✅ No additional paperwork
                </div>
                <div class="upsell-actions">
                    <button class="btn-primary" onclick="this.acceptUpsell(${amount})">
                        Yes, I need $${amount}
                    </button>
                    <button class="btn-secondary" onclick="this.declineUpsell()">
                        No thanks
                    </button>
                </div>
                <div class="ghost-warning hidden">
                    🎭 This "congratulations" is designed to make more debt feel like an achievement!
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-remove after 15 seconds if no action
        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.remove();
            }
        }, 15000);
    }

    acceptUpsell(amount) {
        document.querySelector('.upsell-modal')?.remove();
        
        // Create new loan session for the upsell
        const newSession = new LoanSession();
        newSession.amount = amount;
        newSession.calculateLoanTerms();
        
        // Show celebration
        this.showUpsellCelebration(amount);
        
        logger.warn('Upsell accepted - Additional debt taken', { amount });
    }

    declineUpsell() {
        document.querySelector('.upsell-modal')?.remove();
        logger.info('Upsell declined');
    }

    showUpsellCelebration(amount) {
        const celebration = document.createElement('div');
        celebration.className = 'upsell-celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <h3>🎉 Funds Approved!</h3>
                <p>Your additional $${amount} will be deposited shortly.</p>
                <p class="small-print">Additional fees and terms apply.</p>
            </div>
        `;
        
        document.body.appendChild(celebration);
        setTimeout(() => celebration.remove(), 4000);
    }
}
