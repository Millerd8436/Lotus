#ifndef LOTUS_CONFIG_H
#define LOTUS_CONFIG_H

#include <string>
#include <vector>
#include <map>

// Structure for detailed state-specific rules, aligning with your provided table and concepts
struct StateSpecificRules {
    std::string stateCode;
    std::string stateName; 
    double aprCap = -1.0; 
    int maxTermDays = -1; 
    int minTermDays = -1; 
    int maxRollovers = -1; 
    bool allowRollover = true; 
    double maxOutstandingLoanAmount = -1.0; 
    bool criminalEnforcementForUsury = false; 
    double auditProbability = 0.05; 
    int coolingOffDays = 0; 
    bool mandatoryDatabaseCheck = false; 
    
    double feeCapFixed = -1.0;      
    double feeCapPercentOfPrincipal = -1.0;    
    double coFeeCapFirst300Percent = 20.0; 
    double coFeeCapExcessPercent = 7.5;    
    int ilWaitDaysAfter45Indebtedness = 7; 
    
    bool txCABLoopholeApplies = false; 
    double txCABFeeRateAsPercentOfPrincipal = 0.25; 

    std::string keyStatuteCitation = "N/A"; 
    std::string regulatoryBody = "State Dept. of Financial Institutions / Attorney General";
    std::string specificNotes = ""; 
    int maxLoansPerYear = -1; 
    double lateFeeMaxFixed = 15.0;
    double lateFeeMaxPercent = 0.05; 
    int lateFeeGracePeriodDays = 10;
    bool installmentPlanAllowedByState = true; 
    int maxInstallmentTerms = 12; 
    bool requiresAbilityToRepayAnalysisByState = true; 
};

struct Config {
    // --- General Simulation Parameters ---
    std::string state = ""; 
    double defaultAPR = 36.0; 
    int    defaultDaysToRepay = 14;
    bool   exportSession = true;
    std::string sessionExportFileNameBase = "lotus_session_v_HOLISTIC_FRAMEWORK_V2"; // New version
    std::string consentLogFile = "lotus_informed_consent_audit_HOLISTIC_V2.log";
    bool enableAccessibilityMode = false; 
    std::string language = "en"; 

    // --- Capstone Educational Features ---
    bool capstoneKnowledgePreTest = true;
    bool capstoneKnowledgePostTest = true;
    bool capstoneJournalPrompt = true;
    std::string capstoneScenarioId = ""; 
    std::string capstoneScenariosDataFile = "data/capstone_scenarios_v6.json"; 
    std::string capstoneLearningObjectivesDataFile = "data/capstone_learning_objectives_v7.json"; 
    bool capstoneUserSurveyPrompt = true; 
    bool capstonePolicyReportExport = false; 
    std::string capstonePolicyReportFile = "lotus_policy_report_holistic_v2.md";

    // --- UI/UX Realism Flags ---
    bool uiExploitClutteredInterface = true; 
    bool uiExploitAggressivePopups = true;   
    int  uiExploitCountdownTimerSeconds = 25; // Even more aggressive
    bool uiRegulatedClearStepIndicators = true; 
    bool uiRegulatedProgressiveDisclosure = true; 
    bool uiShowInteractiveTermDefinitions = true; 

    // --- Realistic Exploitative Mode Configuration (Flags for each of the 12 mechanisms + details) ---
    // Mechanism 1: Endless Rollover “Debt Trap”
    bool exploitEnableEndlessRollovers = true;
    double exploitRolloverFeeFlat = 250.0; // Further increased
    double exploitRolloverRatePercent = 0.70; // Further increased
    // Mechanism 2: Interest-Only “Auto-Renewal” Payments
    bool exploitEnableInterestOnlyAutoRenewal = true;
    // Mechanism 3: Hidden Fees and Fee Layering Loopholes
    bool exploitEnableHiddenFeesAndLayering = true;
    std::vector<std::pair<std::string, double>> exploitLayeredFees = { 
        {"Account Origination & Verification Premium Plus", 199.99}, {"Instantaneous Funding & Global Transfer Surcharge", 0.20}, 
        {"Proprietary Algorithmic Risk & Behavioral Assessment Fee", 139.99}, {"Mandatory Platform Maintenance, Security & Secure Access Fee", 69.99},
        {"Digital Document Preparation, E-Signature Verification & Quantum-Encrypted Cloud Archival Surcharge", 59.99}, 
        {"Regulatory Compliance, Reporting & Inter-Jurisdictional Harmonization Offset Premium", 49.99},
        {"Exclusive VIP Customer Service Initiation, Prioritization & Loyalty Program Enrollment Fee", 44.99}
    };
    double exploitExtraServiceTotalWeeklyFee = 179.99; 
    // Mechanism 4: Misleading Cost Display (APR Evasion and Small Print)
    bool exploitEnableMisleadingCostDisplay = true;
    // Mechanism 5: “Optional” Tips or Donations Disguising Interest
    bool exploitEnableOptionalTipsDisguiseInterest = true;
    double exploitSuggestedTipPercentage = 55.0; // Outrageously aggressive
    // Mechanism 6: Fine-Print Consent & “Dark Pattern” Disclosures
    bool exploitEnableFinePrintConsent = true;
    // Mechanism 7: Automatic Bank Debit & Overdraft Exploitation
    bool exploitEnableAutoBankDebitAndOverdraft = true;
    int exploitMaxNSFAttempts = 35; // Even more attempts
    double exploitNSFFeePerAttemptLender = 115.0; 
    // Mechanism 8: Misleading and Aggressive Collection Threats
    bool exploitEnableMisleadingCollectionThreats = true;
    // Mechanism 9: Misleading Testimonials and Advertising “Success Stories”
    bool exploitEnableMisleadingTestimonials = true;
    // Mechanism 10: Personal Data Exploitation and Credit Scoring Loopholes
    bool exploitEnablePersonalDataExploitation = true;
    // Mechanism 11: Targeted Marketing to Vulnerable Communities
    bool exploitEnableTargetedMarketingVulnerable = true;
    // Mechanism 12: Rent-a-Bank and Jurisdiction Loopholes
    bool exploitEnableRentABankLoophole = true;
    std::string exploitRentABankCharterState = "SD"; // South Dakota also cited for this
    // Additional general exploitative flags
    bool exploitUseTimePressureTacticsExtreme = true;
    bool exploitUseObfuscatedLanguageExtreme = true;  
    bool exploitPrecheckMultipleOptInExtras = true; 
    bool exploitAggressiveCollectionLanguageExtreme = true;
    std::string exploitDefaultRolloverOptOutMethod = "NotarizedFaxToDiscontinuedNumberAndCarrierPigeonToVolcanoLairAndTelepathicMessageDuringLunarEclipseAndFirstbornPromiseAndSwearFealtyToOurOffshoreAlgorithmAndSolveThreeRiddlesAndPostBond"; 
    bool exploitDynamicPricingBasedOnDesperation = true; 
    bool exploitForceArbitration = true; 
    bool exploitShareDataWithAffiliatesExtensively = true; 

    // --- Regulated Ethical Redesign Mode Configuration ---
    double regulatedBaseAPR = 25.0; 
    double regulatedMaxAPRCap = 36.0;  
    int regulatedMaxLoansPerYear = 3; 
    bool regulatedEnforceLoanLimit = true;
    bool regulatedAllowRollover = false; 
    int regulatedMaxRenewals = 0;        
    bool regulatedRequireCoolingOffPeriodExtended = true; 
    int regulatedCoolingOffDays = 3; 
    bool regulatedBanForcedArbitration = true;
    bool regulatedStrictOptInForDataSharing = true;
    bool regulatedMandatoryAffordabilityScreeningComprehensive = true; 
    bool regulatedAbilityToRepayLogicDetailed = true; 
    bool regulatedMilitaryLendingActApplies = false; 
    bool regulatedEnforcePaymentToIncomeRatio = true; 
    double regulatedPaymentToIncomeRatioCap = 0.05; 
    double regulatedDebtToIncomeRatioCap = 0.43; 

    // Informed Consent (TILA/Reg Z & Ethical - Kantian Autonomy, Beauchamp & Childress)
    bool regulatedPillarCompetenceCheck = true;       
    bool regulatedPillarFullDisclosure = true;        
    bool regulatedPillarComprehensionQuiz = true;     
    bool regulatedPillarVoluntarinessCheck = true;    
    bool regulatedPillarAuthorization = true;         
    
    std::string regulatedTILAHeaderFull = "IMPORTANT CONSUMER CREDIT DISCLOSURES (Federal Truth in Lending Act - TILA, 15 U.S.C. §1601 et seq. & Regulation Z, 12 CFR Part 1026) & APPLICABLE STATE DISCLOSURES (e.g., per [State Statute Placeholder])";
    std::string regulatedConsentQuizDetailedIntro = "To ensure you fully understand all material terms, your rights, and the potential consequences of this loan, as required for genuine informed consent under ethical lending practices (Beauchamp & Childress principles: Competence, Disclosure, Understanding, Voluntariness) and consumer protection laws (including TILA and state statutes), please answer the following questions based on the comprehensive disclosures just provided. This is for your protection and to affirm your understanding before you authorize this agreement.";
    std::string regulatedExplicitConsentPhraseFull = "I HEREBY AFFIRM THAT I AM COMPETENT TO MAKE THIS DECISION, HAVE CAREFULLY READ AND FULLY UNDERSTAND ALL THE DISCLOSED LOAN TERMS, COSTS, AND MY RIGHTS, INCLUDING THE APR, FINANCE CHARGE, TOTAL OF PAYMENTS, PAYMENT SCHEDULE, AND CANCELLATION POLICY. I AM ENTERING THIS AGREEMENT VOLUNTARILY, WITHOUT COERCION OR UNDUE PRESSURE, AND I AUTHORIZE THIS LOAN AGREEMENT.";
    bool regulatedShowRescissionNoticeDetailed = true;
    bool regulatedRequireEsignatureSimulation = true; 
    bool regulatedMetaConsentPrompt = true; 
    bool regulatedPromptKantianUniversalizability = true;
    std::string regulatedKantianUniversalizabilityPromptText = "KANTIAN ETHICAL REFLECTION (Autonomy as Self-Legislation & Universalizability): Consider the core terms of this loan (APR, fees, repayment structure). If every lender offered loans under these exact same conditions to everyone in similar circumstances as yourself, could you honestly will this as a universal law that respects the dignity and rational agency of all borrowers? Does this framework treat individuals as 'ends in themselves' rather than mere means to profit? (Reflect briefly before proceeding - your thoughts are for your consideration).";
    bool regulatedPromptMillHarmPrincipleForRollovers = true; 
    std::string regulatedMillHarmPrincipleRolloverPromptText = "MILLIAN ETHICAL REFLECTION (Harm Principle & Utility - Regarding Rollover): If this loan allowed rollovers (even if within legal limits), Mill would ask: Does the option to roll over genuinely prevent greater, immediate harm (e.g., severe consequences of default like eviction) for the borrower, or does it primarily serve to lock them into a cycle of escalating fees, ultimately causing more cumulative harm than good? Justify this specific term if it were applied to you, considering its overall impact on your well-being and financial stability versus the lender's profit.";
    bool regulatedRespectMeterSimulation = true; 

    // Rawlsian Fairness Principles
    bool regulatedApplyIncomeBasedCapsComprehensive = true; 
    bool regulatedEnableTieredFeeStructureForEquity = true;      

    // Millian Welfare/Utilitarianism Principles
    bool regulatedShowLongTermCostTimelineWithRolloverImpactAndAlternatives = true; 
    bool regulatedOfferMultipleInstallmentPlanAlternativesDetailed = true;     
    std::vector<int> regulatedInstallmentMonthOptions = {3, 6, 9, 12}; 
    double regulatedInstallmentPlanAPRCap = 28.0; 
    bool regulatedWarnIfFeesExceedPrincipalStrictAndEarly = true;        
    bool regulatedSimulateSaferAlternativesDetailedComparison = true;     

    // Educational Content Modules
    bool eduProvideUsuryLawDeepDive = true; 
    std::string eduUsuryHistoryDataFile = "data/capstone_usury_history_v7_final.json";
    bool eduProvideEmpiricalHarmDataComprehensive = true; 
    bool eduProvideStateUsuryMapInteractive = true; 
    std::string eduStateUsuryMapDataFile = "data/capstone_state_usury_laws_v7_final.json"; 
    bool eduConductComprehensiveUsuryQuiz = true;    
    std::string eduLearningObjectivesDataFile = "data/capstone_learning_objectives_advanced_v8_final.json"; 
    bool eduShowReborrowStatisticsPewDetailed = true;   
    bool eduCompareToCreditUnionPALsDetailed = true;
    bool eduShowDarkPatternExamplesEducationalDeep = true; 
    bool eduShowFinancialCounselorReferralsLocal = true; 
    std::string eduCounselorContactsDataFile = "data/capstone_counselor_contacts_by_zip_v7.json"; 
    bool eduForceFinancialCounselingIfHighRisk = true; 
    double eduHighRiskAPRThresholdForCounseling = 75.0; 
    bool eduLectureKantianDeontologyInDepth = true;
    bool eduLectureRawlsianJusticeInDepth = true;
    bool eduLectureMillianConsequentialismInDepth = true;
    // From your usury_compliance.h example
    bool complianceFeeLabelGuardrail = true; 
    bool compliancePreemptionCheck = true;   
    bool complianceEnforcementSimulator = true; 

    bool applyStateSpecificRules = true; 
    std::map<std::string, StateSpecificRules> stateRulesDatabase;

    Config() {
        // Populate stateRulesDatabase with ALL states from your table and other mentions
        // This should be as comprehensive as the data you provided.
        stateRulesDatabase["IL"] = {"IL", "Illinois", 36.0, -1, -1, 0, false, 1000.0, true, 0.08, 7, true, -1,-1, 0.0, 0.0, 7, 4, 15.0, 0.05, 10, true, true, "815 ILCS 122/2-5(e-5); 2-30 ban; Illinois Predatory Loan Prevention Act (PLPA)", "Illinois Department of Financial and Professional Regulation (IDFPR)", "Strict 36% APR cap (all-inclusive as per PLPA), no rollovers, 7-day cooling-off after 45 days of indebtedness. Strong consumer protections."};
        stateRulesDatabase["CO"] = {"CO", "Colorado", 36.0, -1, 180, 1, true, 500.0, true, 0.07, 0, false, -1,-1, 20.0, 7.5, -1, 4, 15.0, 0.05, 10, true, true, "Colorado Uniform Consumer Credit Code (UCCC), Proposition 111 (2019)", "Attorney General, Administrator of UCCC", "36% APR cap, allows tiered origination fees (20% on first $300, 7.5% on excess up to $500 loan). Minimum 180-day term for many installment loans, max 1 rollover for certain types."};
        stateRulesDatabase["TX"] = {"TX", "Texas", 10.0, -1, 7, -1, true, -1.0, false, 0.10, 0, true, -1,-1,-1,-1, -1, -1, 15.0, 0.05, 10, false, true, "Tex. Finance Code §393 (CSOs/CABs); §342 (Direct Lenders)", "Office of Consumer Credit Commissioner (OCCC)", "Credit Access Business (CAB) Loophole: Direct lenders capped at 10% APR, but CABs arrange loans with third-party lenders and charge unlimited 'service fees' leading to effective APRs often >600%. Rollovers common via new CAB loans.", true, 0.65};
        stateRulesDatabase["CA"] = {"CA", "California", 460.0, 31, 1, 0, false, 300.0, true, 0.06, 0, true, -1.0, 15.0 ,-1,-1,-1, -1, 15.0, 0.05, 10, true, true, "Cal. Fin. Code §23000 et seq. (California Deferred Deposit Transaction Law)", "Department of Financial Protection and Innovation (DFPI)", "Max loan $300 ($255 net to borrower). Fee capped at 15% of face value (max $45 for $300 loan). For 14-day loan, this is ~460% APR. No rollovers."};
        stateRulesDatabase["FL"] = {"FL", "Florida", 304.0, 31, 7, 0, false, 500.0, false, 0.07, 1, true, 5.0 , 10.0 ,-1,-1,-1, -1, 15.0, 0.05, 10, true, true, "Fla. Stat. Ann. §560.402 et seq.", "Office of Financial Regulation (OFR)", "Fee 10% of amount + $5 verification fee (max). Max loan $500. Single outstanding loan. No rollovers, but new loan after 24hr cooling-off. Effective APR ~304% for $100/14day."};
        stateRulesDatabase["SD"] = {"SD", "South Dakota", 36.0, -1, -1, 1, true, -1.0, false, 0.03, 0, false, -1,-1,-1,-1,-1, -1, 15.0, 0.05, 10, true, true, "SD Codified Laws Ann. §54-4-66 et seq.", "Division of Banking", "36% APR cap. SD Pilot Program allows one-time 0% APR, 30-day extension for eligible borrowers."};
        stateRulesDatabase["DE"] = {"DE", "Delaware", -1.0, -1, -1, -1, true, -1.0, false, 0.02, 0, false, -1,-1,-1,-1,-1, -1, 15.0, 0.05, 10, true, true, "Del. Code Ann. tit. 5, §2227 et seq.", "Office of the State Bank Commissioner", "No specific APR cap for payday loans; often used for 'rent-a-bank' due to favorable bank charter laws for out-of-state lending."};
        stateRulesDatabase["AL"] = {"AL", "Alabama", 456.0, 31, 10, 0, false, 500.0, false, 0.04, 0, false, 17.50 , -1.0, -1.0, -1.0, -1, -1, 15.0, 0.05, 10, true, true, "Ala. Code §5-19A-1 et seq.", "State Banking Department", "Fee $17.50 per $100. For 14-day loan, ~456% APR. Max $500. No rollovers."};
        stateRulesDatabase["AK"] = {"AK", "Alaska", 391.0, 30, 14, 2, true, 500.0, false, 0.04, 0, false, -1.0, 15.0 , -1.0, -1.0, -1, -1, 15.0, 0.05, 10, true, true, "Alaska Stat. §06.50.010 et seq.", "Division of Banking and Securities", "Fee $15 per $100 or 15% of principal, whichever is less. Max $500. Max 2 rollovers."};
        stateRulesDatabase["MT"] = {"MT", "Montana", 36.0, 60, 1, 1, true, 300.0, true, 0.05, 0, false, 50.0 , -1.0, -1.0, -1.0, -1, -1, 15.0, 0.05, 10, true, true, "Mont. Code Ann. §31-1-701 et seq.", "Division of Banking and Financial Institutions", "36% APR cap. Max loan $300. Max 1 rollover. Max $50 origination fee allowed."};
        stateRulesDatabase["NJ"] = {"NJ", "New Jersey", 30.0, 31, 1, 0, false, -1.0, true, 0.06, 0, false, 10.0 , -1.0, -1.0, -1.0, -1, -1, 15.0, 0.05, 10, true, true, "N.J. Stat. Ann. §17:15A-47; N.J. Stat. Ann. § 2C:21-19 (Criminal Usury)", "Department of Banking and Insurance", "30% APR cap on check cashing loans (often used for payday-like products). Criminal usury cap is also 30%."};
        stateRulesDatabase["WA"] = {"WA", "Washington", 390.0, 45, 7, 0, false, 700.0, false, 0.05, 7, true, -1.0, 15.0 , -1.0, -1.0, -1, -1, 15.0, 0.05, 10, true, true, "Wash. Rev. Code Ann. §31.45.010 et seq.", "Department of Financial Institutions", "Fee 15% on first $500, 10% on excess. Max loan $700 or 30% of gross monthly income. No rollovers. Min term 7 days. Cooling-off 7 days after 8th loan in 12 months."};
        stateRulesDatabase["WY"] = {"WY", "Wyoming", -1.0, 30, 1, -1, true, -1.0, false, 0.04, 0, false, -1.0, 20.0 , -1.0, -1.0, -1, -1, 15.0, 0.05, 10, true, true, "Wyo. Stat. Ann. §40-14-362 et seq.", "Division of Banking", "No APR cap. Fee 20% per month or $30, whichever greater. Unlimited rollovers effectively."};
        stateRulesDatabase["GEN"] = {"GEN", "General/Federal Baseline", defaultAPR, defaultDaysToRepay, 7, regulatedMaxRenewals, regulatedAllowRollover, 1000.0, false, 0.01, regulatedCoolingOffDays, false, -1,-1,-1,-1,-1,-1,-1, -1, 15.0, 0.05, 10, true, true, "TILA/Reg Z, CFPB Guidance, MLA (if applicable)", "Federal Agencies (CFPB, FTC, OCC, FDIC)", "Default rules based on common federal guidelines and ethical best practices."};
    }

    StateSpecificRules getCurrentStateRules() const {
        if (applyStateSpecificRules && !state.empty() && stateRulesDatabase.count(state)) {
            return stateRulesDatabase.at(state);
        }
        return stateRulesDatabase.at("GEN"); 
    }
};

#endif
    }
};

#endif
