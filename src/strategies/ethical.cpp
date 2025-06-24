#include "ethical.h"

void Ethical::intro(LoanSession &s,const Config &c){
    if(c.showBelmontPrimer){
        UI::show("\xF0\x9F\x94\xAC [ETHICAL] Belmont Report Primer (1979):");
        s.addReferencedDisclosure("Belmont Report Primer (1979) presented.");
        UI::show(" \u2022 Respect for Persons (Autonomy)");
        UI::show(" \u2022 Beneficence");
        UI::show(" \u2022 Non-maleficence");
        UI::show(" \u2022 Justice");
        s.record("primer","Belmont Report");
        UI::show("This ideal scenario prioritizes borrower well-being above profit.");
        UI::show("Such transparency and low rates would likely require subsidies and face regulatory hurdles,");
        UI::show("so it is generally impractical in the current payday market.");
    }
}

void Ethical::consent(LoanSession &s,const Config &c){
    if(c.showBelmontPrimer){
        std::string m;
        do{
            m = UI::prompt("Meta-consent: Do you feel any pressure or unfair nudging right now? (yes/no)");
            s.record("metaConsent",m);
            if(m=="yes") UI::show("We can pause or review the terms again so your decision remains fully voluntary.");
        }while(m=="yes");
    }
    UI::tooltip("Informed Consent: clear terms, no hidden clauses.");
    s.addReferencedDisclosure("Tooltip: Informed Consent - clear terms, no hidden clauses.");
    std::string cstr = UI::prompt("Type 'yes' only if you still freely consent:");
    if(cstr!="yes") { UI::show("Consent withdrawn. Goodbye."); std::exit(0); }
    s.record("consent",cstr);
}

double Ethical::askAmt(LoanSession &s){
    if(s.amount>0){ s.record("amount", std::to_string(s.amount)); return s.amount; }
    double a = UI::askNum("Enter desired loan amount:");
    s.amount = a; s.record("amount", std::to_string(a));
    return a;
}

double Ethical::calcFee(LoanSession &s,const Config &c){
    double base = s.amount * (c.apr/100);
    if(c.showCostBenefit){
        UI::show("\xF0\x9F\x93\x8B Cost–Benefit Ledger:");
        s.addReferencedDisclosure("Cost-Benefit Ledger shown.");
        UI::show(" \u2022 Funding cost: $" + std::to_string((int)base));
        UI::show(" \u2022 Admin overhead: $5");
        UI::show(" → Total fee: $" + std::to_string((int)(base+5)));
        UI::show("This transparent ledger explains exactly where your money goes to support informed consent and community benefit.");
    }
    s.fee = base + 5; s.record("fee", std::to_string(s.fee));
    return s.fee;
}

void Ethical::extras(LoanSession &s,const Config &c){
    UI::show("\nLoan Terms Summary:");
    UI::show(" • Amount: $" + std::to_string((int)s.amount));
    UI::show(" • APR: " + std::to_string(c.apr) + "%");
    UI::show(" • Fee: $" + std::to_string((int)s.fee));
    UI::show(" • Repay in: " + std::to_string(c.daysToRepay) + " days");
    UI::show("No post-approval extras: full transparency.");
}

void Ethical::renewals(LoanSession&, const Config&){
    UI::show("Rollover ethically discouraged.");
}

void Ethical::finalize(LoanSession &s,const Config &c, const std::string& mode){
    UI::show("\n--- Finalizing Loan (Mode: " + mode + (c.state.empty() ? "" : ", State: " + c.state) + ") ---");
    if(c.showDebrief){
        UI::show("\n\u2500\u2500 Debrief \u2500\u2500");
        s.addReferencedDisclosure("Ethical Debrief presented (Kant, Mill, Rawls).");
        UI::show("\"Act so that you treat humanity never merely as a means...\" — Kant");
        UI::show("\"The harm principle: only prevent harm to others.\" — Mill");
        UI::show("\"Justice as fairness.\" — Rawls");
        UI::show("No hidden fees or pressure were used, respecting your autonomy (Kant). The loan caused no undue harm (Mill) and was offered on fair terms equal to anyone else (Rawls).");
        UI::show("This utopian approach offers maximal transparency but would rarely sustain a payday business in reality.");
    }
    if(c.earlyPayoffIncentive){
        std::string a = UI::prompt("Early payoff within 7 days for $5 off? (yes/no)");
        if(a=="yes"){ s.fee = std::max(0.0, s.fee-5); UI::show("Discount applied. New fee: $"+std::to_string((int)s.fee)); s.record("earlyPayoff", "accepted");}
        else { s.record("earlyPayoff", "declined"); }
    }

    // Term Recall Prompts
    std::string recalledAPR = UI::prompt("Term Recall: What was the disclosed APR (%) for this loan?");
    s.recall("Disclosed APR: " + recalledAPR);
    std::string recalledFee = UI::prompt("Term Recall: What was the disclosed Fee ($) for this loan?");
    s.recall("Disclosed Fee: " + recalledFee);

    if(c.showAmortization) UI::schedule(s.amount,s.fee,c.daysToRepay);
    
    printSummary(s); // Added summary print for Ethical mode

    if(c.exportSession){
        UI::show("Session will be saved to JSON file.");
        if(UI::prompt("Proceed? (yes/no)")=="yes") s.exportJson("ethical.json");
        else UI::show("Export skipped.");
    }
    std::string r = UI::prompt("Did this simulation help you understand design influence? (yes/no/comments)");
    s.record("userReflection", r);
}
