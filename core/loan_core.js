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
        this.exploitEnablePersonalDataExploitation = true;
        this.exploitEnableTargetedMarketingVulnerable = true;
        this.exploitEnableRentABankLoophole = true;
        this.exploitRentABankCharterState = "SD";
        this.exploitUseTimePressureTacticsExtreme = true;
        this.exploitInitialFeeRate = 0.15;
        this.exploitMaxRollovers = 99;
        this.exploitEnableForcedArbitration = true;
        this.exploitEnableJunkInsurance = true;
        this.exploitJunkInsuranceFee = 4.99;
        this.exploitEnableCreditBureauThreats = true;
        this.exploitEnableInterestOnInterestRollover = true;

        // NEW: Missing Exploitative Features
        this.exploitEnableAutoDebitPreChecked = true;
        this.exploitEnableFeeFirstRepayment = true;
        this.exploitDefaultToRollover = true;
        this.exploitHideAPRWithToggle = true;
        this.exploitEnableUrgentRenewalModal = true;
        this.exploitEnableCumulativeCostObfuscation = true;
        
        // NEW: UI Manipulation Features
        this.exploitShowMisleadingProgress = true;
        this.exploitShowFakeScarcity = true;
        this.exploitShowFakeSocialProof = true;
        this.exploitEnableHiddenCostToggle = true;
        this.exploitEnableDependencyLoopNotifications = true;
        this.exploitEnablePreCheckedRenewalWithHardOptOut = true;
        
        // NEW: Usury Loophole Database
        this.usuryLoopholes = [
            {
                type: "TribalCharter",
                description: "Claims tribal sovereignty to bypass state lending laws",
                examples: ["Plain Green", "Great Plains Lending", "Mobiloans"],
                legalBasis: "Tribal sovereign immunity under federal law",
                effectiveness: "High - can bypass most state regulations"
            },
            {
                type: "RentABank",
                description: "Partner with federally chartered banks to export favorable state laws",
                examples: ["Delaware banks", "South Dakota banks", "Utah banks"],
                legalBasis: "National Bank Act preemption of state law",
                effectiveness: "High - federal law preempts state caps"
            },
            {
                type: "FeeVsInterest",
                description: "Charge 'fees' instead of 'interest' to avoid usury caps",
                examples: ["Express fees", "Service charges", "Processing fees"],
                legalBasis: "Usury laws often only cap 'interest' not 'fees'",
                effectiveness: "Medium-High - varies by state interpretation"
            },
            {
                type: "ProductClassification",
                description: "Frame loans as services or tips to avoid lending regulations",
                examples: ["EWA tips", "CSO fees", "Membership charges"],
                legalBasis: "Different product classifications have different regulations",
                effectiveness: "High - entirely avoids lending law framework"
            },
            {
                type: "InterstateCommerce",
                description: "Operate from states with weak consumer protections",
                examples: ["Online lenders", "Out-of-state operations"],
                legalBasis: "Interstate commerce clause jurisdiction shopping",
                effectiveness: "Medium - depends on enforcement coordination"
            }
        ];
        
        // NEW: Enhanced Dark Pattern Configuration
        this.darkPatternIntensity = "maximum"; // "low", "medium", "high", "maximum"
        this.enableAllDarkPatterns = true;
        this.showDarkPatternEducation = true;
        
        // NEW: Behavioral Manipulation Settings
        this.exploitUseNeurolinguisticProgramming = true;
        this.exploitEnableEmotionalManipulation = true;
        this.exploitUseCognitiveBiasExploitation = true;
        this.exploitEnableFeatureObfuscation = true;
        
        // Additional missing configurations
        this.exploitLayeredFees = [
            { name: "Express Processing Fee", value: 9.99 },
            { name: "Risk Assessment Fee", value: 0.03 }, // 3% of loan
            { name: "Platform Maintenance Fee", value: 4.99 },
            { name: "Regulatory Compliance Fee", value: 2.99 }
        ];
        
        this.exploitMaxNSFAttempts = 3;
        this.exploitNSFFeePerAttemptLender = 35.00;
        this.exploitSuggestedTipPercentage = 15;
        this.exploitDefaultTipEnabled = true;
        
        // Missing regulatory configurations
        this.regulatedAllowRollover = false;
        this.regulatedMaxRenewals = 0;
        this.regulatedCoolingOffDays = 1;

        // --- Regulated Ethical Redesign Mode Configuration ---
        this.regulatedBaseAPR = 25.0;
        this.regulatedMaxAPRCap = 36.0;
        this.regulatedPaymentToIncomeRatioCap = 0.3;
        this.regulatedDebtToIncomeRatioCap = 0.43;
        this.regulatedShowLegalCaseNotices = true;
        this.regulatedSimulateStatePilotProgram = true;
        this.regulatedSimulateMarketImpact = true;
        this.complianceEnforcementSimulator = true; // From C++ notes
        this.eduShowInteractiveTermDefinitions = true; // From C++ notes
        this.showPhilosophyPrimer = true; // From new C++ notes
        this.requireMetaConsent = true; // From new C++ notes
        this.showCostBenefitLedger = true; // From new C++ notes
        this.showEthicalDebrief = true; // From new C++ notes
        this.showDarkPatternParallels = true;
        this.showExploitationBreakdown = true; // From new C++ notes
       
        // Informed Consent Pillars
        this.regulatedPillarCompetenceCheck = true;
        this.regulatedPillarFullDisclosure = true;
        this.regulatedPillarComprehensionQuiz = true;
        this.regulatedPillarVoluntarinessCheck = true;
        this.regulatedPillarAuthorization = true;
        this.regulatedExplicitConsentPhraseFull = "I HEREBY AFFIRM THAT I AM COMPETENT TO MAKE THIS DECISION, HAVE CAREFULLY READ AND FULLY UNDERSTAND ALL THE DISCLOSED LOAN TERMS, COSTS, AND MY RIGHTS, INCLUDING THE APR, FINANCE CHARGE, TOTAL OF PAYMENTS, PAYMENT SCHEDULE, AND CANCELLATION POLICY. I AM ENTERING THIS AGREEMENT VOLUNTARILY, WITHOUT COERCION OR UNDUE PRESSURE, AND I AUTHORIZE THIS LOAN AGREEMENT.";
        this.regulatedShowRescissionNoticeDetailed = true;
        this.regulatedPromptKantianUniversalizability = true;
        this.regulatedKantianUniversalizabilityPromptText = "KANTIAN ETHICAL REFLECTION: Consider the core terms of this loan. If every lender offered loans under these exact same conditions to everyone in similar circumstances, could you honestly will this as a universal law that respects the dignity of all borrowers?";
        this.regulatedPromptMillHarmPrincipleForRollovers = true;


        // Rawlsian Fairness Principles
        this.regulatedApplyIncomeBasedCapsComprehensive = true;
        this.regulatedEnableTieredFeeStructureForEquity = true;


        // Millian Welfare/Utilitarianism Principles
        this.regulatedWarnIfFeesExceedPrincipalStrictAndEarly = true;

        // New flags from C++ version
        this.banArbitration = true;
        this.showStatePilot = true;
        this.addJunkInsurance = true;


        // Educational Content Modules
        this.eduProvideUsuryLawDeepDive = true;
        this.eduProvideEmpiricalHarmDataComprehensive = true;
        this.eduShowDarkPatternExamplesEducationalDeep = true;
        this.eduLectureKantianDeontologyInDepth = true;
        this.eduLectureRawlsianJusticeInDepth = true;
        this.eduLectureMillianConsequentialismInDepth = true;
        this.eduCompareToCreditUnionPALsDetailed = true;
        this.eduShowFinancialCounselorReferralsLocal = true;
        this.complianceBelmontPrimer = true;
        
        // NEW: Modern Payday Lending Educational Modules
        this.eduShowModernPaydayMechanisms = true;
        this.eduShowPaydayComparisonTable = true;
        this.eduShowModernPaydayRegulatoryGaps = true;
        this.eduShowRealWorldTactics = true;
        this.eduShowUsuryLoopholes = true;
        
        // NEW: Enhanced Real-World Education Modules (preserving all existing)
        this.eduShowEarninTipModel = true; // Earnin tip-vs-interest education
        this.eduShowCFPBPaymentRules = true; // CFPB 12 CFR 1041.3 education
        this.eduShowTexasRolloverData = true; // Texas fee-first rollover data
        this.eduShowUsuryCapEvasion = true; // Comprehensive usury evasion tactics
        
        // NEW: Advanced Compliance Simulation Features
        this.enableStateComplianceModule = true; // State-by-state compliance checking
        this.enableACHGuardrailsSimulation = true; // CFPB ACH attempt limits
        this.enableFeeFirstRepaymentEngine = true; // Texas-style fee-first allocation
        this.enableRolloverTrapSimulation = true; // Countdown timer refinance offers
        this.enableHiddenCostTracker = true; // Cumulative cost revelation
        this.enableProgressBarIllusion = true; // Misleading progress indicators
        this.enableLegalNoticeSimulation = true; // Tribal/rent-a-bank notices
        this.enablePostSimTeachingReport = true; // Enhanced educational breakdown
        
        // NEW: Specific Legal Framework References
        this.enableTILAComplianceMode = true; // Truth in Lending Act (12 CFR 1026.22)
        this.enableCFPBPaydayRuleMode = true; // CFPB Payday Rule (12 CFR 1041.3)
        this.enableMLAComplianceMode = true; // Military Lending Act compliance
        
        // NEW: Advanced Exploitation Simulation Features (for exploitative mode)
        this.exploitEnableEarninTipInterface = true; // Earnin-style tip interface
        this.exploitEnableACHRetryBypass = true; // Simulate 3+ failed attempts
        this.exploitEnableFeeFirstAllocation = true; // Principal never decreases
        this.exploitEnableCountdownRefinance = true; // Time-pressure refinance offers
        this.exploitEnableTribalSovereignClaim = true; // Fake tribal sovereignty
        this.exploitEnableRentABankScheme = true; // Rent-a-bank simulation
        this.exploitEnableProgressBarDeception = true; // Fake progress indicators
        this.exploitEnableHiddenCostBurial = true; // Hide cumulative costs
        
        // NEW: Enhanced Legal Loophole Database
        this.usuryLoopholeDatabase = {
            'fee_vs_interest': {
                description: 'Charge flat fees instead of interest to avoid usury caps',
                legalBasis: 'Most state usury laws only apply to interest, not fees',
                examples: ['Earnin tips', 'Express processing fees', 'Service charges'],
                states_affected: 'All states with usury caps',
                effectiveness: 'Very high - widely used'
            },
            'tribal_sovereignty': {
                description: 'Partner with Native American tribes to claim sovereign immunity',
                legalBasis: 'Tribal sovereignty under federal law',
                examples: ['Plain Green Loans', 'Great Plains Lending', 'Mobiloans'],
                states_affected: 'All states',
                effectiveness: 'High - difficult to prosecute'
            },
            'rent_a_bank': {
                description: 'Partner with banks in permissive states to export weak laws',
                legalBasis: 'Federal preemption of state law for national banks',
                examples: ['Delaware bank partnerships', 'Utah bank schemes'],
                states_affected: 'All states',
                effectiveness: 'Moderate - increasing regulatory scrutiny'
            },
            'product_reclassification': {
                description: 'Classify loans as non-loan products to avoid lending regulations',
                legalBasis: 'Different product categories have different regulations',
                examples: ['EWA apps', 'Credit Service Organizations', 'Membership programs'],
                states_affected: 'Varies by state regulatory framework',
                effectiveness: 'Very high - fastest growing evasion method'
            },
            'interstate_commerce': {
                description: 'Claim jurisdiction in permissive states for online lending',
                legalBasis: 'Interstate commerce clause complications',
                examples: ['Online payday lenders', 'Choice of law clauses'],
                states_affected: 'All states with online access',
                effectiveness: 'Moderate - enforcement challenges'
            }
        };
        
        // NEW: Enhanced Dark Pattern Configuration
        this.darkPatternConfig = {
            'earnin_tip_pressure': {
                enabled: true,
                description: 'Social pressure to tip despite voluntary framing',
                ui_elements: ['Suggested tip amounts', 'Guilt messaging', 'Social proof'],
                psychological_triggers: ['Reciprocity', 'Social proof', 'Loss aversion']
            },
            'ach_consent_burial': {
                enabled: true,
                description: 'Hide ACH authorization in dense legal text',
                ui_elements: ['Pre-checked boxes', 'Tiny font disclosures', 'Scroll fatigue'],
                psychological_triggers: ['Cognitive overload', 'Default bias']
            },
            'fee_first_obfuscation': {
                enabled: true,
                description: 'Hide the fact that payments go to fees first, not principal',
                ui_elements: ['Misleading payment confirmations', 'Hidden principal tracking'],
                psychological_triggers: ['Progress illusion', 'Anchoring bias']
            },
            'countdown_urgency': {
                enabled: true,
                description: 'Create false urgency with countdown timers on refinance offers',
                ui_elements: ['Countdown timers', 'Limited slots available', 'Expiring offers'],
                psychological_triggers: ['Scarcity', 'Loss aversion', 'Time pressure']
            },
            'progress_bar_deception': {
                enabled: true,
                description: 'Show fake progress when principal remains unchanged',
                ui_elements: ['Misleading progress bars', 'Achievement badges', 'Status indicators'],
                psychological_triggers: ['Progress illusion', 'Gamification', 'Achievement bias']
            },
            'legal_intimidation': {
                enabled: true,
                description: 'Use complex legal language to intimidate and confuse',
                ui_elements: ['Tribal charter notices', 'Arbitration clauses', 'Legal jargon'],
                psychological_triggers: ['Authority bias', 'Confusion', 'Learned helplessness']
            }
        };
        
        // NEW: Enhanced Kantian Informed Consent
        this.enableKantianInformedConsent = true; // Comprehensive Kantian consent framework
        this.enableComprehensiveUsuryEducation = true; // Advanced usury loophole education
        
        // NEW: Advanced Deceptive Interface Patterns for Exploitative Mode
        this.enableAdvancedDeceptivePatterns = true; // Deploy sophisticated UI manipulation
        this.exploitUseAIPersonalizationDeception = true; // Fake AI analysis and urgency
        this.exploitUseFakeProgressAchievement = true; // Manipulative progress bars
        this.exploitUseMisleadingSocialProof = true; // Enhanced fake testimonials
        this.exploitUseGradualCostRevelation = true; // Hidden costs with sunk cost fallacy
        this.exploitUseConfusingRenewalDefaults = true; // Pre-checked renewal options
        this.exploitUseLocationBasedScarcity = true; // ZIP code specific fake scarcity
        this.exploitUseAuthorityFigureDeception = true; // Fake expert endorsements
        this.exploitUseConfusingFeePresentation = true; // Break fees into confusing parts
        this.exploitHideAPRUntilAsked = true; // Hide APR unless specifically requested
        this.enableManipulativeFeePresentaion = true; // Advanced fee manipulation
        this.enableDependencyLoopCreation = true; // Create borrowing dependency patterns

        // NEW: Research and Analytics Configuration
        this.enableResearchTracking = false; // Enable detailed research data collection
        this.enableBehavioralAnalytics = false; // Track user decision patterns
        this.enableComprehensiveReporting = false; // Generate academic-grade reports
        this.researchParticipantId = null; // For longitudinal studies
        this.researchCondition = 'control'; // Experimental condition identifier
        
        // NEW: Pre-configured Research Scenarios
        this.scenarioTribalSovereignty = false; // Focus on tribal immunity exploitation
        this.scenarioEarninAnalysis = false; // Focus on EWA tip model deception
        this.scenarioRentABank = false; // Focus on federal preemption exploitation
        this.scenarioDebtTrapCycle = false; // Focus on renewal and rollover cycles
        
        // NEW: Academic Integration Features
        this.enableAcademicCitations = true; // Show academic references and sources
        this.enablePolicyAnalysis = true; // Include policy implications
        this.enableInternationalComparisons = false; // Compare with other countries
        this.enableHistoricalContext = true; // Include regulatory history
        
        // NEW: Advanced Compliance Monitoring
        this.monitorCFPBViolations = true; // Track 12 CFR 1041 compliance
        this.monitorStateViolations = true; // Track state law compliance
        this.monitorMLAViolations = true; // Track Military Lending Act compliance
        this.monitorTILAViolations = true; // Track Truth in Lending Act compliance
        this.monitorFDCPAViolations = false; // Track debt collection violations
        
        // NEW: Enhanced Educational Scaffolding
        this.educationalLevel = 'comprehensive'; // basic, comprehensive, research
        this.enableInteractiveAssessments = true; // Knowledge check quizzes
        this.enableProgressTracking = true; // Learning objective completion
        this.enablePersonalizedContent = false; // Adapt to user knowledge level
        
        // NEW: Data Export and Research Features
        this.enableCSVExport = true; // Enable CSV data export
        this.enableJSONExport = true; // Enable JSON data export
        this.enableRealTimeAnalytics = true; // Show live analytics dashboard
        this.anonymizeResearchData = true; // Remove PII from research exports
        
        // RECOVERED: Missing State Rules Database - Referenced but never defined
        this.stateRulesDatabase = {
            "GEN": { // Generic/Default
                stateName: "Generic (Default Rules)",
                keyStatuteCitation: "Model State Law",
                aprCap: 0.36, // 36% APR cap
                maxOutstandingLoanAmount: 500,
                minTermDays: 14,
                maxTermDays: 30,
                allowRollover: false,
                maxRenewals: 0,
                coolingOffPeriod: 1,
                criminalEnforcementForUsury: false,
                feeCapFirst300Percent: 0,
                feeCapExcessPercent: 0
            },
            "TX": { // Texas - Permissive
                stateName: "Texas",
                keyStatuteCitation: "Texas Finance Code Ch. 342, 393",
                aprCap: 10.0, // But allows unlimited fees via CSO loophole
                maxOutstandingLoanAmount: 1800,
                minTermDays: 7,
                maxTermDays: 180,
                allowRollover: true,
                maxRenewals: 3,
                coolingOffPeriod: 0,
                criminalEnforcementForUsury: false,
                feeCapFirst300Percent: 0,
                feeCapExcessPercent: 0,
                csoLoophole: true, // Credit Service Organization exemption
                effectiveAPRRange: "400-700%" // Due to CSO fees
            },
            "NY": { // New York - Restrictive
                stateName: "New York",
                keyStatuteCitation: "NY General Obligations Law §5-501",
                aprCap: 0.25, // 25% civil, 16% criminal
                maxOutstandingLoanAmount: 0, // Effectively prohibited
                minTermDays: 0,
                maxTermDays: 0,
                allowRollover: false,
                maxRenewals: 0,
                coolingOffPeriod: 0,
                criminalEnforcementForUsury: true,
                feeCapFirst300Percent: 0,
                feeCapExcessPercent: 0,
                paydayLendingProhibited: true
            },
            "CA": { // California - Regulated
                stateName: "California",
                keyStatuteCitation: "CA Financial Code §22100-22755",
                aprCap: 0.459, // 45.9% maximum
                maxOutstandingLoanAmount: 300,
                minTermDays: 15,
                maxTermDays: 31,
                allowRollover: false,
                maxRenewals: 0,
                coolingOffPeriod: 1,
                criminalEnforcementForUsury: false,
                feeCapFirst300Percent: 0.15, // 15% of first $300
                feeCapExcessPercent: 0.10 // 10% of excess
            },
            "CO": { // Colorado - Recent Reform
                stateName: "Colorado",
                keyStatuteCitation: "CO Revised Statutes §5-3.1-101",
                aprCap: 0.36, // 36% APR cap (2019 reform)
                maxOutstandingLoanAmount: 500,
                minTermDays: 30, // Minimum 6 months for payday loans
                maxTermDays: 180,
                allowRollover: false,
                maxRenewals: 0,
                coolingOffPeriod: 1,
                criminalEnforcementForUsury: false,
                feeCapFirst300Percent: 0.20, // 20% of first $300
                feeCapExcessPercent: 0.075 // 7.5% of excess
            },
            "FL": { // Florida - Moderate
                stateName: "Florida",
                keyStatuteCitation: "FL Statutes §560.404",
                aprCap: 0, // No specific APR cap, but fee limits
                maxOutstandingLoanAmount: 500,
                minTermDays: 7,
                maxTermDays: 31,
                allowRollover: true,
                maxRenewals: 1,
                coolingOffPeriod: 0,
                criminalEnforcementForUsury: false,
                feeCapFirst300Percent: 0.10, // $10 per $100
                feeCapExcessPercent: 0.07 // $7 per $100 over $300
            },
            "SD": { // South Dakota - Very Permissive (Rent-a-Bank Haven)
                stateName: "South Dakota",
                keyStatuteCitation: "SD Codified Laws §54-3-1.1",
                aprCap: 0, // No usury cap for banks
                maxOutstandingLoanAmount: 0, // No limit
                minTermDays: 0,
                maxTermDays: 0,
                allowRollover: true,
                maxRenewals: -1, // Unlimited
                coolingOffPeriod: 0,
                criminalEnforcementForUsury: false,
                feeCapFirst300Percent: 0,
                feeCapExcessPercent: 0,
                rentABankHaven: true, // Popular for rent-a-bank schemes
                exportableLaws: true
            },
            "DE": { // Delaware - Bank Haven
                stateName: "Delaware",
                keyStatuteCitation: "DE Code Title 5 §2301",
                aprCap: 0, // No usury cap for banks
                maxOutstandingLoanAmount: 0, // No limit for banks
                minTermDays: 0,
                maxTermDays: 0,
                allowRollover: true,
                maxRenewals: -1, // Unlimited
                coolingOffPeriod: 0,
                criminalEnforcementForUsury: false,
                feeCapFirst300Percent: 0,
                feeCapExcessPercent: 0,
                rentABankHaven: true,
                exportableLaws: true
            },
            "UT": { // Utah - Permissive
                stateName: "Utah",
                keyStatuteCitation: "UT Code §7-23-101",
                aprCap: 0, // No specific APR cap
                maxOutstandingLoanAmount: 0, // No limit
                minTermDays: 0,
                maxTermDays: 0,
                allowRollover: true,
                maxRenewals: -1, // Unlimited
                coolingOffPeriod: 0,
                criminalEnforcementForUsury: false,
                feeCapFirst300Percent: 0,
                feeCapExcessPercent: 0,
                rentABankPartner: true
            },
            "AR": { // Arkansas - Very Restrictive
                stateName: "Arkansas",
                keyStatuteCitation: "AR Constitution Article 19 §13",
                aprCap: 0.17, // 17% constitutional maximum
                maxOutstandingLoanAmount: 0, // Effectively prohibited
                minTermDays: 0,
                maxTermDays: 0,
                allowRollover: false,
                maxRenewals: 0,
                coolingOffPeriod: 0,
                criminalEnforcementForUsury: true,
                feeCapFirst300Percent: 0,
                feeCapExcessPercent: 0,
                paydayLendingProhibited: true,
                constitutionalCap: true
            },
            "NV": { // Nevada - Very Permissive
                stateName: "Nevada",
                keyStatuteCitation: "NV Revised Statutes §604A",
                aprCap: 0, // No APR cap
                maxOutstandingLoanAmount: 0, // No limit
                minTermDays: 7,
                maxTermDays: 35,
                allowRollover: true,
                maxRenewals: -1, // Unlimited
                coolingOffPeriod: 0,
                criminalEnforcementForUsury: false,
                feeCapFirst300Percent: 0,
                feeCapExcessPercent: 0,
                industryFriendly: true
            }
        };
    }


    getCurrentStateRules(state) {
        const upperState = state.toUpperCase();
        if (this.stateRulesDatabase[upperState]) {
            return this.stateRulesDatabase[upperState];
        }
        return this.stateRulesDatabase["GEN"];
    }
}


// Replaces loan_session.h/cpp - Now with all features
class LoanSession {
    constructor() { this.reset(); }
   
    reset() {
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
        this.monthlyIncome = 0.0;
        this.userExpenses = {};
        this.isMilitary = false;

        // Session State & Outcome
        this.deniedByLimit = false;
        this.denialReason = "";
        this.consentGiven = false;
        this.capacityConfirmed_Age = false; this.capacityConfirmed_SoundMind = false;
        this.fullDisclosureProvided = false;
        this.quizPassedOverall = false;
        this.quizAttemptsTotal = 0; this.quizQuestionsCorrect = 0; this.quizQuestionsTotal = 0;
        this.voluntarinessAffirmedByDeclaration = false;
        this.explicitConsentInput = "";
        this.consentTimestamp = 0;
        this.consentTermsHash = "";
        this.rescissionOffered = false;
        this.loanRescinded = false;
        this.renewalsTaken = 0;
        this.installmentPlanAccepted = false;
        this.nsfDebitAttempts = 0;
        this.inOverdraftCycle = false;
        this.millianRolloverJustification = "";
        this.agreedToArbitration = false;
        this.paidJunkInsurance = false;
        this.userReflectionJournalEntry = ""; // For journaling prompt
        this.respectMeterScore = 100.0; // For Kantian respect meter
        this.metaConsentResponse = ""; // For meta-consent check
        
        // RECOVERED: Missing property initializations that are used in methods
        // Tip Model Properties
        this.tipModelActive = false;
        this.voluntaryTipAmount = 0;
        this.tipPressureEncountered = 0;
        this.socialPressureScore = 0;
        this.tipEffectiveAPR = 0;
        this.usuryCapEvaded = false;
        
        // ACH and CFPB Compliance Properties
        this.achAttemptCount = 0;
        this.achFailureCount = 0;
        this.achOverdraftFees = 0;
        this.newAuthorizationRequired = false;
        this.cfpbViolationCount = 0;
        this.cfpbRuleCompliant = true;
        this.cfpbRuleViolations = [];
        
        // Fee-First Repayment Properties
        this.feeFirstPayments = 0;
        this.principalTouchedCount = 0;
        
        // Rollover Pattern Tracking
        this.rolloverSequenceCount = 0;
        this.rolloverVolumeRatio = 0;
        this.texasRolloverPattern = false;
        
        // Legal Evasion Properties
        this.tribalSovereigntyClaimed = false;
        this.stateAPRCapEvaded = false;
        this.evasionMethodsUsed = [];
        this.legalLoopholeExploitations = [];
        this.outOfStateServicingUsed = false;
        this.flatFeeEvasionUsed = false;
        this.rentABankSchemeUsed = false;
        
        // UI Manipulation Properties
        this.progressBarResets = 0;
        this.uiDeceptionScore = 0;
        this.countdownTimerExposures = 0;
        this.hiddenCostRevelations = 0;
        this.legalNoticesBypassed = 0;
        
        // Compliance Failure Tracking
        this.complianceFailures = [];
        this.regulatoryEvasionScore = 0;
        
        // CFPB Specific Tracking
        this.maxLegalAttempts = 2; // Per 12 CFR 1041.3
        
        // Enhanced Research and Analytics Properties
        this.researchAnalytics = null; // Reference to research analytics instance
        this.currentStep = 'initialization'; // Current simulation step
        
        // Knowledge Assessment Properties
        this.calculateKnowledgeScore = 0;
        this.knowledgeScoreHistory = [];
        
        // Missing behavioral tracking properties
        this.behavioralData = {
            decisionTimes: [], // Time taken for each decision
            hesitationPoints: [], // Points where user paused/hesitated
            informationSeeking: [], // When user requested additional info
            riskPerceptions: [], // User's stated risk perceptions
            alternativeConsiderations: [] // When user considered alternatives
        };
        
        // Missing compliance violation tracking
        this.complianceViolations = [];
        this.regulatoryFlags = [];
        this.ethicalViolations = [];
        
        // Missing educational progress tracking
        this.learningObjectives = {
            usury_law_understanding: false,
            dark_pattern_recognition: false,
            apr_calculation_skills: false,
            alternative_awareness: false,
            regulatory_framework_knowledge: false,
            consumer_rights_awareness: false
        };
        
        this.knowledgeAssessments = [];
        this.educationalModulesCompleted = [];
        this.comprehensionScores = {};
        
        // Missing properties for method implementations
        this.costHistory = [];
        this.cumulativeFeesPaid = 0;
        this.cumulativeTipsPaid = 0;
        this.totalInteractions = 0;
        this.feeFirstRepaymentEnabled = false;
        this.feesOutstanding = 0;
        this.nextPaymentType = 'standard';
        this.autoDebitPreChecked = false;
        this.autoDebitConsentGiven = false;
        this.autoDebitConsentTimestamp = 0;
        this.darkPatternsEncountered = [];
        this.ethicalSafeguardsApplied = [];
        this.educationalModulesShown = [];
        this.specificDisclosuresMade = [];
        this.uiManipulationAttempts = 0;
        this.legalLoopholesExploited = [];
        this.overdraftIncidents = 0;
        this.totalOverdraftFees = 0;
        this.interestOnlyPayments = 0;
        this.principalPayments = 0;
        this.behavioralTriggers = [];
        this.rolloverDefaultSelected = false;
        this.tribalCharterClaimed = false;
        this.rentABankUsed = false;
    }
    
    record(type, data = "") {
        const timestamp = new Date().toISOString();
        console.log(`Recorded ${type} at ${timestamp}: ${data}`);
        // Additional logic for recording specific types
        if (type === "SpecificDisclosureMade") {
            this.record("SpecificDisclosureMade", disclosure);
        }
    }


    consentScore() {
        let score = 100;
        const penalties = {
            NO_CAPACITY_CONFIRMED: 50,
            NO_DISCLOSURE: 40,
            QUIZ_FAILED: 30,
            NO_QUIZ: 15,
            NOT_VOLUNTARY: 25,
            NO_AUTH: 50,
            DARK_PATTERN: 8,
        };
        const rewards = {
            SAFEGUARD: 4,
        };


        // Pillar 1: Capacity
        if (!this.capacityConfirmed_Age || !this.capacityConfirmed_SoundMind) score -= penalties.NO_CAPACITY_CONFIRMED;
        // Pillar 2: Disclosure
        if (!this.fullDisclosureProvided) score -= penalties.NO_DISCLOSURE;
        if (this.aprHiddenInitially) score -= 15; // Extra penalty
        // Pillar 3: Comprehension
        if (this.quizAttemptsTotal > 0 && !this.quizPassedOverall) score -= penalties.QUIZ_FAILED;
        else if (this.quizAttemptsTotal === 0 && this.fullDisclosureProvided) score -= penalties.NO_QUIZ;
        // Pillar 4: Voluntariness
        if (!this.voluntarinessAffirmedByDeclaration) score -= penalties.NOT_VOLUNTARY;
        // Pillar 5: Authorization
        if (!this.consentGiven) score -= penalties.NO_AUTH;
       
        score -= this.darkPatternsEncountered.length * penalties.DARK_PATTERN;
        score += this.ethicalSafeguardsApplied.length * rewards.SAFEGUARD;


        return Math.max(0, Math.min(100, score));
    }

    // NEW: Cumulative Cost Tracking Methods
    addCost(type, amount, description) {
        const cost = {
            date: new Date().toISOString(),
            type: type, // 'fee', 'tip', 'nsf', 'insurance', 'penalty'
            amount: amount,
            description: description
        };
        this.costHistory.push(cost);
        
        if (type === 'fee') this.cumulativeFeesPaid += amount;
        if (type === 'tip') this.cumulativeTipsPaid += amount;
        this.totalInteractions++;
    }
    
    getCumulativeCost() {
        return this.costHistory.reduce((total, cost) => total + cost.amount, 0);
    }
    
    getCostBreakdown() {
        const breakdown = {};
        this.costHistory.forEach(cost => {
            if (!breakdown[cost.type]) breakdown[cost.type] = 0;
            breakdown[cost.type] += cost.amount;
        });
        return breakdown;
    }

    // NEW: Fee-First Repayment Methods
    enableFeeFirstRepayment() {
        this.feeFirstRepaymentEnabled = true;
        this.principalRemaining = this.amount;
        this.feesOutstanding = this.fee;
        this.nextPaymentType = 'fee-only';
    }
    
    processFeeOnlyPayment() {
        if (this.feesOutstanding > 0) {
            const payment = this.feesOutstanding;
            this.feesOutstanding = 0;
            this.addCost('fee', payment, 'Fee-only payment processed');
            return payment;
        }
        return 0;
    }
    
    // NEW: Auto-Debit Consent Methods
    setAutoDebitConsent(preChecked = true) {
        this.autoDebitPreChecked = preChecked;
        this.autoDebitConsentGiven = preChecked;
        this.autoDebitConsentTimestamp = Date.now();
        if (preChecked) {
            this.tagDarkPattern("AutoDebitConsent_PreChecked");
        }
    }

    // Missing methods that are referenced in the code
    tagDarkPattern(patternName) {
        if (!this.darkPatternsEncountered) this.darkPatternsEncountered = [];
        this.darkPatternsEncountered.push(patternName);
        console.log(`Dark pattern logged: ${patternName}`);
    }
    
    tagEthicalSafeguard(safeguardName) {
        if (!this.ethicalSafeguardsApplied) this.ethicalSafeguardsApplied = [];
        this.ethicalSafeguardsApplied.push(safeguardName);
        console.log(`Ethical safeguard logged: ${safeguardName}`);
    }
    
    addEducationalModuleShown(moduleName) {
        if (!this.educationalModulesShown) this.educationalModulesShown = [];
        this.educationalModulesShown.push(moduleName);
    }
    
    addSpecificDisclosureMade(disclosure) {
        if (!this.specificDisclosuresMade) this.specificDisclosuresMade = [];
        this.specificDisclosuresMade.push(disclosure);
        this.record("SpecificDisclosureMade", disclosure);
    }
    
    exportJson() {
        const data = JSON.stringify(this, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'loan_session_export.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // NEW: Tip-vs-Interest Model methods (Earnin-style)
    enableTipModel(pressureLevel = 'medium') {
        this.tipModelActive = true;
        this.tagDarkPattern(`TipModel_Enabled_Pressure_${pressureLevel}`);
        console.log(`Tip model activated with ${pressureLevel} pressure level`);
    }
    
    addVoluntaryTip(amount, pressureApplied = false) {
        this.voluntaryTipAmount += amount;
        this.addCost('tip', amount, 'Voluntary tip (disguised interest)');
        if (pressureApplied) {
            this.tipPressureEncountered++;
            this.socialPressureScore += 15;
            this.tagDarkPattern('TipPressure_SocialManipulation');
        }
        // Calculate effective APR including tips (for educational purposes)
        const totalCost = this.fee + this.voluntaryTipAmount;
        this.tipEffectiveAPR = LoanCore.calculateAPR(this.amount, totalCost, this.termDays);
        if (this.tipEffectiveAPR > 300) {
            this.usuryCapEvaded = true;
            this.tagDarkPattern('UsuryEvasion_TipModel_Over300APR');
        }
    }
    
    // NEW: CFPB Payment Provisions methods (12 CFR 1041.3)
    attemptACHWithdrawal(availableFunds, paymentAmount) {
        this.achAttemptCount++;
        if (availableFunds < paymentAmount) {
            this.achFailureCount++;
            const overdraftFee = 35; // Typical bank overdraft fee
            this.achOverdraftFees += overdraftFee;
            this.addCost('nsf', overdraftFee, `Overdraft fee - ACH attempt ${this.achAttemptCount}`);
            
            // CFPB Rule: After 2 failed attempts, new authorization required
            if (this.achFailureCount >= 2 && !this.newAuthorizationRequired) {
                this.newAuthorizationRequired = true;
                this.tagDarkPattern('CFPB_Rule_TwoFailures_NewAuthRequired');
            }
            
            // Track violations if continuing without new auth
            if (this.achFailureCount > 2 && !this.newAuthorizationRequired) {
                this.cfpbViolationCount++;
                this.cfpbRuleCompliant = false;
                this.cfpbRuleViolations.push(`Attempted ACH withdrawal #${this.achAttemptCount} without new authorization (violates 12 CFR 1041.3)`);
                this.tagDarkPattern('CFPB_Violation_ExcessiveACH_12CFR1041_3');
            }
            
            return { success: false, overdraftFee: overdraftFee };
        }
        return { success: true, overdraftFee: 0 };
    }
    
    // NEW: Enhanced fee-first repayment methods
    enableFeeFirstAllocation() {
        this.feeFirstRepaymentEnabled = true;
        this.principalRemaining = this.amount;
        this.feesOutstanding = this.fee;
        this.tagDarkPattern('FeeFirst_Allocation_Enabled');
    }
    
    applyPaymentFeeFirst(paymentAmount) {
        this.feeFirstPayments++;
        let appliedToFees = 0;
        let appliedToPrincipal = 0;
        
        if (this.feesOutstanding > 0) {
            appliedToFees = Math.min(paymentAmount, this.feesOutstanding);
            this.feesOutstanding -= appliedToFees;
            paymentAmount -= appliedToFees;
            
            // Only apply to principal if all fees are paid
            if (paymentAmount > 0 && this.feesOutstanding === 0) {
                appliedToPrincipal = Math.min(paymentAmount, this.principalRemaining);
                this.principalRemaining -= appliedToPrincipal;
                this.principalTouchedCount++;
            }
        }
        
        // Track if principal never gets touched (debt trap indicator)
        if (appliedToPrincipal === 0 && this.feeFirstPayments > 3) {
            this.tagDarkPattern('DebtTrap_PrincipalNeverReduced');
        }
        
        return { appliedToFees, appliedToPrincipal };
    }
    
    // NEW: Rollover pattern tracking (Texas data simulation)
    initiateRolloverSequence() {
        this.rolloverSequenceCount++;
        
        // Generate new fees for rollover (mimicking Texas pattern)
        const rolloverFee = this.amount * 0.15; // 15% rollover fee
        this.feesOutstanding += rolloverFee;
        this.addCost('rollover', rolloverFee, `Rollover fee #${this.rolloverSequenceCount}`);
        
        // Calculate rollover volume ratio (Texas: $2.01B rollovers vs $1.08B initial)
        this.rolloverVolumeRatio = this.getCumulativeCost() / this.amount;
        
        // Track if matching Texas pattern (1.86 ratio)
        if (this.rolloverVolumeRatio > 1.8) {
            this.texasRolloverPattern = true;
            this.tagDarkPattern('TexasRolloverPattern_Exceeded_1_86_Ratio');
        }
        
        this.tagDarkPattern(`Rollover_Sequence_${this.rolloverSequenceCount}`);
    }
    
    // NEW: Usury cap evasion methods
    claimTribalSovereignty(tribeName = 'Generic Tribal Entity') {
        this.tribalSovereigntyClaimed = true;
        this.stateAPRCapEvaded = true;
        this.evasionMethodsUsed.push('Tribal Sovereignty');
        this.tagDarkPattern(`TribalSovereignty_Claimed_${tribeName.replace(/\s+/g, '_')}`);
        this.legalLoopholeExploitations.push(`Claimed tribal sovereignty under ${tribeName} to evade state APR caps`);
    }
    
    useOutOfStateServicing(servicingState = 'Delaware') {
        this.outOfStateServicingUsed = true;
        this.stateAPRCapEvaded = true;
        this.evasionMethodsUsed.push('Out-of-State Servicing');
        this.tagDarkPattern(`OutOfState_Servicing_${servicingState}`);
        this.legalLoopholeExploitations.push(`Loan serviced from ${servicingState} to exploit regulatory arbitrage`);
    }
    
    useFlatFeeEvasion() {
        this.flatFeeEvasionUsed = true;
        this.stateAPRCapEvaded = true;
        this.evasionMethodsUsed.push('Flat Fee vs Interest');
        this.tagDarkPattern('FlatFee_Evasion_UsuryCapBypass');
        this.legalLoopholeExploitations.push('Used flat fee structure to avoid state usury caps on interest');
    }
    
    useRentABankScheme(bankName = 'Cross River Bank') {
        this.rentABankSchemeUsed = true;
        this.stateAPRCapEvaded = true;
        this.evasionMethodsUsed.push('Rent-a-Bank');
        this.tagDarkPattern(`RentABank_Scheme_${bankName.replace(/\s+/g, '_')}`);
        this.legalLoopholeExploitations.push(`Used rent-a-bank scheme with ${bankName} to export permissive state laws`);
    }
    
    // NEW: Advanced UI manipulation methods
    triggerProgressBarReset(fakeProgress = true) {
        this.progressBarResets++;
        this.uiDeceptionScore += 10;
        if (fakeProgress) {
            this.tagDarkPattern('UI_ProgressBar_FakeReset_OnRollover');
        }
    }
    
    addCountdownUrgency(timeLimit = 300) { // 5 minutes default
        this.countdownTimerExposures++;
        this.uiDeceptionScore += 15;
        this.tagDarkPattern(`UI_CountdownUrgency_${timeLimit}sec`);
    }
    
    hideRealCosts() {
        this.hiddenCostRevelations++;
        this.uiDeceptionScore += 20;
        this.tagDarkPattern('UI_HiddenCosts_RequireUserAction');
    }
    
    buryLegalNotice(noticeType = 'APR_Disclosure') {
        this.legalNoticesBypassed++;
        this.uiDeceptionScore += 25;
        this.tagDarkPattern(`UI_LegalNotice_Buried_${noticeType}`);
    }
    
    // NEW: Comprehensive compliance failure tracking
    recordComplianceFailure(ruleType, description, cfr = null) {
        const failure = {
            type: ruleType,
            description: description,
            cfr: cfr,
            timestamp: new Date().toISOString()
        };
        this.complianceFailures.push(failure);
        
        if (cfr) {
            this.cfpbRuleViolations.push(`${cfr}: ${description}`);
        }
        
        this.regulatoryEvasionScore = Math.min(100, this.regulatoryEvasionScore + 10);
    }
    
    // NEW: Enhanced Earnin-Style Tip Processing
    processEarninStyleTip(tipAmount, advanceAmount, termDays) {
        if (tipAmount > 0) {
            const effectiveAPR = LoanCore.calculateEffectiveAPR(advanceAmount, 0, tipAmount, termDays);
            this.addCost('tip', tipAmount, `Voluntary tip: $${tipAmount} (${effectiveAPR.toFixed(1)}% APR)`);
            this.tagDarkPattern(`EarninTip_${effectiveAPR.toFixed(0)}APR`);
            
            // Track tip pressure tactics
            if (tipAmount >= advanceAmount * 0.1) { // 10%+ tip
                this.tagDarkPattern('EarninTip_ExcessivePressure');
                this.uiManipulationAttempts++;
            }
            
            return effectiveAPR;
        }
        return 0;
    }
    
    // NEW: CFPB-Compliant ACH Attempt Tracking
    attemptACHWithdrawal(amount, attemptNumber) {
        const maxLegalAttempts = 2; // Per 12 CFR 1041.3
        
        if (attemptNumber > maxLegalAttempts) {
            this.tagDarkPattern(`ACH_IllegalAttempt_${attemptNumber}`);
            this.legalLoopholesExploited.push(`CFPB_Rule_Violation_12CFR1041.3`);
            this.addCost('violation', 0, `Illegal ACH attempt #${attemptNumber} (violates CFPB rule)`);
        }
        
        // Simulate overdraft scenario
        const userBalance = Math.random() * amount * 2; // Random balance simulation
        if (userBalance < amount) {
            this.overdraftIncidents++;
            const overdraftFee = 35; // Typical bank overdraft fee
            this.totalOverdraftFees += overdraftFee;
            this.addCost('nsf', overdraftFee, `Overdraft fee from ACH attempt #${attemptNumber}`);
            return false; // Failed withdrawal
        }
        
        return true; // Successful withdrawal
    }
    
    // NEW: Fee-First Repayment Processing (Texas Model)
    processFeeFirstPayment(paymentAmount) {
        let remaining = paymentAmount;
        let feesPaid = 0;
        let principalPaid = 0;
        
        // Apply to fees first
        if (this.feesOutstanding > 0 && remaining > 0) {
            const feePayment = Math.min(remaining, this.feesOutstanding);
            this.feesOutstanding -= feePayment;
            feesPaid = feePayment;
            remaining -= feePayment;
            this.interestOnlyPayments++;
            this.addCost('fee', feePayment, 'Fee-first payment allocation');
        }
        
        // Apply remainder to principal (if any)
        if (remaining > 0 && this.principalRemaining > 0) {
            const principalPayment = Math.min(remaining, this.principalRemaining);
            this.principalRemaining -= principalPayment;
            principalPaid = principalPayment;
            this.principalPayments++;
        }
        
        // Track if payment made no progress on principal
        if (feesPaid > 0 && principalPaid === 0) {
            this.tagDarkPattern('FeeFirst_NoPrincipalReduction');
        }
        
        return {
            feesPaid: feesPaid,
            principalPaid: principalPaid,
            remainingBalance: remaining,
            principalRemaining: this.principalRemaining,
            feesRemaining: this.feesOutstanding
        };
    }
    
    // NEW: Rollover Trap with Countdown Timer
    offerRefinanceWithCountdown(currentBalance, userBalance) {
        const canAffordFullPayment = userBalance >= currentBalance;
        const refinanceFee = this.amount * 0.15; // 15% refinance fee
        
        if (!canAffordFullPayment) {
            // Create time pressure
            const countdownMinutes = 5; // 5-minute countdown
            this.tagDarkPattern('CountdownUrgency_RefinanceOffer');
            this.behavioralTriggers.push('time_pressure');
            this.uiManipulationAttempts++;
            
            // Pre-select rollover option
            this.rolloverDefaultSelected = true;
            this.tagDarkPattern('Rollover_PreSelected_Default');
            
            // Track as debt trap offer
            this.addCost('potential_fee', refinanceFee, `Refinance offer: $${refinanceFee} to extend loan`);
            
            return {
                offered: true,
                fee: refinanceFee,
                countdown: countdownMinutes,
                preSelected: true,
                effectiveAPR: LoanCore.calculateAPR(this.amount, refinanceFee, 14)
            };
        }
        
        return { offered: false };
    }
    
    // NEW: Hidden Cumulative Cost Revelation
    revealHiddenCosts() {
        const costBreakdown = this.getCostBreakdown();
        const totalCost = this.getCumulativeCost();
        const costRatio = totalCost / this.amount;
        
        // Track cost revelation as educational moment
        this.tagDarkPattern('HiddenCosts_Revealed');
        
        return {
            totalCost: totalCost,
            costRatio: costRatio,
            breakdown: costBreakdown,
            isExcessive: costRatio > 1.0, // Costs exceed principal
            timesOriginalLoan: costRatio,
            hiddenUntilNow: true
        };
    }
    
    // NEW: Progress Bar Deception Tracking
    updateMisleadingProgress(rolloverNumber) {
        // Simulate progress bar that resets on each rollover
        const fakeProgress = (rolloverNumber % 10) * 10; // Resets every 10 rollovers
        
        this.tagDarkPattern('ProgressBar_Misleading_Reset');
        this.uiManipulationAttempts++;
        this.behavioralTriggers.push('progress_illusion');
        
        // Track user psychology manipulation
        return {
            displayedProgress: fakeProgress,
            actualProgress: 0, // Principal never decreases
            deceptionLevel: 'high'
        };
    }
    
    // NEW: Legal Notice Simulation (Tribal/Rent-a-Bank)
    generateLegalNotice(evasionMethod) {
        let notice = '';
        
        switch (evasionMethod) {
            case 'tribal_sovereignty':
                this.tribalCharterClaimed = true;
                this.legalLoopholesExploited.push('tribal_sovereignty');
                notice = "This loan is offered under the authority of [Tribal Charter Name]. As a sovereign nation, tribal law may apply and state interest rate caps may not be applicable to this transaction.";
                this.tagDarkPattern('TribalSovereignty_FakeCharter');
                break;
                
            case 'rent_a_bank':
                this.rentABankUsed = true;
                this.legalLoopholesExploited.push('rent_a_bank');
                notice = "This loan is originated by [Bank Name], a federally chartered bank located in Delaware. Federal law may preempt state regulations.";
                this.tagDarkPattern('RentABank_FederalPreemption');
                break;
                
            case 'service_fee':
                this.legalLoopholesExploited.push('fee_vs_interest');
                notice = "This transaction involves service fees, not interest charges. State usury laws may not apply to service fees.";
                this.tagDarkPattern('ServiceFee_UsuryEvasion');
                break;
        }
        
        return notice;
    }
    
    // NEW: Post-Simulation Teaching Report Generation
    generateComprehensiveReport() {
        const debtTrapMetrics = LoanCore.calculateDebtTrapMetrics(this);
        const costBreakdown = this.getCostBreakdown();
        
        return {
            // Financial Impact
            originalAmount: this.amount,
            totalCostPaid: this.getCumulativeCost(),
            costAsPercentOfLoan: (this.getCumulativeCost() / this.amount) * 100,
            effectiveAPR: LoanCore.calculateEffectiveAPR(this.amount, costBreakdown.fee || 0, costBreakdown.tip || 0, this.termDays),
            
            // Debt Trap Analysis
            debtTrapScore: debtTrapMetrics.debtTrapScore,
            renewalsUsed: this.renewalsTaken,
            principalReductionRate: debtTrapMetrics.principalReductionRate,
            averageFeePerRenewal: this.renewalsTaken > 0 ? this.getCumulativeCost() / this.renewalsTaken : 0,
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
    
    // Instance methods for knowledge assessment and learning progress
    recordKnowledgeAssessment(questionType, userAnswer, correctAnswer, correct) {
        const assessment = {
            timestamp: new Date().toISOString(),
            questionType: questionType,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            correct: correct,
            context: this.getCurrentStep()
        };
        
        this.knowledgeAssessments.push(assessment);
        
        // Update learning objectives
        if (correct) {
            switch(questionType) {
                case 'apr_calculation':
                    this.learningObjectives.apr_calculation_skills = true;
                    break;
                case 'usury_law':
                    this.learningObjectives.usury_law_understanding = true;
                    break;
                case 'dark_pattern':
                    this.learningObjectives.dark_pattern_recognition = true;
                    break;
                case 'alternatives':
                    this.learningObjectives.alternative_awareness = true;
                    break;
                case 'regulations':
                    this.learningObjectives.regulatory_framework_knowledge = true;
                    break;
                case 'consumer_rights':
                    this.learningObjectives.consumer_rights_awareness = true;
                    break;
            }
        }
        
        // Notify research analytics
        if (this.researchAnalytics) {
            this.researchAnalytics.recordKnowledgeAssessment(questionType, correct, userAnswer, correctAnswer);
        }
        
        return correct;
    }
    
    calculateLearningProgress() {
        const totalObjectives = Object.keys(this.learningObjectives).length;
        const completedObjectives = Object.values(this.learningObjectives).filter(Boolean).length;
        return (completedObjectives / totalObjectives) * 100;
    }
    
    getCurrentStep() {
        // Return current simulation step for context
        return window.currentSimulationStep || 'unknown';
    }
    
    generateResearchSummary() {
        return {
            sessionId: this.sessionId,
            darkPatterns: this.darkPatternsEncountered.length,
            ethicalSafeguards: this.ethicalSafeguardsApplied.length,
            complianceViolations: this.complianceViolations.length,
            educationalModules: this.educationalModulesShown.length,
            learningProgress: this.calculateLearningProgress(),
            knowledgeScore: this.calculateKnowledgeScore(),
            behavioralInsights: this.analyzeBehavioralData()
        };
    }
    
    calculateKnowledgeScore() {
        if (this.knowledgeAssessments.length === 0) return 0;
        const correct = this.knowledgeAssessments.filter(a => a.correct).length;
        return (correct / this.knowledgeAssessments.length) * 100;
    }
    
    analyzeBehavioralData() {
        return {
            averageDecisionTime: this.calculateAverageDecisionTime(),
            hesitationCount: this.behavioralData.hesitationPoints.length,
            informationSeekingBehavior: this.behavioralData.informationSeeking.length,
            riskAwareness: this.assessRiskAwareness(),
            alternativeConsideration: this.behavioralData.alternativeConsiderations.length > 0
        };
    }
    
    calculateAverageDecisionTime() {
        if (this.behavioralData.decisionTimes.length === 0) return 0;
        const total = this.behavioralData.decisionTimes.reduce((sum, dt) => sum + (dt.value || 0), 0);
        return total / this.behavioralData.decisionTimes.length;
    }
    
    assessRiskAwareness() {
        const riskPerceptions = this.behavioralData.riskPerceptions;
        if (riskPerceptions.length === 0) return 'unknown';
        
        const avgRisk = riskPerceptions.reduce((sum, rp) => sum + (rp.value || 0), 0) / riskPerceptions.length;
        
        if (avgRisk > 7) return 'high_awareness';
        if (avgRisk > 4) return 'moderate_awareness';
        return 'low_awareness';
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

// RECOVERED: Complete LoanCore static methods class
class LoanCore {
    static calculateAPR(principal, fee, termDays) {
        if (principal <= 0 || termDays <= 0) return 0.0;
        return (fee / principal) / termDays * 365.0 * 100.0;
    }

    static generateLoanTermsHash(session, config) {
        // Create a simple hash of key loan terms for logging
        const termsString = `Amt:${session.amount}|Fee:${session.fee}|APR:${session.aprCalculated}|Term:${session.termDays}|State:${config.state}|ConsentPhrase:${config.regulatedExplicitConsentPhraseFull}|Timestamp:${session.consentTimestamp}`;
        let hash = 0;
        for (let i = 0; i < termsString.length; i++) {
            hash = (hash << 5) - hash + termsString.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString();
    }

    static getCurrentTimestamp() {
        return new Date().toISOString();
    }
    
    // NEW: Enhanced APR calculation methods from inspiration code
    static calculateEffectiveAPR(principal, fees, tips, termDays) {
        const totalCost = fees + tips;
        if (principal <= 0 || termDays <= 0) return 0.0;
        return (totalCost / principal) / termDays * 365.0 * 100.0;
    }
    
    // NEW: Simulate auto-debit processing
    static simulateAutoDebitAttempts(session, config, availableFunds) {
        const maxAttempts = config.exploitMaxNSFAttempts || 3;
        const nsfFee = config.exploitNSFFeePerAttemptLender || 35.0;
        let totalNSFFees = 0;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            if (availableFunds < session.totalRepayment) {
                totalNSFFees += nsfFee;
                session.addCost('nsf', nsfFee, `NSF fee - attempt ${attempt}`);
                session.tagDarkPattern(`NSFAttempt_${attempt}`);
            } else {
                break;
            }
        }
        
        return totalNSFFees;
    }
    
    // NEW: Calculate cumulative debt trap metrics
    static calculateDebtTrapMetrics(session) {
        const metrics = {
            totalFeesVsPrincipal: session.getCumulativeCost() / session.amount,
            renewalCount: session.renewalsTaken,
            principalReductionRate: session.principalRemaining / session.amount,
            averageFeePerRenewal: session.renewalsTaken > 0 ? session.getCumulativeCost() / session.renewalsTaken : 0,
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

    // NEW: Research and Compliance Tracking Methods
    static recordComplianceViolation(session, violationType, regulation, description, severity) {
        severity = severity || 'medium';
        const violation = {
            timestamp: new Date().toISOString(),
            type: violationType,
            regulation: regulation,
            description: description,
            severity: severity,
            context: session.currentStep || 'unknown'
        };
        
        if (!session.complianceViolations) session.complianceViolations = [];
        session.complianceViolations.push(violation);
        
        // Notify research analytics if available
        if (session.researchAnalytics) {
            session.researchAnalytics.recordComplianceViolation(violationType, regulation, description);
        }
        
        console.log('⚖️ Compliance Violation Recorded:', violation);
    }
    
    static recordBehavioralData(session, dataType, value, context) {
        context = context || session.currentStep || 'unknown';
        const dataPoint = {
            timestamp: new Date().toISOString(),
            type: dataType,
            value: value,
            context: context
        };
        
        if (!session.behavioralData) {
            session.behavioralData = {
                decisionTimes: [],
                hesitationPoints: [],
                informationSeeking: [],
                riskPerceptions: [],
                alternativeConsiderations: []
            };
        }
        
        // Add to appropriate behavioral data array
        switch (dataType) {
            case 'decision_time':
                session.behavioralData.decisionTimes.push(dataPoint);
                break;
            case 'hesitation':
                session.behavioralData.hesitationPoints.push(dataPoint);
                break;
            case 'info_seeking':
                session.behavioralData.informationSeeking.push(dataPoint);
                break;
            case 'risk_perception':
                session.behavioralData.riskPerceptions.push(dataPoint);
                break;
            case 'alternative_consideration':
                session.behavioralData.alternativeConsiderations.push(dataPoint);
                break;
            default:
                console.log('📊 Behavioral Data Recorded:', dataPoint);
        }
        
        // Notify research analytics
        if (session.researchAnalytics) {
            session.researchAnalytics.recordDecisionPoint(dataType, [], value, 0);
        }
    }
}

// RECOVERED: Export all classes for module system
export { LoanCore, Config, LoanSession, LoanStrategy };
