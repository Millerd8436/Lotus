/**
 * CFPB 2025 REGULATORY COMPLIANCE ENGINE
 * Evaluates lending practices against CFPB abusive practice definitions and 2025 regulatory updates
 */

export interface CFPBComplianceAssessment {
  overallCompliance: "COMPLIANT" | "NON_COMPLIANT" | "QUESTIONABLE";
  complianceScore: number;
  abusivePracticesDetected: AbusivePracticeViolation[];
  deceptivePracticesDetected: DeceptivePracticeViolation[];
  unfairPracticesDetected: UdapViolation[];
  junkFeeViolations: JunkFeeViolation[];
  fintechSpecificViolations: FintechViolation[];
  recommendedActions: string[];
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

interface AbusivePracticeViolation {
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  description: string;
  cfpbCitation: string;
  evidence: string[];
  potentialPenalty: string;
}

interface DeceptivePracticeViolation {
  type: string;
  materialMisrepresentation: boolean;
  likelihood: "LOW" | "MEDIUM" | "HIGH";
  description: string;
  evidence: string[];
}

interface UdapViolation {
  type: string;
  injuryType: "FINANCIAL" | "EMOTIONAL" | "INFORMATIONAL";
  substantialInjury: boolean;
  reasonablyAvoidable: boolean;
  counterbalancingBenefits: boolean;
  description: string;
}

interface JunkFeeViolation {
  feeType: string;
  amount: number;
  justification: string;
  cfpb2025Status:
    | "PROHIBITED"
    | "RESTRICTED"
    | "REQUIRES_DISCLOSURE"
    | "ALLOWED";
  violation: boolean;
}

interface FintechViolation {
  type: string;
  platformSpecific: boolean;
  description: string;
  regulatoryGuidance: string;
}

export class CFPB2025ComplianceEngine {
  /**
   * Comprehensive CFPB compliance assessment
   */
  static assessCompliance(practiceData: {
    loanTerms: any;
    feeStructure: any;
    marketingMaterials: any[];
    disclosures: any[];
    dataCollection: any;
    userInterface: any;
    targetingCriteria: any;
    platformFeatures: any[];
  }): CFPBComplianceAssessment {
    const abusivePractices = this.detectAbusivePractices(practiceData);
    const deceptivePractices = this.detectDeceptivePractices(practiceData);
    const unfairPractices = this.detectUdapViolations(practiceData);
    const junkFeeViolations = this.assessJunkFees(practiceData);
    const fintechViolations =
      this.assessFintechSpecificCompliance(practiceData);

    const complianceScore = this.calculateComplianceScore({
      abusivePractices,
      deceptivePractices,
      unfairPractices,
      junkFeeViolations,
      fintechViolations,
    });

    const overallCompliance = this.determineOverallCompliance(
      complianceScore,
      abusivePractices
    );
    const riskLevel = this.assessRiskLevel(
      abusivePractices,
      deceptivePractices,
      unfairPractices
    );

    return {
      overallCompliance,
      complianceScore,
      abusivePracticesDetected: abusivePractices,
      deceptivePracticesDetected: deceptivePractices,
      unfairPracticesDetected: unfairPractices,
      junkFeeViolations,
      fintechSpecificViolations: fintechViolations,
      recommendedActions: this.generateRecommendations({
        abusivePractices,
        deceptivePractices,
        unfairPractices,
        junkFeeViolations,
        fintechViolations,
      }),
      riskLevel,
    };
  }

  /**
   * Detect abusive practices per CFPB definition:
   * "Takes unreasonable advantage of consumer's inability to protect their interests"
   */
  private static detectAbusivePractices(
    practiceData: any
  ): AbusivePracticeViolation[] {
    const violations: AbusivePracticeViolation[] = [];

    // 2025 CFPB abusive practice criteria
    const abusiveChecks = [
      {
        name: "Exploitation of inability to protect interests",
        test: () => this.checksVulnerabilityExploitation(practiceData),
        severity: "CRITICAL" as const,
        citation: "12 CFR 1002.4(a)(1)",
      },
      {
        name: "Abuse of consumer's reasonable reliance",
        test: () => this.checksReasonableRelianceAbuse(practiceData),
        severity: "HIGH" as const,
        citation: "12 CFR 1002.4(a)(3)",
      },
      {
        name: "Targeting vulnerable populations",
        test: () => this.checksVulnerableTargeting(practiceData),
        severity: "HIGH" as const,
        citation: "CFPB-2025-0001",
      },
      {
        name: "AI-powered exploitation",
        test: () => this.checksAIExploitation(practiceData),
        severity: "CRITICAL" as const,
        citation: "CFPB AI Guidance 2025",
      },
      {
        name: "Dark pattern manipulation",
        test: () => this.checksDarkPatternAbuse(practiceData),
        severity: "HIGH" as const,
        citation: "CFPB Dark Pattern Enforcement 2025",
      },
    ];

    for (const check of abusiveChecks) {
      const result = check.test();
      if (result.violation) {
        violations.push({
          type: check.name,
          severity: check.severity,
          description: result.description,
          cfpbCitation: check.citation,
          evidence: result.evidence,
          potentialPenalty: this.estimatePenalty(check.severity),
        });
      }
    }

    return violations;
  }

  /**
   * Detect deceptive practices - material misrepresentations likely to mislead
   */
  private static detectDeceptivePractices(
    practiceData: any
  ): DeceptivePracticeViolation[] {
    const violations: DeceptivePracticeViolation[] = [];

    const deceptiveChecks = [
      {
        name: "Hidden fee structures",
        test: () => this.checksHiddenFees(practiceData),
        material: true,
      },
      {
        name: "Misleading APR representations",
        test: () => this.checksAPRMisrepresentation(practiceData),
        material: true,
      },
      {
        name: "False urgency claims",
        test: () => this.checksFalseUrgency(practiceData),
        material: false,
      },
      {
        name: "Deceptive social proof",
        test: () => this.checksDeceptiveSocialProof(practiceData),
        material: false,
      },
      {
        name: "Misleading qualification requirements",
        test: () => this.checksQualificationDeception(practiceData),
        material: true,
      },
    ];

    for (const check of deceptiveChecks) {
      const result = check.test();
      if (result.violation) {
        violations.push({
          type: check.name,
          materialMisrepresentation: check.material,
          likelihood: result.likelihood,
          description: result.description,
          evidence: result.evidence,
        });
      }
    }

    return violations;
  }

  /**
   * Assess UDAP (Unfair, Deceptive, Abusive Practices) violations
   */
  private static detectUdapViolations(practiceData: any): UdapViolation[] {
    const violations: UdapViolation[] = [];

    // Test for substantial injury that is not reasonably avoidable
    const substantialInjuryTests = [
      {
        name: "Debt trap design",
        test: () => this.checksDebtTrapDesign(practiceData),
        injuryType: "FINANCIAL" as const,
      },
      {
        name: "Excessive data collection",
        test: () => this.checksExcessiveDataCollection(practiceData),
        injuryType: "INFORMATIONAL" as const,
      },
      {
        name: "Psychological manipulation causing stress",
        test: () => this.checksPsychologicalManipulation(practiceData),
        injuryType: "EMOTIONAL" as const,
      },
    ];

    for (const test of substantialInjuryTests) {
      const result = test.test();
      if (result.violation) {
        violations.push({
          type: test.name,
          injuryType: test.injuryType,
          substantialInjury: result.substantial,
          reasonablyAvoidable: result.avoidable,
          counterbalancingBenefits: result.benefits,
          description: result.description,
        });
      }
    }

    return violations;
  }

  /**
   * Assess junk fees against CFPB 2025 junk fee restrictions
   */
  private static assessJunkFees(practiceData: any): JunkFeeViolation[] {
    const violations: JunkFeeViolation[] = [];

    const feeTypes = [
      {
        name: "Processing fees",
        maxAllowed: 0, // CFPB 2025: Prohibited for digital processing
        status: "PROHIBITED" as const,
      },
      {
        name: "Documentation fees",
        maxAllowed: 25, // CFPB 2025: Limited for actual documentation costs
        status: "RESTRICTED" as const,
      },
      {
        name: "Express processing fees",
        maxAllowed: 0, // CFPB 2025: Standard processing should be free
        status: "PROHIBITED" as const,
      },
      {
        name: "Account maintenance fees",
        maxAllowed: 10, // CFPB 2025: Limited monthly maintenance
        status: "RESTRICTED" as const,
      },
      {
        name: "Early payment penalties",
        maxAllowed: 0, // CFPB 2025: Prohibited in short-term lending
        status: "PROHIBITED" as const,
      },
    ];

    for (const feeType of feeTypes) {
      const fee = practiceData.feeStructure.fees?.find(
        (f: any) => f.name === feeType.name
      );
      if (fee) {
        const violation =
          (feeType.status === "PROHIBITED" && fee.amount > 0) ||
          (feeType.status === "RESTRICTED" && fee.amount > feeType.maxAllowed);

        if (violation) {
          violations.push({
            feeType: feeType.name,
            amount: fee.amount,
            justification: fee.justification || "No justification provided",
            cfpb2025Status: feeType.status,
            violation: true,
          });
        }
      }
    }

    return violations;
  }

  /**
   * Assess fintech-specific compliance issues
   */
  private static assessFintechSpecificCompliance(
    practiceData: any
  ): FintechViolation[] {
    const violations: FintechViolation[] = [];

    const fintechChecks = [
      {
        name: "Algorithm transparency",
        test: () => this.checksAlgorithmTransparency(practiceData),
        platformSpecific: true,
        guidance: "CFPB AI Guidance 2025",
      },
      {
        name: "Data broker partnerships",
        test: () => this.checksDataBrokerCompliance(practiceData),
        platformSpecific: true,
        guidance: "CFPB Data Privacy Rules 2025",
      },
      {
        name: "Real-time manipulation",
        test: () => this.checksRealTimeManipulation(practiceData),
        platformSpecific: true,
        guidance: "CFPB Digital Dark Patterns 2025",
      },
      {
        name: "Cross-platform tracking",
        test: () => this.checksCrossTrackingCompliance(practiceData),
        platformSpecific: true,
        guidance: "CFPB Digital Privacy 2025",
      },
    ];

    for (const check of fintechChecks) {
      const result = check.test();
      if (result.violation) {
        violations.push({
          type: check.name,
          platformSpecific: check.platformSpecific,
          description: result.description,
          regulatoryGuidance: check.guidance,
        });
      }
    }

    return violations;
  }

  // Helper methods for specific compliance checks
  private static checksVulnerabilityExploitation(practiceData: any): any {
    const evidence = [];

    if (practiceData.targetingCriteria?.includesVulnerable) {
      evidence.push("Targets financially vulnerable populations");
    }

    if (practiceData.userInterface?.exploitsVulnerabilities) {
      evidence.push("UI designed to exploit cognitive vulnerabilities");
    }

    return {
      violation: evidence.length > 0,
      description:
        "Platform takes unreasonable advantage of consumer vulnerabilities",
      evidence,
    };
  }

  private static checksReasonableRelianceAbuse(practiceData: any): any {
    const evidence = [];

    if (practiceData.marketingMaterials?.some((m: any) => m.impliesExpertise)) {
      evidence.push("Marketing implies financial expertise/advice");
    }

    if (practiceData.disclosures?.inadequate) {
      evidence.push("Inadequate disclosures despite consumer reliance");
    }

    return {
      violation: evidence.length > 0,
      description: "Platform abuses consumer's reasonable reliance",
      evidence,
    };
  }

  private static checksVulnerableTargeting(practiceData: any): any {
    const targeting = practiceData.targetingCriteria || {};
    const evidence = [];

    if (targeting.lowIncome) evidence.push("Targets low-income consumers");
    if (targeting.poorCredit)
      evidence.push("Targets consumers with poor credit");
    if (targeting.emergencyLoans)
      evidence.push("Targets emergency loan seekers");
    if (targeting.minorityGroups)
      evidence.push("Disproportionately targets minority groups");

    return {
      violation: evidence.length >= 2, // Multiple vulnerability factors
      description: "Systematically targets vulnerable populations",
      evidence,
    };
  }

  private static checksAIExploitation(practiceData: any): any {
    const ai = practiceData.platformFeatures?.ai || {};
    const evidence = [];

    if (ai.predictivePricing)
      evidence.push("Uses AI for discriminatory pricing");
    if (ai.behavioralManipulation)
      evidence.push("AI algorithms designed to manipulate behavior");
    if (ai.vulnerabilityDetection)
      evidence.push("AI detects and exploits vulnerabilities");

    return {
      violation: evidence.length > 0,
      description: "AI systems used to exploit consumers",
      evidence,
    };
  }

  private static checksDarkPatternAbuse(practiceData: any): any {
    const darkPatterns = practiceData.userInterface?.darkPatterns || [];
    const abusivePatterns = [
      "forced_action",
      "roach_motel",
      "privacy_zuckering",
      "price_comparison_prevention",
    ];

    const violations = darkPatterns.filter((pattern: string) =>
      abusivePatterns.includes(pattern)
    );

    return {
      violation: violations.length > 0,
      description: "Uses dark patterns to manipulate consumer behavior",
      evidence: violations.map((v: string) => `Dark pattern detected: ${v}`),
    };
  }

  private static checksHiddenFees(practiceData: any): any {
    const fees = practiceData.feeStructure || {};
    const evidence = [];

    if (fees.hiddenInTerms)
      evidence.push("Fees buried in terms and conditions");
    if (fees.calculatedDynamically)
      evidence.push("Fees calculated after initial disclosure");
    if (fees.notInAPR)
      evidence.push("Material fees excluded from APR calculation");

    return {
      violation: evidence.length > 0,
      likelihood: "HIGH" as const,
      description: "Fee structure designed to hide true costs",
      evidence,
    };
  }

  private static checksAPRMisrepresentation(practiceData: any): any {
    const apr = practiceData.loanTerms?.apr || {};
    const evidence = [];

    if (apr.excludesFees)
      evidence.push("APR calculation excludes material fees");
    if (apr.basedOnUnrealistic)
      evidence.push("APR based on unrealistic repayment scenarios");
    if (apr.variableNotDisclosed)
      evidence.push("Variable rate terms not clearly disclosed");

    return {
      violation: evidence.length > 0,
      likelihood: "HIGH" as const,
      description: "APR representations are misleading",
      evidence,
    };
  }

  private static checksFalseUrgency(practiceData: any): any {
    const urgency = practiceData.marketingMaterials?.urgency || {};
    const evidence = [];

    if (urgency.fakeCountdowns) evidence.push("Fake countdown timers");
    if (urgency.artificialScarcity) evidence.push("False scarcity claims");
    if (urgency.limitedTime) evidence.push("Misleading limited-time offers");

    return {
      violation: evidence.length > 0,
      likelihood: "MEDIUM" as const,
      description: "Creates false sense of urgency",
      evidence,
    };
  }

  private static checksDeceptiveSocialProof(practiceData: any): any {
    const social = practiceData.marketingMaterials?.socialProof || {};
    const evidence = [];

    if (social.fakeReviews) evidence.push("Fabricated customer reviews");
    if (social.misleadingStats) evidence.push("Misleading usage statistics");
    if (social.astroturfing) evidence.push("Fake grassroots endorsements");

    return {
      violation: evidence.length > 0,
      likelihood: "HIGH" as const,
      description: "Uses deceptive social proof",
      evidence,
    };
  }

  private static checksQualificationDeception(practiceData: any): any {
    const qual = practiceData.loanTerms?.qualification || {};
    const evidence = [];

    if (qual.hiddenRequirements)
      evidence.push("Hidden qualification requirements");
    if (qual.baitAndSwitch)
      evidence.push("Advertised terms not available to most applicants");
    if (qual.impossibleCriteria)
      evidence.push("Nearly impossible qualification criteria");

    return {
      violation: evidence.length > 0,
      likelihood: "HIGH" as const,
      description: "Misleading qualification requirements",
      evidence,
    };
  }

  // Additional helper methods for UDAP and junk fee assessments
  private static checksDebtTrapDesign(practiceData: any): any {
    const design = practiceData.loanTerms?.structure || {};

    return {
      violation: design.designedForRollover || design.unaffordablePayments,
      substantial: true,
      avoidable: false,
      benefits: false,
      description: "Loan structure designed to create debt dependency",
    };
  }

  private static checksExcessiveDataCollection(practiceData: any): any {
    const data = practiceData.dataCollection || {};

    return {
      violation: data.excessive || data.irrelevantToLoan,
      substantial: data.sensitive || false,
      avoidable: false,
      benefits: false,
      description:
        "Collects excessive personal data unrelated to lending decision",
    };
  }

  private static checksPsychologicalManipulation(practiceData: any): any {
    const psychological = practiceData.userInterface?.psychological || {};

    return {
      violation: psychological.stressInduction || psychological.timeConstraints,
      substantial: psychological.causesDistress || false,
      avoidable: false,
      benefits: false,
      description:
        "Interface designed to cause psychological stress and impair decision-making",
    };
  }

  private static checksAlgorithmTransparency(practiceData: any): any {
    const algo = practiceData.platformFeatures?.algorithms || {};

    return {
      violation: !algo.transparent || algo.discriminatory,
      description: "Algorithm lacks required transparency or demonstrates bias",
    };
  }

  private static checksDataBrokerCompliance(practiceData: any): any {
    const brokers = practiceData.dataCollection?.brokers || {};

    return {
      violation: !brokers.disclosed || !brokers.optOut,
      description:
        "Data broker partnerships not properly disclosed or lack opt-out",
    };
  }

  private static checksRealTimeManipulation(practiceData: any): any {
    const realTime = practiceData.platformFeatures?.realTime || {};

    return {
      violation: realTime.behavioralNudging || realTime.dynamicPricing,
      description: "Real-time behavioral manipulation detected",
    };
  }

  private static checksCrossTrackingCompliance(practiceData: any): any {
    const tracking = practiceData.dataCollection?.crossPlatform || {};

    return {
      violation: !tracking.disclosed || !tracking.consent,
      description:
        "Cross-platform tracking without proper disclosure and consent",
    };
  }

  // Scoring and assessment methods
  private static calculateComplianceScore(results: any): number {
    let score = 100;

    // Heavy penalties for abusive practices
    score -= results.abusivePractices.length * 20;

    // Moderate penalties for deceptive practices
    score -= results.deceptivePractices.length * 10;

    // Light penalties for unfair practices
    score -= results.unfairPractices.length * 5;

    // Junk fee penalties
    score -= results.junkFeeViolations.length * 8;

    // Fintech-specific penalties
    score -= results.fintechViolations.length * 12;

    return Math.max(0, score);
  }

  private static determineOverallCompliance(
    score: number,
    abusivePractices: AbusivePracticeViolation[]
  ): "COMPLIANT" | "NON_COMPLIANT" | "QUESTIONABLE" {
    if (abusivePractices.some((p) => p.severity === "CRITICAL")) {
      return "NON_COMPLIANT";
    }

    if (score >= 80) return "COMPLIANT";
    if (score >= 60) return "QUESTIONABLE";
    return "NON_COMPLIANT";
  }

  private static assessRiskLevel(
    abusive: any[],
    deceptive: any[],
    unfair: any[]
  ): "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" {
    const criticalAbusive = abusive.filter(
      (a) => a.severity === "CRITICAL"
    ).length;
    const highRiskIssues =
      abusive.length +
      deceptive.filter((d) => d.materialMisrepresentation).length;

    if (criticalAbusive > 0) return "CRITICAL";
    if (highRiskIssues >= 3) return "HIGH";
    if (highRiskIssues >= 1) return "MEDIUM";
    return "LOW";
  }

  private static estimatePenalty(severity: string): string {
    const penalties = {
      LOW: "$50,000 - $100,000",
      MEDIUM: "$100,000 - $500,000",
      HIGH: "$500,000 - $2,000,000",
      CRITICAL: "$2,000,000 - $10,000,000+",
    };
    return penalties[severity as keyof typeof penalties] || "Unknown";
  }

  private static generateRecommendations(results: any): string[] {
    const recommendations: string[] = [];

    if (results.abusivePractices.length > 0) {
      recommendations.push(
        "Immediately cease abusive practices to avoid enforcement action"
      );
      recommendations.push(
        "Implement consumer protection protocols and vulnerability safeguards"
      );
    }

    if (results.junkFeeViolations.length > 0) {
      recommendations.push(
        "Eliminate prohibited junk fees and reduce restricted fees to compliant levels"
      );
    }

    if (results.fintechViolations.length > 0) {
      recommendations.push(
        "Enhance algorithm transparency and data privacy protections"
      );
    }

    if (results.deceptivePractices.length > 0) {
      recommendations.push(
        "Revise marketing materials and disclosures for accuracy and clarity"
      );
    }

    return recommendations;
  }
}
