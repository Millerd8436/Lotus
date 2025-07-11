// lib/core/behavioral-engine.ts

import { RealisticFormData, UserProfile } from "@/types/shared";

// NOTE: All local interface definitions for RealisticFormData and UserProfile
// have been removed. They are now imported from the single source of truth
// in `types/shared.ts`.

export class BehavioralPsychologyEngine {
  private profile: UserProfile;

  constructor(initialProfile: UserProfile) {
    this.profile = initialProfile;
  }

  private calculateLenderProfit(loanAmount: number): number {
    const apr = 391; // Predatory APR
    const termInYears = 14 / 365.25;
    const interest = loanAmount * (apr / 100) * termInYears;
    const operationalCost = loanAmount * 0.05; // Assume 5% operational cost
    return interest - operationalCost;
  }

  private calculateUserHarm(loanAmount: number, monthlyIncome: number): number {
    // This is a simplified model. A real one would be much more complex.
    // The harm increases exponentially as income decreases.
    const income = monthlyIncome * 12;
    // An arbitrary 'poverty line' below which harm is magnified
    const povertyLine = 20000;
    const incomeFactor = Math.max(1, povertyLine / (income > 0 ? income : 1));

    // The harm is the profit extracted, magnified by the user's financial vulnerability.
    const profit = this.calculateLenderProfit(loanAmount);
    return profit * incomeFactor * 2; // Extra multiplier to show significant negative utility
  }

  /**
   * Analyzes the user's financial data to update their behavioral profile.
   * This is the core of making the analysis "real".
   */
  public updateProfileOnInteraction(
    eventType: string,
    elementId: string,
    formData: RealisticFormData
    // details: any = {} // This parameter is no longer used
  ): UserProfile {
    // --- 1. Perform Financial Analysis based on FormData ---
    const monthlyIncome = Number(formData.monthlyIncome) || 0;
    const monthlyRent = Number(formData.monthlyRent) || 0;
    const loanAmount = Number(formData.loanAmount) || 0;

    // Calculate Debt-to-Income Ratio
    const monthlyDebts = monthlyRent; // Simplified; could include other debts
    this.profile.debtToIncomeRatio =
      monthlyIncome > 0 ? monthlyDebts / monthlyIncome : 1;

    // Infer Financial Literacy
    let literacyScore = 0.5; // Start at neutral
    if (this.profile.debtToIncomeRatio > 0.6) literacyScore -= 0.3; // High DTI is a red flag
    if (loanAmount > monthlyIncome) literacyScore -= 0.2; // Borrowing more than a month's income is risky
    if (formData.previousPaydayLoan) literacyScore -= 0.1; // Repeat borrowing indicates potential struggle
    this.profile.financialLiteracy = Math.max(0, Math.min(1, literacyScore));

    // Infer Emotional State from financial stress
    if (this.profile.debtToIncomeRatio > 0.7) {
      this.profile.emotionalState = "desperate";
    } else if (this.profile.debtToIncomeRatio > 0.5) {
      this.profile.emotionalState = "anxious";
    }

    // --- 2. Update Profile based on direct interaction (click, hover, etc.) ---
    // (This part can be expanded, but for now we focus on the financial analysis)
    if (eventType === "click" && elementId?.includes("submit")) {
      this.profile.decisionFatigue = Math.min(
        1,
        this.profile.decisionFatigue + 0.1
      );
      this.profile.cognitiveLoad = "high";
    }

    // --- 3. Recalculate Ethical Violation Metrics ---
    const lenderProfit = this.calculateLenderProfit(loanAmount);
    const userHarm = this.calculateUserHarm(loanAmount, monthlyIncome);
    this.profile.netUtilityScore = lenderProfit - userHarm;

    // Dehumanization is treating someone as a means to an end.
    // A high negative utility score is a good proxy for this.
    // The score approaches 1 as the lender's profit vastly outweighs user benefit.
    const dehumanizationFactor =
      this.profile.netUtilityScore < 0
        ? Math.abs(this.profile.netUtilityScore) / 1000
        : 0;
    this.profile.dehumanizationScore = Math.min(1, dehumanizationFactor);

    // --- 4. Update Vulnerability Score ---
    // This becomes a composite score of all other factors
    this.profile.vulnerabilityScore =
      this.profile.debtToIncomeRatio * 40 + // DTI is a major factor
      (1 - this.profile.financialLiteracy) * 30 + // Low literacy increases vulnerability
      this.profile.dehumanizationScore * 20 + // How badly they are being treated
      this.profile.decisionFatigue * 10; // Fatigue clouds judgment

    this.profile.vulnerabilityScore = Math.min(
      100,
      Math.max(0, this.profile.vulnerabilityScore)
    );

    return { ...this.profile };
  }

  public getPrediction(profile: UserProfile): {
    vulnerability: number;
    likelihood: number;
    message: string;
  } {
    const messages = [];

    // Message based on Debt-to-Income Ratio
    if (profile.debtToIncomeRatio > 0.7) {
      messages.push(
        "We see you're in a tight spot financially, and that's exactly why we're here to provide immediate relief."
      );
    } else if (profile.debtToIncomeRatio > 0.5) {
      messages.push(
        "Managing expenses is tough. A little extra cash from us can make all the difference."
      );
    }

    // Message based on Financial Literacy
    if (profile.financialLiteracy < 0.3) {
      messages.push(
        "Don't get bogged down by the complex numbers; what matters is getting the funds you need, fast."
      );
    }

    // Message based on Dehumanization Score (i.e., profitability)
    if (profile.dehumanizationScore > 0.6) {
      messages.push(
        "You're a perfect match for our premier loan product. Congratulations!"
      );
    }

    // Default or combined message
    let finalMessage =
      "Your application is being fast-tracked. We value your business.";
    if (messages.length > 0) {
      finalMessage =
        messages[Math.floor(Math.random() * messages.length)] || finalMessage; // Pick a random manipulative message
    }

    // Likelihood of approval is tied to how profitable (exploitable) the user is.
    const likelihood = 70 + (profile.vulnerabilityScore / 100) * 29;

    return {
      vulnerability: Math.round(profile.vulnerabilityScore),
      likelihood: Math.round(Math.min(99, likelihood)),
      message: finalMessage,
    };
  }
}
