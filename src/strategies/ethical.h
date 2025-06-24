#ifndef LOTUS_ETHICAL_H
#define LOTUS_ETHICAL_H

#include "strategy.h"
#include "ui.h"

struct Ethical : LoanStrategy {
    void intro(LoanSession&, const Config&) override;
    void consent(LoanSession&, const Config&) override;
    double askAmt(LoanSession&) override;
    double calcFee(LoanSession&, const Config&) override;
    void extras(LoanSession&, const Config&) override;
    void renewals(LoanSession&, const Config&) override;
    void finalize(LoanSession&, const Config&, const std::string& mode) override;
};

#endif
