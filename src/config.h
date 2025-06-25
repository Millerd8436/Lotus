#ifndef LOTUS_CONFIG_H
#define LOTUS_CONFIG_H

#include <string>
#include <vector>

// Forward declaration for complex structures if needed, or define simple ones here
// struct LoanTerms { double principal; double fee; int termDays; /* ... */ };
// struct UserProfile { double incomeMonthly; /* ... */ };

struct Config {
    // --- General Simulation Parameters ---
    std::string state = "";              // 2-letter state code (e.g., "IL", "CO") for specific rules
    double defaultAPR = 36.0;            // Default APR for calculations if not overridden
    int    defaultDaysToRepay = 14;
    bool   exportSession = true;
    std::string sessionExportFileName = "lotus_session.json"; // Base, will be prefixed by mode

    // --- Realistic Exploitative Mode Configuration ---
    double exploitInitialFeeRate = 0.55; // Base percentage for fee calculation
    double exploitRolloverFeeRateIncrease = 0.15; // Additional rate for rollovers
    bool exploitUseTimePressureTactics = true;    // e.g., "Offer expires in 5 minutes!"
    bool exploitShowFakeTestimonials = true;
    bool exploitUseObfuscatedLanguage = true;   // e.g., "Convenience fee" instead of "Interest"
    bool exploitHideFeesInFinePrint = true;
    bool exploitPrecheckOptInExtras = true;   // e.g., Pre-checked "Loan insurance"
    double exploitExtraServiceWeeklyFee = 14.99;
    bool exploitForceArbitration = true;
    bool exploitShareDataWithAffiliates = true;
    bool exploitAggressiveCollectionThreats = true;
    bool exploitMisleadingAPRDisplay = true; // Show weekly cost instead of APR
    bool exploitDifficultRolloverOptOut = true;
    int exploitMaxRollovers = 99; // Effectively unlimited for exploitative mode

    // --- Regulated Ethical Redesign Mode Configuration ---
    // Legal & Regulatory Compliance
    double regulatedMaxAPR = 36.0;        // Default, can be overridden by state rules
    int regulatedMaxLoansPerYear = 5;
    bool regulatedEnforceLoanLimit = true;
    bool regulatedAllowRollover = false;  // Default, state rules can override
    int regulatedMaxRenewals = 1;         // Default, state rules can override (Rawlsian: break debt cycles)
    bool regulatedRequireCoolingOffPeriod = true; // e.g., 3 business days
    int regulatedCoolingOffDays = 3;
    bool regulatedBanArbitration = true;
    bool regulatedShareDataOptInOnly = true; // Data shared only with explicit, separate consent

    // Informed Consent (TILA/Reg Z & Ethical - Kantian Autonomy)
    bool regulatedRequireFullDisclosure = true; // APR, finance charge, total of payments, schedule, rescission
    std::string regulatedTILAHeader = "TRUTH IN LENDING ACT (TILA) DISCLOSURES";
    bool regulatedRequireConsentQuiz = true;    // Comprehension check
    std::string regulatedConsentQuizIntro = "To ensure you understand the terms, please answer a few questions:";
    // Quiz questions and options will be more dynamically handled in the strategy
    std::string regulatedExplicitConsentPhrase = "I UNDERSTAND AND CONSENT TO THESE LOAN TERMS";
    bool regulatedShowRescissionNotice = true;
    std::string regulatedConsentLogFile = "consent_audit_trail.log"; // For logging consent events

    // Rawlsian Fairness Principles
    bool regulatedApplyIncomeCap = true;
    double regulatedIncomeCapPercentage = 20.0; // Loan payment not to exceed % of monthly income
    bool regulatedEnableTieredFees = true;      // Lower fees/APR for lower income brackets
    // (Tiered fee logic will be in strategy, based on income)

    // Millian Welfare/Utilitarianism Principles
    bool regulatedShowLongTermCostTimeline = true; // Cumulative cost over time/renewals
    bool regulatedOfferInstallmentPlan = true;     // Alternative, less harmful repayment
    int regulatedInstallmentMonths = 3;
    bool regulatedWarnExcessiveFees = true;        // If total fees > principal

    // Educational Content Modules
    bool eduProvideUsuryLawInfo = true;
    std::string eduUsuryHistoryFile = "data/usury_history.json"; // Hypothetical data file
    bool eduProvideHarmDataInfo = true;         // Pew/CFPB stats on reborrowing, debt traps
    bool eduProvideStateUsuryMap = true;
    std::string eduStateUsuryMapFile = "data/usury_map.json"; // Hypothetical
    bool eduConductUsuryQuiz = false;           // Optional quiz on state laws
    std::string eduLearningObjectivesFile = "data/learning_objectives.json"; // Hypothetical
    bool eduShowReborrowStats = true;
    bool eduCompareToCreditUnion = true;
    bool eduShowDarkPatternExamples = true;     // For awareness
    bool eduPrintKantLecture = true;
    bool eduPrintRawlsLecture = true;
    bool eduPrintMillLecture = true;
    // bool eduPromptDeliberationHabermas = false; // More advanced, stub for now
    // bool eduAssessCapabilitiesNussbaum = false; // More advanced, stub for now

    // State-Specific Overrides (examples, more can be loaded from a data file)
    // These are illustrative; a more robust system would load these from JSON
    bool stateSpecificSDPilot = false; // For South Dakota 0% extension
    bool stateSpecificDECase = false;  // For Delaware usury cap enforcement context

    // Constructor to initialize or load from a file if desired
    Config() {
        // Default values are set above
        // Could load overrides from a master config file here
    }
};

#endif
