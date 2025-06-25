#include "loan_session.h"
#include <map>

void LoanSession::record(const std::string &e, const std::string &d){
    std::time_t now = std::time(nullptr);
    history.push_back({e,d,now});
    if(e=="consent" || e=="metaConsent") {
        std::ofstream f("consent.log", std::ios::app);
        if(f.is_open()) f<<now<<","<<e<<","<<d<<"\n";
    }
}

void LoanSession::tagDarkPattern(const std::string &p) {
    darkPatterns.push_back(p);
    record("DarkPatternUsed", p); // Also log it as an event
}

void LoanSession::tagEthicalSafeguard(const std::string &p) {
    ethicalSafeguardsApplied.push_back(p);
    record("EthicalSafeguardApplied", p); // Also log it
}

void LoanSession::addReferencedDisclosure(const std::string& disclosure) {
    referencedDisclosures.push_back(disclosure);
}

void LoanSession::reset() {
    amount = 0; fee = 0; tip = 0; termDays = 14; // Reset termDays too
    userName = ""; employer = ""; contact = "";
    monthlyIncome = 0.0;
    rushRating = 0;
    // loanCount and freeExtensionUsed might persist for a "user" across simulations.
    // For a single run, resetting them is fine.
    // loanCount = 0; 
    // freeExtensionUsed = false;
    deniedByLimit = false; denialReason = "";
    fullDisclosureProvided = false;
    quizAttempts = 0; quizPassed = false;
    explicitConsentInput = ""; consentGiven = false;
    rescissionOffered = false; loanRescinded = false;
    renewalsTaken = 0;
    installmentPlanAccepted = false;

    history.clear();
    darkPatterns.clear();
    ethicalSafeguardsApplied.clear();
    recalls.clear();
    notices.clear();
    referencedDisclosures.clear();
}

int LoanSession::consentScore() const {
    int score = 100;
    if (!fullDisclosureProvided && consentGiven) score -= 30; // Major issue if consent without full disclosure
    if (!quizPassed && consentGiven && quizAttempts > 0) score -= 20; // Consented despite failing quiz
    if (!consentGiven && amount > 0) score = 0; // No loan without consent
    if (explicitConsentInput.empty() && consentGiven) score -= 10; // Consent wasn't explicit enough

    static const std::map<std::string, int> penalties = {
        {"urgency", 10}, // Reduced base penalty, specific tactics add more
        {"timePressureIntro", 15},
        {"timePressureAmountScarcity", 20},
        {"fakeConsent", 30}, // Higher penalty for superficial consent
        {"hiddenAPR", 25},
        {"misleadingAPR", 20},
        {"autoRollover", 15},
        {"autoRolloverOptOutDifficult", 25},
        {"guiltTip", 10},
        {"socialProofTip", 10},
        {"forcedTip", 20},
        {"hiddenFeesDetails", 15},
        {"feeStacking", 15},
        {"complexFinePrint", 15},
        {"precheckedOptIn", 20},
        {"dripPricing", 15},
        {"finePrintTerms", 15},
        {"hiddenDataSharing", 20}
    };
    const int defaultPenalty = 10;

    for(const auto &p: darkPatterns){
        auto it = penalties.find(p);
        if (it != penalties.end()) {
            score -= it->second;
        } else {
            score -= defaultPenalty;
        }
    }
    return std::max(0, score);
}

void LoanSession::exportJson(const std::string &file) const {
    std::ofstream o(file);
    o << "{\n";
    o << "  \"userName\": \""<<userName<<"\",\n";
    o << "  \"employer\": \""<<employer<<"\",\n";
    o << "  \"contact\": \""<<contact<<"\",\n";
    o << "  \"rushRating\": "<<rushRating<<",\n";
    o << "  \"amount\": "<<amount<<",\n";
    o << "  \"fee\": "<<fee<<",\n";
    o << "  \"tip\": "<<tip<<",\n";
    o << "  \"monthlyIncome\": "<<monthlyIncome<<",\n";
    o << "  \"consentGiven\": "<<(consentGiven?"true":"false")<<",\n";
    o << "  \"fullDisclosureProvided\": "<<(fullDisclosureProvided?"true":"false")<<",\n";
    o << "  \"quizPassed\": "<<(quizPassed?"true":"false")<<",\n";
    o << "  \"quizAttempts\": "<<quizAttempts<<",\n";
    o << "  \"renewalsTaken\": "<<renewalsTaken<<",\n";
    o << "  \"installmentPlanAccepted\": "<<(installmentPlanAccepted?"true":"false")<<",\n";
    o << "  \"denialReason\": \""<<denialReason<<"\",\n";
    o << "  \"consentScore\": "<<consentScore()<<",\n";
    o << "  \"manipulationIndex\": "<<manipulationIndex()<<",\n";
    o << "  \"darkPatterns\": [";
    for(size_t i=0;i<darkPatterns.size();++i){
        o << '\"'<<darkPatterns[i]<<'\"';
        if(i+1<darkPatterns.size()) o << ',';
    }
    o << "],\n  \"recalls\": ["; // Added recalls to JSON
    for(size_t i=0;i<recalls.size();++i){
        o << '\"'<<recalls[i]<<'\"';
        if(i+1<recalls.size()) o << ',';
    }
    o << "],\n  \"referencedDisclosures\": ["; // Added referencedDisclosures to JSON
    for(size_t i=0;i<referencedDisclosures.size();++i){
        o << '\"'<<referencedDisclosures[i]<<'\"';
        if(i+1<referencedDisclosures.size()) o << ',';
    }
    o << "],\n  \"ethicalSafeguardsApplied\": ["; // New export field
    for(size_t i=0;i<ethicalSafeguardsApplied.size();++i){
        o << '\"'<<ethicalSafeguardsApplied[i]<<'\"';
        if(i+1<ethicalSafeguardsApplied.size()) o << ',';
    }
    o << "],\n  \"history\": [";
    for(size_t i=0;i<history.size();++i){
        const auto &ev = history[i];
        o << "{\"type\":\""<<ev.type<<"\",\"data\":\""<<ev.data<<"\",\"ts\": "<<ev.timestamp<<"}";
        if(i+1<history.size()) o << ',';
    }
    o << "]\n}";
    o.close();
}

int LoanSession::loadLoanCount(){
    std::ifstream f("loan_count.txt");
    int n=0; if(f.is_open()) f>>n; return n;
}

void LoanSession::saveLoanCount(int n){
    std::ofstream f("loan_count.txt", std::ios::trunc);
    if(f.is_open()) f<<n;
}
