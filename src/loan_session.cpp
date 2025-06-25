#include "loan_session.h"
#include <map>
#include <algorithm> 
#include <fstream>   
#include <ctime>     
#include <numeric> 

// Define defaultPenalty if not already defined
const int defaultPenalty = 15; // Increased default penalty for uncategorized dark patterns

void LoanSession::record(const std::string &e, const std::string &d){
    std::time_t now = std::time(nullptr);
    history.push_back({e,d,now});
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
    sessionId = ""; 
    userExpenses.clear(); userScenarioNotes = "";
    rushRating = 0;
    activeLoansWithLender = 0;
    deniedByLimit = false; denialReason = ""; isCABLoanInTX = false; cabFeeCharged = 0.0; charterStateUsed = "";
    
    capacityConfirmed_Age = false; capacityConfirmed_SoundMind = false; 
    fullDisclosureProvided = false; disclosureTimestamp = 0;
    quizAttemptsTotal = 0; quizQuestionsCorrect = 0; quizQuestionsTotal = 0; quizPassedOverall = false; 
    quizResponses.clear();
    explicitConsentInput = ""; consentGiven = false; metaConsentCheckPerformed = false; 
    voluntarinessAffirmedByDeclaration = false;
    rescissionOffered = false; rescissionDeadlineText = ""; loanRescinded = false; 
    consentTimestamp = 0; consentTermsHash = ""; 
    kantianReflectionResponse = ""; millianReflectionResponse = ""; millianRolloverJustification = "";
    
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
        if (consentGiven) score -= 60; // Consented without full capacity confirmed is extremely bad
        else score -=20; // Process started without capacity check is already a flaw
    }

    // Pillar 2: Disclosure
    if (!fullDisclosureProvided && consentGiven) score -= 70; // Major violation, increased penalty
    else if (!fullDisclosureProvided) score -= 40; // Disclosure missing even if no consent yet is a major flaw

    // Pillar 3: Comprehension
    if (fullDisclosureProvided && consentGiven) { 
        if (quizAttemptsTotal > 0) { // Quiz was attempted
            if (!quizPassedOverall) score -= 50; // Consented despite failing quiz is extremely bad
            else if (quizQuestionsCorrect < quizQuestionsTotal) score -= 25; // Passed but not perfectly
            else if (quizAttemptsTotal > quizQuestionsTotal) score -=20; // Took more than one full attempt cycle (e.g. 2 tries for 3 Qs = 6 attempts)
        } else { // No quiz attempted, but disclosure was there
            score -= 35; // Significant gap if quiz is a policy but wasn't run
        }
    }
    
    // Pillar 4: Voluntariness
    if (metaConsentCheckPerformed && !voluntarinessAffirmedByDeclaration && consentGiven) score -= 40; // User felt pressured but was pushed/allowed to consent
    if (!metaConsentCheckPerformed && consentGiven) score -=20; // Meta-consent is important for voluntariness

    // Pillar 5: Authorization
    if (consentGiven) {
        // More stringent check on consent phrase length and content
        if (explicitConsentInput.length() < 50 || explicitConsentInput.find("UNDERSTAND AND VOLUNTARILY CONSENT AND AUTHORIZE") == std::string::npos) score -= 35; 
        if (consentTermsHash.empty()) score -=25; // No terms hash for audit is a serious record-keeping failure
    } else if (amount > 0 && !deniedByLimit && !loanRescinded) { // Loan funded without consent flag
        score = 0; // Catastrophic failure of consent
    }

    // Dark Pattern Penalties (ensure this map is comprehensive from Config/Exploit logic)
    static const std::map<std::string, int> dark_pattern_penalties_v6_holistic = { 
        {"ExploitMech_1_EndlessRolloverTrap", 45}, {"ExploitMech_2_InterestOnlyAutoRenewal", 45},
        {"ExploitMech_3_HiddenFeesAndLayering", 40}, {"ExploitMech_4_MisleadingCostDisplay", 40},
        {"ExploitMech_5_OptionalTipsDisguiseInterest", 35}, {"ExploitMech_6_FinePrintConsentObscure", 45}, 
        {"ExploitMech_7_AutoBankDebitOverdraftExploit", 45}, {"ExploitMech_8_MisleadingCollectionThreats", 35},
        {"ExploitMech_9_MisleadingTestimonials", 30}, {"ExploitMech_10_PersonalDataExploitation", 45}, 
        {"ExploitMech_11_TargetedMarketingVulnerable", 25}, {"ExploitMech_12_RentABankLoophole", 40},
        {"timePressureIntroCountdownSpecificAggressivePersonalizedUrgentFOMOSocialProofExtreme", 35}, 
        {"superficialConsentHighPressureWithUnconditionalIrrevocableForeverTermsAcknowledgementWaiver", 60}, // Max penalty
        {"feeStackingWithExtras", 30}, {"feeEscalationOnRollover", 35},
        {"aggressiveCollectionThreatsHyperbolicDetailed", 45},
        {"urgency", 20}, {"fakeConsent", 60}, {"hiddenAPR", 40}, {"autoRolloverOptOutImpossibleDetailed", 40},
        {"misleadingApprovalSpeed_UltraFast", 15}, {"misleadingApprovalRate_NearPerfect", 15},
        {"emotionalAppeal_DesperationExploitation_Intense", 20}, {"AntiBankSentiment_Strong", 10},
        {"KantianRespectMeter_Low_ClarityOrVoluntarinessIssueSimulated", 25} 
    };

    for(const auto &p: darkPatternsEncountered){ 
        auto it = dark_pattern_penalties_v6_holistic.find(p); 
        if (it != dark_pattern_penalties_v6_holistic.end()) {
            score -= it->second;
        } else {
            score -= defaultPenalty; 
        }
    }

    // Rewards for ethical safeguards (more granular and impactful)
    if (capacityConfirmed_Age && capacityConfirmed_SoundMind) score = std::min(100, score + 10);
    if (fullDisclosureProvided) score = std::min(100, score + 20);
    if (quizPassedOverall && quizAttemptsTotal > 0 && quizQuestionsCorrect == quizQuestionsTotal) score = std::min(100, score + 20);
    if (voluntarinessAffirmedByDeclaration && metaConsentCheckPerformed) score = std::min(100, score + 15);
    if (consentGiven && explicitConsentInput.length() > 50 && !consentTermsHash.empty()) score = std::min(100, score + 15); // Stricter phrase length
    if (rescissionOffered && loanRescinded) score = std::min(100, score + 10); 
    else if (rescissionOffered) score = std::min(100, score + 5); 

    for(const auto &es : ethicalSafeguardsApplied) {
        if (es.find("AffordabilityCapApplied") != std::string::npos || es.find("ATR_Detailed") != std::string::npos) score = std::min(100, score + 15); // Higher reward for ATR
        if (es.find("InstallmentPlanAccepted") != std::string::npos) score = std::min(100, score + 10);
        if (es.find("WarnedExcessiveFees_MillianDetailed") != std::string::npos) score = std::min(100, score + 7);
        if (es.find("Kantian") != std::string::npos && es.find("Explained") != std::string::npos) score = std::min(100, score + 5); // Higher for lectures
        if (es.find("Rawlsian") != std::string::npos && es.find("Explained") != std::string::npos) score = std::min(100, score + 5);
        if (es.find("Millian") != std::string::npos && es.find("Explained") != std::string::npos) score = std::min(100, score + 5);
        if (es.find("StateSpecificFeeCapsApplied") != std::string::npos) score = std::min(100, score + 7);
        if (es.find("RolloverLimitEnforced_Strict") != std::string::npos) score = std::min(100, score + 10); // Strict rollover enforcement
        if (es.find("ComplianceAuditSimulator_Passed") != std::string::npos) score = std::min(100, score + 5); // Passed simulated audit
    }
    return std::max(0, score);
}

void LoanSession::exportJson(const std::string &file) const {
    std::ofstream o(file);
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
        o << "{\"type\":\""<<ev.type<<"\",\"data\":\""<<ev.data<<"\",\"ts\": "<<ev.timestamp<<"}";
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
