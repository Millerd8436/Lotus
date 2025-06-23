#include "loan_session.h"

void LoanSession::record(const std::string &e, const std::string &d){
    std::time_t now = std::time(nullptr);
    history.push_back({e,d,now});
    if(e=="consent" || e=="metaConsent") {
        std::ofstream f("consent.log", std::ios::app);
        if(f.is_open()) f<<now<<","<<e<<","<<d<<"\n";
    }
}

int LoanSession::consentScore() const {
    int score = 100;
    for(const auto &p: darkPatterns){
        if(p=="urgency" || p=="fakeConsent" || p=="hiddenAPR") score -= 20;
        else if(p=="rollover" || p=="guiltTip") score -= 15;
        else score -= 10;
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
