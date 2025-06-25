#include "config.h"
#include "ui.h"
#include "loan_session.h"
// #include "strategies/ethical.h" // OLD ETHICAL MODE REMOVED
#include "strategies/exploit.h"   // This is now "Realistic Exploitative Mode"
#include "strategies/regulated.h" // This is now "Regulated Ethical Redesign Mode"

#include <memory>
#include <cstdlib> 
#include <ctime>   

int main(int argc,char* argv[]){
    srand((unsigned)time(nullptr));
    Config cfg; 
    UI::show("=== Lotus CLI Payday Loan Simulator (Enhanced Educational Version) ===");
    std::string mode_input_str=""; 
    std::string state_cli="";
    double presetAmt=-1;
    int presetTerm = -1; // Allow presetting term days

    // Argument parsing - expanded to show how new flags could be parsed
    for(int i=1;i<argc;++i){
        std::string arg=argv[i];
        if(arg.rfind("--mode=",0)==0) mode_input_str=arg.substr(7);
        else if(arg.rfind("--loan=",0)==0) {
            try { presetAmt = std::stod(arg.substr(7)); } catch(...) { UI::show("Invalid loan amount in CLI arg."); }
        }
        else if(arg.rfind("--state=",0)==0) state_cli=arg.substr(8);
        else if(arg.rfind("--term=",0)==0) {
            try { presetTerm = std::stoi(arg.substr(7)); } catch(...) { UI::show("Invalid term days in CLI arg."); }
        }
        // --- Example parsing for new Config flags ---
        // Regulated Ethical Redesign Flags
        else if(arg == "--no-consent-quiz") cfg.regulatedRequireConsentQuiz = false;
        else if(arg == "--no-rescission") cfg.regulatedShowRescissionNotice = false;
        else if(arg.rfind("--income-cap-pct=",0)==0) { try { cfg.regulatedIncomeCapPercentage = std::stod(arg.substr(17)); } catch(...) {} }
        else if(arg == "--disable-tiered-fees") cfg.regulatedEnableTieredFees = false;
        else if(arg.rfind("--max-renewals=",0)==0) { try { cfg.regulatedMaxRenewals = std::stoi(arg.substr(15)); } catch(...) {} }
        else if(arg == "--no-long-term-cost") cfg.regulatedShowLongTermCostTimeline = false;
        else if(arg == "--no-installment-offer") cfg.regulatedOfferInstallmentPlan = false;
        // Exploitative Flags
        else if(arg == "--no-time-pressure") cfg.exploitUseTimePressureTactics = false;
        else if(arg == "--no-fake-testimonials") cfg.exploitShowFakeTestimonials = false;
        // Educational Flags
        else if(arg == "--no-usury-info") cfg.eduProvideUsuryLawInfo = false;
        else if(arg == "--no-harm-data") cfg.eduProvideHarmDataInfo = false;
        // Add more flags as needed...
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

    // Lambda for applying state-specific configurations
    auto applyStateSpecificConfig=[&](const std::string& st_code){
        cfg.state = st_code; 
        UI::show("Applying specific regulations and educational context for state: " + st_code);
        // Defaults that might be overridden by state
        cfg.regulatedAllowRollover = false; 
        cfg.regulatedMaxRenewals = 0;
        cfg.regulatedMaxAPR = 36.0; // General federal guideline often cited

        if(st_code=="SD"){ 
            cfg.regulatedMaxAPR=36.0; cfg.stateSpecificSDPilot=true; cfg.regulatedAllowRollover=true; cfg.regulatedMaxRenewals=1; 
            cfg.eduProvideStateUsuryMap = true; 
        }
        else if(st_code=="DE"){ 
            cfg.regulatedMaxAPR=36.0; cfg.stateSpecificDECase=true; cfg.regulatedAllowRollover=false; cfg.regulatedMaxRenewals=0;
            cfg.eduProvideStateUsuryMap = true;
        }
        // Add more states from the provided text (AL, AK, MT, NJ, WA, WY, FL, TX)
        // Example for IL and CO based on provided text:
        else if(st_code=="IL") { 
            cfg.regulatedMaxAPR=36.0; cfg.regulatedAllowRollover=false; cfg.regulatedMaxRenewals=0; 
            // cfg.regulatedWaitDaysAfter45Indebtedness = 7; // Requires LoanSession tracking
            // cfg.regulatedMaxFirstMonthPaymentPctOfIncome = 25;
            cfg.eduProvideUsuryLawInfo = true; cfg.eduProvideStateUsuryMap = true;
        }
        else if(st_code=="CO") { 
            cfg.regulatedMaxAPR=36.0; cfg.regulatedAllowRollover=true; cfg.regulatedMaxRenewals=1; 
            cfg.regulatedIncomeCapPercentage=20.0; // Already a default, but can be state-specific
            // cfg.regulatedCOFeeCapFirst300 = 20.0; cfg.regulatedCOFeeCapExcess = 7.5;
            // cfg.regulatedMinTermDays = 180; // For certain loan types/amounts
            cfg.eduProvideUsuryLawInfo = true; cfg.eduProvideStateUsuryMap = true;
        }
        // Add AL, AK, MT, NJ, WA, WY, FL, TX with their rules from the table
        else if(st_code=="AL") { cfg.regulatedMaxAPR=28.0; /* approx from $10/100 for 10-31 days */ cfg.regulatedAllowRollover=false; cfg.regulatedMaxRenewals=0; cfg.defaultDaysToRepay=31; }
        else if(st_code=="AK") { cfg.regulatedMaxAPR=500.0; /* No APR cap, 15% orig fee, example high APR */ cfg.regulatedAllowRollover=true; cfg.regulatedMaxRenewals=1; cfg.defaultDaysToRepay=14; }
        // ... and so on for other states
        else {
            UI::show("No specific pre-set rules for state '" + st_code + "'. Using general regulated defaults.");
        }
        // Sync general rollover config with state-specific renewal limit
        cfg.regulatedAllowRollover = (cfg.regulatedMaxRenewals > 0);
    };

    if(!state_cli.empty()){ applyStateSpecificConfig(state_cli); }
    else {
        std::string state_input_prompt = UI::prompt("Enter 2-letter state code for specific regulations (e.g., IL, CO, SD), or leave blank for general rules:");
        if (!state_input_prompt.empty()) {
            applyStateSpecificConfig(state_input_prompt);
        } else {
            UI::show("No state selected. Using general regulated defaults (e.g., 36% APR cap, limited/no rollovers).");
            // Apply general defaults if no state selected
            cfg.regulatedMaxAPR = 36.0;
            cfg.regulatedAllowRollover = false;
            cfg.regulatedMaxRenewals = 0;
        }
    }
    // Set default term days from config if not preset by CLI
    if(presetTerm > 0) {
        cfg.defaultDaysToRepay = presetTerm;
    }


    std::unique_ptr<LoanStrategy> strat;
    std::string active_mode_name_str; 

    if(mode_input_str=="exploitative") {
        strat = std::make_unique<Exploit>();
        active_mode_name_str = "Realistic Exploitative";
        cfg.sessionExportFileName = "exploit_session.json";
        // Ensure exploitative flags are dominant
        cfg.forceArbitrationClause = cfg.exploitForceArbitration; // Use specific exploit flag
        cfg.shareDataWithPartnersExploit = cfg.exploitShareDataWithAffiliates;
        // Turn off Regulated/Ethical features if not already off by default for exploit
        cfg.regulatedRequireFullDisclosure = false;
        cfg.regulatedRequireConsentQuiz = false;
        cfg.regulatedBanArbitration = !cfg.exploitForceArbitration;
        cfg.regulatedShareDataOptInOnly = !cfg.exploitShareDataWithAffiliates;
        cfg.regulatedApplyIncomeCap = false;
        cfg.regulatedEnableTieredFees = false;
        cfg.regulatedOfferInstallmentPlan = false;
        cfg.regulatedWarnExcessiveFees = false; // Exploitative mode won't warn
        cfg.eduProvideHarmDataInfo = false; // Don't educate in exploitative mode
        cfg.eduPrintKantLecture = false; // etc.
        cfg.eduPrintRawlsLecture = false;
        cfg.eduPrintMillLecture = false;
    }
    else /* if (mode_input_str=="regulated_ethical") */ { 
        strat = std::make_unique<Regulated>(); 
        active_mode_name_str = "Regulated Ethical Redesign";
        cfg.sessionExportFileName = "regulated_ethical_redesign_session.json";
        // Ensure ethical/regulated flags are dominant
        cfg.forceArbitrationClause = !cfg.regulatedBanArbitration;
        cfg.shareDataWithPartnersExploit = !cfg.regulatedShareDataOptInOnly;
        // Ensure exploitative tactics are off
        cfg.exploitUseTimePressureTactics = false;
        cfg.exploitShowFakeTestimonials = false;
        cfg.exploitUseObfuscatedLanguage = false;
    }
    
    LoanSession sess;
    sess.termDays = cfg.defaultDaysToRepay; // Initialize session term days
    if(presetAmt>0) sess.amount=presetAmt;

    strat->intro(sess,cfg);
    if (!sess.deniedByLimit) strat->consent(sess,cfg); 
    if (!sess.deniedByLimit) strat->askAmt(sess);
    if (!sess.deniedByLimit) strat->calcFee(sess,cfg);
    if (!sess.deniedByLimit) strat->extras(sess,cfg);
    if (!sess.deniedByLimit) strat->renewals(sess,cfg);
    
    strat->finalize(sess,cfg, active_mode_name_str);

    UI::show("\nSimulation ended. Thank you for using the Lotus CLI Payday Loan Simulator.");
    return 0;
}
