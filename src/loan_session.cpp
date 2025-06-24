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

void LoanSession::addReferencedDisclosure(const std::string& disclosure) {
    referencedDisclosures.push_back(disclosure);
}

int LoanSession::consentScore() const {
    static const std::map<std::string, int> penalties = {
        {"urgency", 20},
        {"fakeConsent", 20},
        {"hiddenAPR", 20},
        {"autoRollover", 15}, // Changed from "rollover" to "autoRollover"
        {"guiltTip", 15},
        {"forcedTip", 10} // Added penalty for forcedTip
    };
    const int defaultPenalty = 10;

    int score = 100;
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
    o << "  \"freeExtensionUsed\": "<<(freeExtensionUsed?"true":"false")<<",\n";
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
