#ifndef LOTUS_UI_H
#define LOTUS_UI_H

#include <iostream>
#include <string>
#include <thread>
#include <chrono>
#include <vector> 
#include <iomanip> 
#include <cmath>   
#include <algorithm> 
#include <cstdio> 
#include <sstream> 

// Forward declarations
struct Config; 
class LoanSession; 
struct StateSpecificRules; 

// Helper for string formatting
template<typename ... Args>
std::string string_format( const std::string& format, Args ... args ); 

// Global variable to hold active mode name string for UI functions that need it
extern std::string active_mode_name_str_ui_helper; 

namespace UI {
    // Basic UI functions
    inline void show(const std::string &s){ std::cout<<s<<"\n"; }
    inline void show_raw(const std::string &s){ std::cout<<s; } 
    bool argEquals(const std::string& arg1, const std::string& arg2); // Now a declaration
    std::string prompt(const std::string &s_text); // Now a declaration
    double askNum(const std::string &s_text); // Now a declaration
    void wait(int s_seconds, bool showCountdown = true); // Now a declaration
    void bank(); // Now a declaration
    inline void tiny(const std::string &t){ std::cout<<"(Fine Print / Tiny Text Notice) "<<t<<"\n"; }
    inline void tooltip(const std::string &t){ show("🛈 INFO/TIP: " + t); }
    inline void legalNotice(const std::string &t){ show("⚖️ LEGAL/REGULATORY NOTICE: " + t); }
    
    // Enhanced UI for Realism & Education
    void showSectionHeader(const std::string& title, const std::string& modeContext = ""); 
    void showSubSectionHeader(const std::string& title);
    void showStepIndicator(const std::string& stepInfo, const Config& c); 
    void simulateClutter(const Config& c, LoanSession& s); 
    bool simulateUrgencyPopup(const Config& c, LoanSession& s, const std::string& offerDetail, int& countdownSeconds); 
    int startCountdownTimer(const Config& c, LoanSession& s, const std::string& timerId); 
    bool checkCountdownTimer(int &seconds, LoanSession& s, const std::string& timerId); 
    void showDisclosureHeader(const std::string& title); 
    void showTILAHeader(const Config& c); 
    void showDisclosureItem(const std::string& label, const std::string& value, bool important = false);
    bool askMultiChoiceQuiz(LoanSession& s, const std::string& question_text, const std::vector<std::string>& options, int correct_option_index, const std::string& context_tag);
    void showEthicalPrinciple(const std::string& philosopher, const std::string& principle, const std::string& coreIdea, const std::string& applicationInLending, const std::string& citation = "");
    void showEducationalSnippet(const std::string& title, const std::string& content, const std::string& sourceRefs = "");
    void showWarning(const std::string& message);
    void showFinePrint(const std::string& text);
    void showTimePressure(const std::string& message, int wait_seconds = 3);
    void showFakeTestimonial(const std::string& testimonial, const std::string& author = "A. 'Happy' Customer");
    void schedule(double amt,double fee,int days, bool isInstallment = false, int numInstallments = 0); 
    
    // Educational Content Print Functions
    void printUsuryHistory(const Config& c, LoanSession& s); 
    void printHarmData(const Config& c, LoanSession& s); 
    void printStateUsuryMap(const Config& c, LoanSession& s); 
    void printCounselorReferral(const Config& c, LoanSession& s); 
    void printBelmontPrimer(LoanSession& s); // For Belmont Principles

    // Capstone & Informed Consent UI Functions
    void loadScenarioPreset(const Config& c, LoanSession& s, const std::string& scenarioId); 
    void conductKnowledgeQuiz(const Config& c, LoanSession& s, const std::string& quizType); 
    void promptJournaling(const Config& c, LoanSession& s); 
    void showLoanSummaryCard(const LoanSession& s, const Config& c, double actualAPR); 
    void promptKantianUniversalizability(const Config& c, LoanSession& s); 
    void promptMillHarmPrincipleForRollovers(const Config& c, LoanSession& s, int currentRollovers); 
    void conductVoluntarinessDeclaration(LoanSession& s, const Config& c); 
    void printComplianceAuditEnforcement(const Config& c, LoanSession& s, const StateSpecificRules& rules); 
    void defineTermInteractively(LoanSession& s, const std::string& term, const std::string& definition);

} // namespace UI

#endif
        show("✅ Bank services connection established and identity preliminarily verified (Simulated).");
    }
    inline void tiny(const std::string &t){ std::cout<<"(Fine Print / Tiny Text Notice) "<<t<<"\n"; }
    inline void tooltip(const std::string &t){ show("🛈 INFO/TIP: " + t); }
    inline void legalNotice(const std::string &t){ show("⚖️ LEGAL/REGULATORY NOTICE: " + t); }
    
    // Declarations for functions that need Config, LoanSession, StateSpecificRules
    // These will be defined after including the necessary headers or in UI.cpp
    void showSectionHeader(const std::string& title, const std::string& modeContext = ""); 
    void showSubSectionHeader(const std::string& title);
    void showStepIndicator(const std::string& stepInfo, const Config& c); 
    void simulateClutter(const Config& c, LoanSession& s); 
    bool simulateUrgencyPopup(const Config& c, LoanSession& s, const std::string& offerDetail, int& countdownSeconds); 
    int startCountdownTimer(const Config& c, LoanSession& s, const std::string& timerId); 
    bool checkCountdownTimer(int &seconds, LoanSession& s, const std::string& timerId); 
    void showDisclosureHeader(const std::string& title); 
    void showTILAHeader(const Config& c); 
    void showDisclosureItem(const std::string& label, const std::string& value, bool important = false);
    bool askMultiChoiceQuiz(LoanSession& s, const std::string& question_text, const std::vector<std::string>& options, int correct_option_index, const std::string& context_tag);
    void showEthicalPrinciple(const std::string& philosopher, const std::string& principle, const std::string& coreIdea, const std::string& applicationInLending, const std::string& citation = "");
    void showEducationalSnippet(const std::string& title, const std::string& content, const std::string& sourceRefs = "");
    void showWarning(const std::string& message);
    void showFinePrint(const std::string& text);
    void showTimePressure(const std::string& message, int wait_seconds = 3);
    void showFakeTestimonial(const std::string& testimonial, const std::string& author = "A. 'Happy' Customer");
    void schedule(double amt,double fee,int days, bool isInstallment = false, int numInstallments = 0); 
    
    void printUsuryHistory(const Config& c, LoanSession& s); 
    void printHarmData(const Config& c, LoanSession& s); 
    void printStateUsuryMap(const Config& c, LoanSession& s); 
    void printCounselorReferral(const Config& c, LoanSession& s); 
    void loadScenarioPreset(const Config& c, LoanSession& s, const std::string& scenarioId); 
    void conductKnowledgeQuiz(const Config& c, LoanSession& s, const std::string& quizType); 
    void promptJournaling(const Config& c, LoanSession& s); 
    void showLoanSummaryCard(const LoanSession& s, const Config& c, double actualAPR); 
    void promptKantianUniversalizability(const Config& c, LoanSession& s); 
    void promptMillHarmPrincipleForRollovers(const Config& c, LoanSession& s, int currentRollovers); 
    void conductVoluntarinessDeclaration(LoanSession& s, const Config& c); 
    void printComplianceAuditEnforcement(const Config& c, LoanSession& s, const StateSpecificRules& rules); 

} // namespace UI

// It's generally better to put definitions in a .cpp file to avoid multiple definition errors
// if UI.h is included in multiple .cpp files that get linked together.
// However, for this exercise, if they are small and inline, it might be acceptable,
// but be mindful of this for larger projects.
// For now, I will move the definitions of functions requiring Config/LoanSession to UI.cpp
// and only keep truly inline simple functions here.

#endif
        show(fullTitle);
    }
     inline void showSubSectionHeader(const std::string& title) {
        show("\n--- " + title + " ---\n");
    }

    inline void showStepIndicator(const std::string& stepInfo, const Config& c) {
        if (c.uiRegulatedClearStepIndicators && argEquals(active_mode_name_str, "Regulated Ethical Redesign")) { // Check mode
            UI::show("\n== [REGULATED PROCESS STEP: " + stepInfo + "] =="";
        }
    }

    inline void simulateClutter(const Config& c, LoanSession& s) {
        if (c.uiExploitClutteredInterface && argEquals(active_mode_name_str, "Realistic Exploitative")) {
            UI::show("\n********************************************************************************************");
            UI::show("* XPRESSLOOT™ DAILY JACKPOT! Refer 5 friends, get $50 CASH BACK! Limited Time Offer! Act NOW! *");
            UI::show("* URGENT: Your credit profile indicates you may qualify for our EXCLUSIVE Platinum Loan!      *");
            UI::show("* WARNING: Missing payments can severely impact your future creditworthiness with ALL lenders! *");
            UI::show("* CHECK OUT OUR PARTNER: 'DebtBeGone' Solutions - Consolidate today! (Sponsored Link)        *");
            UI::show("********************************************************************************************\n");
            s.tagDarkPattern("UI_Clutter_DistractionAds_SponsoredContent");
        }
    }
    
    inline bool simulateUrgencyPopup(const Config& c, LoanSession& s, const std::string& offerDetail, int& countdownSeconds) {
        if (c.uiExploitAggressivePopups && c.exploitUseTimePressureTacticsExtreme) {
            UI::show("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            UI::show("!! 💥 URGENT ACTION REQUIRED: " + offerDetail + " 💥 !!");
            UI::show("!! This exclusive, one-time offer for YOU expires in: " + std::to_string(countdownSeconds) + " SECONDS !!");
            UI::show("!! Thousands are applying! Don't miss YOUR chance for INSTANT relief!         !!");
            UI::show("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            std::string action = prompt("Type 'ACCEPT NOW & GET MY CASH!' to claim or 'RISK IT' to potentially lose this deal forever: ");
            s.record("UrgencyPopupResponse_Exploit", offerDetail + "_" + action);
            if (argEquals(action, "ACCEPT NOW & GET MY CASH!")) {
                s.respondedToUrgencyPopup = true;
                s.tagDarkPattern("UrgencyPopup_AcceptedOffer_HighPressure");
                return true; 
            } else {
                s.tagDarkPattern("UrgencyPopup_DismissedOffer_RiskWarning");
                countdownSeconds = 0; 
                s.offerTimerExpiredCount++;
                UI::show("Offer may no longer be available at the same terms or could be GONE! You hesitated...");
                if (c.exploitOfferChangesIfTimerExpires) {
                    UI::show("Due to high demand, the terms for this offer have now been revised upwards slightly.");
                    s.tagDarkPattern("OfferWorsenedAfterTimer_Punishment");
                }
                return false; 
            }
        }
        return true; 
    }
    
    inline int startCountdownTimer(const Config& c, LoanSession& s, const std::string& timerId) {
        if (c.exploitUseTimePressureTacticsExtreme) {
            int seconds = c.uiExploitCountdownTimerSeconds;
            UI::show("⏳⏳⏳ COUNTDOWN TIMER ACTIVATED for " + timerId + ": " + std::to_string(seconds) + " seconds remaining! ACT FAST! ⏳⏳⏳");
            s.record("CountdownTimerStarted_Exploit", timerId + "_" + std::to_string(seconds) + "s");
            return seconds;
        }
        return 0;
    }

    inline bool checkCountdownTimer(int &seconds, LoanSession& s, const std::string& timerId) {
        if (seconds > 0) {
            int timePassedThisStep = rand() % 15 + 10; // Simulate 10-24 seconds passing
            seconds -= timePassedThisStep;
            if (seconds <= 0) {
                UI::show("⏳⏳⏳ TIME'S UP for " + timerId + "! Offer terms may have changed or expired due to high demand! ⏳⏳⏳");
                s.record("CountdownTimerExpired_Exploit", timerId);
                s.offerTimerExpiredCount++;
                return false; 
            }
            UI::show("⏳ " + timerId + " - Time remaining: " + std::to_string(seconds) + "s. Don't delay!");
            return true; 
        }
        return false; 
    }
    
    // Definitions for educational print functions using Config and LoanSession
    // (These were previously declared and are now fully defined here, assuming Config and LoanSession are complete)
    inline void printUsuryHistory(const Config& c, LoanSession& s) {
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
            "This long historical arc shows a continuous societal effort to balance the need for credit with robust protection against exploitative interest rates and lending practices."
        , "Various historical texts, NCLC reports, 'Confessions of a Payday Lender' (hypothetical)");
    }

    inline void printHarmData(const Config& c, LoanSession& s) {
        s.addEducationalModuleShown("HarmData_Pew_CFPB_CRL_Empirical_Detailed_v2");
        UI::showEducationalSnippet("Empirical Data on Payday Loan Harms & The Debt Trap (Sources: Pew Charitable Trusts, CFPB, Center for Responsible Lending, Academic Studies)",
            "- **The Debt Trap is Real:** Approximately 80% of payday loans are re-borrowed within a month (renewed or a new loan taken out shortly after repaying the old one). The average borrower is indebted for about 5-6 months of the year, taking out 8-10 loans annually. This demonstrates that for most, these are not one-time emergency solutions but a cycle of debt.\n"
            "- **Unaffordable Payments:** Typical payday loans require a lump-sum repayment (principal + all fees) that consumes about one-third (30-36%) of an average borrower's next paycheck. This makes it extremely difficult to cover other essential living expenses (rent, utilities, food), often forcing another loan.\n"
            "- **Bank Penalties Magnify Harm:** Failed debit attempts by payday lenders frequently trigger Non-Sufficient Funds (NSF) or overdraft fees from the borrower's bank (average $30-$35 per instance). A single failed attempt can thus add $70+ to the borrower's costs. The CFPB found that half of online payday loan borrowers incur at least one overdraft or NSF fee.\n"
            "- **Loss of Bank Accounts:** A significant percentage of borrowers (e.g., 22% of online borrowers in one Pew study, 40% in another CFPB study for certain loan types) report having their bank accounts closed by the bank or by themselves due to issues stemming from payday loan debits and repeated overdrafts. This pushes borrowers further into more expensive, less regulated financial fringes.\n"
            "- **Disproportionate Impact & Targeted Marketing:** These loans disproportionately affect low-income communities, communities of color, single parents, and individuals with limited access to traditional banking or credit options. Storefronts often cluster in these neighborhoods.\n"
            "- **Health & Well-being:** The chronic financial stress from debt traps is linked to significant negative impacts on mental health (anxiety, depression, stress-related illnesses) and physical health.\n"
            "- **Long-Term Indebtedness:** Many borrowers pay more in fees over time than the original amount borrowed. For example, Pew found the average $375 loan is re-borrowed multiple times, leading to over $520 in fees.\n"
            "This data underscores the critical need for responsible lending practices, robust consumer protections (like ability-to-repay standards and APR caps), and widespread awareness of the substantial risks associated with high-cost, short-term credit products."
        , "Pew Charitable Trusts (various reports 2012-2023), CFPB Data Points & Payday Lending Rule research (2013-2020), Center for Responsible Lending (CRL) reports.");
    }
    
    inline void printStateUsuryMap(const Config& c, LoanSession& s) {
        s.addEducationalModuleShown("StateUsuryMap_from_" + c.eduStateUsuryMapDataFile + "_Interactive"); 
        StateSpecificRules currentRules = c.getCurrentStateRules(); 

        std::string state_info = "State usury laws and payday loan regulations vary dramatically across the U.S., creating a complex and often confusing patchwork of protections for consumers. Examples (Illustrative - Ref: " + c.eduStateUsuryMapDataFile + ", NCLC, CRL, State Statutes):\n"
                                 "  - **Highly Restrictive States (e.g., NY, NJ, AR, GA, NC, MA, CT, DC, VT, MD, PA, WV, AZ, MT, SD, CO, IL):** Many of these states cap APRs around 36% or lower for small-dollar loans, effectively prohibiting traditional high-cost payday lending or requiring significant structural changes (like longer terms and installment payments in CO).\n"
                                 "  - **Permissive States (e.g., UT, ID, NV, WI, AL, MO):** Allow very high APRs, often 300-700% or more, with fewer restrictions on loan terms, number of rollovers, or fee structures.\n"
                                 "  - **Hybrid States (e.g., CA, FL, WA, OR, ME, OH, VA):** Have some specific limits on fees, loan amounts, or terms, but may still allow APRs in the triple digits or have fee structures that can be costly if not carefully understood.\n"
                                 "  - **Texas (TX) - Credit Access Business (CAB) Loophole:** While Texas has a 10% state usury cap on interest for direct lenders, many payday and auto title lenders operate as Credit Access Businesses (CABs). CABs 'broker' loans between a consumer and an unregulated third-party lender, then charge the consumer massive 'service fees' for this brokerage. These fees are not legally considered 'interest' under TX law, allowing effective APRs to soar above 600%. This is a significant legal loophole that undermines consumer protection.\n"
                                 "  - **Rent-a-Bank Schemes (Mechanism 12):** Some online lenders partner with federally chartered banks (often based in states with lax usury laws like DE, UT, or SD) to 'export' those high rates to borrowers in states with stricter caps, arguing federal preemption over state law. This is a contentious area, with regulators sometimes challenging these arrangements based on the 'true lender' doctrine.\n";
        if (!c.state.empty()) {
            state_info += "\nFor your selected state (" + c.state + " - " + currentRules.stateName + "): \n"
                          "    Key Statute(s): " + currentRules.keyStatuteCitation + "\n"
                          "    Regulatory Body: " + currentRules.regulatoryBody + "\n"
                          "    APR Cap: ~" + (currentRules.aprCap > 0 ? std::to_string(currentRules.aprCap) : "Varies/None Strictly Defined for all products") + "%\n"
                          "    Max Rollovers: " + (currentRules.allowRollover ? (currentRules.maxRollovers == -1 ? "Effectively Unlimited (or per product type)" : (currentRules.maxRollovers == 0 ? "Prohibited" : std::to_string(currentRules.maxRollovers) + " allowed")) : "Prohibited") + "\n"
                          "    Max Loan Amount: $" + (currentRules.maxOutstandingLoanAmount > 0 ? std::to_string((int)currentRules.maxOutstandingLoanAmount) : "Varies by loan type/income") + "\n"
                          "    Cooling-Off Period: " + (currentRules.coolingOffDays > 0 ? std::to_string(currentRules.coolingOffDays) + " days (after loan or after X rollovers)." : "General contract law / Not specified for all loans.") + "\n"
                          "    Notes: " + currentRules.specificNotes;
        }
        UI::showEducationalSnippet("State-by-State Usury & Payday Loan Regulation Snapshot (Illustrative)", state_info + "\nIt is CRUCIAL to consult your specific state's current, official consumer finance statutes and your state Attorney General's office or Department of Financial Institutions for the most accurate, up-to-date, and detailed information, as laws can change and interpretations vary significantly.");
    }
    // ... (All other UI functions as previously defined and enhanced, ensuring they use LoanSession and Config where needed for context) ...
    inline void schedule(double amt, double fee, int days, bool isInstallment, int numInstallments){
        double total_repayment = amt + fee;
        UI::showSubSectionHeader("Loan Repayment Schedule");
        if (isInstallment && numInstallments > 0) {
            UI::show(string_format("Installment Loan: $%.2f principal + $%.2f fee = $%.2f total.", amt, fee, total_repayment));
            UI::show(string_format("To be repaid in %d monthly installments.", numInstallments));
            double principal_per_installment = amt / numInstallments;
            double fee_per_installment = fee / numInstallments;
            double payment_per_installment = principal_per_installment + fee_per_installment;
            double current_balance = amt;
            for (int i = 1; i <= numInstallments; ++i) {
                current_balance -= principal_per_installment;
                UI::show(string_format(" Month %2d: Payment $%.2f (Principal: $%.2f, Fee: $%.2f). Remaining Balance: $%.2f", 
                           i, payment_per_installment, principal_per_installment, fee_per_installment, std::max(0.0, current_balance)));
            }
        } else {
            UI::show(string_format("Single Payment Loan: $%.2f principal + $%.2f fee = $%.2f total.", amt, fee, total_repayment));
            UI::show(string_format("Full payment of $%.2f due in %d days.", total_repayment, days));
        }
    }

    inline void printComplianceAuditEnforcement(const Config& c, LoanSession& s, const StateSpecificRules& rules) {
        if (!c.complianceEnforcementSimulator) return;
        UI::showSubSectionHeader("REGULATORY ENFORCEMENT & AUDIT SIMULATION");
        s.addEducationalModuleShown("ComplianceAuditEnforcementSimulator");
        double r = static_cast<double>(rand()) / RAND_MAX;
        UI::show(string_format("[Enforcement] Audit probability for %s: %.1f%%.", rules.stateName.c_str(), rules.auditProbability * 100.0));
        if (r < rules.auditProbability) {
            UI::showWarning("!!! SIMULATED REGULATORY AUDIT TRIGGERED !!!");
            s.tagEthicalSafeguard("ComplianceAuditTriggered_Simulated");
            s.record("ComplianceAuditResult", "Triggered_State_" + rules.stateCode);
            bool violationFound = false;
            if (s.aprCalculated > rules.aprCap && rules.aprCap > 0) {
                UI::showWarning(string_format("  - VIOLATION: APR (%.2f%%) exceeds state cap (%.2f%%) for %s.", s.aprCalculated, rules.aprCap, rules.stateName.c_str()));
                violationFound = true;
            }
            if (s.renewalsTaken > rules.maxRollovers && rules.maxRollovers >=0) {
                UI::showWarning(string_format("  - VIOLATION: Renewals taken (%d) exceed state limit (%d) for %s.", s.renewalsTaken, rules.maxRollovers, rules.stateName.c_str()));
                violationFound = true;
            }
            // Add more checks based on LoanSession data vs rules
            if (violationFound) {
                UI::show("  Potential Consequences:");
                UI::show("    - Civil Penalties: Surrender of all interest and fees charged in excess of legal limits, plus potential fines per violation.");
                if (rules.criminalEnforcementForUsury) {
                    UI::show("    - Criminal Penalties (as per " + rules.keyStatuteCitation + "): For willful or repeated violations, potential misdemeanor or even felony charges, fines, and/or imprisonment for responsible individuals.");
                    s.tagEthicalSafeguard("ComplianceAudit_CriminalPenaltyRiskNoted");
                }
                s.addSpecificDisclosureMade("Simulated Audit: Violations found, potential civil/criminal penalties outlined.");
            } else {
                UI::show("  Simulated Audit Result: No obvious violations detected based on current loan terms and state rules snapshot.");
                s.tagEthicalSafeguard("ComplianceAudit_NoViolationsFound_Simulated");
                s.record("ComplianceAuditResult", "NoViolations_State_" + rules.stateCode);
            }
        } else {
            UI::show("[Enforcement] No audit triggered this time. Compliance remains crucial.");
            s.record("ComplianceAuditResult", "NotTriggered_State_" + rules.stateCode);
        }
    }


} // namespace UI
#endif
            "- Reformation Era (Calvin, Luther, etc.): Nuanced views emerge. Distinction between oppressive usury and 'reasonable' interest for commercial ventures begins to be accepted, though personal loans to the needy often still viewed critically.\n"
            "- 1545 CE, England: Statute of Henry VIII allows interest up to 10%, marking a shift towards state regulation of interest rather than outright prohibition.\n"
            "- 19th Century USA: States begin enacting their own usury laws, often with general caps around 6-12%.\n"
            "- 1968 CE, USA: Truth in Lending Act (TILA), Regulation Z codifies Annual Percentage Rate (APR) disclosure requirements for consumer credit, aiming for transparency and comparability of loan costs.\n"
            "- 1978 CE, USA: Marquette Nat. Bank of Minneapolis v. First of Omaha Service Corp. Supreme Court decision allows national banks to export interest rates of their home state to borrowers in other states, weakening state usury laws for bank-issued credit cards.\n"
            "- 2006 CE, USA: Military Lending Act (MLA) caps most loans to active-duty military personnel and their dependents at 36% MAPR (Military APR), an all-inclusive rate.\n"
            "- 2010-2020s CE, USA: CFPB actions and state-level reforms (e.g., CO Prop 111, IL PLPA rollover ban) often target a ~36% APR cap for small-dollar, high-cost loans, though many states still permit much higher rates or have significant loopholes (like Credit Access Businesses in TX, or lack of caps in UT/ID).\n"
            "This long historical arc shows a continuous societal effort to balance the need for credit with robust protection against exploitative interest rates and lending practices."
        , "Various historical texts, NCLC reports, 'Confessions of a Payday Lender' (hypothetical)");
    }

    inline void printHarmData(const Config& c, LoanSession& s) {
        s.addEducationalModuleShown("HarmData_Pew_CFPB_CRL_Empirical_Detailed_v2");
        UI::showEducationalSnippet("Empirical Data on Payday Loan Harms & The Debt Trap (Sources: Pew Charitable Trusts, CFPB, Center for Responsible Lending, Academic Studies)",
            "- **The Debt Trap is Real:** Approximately 80% of payday loans are re-borrowed within a month (renewed or a new loan taken out shortly after repaying the old one). The average borrower is indebted for about 5-6 months of the year, taking out 8-10 loans annually. This demonstrates that for most, these are not one-time emergency solutions but a cycle of debt.\n"
            "- **Unaffordable Payments:** Typical payday loans require a lump-sum repayment (principal + all fees) that consumes about one-third (30-36%) of an average borrower's next paycheck. This makes it extremely difficult to cover other essential living expenses (rent, utilities, food), often forcing another loan.\n"
            "- **Bank Penalties Magnify Harm:** Failed debit attempts by payday lenders frequently trigger Non-Sufficient Funds (NSF) or overdraft fees from the borrower's bank (average $30-$35 per instance). A single failed attempt can thus add $70+ to the borrower's costs. The CFPB found that half of online payday loan borrowers incur at least one overdraft or NSF fee.\n"
            "- **Loss of Bank Accounts:** A significant percentage of borrowers (e.g., 22% of online borrowers in one Pew study, 40% in another CFPB study for certain loan types) report having their bank accounts closed by the bank or by themselves due to issues stemming from payday loan debits and repeated overdrafts. This pushes borrowers further into more expensive, less regulated financial fringes.\n"
            "- **Disproportionate Impact & Targeted Marketing:** These loans disproportionately affect low-income communities, communities of color, single parents, and individuals with limited access to traditional banking or credit options. Storefronts often cluster in these neighborhoods.\n"
            "- **Health & Well-being:** The chronic financial stress from debt traps is linked to significant negative impacts on mental health (anxiety, depression, stress-related illnesses) and physical health.\n"
            "- **Long-Term Indebtedness:** Many borrowers pay more in fees over time than the original amount borrowed. For example, Pew found the average $375 loan is re-borrowed multiple times, leading to over $520 in fees.\n"
            "This data underscores the critical need for responsible lending practices, robust consumer protections (like ability-to-repay standards and APR caps), and widespread awareness of the substantial risks associated with high-cost, short-term credit products."
        , "Pew Charitable Trusts (various reports 2012-2023), CFPB Data Points & Payday Lending Rule research (2013-2020), Center for Responsible Lending (CRL) reports.");
    }
    
    inline void printStateUsuryMap(const Config& c, LoanSession& s) {
        s.addEducationalModuleShown("StateUsuryMap_from_" + c.eduStateUsuryMapDataFile + "_Interactive"); 
        StateSpecificRules currentRules = c.getCurrentStateRules(); 

        std::string state_info = "State usury laws and payday loan regulations vary dramatically across the U.S., creating a complex and often confusing patchwork of protections for consumers. Examples (Illustrative - Ref: " + c.eduStateUsuryMapDataFile + ", NCLC, CRL, State Statutes):\n"
                                 "  - **Highly Restrictive States (e.g., NY, NJ, AR, GA, NC, MA, CT, DC, VT, MD, PA, WV, AZ, MT, SD, CO, IL):** Many of these states cap APRs around 36% or lower for small-dollar loans, effectively prohibiting traditional high-cost payday lending or requiring significant structural changes (like longer terms and installment payments in CO).\n"
                                 "  - **Permissive States (e.g., UT, ID, NV, WI, AL, MO):** Allow very high APRs, often 300-700% or more, with fewer restrictions on loan terms, number of rollovers, or fee structures.\n"
                                 "  - **Hybrid States (e.g., CA, FL, WA, OR, ME, OH, VA):** Have some specific limits on fees, loan amounts, or terms, but may still allow APRs in the triple digits or have fee structures that can be costly if not carefully understood.\n"
                                 "  - **Texas (TX) - Credit Access Business (CAB) Loophole:** While Texas has a 10% state usury cap on interest for direct lenders, many payday and auto title lenders operate as Credit Access Businesses (CABs). CABs 'broker' loans between a consumer and an unregulated third-party lender, then charge the consumer massive 'service fees' for this brokerage. These fees are not legally considered 'interest' under TX law, allowing effective APRs to soar above 600%. This is a significant legal loophole that undermines consumer protection.\n"
                                 "  - **Rent-a-Bank Schemes (Mechanism 12):** Some online lenders partner with federally chartered banks (often based in states with lax usury laws like DE, UT, or SD) to 'export' those high rates to borrowers in states with stricter caps, arguing federal preemption over state law. This is a contentious area, with regulators sometimes challenging these arrangements based on the 'true lender' doctrine.\n";
        if (!c.state.empty()) {
            state_info += "\nFor your selected state (" + c.state + " - " + currentRules.stateName + "): \n"
                          "    Key Statute(s): " + currentRules.keyStatuteCitation + "\n"
                          "    Regulatory Body: " + currentRules.regulatoryBody + "\n"
                          "    APR Cap: ~" + (currentRules.aprCap > 0 ? std::to_string(currentRules.aprCap) : "Varies/None Strictly Defined for all products") + "%\n"
                          "    Max Rollovers: " + (currentRules.allowRollover ? (currentRules.maxRollovers == -1 ? "Effectively Unlimited (or per product type)" : (currentRules.maxRollovers == 0 ? "Prohibited" : std::to_string(currentRules.maxRollovers) + " allowed")) : "Prohibited") + "\n"
                          "    Max Loan Amount: $" + (currentRules.maxOutstandingLoanAmount > 0 ? std::to_string((int)currentRules.maxOutstandingLoanAmount) : "Varies by loan type/income") + "\n"
                          "    Cooling-Off Period: " + (currentRules.coolingOffDays > 0 ? std::to_string(currentRules.coolingOffDays) + " days (after loan or after X rollovers)." : "General contract law / Not specified for all loans.") + "\n"
                          "    Notes: " + currentRules.specificNotes;
        }
        UI::showEducationalSnippet("State-by-State Usury & Payday Loan Regulation Snapshot (Illustrative)", state_info + "\nIt is CRUCIAL to consult your specific state's current, official consumer finance statutes and your state Attorney General's office or Department of Financial Institutions for the most accurate, up-to-date, and detailed information, as laws can change and interpretations vary significantly.");
    }
    // ... (All other UI functions as previously defined and enhanced, ensuring they use LoanSession and Config where needed for context) ...
    inline void schedule(double amt, double fee, int days, bool isInstallment, int numInstallments){
        double total_repayment = amt + fee;
        UI::showSubSectionHeader("Loan Repayment Schedule");
        if (isInstallment && numInstallments > 0) {
            UI::show(string_format("Installment Loan: $%.2f principal + $%.2f fee = $%.2f total.", amt, fee, total_repayment));
            UI::show(string_format("To be repaid in %d monthly installments.", numInstallments));
            double principal_per_installment = amt / numInstallments;
            double fee_per_installment = fee / numInstallments;
            double payment_per_installment = principal_per_installment + fee_per_installment;
            double current_balance = amt;
            for (int i = 1; i <= numInstallments; ++i) {
                current_balance -= principal_per_installment;
                UI::show(string_format(" Month %2d: Payment $%.2f (Principal: $%.2f, Fee: $%.2f). Remaining Balance: $%.2f", 
                           i, payment_per_installment, principal_per_installment, fee_per_installment, std::max(0.0, current_balance)));
            }
        } else {
            UI::show(string_format("Single Payment Loan: $%.2f principal + $%.2f fee = $%.2f total.", amt, fee, total_repayment));
            UI::show(string_format("Full payment of $%.2f due in %d days.", total_repayment, days));
        }
    }

    inline void printComplianceAuditEnforcement(const Config& c, LoanSession& s, const StateSpecificRules& rules) {
        if (!c.complianceEnforcementSimulator) return;
        UI::showSubSectionHeader("REGULATORY ENFORCEMENT & AUDIT SIMULATION");
        s.addEducationalModuleShown("ComplianceAuditEnforcementSimulator");
        double r = static_cast<double>(rand()) / RAND_MAX;
        UI::show(string_format("[Enforcement] Audit probability for %s: %.1f%%.", rules.stateName.c_str(), rules.auditProbability * 100.0));
        if (r < rules.auditProbability) {
            UI::showWarning("!!! SIMULATED REGULATORY AUDIT TRIGGERED !!!");
            s.tagEthicalSafeguard("ComplianceAuditTriggered_Simulated");
            s.record("ComplianceAuditResult", "Triggered_State_" + rules.stateCode);
            bool violationFound = false;
            if (s.aprCalculated > rules.aprCap && rules.aprCap > 0) {
                UI::showWarning(string_format("  - VIOLATION: APR (%.2f%%) exceeds state cap (%.2f%%) for %s.", s.aprCalculated, rules.aprCap, rules.stateName.c_str()));
                violationFound = true;
            }
            if (s.renewalsTaken > rules.maxRollovers && rules.maxRollovers >=0) {
                UI::showWarning(string_format("  - VIOLATION: Renewals taken (%d) exceed state limit (%d) for %s.", s.renewalsTaken, rules.maxRollovers, rules.stateName.c_str()));
                violationFound = true;
            }
            // Add more checks based on LoanSession data vs rules
            if (violationFound) {
                UI::show("  Potential Consequences:");
                UI::show("    - Civil Penalties: Surrender of all interest and fees charged in excess of legal limits, plus potential fines per violation.");
                if (rules.criminalEnforcementForUsury) {
                    UI::show("    - Criminal Penalties (as per " + rules.keyStatuteCitation + "): For willful or repeated violations, potential misdemeanor or even felony charges, fines, and/or imprisonment for responsible individuals.");
                    s.tagEthicalSafeguard("ComplianceAudit_CriminalPenaltyRiskNoted");
                }
                s.addSpecificDisclosureMade("Simulated Audit: Violations found, potential civil/criminal penalties outlined.");
            } else {
                UI::show("  Simulated Audit Result: No obvious violations detected based on current loan terms and state rules snapshot.");
                s.tagEthicalSafeguard("ComplianceAudit_NoViolationsFound_Simulated");
                s.record("ComplianceAuditResult", "NoViolations_State_" + rules.stateCode);
            }
        } else {
            UI::show("[Enforcement] No audit triggered this time. Compliance remains crucial.");
            s.record("ComplianceAuditResult", "NotTriggered_State_" + rules.stateCode);
        }
    }


} // namespace UI
#endif
    }


    // New function for interactive term definition (Beauchamp & Childress - Disclosure/Understanding)
    inline void defineTermInteractively(LoanSession& s, const std::string& term, const std::string& definition) {
        std::string resp = UI::prompt("Would you like a plain English definition of '" + term + "'? (yes/no)");
        if (argEquals(resp, "yes")) {
            UI::show("Plain Language Definition: '" + term + "' means: " + definition);
            s.record("InteractiveTermDefinitionShown", term);
            s.usedInteractiveDefinition = true;
            s.tagEthicalSafeguard("InteractiveTermDefinitionUsed_" + term);
        }
    }
    
}

#endif
