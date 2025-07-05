// /modes/ethical.js
import { LoanCore, Config, LoanSession, LoanStrategy } from '../core/loan_core.js';
import { UI } from '../ui.js';

class Ethical extends LoanStrategy {
    async intro(session, config) {
        UI.showSectionHeader("🏛 Welcome to Lotus Responsible Finance Simulator 🏛", "Ethical & Regulated Mode");
        UI.show("This simulation demonstrates a lending model that adheres to strong consumer protection laws and ethical principles.");
        session.tagEthicalSafeguard("Intro_Transparency_EthicsFramework");
       
        if (config.showPrimer) {
            UI.showEducationalSnippet("Ethical Primer: The Belmont Principles",
            "This simulation is guided by principles inspired by the Belmont Report (1979):\n1. Respect for Persons (Autonomy & Informed Consent)\n2. Beneficence (Do No Harm, Maximize Benefit)\n3. Justice (Fairness in Distribution)",
            "The Belmont Report, Beauchamp & Childress");
            session.addEducationalModuleShown("BelmontPrimer");
        }

        if (config.eduProvideUsuryLawDeepDive) {
            UI.showEducationalSnippet("Deep Dive: Usury Laws",
            "Usury laws cap interest rates to prevent exploitation. Historically, these were common, but financial deregulation since the 1980s has weakened them, allowing high-cost lending to proliferate in many states.",
            "Source: National Conference of State Legislatures (NCSL)");
            session.addEducationalModuleShown("UsuryLawDeepDive");
        }

        const militaryStatus = await UI.prompt("Are you an active-duty member of the U.S. Armed Forces, or a spouse/dependent? (yes/no):");
        if (UI.argEquals(militaryStatus, "yes")) {
            session.isMilitary = true;
            UI.legalNotice("As a covered borrower under the Military Lending Act (MLA), you are entitled to special protections, including a 36% MAPR cap.");
            session.tagEthicalSafeguard("MLACheck_CoveredBorrower");
        }
    }
    async consent(session, config) {
        if (config.requireMetaConsent) {
            const metaConsent = await UI.prompt("Meta-Consent Check: Do you feel you are making this decision freely and without undue pressure? (yes/no)");
            if (!UI.argEquals(metaConsent, "yes")) {
                UI.show("Ethical lending requires a voluntary choice. We recommend taking more time to consider. The simulation will now end.");
                session.deniedByLimit = true;
                session.denialReason = "User did not provide meta-consent; felt pressured.";
                session.tagDarkPattern("MetaConsent_Failed"); // Tagging as a dark pattern if the user feels pressured
                return;
            }
            session.tagEthicalSafeguard("MetaConsent_Passed");
        }

        UI.showSubSectionHeader("Pillar 1: Capacity to Decide");
        if (config.regulatedPillarCompetenceCheck) {
            const ageConfirm = await UI.prompt("Please confirm you are 18 or older (yes/no):");
            if (!UI.argEquals(ageConfirm, "yes")) {
                session.deniedByLimit = true; session.denialReason = "Ineligible due to age."; return;
            }
            session.capacityConfirmed_Age = true;
            const soundMindConfirm = await UI.prompt("Please confirm you are of sound mind and can understand a financial agreement (yes/no):");
            if (!UI.argEquals(soundMindConfirm, "yes")) {
                session.deniedByLimit = true; session.denialReason = "User does not feel capable of understanding the agreement."; return;
            }
            session.capacityConfirmed_SoundMind = true;
            session.tagEthicalSafeguard("InformedConsent_Pillar1_Capacity_Confirmed");
        }

        if (config.regulatedApplyIncomeBasedCapsComprehensive) {
            UI.tooltip("Rawlsian Justice Principle: To protect the least advantaged, we must ensure loans are affordable.");
            session.monthlyIncome = await UI.askNum("Please enter your approximate gross monthly income: $");
            if (session.monthlyIncome <= 0) {
                UI.showWarning("A valid monthly income is required for an affordability assessment.");
                session.deniedByLimit = true; session.denialReason = "Invalid income for affordability check."; return;
            }
            session.tagEthicalSafeguard("AffordabilityCheck_IncomeCollected_Rawlsian");
        }
    }
    async askAmt(session, config) {
        const stateRules = config.getCurrentStateRules(session.state);
        let maxLoan = "";
        if (stateRules.maxOutstandingLoanAmount > 0) {
            maxLoan = ` (State max: $${stateRules.maxOutstandingLoanAmount})`;
        }
        session.amount = await UI.askNum(`Please enter your desired loan amount${maxLoan}: $`);

        if (stateRules.maxOutstandingLoanAmount > 0 && session.amount > stateRules.maxOutstandingLoanAmount) {
            UI.showWarning(`Loan amount adjusted to state maximum of $${stateRules.maxOutstandingLoanAmount}.`);
            session.amount = stateRules.maxOutstandingLoanAmount;
            session.tagEthicalSafeguard("StateMaxLoanAmountEnforced");
        }

        let requestedTerm = await UI.askNum(`Enter desired loan term in days (e.g., 14, 30). State min/max may apply:`);
        session.termDays = requestedTerm;
        if (stateRules.minTermDays > 0 && session.termDays < stateRules.minTermDays) {
            UI.showWarning(`Term adjusted to state minimum of ${stateRules.minTermDays} days.`);
            session.termDays = stateRules.minTermDays;
            session.tagEthicalSafeguard("StateMinTermEnforced");
        }
        if (stateRules.maxTermDays > 0 && session.termDays > stateRules.maxTermDays) {
            UI.showWarning(`Term adjusted to state maximum of ${stateRules.maxTermDays} days.`);
            session.termDays = stateRules.maxTermDays;
            session.tagEthicalSafeguard("StateMaxTermEnforced");
        }
    }
    async calcFee(session, config) {
        const stateRules = config.getCurrentStateRules(session.state);
        let targetAPR = config.regulatedBaseAPR;
       
        if (config.regulatedEnableTieredFeeStructureForEquity && session.monthlyIncome > 0) {
            UI.tooltip("Applying Rawlsian 'Veil of Ignorance' to fee structure: rates are adjusted to benefit the least advantaged.");
            if (session.monthlyIncome < 2000) targetAPR = Math.max(18.0, targetAPR - 7.0);
            else if (session.monthlyIncome < 3500) targetAPR = Math.max(22.0, targetAPR - 3.0);
            session.tagEthicalSafeguard("TieredFeeApplied_Rawlsian");
        }

        let regulatoryAPRCap = session.isMilitary ? 36.0 : (stateRules.aprCap > 0 ? stateRules.aprCap * 100 : config.regulatedMaxAPRCap);
        let effectiveAPR = Math.min(targetAPR, regulatoryAPRCap);
       
        session.aprCalculated = effectiveAPR;
        let calculatedFee = session.amount * (session.aprCalculated / 100) * (session.termDays / 365);

        if (config.showCostBenefit) {
            UI.showSubSectionHeader("Transparent Cost-Benefit Ledger");
            UI.show(` • Principal Loan Amount: $${session.amount.toFixed(2)} (These are the funds you will receive)`);
            UI.show(` • Finance Charge (Fee): $${calculatedFee.toFixed(2)} (This is the total cost to borrow, based on a ${session.aprCalculated.toFixed(2)}% APR)`);
            UI.show(` • Community Investment: $5.00 (A fixed amount contributed to a local financial literacy fund)`);
            UI.show(` → Total Repayment: $${(session.amount + calculatedFee + 5).toFixed(2)}`);
            calculatedFee += 5; // Add the community investment to the total fee
            session.tagEthicalSafeguard("CostBenefitLedger_Shown");
        }

        if (session.state === 'CO' && stateRules.feeCapFirst300Percent) {
            let coFee = 0;
            if (session.amount <= 300) {
                coFee = session.amount * (stateRules.feeCapFirst300Percent);
            } else {
                coFee = (300 * (stateRules.feeCapFirst300Percent)) + ((session.amount - 300) * (stateRules.feeCapExcessPercent));
            }
            calculatedFee = Math.min(calculatedFee, coFee);
            session.aprCalculated = (calculatedFee / session.amount) / session.termDays * 365 * 100;
            session.tagEthicalSafeguard("StateSpecificFeeStructureApplied_CO");
        }
       
        session.fee = calculatedFee;

        if (config.regulatedApplyIncomeBasedCapsComprehensive && session.monthlyIncome > 0) {
            const maxPayment = session.monthlyIncome * config.regulatedPaymentToIncomeRatioCap;
            const totalPayment = session.amount + session.fee;
            if (totalPayment > maxPayment) {
                session.deniedByLimit = true;
                session.denialReason = `Loan unaffordable. Total payment of $${totalPayment.toFixed(2)} exceeds ${config.regulatedPaymentToIncomeRatioCap*100}% of monthly income ($${maxPayment.toFixed(2)}).`;
                session.tagEthicalSafeguard("AffordabilityCapDenied_PTI_ATR");
                return;
            }
            session.tagEthicalSafeguard("AffordabilityCheckPassed_PTI_ATR");
        }

        session.totalRepayment = session.amount + session.fee;
        UI.show(`Fee: $${session.fee.toFixed(2)}, APR: ${session.aprCalculated.toFixed(2)}% (Capped by ${session.isMilitary ? 'MLA' : 'state regulation'})`);
        session.tagEthicalSafeguard("RegulatoryAPRCapApplied");

        if (config.showLegalCase) {
            UI.showLegalCaseNotice("Delaware v. X Corp (2024): 36% APR cap enforced");
        }
        if (config.showStatePilot) {
            UI.legalNotice("SD Pilot: one 0% APR extension/year");
        }
        if (config.requireCoolingOff) {
            UI.show("Cooling-off: You may cancel within 24h.");
        }

        if (config.regulatedWarnIfFeesExceedPrincipalStrictAndEarly && session.fee > session.amount) {
            UI.showWarning("MILLIAN WELFARE ADVISORY (Harm Reduction): The fee is greater than the loan amount. Please consider if this loan truly improves your overall well-being.");
            session.tagEthicalSafeguard("WarnedExcessiveFees_Millian");
        }
    }
    async extras(session, config) {
        UI.showSubSectionHeader("Additional Services");
        UI.show("No extra fee-based services are offered to ensure transparency and prevent hidden costs.");
        session.tagEthicalSafeguard("NoHiddenFees_Extras");
    }
    async renewals(session, config) {
        const stateRules = config.getCurrentStateRules(session.state);
        const canRenew = config.regulatedAllowRollover && session.renewalsTaken < (stateRules.maxRenewals ?? config.regulatedMaxRenewals);

        if (!canRenew) {
            UI.showSubSectionHeader("Loan Renewal Status");
            UI.show("This loan is not eligible for renewal/rollover to prevent debt traps, as per state law and ethical lending policy.");
            session.tagEthicalSafeguard("Renewal_NotEligible_DebtTrapPrevention");
            return;
        }

        UI.showSubSectionHeader("Loan Renewal Option");
        UI.showWarning("Renewing your loan will incur additional finance charges and increase your total cost. This should only be considered if you cannot repay the loan and have a clear plan for future repayment.");
        if (config.regulatedPromptMillHarmPrincipleForRollovers) {
            session.millianReflectionResponse = await UI.prompt("Does renewing this loan prevent a greater immediate harm (like default) versus the cumulative harm of prolonged debt? (yes/no/why):");
            session.tagEthicalSafeguard("MillianReflectionPrompt_Rollover");
        }
       
        const extend = await UI.prompt("Do you wish to renew your loan for another term? (yes/no):");
        if (UI.argEquals(extend, "yes")) {
            const renewalFee = session.amount * (session.aprCalculated / 100) * (session.termDays / 365);
            session.fee += renewalFee;
            session.totalRepayment += renewalFee;
            session.renewalsTaken++;
            UI.show(`Loan renewed. New fee of $${renewalFee.toFixed(2)} applied. Total renewals: ${session.renewalsTaken}.`);
            session.tagEthicalSafeguard("Renewal_Accepted");
        }
    }
   
    async finalize(session, config) {
        UI.showSectionHeader("Final Review & Authorization", "Ethical & Regulated Mode");
       
        UI.showSubSectionHeader("Pillar 2: Full Disclosure (TILA Summary)");
        UI.showLoanSummaryCard(session, config, session.aprCalculated);
        session.fullDisclosureProvided = true;
        session.tagEthicalSafeguard("InformedConsent_Pillar2_FullDisclosureProvided");

        if (config.requireQuiz) {
            const passed = await UI.conductKnowledgeQuiz(session, config);
            if (!passed) {
                UI.show("To ensure you understand, please review the terms again. We cannot proceed without a passed comprehension check.");
                session.deniedByLimit = true; session.denialReason = "Comprehension quiz failed."; return;
            }
        }

        await UI.promptKantianReflection(session, config);

        const isVoluntary = await UI.conductVoluntarinessDeclaration(session, config);
        if (!isVoluntary) return;

        UI.showSubSectionHeader("Pillar 5: Authorization");
        UI.show("To finalize the loan, you must provide explicit authorization by typing the full consent phrase.");
        const finalConsent = await UI.prompt(`Please type the following phrase to confirm:\n'${config.regulatedExplicitConsentPhraseFull}'`);
        if (UI.argEquals(finalConsent, config.regulatedExplicitConsentPhraseFull)) {
            session.consentGiven = true;
            session.explicitConsentInput = finalConsent;
            session.consentTimestamp = Date.now();
            session.consentTermsHash = "HASH_SIMULATED_" + session.amount + session.fee + session.termDays;
            UI.show("✅ Loan Finalized. Thank you.");
            session.tagEthicalSafeguard("InformedConsent_Pillar5_AuthorizationConfirmed");
        } else {
            UI.show("Loan not finalized. The phrase was not entered correctly.");
            session.deniedByLimit = true; session.denialReason = "Final authorization phrase incorrect.";
        }

        if (session.consentGiven && config.requireCoolingOff) {
            session.rescissionOffered = true;
            UI.legalNotice(`You have the right to rescind (cancel) this loan at no cost by the end of the third business day after receiving this notice. Details will be in your final loan documents.`);
            session.tagEthicalSafeguard("RightToRescindDisclosed");
        }

        if (config.showDebrief) {
            UI.showSubSectionHeader("Ethical Debrief & Further Resources");
            UI.show("This simulation demonstrated a loan governed by ethical principles:");
            UI.show("  - **Respect for Persons:** You were asked for meta-consent and your understanding was tested.");
            UI.show("  - **Beneficence:** We checked if the loan was affordable (PTI ratio) and warned about high fees.");
            UI.show("  - **Justice:** The fee structure was adjusted based on income (Rawls) and capped by law.");
            UI.show("Your choice to proceed (or not) was respected at each stage.");
        }

        if (config.eduProvideEmpiricalHarmDataComprehensive) {
            UI.showEducationalSnippet("Data Spotlight: The Debt Trap",
            `The Consumer Financial Protection Bureau (CFPB) found that over 80% of payday loans are rolled over or re-borrowed within 30 days. The average borrower remains in debt for 5 months, paying more in fees than their original loan amount. (Source: CFPB Payday Lending Study)`,
            `Harm Metrics: Avg. ${config.harmMetrics.averageLoanCountPerYear} loans/year; ${config.harmMetrics.repeatBorrowingRate*100}% of borrowers re-borrow within a month.`);
            session.addEducationalModuleShown("EmpiricalHarmData");
        }

        if (config.caseStudies && config.caseStudies.length > 0) {
            UI.showEducationalSnippet("Real-World Case Study: Legal Evasion",
            `Lender: ${config.caseStudies[0].lender}\nStructure: ${config.caseStudies[0].structure}\nOutcome: ${config.caseStudies[0].outcome}`,
            "This case shows how regulators can challenge lenders who use legal loopholes to evade consumer protection laws.");
            session.addEducationalModuleShown("CaseStudy");
        }

        if (config.eduCompareToCreditUnionPALsDetailed) {
            UI.showEducationalSnippet("Alternative: Credit Union PALs",
            "Payday Alternative Loans (PALs) from federal credit unions are capped at 28% APR, with application fees no more than $20. They offer a much safer way to borrow small amounts.",
            "Source: National Credit Union Administration (NCUA)");
            session.addEducationalModuleShown("CreditUnionPALs");
        }

        if (config.eduShowDarkPatternExamplesEducationalDeep) {
            UI.showEducationalSnippet("Learn to Spot Dark Patterns",
            "The 'Exploitative' mode you can try uses tactics like 'Forced Arbitration' and 'Hidden Fees'. Recognizing these can help you avoid predatory financial products.",
            "Source: darkpatterns.org");
            session.addEducationalModuleShown("DarkPatternEducation");
        }

        if (config.eduShowFinancialCounselorReferralsLocal) {
            UI.showSubSectionHeader("Need Help? Free Financial Counseling");
            UI.show("If you are struggling with debt, confidential help is available. The National Foundation for Credit Counseling (NFCC) can connect you with a non-profit counselor in your area.");
            UI.show("Visit www.nfcc.org or call 1-800-388-2227.");
            session.addEducationalModuleShown("FinancialCounselorReferral");
        }
    }
}

export { Ethical };
