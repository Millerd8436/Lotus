/**
 * app.js - Main Orchestrator for the Lotus + Autonomy Theater Simulation
 *
 * This file connects the UI to the simulation logic. It imports all necessary
 * modules and sets up event listeners to run the simulation based on user choices.
 */

// --- 1. MODULE IMPORTS ---
import { LoanCore, Config, LoanSession } from "./core/loan_core.js";
import { Exploitative } from "./modes/exploitative.js";
import { Ethical } from "./modes/ethical.js";
import { evaluateConsent } from "./engine/kant.js";
import {
  generateFollowUpEmail,
  displayReflection,
} from "./components/reflection.js";
import { UI } from "./ui.js";
import { Echo } from "./engine/echo.js";
import { Ghost } from "./narrator/ghost.js";
import { ResearchAnalytics } from "./research/research_analytics.js";
import {
  AcademicReferences,
  EducationalScaffolding,
} from "./docs/academic_references.js";
import { DarkPatternEngine } from "./ui_components/darkPatternEngine.js";
import { APRCalculator } from "./ui_components/aprCalculator.js";
import { DarkPatternFlags } from "./ui_components/darkPatternFlags.js";
import { LegalLoopholeIndex } from "./ui_components/legalLoopholeIndex.js";
import { PromptEngine } from "./ui_components/promptEngine.js";
import { BehaviorReplay } from "./ui_components/behaviorReplay.js";
import { APRTransparencyMeter } from "./ui_components/aprTransparencyMeter.js";
import { DebtCycleSimulator } from "./ui_components/debtCycleSimulator.js";

// NEW: Comprehensive Educational Components
import { EducationalScaffolding as ComprehensiveEducationalScaffolding } from "./ui_components/educationalScaffolding.js";
import { BehavioralPsychologyEngine } from "./engine/behavioralPsychology.js";
import { ResearchDataCollector } from "./research/researchDataCollector.js";
import { EducationalAssessment } from "./ui_components/educationalAssessment.js";

// --- 2. DOM ELEMENT SELECTION ---
const regulatedBtn = document.getElementById("start-regulated");
const exploitBtn = document.getElementById("start-exploit");
const emailReportBtn = document.getElementById("emailReportBtn");
const downloadLogBtn = document.getElementById("downloadLogBtn");
const reflectionPane = document.getElementById("reflectionPane");
const outputElement = document.getElementById("output");
const stateInput = document.getElementById("state-input");
const amountInput = document.getElementById("amount-input");
const termInput = document.getElementById("term-input");
const scenarioSelect = document.getElementById("scenario-select");
const replayBtn = document.getElementById("replayBtn");

// --- 3. APPLICATION STATE ---
let currentSession = null;
let currentMode = "";
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
let comprehensiveEducationalScaffolding =
  new ComprehensiveEducationalScaffolding();
let behavioralPsychologyEngine = null; // Initialized when simulation starts
let researchDataCollector = new ResearchDataCollector();
let educationalAssessment = null; // Initialized with educational scaffolding

// --- 4. INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initializeApplication();
  setupEventListeners();
  initializeEducationalComponents();
  initializeResearchComponents();
});

/**
 * Initialize the main application components
 */
function initializeApplication() {
  // Initialize Echo and Ghost systems
  echo = new Echo();
  ghost = new Ghost();

  // Initialize UI components
  UI.initialize();

  // Setup dark pattern detection
  globalDarkPatternEngine.initialize();
  globalDarkPatternFlags.initialize();

  // Initialize legal analysis
  globalLegalLoopholeIndex.initialize();

  // Setup APR transparency
  globalAPRTransparencyMeter.initialize();

  // Initialize debt cycle simulator
  globalDebtCycleSimulator.initialize();

  console.log("🌸 Lotus Application Initialized");
}

/**
 * Initialize educational components and assessments
 */
function initializeEducationalComponents() {
  // Setup comprehensive educational scaffolding
  comprehensiveEducationalScaffolding.initialize();

  // Initialize educational assessment system
  educationalAssessment = new EducationalAssessment();
  educationalAssessment.initialize();

  // Setup academic references
  AcademicReferences.initialize();

  console.log("📚 Educational Components Initialized");
}

/**
 * Initialize research and analytics components
 */
function initializeResearchComponents() {
  // Setup research analytics
  researchAnalytics.initialize();

  // Initialize research data collector
  researchDataCollector.initialize();

  // Setup behavior replay system
  globalBehaviorReplay.initialize();

  console.log("🔬 Research Components Initialized");
}

/**
 * Setup event listeners for user interactions
 */
function setupEventListeners() {
  // Simulation start buttons
  if (regulatedBtn) {
    regulatedBtn.addEventListener("click", () => startSimulation("ethical"));
  }

  if (exploitBtn) {
    exploitBtn.addEventListener("click", () => startSimulation("exploitative"));
  }

  // Report generation buttons
  if (emailReportBtn) {
    emailReportBtn.addEventListener("click", generateEmailReport);
  }

  if (downloadLogBtn) {
    downloadLogBtn.addEventListener("click", downloadSessionLog);
  }

  // Behavior replay
  if (replayBtn) {
    replayBtn.addEventListener("click", initiateReplay);
  }

  // State selection changes
  if (stateInput) {
    stateInput.addEventListener("change", updateRegulationDisplay);
  }

  // Scenario selection changes
  if (scenarioSelect) {
    scenarioSelect.addEventListener("change", updateScenarioContext);
  }

  console.log("🔧 Event Listeners Configured");
}

/**
 * Start a loan simulation in the specified mode
 * @param {string} mode - 'ethical' or 'exploitative'
 */
function startSimulation(mode) {
  currentMode = mode;

  // Get user inputs
  const state = stateInput?.value || "TX";
  const amount = parseInt(amountInput?.value) || 300;
  const term = parseInt(termInput?.value) || 14;
  const scenario = scenarioSelect?.value || "default";

  // Create new session
  currentSession = new LoanSession();
  currentSession.initialize(amount, term, state);
  currentSession.scenario = scenario;

  // Initialize behavioral psychology engine for this session
  behavioralPsychologyEngine = new BehavioralPsychologyEngine(
    echo,
    currentSession,
  );

  // Start educational assessment
  educationalAssessment.startSession(currentSession);

  // Begin research data collection
  researchDataCollector.startSession(currentSession, mode);

  // Clear previous output
  if (outputElement) {
    outputElement.innerHTML = "";
  }

  // Start the appropriate mode
  if (mode === "ethical") {
    startEthicalMode();
  } else if (mode === "exploitative") {
    startExploitativeMode();
  }

  console.log(`🌸 Simulation started: ${mode} mode`, {
    amount,
    term,
    state,
    scenario,
  });
}

/**
 * Start the ethical lending simulation
 */
function startEthicalMode() {
  echo.announce("Starting Ethical Lending Simulation");

  // Configure for ethical mode
  globalDarkPatternEngine.setMode("educational");
  globalAPRTransparencyMeter.setHighTransparency();

  // Run ethical simulation
  const ethicalSimulation = new Ethical(currentSession, echo);
  ethicalSimulation.run();

  // Update UI
  UI.updateModeDisplay("ethical");
  updateSimulationDisplay();
}

/**
 * Start the exploitative lending simulation
 */
function startExploitativeMode() {
  echo.announce("Starting Exploitative Lending Simulation");

  // Configure for exploitative mode
  globalDarkPatternEngine.setMode("exploitative");
  globalAPRTransparencyMeter.setLowTransparency();

  // Activate dark patterns
  globalDarkPatternFlags.activateAll();

  // Run exploitative simulation
  const exploitativeSimulation = new Exploitative(currentSession, echo);
  exploitativeSimulation.run();

  // Update UI
  UI.updateModeDisplay("exploitative");
  updateSimulationDisplay();

  // Start behavioral tracking
  behavioralPsychologyEngine.startTracking();
}

/**
 * Update the simulation display with current session data
 */
function updateSimulationDisplay() {
  if (!currentSession || !outputElement) return;

  const simulationHTML = `
        <div class="simulation-status">
            <h3>Current Simulation</h3>
            <div class="session-details">
                <p><strong>Mode:</strong> ${currentMode}</p>
                <p><strong>Amount:</strong> $${currentSession.amount}</p>
                <p><strong>Term:</strong> ${currentSession.term} days</p>
                <p><strong>State:</strong> ${currentSession.state}</p>
                <p><strong>Fee:</strong> $${currentSession.fee}</p>
                <p><strong>APR:</strong> ${currentSession.apr}%</p>
            </div>
        </div>
        
        <div class="dark-pattern-status">
            ${globalDarkPatternFlags.generateStatusDisplay()}
        </div>
        
        <div class="legal-analysis">
            ${globalLegalLoopholeIndex.generateAnalysisDisplay(currentSession)}
        </div>
        
        <div class="behavioral-tracking">
            ${behavioralPsychologyEngine ? behavioralPsychologyEngine.generateStatusDisplay() : "Behavioral tracking not active"}
        </div>
    `;

  outputElement.innerHTML = simulationHTML;
}

/**
 * Update regulation display when state changes
 */
function updateRegulationDisplay() {
  const selectedState = stateInput?.value;
  if (!selectedState) return;

  // Update APR calculator for state regulations
  globalAPRCalculator.updateStateRegulations(selectedState);

  // Update legal loophole index
  globalLegalLoopholeIndex.updateStateContext(selectedState);

  // Display regulatory information
  displayStateRegulations(selectedState);
}

/**
 * Display state-specific regulatory information
 */
function displayStateRegulations(state) {
  const regulationInfo = globalLegalLoopholeIndex.getStateRegulations(state);

  const regulationDisplay = document.getElementById("regulation-display");
  if (regulationDisplay) {
    regulationDisplay.innerHTML = `
            <h4>Regulations for ${state}</h4>
            <p><strong>APR Cap:</strong> ${regulationInfo.aprCap || "None"}%</p>
            <p><strong>Rollover Limit:</strong> ${regulationInfo.rolloverLimit || "Unlimited"}</p>
            <p><strong>Cooling Period:</strong> ${regulationInfo.coolingPeriod || "None"}</p>
            <p><strong>Legal Status:</strong> ${regulationInfo.status}</p>
        `;
  }
}

/**
 * Update scenario context when scenario changes
 */
function updateScenarioContext() {
  const selectedScenario = scenarioSelect?.value;
  if (!selectedScenario) return;

  // Update educational scaffolding for scenario
  comprehensiveEducationalScaffolding.setScenario(selectedScenario);

  // Update debt cycle simulator
  globalDebtCycleSimulator.setScenario(selectedScenario);

  console.log(`Scenario updated: ${selectedScenario}`);
}

/**
 * Generate and display email report
 */
function generateEmailReport() {
  if (!currentSession) {
    alert("No active session to report on");
    return;
  }

  // Generate comprehensive report
  const report = generateComprehensiveReport();

  // Display email modal
  generateFollowUpEmail(currentSession, report);
}

/**
 * Generate comprehensive session report
 */
function generateComprehensiveReport() {
  if (!currentSession) return null;

  return {
    session: currentSession.generateReport(),
    darkPatterns: globalDarkPatternEngine.generateReport(),
    legalAnalysis: globalLegalLoopholeIndex.generateReport(currentSession),
    behavioral: behavioralPsychologyEngine
      ? behavioralPsychologyEngine.generateReport()
      : null,
    educational: educationalAssessment.generateReport(),
    research: researchDataCollector.generateReport(),
    ethics: evaluateConsent(currentSession),
  };
}

/**
 * Download session log as JSON file
 */
function downloadSessionLog() {
  if (!currentSession) {
    alert("No active session to download");
    return;
  }

  const report = generateComprehensiveReport();
  const dataStr = JSON.stringify(report, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `lotus-session-${currentSession.sessionId}-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Initiate behavior replay functionality
 */
function initiateReplay() {
  if (!currentSession) {
    alert("No session to replay");
    return;
  }

  globalBehaviorReplay.startReplay(currentSession);
}

/**
 * Handle session completion and show reflection
 */
function completeSession() {
  if (!currentSession) return;

  // Finalize educational assessment
  educationalAssessment.completeSession();

  // Finalize research data collection
  researchDataCollector.completeSession();

  // Generate final behavioral report
  if (behavioralPsychologyEngine) {
    const behavioralReport = behavioralPsychologyEngine.generateFinalReport();
    currentSession.behavioralAnalysis = behavioralReport;
  }

  // Show reflection pane
  displayReflection(currentSession, reflectionPane);

  // Enable Ghost mode for educational insights
  ghost.activate(currentSession);

  console.log("🌸 Session completed", { sessionId: currentSession.sessionId });
}

/**
 * Export session data for research purposes
 */
function exportResearchData() {
  const researchData = researchDataCollector.exportData();
  const dataStr = JSON.stringify(researchData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `lotus-research-data-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Reset application to initial state
 */
function resetApplication() {
  currentSession = null;
  currentMode = "";

  // Reset all components
  globalDarkPatternEngine.reset();
  globalDarkPatternFlags.reset();
  globalAPRTransparencyMeter.reset();
  globalDebtCycleSimulator.reset();

  if (behavioralPsychologyEngine) {
    behavioralPsychologyEngine.reset();
  }

  educationalAssessment.reset();
  researchDataCollector.reset();

  // Clear UI
  if (outputElement) {
    outputElement.innerHTML = "";
  }

  if (reflectionPane) {
    reflectionPane.style.display = "none";
  }

  console.log("🌸 Application reset");
}

// --- 5. GLOBAL EXPORTS ---
window.LotusApp = {
  startSimulation,
  completeSession,
  resetApplication,
  exportResearchData,
  generateEmailReport,
  downloadSessionLog,
  currentSession: () => currentSession,
  currentMode: () => currentMode,
  echo: () => echo,
  ghost: () => ghost,
  researchAnalytics: () => researchAnalytics,
  darkPatternEngine: () => globalDarkPatternEngine,
  behavioralPsychologyEngine: () => behavioralPsychologyEngine,
};

console.log("🌸 Lotus App Module Loaded");
