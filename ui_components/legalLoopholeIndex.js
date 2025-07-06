/**
 * ui_components/legalLoopholeIndex.js - Legal Loophole Documentation & Tracking
 * 
 * Logs all legal workarounds used in a session for educational purposes
 */

export class LegalLoopholeIndex {
    constructor() {
        this.loopholes = [];
        this.knownLoopholes = this.initializeKnownLoopholes();
    }

    // Initialize database of known legal loopholes
    initializeKnownLoopholes() {
        return {
            // Fee vs Interest Distinction
            flatFeeAvoidance: {
                id: "FLAT_FEE_AVOIDANCE",
                name: "Flat Fee vs Interest Distinction",
                description: "Charging flat dollar fees instead of percentage rates to avoid usury caps",
                legalBasis: "Most state usury laws only cap 'interest rates' not 'fees'",
                examples: [
                    "$15 fee per $100 = 391% APR but legally called 'fee'",
                    "Express processing fees",
                    "Service charges"
                ],
                jurisdictions: ["Texas", "Florida", "Nevada", "Most States"],
                effectiveness: "VERY_HIGH",
                enforcement_risk: "LOW"
            },

            // Tribal Sovereignty
            tribalSovereignty: {
                id: "TRIBAL_SOVEREIGNTY", 
                name: "Tribal Lending Immunity",
                description: "Using Native American tribal sovereignty to bypass state regulations",
                legalBasis: "Tribal sovereign immunity from state laws",
                examples: [
                    "Plain Green (Chippewa Cree) - 600%+ APR",
                    "Great Plains Lending (Otoe-Missouria) - 400%+ APR",
                    "Spotloan (Turtle Mountain Band) - 490%+ APR"
                ],
                jurisdictions: ["Federal/Tribal", "All States"],
                effectiveness: "HIGH",
                enforcement_risk: "MODERATE"
            },

            // Rent-a-Bank Schemes
            rentABank: {
                id: "RENT_A_BANK",
                name: "Rent-a-Bank Schemes", 
                description: "Partnering with banks to export permissive state laws nationwide",
                legalBasis: "Federal preemption allows banks to export home state laws",
                examples: [
                    "LendUp + Cross River Bank (NJ)",
                    "OppLoans + FinWise Bank (UT)", 
                    "Rise + Republic Bank (UT)"
                ],
                jurisdictions: ["Delaware", "South Dakota", "Utah"],
                effectiveness: "HIGH",
                enforcement_risk: "MODERATE"
            },

            // Product Classification Games
            productClassification: {
                id: "PRODUCT_CLASSIFICATION",
                name: "Product Classification Evasion",
                description: "Reframing loans as non-loan products to avoid regulation",
                legalBasis: "Different product types have different regulatory requirements",
                examples: [
                    "Earned Wage Access ≠ loans (Earnin)",
                    "Credit Service Organizations ≠ lenders (Texas)",
                    "Tips ≠ loan payments",
                    "Membership fees ≠ interest"
                ],
                jurisdictions: ["Texas", "Federal EWA", "Various"],
                effectiveness: "VERY_HIGH",
                enforcement_risk: "LOW"
            },

            // Interstate Commerce
            interstateCommerce: {
                id: "INTERSTATE_COMMERCE",
                name: "Interstate Commerce Jurisdiction Shopping",
                description: "Claiming operation from states with weaker consumer protections",
                legalBasis: "Complex jurisdictional questions in interstate commerce",
                examples: [
                    "Delaware incorporation",
                    "South Dakota operations",
                    "Choice of law clauses",
                    "Offshore servers"
                ],
                jurisdictions: ["Delaware", "South Dakota", "Offshore"],
                effectiveness: "MODERATE",
                enforcement_risk: "MODERATE"
            },

            // Continuous Refinancing
            continuousRefinancing: {
                id: "CONTINUOUS_REFINANCING",
                name: "Loan Rewrites & Continuous Refinancing",
                description: "Creating new loans to reset fees and bypass rollover limits",
                legalBasis: "Each new contract is legally a separate transaction",
                examples: [
                    "Cancel old loan, create new with higher principal",
                    "Refinancing fees reset rollover counters",
                    "Multiple small loans instead of one large loan"
                ],
                jurisdictions: ["Most States", "Varies by State"],
                effectiveness: "HIGH",
                enforcement_risk: "LOW"
            },

            // Employer Integration
            employerIntegration: {
                id: "EMPLOYER_INTEGRATION",
                name: "Employer Partnership Schemes",
                description: "Using employer relationships to bypass lending regulations",
                legalBasis: "Employee benefits and payroll services have different rules",
                examples: [
                    "Kashable (employee financial wellness)",
                    "PayActiv (HR integration)", 
                    "DailyPay (payroll advance)",
                    "Automatic payroll deduction"
                ],
                jurisdictions: ["Federal/Employment Law", "All States"],
                effectiveness: "HIGH",
                enforcement_risk: "LOW"
            },

            // Arbitration Immunity
            arbitrationImmunity: {
                id: "ARBITRATION_IMMUNITY",
                name: "Mandatory Arbitration Shield",
                description: "Using arbitration clauses to block consumer lawsuits",
                legalBasis: "Federal Arbitration Act preempts state consumer protection",
                examples: [
                    "Class action waivers",
                    "Individual arbitration too expensive for small claims",
                    "Arbitrator selection bias",
                    "Choice of arbitration forum"
                ],
                jurisdictions: ["Federal", "All States"],
                effectiveness: "VERY_HIGH", 
                enforcement_risk: "VERY_LOW"
            }
        };
    }

    // Log a loophole usage in the current session
    logLoophole(loopholeId, context = {}) {
        const knownLoophole = this.knownLoopholes[loopholeId];
        if (!knownLoophole) {
            console.warn(`Unknown loophole ID: ${loopholeId}`);
            return null;
        }

        const logEntry = {
            id: `usage_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            loopholeId,
            loophole: knownLoophole,
            context,
            timestamp: new Date().toISOString(),
            sessionPhase: context.phase || "unknown"
        };

        this.loopholes.push(logEntry);
        return logEntry;
    }

    // Log multiple loopholes at once
    logMultipleLoopholes(loopholeIds, context = {}) {
        return loopholeIds.map(id => this.logLoophole(id, context));
    }

    // Get loopholes by effectiveness
    getLoopholesByEffectiveness(effectiveness) {
        return Object.values(this.knownLoopholes).filter(
            loophole => loophole.effectiveness === effectiveness
        );
    }

    // Get loopholes by enforcement risk
    getLoopholesByEnforcementRisk(risk) {
        return Object.values(this.knownLoopholes).filter(
            loophole => loophole.enforcement_risk === risk
        );
    }

    // Generate comprehensive loophole report for session
    generateLoopholeReport() {
        const usedLoopholes = this.loopholes;
        const loopholesByType = {};
        const loopholesByPhase = {};
        
        usedLoopholes.forEach(usage => {
            // Group by type
            const type = usage.loophole.id;
            if (!loopholesByType[type]) {
                loopholesByType[type] = [];
            }
            loopholesByType[type].push(usage);
            
            // Group by session phase
            const phase = usage.sessionPhase;
            if (!loopholesByPhase[phase]) {
                loopholesByPhase[phase] = [];
            }
            loopholesByPhase[phase].push(usage);
        });

        return {
            summary: {
                totalLoopholesUsed: usedLoopholes.length,
                uniqueLoopholeTypes: Object.keys(loopholesByType).length,
                sessionPhases: Object.keys(loopholesByPhase),
                riskProfile: this.calculateRiskProfile()
            },
            usedLoopholes,
            loopholesByType,
            loopholesByPhase,
            legalRiskAssessment: this.assessLegalRisk(),
            enforcementProbability: this.calculateEnforcementProbability(),
            timestamp: new Date().toISOString()
        };
    }

    // Calculate risk profile for used loopholes
    calculateRiskProfile() {
        const riskWeights = {
            VERY_LOW: 1,
            LOW: 2, 
            MODERATE: 5,
            HIGH: 8,
            VERY_HIGH: 10
        };

        let totalRisk = 0;
        let maxRisk = 0;

        this.loopholes.forEach(usage => {
            const risk = riskWeights[usage.loophole.enforcement_risk] || 1;
            totalRisk += risk;
            maxRisk = Math.max(maxRisk, risk);
        });

        return {
            totalRiskScore: totalRisk,
            averageRisk: this.loopholes.length ? totalRisk / this.loopholes.length : 0,
            maxIndividualRisk: maxRisk,
            riskLevel: this.getRiskLevel(totalRisk)
        };
    }

    // Assess overall legal risk
    assessLegalRisk() {
        const usedLoopholes = this.loopholes;
        
        // High-risk combinations
        const hasTribalAndRentABank = usedLoopholes.some(u => u.loopholeId === 'tribalSovereignty') &&
                                     usedLoopholes.some(u => u.loopholeId === 'rentABank');
        
        const hasMultipleClassificationGames = usedLoopholes.filter(u => 
            u.loopholeId === 'productClassification').length > 1;

        const hasArbitrationShield = usedLoopholes.some(u => u.loopholeId === 'arbitrationImmunity');

        return {
            overallRisk: this.calculateRiskProfile().riskLevel,
            highRiskCombinations: hasTribalAndRentABank || hasMultipleClassificationGames,
            hasArbitrationProtection: hasArbitrationShield,
            enforcementLikelihood: this.calculateEnforcementProbability(),
            recommendations: this.generateRiskRecommendations()
        };
    }

    // Calculate enforcement probability
    calculateEnforcementProbability() {
        const riskProfile = this.calculateRiskProfile();
        const hasHighEffectivenessLoopholes = this.loopholes.some(u => 
            u.loophole.effectiveness === 'VERY_HIGH');
        
        let probability = riskProfile.averageRisk * 10; // Base probability
        
        if (hasHighEffectivenessLoopholes) probability *= 0.5; // High effectiveness = lower enforcement
        if (this.loopholes.length > 3) probability *= 1.5; // Multiple loopholes = higher risk
        
        return Math.min(Math.max(probability, 0), 100); // Cap between 0-100
    }

    // Generate risk recommendations
    generateRiskRecommendations() {
        const recommendations = [];
        const riskProfile = this.calculateRiskProfile();
        
        if (riskProfile.riskLevel === 'VERY_HIGH') {
            recommendations.push("Consider reducing number of simultaneous loopholes");
            recommendations.push("Ensure arbitration clauses are properly implemented");
        }
        
        if (this.loopholes.some(u => u.loopholeId === 'tribalSovereignty')) {
            recommendations.push("Monitor tribal lending enforcement actions");
        }
        
        if (this.loopholes.some(u => u.loopholeId === 'rentABank')) {
            recommendations.push("Stay current on OCC rent-a-bank guidance");
        }

        return recommendations;
    }

    // Convert numeric risk to level
    getRiskLevel(totalRisk) {
        if (totalRisk >= 50) return 'VERY_HIGH';
        if (totalRisk >= 30) return 'HIGH';
        if (totalRisk >= 15) return 'MODERATE';
        if (totalRisk >= 5) return 'LOW';
        return 'VERY_LOW';
    }

    // Get all known loopholes (for educational purposes)
    getAllKnownLoopholes() {
        return this.knownLoopholes;
    }

    // Get session loopholes
    getSessionLoopholes() {
        return this.loopholes;
    }

    // Clear session loopholes
    clearSessionLoopholes() {
        this.loopholes = [];
    }

    // Search loopholes by keyword
    searchLoopholes(keyword) {
        const results = [];
        Object.values(this.knownLoopholes).forEach(loophole => {
            const searchText = `${loophole.name} ${loophole.description} ${loophole.examples.join(' ')}`;
            if (searchText.toLowerCase().includes(keyword.toLowerCase())) {
                results.push(loophole);
            }
        });
        return results;
    }
}

export default LegalLoopholeIndex;
