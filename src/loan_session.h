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
    // Core loan data
    double amount = 0.0;
    double fee = 0.0;
    double tip = 0.0; // Primarily for exploitative mode
    int termDays = 14; // Default, can be set by Config

    // User profile data
    std::string userName = "";
    std::string employer = ""; // Optional
    std::string contact = "";  // Optional
    double monthlyIncome = 0.0; // Crucial for Rawlsian ethics & affordability

    // Session state & outcomes
    int rushRating = 0;             // User-reported feeling of being rushed (Exploitative)
    bool freeExtensionUsed = false;  // e.g., SD Pilot Program
    int loanCount = 0;              // For yearly limits
    bool deniedByLimit = false;     // If loan limit, income cap, etc., denies
    std::string denialReason = "";

    // Informed Consent Tracking
    bool fullDisclosureProvided = false;
    int quizAttempts = 0;
    bool quizPassed = false;
    std::string explicitConsentInput = ""; // What the user typed
    bool consentGiven = false;
    bool rescissionOffered = false;
    bool loanRescinded = false;

    // Loan lifecycle
    int renewalsTaken = 0;
    bool installmentPlanAccepted = false;

    // Logging & Analysis
    std::vector<Event> history;
    std::vector<std::string> darkPatterns; // Tags for exploitative tactics used
    std::vector<std::string> ethicalSafeguardsApplied; // Tags for ethical measures taken
    std::vector<std::string> recalls;      // User recall of terms
    std::vector<std::pair<std::string,std::string>> notices; // General notices
    std::vector<std::string> referencedDisclosures; // Specific legal/ethical disclosures shown

    void record(const std::string &e, const std::string &d = "");
    void tagDarkPattern(const std::string &p); // Renamed from tag for clarity
    void tagEthicalSafeguard(const std::string &p) { ethicalSafeguardsApplied.push_back(p); }
    void notice(const std::string &s,const std::string &n){ notices.emplace_back(s,n); }
    void recall(const std::string &q){ recalls.push_back(q); }
    void addReferencedDisclosure(const std::string& disclosure);

    void reset();

    int consentScore() const; // May need refinement based on new consent details
    int manipulationIndex() const { return (int)darkPatterns.size(); }
    void exportJson(const std::string &file) const;

    static int loadLoanCount();
    static void saveLoanCount(int n);
};

#endif
#endif
