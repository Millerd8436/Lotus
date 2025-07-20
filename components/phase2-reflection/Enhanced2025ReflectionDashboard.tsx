"use client";

import { useSimulation } from "@/components/providers/SimulationProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import CentralizedDarkPatternEngine, {
  DarkPattern2025,
} from "@/lib/core/CentralizedDarkPatternEngine"; // Import the engine
import { UnifiedLoanEngine } from "@/lib/core/UnifiedLoanEngine";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  DollarSign,
  ExternalLink,
  Lightbulb,
  Scale,
  Shield,
  Users,
  XCircle,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import KantianScorecard from "./KantianScorecard"; // Import the new component

/**
 * Enhanced2025ReflectionDashboard - Phase 2 Implementation
 *
 * Comprehensive retrospective analysis incorporating:
 * - 2025 fintech dark pattern detection
 * - CFPB regulatory compliance assessment
 * - Kantian ethics evaluation
 * - Behavioral manipulation scoring
 * - Real-world harm analysis
 */

// This interface represents the data structure needed by the UI
interface DisplayedDarkPattern extends DarkPattern2025 {
  detected: boolean;
  realWorldExample: string;
  protectionStrategy: string;
}

interface KantianViolation {
  principle: "autonomy" | "dignity" | "universalizability" | "good_will";
  description: string;
  severity: "low" | "medium" | "high" | "extreme";
  evidence: string[];
  remedy: string;
}

interface CFPBCompliance {
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

interface VulnerabilityExploitation {
  targetedDemographics: string[];
  exploitationTactics: string[];
  psychologicalPressure: number; // 1-10 scale
  autonomyViolationLevel: number; // 1-10 scale
  predationScore: number; // 1-10 scale
}

interface ReflectionAnalysis {
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

const Enhanced2025ReflectionDashboard: React.FC = () => {
  const { session } = useSimulation();
  const [analysis, setAnalysis] = useState<ReflectionAnalysis | null>(null);
  const [currentSection, setCurrentSection] = useState<
    "overview" | "dark_patterns" | "kantian" | "cfpb" | "education"
  >("overview");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const loanEngine = new UnifiedLoanEngine();
  const darkPatternEngine = new CentralizedDarkPatternEngine();

  useEffect(() => {
    performComprehensiveAnalysis();
  }, [session]);

  const performComprehensiveAnalysis = useCallback(async () => {
    setIsAnalyzing(true);

    // Simulate analysis delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!session || !session.darkPatternsEncountered) {
      setIsAnalyzing(false);
      return;
    }

    const detectedPatterns: DisplayedDarkPattern[] =
      session.darkPatternsEncountered.map((dp) => {
        const patternDetails = darkPatternEngine.getPatternById(dp.type);
        return {
          ...(patternDetails as DarkPattern2025),
          id: dp.type,
          detected: true,
          realWorldExample:
            patternDetails?.realWorldExamples[0]?.description || "N/A",
          protectionStrategy: patternDetails?.protectionStrategies[0] || "N/A",
        };
      });

    const realAnalysis: ReflectionAnalysis = {
      darkPatterns2025: detectedPatterns,
      // The rest of the analysis will be dynamically generated in future steps.
      // For now, we'll keep the mock data for other sections to avoid breaking the UI.
      kantianViolations: [
        {
          principle: "autonomy",
          description:
            "Manipulation prevents genuine autonomous decision-making",
          severity: "extreme",
          evidence: [
            "Dark patterns manipulate user interface",
            "Hidden fees prevent informed consent",
          ],
          remedy:
            "Require genuine informed consent with 24-hour cooling-off period",
        },
      ],
      cfpbCompliance: {
        abusivePractices: {
          detected: ["Material interference with understanding terms"],
          violations: ["Section 1031(d)(1) - Material interference"],
          penaltyEstimate: 10000000,
        },
        deceptivePractices: {
          detected: ["False advertising of 0% APR"],
          violations: ["Truth in Lending Act violations"],
        },
        unfairPractices: {
          detected: ["Substantial consumer injury"],
          violations: ["Section 1031(c) - Unfair acts or practices"],
        },
        overallScore: 2,
      },
      vulnerabilityExploitation: {
        targetedDemographics: ["Low-income workers"],
        exploitationTactics: ["Geotargeted ads"],
        psychologicalPressure: 8,
        autonomyViolationLevel: 9,
        predationScore: 9,
      },
      realWorldHarmEstimate: {
        financialHarm: 1250,
        timeToRecover: "8-18 months",
        creditImpact: "Credit score drop of 50-100 points",
        emotionalToll: "Anxiety, depression, relationship stress",
      },
      educationalRecommendations: [
        "Understanding true APR vs. advertised fees",
        "Recognizing UI dark patterns",
      ],
      legalProtections: ["CFPB complaint process"],
    };

    setAnalysis(realAnalysis);
    setIsAnalyzing(false);
  }, [session]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "extreme":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getComplianceIcon = (score: number) => {
    if (score >= 8) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 5)
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">
            Analyzing Your Experience
          </h2>
          <p className="text-gray-600">
            Detecting dark patterns, assessing ethical violations, and
            calculating harm...
          </p>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Analysis Unavailable</h2>
          <p className="text-gray-600 mb-4">
            Unable to analyze your session. Please complete Phase 1 first.
          </p>
          <Button onClick={() => (window.location.href = "/exploitative")}>
            Go to Phase 1
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📊 Phase 2: Enhanced Retrospective Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive evaluation of your experience using 2025 CFPB
            regulations, Kantian ethics, and the latest fintech dark pattern
            research
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            {
              id: "overview",
              label: "Overview",
              icon: <Scale className="w-4 h-4" />,
            },
            {
              id: "dark_patterns",
              label: "2025 Dark Patterns",
              icon: <AlertTriangle className="w-4 h-4" />,
            },
            {
              id: "kantian",
              label: "Kantian Ethics",
              icon: <BookOpen className="w-4 h-4" />,
            },
            {
              id: "cfpb",
              label: "CFPB Compliance",
              icon: <Shield className="w-4 h-4" />,
            },
            {
              id: "education",
              label: "Education & Protection",
              icon: <Lightbulb className="w-4 h-4" />,
            },
          ].map((section) => (
            <Button
              key={section.id}
              onClick={() => setCurrentSection(section.id as any)}
              variant={currentSection === section.id ? "default" : "secondary"}
              className="flex items-center gap-2"
            >
              {section.icon}
              {section.label}
            </Button>
          ))}
        </div>

        {/* Overview Section */}
        {currentSection === "overview" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-2 border-red-200 bg-red-50">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800">
                    Dark Patterns Detected
                  </h3>
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {analysis.darkPatterns2025.filter((p) => p.detected).length}
                </div>
                <p className="text-red-700 text-sm">
                  Including tip coercion, confession of judgment, and
                  rent-a-bank schemes
                </p>
              </Card>

              <Card className="p-6 border-2 border-purple-200 bg-purple-50">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-8 h-8 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-800">
                    Kantian Ethics Score
                  </h3>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(
                    (10 - analysis.kantianViolations.length * 2.5) * 10
                  ) / 10}
                  /10
                </div>
                <p className="text-purple-700 text-sm">
                  Severe violations of autonomy, dignity, and universalizability
                </p>
              </Card>

              <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-blue-800">
                    CFPB Compliance
                  </h3>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {analysis.cfpbCompliance.overallScore}/10
                </div>
                <p className="text-blue-700 text-sm">
                  Multiple violations of abusive, deceptive, and unfair
                  practices
                </p>
              </Card>
            </div>

            <Card className="p-6 border-2 border-orange-200 bg-orange-50">
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Real-World Harm Estimate
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">
                    Financial Impact
                  </h4>
                  <ul className="space-y-1 text-orange-600 text-sm">
                    <li>
                      • Average financial harm: $
                      {analysis.realWorldHarmEstimate.financialHarm}
                    </li>
                    <li>• {analysis.realWorldHarmEstimate.timeToRecover}</li>
                    <li>• {analysis.realWorldHarmEstimate.creditImpact}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">
                    Personal Impact
                  </h4>
                  <p className="text-orange-600 text-sm">
                    {analysis.realWorldHarmEstimate.emotionalToll}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Dark Patterns Section */}
        {currentSection === "dark_patterns" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                2025 Fintech Dark Patterns Analysis
              </h3>
              <p className="text-gray-600 mb-6">
                Based on latest CFPB enforcement actions and consumer protection
                research
              </p>

              <div className="space-y-4">
                {analysis.darkPatterns2025.map((pattern) => (
                  <Card
                    key={pattern.id}
                    className={`p-4 border-2 ${
                      pattern.detected
                        ? "border-red-200 bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg flex items-center gap-2">
                          {pattern.detected ? (
                            <XCircle className="w-5 h-5 text-red-500" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {pattern.name}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(
                              pattern.harmLevel > 3 ? "high" : "medium"
                            )}`}
                          >
                            Harm Level: {pattern.harmLevel}/5
                          </span>
                          <span className="text-sm text-gray-600">
                            Used by {pattern.prevalence2025}% of lenders in 2025
                          </span>
                          {pattern.cfpbViolation && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                              CFPB Violation
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3">{pattern.description}</p>

                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200 mb-3">
                      <h5 className="font-semibold text-yellow-800 mb-1">
                        Real-World Example:
                      </h5>
                      <p className="text-yellow-700 text-sm">
                        {pattern.realWorldExample}
                      </p>
                    </div>

                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h5 className="font-semibold text-green-800 mb-1">
                        Protection Strategy:
                      </h5>
                      <p className="text-green-700 text-sm">
                        {pattern.protectionStrategy}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Kantian Ethics Section */}
        {currentSection === "kantian" && (
          <div className="space-y-6">
            <KantianScorecard session={session} />
          </div>
        )}

        {/* CFPB Compliance Section */}
        {currentSection === "cfpb" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                CFPB Regulatory Compliance Analysis
              </h3>
              <p className="text-gray-600 mb-6">
                Assessment based on current Consumer Financial Protection Act
                regulations
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {[
                  {
                    title: "Abusive Practices",
                    data: analysis.cfpbCompliance.abusivePractices,
                    color: "red",
                  },
                  {
                    title: "Deceptive Practices",
                    data: analysis.cfpbCompliance.deceptivePractices,
                    color: "orange",
                  },
                  {
                    title: "Unfair Practices",
                    data: analysis.cfpbCompliance.unfairPractices,
                    color: "yellow",
                  },
                ].map((category, index) => (
                  <Card
                    key={index}
                    className={`p-4 border-2 border-${category.color}-200 bg-${category.color}-50`}
                  >
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <XCircle
                        className={`w-5 h-5 text-${category.color}-600`}
                      />
                      {category.title}
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <h5 className="font-semibold text-sm">Detected:</h5>
                        <ul className="text-xs space-y-1">
                          {category.data.detected.map((item, i) => (
                            <li key={i} className="list-disc list-inside">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm">Violations:</h5>
                        <ul className="text-xs space-y-1">
                          {category.data.violations.map((item, i) => (
                            <li key={i} className="list-disc list-inside">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {analysis.cfpbCompliance.abusivePractices.penaltyEstimate > 0 && (
                <Card className="p-4 border-2 border-red-200 bg-red-50">
                  <h4 className="font-bold text-red-800 mb-2">
                    Estimated CFPB Penalty
                  </h4>
                  <p className="text-2xl font-bold text-red-600">
                    $
                    {analysis.cfpbCompliance.abusivePractices.penaltyEstimate.toLocaleString()}
                  </p>
                  <p className="text-red-700 text-sm mt-1">
                    Based on similar CFPB enforcement actions for comparable
                    violations
                  </p>
                </Card>
              )}
            </Card>
          </div>
        )}

        {/* Education Section */}
        {currentSection === "education" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-green-600" />
                Education & Protection Resources
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">
                    Key Concepts to Learn
                  </h4>
                  <div className="space-y-2">
                    {analysis.educationalRecommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-blue-50 rounded"
                      >
                        <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-blue-800 text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3">
                    Legal Protections Available
                  </h4>
                  <div className="space-y-2">
                    {analysis.legalProtections.map((protection, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-green-50 rounded"
                      >
                        <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800 text-sm">
                          {protection}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-green-200 bg-green-50">
              <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Take Action to Protect Others
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-2">Report This Lender</h5>
                  <Button
                    className="w-full mb-2"
                    onClick={() =>
                      window.open(
                        "https://www.consumerfinance.gov/complaint/",
                        "_blank"
                      )
                    }
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    File CFPB Complaint
                  </Button>
                  <p className="text-green-700 text-xs">
                    Your complaint helps protect other consumers and can trigger
                    investigations
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Share Your Story</h5>
                  <Button
                    variant="secondary"
                    className="w-full mb-2"
                    onClick={() =>
                      window.open(
                        "https://www.nclc.org/share-your-story/",
                        "_blank"
                      )
                    }
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Tell Consumer Advocates
                  </Button>
                  <p className="text-green-700 text-xs">
                    Consumer stories drive policy change and regulatory action
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/exploitative")}
          >
            ← Back to Phase 1
          </Button>
          <Button
            onClick={() => (window.location.href = "/teaching")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continue to Phase 3 →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Enhanced2025ReflectionDashboard;
