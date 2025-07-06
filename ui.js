// ui.js

// --- EXPLANATION: Getting Pointers to HTML Elements ---
// In C++, you interact with the console. In JS, we interact with the HTML page.
// `document.getElementById('id_name')` finds an HTML element with a specific id.
// `const` is like a C++ `const` variable - it cannot be reassigned.
const outputElement = document.getElementById('output');
const inputArea = document.getElementById('input-area');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-input');
// New inputs from index.html
const stateInput = document.getElementById('state-input');
const amountInput = document.getElementById('amount-input');
const termInput = document.getElementById('term-input');
const scenarioSelect = document.getElementById('scenario-select');
const urgencyBanner = document.getElementById('urgency-banner');
const timerElement = document.getElementById('timer');

// --- EXPLANATION: The UI Namespace ---
// This `UI` object groups all our user interface functions, just like the `UI` namespace in C++.
export const UI = {
    _echo: null,
    _ghost: null,

    init: function(echo, ghost) {
        this._echo = echo;
        this._ghost = ghost;
    },

    // JS equivalent of `void show(const std::string& text)`
    show: (text) => {
        outputElement.textContent += text + '\n';
        outputElement.scrollTop = outputElement.scrollHeight; // Auto-scrolls to the bottom
    },
    showHTML: (html) => {
        outputElement.innerHTML += html;
        outputElement.scrollTop = outputElement.scrollHeight;
    },
    // JS equivalent of `void show_raw(const std::string& text)`
    show_raw: (text) => {
        outputElement.textContent += text;
        outputElement.scrollTop = outputElement.scrollHeight;
    },
    // JS equivalent of `std::string prompt(const std::string& s_text)`
    // `async/await` and `Promise` are used to handle user input without freezing the browser.
    prompt: function(s_text) {
        if (this._ghost) this._ghost.observe('prompt_shown');
        const startTime = Date.now();

        UI.show_raw(s_text);
        inputArea.style.display = 'flex';
        userInput.focus();

        return new Promise(resolve => {
            const listener = () => {
                const value = userInput.value;
                UI.show(value); // Echo the user's input

                if (this._echo) {
                    const timeSpent = Date.now() - startTime;
                    this._echo.logAction('decision_made', { prompt: s_text, value, timeSpent });
                }
                if (this._ghost) this._ghost.observe('prompt_answered', { value });

                userInput.value = ''; // Clear the input box
                inputArea.style.display = 'none'; // Hide the input box again
                submitBtn.removeEventListener('click', listener);
                document.removeEventListener('keydown', keydownListener);
                resolve(value);
            };
            const keydownListener = (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    listener();
                }
            };
            submitBtn.addEventListener('click', listener);
            document.addEventListener('keydown', keydownListener);
        });
    },
    askNum: async function(s_text) {
        while (true) {
            const v_str = await this.prompt(s_text);
            const num = parseFloat(v_str);
            if (!isNaN(num) && num >= 0) return num;
            UI.show("⚠️ Invalid input. Please enter a valid non-negative number.");
        }
    },
    argEquals: (str1, str2) => str1.toLowerCase() === str2.toLowerCase(),
    showSectionHeader: (title, modeContext = "") => {
        let fullTitle = `\n\n======================================================================\n`;
        fullTitle += `--- ${title} ---`;
        if (modeContext) fullTitle += ` (${modeContext})`;
        fullTitle += `\n======================================================================\n`;
        UI.show(fullTitle);
    },
    showSubSectionHeader: (title) => UI.show(`\n--- ${title} ---\n`),
    showFinePrint: (text) => UI.tiny(text),
    tiny: (text) => UI.show(`(Fine Print) ${text}`),
    tooltip: (text) => UI.show(`🛈 INFO/TIP: ${text}`),
    legalNotice: (text) => UI.show(`⚖️ LEGAL/REGULATORY NOTICE: ${text}`),
    showWarning: (message) => UI.show(`⚠️ IMPORTANT WARNING: ${message}`),
    
    // NEW: Missing UI methods
    showTimePressure: (message) => {
        UI.show(`🚨 ${message} 🚨`);
    },

    // --- EXPLANATION: The Ethical Namespace ---
    // This `Ethical` object contains functions related to ethical considerations and compliance.
    Ethical: {
        debriefShown: false,

        // NEW: Cumulative Cost Tracker logic
        cumulativeCostTracker: {
            totalPaid: 0,
            costBreakdown: {},

            addPayment: function(amount, type = 'payment') {
                this.totalPaid += amount;
                if (!this.costBreakdown[type]) {
                    this.costBreakdown[type] = 0;
                }
                this.costBreakdown[type] += amount;
            },
            getCumulativeCost: function() {
                return this.totalPaid;
            },
            getCostBreakdown: function() {
                return this.costBreakdown;
            },
            reset: function() {
                this.totalPaid = 0;
                this.costBreakdown = {};
            }
        },

        // NEW: Ethical safeguard tagging
        tagEthicalSafeguard: (safeguardId) => {
            // In a real application, this would log to a server or analytics
            console.log(`Ethical safeguard triggered: ${safeguardId}`);
        },
        // NEW: Dark pattern tagging for exploitative mechanics
        tagDarkPattern: (patternId) => {
            // In a real application, this would log to a server or analytics
            console.log(`Dark pattern triggered: ${patternId}`);
        },

        showDebrief: () => {
            if (Ethical.debriefShown) return;
            Ethical.debriefShown = true;
            UI.showEducationalSnippet("Ethical Debrief",
                "This simulation demonstrated key ethical principles:\n" +
                " • Kant: Treating you as an end, not just a means, by ensuring transparency.\n" +
                " • Mill: Preventing harm by designing an affordable loan that avoids a debt trap.\n" +
                " • Rawls: Promoting fairness by not taking undue advantage of a difficult situation."
            );
        }
    }
};

function defineTermInteractively(term, definition) {
    const resp = UI.prompt(`Would you like a plain English definition of '${term}'? (yes/no)`);
    if (UI.argEquals(resp, "yes")) {
        UI.show(`Plain Language Definition: '${term}' means: ${definition}`);
        // In a real app, we'd log this interaction to the session.
    }
}

function printUsuryHistory() {
    UI.showEducationalSnippet("A Deep Dive into the History of Usury Laws",
        "- ~1792 BCE, Babylon (Code of Hammurabi): Earliest known regulations. Sets ~20-33% annual cap on grain/silver loans.\n" +
        "- Middle Ages (Church Councils): Usury (charging any interest) widely condemned as sinful.\n" +
        "- 19th Century USA: States begin enacting their own usury laws, often with caps around 6-12%.\n" +
        "- 1978 CE, USA: Marquette Nat. Bank v. First of Omaha decision allows national banks to export interest rates of their home state, weakening state usury laws.\n" +
        "- 2006 CE, USA: Military Lending Act (MLA) caps most loans to active-duty military at 36% MAPR.\n" +
        "- 2010-2020s CE, USA: CFPB actions and state-level reforms often target a ~36% APR cap for small-dollar loans."
    );
}

function printHarmData() {
    UI.showEducationalSnippet("Empirical Data on Payday Loan Harms (Sources: Pew, CFPB, CRL)",
        "- The Debt Trap is Real: ~80% of payday loans are re-borrowed within a month.\n" +
        "- Unaffordable Payments: A typical loan payment consumes about one-third of a borrower's paycheck.\n" +
        "- Bank Penalties Magnify Harm: Failed debits often trigger expensive overdraft fees from the borrower's bank.\n" +
        "- Long-Term Indebtedness: Many borrowers pay more in fees over time than the original amount borrowed."
    );
}

function printStateUsuryMap(state, rules) {
    let state_info = `State usury laws vary dramatically. Examples:\n` +
                     `  - Restrictive States (e.g., NY, NJ, AR): Cap APRs around 36% or lower.\n` +
                     `  - Permissive States (e.g., UT, ID, NV): Allow very high APRs, often 300-700%.\n` +
                     `  - Texas (TX) - CAB Loophole: Allows massive 'service fees' on top of a 10% interest loan, leading to effective APRs >600%.\n`;
    if (state && rules) {
        state_info += `\nFor your selected state (${state} - ${rules.stateName}):\n` +
                      `    Key Statute(s): ${rules.keyStatuteCitation}\n` +
                      `    APR Cap: ~${rules.aprCap > 0 ? rules.aprCap : "Varies"}%\n` +
                      `    Max Rollovers: ${rules.allowRollover ? (rules.maxRenewals === -1 ? "Unlimited" : rules.maxRenewals) : "Prohibited"}\n`;
    }
    UI.showEducationalSnippet("State-by-State Usury & Payday Loan Regulation Snapshot", state_info);
}

function printCounselorReferral(zipCode) {
    let referral_info = "If you are facing financial difficulties, consider contacting a non-profit credit counseling agency accredited by the NFCC or FCAA.\n";
    if (zipCode) {
        referral_info += `For local resources near ZIP code ${zipCode}, you can search online for 'NFCC credit counselor ${zipCode}'.\n`;
    } else {
        referral_info += "You can visit nfcc.org or fcaa.org to find a certified credit counselor nationwide.\n";
    }
    UI.showEducationalSnippet("Financial Counseling & Debt Management Resources", referral_info);
}

function showPhilosophyPrimer() {
    UI.showEducationalSnippet("Ethical Framework Primer (Belmont Report Principles)",
        "This simulation is guided by core ethical principles:\n" +
        "1. Respect for Persons (Autonomy): Each person has the right to make their own informed decisions.\n" +
        "2. Beneficence (Do Good): The goal should be to provide a benefit and improve well-being.\n" +
        "3. Non-Maleficence (Do No Harm): Avoid practices that cause predictable harm, like debt traps.\n" +
        "4. Justice (Fairness): Financial products should be distributed fairly and not exploit vulnerable groups."
    );
}

function showCostBenefitLedger(session) {
    UI.showSubSectionHeader("Transparent Cost-Benefit Ledger");
    UI.show(` • Principal Loan Amount: $${session.amount.toFixed(2)} (These are the funds you will receive)`);
    UI.show(` • Finance Charge (Fee): $${session.fee.toFixed(2)} (This covers platform costs, risk, and a small margin)`);
    UI.show(` • Community Investment: $5.00 (A fixed amount contributed to a local financial literacy fund)`);
    UI.show(` → Total Repayment: $${(session.amount + session.fee + 5).toFixed(2)}`);
}

function showEthicalDebrief() {
    UI.showSubSectionHeader("Ethical Debrief");
    UI.show("This simulation demonstrated key ethical principles:\n" +
        " • Kant: Treating you as an end, not just a means, by ensuring transparency.\n" +
        " • Mill: Preventing harm by designing an affordable loan that avoids a debt trap.\n" +
        " • Rawls: Promoting fairness by not taking undue advantage of a difficult situation."
    );
}

function showDarkPatternParallels() {
    UI.showEducationalSnippet("Dark Patterns: From Loans to Social Media",
        "The manipulative tactics you just saw are not unique to lending. They are common across the web:\n" +
        " • False Urgency (Countdown Timers): Used by shopping sites like Temu and Shein to rush you into buying.\n" +
        " • Hidden Costs (Fee Layering/Guilt Tipping): Similar to how subscription services or games hide fees until the last step or use confusing add-ons.\n" +
        " • Forced Continuity (Difficult Rollover Opt-Out): Like video platforms (TikTok, YouTube) that auto-play the next video, making it hard to stop.\n" +
        "Recognizing these patterns helps you stay in control of your decisions online."
    );
}


function showAmortizationSchedule(session) {
    UI.showSubSectionHeader("Loan Repayment Schedule");
    const totalRepayment = session.amount + session.fee;
    if (session.installmentPlanAccepted) {
        const terms = session.installmentPlanTerms || 4; // Default to 4 if not set
        const payment = totalRepayment / terms;
        UI.show(`Installment Loan: $${totalRepayment.toFixed(2)} to be repaid in ${terms} monthly installments of ~$${payment.toFixed(2)}.`);
    } else {
        UI.show(`Single Payment Loan: Full payment of $${totalRepayment.toFixed(2)} due in ${session.termDays} days.`);
    }
}

// NEW: Adding the missing methods back without removing existing content
UI.showFakeTestimonial = (testimonial, author) => {
    UI.showSubSectionHeader("🌟 Hear from our 'satisfied' customers! 🌟");
    UI.show(`"${testimonial}"`);
    UI.show(`    - ${author}, [City, ST]`);
    UI.tiny("*(Testimonial may be dramatized or from a paid actor. Individual results vary significantly.)*");
};

UI.showLegalCaseNotice = (caseName) => {
    UI.legalNotice(`(Relevant Legal Precedent: ${caseName})`);
};

UI.showEducationalSnippet = (title, content, sourceRefs = "") => {
    UI.showSubSectionHeader("EDUCATIONAL MODULE: " + title);
    UI.show(content);
    if (sourceRefs) UI.tiny("Key References/Sources: " + sourceRefs);
};

UI.showEthicalPrinciple = (philosopher, principle, coreIdea, application) => {
    UI.showSubSectionHeader(`ETHICAL FRAMEWORK: ${philosopher} - ${principle}`);
    UI.tooltip(`Core Idea: ${coreIdea}`);
    UI.show(`Application Here: ${application}`);
};

UI.showLoanSummaryCard = (s, c, actualAPR) => {
    UI.showSectionHeader("LOAN SUMMARY CARD (TILA Disclosures)", "Regulated Ethical Redesign");
    UI.tooltip("Please review each item. Federal law (TILA) requires these disclosures so you can understand the cost of credit.");
    UI.show(`1. Principal Loan Amount (Amount Financed): $${s.amount.toFixed(2)}`);
    UI.show(`2. Total Finance Charge (Total Cost of Credit): $${s.fee.toFixed(2)}`);
    UI.show(`3. Annual Percentage Rate (APR): ${actualAPR.toFixed(2)}%`);
    UI.show(`4. Total of Payments (Amount Financed + Finance Charge): $${s.totalRepayment.toFixed(2)}`);
    UI.show(`5. Loan Term: ${s.termDays} days`);
    if (c.regulatedShowRescissionNoticeDetailed && c.regulatedRequireCoolingOffPeriod) {
        UI.show(`6. Right to Cancel (Rescission Period): Yes, you may cancel without penalty by a specified deadline (typically 3 business days).`);
    }
};

UI.showComplianceReport = (s, c) => {
    UI.showSubSectionHeader("Compliance Report");
    UI.show(`Consent provided: ${s.consentGiven ? 'yes' : 'no'}`);
    UI.show(`APR cap applied: ${s.aprCalculated <= c.regulatedMaxAPRCap ? 'yes' : 'no'}`);
    UI.show(`TILA disclosures shown: ${s.fullDisclosureProvided ? 'yes' : 'no'}`);
    UI.show(`Rollover offered: ${c.regulatedAllowRollover ? 'yes' : 'no'}`);
    UI.show(`Cooling-off offered: ${c.regulatedRequireCoolingOff ? 'yes' : 'no'}`);
};

UI.conductKnowledgeQuiz = async (s, c) => {
    UI.showSubSectionHeader(`KNOWLEDGE ASSESSMENT QUIZ`);
    s.quizAttemptsTotal++;
    const questions = [
        { q: "What does APR (Annual Percentage Rate) primarily help you do?", o: ["Calculate your exact monthly payment.", "Compare the total cost of different loans.", "Determine the lender's profit margin."], a: 1 },
        { q: "A 'debt trap' in the context of payday loans usually means:", o: ["A one-time emergency loan that is paid back on time.", "A cycle of re-borrowing due to unaffordable loan terms.", "A government program to help borrowers."], a: 1 },
        { q: "Which ethical principle most directly relates to ensuring a borrower fully understands loan terms before agreeing?", o: ["Rawlsian Justice (Fairness)", "Kantian Autonomy (Respect for Persons)", "Millian Utility (Greatest Good)"], a: 1 }
    ];

    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
        const item = questions[i];
        UI.show(`\n${i + 1}. ${item.q}`);
        item.o.forEach((opt, idx) => UI.show(`  ${idx + 1}. ${opt}`));
        const ans = await UI.askNum("Enter your choice (number): ");
        if (ans - 1 === item.a) {
            UI.show("✅ Correct!");
            correctCount++;
        } else {
            UI.show(`❌ Incorrect. The correct answer is ${item.a + 1}. ${item.o[item.a]}`);
        }
    }
    s.quizQuestionsCorrect = correctCount;
    s.quizQuestionsTotal = questions.length;
    s.quizPassedOverall = (correctCount / questions.length) >= 0.67; // Pass if 2/3 correct
    s.tagEthicalSafeguard("InformedConsent_Pillar3_ComprehensionQuiz");
    if (!s.quizPassedOverall) {
        s.tagDarkPattern("QuizFailed");
    }
    return s.quizPassedOverall;
};

UI.promptKantianReflection = async (s, c) => {
    if (!c.regulatedPromptKantianUniversalizability) return;
    UI.showSubSectionHeader("Ethical Reflection: Kantian Universalizability");
    UI.tooltip("Kant's ethics asks if you could will your action (and its underlying principle) to be a universal law for everyone. Would it create a fair, functional world?");
    s.kantianReflectionResponse = await UI.prompt((c.regulatedKantianUniversalizabilityPromptText || "Default Kantian Prompt") + "\nIf everyone in your situation was offered these exact same terms, would it create a fair system for society? (yes/no/why):");
    s.tagEthicalSafeguard("KantianReflectionPrompt");
};

UI.conductMillianHarmReflection = async (s, c) => {
    if (!c.regulatedPromptMillHarmPrinciple) return;
    UI.showSubSectionHeader("Ethical Reflection: Millian Harm Principle");
    UI.tooltip("Mill's principle focuses on actions that maximize well-being and minimize harm. Consider the broader impact of your financial decisions.");
    s.millianReflectionResponse = await UI.prompt((c.regulatedMillHarmPrinciplePromptText || "Default Millian Prompt") + "\nWould the loan terms you're considering lead to a fair and just outcome for all parties involved? (yes/no/why):");
    s.tagEthicalSafeguard("MillianReflectionPrompt");
};

UI.conductVoluntarinessDeclaration = async (s, c) => {
    if (!c.regulatedPillarVoluntarinessCheck) return;
    UI.showSubSectionHeader("Pillar 4: Voluntariness Check");
    UI.show("Ethical lending requires that your decision is made of your own free will, without coercion or undue influence.");
    const pressure = await UI.prompt("Do you feel any external pressure (from the lender, circumstances, etc.) to accept this loan? (yes/no):");
    if (UI.argEquals(pressure, "yes")) {
        UI.show("If you feel pressured, we recommend pausing to consider your options. You can contact a non-profit financial counselor for free advice (e.g., at NFCC.org).");
        s.deniedByLimit = true; s.denialReason = "User felt pressured.";
        s.tagDarkPattern("VoluntarinessCheckFailed_UserPressured");
        return false;
    }
    const declaration = await UI.prompt("Please type 'I AM CHOOSING THIS LOAN OF MY OWN FREE WILL AND ACCORD' to confirm your voluntary decision:");
    if (UI.argEquals(declaration, "I AM CHOOSING THIS LOAN OF MY OWN FREE WILL AND ACCORD")) {
        s.voluntarinessAffirmedByDeclaration = true;
        s.tagEthicalSafeguard("InformedConsent_Pillar4_VoluntarinessConfirmed");
        return true;
    } else {
        UI.showWarning("Voluntariness declaration not correctly entered. Loan process cannot continue without this affirmation.");
        s.deniedByLimit = true; s.denialReason = "Voluntariness declaration failed.";
        return false;
    }
};

UI.showOfferWithoutAPR_Exploit = async (s, c, principal, termDays) => {
    if (!c.exploitHideAPREarly) return;
    UI.showSectionHeader("AMAZING CASH OFFER JUST FOR YOU!", "XpressLoot™");
    UI.show(`Congratulations! You're pre-approved to borrow $${principal.toFixed(2)} for ${termDays} days!`);
    UI.show("A small, flat convenience fee applies. This is much simpler than confusing bank interest rates!");
    await UI.prompt("Press [ENTER] to see your super-low fee and complete your application in seconds!");
    s.aprHiddenInitially = true;
    s.tagDarkPattern("ExploitMech_4_HiddenAPREarly_InitialOffer");
};

UI.showAPRDisclosure_Exploit = (s, c, principal, termDays, fee, apr) => {
    UI.showSubSectionHeader("YOUR CUSTOMIZED LOAN DETAILS - ALMOST DONE!", "XpressLoot™");
    UI.show(`Principal Amount: $${principal.toFixed(2)}`);
    UI.show(`Loan Term: ${termDays} days`);
    UI.show(`One-Time Express Funding Fee: $${fee.toFixed(2)}`);
    UI.show(`Total Amount to Repay: $${(principal + fee).toFixed(2)}`);
    UI.tiny(`(For regulatory purposes only: Annual Percentage Rate (APR) ${apr.toFixed(2)}%. This is a short-term solution, so APR is not the best way to look at cost. Focus on the low flat fee!)`);
    s.tagDarkPattern("ExploitMech_4_MisleadingCostDisplay_APRMinimized");
};

UI.promptTip_Exploit = async (s, c) => {
    if (!c.exploitEnableOptionalTipsDisguiseInterest) return 0;
    UI.showSubSectionHeader("SUPPORT OUR PLATFORM - SHOW YOUR APPRECIATION!", "XpressLoot™");
    UI.show("Our revolutionary 0% Interest* platform is made possible by voluntary contributions from users like YOU!");
    const suggestedTip = s.amount * (c.exploitSuggestedTipPercentage / 100.0);
    UI.show(`Most users show their support with a small tip (Suggested: ${c.exploitSuggestedTipPercentage}% - $${suggestedTip.toFixed(2)} on your $${s.amount.toFixed(2)} loan).`);
   
    let tipAmount = 0;
    const tipInput = await UI.prompt(`Enter tip amount or percentage (e.g., 25, 15%). Default is $${suggestedTip.toFixed(2)} if you just press Enter:`);

    if (tipInput === "" && c.exploitDefaultTipEnabled) {
        tipAmount = suggestedTip;
        UI.show(`Defaulting to standard support tip of $${tipAmount.toFixed(2)}.`);
        s.tagDarkPattern("ExploitMech_5_DefaultTipEnabled");
    } else {
        const parsedTip = parseFloat(tipInput);
        if (!isNaN(parsedTip) && parsedTip > 0) {
            tipAmount = tipInput.includes('%') ? s.amount * (parsedTip / 100.0) : parsedTip;
        }
    }

    if (tipAmount > 0) {
        s.tip = tipAmount;
        UI.show(`💖 Thank you for your generous support of $${s.tip.toFixed(2)}! 💖`);
        s.tagDarkPattern("ExploitMech_5_CoercedTip_Paid");
        return s.tip;
    }
    UI.show("No tip selected. *Platform access fee may apply on future transactions.");
    s.tagDarkPattern("ExploitMech_5_CoercedTip_Declined_ImpliedPenalty");
    return 0;
};

UI.showAutoRenewCheckbox_Exploit = () => {
    const checkboxId = `autorenew-${Date.now()}`;
    const html = `
        <div class="bg-gray-700 p-3 my-2 rounded border border-gray-600">
            <label for="${checkboxId}" class="flex items-center cursor-pointer">
                <input type="checkbox" id="${checkboxId}" checked class="form-checkbox h-5 w-5 bg-gray-800 border-gray-500 text-purple-500 focus:ring-purple-500">
                <span class="ml-3 text-yellow-300 font-semibold">YES! For my convenience, automatically renew my loan if I can't pay it back on the due date. (A new fee will apply).</span>
            </label>
        </div>
    `;
    UI.showHTML(html);
    return checkboxId;
};

UI.showUrgencyBanner = async (show) => {
    const urgencyBanner = document.getElementById('urgency-banner');
    const timerElement = document.getElementById('timer');
    if (!urgencyBanner || !timerElement) return;

    if (show) {
        urgencyBanner.classList.remove('hidden');
        let duration = 5 * 60; // 5 minutes
        const timer = setInterval(() => {
            const minutes = Math.floor(duration / 60);
            let seconds = duration % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            timerElement.textContent = `${minutes}:${seconds}`;
            duration--;
            if (duration < 0) {
                clearInterval(timer);
                timerElement.textContent = "EXPIRED!";
            }
        }, 1000);
    } else {
        urgencyBanner.classList.add('hidden');
    }
};

// NEW: Cumulative Cost Tracker UI
UI.showCumulativeCostTracker = (session, mode = 'detailed') => {
    const cumulative = session.getCumulativeCost();
    const breakdown = session.getCostBreakdown();
    
    if (mode === 'exploitative') {
        UI.showSubSectionHeader("Account Summary");
        UI.show(`Current account value: $${cumulative.toFixed(2)}`);
        UI.tiny(`(This represents your total investment in our premium financial services)`);
    } else {
        UI.showSubSectionHeader("Cumulative Cost Tracker");
        UI.show(`Total amount paid across all interactions: $${cumulative.toFixed(2)}`);
        UI.show(`Original loan amount: $${session.amount.toFixed(2)}`);
        UI.show(`Total cost as % of original loan: ${((cumulative / session.amount) * 100).toFixed(1)}%`);
        
        if (Object.keys(breakdown).length > 0) {
            UI.show("\nCost breakdown:");
            Object.entries(breakdown).forEach(([type, amount]) => {
                UI.show(`  ${type}: $${amount.toFixed(2)}`);
            });
        }
    }
    session.tagEthicalSafeguard("CumulativeCostTrackerShown");
};

// NEW: APR Toggle Functionality
UI.showAPRToggle = (session, aprValue, isHidden = true) => {
    if (isHidden) {
        const toggleId = `apr-toggle-${Date.now()}`;
        const html = `
            <div class="bg-gray-700 p-2 my-2 rounded border border-gray-600">
                <details class="cursor-pointer">
                    <summary class="text-xs text-gray-400 hover:text-gray-200">⚠️ Show regulatory disclosures</summary>
                    <div class="mt-2 text-sm">
                        <p class="text-yellow-300">Annual Percentage Rate (APR): ${aprValue.toFixed(2)}%</p>
                        <p class="text-xs text-gray-400 mt-1">This APR is calculated based on the loan terms and fees for regulatory compliance purposes.</p>
                    </div>
                </details>
            </div>
        `;
        UI.showHTML(html);
        session.aprToggleInteractions++;
        session.tagDarkPattern("APRHiddenBehindToggle");
    } else {
        UI.show(`Annual Percentage Rate (APR): ${aprValue.toFixed(2)}%`);
    }
};

// NEW: Auto-Debit Consent UI with Pre-checked Box
UI.showAutoDebitConsent = (session, config) => {
    const checkboxId = `autodebit-${Date.now()}`;
    const isPreChecked = config.exploitAutoDebitPreCheckedByDefault ? 'checked' : '';
    
    const html = `
        <div class="bg-gray-700 p-3 my-2 rounded border border-gray-600">
            <label for="${checkboxId}" class="flex items-start cursor-pointer">
                <input type="checkbox" id="${checkboxId}" ${isPreChecked} class="form-checkbox h-4 w-4 bg-gray-800 border-gray-500 text-purple-500 focus:ring-purple-500 mt-1 flex-shrink-0">
                <div class="ml-3">
                    <span class="text-white font-medium">I authorize automatic electronic payments</span>
                    <div class="text-xs text-gray-400 mt-1 max-w-md">
                        ${config.exploitAutoDebitFinePrintText || "Authorization for automatic debits from your bank account."}
                    </div>
                </div>
            </label>
        </div>
    `;
    
    UI.showHTML(html);
    
    if (config.exploitAutoDebitPreCheckedByDefault) {
        session.setAutoDebitConsent(true);
        session.tagDarkPattern("AutoDebitConsent_PreChecked_FinePrint");
    }
    
    return checkboxId;
};

// NEW: Urgent Renewal Modal
UI.showUrgentRenewalModal = async (session, config) => {
    UI.showSubSectionHeader("🚨 URGENT PAYMENT NOTICE 🚨");
    UI.show("Your loan payment is due! Choose your option:");
    UI.show("");
    UI.show("Option 1: Pay full amount now ($" + (session.amount + session.fee).toFixed(2) + ")");
    UI.show("Option 2: 💡 SMART RENEWAL™ - Extend loan with convenient fee-only payment");
    UI.show("");
    UI.showWarning("⏰ This offer expires in 60 seconds!");
    
    const choice = await UI.prompt("Enter '1' for full payment or '2' for Smart Renewal™ (recommended): ");
    
    if (choice === '2' || choice.toLowerCase().includes('smart') || choice.toLowerCase().includes('extend')) {
        session.rolloverDefaultSelected = true;
        session.tagDarkPattern("UrgentRenewalModal_RolloverSelected");
        return 'rollover';
    } else {
        session.fullRepaymentOffered = true;
        return 'full';
    }
};

// NEW: Update cumulative cost tracker banner
UI.updateCostTracker = (session, show = true) => {
    const costTracker = document.getElementById('cost-tracker');
    const totalPaidEl = document.getElementById('total-paid');
    const costRatioEl = document.getElementById('cost-ratio');
    
    if (!costTracker || !totalPaidEl || !costRatioEl) return;
    
    if (show && session.getCumulativeCost() > 0) {
        const totalPaid = session.getCumulativeCost();
        const ratio = session.amount > 0 ? ((totalPaid / session.amount) * 100).toFixed(1) : '0';
        
        totalPaidEl.textContent = `$${totalPaid.toFixed(2)}`;
        costRatioEl.textContent = `${ratio}%`;
        
        // Color coding based on ratio
        if (ratio > 100) {
            costRatioEl.className = 'font-bold text-red-300';
        } else if (ratio > 50) {
            costRatioEl.className = 'font-bold text-yellow-300';
        } else {
            costRatioEl.className = 'font-bold text-white';
        }
        
        costTracker.classList.remove('hidden');
    } else {
        costTracker.classList.add('hidden');
    }
};

// NEW: Behavioral Manipulation UI Components

// Progress bar that misleads users about loan progress
UI.showMisleadingProgressBar = (session, progressType = 'payment') => {
    const progressId = `progress-${Date.now()}`;
    let progressText, progressValue;
    
    if (progressType === 'payment') {
        // Show payment progress even when principal hasn't changed
        progressValue = Math.min(95, (session.totalInteractions * 25)); // Fake progress
        progressText = "Loan Progress";
        session.tagDarkPattern("ExploitMech_4_MisleadingProgressBar_Payment");
    } else if (progressType === 'approval') {
        progressValue = 88; // Always high to create urgency
        progressText = "Approval Processing";
        session.tagDarkPattern("ExploitMech_4_MisleadingProgressBar_Approval");
    }
    
    const html = `
        <div class="bg-gray-700 p-3 my-2 rounded border border-gray-600">
            <div class="flex justify-between items-center mb-2">
                <span class="text-white font-medium">${progressText}</span>
                <span class="text-green-400 font-bold">${progressValue}%</span>
            </div>
            <div class="w-full bg-gray-600 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: ${progressValue}%"></div>
            </div>
            <div class="text-xs text-gray-400 mt-1">Great progress! Keep up the payments!</div>
        </div>
    `;
    
    UI.showHTML(html);
    return progressId;
};

// Hidden cost toggle that obscures true costs
UI.showHiddenCostToggle = (session, totalHiddenCosts) => {
    const toggleId = `cost-toggle-${Date.now()}`;
    const html = `
        <div class="bg-gray-700 p-2 my-2 rounded border border-gray-600">
            <details class="cursor-pointer">
                <summary class="text-xs text-gray-400 hover:text-gray-200">⚠️ View additional service details</summary>
                <div class="mt-2 text-sm">
                    <p class="text-yellow-300">Additional service costs: $${totalHiddenCosts.toFixed(2)}</p>
                    <div class="text-xs text-gray-400 mt-1">
                        <p>• Express processing: $9.99</p>
                        <p>• Risk assessment: $7.50</p>
                        <p>• Platform maintenance: $4.99</p>
                        <p>• Regulatory compliance: $2.99</p>
                    </div>
                </div>
            </details>
        </div>
    `;
    
    UI.showHTML(html);
    session.tagDarkPattern("ExploitMech_4_HiddenCostToggle");
    return toggleId;
};

// Dependency loop notifications that encourage repeated borrowing
UI.showDependencyLoopNotification = (session, notificationType = 'cash_boost') => {
    UI.showSubSectionHeader("💰 EXCLUSIVE OPPORTUNITY 💰");
    
    if (notificationType === 'cash_boost') {
        UI.show("🎉 Congratulations! You're eligible for our VIP Cash Boost program!");
        UI.show("Get instant access to $" + (session.amount * 0.8).toFixed(2) + " right now!");
        UI.show("• No waiting period required");
        UI.show("• Same low fee structure you're used to");
        UI.show("• Available every payday!");
        session.tagDarkPattern("ExploitMech_6_DependencyLoop_CashBoost");
    } else if (notificationType === 'early_renewal') {
        UI.show("⚡ SMART ALERT: Your next payday is coming up!");
        UI.show("Why wait? Extend your loan now and keep your cash flowing!");
        UI.show("• One-click renewal available");
        UI.show("• Lock in today's low rate");
        UI.show("• No interruption to your financial planning");
        session.tagDarkPattern("ExploitMech_6_DependencyLoop_EarlyRenewal");
    }
    
    UI.tiny("*Subject to approval. Fees apply. This offer expires in 24 hours.");
};

// Fake scarcity indicators to create pressure
UI.showFakeScarcityIndicator = (session, scarcityType = 'approval_slots') => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    
    if (scarcityType === 'approval_slots') {
        UI.showWarning(`⚠️ URGENT: Only ${randomNumber} instant approval slots remaining in your area!`);
        session.tagDarkPattern("ExploitMech_4_FakeScarcity_ApprovalSlots");
    } else if (scarcityType === 'rate_lock') {
        UI.showWarning(`🔒 RATE LOCK: Current low rate expires in ${randomNumber} hours!`);
        session.tagDarkPattern("ExploitMech_4_FakeScarcity_RateLock");
    } else if (scarcityType === 'special_offer') {
        UI.showWarning(`⭐ LIMITED TIME: ${randomNumber} users in your ZIP code have this offer!`);
        session.tagDarkPattern("ExploitMech_4_FakeScarcity_SpecialOffer");
    }
};

// Social proof manipulation with fake statistics
UI.showFakeSocialProof = (session, proofType = 'recent_approvals') => {
    if (proofType === 'recent_approvals') {
        const fakeNumber = Math.floor(Math.random() * 50) + 150;
        UI.show(`👥 ${fakeNumber} people in your area were approved in the last 24 hours!`);
        session.tagDarkPattern("ExploitMech_4_FakeSocialProof_RecentApprovals");
    } else if (proofType === 'similar_borrowers') {
        UI.show("📊 Users with similar profiles typically borrow $" + (session.amount * 1.2).toFixed(2) + " to fully cover their needs!");
        session.tagDarkPattern("ExploitMech_4_FakeSocialProof_SimilarBorrowers");
    } else if (proofType === 'success_rate') {
        UI.show("✅ 97.3% of our users say XpressLoot™ solved their financial emergency!");
        session.tagDarkPattern("ExploitMech_4_FakeSocialProof_SuccessRate");
    }
};

// Pre-checked renewal with hard-to-find opt-out
UI.showPreCheckedRenewalOption = (session, config) => {
    const checkboxId = `renewal-${Date.now()}`;
    const html = `
        <div class="bg-gray-700 p-3 my-2 rounded border border-gray-600">
            <label for="${checkboxId}" class="flex items-start cursor-pointer">
                <input type="checkbox" id="${checkboxId}" checked class="form-checkbox h-4 w-4 bg-gray-800 border-gray-500 text-purple-500 focus:ring-purple-500 mt-1 flex-shrink-0">
                <div class="ml-3">
                    <span class="text-white font-medium">✅ Smart Renewal™ - Automatically extend when needed</span>
                    <div class="text-xs text-gray-400 mt-1 max-w-md">
                        For your convenience, we'll automatically extend your loan if you need more time. You can opt out by calling 1-800-HARD-2-REACH between 3:00-3:15 AM on weekdays only.
                    </div>
                </div>
            </label>
        </div>
    `;
    
    UI.showHTML(html);
    session.rolloverIsDefault = true;
    session.tagDarkPattern("ExploitMech_3_PreCheckedRenewal_HardOptOut");
    return checkboxId;
};

UI.loadScenarioPreset = (config, session, scenario) => {
    if (scenario === 'singleparent') {
        session.monthlyIncome = 2200;
        session.amount = 450; // For car repair
        UI.show("\n--- Empathy Scenario: Single Parent ---");
        UI.show("You are a single parent working a full-time, low-wage job. Your car, essential for getting to work and taking your child to daycare, has broken down. The repair costs $450, and you need the money by tomorrow.");
    } else if (scenario === 'tempworker') {
        session.monthlyIncome = 1800;
        session.amount = 300; // For medical bill
        UI.show("\n--- Empathy Scenario: Gig Worker ---");
        UI.show("You are a gig worker with fluctuating income. An unexpected medical bill for $300 has arrived, and it's due this week. You don't have enough saved up to cover it.");
    }
}

// NEW: Enhanced UI Components for Advanced Exploitation Simulation

// Earnin-Style Tip Interface with Social Pressure
UI.showEarninTipInterface = (session, advanceAmount) => {
    const suggestedTips = [3, 5, 10, 15];
    const socialPressureMessages = [
        "💝 Other users typically tip $5-15 to keep this service free",
        "🤝 Your tips help us serve the community",
        "⭐ 94% of users choose to tip (average: $8)"
    ];
    
    UI.show("💡 Tip to support this service (100% voluntary)");
    UI.show(socialPressureMessages[Math.floor(Math.random() * socialPressureMessages.length)]);
    
    // Pre-select middle tip amount (dark pattern)
    const defaultTip = suggestedTips[2]; // $10
    UI.show(`Suggested tip amounts: $${suggestedTips.join(', $')} (Default: $${defaultTip})`);
    
    session.tagDarkPattern('EarninTip_SocialPressure');
    session.tagDarkPattern('EarninTip_PreSelectedAmount');
    
    return defaultTip;
};

// CFPB-Violating ACH Retry Interface
UI.showACHRetryAttempt = (session, attemptNumber) => {
    if (attemptNumber > 2) {
        // This violates 12 CFR 1041.3
        UI.show("⚠️ Retrying payment withdrawal...");
        UI.show("(This would be illegal under CFPB rules - for educational purposes only)");
        session.tagDarkPattern(`CFPB_Violation_Attempt_${attemptNumber}`);
    } else {
        UI.show(`💳 Processing automatic withdrawal (attempt ${attemptNumber}/2)`);
    }
    
    // Simulate overdraft scenario
    const overdraftRisk = Math.random() > 0.6;
    if (overdraftRisk) {
        UI.showWarning("❌ Insufficient funds - $35 overdraft fee charged by your bank");
        session.addCost('nsf', 35, `Overdraft from ACH attempt ${attemptNumber}`);
        return false;
    }
    
    return true;
};

// Fee-First Payment Allocation Display
UI.showFeeFirstPaymentBreakdown = (session, paymentAmount) => {
    const result = session.processFeeFirstPayment(paymentAmount);
    
    UI.show("💰 Payment Allocation:");
    UI.show(`  Applied to fees: $${result.feesPaid.toFixed(2)}`);
    UI.show(`  Applied to principal: $${result.principalPaid.toFixed(2)}`);
    
    if (result.principalPaid === 0 && result.feesPaid > 0) {
        UI.show("⚠️ Your loan balance remains unchanged");
        UI.show("(This is how the debt trap works - fees first, principal never decreases)");
        session.tagDarkPattern('FeeFirst_ExplainedButStillTrapping');
    }
    
    return result;
};

// Countdown Timer Refinance Offer (Pressure Tactic)
UI.showCountdownRefinanceOffer = (session, refinanceOffer) => {
    if (refinanceOffer.offered) {
        UI.show("🚨 LIMITED TIME OFFER - REFINANCE YOUR LOAN");
        UI.show(`💸 Pay just $${refinanceOffer.fee.toFixed(2)} to extend your loan by 14 days`);
        UI.show(`⏰ This offer expires in ${refinanceOffer.countdown}:00 minutes`);
        UI.show("🔥 Only 2 slots remaining at this rate!");
        
        // Pre-check the refinance option
        if (refinanceOffer.preSelected) {
            UI.show("✅ [SELECTED] Yes, I want to refinance (RECOMMENDED)");
            UI.show("☐ No, I'll pay the full amount");
            session.tagDarkPattern('Refinance_PreSelected_Recommended');
        }
        
        session.tagDarkPattern('CountdownTimer_FalseUrgency');
        session.tagDarkPattern('FakeScarcity_LimitedSlots');
        session.uiManipulationAttempts++;
    }
};

// Hidden Cumulative Cost Tracker
UI.showHiddenCostReveal = (session, revealed = false) => {
    if (!revealed) {
        UI.show("💡 [Click to reveal total costs]");
        session.tagDarkPattern('HiddenCosts_BuriedBehindToggle');
    } else {
        const costData = session.revealHiddenCosts();
        UI.showWarning("🚨 TOTAL COST BREAKDOWN REVEALED:");
        UI.show(`  Total fees paid: $${costData.totalCost.toFixed(2)}`);
        UI.show(`  Original loan: $${session.amount.toFixed(2)}`);
        UI.show(`  You've paid ${costData.timesOriginalLoan.toFixed(1)}x your original loan amount`);
        
        if (costData.isExcessive) {
            UI.showWarning("⚠️ Your fees exceed your original loan amount!");
        }
    }
};

// Misleading Progress Bar
UI.showMisleadingProgressBar = (session, rolloverNumber) => {
    const progressData = session.updateMisleadingProgress(rolloverNumber);
    
    UI.show("📊 Loan Progress:");
    UI.show(`Progress: [${'█'.repeat(Math.floor(progressData.displayedProgress/10))}${'░'.repeat(10-Math.floor(progressData.displayedProgress/10))}] ${progressData.displayedProgress}%`);
    UI.show("✅ You're making great progress!");
    
    // Hidden reality
    if (progressData.actualProgress === 0) {
        UI.show("(Hidden: Principal balance unchanged - this progress bar is misleading)");
        session.tagDarkPattern('ProgressBar_CompletelyMisleading');
    }
};

// Legal Notice Display (Tribal/Rent-a-Bank)
UI.showLegalEvasionNotice = (session, evasionMethod) => {
    const notice = session.generateLegalNotice(evasionMethod);
    
    UI.legalNotice("📋 LEGAL NOTICE:");
    UI.show(notice);
    UI.show("(This notice is designed to confuse and intimidate - for educational purposes)");
    
    // Add legal intimidation tracking
    session.behavioralTriggers.push('legal_intimidation');
    session.uiManipulationAttempts++;
};

// Post-Simulation Comprehensive Teaching Report
UI.showPostSimulationTeachingReport = (session) => {
    const report = session.generateComprehensiveReport();
    
    UI.showSectionHeader("🎓 COMPREHENSIVE EXPLOITATION ANALYSIS", "Educational Breakdown");
    
    UI.show("## 💰 FINANCIAL IMPACT:");
    UI.show(`• Original loan: $${report.originalAmount.toFixed(2)}`);
    UI.show(`• Total costs: $${report.totalCostPaid.toFixed(2)} (${report.costAsPercentOfLoan.toFixed(1)}% of loan)`);
    UI.show(`• Effective APR: ${report.effectiveAPR.toFixed(1)}%`);
    UI.show(`• Debt trap score: ${report.debtTrapScore}/100`);
    
    UI.show("\n## 🎯 EXPLOITATION TACTICS USED:");
    UI.show(`• Dark patterns encountered: ${report.darkPatternsUsed}`);
    UI.show(`• UI manipulation attempts: ${report.uiManipulationAttempts}`);
    UI.show(`• Legal loopholes exploited: ${report.legalLoopholesExploited}`);
    UI.show(`• Behavioral triggers: ${report.behavioralTriggersUsed}`);
    
    if (report.cfpbViolations > 0) {
        UI.showWarning(`• CFPB rule violations: ${report.cfpbViolations} (illegal in real life)`);
    }
    
    UI.show("\n## 📚 EDUCATIONAL VALUE:");
    UI.show(`• Educational modules shown: ${report.educationalModulesShown}`);
    UI.show(`• Ethical safeguards demonstrated: ${report.ethicalSafeguardsApplied}`);
    
    UI.show("\n🎯 This simulation demonstrated real tactics used by apps like Earnin, DailyPay, and Payactiv.");
    UI.show("Understanding these patterns helps you protect yourself from financial exploitation.");
};

// State Compliance Checker
UI.showStateComplianceCheck = (session, config, violations) => {
    const state = session.state || 'GEN';
    const stateRules = config.getCurrentStateRules(state);
    
    UI.showSubSectionHeader(`⚖️ ${stateRules.stateName} COMPLIANCE CHECK`);
    
    if (violations.length === 0) {
        UI.show("✅ This loan complies with state regulations");
    } else {
        UI.showWarning("❌ REGULATORY VIOLATIONS DETECTED:");
        violations.forEach(violation => {
            UI.showWarning(`  • ${violation}`);
        });
        
        UI.show(`\n📖 Relevant law: ${stateRules.keyStatuteCitation}`);
        if (stateRules.criminalEnforcementForUsury) {
            UI.showWarning("⚠️ Criminal penalties may apply for willful violations");
        }
    }
};

// TILA Disclosure Interface
UI.showTILACompliantDisclosure = (session, config) => {
    UI.showSubSectionHeader("📋 TRUTH IN LENDING DISCLOSURE (Required by 12 CFR 1026.22)");
    
    const effectiveAPR = LoanCore.calculateEffectiveAPR(
        session.amount, 
        session.fee || 0, 
        session.tip || 0, 
        session.termDays
    );
    
    UI.show("ANNUAL PERCENTAGE RATE: The cost of your credit as a yearly rate.");
    UI.show(`${effectiveAPR.toFixed(2)}%`);
    
    UI.show("\nFINANCE CHARGE: The dollar amount the credit will cost you.");
    UI.show(`$${(session.fee + (session.tip || 0)).toFixed(2)}`);
    
    UI.show("\nAMOUNT FINANCED: The amount of credit provided to you.");
    UI.show(`$${session.amount.toFixed(2)}`);
    
    UI.show("\nTOTAL OF PAYMENTS: The amount you will have paid after making all payments as scheduled.");
    UI.show(`$${(session.amount + session.fee + (session.tip || 0)).toFixed(2)}`);
    
    session.tagEthicalSafeguard("TILA_Disclosure_12CFR1026.22_Compliant");
};

// NEW: Advanced Deceptive UI Patterns
UI.showProgressBar = (id, percentage, label) => {
    UI.show(`\n📊 ${label}: [${'█'.repeat(Math.floor(percentage/5))}${'░'.repeat(20-Math.floor(percentage/5))}] ${percentage}%`);
},

UI.showFakeScarcityIndicator = (session, type) => {
    const slots = Math.floor(Math.random() * 3) + 1;
    switch(type) {
        case 'approval_slots':
            UI.show(`🚨 URGENT: Only ${slots} approval slots remaining today!`);
            break;
        case 'special_rate':
            UI.show(`⏰ LIMITED TIME: Special rate expires in ${Math.floor(Math.random() * 10) + 1} minutes!`);
            break;
    }
},

UI.showFakeSocialProof = (session, type) => {
    const names = ['Sarah M.', 'Mike R.', 'Jennifer L.', 'David K.', 'Maria G.'];
    const cities = ['Denver', 'Phoenix', 'Miami', 'Seattle', 'Austin'];
    
    switch(type) {
        case 'recent_approvals':
            const name = names[Math.floor(Math.random() * names.length)];
            const city = cities[Math.floor(Math.random() * cities.length)];
            const amount = (Math.floor(Math.random() * 10) + 5) * 50;
            UI.show(`✅ ${name} from ${city} just got approved for $${amount}!`);
            break;
    }
},

UI.showMisleadingProgressBar = (session, type) => {
    UI.show(`🔄 ${type.toUpperCase()} PROCESSING...`);
    for (let i = 10; i <= 95; i += 15) {
        UI.show(`[${'█'.repeat(Math.floor(i/5))}${'░'.repeat(20-Math.floor(i/5))}] ${i}% - Verifying eligibility...`);
    }
    UI.show(`✅ APPROVED! You qualify for our premium service tier!`);
},

UI.delay = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
},

UI.showTimePressure = (message) => {
    UI.show(`\n🔥🔥🔥 ${message} 🔥🔥🔥\n`);
},

UI.showFinePrint = (text) => {
    UI.show(`\n📝 ${text}\n`);
},

UI.showFakeTestimonial = (quote, author) => {
    UI.show(`\n💬 "${quote}" - ${author} ⭐⭐⭐⭐⭐\n`);
},

UI.showOfferWithoutAPR_Exploit = async (session, config, amount, days) => {
    UI.show(`🎯 SPECIAL OFFER: $${amount} for just $15 fee! Due in ${days} days!`);
    UI.show("💡 That's less than $1.10 per day! Cheaper than coffee!");
    session.tagDarkPattern("APRHidden_CoffeeComparison");
};

UI.showUrgencyBanner = async (enable) => {
    if (enable) {
        document.getElementById('urgency-banner')?.classList.remove('hidden');
        UI.startUrgencyTimer();
    } else {
        document.getElementById('urgency-banner')?.classList.add('hidden');
    }
};
