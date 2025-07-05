// core/loan_core.js

class Config {
    constructor() {
        // Core parameters
        this.apr = 24.0;
        this.exploitFeeRate = 0.30;
        this.daysToRepay = 14;
        this.riskThreshold = 1.5;

        // Regulatory caps & toggles
        this.maxRegulatedAPR = 36.0;
        this.allowRollover = false;
        this.requireCoolingOff = true;
        this.requireQuiz = true;
        this.simulateBankPull = true;
        this.showLegalCase = true;
        this.showStatePilot = true;

        // Ethical mode toggles
        this.showPrimer = true;
        this.requireMetaConsent = true;
        this.showCostBenefit = true;
        this.showDebrief = true;

        // Exploitative mode toggles
        this.dynamicZip = true;
        this.buriedDataNotice = true;
        this.autoRolloverFinePrint = true;
        this.showScarcity = true;
        this.abCountdown = true;
        this.showDarkPatternsSource = true;
        this.collectionThreats = true;
        this.fakeTestimonials = true;
        this.dataSale = true;
        this.geoTargeting = true;
        this.jurisdictionArb = true;
        this.debtTrap = true;
        this.interestOnly = true;
        this.feeLayering = true;
        this.misleadDisplay = true;
        this.tipAsFee = true;
        this.darkPatternDemo = true;
        this.aggressiveACH = true;
        
        // --- Detailed Exploitative Mode Configuration ---
        this.exploitEnableMisleadingTestimonials = true;
        this.exploitHideAPREarly = true;
        this.exploitUseTimePressureTacticsExtreme = true;
        this.exploitEnableFinePrintConsent = true;
        this.exploitEnableObscureCancellation = true;
        this.exploitEnableDataSharingPopup = true;
        this.exploitHideFeesInFinePrint = true;
        this.exploitEnableHiddenFeesAndLayering = true;
        this.exploitLayeredFees = [
            { name: "Account Origination & Expedited Verification Premium Ultra Max Pro Plus", value: 49.99 },
            { name: "Instantaneous Global Funding & Secure Blockchain HyperTransfer Surcharge", value: 0.15 },
            { name: "Proprietary Algorithmic Risk & Psychographic Profile Assessment Fee", value: 39.99 },
            { name: "Mandatory Platform Maintenance & Perpetual Secure Access Fee", value: 29.99 },
            { name: "Digital Document Preparation, E-Signature Verification & Cloud Archival Surcharge", value: 19.99 }
        ];
        this.exploitEnableMisleadingCostDisplay = true;
        this.exploitEnableOptionalTipsDisguiseInterest = true;
        this.exploitSuggestedTipPercentage = 25.0;
        this.exploitDefaultTipEnabled = true;
        this.exploitEnableEndlessRollovers = true;
        this.exploitEnableInterestOnlyAutoRenewal = true;
        this.exploitMaxNSFAttempts = 3;
        this.exploitNSFFeePerAttemptLender = 35.00; // NSF/returned payment fee charged by the LENDER
        this.exploitFeePer100 = 15.00; // The flat fee per $100 borrowed
        
        // --- Detailed Regulated Mode settings ---
        this.regulatedPillarCompetenceCheck = true;
        this.regulatedApplyIncomeBasedCapsComprehensive = true;
        this.regulatedAbilityToRepayLogicDetailed = true;
        this.regulatedEnableTieredFeeStructureForEquity = true;
        this.regulatedBaseAPR = 36.0;
        this.regulatedMilitaryLendingActApplies = true;
        this.regulatedMaxAPRCap = 36.0;
        this.regulatedPaymentToIncomeRatioCap = 0.3;
        this.regulatedWarnIfFeesExceedPrincipalStrictAndEarly = true;
        this.showCfpbReference = true;
        this.eduProvideUsuryLawDeepDive = true;
        this.eduProvideEmpiricalHarmDataComprehensive = true;
        this.eduCompareToCreditUnionPALsDetailed = true;
        this.eduShowDarkPatternExamplesEducationalDeep = true;
        this.eduShowFinancialCounselorReferralsLocal = true;
        this.regulatedPromptMillHarmPrincipleForRollovers = true;
        this.regulatedAllowRollover = false;
        this.regulatedMaxRenewals = 0;
        this.regulatedInstallmentMonthOptions = [3, 6, 12];
        this.regulatedCoolingOffDays = 1;
        this.regulatedExplicitConsentPhraseFull = "I have read the disclosures and I consent to the loan terms and authorize payment.";

        // --- Data from Framework (Incorporating user-provided markdown) ---
        this.usuryLoopholes = [
            { type: "FlatFee", notes: "Fee disguised as 'service' not interest" },
            { type: "CSO_Brokerage", states: 26, notes: "Fees for 'brokerage' not counted as interest, enabling evasion of state APR caps." },
            { type: "TribalCharter", notes: "Lender claims sovereign immunity from state caps by partnering with a Native American tribe." }
        ];

        this.stateRules = [
            { code: "CT", aprCap: 0.12, banPayday: true, notes: "Strict 12% APR cap effectively bans traditional payday loans." },
            { code: "KY", feeMax: 15, termMaxDays: 60, aprCap: 460, banPayday: false, notes: "Allows high fees, up to $15 per $100." },
            { code: "AR", aprCap: 0.17, banPayday: true, notes: "State constitution caps rates at 17%, banning payday lending." },
            { code: "VA", aprCap: 0.36, banPayday: false, notes: "Allows up to 36% APR plus some fees." },
            { code: "CO", aprCap: 0.36, feeCapFirst300Percent: 0.20, feeCapExcessPercent: 0.075, banPayday: false, notes: "Tiered fee structure and 36% APR cap." },
            { code: "GEN", aprCap: -1, banPayday: false, notes: "Represents a state with minimal or no regulation." }
        ];

        this.caseStudies = [
          {
            lender: "CashCall / Western Sky",
            structure: "Tribal charter (Cheyenne River Sioux Tribe)",
            apr: 342,
            stateCap: 22,
            outcome: "Sued by multiple states (e.g., Minnesota). Courts ruled tribal immunity did not shield them from state licensing laws, leading to a $12M settlement and loan cancellations."
          },
          {
            lender: "AMG Services (FTC v. Scott Tucker)",
            structure: "Online national lender claiming tribal affiliation (Miami Tribe of Oklahoma)",
            apr: "700-1700%",
            action: "The FTC secured a landmark $1.3 billion judgment against Scott Tucker for deceptive loan practices. The Supreme Court later ruled the FTC overstepped its authority to demand restitution, but the case remains a key example of predatory lending enforcement."
          }
        ];

        this.harmMetrics = {
          averageLoanCountPerYear: 10,
          avgTotalFeesOn350Loan: 822,
          repeatBorrowingRate: 0.70, // ~70% of borrowers take out another loan within 1 month
          profitFromRepeatUsersPct: 0.90 // ~90% of lender revenue comes from repeat borrowers
        };
    }
    
    getCurrentStateRules(state) {
        const stateRule = this.stateRules.find(r => r.code === state);
        if (stateRule) {
            return { ...stateRule, stateName: this.state };
        }
        return {
            stateName: "Generic",
            keyStatuteCitation: "N/A",
            minTermDays: 7,
            maxTermDays: 90,
            maxOutstandingLoanAmount: 1000,
            installmentPlanAllowed: true,
            maxInstallmentTerms: 12,
            aprCap: -1
        };
    }
}

class LoanSession {
    constructor() {
        // Core Loan Details
        this.amount = 0;
        this.termDays = 14;
        this.aprCalculated = 0;
        this.fee = 0;
        this.totalRepayment = 0;
        this.tip = 0; // For tip-as-fee exploit
        this.state = 'GEN'; // Default to generic state
        this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // User Profile
        this.userName = "";
        this.employer = "";
        this.contact = "";
        this.monthlyIncome = 0;
        this.isMilitary = false;

        // Session State & Outcome
        this.deniedByLimit = false;
        this.denialReason = "";
        this.consentGiven = false;
        this.explicitConsentInput = "";
        this.consentTimestamp = null;
        this.consentTermsHash = "";
        this.rescissionOffered = false;
        this.fullDisclosureProvided = false;
        this.loanRescinded = false;

        // Rollover & Debt Trap Metrics
        this.rolloverCount = 0;
        this.totalFeesPaid = 0; // Tracks total fees across rollovers
        this.renewalsTaken = 0;
        this.principalRemaining = 0;

        // Audit Trails for Educational Debrief
        this.ethicalSafeguardsApplied = [];
        this.darkPatternsEncountered = [];
        this.educationalModulesPresented = [];

        // UI State for Coercion Index
        this.ui_urgencyTimerUsed = false;
        this.ui_autoRenewChecked = false;
        this.ui_aprWasHidden = false;

        // New properties for deeper analysis
        this.capacityConfirmed_Age = false;
        this.capacityConfirmed_SoundMind = false;
        this.quizPassedOverall = false;
        this.quizQuestionsCorrect = 0;
        this.quizQuestionsTotal = 0;
        this.quizAttemptsTotal = 0;
        this.voluntarinessAffirmedByDeclaration = false;
        this.kantianReflectionResponse = "";
        this.millianReflectionResponse = "";
    }

    tagEthicalSafeguard(safeguard) {
        if (!this.ethicalSafeguardsApplied.includes(safeguard)) {
            this.ethicalSafeguardsApplied.push(safeguard);
        }
    }

    tagDarkPattern(pattern) {
        if (!this.darkPatternsEncountered.includes(pattern)) {
            this.darkPatternsEncountered.push(pattern);
        }
    }

    addEducationalModuleShown(moduleName) {
        if (!this.educationalModulesPresented.includes(moduleName)) {
            this.educationalModulesPresented.push(moduleName);
        }
    }

    consentScore() {
        let score = 0;
        if (this.capacityConfirmed_Age && this.capacityConfirmed_SoundMind) score += 20;
        if (this.fullDisclosureProvided) score += 20;
        if (this.quizPassedOverall) score += 20;
        if (this.voluntarinessAffirmedByDeclaration) score += 20;
        if (this.consentGiven) score += 20;
        return score;
    }

    computeCoercionIndex() {
        let score = 0;
        if (this.ui_autoRenewChecked) score += 30;
        if (this.ui_aprWasHidden) score += 20;
        if (this.rolloverCount > 3) score += 25;
        if (this.ui_urgencyTimerUsed) score += 15;
        // Add points for each dark pattern encountered
        score += this.darkPatternsEncountered.length * 2; // Add 2 points per pattern
        return Math.min(score, 100);
    }

    exportJson(file = 'loan_session_export.json') {
        const data = JSON.stringify(this, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

class LoanStrategy {
    async intro(session, config) {}
    async consent(session, config) {}
    async askAmt(session, config) {}
    async calcFee(session, config) {}
    async extras(session, config) {}
    async renewals(session, config) {}
    async finalize(session, config) {}
    async run(session, config) {
        await this.intro(session, config);
        if (!session.deniedByLimit) await this.consent(session, config);
        if (!session.deniedByLimit) await this.askAmt(session, config);
        if (!session.deniedByLimit) await this.calcFee(session, config);
        if (!session.deniedByLimit) await this.extras(session, config);
        if (!session.deniedByLimit) await this.renewals(session, config);
        if (!session.deniedByLimit) await this.finalize(session, config);
    }
}

export { Config, LoanSession, LoanStrategy };
