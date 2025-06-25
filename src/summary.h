#ifndef LOTUS_SUMMARY_H
#define LOTUS_SUMMARY_H

#include "loan_session.h" 
#include "ui.h"           
#include "config.h"       // For Config to pass to generateFollowUpEmail
#include "strategies/regulated.h" // For Regulated::getCurrentTimestampForLog()

#include <iomanip> 
#include <numeric> 
#include <ctime>   

inline void showEventHistory(const LoanSession &s){
    UI::showSubSectionHeader("DETAILED EVENT HISTORY");
    if(s.history.empty()){
        UI::show("No events recorded for this session.");
        return;
    }
    for(const auto& event : s.history){
        char buffer[80]; 
        #ifdef _WIN32
            std::tm tm_snapshot;
            localtime_s(&tm_snapshot, &event.timestamp);
            std::strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", &tm_snapshot);
        #else
            std::tm* tm_snapshot = std::localtime(&event.timestamp);
            std::strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", tm_snapshot);
        #endif
        
        UI::show(" [" + std::string(buffer) + "] " + event.type + ": " + event.data);
    }
}

inline void showSpecificDisclosuresMade(const LoanSession &s){ 
    UI::showSubSectionHeader("SPECIFIC DISCLOSURES MADE TO USER DURING SESSION");
    if(s.specificDisclosuresMade.empty()){
        UI::show("No specific disclosures were explicitly logged as made during this session (beyond standard UI text).");
        return;
    }
    for(const auto& disclosure : s.specificDisclosuresMade){
        UI::show(" • " + disclosure);
    }
}

inline void showUserTermRecalls(const LoanSession &s){ 
    UI::showSubSectionHeader("USER TERM RECALLS (If Recorded)");
    if(s.userTermRecalls.empty()){
        UI::show("No term recall data recorded for this session.");
        return;
    }
    for(const auto& recall : s.userTermRecalls){
        UI::show(" • " + recall);
    }
}


inline void printSummary(const LoanSession &s){ 
    UI::showSectionHeader("SESSION SUMMARY & ANALYSIS", "Overall Debrief");
    UI::show("Session ID: " + s.sessionId);
    UI::show("User Name (if provided): " + (s.userName.empty() ? "N/A" : s.userName));
    UI::show("State Context: " + (s.state.empty() ? "General/Federal" : s.state)); 
    if (!s.userScenarioNotes.empty()) {
        UI::show("Scenario Context: " + s.userScenarioNotes);
    }
    UI::show("Monthly Income Provided: $" + std::to_string((int)round(s.monthlyIncome)));
    if (!s.userExpenses.empty()) {
        UI::show_raw("  Key Expenses Provided: ");
        bool first = true;
        for (const auto& exp : s.userExpenses) {
            if (!first) UI::show_raw(", ");
            UI::show_raw(exp.first + ": $" + std::to_string((int)round(exp.second)));
            first = false;
        }
        UI::show("");
    }

    UI::showSubSectionHeader("Loan Outcome & Key Terms");
    if (s.deniedByLimit) {
        UI::show("Loan Status: DENIED / HALTED");
        UI::show("Reason: " + s.denialReason);
    } else if (s.loanRescinded) {
        UI::show("Loan Status: AGREED THEN RESCINDED BY USER");
    } else if (s.consentGiven) {
        UI::show("Loan Status: FUNDED (Simulated)");
    } else {
        UI::show("Loan Status: NOT COMPLETED (No final consent or other interruption)");
    }
    UI::show(UI::string_format("Loan Amount Requested/Funded: $%.2f", s.amount));
    UI::show(UI::string_format("Finance Charge (Fee for current term): $%.2f", s.fee));
    if (s.isCABLoanInTX) UI::show(UI::string_format("CAB Fee (TX): $%.2f", s.cabFeeCharged));
    UI::show(UI::string_format("Disclosed APR for current term: %.2f%%", s.aprCalculated));
    UI::show(UI::string_format("Total of Payments for current term: $%.2f", s.totalRepayment));
    UI::show("Loan Term: " + std::to_string(s.termDays) + " days");
    if (s.tip > 0) UI::show(UI::string_format("Tip/Gratuity Paid: $%.2f", s.tip));
    if (!s.feeComponents.empty()) {
        UI::show("  Fee Components Breakdown:");
        for (const auto& fc : s.feeComponents) {
            UI::show(UI::string_format("    - %s: $%.2f", fc.first.c_str(), fc.second));
        }
    }
    
    UI::showSubSectionHeader("Informed Consent Pillars Status (Beauchamp & Childress)");
    UI::show("  Pillar 1 (Capacity - Age): " + std::string(s.capacityConfirmed_Age ? "Confirmed" : "NOT Confirmed/Failed"));
    UI::show("  Pillar 1 (Capacity - Sound Mind/Understanding): " + std::string(s.capacityConfirmed_SoundMind ? "Confirmed" : "NOT Confirmed/Failed"));
    char disc_ts_buffer[80];
    std::strftime(disc_ts_buffer, sizeof(disc_ts_buffer), "%Y-%m-%d %H:%M:%S", std::localtime(&s.disclosureTimestamp));
    UI::show("  Pillar 2 (Disclosure - Full TILA): " + std::string(s.fullDisclosureProvided ? "Provided (Timestamp: " + std::string(disc_ts_buffer) + ")" : "NOT Provided / Incomplete"));
    UI::show("  Pillar 3 (Comprehension - Quiz): " + (s.quizAttemptsTotal > 0 ? (s.quizPassedOverall ? "Passed (" + std::to_string(s.quizQuestionsCorrect) + "/" + std::to_string(s.quizQuestionsTotal) + " correct, " + std::to_string(s.quizAttemptsTotal) + " total attempts)" : "Failed") : "Not Conducted/Skipped"));
    UI::show("  Pillar 4 (Voluntariness - Meta-Consent & Declaration): " + (s.metaConsentCheckPerformed ? (s.voluntarinessAffirmedByDeclaration ? "Affirmed" : "Questionable/Failed") : "Meta-Consent Not Performed") + " / Declaration: " + (s.voluntarinessAffirmedByDeclaration ? "Affirmed" : "Not Affirmed"));
    char consent_ts_buffer[80];
    std::strftime(consent_ts_buffer, sizeof(consent_ts_buffer), "%Y-%m-%d %H:%M:%S", std::localtime(&s.consentTimestamp));
    UI::show("  Pillar 5 (Authorization - Explicit Consent): " + (s.consentGiven ? "Given (Phrase: \"" + s.explicitConsentInput + "\", Hash: " + s.consentTermsHash + ", Timestamp: " + std::string(consent_ts_buffer) + ")" : "NOT Given"));
    UI::show("Calculated Consent Score (0-100, higher is better): " + std::to_string(s.consentScore()));

    UI::showSubSectionHeader("Loan Lifecycle & User Interaction");
    UI::show("Renewals/Extensions Taken: " + std::to_string(s.renewalsTaken) + " (Generic renewalCount: " + std::to_string(s.renewalCount) + ")");
    if (s.totalFeesPaidAcrossAllTerms > s.fee) UI::show(UI::string_format("Total Fees Paid/Accrued Across All Terms (incl. renewals): $%.2f", s.totalFeesPaidAcrossAllTerms));
    if (s.installmentPlanOffered) UI::show("Installment Plan: " + std::string(s.installmentPlanAccepted ? "Accepted" : "Offered but Declined"));
    if (s.freeExtensionUsed) UI::show("Special 0% Fee Extension Used: Yes (e.g., SD Pilot)");
    if (s.rushRating > 0) UI::show("User-Reported Rush Rating (1-5, 5=Very Rushed): " + std::to_string(s.rushRating));
    if (s.inOverdraftCycle) UI::show(UI::string_format("Simulated Overdraft Cycle: Yes, %d Lender NSF Debit Attempts, $%.2f Lender NSF Fees", s.nsfDebitAttemptsByLender, s.totalNSFFeesFromLender));
    if (!s.collectionThreatsMade.empty()) {
        UI::show("Collection Threats Made by Lender:");
        for(const auto& threat : s.collectionThreatsMade) UI::show("  - " + threat);
    }
    
    UI::showSubSectionHeader("Ethical Analysis & Educational Impact");
    UI::show("Dark Patterns Encountered (Count): " + std::to_string(s.darkPatternsEncountered.size()));
    if (!s.darkPatternsEncountered.empty()) {
        UI::show_raw("  Identified Tactics: ");
        for (size_t i = 0; i < s.darkPatternsEncountered.size(); ++i) {
            UI::show_raw(s.darkPatternsEncountered[i] + (i == s.darkPatternsEncountered.size() - 1 ? "" : "; "));
        }
        UI::show(""); 
    }
    UI::show("Ethical Safeguards Applied (Count): " + std::to_string(s.ethicalSafeguardsApplied.size()));
     if (!s.ethicalSafeguardsApplied.empty()) {
        UI::show_raw("  Identified Measures: ");
        for (size_t i = 0; i < s.ethicalSafeguardsApplied.size(); ++i) {
            UI::show_raw(s.ethicalSafeguardsApplied[i] + (i == s.ethicalSafeguardsApplied.size() - 1 ? "" : "; "));
        }
        UI::show(""); 
    }
    if (s.respectMeterScore < 100) UI::show(UI::string_format("Simulated Kantian Respect Meter Score: %.0f/100", s.respectMeterScore));

    if (!s.kantianReflectionResponse.empty()) UI::show("User Kantian Reflection: " + s.kantianReflectionResponse);
    if (!s.millianReflectionResponse.empty()) UI::show("User Millian Reflection (Overall): " + s.millianReflectionResponse);
    if (!s.millianRolloverJustification.empty()) UI::show("User Millian Reflection (Rollover): " + s.millianRolloverJustification);
    if (!s.userReflectionJournalEntry.empty()) UI::show("User Journal Entry: " + s.userReflectionJournalEntry);
    if (!s.userFeedbackSurveyResponse.empty()) UI::show("User Survey Feedback: " + s.userFeedbackSurveyResponse);

    showUserTermRecalls(s); 
    showSpecificDisclosuresMade(s); 
    
    UI::showSubSectionHeader("EDUCATIONAL MODULES PRESENTED");
    if(s.educationalModulesPresented.empty()){
        UI::show("No specific educational modules were explicitly logged as presented during this session.");
    } else {
        for(const auto& module : s.educationalModulesPresented){
            UI::show(" • " + module);
        }
    }

    showEventHistory(s); 
}

inline void generateFollowUpEmail(const LoanSession &s, const Config& c, const std::string& mode_name){
    UI::show("\n--- SIMULATED FOLLOW-UP EMAIL ---");
    if (UI::argEquals(mode_name, "Realistic Exploitative")) { 
        UI::show("To: " + (s.contact.empty() ? "Valued Applicant" : s.contact));
        UI::show("From: XpressLoot™ Customer Loyalty & Retention Division <vip-offers@xpressloot-financial-solutions.global.online.biz.scam>");
        UI::show("Subject: 🔥 URGENT ACTION REQUIRED: Your XpressLoot™ Account Status & EXCLUSIVE New Pre-Approved Offers Just For You! 🔥");
        UI::show("\nDear " + (s.userName.empty() ? "Valued Customer" : s.userName) + ",");
        if (s.deniedByLimit) {
            UI::show("We noticed your recent application for an XpressLoot™ cash advance could not be completed at this time due to: " + s.denialReason + ".");
            UI::show("BUT DON'T WORRY! Our system has already re-evaluated your profile and found NEW, even MORE FLEXIBLE funding solutions available RIGHT NOW that you are pre-qualified for! These offers are tailored to your unique situation! Click here [link_to_even_higher_apr_product_with_more_fees.scam] to re-apply with our VIP Second Chance Platinum Program! Approval is almost GUARANTEED if you act within the next 3 minutes and 47 seconds!");
        } else if (s.loanRescinded) {
            UI::show("We understand you chose to cancel your recent XpressLoot™ advance. That's okay! We value your freedom of choice (though we're sad to see a smart customer like you miss out!). However, because we value you, we're offering a SPECIAL WELCOME BACK & RECONSIDERATION BONUS if you reactivate your application within the next 23 hours! Get an EXTRA $25 added to your loan amount, on us! Click here [link_to_reinstate_with_bonus_fee_and_higher_rate.scam] to claim your bonus cash!");
        } else if (s.consentGiven) {
            UI::show("Congratulations again on your successful XpressLoot™ cash advance of $" + std::to_string((int)s.amount) + "! We're thrilled to have you in the XpressLoot™ family!");
            UI::show("Your total repayment of $" + std::to_string((int)s.totalRepayment) + " is due on [Simulated Future Date]. Remember to ensure funds are available for our convenient automatic debit!");
            UI::show("EXCLUSIVE VIP PLATINUM OFFER: As a new XpressLoot™ member, you're automatically pre-qualified for an INCREASED loan limit (up to $5000!) on your NEXT advance! Plus, get access to our 'Credit Builder Pro' (only $29.99/week, auto-billed) and 'Identity Shield Max' ($19.99/week, auto-billed) add-ons! And, if you refer a friend today, you BOTH get $75 bonus cash! [link_to_referral_and_upsell_scam.scam]");
            if (s.renewalsTaken > 0 || s.principalRemaining > 0) {
                UI::show("Your current outstanding principal is $" + std::to_string((int)s.principalRemaining) + ". Your next minimal service fee payment for your ongoing cash access is $" + std::to_string((int)s.fee) + ". Keep your access active!");
            }
        }
        UI::show("\nThank you for choosing XpressLoot™ - Your Trusted Partner in Financial Speed & Flexibility!");
        UI::showFinePrint("This email contains time-sensitive promotional material. All offers subject to change without notice based on proprietary algorithmic re-assessment. See full 187-page terms and conditions, privacy policy, data sharing agreement, and arbitration mandate on our ancillary website (link available upon written request to our offshore legal compliance unit, allow 12-16 weeks for response).");
    } else { // Regulated Ethical Redesign
        UI::show("To: " + (s.contact.empty() ? "Valued Client" : s.contact));
        UI::show("From: Lotus Responsible Finance <contact@lotusresponsiblefinance.sim>");
        UI::show("Subject: Your Loan Simulation Summary & Important Information - Session ID: " + s.sessionId);
        UI::show("\nDear " + (s.userName.empty() ? "Client" : s.userName) + ",");
        UI::show("Thank you for using the Lotus Responsible Finance Simulator. This email summarizes your recent session and provides important reminders regarding your rights and responsibilities.");
        if (s.deniedByLimit) {
            UI::show("Your simulated loan application could not be approved at this time. Reason: " + s.denialReason + ".");
            UI::show("We encourage you to review the educational materials presented during the simulation or seek advice from a non-profit financial counselor to explore alternative financial solutions.");
        } else if (s.loanRescinded) {
            UI::show("We confirm your decision to rescind/cancel your simulated loan agreement for loan amount $" + std::to_string((int)s.amount) + ". No obligations have been formed. This is your right under the cooling-off period, and we respect your decision.");
        } else if (s.consentGiven) {
            UI::show("Your simulated loan for $" + std::to_string((int)s.amount) + " has been processed with the following key terms, as disclosed and agreed upon:");
            UI::show(UI::string_format(" - Amount Financed: $%.2f", s.amount));
            UI::show(UI::string_format(" - Finance Charge: $%.2f", s.fee));
            UI::show(UI::string_format(" - Annual Percentage Rate (APR): %.2f%%", s.aprCalculated));
            UI::show(UI::string_format(" - Total of Payments: $%.2f", s.totalRepayment));
            UI::show(" - Loan Term: " + std::to_string(s.termDays) + " days");
            std::string dueDatePlaceholder = "[Date " + std::to_string(s.termDays) + " days from " + Regulated::getCurrentTimestampForLog().substr(0,10) + "]"; 
            UI::show(" - Due Date: " + dueDatePlaceholder);
            if (s.installmentPlanAccepted) {
                int longestInstallmentTerm = 0;
                if (!c.regulatedInstallmentMonthOptions.empty()) {
                    longestInstallmentTerm = c.regulatedInstallmentMonthOptions.back(); 
                }
                UI::show(" - Repayment: Via Installment Plan (up to " + std::to_string(longestInstallmentTerm) + " monthly installments - details in your agreement).");
            } else {
                UI::show(" - Repayment: Single payment due on the due date.");
            }
            UI::show("\n**IMPORTANT REMINDER: Your Right to Cancel (Rescission)**");
            UI::show("You have a legal Right to Cancel this loan without penalty or obligation within " + std::to_string(c.regulatedCoolingOffDays) + " business days from the later of loan consummation or delivery of all material disclosures (by approximately " + s.rescissionDeadlineText + "). Please refer to your loan documents for the exact procedure to cancel.");
            UI::show("\nPlease manage your repayment responsibly. If you anticipate any difficulties in making your payment, please contact us immediately at [Simulated Contact: 1-800-ETHICAL] to discuss potential options BEFORE the due date. Early communication is key.");
            UI::show("We also recommend reviewing financial planning resources available at consumerfinance.gov (CFPB) and through accredited non-profit credit counseling agencies.");
        }
        UI::show("\nSincerely,\nThe Lotus Responsible Finance Team\n[Simulated Address & Contact Info]");
    }
}

#endif
