// ui_components/summary.js

import { UI } from '../ui.js';

function printSummary(s) {
    UI.showSectionHeader("SESSION SUMMARY & ANALYSIS");
    UI.show(`Session ID: ${s.sessionId}`);
    UI.show(`State Context: ${s.state.toUpperCase() || 'General'}`);
    UI.show(`Monthly Income Provided: $${s.monthlyIncome.toFixed(2)}`);

    UI.showSubSectionHeader("Loan Outcome & Key Terms");
    if (s.deniedByLimit) {
        UI.show(`Loan Status: DENIED / HALTED`);
        UI.show(`Reason: ${s.denialReason}`);
    } else if (s.loanRescinded) {
        UI.show(`Loan Status: AGREED THEN RESCINDED`);
    } else if (s.consentGiven) {
        UI.show(`Loan Status: FUNDED (Simulated)`);
    } else {
        UI.show(`Loan Status: NOT COMPLETED`);
    }
    UI.show(`Loan Amount: $${s.amount.toFixed(2)}`);
    UI.show(`Finance Charge (Fee): $${s.fee.toFixed(2)}`);
    if (s.isCABLoanInTX) UI.show(`CAB Fee (TX): $${s.cabFeeCharged.toFixed(2)}`);
    UI.show(`Disclosed APR: ${s.aprCalculated.toFixed(2)}%`);
    UI.show(`Total of Payments: $${s.totalRepayment.toFixed(2)}`);
    if (s.tip > 0) UI.show(`Tip/Gratuity Paid: $${s.tip.toFixed(2)}`);
    UI.show(`Renewals Taken: ${s.renewalsTaken}`);

    UI.showSubSectionHeader("Informed Consent Pillars Status (Beauchamp & Childress)");
    UI.show(`Pillar 1 (Capacity): ${s.capacityConfirmed_Age && s.capacityConfirmed_SoundMind ? 'Confirmed' : 'NOT Confirmed'}`);
    UI.show(`Pillar 2 (Disclosure): ${s.fullDisclosureProvided ? 'Provided' : 'NOT Provided'}`);
    UI.show(`Pillar 3 (Comprehension): ${s.quizPassedOverall ? `Passed (${s.quizQuestionsCorrect}/${s.quizQuestionsTotal})` : `Failed / Not Conducted`}`);
    UI.show(`Pillar 4 (Voluntariness): ${s.voluntarinessAffirmedByDeclaration ? 'Affirmed' : 'Not Affirmed / Pressured'}`);
    UI.show(`Pillar 5 (Authorization): ${s.consentGiven ? 'Given' : 'NOT Given'}`);
    UI.show(`Calculated Consent Score: ${s.consentScore()}/100`);

    UI.showSubSectionHeader("Ethical Analysis");
    UI.show(`Dark Patterns Encountered: ${s.darkPatternsEncountered.length}`);
    if (s.darkPatternsEncountered.length > 0) UI.show(`  Tactics: ${s.darkPatternsEncountered.join(', ')}`);
    UI.show(`Ethical Safeguards Applied: ${s.ethicalSafeguardsApplied.length}`);
    if (s.ethicalSafeguardsApplied.length > 0) UI.show(`  Measures: ${s.ethicalSafeguardsApplied.join(', ')}`);
    if (s.kantianReflectionResponse) UI.show(`Kantian Reflection: ${s.kantianReflectionResponse}`);

    UI.showSubSectionHeader("Educational Modules Presented");
    if (s.educationalModulesPresented.length > 0) {
        s.educationalModulesPresented.forEach(module => UI.show(` • ${module}`));
    } else {
        UI.show("None");
    }
}

function generateFollowUpEmail(s, mode) {
    UI.showSectionHeader("SIMULATED FOLLOW-UP EMAIL");
    if (mode === 'exploitative') {
        UI.show("To: Valued Applicant\nFrom: XpressLoot™ Offers <vip@xpressloot.biz>\nSubject: 🔥 URGENT: Your Application Status & EXCLUSIVE New Offers!");
        if (s.deniedByLimit) {
            UI.show("\nWe noticed your application couldn't be completed. BUT DON'T WORRY! We have NEW, MORE FLEXIBLE options just for you! Click here to re-apply with our VIP Second Chance program!");
        } else {
            UI.show(`\nCongratulations on your successful advance of $${s.amount.toFixed(2)}! Your repayment of $${s.totalRepayment.toFixed(2)} is due soon. As a valued member, you're pre-approved for an INCREASED limit on your next loan!`);
        }
    } else { // Regulated
        UI.show("To: Valued Client\nFrom: Lotus Finance <contact@lotus.sim>\nSubject: Your Loan Simulation Summary");
        if (s.deniedByLimit) {
            UI.show(`\nYour simulated loan application could not be approved. Reason: ${s.denialReason}. We encourage you to seek advice from a non-profit financial counselor.`);
        } else {
            UI.show(`
This email confirms your simulated loan terms. Amount: $${s.amount.toFixed(2)}, APR: ${s.aprCalculated.toFixed(2)}%. Remember your right to cancel within 3 business days. Please contact us if you anticipate repayment difficulties.`);
        }
    }
}

export { printSummary, generateFollowUpEmail };
