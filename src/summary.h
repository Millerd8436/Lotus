#ifndef LOTUS_SUMMARY_H
#define LOTUS_SUMMARY_H

#include "loan_session.h"
#include "ui.h"
#include <iomanip> // For std::put_time

inline void showEventHistory(const LoanSession &s){
    UI::show("\n\u2500\u2500 EVENT HISTORY \u2500\u2500");
    if(s.history.empty()){
        UI::show("No events recorded.");
        return;
    }
    for(const auto& event : s.history){
        // Convert time_t to tm struct for formatting
        std::tm tm_snapshot;
        #ifdef _WIN32
        localtime_s(&tm_snapshot, &event.timestamp);
        #else
        localtime_r(&event.timestamp, &tm_snapshot); // POSIX
        #endif
        
        char buffer[32];
        // Format time as HH:MM:SS
        std::strftime(buffer, sizeof(buffer), "%H:%M:%S", &tm_snapshot);

        UI::show(" [" + std::string(buffer) + "] " + event.type + ": " + event.data);
    }
}

inline void showReferencedDisclosures(const LoanSession &s){
    UI::show("\n\u2500\u2500 REFERENCED DISCLOSURES \u2500\u2500");
    if(s.referencedDisclosures.empty()){
        UI::show("No specific disclosures recorded.");
        return;
    }
    for(const auto& disclosure : s.referencedDisclosures){
        UI::show(" • " + disclosure);
    }
}

inline void showRecalls(const LoanSession &s){
    UI::show("\n\u2500\u2500 USER TERM RECALL \u2500\u2500");
    if(s.recalls.empty()){
        UI::show("No recall data recorded.");
        return;
    }
    for(const auto& recall : s.recalls){
        UI::show(" • " + recall);
    }
}

inline void printSummary(const LoanSession &s){
    UI::show("\n\u2500\u2500 SESSION SUMMARY \u2500\u2500");
    UI::show("User Name: " + (s.userName.empty() ? "N/A" : s.userName));
    UI::show("Monthly Income Provided: $" + std::to_string((int)round(s.monthlyIncome)));
    UI::show("Loan Amount: $" + std::to_string((int)round(s.amount)) + ", Fee: $" + std::to_string((int)round(s.fee)) + ", Term: " + std::to_string(s.termDays) + " days");
    if (s.tip > 0) UI::show("Tip/Gratuity Paid: $" + std::to_string((int)round(s.tip)));
    
    UI::show("\n--- Consent & Understanding ---");
    UI::show("Full Disclosure Provided: " + std::string(s.fullDisclosureProvided ? "Yes" : "No"));
    if (s.quizAttempts > 0) { 
        UI::show("Comprehension Quiz Passed: " + std::string(s.quizPassed ? "Yes" : "No") + " (Attempts: " + std::to_string(s.quizAttempts) + ")");
    }
    UI::show("Explicit Consent Phrase Typed: \"" + s.explicitConsentInput + "\"");
    UI::show("Consent Given: " + std::string(s.consentGiven ? "Yes" : "No"));
    if (s.rescissionOffered) UI::show("Rescission Right Offered: Yes" + std::string(s.loanRescinded ? " (Exercised by user)" : " (Not exercised immediately)"));

    UI::show("\n--- Loan Lifecycle & Outcomes ---");
    UI::show("Renewals Taken: " + std::to_string(s.renewalsTaken));
    if (s.installmentPlanAccepted) UI::show("Installment Plan Accepted: Yes");
    if (s.deniedByLimit) UI::show("Loan Denied/Halted: Yes (Reason: " + s.denialReason + ")");
    if (s.freeExtensionUsed) UI::show("Special 0% Extension Used: Yes");

    UI::show("\n--- Ethical & Pattern Analysis ---");
    UI::show("Consent Integrity Score (0-100, higher is better): " + std::to_string(s.consentScore()));
    UI::show("Dark Patterns Encountered (Count): " + std::to_string(s.darkPatterns.size()));
    if (!s.darkPatterns.empty()) {
        UI::show_raw("  Tactics: ");
        for (size_t i = 0; i < s.darkPatterns.size(); ++i) {
            UI::show_raw(s.darkPatterns[i] + (i == s.darkPatterns.size() - 1 ? "" : ", "));
        }
        UI::show(""); // Newline
    }
    UI::show("Ethical Safeguards Applied (Count): " + std::to_string(s.ethicalSafeguardsApplied.size()));
     if (!s.ethicalSafeguardsApplied.empty()) {
        UI::show_raw("  Measures: ");
        for (size_t i = 0; i < s.ethicalSafeguardsApplied.size(); ++i) {
            UI::show_raw(s.ethicalSafeguardsApplied[i] + (i == s.ethicalSafeguardsApplied.size() - 1 ? "" : ", "));
        }
        UI::show(""); // Newline
    }
    if(s.rushRating > 0) UI::show("User-Reported Rush Rating (1-5, 5=Very Rushed): " + std::to_string(s.rushRating));

    showEventHistory(s);
    showReferencedDisclosures(s);
    showRecalls(s);
}

inline void generateFollowUpEmail(const LoanSession &s){
    UI::show("\n📧 Follow-Up Email Preview:");
    UI::show("Dear " + s.userName + ",");
    UI::show("Thank you for using Lotus Simulator. Feel free to revisit terms or extend responsibly.");
    UI::show("Sincerely, Lotus Team");
}

#endif
