/**
 * KANTIAN ETHICS ASSESSMENT ENGINE
 * Evaluates lending practices against categorical imperative and Kantian moral principles
 */

export interface KantianAssessment {
  overallScore: number;
  categoricalImperativeTest: CategoricalImperativeResult;
  universalizabilityTest: UniversalizabilityResult;
  humanityFormulation: HumanityFormulationResult;
  autonomyRespect: AutonomyRespectResult;
  moralLawTest: MoralLawResult;
  ethicalRecommendations: string[];
}

interface CategoricalImperativeResult {
  score: number;
  violations: string[];
  analysis: string;
  universalizability: boolean;
}

interface UniversalizabilityResult {
  score: number;
  canUniversalize: boolean;
  contradictions: string[];
  reasoning: string;
}

interface HumanityFormulationResult {
  score: number;
  treatsAsEnd: boolean;
  respectsDignity: boolean;
  violations: string[];
  analysis: string;
}

interface AutonomyRespectResult {
  score: number;
  respectsAutonomy: boolean;
  informedConsent: boolean;
  manipulationPresent: boolean;
  coercionDetected: boolean;
  analysis: string;
}

interface MoralLawResult {
  score: number;
  followsMoralLaw: boolean;
  dutiesBreach: string[];
  maxims: string[];
  analysis: string;
}

export class KantianEthicsEngine {
  /**
   * Perform comprehensive Kantian ethics assessment of lending practices
   */
  static assessLendingPractice(practiceData: {
    loanTerms: any;
    darkPatterns: string[];
    userVulnerabilities: string[];
    marketingTactics: string[];
    consentMechanisms: any[];
    feeStructure: any;
    disclosures: any[];
  }): KantianAssessment {
    const categoricalImperative =
      this.evaluateCategoricalImperative(practiceData);
    const universalizability = this.testUniversalizability(practiceData);
    const humanityFormulation = this.evaluateHumanityFormulation(practiceData);
    const autonomyRespect = this.assessAutonomyRespect(practiceData);
    const moralLaw = this.evaluateMoralLaw(practiceData);

    const overallScore = this.calculateOverallScore({
      categoricalImperative,
      universalizability,
      humanityFormulation,
      autonomyRespect,
      moralLaw,
    });

    return {
      overallScore,
      categoricalImperativeTest: categoricalImperative,
      universalizabilityTest: universalizability,
      humanityFormulation,
      autonomyRespect,
      moralLawTest: moralLaw,
      ethicalRecommendations: this.generateRecommendations({
        categoricalImperative,
        universalizability,
        humanityFormulation,
        autonomyRespect,
        moralLaw,
      }),
    };
  }

  /**
   * Test the Categorical Imperative: "Act only according to that maxim whereby you can at the same time will that it should become a universal law"
   */
  private static evaluateCategoricalImperative(
    practiceData: any
  ): CategoricalImperativeResult {
    const violations: string[] = [];
    let score = 100;

    // Test if the practice could be universalized
    const maxims = this.extractMaxims(practiceData);

    for (const maxim of maxims) {
      const universalizable = this.testMaximUniversalizability(
        maxim,
        practiceData
      );
      if (!universalizable.canUniversalize) {
        violations.push(
          `Maxim "${maxim}" fails universalizability test: ${universalizable.reason}`
        );
        score -= 20;
      }
    }

    // Specific lending violations
    if (practiceData.darkPatterns.includes("hidden_fees")) {
      violations.push(
        "Hidden fees violate transparency duty - cannot universalize deception"
      );
      score -= 15;
    }

    if (practiceData.darkPatterns.includes("false_urgency")) {
      violations.push(
        "False urgency creates artificial pressure - universalizing would destroy trust"
      );
      score -= 15;
    }

    if (practiceData.darkPatterns.includes("exploitation_of_desperation")) {
      violations.push(
        "Exploiting desperation is predatory - universalizing would harm society's most vulnerable"
      );
      score -= 25;
    }

    return {
      score: Math.max(0, score),
      violations,
      analysis: this.generateCategoricalImperativeAnalysis(violations, score),
      universalizability: violations.length === 0,
    };
  }

  /**
   * Test universalizability of specific practices
   */
  private static testUniversalizability(
    practiceData: any
  ): UniversalizabilityResult {
    const contradictions: string[] = [];
    let score = 100;

    // Test key practices for logical contradictions when universalized
    const practices = [
      {
        name: "Targeting financially desperate individuals",
        test: () => {
          if (
            practiceData.userVulnerabilities.includes("financial_desperation")
          ) {
            contradictions.push(
              "If all lenders targeted only desperate people, no one would have good credit options, destroying the financial system"
            );
            return false;
          }
          return true;
        },
      },
      {
        name: "Using deceptive marketing",
        test: () => {
          if (
            practiceData.marketingTactics.some((t: string) =>
              t.includes("deceptive")
            )
          ) {
            contradictions.push(
              "Universal deception would make all communication meaningless and destroy the possibility of trust"
            );
            return false;
          }
          return true;
        },
      },
      {
        name: "Burying important terms",
        test: () => {
          if (practiceData.darkPatterns.includes("buried_terms")) {
            contradictions.push(
              "If everyone hid important information, informed consent would be impossible"
            );
            return false;
          }
          return true;
        },
      },
      {
        name: "Charging excessive fees relative to service",
        test: () => {
          if (
            practiceData.feeStructure.totalFees >
            practiceData.feeStructure.loanAmount * 0.5
          ) {
            contradictions.push(
              "Universal excessive pricing would make goods/services accessible only to the wealthy, violating equal access"
            );
            return false;
          }
          return true;
        },
      },
    ];

    let canUniversalize = true;
    for (const practice of practices) {
      if (!practice.test()) {
        canUniversalize = false;
        score -= 25;
      }
    }

    return {
      score: Math.max(0, score),
      canUniversalize,
      contradictions,
      reasoning: canUniversalize
        ? "Practices can be universalized without logical contradiction"
        : "Practices fail universalizability test due to logical contradictions",
    };
  }

  /**
   * Evaluate the Humanity Formulation: "Act so that you treat humanity, whether in your own person or in that of another, always as an end and never merely as a means"
   */
  private static evaluateHumanityFormulation(
    practiceData: any
  ): HumanityFormulationResult {
    const violations: string[] = [];
    let score = 100;

    // Check if borrowers are treated as ends in themselves
    const treatsAsEnd = this.assessTreatmentAsEnd(practiceData);
    const respectsDignity = this.assessHumanDignity(practiceData);

    if (!treatsAsEnd) {
      violations.push(
        "Borrowers are treated merely as sources of profit, not as rational agents deserving respect"
      );
      score -= 30;
    }

    if (!respectsDignity) {
      violations.push(
        "Practices undermine human dignity through manipulation and exploitation"
      );
      score -= 25;
    }

    // Specific violations
    if (practiceData.darkPatterns.includes("vulnerability_exploitation")) {
      violations.push(
        "Exploiting cognitive or emotional vulnerabilities treats people as mere means to profit"
      );
      score -= 20;
    }

    if (
      practiceData.darkPatterns.includes(
        "data_harvesting_without_clear_consent"
      )
    ) {
      violations.push(
        "Using personal data without clear consent treats people as data sources, not autonomous agents"
      );
      score -= 15;
    }

    return {
      score: Math.max(0, score),
      treatsAsEnd,
      respectsDignity,
      violations,
      analysis: this.generateHumanityFormulationAnalysis(
        violations,
        treatsAsEnd,
        respectsDignity
      ),
    };
  }

  /**
   * Assess respect for autonomy
   */
  private static assessAutonomyRespect(
    practiceData: any
  ): AutonomyRespectResult {
    let score = 100;

    const informedConsent = this.evaluateInformedConsent(practiceData);
    const manipulationPresent = this.detectManipulation(practiceData);
    const coercionDetected = this.detectCoercion(practiceData);

    const respectsAutonomy =
      informedConsent && !manipulationPresent && !coercionDetected;

    if (!informedConsent) score -= 30;
    if (manipulationPresent) score -= 25;
    if (coercionDetected) score -= 25;

    return {
      score: Math.max(0, score),
      respectsAutonomy,
      informedConsent,
      manipulationPresent,
      coercionDetected,
      analysis: this.generateAutonomyAnalysis(
        informedConsent,
        manipulationPresent,
        coercionDetected
      ),
    };
  }

  /**
   * Evaluate adherence to moral law
   */
  private static evaluateMoralLaw(practiceData: any): MoralLawResult {
    const dutiesBreach: string[] = [];
    const maxims: string[] = [];
    let score = 100;

    // Perfect duties (cannot be violated)
    if (practiceData.darkPatterns.includes("outright_deception")) {
      dutiesBreach.push(
        "Perfect duty of truthfulness violated through deceptive practices"
      );
      score -= 40;
    }

    // Imperfect duties (should generally be followed)
    if (!this.demonstratesBeneficence(practiceData)) {
      dutiesBreach.push(
        "Imperfect duty of beneficence not fulfilled - practices harm rather than help"
      );
      score -= 20;
    }

    if (!this.supportsHumanFlourishing(practiceData)) {
      dutiesBreach.push(
        "Duty to support human development and flourishing not met"
      );
      score -= 15;
    }

    maxims.push(...this.extractMaxims(practiceData));

    return {
      score: Math.max(0, score),
      followsMoralLaw: dutiesBreach.length === 0,
      dutiesBreach,
      maxims,
      analysis: this.generateMoralLawAnalysis(dutiesBreach, maxims),
    };
  }

  // Helper methods
  private static extractMaxims(practiceData: any): string[] {
    const maxims: string[] = [];

    if (practiceData.darkPatterns.length > 0) {
      maxims.push("Act to maximize profit through psychological manipulation");
    }

    if (practiceData.feeStructure.hidden) {
      maxims.push("Hide true costs to increase likelihood of acceptance");
    }

    if (practiceData.userVulnerabilities.length > 0) {
      maxims.push("Target those least able to protect themselves");
    }

    return maxims;
  }

  private static testMaximUniversalizability(
    maxim: string,
    practiceData: any
  ): { canUniversalize: boolean; reason: string } {
    const universalizationTests = {
      "Act to maximize profit through psychological manipulation": {
        canUniversalize: false,
        reason:
          "Universal manipulation would destroy trust and rational decision-making",
      },
      "Hide true costs to increase likelihood of acceptance": {
        canUniversalize: false,
        reason:
          "Universal cost-hiding would make informed economic decisions impossible",
      },
      "Target those least able to protect themselves": {
        canUniversalize: false,
        reason:
          "Universal exploitation of vulnerability would systematically harm the most disadvantaged",
      },
    };

    return (
      universalizationTests[maxim as keyof typeof universalizationTests] || {
        canUniversalize: true,
        reason: "No obvious contradiction",
      }
    );
  }

  private static assessTreatmentAsEnd(practiceData: any): boolean {
    // Check if borrower interests are genuinely considered
    return (
      !practiceData.darkPatterns.includes("pure_profit_extraction") &&
      practiceData.loanTerms.considersBorrowerWelfare === true
    );
  }

  private static assessHumanDignity(practiceData: any): boolean {
    return (
      !practiceData.darkPatterns.includes("dehumanizing_language") &&
      !practiceData.darkPatterns.includes("vulnerability_exploitation")
    );
  }

  private static evaluateInformedConsent(practiceData: any): boolean {
    return practiceData.consentMechanisms.some(
      (consent: any) =>
        consent.clear && consent.understandable && consent.voluntary
    );
  }

  private static detectManipulation(practiceData: any): boolean {
    const manipulativePatterns = [
      "false_urgency",
      "social_proof_abuse",
      "loss_aversion_exploitation",
    ];
    return practiceData.darkPatterns.some((pattern: string) =>
      manipulativePatterns.includes(pattern)
    );
  }

  private static detectCoercion(practiceData: any): boolean {
    return (
      practiceData.darkPatterns.includes("desperation_exploitation") ||
      practiceData.darkPatterns.includes("economic_duress")
    );
  }

  private static demonstratesBeneficence(practiceData: any): boolean {
    return (
      practiceData.loanTerms.helpsBorrower === true &&
      !practiceData.darkPatterns.includes("debt_trap_design")
    );
  }

  private static supportsHumanFlourishing(practiceData: any): boolean {
    return practiceData.loanTerms.supportsLongTermWelfare === true;
  }

  private static calculateOverallScore(results: any): number {
    const weights = {
      categoricalImperative: 0.3,
      universalizability: 0.25,
      humanityFormulation: 0.25,
      autonomyRespect: 0.15,
      moralLaw: 0.05,
    };

    return Math.round(
      results.categoricalImperative.score * weights.categoricalImperative +
        results.universalizability.score * weights.universalizability +
        results.humanityFormulation.score * weights.humanityFormulation +
        results.autonomyRespect.score * weights.autonomyRespect +
        results.moralLaw.score * weights.moralLaw
    );
  }

  private static generateRecommendations(results: any): string[] {
    const recommendations: string[] = [];

    if (results.categoricalImperative.score < 70) {
      recommendations.push(
        "Redesign practices to pass universalizability test - ask 'what if everyone did this?'"
      );
    }

    if (!results.humanityFormulation.treatsAsEnd) {
      recommendations.push(
        "Shift focus from pure profit extraction to genuinely serving borrower needs"
      );
    }

    if (!results.autonomyRespect.respectsAutonomy) {
      recommendations.push(
        "Eliminate manipulative tactics and ensure truly informed, voluntary consent"
      );
    }

    if (results.universalizability.contradictions.length > 0) {
      recommendations.push(
        "Address logical contradictions in business model that harm when universalized"
      );
    }

    return recommendations;
  }

  // Analysis generation methods
  private static generateCategoricalImperativeAnalysis(
    violations: string[],
    score: number
  ): string {
    if (score >= 80) {
      return "Practices generally align with categorical imperative principles";
    } else if (score >= 60) {
      return "Some practices violate categorical imperative but overall approach is partially ethical";
    } else {
      return "Significant violations of categorical imperative indicate fundamentally unethical approach";
    }
  }

  private static generateHumanityFormulationAnalysis(
    violations: string[],
    treatsAsEnd: boolean,
    respectsDignity: boolean
  ): string {
    if (treatsAsEnd && respectsDignity) {
      return "Practices respect human dignity and treat borrowers as ends in themselves";
    } else {
      return "Practices fail to adequately respect human dignity and tend to use borrowers merely as means to profit";
    }
  }

  private static generateAutonomyAnalysis(
    informedConsent: boolean,
    manipulationPresent: boolean,
    coercionDetected: boolean
  ): string {
    if (informedConsent && !manipulationPresent && !coercionDetected) {
      return "Practices respect borrower autonomy and decision-making capacity";
    } else {
      return "Practices undermine borrower autonomy through manipulation, coercion, or inadequate consent processes";
    }
  }

  private static generateMoralLawAnalysis(
    dutiesBreach: string[],
    maxims: string[]
  ): string {
    if (dutiesBreach.length === 0) {
      return "Practices align with moral law and ethical duties";
    } else {
      return `Practices violate moral law through: ${dutiesBreach.join(", ")}`;
    }
  }
}
