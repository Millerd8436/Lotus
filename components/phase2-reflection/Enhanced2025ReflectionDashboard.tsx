"use client";

import { useSimulation } from "@/components/providers/SimulationProvider";
import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import CentralizedDarkPatternEngine, {
  DarkPattern2025,
} from "@/core/core/CentralizedDarkPatternEngine";
import { UnifiedLoanEngine } from "@/core/core/UnifiedLoanEngine";
import {
  AlertTriangle,
  BookOpen,
  Scale,
  Shield,
  Lightbulb,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  ReflectionAnalysis,
  DisplayedDarkPattern,
  OverviewSection,
  DarkPatternsSection,
  KantianSection,
  CFPBSection,
  EducationSection,
} from "./lib";

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

        {/* Sections */}
        {currentSection === "overview" && <OverviewSection analysis={analysis} />}
        {currentSection === "dark_patterns" && (
          <DarkPatternsSection analysis={analysis} />
        )}
        {currentSection === "kantian" && <KantianSection session={session} />}
        {currentSection === "cfpb" && <CFPBSection analysis={analysis} />}
        {currentSection === "education" && <EducationSection analysis={analysis} />}

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
