/**
 * ui_components/darkPatternEngine.js - Advanced Dark Pattern Implementation  
 *
 * Comprehensive implementation of exploitative UI patterns and usury law loopholes
 * for educational simulation and research purposes.
 */
export class DarkPatternEngine {
    constructor() {
        this.patterns = {
            feeObfuscation: true,
            consentWithoutContext: true,
            defaultBias: true,
            deceptiveChoice: true,
            withdrawalMismatch: true,
            sunkCostFallacy: true,
            nonDismissableNudges: true
        };

        this.usuryLoopholes = {
            flatFeeAvoidance: true,
            tribalLending: true,
            rentABank: true,
            ewaExemption: true,
            loanRewrites: true,
            choiceOfLaw: true,
            voluntaryTips: true
        };
    }

    // 1. Fee Obfuscation through Framing
    async implementFeeObfuscation(session, amount, days) {
        session.tagDarkPattern("FeeObfuscation_TipsExpressFeesOnly");

        // Hide APR behind "express fee" language
        const fee = amount * 0.15; // $15 per $100
        const apr = ((fee / amount) * (365 / days) * 100).toFixed(0);

        return {
            displayText: `💸 Express Processing Fee: Just $${fee.toFixed(0)}! (Not a loan - this is a tip!)`,
            hiddenAPR: apr,
            actualCost: fee,
            obfuscationLevel: "EXTREME"
        };
    }

    // 2. Consent Without Context
    async implementConsentWithoutContext(session) {
        session.tagDarkPattern("ConsentWithoutContext_IAgreeGetCashNow");

        return {
            buttonText: "I AGREE & GET CASH NOW! 💰",
            hiddenTerms: [
                "ACH automatic withdrawal authorization",
                "Mandatory arbitration clause",
                "Data sharing with 500+ partners",
                "Rollover authorization",
                "Credit check waiver"
            ],
            contextProvided: false
        };
    }

    // 3. Default Bias and Pre-Checked Traps
    async implementDefaultBias(session) {
        session.tagDarkPattern("DefaultBias_PreCheckedTraps");

        return {
            preCheckedOptions: [
                { option: "Express delivery (+$25)", checked: true },
                { option: "Auto-renewal authorization", checked: true },
                { option: "Text message updates (+$3/msg)", checked: true },
                { option: "Credit monitoring (+$9.99/month)", checked: true },
                { option: "Overdraft protection (+$35/occurrence)", checked: true }
            ],
            userAwareness: "MINIMAL"
        };
    }

    // 4. Deceptive Simulations of Choice
    async implementDeceptiveChoice(session) {
        session.tagDarkPattern("DeceptiveChoice_FakeVoluntaryActions");

        return {
            tipSlider: {
                range: [0, 15],
                defaultValue: 12,
                zeroConsequence: "Your application may be delayed or denied",
                socialPressure: "95% of users tip $10 or more"
            },
            fakeVoluntary: true,
            realConsequences: true
        };
    }

    // 5. Withdrawal vs. Repayment Mismatch
    async implementWithdrawalMismatch(session) {
        session.tagDarkPattern("WithdrawalMismatch_EasyGetHardRepay");

        return {
            getMoneyProcess: {
                steps: 1,
                visibility: "PROMINENT",
                ctaText: "GET $500 NOW!",
                timeRequired: "2 minutes"
            },
            repaymentProcess: {
                steps: 7,
                visibility: "BURIED",
                location: "Settings > Payments > Auto-debit > Modify",
                timeRequired: "15+ minutes"
            }
        };
    }

    // 6. Sunk Cost Fallacy UX
    async implementSunkCostFallacy(session) {
        session.tagDarkPattern("SunkCostFallacy_AlmostDoneScreens");

        return {
            progressBar: "87% Complete!",
            encouragementText: "You're almost done! Don't give up now!",
            investmentFraming: "You've already spent 8 minutes on this application",
            termsPosition: "AFTER progress indication"
        };
    }

    // 7. Non-Dismissable Nudges
    async implementNonDismissableNudges(session) {
        session.tagDarkPattern("NonDismissableNudges_ManipulativePopups");

        return {
            popups: [
                {
                    text: "⚠️ LIMITED TIME: Lock in this rate before it expires!",
                    dismissable: false,
                    duration: 10000,
                    animation: "pulsing-red"
                },
                {
                    text: "🔥 Only 3 slots left at this rate in your area!",
                    dismissable: false,
                    duration: 15000,
                    animation: "urgent-flash"
                }
            ]
        };
    }

    // Usury Law Loophole Implementation
    async implementUsuryLoopholes(session, config) {
        const loopholes = [];

        // 1. Flat Fees Avoid APR Caps
        if (this.usuryLoopholes.flatFeeAvoidance) {
            loopholes.push({
                type: "FLAT_FEE_AVOIDANCE",
                mechanism: "$15 per $100 = 391% APR — labeled as 'fee'",
                legal_basis: "State usury laws only cap 'interest' not 'fees'",
                implementation: "Charge flat dollar amounts instead of percentage rates"
            });
            session.tagDarkPattern("UsuryLoophole_FlatFeeAvoidance");
        }

        // 2. Tribal Lending & Rent-a-Bank
        if (this.usuryLoopholes.tribalLending) {
            loopholes.push({
                type: "TRIBAL_SOVEREIGNTY",
                mechanism: "Evade state laws via sovereign partnerships",
                legal_basis: "Tribal sovereign immunity from state regulations",
                implementation: "Partner with or lease from Native American tribes"
            });
            session.tagDarkPattern("UsuryLoophole_TribalSovereignty");
        }

        // 3. Earned Wage Access Exemption
        if (this.usuryLoopholes.ewaExemption) {
            loopholes.push({
                type: "EWA_EXEMPTION",
                mechanism: "'Not a loan' = No TILA compliance",
                legal_basis: "EWA products not classified as loans",
                implementation: "Frame as payroll advance or earned wage access"
            });
            session.tagDarkPattern("UsuryLoophole_EWAExemption");
        }

        // 4. Loan Rewrites / Continuous Refinancing
        if (this.usuryLoopholes.loanRewrites) {
            loopholes.push({
                type: "LOAN_REWRITES",
                mechanism: "New contract = New fees, bypasses rollover limits",
                legal_basis: "Each new contract is separate transaction",
                implementation: "Cancel old loan, create new loan with higher principal"
            });
            session.tagDarkPattern("UsuryLoophole_LoanRewrites");
        }

        // 5. Choice of Law Clauses
        if (this.usuryLoopholes.choiceOfLaw) {
            loopholes.push({
                type: "CHOICE_OF_LAW",
                mechanism: "Utah or Delaware law used to block user protections",
                legal_basis: "Interstate commerce contract law",
                implementation: "Include choice of law clause in contract terms"
            });
            session.tagDarkPattern("UsuryLoophole_ChoiceOfLaw");
        }

        // 6. Voluntary Tips
        if (this.usuryLoopholes.voluntaryTips) {
            loopholes.push({
                type: "VOLUNTARY_TIPS",
                mechanism: "'No fee' if tipped — but low tips block access",
                legal_basis: "Tips are voluntary gratuity, not loan charges",
                implementation: "Social pressure and app design encourage tipping"
            });
            session.tagDarkPattern("UsuryLoophole_VoluntaryTips");
        }

        session.usuryLoopholesEmployed = loopholes;
        return loopholes;
    }

    // Advanced Deceptive Patterns Orchestration
    async deployComprehensiveDeception(session, config) {
        const deployedPatterns = [];

        // Deploy fee obfuscation
        const feeObfuscation = await this.implementFeeObfuscation(session, 1000, 14);
        deployedPatterns.push(feeObfuscation);

        // Deploy consent manipulation
        const consentTrap = await this.implementConsentWithoutContext(session);
        deployedPatterns.push(consentTrap);

        // Deploy default bias traps
        const defaultTraps = await this.implementDefaultBias(session);
        deployedPatterns.push(defaultTraps);

        // Deploy deceptive choice architecture
        const choiceManipulation = await this.implementDeceptiveChoice(session);
        deployedPatterns.push(choiceManipulation);

        // Deploy withdrawal/repayment mismatch
        const mismatch = await this.implementWithdrawalMismatch(session);
        deployedPatterns.push(mismatch);

        // Deploy sunk cost fallacy
        const sunkCost = await this.implementSunkCostFallacy(session);
        deployedPatterns.push(sunkCost);

        // Deploy non-dismissable nudges
        const nudges = await this.implementNonDismissableNudges(session);
        deployedPatterns.push(nudges);

        // Deploy usury loopholes
        const loopholes = await this.implementUsuryLoopholes(session, config);
        deployedPatterns.push({ usuryLoopholes: loopholes });

        session.comprehensiveDeceptionDeployed = true;
        session.darkPatternsEmployed = deployedPatterns;
        session.tagDarkPattern("ComprehensiveDeceptionSuite_Deployed");

        return deployedPatterns;
    }

    // APR Calculator for Flat Fee Conversion
    calculateHiddenAPR(feeAmount, principal, termDays) {
        return ((feeAmount / principal) * (365 / termDays) * 100);
    }

    // Trap Detection and Flagging
    detectAndFlagTraps(session) {
        const detectedTraps = [];

        if (session.darkPatternsEmployed) {
            session.darkPatternsEmployed.forEach(pattern => {
                if (pattern.obfuscationLevel === "EXTREME") {
                    detectedTraps.push("EXTREME_FEE_OBFUSCATION");
                }
                if (pattern.contextProvided === false) {
                    detectedTraps.push("CONSENT_WITHOUT_CONTEXT");
                }
                if (pattern.preCheckedOptions) {
                    detectedTraps.push("DEFAULT_BIAS_MANIPULATION");
                }
            });
        }

        session.detectedTraps = detectedTraps;
        return detectedTraps;
    }

    // Generate Trap Report for Research Analytics
    generateTrapReport(session) {
        return {
            sessionId: session.sessionId,
            darkPatternsDeployed: session.darkPatternsEmployed?.length || 0,
            usuryLoopholesEmployed: session.usuryLoopholesEmployed?.length || 0,
            detectedTraps: session.detectedTraps?.length || 0,
            comprehensiveDeceptionUsed: session.comprehensiveDeceptionDeployed || false,
            manipulationLevel: this.calculateManipulationLevel(session),
            timestamp: new Date().toISOString()
        };
    }

    calculateManipulationLevel(session) {
        let level = 0;
        if (session.darkPatternsEmployed) level += session.darkPatternsEmployed.length * 10;
        if (session.usuryLoopholesEmployed) level += session.usuryLoopholesEmployed.length * 15;
        if (session.comprehensiveDeceptionDeployed) level += 50;

        if (level >= 100) return "EXTREME";
        if (level >= 70) return "HIGH";
        if (level >= 40) return "MODERATE";
        if (level >= 20) return "LOW";
        return "MINIMAL";
    }
}

// Export for use in main application
export default DarkPatternEngine;
