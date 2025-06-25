#include "loan_session.h"
#include <map>
#include <algorithm> 
#include <fstream>   
#include <ctime>     
#include <numeric> 
#include <iomanip> 

// Define defaultPenalty if not already defined
const int defaultPenalty = 15; 

void LoanSession::record(const std::string &e, const std::string &d){
    std::time_t now = std::time(nullptr);
    std::string sanitized_d = d;
    std::replace(sanitized_d.begin(), sanitized_d.end(), '"', '\''); 
    std::replace(sanitized_d.begin(), sanitized_d.end(), '\n', ' ');
    std::replace(sanitized_d.begin(), sanitized_d.end(), '\r', ' ');
    history.push_back({e, sanitized_d, now});
}

void LoanSession::tagDarkPattern(const std::string &p) {
    if (std::find(darkPatternsEncountered.begin(), darkPatternsEncountered.end(), p) == darkPatternsEncountered.end()) {
        darkPatternsEncountered.push_back(p);
    }
    record("DarkPatternEncountered", p); 
}

void LoanSession::tagEthicalSafeguard(const std::string &p) {
    if (std::find(ethicalSafeguardsApplied.begin(), ethicalSafeguardsApplied.end(), p) == ethicalSafeguardsApplied.end()) {
        ethicalSafeguardsApplied.push_back(p);
    }
    record("EthicalSafeguardApplied", p); 
}

void LoanSession::addEducationalModuleShown(const std::string& moduleName) {
    if (std::find(educationalModulesPresented.begin(), educationalModulesPresented.end(), moduleName) == educationalModulesPresented.end()) {
        educationalModulesPresented.push_back(moduleName);
    }
    record("EducationalModulePresented", moduleName);
}

void LoanSession::addSpecificDisclosureMade(const std::string& disclosure) {
    if (std::find(specificDisclosuresMade.begin(), specificDisclosuresMade.end(), disclosure) == specificDisclosuresMade.end()) {
        specificDisclosuresMade.push_back(disclosure);
    }
    record("SpecificDisclosureMade", disclosure);
}

void LoanSession::reset() {
    amount = 0; fee = 0; tip = 0; termDays = 14; aprCalculated = 0.0; totalRepayment = 0.0; principalRemaining = 0.0;
    feeComponents.clear();
    userName = ""; employer = ""; contact = "";
    monthlyIncome = 0.0; zipCode = ""; isMilitary = false; isExistingCustomer = false; creditScoreCategory = 3;
    sessionId = ""; state = "";
    userExpenses.clear(); userScenarioNotes = "";
    rushRating = 0;
    activeLoansWithLender = 0;
    deniedByLimit = false; denialReason = ""; isCABLoanInTX = false; cabFeeCharged = 0.0; charterStateUsed = "";
    aprHiddenInitially = false; countdownTimerValue = 0;
    
    capacityConfirmed_Age = false; capacityConfirmed_SoundMind = false; 
    fullDisclosureProvided = false; disclosureTimestamp = 0;
    quizAttemptsTotal = 0; quizQuestionsCorrect = 0; quizQuestionsTotal = 0; quizPassedOverall = false; 
    quizResponses.clear();
    explicitConsentInput = ""; consentGiven = false; metaConsentCheckPerformed = false; 
    voluntarinessAffirmedByDeclaration = false;
    rescissionOffered = false; rescissionDeadlineText = ""; loanRescinded = false; 
    consentTimestamp = 0; consentTermsHash = ""; 
    kantianReflectionResponse = ""; millianReflectionResponse = ""; millianRolloverJustification = "";
    respectMeterScore = 100.0;
    
    renewalsTaken = 0; renewalCount = 0; 
    installmentPlanOffered = false; installmentPlanAccepted = false;
    totalFeesPaidAcrossAllTerms = 0.0; totalPrincipalPaidAcrossAllTerms = 0.0;
    inOverdraftCycle = false; nsfDebitAttemptsByLender = 0; totalNSFFeesFromLender = 0.0;
    collectionThreatsMade.clear();

    history.clear();
    darkPatternsEncountered.clear(); 
    ethicalSafeguardsApplied.clear();
    userTermRecalls.clear(); 
    generalNoticesShown.clear(); 
    specificDisclosuresMade.clear(); 
    educationalModulesPresented.clear(); 
    userReflectionJournalEntry = ""; 
    userFeedbackSurveyResponse = ""; 
    userJustificationForLoan = "";
    loanCount = 0; 
    freeExtensionUsed = false;
}

int LoanSession::consentScore() const {
    int score = 100;
    // Pillar 1: Capacity
    if (!capacityConfirmed_Age || !capacityConfirmed_SoundMind) { 
        if (consentGiven) score -= 60; 
        else score -=25; 
    }

    // Pillar 2: Disclosure
    if (!fullDisclosureProvided && consentGiven) score -= 70; 
    else if (!fullDisclosureProvided) score -= 40; 
    if (aprHiddenInitially && consentGiven) score -= 20; // Specific penalty for hiding APR

    // Pillar 3: Comprehension
    if (fullDisclosureProvided && consentGiven) { 
        if (quizAttemptsTotal > 0) { 
            if (!quizPassedOverall) score -= 50; 
            else if (quizQuestionsCorrect < quizQuestionsTotal) score -= 30; 
            else if (quizAttemptsTotal > quizQuestionsTotal) score -=20; 
        } else { 
            score -= 40; 
        }
    } else if (fullDisclosureProvided && !consentGiven && quizAttemptsTotal > 0 && !quizPassedOverall) {
        score -= 10; 
    }
    
    // Pillar 4: Voluntariness
    if (metaConsentCheckPerformed && !voluntarinessAffirmedByDeclaration && consentGiven) score -= 45; 
    if (!metaConsentCheckPerformed && consentGiven) score -=20; 

    // Pillar 5: Authorization
    if (consentGiven) {
        if (explicitConsentInput.length() < 60 || explicitConsentInput.find("UNDERSTAND AND VOLUNTARILY CONSENT AND AUTHORIZE") == std::string::npos) score -= 40; 
        if (consentTermsHash.empty()) score -=30; 
    } else if (amount > 0 && !deniedByLimit && !loanRescinded) { 
        score = 0; 
    }

    static const std::map<std::string, int> dark_pattern_penalties_v8_holistic = { 
        {"ExploitMech_1_EndlessRolloverTrap", 45}, {"ExploitMech_2_InterestOnlyAutoRenewal", 45},
        {"ExploitMech_3_HiddenFeesAndLayering", 40}, {"ExploitMech_4_MisleadingCostDisplay", 40},
        {"ExploitMech_4_HiddenAPREarly", 25}, // Specific for hidden APR
        {"ExploitMech_5_OptionalTipsDisguiseInterest", 35}, {"ExploitMech_5_DefaultTipEnabled", 20},
        {"ExploitMech_6_FinePrintConsentObscure", 45}, {"ExploitMech_6_ObscureCancellation", 25},
        {"ExploitMech_6_DataSharingPopupCoercion", 25},
        {"ExploitMech_7_AutoBankDebitOverdraftExploit", 45}, {"ExploitMech_8_MisleadingCollectionThreats", 35},
        {"ExploitMech_9_MisleadingTestimonials", 30}, {"ExploitMech_10_PersonalDataExploitation", 45}, 
        {"ExploitMech_11_TargetedMarketingVulnerable", 25}, {"ExploitMech_12_RentABankLoophole", 40},
        {"timePressureIntroCountdownSpecificAggressivePersonalizedUrgentFOMOSocialProofExtreme", 35}, 
        {"superficialConsentHighPressureWithUnconditionalIrrevocableForeverTermsAcknowledgementWaiver", 60}, 
        {"feeStackingWithExtras", 30}, {"feeEscalationOnRollover", 35},
        {"aggressiveCollectionThreatsHyperbolicDetailed", 45},
        {"KantianRespectMeter_Low_ClarityOrVoluntarinessIssueSimulated", 30} 
    };

    for(const auto &p: darkPatternsEncountered){ 
        auto it = dark_pattern_penalties_v8_holistic.find(p); 
        if (it != dark_pattern_penalties_v8_holistic.end()) {
            score -= it->second;
        } else {
            score -= defaultPenalty; 
        }
    }

    // Rewards for ethical safeguards
    if (capacityConfirmed_Age && capacityConfirmed_SoundMind) score = std::min(100, score + 10);
    if (fullDisclosureProvided) score = std::min(100, score + 20);
    if (quizPassedOverall && quizAttemptsTotal > 0 && quizQuestionsCorrect == quizQuestionsTotal) score = std::min(100, score + 20);
    if (voluntarinessAffirmedByDeclaration && metaConsentCheckPerformed) score = std::min(100, score + 15);
    if (consentGiven && explicitConsentInput.length() > 60 && !consentTermsHash.empty()) score = std::min(100, score + 15); 
    if (rescissionOffered && loanRescinded) score = std::min(100, score + 10); 
    else if (rescissionOffered) score = std::min(100, score + 5); 

    for(const auto &es : ethicalSafeguardsApplied) {
        if (es.find("AffordabilityCapApplied") != std::string::npos || es.find("ATR_Detailed") != std::string::npos) score = std::min(100, score + 15); 
        if (es.find("InstallmentPlanAccepted") != std::string::npos) score = std::min(100, score + 10);
        if (es.find("WarnedExcessiveFees_MillianDetailed") != std::string::npos) score = std::min(100, score + 7);
        if (es.find("Kantian") != std::string::npos && es.find("Explained") != std::string::npos) score = std::min(100, score + 5); 
        if (es.find("Rawlsian") != std::string::npos && es.find("Explained") != std::string::npos) score = std::min(100, score + 5);
        if (es.find("Millian") != std::string::npos && es.find("Explained") != std::string::npos) score = std::min(100, score + 5);
        if (es.find("StateSpecificFeeCapsApplied") != std::string::npos) score = std::min(100, score + 7);
        if (es.find("RolloverLimitEnforced_Strict_Compliance") != std::string::npos) score = std::min(100, score + 10); 
        if (es.find("ComplianceAuditSimulator_Passed_Ethical") != std::string::npos) score = std::min(100, score + 5); 
        if (es.find("KantianRespectMeter_High") != std::string::npos) score = std::min(100, score + 10);
    }
    return std::max(0, score);
}

void LoanSession::exportJson(const std::string &file) const {
    std::ofstream o(file);
    o << std::fixed << std::setprecision(2); 
    o << "{\n";
    o << "  \"sessionId\": \""<<sessionId<<"\",\n"; 
    o << "  \"sessionData\": {\n"; 
    o << "    \"userName\": \""<<userName<<"\",\n";
    o << "    \"zipCode\": \""<<zipCode<<"\",\n"; 
    o << "    \"isMilitary\": "<<(isMilitary?"true":"false")<<",\n";
    o << "    \"monthlyIncome\": "<<monthlyIncome<<",\n"; 
    o << "    \"userScenarioNotes\": \""<<userScenarioNotes<<"\",\n"; 
    o << "    \"userExpenses\": {\n"; 
    bool firstExpense = true;
    for(const auto& expense : userExpenses) {
        if (!firstExpense) o << ",\n";
        o << "      \"" << expense.first << "\": " << expense.second;
        firstExpense = false;
    }
    if (!userExpenses.empty()) o << "\n";
    o << "    },\n";
    o << "    \"rushRating\": "<<rushRating<<",\n";
    o << "    \"loanCountThisUser\": "<<loanCount<<",\n"; 
    o << "    \"activeLoansWithLender\": "<<activeLoansWithLender<<",\n";
    o << "    \"isExistingCustomer\": "<<(isExistingCustomer?"true":"false")<<",\n";
    o << "    \"creditScoreCategory\": "<<creditScoreCategory<<" \n";
    o << "  },\n";

    o << "  \"loanTerms\": {\n"; 
    o << "    \"amountFinanced\": "<<amount<<",\n";
    o << "    \"financeChargeCurrentTerm\": "<<fee<<",\n"; 
    o << "    \"cabFeeChargedIfApplicable\": "<<cabFeeCharged<<",\n"; 
    o << "    \"aprCalculatedAndDisclosed\": "<<aprCalculated<<",\n"; 
    o << "    \"totalOfPaymentsCurrentTerm\": "<<totalRepayment<<",\n"; 
    o << "    \"termDaysCurrentPeriod\": "<<termDays<<",\n"; 
    o << "    \"tipPaid\": "<<tip<<",\n";
    o << "    \"feeComponents\": [\n"; 
    for(size_t i=0; i<feeComponents.size(); ++i) {
        o << "      {\"" << feeComponents[i].first << "\": " << feeComponents[i].second << "}";
        if (i < feeComponents.size() - 1) o << ",\n"; else o << "\n";
    }
    o << "    ]\n";
    o << "  },\n";

    o << "  \"loanLifecycle\": {\n"; 
    o << "    \"deniedByLimitOrChecks\": "<<(deniedByLimit?"true":"false")<<",\n"; 
    o << "    \"denialReason\": \""<<denialReason<<"\",\n"; 
    o << "    \"isCABLoanInTX\": "<<(isCABLoanInTX?"true":"false")<<",\n";
    o << "    \"charterStateUsedForRentABank\": \""<<charterStateUsed<<"\",\n"; 
    o << "    \"aprHiddenInitially\": "<<(aprHiddenInitially?"true":"false")<<",\n"; // New
    o << "    \"countdownTimerValueAtDecision\": "<<countdownTimerValue<<",\n"; // New
    o << "    \"renewalsTaken\": "<<renewalsTaken<<",\n";
    o << "    \"renewalCountField\": "<<renewalCount<<",\n"; 
    o << "    \"totalFeesPaidAcrossAllTerms\": "<<totalFeesPaidAcrossAllTerms<<",\n"; 
    o << "    \"totalPrincipalPaidAcrossAllTerms\": "<<totalPrincipalPaidAcrossAllTerms<<",\n"; 
    o << "    \"principalRemainingOnOpenLoan\": "<<principalRemaining<<",\n"; 
    o << "    \"freeExtensionUsed\": "<<(freeExtensionUsed?"true":"false")<<",\n";
    o << "    \"installmentPlanOffered\": "<<(installmentPlanOffered?"true":"false")<<",\n";
    o << "    \"installmentPlanAccepted\": "<<(installmentPlanAccepted?"true":"false")<<",\n";
    o << "    \"inOverdraftCycle\": "<<(inOverdraftCycle?"true":"false")<<",\n"; 
    o << "    \"nsfDebitAttemptsByLender\": "<<nsfDebitAttemptsByLender<<",\n"; 
    o << "    \"totalNSFFeesFromLender\": "<<totalNSFFeesFromLender<<",\n";
    o << "    \"collectionThreatsMade\": ["; 
    for(size_t i=0; i<collectionThreatsMade.size(); ++i) {
        o << "\"" << collectionThreatsMade[i] << "\"";
        if (i < collectionThreatsMade.size() - 1) o << ", ";
    }
    o << "]\n";
    o << "  },\n";

    o << "  \"informedConsentDetails\": {\n"; 
    o << "    \"capacityConfirmed_Age\": "<<(capacityConfirmed_Age?"true":"false")<<",\n";
    o << "    \"capacityConfirmed_SoundMind\": "<<(capacityConfirmed_SoundMind?"true":"false")<<",\n";
    o << "    \"fullDisclosureProvidedTimestamp\": "<<disclosureTimestamp<<",\n";
    o << "    \"quizAttemptsTotal\": "<<quizAttemptsTotal<<",\n";
    o << "    \"quizQuestionsCorrect\": "<<quizQuestionsCorrect<<",\n";
    o << "    \"quizQuestionsTotal\": "<<quizQuestionsTotal<<",\n";
    o << "    \"quizPassedOverall\": "<<(quizPassedOverall?"true":"false")<<",\n";
    o << "    \"quizResponses\": [\n"; 
    for(size_t i=0; i<quizResponses.size(); ++i) {
        o << "      {\"question\": \"" << quizResponses[i].first << "\", \"correct\": " << (quizResponses[i].second ? "true" : "false") << "}";
        if (i < quizResponses.size() - 1) o << ",\n"; else o << "\n";
    }
    o << "    ],\n";
    o << "    \"explicitConsentInput\": \""<<explicitConsentInput<<"\",\n"; 
    o << "    \"consentGiven\": "<<(consentGiven?"true":"false")<<",\n";
    o << "    \"metaConsentCheckPerformed\": "<<(metaConsentCheckPerformed?"true":"false")<<",\n";
    o << "    \"voluntarinessAffirmedByDeclaration\": "<<(voluntarinessAffirmedByDeclaration?"true":"false")<<",\n";
    o << "    \"consentTimestamp\": "<<consentTimestamp<<",\n"; 
    o << "    \"consentTermsHash\": \""<<consentTermsHash<<"\",\n"; 
    o << "    \"rescissionOffered\": "<<(rescissionOffered?"true":"false")<<",\n"; 
    o << "    \"rescissionDeadlineTextProvided\": \""<<rescissionDeadlineText<<"\",\n"; 
    o << "    \"loanRescinded\": "<<(loanRescinded?"true":"false")<<"\n"; 
    o << "  },\n";
    
    o << "  \"analysisAndLogs\": {\n"; 
    o << "    \"consentScore\": "<<consentScore()<<",\n";
    o << "    \"respectMeterScore_Kantian\": "<<respectMeterScore<<",\n"; 
    o << "    \"manipulationIndex\": "<<manipulationIndex()<<",\n";
    o << "    \"darkPatternsEncountered\": ["; 
    for(size_t i=0;i<darkPatternsEncountered.size();++i){ 
        o << '\"'<<darkPatternsEncountered[i]<<'\"'; 
        if(i+1<darkPatternsEncountered.size()) o << ','; 
    }
    o << "],\n    \"ethicalSafeguardsApplied\": [";
    for(size_t i=0;i<ethicalSafeguardsApplied.size();++i){
        o << '\"'<<ethicalSafeguardsApplied[i]<<'\"';
        if(i+1<ethicalSafeguardsApplied.size()) o << ',';
    }
    o << "],\n    \"educationalModulesPresented\": ["; 
    for(size_t i=0;i<educationalModulesPresented.size();++i){ 
        o << '\"'<<educationalModulesPresented[i]<<'\"'; 
        if(i+1<educationalModulesPresented.size()) o << ','; 
    }
    o << "],\n    \"specificDisclosuresMade\": ["; 
    for(size_t i=0;i<specificDisclosuresMade.size();++i){ 
        o << '\"'<<specificDisclosuresMade[i]<<'\"'; 
        if(i+1<specificDisclosuresMade.size()) o << ','; 
    }
    o << "],\n    \"userTermRecalls\": [";  
    for(size_t i=0;i<userTermRecalls.size();++i){ 
        o << '\"'<<userTermRecalls[i]<<'\"'; 
        if(i+1<userTermRecalls.size()) o << ','; 
    }
    o << "],\n    \"userReflectionJournalEntry\": \""<<userReflectionJournalEntry<<"\",\n"; 
    o << "    \"userFeedbackSurveyResponse\": \""<<userFeedbackSurveyResponse<<"\",\n"; 
    o << "    \"userJustificationForLoan_Habermas\": \""<<userJustificationForLoan<<"\",\n"; 
    o << "    \"kantianReflectionResponse\": \""<<kantianReflectionResponse<<"\",\n"; 
    o << "    \"millianReflectionResponse\": \""<<millianReflectionResponse<<"\",\n"; 
    o << "    \"millianRolloverJustification\": \""<<millianRolloverJustification<<"\",\n"; 
    o << "    \"eventHistory\": ["; 
    for(size_t i=0;i<history.size();++i){
        const auto &ev = history[i];
        std::string sanitized_data = ev.data;
        std::replace(sanitized_data.begin(), sanitized_data.end(), '\\', '/'); 
        std::replace(sanitized_data.begin(), sanitized_data.end(), '"', '\''); 
        std::replace(sanitized_data.begin(), sanitized_data.end(), '\n', ' '); 
        o << "{\"type\":\""<<ev.type<<"\",\"data\":\""<<sanitized_data<<"\",\"ts\": "<<ev.timestamp<<"}";
        if(i+1<history.size()) o << ',';
    }
    o << "]\n  }\n"; 
    o << "}\n"; 
    o.close();
}

int LoanSession::loadLoanCount(){
    std::ifstream f("loan_count.txt");
    int n=0; if(f.is_open()) f>>n; return n;
}

void LoanSession::saveLoanCount(int n){
    std::ofstream f("loan_count.txt", std::ios::trunc);
    if(f.is_open()) f<<n;
}
