#ifndef LOTUS_UI_H
#define LOTUS_UI_H

#include <iostream>
#include <string>
#include <thread>
#include <chrono>

namespace UI {
    inline void show(const std::string &s){ std::cout<<s<<"\n"; }
    inline std::string prompt(const std::string &s){
        show(s); std::string r; std::getline(std::cin,r);
        if(r=="exit") { show("Session ended by user."); std::exit(0); }
        return r;
    }
    inline double askNum(const std::string &s){
        while(true){
            std::string v = prompt(s);
            try { double x = std::stod(v); if(x>0) return x; }
            catch(...){}
            show("\u26A0\uFE0F Enter a valid number or type 'exit' to quit.");
        }
    }
    inline void wait(int s){
        for(;s>0;--s){
            show("\u23F1 " + std::to_string(s) + "s");
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }
    }
    inline void bank(){
        show("🔒 Connecting bank...");
        std::this_thread::sleep_for(std::chrono::seconds(1));
        show("✅ Bank connected securely.");
    }
    inline void tiny(const std::string &t){ std::cout<<"(tiny) "<<t<<"\n"; }
    inline void tooltip(const std::string &t){ show("🛈 " + t); }
    inline void legalNotice(const std::string &t){ show("⚖️ " + t); }
    inline void schedule(double amt,double fee,int days){
        double total=amt+fee;
        double daily=total/days;
        show("Amortization Schedule:");
        for(int d=1; d<=days; ++d) show(" Day " + std::to_string(d) + ": $" + std::to_string(daily*d));
    }
}

#endif
