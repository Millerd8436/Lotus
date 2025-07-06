/**
 * app.js - Main Orchestrator for the Lotus + Autonomy Theater Simulation
 *
 * This file connects the UI to the simulation logic. It imports all necessary
 * modules and sets up event listeners to run the simulation based on user choices.
 */

// --- 1. MODULE IMPORTS ---
import { LoanCore, Config, LoanSession } from './core/loan_core.js';
import { Exploitative } from './modes/exploitative.js';
import { Ethical } from './modes/ethical.js';
import { evaluateConsent } from './engine/kant.js';
import { generateFollowUpEmail, displayReflection } from './components/reflection.js';
import { UI } from './ui.js';
import { Echo } from './engine/echo.js';
import { Ghost } from './narrator/ghost.js';
import { ResearchAnalytics } from './research/research_analytics.js';
import { AcademicReferences, EducationalScaffolding } from './docs/academic_references.js';
import { DarkPatternEngine } from './ui_components/darkPatternEngine.js';
import { APRCalculator } from './ui_components/aprCalculator.js';
import { DarkPatternFlags } from './ui_components/darkPatternFlags.js';
import { LegalLoopholeIndex } from './ui_components/legalLoopholeIndex.js';
import { PromptEngine } from './ui_components/promptEngine.js';
import { BehaviorReplay } from './ui_components/behaviorReplay.js';
import { APRTransparencyMeter } from './ui_components/aprTransparencyMeter.js';
import { DebtCycleSimulator } from './ui_components/debtCycleSimulator.js';

// NEW: Comprehensive Educational Components
import { EducationalScaffolding as ComprehensiveEducationalScaffolding } from './ui_components/educationalScaffolding.js';
import { BehavioralPsychologyEngine } from './engine/behavioralPsychology.js';
import { ResearchDataCollector } from './research/researchDataCollector.js';
import { EducationalAssessment } from './ui_components/educationalAssessment.js';

// --- 2. DOM ELEMENT SELECTION ---
const regulatedBtn = document.getElementById('start-regulated');
const exploitBtn = document.getElementById('start-exploit');
const emailReportBtn = document.getElementById('emailReportBtn');
const downloadLogBtn = document.getElementById('downloadLogBtn');
const reflectionPane = document.getElementById('reflectionPane');
const outputElement = document.getElementById('output');
const stateInput = document.getElementById('state-input');
const amountInput = document.getElementById('amount-input');
const termInput = document.getElementById('term-input');
const scenarioSelect = document.getElementById('scenario-select');
const replayBtn = document.getElementById('replayBtn');

// --- 3. APPLICATION STATE ---
let currentSession = null;
let currentMode = '';
let echo = null;
let ghost = null;

// Initialize research analytics
let researchAnalytics = new ResearchAnalytics();

// Initialize new dark pattern and legal analysis components
let globalDarkPatternEngine = new DarkPatternEngine();
let globalAPRCalculator = new APRCalculator();
let globalDarkPatternFlags = new DarkPatternFlags();
let globalLegalLoopholeIndex = new LegalLoopholeIndex();

// Initialize new comprehensive components
let globalPromptEngine = new PromptEngine();
let globalBehaviorReplay = new BehaviorReplay();
let globalAPRTransparencyMeter = new APRTransparencyMeter();
let globalDebtCycleSimulator = new DebtCycleSimulator();

// NEW: Initialize comprehensive educational and research systems
let comprehensiveEducationalScaffolding = new ComprehensiveEducationalScaffolding();
let behavioralPsychologyEngine = null; // Initialized when simulation starts
let researchDataCollector = new ResearchDataCollector();
let educationalAssessment = null; // Initialized with educational scaffolding

// --- 4. CORE APPLICATION LOGIC ---

/**
 * Defines the base class for all loan strategies.
 */
class LoanStrategy {
    async run(session, config) {
        throw new Error("Strategy must implement a run method.");
    }
}

/**
 * Initializes and runs a simulation based on the selected mode.
 * @param {string} mode - The simulation mode to run ('ethical' or 'exploitative').
 */
async function runSimulation(mode) {
    disableUI();
    echo = new Echo();
    ghost = new Ghost();
    UI.init(echo, ghost);

    // Initialize comprehensive educational and behavioral systems
    if (!educationalAssessment) {
        educationalAssessment = new EducationalAssessment(comprehensiveEducationalScaffolding);
    }

    const state = stateInput.value || 'GEN';
    const amount = parseFloat(amountInput.value) || 0;
    const term = parseInt(termInput.value, 10) || 0;
    const scenario = scenarioSelect.value;

    outputElement.textContent = `Starting ${mode} simulation for state ${state.toUpperCase()}...\n\n`;
   
    const config = new Config();
    const session = new LoanSession();
    session.ghost = ghost;
   
    session.state = state.toUpperCase();
    config.state = state.toUpperCase();

    if (amount > 0) session.amount = amount;
    if (term > 0) session.termDays = term;
    else session.termDays = config.getCurrentStateRules(session.state).minTermDays || 14;

    if (scenario) {
        UI.loadScenarioPreset(config, session, scenario);
    }

    // Initialize behavioral psychology engine for this session
    behavioralPsychologyEngine = new BehavioralPsychologyEngine(echo, session);

    // Record simulation start for research purposes
    researchDataCollector.recordDecision('simulation_mode_selection', ['ethical', 'exploitative'], mode, {
        simulationIntensity: getSimulationIntensity(),
        researchModeEnabled: document.getElementById('enable-research-mode')?.checked || false,
        educationalModeEnabled: document.getElementById('enable-educational-tracking')?.checked || false
    });

    let strategy;
    if (mode === 'exploitative') {
        strategy = new Exploitative();
        Object.keys(config).forEach(key => {
            if (key.startsWith('exploit')) config[key] = true;
            if (key.startsWith('regulated') || key.startsWith('edu') || key.startsWith('compliance')) config[key] = false;
        });
        config.exploitLayeredFees = new Config().exploitLayeredFees;
    } else {
        strategy = new Ethical();
        Object.keys(config).forEach(key => {
            if (key.startsWith('exploit')) config[key] = false;
            if (key.startsWith('regulated') || key.startsWith('edu') || key.startsWith('compliance')) config[key] = true;
        });
    }
   
    await strategy.run(session, config);

    UI.show("\n--- Simulation Complete ---");
    
    currentSession = session;
    currentMode = mode;

    // Generate comprehensive analysis
    const analysis = evaluateConsent(session);
    const behavioralReport = behavioralPsychologyEngine.generateBehavioralReport();
    const researchReport = researchDataCollector.generateResearchReport();
    
    // Display results with comprehensive educational feedback
    displayReflection(session, echo, analysis);
    displayBehavioralInsights(behavioralReport);
    displayEducationalProgress();
    
    reflectionPane.classList.remove('hidden');
    
    enableUI();
}

function enableUI() {
    regulatedBtn.disabled = false;
    exploitBtn.disabled = false;
}

function disableUI() {
    regulatedBtn.disabled = true;
    exploitBtn.disabled = true;
}

// --- 5. EVENT LISTENERS ---
regulatedBtn.addEventListener('click', () => runSimulation('ethical'));
exploitBtn.addEventListener('click', () => runSimulation('exploitative'));

emailReportBtn.addEventListener('click', () => {
    if (currentSession) {
        generateFollowUpEmail(currentSession, new Config(), currentMode);
    } else {
        UI.show("\n[Please run a simulation first to generate a report.]");
    }
});

downloadLogBtn.addEventListener('click', () => {
    if (currentSession) {
        currentSession.exportJson('loan_session.json');
    } else {
        UI.show("\n[Please run a simulation first to generate a report.]");
    }
});

replayBtn.addEventListener('click', () => {
    window.location.reload();
});

// NEW: Research mode event listeners
document.getElementById('enable-research-mode')?.addEventListener('change', function(e) {
    if (e.target.checked) {
        researchAnalytics.enableResearchMode();
        UI.show("📊 Research mode enabled - detailed analytics will be collected");
    } else {
        document.getElementById('research-dashboard')?.classList.add('hidden');
    }
});

document.getElementById('enable-compliance-tracking')?.addEventListener('change', function(e) {
    if (e.target.checked) {
        researchAnalytics.enableComplianceMode();
        UI.show("⚖️ Compliance tracking enabled - regulatory violations will be monitored");
    } else {
        document.getElementById('compliance-tracker')?.classList.add('hidden');
    }
});

document.getElementById('enable-educational-tracking')?.addEventListener('change', function(e) {
    if (e.target.checked) {
        researchAnalytics.enableEducationalMode();
        UI.show("🎓 Educational tracking enabled - learning progress will be monitored");
    } else {
        document.getElementById('education-progress')?.classList.add('hidden');
    }
});

// Research data export
document.getElementById('export-research-data')?.addEventListener('click', function() {
    const comprehensiveData = {
        researchAnalytics: researchAnalytics.exportToJSON(),
        behavioralData: behavioralPsychologyEngine ? behavioralPsychologyEngine.generateBehavioralReport() : null,
        educationalProgress: educationalAssessment ? educationalAssessment.exportAssessmentData() : null,
        researchData: researchDataCollector.exportResearchData()
    };
    
    // Create comprehensive research export
    const blob = new Blob([JSON.stringify(comprehensiveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lotus_comprehensive_research_data_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    UI.show("📁 Comprehensive research data exported - includes behavioral, educational, and research analytics");
});

// Pre-configured research scenarios
document.getElementById('scenario-tribal-sovereignty')?.addEventListener('click', function() {
    startResearchScenario('tribal_sovereignty');
});

document.getElementById('scenario-earnin-analysis')?.addEventListener('click', function() {
    startResearchScenario('earnin_analysis');
});

document.getElementById('scenario-rent-a-bank')?.addEventListener('click', function() {
    startResearchScenario('rent_a_bank');
});

document.getElementById('scenario-debt-trap-cycle')?.addEventListener('click', function() {
    startResearchScenario('debt_trap_cycle');
});

// NEW: Research scenario configurations
function startResearchScenario(scenarioType) {
    UI.clearOutput();
    
    // Configure simulation based on research scenario
    const config = new Config();
    
    switch(scenarioType) {
        case 'tribal_sovereignty':
            setupTribalSovereigntyScenario(config);
            break;
        case 'earnin_analysis':
            setupEarninAnalysisScenario(config);
            break;
        case 'rent_a_bank':
            setupRentABankScenario(config);
            break;
        case 'debt_trap_cycle':
            setupDebtTrapCycleScenario(config);
            break;
    }
    
    // Start exploitative simulation with research focus
    startExploitativeSimulation(config);
}

function setupTribalSovereigntyScenario(config) {
    UI.show("🏺 RESEARCH SCENARIO: Tribal Sovereignty Loophole Analysis");
    UI.show("This scenario focuses on how payday lenders exploit tribal sovereign immunity to bypass state regulations.");
    
    // Configure for tribal loophole research
    config.exploitEnableTribalCharterLoophole = true;
    config.exploitEnableRentABankLoophole = false;
    config.state = 'NY'; // State with strict regulations
    config.enableResearchTracking = true;
    
    researchAnalytics.recordDecisionPoint('scenario_selection', 
        ['tribal_sovereignty', 'earnin_analysis', 'rent_a_bank', 'debt_trap_cycle'], 
        'tribal_sovereignty', 0);
}

function setupEarninAnalysisScenario(config) {
    UI.show("📱 RESEARCH SCENARIO: Earnin Tip Model Analysis");
    UI.show("This scenario analyzes how EWA apps use 'voluntary' tips to circumvent lending regulations.");
    
    // Configure for EWA tip model research
    config.eduShowEarninTipModel = true;
    config.exploitUseVoluntaryTipPressure = true;
    config.exploitHideAPRCompletelyTips = true;
    config.enableResearchTracking = true;
    
    researchAnalytics.recordDecisionPoint('scenario_selection', 
        ['tribal_sovereignty', 'earnin_analysis', 'rent_a_bank', 'debt_trap_cycle'], 
        'earnin_analysis', 0);
}

function setupRentABankScenario(config) {
    UI.show("🏦 RESEARCH SCENARIO: Rent-a-Bank Scheme Analysis");
    UI.show("This scenario demonstrates how payday lenders partner with banks to bypass state rate caps.");
    
    // Configure for rent-a-bank research
    config.exploitEnableRentABankLoophole = true;
    config.exploitRentABankCharterState = 'Delaware';
    config.state = 'CA'; // State with 36% cap
    config.enableResearchTracking = true;
    
    researchAnalytics.recordDecisionPoint('scenario_selection', 
        ['tribal_sovereignty', 'earnin_analysis', 'rent_a_bank', 'debt_trap_cycle'], 
        'rent_a_bank', 0);
}

function setupDebtTrapCycleScenario(config) {
    UI.show("🔄 RESEARCH SCENARIO: Debt Trap Cycle Analysis");
    UI.show("This scenario focuses on how lenders create dependency through renewal cycles and fees.");
    
    // Configure for debt trap research
    config.exploitEnableDebtTrapCycle = true;
    config.exploitEnableAutomaticRenewals = true;
    config.exploitUseFeeFirstPaymentAllocation = true;
    config.enableResearchTracking = true;
    
    researchAnalytics.recordDecisionPoint('scenario_selection', 
        ['tribal_sovereignty', 'earnin_analysis', 'rent_a_bank', 'debt_trap_cycle'], 
        'debt_trap_cycle', 0);
}

// Enhanced simulation start functions with research tracking
function startEthicalSimulation(customConfig = null) {
    const config = customConfig || new Config();
    const session = new LoanSession(config);
    
    // Set research tracking if enabled
    if (researchAnalytics.researchMode) {
        config.enableResearchTracking = true;
        session.researchAnalytics = researchAnalytics;
    }
    
    // Enhanced Kantian consent and usury education
    config.enableKantianInformedConsent = true;
    config.enableComprehensiveUsuryEducation = true;
    
    window.currentSimulationMode = 'ethical';
    
    const ethical = new Ethical();
    ethical.run(session, config).then(() => {
        // Research data collection
        if (researchAnalytics.researchMode) {
            const report = researchAnalytics.generateResearchReport();
            console.log('📊 Research Report Generated:', report);
        }
        
        handleSimulationEnd(session, config);
    });
}

function startExploitativeSimulation(customConfig = null) {
    const config = customConfig || new Config();
    const session = new LoanSession(config);
    
    // Set research tracking if enabled
    if (researchAnalytics.researchMode) {
        config.enableResearchTracking = true;
        session.researchAnalytics = researchAnalytics;
    }
    
    // Enable all advanced deceptive patterns
    config.enableAdvancedDeceptivePatterns = true;
    config.enableManipulativeFeePresentaion = true;
    config.enableDependencyLoopCreation = true;
    
    window.currentSimulationMode = 'exploitative';
    
    const exploitative = new Exploitative();
    exploitative.run(session, config).then(() => {
        // Research data collection
        if (researchAnalytics.researchMode) {
            const report = researchAnalytics.generateResearchReport();
            console.log('📊 Research Report Generated:', report);
        }
        
        handleSimulationEnd(session, config);
    });
}

// Enhanced simulation end handling with research features
function handleSimulationEnd(session, config) {
    // Generate comprehensive research report if in research mode
    if (researchAnalytics.researchMode) {
        generateComprehensiveReport(session, config);
    }
    
    // Show educational reflection with research insights
    showEnhancedReflection(session, config);
}

function generateComprehensiveReport(session, config) {
    UI.show("\n📊 === COMPREHENSIVE RESEARCH REPORT ===");
    
    const report = researchAnalytics.generateResearchReport();
    
    UI.show(`\n🔍 EXECUTIVE SUMMARY:`);
    UI.show(`• Session ID: ${report.executive_summary.sessionId}`);
    UI.show(`• Dark Patterns Detected: ${report.executive_summary.darkPatternsDetected}`);
    UI.show(`• Educational Modules: ${report.executive_summary.educationalModulesCompleted}`);
    UI.show(`• Compliance Violations: ${report.executive_summary.complianceViolations}`);
    UI.show(`• Knowledge Score: ${report.executive_summary.knowledgeAssessmentScore.toFixed(1)}%`);
    UI.show(`• Risk Score: ${report.executive_summary.overallRiskScore}/100`);
    
    UI.show(`\n🎯 DARK PATTERN ANALYSIS:`);
    Object.entries(report.dark_patterns_analysis.patternsByType).forEach(([type, count]) => {
        UI.show(`• ${type}: ${count} instances`);
    });
    
    UI.show(`\n⚖️ COMPLIANCE ANALYSIS:`);
    Object.entries(report.compliance_analysis.violationsByType).forEach(([type, count]) => {
        UI.show(`• ${type}: ${count} violations`);
    });
    
    UI.show(`\n📚 EDUCATIONAL EFFECTIVENESS:`);
    UI.show(`• Average Engagement: ${report.educational_effectiveness.averageEngagement.toFixed(0)}ms`);
    UI.show(`• Knowledge Retention: ${report.educational_effectiveness.knowledgeRetention.toFixed(1)}%`);
    
    UI.show(`\n💡 KEY INSIGHTS:`);
    if (report.executive_summary.darkPatternsDetected > 10) {
        UI.show("• HIGH RISK: Extensive use of manipulative design patterns detected");
    }
    if (report.executive_summary.complianceViolations > 5) {
        UI.show("• REGULATORY CONCERN: Multiple compliance violations identified");
    }
    if (report.educational_effectiveness.knowledgeRetention > 80) {
        UI.show("• EFFECTIVE EDUCATION: High knowledge retention achieved");
    }
    
    UI.show("\n📁 Full research data has been exported for further analysis.");
}

function showEnhancedReflection(session, config) {
    // Enhanced reflection with research insights and academic references
    const reflectionPane = document.getElementById('reflectionPane');
    if (reflectionPane) {
        reflectionPane.classList.remove('hidden');
        
        // Populate with research-enhanced content
        if (researchAnalytics.researchMode) {
            addResearchInsights(session, config);
        }
        
        addAcademicReferences(session, config);
    }
}

function addResearchInsights(session, config) {
    const behaviorSummary = document.getElementById('behaviorSummary');
    if (behaviorSummary) {
        let insights = '<h4 class="font-bold text-lg mb-2">Research Insights:</h4>';
        
        const darkPatterns = researchAnalytics.sessionData.darkPatternsDetected.length;
        const violations = researchAnalytics.sessionData.complianceViolations.length;
        
        if (darkPatterns > 0) {
            insights += `<p class="mb-2">🚨 <strong>${darkPatterns} dark patterns</strong> were identified during this simulation, including:</p>`;
            const topPatterns = researchAnalytics.sessionData.darkPatternsDetected
                .slice(0, 3)
                .map(p => `<li>${p.type}: ${p.description}</li>`)
                .join('');
            insights += `<ul class="list-disc ml-4 mb-3">${topPatterns}</ul>`;
        }
        
        if (violations > 0) {
            insights += `<p class="mb-2">⚖️ <strong>${violations} regulatory violations</strong> were detected, highlighting gaps in consumer protection.</p>`;
        }
        
        insights += '<p class="text-sm text-gray-400 mt-3">This data contributes to academic research on predatory lending practices.</p>';
        
        behaviorSummary.innerHTML = insights;
    }
}

function addAcademicReferences(session, config) {
    const autonomyScore = document.getElementById('autonomyScore');
    if (autonomyScore) {
        let references = '<h4 class="font-bold text-lg mb-2">Academic Context:</h4>';
        
        references += '<div class="space-y-3 text-sm">';
        
        // Add relevant academic references based on what was shown
        if (config.enableKantianInformedConsent) {
            references += '<div class="p-2 bg-gray-600 rounded">';
            references += '<strong>Kantian Ethics in Finance:</strong> ';
            references += 'This simulation implements principles from Kant\'s "Groundwork for the Metaphysics of Morals" (1785), ';
            references += 'requiring that borrowers be treated as ends in themselves, not merely as means to profit.';
            references += '</div>';
        }
        
        if (session.complianceViolations?.length > 0) {
            references += '<div class="p-2 bg-gray-600 rounded">';
            references += '<strong>Regulatory Framework:</strong> ';
            references += 'Violations detected relate to CFPB Rule 12 CFR 1041 and state usury laws. ';
            references += 'See Pew Charitable Trusts (2019) on state rate cap effectiveness.';
            references += '</div>';
        }
        
        references += '<div class="p-2 bg-gray-600 rounded">';
        references += '<strong>Research Applications:</strong> ';
        references += 'This simulation generates data suitable for behavioral economics research, ';
        references += 'consumer protection policy analysis, and educational effectiveness studies.';
        references += '</div>';
        
        references += '</div>';
        
        autonomyScore.innerHTML = references;
    }
}

// --- 6. INITIALIZATION ---
console.log("Lotus + Autonomy Theater application initialized. Ready for simulation.");
// The initial welcome message is already present in the HTML <pre> tag.

// --- 7. APPLICATION INITIALIZATION ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Lotus Platform - Initializing...');
    
    // Initialize comprehensive components
    initializeComponents();
    
    // Set up professional UI
    setupProfessionalInterface();
    
    // Set up event listeners for new features
    setupAdvancedEventListeners();
    
    // Initialize academic resources
    loadAcademicResources();
    
    echo = new Echo();
    ghost = new Ghost();
    
    console.log('✅ Lotus Platform - Ready');
});

function initializeComponents() {
    // Initialize APR Transparency Meter
    const aprContainer = document.querySelector('#simulation-interface');
    if (aprContainer) {
        globalAPRTransparencyMeter.initialize('simulation-interface');
    }
    
    // Initialize debt cycle simulator
    globalDebtCycleSimulator.initialize({
        initialAmount: 300,
        baseFee: 45,
        rolloverFee: 25,
        autoRenewal: true
    });
    
    // Initialize behavior recording for exploitative mode
    globalBehaviorReplay.startRecording();
    
    // Initialize academic references
    AcademicReferences.initialize();
    EducationalScaffolding.initialize();
    
    console.log('🔧 Core components initialized');
}

function setupProfessionalInterface() {
    // Handle mode selection buttons
    const ethicalBtn = document.getElementById('start-ethical-mode');
    const exploitativeBtn = document.getElementById('start-exploitative-mode');
    
    if (ethicalBtn) {
        ethicalBtn.addEventListener('click', () => startProfessionalMode('ethical'));
    }
    
    if (exploitativeBtn) {
        exploitativeBtn.addEventListener('click', () => startProfessionalMode('exploitative'));
    }
    
    // Research mode toggle
    const researchToggle = document.getElementById('toggle-research-mode');
    if (researchToggle) {
        researchToggle.addEventListener('click', toggleResearchMode);
    }
    
    // APR Calculator real-time updates
    ['loan-amount', 'loan-fee', 'loan-term'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', updateAPRCalculation);
        }
    });
    
    // Terms agreement checkbox
    const termsCheckbox = document.getElementById('terms-agreement');
    const submitBtn = document.getElementById('submit-application');
    
    if (termsCheckbox && submitBtn) {
        termsCheckbox.addEventListener('change', function() {
            submitBtn.disabled = !this.checked;
        });
    }
    
    // Show terms modal
    const showTermsBtn = document.getElementById('show-terms');
    if (showTermsBtn) {
        showTermsBtn.addEventListener('click', showTermsModal);
    }
}

function setupAdvancedEventListeners() {
    // Form submission
    const submitBtn = document.getElementById('submit-application');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleApplicationSubmission);
    }
    
    // Export functionality
    const exportBtn = document.getElementById('export-research-data');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportComprehensiveData);
    }
    
    // Custom dark pattern detection
    document.addEventListener('darkPatternTriggered', handleDarkPatternDetection);
    document.addEventListener('consentBypass', handleConsentBypass);
}

async function startProfessionalMode(mode) {
    console.log(`🚀 Starting ${mode} mode...`);
    
    // Hide mode selection, show simulation interface
    const modeSelection = document.getElementById('mode-selection');
    const simulationInterface = document.getElementById('simulation-interface');
    
    if (modeSelection) modeSelection.style.display = 'none';
    if (simulationInterface) simulationInterface.classList.remove('hidden');
    
    // Configure UI based on mode
    if (mode === 'ethical') {
        setupEthicalMode();
    } else {
        setupExploitativeMode();
    }
    
    // Create new session
    const session = new LoanSession();
    const config = new Config();
    
    // Configure for research
    config.researchMode = true;
    config.behaviorTracking = true;
    config.complianceMonitoring = true;
    
    // Start simulation
    await runAdvancedSimulation(mode, session, config);
}

function setupEthicalMode() {
    // Show consent bar
    const consentBar = document.getElementById('consent-bar-container');
    if (consentBar) consentBar.classList.remove('hidden');
    
    // Hide dark pattern alerts
    const darkPatternAlerts = document.getElementById('dark-pattern-alerts');
    if (darkPatternAlerts) darkPatternAlerts.classList.add('hidden');
    
    // Show educational feedback
    const educationalFeedback = document.getElementById('educational-feedback');
    if (educationalFeedback) {
        educationalFeedback.innerHTML = `
            <h4 class="text-lg font-bold text-green-300 mb-3">
                <i class="fas fa-lightbulb mr-2"></i>
                Educational Insights
            </h4>
            <div class="text-sm text-green-200">
                <p>✅ This platform provides full transparency about loan costs</p>
                <p>✅ All fees and terms are clearly disclosed upfront</p>
                <p>✅ You have time to consider alternatives</p>
                <p>✅ Educational resources are provided to help your decision</p>
            </div>
        `;
    }
    
    console.log('🌱 Ethical mode configured');
}

function setupExploitativeMode() {
    // Hide consent bar
    const consentBar = document.getElementById('consent-bar-container');
    if (consentBar) consentBar.classList.add('hidden');
    
    // Show dark pattern alerts
    const darkPatternAlerts = document.getElementById('dark-pattern-alerts');
    if (darkPatternAlerts) darkPatternAlerts.classList.remove('hidden');
    
    // Show urgency trap
    const urgencyTrap = document.getElementById('urgency-trap');
    if (urgencyTrap) {
        urgencyTrap.classList.remove('hidden');
        startCountdownTimer();
    }
    
    // Show legal loophole tracker
    const loopholeTracker = document.getElementById('legal-loophole-tracker');
    if (loopholeTracker) loopholeTracker.classList.remove('hidden');
    
    // Start dark pattern engine
    globalDarkPatternEngine.activatePattern('urgency', {
        message: "Limited time offer expires soon!",
        intensity: 'high'
    });
    
    // Add hidden costs to transparency meter
    globalAPRTransparencyMeter.addHiddenCost({
        type: 'fee',
        amount: 25,
        description: 'Processing fee (not disclosed upfront)',
        manipulation_technique: 'hidden_in_terms'
    });
    
    globalAPRTransparencyMeter.addHiddenCost({
        type: 'rollover',
        amount: 75,
        description: 'Automatic rollover charges',
        manipulation_technique: 'pre_selected_option'
    });
    
    console.log('🕷️ Exploitative mode configured');
}

function startCountdownTimer() {
    let timeLeft = 300; // 5 minutes in seconds
    const timerElement = document.getElementById('countdown-timer');
    
    const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(countdown);
            if (timerElement) {
                timerElement.textContent = 'EXPIRED';
                timerElement.parentElement.style.backgroundColor = '#7f1d1d';
            }
        }
    }, 1000);
}

function updateAPRCalculation() {
    const amount = parseFloat(document.getElementById('loan-amount')?.value) || 0;
    const fee = parseFloat(document.getElementById('loan-fee')?.value) || 0;
    const term = parseFloat(document.getElementById('loan-term')?.value) || 1;
    
    if (amount > 0 && term > 0) {
        const apr = globalAPRCalculator.calculateAPR(amount, fee, term);
        const aprElement = document.getElementById('calculated-apr');
        
        if (aprElement) {
            aprElement.textContent = `${apr.toFixed(1)}%`;
            
            // Color code based on APR level
            if (apr > 400) {
                aprElement.className = 'text-3xl font-bold text-red-400';
            } else if (apr > 100) {
                aprElement.className = 'text-3xl font-bold text-orange-400';
            } else {
                aprElement.className = 'text-3xl font-bold text-yellow-400';
            }
        }
    }
}

function showTermsModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-slate-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-white">Terms and Conditions</h3>
                <button id="close-terms" class="text-slate-400 hover:text-white">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            
            <div class="text-sm text-slate-300 space-y-4 font-mono">
                <div class="bg-red-900/20 border border-red-500/50 rounded p-3">
                    <p class="text-red-300 font-bold">⚠️ AUTOMATIC RENEWAL CLAUSE</p>
                    <p>If you cannot repay by the due date, this loan will automatically renew with additional fees.</p>
                </div>
                
                <div class="bg-orange-900/20 border border-orange-500/50 rounded p-3">
                    <p class="text-orange-300 font-bold">💰 COLLECTION FEES</p>
                    <p>Failed payments may result in collection fees up to $150 plus legal costs.</p>
                </div>
                
                <div class="bg-purple-900/20 border border-purple-500/50 rounded p-3">
                    <p class="text-purple-300 font-bold">⚖️ BINDING ARBITRATION</p>
                    <p>You waive your right to sue and agree to binding arbitration for all disputes.</p>
                </div>
                
                <div class="bg-blue-900/20 border border-blue-500/50 rounded p-3">
                    <p class="text-blue-300 font-bold">📊 CREDIT REPORTING</p>
                    <p>Payment history may be reported to credit bureaus. Late payments can damage your credit score.</p>
                </div>
            </div>
            
            <div class="mt-6 text-center">
                <button id="accept-terms" class="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg mr-2">
                    Accept Terms
                </button>
                <button id="decline-terms" class="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-lg">
                    Decline
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners
    document.getElementById('close-terms').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('accept-terms').addEventListener('click', () => {
        document.getElementById('terms-agreement').checked = true;
        document.getElementById('submit-application').disabled = false;
        document.body.removeChild(modal);
        
        // Track consent bypass
        globalDarkPatternFlags.logFlag('consent_bypass', 'terms_hidden_in_modal');
    });
    
    document.getElementById('decline-terms').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

function handleApplicationSubmission() {
    console.log('📝 Processing loan application...');
    
    // Collect form data
    const formData = {
        income: document.getElementById('income-level')?.value,
        employment: document.getElementById('employment-status')?.value,
        amount: document.getElementById('loan-amount')?.value,
        terms_accepted: document.getElementById('terms-agreement')?.checked
    };
    
    // Process through current mode
    if (currentMode === 'exploitative') {
        processExploitativeApplication(formData);
    } else {
        processEthicalApplication(formData);
    }
}

function processExploitativeApplication(formData) {
    // Trigger multiple dark patterns
    globalDarkPatternEngine.activatePattern('bait_and_switch', {
        original_rate: '15.99%',
        actual_rate: '399.99%',
        reason: 'Based on your profile'
    });
    
    // Log legal loopholes
    globalLegalLoopholeIndex.logLoophole('military_exemption_bypass', {
        description: 'Uses tribal lending to bypass MLA protections',
        impact: 'high'
    });
    
    // Show fake approval
    showFakeApproval();
}

function processEthicalApplication(formData) {
    // Update consent bar
    updateConsentLevel(85);
    
    // Show transparent breakdown
    showTransparentBreakdown(formData);
}

function showFakeApproval() {
    const alert = document.createElement('div');
    alert.className = 'fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50';
    alert.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2 text-2xl"></i>
            <div>
                <div class="font-bold">APPROVED!</div>
                <div class="text-sm">$500 ready for deposit</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-exclamation-triangle mr-2 text-2xl text-yellow-300"></i>
                <div>
                    <div class="font-bold">Final Review Required</div>
                    <div class="text-sm">Additional verification needed</div>
                </div>
            </div>
        `;
        alert.className = 'fixed top-4 right-4 bg-orange-600 text-white p-4 rounded-lg shadow-lg z-50';
    }, 3000);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 8000);
}

function loadAcademicResources() {
    const resourcesContainer = document.getElementById('academic-resources');
    if (resourcesContainer) {
        resourcesContainer.classList.remove('hidden');
        
        // Load research papers
        const papersContainer = document.getElementById('research-papers');
        if (papersContainer) {
            papersContainer.innerHTML = AcademicReferences.getResearchPapers()
                .slice(0, 5)
                .map(paper => `
                    <div class="flex items-center">
                        <i class="fas fa-file-alt mr-2 text-blue-400"></i>
                        <a href="${paper.url}" target="_blank" class="text-blue-300 hover:text-blue-200 text-sm">
                            ${paper.title}
                        </a>
                    </div>
                `).join('');
        }
        
        // Load legal references
        const legalContainer = document.getElementById('legal-references');
        if (legalContainer) {
            legalContainer.innerHTML = AcademicReferences.getLegalReferences()
                .slice(0, 5)
                .map(ref => `
                    <div class="flex items-center">
                        <i class="fas fa-gavel mr-2 text-yellow-400"></i>
                        <a href="${ref.url}" target="_blank" class="text-yellow-300 hover:text-yellow-200 text-sm">
                            ${ref.title}
                        </a>
                    </div>
                `).join('');
        }
    }
}

function toggleResearchMode() {
    const dashboard = document.getElementById('research-dashboard');
    if (dashboard) {
        if (dashboard.classList.contains('hidden')) {
            dashboard.classList.remove('hidden');
            researchAnalytics.enableResearchMode();
            console.log('📊 Research mode enabled');
        } else {
            dashboard.classList.add('hidden');
            console.log('📊 Research mode disabled');
        }
    }
}

function handleDarkPatternDetection(event) {
    const pattern = event.detail;
    console.log('🚨 Dark pattern detected:', pattern);
    
    // Update dark pattern alerts
    const alertsContainer = document.getElementById('active-patterns');
    if (alertsContainer) {
        const alert = document.createElement('div');
        alert.className = 'text-xs p-2 bg-red-800/30 rounded';
        alert.textContent = `${pattern.type}: ${pattern.description}`;
        alertsContainer.appendChild(alert);
    }
    
    // Update research dashboard
    const countElement = document.getElementById('dark-pattern-count');
    if (countElement) {
        const currentCount = parseInt(countElement.textContent) || 0;
        countElement.textContent = currentCount + 1;
    }
}

function handleConsentBypass(event) {
    const bypass = event.detail;
    console.log('⚠️ Consent bypass detected:', bypass);
    
    // Update consent level
    updateConsentLevel(Math.max(0, getCurrentConsentLevel() - 20));
    
    // Log in legal loopholes
    globalLegalLoopholeIndex.logLoophole('consent_bypass', {
        type: bypass.type,
        impact: 'medium',
        description: `Consent bypassed via ${bypass.method}`
    });
}

function updateConsentLevel(level) {
    const consentBar = document.getElementById('consent-bar');
    const consentPercentage = document.getElementById('consent-percentage');
    
    if (consentBar) {
        consentBar.style.width = `${level}%`;
        
        if (level < 40) {
            consentBar.className = 'bg-red-500 h-3 rounded-full transition-all duration-500';
        } else if (level < 75) {
            consentBar.className = 'bg-yellow-500 h-3 rounded-full transition-all duration-500';
        } else {
            consentBar.className = 'bg-green-500 h-3 rounded-full transition-all duration-500';
        }
    }
    
    if (consentPercentage) {
        consentPercentage.textContent = `${level}%`;
    }
}

function getCurrentConsentLevel() {
    const consentBar = document.getElementById('consent-bar');
    if (consentBar) {
        return parseInt(consentBar.style.width) || 0;
    }
    return 0;
}

function exportComprehensiveData() {
    // Collect all data from various components
    const comprehensiveData = {
        timestamp: new Date().toISOString(),
        session_data: currentSession ? currentSession.getAnalytics() : null,
        dark_patterns: globalDarkPatternFlags.getComprehensiveReport(),
        legal_loopholes: globalLegalLoopholeIndex.getLoopholeReport(),
        transparency_metrics: globalAPRTransparencyMeter.getMetrics(),
        behavior_recording: globalBehaviorReplay.exportData(),
        debt_cycle_simulation: globalDebtCycleSimulator.getSimulationData(),
        research_analytics: researchAnalytics.getCompleteReport(),
        prompt_effectiveness: globalPromptEngine.getManipulationMetrics()
    };
    
    // Export as JSON
    const blob = new Blob([JSON.stringify(comprehensiveData, null, 2)], { 
        type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lotus_comprehensive_data_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('📊 Comprehensive data exported');
}

async function runAdvancedSimulation(mode, session, config) {
    // This integrates with the existing simulation logic
    currentSession = session;
    currentMode = mode;
    
    // Start behavior recording
    globalBehaviorReplay.startRecording();
    
    // Run the core simulation
    await runSimulation(mode);
    
    // Stop behavior recording
    globalBehaviorReplay.stopRecording();
    
    console.log(`✅ Advanced ${mode} simulation completed`);
}

// NEW: Helper functions for comprehensive educational system

function getSimulationIntensity() {
    const intensityRadios = document.querySelectorAll('input[name="simulation-intensity"]');
    for (const radio of intensityRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return 'comprehensive'; // default
}

function displayBehavioralInsights(behavioralReport) {
    const insightsContainer = document.createElement('div');
    insightsContainer.className = 'behavioral-insights mt-6 p-4 bg-blue-900 rounded-lg border border-blue-500';
    insightsContainer.innerHTML = `
        <h3 class="text-xl font-bold text-blue-200 mb-3">🧠 Behavioral Psychology Analysis</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-blue-800 p-3 rounded">
                <h4 class="font-semibold text-blue-200 mb-2">Decision Making Profile</h4>
                <p class="text-blue-300 text-sm">
                    System 1 Dominance: ${(behavioralReport.decisionMakingProfile?.system1Dominance * 100).toFixed(1)}%
                </p>
                <p class="text-blue-300 text-sm">
                    Cognitive Load: ${behavioralReport.decisionMakingProfile?.averageCognitiveLoad || 'Low'}
                </p>
            </div>
            <div class="bg-blue-800 p-3 rounded">
                <h4 class="font-semibold text-blue-200 mb-2">Bias Vulnerability</h4>
                <p class="text-blue-300 text-sm">
                    Manipulation Vulnerability: ${behavioralReport.manipulationVulnerability?.vulnerabilityScore.toFixed(1)}%
                </p>
                <p class="text-blue-300 text-sm">
                    Most Vulnerable To: ${behavioralReport.manipulationVulnerability?.mostVulnerableTo || 'Time Pressure'}
                </p>
            </div>
        </div>
        <div class="mt-4">
            <h4 class="font-semibold text-blue-200 mb-2">Personalized Insights</h4>
            <ul class="list-disc list-inside text-blue-300 text-sm space-y-1">
                ${behavioralReport.behavioralInsights?.map(insight => `<li>${insight}</li>`).join('') || '<li>No insights available</li>'}
            </ul>
        </div>
    `;
    
    const reflectionPane = document.getElementById('reflectionPane');
    if (reflectionPane) {
        reflectionPane.appendChild(insightsContainer);
    }
}

function displayEducationalProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'educational-progress mt-6 p-4 bg-yellow-900 rounded-lg border border-yellow-500';
    progressContainer.innerHTML = `
        <h3 class="text-xl font-bold text-yellow-200 mb-3">🎓 Educational Progress Update</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-yellow-800 p-3 rounded text-center">
                <h4 class="font-semibold text-yellow-200 mb-1">Concepts Learned</h4>
                <span class="text-2xl font-bold text-white">${comprehensiveEducationalScaffolding.progressTracking?.conceptsLearned.length || 0}</span>
                <p class="text-yellow-300 text-xs">This session</p>
            </div>
            <div class="bg-yellow-800 p-3 rounded text-center">
                <h4 class="font-semibold text-yellow-200 mb-1">Learning Modules</h4>
                <span class="text-2xl font-bold text-white">${Object.values(comprehensiveEducationalScaffolding.learningObjectives || {}).filter(obj => obj.completed).length}</span>
                <p class="text-yellow-300 text-xs">Completed</p>
            </div>
            <div class="bg-yellow-800 p-3 rounded text-center">
                <h4 class="font-semibold text-yellow-200 mb-1">Overall Progress</h4>
                <span class="text-2xl font-bold text-white">${calculateOverallEducationalProgress()}%</span>
                <p class="text-yellow-300 text-xs">Complete</p>
            </div>
        </div>
        <div class="mt-4">
            <button onclick="launchEducationalDashboard()" class="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded transition">
                📚 View Detailed Learning Dashboard
            </button>
        </div>
    `;
    
    const reflectionPane = document.getElementById('reflectionPane');
    if (reflectionPane) {
        reflectionPane.appendChild(progressContainer);
    }
}

function calculateOverallEducationalProgress() {
    if (!comprehensiveEducationalScaffolding.learningObjectives) return 0;
    
    const objectives = Object.values(comprehensiveEducationalScaffolding.learningObjectives);
    const totalConcepts = objectives.reduce((sum, obj) => sum + obj.concepts.length, 0);
    const learnedConcepts = comprehensiveEducationalScaffolding.progressTracking?.conceptsLearned.length || 0;
    
    return Math.round((learnedConcepts / Math.max(totalConcepts, 1)) * 100);
}

function launchEducationalDashboard() {
    // Show comprehensive educational dashboard
    const dashboard = document.getElementById('education-progress');
    if (dashboard) {
        dashboard.classList.remove('hidden');
        dashboard.scrollIntoView({ behavior: 'smooth' });
        
        // Initialize educational scaffolding if not already done
        if (!comprehensiveEducationalScaffolding.initialized) {
            comprehensiveEducationalScaffolding.initialize();
            comprehensiveEducationalScaffolding.initialized = true;
        }
    }
}

// Initialize comprehensive educational system on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize educational scaffolding
    comprehensiveEducationalScaffolding.initialize();
    
    // Setup comprehensive educational event listeners
    setupComprehensiveEducationalEvents();
    
    // Initialize research data collector
    researchDataCollector.setupResearchTracking();
    
    UI.show("🎓 Comprehensive educational system initialized - ready for research-grade simulation");
});

function setupComprehensiveEducationalEvents() {
    // Educational mode toggle
    document.getElementById('enable-educational-tracking')?.addEventListener('change', function(e) {
        if (e.target.checked) {
            comprehensiveEducationalScaffolding.initialize();
            educationalAssessment = new EducationalAssessment(comprehensiveEducationalScaffolding);
            UI.show("🎓 Comprehensive educational tracking enabled - detailed learning analytics active");
            
            // Show educational progress tracker
            document.getElementById('education-progress')?.classList.remove('hidden');
        } else {
            document.getElementById('education-progress')?.classList.add('hidden');
            UI.show("📚 Educational tracking disabled");
        }
    });
    
    // Simulation intensity change handler
    document.querySelectorAll('input[name="simulation-intensity"]').forEach(radio => {
        radio.addEventListener('change', function(e) {
            const intensity = e.target.value;
            updateSimulationIntensity(intensity);
        });
    });
}

function updateSimulationIntensity(intensity) {
    switch (intensity) {
        case 'basic':
            UI.show("📚 Basic education mode - core concepts only");
            break;
        case 'comprehensive':
            UI.show("🎓 Comprehensive mode - full educational content");
            break;
        case 'research':
            UI.show("🔬 Research grade mode - maximum detail + data collection");
            // Auto-enable research tracking
            document.getElementById('enable-research-mode').checked = true;
            document.getElementById('enable-educational-tracking').checked = true;
            researchAnalytics.enableResearchMode();
            comprehensiveEducationalScaffolding.initialize();
            break;
    }
}

// Global function for educational assessment launch
window.launchEducationalDashboard = launchEducationalDashboard;