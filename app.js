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
import { printSummary, generateFollowUpEmail, displayReflection } from './components/reflection.js';
import { UI } from './ui.js';

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
    const state = stateInput.value || 'GEN';
    const amount = parseFloat(amountInput.value) || 0;
    const term = parseInt(termInput.value, 10) || 0;
    const scenario = scenarioSelect.value;

    outputElement.textContent = `Starting ${mode} simulation for state ${state.toUpperCase()}...\n\n`;
   
    const config = new Config();
    const session = new LoanSession();
   
    session.state = state.toUpperCase();
    config.state = state.toUpperCase();

    if (amount > 0) session.amount = amount;
    if (term > 0) session.termDays = term;
    else session.termDays = config.getCurrentStateRules(session.state).minTermDays || 14;

    if (scenario) {
        UI.loadScenarioPreset(config, session, scenario);
    }

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

    const analysis = evaluateConsent(session);
    displayReflection(session, { getLog: () => session.history, calculateScore: () => session.consentScore() }, analysis);
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

// --- 6. INITIALIZATION ---
console.log("Lotus + Autonomy Theater application initialized. Ready for simulation.");
// The initial welcome message is already present in the HTML <pre> tag.