/**
 * lotus_core.js - Condensed Core Logic for Lotus Payday Loan Simulator
 * GitHub Pages compatible - All loan calculation and session features preserved
 */

// Condensed Config class with all essential parameters
export class Config {
    constructor() {
        // Core loan parameters
        this.apr = 24.0; this.exploitFeeRate = 0.30; this.daysToRepay = 14; this.riskThreshold = 1.5;
        
        // State regulations condensed
        this.stateRules = {
            'CA': { maxAPR: 36, minTermDays: 31, allowRollover: false },
            'NY': { maxAPR: 25, minTermDays: 30, allowRollover: false },
            'TX': { maxAPR: 664, minTermDays: 7, allowRollover: true },
            'FL': { maxAPR: 304, minTermDays: 7, allowRollover: true },
            'GEN': { maxAPR: 400, minTermDays: 14, allowRollover: true }
        };
        
        // Feature flags (condensed)
        this.features = {
            darkPatterns: true, ethicalMode: true, education: true, research: true,
            ghostMode: true, tracking: true, compliance: true, autonomyTheater: true
        };
    }

    getCurrentStateRules(state) { return this.stateRules[state] || this.stateRules['GEN']; }
    calculateTrueAPR(principal, fee, termDays) {
        return principal > 0 && termDays > 0 ? ((fee / principal) * (365 / termDays)) * 100 : 0;
    }
}

// Condensed LoanSession class with all tracking features preserved
export class LoanSession {
    constructor(config = null) {
        this.config = config || new Config();
        this.sessionId = 'lotus_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        this.timestamp = new Date().toISOString();
        
        // Loan details
        this.amount = 0; this.termDays = 14; this.state = 'GEN'; this.fee = 0; this.apr = 0; 
        this.rolloverCount = 0; this.totalCost = 0;
        
        // User data & consent
        this.consentGiven = false; this.zipCode = ''; this.agreedToArbitration = false;
        this.deniedByLimit = false; this.denialReason = '';
        
        // Tracking arrays
        this.darkPatterns = []; this.complianceViolations = []; this.educationalProgress = [];
        this.behavioralData = []; this.ui_urgencyTimerUsed = false; this.ghost = null;
    }

    tagDarkPattern(pattern, details = {}) {
        this.darkPatterns.push({ type: pattern, timestamp: new Date().toISOString(), details });
    }

    addComplianceViolation(violation, severity = 'medium') {
        this.complianceViolations.push({ type: violation, severity, timestamp: new Date().toISOString() });
    }

    calculateLoanTerms() {
        const stateRules = this.config.getCurrentStateRules(this.state);
        this.fee = this.amount * this.config.exploitFeeRate;
        this.apr = this.config.calculateTrueAPR(this.amount, this.fee, this.termDays);
        this.totalCost = this.amount + this.fee;
        
        // Compliance checks
        if (this.apr > stateRules.maxAPR) this.addComplianceViolation('excessive_apr', 'high');
        if (this.termDays < stateRules.minTermDays) this.addComplianceViolation('insufficient_term', 'medium');
    }

    exportJson(filename = null) {
        const data = {
            sessionId: this.sessionId, timestamp: this.timestamp,
            loanDetails: { amount: this.amount, fee: this.fee, apr: this.apr, termDays: this.termDays, state: this.state, totalCost: this.totalCost },
            darkPatterns: this.darkPatterns, complianceViolations: this.complianceViolations,
            educationalProgress: this.educationalProgress, behavioralData: this.behavioralData,
            consentData: { consentGiven: this.consentGiven, agreedToArbitration: this.agreedToArbitration }
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename || `lotus_session_${this.sessionId}.json`; a.click();
        URL.revokeObjectURL(url);
    }

    getAnalytics() {
        return {
            sessionId: this.sessionId,
            darkPatternsCount: this.darkPatterns.length,
            complianceViolationsCount: this.complianceViolations.length,
            educationalModulesCompleted: this.educationalProgress.length,
            finalAPR: this.apr,
            consentQuality: this.consentGiven ? 'given' : 'denied'
        };
    }
}

// Condensed strategy and utility functions
export class LoanStrategy {
    async run(session, config) { throw new Error("Strategy must implement a run method."); }
}

// Condensed utility calculations
export const calculateAPR = (principal, fee, termDays) => principal > 0 && termDays > 0 ? ((fee / principal) * (365 / termDays)) * 100 : 0;
export const calculateEffectiveAPR = (principal, fees, tips, termDays) => principal > 0 && termDays > 0 ? ((fees + tips) / principal) / termDays * 365 * 100 : 0;
export const formatCurrency = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
export const formatPercentage = rate => `${rate.toFixed(1)}%`;

export function calculateDebtTrapMetrics(session) {
    const renewals = session.renewalsTaken || 0;
    const totalCost = session.getCumulativeCost ? session.getCumulativeCost() : session.totalCost;
    const principal = session.amount;
    
    const metrics = {
        totalFeesVsPrincipal: totalCost / principal,
        renewalCount: renewals,
        principalReductionRate: (session.principalRemaining || principal) / principal,
        averageFeePerRenewal: renewals > 0 ? totalCost / renewals : 0,
        debtTrapScore: 0
    };
    
    // Calculate debt trap score (0-100, higher = more trapped)
    if (metrics.totalFeesVsPrincipal > 2.0) metrics.debtTrapScore += 40;
    else if (metrics.totalFeesVsPrincipal > 1.0) metrics.debtTrapScore += 25;
    
    if (metrics.renewalCount > 3) metrics.debtTrapScore += 30;
    else if (metrics.renewalCount > 1) metrics.debtTrapScore += 15;
    
    if (metrics.principalReductionRate > 0.8) metrics.debtTrapScore += 30;
    else if (metrics.principalReductionRate > 0.5) metrics.debtTrapScore += 15;
    
    return metrics;
}
