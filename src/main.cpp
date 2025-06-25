#include "config.h"
#include "ui.h"
#include "loan_session.h"
#include "strategies/exploit.h"   
#include "strategies/regulated.h" 
#include <memory>
#include <cstdlib> 
#include <ctime>   
#include <algorithm> 
#include <vector>   
#include <string> 
#include <fstream> 

// Definition for the global UI helper variable
// This allows UI functions to know the current mode if needed for context-specific display.
// It's set after mode selection in main().
std::string UI::active_mode_name_str_ui_helper; 

// Helper to generate help text from Config
void printHelp(const Config& defaultConfig) {
    UI::show("Lotus CLI Payday Loan Simulator Help (Holistic Framework Overhaul - vFINAL_FRAMEWORK):");
    UI::show("Usage: ./lotus [--mode=MODE] [--loan=AMOUNT] [--state=ST] [--term=DAYS] [OTHER_FLAGS...]");
    UI::show("\nMODES:");
    UI::show("  --mode=exploitative           : Simulate Realistic Exploitative lending practices.");
    UI::show("  --mode=regulated_ethical      : Simulate a Regulated Ethical Redesign of lending.");
    
    UI::show("\nGENERAL OPTIONS:");
    UI::show("  --loan=<amount>               : Preset loan principal amount (e.g., 300).");
    UI::show("  --state=<ST>                  : Apply 2-letter state code regulations (e.g., IL, CO, TX).");
    UI::show("  --term=<days>                 : Preset loan term in days (e.g., 14, 30). Default: " + std::to_string(defaultConfig.defaultDaysToRepay));
    UI::show("  --export-session / --no-export-session : Enable/disable session JSON export (Default: " + std::string(defaultConfig.exportSession ? "on" : "off") + ").");
    UI::show("  --consent-log=<filepath>      : Specify file for detailed consent audit logging (Default: " + defaultConfig.consentLogFile + ").");
    UI::show("  --accessibility-mode          : Enable high-contrast, screen-reader friendly output.");


    UI::show("\nCAPSTONE EDUCATIONAL FEATURES (Defaults vary by mode):");
    UI::show("  --knowledge-pretest / --no-knowledge-pretest     : Enable/disable pre-simulation quiz.");
    UI::show("  --knowledge-posttest / --no-knowledge-posttest   : Enable/disable post-simulation quiz.");
    UI::show("  --journal-prompt / --no-journal-prompt           : Enable/disable reflective journaling prompt.");
    UI::show("  --scenario=<id>                 : Load a predefined borrower scenario (e.g., 'singleParent').");
    UI::show("  --user-survey / --no-user-survey               : Prompt for user feedback survey.");
    UI::show("  --export-policy-report        : Generate a conceptual policy report markdown file.");


    UI::show("\nREGULATED ETHICAL REDESIGN MODE - INFORMED CONSENT PILLARS (Defaults ON):");
    UI::show("  --no-pillar-competence / --no-pillar-disclosure / --no-pillar-comprehension / --no-pillar-voluntariness / --no-pillar-authorization");
    UI::show("  --no-rescission-notice / --consent-phrase=\"PHRASE\" / --no-meta-consent-prompt");
    UI::show("  --no-kantian-universalizability-prompt / --no-mill-harm-rollover-prompt / --no-respect-meter");


    UI::show("\nREGULATED ETHICAL REDESIGN MODE - OTHER ETHICAL/EDUCATIONAL/COMPLIANCE (Defaults ON):");
    UI::show("  --no-kant-lecture / --no-rawls-lecture / --no-mill-lecture");
    UI::show("  --no-income-cap-pti / --income-cap-pti-pct=<val> / --no-dti-cap / --dti-cap-pct=<val>");
    UI::show("  --no-tiered-fees / --max-renewals-reg=<num> / --no-installment-offer");
    UI::show("  --no-usury-history-edu / --no-harm-data-edu / --no-cu-compare-edu / --no-dark-pattern-edu");
    UI::show("  --no-counselor-referral / --no-high-risk-counseling ");
    UI::show("  --disable-compliance-audit / --disable-fee-guardrail / --disable-preemption-check / --no-belmont-primer");


    UI::show("\nREALISTIC EXPLOITATIVE MODE - MECHANISM CONTROLS (Defaults ON for this mode):");
    UI::show("  --disable-exploit-mechanism<1-12> (e.g., --disable-exploit-mechanism1 for EndlessRollovers)");
    UI::show("  --disable-exploit-time-pressure / --disable-exploit-obfuscation / --disable-exploit-data-selling");
    UI::show("  --exploit-hide-apr / --exploit-countdown / --exploit-auto-tip / --exploit-obscure-cancel / --exploit-data-share-popup");
    
    UI::show("\n(This is a selection of flags. See Config.h for the exhaustive list.)");
}


int main(int argc,char* argv[]){
    srand((unsigned)time(nullptr));
    Config cfg; 
    UI::show("=== Lotus CLI Payday Loan Simulator (Holistic Framework Overhaul - vFINAL) ===");
    std::string mode_input_str=""; 
    std::string state_cli="";
    double presetAmt=-1;
    int presetTerm = cfg.defaultDaysToRepay; 

    // Comprehensive Argument Parsing
    for(int i=1;i<argc;++i){
        std::string arg_orig=argv[i];
        std::string arg_lower = arg_orig; 
        std::transform(arg_lower.begin(), arg_lower.end(), arg_lower.begin(), 
                       [](unsigned char c){ return std::tolower(c); });

        if(arg_lower.rfind("--mode=",0)==0) mode_input_str=arg_orig.substr(7);
        else if(arg_lower.rfind("--loan=",0)==0) { try { presetAmt = std::stod(arg_orig.substr(7)); } catch(...) { UI::show("Invalid --loan value: " + arg_orig.substr(7)); } }
        else if(arg_lower.rfind("--state=",0)==0) { state_cli=arg_orig.substr(8); std::transform(state_cli.begin(), state_cli.end(), state_cli.begin(), [](unsigned char c){ return std::toupper(c); }); }
        else if(arg_lower.rfind("--term=",0)==0) { try { presetTerm = std::stoi(arg_orig.substr(7)); } catch(...) { UI::show("Invalid --term value: " + arg_orig.substr(7)); } }
        
        // Capstone Features
        else if(UI::argEquals(arg_lower, "--knowledge-pretest")) cfg.capstoneKnowledgePreTest = true; else if(UI::argEquals(arg_lower, "--no-knowledge-pretest")) cfg.capstoneKnowledgePreTest = false;
        else if(UI::argEquals(arg_lower, "--knowledge-posttest")) cfg.capstoneKnowledgePostTest = true; else if(UI::argEquals(arg_lower, "--no-knowledge-posttest")) cfg.capstoneKnowledgePostTest = false;
        else if(UI::argEquals(arg_lower, "--journal-prompt")) cfg.journalPrompt = true; else if(UI::argEquals(arg_lower, "--no-journal-prompt")) cfg.journalPrompt = false;
        else if(arg_lower.rfind("--scenario=",0)==0) cfg.capstoneScenarioId = arg_orig.substr(11);
        else if(UI::argEquals(arg_lower, "--user-survey")) cfg.capstoneUserSurveyPrompt = true; else if(UI::argEquals(arg_lower, "--no-user-survey")) cfg.capstoneUserSurveyPrompt = false;
        else if(UI::argEquals(arg_lower, "--export-policy-report")) cfg.capstonePolicyReportExport = true;
        else if(arg_lower.rfind("--consent-log=",0)==0) cfg.consentLogFile = arg_orig.substr(14);
        else if(UI::argEquals(arg_lower, "--export-session")) cfg.exportSession = true; else if(UI::argEquals(arg_lower, "--no-export-session")) cfg.exportSession = false;
        else if(UI::argEquals(arg_lower, "--accessibility-mode")) cfg.enableAccessibilityMode = true;

        // Regulated Ethical Redesign - Informed Consent Pillars
        else if(UI::argEquals(arg_lower, "--no-pillar-competence")) cfg.regulatedPillarCompetenceCheck = false;
        else if(UI::argEquals(arg_lower, "--no-pillar-disclosure")) cfg.regulatedPillarFullDisclosure = false;
        else if(UI::argEquals(arg_lower, "--no-pillar-comprehension")) cfg.regulatedPillarComprehensionQuiz = false;
        else if(UI::argEquals(arg_lower, "--no-pillar-voluntariness")) cfg.regulatedPillarVoluntarinessCheck = false;
        else if(UI::argEquals(arg_lower, "--no-pillar-authorization")) cfg.regulatedPillarAuthorization = false;
        else if(UI::argEquals(arg_lower, "--no-rescission-notice")) cfg.regulatedShowRescissionNoticeDetailed = false;
        else if(arg_lower.rfind("--consent-phrase=",0)==0) cfg.regulatedExplicitConsentPhraseFull = arg_orig.substr(17);
        else if(UI::argEquals(arg_lower, "--no-meta-consent-prompt")) cfg.regulatedMetaConsentPrompt = false;
        else if(UI::argEquals(arg_lower, "--no-kantian-universalizability-prompt")) cfg.regulatedPromptKantianUniversalizability = false;
        else if(UI::argEquals(arg_lower, "--no-mill-harm-rollover-prompt")) cfg.regulatedPromptMillHarmPrincipleForRollovers = false;
        else if(UI::argEquals(arg_lower, "--no-respect-meter")) cfg.regulatedRespectMeterSimulation = false;

        // Regulated Ethical Redesign - Other Ethical/Educational/Compliance
        else if(UI::argEquals(arg_lower, "--no-kant-lecture")) cfg.eduLectureKantianDeontologyInDepth = false;
        else if(UI::argEquals(arg_lower, "--no-rawls-lecture")) cfg.eduLectureRawlsianJusticeInDepth = false;
        else if(UI::argEquals(arg_lower, "--no-mill-lecture")) cfg.eduLectureMillianConsequentialismInDepth = false;
        else if(UI::argEquals(arg_lower, "--no-income-cap-pti")) cfg.regulatedEnforcePaymentToIncomeRatio = false;
        else if(arg_lower.rfind("--income-cap-pti-pct=",0)==0) { try { cfg.regulatedPaymentToIncomeRatioCap = std::stod(arg_orig.substr(21))/100.0; } catch(...) {UI::show("Invalid --income-cap-pti-pct value");} }
        else if(arg_lower.rfind("--dti-cap-pct=",0)==0) { try { cfg.regulatedDebtToIncomeRatioCap = std::stod(arg_orig.substr(14))/100.0; } catch(...) {UI::show("Invalid --dti-cap-pct value");} }
        else if(UI::argEquals(arg_lower, "--no-tiered-fees")) cfg.regulatedEnableTieredFeeStructureForEquity = false;
        else if(arg_lower.rfind("--max-renewals-reg=",0)==0) { try { cfg.regulatedMaxRenewals = std::stoi(arg_orig.substr(19)); } catch(...) {UI::show("Invalid --max-renewals-reg value");} }
        else if(UI::argEquals(arg_lower, "--no-usury-history-edu")) cfg.eduProvideUsuryLawDeepDive = false;
        else if(UI::argEquals(arg_lower, "--no-harm-data-edu")) cfg.eduProvideEmpiricalHarmDataComprehensive = false;
        else if(UI::argEquals(arg_lower, "--no-cu-compare-edu")) cfg.eduCompareToCreditUnionPALsDetailed = false;
        else if(UI::argEquals(arg_lower, "--no-dark-pattern-edu")) cfg.eduShowDarkPatternExamplesEducationalDeep = false;
        else if(UI::argEquals(arg_lower, "--no-counselor-referral")) cfg.eduShowFinancialCounselorReferralsLocal = false;
        else if(UI::argEquals(arg_lower, "--no-high-risk-counseling")) cfg.eduForceFinancialCounselingIfHighRisk = false;
        else if(UI::argEquals(arg_lower, "--disable-compliance-audit")) cfg.complianceEnforcementSimulator = false;
        else if(UI::argEquals(arg_lower, "--disable-fee-guardrail")) cfg.complianceFeeLabelGuardrail = false;
        else if(UI::argEquals(arg_lower, "--disable-preemption-check")) cfg.compliancePreemptionCheck = false;
        else if(UI::argEquals(arg_lower, "--no-belmont-primer")) cfg.complianceBelmontPrimer = false;

        // Exploitative Flags (Disable specific mechanisms or enable specific UI exploits from prompt)
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism1")) cfg.exploitEnableEndlessRollovers = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism2")) cfg.exploitEnableInterestOnlyAutoRenewal = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism3")) cfg.exploitEnableHiddenFeesAndLayering = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism4")) cfg.exploitEnableMisleadingCostDisplay = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism5")) cfg.exploitEnableOptionalTipsDisguiseInterest = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism6")) cfg.exploitEnableFinePrintConsent = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism7")) cfg.exploitEnableAutoBankDebitAndOverdraft = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism8")) cfg.exploitEnableMisleadingCollectionThreats = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism9")) cfg.exploitEnableMisleadingTestimonials = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism10")) cfg.exploitEnablePersonalDataExploitation = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism11")) cfg.exploitEnableTargetedMarketingVulnerable = false; 
        else if(UI::argEquals(arg_lower, "--disable-exploit-mechanism12")) cfg.exploitEnableRentABankLoophole = false; 
        // Specific UI exploit flags from prompt
        else if(UI::argEquals(arg_lower, "--exploit-hide-apr")) cfg.exploitHideAPREarly = true; // Mech 4 variant
        else if(UI::argEquals(arg_lower, "--exploit-countdown")) cfg.exploitUseTimePressureTacticsExtreme = true; // General time pressure
        else if(UI::argEquals(arg_lower, "--exploit-auto-tip")) cfg.exploitDefaultTipEnabled = true; // Mech 5 variant
        else if(UI::argEquals(arg_lower, "--exploit-obscure-cancel")) cfg.exploitEnableObscureCancellation = true; // Mech 6 variant
        else if(UI::argEquals(arg_lower, "--exploit-data-share-popup")) cfg.exploitEnableDataSharingPopup = true; // Mech 6/10 variant
        
        else if(UI::argEquals(arg_lower, "--help") || UI::argEquals(arg_lower, "-h")) {
            printHelp(cfg); 
            return 0;
        } else if (i == argc -1 && arg_lower.find("--") != 0) { 
            mode_input_str = arg_orig;
        } else if (arg_lower.find("--") == 0) {
            UI::show("Unknown command line argument: " + arg_orig + ". Use --help to see available options.");
        }
    }

    // Mode selection logic (improved)
    if(mode_input_str.empty()) {
        mode_input_str = UI::prompt("Select mode:\n  1. Realistic Exploitative Practices (Demonstrates common predatory tactics)\n  2. Regulated Ethical Redesign (Focuses on informed consent, ethics, and consumer protection)\nEnter choice (1 or 2):");
        if (mode_input_str == "1") mode_input_str = "exploitative";
        else if (mode_input_str == "2") mode_input_str = "regulated_ethical";
        else {
            UI::show("Invalid selection. Defaulting to Regulated Ethical Redesign.");
            mode_input_str = "regulated_ethical";
        }
    } else {
        std::string lower_mode_input_transformed = mode_input_str; // Use a different variable name
        std::transform(lower_mode_input_transformed.begin(), lower_mode_input_transformed.end(), lower_mode_input_transformed.begin(), 
                       [](unsigned char c){ return std::tolower(c); });
        if (UI::argEquals(lower_mode_input_transformed, "exploitative") || UI::argEquals(lower_mode_input_transformed, "exploit") || lower_mode_input_transformed == "1") {
            mode_input_str = "exploitative";
        } else if (UI::argEquals(lower_mode_input_transformed, "regulated_ethical") || UI::argEquals(lower_mode_input_transformed, "regulated") || UI::argEquals(lower_mode_input_transformed, "ethical") || lower_mode_input_transformed == "2") {
            mode_input_str = "regulated_ethical";
        } else {
            UI::show("Invalid mode '" + mode_input_str + "' specified via command line. Defaulting to Regulated Ethical Redesign.");
            mode_input_str = "regulated_ethical";
        }
    }
    
    // Lambda for applying state-specific configurations from Config.stateRulesDatabase
    auto applyStateSpecificConfig=[&](const std::string& st_code_upper){
        cfg.state = st_code_upper; 
        UI::show("Attempting to apply specific regulations and educational context for state: " + cfg.state);
        
        if (cfg.stateRulesDatabase.count(cfg.state)) {
            const auto& rules = cfg.stateRulesDatabase.at(cfg.state);
            UI::show("Found rules for " + rules.stateName + " (Statute: " + rules.keyStatuteCitation + ")");
            if (rules.aprCap > 0) cfg.regulatedMaxAPRCap = rules.aprCap;
            if (rules.maxRenewals >= 0) cfg.regulatedMaxRenewals = rules.maxRenewals;
            cfg.regulatedAllowRollover = rules.allowRollover; 
            if (rules.minTermDays > 0) cfg.defaultDaysToRepay = std::max(cfg.defaultDaysToRepay, rules.minTermDays);
            if (rules.maxTermDays > 0) cfg.defaultDaysToRepay = std::min(cfg.defaultDaysToRepay, rules.maxTermDays);
            if (rules.coolingOffDaysAfterOrigination > 0) cfg.regulatedCoolingOffDays = rules.coolingOffDaysAfterOrigination; // Prioritize this for TILA
            else if (rules.coolingOffDaysAfterRepayment > 0) cfg.regulatedCoolingOffDays = rules.coolingOffDaysAfterRepayment; // Fallback
            if (rules.maxLoansPerYear >=0) cfg.regulatedMaxLoansPerYear = rules.maxLoansPerYear;
            
            UI::show("Applied for " + rules.stateName + ": APR Cap=" + std::to_string(cfg.regulatedMaxAPRCap) + 
                     "%, Max Renewals=" + std::to_string(cfg.regulatedMaxRenewals) + 
                     ", Rollovers Allowed=" + (cfg.regulatedAllowRollover ? "Yes" : "No") +
                     ", Cooling-off=" + std::to_string(cfg.regulatedCoolingOffDays) + " days.");
            // Cannot call s.addSpecificDisclosureMade here as 's' is LoanSession, not Config
            // This logging should happen within the strategy if needed.
        } else {
            UI::show("No specific pre-defined rules found for state '" + cfg.state + "'. Using general regulated defaults (e.g., 36% APR cap).");
            cfg.regulatedMaxAPRCap = cfg.defaultAPR; 
            cfg.regulatedAllowRollover = false; 
            cfg.regulatedMaxRenewals = 0; 
        }
        if (cfg.regulatedMaxRenewals == 0) cfg.regulatedAllowRollover = false;
    };

    if(!state_cli.empty()){ applyStateSpecificConfig(state_cli); }
    else {
        std::string state_input_prompt = UI::prompt("Enter 2-letter state code for specific regulations (e.g., IL, CO, TX), or leave blank for general rules:");
        if (!state_input_prompt.empty()) {
            std::string upper_state_input = state_input_prompt;
            std::transform(upper_state_input.begin(), upper_state_input.end(), upper_state_input.begin(), ::toupper);
            applyStateSpecificConfig(upper_state_input);
        } else {
            UI::show("No state selected. Using general regulated defaults (e.g., 36% APR cap, limited/no rollovers).");
            cfg.regulatedMaxAPRCap = cfg.defaultAPR; 
            cfg.regulatedAllowRollover = false; 
            cfg.regulatedMaxRenewals = 0; 
        }
    }
    if(presetTerm > 0) {
        cfg.defaultDaysToRepay = presetTerm;
        UI::show("Loan term set by CLI argument to: " + std::to_string(cfg.defaultDaysToRepay) + " days.");
    }

    std::unique_ptr<LoanStrategy> strat;
    std::string active_mode_name_for_ui_helper_local; 
    LoanSession sess; 
    sess.termDays = cfg.defaultDaysToRepay; 
    if(presetAmt>0) sess.amount=presetAmt;
    sess.sessionId = Regulated::getCurrentTimestampForLog() + "_" + std::to_string(rand() % 1000000); 
    sess.state = cfg.state; // Store selected state in session for later use by UI/summary

    // --- Mode-Specific Configuration Application ---
    if(UI::argEquals(mode_input_str, "exploitative")) { 
        strat = std::make_unique<Exploit>();
        active_mode_name_for_ui_helper_local = "Realistic Exploitative";
        cfg.sessionExportFileNameBase = "exploit_session_v_HOLISTIC_FINAL";
        
        // Apply Exploitative Defaults (unless overridden by CLI)
        // This ensures that if a flag was turned OFF by CLI, it stays OFF.
        // If it wasn't touched by CLI, it defaults to the exploitative behavior.
        cfg.exploitEnableEndlessRollovers = cfg.exploitEnableEndlessRollovers; 
        cfg.exploitEnableInterestOnlyAutoRenewal = cfg.exploitEnableInterestOnlyAutoRenewal;
        cfg.exploitEnableHiddenFeesAndLayering = cfg.exploitEnableHiddenFeesAndLayering;
        cfg.exploitEnableMisleadingCostDisplay = cfg.exploitEnableMisleadingCostDisplay;
        cfg.exploitEnableOptionalTipsDisguiseInterest = cfg.exploitEnableOptionalTipsDisguiseInterest;
        cfg.exploitEnableFinePrintConsent = cfg.exploitEnableFinePrintConsent;
        cfg.exploitEnableAutoBankDebitAndOverdraft = cfg.exploitEnableAutoBankDebitAndOverdraft;
        cfg.exploitEnableMisleadingCollectionThreats = cfg.exploitEnableMisleadingCollectionThreats;
        cfg.exploitEnableMisleadingTestimonials = cfg.exploitEnableMisleadingTestimonials;
        cfg.exploitEnablePersonalDataExploitation = cfg.exploitEnablePersonalDataExploitation;
        cfg.exploitEnableTargetedMarketingVulnerable = cfg.exploitEnableTargetedMarketingVulnerable;
        cfg.exploitEnableRentABankLoophole = cfg.exploitEnableRentABankLoophole;
        cfg.exploitUseTimePressureTacticsExtreme = cfg.exploitUseTimePressureTacticsExtreme;
        // ... and so on for ALL exploitative flags in Config.h

        // Explicitly Turn OFF all regulated/ethical/educational flags for pure exploitative experience
        cfg.regulatedPillarCompetenceCheck = false; cfg.regulatedPillarFullDisclosure = false; 
        cfg.regulatedPillarComprehensionQuiz = false; cfg.regulatedPillarVoluntarinessCheck = false;
        cfg.regulatedPillarAuthorization = false; cfg.regulatedBanForcedArbitration = false;
        cfg.regulatedStrictOptInForDataSharing = false; cfg.regulatedApplyIncomeBasedCapsComprehensive = false;
        cfg.regulatedEnableTieredFeeStructureForEquity = false; cfg.regulatedOfferMultipleInstallmentPlanAlternativesDetailed = false;
        cfg.eduProvideUsuryLawDeepDive = false; cfg.eduProvideEmpiricalHarmDataComprehensive = false;
        cfg.eduLectureKantianDeontologyInDepth = false; cfg.eduLectureRawlsianJusticeInDepth = false; cfg.eduLectureMillianConsequentialismInDepth = false;
        cfg.capstoneKnowledgePreTest = false; cfg.capstoneKnowledgePostTest = false; cfg.journalPrompt = false; 
        cfg.complianceEnforcementSimulator = false; cfg.complianceBelmontPrimer = false;

    } else { 
        mode_input_str = "regulated_ethical"; 
        strat = std::make_unique<Regulated>(); 
        active_mode_name_for_ui_helper_local = "Regulated Ethical Redesign";
        cfg.sessionExportFileNameBase = "regulated_ethical_redesign_session_v_HOLISTIC_FINAL";
        
        // Apply Regulated Ethical Defaults (unless overridden by CLI)
        cfg.regulatedPillarCompetenceCheck = cfg.regulatedPillarCompetenceCheck;
        cfg.regulatedPillarFullDisclosure = cfg.regulatedPillarFullDisclosure;
        cfg.regulatedPillarComprehensionQuiz = cfg.regulatedPillarComprehensionQuiz;
        cfg.regulatedPillarVoluntarinessCheck = cfg.regulatedPillarVoluntarinessCheck;
        cfg.regulatedPillarAuthorization = cfg.regulatedPillarAuthorization;
        cfg.regulatedBanForcedArbitration = cfg.regulatedBanForcedArbitration;
        cfg.regulatedStrictOptInForDataSharing = cfg.regulatedStrictOptInForDataSharing;
        cfg.regulatedApplyIncomeBasedCapsComprehensive = cfg.regulatedApplyIncomeBasedCapsComprehensive;
        cfg.regulatedEnableTieredFeeStructureForEquity = cfg.regulatedEnableTieredFeeStructureForEquity;
        cfg.regulatedOfferMultipleInstallmentPlanAlternativesDetailed = cfg.regulatedOfferMultipleInstallmentPlanAlternativesDetailed;
        cfg.eduProvideUsuryLawDeepDive = cfg.eduProvideUsuryLawDeepDive;
        cfg.eduProvideEmpiricalHarmDataComprehensive = cfg.eduProvideEmpiricalHarmDataComprehensive;
        cfg.eduLectureKantianDeontologyInDepth = cfg.eduLectureKantianDeontologyInDepth;
        cfg.eduLectureRawlsianJusticeInDepth = cfg.eduLectureRawlsianJusticeInDepth;
        cfg.eduLectureMillianConsequentialismInDepth = cfg.eduLectureMillianConsequentialismInDepth;
        cfg.capstoneKnowledgePreTest = cfg.capstoneKnowledgePreTest;
        cfg.capstoneKnowledgePostTest = cfg.capstoneKnowledgePostTest;
        cfg.journalPrompt = cfg.journalPrompt;
        cfg.complianceEnforcementSimulator = cfg.complianceEnforcementSimulator;
        cfg.complianceFeeLabelGuardrail = cfg.complianceFeeLabelGuardrail;
        cfg.compliancePreemptionCheck = cfg.compliancePreemptionCheck;
        cfg.complianceBelmontPrimer = cfg.complianceBelmontPrimer;
        
        // Explicitly Turn OFF all exploitative flags
        cfg.exploitEnableEndlessRollovers = false; cfg.exploitEnableInterestOnlyAutoRenewal = false; 
        cfg.exploitEnableHiddenFeesAndLayering = false; cfg.exploitEnableMisleadingCostDisplay = false;
        cfg.exploitEnableOptionalTipsDisguiseInterest = false; cfg.exploitEnableFinePrintConsent = false;
        cfg.exploitEnableAutoBankDebitAndOverdraft = false; cfg.exploitEnableMisleadingCollectionThreats = false;
        cfg.exploitEnableMisleadingTestimonials = false; cfg.exploitEnablePersonalDataExploitation = false;
        cfg.exploitEnableTargetedMarketingVulnerable = false; cfg.exploitEnableRentABankLoophole = false;
        cfg.exploitUseTimePressureTacticsExtreme = false; cfg.exploitUseObfuscatedLanguageExtreme = false;
        cfg.exploitPrecheckMultipleOptInExtras = false; cfg.exploitAggressiveCollectionLanguageExtreme = false;
        cfg.exploitDynamicPricingBasedOnDesperation = false; cfg.exploitForceArbitration = false;
        cfg.exploitShareDataWithAffiliatesExtensively = false;
    }
    UI::active_mode_name_str_ui_helper = active_mode_name_for_ui_helper_local; 
    sess.record("SessionStart_v3_Holistic", sess.sessionId + " Mode: " + active_mode_name_for_ui_helper + " State: " + cfg.state);

    // Capstone Feature: Pre-Test & Scenario Loading (before strat->intro)
    if (cfg.capstoneKnowledgePreTest && UI::argEquals(active_mode_name_str_ui_helper,"Regulated Ethical Redesign")) { 
        UI::conductKnowledgeQuiz(cfg, sess, "Pre-Simulation Knowledge & Ethics Assessment (Capstone)");
    }
    if (!cfg.capstoneScenarioId.empty()) { 
        UI::loadScenarioPreset(cfg, sess, cfg.capstoneScenarioId);
        if (presetAmt <= 0 && sess.amount > 0) {
            UI::show("Loan amount pre-filled from scenario '" + cfg.capstoneScenarioId + "': $" + std::to_string((int)sess.amount));
        }
        if (sess.monthlyIncome > 0) {
             UI::show("Monthly income from scenario '" + cfg.capstoneScenarioId + "': $" + std::to_string((int)sess.monthlyIncome));
        }
    }

    // Main simulation flow
    strat->intro(sess,cfg);
    if (!sess.deniedByLimit) { UI::showStepIndicator("1. Initial Information & Affordability Data", cfg); strat->consent(sess,cfg); }
    if (!sess.deniedByLimit) { UI::showStepIndicator("2. Loan Amount & Term Selection", cfg); strat->askAmt(sess, cfg); } 
    if (!sess.deniedByLimit) { UI::showStepIndicator("3. Fee Calculation & Compliance Checks", cfg); strat->calcFee(sess,cfg); }
    if (!sess.deniedByLimit) { UI::showStepIndicator("4. Optional Services Review (If Any)", cfg); strat->extras(sess,cfg); }
    
    bool canOfferRenewal = (UI::argEquals(active_mode_name_str_ui_helper, "Realistic Exploitative") && cfg.exploitEnableEndlessRollovers) ||
                           (UI::argEquals(active_mode_name_str_ui_helper, "Regulated Ethical Redesign") && cfg.regulatedAllowRollover && sess.renewalsTaken < cfg.regulatedMaxRenewals);

    if (!sess.deniedByLimit && canOfferRenewal ) { 
        UI::showStepIndicator("5. Renewal/Extension Options Discussion (If Applicable)", cfg); 
        strat->renewals(sess,cfg); 
    }
    
    if (!sess.deniedByLimit) {
        UI::showStepIndicator("6. Final Review, Informed Consent Process & Educational Modules", cfg);
        strat->finalize(sess,cfg, active_mode_name_str_ui_helper); 
    } else {
        UI::show("\n--- SIMULATION ENDED DUE TO DENIAL/HALT ---");
        UI::show("Reason: " + sess.denialReason);
        printSummary(s); 
        if(cfg.exportSession){
            std::string finalExportName = cfg.sessionExportFileNameBase + "_" + (UI::argEquals(active_mode_name_str_ui_helper, "Regulated Ethical Redesign") ? "regulated_ethical_denied" : "exploitative_denied") + ".json";
            UI::show("Session data for this incomplete session will be saved to '" + finalExportName + "'.");
            if(UI::prompt("Proceed with saving session data? (yes/no)")=="yes") {
                sess.exportJson(finalExportName); 
                sess.record("SessionExported_Denied_Holistic", finalExportName);
            }
        }
    }

    // Capstone Features: Post-Test & Survey
    if (!sess.deniedByLimit && ( (active_mode_name_str=="Regulated Ethical Redesign" && sess.consentGiven) || active_mode_name_str=="Realistic Exploitative" ) ) {
        if (cfg.capstoneKnowledgePostTest && active_mode_name_str=="Regulated Ethical Redesign") {
            UI::conductKnowledgeQuiz(cfg, sess, "Post-Simulation Knowledge & Ethics Assessment (Capstone)");
        }
        if (cfg.capstoneUserSurveyPrompt) {
            UI::show("\n--- Quick Feedback Survey (Optional) ---");
            sess.userFeedbackSurveyResponse = UI::prompt("This simulation aimed to be highly educational. How would you rate its effectiveness in demonstrating ethical lending, informed consent, and predatory tactics (1-5, 5=Very Effective)? Any specific suggestions for improvement or other topics you'd like to see covered?");
            s.record("UserSurveyResponse_EffectivenessAndSuggestions_Overhaul_V2", sess.userFeedbackSurveyResponse);
        }
        // Capstone Feature: Policy Report Export (Conceptual)
        if (cfg.capstonePolicyReportExport && !sess.deniedByLimit && sess.consentGiven) {
            UI::show("\nGenerating policy report (simulated)... " + cfg.capstonePolicyReportFile);
            // In a real app, this would collate data from 'sess' (especially ethicalSafeguardsApplied, darkPatternsEncountered, denialReasons, user reflections) 
            // and 'cfg' (state rules, ethical settings) into a markdown report.
            std::ofstream policy_report(cfg.capstonePolicyReportFile);
            if (policy_report.is_open()) {
                policy_report << "# Lotus Simulator Policy & Ethics Report\n";
                policy_report << "## Session Summary\n";
                policy_report << "- Mode: " << active_mode_name_str << "\n";
                policy_report << "- State: " << (cfg.state.empty() ? "General" : cfg.state) << "\n";
                policy_report << "- Loan Outcome: " << (sess.deniedByLimit ? "Denied (" + sess.denialReason + ")" : (sess.loanRescinded ? "Rescinded" : "Funded")) << "\n";
                policy_report << "- Consent Score: " << sess.consentScore() << "\n";
                policy_report << "- Dark Patterns: " << sess.darkPatternsEncountered.size() << "\n";
                // ... more data ...
                policy_report.close();
                UI::show("Policy report stub generated to " + cfg.capstonePolicyReportFile);
            }
            s.record("PolicyReportGenerated_Simulated", cfg.capstonePolicyReportFile);
        }
    }

    UI::show("\nSimulation ended. Thank you for using the Lotus CLI Payday Loan Simulator (Holistic Framework Overhaul - vFINAL).");
    return 0;
}
