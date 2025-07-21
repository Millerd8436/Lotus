/**
 * BEHAVIORAL MANIPULATION SCORING ENGINE
 * Tracks vulnerability exploitation, psychological pressure tactics, and consent theater patterns
 */

import {
  calculateVulnerability,
  getManipulationTactics,
} from "./helpers";
import { LoanApplication, UserProfile } from "@/types";

export interface BehavioralManipulationAssessment {
  overallScore: number; // 0-100, where 100 is maximum manipulation
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  vulnerabilityExploitation: VulnerabilityExploitationScore;
  psychologicalPressure: PsychologicalPressureScore;
  consentTheater: ConsentTheaterScore;
  cognitiveOverload: CognitiveOverloadScore;
  timeManipulation: TimeManipulationScore;
  emotionalExploitation: EmotionalExploitationScore;
  socialPressure: SocialPressureScore;
  detailedFindings: ManipulationFinding[];
  protectiveRecommendations: string[];
}

interface VulnerabilityExploitationScore {
  score: number;
  targetedVulnerabilities: string[];
  exploitationTactics: string[];
  evidence: string[];
}

interface PsychologicalPressureScore {
  score: number;
  pressureTechniques: string[];
  cognitiveLoad: number;
  stressInducers: string[];
  evidence: string[];
}

interface ConsentTheaterScore {
  score: number;
  theaterTactics: string[];
  genuineConsent: boolean;
  informedConsent: boolean;
  voluntaryConsent: boolean;
  evidence: string[];
}

interface CognitiveOverloadScore {
  score: number;
  overloadTactics: string[];
  informationComplexity: number;
  decisionFatigue: number;
  evidence: string[];
}

interface TimeManipulationScore {
  score: number;
  urgencyTactics: string[];
  timeConstraints: string[];
  artificial: boolean;
  evidence: string[];
}

interface EmotionalExploitationScore {
  score: number;
  exploitedEmotions: string[];
  manipulationTechniques: string[];
  vulnerability: number;
  evidence: string[];
}

interface SocialPressureScore {
  score: number;
  pressureTactics: string[];
  fakeConsensus: boolean;
  authorityAbuse: boolean;
  evidence: string[];
}

interface ManipulationFinding {
  category: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  technique: string;
  description: string;
  evidence: string[];
  psychologicalMechanism: string;
  protectiveGuidance: string;
}

export class BehavioralManipulationEngine {
  /**
   * Comprehensive behavioral manipulation assessment
   */
  static assessManipulation(sessionData: {
    userInterface: any;
    marketingMaterials: any[];
    disclosures: any[];
    userProfile: any;
    interactionPatterns: any[];
    timingData: any;
    pressureTactics: any[];
    consentFlow: any;
  }): BehavioralManipulationAssessment {
    const vulnerabilityExploitation =
      this.assessVulnerabilityExploitation(sessionData);
    const psychologicalPressure = this.assessPsychologicalPressure(sessionData);
    const consentTheater = this.assessConsentTheater(sessionData);
    const cognitiveOverload = this.assessCognitiveOverload(sessionData);
    const timeManipulation = this.assessTimeManipulation(sessionData);
    const emotionalExploitation = this.assessEmotionalExploitation(sessionData);
    const socialPressure = this.assessSocialPressure(sessionData);

    const overallScore = this.calculateOverallScore({
      vulnerabilityExploitation,
      psychologicalPressure,
      consentTheater,
      cognitiveOverload,
      timeManipulation,
      emotionalExploitation,
      socialPressure,
    });

    const detailedFindings = this.compileDetailedFindings({
      vulnerabilityExploitation,
      psychologicalPressure,
      consentTheater,
      cognitiveOverload,
      timeManipulation,
      emotionalExploitation,
      socialPressure,
    });

    return {
      overallScore,
      riskLevel: this.determineRiskLevel(overallScore, detailedFindings),
      vulnerabilityExploitation,
      psychologicalPressure,
      consentTheater,
      cognitiveOverload,
      timeManipulation,
      emotionalExploitation,
      socialPressure,
      detailedFindings,
      protectiveRecommendations:
        this.generateProtectiveRecommendations(detailedFindings),
    };
  }

  /**
   * Assess vulnerability exploitation patterns
   */
  private static assessVulnerabilityExploitation(
    sessionData: any
  ): VulnerabilityExploitationScore {
    const vulnerabilities = sessionData.userProfile?.vulnerabilities || [];
    const targetedVulnerabilities: string[] = [];
    const exploitationTactics: string[] = [];
    const evidence: string[] = [];
    let score = 0;

    // Financial vulnerability targeting
    if (vulnerabilities.includes("financial_desperation")) {
      if (
        sessionData.marketingMaterials?.some((m: any) => m.targetsEmergency)
      ) {
        targetedVulnerabilities.push("Financial desperation");
        exploitationTactics.push("Emergency targeting");
        evidence.push("Marketing specifically targets financial emergencies");
        score += 25;
      }
    }

    // Low financial literacy exploitation
    if (vulnerabilities.includes("low_financial_literacy")) {
      if (
        sessionData.userInterface?.complexTerms ||
        sessionData.disclosures?.some((d: any) => d.unnecessarilyComplex)
      ) {
        targetedVulnerabilities.push("Low financial literacy");
        exploitationTactics.push("Complex terminology abuse");
        evidence.push(
          "Interface uses complex financial terms without explanation"
        );
        score += 20;
      }
    }

    // Age-based vulnerability exploitation
    if (
      vulnerabilities.includes("elderly") ||
      vulnerabilities.includes("young_adult")
    ) {
      const ageGroup = vulnerabilities.includes("elderly")
        ? "elderly"
        : "young adults";
      if (
        sessionData.marketingMaterials?.some(
          (m: any) => m.targetsDemographic === ageGroup
        )
      ) {
        targetedVulnerabilities.push(`${ageGroup} targeting`);
        exploitationTactics.push("Demographic vulnerability exploitation");
        evidence.push(
          `Specifically targets ${ageGroup} known to be vulnerable to financial exploitation`
        );
        score += 30;
      }
    }

    // Cognitive load exploitation
    if (
      vulnerabilities.includes("high_stress") ||
      vulnerabilities.includes("decision_fatigue")
    ) {
      if (
        sessionData.timingData?.rushesDecisions ||
        sessionData.userInterface?.overwhelmingOptions
      ) {
        targetedVulnerabilities.push("Cognitive impairment");
        exploitationTactics.push("Cognitive load exploitation");
        evidence.push(
          "Interface designed to overwhelm stressed or fatigued users"
        );
        score += 20;
      }
    }

    // Language barrier exploitation
    if (vulnerabilities.includes("limited_english")) {
      if (
        !sessionData.userInterface?.multiLanguage &&
        sessionData.userInterface?.legalJargon
      ) {
        targetedVulnerabilities.push("Language barriers");
        exploitationTactics.push("Language complexity abuse");
        evidence.push(
          "Uses complex English in critical disclosures without translation options"
        );
        score += 25;
      }
    }

    return {
      score: Math.min(100, score),
      targetedVulnerabilities,
      exploitationTactics,
      evidence,
    };
  }

  /**
   * Assess psychological pressure techniques
   */
  private static assessPsychologicalPressure(
    sessionData: any
  ): PsychologicalPressureScore {
    const pressureTechniques: string[] = [];
    const stressInducers: string[] = [];
    const evidence: string[] = [];
    let score = 0;
    let cognitiveLoad = 0;

    // Time pressure
    if (sessionData.timingData?.artificialDeadlines) {
      pressureTechniques.push("Artificial time constraints");
      stressInducers.push("Countdown timers");
      evidence.push("Uses fake countdown timers to create urgency");
      score += 20;
      cognitiveLoad += 15;
    }

    // Scarcity manipulation
    if (sessionData.marketingMaterials?.some((m: any) => m.fakeScarcity)) {
      pressureTechniques.push("False scarcity");
      stressInducers.push("Limited availability claims");
      evidence.push("Claims limited availability when no actual limits exist");
      score += 15;
      cognitiveLoad += 10;
    }

    // Social proof abuse
    if (
      sessionData.marketingMaterials?.some((m: any) => m.fabricatedSocialProof)
    ) {
      pressureTechniques.push("Fabricated social proof");
      stressInducers.push("Fake peer pressure");
      evidence.push("Uses fake testimonials or fabricated usage statistics");
      score += 20;
    }

    // Authority manipulation
    if (sessionData.marketingMaterials?.some((m: any) => m.falseAuthority)) {
      pressureTechniques.push("False authority");
      stressInducers.push("Fake expert endorsements");
      evidence.push(
        "Claims false endorsements from financial experts or institutions"
      );
      score += 25;
    }

    // Loss aversion exploitation
    if (sessionData.userInterface?.lossAversion) {
      pressureTechniques.push("Loss aversion manipulation");
      stressInducers.push("Fear of missing out");
      evidence.push(
        "Frames decisions as avoiding losses rather than making gains"
      );
      score += 15;
      cognitiveLoad += 20;
    }

    // Decision paralysis induction
    if (sessionData.userInterface?.overwhelming) {
      pressureTechniques.push("Choice overload");
      stressInducers.push("Too many complex options");
      evidence.push(
        "Presents overwhelming number of complex choices to induce decision paralysis"
      );
      score += 20;
      cognitiveLoad += 25;
    }

    return {
      score: Math.min(100, score),
      pressureTechniques,
      cognitiveLoad: Math.min(100, cognitiveLoad),
      stressInducers,
      evidence,
    };
  }

  /**
   * Assess consent theater patterns
   */
  private static assessConsentTheater(sessionData: any): ConsentTheaterScore {
    const theaterTactics: string[] = [];
    const evidence: string[] = [];
    let score = 0;

    const consentFlow = sessionData.consentFlow || {};

    // Analyze consent quality
    const genuineConsent = this.assessGenuineConsent(consentFlow);
    const informedConsent = this.assessInformedConsent(
      consentFlow,
      sessionData.disclosures
    );
    const voluntaryConsent = this.assessVoluntaryConsent(
      consentFlow,
      sessionData.pressureTactics
    );

    // Pre-checked boxes
    if (consentFlow.preCheckedBoxes) {
      theaterTactics.push("Pre-checked consent boxes");
      evidence.push("Important consent boxes are pre-checked by default");
      score += 20;
    }

    // Buried consent
    if (consentFlow.buriedInTerms) {
      theaterTactics.push("Buried consent clauses");
      evidence.push("Critical consent buried in lengthy terms and conditions");
      score += 25;
    }

    // Confusing consent language
    if (consentFlow.confusingLanguage) {
      theaterTactics.push("Confusing consent language");
      evidence.push(
        "Consent language is intentionally confusing or misleading"
      );
      score += 20;
    }

    // Multiple unnecessary consents
    if (consentFlow.excessiveConsents) {
      theaterTactics.push("Consent fatigue induction");
      evidence.push(
        "Requires excessive number of consent interactions to induce fatigue"
      );
      score += 15;
    }

    // Consent bundling
    if (consentFlow.bundled) {
      theaterTactics.push("Consent bundling");
      evidence.push("Bundles essential and optional consents together");
      score += 20;
    }

    // Dark patterns in consent
    if (consentFlow.darkPatterns) {
      theaterTactics.push("Dark pattern consent interfaces");
      evidence.push("Uses dark patterns in consent interface design");
      score += 30;
    }

    return {
      score: Math.min(100, score),
      theaterTactics,
      genuineConsent,
      informedConsent,
      voluntaryConsent,
      evidence,
    };
  }

  /**
   * Assess cognitive overload tactics
   */
  private static assessCognitiveOverload(
    sessionData: any
  ): CognitiveOverloadScore {
    const overloadTactics: string[] = [];
    const evidence: string[] = [];
    let score = 0;
    let informationComplexity = 0;
    let decisionFatigue = 0;

    // Information overload
    if (sessionData.disclosures?.excessive) {
      overloadTactics.push("Information overload");
      evidence.push(
        "Provides excessive information to overwhelm decision-making"
      );
      score += 20;
      informationComplexity += 30;
    }

    // Complex terminology
    if (sessionData.userInterface?.unnecessaryComplexity) {
      overloadTactics.push("Unnecessary complexity");
      evidence.push("Uses unnecessarily complex language and concepts");
      score += 15;
      informationComplexity += 25;
    }

    // Multiple simultaneous decisions
    if (sessionData.userInterface?.simultaneousDecisions) {
      overloadTactics.push("Decision splitting");
      evidence.push("Forces multiple complex decisions simultaneously");
      score += 20;
      decisionFatigue += 30;
    }

    // Attention splitting
    if (sessionData.userInterface?.attentionSplitting) {
      overloadTactics.push("Attention fragmentation");
      evidence.push(
        "Interface designed to split attention across multiple elements"
      );
      score += 15;
      informationComplexity += 20;
    }

    // Time pressure + complexity
    if (sessionData.timingData?.complexUnderPressure) {
      overloadTactics.push("Pressure-complexity combination");
      evidence.push("Combines time pressure with complex decisions");
      score += 25;
      decisionFatigue += 35;
    }

    return {
      score: Math.min(100, score),
      overloadTactics,
      informationComplexity: Math.min(100, informationComplexity),
      decisionFatigue: Math.min(100, decisionFatigue),
      evidence,
    };
  }

  /**
   * Assess time manipulation tactics
   */
  private static assessTimeManipulation(
    sessionData: any
  ): TimeManipulationScore {
    const urgencyTactics: string[] = [];
    const timeConstraints: string[] = [];
    const evidence: string[] = [];
    let score = 0;
    let artificial = false;

    const timing = sessionData.timingData || {};

    // Fake countdown timers
    if (timing.fakeCountdowns) {
      urgencyTactics.push("Fake countdown timers");
      timeConstraints.push("Artificial deadlines");
      evidence.push(
        "Uses countdown timers that reset or are not based on real constraints"
      );
      score += 30;
      artificial = true;
    }

    // Limited time offers
    if (timing.limitedOffers && !timing.genuineTimeLimit) {
      urgencyTactics.push("False limited-time offers");
      timeConstraints.push("Fake expiration dates");
      evidence.push(
        "Claims limited-time offers without genuine time constraints"
      );
      score += 25;
      artificial = true;
    }

    // Rush to decision
    if (timing.rushDecision) {
      urgencyTactics.push("Decision rushing");
      timeConstraints.push("Pressured acceptance");
      evidence.push(
        "Interface pressures quick decisions without adequate consideration time"
      );
      score += 20;
    }

    // Unavailable later claims
    if (timing.unavailableLater && !timing.genuineUnavailability) {
      urgencyTactics.push("False unavailability claims");
      timeConstraints.push("Fake future unavailability");
      evidence.push(
        "Claims offer will be unavailable later without genuine basis"
      );
      score += 20;
      artificial = true;
    }

    return {
      score: Math.min(100, score),
      urgencyTactics,
      timeConstraints,
      artificial,
      evidence,
    };
  }

  /**
   * Assess emotional exploitation
   */
  private static assessEmotionalExploitation(
    sessionData: any
  ): EmotionalExploitationScore {
    const exploitedEmotions: string[] = [];
    const manipulationTechniques: string[] = [];
    const evidence: string[] = [];
    let score = 0;
    let vulnerability = 0;

    const emotional = sessionData.userProfile?.emotionalState || "calm";
    const marketing = sessionData.marketingMaterials || [];

    // Fear exploitation
    if (marketing.some((m: any) => m.exploitsFear)) {
      exploitedEmotions.push("Fear");
      manipulationTechniques.push("Fear-based marketing");
      evidence.push("Uses fear-based appeals to motivate quick decisions");
      score += 25;
      vulnerability += 20;
    }

    // Desperation exploitation
    if (
      emotional === "desperate" &&
      marketing.some((m: any) => m.targetsDesperateLanguage)
    ) {
      exploitedEmotions.push("Desperation");
      manipulationTechniques.push("Desperation targeting");
      evidence.push("Specifically targets and exploits financial desperation");
      score += 35;
      vulnerability += 40;
    }

    // Shame/embarrassment exploitation
    if (marketing.some((m: any) => m.exploitsShame)) {
      exploitedEmotions.push("Shame");
      manipulationTechniques.push("Shame-based pressure");
      evidence.push("Uses shame or embarrassment to pressure into borrowing");
      score += 20;
      vulnerability += 25;
    }

    // Hope manipulation
    if (marketing.some((m: any) => m.manipulatesHope)) {
      exploitedEmotions.push("Hope");
      manipulationTechniques.push("False hope creation");
      evidence.push("Creates false hope for financial situation improvement");
      score += 20;
      vulnerability += 15;
    }

    // Pride exploitation
    if (marketing.some((m: any) => m.exploitsPride)) {
      exploitedEmotions.push("Pride");
      manipulationTechniques.push("Pride-based manipulation");
      evidence.push("Exploits pride to discourage seeking alternatives");
      score += 15;
      vulnerability += 10;
    }

    return {
      score: Math.min(100, score),
      exploitedEmotions,
      manipulationTechniques,
      vulnerability: Math.min(100, vulnerability),
      evidence,
    };
  }

  /**
   * Assess social pressure tactics
   */
  private static assessSocialPressure(sessionData: any): SocialPressureScore {
    const pressureTactics: string[] = [];
    const evidence: string[] = [];
    let score = 0;
    let fakeConsensus = false;
    let authorityAbuse = false;

    const social = sessionData.marketingMaterials?.social || {};

    // Fake peer pressure
    if (social.fakePeerPressure) {
      pressureTactics.push("Fabricated peer pressure");
      evidence.push("Claims most people in similar situation take loans");
      score += 20;
      fakeConsensus = true;
    }

    // False social proof
    if (social.fakeTestimonials) {
      pressureTactics.push("Fake testimonials");
      evidence.push("Uses fabricated customer testimonials");
      score += 25;
      fakeConsensus = true;
    }

    // Authority figure abuse
    if (social.fakeAuthority) {
      pressureTactics.push("False authority endorsement");
      evidence.push("Claims false endorsements from experts or officials");
      score += 30;
      authorityAbuse = true;
    }

    // Bandwagon effect exploitation
    if (social.bandwagon) {
      pressureTactics.push("Bandwagon manipulation");
      evidence.push(
        "Claims everyone is using the service to create following pressure"
      );
      score += 15;
      fakeConsensus = true;
    }

    return {
      score: Math.min(100, score),
      pressureTactics,
      fakeConsensus,
      authorityAbuse,
      evidence,
    };
  }

  // Helper methods
  private static assessGenuineConsent(consentFlow: any): boolean {
    return (
      !consentFlow.preCheckedBoxes &&
      !consentFlow.bundled &&
      !consentFlow.darkPatterns
    );
  }

  private static assessInformedConsent(
    consentFlow: any,
    disclosures: any[]
  ): boolean {
    return (
      !consentFlow.confusingLanguage &&
      !consentFlow.buriedInTerms &&
      disclosures?.some((d: any) => d.clear && d.understandable)
    );
  }

  private static assessVoluntaryConsent(
    consentFlow: any,
    pressureTactics: any[]
  ): boolean {
    return !consentFlow.pressured && pressureTactics?.length === 0;
  }

  private static calculateOverallScore(scores: any): number {
    const weights = {
      vulnerabilityExploitation: 0.25,
      psychologicalPressure: 0.2,
      consentTheater: 0.2,
      cognitiveOverload: 0.15,
      timeManipulation: 0.1,
      emotionalExploitation: 0.2,
      socialPressure: 0.1,
    };

    return Math.round(
      scores.vulnerabilityExploitation.score *
        weights.vulnerabilityExploitation +
        scores.psychologicalPressure.score * weights.psychologicalPressure +
        scores.consentTheater.score * weights.consentTheater +
        scores.cognitiveOverload.score * weights.cognitiveOverload +
        scores.timeManipulation.score * weights.timeManipulation +
        scores.emotionalExploitation.score * weights.emotionalExploitation +
        scores.socialPressure.score * weights.socialPressure
    );
  }

  private static determineRiskLevel(
    score: number,
    findings: ManipulationFinding[]
  ): "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" {
    const criticalFindings = findings.filter(
      (f) => f.severity === "CRITICAL"
    ).length;
    const highFindings = findings.filter((f) => f.severity === "HIGH").length;

    if (criticalFindings > 0 || score >= 80) return "CRITICAL";
    if (highFindings >= 2 || score >= 60) return "HIGH";
    if (score >= 30) return "MEDIUM";
    return "LOW";
  }

  private static compileDetailedFindings(scores: any): ManipulationFinding[] {
    const findings: ManipulationFinding[] = [];

    // Add findings from each category
    // This would be expanded to include detailed findings from each assessment
    if (scores.vulnerabilityExploitation.score > 50) {
      findings.push({
        category: "Vulnerability Exploitation",
        severity:
          scores.vulnerabilityExploitation.score > 80 ? "CRITICAL" : "HIGH",
        technique: "Targeted vulnerability exploitation",
        description:
          "Platform systematically targets and exploits user vulnerabilities",
        evidence: scores.vulnerabilityExploitation.evidence,
        psychologicalMechanism:
          "Exploits cognitive and emotional vulnerabilities to impair decision-making",
        protectiveGuidance:
          "Be especially cautious when feeling vulnerable or stressed. Consider waiting 24 hours before making financial decisions.",
      });
    }

    return findings;
  }

  private static generateProtectiveRecommendations(
    findings: ManipulationFinding[]
  ): string[] {
    const recommendations: string[] = [];

    if (findings.some((f) => f.category === "Vulnerability Exploitation")) {
      recommendations.push(
        "Wait 24 hours before making any financial commitments when feeling stressed or vulnerable"
      );
    }

    if (findings.some((f) => f.category === "Time Manipulation")) {
      recommendations.push(
        "Ignore artificial urgency claims - legitimate financial products remain available"
      );
    }

    if (findings.some((f) => f.category === "Consent Theater")) {
      recommendations.push(
        "Read all consent agreements carefully and uncheck any pre-selected boxes"
      );
    }

    if (findings.some((f) => f.category === "Emotional Exploitation")) {
      recommendations.push(
        "Seek emotional support and avoid financial decisions when feeling desperate or afraid"
      );
    }

    return recommendations;
  }
}
