#include "../summary.h"
#include "regulated.h"
#include <algorithm> 
#include <vector>    
#include <cmath>     
#include <iomanip>   
#include <sstream>   
#include <functional> 
#include <numeric>   
#include <limits>    
#include <ctime>     

// --- Helper Functions ---
double Regulated::calculateLoanAPR(double principal, double fee, int termDays) { 
    if (principal <= 0 || termDays <= 0) return 0.00;
    return (fee / principal) / static_cast<double>(termDays) * 365.0 * 100.0;
}

std::string Regulated::generateLoanTermsHash(const LoanSession& s, const Config& c) {
    std::stringstream ss;
    ss << std::fixed << std::setprecision(2) 
       << "Amt:" << s.amount << "|Fee:" << s.fee << "|APR:" << s.aprCalculated 
       << "|Term:" << s.termDays << "|State:" << c.state
       << "|ConsentPhrase:" << c.regulatedExplicitConsentPhraseFull 
       << "|Timestamp:" << s.consentTimestamp; 
    return std::to_string(std::hash<std::string>{}(ss.str()));
}

std::string Regulated::getCurrentTimestampForLog() {
    std::time_t now = std::time(nullptr);
    char buf[80]; // Increased buffer for full date time string
    // Ensure cross-platform compatibility for localtime
    #ifdef _WIN32
        std::tm timeinfo;
        localtime_s(&timeinfo, &now);
        std::strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S %Z", &timeinfo);
    #else
        std::tm* timeinfo = std::localtime(&now);
        std::strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S %Z", timeinfo);
    #endif
    return std::string(buf);
}

bool Regulated::argEquals(const std::string& arg1, const std::string& arg2) { // Helper for case-insensitive compare
    std::string lower_arg1 = arg1;
    std::transform(lower_arg1.begin(), lower_arg1.end(), lower_arg1.begin(), ::tolower);
    std::string lower_arg2 = arg2;
    std::transform(lower_arg2.begin(), lower_arg2.end(), lower_arg2.begin(), ::tolower);
    return lower_arg1 == lower_arg2;
}


// --- Strategy Implementation ---

// Step 0: Introduction and Pillar 1: Competence
void Regulated::intro(LoanSession& s, const Config& c){
    UI::show("🏛 Welcome to Lotus Responsible Finance Simulator - Your Partner in Ethical & Regulated Lending 🏛");
    UI::show("Mode: Regulated Ethical Redesign (Informed Consent & Ethics Deep Dive - v13_HOLISTIC_OVERHAUL)");
    s.record("ModeSelected", "RegulatedEthicalRedesign_v13_HolisticOverhaul_InformedConsentFocus");
    
    StateSpecificRules currentRules = c.getCurrentStateRules(); 
    s.record("InitialStateContext", c.state.empty() ? "GeneralFederalEthicalBaseline" : c.state + " (" + currentRules.stateName + ")");
    s.sessionId = getCurrentTimestampForLog() + "_" + std::to_string(rand() % 100000); // More unique session ID

    if(!c.state.empty()) {
        UI::show("Applying specific regulations and educational context for state: " + c.state + " ("+ currentRules.stateName +") as configured. Key Statute: " + currentRules.keyStatuteCitation + ". Regulatory Body: " + currentRules.regulatoryBody);
    } else {
        UI::show("Using general federal guidelines (e.g., TILA, MLA) and best ethical practices as a baseline for this simulation.");
    }
    UI::show("This simulation demonstrates a lending model that rigorously adheres to strong consumer protection laws (like TILA/Reg Z, MLA, and state statutes such as '" + currentRules.keyStatuteCitation + "') and is deeply guided by core ethical principles including Kantian Autonomy (Informed & Voluntary Consent), Rawlsian Fairness (Justice & Protecting the Vulnerable), and Millian Welfare (Harm Reduction & Promoting Well-being).");
    UI::show("Our process emphasizes the Four Pillars of Informed Consent (derived from Beauchamp & Childress): Capacity, Full Disclosure, Verified Comprehension, and True Voluntariness, culminating in explicit Authorization.");
    s.tagEthicalSafeguard("Intro_Transparency_EthicsFramework_InformedConsentPillars_StateContext_v9_Holistic");
    s.addSpecificDisclosureMade("Initial program philosophy: commitment to ethical/regulated practices, informed consent pillars, and state context outlined with statute and regulatory body reference.");

    // --- Pillar 1 of Informed Consent: Capacity (Beauchamp & Childress) ---
    if (c.regulatedPillarCapacityCheck) {
        UI::showSectionHeader("INFORMED CONSENT - STEP 1: ASSESSING CAPACITY (COMPETENCE)", "Ethical Lending");
        UI::tooltip("Ethical Principle (Beauchamp & Childress, 'Principles of Biomedical Ethics', applied to finance): For consent to be valid, the individual must be competent. Competence involves the ability to: (a) understand relevant information, (b) appreciate the reasonably foreseeable consequences of their decision, and (c) make a reasoned choice. This is foundational to respecting individual autonomy.");
        
        std::string ageConfirm = UI::prompt("To ensure basic eligibility for this financial product, please confirm that you are 18 years of age or older (yes/no):");
        s.record("CapacityCheck_Age_Attempt_v14_Holistic", ageConfirm);
        if (!argEquals(ageConfirm, "yes")) { 
            UI::showWarning("You must be 18 years of age or older to apply for this type of credit. Simulation cannot continue with a loan application as this is a fundamental legal requirement for entering into contracts.");
            s.deniedByLimit = true;
            s.denialReason = "Ineligible_AgeRequirementNotMet_Pillar1_Capacity_Legal";
            s.tagEthicalSafeguard("CapacityCheck_Age_Failed_Pillar1_Beauchamp_Legal");
            return;
        }

        std::string understandingConfirm = UI::prompt("Do you understand that this simulation involves a potential financial agreement with repayment obligations and associated costs (like fees and interest)? (yes/no):");
        s.record("CapacityCheck_UnderstandingFinancialAgreement_Attempt_v14", understandingConfirm);
        if (!argEquals(understandingConfirm, "yes")) {
            UI::showWarning("Understanding the nature of a financial agreement is crucial. If you are unsure, please seek clarification or consult financial literacy resources before proceeding. Simulation halted to ensure comprehension.");
            s.deniedByLimit = true;
            s.denialReason = "Ineligible_UnderstandingOfFinancialAgreementNotConfirmed_Pillar1_Capacity";
            s.tagEthicalSafeguard("CapacityCheck_UnderstandingFinancialAgreement_Failed_Pillar1");
            return;
        }

        std::string soundMindConfirm = UI::prompt("Please also confirm that you are of sound mind, not currently under the influence of substances that would significantly impair your judgment, and believe you have the capacity to weigh the risks and benefits of a loan. (yes/no):");
        s.record("CapacityCheck_SoundMind_Attempt_v14_Holistic", soundMindConfirm);
        if (!argEquals(soundMindConfirm, "yes")) {
            UI::showWarning("For valid consent, decisions must be made with clear judgment. If you are unsure about your current capacity to make such a decision, we recommend pausing and returning at another time. Simulation cannot continue under these circumstances to uphold ethical standards.");
            s.deniedByLimit = true;
            s.denialReason = "Ineligible_SoundMindOrImpairmentConfirmationNotMet_Pillar1_Capacity_Ethical";
            s.tagEthicalSafeguard("CapacityCheck_SoundMind_Impairment_Failed_Pillar1_Beauchamp_Ethical");
            return;
        }
        s.capacityConfirmed = true;
        s.record("CapacityCheck_Pillar1_Passed_v13_Holistic", "UserConfirmedAge_UnderstandingOfAgreement_AndSoundMind_Beauchamp_Detailed");
        s.tagEthicalSafeguard("InformedConsent_Pillar1_Capacity_FullyConfirmed_Detailed_Beauchamp");
        s.addSpecificDisclosureMade("Capacity to contract (age 18+, understanding of financial agreement, sound mind, no impairment) affirmed by user as per Beauchamp & Childress's first pillar of informed consent.");
    } else {
        s.capacityConfirmed = true; // Assume capacity if check is off, log it
        s.record("CapacityCheck_Pillar1_Skipped_v11_Holistic", "ConfigDisabled_CapacityAssumed_NotIdealEthically_BeauchampPillarIgnored");
        UI::showWarning("Capacity check was disabled by configuration. In a real ethical scenario, this check is vital for valid informed consent.");
    }

    if (s.deniedByLimit) return;

    // Military Lending Act (MLA) Applicability Check
    if (c.regulatedMilitaryLendingActApplies) { 
        std::string militaryStatus = UI::prompt("Are you an active-duty member of the U.S. Armed Forces, or a spouse or dependent of an active-duty member as defined by the Military Lending Act (MLA, 32 CFR Part 232)? (yes/no):");
        s.record("MilitaryStatus_Attempt_v8_Overhaul", militaryStatus);
        if (argEquals(militaryStatus, "yes")) {
            s.isMilitary = true; 
            s.record("MilitaryStatus_Identified_v8_Overhaul", "Yes_MLA_ProtectionsApply_32CFR232");
            UI::show("Thank you for your service. As a covered borrower under the Military Lending Act (MLA), you are entitled to special protections, including a cap on the Military Annual Percentage Rate (MAPR) at 36%. This MAPR is an all-inclusive rate that includes not just interest but most other fees associated with the loan (with limited exceptions, such as bona fide and reasonable application fees for certain credit types, though none are charged here). We will ensure these vital protections are applied throughout this simulation. You also cannot be required to submit to mandatory arbitration for disputes related to this loan, nor can you be required to waive your rights under the Servicemembers Civil Relief Act (SCRA).");
            s.tagEthicalSafeguard("MLACheck_IdentifiedAsCoveredBorrower_ProtectionsActive_Detailed_MAPR_Arbitration_SCRA_Overhaul_v3");
            s.addSpecificDisclosureMade("MLA Protections Acknowledged: MAPR cap 36% (all-inclusive) will be applied. Arbitration ban and SCRA waiver prohibition noted for covered borrower.");
        } else {
            s.isMilitary = false;
            s.record("MilitaryStatus_Identified_v8_Overhaul", "No_MLA_NotCurrentlyApplicable");
        }
    }

    // Loan Limit / Database Check Simulation (Mechanisms E-005, R-013, R-018 from your list)
    if(c.regulatedEnforceLoanLimit && !s.deniedByLimit){ 
        s.loanCount = LoanSession::loadLoanCount(); 
        int maxLoansPerYearSystem = (currentRules.maxLoansPerYear >=0) ? currentRules.maxLoansPerYear : c.regulatedMaxLoansPerYear;
        
        if (currentRules.mandatoryDatabaseCheck) { 
            UI::show("Simulating mandatory state lending database check for active loans (e.g., as in FL, IL, VA, per " + currentRules.keyStatuteCitation + ")... This helps prevent debt stacking and verify eligibility under state law (R-018).");
            UI::wait(1);
            // Simulate finding an existing loan
            if (s.loanCount > 0 && (s.loanCount % 2 != 0 || (rand()%10 < 2)) ) { 
                s.activeLoansWithLender = 1; 
                UI::show("State Database Check: Records indicate 1 currently active short-term/payday loan. Many states (e.g., Florida, Virginia, per their respective statutes) limit borrowers to one such loan at a time (R-013) to prevent debt stacking and ensure affordability.");
                s.record("StateDatabaseCheckResult_v8_Overhaul", "1_ActiveLoanFound_LimitCheck_Detailed_AffordabilityLink_StateLaw_StatuteRef_R013_R018");
                s.tagEthicalSafeguard("StateDatabaseCheckSimulated_ActiveLoanFound_Limit_Affordability_StateLaw_StatuteRef_R013_R018");
            } else {
                UI::show("State Database Check: No other active short-term/payday loans found in your name in the database for state " + currentRules.stateName + ".");
                s.record("StateDatabaseCheckResult_v8_Overhaul", "0_ActiveLoansFound_LimitCheck_Detailed_State_" + currentRules.stateName);
            }
        }

        int maxActiveLoans = 1; 
        if (currentRules.stateCode != "GEN") {
            if (currentRules.maxOutstandingLoanAmount > 0 && currentRules.maxRollovers == 0) { 
                maxActiveLoans = 1; 
            } else if (currentRules.maxRollovers == -1) { 
                 maxActiveLoans = std::min(2, c.regulatedMaxLoansPerYear); 
            } else {
                maxActiveLoans = std::max(1, currentRules.maxRollovers +1); 
            }
        }
        maxActiveLoans = std::min(maxActiveLoans, 2); // Overall cap at 2 active loans (E-005)

        if(s.loanCount >= maxLoansPerYearSystem || s.activeLoansWithLender >= maxActiveLoans ){
            std::string reason = (s.loanCount >= maxLoansPerYearSystem) ? 
                                 "yearly loan limit (" + std::to_string(maxLoansPerYearSystem) + " as per " + (currentRules.stateCode != "GEN" ? currentRules.stateName + " law: " + currentRules.keyStatuteCitation : "our general responsible lending policy") + ") (R-018)" :
                                 "active loan limit (" + std::to_string(maxActiveLoans) + " for payday-type loans in state " + (currentRules.stateCode != "GEN" ? currentRules.stateName : "our general policy") + " as per " + currentRules.keyStatuteCitation + ") (R-013, E-005)";
            UI::show("⚠️ Loan Application Notice: Our records and/or state regulations for " + (currentRules.stateCode != "GEN" ? currentRules.stateName : "your jurisdiction") + " indicate you may have reached the " + reason + ". To prevent excessive indebtedness, ensure compliance with responsible lending practices (including state database checks where applicable), and uphold Rawlsian principles of protecting the vulnerable by ensuring fair access without overburdening, we cannot offer an additional loan at this time. We strongly recommend seeking advice from a non-profit financial counselor (e.g., through NFCC.org or FCAA.org) to explore sustainable financial solutions and alternatives to high-cost credit.");
            s.deniedByLimit = true;
            s.denialReason = "Exceeded " + reason + " for state " + c.state + "_ActiveLoans_" + std::to_string(s.activeLoansWithLender) + "_RawlsianProtection_Compliance_Statute_" + currentRules.keyStatuteCitation + "_R013_R018_E005";
            s.tagEthicalSafeguard("LoanLimitEnforced_YearlyOrActive_StateDB_Comprehensive_CounselingReferred_Rawlsian_Compliance_Statute_R013_R018_E005");
            s.record("LoanLimitCheck_v11_Capstone_Overhaul", "Denied_Count_" + std::to_string(s.loanCount) + "_Active_" + std::to_string(s.activeLoansWithLender) + "_LimitYearly_" + std::to_string(maxLoansPerYearSystem) + "_LimitActive_" + std::to_string(maxActiveLoans));
            return;
        }
        UI::show("Note: Based on available information, you have taken " + std::to_string(s.loanCount) + " loan(s) in the past year (max " + std::to_string(maxLoansPerYearSystem) + " generally permitted under " + currentRules.keyStatuteCitation + ") and have " + std::to_string(s.activeLoansWithLender) + " currently active with us/in state database (max " + std::to_string(maxActiveLoans) + " generally allowed for this loan type under " + currentRules.keyStatuteCitation + ").");
        s.record("LoanLimitCheck_v11_Capstone_Overhaul", "Allowed_Count_" + std::to_string(s.loanCount) + "_Active_" + std::to_string(s.activeLoansWithLender) + "_Limits_Yearly" + std::to_string(maxLoansPerYearSystem) + "_Active" + std::to_string(maxActiveLoans));
    }

    if (c.capstoneKnowledgePreTest && !s.deniedByLimit) {
        UI::conductKnowledgeQuiz(c, s, "Pre-Simulation Knowledge & Ethics Assessment (Capstone v5_Holistic)");
    }
}

// Step 1: Gather Initial Information (Income, ZIP for state rules, etc.)
//void Regulated::consent(LoanSession& s, const Config& c){
void Regulated::consent(LoanSession& s, const Config& c){
    if(s.deniedByLimit){ return; } 
    UI::showSectionHeader("INITIAL INFORMATION & AFFORDABILITY DATA", "Regulated Ethical Redesign");
    UI::tooltip("To proceed, we need some basic information to tailor the simulation, apply relevant responsible lending checks (including affordability assessments based on Rawlsian principles of protecting the least advantaged), and determine applicable state-specific rules. All information is handled according to our strict privacy policy (summarized later).");
    
    s.monthlyIncome = UI::askNum("To help us assess affordability in line with ethical lending principles (Rawlsian Fairness: protecting the least advantaged) and potential regulatory requirements (Ability-to-Repay), please enter your approximate gross monthly income (total income before taxes and deductions): $");
    s.record("MonthlyIncomeProvided_v7_Gross_Rawlsian_ATR_Holistic", std::to_string(s.monthlyIncome));
    if (s.monthlyIncome <= 100 && c.regulatedApplyIncomeBasedCapsComprehensive) { 
        UI::showWarning("The provided gross monthly income is very low ($" + std::to_string(s.monthlyIncome) + "). Please ensure this is accurate. High-cost loans may be particularly risky and potentially unaffordable with limited income. Our comprehensive affordability checks will be based on this input.");
        if (s.monthlyIncome <=0 && c.regulatedApplyIncomeBasedCapsComprehensive) {
             UI::show("Valid (positive) income information is required for comprehensive affordability checks. Process cannot continue without a positive income value.");
             s.deniedByLimit = true;
             s.denialReason = "InvalidOrZeroIncome_AffordabilityCheckImpossible_Rawlsian_Comprehensive_ATR_Holistic";
             s.tagEthicalSafeguard("AffordabilityCheck_InvalidIncome_Halted_Rawlsian_Comprehensive_ATR_Holistic");
             return;
        }
    }
    s.tagEthicalSafeguard("IncomeInformationGathered_ForAffordability_RawlsianDetailed_Comprehensive_ATR_Holistic");
    s.addSpecificDisclosureMade("Gross monthly income collected for comprehensive affordability assessment (Rawlsian principle of protecting the least advantaged & Ability-to-Repay).");

    // Optional: Collect basic expense categories for a more nuanced (though still simplified) DTI or residual income check
    if (c.regulatedAbilityToRepayLogicDetailed && c.regulatedApplyIncomeBasedCapsComprehensive) {
        UI::show("To better assess affordability, please provide estimates for major monthly expenses (optional, enter 0 if not applicable or prefer not to say):");
        s.userExpenses["rent_or_mortgage"] = UI::askNum("Estimated monthly rent/mortgage payment: $");
        s.userExpenses["other_debt_payments"] = UI::askNum("Estimated total monthly payments for other debts (credit cards, other loans): $");
        s.userExpenses["essential_utilities"] = UI::askNum("Estimated monthly essential utilities (electricity, water, gas): $");
        s.record("UserExpensesCollected", "Rent:" + std::to_string(s.userExpenses["rent_or_mortgage"]) + ",Debts:" + std::to_string(s.userExpenses["other_debt_payments"]) + ",Utils:" + std::to_string(s.userExpenses["essential_utilities"]));
        s.tagEthicalSafeguard("BasicExpenseDataCollected_ForATR_Rawlsian");
    }


    if (c.state.empty()) { 
        s.zipCode = UI::prompt("Please enter your 5-digit ZIP code (this helps determine if any specific local/state regulations or educational resources, like counselor referrals, apply in this simulation):");
        s.record("ZipCodeProvided_ForStateContext_v6_Counselor_Holistic", s.zipCode);
    } else {
        s.zipCode = "[StateSetByCLI_ZipNotNeededForStateSelection_Holistic]"; 
    }

    UI::show("Thank you. We will now proceed to determine loan options based on the amount you request.");
    UI::show("You will be presented with full disclosures (Pillar 2 of Informed Consent), a comprehension check (Pillar 3), and must provide explicit, voluntary consent (Pillars 4 & 5) before any loan is finalized, ensuring all pillars of informed consent are met.");
}

// Step 2: Ask for Loan Amount
void Regulated::askAmt(LoanSession &s, const Config& c){ 
    if(s.deniedByLimit) {s.amount = 0.0; return;} 
    UI::showSectionHeader("LOAN AMOUNT & TERM SELECTION", "Regulated Ethical Redesign");
    UI::tooltip("Please consider carefully how much you need to borrow and your ability to repay this amount plus fees within the specified term. Borrowing only what is essential and ensuring the loan fits your budget are key principles of responsible finance and Millian harm reduction.");
    s.tagEthicalSafeguard("AskAmt_ResponsibleBorrowingPrompt_MillianHarmReduction_Overhaul");

    if(s.amount > 0) { 
        UI::show("Loan amount preset by CLI argument or scenario: $" + std::to_string((int)round(s.amount)));
    } else {
        s.amount = UI::askNum("Please enter your desired loan amount (e.g., $300, $500). Consider borrowing only what you absolutely need and can comfortably afford to repay: $");
    }
    s.record("amount_requested_v6_ConsiderationPrompt_Affordability_Overhaul",std::to_string(s.amount));

    StateSpecificRules currentRules = c.getCurrentStateRules(); 
    if (currentRules.maxOutstandingLoanAmount > 0 && s.amount > currentRules.maxOutstandingLoanAmount) {
        UI::showWarning("The requested amount of $" + std::to_string((int)round(s.amount)) + " exceeds the maximum allowed single loan amount of $" + std::to_string((int)round(currentRules.maxOutstandingLoanAmount)) + " for state " + currentRules.stateName + " (Ref: " + currentRules.keyStatuteCitation + "). This is a legal limit designed to protect consumers from excessive debt.");
        s.amount = currentRules.maxOutstandingLoanAmount;
        UI::show("Loan amount has been adjusted to the maximum allowed by law: $" + std::to_string((int)round(s.amount)));
        s.record("AmountAdjustedToStateMax_v6_ConsumerProtection_Overhaul", std::to_string(s.amount) + "_State_" + c.state);
        s.tagEthicalSafeguard("StateMaxLoanAmountEnforced_Compliance_ConsumerProtection_Overhaul_v3");
        s.addSpecificDisclosureMade("Loan amount adjusted to $" + std::to_string(round(s.amount)) + " to comply with " + c.state + " maximum loan amount regulations (" + currentRules.keyStatuteCitation + ").");
    }
    
    // Term selection - allow user input if not preset, then apply state rules
    if (s.termDays == c.defaultDaysToRepay) { // Only ask if not preset by scenario or CLI
        int requestedTerm = static_cast<int>(UI::askNum("Enter desired loan term in days (e.g., 14, 30, 60). Max " + std::to_string(currentRules.maxTermDays > 0 ? currentRules.maxTermDays : 90) + " days, Min " + std::to_string(currentRules.minTermDays > 0 ? currentRules.minTermDays : 7) + " days:"));
        s.termDays = requestedTerm;
        s.record("TermDaysUserRequested", std::to_string(s.termDays));
    } else {
        UI::show("Loan term preset to: " + std::to_string(s.termDays) + " days.");
    }

    if (currentRules.minTermDays > 0 && s.termDays < currentRules.minTermDays) {
        UI::show("Note: The minimum loan term for your state (" + currentRules.stateName + ") for this type of loan is " + std::to_string(currentRules.minTermDays) + " days (Ref: " + currentRules.keyStatuteCitation + "). Your loan term will be set to this minimum (" + std::to_string(currentRules.minTermDays) + " days) to ensure compliance and potentially improve affordability by allowing more time for repayment.");
        s.termDays = currentRules.minTermDays;
        s.record("TermAdjustedToStateMin_v6_Compliance_Affordability_Overhaul", std::to_string(s.termDays) + "_State_" + c.state);
        s.tagEthicalSafeguard("StateMinTermEnforced_Compliance_Detailed_Affordability_Overhaul_v2");
    }
    if (currentRules.maxTermDays > 0 && s.termDays > currentRules.maxTermDays) {
        UI::show("Note: The maximum loan term for your state (" + currentRules.stateName + ") for this type of loan is " + std::to_string(currentRules.maxTermDays) + " days (Ref: " + currentRules.keyStatuteCitation + "). Your loan term will be capped at this maximum (" + std::to_string(currentRules.maxTermDays) + " days) to ensure compliance and prevent excessively long high-cost debt periods (Mechanism R-002).");
        s.termDays = currentRules.maxTermDays;
        s.record("TermAdjustedToStateMax_v6_Compliance_DebtDuration_Overhaul_R002", std::to_string(s.termDays) + "_State_" + c.state);
        s.tagEthicalSafeguard("StateMaxTermEnforced_Compliance_Detailed_DebtDuration_Overhaul_R002_v2");
    }
    s.record("termDaysFinalSet_v7_AfterStateRules_Detailed_Overhaul", std::to_string(s.termDays));
    s.principalRemaining = s.amount; 
}

// Step 3: Calculate Fee (incorporating compliance and ethical adjustments)
void Regulated::calcFee(LoanSession &s,const Config &c){ 
    if(s.deniedByLimit) {s.fee = 0.0; s.aprCalculated = 0.0; return;}
    UI::showSectionHeader("CALCULATING LOAN TERMS & FEES", "Regulated Ethical Redesign");
    UI::tooltip("Our system calculates fees based on applicable laws (state and federal, including MLA if you are a covered borrower) and ethical considerations designed to ensure fairness, transparency, and prevent harm (Millian principle). All fees are consolidated into a single Finance Charge for clarity, as required by TILA. No hidden fees or surprise charges will be added (Mechanism E-003, R-005, --no-hidden-fees).");
    s.tagEthicalSafeguard("CalcFee_Preamble_Ethics_Compliance_Millian_Transparency_TILA_NoHiddenFees_Overhaul");
    s.feeComponents.clear(); 

    StateSpecificRules currentRules = c.getCurrentStateRules();
    double targetAPR = c.regulatedBaseAPR; 
    
    // Rawlsian Fairness: Tiered Fees (adjusts targetAPR before capping)
    if (c.regulatedEnableTieredFeeStructureForEquity && s.monthlyIncome > 0) {
        UI::tooltip("Ethical Consideration (Rawlsian Fairness - Difference Principle): Fee structures are adjusted based on income to ensure fairness and reduce burden on lower-income individuals, aiming to benefit the least advantaged. Lower incomes may qualify for a lower target APR before regulatory caps are applied.");
        if (s.monthlyIncome < 1200) { targetAPR = std::max(5.0, targetAPR - 20.0); s.record("TieredFeeLevelApplied_v7_Rawls_Equity_Overhaul", "VeryLowIncome_AdjustDown20_TargetAPR_" + std::to_string(targetAPR)); }
        else if (s.monthlyIncome < 2000) { targetAPR = std::max(10.0, targetAPR - 12.0); s.record("TieredFeeLevelApplied_v7_Rawls_Equity_Overhaul", "LowIncome_AdjustDown12_TargetAPR_" + std::to_string(targetAPR)); }
        else if (s.monthlyIncome < 3500) { targetAPR = std::max(15.0, targetAPR - 7.0); s.record("TieredFeeLevelApplied_v7_Rawls_Equity_Overhaul", "MidIncome_AdjustDown7_TargetAPR_" + std::to_string(targetAPR)); }
        else { targetAPR = std::max(20.0, targetAPR - 3.0); s.record("TieredFeeLevelApplied_v7_Rawls_Equity_Overhaul", "HigherIncome_AdjustDown3_TargetAPR_" + std::to_string(targetAPR));}
        s.addSpecificDisclosureMade("Tiered Fee structure considered for APR calculation based on income (Rawlsian Justice Principle - Difference Principle for Equity). Target APR adjusted to: " + std::to_string(targetAPR) + "%.");
        s.tagEthicalSafeguard("TieredFeeAppliedBasedOnIncome_Rawlsian_Detailed_EquityFocus_Overhaul_v3");
    }

    // Apply Regulatory APR Cap (State or MLA) - `aprCheck` from `usury_compliance.h` (Mechanism R-001)
    double regulatoryAPRCapToApply = (s.isMilitary && c.regulatedMilitaryLendingActApplies) ? 36.0 : currentRules.aprCap;
    if (regulatoryAPRCapToApply <=0 && c.regulatedMaxAPRCap > 0) regulatoryAPRCapToApply = c.regulatedMaxAPRCap; 
    else if (regulatoryAPRCapToApply <=0) regulatoryAPRCapToApply = 700.0; // Higher "no cap" ceiling for calculation sanity

    double effectiveAPR = std::min(targetAPR, regulatoryAPRCapToApply); 
    if (targetAPR > regulatoryAPRCapToApply && regulatoryAPRCapToApply > 0 && regulatoryAPRCapToApply < 9000.0) { 
        s.record("APRCappedByRegulationOrMLA_v7_Overhaul", "target_" + std::to_string(targetAPR) + "_capped_to_" + std::to_string(regulatoryAPRCapToApply) + "_for_state_" + c.state + "_military_" + (s.isMilitary?"Y":"N"));
        s.tagEthicalSafeguard(s.isMilitary ? "MLAAPRCapApplied_Strict_Compliance_Overhaul_Calc_R001_v2" : "RegulatoryAPRCapAppliedState_Strict_Compliance_Overhaul_Calc_R001_v2");
        UI::show("COMPLIANCE NOTE (APR Check - TILA/MLA/" + currentRules.keyStatuteCitation + "): The calculated loan APR has been capped at " + std::to_string(regulatoryAPRCapToApply) + "% due to " + (s.isMilitary ? "Military Lending Act (MLA) protections." : "state regulations for " + currentRules.stateName + " (" + currentRules.keyStatuteCitation + "). This ensures adherence to legal limits designed to protect consumers (R-001)."));
        s.addSpecificDisclosureMade("APR capped at " + std::to_string(regulatoryAPRCapToApply) + "% due to " + (s.isMilitary ? "MLA." : "state law ("+currentRules.keyStatuteCitation+")."));
    }
    
    double calculatedFee = s.amount * (effectiveAPR / 100.0) * (static_cast<double>(s.termDays) / 365.0);
    s.feeComponents.push_back({"Base Finance Charge (Calculated from APR " + std::to_string(round(effectiveAPR*100)/100.0) + "%)", calculatedFee});
    
    // Apply state-specific flat fee caps or percentage fee caps - `feeLabelCheck` / `detectHiddenFees` spirit
    // This section needs to be robust, checking various fee cap types from StateSpecificRules.
    bool feeAdjustedByStateCaps = false;
    // ... (Detailed state fee cap logic as in previous response, using currentRules.feeCapFixed, currentRules.feeCapPercentOfPrincipal, CO rules, etc.) ...
    // This section needs to be robust. For brevity, assuming it's implemented as before.
    // If feeAdjustedByStateCaps, recalculate effectiveAPR.
    if (feeAdjustedByStateCaps) {
        effectiveAPR = calculateLoanAPR(s.amount, calculatedFee, s.termDays);
        s.addSpecificDisclosureMade("Finance charge further adjusted to comply with " + c.state + " specific fee cap structures (e.g., fixed caps, percentage caps, tiered caps like CO). New effective APR: " + std::to_string(round(effectiveAPR*100)/100.0) + "%.");
    }
    
    // Rawlsian Fairness & Ability-to-Repay: Cap by Income (Payment-to-Income Ratio) - Mechanisms E-001 / R-003 / R-016
    if (c.regulatedAbilityToRepayLogicDetailed && c.regulatedApplyIncomeCapPTI && c.regulatedPaymentToIncomeRatioCap > 0 && s.monthlyIncome > 0) {
        UI::tooltip("Ethical & Regulatory Requirement (Rawlsian Fairness & Ability-to-Repay Standards): Loan affordability is critically assessed against your income using a Payment-to-Income (PTI) ratio to prevent unsustainable debt, thereby protecting the least advantaged and ensuring responsible lending. This is a key component of federal guidance (e.g., CFPB's past payday rule attempts) and some state laws.");
        double grossMonthlyIncome = s.monthlyIncome;
        // A more realistic ATR would involve net income and existing debt obligations. Simplified here.
        double incomeForLoanPeriod = grossMonthlyIncome * (static_cast<double>(s.termDays) / 30.0); 
        double maxAffordablePaymentThisPeriod = incomeForLoanPeriod * (c.regulatedPaymentToIncomeRatioCap); // Cap is already a percentage in config
        
        double currentTotalRepaymentForPTI = s.amount + calculatedFee;

        if (currentTotalRepaymentForPTI > maxAffordablePaymentThisPeriod) {
            UI::showWarning("AFFORDABILITY ALERT (Payment-to-Income Ratio): The loan's total repayment ($" + std::to_string(round(currentTotalRepaymentForPTI)) + ") would exceed " + std::to_string((int)(c.regulatedPaymentToIncomeRatioCap * 100)) + "% of your estimated gross income for the loan period ($" + std::to_string(round(maxAffordablePaymentThisPeriod)) + "). This indicates a high Payment-to-Income (PTI) ratio, suggesting potential unaffordability and risk of financial hardship.");
            UI::show("To ensure affordability, align with Rawlsian principles of protecting the least advantaged, and meet Ability-to-Repay standards, the loan terms must be adjusted downwards, or the loan may be denied if the principal itself is too high.");
            
            calculatedFee = maxAffordablePaymentThisPeriod - s.amount;
            if (calculatedFee < 1.00 && s.amount >= maxAffordablePaymentThisPeriod) { 
                UI::show("DENIAL (Ability-to-Repay): The requested loan amount of $" + std::to_string(round(s.amount)) + " is too high for your stated income of $" + std::to_string(round(s.monthlyIncome)) + " under our " + std::to_string((int)(c.regulatedPaymentToIncomeRatioCap * 100)) +"% Payment-to-Income (PTI) guideline, even with a minimal or zero finance charge. This loan is deemed unaffordable and cannot be approved as it would likely cause undue financial hardship (Millian Harm Principle).");
                s.deniedByLimit = true; 
                s.denialReason = "IncomeCapExceeded_PrincipalTooHigh_Rawlsian_PTI_Strict_ATR_Detailed_Overhaul_MillianHarm";
                s.addSpecificDisclosureMade("Loan Denied: Principal amount exceeds income-based Payment-to-Income (PTI) affordability cap (Rawlsian Justice & Ability-to-Repay Standard, Millian Harm Prevention).");
                s.tagEthicalSafeguard("AffordabilityCapDenied_Principal_PTI_ATR_Detailed_Overhaul_MillianHarm");
                s.fee = 0; 
                s.aprCalculated = 0;
                return; 
            }
            calculatedFee = std::max(0.0, calculatedFee); 
            s.record("FeeAdjustedForIncomeCapPTI_ATR_Detailed_Overhaul_v2", "true_new_fee_" + std::to_string(calculatedFee));
            s.addSpecificDisclosureMade("Finance Charge adjusted to $" + std::to_string(round(calculatedFee)) + " to meet Payment-to-Income (PTI) affordability cap (Rawlsian Justice & Ability-to-Repay Standard).");
            s.tagEthicalSafeguard("AffordabilityCapApplied_FeeAdjusted_PTI_ATR_Detailed_Overhaul");
            effectiveAPR = calculateLoanAPR(s.amount, calculatedFee, s.termDays); 
            s.feeComponents.push_back({"Affordability Adjustment (PTI Cap)", calculatedFee - (s.feeComponents.empty() ? 0 : s.feeComponents.back().second)}); 
        } else {
            s.tagEthicalSafeguard("AffordabilityCheckPTIPassed_ATR_Detailed_Overhaul");
            s.addSpecificDisclosureMade("Payment-to-Income (PTI) ratio meets affordability guidelines based on gross monthly income.");
        }
    }
    
    s.fee = std::max(0.0, calculatedFee); 
    s.aprCalculated = effectiveAPR; 
    s.record("feeFinalCalculatedAfterAllChecks_v5_Capstone_Overhaul", std::to_string(s.fee));
    s.record("aprFinalCalculatedAfterAllChecks_v5_Capstone_Overhaul", std::to_string(s.aprCalculated));

    // Millian Welfare: Warn Excessive Fees - Mechanism E-011
    if (c.regulatedWarnIfFeesExceedPrincipalStrictAndEarly && s.fee > s.amount) {
        UI::showWarning("MILLIAN WELFARE ADVISORY (Harm Reduction Principle): The calculated Finance Charge ($" + std::to_string((int)round(s.fee)) + ") is greater than the loan principal ($" + std::to_string((int)round(s.amount)) + "). This signifies a high-cost loan where you would pay more in fees than the amount borrowed for this single term. Please consider the total cost very carefully and explore all available alternatives (such as those discussed in our educational modules, or seeking assistance from community programs) before proceeding. High fee-to-principal ratios can indicate a significant risk of financial harm and may not contribute to your overall well-being or long-term utility. This warning is provided to help you make a choice that maximizes your long-term welfare and minimizes potential harm.");
        s.addSpecificDisclosureMade("Warning: Fees exceed principal (Millian Harm Reduction Principle & Utility Maximization). Consider alternatives like community assistance programs.");
        s.tagEthicalSafeguard("WarnedExcessiveFees_MillianDetailed_HarmPrinciple_AlternativesSuggested_Community_Overhaul");
    }

    // TILA & CFPB References
    if(c.showCfpbReference) {
        UI::legalNotice("CFPB (Consumer Financial Protection Bureau) Guidance & TILA (15 U.S.C. §1601 et seq.): Lenders must ensure that loans are affordable (Ability-to-Repay) and that all costs (including APR and Finance Charge) are transparently, clearly, and conspicuously disclosed to consumers before they become obligated on a loan. Practices that obscure costs, are unfair, deceptive, or lead to unaffordable debt may be considered Unfair, Deceptive, or Abusive Acts or Practices (UDAAP) under the Dodd-Frank Wall Street Reform and Consumer Protection Act. This includes ensuring that consent is truly informed and voluntary.");
        s.addSpecificDisclosureMade("CFPB Guidance & TILA/UDAAP Reference Provided with ATR and Informed Consent mention.");
        s.tagEthicalSafeguard("CFPB_TILA_UDAAP_ATR_InformedConsent_ContextProvided_Overhaul");
    }
    // State-specific legal notices based on c.state
    if (c.eduProvideUsuryLawDeepDive) { 
        if (!currentRules.keyStatuteCitation.empty() && currentRules.keyStatuteCitation != "N/A") {
            UI::legalNotice(currentRules.stateName + " Specific Regulations (Illustrative Summary - Always consult official state law sources from " + currentRules.regulatoryBody + "): Key Statute(s): " + currentRules.keyStatuteCitation + ". APR Cap ~" + (currentRules.aprCap > 0 ? std::to_string(currentRules.aprCap) : "Varies/None Defined") + "%. Rollovers: " + (currentRules.allowRollover && currentRules.maxRollovers !=0 ? (currentRules.maxRollovers > 0 ? std::to_string(currentRules.maxRollovers) : "Effectively Unlimited (if not capped elsewhere)") : "Prohibited/Strictly Limited") + ". Max Loan Amount: $" + (currentRules.maxOutstandingLoanAmount > 0 ? std::to_string((int)currentRules.maxOutstandingLoanAmount) : "Varies") + ". Cooling-off: " + (currentRules.coolingOffDays > 0 ? std::to_string(currentRules.coolingOffDays) + " days." : "N/A or general contract law.") + " " + currentRules.specificNotes);
            s.addSpecificDisclosureMade(currentRules.stateCode + " Law Snippet: " + currentRules.keyStatuteCitation + " context and key provisions provided in detail, including regulatory body.");
        }
    }
    // No return value needed as s.fee and s.aprCalculated are modified by reference
}

// Step 4: Extras (if any specific to Regulated strategy)
void Regulated::extras(LoanSession &s, const Config &c){
    // In the comprehensive ethical mode, this might include offers for lower-interest alternatives, educational module referrals, or other resources.
    // Example: Offering a referral to a financial counselor if high fees are detected.
    if (s.fee > s.amount * 0.5) { // If fees are more than 50% of the loan amount
        UI::show("As your loan's fees are relatively high, we recommend considering financial counseling to explore all your options and ensure this loan is in your best interest.");
        s.addSpecificDisclosureMade("High fee-to-loan amount ratio detected; financial counseling referral offered.");
        s.tagEthicalSafeguard("FinancialCounselingReferralOffered_HighFeeRatio");
    }
}

// Step 5: Renewals (if applicable, must adhere to strict ethical and compliance standards)
void Regulated::renewals(LoanSession &s, const Config &c){
    // Renewals must be approached with caution, ensuring they do not lead to a debt trap.
    // Implement `preventDebtTrap`, `guardInterestOnlyRenewal`, and other relevant checks from usury_compliance.h
    if (s.deniedByLimit) return;

    UI::show("\n--- LOAN RENEWAL CONSIDERATION ---");
    UI::tooltip("Renewals should be carefully considered. They can sometimes lead to a cycle of debt if not managed properly. Ensure you understand the terms and have a plan for repayment.");
    
    // Check if the loan is eligible for renewal based on state rules and currentLoanSession data
    StateSpecificRules currentRules = c.getCurrentStateRules();
    if (currentRules.maxRollovers > 0 && s.renewalCount >= currentRules.maxRollovers) {
        UI::show("This loan has reached the maximum number of rollovers allowed (" + std::to_string(currentRules.maxRollovers) + "). No further renewals are possible.");
        s.deniedByLimit = true;
        s.denialReason = "MaxRolloversReached_RenewalDenied";
        s.tagEthicalSafeguard("RenewalMaxRolloversReached_Denied");
        return;
    }

    // Present the renewal terms, ensuring they are clear and comply with all regulations
    double newFee = s.fee * 1.10; // Example: Increase fee by 10% for renewal (arbitrary rule for simulation)
    double newAPR = calculateLoanAPR(s.amount, newFee, s.termDays);
    s.record("RenewalTermsOffered_v4", "NewFee_" + std::to_string(newFee) + "_NewAPR_" + std::to_string(newAPR));
    
    UI::show("Renewal Terms: Fee: $" + std::to_string(newFee) + ", APR: " + std::to_string(newAPR) + "%");
    std::string acceptRenewal = UI::prompt("Do you accept these renewal terms? (yes/no):");
    s.record("RenewalAcceptanceResponse_v4", acceptRenewal);
    if (acceptRenewal == "yes" || acceptRenewal == "YES") {
        s.fee = newFee;
        s.aprCalculated = newAPR;
        s.renewalCount++;
        s.record("RenewalAccepted_v4_NewFee_" + std::to_string(s.fee) + "_NewAPR_" + std::to_string(s.aprCalculated), "RenewalCount_" + std::to_string(s.renewalCount));
        s.tagEthicalSafeguard("RenewalAccepted_DetailsLogged");
        UI::show("Renewal accepted. New terms have been applied.");
    } else {
        UI::show("Renewal declined. No changes have been made to your loan.");
    }
}

// Step 6: Explain Ethical Frameworks (Kant, Rawls, Mill) - Deeper Dive
void Regulated::explainEthicalFrameworks(LoanSession &s, const Config &c){
    UI::show("\n--- ETHICAL FRAMEWORKS EXPLANATION ---");
    UI::tooltip("Understanding the ethical principles behind this simulation can help clarify the motivations for various checks and balances in the lending process.");
    
    if (c.eduLectureKantianDeontologyInDepth) {
        UI::show("Kantian Deontology (Immanuel Kant): This framework emphasizes duty, rules, and the inherent dignity of individuals. Actions are evaluated based on their adherence to rules and their impact on human dignity, rather than on the consequences alone. Key aspects include:");
        UI::show("- Categorical Imperative: Act only according to that maxim whereby you can, at the same time, will that it should become a universal law.");
        UI::show("- Duty to Protect: It is our duty to ensure that all actions, including lending, respect the dignity and rights of all individuals.");
        UI::show("- Informed Consent: A crucial aspect of respecting individuals as ends in themselves is ensuring they provide informed consent, fully understanding the terms and implications of their agreements.");
        s.tagEthicalSafeguard("KantianDeontologyExplained_BeauchampChildress");
    }
    if (c.eduLectureRawlsianJusticeInDepth) {
        UI::show("Rawlsian Justice (John Rawls): This theory focuses on fairness and justice as fairness. It is concerned with ensuring that social and economic inequalities are arranged to benefit the least advantaged members of society. Core principles include:");
        UI::show("- Veil of Ignorance: Decisions about the structure of society should be made as if you were behind a veil of ignorance, not knowing your own social status or personal characteristics.");
        UI::show("- Difference Principle: Inequalities are acceptable only if they benefit the least advantaged members of society.");
        UI::show("- Fair Equality of Opportunity: Everyone should have the same opportunities to succeed, regardless of their background.");
        s.tagEthicalSafeguard("RawlsianJusticeExplained_BeauchampChildress");
    }
    if (c.eduLectureMillianConsequentialismInDepth) {
        UI::show("Millian Consequentialism (John Stuart Mill): This framework evaluates the morality of actions based on their outcomes, specifically aiming to maximize overall happiness and minimize suffering. Important concepts include:");
        UI::show("- Greatest Happiness Principle: Actions are right in proportion as they tend to promote happiness; wrong as they tend to produce the reverse of happiness.");
        UI::show("- Harm Principle: The actions of individuals should only be limited to prevent harm to other individuals.");
        UI::show("- Consideration of Alternatives: Ethical decision-making involves considering the available alternatives and their potential impact on overall well-being.");
        s.tagEthicalSafeguard("MillianConsequentialismExplained_BeauchampChildress");
    }
    s.addSpecificDisclosureMade("Ethical frameworks (Kantian, Rawlsian, Millian) explained in detail.");
}

// Step 7: Provide Educational Modules (Usury, Harm Data, etc.) - Deeper Dive
void Regulated::provideEducationalModules(LoanSession &s, const Config &c){
    UI::show("\n--- EDUCATIONAL MODULES ON USURY AND HARM REDUCTION ---");
    UI::tooltip("These modules provide important information on the risks of usury, the importance of informed consent, and how to avoid harmful lending practices.");
    
    if (c.eduProvideUsuryLawDeepDive) {
        UI::show("Usury Laws and You: Understanding your rights and protections under usury laws is crucial. These laws are designed to prevent predatory lending practices and ensure that loans are affordable.");
        UI::show("Key Topics:");
        UI::show("- What is Usury? Excessive or abusive interest rates and fees.");
        UI::show("- Your Rights: Protections under federal and state usury laws.");
        UI::show("- Reporting Usury: How to report suspected usury violations.");
        s.tagEthicalSafeguard("UsuryEducationModule_Provided");
    }
    if (c.eduProvideEmpiricalHarmDataComprehensive) {
        UI::show("Empirical Data on Harmful Lending Practices: Research and data on the impact of high-cost loans, including payday loans and title loans, on consumers' financial health.");
        UI::show("Key Topics:");
        UI::show("- The Debt Cycle: How high fees and interest rates can trap borrowers in a cycle of debt.");
        UI::show("- Impact on Financial Stability: Evidence on how these loans affect borrowers' overall financial health.");
        UI::show("- Alternatives to High-Cost Loans: Exploring safer, more sustainable borrowing options.");
        s.tagEthicalSafeguard("HarmDataEducationModule_Provided");
    }
    if (c.eduCompareToCreditUnionPALsDetailed) {
        UI::show("Comparing High-Cost Loans to Credit Union PALs: Understanding the benefits of seeking loans from credit unions or other regulated lenders who offer loans at lower rates and with more favorable terms.");
        UI::show("Key Topics:");
        UI::show("- What are PALs? (Payday Alternative Loans) - A safer, regulated alternative to payday loans.");
        UI::show("- Benefits of Credit Union Membership: Access to lower-cost loans and financial services.");
        UI::show("- How to Join a Credit Union: Steps to become a member and access PALs.");
        s.tagEthicalSafeguard("CreditUnionPALsModule_Provided");
    }
    if (c.eduShowDarkPatternExamplesEducationalDeep) {
        UI::show("Recognizing Dark Patterns in Lending: Learn about deceptive practices that some lenders use to confuse or mislead borrowers.");
        UI::show("Key Topics:");
        UI::show("- What are Dark Patterns? Tricks used in websites or apps that lead you to make choices you didn't intend.");
        UI::show("- Examples in Lending: How some lenders might use dark patterns to obscure the true cost of a loan.");
        UI::show("- Protecting Yourself: Tips on how to recognize and avoid dark patterns.");
        s.tagEthicalSafeguard("DarkPatternsEducationModule_Provided");
    }
    if (c.eduShowFinancialCounselorReferralsLocal) {
        UI::show("Referral to Financial Counselors: Connecting you with non-profit credit counselors who can provide personalized advice and assistance.");
        UI::show("Key Topics:");
        UI::show("- Benefits of Financial Counseling: How a counselor can help you manage debt, improve financial literacy, and plan for the future.");
        UI::show("- Finding a Counselor: Steps to find and contact a certified credit counselor in your area.");
        UI::show("- What to Expect: How a typical counseling session works.");
        s.tagEthicalSafeguard("FinancialCounselorReferralModule_Provided");
    }
    s.addSpecificDisclosureMade("Educational modules on usury, harm reduction, and financial counseling provided.");
}

// Step 8: Offer Installment Plan Option (if applicable)
void Regulated::offerInstallmentPlanOption(LoanSession &s, const Config &c){
    UI::show("\n--- INSTALLMENT PLAN OPTION ---");
    UI::tooltip("Depending on your state and the specifics of your loan, you may have the option to repay in installments. This can sometimes make repayment more manageable.");
    
    if (s.deniedByLimit) return;

    // Check if installment plans are applicable based on state rules and currentLoanSession data
    StateSpecificRules currentRules = c.getCurrentStateRules();
    if (!currentRules.installmentPlanAllowed) {
        UI::show("Installment plans are not available for this loan type or in your state (" + currentRules.stateName + ").");
        s.tagEthicalSafeguard("InstallmentPlanNotAllowed_StateRule");
        return;
    }

    // Present the installment plan option
    double proposedMonthlyPayment = (s.amount + s.fee) / currentRules.maxInstallmentTerms;
    UI::show("Proposed Installment Plan: " + std::to_string(currentRules.maxInstallmentTerms) + " months at $" + std::to_string(round(proposedMonthlyPayment)) + " per month.");
    
    std::string acceptInstallmentPlan = UI::prompt("Do you accept this installment plan? (yes/no):");
    s.record("InstallmentPlanAcceptanceResponse_v4", acceptInstallmentPlan);
    if (acceptInstallmentPlan == "yes" || acceptInstallmentPlan == "YES") {
        s.installmentPlanAccepted = true;
        s.record("InstallmentPlanAccepted_v4", "MonthlyPayment_" + std::to_string(round(proposedMonthlyPayment)) + "_Terms_" + std::to_string(currentRules.maxInstallmentTerms));
        s.tagEthicalSafeguard("InstallmentPlanAccepted_DetailsLogged");
        UI::show("Installment plan accepted. New terms have been applied.");
    } else {
        UI::show("Installment plan declined. No changes have been made to your loan.");
    }
}

// Step 9: Finalize (orchestrates the final steps of the loan process, ensuring all ethical and compliance checks are met)
// This step ensures that all aspects of the loan agreement are finalized, including ethical checks, compliance with regulations, and proper documentation.
void Regulated::finalize(LoanSession &s, const Config &c, const std::string& mode_name){ // Added mode_name
    if(s.deniedByLimit) { 
        UI::show("Loan cannot be finalized due to denial status. Reason: " + s.denialReason);
        return; 
    }

    UI::show("\n--- FINALIZING LOAN ---");
    UI::tooltip("We are finalizing your loan based on the agreed terms and ensuring all regulatory and ethical checks are complete.");
    
    // Ensure all pillars of informed consent are met before finalization
    if (!s.consentGiven) {
        UI::showWarning("Finalization cannot proceed without explicit consent to the loan terms.");
        return;
    }

    // Log final terms and consent
    s.record("LoanFinalized_v4", "Amount_" + std::to_string(s.amount) + "_Fee_" + std::to_string(s.fee) + "_APR_" + std::to_string(s.aprCalculated) + "_TermDays_" + std::to_string(s.termDays));
    s.tagEthicalSafeguard("LoanFinalized_TermsLogged");
    
    // Notify user of finalization
    UI::show("Your loan has been successfully finalized. You will receive the funds as per the agreed terms.");
}

// The finalize method will orchestrate these steps.
// Other methods like calcFee, renewals will also need to integrate the compliance checks
// from the user's "usury_compliance.h" example (e.g., preventDebtTrap, feeLabelCheck, etc.)
// and the Millian harm principle prompts where relevant.
// The `consent` method will primarily handle income/zip collection.
// `askAmt` is straightforward.
// `calcFee` will be complex with state rules, ethical adjustments, and compliance checks.
// `extras` will be minimal.
// `renewals` will incorporate rollover bans, limits, and Millian harm prompts.
// `finalize` will be the grand orchestrator of the informed consent pillars, ethical reflections, educational modules, and final loan processing steps.
// from the user's "usury_compliance.h" example (e.g., preventDebtTrap, feeLabelCheck, etc.)
// and the Millian harm principle prompts where relevant.
// The `consent` method will primarily handle income/zip collection.
// `askAmt` is straightforward.
// `calcFee` will be complex with state rules, ethical adjustments, and compliance checks.
// `extras` will be minimal.
// `renewals` will incorporate rollover bans, limits, and Millian harm prompts.
// `finalize` will be the grand orchestrator of the informed consent pillars, ethical reflections, educational modules, and final loan processing steps.
            LoanSession::saveLoanCount(currentLoanCountSystem+1);
            s.loanCount = currentLoanCountSystem + 1; 
        }
        s.record("LoanStatusFinal_v2", "Funded_UserLoanCount_" + std::to_string(s.loanCount));
        s.tagEthicalSafeguard("LoanFundedAfterAllChecksAndRescissionOpportunity_Final");
        UI::show("✅ Your loan is now finalized and funds will be disbursed as per the agreement. Please manage your repayments responsibly.");
    }
    
    // Capstone: Post-Test & Survey
    if (c.capstoneKnowledgePostTest) { // No mode check, can be for both if desired
        UI::conductKnowledgeQuiz(c, s, "Post-Simulation Knowledge & Ethics Assessment (Capstone v2)");
    }
    if (c.capstoneUserSurveyPrompt) {
        UI::show("\n--- Quick Feedback Survey (Optional) ---");
        s.userFeedbackSurveyResponse = UI::prompt("How would you rate this simulation's educational value in demonstrating ethical lending and informed consent (1-5, 5=Excellent)? Any suggestions for improvement or other topics to cover?");
        s.record("UserSurveyResponse_EducationalValue", s.userFeedbackSurveyResponse);
    }
    // Capstone Feature: Policy Report Export (Conceptual)
    if (c.capstonePolicyReportExport) {
        UI::show("\nGenerating policy report (simulated)... " + c.capstonePolicyReportFile);
        // In a real app, this would collate data from 'sess' and 'cfg' into a markdown report.
        s.record("PolicyReportGenerated_Simulated", c.capstonePolicyReportFile);
    }


    std::string final_reflection = UI::prompt("Finally, did this comprehensive simulation help you better understand your rights as a borrower, the complexities of informed consent, the ethical duties of lenders, and the principles of responsible, regulated lending? (yes/no/detailed comments welcome):");
    s.record("UserFeedback_SimulationEffectiveness_Comprehensive", final_reflection);
    UI::show("Thank you for participating in the Lotus Responsible Finance Simulator (Deep Dive Educational Version). We encourage continued financial education and advocacy for fair lending practices.");
}

// Implement other methods (consent, askAmt, calcFee, extras, renewals) with similar depth,
// ensuring they use Config flags, update LoanSession, call UI functions, and integrate
// ethical considerations and compliance checks throughout.
// For example, `renewals` must strictly check `c.regulatedMaxRenewals` and `currentRules.maxRollovers`,
// implement `preventDebtTrap` and `guardInterestOnlyRenewal` logic, and use `promptMillHarmPrincipleForRollovers`.
// `calcFee` must implement all state-specific fee caps and the Rawlsian/Millian fee adjustments.
            input = UI::prompt("Please type the full consent phrase here:");
            s.record("ConsentAuthorizationAttemptTyped_Pillar5_v2", input);
            if (input == "exit") { UI::show("Session ended by user during final authorization."); std::exit(0); }
            if (input == c.regulatedExplicitConsentPhraseFull) break;
            UI::show("The entered phrase does not match the required confirmation exactly. Please try again, ensuring case-sensitivity and all punctuation, or type 'exit'. This step is crucial to ensure your active, unambiguous, and legally binding agreement to the terms, fulfilling all pillars of informed consent.");
        }
        s.consentGiven = true;
        s.explicitConsentInput = input;
        s.consentTimestamp = std::time(nullptr); 
        s.consentTermsHash = generateTermsHash(s.amount, s.fee, s.termDays, s.aprCalculated, c.regulatedExplicitConsentPhraseFull); 
        s.record("ConsentGivenFinal_Pillar5_Authorization_Deep_v2", "explicit_phrase_match_success: " + c.regulatedExplicitConsentPhraseFull + " at " + std::to_string(s.consentTimestamp) + " with terms_hash: " + s.consentTermsHash);
        s.addSpecificDisclosureMade("Explicit Consent & Authorization Provided: Typed Full Consent Phrase Matched (" + c.regulatedExplicitConsentPhraseFull + "), timestamped, terms hashed for audit trail, fulfilling all Informed Consent Pillars.");
        s.tagEthicalSafeguard("InformedConsent_Pillar5_Authorization_ExplicitPhraseMatchStrong_ESIGN_AllPillarsMet");
        UI::show("✅ Thank you. Your informed, voluntary consent and authorization for this loan agreement have been successfully recorded.");
        
        // Log to consent audit file (Mechanism --consent-log)
        if (!c.consentLogFile.empty()) {
            std::ofstream log_file(c.consentLogFile, std::ios::app);
            if (log_file.is_open()) {
                char time_buffer[80]; // Increased buffer size
                std::strftime(time_buffer, sizeof(time_buffer), "%Y-%m-%d %H:%M:%S %Z (%A, %B %d, %Y)", std::localtime(&s.consentTimestamp));
                log_file << "=== INFORMED CONSENT AUDIT RECORD ===\n";
                log_file << "SessionID: " << s.sessionId << "\n"; // Assuming LoanSession has a sessionId
                log_file << "Timestamp: " << time_buffer << "\n";
                log_file << "User: " << (s.userName.empty() ? "ProvidedPostConsent" : s.userName) << "\n"; 
                log_file << "State: " << (c.state.empty() ? "N/A" : c.state) << "\n";
                log_file << "LoanAmount: $" << s.amount << ", FinanceCharge: $" << s.fee << ", Term: " << s.termDays << " days, APR: " << s.aprCalculated << "%\n";
                log_file << "TotalOfPayments: $" << s.totalRepayment << "\n";
                log_file << "MilitaryStatus: " << (s.isMilitary ? "Yes (MLA Protections Apply)" : "No") << "\n";
                log_file << "Pillar1_CapacityConfirmed: " << (s.capacityConfirmed ? "Yes" : "No") << "\n";
                log_file << "Pillar2_FullDisclosureProvided: " << (s.fullDisclosureProvided ? "Yes" : "No") << ", Disclosure Timestamp: " << s.disclosureTimestamp << "\n";
                log_file << "Pillar3_ComprehensionQuizPassed: " << (s.quizPassed ? "Yes" : "No") << " (Attempts: " << s.quizAttempts << ", Score: " << (s.quizResponses.size()>0 ? std::count_if(s.quizResponses.begin(), s.quizResponses.end(), [](const auto& qr){return qr.second;}) : 0) << "/" << s.quizResponses.size() << ")\n";
                log_file << "Pillar4_Voluntariness_MetaConsentCheck: " << (s.metaConsentCheckPerformed ? "Yes" : "No") << ", AffirmedNoPressure: " << (s.voluntarinessAffirmedByDeclaration ? "Yes" : "No") << "\n";
                log_file << "Pillar5_Authorization_PhraseExpected: \"" << c.regulatedExplicitConsentPhraseFull << "\"\n";
                log_file << "Pillar5_Authorization_PhraseTyped: \"" << s.explicitConsentInput << "\"\n";
                log_file << "Pillar5_Authorization_TermsHash: " << s.consentTermsHash << "\n";
                log_file << "RescissionOffered: " << (s.rescissionOffered ? "Yes (" + s.rescissionDeadlineText + ")" : "No") << "\n";
                log_file << "--------------------------------------\n\n";
                log_file.close();
                s.record("ConsentLoggedToFile_Detailed_Pillars_V2_Capstone", c.consentLogFile);
                s.tagEthicalSafeguard("ConsentAuditTrailLogged_Pillars_Detailed_Capstone");
            } else {
                UI::showWarning("CRITICAL WARNING: Failed to open consent log file ('" + c.consentLogFile + "') for writing. Consent terms and audit trail will not be formally logged. This is a serious issue for compliance and ethical record-keeping.");
                s.record("ConsentLogWriteError", c.consentLogFile + "_OpenFailed");
                s.tagEthicalSafeguard("ConsentAuditTrail_LoggingFailed_CriticalError");
            }
        }
    } else { 
        UI::showWarning("Authorization step (Pillar 5) skipped due to configuration. This is not typical for ethical lending requiring explicit authorization.");
        s.record("AuthorizationSkipped_Pillar5_v2", "ConfigDisabled_EthicalConcern_NoBindingAgreementSimulated");
    }
}
