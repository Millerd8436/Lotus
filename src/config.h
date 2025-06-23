#ifndef LOTUS_CONFIG_H
#define LOTUS_CONFIG_H

#include <string>

struct Config {
    double apr = 24.0;                // Belmont Report ethics
    double exploitFeeRate = 0.30;     // exploitative fee rate
    int    daysToRepay = 14;          // typical payday window
    double riskThreshold = 1.5;       // rollover-risk alert ratio

    double maxRegulatedAPR = 36.0;    // APR cap
    bool   allowRollover   = false;   // state-level rollover bans
    bool   requireCoolingOff = true;  // 24h right-to-cancel

    bool showBelmontPrimer      = true;
    bool showDarkPatternsSource = true;
    bool showCfpbReference      = true;
    bool showDelawareCase       = true;
    bool showSdPilot            = true;

    bool showCostBenefit  = true;
    bool showDebrief      = true;
    bool dynamicZip       = true;
    bool buriedDataNotice = true;
    bool autoRolloverFinePrint = true;
    bool showScarcity     = true;
    bool abCountdown      = true;
    bool requireQuiz      = true;

    std::string state = "";          // optional state code

    bool forceArbitrationClause = true; // exploitative forced arbitration
    bool shareDataWithPartners = true;  // exploitative data sale
    bool banArbitration = true;        // regulated keeps court rights

    bool exportSession       = true;  // persist session JSON
    bool showAmortization    = true;  // display amortization schedule
    bool earlyPayoffIncentive = true; // offer early payoff discount

    int  maxLoansPerYear = 5;         // yearly loan limit
    bool enforceLoanLimit = true;     // enforce loan count cap
};

#endif
