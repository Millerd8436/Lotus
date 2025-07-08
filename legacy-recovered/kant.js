// engine/kant.js
class Kant {
  static analyze(session) {
    const violations = [];
    // Check for deception and lack of transparency
    if (
      session.darkPatternsEncountered.includes(
        "ExploitMech_6_FinePrintConsentObscure",
      ) ||
      session.ui_aprWasHidden
    ) {
      violations.push({
        name: "Categorical Imperative Violation: Deception",
        description:
          "The user was asked to consent without clear, upfront disclosure of key terms (like APR or full ToS). A universal law allowing such deception would make contracts meaningless.",
      });
    }
    // Check for coercion
    if (
      session.darkPatternsEncountered.some(
        (p) => p.includes("TimePressure") || p.includes("EmotionalAppeal"),
      )
    ) {
      violations.push({
        name: "Autonomy Violation: Coercion",
        description:
          "The use of emotional appeals to desperation and high-pressure tactics undermines the user's ability to give voluntary, uncoerced consent, violating their autonomy.",
      });
    }
    // Check for treating user as a means to an end
    if (
      session.totalRepayment > session.amount * 2 &&
      session.aprCalculated > 100
    ) {
      violations.push({
        name: "Humanity as an End Violation",
        description: `The loan terms are so unfavorable (APR: ${session.aprCalculated.toFixed(0)}%) that they treat the borrower merely as a means to generate profit, not as a rational agent whose financial well-being matters.`,
      });
    }
    // Check for systemic exploitation (debt trap)
    if (
      session.darkPatternsEncountered.includes(
        "ExploitMech_1_EndlessRolloverTrap",
      ) ||
      session.renewalsTaken > 2
    ) {
      violations.push({
        name: "Duty Violation: Systemic Harm",
        description:
          "The loan is structured to encourage a cycle of debt (rollovers), which is a deceptive practice that violates the duty to create fair and transparent financial systems.",
      });
    }

    // Check for failure of informed consent pillars
    if (!session.quizPassedOverall && session.consentGiven) {
      violations.push({
        name: "Informed Consent Violation: Comprehension",
        description:
          "The user consented without demonstrating a clear understanding of the terms (failed quiz), meaning the consent was not fully informed.",
      });
    }
    return violations;
  }
}

function evaluateConsent(session) {
  const analysis = [];
  if (!session.consentGiven) {
    analysis.push("Consent was not explicitly provided by the user.");
  }
  if (session.darkPatternsEncountered.includes("SuperficialConsent")) {
    analysis.push(
      "Consent was obtained using manipulative language, making it superficial.",
    );
  }
  if (!session.fullDisclosureProvided) {
    analysis.push(
      "Full disclosure of terms was not provided before consent was requested.",
    );
  }
  if (!session.voluntarinessAffirmedByDeclaration) {
    analysis.push(
      "The user's voluntary choice was not explicitly confirmed, or they indicated they felt pressured.",
    );
  }
  if (analysis.length === 0 && session.consentGiven) {
    analysis.push(
      "The consent process appears ethically sound based on the available data.",
    );
  } else if (analysis.length === 0 && !session.consentGiven) {
    analysis.push("The user did not complete the consent process.");
  }
  return analysis;
}

export { Kant, evaluateConsent };
