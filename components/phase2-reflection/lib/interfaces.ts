import { DarkPattern2025 } from "@/core/core/CentralizedDarkPatternEngine";

export interface DisplayedDarkPattern extends DarkPattern2025 {
  detected: boolean;
  realWorldExample: string;
  protectionStrategy: string;
}

export interface KantianViolation {
  principle: "autonomy" | "dignity" | "universalizability" | "good_will";
  description: string;
  severity: "low" | "medium" | "high" | "extreme";
  evidence: string[];
  remedy: string;
}

export interface CFPBCompliance {
  abusivePractices: {
    detected: string[];
    violations: string[];
    penaltyEstimate: number;
  };
  deceptivePractices: {
    detected: string[];
    violations: string[];
  };
  unfairPractices: {
    detected: string[];
    violations: string[];
  };
  overallScore: number;
}

export interface VulnerabilityExploitation {
  targetedDemographics: string[];
  exploitationTactics: string[];
  psychologicalPressure: number; // 1-10 scale
  autonomyViolationLevel: number; // 1-10 scale
  predationScore: number; // 1-10 scale
}

export interface ReflectionAnalysis {
  darkPatterns2025: DisplayedDarkPattern[];
  kantianViolations: KantianViolation[];
  cfpbCompliance: CFPBCompliance;
  vulnerabilityExploitation: VulnerabilityExploitation;
  realWorldHarmEstimate: {
    financialHarm: number;
    timeToRecover: string;
    creditImpact: string;
    emotionalToll: string;
  };
  educationalRecommendations: string[];
  legalProtections: string[];
}
