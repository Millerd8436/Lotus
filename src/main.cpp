#include "config.h"
#include "ui.h"
#include "loan_session.h"
#include "strategies/ethical.h"
#include "strategies/exploit.h"
#include "strategies/regulated.h"

#include <memory>
#include <cstdlib>

int main(int argc,char* argv[]){
    srand((unsigned)time(nullptr));
    Config cfg;
    UI::show("=== Lotus CLI Simulator ===");
    std::string mode="";
    std::string state="";
    double presetAmt=-1;
    for(int i=1;i<argc;++i){
        std::string arg=argv[i];
        if(arg.rfind("--mode=",0)==0) mode=arg.substr(7);
        else if(arg.rfind("--loan=",0)==0) presetAmt = std::stod(arg.substr(7));
        else if(arg.rfind("--state=",0)==0) state=arg.substr(8);
    }
    if(mode.empty()) mode = UI::prompt("Select mode (ethical/exploitative/regulated):");

    auto applyState=[&](const std::string& st){
        if(st=="SD"){ cfg.maxRegulatedAPR=36.0; cfg.showSdPilot=true; cfg.showDelawareCase=false; }
        else if(st=="DE"){ cfg.maxRegulatedAPR=36.0; cfg.showDelawareCase=true; }
        else if(st=="RI"){ cfg.maxRegulatedAPR=260.0; cfg.allowRollover=true; }
        else if(st=="UT"){ cfg.maxRegulatedAPR=400.0; cfg.allowRollover=true; }
    };
    if(!state.empty()){ applyState(state); cfg.state = state; }

    std::unique_ptr<LoanStrategy> strat;
    if(mode=="ethical")       strat = std::make_unique<Ethical>();
    else if(mode=="regulated") strat = std::make_unique<Regulated>();
    else                         strat = std::make_unique<Exploit>();

    LoanSession sess;
    if(presetAmt>0) sess.amount=presetAmt;
    strat->intro(sess,cfg);
    strat->consent(sess,cfg);
    strat->askAmt(sess);
    strat->calcFee(sess,cfg);
    strat->extras(sess,cfg);
    strat->renewals(sess,cfg);
    strat->finalize(sess,cfg, mode);

    UI::show("Done.");
    return 0;
}
