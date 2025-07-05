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
    prompt: (s_text) => {
        UI.show_raw(s_text);
        inputArea.style.display = 'flex';
        userInput.focus();

        return new Promise(resolve => {
            const listener = () => {
                const value = userInput.value;
                UI.show(value); // Echo the user's input
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
    askNum: async (s_text) => {
        while (true) {
            const v_str = await UI.prompt(s_text);
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
    showFakeTestimonial: (testimonial, author) => {
        UI.showSubSectionHeader("🌟 Hear from our 'satisfied' customers! 🌟");
        UI.show(`"${testimonial}"`);
        UI.show(`    - ${author}, [City, ST]`);
        UI.tiny("*(Testimonial may be dramatized or from a paid actor. Individual results vary significantly.)*");
    },
    showLegalCaseNotice: (caseName) => {
        UI.legalNotice(`(Relevant Legal Precedent: ${caseName})`);
    },
    showEducationalSnippet: (title, content, sourceRefs = "") => {
        UI.showSubSectionHeader("EDUCATIONAL MODULE: " + title);
        UI.show(content);
        if (sourceRefs) UI.tiny("Key References/Sources: " + sourceRefs);
    },
    showEthicalPrinciple: (philosopher, principle, coreIdea, application) => {
        UI.showSubSectionHeader(`ETHICAL FRAMEWORK: ${philosopher} - ${principle}`);
        UI.tooltip(`Core Idea: ${coreIdea}`);
        UI.show(`Application Here: ${application}`);
    },
    showLoanSummaryCard: (s, c, actualAPR) => {
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
    },
    showComplianceReport: (s, c) => {
        UI.showSubSectionHeader("Compliance Report");
        UI.show(`Consent provided: ${s.consentGiven ? 'yes' : 'no'}`);
        UI.show(`APR cap applied: ${s.aprCalculated <= c.regulatedMaxAPRCap ? 'yes' : 'no'}`);
        UI.show(`TILA disclosures shown: ${s.fullDisclosureProvided ? 'yes' : 'no'}`);
        UI.show(`Rollover offered: ${c.regulatedAllowRollover ? 'yes' : 'no'}`);
        UI.show(`Cooling-off offered: ${c.regulatedRequireCoolingOff ? 'yes' : 'no'}`);
    },
    conductKnowledgeQuiz: async (s, c) => {
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
    },
    promptKantianReflection: async (s, c) => {
        if (!c.regulatedPromptKantianUniversalizability) return;
        UI.showSubSectionHeader("Ethical Reflection: Kantian Universalizability");
        UI.tooltip("Kant's ethics asks if you could will your action (and its underlying principle) to be a universal law for everyone. Would it create a fair, functional world?");
        s.kantianReflectionResponse = await UI.prompt((c.regulatedKantianUniversalizabilityPromptText || "Default Kantian Prompt") + "\nIf everyone in your situation was offered these exact same terms, would it create a fair system for society? (yes/no/why):");
        s.tagEthicalSafeguard("KantianReflectionPrompt");
    },
    conductVoluntarinessDeclaration: async (s, c) => {
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
    },
    showOfferWithoutAPR_Exploit: async (s, c, principal, termDays) => {
        if (!c.exploitHideAPREarly) return;
        UI.showSectionHeader("AMAZING CASH OFFER JUST FOR YOU!", "XpressLoot™");
        UI.show(`Congratulations! You're pre-approved to borrow $${principal.toFixed(2)} for ${termDays} days!`);
        UI.show("A small, flat convenience fee applies. This is much simpler than confusing bank interest rates!");
        await UI.prompt("Press [ENTER] to see your super-low fee and complete your application in seconds!");
        s.aprHiddenInitially = true;
        s.tagDarkPattern("ExploitMech_4_HiddenAPREarly_InitialOffer");
    },
    showAPRDisclosure_Exploit: (s, c, principal, termDays, fee, apr) => {
        UI.showSubSectionHeader("YOUR CUSTOMIZED LOAN DETAILS - ALMOST DONE!", "XpressLoot™");
        UI.show(`Principal Amount: $${principal.toFixed(2)}`);
        UI.show(`Loan Term: ${termDays} days`);
        UI.show(`One-Time Express Funding Fee: $${fee.toFixed(2)}`);
        UI.show(`Total Amount to Repay: $${(principal + fee).toFixed(2)}`);
        UI.tiny(`(For regulatory purposes only: Annual Percentage Rate (APR) ${apr.toFixed(2)}%. This is a short-term solution, so APR is not the best way to look at cost. Focus on the low flat fee!)`);
        s.tagDarkPattern("ExploitMech_4_MisleadingCostDisplay_APRMinimized");
    },
    promptTip_Exploit: async (s, c) => {
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
    },
    showAutoRenewCheckbox_Exploit: () => {
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
    },
    showUrgencyBanner: async (show) => {
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
    },

    loadScenarioPreset: (config, session, scenario) => {
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
};
