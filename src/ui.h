#ifndef LOTUS_UI_H
#define LOTUS_UI_H

#include <iostream>
#include <string>
#include <thread>
#include <chrono>
#include <vector> 
#include <iomanip> // For std::fixed, std::setprecision
#include <cmath>   // For std::round
#include <algorithm> // For std::transform

// Forward declare Config and LoanSession to avoid circular dependencies if UI needs them
struct Config;
class LoanSession; // Assuming LoanSession is a class
struct StateSpecificRules; // Assuming this struct exists

namespace UI {
    inline void show(const std::string &s){ std::cout<<s<<"\n"; }
    inline void show_raw(const std::string &s){ std::cout<<s; } // For prompts on same line

    inline bool argEquals(const std::string& arg1, const std::string& arg2) {
        std::string lower_arg1 = arg1;
        std::transform(lower_arg1.begin(), lower_arg1.end(), lower_arg1.begin(), ::tolower);
        std::string lower_arg2 = arg2;
        std::transform(lower_arg2.begin(), lower_arg2.end(), lower_arg2.begin(), ::tolower);
        return lower_arg1 == lower_arg2;
    }

    inline std::string prompt(const std::string &s_text){ // Renamed s to s_text
        show(s_text); std::string r; std::getline(std::cin,r);
        if(argEquals(r, "exit")) { show("Session ended by user."); std::exit(0); }
        return r;
    }
    inline double askNum(const std::string &s_text){ // Renamed s to s_text
        while(true){
            std::string v_str = prompt(s_text); 
            try { 
                double x = std::stod(v_str); 
                if(x>=0) return x; 
                else show("\u26A0\uFE0F Number cannot be negative.");
            }
            catch(...){}
            show("\u26A0\uFE0F Enter a valid non-negative number or type 'exit' to quit.");
        }
    }
    inline void wait(int s_seconds, bool showCountdown = true){ // Renamed s to s_seconds
        if (!showCountdown) {
            std::this_thread::sleep_for(std::chrono::seconds(s_seconds));
            return;
        }
        for(;s_seconds>0;--s_seconds){
            show_raw("\r\u23F1 Please wait... " + std::to_string(s_seconds) + "s ");
            std::cout.flush();
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }
        show_raw("\r\u23F1 Please wait... 0s  \n"); // Clear line and newline
    }
    inline void bank(){
        show("🔒 Simulating secure connection to banking services...");
        wait(2, false); // Shorter, no countdown text
        show("✅ Bank services connection established (Simulated).");
    }
    inline void tiny(const std::string &t){ std::cout<<"(Fine Print / Tiny Text) "<<t<<"\n"; }
    inline void tooltip(const std::string &t){ show("🛈 INFO: " + t); }
    inline void legalNotice(const std::string &t){ show("⚖️ LEGAL NOTICE: " + t); }
    
    // Forward declarations from Config.h and LoanSession.h are needed if these are not included directly
    // For simplicity, assume Config and LoanSession definitions are available via includes in .cpp files that use UI.h
    
    inline void showSectionHeader(const std::string& title, const std::string& modeContext = "") {
        std::string fullTitle = "\n\n================================================================================\n";
        fullTitle += "--- " + title + " ---";
        if (!modeContext.empty()) {
            fullTitle += " (" + modeContext + ")";
        }
        fullTitle += "\n================================================================================\n";
        show(fullTitle);
    }

    inline void showSubSectionHeader(const std::string& title) {
        show("\n--- " + title + " ---\n");
    }
    
    inline void showStepIndicator(const std::string& stepInfo, const Config& c); // Declaration, definition below if it needs Config

    inline void simulateClutter(const Config& c, LoanSession& s); // Declaration

    inline bool simulateUrgencyPopup(const Config& c, LoanSession& s, const std::string& offerDetail, int& countdownSeconds); // Declaration
    
    inline int startCountdownTimer(const Config& c, LoanSession& s, const std::string& timerId); // Declaration

    inline bool checkCountdownTimer(int &seconds, LoanSession& s, const std::string& timerId); // Declaration

    inline void showDisclosureHeader(const std::string& title) { // Already present in previous version, keep
        show("\n==== " + title + " ====");
    }
    
    inline void showTILAHeader(const Config& c) { 
        showDisclosureHeader(c.regulatedTILAHeaderFull); // Use the full header from Config
    }

    inline void showDisclosureItem(const std::string& label, const std::string& value, bool important = false) {
        show((important ? " * " : " • ") + label + ": " + value);
    }
    
    inline bool askMultiChoiceQuiz(LoanSession& s, const std::string& question_text, const std::vector<std::string>& options, int correct_option_index, const std::string& context_tag) {
        UI::showSubSectionHeader("COMPREHENSION CHECK (" + context_tag + ")");
        show(question_text);
        for (size_t i = 0; i < options.size(); ++i) {
            show("  " + std::to_string(i + 1) + ". " + options[i]);
        }
        int answer = -1;
        while(true) {
            std::string ans_str = prompt("Enter your choice (number):");
            if(argEquals(ans_str, "exit")) { show("Session ended by user during quiz."); std::exit(0); }
            try {
                answer = std::stoi(ans_str);
                if (answer >= 1 && answer <= static_cast<int>(options.size())) {
                    break; 
                } else {
                    show("\u26A0\uFE0F Invalid choice. Please enter a number between 1 and " + std::to_string(options.size()) + ".");
                }
            } catch(...) {
                show("\u26A0\uFE0F Invalid input. Please enter a number.");
            }
        }
        // s.quizAttemptsTotal++; // Moved to LoanSession logic if we track total vs per-question
        bool is_correct = ((answer - 1) == correct_option_index);
        s.quizResponses.push_back({question_text + " (" + context_tag + ")", is_correct}); 

        if (is_correct) {
            UI::show("✅ Correct!");
            s.record("QuizAnswerCorrect", context_tag + ": " + question_text.substr(0, 50) + "...");
            return true;
        }
        UI::show("❌ Incorrect. The correct answer was " + std::to_string(correct_option_index + 1) + ": " + options[correct_option_index]);
        s.record("QuizAnswerIncorrect", context_tag + ": " + question_text.substr(0, 50) + "...");
        return false;
    }

    inline void showEthicalPrinciple(const std::string& philosopher, const std::string& principle, const std::string& coreIdea, const std::string& applicationInLending, const std::string& citation = "") {
        UI::showSubSectionHeader("ETHICAL FRAMEWORK: " + philosopher + " - " + principle);
        UI::show("Core Idea: " + coreIdea);
        UI::show("Application in Lending Simulation:");
        // Split explanation by newline for better formatting
        std::stringstream ss(applicationInLending);
        std::string segment;
        while(std::getline(ss, segment, '\n')) {
            UI::show("  " + segment);
        }
        if (!citation.empty()) UI::tiny("Source/Inspiration: " + citation);
    }

    inline void showEducationalSnippet(const std::string& title, const std::string& content, const std::string& sourceRefs = "") {
        UI::showSubSectionHeader("EDUCATIONAL INFORMATION: " + title);
        // Split content by newline for better formatting
        std::stringstream ss(content);
        std::string segment;
        while(std::getline(ss, segment, '\n')) {
            UI::show(segment);
        }
        if (!sourceRefs.empty()) UI::tiny("References: " + sourceRefs);
    }

    inline void showWarning(const std::string& message) {
        show("⚠️ WARNING: " + message);
    }
    
    inline void showFinePrint(const std::string& text) {
        show("\n(BEGINNING OF FINE PRINT SECTION)");
        std::this_thread::sleep_for(std::chrono::milliseconds(500)); // Simulate delay
        // Split text by sentence for slightly more "readable" fine print simulation
        std::stringstream ss(text);
        std::string segment;
        int count = 0;
        while(std::getline(ss, segment, '.')) { // Split by '.'
            if (!segment.empty()) {
                UI::tiny(segment + ".");
                count++;
                if (count % 3 == 0) std::this_thread::sleep_for(std::chrono::milliseconds(100)); // Tiny pause
            }
        }
        show("(END OF FINE PRINT SECTION)\n");
    }

    inline void showTimePressure(const std::string& message, int wait_seconds = 3) {
        show("⏳ URGENT: " + message);
        if (wait_seconds > 0) wait(wait_seconds, true); // Use existing wait with countdown
    }

    inline void showFakeTestimonial(const std::string& testimonial, const std::string& author = "A. 'Happy' Customer") {
        show("\n🌟🌟🌟 Hear from our THOUSANDS of 'satisfied' customers! 🌟🌟🌟");
        show("\"" + testimonial + "\"");
        show("    - " + author + ", [City, ST]");
        show("*(Testimonial may be dramatized or from a composite of experiences. Individual results vary.)*");
    }

    inline void schedule(double amt,double fee,int days){
        // ... (schedule function as before, maybe add more detail or formatting) ...
        double total=amt+fee;
        double daily_repayment_if_amortized_equally = total/days; // This is not how payday loans work but for illustration
        UI::showSubSectionHeader("Illustrative Amortization Schedule (If loan were paid in daily installments - NOT typical for this loan type)");
        UI::show(std::string_format("Loan: $%.2f, Fee: $%.2f, Total: $%.2f over %d days", amt, fee, total, days));
        for(int d=1; d<=days; ++d) {
            if (days <= 20 || d % (days/10) == 0 || d == 1 || d == days) { // Show more for short terms
                 UI::show(std::string_format(" Day %2d: Cumulative Repaid $%.2f (Daily portion $%.2f)", d, daily_repayment_if_amortized_equally * d, daily_repayment_if_amortized_equally));
            }
        }
        UI::show("Note: This is an illustrative equal daily amortization. Your actual loan requires a single balloon payment of $" + std::to_string(total) + " in " + std::to_string(days) + " days.");
    }
    
    // Functions to simulate loading educational content from files
    // These will now take LoanSession by reference to record that they were shown.
    inline void printUsuryHistory(const Config& c, LoanSession& s); // Declaration
    inline void printHarmData(const Config& c, LoanSession& s); // Declaration
    inline void printStateUsuryMap(const Config& c, LoanSession& s); // Declaration
    inline void printCounselorReferral(const Config& c, LoanSession& s); // Declaration
    
    // New UI for Capstone Features & Deeper Informed Consent
    inline void loadScenarioPreset(const Config& c, LoanSession& s, const std::string& scenarioId); // Declaration
    inline void conductKnowledgeQuiz(const Config& c, LoanSession& s, const std::string& quizType); // Declaration
    inline void promptJournaling(const Config& c, LoanSession& s); // Declaration
    inline void showLoanSummaryCard(const LoanSession& s, const Config& c, double actualAPR); // Declaration
    inline void promptKantianUniversalizability(const Config& c, LoanSession& s); // Declaration
    inline void promptMillHarmPrincipleForRollovers(const Config& c, LoanSession& s, int currentRollovers); // Declaration
    inline void conductVoluntarinessDeclaration(LoanSession& s, const Config& c); // Declaration

    // Helper for argEquals (already defined in main.cpp, but good to have in UI namespace if used here)
    // bool argEquals(const std::string& arg1, const std::string& arg2); // Already defined

} // namespace UI

// Definitions for functions that need Config, LoanSession, StateSpecificRules might need to be in a .cpp or below includes
// For a header-only library, this is tricky. Let's assume they are included where UI.h is used.
// Or, make UI a class and pass Config/LoanSession to its methods or constructor.
// For now, keeping them as inline functions and assuming necessary types are known.

// Example of defining one of the more complex UI functions that needs Config and LoanSession
// This structure implies that Config and LoanSession must be fully defined before these UI functions are defined.
// If UI.h is included before Config.h or LoanSession.h, this will cause issues.
// A common solution is to put these implementations in a UI.cpp file.
// For this exercise, I will keep them inline but acknowledge this structural consideration.

#include "config.h" // Required for Config, StateSpecificRules
#include "loan_session.h" // Required for LoanSession

namespace UI {
    // Definitions for functions declared above
    inline void showStepIndicator(const std::string& stepInfo, const Config& c) {
        if (c.uiRegulatedClearStepIndicators) { 
            UI::show("\n== [REGULATED PROCESS STEP: " + stepInfo + "] ==");
        }
    }

    inline void simulateClutter(const Config& c, LoanSession& s) {
        if (c.uiExploitClutteredInterface) {
            UI::show("\n********************************************************************************************");
            UI::show("* XPRESSLOOT™ DAILY JACKPOT! Refer 5 friends, get $50 CASH BACK! Limited Time Offer! Act NOW! *");
            UI::show("* URGENT: Your credit profile indicates you may qualify for our EXCLUSIVE Platinum Loan!      *");
            UI::show("* WARNING: Missing payments can severely impact your future creditworthiness with ALL lenders! *");
            UI::show("********************************************************************************************\n");
            s.tagDarkPattern("UI_Clutter_DistractionAds");
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
