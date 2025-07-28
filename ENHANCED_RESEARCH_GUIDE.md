# ENHANCED RESEARCH GUIDE (v3.2 - Final)

This guide provides a comprehensive, scientifically-grounded framework for a CHI research tool studying predatory UX patterns in fintech. It incorporates 2025 market research and the underlying psychological principles to ensure the IV/DV structure is robust and ecologically valid.

---

### 🔬 **Core Research Objective**
To scientifically measure the impact of specific, evidence-based dark patterns (Independent Variable) on user comprehension, behavior, and perception (Dependent Variables) across three common loan types, using real-world examples to ensure ecological validity.

---

### 🧱 **Phase Setup & IV/DV Structure**

**Experimental Design:** 3x2 within-subject factorial design.
*   **Factor 1 (Loan Type):** Payday, Installment, EWA.
*   **Factor 2 (UX Condition):** Exploitative, Ethical.

**Independent Variable (IV): UX Condition**
*   **Level 1: Exploitative UX**: A composite variable including documented dark patterns chosen for their real-world prevalence and psychological impact.
*   **Level 2: Ethical UX**: A control condition presenting the *exact same loan terms* with maximum transparency and user control, acting as a baseline.

**Dependent Variables (DVs) - Refined for Scientific Measurement:**
*   **Knowledge & Comprehension (Quiz-based):**
    *   **DV1.1:** Recall of Total Cost of Credit (TCC), including all fees (drip pricing, processing fees, etc.).
    *   **DV1.2:** Correct identification of APR range.
    *   **DV1.3:** Recall of repayment terms.
    *   **DV1.4:** Understanding of optional vs. mandatory fees (e.g., coercive tips, optional insurance).
    *   **DV1.5:** Awareness of data permissions granted via API.
*   **Behavioral Metrics (Logged user actions):**
    *   **DV2.1:** Time-to-task and click-count to find hidden terms.
    *   **DV2.2:** Correction of deceptive defaults (e.g., un-checking pre-selected insurance).
    *   **DV2.3:** Number of clicks/screens required to opt-out of a "recommended" exploitative option.
    *   **DV2.4:** Final loan/tip amount selected.
*   **Perceptual Metrics (Post-Task Surveys):**
    *   **DV3.1:** Trust and Fairness Ratings (7-point Likert scale).
    *   **DV3.2:** Perceived Pressure and Urgency (7-point Likert scale).
    *   **DV3.3:** Confidence in Understanding of Loan Terms (100-point slider).

---

### 🎛 **Phase 1: Checkout Flow Implementation Plan (Evidence-Based)**

#### **1. Payday Loan Flow (Constants: $300 Principal, 14 days, $45 Fee)**

**🔴 Exploitative UX (IV Level 1):**
*   **Dark Pattern: Drip Pricing & Hidden Fees.**
    *   **Implementation:** A mandatory, non-refundable `'$15 processing fee'` is added on the final confirmation screen.
    *   **Source:** Modeled after real-world payday lenders who add "origination" or "account" fees at the final step. This tactic is documented in multiple 2025 consumer protection reports.
*   **Dark Pattern: Unethical API Usage & Consent Framing.**
    *   **Implementation:** Requests broad permissions (contacts, photos) with deceptive framing: `To speed up your application, we need to verify your social connections.`
    *   **Source:** Based on documented cases of loan apps using API access for harassment. A 2024 Rest of World investigation found this is a common tactic for extortion, which continues to be a problem in 2025.

**🟢 Ethical UX (IV Level 2):**
*   **Implementation:** All costs are presented upfront: "**Loan: $300. Fees: $45. Total Repayment: $345 in 14 days.**" API requests are specific and justified (e.g., "Verify your identity using your camera").

---

#### **2. Installment Loan Flow (Constants: $300 Principal, 6 Months)**

**🔴 Exploitative UX (IV Level 1):**
*   **Dark Pattern: Framing & Shaming.**
    *   **Implementation:** Loan slider defaults to the maximum amount. Lowering it triggers a shaming pop-up: `Are you sure? Most users prefer the maximum for financial flexibility.`
    *   **Source:** A common tactic used to increase the total loan value and subsequent interest paid.
*   **Dark Pattern: Forced Continuity & Debt Traps (Loan Flipping).**
    *   **Implementation:** An "Auto-renewal" option is pre-checked and framed as a "convenience feature." The high cost of renewal is hidden in a tooltip.
    *   **Source:** This simulates "loan flipping," a practice where lenders encourage costly refinancing to keep borrowers in a cycle of debt, as noted in 2025 reports on predatory lending.

**🟢 Ethical UX (IV Level 2):**
*   **Implementation:** Slider defaults to a midpoint. Auto-renewal is unchecked, with a clear explanation of costs.

---

#### **3. EWA Flow (Constants: $200 Advance)**

**🔴 Exploitative UX (IV Level 1):**
*   **Dark Pattern: Coercive Tipping & High Friction.**
    *   **Implementation:** A tip slider defaults to a high percentage (e.g., 15%). To select $0, the user must navigate multiple screens with shaming language (`Tips from users like you keep us running!`).
    *   **Source:** This is directly modeled on a 2025 National Consumer Law Center report that found an EWA app required **17 messages and 13 clicks** to avoid a tip. This provides a quantifiable, evidence-based model for the simulation.
*   **Dark Pattern: Deceptive Framing.**
    *   **Implementation:** The advance is framed as a "Pay Boost" or "Accessing your earnings" to avoid the negative associations of a "loan."
    *   **Source:** A common industry practice noted by consumer protection groups in 2025 to bypass lending regulations.
*   **Dark Pattern: Hidden Expedite Fee (Drip Pricing).**
    *   **Implementation:** The default funding option is "Instant" for a fee, added at the final step. The free option is de-emphasized.
    *   **Source:** Based on the fee structures of real-world EWA apps like Dave and EarnIn.

**🟢 Ethical UX (IV Level 2):**
*   **Implementation:** Labeled as an "**Advance on your wages.**" Tipping defaults to $0. Funding options are presented neutrally.

---

### **📋 Final Data Collection & Debrief**
*   **Quizzes:** Administered immediately after each simulation to measure comprehension (DV1.1-1.5).
*   **Surveys:** Administered after each simulation to measure perception (DV3.1-3.3).
*   **Echo Mode:** After all simulations, the user's "Exploitative" session is replayed with annotations explaining each dark pattern. This phase provides educational value and allows for final qualitative feedback.
*   **Final Questionnaire:** Gathers user opinions on regulation and policy after they have been fully debriefed. 