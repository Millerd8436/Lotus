// components/reflection.js

import { evaluateConsent } from '../engine/kant.js';
import { UI } from '../ui.js';
import { updateConsentBar } from '../ui_components/consentBar.js';

function displayReflection(session, echo, kantAnalysis) {
    const behaviorSummaryEl = document.getElementById('behaviorSummary');
    const autonomyScoreEl = document.getElementById('autonomyScore');
    const ghostMessageEl = document.getElementById('ghostMessage');
    const consentBar = document.getElementById('consent-bar');

    // 1. Update Consent Bar
    const consentScore = session.consentScore();
    updateConsentBar(session, consentScore);

    // 2. Populate Behavioral Analysis Tab
    const autonomyScore = echo.calculateScore(session);
    let behaviorHTML = `<h3 class="font-bold text-lg text-purple-300 mb-2">Behavioral Analysis</h3>`;
    behaviorHTML += `<p><span class="font-semibold">Autonomy Score:</span> ${autonomyScore}/100</p>`;
    behaviorHTML += `<p class="mt-1"><span class="font-semibold">Informed Consent Score:</span> ${consentScore}/100</p>`;
    
    // NEW: Add cumulative cost information
    const cumulativeCost = session.getCumulativeCost();
    if (cumulativeCost > 0) {
        const costRatio = ((cumulativeCost / session.amount) * 100).toFixed(1);
        behaviorHTML += `<p class="mt-1"><span class="font-semibold">Total Cost Paid:</span> $${cumulativeCost.toFixed(2)} (${costRatio}% of loan amount)</p>`;
        
        const breakdown = session.getCostBreakdown();
        if (Object.keys(breakdown).length > 1) {
            behaviorHTML += `<div class="mt-2 text-sm"><span class="font-semibold">Cost Breakdown:</span><ul class="list-disc list-inside ml-4">`;
            Object.entries(breakdown).forEach(([type, amount]) => {
                behaviorHTML += `<li>${type}: $${amount.toFixed(2)}</li>`;
            });
            behaviorHTML += `</ul></div>`;
        }
    }
    
    if (autonomyScore < 50) {
        behaviorHTML += `<p class="mt-2 italic text-red-400">Critique: The simulation used significant manipulative tactics. Your choices may have been heavily influenced by the system's design.</p>`;
    } else {
        behaviorHTML += `<p class="mt-2 italic text-green-400">Critique: The simulation used fewer manipulative tactics, allowing for more autonomous decision-making.</p>`;
    }
    if (session.darkPatternsEncountered.length > 0) {
        behaviorHTML += `<p class="mt-4 font-semibold">Dark Patterns Encountered:</p><ul class="list-disc list-inside text-sm">`;
        session.darkPatternsEncountered.forEach(p => {
            behaviorHTML += `<li>${p}</li>`;
        });
        behaviorHTML += `</ul>`;
    }
    behaviorSummaryEl.innerHTML = behaviorHTML;

    // 3. Populate Ethical Report Tab
    let ethicsHTML = `<h3 class="font-bold text-lg text-purple-300 mb-2">Ethical Report (Kantian Analysis)</h3>`;
    if (kantAnalysis && kantAnalysis.length > 0) {
        ethicsHTML += `<ul class="list-disc list-inside space-y-3 mt-2">`;
        kantAnalysis.forEach(v => {
            ethicsHTML += `<li><span class="font-semibold">${v.name}:</span> ${v.description}</li>`;
        });
        ethicsHTML += `</ul>`;
    } else {
        ethicsHTML += `<p class="text-green-400">No major Kantian ethical violations were detected in this session.</p>`;
    }

    ethicsHTML += `<h4 class="font-semibold text-purple-200 mt-4 mb-2">Informed Consent Pillars Breakdown:</h4>`;
    ethicsHTML += `<ul class="list-disc list-inside text-sm space-y-1">`;
    ethicsHTML += `<li><span class="font-semibold">Pillar 1 (Capacity):</span> ${session.capacityConfirmed_Age && session.capacityConfirmed_SoundMind ? '<span class="text-green-400">Confirmed</span>' : '<span class="text-red-400">NOT Confirmed</span>'}</li>`;
    ethicsHTML += `<li><span class="font-semibold">Pillar 2 (Disclosure):</span> ${session.fullDisclosureProvided ? '<span class="text-green-400">Provided</span>' : '<span class="text-red-400">NOT Provided</span>'}</li>`;
    ethicsHTML += `<li><span class="font-semibold">Pillar 3 (Comprehension):</span> ${session.quizPassedOverall ? `<span class="text-green-400">Passed (${session.quizQuestionsCorrect}/${session.quizQuestionsTotal})</span>` : `<span class="text-red-400">Failed / Not Conducted</span>`}</li>`;
    ethicsHTML += `<li><span class="font-semibold">Pillar 4 (Voluntariness):</span> ${session.voluntarinessAffirmedByDeclaration ? '<span class="text-green-400">Affirmed</span>' : '<span class="text-red-400">Not Affirmed / Pressured</span>'}</li>`;
    ethicsHTML += `<li><span class="font-semibold">Pillar 5 (Authorization):</span> ${session.consentGiven ? '<span class="text-green-400">Given</span>' : '<span class="text-red-400">NOT Given</span>'}</li>`;
    ethicsHTML += `</ul>`;

    autonomyScoreEl.innerHTML = ethicsHTML;

    // 4. Ghost Message
    ghostMessageEl.querySelector('p').textContent = "The simulation is over, but the patterns remain. Were you truly in control? Try the other mode to see the contrast.";
}

function generateFollowUpEmail(session, config, modeName) {
    let emailContent = '';
    if (modeName === 'exploitative') {
        emailContent = `
To: ${session.contact || 'Valued Applicant'}
From: XpressLoot™ Customer Loyalty & Retention <vip-offers@xpressloot-financial.global>
Subject: 🔥 URGENT: Your Account Status & Exclusive Offers 🔥

Dear ${session.userName || 'Customer'},

`;
        if (session.deniedByLimit) {
            emailContent += `We noticed your application was not completed: ${session.denialReason}.\nBut don't worry! Our system has found new, more flexible options for you. Reapply now for our VIP Second Chance program!`;
        } else if (session.loanRescinded) {
            emailContent += `We confirm you canceled your recent cash advance. That's okay!\nHowever, we're offering an extra $25 bonus if you reactivate your application within the next 23 hours!`;
        } else if (session.consentGiven) {
            emailContent += `Congratulations on your $${session.amount} cash advance!\nTotal repayment of $${session.totalRepayment.toFixed(2)} is due on your simulated payday.\nEXCLUSIVE VIP OFFER: You're pre-qualified for a higher limit on your next advance, plus optional subscriptions!`;
            if (session.renewalsTaken > 0 || session.principalRemaining > 0) {
                emailContent += `\nYour outstanding principal is $${session.principalRemaining}. Your next fee payment is $${session.fee}.`;
            }
        }
        emailContent += "\n\nThank you for choosing XpressLoot™!\nThis email contains promotional material. See full terms and conditions on our website.";
    } else { // ethical/regulation
        emailContent = `
To: ${session.contact || 'Valued Client'}
From: Lotus Responsible Finance <contact@lotusresponsiblefinance.sim>
Subject: Your Loan Simulation Summary - Session ID: ${session.sessionId}

Dear ${session.userName || 'Client'},

Thank you for using our simulator. This email summarizes your session and your rights.
`;
        if (session.deniedByLimit) {
            emailContent += `Your simulated loan application could not be approved: ${session.denialReason}.\nWe recommend reviewing educational materials or seeking advice from a non-profit financial counselor.`;
        } else if (session.loanRescinded) {
            emailContent += `We confirm you canceled your loan of $${session.amount}. No obligations were formed.\nThis is your right under the rescission policy.`;
        } else if (session.consentGiven) {
            emailContent += `
Your loan has been processed with the following terms:
 - Amount Financed: $${session.amount.toFixed(2)}
 - Finance Charge: $${session.fee.toFixed(2)}
 - APR: ${session.aprCalculated.toFixed(2)}%
 - Total of Payments: $${session.totalRepayment.toFixed(2)}
 - Term: ${session.termDays} days

**IMPORTANT: Your Right to Cancel (Rescission)**
You may cancel this loan without penalty within ${config.regulatedCoolingOffDays || 1} business days.
Please manage your repayment responsibly. Contact us if you expect any difficulty.
We recommend reviewing resources at consumerfinance.gov for assistance.`;
        }
        emailContent += "\n\nSincerely,\nThe Lotus Responsible Finance Team";
    }
    UI.show("\n--- Simulated Follow-Up Email ---");
    UI.show(emailContent);
}


export { displayReflection, generateFollowUpEmail };
