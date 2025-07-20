/**
 * app.js - Condensed Main Orchestrator for Lotus Payday Loan Simulator
 * GitHub Pages Compatible - All features preserved in condensed form
 */

// Condensed imports
import { Config, LoanSession } from './lotus_core.js';
import { AutonomyTrap, BehavioralPsychologyEngine } from './autonomy_theater.js';
import { 
    ConsentBar, UrgencyTimer, LiveFeed, QuizEngine, DarkPatternEngine, TrapUIEngine, 
    EducationalAssessment, ComprehensiveEducationalEngine, UsurySkirterEngine, 
    ACHExploitationEngine, EchoModeNarrator, MultiLoanUpsellEngine 
} from './ui-components.js';
import { formatCurrency, formatPercentage, logger } from './utils.js';

// Condensed global state
window.LotusApp = {
    currentSession: null, currentMode: null, autonomyTheater: null, behavioralEngine: null,
    consentBar: null, ghostMode: null, simulation: null, urgencyTimer: null, liveFeed: null,
    quizEngine: null, darkPatternEngine: null, trapUIEngine: null, educationalAssessment: null, 
    educationalEngine: null, usurySkirter: null, achExploiter: null, echoNarrator: null, 
    multiLoanUpseller: null, initialized: false
};

// Condensed Ghost Mode Controller
class GhostModeController {
    constructor() { this.active = false; this.educationalOverlays = new Map(); }

    toggle() {
        this.active = !this.active;
        document.body.classList.toggle('ghost-mode', this.active);
        
        if (this.active) {
            this.revealDeceptiveElements();
            this.showEthicalOverlays();
        } else {
            this.hideEthicalOverlays();
        }
        
        localStorage.setItem('lotus-ghost-mode', this.active);
        
        const toggleBtn = document.getElementById('ghost-mode-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = this.active ? '👻 Ghost Mode: ON' : '👻 Ghost Mode: OFF';
            toggleBtn.className = this.active ? 'btn ghost-active' : 'btn ghost-inactive';
        }
        
        logger.info(`Ghost Mode ${this.active ? 'activated' : 'deactivated'}`);
    }

    revealDeceptiveElements() {
        document.querySelectorAll('[data-deceptive]').forEach(el => {
            el.classList.add('revealed');
            el.style.border = '3px solid #ef4444';
            el.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.5)';
            
            const explanation = document.createElement('div');
            explanation.className = 'ghost-explanation absolute bg-red-900 text-white p-2 rounded text-sm z-50 max-w-xs';
            explanation.textContent = this.getExplanation(el);
            el.style.position = 'relative';
            el.appendChild(explanation);
        });
        
        // Enable ghost mode on trap UI engine if it exists
        if (window.LotusApp.trapUIEngine) {
            window.LotusApp.trapUIEngine.enableGhostMode();
        }
    }

    showEthicalOverlays() {
        const overlay = document.createElement('div');
        overlay.className = 'ethical-overlay';
        overlay.innerHTML = `
            <div class="overlay-content">
                <h3>🎓 Educational Guidance Active</h3>
                <p>You are now viewing this page with ethical guidance enabled.</p>
                <ul>
                    <li>🔍 Deceptive elements are highlighted in red</li>
                    <li>💡 Ethical alternatives are shown in green</li>
                    <li>📊 Real APR calculations are displayed</li>
                    <li>⚖️ Legal protections are explained</li>
                </ul>
                <button onclick="window.LotusApp.ghostMode.toggle()" class="btn">Close Guidance</button>
            </div>`;
        document.body.appendChild(overlay);
    }

    hideEthicalOverlays() {
        document.querySelectorAll('.ethical-overlay, .ghost-explanation').forEach(el => el.remove());
        document.querySelectorAll('[data-deceptive]').forEach(el => {
            el.classList.remove('revealed');
            el.style.border = '';
            el.style.boxShadow = '';
        });
        
        // Disable ghost mode on trap UI engine if it exists
        if (window.LotusApp.trapUIEngine) {
            window.LotusApp.trapUIEngine.disableGhostMode();
        }
    }

    getExplanation(element) {
        const type = element.getAttribute('data-deceptive');
        const explanations = {
            'urgency': 'Fake countdown timer creates artificial pressure',
            'social-proof': 'These notifications are not real customer activities',
            'scarcity': 'False scarcity claims to pressure quick decisions',
            'hidden-cost': 'Fees and costs buried in fine print',
            'default-checked': 'Pre-checked boxes assume your consent'
        };
        return explanations[type] || 'This element uses deceptive design patterns';
    }
}

// Condensed Simulation Controller
class SimulationController {
    constructor() { this.currentSession = null; this.currentStrategy = null; }

    async startSimulation(mode, userInputs = {}) {
        try {
            logger.info(`Starting ${mode} simulation`, userInputs);
            
            const config = new Config();
            const session = new LoanSession();
            
            // Apply user inputs with defaults
            session.state = userInputs.state?.toUpperCase() || 'GEN';
            session.amount = parseFloat(userInputs.amount) || 500;
            session.termDays = parseInt(userInputs.term) || 14;
            
            // Configure for mode
            this.configureForMode(config, mode);
            
            // Calculate loan terms
            session.calculateLoanTerms();
            
            // Enhanced calculation with exploitative features
            this.enhancedLoanCalculation(session, mode);
            
            // Store results
            this.currentSession = session;
            window.LotusApp.currentSession = session;
            
            // Display results
            this.displayResults(session, mode);
            
            // Initialize patterns for predatory mode
            if (mode === 'predatory') {
                setTimeout(() => this.initializePredatoryPatterns(), 1000);
                setTimeout(() => this.generateConsumerHarmMetrics(session), 5000);
            }
            
        } catch (error) {
            logger.error('Simulation error', error);
        }
    }

    configureForMode(config, mode) {
        // Simple mode configuration - predatory uses higher fees
        if (mode === 'predatory') {
            config.exploitFeeRate = 0.35; // Higher exploitation
        } else {
            config.exploitFeeRate = 0.15; // Lower, regulated rate
        }
    }

    displayResults(session, mode) {
        const resultContainer = document.getElementById('simulation-results') || this.createResultContainer();
        
        const apr = session.apr || 0;
        const fee = session.fee || 0;
        const total = session.totalCost || session.amount + fee;
        
        resultContainer.innerHTML = `
            <div class="result-card ${mode}">
                <h3>${mode === 'predatory' ? '💀 Predatory' : '✅ Ethical'} Loan Results</h3>
                <div class="result-details">
                    <p><strong>Loan Amount:</strong> ${formatCurrency(session.amount)}</p>
                    <p><strong>Finance Charge:</strong> ${formatCurrency(fee)}</p>
                    <p><strong>Total Repayment:</strong> ${formatCurrency(total)}</p>
                    <p class="apr-highlight ${mode}"><strong>APR:</strong> ${apr.toFixed(1)}%</p>
                    ${mode === 'predatory' ? this.getPredatoryWarnings(session) : this.getEthicalBenefits()}
                </div>
                <div class="result-actions">
                    <button onclick="window.LotusApp.simulation.startSimulation('${mode === 'predatory' ? 'ethical' : 'predatory'}')" class="btn">
                        Try ${mode === 'predatory' ? 'Ethical' : 'Predatory'} Mode
                    </button>
                </div>
            </div>`;
        
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    createResultContainer() {
        const container = document.createElement('div');
        container.id = 'simulation-results';
        container.className = 'simulation-results';
        (document.getElementById('section-simulation') || document.body).appendChild(container);
        return container;
    }

    getPredatoryWarnings(session) {
        const warnings = [];
        if (session.apr > 300) warnings.push('⚠️ Extremely high interest rate');
        if (session.fee > session.amount) warnings.push('⚠️ Fees exceed loan amount');
        
        return warnings.length ? `
            <div class="warnings" data-deceptive="hidden-cost">
                <h4>🚨 Warning Signs:</h4>
                <ul>${warnings.map(w => `<li>${w}</li>`).join('')}</ul>
            </div>` : '';
    }

    getEthicalBenefits() {
        return `
            <div class="benefits">
                <h4>✅ Ethical Protections:</h4>
                <ul>
                    <li>APR capped by state regulation</li>
                    <li>Clear disclosure of all costs</li>
                    <li>Alternatives were presented</li>
                </ul>
            </div>`;
    }

    initializePredatoryPatterns() {
        // Trigger exploitative UI elements
        if (window.LotusApp.trapUIEngine) {
            // Show the full suite of dark patterns
            window.LotusApp.trapUIEngine.setupExploitativeUI();
            
            // Start psychological pressure tactics
            window.LotusApp.trapUIEngine.startPsychologicalPressure();
            
            // Set up rollover traps
            window.LotusApp.trapUIEngine.initializeRolloverTraps();
        }
        
        // Tag the session with predatory mode activation
        if (window.LotusApp.currentSession) {
            window.LotusApp.currentSession.tagDarkPattern('predatory-mode-activated', {
                timestamp: new Date().toISOString(),
                allTrapsActive: true
            });
        }
        
        logger.warn('🕷️ All predatory patterns now active');
    }

    simulateRollover() {
        const session = window.LotusApp.currentSession;
        if (!session) return;

        // Trigger the rollover trap UI
        if (window.LotusApp.trapUIEngine) {
            window.LotusApp.trapUIEngine.triggerRolloverTrap(session.rolloverCount);
        }

        // Enhanced rollover cycle with all exploitative features
        this.triggerRolloverCycle(session);
        
        // Simulate ACH overdraft risk if enabled
        if (document.getElementById('ach-consent')?.checked) {
            this.simulateACHOverdraft(session);
        }

        logger.warn('💸 Enhanced rollover cycle triggered', { 
            rollover: session.rolloverCount, 
            totalCost: session.totalCost,
            coercionIndex: window.LotusApp.echoNarrator?.computeCoercionIndex()
        });
    }

    startEducationalModule(moduleId) {
        if (window.LotusApp.educationalEngine) {
            window.LotusApp.educationalEngine.startModule(moduleId);
        }
    }

    createRequiredContainers() {
        const containers = ['ach-container', 'echo-container', 'upsell-container'];
        containers.forEach(containerId => {
            if (!document.getElementById(containerId)) {
                const container = document.createElement('div');
                container.id = containerId;
                container.className = `${containerId.replace('-container', '')}-wrapper`;
                document.body.appendChild(container);
            }
        });
    }

    enhancedLoanCalculation(session, mode) {
        // Use the usury skirter for predatory mode
        if (mode === 'predatory' && window.LotusApp.usurySkirter) {
            const loanDetails = window.LotusApp.usurySkirter.simulateLoanIssuance(
                session.amount, 
                session.termDays, 
                session.state
            );
            
            // Update session with usury workaround details
            session.legalLoophole = loanDetails.loopholeUsed;
            session.legalJustification = loanDetails.legalWorkaround;
            session.tagDarkPattern('usury-loophole-used', {
                loophole: loanDetails.loopholeUsed,
                justification: loanDetails.legalWorkaround,
                trueAPR: loanDetails.apr
            });
            
            // Echo the manipulation
            if (window.LotusApp.echoNarrator) {
                window.LotusApp.echoNarrator.echo(
                    `Just a $${session.fee} service fee! (That's only ${((session.fee / session.amount) * 100).toFixed(1)}% of what you borrow)`,
                    session
                );
            }
        }
        
        return session;
    }

    triggerRolloverCycle(session) {
        if (!session) return;

        // Calculate new rollover
        const rolloverFee = session.fee * 0.85; // Slightly lower rollover fee
        session.rolloverCount++;
        session.totalCost += rolloverFee;
        
        // Echo-mode narration
        if (window.LotusApp.echoNarrator) {
            const message = window.LotusApp.echoNarrator.generateNarrationForRollover(
                session.rolloverCount,
                session.totalCost - session.amount,
                session.amount
            );
            window.LotusApp.echoNarrator.echo(message, session);
        }
        
        // Trigger upsell after multiple rollovers
        if (session.rolloverCount >= 2 && window.LotusApp.multiLoanUpseller) {
            setTimeout(() => {
                window.LotusApp.multiLoanUpseller.triggerUpsell(session);
            }, 3000);
        }
        
        // Update coercion index
        if (window.LotusApp.echoNarrator) {
            const coercionIndex = window.LotusApp.echoNarrator.computeCoercionIndex();
            session.tagDarkPattern('coercion-index-updated', {
                coercionIndex: coercionIndex,
                rolloverCount: session.rolloverCount
            });
        }
    }

    simulateACHOverdraft(session) {
        if (!window.LotusApp.achExploiter) return;

        // Simulate the ACH debit priority
        const overdraftWarning = `
            <div class="overdraft-simulation" data-deceptive="overdraft-risk">
                <h4>⚠️ ACH Debit Processed</h4>
                <p>Your loan payment of $${session.fee} was automatically debited.</p>
                <p class="risk-warning">Other pending transactions may now overdraft due to insufficient funds.</p>
                <div class="ghost-warning hidden">
                    💸 Lenders get first priority on your paycheck, potentially causing overdrafts on rent, utilities, and groceries!
                </div>
            </div>
        `;

        const container = document.getElementById('ach-container');
        if (container) {
            container.innerHTML += overdraftWarning;
        }

        // Tag the pattern
        session.tagDarkPattern('ach-overdraft-risk', {
            debitAmount: session.fee,
            priorityPosition: 1,
            overdraftLikelihood: 'HIGH'
        });
    }

    generateConsumerHarmMetrics(session) {
        const harmMetrics = {
            averageLoanCountPerYear: Math.max(1, Math.floor(12 / (session.termDays / 30))),
            avgTotalFeesOn350Loan: session.amount === 350 ? (session.totalCost - session.amount) : ((session.totalCost - session.amount) * (350 / session.amount)),
            repeatBorrowingRate: session.rolloverCount > 0 ? 0.7 : 0.1, // 70% if rolled over
            profitFromRepeatUsersPct: 0.9 // 90% from repeat users
        };

        // Display metrics in ghost mode
        if (window.LotusApp.ghostMode?.active) {
            this.showHarmMetrics(harmMetrics);
        }

        return harmMetrics;
    }

    showHarmMetrics(metrics) {
        const metricsModal = document.createElement('div');
        metricsModal.className = 'harm-metrics-modal';
        metricsModal.innerHTML = `
            <div class="metrics-content">
                <h3>📊 Consumer Harm Metrics</h3>
                <div class="metrics-grid">
                    <div class="metric">
                        <strong>Average loans per year:</strong> ${metrics.averageLoanCountPerYear}
                    </div>
                    <div class="metric">
                        <strong>Typical fees on $350 loan:</strong> $${metrics.avgTotalFeesOn350Loan.toFixed(0)}
                    </div>
                    <div class="metric">
                        <strong>Repeat borrowing rate:</strong> ${(metrics.repeatBorrowingRate * 100).toFixed(0)}%
                    </div>
                    <div class="metric">
                        <strong>Profit from repeat users:</strong> ${(metrics.profitFromRepeatUsersPct * 100).toFixed(0)}%
                    </div>
                </div>
                <button onclick="this.remove()" class="btn-primary">Close</button>
            </div>
        `;
        
        document.body.appendChild(metricsModal);
        setTimeout(() => metricsModal.remove(), 10000);
    }
}

// Main initialization
window.LotusApp.initialize = async function() {
    if (this.initialized) return;
    
    logger.info('🪷 Lotus Payday Loan Simulator - Initializing...');
    
    try {
        // Initialize core systems
        this.autonomyTheater = new AutonomyTrap(null, new Config(), null, null);
        this.consentBar = new ConsentBar();
        this.ghostMode = new GhostModeController();
        this.simulation = new SimulationController();
        this.quizEngine = new QuizEngine();
        
        // Initialize all exploitative and educational components
        this.trapUIEngine = new TrapUIEngine();
        this.educationalEngine = new ComprehensiveEducationalEngine();
        this.darkPatternEngine = new DarkPatternEngine();
        this.educationalAssessment = new EducationalAssessment();
        this.urgencyTimer = new UrgencyTimer();
        this.liveFeed = new LiveFeed();
        
        // Initialize new exploitative engines
        this.usurySkirter = new UsurySkirterEngine();
        this.achExploiter = new ACHExploitationEngine();
        this.echoNarrator = new EchoModeNarrator();
        this.multiLoanUpseller = new MultiLoanUpsellEngine();
        
        // Initialize UI components
        this.consentBar.initialize();
        this.trapUIEngine.initialize();
        this.darkPatternEngine.initialize();
        
        // Initialize new exploitative components
        this.usurySkirter.initialize();
        this.achExploiter.initialize();
        this.echoNarrator.initialize();
        this.multiLoanUpseller.initialize();
        
        this.initialized = true;
        logger.info('✅ Lotus App initialized successfully');
        
        return this;
    } catch (error) {
        logger.error('❌ Failed to initialize Lotus App:', error);
        throw error;
    }
};

// Remove duplicate DOMContentLoaded listener - handled by the one at the bottom

// Event listeners
function setupEventListeners() {
    // Mode selection
    document.querySelectorAll('[data-mode]').forEach(btn => {
        btn.addEventListener('click', (e) => setMode(e.target.getAttribute('data-mode')));
    });

    // Form submission
    const simForm = document.getElementById('simulation-form') || document.getElementById('predatory-loan-form');
    if (simForm) {
        simForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const inputs = {
                state: formData.get('state') || 'GEN',
                amount: formData.get('amount') || 500,
                term: formData.get('term') || 14
            };
            const mode = window.LotusApp.currentMode || 'ethical';
            window.LotusApp.simulation.startSimulation(mode, inputs);
        });
    }

    // Navigation
    document.querySelectorAll('[data-nav], [id^="nav-"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const section = e.target.getAttribute('data-nav') || e.target.id.replace('nav-', '');
            if (section) showSection(section);
        });
    });
}

// Enhanced Mode Switching System
function switchToMode(mode) {
    const body = document.body;
    const modeIndicator = document.getElementById('mode-indicator');
    const modeText = modeIndicator?.querySelector('.mode-text');
    
    // Remove existing mode classes
    body.classList.remove('predatory-mode', 'ethical-mode');
    
    // Apply new mode
    body.classList.add(`${mode}-mode`);
    
    // Update mode indicator
    if (modeText) {
        modeText.textContent = mode === 'predatory' ? 
            '💀 Predatory Mode Active - Showing Real Dark Patterns' : 
            '✅ Ethical Mode Active - Transparent & User-Focused';
    }
    
    // Update all mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });
    
    // Store mode preference
    localStorage.setItem('lotus-mode', mode);
    
    // Log mode change
    logger.info(`Switched to ${mode} mode`);
    
    // Update current session mode if it exists
    if (window.LotusApp.currentSession) {
        window.LotusApp.currentSession.currentMode = mode;
    }
    
    // Initialize mode-specific features
    if (mode === 'predatory') {
        initializePredatoryFeatures();
    } else {
        initializeEthicalFeatures();
    }
}

function initializePredatoryFeatures() {
    // Show all predatory UI elements
    document.querySelectorAll('[data-deceptive]').forEach(element => {
        element.style.display = 'block';
    });
    
    // Activate dark patterns
    if (window.LotusApp.trapUIEngine) {
        window.LotusApp.trapUIEngine.setupExploitativeUI();
    }
    
    // Start countdown timers
    startCountdownTimer();
    
    // Activate fake live feed
    if (window.LotusApp.liveFeed) {
        window.LotusApp.liveFeed.start();
    }
}

function initializeEthicalFeatures() {
    // Hide predatory elements
    document.querySelectorAll('[data-deceptive]').forEach(element => {
        element.style.display = 'none';
    });
    
    // Show educational alternatives
    showEthicalAlternatives();
    
    // Display transparent cost breakdown
    showTransparentCosts();
}

function startCountdownTimer() {
    const timer = document.getElementById('urgency-timer');
    if (!timer) return;
    
    let timeLeft = 299; // 4:59 in seconds
    
    const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            timeLeft = 299; // Reset to create false urgency
        }
    }, 1000);
}

function showEthicalAlternatives() {
    const container = document.querySelector('.alternatives-section') || createAlternativesSection();
    
    container.innerHTML = `
        <h3>🏦 Better Alternatives to Payday Loans</h3>
        <div class="alternatives-grid">
            <div class="alternative-option">
                <h4>Credit Union Loan</h4>
                <p class="apr">18-28% APR</p>
                <p>Regulated rates, member-focused</p>
            </div>
            <div class="alternative-option">
                <h4>Employer Advance</h4>
                <p class="apr">0-5% APR</p>
                <p>Many employers offer paycheck advances</p>
            </div>
            <div class="alternative-option">
                <h4>Credit Card Advance</h4>
                <p class="apr">25-30% APR</p>
                <p>Still expensive but much lower than payday loans</p>
            </div>
            <div class="alternative-option">
                <h4>Family/Friends</h4>
                <p class="apr">0% APR</p>
                <p>Interest-free borrowing from personal network</p>
            </div>
        </div>
    `;
}

function createAlternativesSection() {
    const section = document.createElement('div');
    section.className = 'alternatives-section';
    const mainContent = document.querySelector('main') || document.body;
    mainContent.appendChild(section);
    return section;
}

function showTransparentCosts() {
    const container = document.querySelector('.ethical-cost-display') || createCostDisplaySection();
    
    const amount = 500; // Default amount
    const fee = amount * 0.15; // 15% fee
    const apr = ((fee / amount) * (365 / 14) * 100);
    
    container.innerHTML = `
        <h3>💰 Complete Cost Breakdown</h3>
        <div class="cost-breakdown">
            <div class="cost-item">
                <div class="label">Loan Amount</div>
                <div class="value">$${amount}</div>
            </div>
            <div class="cost-item">
                <div class="label">Finance Charge</div>
                <div class="value">$${fee}</div>
            </div>
            <div class="cost-item">
                <div class="label">Total to Repay</div>
                <div class="value">$${amount + fee}</div>
            </div>
            <div class="cost-item">
                <div class="label">Annual Percentage Rate</div>
                <div class="value">${apr.toFixed(1)}%</div>
            </div>
        </div>
        <div class="apr-warning">
            ⚠️ This APR is extremely high compared to traditional loans. Consider alternatives above.
        </div>
    `;
}

function createCostDisplaySection() {
    const section = document.createElement('div');
    section.className = 'ethical-cost-display';
    const mainContent = document.querySelector('main') || document.body;
    mainContent.appendChild(section);
    return section;
}

// Utility functions
function setMode(mode) {
    window.LotusApp.currentMode = mode;
    document.body.className = document.body.className.replace(/mode-\w+/g, '');
    document.body.classList.add(`mode-${mode}`);
    
    const indicator = document.getElementById('mode-text');
    if (indicator) {
        indicator.textContent = mode === 'predatory' ? 
            '🔴 Predatory Mode - Educational Simulation' : 
            '🟢 Ethical Mode - Regulated Lending';
    }
    
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`mode-${mode}`);
    if (activeBtn) activeBtn.classList.add('active');
    
    logger.info('Mode changed', { mode });
}

function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    const targetSection = document.getElementById(`section-${sectionName}`);
    const activeNav = document.getElementById(`nav-${sectionName}`);
    
    if (targetSection) targetSection.classList.add('active');
    if (activeNav) activeNav.classList.add('active');
    
    logger.info('Section viewed', { section: sectionName });
}

// ========================================
// REALISTIC PREDATORY LOAN SITE FEATURES
// ========================================

// Emergency popup controller
function initEmergencyPopup() {
    setTimeout(() => {
        const popup = document.getElementById('emergency-popup');
        if (popup && !localStorage.getItem('popup-shown-today')) {
            popup.style.display = 'flex';
            startPopupTimer();
            localStorage.setItem('popup-shown-today', new Date().toDateString());
        }
    }, 3000);
}

function closeEmergencyPopup() {
    const popup = document.getElementById('emergency-popup');
    if (popup) {
        popup.style.display = 'none';
    }
}

function startPopupTimer() {
    let timeLeft = 299; // 4:59
    const timerElement = document.getElementById('popup-timer');
    
    if (!timerElement) return;
    
    const interval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(interval);
            timerElement.textContent = "EXPIRED!";
            timerElement.style.color = '#ff0000';
        }
    }, 1000);
}

// Live activity feed
function initLiveFeed() {
    const feedContainer = document.getElementById('live-feed-items');
    if (!feedContainer) return;
    
    const activities = [
        { name: "Jennifer M.", location: "Dallas, TX", amount: 800, action: "approved", time: 2 },
        { name: "Michael R.", location: "Phoenix, AZ", amount: 500, action: "deposited", time: 5 },
        { name: "Sarah K.", location: "Houston, TX", amount: 600, action: "approved", time: 8 },
        { name: "David L.", location: "Austin, TX", amount: 1200, action: "applied", time: 12 },
        { name: "Lisa W.", location: "San Antonio, TX", amount: 300, action: "deposited", time: 15 },
        { name: "James P.", location: "Fort Worth, TX", amount: 900, action: "approved", time: 18 }
    ];
    
    let currentIndex = 0;
    
    function addFeedItem() {
        const activity = activities[currentIndex];
        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        feedItem.innerHTML = `
            <span class="feed-customer">${activity.name}</span> from ${activity.location}
            <span class="feed-action"> just got ${activity.action} for $${activity.amount}!</span>
            <div class="feed-time">${activity.time} min ago</div>
        `;
        
        feedContainer.insertBefore(feedItem, feedContainer.firstChild);
        
        // Remove old items (keep only 3)
        while (feedContainer.children.length > 3) {
            feedContainer.removeChild(feedContainer.lastChild);
        }
        
        currentIndex = (currentIndex + 1) % activities.length;
    }
    
    // Add initial items
    addFeedItem();
    
    // Add new item every 8 seconds
    setInterval(addFeedItem, 8000);
}

// Urgency timers
function initUrgencyTimers() {
    const timers = ['main-urgency-timer', 'popup-timer'];
    
    timers.forEach(timerId => {
        const timerElement = document.getElementById(timerId);
        if (!timerElement) return;
        
        let timeLeft = 299; // 4:59
        
        const interval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            timeLeft--;
            
            if (timeLeft < 0) {
                timeLeft = 299; // Reset timer
            }
        }, 1000);
    });
}

// Calculator functions
function setAmount(amount) {
    const slider = document.getElementById('cash-amount');
    const amountDisplay = document.getElementById('selected-amount');
    const youGet = document.getElementById('you-get');
    const feeAmount = document.getElementById('fee-amount');
    const totalPayback = document.getElementById('total-payback');
    const applyAmount = document.getElementById('apply-amount');
    
    if (slider) slider.value = amount;
    if (amountDisplay) amountDisplay.textContent = amount;
    if (applyAmount) applyAmount.textContent = amount;
    
    // Calculate predatory fees (15-30 per $100)
    const feeRate = 0.25; // 25% fee
    const fee = Math.round(amount * feeRate);
    const total = amount + fee;
    
    if (youGet) youGet.textContent = amount;
    if (feeAmount) feeAmount.textContent = fee;
    if (totalPayback) totalPayback.textContent = total;
    
    updateRepaymentDate();
}

function updateRepaymentDate() {
    const repaymentElement = document.getElementById('repayment-date');
    if (!repaymentElement) return;
    
    // Calculate next payday (typically 14 days)
    const repaymentDate = new Date();
    repaymentDate.setDate(repaymentDate.getDate() + 14);
    
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    repaymentElement.textContent = repaymentDate.toLocaleDateString('en-US', options);
}

// Initialize calculator slider
function initCalculatorSlider() {
    const slider = document.getElementById('cash-amount');
    if (!slider) return;
    
    slider.addEventListener('input', (e) => {
        setAmount(parseInt(e.target.value));
    });
    
    // Set initial values
    setAmount(500);
}

// Initialize all realistic features
function initRealisticFeatures() {
    try {
        initEmergencyPopup();
        initLiveFeed();
        initUrgencyTimers();
        initCalculatorSlider();
        updateRepaymentDate();
        
        // Add global functions to window for onclick handlers
        window.setAmount = setAmount;
        window.closeEmergencyPopup = closeEmergencyPopup;
        
        logger.info('Realistic predatory features initialized');
    } catch (error) {
        logger.error('Error initializing realistic features:', error);
    }
}

// Add to existing initialization
document.addEventListener('DOMContentLoaded', () => {
    initRealisticFeatures();
    console.log('DOM loaded, initializing Lotus App...');
    window.LotusApp.initialize().then(() => {
        console.log('Lotus App initialization complete');
        
        // Hide loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => loadingScreen.style.display = 'none', 500);
            }, 1000);
        }
        
        // Initialize with saved mode or default to ethical
        const savedMode = localStorage.getItem('lotus-mode') || 'ethical';
        setMode(savedMode);
    }).catch(error => {
        console.error('Failed to initialize Lotus App:', error);
    });
});

export { SimulationController, GhostModeController };
