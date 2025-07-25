# Lotus Project: Scientific Research Plan (2025 Payday Loan Study)

## 1. Research Overview & Hypothesis

This document outlines the methodology for a controlled scientific study comparing two simulated payday loan application platforms: `EasyLend` (Experimental Group) and `FairLend` (Control Group). The study aims to measure the impact of specific predatory financial practices on user behavior, comprehension, and decision-making.

Our core hypothesis is: **The presence of scientifically-validated predatory lending tactics, including deceptive UI/UX, fee obfuscation, and the exploitation of regulatory loopholes, will lead to users in the `EasyLend` simulation agreeing to significantly less favorable loan terms, demonstrating lower comprehension of those terms, and reporting higher levels of stress and regret compared to users in the `FairLend` control group.**

## 2. Methodology: A Controlled Experiment

The two simulators, `EasyLend` and `FairLend`, will be **structurally identical**. They will feature the same number of steps in the application process, ask for the same core information, and have the same visual branding and layout. The only differences will be the carefully implemented **Independent Variables (IVs)**, which are the specific predatory tactics under examination.

- **Experimental Group (`EasyLend`):** This simulator will incorporate the predatory IVs identified in our research of 2025 lending practices.
- **Control Group (`FairLend`):** This simulator will present the same application flow but in a clear, transparent, and ethically-designed manner, fully compliant with consumer protection principles. It will serve as the baseline for comparison.
- **Dependent Variables (DVs):** We will measure:
    - Final loan terms agreed upon (APR, total repayment amount).
    - User performance on a post-simulation quiz assessing comprehension of loan terms.
    - Self-reported user survey data on stress, confidence, and trust in the lender.
- **Debriefing (`Echo Mode`):** After completing the `EasyLend` simulation and the quiz, users will enter an annotated replay of their session. This "Echo Mode" will highlight and explain the predatory tactics they encountered, providing an educational debrief.

## 3. Independent Variables (IVs) for Implementation

Based on research of 2025 payday loan and fintech practices, the following IVs will be implemented. Each step component will be built to toggle these features based on a `isEthical` prop.

| Independent Variable (IV) | `EasyLend` (Experimental) Implementation | `FairLend` (Control) Implementation |
| :--- | :--- | :--- |
| **IV-01: Fee Obfuscation** | Uses "Tips" and "Donations" instead of interest. Deceptively frames these as optional but uses dark patterns (17 clicks to opt-out, as per NCLC research) to make them functionally mandatory. Fees are presented in small, low-contrast text. Utilizes "Annualized Cost of Capital" instead of APR, a misleading metric. | Clearly discloses a single, all-inclusive Annual Percentage Rate (APR) as required by TILA. No hidden fees, "tips," or confusing alternative metrics. The APR is displayed prominently. |
| **IV-02: Urgency & Scarcity** | Employs countdown timers ("Offer expires in 2:59"), and false scarcity messages ("Only 3 loans left at this rate!"). UI elements use high-pressure colors (e.g., pulsing red buttons). | No artificial pressure. The user is encouraged to take their time. UI is calm and neutral. |
| **IV-03: Bait-and-Switch** | Advertises a low "representative" rate on the homepage, but the actual rate offered after data submission is significantly higher, blaming the user's "risk profile." | The advertised rate is the actual rate the user will receive, or a very narrow, clearly explained range is provided upfront. |
| **IV-04: Confession of Judgment** | Buries a "Confession of Judgment" clause deep within the Terms & Conditions. This archaic contract, still exploited in 2025, forces the user to waive their right to defend themselves in court if the lender sues. | No "Confession of Judgment." The terms are standard and do not ask the user to waive fundamental legal protections. |
| **IV-05: Regulatory Arbitrage** | The API backend for `EasyLend` will be configured to model a "Fintech-Bank Partnership" that circumvents state usury laws, allowing for triple-digit APRs that would otherwise be illegal. | The API backend for `FairLend` will be configured to adhere strictly to state-level usury caps (e.g., 25% in NY), representing a direct lending model. |
| **IV-06: Loan Flipping & Forced Continuity** | After the initial loan is approved, the UI will aggressively push the user to "refinance" into a larger loan or automatically enroll them in a costly monthly "credit monitoring" service, requiring a difficult opt-out process. | No upselling or cross-selling. The process concludes cleanly after the initial loan decision. Any additional services are offered on a strictly opt-in basis. |
| **IV-07: Data Harvesting & Privacy Invasion** | The "Personal Info" step requests excessive, unnecessary permissions, such as access to all phone contacts "to verify your identity." This mirrors tactics used to harass borrowers' social networks. | Only essential information required for underwriting is requested. Data usage is clearly explained, and no unnecessary permissions are sought. |

## 4. Implementation Plan

1.  **Codebase Refactoring:** Aggressively prune the existing codebase, deleting all components and pages related to the old 4-phase model. Create a unified set of step components.
2.  **Component Development:** Build each step of the loan application as a single, reusable component. This component will contain the logic for both the `EasyLend` and `FairLend` variations, toggled by an `isEthical` prop.
3.  **API Simulation:** Develop two distinct API endpoint configurations (`/api/easylend` and `/api/fairlend`) that simulate the different regulatory models (IV-05).
4.  **Quiz & Echo Mode:** Develop the post-simulation quiz and the annotated replay functionality.

This plan ensures a rigorous, controlled experiment that will generate meaningful data on the real-world impact of predatory lending in 2025. 