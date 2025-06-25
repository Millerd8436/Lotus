#include "config.h"
#include "ui.h"
#include "loan_session.h"
// #include "strategies/ethical.h" // CONFIRMED DELETED
#include "strategies/exploit.h"   
#include "strategies/regulated.h" 

#include <memory>
#include <cstdlib> 
#include <ctime>   
#include <algorithm> 
#include <vector>   // For help text generation

// Helper for case-insensitive argument checking (already present)
// bool argEquals(const std::string& arg, const std::string& value) { ... }

// Helper to generate help text from Config (conceptual)
void printHelp(const Config& defaultConfig) {
    UI::show("Lotus CLI Payday Loan Simulator Help (Deep Dive Educational Version):");
    UI::show("Usage: ./lotus [--mode=MODE] [--loan=AMOUNT] [--state=ST] [--term=DAYS] [OTHER_FLAGS...]");
    UI::show("\nMODES:");
    UI::show("  --mode=exploitative           : Simulate Realistic Exploitative lending practices, demonstrating common predatory tactics.");
    UI::show("  --mode=regulated_ethical      : Simulate a Regulated Ethical Redesign of lending, emphasizing informed consent, ethical frameworks, and consumer protection.");
    
    UI::show("\nGENERAL OPTIONS:");
    UI::show("  --loan=<amount>               : Preset loan principal amount (e.g., 300).");
    UI::show("  --state=<ST>                  : Apply 2-letter state code regulations (e.g., IL, CO, TX). Affects APR caps, rollover rules, etc.");
    UI::show("  --term=<days>                 : Preset loan term in days (e.g., 14, 30). Default: " + std::to_string(defaultConfig.defaultDaysToRepay));
    UI::show("  --export-session              : Enable session data export to JSON (Default: " + std::string(defaultConfig.exportSession ? "on" : "off") + ").");
    UI::show("  --no-export-session           : Disable session data export.");
    UI::show("  --consent-log=<filepath>      : Specify file for detailed consent audit logging (Default: " + defaultConfig.consentLogFile + ").");

    UI::show("\nCAPSTONE EDUCATIONAL FEATURES (Primarily for 'regulated_ethical' mode):");
    UI::show("  --knowledge-pretest / --no-knowledge-pretest     : Enable/disable pre-simulation quiz (Default: " + std::string(defaultConfig.capstoneKnowledgePreTest ? "on" : "off") + ").");
    UI::show("  --knowledge-posttest / --no-knowledge-posttest   : Enable/disable post-simulation quiz (Default: " + std::string(defaultConfig.capstoneKnowledgePostTest ? "on" : "off") + ").");
    UI::show("  --journal-prompt / --no-journal-prompt           : Enable/disable reflective journaling prompt (Default: " + std::string(defaultConfig.journalPrompt ? "on" : "off") + ").");
    UI::show("  --scenario=<id>                 : Load a predefined borrower scenario (e.g., 'singleParent', 'tempWorker').");
    UI::show("  --user-survey / --no-user-survey               : Prompt for user feedback survey at the end (Default: " + std::string(defaultConfig.capstoneUserSurveyPrompt ? "on" : "off") + ").");

    UI::show("\nREGULATED ETHICAL REDESIGN MODE - INFORMED CONSENT FLAGS (Defaults are generally ON):");
    UI::show("  --no-pillar-competence        : Disable initial competence check.");
    UI::show("  --no-pillar-disclosure        : Disable full TILA-like disclosures.");
    UI::show("  --no-pillar-comprehension     : Disable comprehension quiz.");
    UI::show("  --no-pillar-voluntariness     : Disable meta-consent/voluntariness checks.");
    UI::show("  --no-pillar-authorization     : Disable explicit consent phrase authorization.");
    UI::show("  --no-rescission-notice        : Disable detailed rescission/cooling-off notice.");
    UI::show("  --consent-phrase=\"PHRASE\"   : Customize the explicit consent phrase.");

    UI::show("\nREGULATED ETHICAL REDESIGN MODE - ETHICAL FRAMEWORK FLAGS (Defaults are generally ON):");
    UI::show("  --no-kantian-lecture          : Disable Kantian ethics lecture.");
    UI::show("  --no-rawlsian-lecture         : Disable Rawlsian ethics lecture.");
    UI::show("  --no-millian-lecture          : Disable Millian ethics lecture.");
    UI::show("  --no-income-cap-pti           : Disable Payment-To-Income affordability cap.");
    UI::show("  --income-cap-pti-pct=<val>    : Set PTI cap percentage (e.g., 5 for 5%). Default: " + std::to_string(defaultConfig.regulatedPaymentToIncomeRatioCap * 100) + "%.");
    UI::show("  --no-tiered-fees              : Disable income-based tiered fee structures.");
    UI::show("  --max-renewals-reg=<num>      : Set max renewals allowed (Default: " + std::to_string(defaultConfig.regulatedMaxRenewals) + ").");
    // ... Add more key ethical/educational flags ...

    UI::show("\nREALISTIC EXPLOITATIVE MODE - MECHANISM FLAGS (Defaults are generally ON for this mode):");
    UI::show("  --no-exploit-endless-rollovers : Disable endless rollover simulation.");
    UI::show("  --no-exploit-interest-only   : Disable interest-only auto-renewal simulation.");
    UI::show("  --no-exploit-hidden-fees     : Make fees more transparent (less realistic for exploit).");
    UI::show("  --no-exploit-rent-a-bank     : Disable rent-a-bank/CAB loophole simulation.");
    // ... Add more key exploitative mechanism flags ...

    UI::show("\nUI/UX REALISM FLAGS (Examples):");
    UI::show("  --exploit-cluttered-ui / --no-exploit-cluttered-ui : Simulate cluttered interface in exploit mode.");
    UI::show("  --exploit-aggressive-popups / --no-exploit-aggressive-popups : Simulate urgency popups.");
    UI::show("  --regulated-clear-steps / --no-regulated-clear-steps : Show step indicators in regulated mode.");

    UI::show("\n(Many more flags exist to fine-tune behaviors for both modes and educational content - see Config.h for a comprehensive list.)");
}


int main(int argc,char* argv[]){
    srand((unsigned)time(nullptr));
    Config cfg; 
    UI::show("=== Lotus CLI Payday Loan Simulator (Holistic Overhaul v1) ===");
    std::string mode_input_str=""; 
    std::string state_cli="";
    double presetAmt=-1;
    int presetTerm = cfg.defaultDaysToRepay; // Initialize with default

    // Comprehensive Argument Parsing
    for(int i=1;i<argc;++i){
        std::string arg_orig=argv[i];
        std::string arg_lower = arg_orig; 
        std::transform(arg_lower.begin(), arg_lower.end(), arg_lower.begin(), ::tolower);

        if(arg_lower.rfind("--mode=",0)==0) mode_input_str=arg_orig.substr(7);
        else if(arg_lower.rfind("--loan=",0)==0) { 
            try { presetAmt = std::stod(arg_orig.substr(7)); } 
            catch(...) { UI::show("Invalid --loan value: " + arg_orig.substr(7)); } 
        }
        else if(arg_lower.rfind("--state=",0)==0) {
            state_cli=arg_orig.substr(8);
            std::transform(state_cli.begin(), state_cli.end(), state_cli.begin(), ::toupper); // Normalize state to uppercase
        }
        else if(arg_lower.rfind("--term=",0)==0) {
            try { presetTerm = std::stoi(arg_orig.substr(7)); } 
            catch(...) { UI::show("Invalid --term value: " + arg_orig.substr(7)); } 
        }
        // Capstone Features
        else if(argEquals(arg_lower, "--knowledge-pretest")) cfg.capstoneKnowledgePreTest = true;
        else if(argEquals(arg_lower, "--no-knowledge-pretest")) cfg.capstoneKnowledgePreTest = false;
        else if(argEquals(arg_lower, "--knowledge-posttest")) cfg.capstoneKnowledgePostTest = true;
        else if(argEquals(arg_lower, "--no-knowledge-posttest")) cfg.capstoneKnowledgePostTest = false;
        else if(argEquals(arg_lower, "--journal-prompt")) cfg.journalPrompt = true;
        else if(argEquals(arg_lower, "--no-journal-prompt")) cfg.journalPrompt = false;
        else if(arg_lower.rfind("--scenario=",0)==0) cfg.capstoneScenarioId = arg_orig.substr(11);
        else if(argEquals(arg_lower, "--user-survey")) cfg.capstoneUserSurveyPrompt = true;
        else if(argEquals(arg_lower, "--no-user-survey")) cfg.capstoneUserSurveyPrompt = false;
        else if(argEquals(arg_lower, "--export-policy-report")) cfg.capstonePolicyReportExport = true;
        else if(arg_lower.rfind("--consent-log=",0)==0) cfg.consentLogFile = arg_orig.substr(14);
        else if(argEquals(arg_lower, "--export-session")) cfg.exportSession = true;
        else if(argEquals(arg_lower, "--no-export-session")) cfg.exportSession = false;


        // Regulated Ethical Redesign Flags
        else if(argEquals(arg_lower, "--no-pillar-competence")) cfg.regulatedPillarCompetenceCheck = false;
        else if(argEquals(arg_lower, "--no-pillar-disclosure")) cfg.regulatedPillarFullDisclosure = false;
        else if(argEquals(arg_lower, "--no-pillar-comprehension")) cfg.regulatedPillarComprehensionQuiz = false;
        else if(argEquals(arg_lower, "--no-pillar-voluntariness")) cfg.regulatedPillarVoluntarinessCheck = false;
        else if(argEquals(arg_lower, "--no-pillar-authorization")) cfg.regulatedPillarAuthorization = false;
        else if(argEquals(arg_lower, "--no-rescission-notice")) cfg.regulatedShowRescissionNoticeDetailed = false;
        else if(arg_lower.rfind("--consent-phrase=",0)==0) cfg.regulatedExplicitConsentPhraseFull = arg_orig.substr(17);
        else if(argEquals(arg_lower, "--no-kant-lecture")) cfg.eduLectureKantianDeontologyInDepth = false;
        else if(argEquals(arg_lower, "--no-rawls-lecture")) cfg.eduLectureRawlsianJusticeInDepth = false;
        else if(argEquals(arg_lower, "--no-mill-lecture")) cfg.eduLectureMillianConsequentialismInDepth = false;
        else if(argEquals(arg_lower, "--no-income-cap-pti")) cfg.regulatedEnforcePaymentToIncomeRatio = false;
        else if(arg_lower.rfind("--income-cap-pti-pct=",0)==0) { try { cfg.regulatedPaymentToIncomeRatioCap = std::stod(arg_orig.substr(21))/100.0; } catch(...) {UI::show("Invalid --income-cap-pti-pct value");} }
        else if(argEquals(arg_lower, "--no-tiered-fees")) cfg.regulatedEnableTieredFeeStructureForEquity = false;
        else if(arg_lower.rfind("--max-renewals-reg=",0)==0) { try { cfg.regulatedMaxRenewals = std::stoi(arg_orig.substr(19)); } catch(...) {UI::show("Invalid --max-renewals-reg value");} }
        // Add more educational toggles
        else if(argEquals(arg_lower, "--no-usury-history")) cfg.eduProvideUsuryLawDeepDive = false;
        else if(argEquals(arg_lower, "--no-harm-data-edu")) cfg.eduProvideEmpiricalHarmDataComprehensive = false;


        // Exploitative Flags (examples for toggling OFF default ON behaviors)
        else if(argEquals(arg_lower, "--disable-exploit-endless-rollovers")) cfg.exploitEnableEndlessRollovers = false;
        else if(argEquals(arg_lower, "--disable-exploit-interest-only")) cfg.exploitEnableInterestOnlyAutoRenewal = false;
        else if(argEquals(arg_lower, "--disable-exploit-hidden-fees")) cfg.exploitEnableHiddenFeesAndLayering = false;
        else if(argEquals(arg_lower, "--disable-exploit-misleading-cost")) cfg.exploitEnableMisleadingCostDisplay = false;
        else if(argEquals(arg_lower, "--disable-exploit-coerced-tips")) cfg.exploitEnableOptionalTipsDisguiseInterest = false;
        else if(argEquals(arg_lower, "--disable-exploit-fine-print")) cfg.exploitEnableFinePrintConsent = false;
        else if(argEquals(arg_lower, "--disable-exploit-autodebit")) cfg.exploitEnableAutoBankDebitAndOverdraft = false;
        else if(argEquals(arg_lower, "--disable-exploit-collection-threats")) cfg.exploitEnableMisleadingCollectionThreats = false;
        else if(argEquals(arg_lower, "--disable-exploit-fake-testimonials")) cfg.exploitEnableMisleadingTestimonials = false;
        else if(argEquals(arg_lower, "--disable-exploit-data-selling")) cfg.exploitEnablePersonalDataExploitation = false;
        else if(argEquals(arg_lower, "--disable-exploit-targeting")) cfg.exploitEnableTargetedMarketingVulnerable = false;
        else if(argEquals(arg_lower, "--disable-exploit-rent-a-bank")) cfg.exploitEnableRentABankLoophole = false;
        
        // UI/UX Realism Flags
        else if(argEquals(arg_lower, "--exploit-cluttered-ui")) cfg.uiExploitClutteredInterface = true;
        else if(argEquals(arg_lower, "--no-exploit-cluttered-ui")) cfg.uiExploitClutteredInterface = false;
        else if(argEquals(arg_lower, "--exploit-aggressive-popups")) cfg.uiExploitAggressivePopups = true;
        else if(argEquals(arg_lower, "--no-exploit-aggressive-popups")) cfg.uiExploitAggressivePopups = false;
        else if(arg_lower.rfind("--exploit_countdown_seconds=",0)==0) { try { cfg.uiExploitCountdownTimerSeconds = std::stoi(arg_orig.substr(28)); } catch(...) {} }
        else if(argEquals(arg_lower, "--regulated-clear-steps")) cfg.uiRegulatedClearStepIndicators = true;
        else if(argEquals(arg_lower, "--no-regulated-clear-steps")) cfg.uiRegulatedClearStepIndicators = false;
        else if(argEquals(arg_lower, "--regulated-progressive-disclosure")) cfg.uiRegulatedProgressiveDisclosure = true;
        else if(argEquals(arg_lower, "--no-regulated-progressive-disclosure")) cfg.uiRegulatedProgressiveDisclosure = false;
        
        else if(argEquals(arg_lower, "--help") || argEquals(arg_lower, "-h")) {
            printHelp(cfg); 
            return 0;
        }
    }

    if(mode_input_str.empty()) {
        mode_input_str = UI::prompt("Select mode:\n  1. Realistic Exploitative Practices\n  2. Regulated Ethical Redesign\nEnter choice (1 or 2):");
        if (mode_input_str == "1") mode_input_str = "exploitative";
        else if (mode_input_str == "2") mode_input_str = "regulated_ethical";
        else {
            UI::show("Invalid selection. Defaulting to Regulated Ethical Redesign.");
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
            // Override general config defaults with state-specific rules IF they are set (not -1 or default)
            if (rules.aprCap > 0) cfg.regulatedMaxAPRCap = rules.aprCap;
            if (rules.maxRenewals >= 0) cfg.regulatedMaxRenewals = rules.maxRenewals;
            cfg.regulatedAllowRollover = rules.allowRollover; 
            if (rules.minTermDays > 0) cfg.defaultDaysToRepay = std::max(cfg.defaultDaysToRepay, rules.minTermDays);
            if (rules.maxTermDays > 0) cfg.defaultDaysToRepay = std::min(cfg.defaultDaysToRepay, rules.maxTermDays);
            if (rules.coolingOffDays > 0) cfg.regulatedCoolingOffDays = rules.coolingOffDays;
            if (rules.maxLoansPerYear >=0) cfg.regulatedMaxLoansPerYear = rules.maxLoansPerYear;
            // Add more specific rule applications here from StateSpecificRules struct
            
            UI::show("Applied for " + rules.stateName + ": APR Cap=" + std::to_string(cfg.regulatedMaxAPRCap) + 
                     "%, Max Renewals=" + std::to_string(cfg.regulatedMaxRenewals) + 
                     ", Rollovers Allowed=" + (cfg.regulatedAllowRollover ? "Yes" : "No") +
                     ", Cooling-off=" + std::to_string(cfg.regulatedCoolingOffDays) + " days.");
            s.addSpecificDisclosureMade("State-specific rules for " + rules.stateName + " (" + rules.keyStatuteCitation + ") applied to simulation config.");

        } else {
            UI::show("No specific pre-defined rules found for state '" + cfg.state + "'. Using general regulated defaults (e.g., 36% APR cap).");
            // General defaults if state not in map (already set in cfg constructor, but can be reiterated)
            cfg.regulatedMaxAPRCap = cfg.defaultAPR; 
            cfg.regulatedAllowRollover = false; 
            cfg.regulatedMaxRenewals = 0; 
        }
        // Ensure consistency: if max renewals is 0, rollovers should not be allowed.
        if (cfg.regulatedMaxRenewals == 0) cfg.regulatedAllowRollover = false;
    };

    if(!state_cli.empty()){ applyStateSpecificConfig(state_cli); }
    else {
        std::string state_input_prompt = UI::prompt("Enter 2-letter state code for specific regulations (e.g., IL, CO, SD), or leave blank for general rules:");
        if (!state_input_prompt.empty()) {
            applyStateSpecificConfig(state_input_prompt);
        } else {
            UI::show("No state selected. Using general regulated defaults (e.g., 36% APR cap, limited/no rollovers).");
            // Apply general defaults if no state selected
            cfg.regulatedMaxAPRCap = cfg.defaultAPR; // Default from Config struct
            cfg.regulatedAllowRollover = false; // Default from Config struct
            cfg.regulatedMaxRenewals = 0; // Stricter default if no state
        }
    }
    // Set default term days from config if not preset by CLI
    if(presetTerm > 0) {
        cfg.defaultDaysToRepay = presetTerm;
        UI::show("Loan term set by CLI argument to: " + std::to_string(cfg.defaultDaysToRepay) + " days.");
    }


    std::unique_ptr<LoanStrategy> strat;
    std::string active_mode_name_str; 

    LoanSession sess; // Create session early to pass to UI functions if needed for context
    sess.termDays = cfg.defaultDaysToRepay; 
    if(presetAmt>0) sess.amount=presetAmt;
    // Assign session ID early
    sess.sessionId = Regulated::getCurrentTimestampForLog() + "_" + std::to_string(rand() % 100000); // Use static method if accessible or move helper
    s.record("SessionStart", sess.sessionId);


    if(mode_input_str=="exploitative") {
        strat = std::make_unique<Exploit>();
        active_mode_name_str = "Realistic Exploitative";
        cfg.sessionExportFileNameBase = "exploit_session_v_Holistic";
        // Ensure all exploitative flags are ON and ethical/educational are OFF for this mode
        // This should ideally be a "setExploitativeProfile()" method in Config
        cfg.exploitEnableEndlessRollovers = true; cfg.exploitEnableInterestOnlyAutoRenewal = true; 
        cfg.exploitEnableHiddenFeesAndLayering = true; cfg.exploitEnableMisleadingCostDisplay = true;
        cfg.exploitEnableOptionalTipsDisguiseInterest = true; cfg.exploitEnableFinePrintConsent = true;
        cfg.exploitEnableAutoBankDebitAndOverdraft = true; cfg.exploitEnableMisleadingCollectionThreats = true;
        cfg.exploitEnableMisleadingTestimonials = true; cfg.exploitEnablePersonalDataExploitation = true;
        cfg.exploitEnableTargetedMarketingVulnerable = true; cfg.exploitEnableRentABankLoophole = true;
        cfg.exploitUseTimePressureTacticsExtreme = true; cfg.exploitUseObfuscatedLanguageExtreme = true;
        cfg.exploitPrecheckMultipleOptInExtras = true; cfg.exploitAggressiveCollectionLanguageExtreme = true;
        cfg.exploitDynamicPricingBasedOnDesperation = true; cfg.exploitForceArbitration = true;
        cfg.exploitShareDataWithAffiliates = true;

        // Turn OFF all regulated/ethical/educational flags
        cfg.regulatedPillarCompetenceCheck = false; cfg.regulatedPillarFullDisclosure = false; 
        cfg.regulatedPillarComprehensionQuiz = false; cfg.regulatedPillarVoluntarinessCheck = false;
        cfg.regulatedPillarAuthorization = false; cfg.regulatedBanForcedArbitration = false;
        cfg.regulatedStrictOptInForDataSharing = false; cfg.regulatedApplyIncomeBasedCapsComprehensive = false;
        cfg.regulatedEnableTieredFeeStructureForEquity = false; cfg.regulatedOfferMultipleInstallmentPlanAlternativesDetailed = false;
        cfg.eduProvideUsuryLawDeepDive = false; cfg.eduProvideEmpiricalHarmDataComprehensive = false;
        cfg.eduLectureKantianDeontologyInDepth = false; cfg.eduLectureRawlsianJusticeInDepth = false; cfg.eduLectureMillianConsequentialismInDepth = false;
        cfg.capstoneKnowledgePreTest = false; cfg.capstoneKnowledgePostTest = false; cfg.journalPrompt = false; // Capstone edu features off for pure exploit

    } else /* if (mode_input_str=="regulated_ethical") */ { 
        strat = std::make_unique<Regulated>(); 
        active_mode_name_str = "Regulated Ethical Redesign";
        cfg.sessionExportFileNameBase = "regulated_ethical_redesign_session_v_Holistic";
        // Ensure all ethical/regulated/educational flags are ON by default, and exploitative are OFF
        cfg.regulatedPillarCompetenceCheck = true; cfg.regulatedPillarFullDisclosure = true; 
        cfg.regulatedPillarComprehensionQuiz = true; cfg.regulatedPillarVoluntarinessCheck = true;
        cfg.regulatedPillarAuthorization = true; cfg.regulatedBanForcedArbitration = true;
        cfg.regulatedStrictOptInForDataSharing = true; cfg.regulatedApplyIncomeBasedCapsComprehensive = true;
        cfg.regulatedEnableTieredFeeStructureForEquity = true; cfg.regulatedOfferMultipleInstallmentPlanAlternativesDetailed = true;
        cfg.eduProvideUsuryLawDeepDive = true; cfg.eduProvideEmpiricalHarmDataComprehensive = true;
        cfg.eduLectureKantianDeontologyInDepth = true; cfg.eduLectureRawlsianJusticeInDepth = true; cfg.eduLectureMillianConsequentialismInDepth = true;
        // Capstone features default to on for this mode unless turned off by CLI
        // cfg.capstoneKnowledgePreTest = true; cfg.capstoneKnowledgePostTest = true; cfg.journalPrompt = true;


        // Turn OFF all exploitative flags
        cfg.exploitEnableEndlessRollovers = false; cfg.exploitEnableInterestOnlyAutoRenewal = false; 
        cfg.exploitEnableHiddenFeesAndLayering = false; cfg.exploitEnableMisleadingCostDisplay = false;
        cfg.exploitEnableOptionalTipsDisguiseInterest = false; cfg.exploitEnableFinePrintConsent = false;
        cfg.exploitEnableAutoBankDebitAndOverdraft = false; cfg.exploitEnableMisleadingCollectionThreats = false;
        cfg.exploitEnableMisleadingTestimonials = false; cfg.exploitEnablePersonalDataExploitation = false;
        cfg.exploitEnableTargetedMarketingVulnerable = false; cfg.exploitEnableRentABankLoophole = false;
        cfg.exploitUseTimePressureTacticsExtreme = false; cfg.exploitUseObfuscatedLanguageExtreme = false;
        cfg.exploitPrecheckMultipleOptInExtras = false; cfg.exploitAggressiveCollectionLanguageExtreme = false;
        cfg.exploitDynamicPricingBasedOnDesperation = false; cfg.exploitForceArbitration = false;
        cfg.exploitShareDataWithAffiliates = false;
    }
    
    // Capstone Feature: Pre-Test & Scenario Loading (before strat->intro)
    if (cfg.capstoneKnowledgePreTest && active_mode_name_str=="Regulated Ethical Redesign") { 
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
    if (!sess.deniedByLimit) { UI::showStepIndicator("Gathering Your Information", cfg); strat->consent(sess,cfg); }
    if (!sess.deniedByLimit) { UI::showStepIndicator("Loan Amount & Term", cfg); strat->askAmt(sess, cfg); }
    if (!sess.deniedByLimit) { UI::showStepIndicator("Calculating Fees & APR", cfg); strat->calcFee(sess,cfg); }
    if (!sess.deniedByLimit) { UI::showStepIndicator("Optional Services (If Any)", cfg); strat->extras(sess,cfg); }
    // Renewals are typically part of the post-funding lifecycle, might be better in/after finalize
    // For now, keeping it in the main flow before final consent on initial loan.
    if (!sess.deniedByLimit && (cfg.regulatedAllowRollover || cfg.exploitEnableEndlessRollovers) ) { // Only if rollovers are possible
        UI::showStepIndicator("Renewal/Extension Options (If Applicable)", cfg); 
        strat->renewals(sess,cfg); 
    }
    
    // The finalize step is now the main orchestrator for disclosure, comprehension, consent, education
    if (!sess.deniedByLimit) {
        UI::showStepIndicator("Final Review, Consent & Education", cfg);
        strat->finalize(sess,cfg, active_mode_name_str);
    } else {
        UI::show("\n--- SIMULATION ENDED DUE TO DENIAL ---");
        UI::show("Reason: " + sess.denialReason);
        printSummary(s); // Show summary even if denied early
    }


    // Capstone Features: Post-Test & Survey
    if (cfg.capstoneKnowledgePostTest && active_mode_name_str=="Regulated Ethical Redesign" && !sess.deniedByLimit && sess.consentGiven) {
        UI::conductKnowledgeQuiz(cfg, sess, "Post-Simulation Knowledge & Ethics Assessment (Capstone)");
    }
    if (cfg.capstoneUserSurveyPrompt && !sess.deniedByLimit && sess.consentGiven) {
        UI::show("\n--- Quick Feedback Survey (Optional) ---");
        sess.userFeedbackSurveyResponse = UI::prompt("This simulation aimed to be highly educational. How would you rate its effectiveness in demonstrating ethical lending, informed consent, and predatory tactics (1-5, 5=Very Effective)? Any specific suggestions for improvement or other topics you'd like to see covered?");
        s.record("UserSurveyResponse_EffectivenessAndSuggestions_Overhaul", sess.userFeedbackSurveyResponse);
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

    UI::show("\nSimulation ended. Thank you for using the Lotus CLI Payday Loan Simulator (Deep Dive Educational Overhaul v3).");
    return 0;
}
