/**
 * Comprehensive Educational Scaffolding System for Lotus Simulation
 * 
 * This module provides structured learning progression, behavioral psychology education,
 * and research-grade educational tracking for the simulation.
 */

export class EducationalScaffolding {
    constructor() {
        this.learningObjectives = {
            behavioral_psychology: {
                title: "Behavioral Psychology & Decision Making",
                concepts: [
                    "Cognitive biases in financial decisions",
                    "System 1 vs System 2 thinking (Kahneman)",
                    "Choice architecture and nudges",
                    "Sunk cost fallacy in lending",
                    "Anchoring bias and reference points",
                    "Loss aversion and debt psychology"
                ],
                assessments: [],
                completed: false
            },
            kantian_ethics: {
                title: "Kantian Ethics & Moral Philosophy",
                concepts: [
                    "Categorical Imperative fundamentals",
                    "Autonomy and rational agency",
                    "Treating people as ends, not means",
                    "Universalizability principle",
                    "Duty ethics vs consequentialism",
                    "Informed consent from Kantian perspective"
                ],
                assessments: [],
                completed: false
            },
            financial_literacy: {
                title: "Payday Lending & Financial Systems",
                concepts: [
                    "APR calculations and compound interest",
                    "Predatory lending identification",
                    "Regulatory frameworks (CFPB, MLA, TILA)",
                    "State vs federal jurisdiction",
                    "Alternative financial services",
                    "Debt cycle analysis"
                ],
                assessments: [],
                completed: false
            },
            interface_design: {
                title: "Dark Patterns & Interface Ethics",
                concepts: [
                    "Dark pattern taxonomy",
                    "Persuasive design vs manipulation",
                    "Consent UX best practices",
                    "Accessibility and inclusive design",
                    "Behavioral economics in UI/UX",
                    "Ethics of persuasive technology"
                ],
                assessments: [],
                completed: false
            },
            research_methods: {
                title: "Research Methods & Data Analysis",
                concepts: [
                    "Behavioral experiment design",
                    "Qualitative vs quantitative analysis",
                    "IRB and research ethics",
                    "Statistical significance in behavioral studies",
                    "A/B testing ethics",
                    "Participant protection protocols"
                ],
                assessments: [],
                completed: false
            }
        };

        this.currentModule = null;
        this.progressTracking = {
            timeStarted: new Date().toISOString(),
            conceptsLearned: [],
            assessmentsPassed: [],
            totalEngagementTime: 0,
            reflectionResponses: []
        };

        this.interactiveElements = [];
    }

    // Initialize educational framework
    initialize() {
        this.createEducationalUI();
        this.loadProgressFromStorage();
        this.setupInteractiveElements();
    }

    // Create comprehensive educational UI components
    createEducationalUI() {
        const container = document.getElementById('education-progress');
        if (!container) return;

        container.innerHTML = `
            <div class="bg-gradient-to-r from-yellow-900 to-orange-900 border-2 border-yellow-500 p-6 rounded-lg shadow-xl">
                <h3 class="text-xl font-bold text-yellow-200 mb-4">🎓 Educational Framework</h3>
                
                <!-- Learning Path Overview -->
                <div class="mb-6">
                    <h4 class="text-lg font-semibold text-yellow-300 mb-3">Learning Path Progress</h4>
                    <div id="learning-objectives-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${this.generateLearningObjectivesHTML()}
                    </div>
                </div>

                <!-- Current Module Display -->
                <div id="current-module-display" class="mb-6 p-4 bg-yellow-800 rounded-lg">
                    <h4 class="text-lg font-semibold text-yellow-200 mb-2">Current Learning Module</h4>
                    <div id="current-module-content">
                        <p class="text-yellow-300">Select a learning objective above to begin</p>
                    </div>
                </div>

                <!-- Interactive Learning Elements -->
                <div id="interactive-learning" class="mb-6">
                    <h4 class="text-lg font-semibold text-yellow-200 mb-3">Interactive Learning</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button id="behavioral-psychology-demo" class="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg transition">
                            🧠 Behavioral Psychology Demo
                        </button>
                        <button id="kantian-analysis-tool" class="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-lg transition">
                            🤔 Kantian Ethics Analyzer
                        </button>
                        <button id="financial-calculator" class="bg-green-600 hover:bg-green-500 text-white p-3 rounded-lg transition">
                            💰 Financial Impact Calculator
                        </button>
                        <button id="dark-pattern-trainer" class="bg-red-600 hover:bg-red-500 text-white p-3 rounded-lg transition">
                            🎯 Dark Pattern Identifier
                        </button>
                    </div>
                </div>

                <!-- Knowledge Assessment -->
                <div id="knowledge-assessment" class="mb-6 p-4 bg-yellow-800 rounded-lg">
                    <h4 class="text-lg font-semibold text-yellow-200 mb-3">Knowledge Check</h4>
                    <div id="assessment-content">
                        <p class="text-yellow-300">Complete learning modules to unlock assessments</p>
                    </div>
                </div>

                <!-- Research Integration -->
                <div id="research-integration" class="p-4 bg-yellow-800 rounded-lg">
                    <h4 class="text-lg font-semibold text-yellow-200 mb-3">Research Integration</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="text-yellow-300">Learning Time:</span>
                            <span id="total-learning-time" class="font-bold text-white">0 minutes</span>
                        </div>
                        <div>
                            <span class="text-yellow-300">Concepts Mastered:</span>
                            <span id="concepts-mastered-count" class="font-bold text-white">0/30</span>
                        </div>
                        <div>
                            <span class="text-yellow-300">Assessments Passed:</span>
                            <span id="assessments-passed-count" class="font-bold text-white">0/15</span>
                        </div>
                        <div>
                            <span class="text-yellow-300">Research Contributions:</span>
                            <span id="research-contributions" class="font-bold text-white">0</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateLearningObjectivesHTML() {
        return Object.entries(this.learningObjectives).map(([key, objective]) => `
            <div class="learning-objective-card bg-yellow-700 p-3 rounded-lg cursor-pointer hover:bg-yellow-600 transition" 
                 data-objective="${key}">
                <h5 class="font-semibold text-yellow-200 mb-2">${objective.title}</h5>
                <div class="text-xs text-yellow-300 mb-2">${objective.concepts.length} concepts</div>
                <div class="w-full bg-yellow-500 rounded-full h-2">
                    <div class="bg-green-400 h-2 rounded-full transition-all duration-300" 
                         style="width: ${this.calculateObjectiveProgress(key)}%"></div>
                </div>
                <div class="text-xs text-yellow-300 mt-1">${this.calculateObjectiveProgress(key)}% complete</div>
            </div>
        `).join('');
    }

    calculateObjectiveProgress(objectiveKey) {
        const objective = this.learningObjectives[objectiveKey];
        const completedConcepts = objective.concepts.filter(concept => 
            this.progressTracking.conceptsLearned.includes(concept)
        ).length;
        return Math.round((completedConcepts / objective.concepts.length) * 100);
    }

    // Launch behavioral psychology educational module
    launchBehavioralPsychologyDemo() {
        this.currentModule = 'behavioral_psychology';
        this.displayLearningModule({
            title: "Behavioral Psychology in Financial Decisions",
            content: `
                <div class="space-y-4 text-sm">
                    <div class="p-4 bg-blue-800 rounded-lg">
                        <h5 class="font-bold text-blue-200 mb-2">🧠 System 1 vs System 2 Thinking</h5>
                        <p class="text-blue-300 mb-3">
                            Daniel Kahneman's dual-process theory explains how we make decisions:
                        </p>
                        <ul class="list-disc list-inside text-blue-300 space-y-1">
                            <li><strong>System 1:</strong> Fast, automatic, intuitive (exploited by dark patterns)</li>
                            <li><strong>System 2:</strong> Slow, deliberate, rational (ethical design supports this)</li>
                        </ul>
                    </div>
                    
                    <div class="p-4 bg-blue-800 rounded-lg">
                        <h5 class="font-bold text-blue-200 mb-2">⚖️ Cognitive Biases in Lending</h5>
                        <ul class="list-disc list-inside text-blue-300 space-y-1">
                            <li><strong>Anchoring:</strong> First number seen influences all subsequent judgments</li>
                            <li><strong>Sunk Cost Fallacy:</strong> Continuing bad decisions to justify past investments</li>
                            <li><strong>Loss Aversion:</strong> Fear of losing outweighs potential gains</li>
                            <li><strong>Present Bias:</strong> Overvaluing immediate rewards vs future costs</li>
                        </ul>
                    </div>

                    <div class="interactive-demo p-4 bg-blue-700 rounded-lg">
                        <h5 class="font-bold text-blue-200 mb-2">🎯 Try It: Anchoring Effect</h5>
                        <p class="text-blue-300 mb-3">
                            What's a reasonable APR for a 2-week loan? (Think before clicking)
                        </p>
                        <div class="grid grid-cols-2 gap-2">
                            <button class="anchor-demo bg-blue-600 p-2 rounded hover:bg-blue-500" data-anchor="high">
                                Higher than 500% APR?
                            </button>
                            <button class="anchor-demo bg-blue-600 p-2 rounded hover:bg-blue-500" data-anchor="low">
                                Lower than 50% APR?
                            </button>
                        </div>
                        <div id="anchor-explanation" class="mt-3 p-2 bg-blue-900 rounded text-xs text-blue-300"></div>
                    </div>
                </div>
            `,
            assessment: this.generateBehavioralPsychologyAssessment()
        });
    }

    // Launch Kantian ethics educational module
    launchKantianAnalysisTool() {
        this.currentModule = 'kantian_ethics';
        this.displayLearningModule({
            title: "Kantian Ethics & Moral Philosophy",
            content: `
                <div class="space-y-4 text-sm">
                    <div class="p-4 bg-purple-800 rounded-lg">
                        <h5 class="font-bold text-purple-200 mb-2">🎯 The Categorical Imperative</h5>
                        <p class="text-purple-300 mb-3">
                            Kant's fundamental principle: "Act only according to that maxim whereby you can at the same time will that it should become a universal law."
                        </p>
                        <div class="text-purple-300">
                            <strong>Test:</strong> If everyone did this action, would the world still function ethically?
                        </div>
                    </div>
                    
                    <div class="p-4 bg-purple-800 rounded-lg">
                        <h5 class="font-bold text-purple-200 mb-2">👤 Humanity Formula</h5>
                        <p class="text-purple-300">
                            "Act so that you treat humanity, whether in your own person or in that of another, always as an end and never merely as a means."
                        </p>
                    </div>

                    <div class="interactive-kant p-4 bg-purple-700 rounded-lg">
                        <h5 class="font-bold text-purple-200 mb-2">🤔 Apply Kantian Analysis</h5>
                        <p class="text-purple-300 mb-3">
                            Consider this scenario: A lender uses a 5-second countdown timer to pressure loan decisions.
                        </p>
                        <div class="space-y-2">
                            <button class="kant-analysis bg-purple-600 p-2 rounded hover:bg-purple-500 w-full text-left" data-test="universal">
                                Universalizability Test: What if all lenders used pressure tactics?
                            </button>
                            <button class="kant-analysis bg-purple-600 p-2 rounded hover:bg-purple-500 w-full text-left" data-test="humanity">
                                Humanity Test: Is the borrower treated as a means to profit?
                            </button>
                            <button class="kant-analysis bg-purple-600 p-2 rounded hover:bg-purple-500 w-full text-left" data-test="autonomy">
                                Autonomy Test: Can rational deliberation occur under pressure?
                            </button>
                        </div>
                        <div id="kant-explanation" class="mt-3 p-2 bg-purple-900 rounded text-xs text-purple-300"></div>
                    </div>
                </div>
            `,
            assessment: this.generateKantianEthicsAssessment()
        });
    }

    // Launch financial literacy calculator
    launchFinancialCalculator() {
        this.currentModule = 'financial_literacy';
        this.displayLearningModule({
            title: "Financial Impact Calculator & Literacy",
            content: `
                <div class="space-y-4 text-sm">
                    <div class="p-4 bg-green-800 rounded-lg">
                        <h5 class="font-bold text-green-200 mb-2">💰 Understanding APR vs Fees</h5>
                        <p class="text-green-300 mb-3">
                            APR (Annual Percentage Rate) shows the true cost of borrowing, including fees, calculated annually.
                        </p>
                        <p class="text-green-300">
                            A $15 fee on a $100, 2-week loan = <strong>391% APR</strong>
                        </p>
                    </div>
                    
                    <div class="financial-calculator p-4 bg-green-700 rounded-lg">
                        <h5 class="font-bold text-green-200 mb-3">🧮 Calculate Real Costs</h5>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-green-200 mb-1">Loan Amount ($)</label>
                                <input type="number" id="calc-amount" class="w-full p-2 rounded bg-green-800 text-white" value="100">
                            </div>
                            <div>
                                <label class="block text-green-200 mb-1">Fee ($)</label>
                                <input type="number" id="calc-fee" class="w-full p-2 rounded bg-green-800 text-white" value="15">
                            </div>
                            <div>
                                <label class="block text-green-200 mb-1">Term (days)</label>
                                <input type="number" id="calc-term" class="w-full p-2 rounded bg-green-800 text-white" value="14">
                            </div>
                            <div>
                                <button id="calculate-apr" class="bg-green-600 hover:bg-green-500 text-white p-2 rounded w-full">
                                    Calculate APR
                                </button>
                            </div>
                        </div>
                        <div id="apr-result" class="mt-3 p-3 bg-green-900 rounded font-bold text-center"></div>
                        
                        <div class="mt-4 text-xs text-green-300">
                            <strong>Formula:</strong> APR = (Fee ÷ Amount) × (365 ÷ Term) × 100
                        </div>
                    </div>

                    <div class="debt-cycle-demo p-4 bg-green-700 rounded-lg">
                        <h5 class="font-bold text-green-200 mb-2">🔄 Debt Cycle Visualization</h5>
                        <p class="text-green-300 mb-3">See how rollover fees accumulate:</p>
                        <button id="simulate-debt-cycle" class="bg-green-600 hover:bg-green-500 text-white p-2 rounded">
                            Start Debt Cycle Simulation
                        </button>
                        <div id="debt-cycle-result" class="mt-3"></div>
                    </div>
                </div>
            `,
            assessment: this.generateFinancialLiteracyAssessment()
        });
    }

    // Launch dark pattern identification trainer
    launchDarkPatternTrainer() {
        this.currentModule = 'interface_design';
        this.displayLearningModule({
            title: "Dark Pattern Recognition & Interface Ethics",
            content: `
                <div class="space-y-4 text-sm">
                    <div class="p-4 bg-red-800 rounded-lg">
                        <h5 class="font-bold text-red-200 mb-2">🎯 Dark Pattern Categories</h5>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-red-300">
                            <div>• Urgency & Scarcity</div>
                            <div>• Default Bias</div>
                            <div>• Cognitive Overload</div>
                            <div>• Misleading Language</div>
                            <div>• Hidden Costs</div>
                            <div>• Difficult Cancellation</div>
                        </div>
                    </div>
                    
                    <div class="dark-pattern-quiz p-4 bg-red-700 rounded-lg">
                        <h5 class="font-bold text-red-200 mb-3">🔍 Identify the Dark Pattern</h5>
                        <div id="dark-pattern-examples">
                            <div class="pattern-example p-3 bg-red-800 rounded mb-3" data-pattern="urgency">
                                <p class="text-red-300 mb-2">"⏰ HURRY! Only 3 minutes left to secure this rate!"</p>
                                <button class="identify-pattern bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs">
                                    Identify Pattern Type
                                </button>
                            </div>
                            <div class="pattern-example p-3 bg-red-800 rounded mb-3" data-pattern="default">
                                <p class="text-red-300 mb-2">☑️ Auto-renew my loan if I can't pay (checked by default)</p>
                                <button class="identify-pattern bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs">
                                    Identify Pattern Type
                                </button>
                            </div>
                            <div class="pattern-example p-3 bg-red-800 rounded mb-3" data-pattern="cognitive">
                                <p class="text-red-300 mb-2 text-xs">
                                    "Fee structure includes base processing fee, document preparation fee, credit assessment fee, risk adjustment fee, administrative overhead allocation, regulatory compliance cost recovery fee..."
                                </p>
                                <button class="identify-pattern bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs">
                                    Identify Pattern Type
                                </button>
                            </div>
                        </div>
                        <div id="pattern-feedback" class="mt-3 p-2 bg-red-900 rounded text-xs text-red-300"></div>
                    </div>
                </div>
            `,
            assessment: this.generateDarkPatternAssessment()
        });
    }

    displayLearningModule(module) {
        const container = document.getElementById('current-module-content');
        if (!container) return;

        container.innerHTML = `
            <h5 class="text-lg font-semibold text-yellow-200 mb-3">${module.title}</h5>
            ${module.content}
        `;

        this.setupModuleInteractions();
    }

    setupModuleInteractions() {
        // Behavioral psychology interactions
        document.querySelectorAll('.anchor-demo').forEach(button => {
            button.addEventListener('click', (e) => {
                const anchor = e.target.dataset.anchor;
                const explanation = document.getElementById('anchor-explanation');
                if (anchor === 'high') {
                    explanation.innerHTML = `
                        <strong>Anchoring Effect Demonstrated!</strong> By seeing "500% APR" first, 
                        anything lower (like 391%) might seem "reasonable" - even though both are predatory rates.
                    `;
                } else {
                    explanation.innerHTML = `
                        <strong>Anchoring Effect Demonstrated!</strong> By seeing "50% APR" first, 
                        the typical payday loan APR of 391% seems shockingly high - which it is!
                    `;
                }
                this.recordConceptLearned('Anchoring bias and reference points');
            });
        });

        // Kantian analysis interactions
        document.querySelectorAll('.kant-analysis').forEach(button => {
            button.addEventListener('click', (e) => {
                const test = e.target.dataset.test;
                const explanation = document.getElementById('kant-explanation');
                const explanations = {
                    universal: "❌ <strong>Fails Universalizability:</strong> If all lenders used pressure tactics, informed consent would be impossible - the system would collapse.",
                    humanity: "❌ <strong>Treats as Means Only:</strong> The borrower becomes a tool for quick profit extraction, not a rational agent deserving respect.",
                    autonomy: "❌ <strong>Undermines Autonomy:</strong> Rational deliberation requires time and freedom from pressure - countdown timers eliminate both."
                };
                explanation.innerHTML = explanations[test];
                this.recordConceptLearned('Kantian categorical imperative analysis');
            });
        });

        // Financial calculator interactions
        document.getElementById('calculate-apr')?.addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('calc-amount').value) || 100;
            const fee = parseFloat(document.getElementById('calc-fee').value) || 15;
            const term = parseFloat(document.getElementById('calc-term').value) || 14;
            
            const apr = (fee / amount) * (365 / term) * 100;
            const result = document.getElementById('apr-result');
            result.innerHTML = `
                <div class="text-white">APR: ${apr.toFixed(1)}%</div>
                <div class="text-green-300 text-xs mt-1">
                    ${apr > 36 ? 'Exceeds 36% cap recommended by consumer advocates' : 'Within reasonable lending rates'}
                </div>
            `;
            this.recordConceptLearned('APR calculations and compound interest');
        });

        // Dark pattern identification
        document.querySelectorAll('.identify-pattern').forEach(button => {
            button.addEventListener('click', (e) => {
                const example = e.target.closest('.pattern-example');
                const pattern = example.dataset.pattern;
                const feedback = document.getElementById('pattern-feedback');
                
                const patternTypes = {
                    urgency: '⏰ <strong>Urgency/Scarcity Pattern:</strong> Creates false time pressure to prevent careful consideration.',
                    default: '☑️ <strong>Default Bias Pattern:</strong> Pre-selects options that benefit the company, exploiting human tendency to accept defaults.',
                    cognitive: '🧠 <strong>Cognitive Overload Pattern:</strong> Overwhelming complexity prevents users from understanding true costs.'
                };
                
                feedback.innerHTML = patternTypes[pattern];
                this.recordConceptLearned('Dark pattern taxonomy');
            });
        });
    }

    recordConceptLearned(concept) {
        if (!this.progressTracking.conceptsLearned.includes(concept)) {
            this.progressTracking.conceptsLearned.push(concept);
            this.updateProgress();
            this.saveProgressToStorage();
        }
    }

    updateProgress() {
        // Update UI with current progress
        document.getElementById('concepts-mastered-count').textContent = 
            `${this.progressTracking.conceptsLearned.length}/30`;
        
        document.getElementById('assessments-passed-count').textContent = 
            `${this.progressTracking.assessmentsPassed.length}/15`;

        // Update learning objectives grid
        document.getElementById('learning-objectives-grid').innerHTML = 
            this.generateLearningObjectivesHTML();
    }

    generateBehavioralPsychologyAssessment() {
        return {
            questions: [
                {
                    question: "Which cognitive bias makes people continue with bad financial decisions to justify past investments?",
                    options: ["Anchoring bias", "Sunk cost fallacy", "Loss aversion", "Present bias"],
                    correct: 1,
                    explanation: "Sunk cost fallacy causes people to continue investing in failing ventures to justify previous investments."
                },
                {
                    question: "System 1 thinking is characterized by:",
                    options: ["Slow, deliberate analysis", "Fast, automatic responses", "Complex reasoning", "Mathematical calculations"],
                    correct: 1,
                    explanation: "System 1 thinking is fast and automatic, which dark patterns exploit to bypass rational analysis."
                }
            ]
        };
    }

    generateKantianEthicsAssessment() {
        return {
            questions: [
                {
                    question: "According to Kant's Categorical Imperative, an action is ethical if:",
                    options: ["It produces good outcomes", "You can will it to be a universal law", "It makes you happy", "It's profitable"],
                    correct: 1,
                    explanation: "Kant's universalizability principle requires that ethical actions could be universal laws."
                }
            ]
        };
    }

    generateFinancialLiteracyAssessment() {
        return {
            questions: [
                {
                    question: "A $20 fee on a $100, 14-day loan equals what APR?",
                    options: ["20%", "52%", "365%", "522%"],
                    correct: 3,
                    explanation: "APR = (20/100) × (365/14) × 100 = 522%"
                }
            ]
        };
    }

    generateDarkPatternAssessment() {
        return {
            questions: [
                {
                    question: "Pre-checking 'auto-renew' options is an example of:",
                    options: ["Urgency pattern", "Default bias", "Social proof", "Cognitive overload"],
                    correct: 1,
                    explanation: "Default bias exploits people's tendency to accept pre-selected options."
                }
            ]
        };
    }

    saveProgressToStorage() {
        localStorage.setItem('lotus_educational_progress', JSON.stringify(this.progressTracking));
    }

    loadProgressFromStorage() {
        const saved = localStorage.getItem('lotus_educational_progress');
        if (saved) {
            this.progressTracking = { ...this.progressTracking, ...JSON.parse(saved) };
        }
    }

    setupInteractiveElements() {
        // Setup main interactive buttons
        document.getElementById('behavioral-psychology-demo')?.addEventListener('click', () => {
            this.launchBehavioralPsychologyDemo();
        });

        document.getElementById('kantian-analysis-tool')?.addEventListener('click', () => {
            this.launchKantianAnalysisTool();
        });

        document.getElementById('financial-calculator')?.addEventListener('click', () => {
            this.launchFinancialCalculator();
        });

        document.getElementById('dark-pattern-trainer')?.addEventListener('click', () => {
            this.launchDarkPatternTrainer();
        });

        // Setup learning objective cards
        document.addEventListener('click', (e) => {
            if (e.target.closest('.learning-objective-card')) {
                const objectiveKey = e.target.closest('.learning-objective-card').dataset.objective;
                this.loadLearningObjective(objectiveKey);
            }
        });
    }

    loadLearningObjective(objectiveKey) {
        const objective = this.learningObjectives[objectiveKey];
        if (!objective) return;

        // Launch appropriate educational module
        const moduleHandlers = {
            behavioral_psychology: () => this.launchBehavioralPsychologyDemo(),
            kantian_ethics: () => this.launchKantianAnalysisTool(),
            financial_literacy: () => this.launchFinancialCalculator(),
            interface_design: () => this.launchDarkPatternTrainer(),
            research_methods: () => this.launchResearchMethodsModule()
        };

        const handler = moduleHandlers[objectiveKey];
        if (handler) handler();
    }

    launchResearchMethodsModule() {
        this.currentModule = 'research_methods';
        this.displayLearningModule({
            title: "Research Methods & Ethical Data Collection",
            content: `
                <div class="space-y-4 text-sm">
                    <div class="p-4 bg-indigo-800 rounded-lg">
                        <h5 class="font-bold text-indigo-200 mb-2">🔬 Research Ethics Framework</h5>
                        <p class="text-indigo-300 mb-3">
                            This simulation collects behavioral data for educational and research purposes.
                        </p>
                        <ul class="list-disc list-inside text-indigo-300 space-y-1">
                            <li><strong>Informed Consent:</strong> Users know data is collected</li>
                            <li><strong>Anonymization:</strong> No personally identifiable information</li>
                            <li><strong>Educational Purpose:</strong> Data used for learning about manipulation</li>
                            <li><strong>Transparency:</strong> Methods and purposes clearly disclosed</li>
                        </ul>
                    </div>
                    
                    <div class="p-4 bg-indigo-800 rounded-lg">
                        <h5 class="font-bold text-indigo-200 mb-2">📊 Data Types Collected</h5>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-indigo-300 text-xs">
                            <div>• Decision timing</div>
                            <div>• Dark patterns encountered</div>
                            <div>• Learning progress</div>
                            <div>• Autonomy scores</div>
                            <div>• Ethical violations detected</div>
                            <div>• Educational module completion</div>
                        </div>
                    </div>

                    <div class="research-tools p-4 bg-indigo-700 rounded-lg">
                        <h5 class="font-bold text-indigo-200 mb-3">🛠️ Research Tools</h5>
                        <div class="space-y-2">
                            <button id="export-anonymized-data" class="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded w-full">
                                📊 Export Anonymized Research Data
                            </button>
                            <button id="view-data-schema" class="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded w-full">
                                📋 View Data Collection Schema
                            </button>
                            <button id="research-methodology" class="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded w-full">
                                📚 View Research Methodology
                            </button>
                        </div>
                    </div>
                </div>
            `,
            assessment: {
                questions: [
                    {
                        question: "What makes behavioral research ethical?",
                        options: ["Collecting lots of data", "Informed consent & transparency", "High sample sizes", "Advanced algorithms"],
                        correct: 1,
                        explanation: "Ethical research requires informed consent, transparency, and respect for participant autonomy."
                    }
                ]
            }
        });
    }

    // Export comprehensive educational progress report
    exportEducationalProgress() {
        const report = {
            sessionId: this.progressTracking.sessionId || 'anonymous',
            timestamp: new Date().toISOString(),
            totalLearningTime: this.progressTracking.totalEngagementTime,
            conceptsLearned: this.progressTracking.conceptsLearned,
            assessmentsPassed: this.progressTracking.assessmentsPassed,
            learningObjectiveProgress: Object.entries(this.learningObjectives).map(([key, obj]) => ({
                objective: key,
                title: obj.title,
                progress: this.calculateObjectiveProgress(key),
                completed: obj.completed
            })),
            reflectionResponses: this.progressTracking.reflectionResponses,
            researchContributions: this.progressTracking.conceptsLearned.length
        };

        // Create downloadable report
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lotus_educational_progress_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        return report;
    }
}

// Export for use in main application
export { EducationalScaffolding };
