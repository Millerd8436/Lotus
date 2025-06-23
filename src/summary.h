#ifndef LOTUS_SUMMARY_H
#define LOTUS_SUMMARY_H

#include "loan_session.h"
#include "ui.h"

inline void printSummary(const LoanSession &s){
    UI::show("\n\u2500\u2500 SESSION SUMMARY \u2500\u2500");
    UI::show("Consent Integrity: " + std::to_string(s.consentScore()) + "/100");
    UI::show("Manipulation Index: " + std::to_string(s.manipulationIndex()));
}

inline void generateFollowUpEmail(const LoanSession &s){
    UI::show("\n📧 Follow-Up Email Preview:");
    UI::show("Dear " + s.userName + ",");
    UI::show("Thank you for using Lotus Simulator. Feel free to revisit terms or extend responsibly.");
    UI::show("Sincerely, Lotus Team");
}

#endif
