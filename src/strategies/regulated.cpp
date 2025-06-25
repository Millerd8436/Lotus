#include "../summary.h"
#include "regulated.h"
#include <algorithm> // For std::min/max
#include <vector>    // For quiz options
#include <cmath>     // For round

// Helper to calculate a more standard APR
double Regulated::calculateLoanAPR(double principal, double fee, int termDays) { // Renamed
    if (principal <= 0 || termDays <= 0) return 0.0;
    // Simple APR: (Total Fee / Principal) / (Term in Days / 365) * 100
    double ratePerPeriod = fee / principal;
    double periodsPerYear = 365.0 / termDays;
    return ratePerPeriod * periodsPerYear * 100.0;
}

void Regulated::intro(LoanSession& s, const Config& c){
    UI::show("🏛 Welcome to Lotus Responsible Finance Simulator 🏛");
    UI::show("Mode: Regulated Ethical Redesign");
    s.record("ModeSelected", "RegulatedEthicalRedesign");
    if(!c.state.empty()) {
        UI::show("Applying specific regulations for state: " + c.state);
        s.record("StateContext", c.state);
    }
    UI::show("This simulation demonstrates a lending model that adheres to strong consumer protection laws (like TILA/Reg Z) and core ethical principles (Kantian Autonomy, Rawlsian Fairness, Millian Welfare).");
    UI::show("Our process emphasizes transparency, fairness, and ensuring you make a fully informed decision.");
    s.tagEthicalSafeguard("IntroTransparency");

    if(c.regulatedEnforceLoanLimit){ // Use mode-specific flag
        int count = LoanSession::loadLoanCount();
        s.loanCount = count;
        if(count >= c.maxLoansPerYear){
            UI::show("⚠️ Limit Reached: State law limits you to " + std::to_string(c.maxLoansPerYear) + " loans per year.");
            s.deniedByLimit = true;
            s.denialReason = "Exceeded yearly loan limit for state " + c.state;
            s.tagEthicalSafeguard("LoanLimitEnforced");
        }
    }
}

void Regulated::performFullDisclosure(LoanSession& s, const Config& c, double actualAPR) { // Pass S by ref
    UI::showTILAHeader(c); // Uses c.regulatedTILAHeader
    UI::showDisclosureItem("1. Amount Financed (Principal)", "$" + std::to_string((int)round(s.amount)));
    UI::showDisclosureItem("2. Finance Charge (Total Cost of Credit)", "$" + std::to_string((int)round(s.fee)));
    
    UI::showDisclosureItem("3. Annual Percentage Rate (APR)", std::to_string(round(actualAPR*100)/100.0) + "%"); 
    UI::showDisclosureItem("4. Total of Payments (Principal + Finance Charge)", "$" + std::to_string((int)round(s.amount + s.fee)));
    UI::showDisclosureItem("5. Payment Schedule", "Single payment of $" + std::to_string((int)round(s.amount + s.fee)) + " due in " + std::to_string(s.termDays) + " days."); // Use s.termDays
    
    if(c.regulatedShowRescissionNotice) {
        std::string rescission_deadline = "[Date " + std::to_string(c.regulatedCoolingOffDays) + " business days from today]"; // Placeholder
        UI::showDisclosureItem("6. Your Right to Cancel (Rescission)", "You have the right to cancel this loan without penalty or obligation by midnight of " + rescission_deadline + " (at least " + std::to_string(c.regulatedCoolingOffDays) + " business days after receiving these final disclosures).");
        s.addReferencedDisclosure("Rescission Right Notice Provided (" + std::to_string(c.regulatedCoolingOffDays) + " business days)");
        s.tagEthicalSafeguard("RescissionNoticeClear");
    }
    s.fullDisclosureProvided = true;
    s.record("DisclosureEvent", "FullTILAProvided_APR_" + std::to_string(round(actualAPR*100)/100.0));
    s.addReferencedDisclosure("Full TILA Disclosures Provided (APR, Fee, Total, Schedule, Rescission)");
    UI::tooltip("TILA (Truth in Lending Act) and Regulation Z require lenders to provide these key cost disclosures clearly and conspicuously before you are obligated on the loan, allowing you to compare credit offers.");
}

bool Regulated::conductComprehensionQuiz(LoanSession& s, const Config& c) { // Pass S by ref
    if (!c.regulatedRequireConsentQuiz) {
        s.quizPassed = true; 
        s.record("QuizSkipped", "ConfigDisabled");
        return true; 
    }

    UI::show("\n--- Ensuring Your Understanding (Comprehension Check as per Ethical Guidelines) ---");
    UI::show(c.regulatedConsentQuizIntro);
    
    int questionsCorrect = 0;
    int totalQuestions = 2; // Example: 2 questions

    // Question 1: Total of Payments
    std::string q1_text = "Based on the disclosures, what is the 'Total of Payments' you would make if you take this loan?";
    std::string q1_correct_answer_str = "$" + std::to_string((int)round(s.amount + s.fee));
    std::vector<std::string> q1_options = {
        "$" + std::to_string((int)round(s.amount + s.fee + 50 + (rand()%50))), // Dynamic wrong option
        q1_correct_answer_str,                                 
        "$" + std::to_string((int)round(s.amount - (rand()%50))) // Dynamic wrong option
    };
    // Simple shuffle to make correct answer position vary (basic)
    int q1_correct_idx = 1;
    if (rand()%2 == 0) { std::swap(q1_options[0], q1_options[1]); q1_correct_idx = 0; }
    
    if (UI::askMultiChoiceQuiz(s, q1_text, q1_options, q1_correct_idx)) {
        questionsCorrect++;
    }

    // Question 2: APR
    double displayedAPR = round(calculateLoanAPR(s.amount, s.fee, s.termDays)*100)/100.0;
    displayedAPR = std::min(displayedAPR, c.regulatedMaxAPR);
    std::string q2_text = "What is the Annual Percentage Rate (APR) disclosed for this loan?";
    std::string q2_correct_answer_str = std::to_string(displayedAPR) + "%";
    std::vector<std::string> q2_options = {
        std::to_string(round((displayedAPR + 10.0 + (rand()%5))*100)/100.0) + "%",
        q2_correct_answer_str,
        std::to_string(round(std::max(0.0, displayedAPR - 10.0 - (rand()%5))*100)/100.0) + "%"
    };
    int q2_correct_idx = 1;
    if (rand()%2 == 0) { std::swap(q2_options[1], q2_options[2]); q2_correct_idx = 2; }

    if (UI::askMultiChoiceQuiz(s, q2_text, q2_options, q2_correct_idx)) {
        questionsCorrect++;
    }
    
    s.quizPassed = (questionsCorrect >= 1); // Require at least 1 correct for this example, ideally all.
    s.record("QuizResult", (s.quizPassed ? "passed" : "failed") + std::string(" (") + std::to_string(questionsCorrect) + "/" + std::to_string(totalQuestions) + ", Attempts: " + std::to_string(s.quizAttempts) + ")");
    s.tagEthicalSafeguard(s.quizPassed ? "ComprehensionQuizPassed" : "ComprehensionQuizFailed");

    if (!s.quizPassed) {
        UI::showWarning("To ensure fully informed consent, it's important to understand all key terms. As some answers were incorrect, we cannot proceed with the loan at this time. We encourage you to review financial literacy resources.");
        s.deniedByLimit = true; 
        s.denialReason = "FailedComprehensionQuiz";
        s.addReferencedDisclosure("Comprehension Quiz Failed - Loan Process Halted for Consumer Protection.");
        return false;
    }
    s.addReferencedDisclosure("Comprehension Quiz Successfully Passed.");
    return true;
}

void Regulated::obtainExplicitConsent(LoanSession& s, const Config& c) { // Pass S by ref
    UI::show("\n--- Your Agreement (Kantian Autonomy: Explicit & Voluntary Consent) ---");
    UI::show("You have reviewed the full TILA disclosures and demonstrated understanding through a comprehension check.");
    UI::show("By proceeding, you affirm that you are making a voluntary decision, free from coercion or undue pressure, and agree to the loan terms as disclosed.");
    if(c.regulatedBanArbitration) { // Use mode-specific flag
        UI::show("✅ This agreement respects your right to legal action in court; it does NOT include a forced binding arbitration clause.");
        s.addReferencedDisclosure("No Forced Arbitration Clause Confirmed.");
    }
    if(c.regulatedShareDataOptInOnly) { // Use mode-specific flag
        UI::show("🔒 Data Privacy Commitment: Your personal data will NOT be sold or shared with third-party marketing partners for unrelated offers without your separate, explicit opt-in consent at a later stage, if such an option is presented.");
        s.addReferencedDisclosure("Data Privacy Confirmed: No Sharing for Marketing without Explicit Opt-In.");
        s.tagEthicalSafeguard("DataPrivacyByDefault");
    }

    std::string input;
    while(true) {
        input = UI::prompt("To signify your informed and voluntary consent, please type the exact phrase: '" + c.regulatedExplicitConsentPhrase + "'");
        s.record("ConsentAttemptTyped", input);
        if (input == "exit") { UI::show("Session ended by user during consent."); std::exit(0); }
        if (input == c.regulatedExplicitConsentPhrase) break;
        UI::show("The entered phrase does not match. Please try again or type 'exit'. This step is crucial to ensure your active and unambiguous agreement to the terms.");
    }
    s.consentGiven = true;
    s.explicitConsentInput = input;
    s.record("ConsentGiven", "explicit_phrase_match_success: " + c.regulatedExplicitConsentPhrase);
    s.addReferencedDisclosure("Explicit Consent Obtained: Typed Phrase Matched (" + c.regulatedExplicitConsentPhrase + ").");
    s.tagEthicalSafeguard("ExplicitConsentPhraseMatch");
    UI::show("✅ Thank you. Your informed and voluntary consent has been successfully recorded.");
    if (!c.regulatedConsentLogFile.empty()) {
        std::ofstream log_file(c.regulatedConsentLogFile, std::ios::app);
        if (log_file.is_open()) {
            time_t now = time(0);
            log_file << "Timestamp: " << std::asctime(std::localtime(&now)); // Includes newline
            log_file << "User: " << (s.userName.empty() ? "Anonymous" : s.userName) << "\n";
            log_file << "LoanAmount: " << s.amount << ", Fee: " << s.fee << ", Term: " << s.termDays << "\n";
            log_file << "ConsentPhraseTyped: \"" << s.explicitConsentInput << "\"\n";
            log_file << "QuizPassed: " << (s.quizPassed ? "Yes" : "No") << "\n";
            log_file << "---\n";
            log_file.close();
            s.record("ConsentLoggedToFile", c.regulatedConsentLogFile);
        }
    }
}

void Regulated::consent(LoanSession &s,const Config &c){ // Initial consent to proceed & income gathering
    if(s.deniedByLimit){ return; } 

    s.monthlyIncome = UI::askNum("To help us assess affordability in line with ethical lending principles (Rawlsian Fairness), please enter your approximate gross monthly income: $");
    s.record("MonthlyIncomeProvided", std::to_string(s.monthlyIncome));
    if (s.monthlyIncome <= 100) { // Arbitrary low threshold for warning/denial
        UI::showWarning("The provided income is very low. Please ensure this is accurate. High-cost loans may be particularly risky with limited income.");
        if (s.monthlyIncome <=0 && c.regulatedApplyIncomeCap) {
             UI::show("Income information is required for affordability checks. Process cannot continue without valid income.");
             s.deniedByLimit = true;
             s.denialReason = "InvalidOrZeroIncome";
             return;
        }
    }
    s.tagEthicalSafeguard("IncomeInformationGathered");
    UI::show("Thank you. We will now proceed to calculate your specific loan terms based on the amount you request.");
    UI::show("You will be presented with full disclosures, a comprehension check, and must provide explicit consent before any loan is finalized.");
}

double Regulated::askAmt(LoanSession &s){
    if(s.deniedByLimit) return 0.0;
    if(s.amount > 0) { /* Pre-filled */ }
    else {
        s.amount = UI::askNum("Enter desired loan amount: $");
    }
    s.record("amount",std::to_string(s.amount));
    s.termDays = c.defaultDaysToRepay; // Set term days from config
    if (c.state == "CO" && c.defaultDaysToRepay < 180 && s.amount <= 500) { // Example CO rule for term
        // This is simplified. Real CO rules are complex.
        // UI::show("Note: For loans of this amount in CO, a minimum term of 180 days might apply under certain conditions.");
        // s.termDays = 180; // Or adjust based on more detailed rule logic
        // s.record("TermAdjustedForCO", std::to_string(s.termDays));
    }
    s.record("termDaysSet", std::to_string(s.termDays));
    return s.amount;
}

double Regulated::calcFee(LoanSession &s,const Config &c){
    if(s.deniedByLimit) return 0.0;

    double targetAPR = c.defaultAPR; // Start with a base ethical APR from config
    
    // Rawlsian Fairness: Tiered Fees (adjusts targetAPR before capping)
    if (c.regulatedEnableTieredFees && s.monthlyIncome > 0) {
        if (s.monthlyIncome < 1500) targetAPR = std::max(10.0, targetAPR - 12.0); 
        else if (s.monthlyIncome < 2500) targetAPR = std::max(15.0, targetAPR - 7.0);
        else targetAPR = std::max(20.0, targetAPR - 2.0); // Slight reduction even for higher income
        s.record("TieredFeeLogicApplied", "targetAPR_adjusted_to_" + std::to_string(targetAPR) + "_based_on_income_" + std::to_string(s.monthlyIncome));
        s.addReferencedDisclosure("Tiered Fee structure considered for APR calculation (Rawlsian).");
        s.tagEthicalSafeguard("TieredFeeApplied");
    }

    double effectiveAPR = std::min(targetAPR, c.regulatedMaxAPR); // Apply the hard regulatory cap
    if (targetAPR > c.regulatedMaxAPR) {
        s.record("APRCappedByRegulation", "target_" + std::to_string(targetAPR) + "_capped_to_" + std::to_string(c.regulatedMaxAPR));
        s.tagEthicalSafeguard("RegulatoryAPRCapApplied");
    }
    
    double calculatedFee = s.amount * (effectiveAPR / 100.0) * (static_cast<double>(s.termDays) / 365.0);
    
    // Rawlsian Fairness: Cap by Income (Payment-to-Income Ratio)
    if (c.regulatedApplyIncomeCap && c.regulatedIncomeCapPercentage > 0 && s.monthlyIncome > 0) {
        // Assuming daysToRepay is roughly one pay cycle (e.g., bi-weekly or monthly)
        // Max payment for this period = income for this period * cap_percentage
        // For simplicity, let's use monthly income and assume loan term is < 1 month.
        // A more robust PTI would consider actual pay frequency.
        double maxAffordablePaymentThisPeriod = s.monthlyIncome * (c.regulatedIncomeCapPercentage / 100.0);
        // If loan term is shorter than a month, this cap is effectively stricter.
        // If loan term is, say, 14 days, and income is monthly, the payment for 14 days shouldn't exceed 20% of *biweekly* income.
        // Simplified: max total repayment (P+F) <= incomeCapPercentage of monthly income.
        
        double maxAllowableTotalRepayment = s.monthlyIncome * (c.regulatedIncomeCapPercentage / 100.0);
        double currentTotalRepayment = s.amount + calculatedFee;

        if (currentTotalRepayment > maxAllowableTotalRepayment) {
            UI::showWarning("The loan's total repayment ($" + std::to_string(round(currentTotalRepayment)) + ") would exceed " + std::to_string((int)c.regulatedIncomeCapPercentage) + "% of your stated monthly income ($" + std::to_string(round(maxAllowableTotalRepayment)) + ").");
            UI::show("To ensure affordability (Rawlsian Principle), the fee is being adjusted downwards.");
            
            calculatedFee = maxAllowableTotalRepayment - s.amount;
            if (calculatedFee < 0) { // Requested amount itself is too high even with zero fee
                UI::show("The requested loan amount of $" + std::to_string(round(s.amount)) + " is too high for your stated income of $" + std::to_string(round(s.monthlyIncome)) + " under our " + std::to_string((int)c.regulatedIncomeCapPercentage) +"% payment-to-income guideline.");
                s.deniedByLimit = true; 
                s.denialReason = "IncomeCapExceeded_PrincipalTooHigh_Rawlsian";
                s.addReferencedDisclosure("Loan Denied: Principal exceeds income-based affordability cap (Rawlsian).");
                s.tagEthicalSafeguard("AffordabilityCapDenied_Principal");
                return 0.0;
            }
            s.record("FeeAdjustedForIncomeCap", "true_new_fee_" + std::to_string(calculatedFee));
            s.addReferencedDisclosure("Fee adjusted to meet income-based affordability cap (Rawlsian).");
            s.tagEthicalSafeguard("AffordabilityCapApplied_FeeAdjusted");
        }
    }
    
    s.fee = std::max(0.0, calculatedFee); 
    s.record("feeFinalCalculated", std::to_string(s.fee));

    // Millian Welfare: Warn Excessive Fees
    if (c.regulatedWarnExcessiveFees && s.fee > s.amount) {
        UI::showWarning("The calculated Finance Charge ($" + std::to_string((int)round(s.fee)) + ") is greater than the loan principal ($" + std::to_string((int)round(s.amount)) + "). This is a high-cost loan. Please consider the total cost carefully and explore alternatives if possible.");
        s.addReferencedDisclosure("Warning: Fees exceed principal (Millian Harm Reduction).");
        s.tagEthicalSafeguard("WarnedExcessiveFees_Millian");
    }

    if(c.showCfpbReference) {
        UI::legalNotice("CFPB Guidance: Ensure all costs are transparently disclosed and loans are affordable.");
        s.addReferencedDisclosure("CFPB Guidance: Transparency & Affordability.");
    }
    // State-specific legal notices based on c.state
    if (c.state == "IL" && c.provideUsuryLawInfo) { // Example
        UI::legalNotice("Illinois Specific: APR cap 36%. Rollovers are prohibited. (Ref: 815 ILCS 122/2-5, 2-30). A 7-day cooling-off period is required after 45 consecutive days of indebtedness.");
        s.addReferencedDisclosure("IL Law Snippet: 36% APR, No Rollovers, Cooling-off.");
    } else if (c.state == "CO" && c.provideUsuryLawInfo) { // Example
        UI::legalNotice("Colorado Specific (Prop 111): APR cap 36%. Tiered origination fees (20% on first $300, 7.5% on excess). Minimum 180-day term for many loans. Max 1 rollover allowed.");
        s.addReferencedDisclosure("CO Law Snippet: Prop 111 details (APR, fees, term, rollover).");
    }
    return s.fee;
}

void Regulated::extras(LoanSession& s, const Config& c){
    if(s.deniedByLimit) return;
    UI::show("\n--- Loan Terms Calculated & Preliminary Review ---");
    UI::show("Based on your request and our responsible lending policies, your preliminary loan terms have been calculated.");
    UI::show("Next, we will present full disclosures as required by law, conduct a brief comprehension check, and then ask for your explicit consent if you wish to proceed.");
    s.tagEthicalSafeguard("NoSurpriseExtras");
    // No surprise fees or add-ons in this ethical mode.
}

void Regulated::renewals(LoanSession &s,const Config &c){
    if(s.deniedByLimit) return;
    
    // Rawlsian Fairness: Limit Renewals
    if (s.renewalsTaken >= c.regulatedMaxRenewals) { // Use mode-specific flag
        UI::show("🚫 Rollover/Renewal Limit Reached (" + std::to_string(c.regulatedMaxRenewals) + "). To prevent potential debt cycles and ensure fairness (Rawlsian Principle), further extensions are not permitted under our ethical lending policy.");
        s.addReferencedDisclosure("Renewal Denied: Max renewals reached (Rawlsian).");
        s.tagEthicalSafeguard("RenewalLimitReached_Rawlsian");
        return;
    }

    if(!c.regulatedAllowRollover && c.regulatedMaxRenewals == 0) { 
        UI::show("🚫 Rollovers/Renewals are prohibited by regulation or our ethical policy for this loan type.");
        s.addReferencedDisclosure("Rollovers Prohibited by Policy/Regulation.");
        return;
    }
    
    // SD Pilot Program Example (State-Specific)
    if(c.stateSpecificSDPilot && c.state == "SD" && !s.freeExtensionUsed){ // Use state-specific flag
        std::string r_ext = UI::prompt("ℹ️ South Dakota Pilot Program: A one-time 0% APR, 30-day extension is available for eligible borrowers. Would you like to use this option? (yes/no)");
        if(r_ext=="yes"){
            s.freeExtensionUsed=true;
            s.record("FreeExtensionUsed", "granted_SD_pilot_0APR_30day");
            s.addReferencedDisclosure("SD Pilot 0% APR, 30-day Extension Utilized.");
            s.tagEthicalSafeguard("SDPilotExtensionUsed");
            UI::show("✅ Extension granted at 0% APR for 30 days under the SD Pilot Program. No additional finance charge for this specific extension period.");
            // Note: This would typically adjust the loan terms (new due date). The fee for *this* extension is 0.
            s.termDays += 30; // Extend term
            // s.fee remains unchanged for this specific extension.
            return; 
        }
    }

    // Standard renewal prompt if allowed and limit not reached
    if (c.regulatedAllowRollover || c.regulatedMaxRenewals > 0) { 
        std::string r_renew = UI::prompt("Your loan is approaching its due date (" + std::to_string(s.termDays) + " days). Would you like to apply for a renewal/extension for another " + std::to_string(c.defaultDaysToRepay) + " days? (Note: This will incur a new finance charge based on the outstanding principal and is subject to our responsible lending policies, including limits on total renewals.) (yes/no)");
        if (r_renew == "yes") {
            s.renewalsTaken++;
            s.termDays = c.defaultDaysToRepay; // Reset term for renewal period
            // Recalculate fee for the new term based on current outstanding principal (s.amount)
            // This simulates a new loan origination for the renewal period.
            double renewalTargetAPR = c.defaultAPR;
            if (c.regulatedEnableTieredFees && s.monthlyIncome > 0) { // Re-apply tiered logic if income changed or for consistency
                if (s.monthlyIncome < 1500) renewalTargetAPR = std::max(10.0, renewalTargetAPR - 12.0); 
                else if (s.monthlyIncome < 2500) renewalTargetAPR = std::max(15.0, renewalTargetAPR - 7.0);
            }
            double renewalEffectiveAPR = std::min(renewalTargetAPR, c.regulatedMaxAPR);
            double renewalFee = s.amount * (renewalEffectiveAPR / 100.0) * (static_cast<double>(s.termDays) / 365.0);
            
            // Re-check affordability for renewal (Rawlsian)
            if (c.regulatedApplyIncomeCap && c.regulatedIncomeCapPercentage > 0 && s.monthlyIncome > 0) {
                double maxAffordableTotalRepayment = s.monthlyIncome * (c.regulatedIncomeCapPercentage / 100.0);
                double maxAffordableRenewalFee = maxAffordableTotalRepayment - s.amount;
                if (renewalFee > maxAffordableRenewalFee && maxAffordableRenewalFee > 0) {
                    UI::showWarning("Renewal fee adjusted for affordability based on your income.");
                    renewalFee = maxAffordableRenewalFee;
                } else if (maxAffordableRenewalFee <= 0) {
                    UI::show("Renewal denied: The outstanding principal is too high for your stated income under our affordability guidelines for a renewal.");
                    s.renewalsTaken--; // Decrement as it wasn't successful
                    s.record("RenewalAttempt" + std::to_string(s.renewalsTaken+1), "denied_affordability_rawlsian");
                    s.addReferencedDisclosure("Renewal Denied: Affordability Cap (Rawlsian).");
                    s.tagEthicalSafeguard("RenewalDeniedAffordability");
                    return;
                }
            }
            // s.fee += renewalFee; // Accumulating total fees paid. Or, s.fee = renewalFee for the current period.
            // For clarity, let's assume s.fee is the fee for the *current* loan period.
            // We need a way to track total fees paid if s.fee is reset.
            // Let's add to a running total in history for now.
            s.record("TotalFeesPaidOrAccruedBeforeRenewal", std::to_string(s.fee));
            s.fee = renewalFee; // Set fee for the new renewal period
            s.record("Renewal" + std::to_string(s.renewalsTaken), "approved_new_fee_" + std::to_string(s.fee));
            s.addReferencedDisclosure("Loan Renewal #" + std::to_string(s.renewalsTaken) + " processed. New finance charge: $" + std::to_string((int)round(s.fee)));
            s.tagEthicalSafeguard("RenewalProcessedWithAffordabilityCheck");
            UI::show("✅ Loan renewed for another " + std::to_string(s.termDays) + " days. A new finance charge of $" + std::to_string((int)round(s.fee)) + " applies for this renewal period.");
        } else {
            UI::show("No renewal processed. Your loan remains due on the original date.");
        }
    }
}

void Regulated::explainEthicalFrameworks(LoanSession& s, const Config& c) { // Pass S by ref
    UI::show("\n--- Our Ethical Lending Commitments & Your Rights ---");
    if (c.eduPrintKantLecture) { // Use specific config flag
        UI::printPhilosophicalLecture("Immanuel Kant", "Autonomy & Respect for Persons", 
            "Kantian ethics emphasizes treating every individual as an 'end in themselves,' never merely as a means. In lending, this means:\n"
            "1. Full Transparency: You receive clear, complete information about all terms (APR, fees, total cost).\n"
            "2. Voluntary Choice: Your consent must be explicit, informed, and free from coercion or deception.\n"
            "3. Rationality: We provide information in a way that respects your capacity to make a rational decision.\n"
            "Our informed consent process, including disclosures and comprehension checks, aims to uphold these principles.");
        s.addReferencedDisclosure("Explained: Kantian Autonomy, Respect, Informed Consent.");
        s.tagEthicalSafeguard("KantianEthicsExplained");
    }
    if (c.eduPrintRawlsLecture) { // Use specific config flag
        UI::printPhilosophicalLecture("John Rawls", "Justice as Fairness & The Difference Principle",
            "Rawlsian ethics argues that social and economic inequalities are only justified if they benefit the least-advantaged members of society. In lending, this translates to:\n"
            "1. Protecting the Vulnerable: Policies like income-based repayment caps (e.g., payment not to exceed " + std::to_string((int)c.regulatedIncomeCapPercentage) + "% of monthly income) and tiered fee structures aim to prevent disproportionate burdens on low-income borrowers.\n"
            "2. Preventing Debt Traps: Limits on loan rollovers (e.g., max " + std::to_string(c.regulatedMaxRenewals) + " renewal(s)) are designed to break cycles of debt that can harm those in precarious financial situations.\n"
            "Our goal is to structure loans fairly, ensuring they provide a benefit without causing undue hardship.");
        s.addReferencedDisclosure("Explained: Rawlsian Fairness, Difference Principle, Vulnerable Borrower Protection.");
        s.tagEthicalSafeguard("RawlsianEthicsExplained");
    }
    if (c.eduPrintMillLecture) { // Use specific config flag
        UI::printPhilosophicalLecture("John Stuart Mill", "Utilitarianism & The Harm Principle",
            "Mill's utilitarianism suggests that actions are right if they promote overall happiness and well-being, and wrong if they produce unhappiness or harm. Key applications in our lending model include:\n"
            "1. Harm Reduction: We provide warnings if total fees risk exceeding the principal amount and offer alternatives like installment plans to reduce the potential for financial distress.\n"
            "2. Promoting Welfare: By showing long-term cost implications and comparing options (e.g., vs. credit union loans), we empower you to make choices that are more likely to enhance your long-term financial health.\n"
            "The aim is to ensure that any loan taken provides a net benefit and minimizes foreseeable harm.");
        s.addReferencedDisclosure("Explained: Millian Utilitarianism, Harm Principle, Welfare Promotion.");
        s.tagEthicalSafeguard("MillianEthicsExplained");
    }
}

void Regulated::provideEducationalModules(LoanSession& s, const Config& c) { // Pass S by ref
    UI::show("\n--- Financial Education & Consumer Information Modules ---");
    if (c.eduProvideUsuryLawInfo) {
        UI::printUsuryHistory(c); // Uses new UI function that could load from c.eduUsuryHistoryFile
        s.addReferencedDisclosure("Provided: Usury Law History Information.");
        s.tagEthicalSafeguard("EducationModule_UsuryHistory");
    }
    if (c.eduProvideHarmDataInfo) {
        UI::printHarmData(c); // Uses new UI function
        s.addReferencedDisclosure("Provided: Payday Loan Harm Data (Pew/CFPB).");
        s.tagEthicalSafeguard("EducationModule_HarmData");
    }
    if (c.eduProvideStateUsuryMap) {
        UI::printStateUsuryMap(c); // Uses new UI function
        s.addReferencedDisclosure("Provided: State Usury Map/Snapshot.");
        s.tagEthicalSafeguard("EducationModule_StateUsuryMap");
    }
    if (c.eduCompareToCreditUnion) {
        UI::showEducationalSnippet("Alternative: Credit Union Loans (Payday Alternative Loans - PALs)", 
            "Credit Unions often offer PALs with federally capped APRs (e.g., 28%) and longer repayment terms (1-12 months). For a $500 loan:\n"
            " - PAL (e.g., 3 months): Total cost might be around $40-$50.\n"
            " - Typical Payday Loan (e.g., 2 weeks, rolled over): Total cost can be $450 or more over 3 months.\n"
            "Consider exploring options from local credit unions if you are eligible.");
        s.addReferencedDisclosure("Provided: Credit Union PAL Comparison.");
        s.tagEthicalSafeguard("EducationModule_CreditUnionComparison");
    }
    if (c.eduShowDarkPatternExamples) { // Renamed flag for clarity
        UI::showEducationalSnippet("Awareness: Common Deceptive 'Dark Patterns' in Lending", 
            "Be cautious of lenders who:\n"
            " - Hide fees until the last minute (drip pricing).\n"
            " - Use pre-checked boxes for expensive add-on services.\n"
            " - Employ confusing or jargon-filled language to obscure terms.\n"
            " - Create artificial urgency with countdown timers or 'limited offer' claims.\n"
            " - Make it very difficult to opt-out of auto-renewals.\n"
            "Always read all terms carefully and ensure you understand the full cost.");
        s.addReferencedDisclosure("Provided: Dark Pattern Examples for Consumer Awareness.");
        s.tagEthicalSafeguard("EducationModule_DarkPatternsAwareness");
    }
    // if (c.eduConductUsuryQuiz) { /* Call quiz function here */ }
    // if (c.eduPromptDeliberationHabermas) { /* Call deliberation prompt */ }
    // if (c.eduAssessCapabilitiesNussbaum) { /* Call capability assessment */ }

    UI::tooltip("For unbiased financial advice and resources, visit consumerfinance.gov or contact a non-profit credit counseling agency accredited by the NFCC or FCAA.");
}

void Regulated::offerInstallmentPlanOption(LoanSession& s, const Config& c) { // Renamed, Pass S by ref
    if (!c.regulatedOfferInstallmentPlan || s.deniedByLimit) return;

    UI::show("\n--- Alternative Repayment Option (Millian Welfare: Harm Reduction) ---");
    double totalRepaySingle = s.amount + s.fee;
    // Simplified installment calculation for a 3-month plan.
    // A real installment loan would have its own APR and fee structure, likely lower overall APR than a single payday loan if extended.
    // For this simulation, let's assume the same *total finance charge* but spread out.
    int numInstallments = c.regulatedInstallmentMonths;
    double monthlyPayment = totalRepaySingle / numInstallments; 
    
    UI::show("Instead of a single payment of $" + std::to_string((int)round(totalRepaySingle)) + " in " + std::to_string(s.termDays) + " days, we can offer an installment plan.");
    std::string inst_choice = UI::prompt("Would you prefer to repay in " + std::to_string(numInstallments) + " monthly payments of approximately $" + std::to_string((int)round(monthlyPayment)) + " each? This can make repayment more manageable. (yes/no)");
    if (inst_choice == "yes") {
        s.installmentPlanAccepted = true;
        s.record("InstallmentPlanOffered", "accepted_" + std::to_string(numInstallments) + "_months");
        s.addReferencedDisclosure("Installment Plan Option Accepted (Millian Harm Reduction).");
        s.tagEthicalSafeguard("InstallmentPlanAccepted_Millian");
        UI::show("Installment plan selected. Your payment schedule would be adjusted to " + std::to_string(numInstallments) + " monthly payments. (Note: The exact APR for an installment loan might differ; this simulation simplifies the total cost.)");
        // In a real system, loan terms (APR, total fee) might be recalculated.
        // For the simulation, we can assume the term effectively changes.
        s.termDays = numInstallments * 30; // Approximate new term
    } else {
        s.installmentPlanAccepted = false;
        s.record("InstallmentPlanOffered", "declined");
        s.addReferencedDisclosure("Installment Plan Option Declined.");
    }
}


void Regulated::finalize(LoanSession &s,const Config &c, const std::string& mode_name){ // Renamed mode
    UI::show("\n--- Final Loan Review & Agreement (" + mode_name + (c.state.empty() ? "" : ", State: " + c.state) + ") ---");
    if(s.deniedByLimit){ 
        UI::show("Loan application cannot be finalized due to a previous denial or failed check.");
        printSummary(s); // Show summary even if denied
        return; 
    }
    
    double finalAPR = calculateLoanAPR(s.amount, s.fee, s.termDays); // Use s.termDays
    finalAPR = std::min(finalAPR, c.regulatedMaxAPR); 

    // 1. Perform Full Disclosure (TILA) - Kantian Autonomy
    if (c.regulatedRequireFullDisclosure) {
        performFullDisclosure(s, c, finalAPR);
        s.tagEthicalSafeguard("FinalFullDisclosureProvided_Kantian");
    }

    // 2. Conduct Comprehension Quiz - Kantian Autonomy
    if (!conductComprehensionQuiz(s, c)) { 
        printSummary(s);
        return; 
    }

    // 3. Obtain Explicit Consent - Kantian Autonomy
    obtainExplicitConsent(s, c);
    if (!s.consentGiven) { 
        UI::show("Consent not finalized. Loan process cannot continue.");
        printSummary(s);
        return;
    }

    // 4. Offer Installment Plan Option (Millian Welfare)
    offerInstallmentPlanOption(s, c);

    // 5. Explain Ethical Frameworks (Kant, Rawls, Mill)
    if (c.eduPrintKantLecture || c.eduPrintRawlsLecture || c.eduPrintMillLecture) {
        explainEthicalFrameworks(s, c);
    }

    // 6. Provide Educational Modules (Usury, Harm Data, etc.)
    if (c.eduProvideUsuryLawInfo || c.eduProvideHarmDataInfo || c.eduCompareToCreditUnion || c.eduShowDarkPatternExamples) {
        provideEducationalModules(s, c);
    }

    s.userName = UI::prompt("Please confirm your full name for the loan agreement records:");
    // s.employer = UI::prompt("Confirm your employer (optional, for statistical purposes only):"); // Emphasize optional
    // s.contact  = UI::prompt("Confirm your contact email/phone for agreement delivery and important notices:");
    
    printSummary(s); 

    UI::show("\n--- Post-Agreement Information & Rights ---");
    if(c.regulatedRequireCoolingOffPeriod && c.regulatedShowRescissionNotice) { 
        UI::show("REMINDER (Your Right to Rescind/Cancel): You have a cooling-off period. You may cancel this loan without penalty or obligation within " + std::to_string(c.regulatedCoolingOffDays) + " business days of signing this agreement (or by midnight of [Date " + std::to_string(c.regulatedCoolingOffDays) + " business days from today]). To cancel, please contact us via [Simulated Method: e.g., type 'CANCEL LOAN' in a follow-up prompt or email simulated_cancel@lotusfinance.com].");
        s.addReferencedDisclosure("Cooling-off Period & Rescission Right Reminder ("+std::to_string(c.regulatedCoolingOffDays)+" days).");
        s.tagEthicalSafeguard("RescissionReminderPostConsent");
        s.rescissionOffered = true;
    }
    
    if(c.showAmortization && c.regulatedShowLongTermCostTimeline) { 
        UI::show("\n--- Cumulative Cost & Repayment Timeline (Millian Welfare) ---");
        UI::show("This timeline illustrates how costs can accumulate, especially if rollovers were permitted and taken. For your current loan (single term unless installment plan chosen):");
        UI::show("Term | Principal | Fee This Term | Cumulative Fees | Total Repaid");
        // This needs to be more dynamic if rollovers or installments are truly modeled.
        // For a single term loan:
        double cumulative_fees_timeline = 0;
        double total_repaid_timeline = 0;
        // If installment plan was accepted, the schedule changes.
        int display_term_days = s.installmentPlanAccepted ? s.termDays : c.defaultDaysToRepay; // Use actual term
        double display_fee = s.fee;

        if (s.installmentPlanAccepted) {
            int num_installments = c.regulatedInstallmentMonths;
            double principal_per_installment = s.amount / num_installments;
            double fee_per_installment = s.fee / num_installments; // Simplified spread
            for (int i = 1; i <= num_installments; ++i) {
                cumulative_fees_timeline += fee_per_installment;
                total_repaid_timeline += (principal_per_installment + fee_per_installment);
                UI::show("M" + std::to_string(i) + "   | $" + std::to_string((int)round(s.amount - principal_per_installment*i)) + "* | $" + std::to_string((int)round(fee_per_installment)) + "        | $" + std::to_string((int)round(cumulative_fees_timeline)) + "            | $" + std::to_string((int)round(total_repaid_timeline)));
            }
            UI::show("*Remaining principal after payment.");
        } else {
             UI::show("End  | $" + std::to_string((int)round(s.amount)) + "      | $" + std::to_string((int)round(display_fee)) + "             | $" + std::to_string((int)round(display_fee)) + "            | $" + std::to_string((int)round(s.amount + display_fee)));
        }
        s.addReferencedDisclosure("Cumulative Cost / Amortization Timeline Shown (Millian).");
        s.tagEthicalSafeguard("LongTermCostTimelineShown_Millian");
    } else if (c.showAmortization) {
        UI::schedule(s.amount,s.fee,s.termDays); // Use s.termDays
    }

    if(c.exportSession){
        UI::show("Session data, including all disclosures, your inputs, and consent records, will be saved to a JSON file for your records and for audit purposes (as per ethical transparency).");
        if(UI::prompt("Proceed with saving session data to '" + c.sessionExportFileName + "'? (yes/no)")=="yes") {
            s.exportJson(c.sessionExportFileName); // Use configured filename
            s.record("SessionExported", c.sessionExportFileName);
        } else {
            UI::show("Export skipped by user.");
            s.record("SessionExportSkipped", "UserChoice");
        }
    }

    if (c.regulatedRequireCoolingOffPeriod && s.rescissionOffered) {
        std::string resp = UI::prompt("If you wish to exercise your right to cancel (rescind) this loan within the " + std::to_string(c.regulatedCoolingOffDays) + "-business-day period, type 'CANCEL LOAN' now (or contact us later as per instructions):");
        if(resp=="CANCEL LOAN"){ 
            s.loanRescinded = true;
            UI::show("✅ Your loan cancellation request under the rescission right has been processed. The loan is now void. No funds will be disbursed, and no repayment will be required."); 
            s.record("LoanStatus", "CancelledByUser_RescissionRight");
            s.addReferencedDisclosure("Loan Cancelled by User under Rescission Right.");
            s.tagEthicalSafeguard("RescissionRightExercised");
            // In a real system, this would trigger a full cancellation process.
            return; 
        } else {
            s.record("RescissionOpportunity", "UserDeclinedImmediateCancel");
        }
    }
    
    int currentLoanCountSystem = LoanSession::loadLoanCount(); // System-wide count
    if(c.regulatedEnforceLoanLimit) {
        LoanSession::saveLoanCount(currentLoanCountSystem+1);
        s.loanCount = currentLoanCountSystem + 1; // Update session's idea of this user's loan count
    }
    s.record("LoanStatus", "Funded_UserLoanCount_" + std::to_string(s.loanCount));
    s.tagEthicalSafeguard("LoanFunded");
    
    std::string r = UI::prompt("Did this simulation help you understand your rights as a borrower and the principles of responsible, ethical lending? (yes/no/comments)");
    s.record("UserFeedback_SimulationEffectiveness", r);
    UI::show("Thank you for participating in the Lotus Responsible Finance Simulator. We encourage continued financial education.");
}
