#ifndef LOTUS_REGULATED_H
#define LOTUS_REGULATED_H

#include "strategy.h"
#include "ui.h"

struct Regulated : LoanStrategy {
    void intro(LoanSession&, const Config&) override;
    void consent(LoanSession&, const Config&) override;
    double askAmt(LoanSession&) override;
    double calcFee(LoanSession&, const Config&) override;
    void extras(LoanSession&, const Config&) override;
    void renewals(LoanSession&, const Config&) override;
    void finalize(LoanSession&, const Config&, const std::string& mode) override;
};

#endif
