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
    UI::show("Consent Integrity: " + std::to_string(s.consentScore()) + "/100");
    UI::show("Manipulation Index: " + std::to_string(s.manipulationIndex()));
    if(s.rushRating > 0) UI::show("User Rushed Rating: " + std::to_string(s.rushRating) + "/5");

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
