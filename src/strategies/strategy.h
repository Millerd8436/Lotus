#ifndef LOTUS_STRATEGY_H
#define LOTUS_STRATEGY_H

#include "loan_session.h"
#include "config.h"

struct LoanStrategy {
    virtual void intro(LoanSession&, const Config&) =0;
    virtual void consent(LoanSession&, const Config&) =0;
    virtual double askAmt(LoanSession&) =0;
    virtual double calcFee(LoanSession&, const Config&) =0;
    virtual void extras(LoanSession&, const Config&) =0;
    virtual void renewals(LoanSession&, const Config&) =0;
    virtual void finalize(LoanSession&, const Config&, const std::string& mode) =0;
    virtual ~LoanStrategy(){}
};

#endif
