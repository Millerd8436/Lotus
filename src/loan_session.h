#ifndef LOTUS_LOAN_SESSION_H
#define LOTUS_LOAN_SESSION_H

#include <string>
#include <vector>
#include <utility>
#include <ctime>
#include <fstream>
#include <algorithm>

struct Event { std::string type, data; std::time_t timestamp; };

class LoanSession {
public:
    double amount = 0, fee = 0, tip = 0;
    std::string userName, employer, contact;
    int rushRating = 0;
    bool freeExtensionUsed = false;
    int loanCount = 0;
    bool deniedByLimit = false;

    std::vector<Event> history;
    std::vector<std::string> darkPatterns;
    std::vector<std::string> recalls;
    std::vector<std::pair<std::string,std::string>> notices;

    void record(const std::string &e, const std::string &d = "");
    void tag(const std::string &p) { darkPatterns.push_back(p); }
    void notice(const std::string &s,const std::string &n){ notices.emplace_back(s,n); }
    void recall(const std::string &q){ recalls.push_back(q); }

    int consentScore() const;
    int manipulationIndex() const { return (int)darkPatterns.size(); }
    void exportJson(const std::string &file) const;

    static int loadLoanCount();
    static void saveLoanCount(int n);
};

#endif
