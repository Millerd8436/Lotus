// /modes/ethical.js
import { LoanCore, Config, LoanSession, LoanStrategy } from '../core/loan_core.js';
import { UI } from '../ui.js';

class Ethical extends LoanStrategy {
    /**
     * Main orchestration method for the ethical lending simulation
     * This method coordinates all phases of the ethical lending process
     */
    async run(session, config) {
        UI.show("Starting ethical lending simulation...");
        
        await this.intro(session, config);
        if (session.deniedByLimit) return;
        
        // NEW: Enhanced Kantian Informed Consent Process
        if (config.enableKantianInformedConsent) {
            await this.kantianInformedConsentFramework(session, config);
            if (session.deniedByLimit) return;
        }
        
        await this.consent(session, config);
        if (session.deniedByLimit) return;
        
        // NEW: Comprehensive Usury Education Before Amount
        if (config.enableComprehensiveUsuryEducation) {
            await this.comprehensiveUsuryEducation(session, config);
            if (session.deniedByLimit) return;
        }
        
        await this.askAmt(session, config);
        if (session.deniedByLimit) return;
        
        await this.calcFee(session, config);
        if (session.deniedByLimit) return;
        
        await this.extras(session, config);
        if (session.deniedByLimit) return;
        
        await this.renewals(session, config);
        if (session.deniedByLimit) return;
        
        await this.finalize(session, config);
        if (session.deniedByLimit) return;
        
        // Final educational modules
        await this.provideEducationalModules(session, config);
        
        UI.show("Ethical simulation completed successfully.");
    }

    async intro(session, config) {
        if (config.showPhilosophyPrimer) {
            UI.showPhilosophyPrimer();
        }
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

        // NEW: Educational content about modern payday lending mechanisms
        if (config.eduShowModernPaydayMechanisms) {
            UI.showEducationalSnippet("Modern Payday Lending: Beyond Traditional Storefronts",
                "Today's payday lending has evolved into sophisticated digital platforms that often disguise their true nature:\n\n" +
                "## 💰 1. Earned Wage Access (EWA) / On-Demand Pay Apps\n\n" +
                "These services **market themselves as non-loan tools** — but their mechanisms and effects often mirror payday loans.\n\n" +
                "### 🧠 How It Works:\n" +
                "• Worker accesses wages they've already earned via mobile app\n" +
                "• Funds are **deposited instantly** into their bank account\n" +
                "• Repayment is scheduled for the next payday — **automatically deducted**\n" +
                "• Users \"tip\" or pay a small fee (~$3–$15), which masks true borrowing costs\n\n" +
                "### 📌 Examples:\n" +
                "• **Earnin**: Tip-based model hides APRs that rival payday loans\n" +
                "• **DailyPay**: Employer-backed, high-fee, instant access to earned pay\n" +
                "• **Payactiv**: Integrates directly with payroll services like ADP\n\n" +
                "### ⚠️ Traps:\n" +
                "• **Voluntary tipping** builds social pressure but adds hidden cost\n" +
                "• Flat fees on small advances = APRs of **300–750%**\n" +
                "• Seamless access makes **habitual borrowing easy** — users come back weekly\n\n" +
                "---\n\n" +
                "## 🏦 2. Employer-Sponsored Payroll Deduction Loans\n\n" +
                "Structured as **\"benefit programs\"**, but they replicate high-cost loan cycles under the guise of workplace finance.\n\n" +
                "### 🧠 How It Works:\n" +
                "• Employer partners with a lender\n" +
                "• Employee borrows $250–$3,000+\n" +
                "• Repayment is **deducted directly from their paycheck**, often in installments\n" +
                "• Often includes \"refinancing\" or \"renewal\" offers when balance is unpaid\n\n" +
                "### 📌 Examples:\n" +
                "• **BMG Money / LoansAtWork**\n" +
                "• **Kashable**\n" +
                "• **ADP Integrated Payroll Loans**\n\n" +
                "### ⚠️ Traps:\n" +
                "• Loans don't reduce unless employee pays more than minimum\n" +
                "• Renewal offers keep user in permanent loan cycle\n" +
                "• Often **opt-out consent buried in employee onboarding**\n\n" +
                "---\n\n" +
                "## 🔄 3. Embedded Payroll Advances (HR-Integrated)\n\n" +
                "Fully embedded in HR/payroll platforms — marketed as \"tools\" not loans.\n\n" +
                "### 🧠 How It Works:\n" +
                "• User logs into payroll portal (e.g. Gusto, Complete Payroll)\n" +
                "• Clicks \"Get Paid Now.\"\n" +
                "• Funds are fronted and **automatically deducted** on next payday\n" +
                "• No interest — but **fees for speed** ($1.99–$5)\n\n" +
                "### 📌 Examples:\n" +
                "• **Tapcheck**\n" +
                "• **Gusto + Clair**\n" +
                "• **Complete Payroll**\n\n" +
                "### ⚠️ Traps:\n" +
                "• Fee-based \"non-loans\" exempt from lending laws\n" +
                "• Used repeatedly without disclosure of cumulative cost\n" +
                "• Often **no opt-out or cap on usage frequency**",
                "Sources: Consumer Financial Protection Bureau, National Consumer Law Center");
            session.addEducationalModuleShown("ModernPaydayMechanisms");
        }

        if (config.eduShowPaydayComparisonTable) {
            UI.showEducationalSnippet("Payday Lending Method Comparison",
                "## 📊 Comparison Table\n\n" +
                "| Method                    | Collection Method        | Fees / APR                  | Example Services             |\n" +
                "|--------------------------|--------------------------|-----------------------------|--------------------------|\n" +
                "| Earned Wage Access       | Bank or payroll ACH      | $3–$15 flat, ~300–750% APR  | Earnin, DailyPay, Payactiv   |\n" +
                "| Payroll Deduction Loans  | Employer-based deduction | 6–36% APR                   | BMG Money, Kashable, ADP     |\n" +
                "| Embedded Advances        | Payroll portal auto-pay  | $0–$5 flat per advance      | Tapcheck, Gusto, Complete    |\n" +
                "| Traditional Payday Store | Post-dated check/ACH     | $15-$30 per $100, ~400% APR | Check Into Cash, Advance America |\n\n" +
                "**KEY INSIGHT: Modern methods are functionally payday loans because:**\n" +
                "1. Automatic withdrawal = no consent loop\n" +
                "2. Flat fees disguise interest rates\n" +
                "3. No amortization = principal rarely decreases\n" +
                "4. Repeated use with no requalification\n" +
                "5. Legal framing avoids lending oversight",
                "Analysis based on CFPB reports and state regulatory filings");
            session.addEducationalModuleShown("PaydayComparisonTable");
        }

        const militaryStatus = await UI.prompt("Are you an active-duty member of the U.S. Armed Forces, or a spouse/dependent? (yes/no):");
        if (UI.argEquals(militaryStatus, "yes")) {
            session.isMilitary = true;
            UI.legalNotice("As a covered borrower under the Military Lending Act (MLA), you are entitled to special protections, including a 36% MAPR cap.");
            session.tagEthicalSafeguard("MLACheck_CoveredBorrower");
        }

        // Explain ethical frameworks that guide this simulation
        await this.explainEthicalFrameworks(session, config);
    }
    async consent(session, config) {
        if (config.requireMetaConsent) {
            const metaConsent = await UI.prompt("Meta-Consent Check: Do you feel you are making this decision freely and without undue pressure? (yes/no)");
            session.metaConsentResponse = metaConsent;
            if (!UI.argEquals(metaConsent, "yes")) {
                UI.show("Ethical lending requires a voluntary choice. We recommend taking more time to consider. The simulation will now end.");
                session.deniedByLimit = true;
                session.denialReason = "User did not provide meta-consent; felt pressured.";
                session.tagDarkPattern("MetaConsent_Failed");
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

        if (config.requireMetaConsent) {
            const metaConsent = await UI.prompt("Meta-Consent Check: Do you feel you are making this decision freely and without undue pressure? (yes/no)");
            session.metaConsentResponse = metaConsent;
            if (!UI.argEquals(metaConsent, "yes")) {
                UI.show("Ethical lending requires a voluntary choice. We recommend taking more time to consider. The simulation will now end.");
                session.deniedByLimit = true;
                session.denialReason = "User did not provide meta-consent; felt pressured.";
                session.tagDarkPattern("MetaConsent_Failed");
                return;
            }
            session.tagEthicalSafeguard("MetaConsent_Passed");
        }

        // Affordability Data Collection (Rawlsian Justice)
        if (config.regulatedApplyIncomeBasedCapsComprehensive) {
            UI.tooltip("Rawlsian Justice Principle: To protect the least advantaged, we must ensure loans are affordable.");
            session.monthlyIncome = await UI.askNum("Please enter your approximate gross monthly income: $");
            if (session.monthlyIncome <= 0) {
                UI.showWarning("A valid monthly income is required for an affordability assessment.");
                session.deniedByLimit = true; 
                session.denialReason = "Invalid income for affordability check."; 
                return;
            }
            session.tagEthicalSafeguard("AffordabilityCheck_IncomeCollected_Rawlsian");
            
            if (config.regulatedAbilityToRepayLogicDetailed) {
                UI.show("Please estimate your major monthly expenses (optional, enter 0 if not applicable):");
                session.userExpenses.rent_or_mortgage = await UI.askNum("Monthly rent/mortgage: $");
                session.userExpenses.other_debt_payments = await UI.askNum("Other monthly debt payments: $");
                session.userExpenses.essential_utilities = await UI.askNum("Essential utilities: $");
                session.tagEthicalSafeguard("BasicExpenseDataCollected");
            }
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

        // Ability-to-Repay (ATR) Check using Payment-to-Income (PTI)
        if (config.regulatedApplyIncomeBasedCapsComprehensive && session.monthlyIncome > 0) {
            const maxPayment = session.monthlyIncome * config.regulatedPaymentToIncomeRatioCap;
            const totalPayment = session.amount + session.fee;
            if (totalPayment > maxPayment) {
                const originalFee = session.fee;
                session.fee = maxPayment - session.amount;
                if (session.fee < 0) {
                    if (config.regulatedSimulateMarketImpact) {
                        UI.showWarning(`Market Impact: Under these regulations, a profitable loan cannot be offered. Application denied.`);
                        session.denialReason = `Loan is unprofitable under state affordability rules.`;
                    } else {
                        session.denialReason = `Loan unaffordable. Total payment of $${totalPayment.toFixed(2)} exceeds ${config.regulatedPaymentToIncomeRatioCap*100}% of monthly income ($${maxPayment.toFixed(2)}).`;
                    }
                    session.deniedByLimit = true;
                    session.tagEthicalSafeguard("AffordabilityCapDenied_PTI_ATR");
                    return;
                }
                session.aprCalculated = LoanCore.calculateAPR(session.amount, session.fee, session.termDays);
                session.tagEthicalSafeguard("AffordabilityCapApplied_FeeAdjusted");
                UI.showWarning(`Affordability alert: Original fee of $${originalFee.toFixed(2)} was unaffordable. Fee adjusted down to $${session.fee.toFixed(2)} to meet payment-to-income limits.`);
            } else {
                session.tagEthicalSafeguard("AffordabilityCheckPassed_PTI_ATR");
            }
        }


        session.totalRepayment = session.amount + session.fee;
        UI.show(`Fee: $${session.fee.toFixed(2)}, APR: ${session.aprCalculated.toFixed(2)}% (Capped by ${session.isMilitary ? 'MLA' : 'state regulation'})`);
        session.tagEthicalSafeguard("RegulatoryAPRCapApplied");

        // NEW: Add cost to cumulative tracker in ethical mode
        session.addCost('fee', session.fee, 'Loan finance charge');

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
        UI.tooltip("We offer only clear, opt-in services with no hidden fees.");
        session.tagEthicalSafeguard("Extras_NoHiddenFees_OptIn");
        const optIn = await UI.prompt("Would you like to opt-in for free SMS payment reminders? (yes/no):");
        if (optIn && optIn.toLowerCase() === 'yes') {
            session.record("OptionalServiceOptIn", "SMS_PaymentReminders");
            UI.show("✅ SMS payment reminders enabled. You will receive a reminder 2 days before your due date.");
            session.tagEthicalSafeguard("OptionalService_SMSOptIn");
        } else {
            session.record("OptionalServiceOptIn", "Declined");
        }
        session.addSpecificDisclosureMade("Offered free SMS reminders on an opt-in basis.");
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

        if (config.regulatedSimulateStatePilotProgram && session.renewalsTaken === 0) {
            const pilotOptIn = await UI.prompt("State Pilot Program: You are eligible for a one-time 0% APR, 30-day extension instead of a standard renewal. Would you like to use this option? (yes/no):");
            if (UI.argEquals(pilotOptIn, "yes")) {
                session.fee += 0; // No additional fee
                session.termDays += 30;
                session.renewalsTaken++;
                session.tagEthicalSafeguard("StatePilot_0PercentExtension_Accepted");
                UI.show("✅ 0% APR extension applied. Your new due date is in 30 days with no new fees.");
                return;
            }
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
            
            if (config.regulatedAbilityToRepayLogicDetailed && session.monthlyIncome > 0) {
                const maxPayment = session.monthlyIncome * config.regulatedPaymentToIncomeRatioCap;
                if (renewalFee > maxPayment) {
                    UI.showWarning("Renewal fee exceeds affordability cap based on your income. Proceeding is not recommended.");
                    const proceed = await UI.prompt("Are you sure you want to proceed despite the affordability warning? (yes/no):");
                    if (!proceed || proceed.toLowerCase() !== 'yes') {
                        UI.show("Renewal cancelled due to affordability concerns.");
                        session.tagEthicalSafeguard("Renewal_Declined_Affordability");
                        return;
                    }
                    session.tagEthicalSafeguard("Renewal_Accepted_DespiteAffordabilityWarning");
                }
            }

            session.fee += renewalFee;
            session.totalRepayment += renewalFee;
            session.renewalsTaken++;
            UI.show(`Loan renewed. New fee of $${renewalFee.toFixed(2)} applied. Total renewals: ${session.renewalsTaken}.`);
            session.tagEthicalSafeguard("Renewal_Accepted");
        }
    }
   
    async explainEthicalFrameworks(session, config) {
        UI.show("\n--- ETHICAL FRAMEWORKS EXPLANATION ---");
        UI.tooltip("This section explains the ethical theories guiding this simulation.");
        if (config.eduLectureKantianDeontologyInDepth) {
            UI.show("Kantian Deontology: Focuses on duties and rules. It argues that actions are morally right if they respect the autonomy and dignity of individuals. In lending, this means clear, honest disclosures and never treating a borrower as a mere means to profit.");
            session.tagEthicalSafeguard("KantianDeontologyExplained");
        }
        if (config.eduLectureRawlsianJusticeInDepth) {
            UI.show("Rawlsian Justice: Argues for fairness and structuring society to benefit the least advantaged. In lending, this means creating fee structures and safety nets (like affordability checks) that protect the most financially vulnerable.");
            session.tagEthicalSafeguard("RawlsianJusticeExplained");
        }
        if (config.eduLectureMillianConsequentialismInDepth) {
            UI.show("Millian Consequentialism (Utilitarianism): Focuses on the outcomes of actions. The best action is the one that maximizes overall well-being and minimizes harm. In lending, this means designing loans that are net-positive for the borrower, not ones that lead to devastating debt cycles.");
            session.tagEthicalSafeguard("MillianConsequentialismExplained");
        }
        session.addEducationalModuleShown("EthicalFrameworksExplained");
    }

    async provideEducationalModules(session, config) {
        UI.show("\n--- EDUCATIONAL MODULES ---");
        UI.tooltip("Information on safer financial alternatives and consumer rights.");
        if (config.eduProvideUsuryLawDeepDive) {
            UI.show("Usury Laws and You: These laws exist to protect consumers from excessive interest rates. The effectiveness of these laws varies greatly by state.");
            session.tagEthicalSafeguard("UsuryEducationModule");
        }
        if (config.eduProvideEmpiricalHarmDataComprehensive) {
            UI.show("The Impact of High-Cost Loans: Studies show that repeated use of high-cost, short-term loans is strongly linked to cycles of debt and negative financial outcomes.");
            session.tagEthicalSafeguard("HarmDataEducationModule");
        }
        if (config.eduCompareToCreditUnionPALsDetailed) {
            UI.show("A Safer Alternative - Credit Union PALs: Payday Alternative Loans (PALs) from credit unions are a much safer, lower-cost option for small, short-term loans. They have capped interest rates and are designed to be affordable.");
            session.tagEthicalSafeguard("CreditUnionPALsModule");
        }
        if (config.eduShowDarkPatternExamplesEducationalDeep) {
            UI.show("Recognizing Dark Patterns: Be aware of tactics like hidden fees, pre-checked boxes, and pressure tactics designed to make you act against your own best interests.");
            session.tagEthicalSafeguard("DarkPatternsEducationModule");
        }
        if (config.eduShowFinancialCounselorReferralsLocal) {
            UI.show("Need Help? Financial Counseling: Non-profit credit counseling agencies (like those affiliated with the NFCC) can provide free or low-cost help with debt, budgeting, and financial planning.");
            session.tagEthicalSafeguard("FinancialCounselorReferralModule");
        }
        
        // Additional educational content about modern payday lending regulatory gaps
        if (config.eduShowModernPaydayRegulatoryGaps) {
            UI.showEducationalSnippet("Regulatory Gaps in Modern Payday Lending",
                "🚨 CRITICAL KNOWLEDGE: Understanding Regulatory Gaps\n\n" +
                "Modern payday lending exploits legal loopholes that traditional regulations didn't anticipate:\n\n" +
                "📱 EWA (Earned Wage Access) Apps:\n" +
                "• Regulated as 'payroll services' not lenders\n" +
                "• Avoid APR disclosure requirements by using 'tips'\n" +
                "• No cooling-off periods or ability-to-repay assessments\n" +
                "• Can charge effective APRs of 300-750% legally\n\n" +
                "🏢 Employer-Sponsored Programs:\n" +
                "• Marketed as 'employee benefits' not loans\n" +
                "• Bypass state lending licenses through employer partnerships\n" +
                "• Automatic payroll deduction eliminates debtor protections\n" +
                "• Often buried in employee onboarding with no separate consent\n\n" +
                "⚖️ Legal Framework Gaps:\n" +
                "• Traditional usury laws focus on 'interest' not 'fees'\n" +
                "• Most states lack specific EWA regulations\n" +
                "• Federal oversight is limited and fragmented\n" +
                "• Consumer protections vary dramatically by state\n\n" +
                "💡 PROTECT YOURSELF:\n" +
                "• Calculate true APR even for 'fee-based' services\n" +
                "• Read all employment agreements carefully\n" +
                "• Consider credit union alternatives first\n" +
                "• Report predatory practices to CFPB",
                "Sources: Consumer Financial Protection Bureau, National Consumer Law Center, Pew Charitable Trusts");
            session.tagEthicalSafeguard("ModernPaydayRegulatoryGapsModule");
            session.addEducationalModuleShown("ModernPaydayRegulatoryGaps");
        }

        // NEW: Comprehensive education about all 6 real-world exploitation tactics
        if (config.eduShowRealWorldTactics) {
            UI.showEducationalSnippet("🛡️ REAL-WORLD EXPLOITATION TACTICS: What to Watch For",
                "## ✅ 6 PREDATORY TACTICS USED BY PAYDAY/EWA APPS\n\n" +
                "### 1. 🏦 Automatic Bank Access (ACH) or Payroll Capture\n" +
                "**How it works:**\n" +
                "• Apps like Earnin, DailyPay require linking bank accounts or payroll\n" +
                "• Users sign consent forms for automated withdrawals (often buried in fine print)\n" +
                "• Money is debited automatically on payday - often before users see their paycheck\n" +
                "• Creates overdrafts when insufficient funds available\n" +
                "**Red flags:** Pre-consent checkboxes, auto-withdrawal without user prompt\n\n" +
                "### 2. 💰 Flat Fee ≠ Interest (Usury Evasion)\n" +
                "**How it works:**\n" +
                "• $15 per $100 borrowed = 391% APR if due in 14 days\n" +
                "• Apps use 'tips' or 'express fees' instead of calling it interest\n" +
                "• Avoids triggering state usury caps (which only apply to 'interest')\n" +
                "• APR hidden unless explicitly requested by savvy users\n" +
                "**Red flags:** Fee-only charges, 'tip' interfaces, hidden APR calculations\n\n" +
                "### 3. 🔄 Principal Never Goes Down\n" +
                "**How it works:**\n" +
                "• All payments applied to fees first, principal last\n" +
                "• Rollovers and refinancing options are pre-selected/defaulted\n" +
                "• Users pay hundreds in fees without reducing actual debt\n" +
                "• UI shows 'good standing' even when principal unchanged\n" +
                "**Red flags:** Fee-first payment allocation, rollover defaults\n\n" +
                "### 4. 🎯 Behavioral Traps & UI Manipulation\n" +
                "**How it works:**\n" +
                "• Fake progress bars show 'loan progress' when principal unchanged\n" +
                "• Time-limited refinance offers create false urgency\n" +
                "• Cumulative costs hidden until user specifically requests\n" +
                "• Pre-checked rollover options in renewal forms\n" +
                "**Red flags:** Misleading progress indicators, hidden cost breakdowns\n\n" +
                "### 5. ⚖️ Legal & Regulatory Loopholes\n" +
                "**How it works:**\n" +
                "• Tribal lenders claim sovereign immunity from state laws\n" +
                "• Offshore/out-of-state operations dodge local regulations\n" +
                "• Frame loans as 'tips' or 'services' to avoid lending statutes\n" +
                "• 'Rent-a-bank' schemes use federally chartered banks to bypass state caps\n" +
                "**Red flags:** 'Tribal charter' notices, 'service fee' language\n\n" +
                "### 6. 🔁 Dependency Loops\n" +
                "**How it works:**\n" +
                "• Apps become habitual - users access them every pay cycle\n" +
                "• Constant offers to 'extend' or 'reborrow' before full repayment\n" +
                "• Feels like 'free cash' but creates slow financial drain\n" +
                "• Weekly cash boost offers normalize borrowing behavior\n" +
                "**Red flags:** Frequent reborrow offers, 'cash boost' notifications\n\n" +
                "🎯 **TEACHING GOAL:** Understanding these tactics helps you recognize when financial products are designed to trap rather than help you.",
                "Sources: CFPB Consumer Complaint Database, NCRC Payday Lending Reports, Pew Research");
            session.tagEthicalSafeguard("RealWorldTacticsEducation");
            session.addEducationalModuleShown("RealWorldTactics");
        }

        // NEW: Legal loopholes and usury law education
        if (config.eduShowUsuryLoopholes) {
            UI.showEducationalSnippet("⚖️ USURY LAWS & LEGAL LOOPHOLES: How Predatory Lenders Circumvent Protection",
                "## 🏛️ UNDERSTANDING USURY LAWS & THEIR EVASION\n\n" +
                "### What Are Usury Laws?\n" +
                "• State laws that cap maximum interest rates on loans\n" +
                "• Designed to prevent exploitation of vulnerable borrowers\n" +
                "• Vary dramatically by state (from 6% to unlimited)\n" +
                "• Originally applied to all forms of lending\n\n" +
                "### 🕳️ COMMON LOOPHOLES EXPLOITED:\n\n" +
                "**1. Fee vs. Interest Distinction**\n" +
                "• Usury laws often only cap 'interest', not 'fees'\n" +
                "• Lenders charge flat 'service fees' or 'express processing fees'\n" +
                "• $15 fee on $100 for 14 days = 391% APR, but it's called a 'fee'\n" +
                "• Regulatory gap: fees can be unlimited in many states\n\n" +
                "**2. Tribal Sovereignty Loophole**\n" +
                "• Native American tribes have sovereign immunity\n" +
                "• Payday lenders partner with tribes or claim tribal ownership\n" +
                "• Can ignore state interest rate caps entirely\n" +
                "• Examples: Plain Green, Great Plains Lending, Mobiloans\n\n" +
                "**3. Rent-a-Bank Schemes**\n" +
                "• Partner with federally chartered banks in permissive states\n" +
                "• Banks can 'export' their home state's laws nationwide\n" +
                "• Delaware, South Dakota, Utah have very weak usury laws\n" +
                "• Allows 200%+ APR loans in states with 36% caps\n\n" +
                "**4. Product Classification Games**\n" +
                "• 'Earned Wage Access' ≠ 'loan' (legally)\n" +
                "• 'Credit Service Organizations' ≠ lender\n" +
                "• 'Membership fees' ≠ 'interest charges'\n" +
                "• Each classification avoids different regulations\n\n" +
                "**5. Interstate Commerce Exploitation**\n" +
                "• Online lenders claim jurisdiction shopping\n" +
                "• Operate from states with weakest consumer protections\n" +
                "• Federal law often preempts state law for national banks\n" +
                "• Creates regulatory arbitrage opportunities\n\n" +
                "### 🚨 REAL EXAMPLES OF LOOPHOLE ABUSE:\n" +
                "• **LendUp**: Used CSO model in Texas to charge 400%+ APR\n" +
                "• **Earnin**: 'Tips' avoid all lending regulations entirely\n" +
                "• **Kashable**: 'Employee benefit' bypasses state lending licenses\n" +
                "• **Check Into Cash**: Partners with tribal lenders when state caps are low\n\n" +
                "### 💡 PROTECTION STRATEGIES:\n" +
                "• Always calculate the true APR regardless of fee structure\n" +
                "• Check if your state has specific EWA regulations\n" +
                "• Report suspected usury violations to state attorneys general\n" +
                "• Understand that 'legal' doesn't mean 'fair' or 'ethical'\n" +
                "• Seek alternatives: credit union PALs, employer assistance programs",
                "Sources: National Consumer Law Center, Consumer Federation of America, State Attorney General Reports");
            session.tagEthicalSafeguard("UsuryLoopholesEducation");
            session.addEducationalModuleShown("UsuryLoopholes");
        }
        
        session.addEducationalModuleShown("EducationalModulesProvided");

        // NEW: Enhanced Earnin Tip-vs-Interest Model Education
        if (config.eduShowEarninTipModel) {
            UI.showEducationalSnippet("🎯 EARNIN'S TIP MODEL: How 'Voluntary' Tips Create 300%+ APRs",
                "## 💰 THE EARNIN DECEPTION: 'Tips' vs. Interest\n\n" +
                "### How Earnin's 'Voluntary' Tip Model Works:\n" +
                "• Users access up to $100-$500 of 'earned wages' per pay period\n" +
                "• App suggests a 'voluntary tip' of $3-$15 per advance\n" +
                "• Tips are framed as 'appreciation' not payment for services\n" +
                "• No legal obligation to tip, but social pressure and UI manipulation encourage it\n\n" +
                "### The Mathematical Reality:\n" +
                "• $15 tip on $100 advance for 14 days = **391% APR**\n" +
                "• $5 tip on $100 advance for 14 days = **130% APR**\n" +
                "• Even 'small' $3 tips = **78% APR** (higher than most credit cards)\n" +
                "• These rates exceed payday loan APRs in many states\n\n" +
                "### Legal Loophole Exploitation:\n" +
                "• By calling it a 'tip,' Earnin avoids state usury caps\n" +
                "• No APR disclosure required under Truth in Lending Act (TILA)\n" +
                "• Regulated as 'payroll service' not lender\n" +
                "• Bypasses state licensing requirements for money lenders\n\n" +
                "### Real User Impact Data:\n" +
                "• CFPB complaints show users averaging 8-12 advances per year\n" +
                "• Cumulative tips often exceed $200-$400 annually\n" +
                "• Users report feeling 'obligated' to tip despite voluntary framing\n" +
                "• App notifications increase tip amounts over time\n\n" +
                "### Regulatory Response:\n" +
                "• New York Department of Financial Services investigating tip models (2023)\n" +
                "• California considering specific EWA regulations\n" +
                "• CFPB issued guidance but no enforcement action yet\n" +
                "• Industry argues tips are 'genuine gratuity' not payment\n\n" +
                "🎯 **KEY LESSON:** 'Voluntary' doesn't mean free - calculate the true cost!",
                "Sources: CFPB Consumer Complaint Database, NY DFS Reports, Earnin SEC Filings");
            session.tagEthicalSafeguard("EarninTipModelEducation");
            session.addEducationalModuleShown("EarninTipModel");
        }

        // NEW: CFPB Payment Provisions & ACH Rules Education
        if (config.eduShowCFPBPaymentRules) {
            UI.showEducationalSnippet("⚖️ CFPB PAYMENT RULES: Your Legal Protections Against Overdrafts",
                "## 🏛️ CFPB 2017 PAYDAY LENDING RULE (12 CFR 1041.3)\n\n" +
                "### Key Protection: The 'Two Failed Attempts' Rule\n" +
                "• **Legal Standard:** It is 'unfair and abusive' for lenders to attempt ACH withdrawals after two consecutive failed attempts without obtaining fresh authorization\n" +
                "• **What This Means:** After 2 NSF (insufficient funds) attempts, lender MUST get new consent before trying again\n" +
                "• **Violation Penalty:** Civil penalties up to $1 million per day for systematic violations\n\n" +
                "### How Predatory Lenders Circumvent This:\n" +
                "• **Auto-retry schemes:** Some apps automatically re-authorize behind the scenes\n" +
                "• **Staggered timing:** Split single payment into multiple smaller attempts\n" +
                "• **Different account targeting:** Try checking, then savings, then external accounts\n" +
                "• **'Fresh consent' manipulation:** Buried checkboxes in app updates\n\n" +
                "### Real-World Circumvention Examples:\n" +
                "• **Earnin:** Uses 'Lightning Speed' feature to retry failed payments\n" +
                "• **DailyPay:** Employer integration bypasses individual consent requirements\n" +
                "• **Payactiv:** Payroll deduction avoids ACH rules entirely\n\n" +
                "### Your Rights Under 12 CFR 1041.3:\n" +
                "• Right to receive notice before each payment attempt\n" +
                "• Right to revoke payment authorization at any time\n" +
                "• Right to dispute unauthorized attempts\n" +
                "• Right to file CFPB complaint for violations\n\n" +
                "### How to Protect Yourself:\n" +
                "• **Monitor bank statements** for repeated failed attempts\n" +
                "• **Document violations** - screenshot failed attempt notifications\n" +
                "• **Revoke ACH authorization** in writing to your bank\n" +
                "• **Report violations** to CFPB at consumerfinance.gov\n\n" +
                "### Recent Enforcement Actions:\n" +
                "• CFPB fined Wells Fargo $3 billion for unauthorized account practices (2020)\n" +
                "• Multiple payday lenders sanctioned for ACH violations (2018-2023)\n" +
                "• State AGs pursuing ACH abuse cases independently\n\n" +
                "🎯 **REMEMBER:** Two failed attempts = STOP. Anything more is likely illegal.",
                "Sources: 12 CFR 1041.3, CFPB Enforcement Database, Consumer Complaint Database");
            session.tagEthicalSafeguard("CFPBPaymentRulesEducation");
            session.addEducationalModuleShown("CFPBPaymentRules");
        }

        // NEW: Fee-First Allocation & Texas Rollover Data Education
        if (config.eduShowTexasRolloverData) {
            UI.showEducationalSnippet("📊 TEXAS ROLLOVER REALITY: How Principal Never Decreases",
                "## 🔄 THE ROLLOVER TRAP: Real Data from Texas\n\n" +
                "### Texas Office of Consumer Credit Commissioner Data (2012-2019):\n" +
                "• **Refinances:** $2.01 billion in volume\n" +
                "• **Initial loans:** $1.08 billion in volume\n" +
                "• **Ratio:** Nearly 2:1 - twice as much money in rollovers as new loans!\n" +
                "• **Average borrower:** Takes 8-10 rollovers per year\n\n" +
                "### How Fee-First Allocation Creates This Trap:\n" +
                "**Example Loan Cycle:**\n" +
                "1. Borrow $300, owe $345 (with $45 fee) in 14 days\n" +
                "2. Can't repay $345 → Pay $45 rollover fee, still owe $300\n" +
                "3. Two weeks later → Pay another $45 fee, still owe $300\n" +
                "4. After 6 months → Paid $585 in fees, still owe $300 principal\n" +
                "5. **Total cost:** $885 for a $300 loan that's never repaid\n\n" +
                "### The Mathematics of Fee-First Repayment:\n" +
                "• **Payment allocation order:** Fees first, then principal\n" +
                "• **Result:** Principal remains unchanged until ALL fees are paid\n" +
                "• **Industry term:** 'Interest-only' payments (though called 'fees')\n" +
                "• **Customer perception:** Making 'payments' but debt never shrinks\n\n" +
                "### State-by-State Rollover Volume Data:\n" +
                "• **Texas:** 65% of payday loan volume is refinances\n" +
                "• **Nevada:** 74% of borrowers roll over within 14 days\n" +
                "• **Illinois:** Average borrower in debt 5+ months per year\n" +
                "• **Oklahoma:** 95% of fees come from borrowers with 10+ loans per year\n\n" +
                "### Legal Framework Enabling This:\n" +
                "• Most states allow 'refinancing' without principal reduction requirements\n" +
                "• Fee-first allocation is standard industry practice\n" +
                "• No requirement to disclose cumulative costs across rollovers\n" +
                "• Borrowers often unaware principal isn't decreasing\n\n" +
                "### Industry Defense vs. Reality:\n" +
                "**Industry Claims:** 'Rollovers provide flexibility for cash flow problems'\n" +
                "**Reality:** Designed profit model - 90% of revenue comes from trapped borrowers\n\n" +
                "🎯 **KEY INSIGHT:** If you're only paying fees, you're not paying off debt!",
                "Sources: TX OCCC Annual Reports, Pew Charitable Trusts, CFPB Market Analysis");
            session.tagEthicalSafeguard("TexasRolloverDataEducation");
            session.addEducationalModuleShown("TexasRolloverData");
        }

        // NEW: Usury Cap Evasion Comprehensive Education
        if (config.eduShowUsuryCapEvasion) {
            UI.showEducationalSnippet("🕳️ USURY CAP EVASION: How Lenders Bypass 36% State Limits",
                "## ⚖️ THE 36% PROBLEM: Why State Caps Don't Work\n\n" +
                "### State Usury Cap Reality:\n" +
                "• **36 states** have APR caps between 6%-36%\n" +
                "• **14 states** have weak or no usury caps\n" +
                "• **Payday reality:** 400%+ APR loans operate legally in ALL states\n" +
                "• **The gap:** Modern evasion tactics sidestep traditional protections\n\n" +
                "### Method 1: Flat Fee vs. Interest Loophole\n" +
                "**How it works:**\n" +
                "• State law: 'No interest rate above 36% APR'\n" +
                "• Lender response: 'We don't charge interest, we charge fees'\n" +
                "• $15 fee on $100 for 14 days = 391% APR but legally called a 'service fee'\n" +
                "• **Legal basis:** Most usury laws only apply to 'interest,' not 'fees'\n\n" +
                "### Method 2: Tribal Sovereignty Partnerships\n" +
                "**The scheme:**\n" +
                "• Partner with Native American tribes (sovereign nations)\n" +
                "• Claim tribal law applies, not state law\n" +
                "• Tribal codes often allow unlimited interest rates\n" +
                "• **Examples:** Plain Green (Chippewa Cree), Great Plains (Otoe-Missouria)\n" +
                "• **Legal challenge:** Very difficult to prosecute sovereign entities\n\n" +
                "### Method 3: Rent-a-Bank Schemes\n" +
                "**The structure:**\n" +
                "• Partner with federally chartered bank in permissive state\n" +
                "• Bank originates loan under federal preemption rules\n" +
                "• Immediately sell loan to payday company\n" +
                "• **Key states:** Delaware, South Dakota, Utah (weak usury laws)\n" +
                "• **Legal basis:** Federal law preempts state law for national banks\n\n" +
                "### Method 4: Product Reclassification\n" +
                "**Category games:**\n" +
                "• **'Earned Wage Access'** ≠ loan (avoid lending laws entirely)\n" +
                "• **'Credit Service Organization'** ≠ lender (Texas model)\n" +
                "• **'Membership program'** with 'benefits' ≠ interest charges\n" +
                "• Each classification has different regulatory requirements\n\n" +
                "### Method 5: Interstate Commerce Exploitation\n" +
                "**Jurisdiction shopping:**\n" +
                "• Online operations claim to be based in permissive states\n" +
                "• Choice of law clauses in contracts\n" +
                "• Federal commerce clause complications\n" +
                "• **Result:** Borrower in 36% cap state gets 400% APR loan legally\n" +
                "### Real Examples of Successful Evasion:\n" +
                "• **LendUp:** Used Texas CSO model to charge 400%+ APR nationwide\n" +
                "• **Earnin:** 'Tips' completely avoid all usury regulations\n" +
                "• **Spotloan:** Tribal partnership allows 490% APR in 36% cap states\n" +
                "• **Kashable:** 'Employee benefit' classification bypasses state lending licenses\n\n" +
                "### Why Enforcement Is Difficult:\n" +
                "• **Jurisdictional complexity:** Multiple state and federal agencies\n" +
                "• **Legal uncertainty:** Novel business models outpace regulation\n" +
                "• **Industry lobbying:** Significant political influence\n" +
                "• **Consumer confusion:** Many don't realize they're being overcharged\n\n" +
                "🎯 **PROTECTION STRATEGY:** Always calculate true APR regardless of how fees are labeled!",
                "Sources: National Consumer Law Center, CRL Rent-a-Bank Reports, State AG Enforcement Actions");
            session.tagEthicalSafeguard("UsuryCapEvasionEducation");
            session.addEducationalModuleShown("UsuryCapEvasion");
        }
    }

    // NEW: Enhanced Kantian Informed Consent Framework
    async kantianInformedConsentFramework(session, config) {
        UI.showSectionHeader("🎓 KANTIAN INFORMED CONSENT FRAMEWORK", "Enhanced Ethical Mode");
        
        // Kant's Categorical Imperative applied to lending
        UI.showEducationalSnippet("Kant's Categorical Imperative in Lending",
            "📚 KANT'S CATEGORICAL IMPERATIVE: 'Act only according to that maxim whereby you can at the same time will that it should become a universal law.'\n\n" +
            "🏛️ **APPLIED TO LENDING:**\n" +
            "• Would you want ALL lenders to use the same disclosure practices you're using?\n" +
            "• Would you want ALL borrowers to be treated the way you're treating this borrower?\n" +
            "• Does this lending practice respect the borrower's rational autonomy?\n" +
            "• Are you treating the borrower as an END in themselves, not merely as a MEANS to profit?\n\n" +
            "🔍 **INFORMED CONSENT REQUIREMENTS (Kantian):**\n" +
            "1. **Rational Understanding**: Borrower must comprehend all terms\n" +
            "2. **Voluntary Choice**: No coercion, pressure, or manipulation\n" +
            "3. **Material Disclosure**: All costs, risks, and alternatives revealed\n" +
            "4. **Competence Assessment**: Borrower capable of rational decision-making\n" +
            "5. **Dignity Preservation**: Process respects human dignity and autonomy",
            "Sources: Immanuel Kant's Groundwork for the Metaphysics of Morals (1785), Applied Ethics in Financial Services");
        session.addEducationalModuleShown("KantianInformedConsentFramework");

        // Multi-layered consent verification
        UI.show("\n🎯 **KANTIAN CONSENT VERIFICATION PROCESS**");
        
        // Layer 1: Rational Understanding Test
        UI.show("\n📖 LAYER 1: RATIONAL UNDERSTANDING ASSESSMENT");
        const understandingTest = await UI.prompt(
            "Before we proceed, please demonstrate your understanding by answering: " +
            "What is the primary ethical concern with charging fees that exceed the principal amount borrowed? " +
            "(Type your answer - minimum 10 words required)"
        );
        
        if (!understandingTest || understandingTest.length < 10) {
            UI.showWarning("Kantian Autonomy Violation: Insufficient understanding demonstrated. Ethical lending requires genuine comprehension.");
            session.deniedByLimit = true;
            session.denialReason = "Failed Kantian rational understanding assessment";
            session.tagEthicalSafeguard("KantianConsentFailed_InsufficientUnderstanding");
            return;
        }
        
        session.kantianUnderstandingResponse = understandingTest;
        session.tagEthicalSafeguard("KantianConsent_RationalUnderstandingVerified");

        // Layer 2: Pressure/Coercion Check
        UI.show("\n🛡️ LAYER 2: COERCION ASSESSMENT");
        const pressureCheck = await UI.prompt(
            "Kantian ethics requires voluntary choice. On a scale of 1-10, how much external pressure " +
            "do you feel to take this loan right now? (1 = No pressure, 10 = Extreme pressure): "
        );
        
        const pressureLevel = parseInt(pressureCheck);
        if (pressureLevel > 7) {
            UI.showWarning("High pressure detected. Kantian ethics requires autonomous choice free from coercion.");
            const proceedCheck = await UI.prompt(
                "We recommend waiting 24 hours before making this decision. Do you want to continue anyway? (yes/no): "
            );
            if (!UI.argEquals(proceedCheck, "yes")) {
                session.deniedByLimit = true;
                session.denialReason = "Borrower chose to wait due to pressure concerns";
                session.tagEthicalSafeguard("KantianConsent_PressureDetected_WaitChosen");
                return;
            }
            session.tagEthicalSafeguard("KantianConsent_PressureDetected_ProceedAnyway");
        }

        // Layer 3: Alternative Consideration
        UI.show("\n🔄 LAYER 3: ALTERNATIVES CONSIDERATION");
        UI.showEducationalSnippet("Alternative Financial Options (Required Kantian Disclosure)",
            "🏦 **SAFER ALTERNATIVES TO CONSIDER FIRST:**\n\n" +
            "1. **Credit Union Payday Alternative Loans (PALs)**\n" +
            "   • 28% APR maximum by federal law\n" +
            "   • $200-$1,000 loan amounts\n" +
            "   • No rollovers allowed\n" +
            "   • Find: https://mapping.ncua.gov/\n\n" +
            "2. **Employee Assistance Programs**\n" +
            "   • Many employers offer emergency loans\n" +
            "   • Often 0% or very low interest\n" +
            "   • Contact your HR department\n\n" +
            "3. **Community Development Financial Institutions (CDFIs)**\n" +
            "   • Non-profit lenders serving underbanked communities\n" +
            "   • Much lower rates than payday lenders\n" +
            "   • Find: https://www.cdfifund.gov/\n\n" +
            "4. **Earned Income Tax Credit (EITC) Advance**\n" +
            "   • Free tax preparation with advance on refunds\n" +
            "   • Available through VITA programs\n\n" +
            "5. **Local Emergency Assistance Programs**\n" +
            "   • Churches, food banks, United Way chapters\n" +
            "   • Often provide emergency financial assistance\n" +
            "   • Call 2-1-1 for local resources",
            "Sources: National Credit Union Administration, Consumer Financial Protection Bureau");

        const alternativesConsidered = await UI.prompt(
            "Have you already explored these safer alternatives? (yes/no): "
        );
        
        if (!UI.argEquals(alternativesConsidered, "yes")) {
            const exploreNow = await UI.prompt(
                "Kantian ethics requires full information. Would you like to explore these alternatives first? (yes/no): "
            );
            if (UI.argEquals(exploreNow, "yes")) {
                session.deniedByLimit = true;
                session.denialReason = "Borrower chose to explore safer alternatives first";
                session.tagEthicalSafeguard("KantianConsent_AlternativesChosen");
                return;
            }
        }

        // Layer 4: Dignity and Respect Affirmation
        UI.show("\n👑 LAYER 4: HUMAN DIGNITY AFFIRMATION");
        UI.show("Kantian ethics requires that we treat you as an END in yourself, not merely as a means to our profit.");
        UI.show("This means: Your wellbeing matters more than our revenue. Your autonomy is paramount.");
        
        const dignityAffirmation = await UI.prompt(
            "Do you feel this process has respected your dignity and autonomy so far? (yes/no): "
        );
        
        if (!UI.argEquals(dignityAffirmation, "yes")) {
            UI.show("We apologize. Ethical lending must respect human dignity. Please let us know how we can improve.");
            session.tagEthicalSafeguard("KantianConsent_DignityViolationReported");
        } else {
            session.tagEthicalSafeguard("KantianConsent_DignityRespected");
        }

        // Final Kantian Consent Confirmation
        UI.show("\n✅ **FINAL KANTIAN CONSENT VERIFICATION**");
        const finalConsent = await UI.prompt(
            "Having completed this comprehensive consent process, do you freely choose to proceed " +
            "with full understanding of costs, alternatives, and risks? (I FREELY CONSENT / no): "
        );
        
        if (!UI.argEquals(finalConsent, "I FREELY CONSENT")) {
            session.deniedByLimit = true;
            session.denialReason = "Did not provide final Kantian consent";
            session.tagEthicalSafeguard("KantianConsentFailed_FinalVerification");
            return;
        }

        session.kantianConsentCompleted = true;
        session.tagEthicalSafeguard("KantianConsent_FullyCompleted");
        UI.show("✅ Kantian informed consent process completed successfully.");
    }

    // NEW: Comprehensive Usury Loophole and Legal Evasion Education
    async comprehensiveUsuryEducation(session, config) {
        UI.showSectionHeader("⚖️ COMPREHENSIVE USURY LAW & EVASION TACTICS", "Legal Education Module");
        
        // Modern Usury Evasion Tactics - Detailed Analysis
        UI.showEducationalSnippet("🕳️ THE 8 MAJOR USURY LAW EVASION TACTICS (2025 Update)",
            "## 🚨 HOW PREDATORY LENDERS CIRCUMVENT CONSUMER PROTECTIONS\n\n" +
            "### 1. 📋 FEE vs. INTEREST SEMANTIC GAMES\n" +
            "**How it works:**\n" +
            "• Most state usury laws only cap 'interest rates,' not 'fees'\n" +
            "• Lenders charge $15 'processing fee' instead of 15% interest\n" +
            "• $15 fee on $100 for 14 days = 391% APR, but legally it's 'fee-based'\n" +
            "• Some states have closed this loophole, others haven't\n\n" +
            "**Real Examples:**\n" +
            "• Check Into Cash: '$15 fee per $100' (not 'interest')\n" +
            "• Advance America: 'Finance charge' language\n" +
            "• Quick Cash: 'Service fee' terminology\n\n" +
            "### 2. 🏛️ TRIBAL SOVEREIGNTY EXPLOITATION\n" +
            "**How it works:**\n" +
            "• Native American tribes have sovereign immunity from state laws\n" +
            "• Payday lenders form partnerships or lease agreements with tribes\n" +
            "• Claim tribal ownership to ignore state interest rate caps\n" +
            "• Often just 1-2% tribal ownership, 98% non-tribal control\n\n" +
            "**Real Examples:**\n" +
            "• Plain Green (Chippewa Cree): 600%+ APR loans\n" +
            "• Great Plains Lending (Otoe-Missouria): 400%+ APR\n" +
            "• Mobiloans (Tunica-Biloxi): 365%+ APR\n" +
            "• Spotloan (Turtle Mountain Band): 490%+ APR\n\n" +
            "### 3. 🏦 RENT-A-BANK SCHEMES\n" +
            "**How it works:**\n" +
            "• Partner with federally chartered banks in permissive states\n" +
            "• Federal law allows banks to 'export' home state laws nationwide\n" +
            "• Delaware, South Dakota, Utah have weak/no usury caps\n" +
            "• Bank originates loan, immediately sells to payday lender\n\n" +
            "**Real Examples:**\n" +
            "• LendUp + Cross River Bank (NJ): Bypassed California's 36% cap\n" +
            "• OppLoans + FinWise Bank (UT): 160%+ APR in cap states\n" +
            "• Rise + Republic Bank (UT): 300%+ APR loans\n\n" +
            "### 4. 🎭 PRODUCT CLASSIFICATION DECEPTION\n" +
            "**How it works:**\n" +
            "• Frame predatory products as something other than 'loans'\n" +
            "• Each classification avoids different regulations\n" +
            "• Regulatory arbitrage through creative legal definitions\n\n" +
            "**Product Types:**\n" +
            "• 'Earned Wage Access' ≠ loans (Earnin, DailyPay)\n" +
            "• 'Credit Service Organizations' ≠ lenders (Texas CSO model)\n" +
            "• 'Membership fees' ≠ interest (some tribal lenders)\n" +
            "• 'Tips' ≠ required payments (Earnin's model)\n\n" +
            "### 5. 🌐 INTERSTATE COMMERCE JURISDICTION SHOPPING\n" +
            "**How it works:**\n" +
            "• Online lenders claim operation from states with weak laws\n" +
            "• Federal law often preempts state law for national banks\n" +
            "• Complex legal questions about which state's laws apply\n" +
            "• Enforcement becomes difficult across state lines\n\n" +
            "**Tactics:**\n" +
            "• Delaware incorporation (weak usury laws)\n" +
            "• South Dakota operations (no usury cap)\n" +
            "• Offshore servers and shell companies\n" +
            "• National bank charter shopping\n\n" +
            "### 6. 📱 FINTECH REGULATORY GAPS\n" +
            "**How it works:**\n" +
            "• New technology outpaces regulation\n" +
            "• Mobile apps and digital payments create regulatory uncertainty\n" +
            "• Federal vs. state regulatory jurisdiction unclear\n" +
            "• Industry lobbying prevents updated regulations\n\n" +
            "**Examples:**\n" +
            "• EWA apps: No federal regulation at all\n" +
            "• Cryptocurrency lending: Regulatory gray area\n" +
            "• AI-driven loan decisioning: Limited oversight\n" +
            "• Embedded finance: Unclear licensing requirements\n\n" +
            "### 7. 🤝 EMPLOYER PARTNERSHIP SCHEMES\n" +
            "**How it works:**\n" +
            "• Partner with employers to offer 'employee benefits'\n" +
            "• Payroll deduction avoids traditional debt collection laws\n" +
            "• Often buried in employee onboarding documents\n" +
            "• Employer partnership legitimizes predatory product\n\n" +
            "**Real Examples:**\n" +
            "• Kashable: 'Employee financial wellness'\n" +
            "• HoneyBee: Employer-sponsored advances\n" +
            "• PayActiv: HR integration for wage access\n\n" +
            "### 8. ⚖️ ARBITRATION & LEGAL SYSTEM ABUSE\n" +
            "**How it works:**\n" +
            "• Mandatory arbitration clauses block class action lawsuits\n" +
            "• Individual arbitration too expensive for small-dollar disputes\n" +
            "• Choice of law clauses force disputes into favorable jurisdictions\n" +
            "• Creates de facto immunity from consumer protection enforcement\n\n" +
            "**Impact:**\n" +
            "• 99% of arbitration clauses are never challenged\n" +
            "• Borrowers can't band together for class actions\n" +
            "• Arbitrators often favor repeat-player businesses\n" +
            "• Regulatory agencies can't use private lawsuits as enforcement tool",
            "Sources: Consumer Financial Protection Bureau, National Consumer Law Center, Pew Charitable Trusts, State Attorney General Reports");
        
        session.addEducationalModuleShown("ComprehensiveUsuryEvasionTactics");

        // Case Studies of Successful Regulatory Enforcement
        UI.showEducationalSnippet("⚔️ REGULATORY ENFORCEMENT SUCCESS STORIES",
            "## 🏛️ WHEN REGULATORS FIGHT BACK: SUCCESSFUL ENFORCEMENT ACTIONS\n\n" +
            "### 🎯 CFPB vs. EARNIN (2022-2024)\n" +
            "**The Issue:** Earnin's 'tip' model was really disguised lending\n" +
            "**Action:** CFPB investigation into mandatory tipping pressure\n" +
            "**Result:** $XX million settlement, required APR disclosure improvements\n" +
            "**Lesson:** Even 'tips' can be regulated as loan payments\n\n" +
            "### 🎯 NEW YORK vs. TRIBAL LENDERS (2020-2023)\n" +
            "**The Issue:** Tribal lenders ignoring NY's 25% APR cap\n" +
            "**Action:** NY DFS blocked payment processors, sued in federal court\n" +
            "**Result:** Most tribal lenders stopped serving NY customers\n" +
            "**Lesson:** State enforcement can work even against tribal immunity\n\n" +
            "### 🎯 COLORADO'S SUCCESSFUL RATE CAP (2019-2024)\n" +
            "**The Issue:** 400%+ APR payday loans trapping borrowers\n" +
            "**Action:** Ballot initiative implemented 36% APR cap on all loans\n" +
            "**Result:** Payday loan volume dropped 95%, no credit access crisis\n" +
            "**Lesson:** Rate caps work and don't harm credit access for most borrowers\n\n" +
            "### 🎯 CALIFORNIA vs. RENT-A-BANK SCHEMES (2021-2024)\n" +
            "**The Issue:** Out-of-state banks bypassing CA's 36% APR cap\n" +
            "**Action:** CA DFPI issued clear guidance, threatened enforcement\n" +
            "**Result:** Major lenders stopped high-rate lending in California\n" +
            "**Lesson:** Clear regulatory guidance can deter evasion\n\n" +
            "### 🎯 FEDERAL TRADE COMMISSION ACTIONS\n" +
            "**The Issue:** Deceptive advertising and illegal collection practices\n" +
            "**Action:** FTC sued multiple payday lender networks\n" +
            "**Result:** $XXX million in consumer refunds, shutdown of illegal operations\n" +
            "**Lesson:** Federal agencies have tools to fight predatory lending\n\n" +
            "### 💪 WHAT WORKS IN ENFORCEMENT:\n" +
            "• **Follow the Money**: Block payment processors and bank relationships\n" +
            "• **Multi-Agency Coordination**: State and federal agencies working together\n" +
            "• **Clear Legal Standards**: Bright-line rules are easier to enforce\n" +
            "• **Consumer Complaints**: CFPB database helps identify bad actors\n" +
            "• **Legislative Action**: Ballot initiatives and state laws can be very effective",
            "Sources: Consumer Financial Protection Bureau Enforcement Actions, State Attorney General Press Releases, Academic Research on Payday Lending Regulation");
        
        session.addEducationalModuleShown("RegulatoryEnforcementSuccesses");

        // Interactive Loophole Recognition Test
        UI.show("\n🎓 **INTERACTIVE LOOPHOLE RECOGNITION TEST**");
        const loopholeTest = await UI.prompt(
            "TEST YOUR KNOWLEDGE: A lender offers '$15 fee per $100 borrowed for 14 days' and " +
            "claims this is not subject to your state's 36% APR cap because it's a 'fee not interest.' " +
            "What is the actual APR of this loan? (Calculate and enter the percentage): "
        );
        
        const correctAPR = 391.07; // (15/100) * (365/14) * 100
        const userAPR = parseFloat(loopholeTest);
        
        if (Math.abs(userAPR - correctAPR) < 10) {
            UI.show("✅ CORRECT! You calculated approximately 391% APR. You can now recognize fee-based usury evasion!");
            session.tagEthicalSafeguard("UsuryEducation_LoopholeRecognitionPassed");
        } else {
            UI.show(`📚 LEARNING MOMENT: The correct APR is 391%. Here's the calculation: ($15 ÷ $100) × (365 ÷ 14) × 100% = 391%`);
            UI.show("This is why predatory lenders use 'fees' instead of 'interest' - it sounds smaller but the math is the same!");
            session.tagEthicalSafeguard("UsuryEducation_LoopholeRecognitionLearning");
        }
        
        session.addEducationalModuleShown("InteractiveLoopholeTest");
    }
}

export { Ethical };
