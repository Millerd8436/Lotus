#include "ui.h"
#include "config.h"       
#include "loan_session.h" 
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <thread>
#include <chrono>
#include <iomanip>
#include <cmath>
#include <sstream>
#include <cstdio>


// Definition for the global helper variable
std::string UI::active_mode_name_str_ui_helper; 

// Template definition for string_format
template<typename ... Args>
std::string string_format( const std::string& format, Args ... args ) {
    int size_s = std::snprintf( nullptr, 0, format.c_str(), args ... ) + 1; 
    if( size_s <= 0 ){ throw std::runtime_error( "Error during formatting." ); }
    auto size = static_cast<size_t>( size_s );
    std::vector<char> buf( size );
    std::snprintf( buf.data(), size, format.c_str(), args ... );
    return std::string( buf.data(), buf.data() + size - 1 ); 
}

namespace UI {

    bool argEquals(const std::string& arg1, const std::string& arg2) {
        std::string lower_arg1 = arg1;
        std::transform(lower_arg1.begin(), lower_arg1.end(), lower_arg1.begin(), 
                       [](unsigned char c){ return std::tolower(c); });
        std::string lower_arg2 = arg2;
        std::transform(lower_arg2.begin(), lower_arg2.end(), lower_arg2.begin(), 
                       [](unsigned char c){ return std::tolower(c); });
        return lower_arg1 == lower_arg2;
    }

    std::string prompt(const std::string &s_text){ 
        show(s_text); std::string r; std::getline(std::cin,r);
        if(argEquals(r, "exit")) { show("Session ended by user."); std::exit(0); }
        return r;
    }

    double askNum(const std::string &s_text){ 
        while(true){
            std::string v_str = prompt(s_text); 
            try { 
                double x = std::stod(v_str); 
                if(x>=0) return x; 
                else show("\u26A0\uFE0F Number cannot be negative. Please enter a valid amount or '0'.");
        fullTitle += "\n================================================================================\n";
        show(fullTitle);
    }

     void showSubSectionHeader(const std::string& title) {
        show("\n--- " + title + " ---\n");
    }

    void showStepIndicator(const std::string& stepInfo, const Config& c) {
        if (c.uiRegulatedClearStepIndicators && argEquals(active_mode_name_str_ui_helper, "Regulated Ethical Redesign")) { 
            UI::show("\n== [REGULATED PROCESS STEP: " + stepInfo + "] ==");
        }
    }

    void simulateClutter(const Config& c, LoanSession& s) {
        if (c.uiExploitClutteredInterface && argEquals(active_mode_name_str_ui_helper, "Realistic Exploitative")) {
            UI::show("\n********************************************************************************************");
            UI::show("* XPRESSLOOT™ DAILY JACKPOT! Refer 1 Friend, Get $25! Refer 5, Get $150! Limited Time Offer! *");
            UI::show("* URGENT SYSTEM NOTIFICATION: Your credit profile indicates you may qualify for our EXCLUSIVE Platinum Tier Loan! Click here for details! *");
            UI::show("* WARNING: Missing payments can severely impact your future creditworthiness with ALL lenders and may result in additional penalty fees! *");
            UI::show("* CHECK OUT OUR VALUED PARTNER: 'DebtCrusher' Financial Solutions - Consolidate your debts today for ONE LOW PAYMENT! (Sponsored Link - Terms Apply)        *");
            UI::show("********************************************************************************************\n");
            s.tagDarkPattern("UI_Clutter_DistractionAds_SponsoredContent_Upsell");
        }
    }

    bool simulateUrgencyPopup(const Config& c, LoanSession& s, const std::string& offerDetail, int& countdownSeconds) {
        if (c.uiExploitAggressivePopups && c.exploitUseTimePressureTacticsExtreme && argEquals(active_mode_name_str_ui_helper, "Realistic Exploitative")) {
            UI::show("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            UI::show("!! 💥 URGENT ACTION REQUIRED: " + offerDetail + " 💥 !!");
            UI::show("!! This exclusive, one-time-only offer for YOU expires in: " + std::to_string(countdownSeconds) + " SECONDS !!");
            UI::show("!! Thousands are applying for this limited funding pool! Don't miss YOUR chance for INSTANT financial relief!         !!");
            UI::show("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            std::string action = prompt("Type 'ACCEPT NOW & GET MY CASH!' to claim this unbeatable deal or 'RISK IT & LOSE OUT' to potentially lose this deal forever: ");
            s.record("UrgencyPopupResponse_Exploit_v2", offerDetail + "_" + action);
            if (argEquals(action, "ACCEPT NOW & GET MY CASH!")) {
                s.respondedToUrgencyPopup = true;
                s.tagDarkPattern("UrgencyPopup_AcceptedOffer_HighPressure_FOMO");
                return true; 
            } else {
                s.tagDarkPattern("UrgencyPopup_DismissedOffer_RiskWarning_FOMO");
                countdownSeconds = 0; 
                s.offerTimerExpiredCount++;
                UI::show("Offer may no longer be available at the same terms or could be GONE FOREVER! You hesitated and may have missed out...");
                if (c.exploitOfferChangesIfTimerExpires) {
                    UI::show("Due to overwhelming demand and your delay, the terms for this offer have now been revised upwards slightly. New, less favorable terms may apply.");
                    s.tagDarkPattern("OfferWorsenedAfterTimer_Punishment_Exploit");
                }
                return false; 
            }
        }
        return true; 
    }
    
    int startCountdownTimer(const Config& c, LoanSession& s, const std::string& timerId) {
        if (c.exploitUseTimePressureTacticsExtreme && argEquals(active_mode_name_str_ui_helper, "Realistic Exploitative")) {
            int seconds = c.uiExploitCountdownTimerSeconds;
            UI::show("⏳⏳⏳ COUNTDOWN TIMER ACTIVATED for " + timerId + ": " + std::to_string(seconds) + " seconds remaining! ACT FAST OR LOSE THIS RATE! ⏳⏳⏳");
            s.record("CountdownTimerStarted_Exploit_v2", timerId + "_" + std::to_string(seconds) + "s");
            return seconds;
        }
        return 0;
    }

    bool checkCountdownTimer(int &seconds, LoanSession& s, const std::string& timerId) {
        if (seconds > 0 && argEquals(active_mode_name_str_ui_helper, "Realistic Exploitative")) {
            int timePassedThisStep = rand() % (seconds/2 > 0 ? seconds/2 : 1) + (seconds/4 > 0 ? seconds/4 : 1) ; // Pass more significant chunk of time
            seconds -= timePassedThisStep;
            seconds = std::max(0, seconds); // Ensure it doesn't go negative
            if (seconds <= 0) {
                UI::show("⏳⏳⏳ TIME'S UP for " + timerId + "! Offer terms may have changed or expired due to high demand and your delay! ⏳⏳⏳");
                s.record("CountdownTimerExpired_Exploit_v2", timerId);
                s.offerTimerExpiredCount++;
                return false; 
            }
            UI::show("⏳ " + timerId + " - CRITICAL Time remaining: " + std::to_string(seconds) + "s. Don't delay, others are waiting!");
            return true; 
        }
        return false; 
    }

    void showDisclosureHeader(const std::string& title) { 
        show("\n==== " + title + " ====");
    }
    
    void showTILAHeader(const Config& c) { 
        showDisclosureHeader(c.regulatedTILAHeaderFull); 
    }

    void showDisclosureItem(const std::string& label, const std::string& value, bool important) {
        show((important ? " ** " : "  • ") + label + ": " + value); // Use markdown-like bold for important
    }
    
    // askMultiChoiceQuiz definition (already in UI.h as inline, can be moved here if preferred)

    void showEthicalPrinciple(const std::string& philosopher, const std::string& principle, const std::string& coreIdea, const std::string& applicationInLending, const std::string& citation) {
        UI::showSubSectionHeader("ETHICAL FRAMEWORK FOCUS: " + philosopher + " - " + principle);
        UI::show("Core Idea: " + coreIdea);
        UI::show("\nApplication in This Lending Simulation:");
        std::stringstream ss(applicationInLending);
        std::string segment;
        while(std::getline(ss, segment, '\n')) {
            UI::show("  " + segment);
        }
        if (!citation.empty()) UI::tiny("Primary Source/Inspiration: " + citation);
    }

    void showEducationalSnippet(const std::string& title, const std::string& content, const std::string& sourceRefs) {
        UI::showSubSectionHeader("EDUCATIONAL MODULE: " + title);
        std::stringstream ss(content);
        std::string segment;
        while(std::getline(ss, segment, '\n')) {
            UI::show(segment);
        }
        if (!sourceRefs.empty()) UI::tiny("Key References/Sources: " + sourceRefs);
    }

    void showWarning(const std::string& message) {
        show("⚠️ IMPORTANT WARNING: " + message);
    }
    
    // showFinePrint definition (already in UI.h as inline, can be moved here if preferred)
    // showTimePressure definition (already in UI.h as inline, can be moved here if preferred)
    // showFakeTestimonial definition (already in UI.h as inline, can be moved here if preferred)

    void schedule(double amt,double fee,int days, bool isInstallment, int numInstallments){
        double total_repayment = amt + fee;
        UI::showSubSectionHeader("Loan Repayment Schedule Illustration");
        if (isInstallment && numInstallments > 0) {
            UI::show(string_format("Installment Loan: $%.2f principal + $%.2f total fee = $%.2f total repayment.", amt, fee, total_repayment));
            UI::show(string_format("To be repaid in %d monthly installments.", numInstallments));
            double principal_per_installment = amt / numInstallments; // Simplified equal principal
            double fee_per_installment = fee / numInstallments;       // Simplified equal fee
            double payment_per_installment = principal_per_installment + fee_per_installment;
            double current_balance = amt;
            UI::show("--------------------------------------------------------------------------");
            UI::show("Month | Payment  | Principal Paid | Fee Paid | Remaining Principal Balance");
            UI::show("--------------------------------------------------------------------------");
            for (int i = 1; i <= numInstallments; ++i) {
                current_balance -= principal_per_installment;
                UI::show(string_format("%-5d | $%-8.2f | $%-14.2f | $%-7.2f | $%-20.2f", 
                           i, payment_per_installment, principal_per_installment, fee_per_installment, std::max(0.0, current_balance)));
            }
            UI::show("--------------------------------------------------------------------------");
        } else {
            UI::show(string_format("Single Payment Loan: $%.2f principal + $%.2f fee = $%.2f total repayment.", amt, fee, total_repayment));
            UI::show(string_format("Full payment of $%.2f due in %d days.", total_repayment, days));
        }
    }
    
    void printUsuryHistory(const Config& c, LoanSession& s) {
        s.addEducationalModuleShown("UsuryHistory_from_" + c.eduUsuryHistoryDataFile); 
        UI::showEducationalSnippet("A Deep Dive into the History of Usury Laws (Simulated - Ref: " + c.eduUsuryHistoryDataFile + ")", 
            "- ~1792 BCE, Babylon (Code of Hammurabi): Earliest known regulations. Sets ~20-33% annual cap on grain/silver loans, with severe penalties for violations.\n"
            "- ~450 BCE, Roman Law (Twelve Tables): Establishes maximum interest rates (unciae faenus, ~8.3% annually), reflecting societal concern over exploitative lending.\n"
            "- Middle Ages (Scholastic Theologians & Church Councils, e.g., Third Lateran Council 1179): Usury (charging any interest on loans, not just excessive interest) widely condemned as sinful for Christians, based on Aristotelian ideas of money being barren.\n"
            "- Reformation Era (Calvin, Luther, etc.): Nuanced views emerge. Distinction between oppressive usury and 'reasonable' interest for commercial ventures begins to be accepted, though personal loans to the needy often still viewed critically.\n"
            "- 1545 CE, England: Statute of Henry VIII allows interest up to 10%, marking a shift towards state regulation of interest rather than outright prohibition.\n"
            "- 19th Century USA: States begin enacting their own usury laws, often with general caps around 6-12%.\n"
            "- 1968 CE, USA: Truth in Lending Act (TILA), Regulation Z codifies Annual Percentage Rate (APR) disclosure requirements for consumer credit, aiming for transparency and comparability of loan costs.\n"
            "- 1978 CE, USA: Marquette Nat. Bank of Minneapolis v. First of Omaha Service Corp. Supreme Court decision allows national banks to export interest rates of their home state to borrowers in other states, weakening state usury laws for bank-issued credit cards.\n"
            "- 2006 CE, USA: Military Lending Act (MLA) caps most loans to active-duty military personnel and their dependents at 36% MAPR (Military APR), an all-inclusive rate.\n"
            "- 2010-2020s CE, USA: CFPB actions and state-level reforms (e.g., CO Prop 111, IL PLPA rollover ban) often target a ~36% APR cap for small-dollar, high-cost loans, though many states still permit much higher rates or have significant loopholes (like Credit Access Businesses in TX, or lack of caps in UT/ID).\n"
            "This long historical arc shows a continuous societal effort to balance the need for credit with robust protection against exploitative interest rates."
        , "Various historical texts, NCLC reports, 'Confessions of a Payday Lender' (hypothetical)");
    }

    void printHarmData(const Config& c, LoanSession& s) {
        s.addEducationalModuleShown("HarmData_Pew_CFPB_CRL_Empirical_Detailed_v3");
        UI::showEducationalSnippet("Empirical Data on Payday Loan Harms & The Debt Trap (Sources: Pew Charitable Trusts, CFPB, Center for Responsible Lending, Academic Studies)",
            "- **Pew Charitable Trusts (2013)**: Found 70% of payday loan borrowers reported that they would have preferred to repay their loans in installments rather than a single payment.\n"
            "- **CFPB (2014)**: Payday loans have an average APR of 391%. Many borrowers do not understand the true cost of these loans.\n"
            "- **Center for Responsible Lending (2016)**: Predatory payday lending costs Americans $4.1 billion in fees annually. The typical borrower takes out 10 loans per year, with each loan costing $520 in fees.\n"
            "- **Pew Charitable Trusts (2018)**: 76% of payday loan borrowers say they would have benefited from a longer-term, installment loan with a lower APR.\n"
            "- **CFPB (2020)**: Proposed rules to curb payday lending abuses, including a requirement that lenders determine a borrower's ability to repay the loan without re-borrowing.\n"
            "- **Various Studies (2010-2023)**: Consistently find that payday loans can lead to a cycle of debt, with borrowers often taking out new loans to pay off old ones, resulting in excessive fees and financial instability.\n"
            "This data underscores the critical need for responsible lending practices, robust consumer protections (like ability-to-repay standards and APR caps), and widespread awareness of the substantial risks associated with high-cost, short-term credit products."
        , "Pew Charitable Trusts (various reports 2012-2023), CFPB Data Points & Payday Lending Rule research (2013-2020), Center for Responsible Lending (CRL) reports.");
    }
    
    void printStateUsuryMap(const Config& c, LoanSession& s) {
        s.addEducationalModuleShown("StateUsuryMap_from_" + c.eduStateUsuryMapDataFile + "_Interactive_v2"); 
        StateSpecificRules currentRules = c.getCurrentStateRules(); 
        UI::showEducationalSnippet("State-by-State Usury & Payday Loan Regulation Snapshot (Illustrative)", 
            "- **California (CA)**: Maximum 10% interest per annum for loans over $300. No cap for loans under $300, but must be paid in full within 31 days.\n"
            "- **Texas (TX)**: No general usury limit, but payday and auto title lenders are regulated. Effective APRs can exceed 600%.\n"
            "- **New York (NY)**: Maximum 25% interest for loans up to $3500, 16% for loans over $3500. No payday lending allowed.\n"
            "- **Illinois (IL)**: Maximum 36% APR for all consumer loans, including payday loans. Effective since 2019.\n"
            "- **Florida (FL)**: Maximum 10% monthly fee for payday loans, with a minimum loan term of 7 days. APRs can exceed 300%.\n"
            "- **Ohio (OH)**: Maximum 28% APR for loans up to $500, 24% for loans between $500 and $1000. No payday lending allowed.\n"
            "- **Washington (WA)**: Maximum 30% APR for loans up to $700, 25% for loans between $700 and $1400. No payday lending allowed.\n"
            "- **Oregon (OR)**: Maximum 36% APR for all consumer loans. Payday loans are effectively banned due to high costs.\n"
            "- **Georgia (GA)**: Maximum 10% per month for loans up to $300, 2.5% per month for loans over $300. APRs can exceed 300%.\n"
            "- **South Carolina (SC)**: Maximum 15% per month for loans up to $600, 10% for loans between $600 and $1000. APRs can exceed 180%.\n"
            "\nIt is CRUCIAL to consult your specific state's current, official consumer finance statutes and your state Attorney General's office or Department of Financial Institutions for the most accurate, up-to-date, and detailed information, as laws can change and interpretations vary significantly.");
    }

    void printCounselorReferral(const Config& c, LoanSession& s) {
        s.addEducationalModuleShown("CounselorReferral_from_" + c.eduCounselorContactsDataFile + "_Local"); 
        std::string referral_info = "If you are facing financial difficulties or need help managing debt, consider contacting a non-profit credit counseling agency accredited by the National Foundation for Credit Counseling (NFCC) or the Financial Counseling Association of America (FCAA). These organizations offer confidential advice, debt management plans, and financial education.\n";
        if (!s.zipCode.empty() && s.zipCode != "[StateSetByCLI_ZipNotNeededForStateSelection_Holistic]") { // Check if zip is valid
            referral_info += "For local resources near ZIP code " + s.zipCode + ", you can search online for 'NFCC credit counselor " + s.zipCode + "' or 'FCAA credit counselor " + s.zipCode + "'.\n";
            // Simulate looking up a contact from c.eduCounselorContactsDataFile
            if (s.zipCode == "63130") referral_info += "  Example for 63130: Economy Shop, Phone: 314-367-3433 (Simulated from " + c.eduCounselorContactsDataFile + ")\n";
        } else {
            referral_info += "You can visit the NFCC website (nfcc.org) or call 1-800-388-2227, or visit the FCAA website (fcaa.org) for more information on finding a certified credit counselor.\n";
        }
        UI::showEducationalSnippet("Financial Counseling & Debt Management Resources", referral_info + "\nSeeking professional advice can provide you with a clear path towards financial stability.");
    }

    void printBelmontPrimer(LoanSession& s) {
        UI::showSectionHeader("ETHICAL PRIMER: GUIDING PRINCIPLES (Belmont Report Inspired)", "Regulated Ethical Redesign");
        UI::tooltip("The Belmont Report outlined ethical principles for research involving human subjects. These principles have broader applicability to situations involving vulnerable individuals and power imbalances, such as lending.");
        UI::show("This simulation's ethical framework is inspired by these core principles:");
        UI::show("  1. Respect for Persons (Autonomy): Individuals should be treated as autonomous agents. Persons with diminished autonomy are entitled to protection. This translates to robust informed consent.");
        UI::show("  2. Beneficence (Do Good): Obligations to (a) do no harm and (b) maximize possible benefits and minimize possible harms. In lending, this means designing products that are not unduly harmful and offer real utility.");
        UI::show("  3. Justice (Fairness): Fairness in distribution of burdens and benefits. Who ought toreceive the benefits of financial products and bear their burdens? This involves ensuring fair access and protecting vulnerable populations from disproportionate harm or exploitation.");
        UI::show("These principles, along with Kantian, Rawlsian, and Millian ethics, guide our approach to responsible lending.");
        s.addEducationalModuleShown("BelmontPrinciplesPrimer");
        s.tagEthicalSafeguard("BelmontPrimerPresented");
    }


    // Definitions for Capstone & Deeper Informed Consent UI Functions
    // (loadScenarioPreset, conductKnowledgeQuiz, promptJournaling, showLoanSummaryCard, 
    //  promptKantianUniversalizability, promptMillHarmPrincipleForRollovers, 
    //  conductVoluntarinessDeclaration, printComplianceAuditEnforcement, defineTermInteractively
    //  as previously detailed, ensuring they are robust and use Config & LoanSession)

    // Example for defineTermInteractively
    void defineTermInteractively(LoanSession& s, const std::string& term, const std::string& definition) {
        std::string resp = UI::prompt("Would you like a plain English definition of '" + term + "'? (yes/no)");
        if (argEquals(resp, "yes")) {
            UI::show("Plain Language Definition: '" + term + "' means: " + definition);
            s.record("InteractiveTermDefinitionShown_v2", term);
            s.usedInteractiveDefinition = true;
            s.tagEthicalSafeguard("InteractiveTermDefinitionUsed_" + term + "_Beauchamp");
        }
    }

    // ... (Implement all other declared functions here with full detail) ...

} // namespace UI
#endif
