#ifndef LOTUS_REGULATED_H
#define LOTUS_REGULATED_H

#include "strategy.h"
#include "ui.h"
#include "config.h" // Ensure Config is included

// This class now represents the "Regulated Ethical Redesign Mode"
struct Regulated : LoanStrategy {
    void intro(LoanSession&, const Config&) override;
    void consent(LoanSession&, const Config&) override; // Gathers initial info like income
    double askAmt(LoanSession&) override;
    double calcFee(LoanSession&, const Config&) override; // Incorporates Rawlsian fee structures & income cap
    void extras(LoanSession&, const Config&) override; // Minimal, focused on clarity before final consent
    void renewals(LoanSession&, const Config&) override; // Incorporates Rawlsian limits & state rules
    void finalize(LoanSession&, const Config&, const std::string& mode) override; // Main consent & education flow

private:
    // Helper methods for the RegulatedEthicalRedesign strategy
    void performFullDisclosure(LoanSession& s, const Config& c, double actualAPR); // Pass session by ref
    bool conductComprehensionQuiz(LoanSession& s, const Config& c); // Pass session by ref
    void obtainExplicitConsent(LoanSession& s, const Config& c);    // Pass session by ref
    
    void explainEthicalFrameworks(LoanSession& s, const Config& c); 
    void provideEducationalModules(LoanSession& s, const Config& c);
    void offerInstallmentPlanOption(LoanSession& s, const Config& c); // Renamed
    double calculateLoanAPR(double principal, double fee, int termDays); // Renamed
};

#endif
