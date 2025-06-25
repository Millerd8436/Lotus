#ifndef LOTUS_UI_H
#define LOTUS_UI_H

#include <iostream>
#include <string>
#include <thread>
#include <chrono>
#include <vector> // For std::vector in quiz function

namespace UI {
    inline void show(const std::string &s){ std::cout<<s<<"\n"; }
    inline void show_raw(const std::string &s){ std::cout<<s; } // For prompts on same line

    inline std::string prompt(const std::string &s){
        show(s); std::string r; std::getline(std::cin,r);
        if(r=="exit") { show("Session ended by user."); std::exit(0); }
        return r;
    }
    inline double askNum(const std::string &s){
        while(true){
            std::string v_str = prompt(s); // Renamed internal variable
            try { double x = std::stod(v_str); if(x>=0) return x; } // Allow 0 for income/some inputs
            catch(...){}
            show("\u26A0\uFE0F Enter a valid non-negative number or type 'exit' to quit.");
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
    inline void showTILAHeader(const Config& c) {
        showDisclosureHeader(c.regulatedTILAHeader);
    }

    // Updated askQuizQuestion to be more generic, actual Qs/As from Config/Strategy
    inline bool askMultiChoiceQuiz(LoanSession& s, const std::string& question_text, const std::vector<std::string>& options, int correct_option_index) {
        show("\n--- COMPREHENSION CHECK ---");
        show(question_text);
        for (size_t i = 0; i < options.size(); ++i) {
            show("  " + std::to_string(i + 1) + ". " + options[i]);
        }
        int answer = -1;
        while(true) {
            std::string ans_str = prompt("Enter your choice (number):");
            if(ans_str == "exit") { show("Session ended by user."); std::exit(0); }
            try {
                answer = std::stoi(ans_str);
                if (answer >= 1 && answer <= static_cast<int>(options.size())) {
                    break; 
                } else {
                    show("\u26A0\uFE0F Invalid choice. Please enter a number between 1 and " + std::to_string(options.size()) + ".");
                }
            } catch(...) {
                show("\u26A0\uFE0F Invalid input. Please enter a number.");
            }
        }
        s.quizAttempts++; // Track attempts in session
        if ((answer - 1) == correct_option_index) {
            show("✅ Correct!");
            s.record("QuizAnswer", question_text + " - Correct");
            return true;
        }
        show("❌ Incorrect. The correct answer was: " + options[correct_option_index]);
        s.record("QuizAnswer", question_text + " - Incorrect");
        return false;
    }

    inline void showEthicalPrinciple(const std::string& principle, const std::string& explanation) {
        show("\n💡 ETHICAL FRAMEWORK: " + principle + " 💡");
        show(explanation);
    }

    inline void showEducationalSnippet(const std::string& title, const std::string& content) {
        show("\n🎓 EDUCATIONAL INFORMATION: " + title + " 🎓");
        show(content);
    }

    inline void showWarning(const std::string& message) {
        show("⚠️ WARNING: " + message);
    }
    
    inline void showFinePrint(const std::string& text) {
        // Simulate fine print - could be smaller text or just a note
        show("(Fine Print: " + text + ")");
    }

    inline void showTimePressure(const std::string& message, int wait_seconds = 3) {
        show("⏳ " + message);
        if (wait_seconds > 0) wait(wait_seconds); // Use existing wait function
    }

    inline void showFakeTestimonial(const std::string& testimonial) {
        show("\n🌟 Hear from our 'satisfied' customers! 🌟");
        show("\"" + testimonial + "\" - A. User");
    }

    inline void schedule(double amt,double fee,int days){
        double total=amt+fee;
        double daily=total/days;
        show("Amortization Schedule:");
        for(int d=1; d<=days; ++d) show(" Day " + std::to_string(d) + ": $" + std::to_string(daily*d));
    }
}

#endif
    }
}

#endif
