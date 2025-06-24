#include "../summary.h"
#include "regulated.h"

void Regulated::intro(LoanSession& s, const Config& c){
    UI::show("🏛 Regulated mode: CFPB & State Constraints");
    if(!c.state.empty()) UI::show("Applying rules for state: " + c.state);
    UI::show("This scenario reflects real payday regulations and remains commercially viable while offering key consumer protections.");
    if(c.enforceLoanLimit){
        int count = LoanSession::loadLoanCount();
        s.loanCount = count;
        if(count >= c.maxLoansPerYear){
            UI::show("⚠️ Limit Reached: State law limits you to " + std::to_string(c.maxLoansPerYear) + " loans per year.");
            s.deniedByLimit = true;
        }
    }
}

void Regulated::consent(LoanSession &s,const Config &c){
    if(s.deniedByLimit){ return; }
    if(c.requireQuiz){
        double answer = 0.0;
        do {
            answer = UI::askNum("Quiz: Which number is the APR? (enter percentage)?");
        } while(answer != c.maxRegulatedAPR);
        std::string a = std::to_string(answer);
        s.record("quizPassed",a);
    }
    if(c.banArbitration) UI::show("✅ You retain your right to sue in court — no arbitration required.");
    if(c.shareDataWithPartners){
        if(UI::prompt("Share data with partners? (yes/no)") != "yes")
            UI::show("🔒 Data will not be shared.");
    }
    UI::show("Amount Financed and APR will be disclosed clearly below.");
    while(UI::prompt("Type 'I AGREE' to accept plain-language TILA statement:") != "I AGREE"){}
    s.record("consent","I AGREE");
}

double Regulated::askAmt(LoanSession &s){
    if(s.deniedByLimit) return 0.0;
    UI::show("🔌 Reading your bank balance...");
    UI::show("Detected balance: $750");
    if(s.amount>0){ s.record("amount", std::to_string(s.amount)); return s.amount; }
    double a = UI::askNum("Enter loan amount (<=50% balance): $");
    s.amount=a; s.record("amount",std::to_string(a));
    return a;
}

double Regulated::calcFee(LoanSession &s,const Config &c){
    if(s.deniedByLimit) return 0.0;
    double apr = std::min(c.apr,c.maxRegulatedAPR);
    double f   = s.amount*(apr/100);
    s.record("fee", std::to_string(f));
    if(c.showCfpbReference) {
        UI::legalNotice("CFPB Reg Z §1026: 36% APR cap");
        s.addReferencedDisclosure("CFPB Reg Z §1026: 36% APR cap");
    }
    if(c.showDelawareCase) {
        UI::legalNotice("Delaware v. X Corp (2024): usury cap enforced");
        s.addReferencedDisclosure("Delaware v. X Corp (2024): usury cap enforced");
    }
    if(c.showSdPilot) {
        UI::legalNotice("SD Pilot: 0% APR extension once/year");
        s.addReferencedDisclosure("SD Pilot: 0% APR extension once/year");
    }
    if(c.requireCoolingOff) UI::show("Cooling-off: You may cancel within 24h.");
    return s.fee=f;
}

void Regulated::extras(LoanSession&, const Config&){ }

void Regulated::renewals(LoanSession &s,const Config &c){
    if(s.deniedByLimit) return;
    if(!c.allowRollover) UI::show("🚫 Auto-rollover prohibited by law.");
    if(c.showSdPilot && !s.freeExtensionUsed){
        std::string r = UI::prompt("ℹ️ One-time 0% extension available. Type 'YES' to use it:");
        if(r=="YES"){
            s.freeExtensionUsed=true;
            s.record("freeExtension","granted");
            UI::show("Extension granted at 0% APR for 30 days.");
        }
    }
}

void Regulated::finalize(LoanSession &s,const Config &c, const std::string& mode){
    UI::show("\n--- Finalizing Loan (Mode: " + mode + (c.state.empty() ? "" : ", State: " + c.state) + ") ---");
    if(s.deniedByLimit){ return; }
    s.userName = UI::prompt("Your name:");
    s.employer = UI::prompt("Employer:");
    s.contact  = UI::prompt("Contact:");
    UI::show("\n==== Truth in Lending Disclosure ====");
    UI::show("Amount Financed: $" + std::to_string((int)s.amount));
    UI::show("Finance Charge: $" + std::to_string((int)s.fee));
    double apr = std::min(c.apr,c.maxRegulatedAPR);
    UI::show("APR: " + std::to_string(apr) + "%");
    UI::show("Total of Payments: $" + std::to_string((int)(s.amount+s.fee)));
    UI::show("Payment Due in " + std::to_string(c.daysToRepay) + " days");
    while(UI::prompt("Type 'I AGREE' to confirm these terms:")!="I AGREE"){}
    s.record("finalAgreement", "I AGREE");

    // Term Recall Prompts
    std::string recalledAPR = UI::prompt("Term Recall: What was the disclosed APR (%) for this loan?");
    s.recall("Disclosed APR: " + recalledAPR);
    std::string recalledFee = UI::prompt("Term Recall: What was the disclosed Finance Charge ($) for this loan?");
    s.recall("Disclosed Finance Charge: " + recalledFee);
    
    printSummary(s);
    UI::show("Compliance Report:");
    UI::show(" • APR cap applied: " + std::string(c.apr>c.maxRegulatedAPR?"YES":"NO"));
    UI::show(" • Cooling-off right: " + std::string(c.requireCoolingOff?"YES":"NO"));
    UI::show(" • Rollovers allowed: " + std::string(c.allowRollover?"YES":"NO"));
    UI::show("These safeguards reflect real laws while keeping the loan profitable enough that lenders remain in the market.");
    if(c.showAmortization) UI::schedule(s.amount,s.fee,c.daysToRepay);
    if(c.exportSession){
        UI::show("Session will be saved to JSON file.");
        if(UI::prompt("Proceed? (yes/no)")=="yes") s.exportJson("regulated.json");
        else UI::show("Export skipped.");
    }
    std::string resp = UI::prompt("Type 'cancel' within 24h to rescind this loan:");
    if(resp=="cancel"){ UI::show("✅ Loan cancelled under rescission rule."); return; }
    int count = LoanSession::loadLoanCount();
    if(c.enforceLoanLimit) LoanSession::saveLoanCount(count+1);
    std::string r = UI::prompt("Did this simulation help you understand design influence? (yes/no/comments)");
    s.record("userReflection", r);
}
