"use client";

import DeceptiveCheckoutFlow from "@/components/DeceptiveCheckoutFlow";
import { EducationalAnnotationSystem } from "@/components/EducationalAnnotationSystem";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import ModeSelector from "@/components/ui/ModeSelector";
import debriefData from "@/data/phase2_debrief_quiz.json";
import { BookOpen, Brain, Eye, Scale, Shield } from "lucide-react";
import { useState } from "react";

interface Annotation {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  darkPattern: string;
  kantianViolation?: string;
  protectionTip: string;
}

export default function TeachingPage() {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [currentStep, setCurrentStep] = useState("basic-info");
  const [viewedAnnotations, setViewedAnnotations] = useState<Annotation[]>([]);
  // Remove unused state setter
  const [loanAmount] = useState(400);

  const handleAnnotationView = (annotation: Annotation) => {
    setViewedAnnotations((prev) => {
      if (prev.find((a) => a.id === annotation.id)) return prev;
      return [...prev, annotation];
    });
  };

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-orange-800">
            Phase 3: Live Educational Mode
          </h1>
          <p className="text-lg text-gray-700">
            Experience the predatory checkout again, but this time with
            real-time education about each dark pattern.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="mb-8">
          <ModeSelector />
        </div>

        {/* Annotation Controls */}
        <Card className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-yellow-700" />
              <span className="font-semibold text-yellow-800">
                Educational Annotations: {showAnnotations ? "ON" : "OFF"}
              </span>
            </div>
            <Button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 border border-yellow-400"
            >
              {showAnnotations ? "Hide" : "Show"} Annotations
            </Button>
          </div>
        </Card>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Flow with Annotations */}
          <div className="lg:col-span-2 relative">
            <DeceptiveCheckoutFlow
              loanAmount={loanAmount}
              phase="exploitative"
              onBack={() => window.history.back()}
              onStepChange={handleStepChange}
            />

            {/* Educational Annotation System Overlay */}
            <EducationalAnnotationSystem
              currentStep={currentStep}
              isEnabled={showAnnotations}
              onAnnotationView={handleAnnotationView}
            />
          </div>

          {/* Educational Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              {/* Annotations Viewed Progress */}
              <Card className="p-5 bg-blue-50 border-2 border-blue-300">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">
                    Learning Progress
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-blue-700">
                    Annotations discovered: {viewedAnnotations.length} / 12
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(viewedAnnotations.length / 12) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </Card>

              {/* Key Concepts */}
              <Card className="p-5">
                <h4 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Key Concepts You're Learning:
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <div>
                      <span className="font-medium text-gray-700">
                        Dark Patterns:
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        UI tricks that manipulate behavior
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <div>
                      <span className="font-medium text-gray-700">
                        Psychological Exploitation:
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        How they hack your brain
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <div>
                      <span className="font-medium text-gray-700">
                        Kantian Ethics:
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        Why this violates informed consent
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <div>
                      <span className="font-medium text-gray-700">
                        Legal Loopholes:
                      </span>
                      <span className="text-gray-600">
                        {" "}
                        How they evade usury laws
                      </span>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Recent Annotations */}
              {viewedAnnotations.length > 0 && (
                <Card className="p-5 bg-white border-2 border-gray-200">
                  <h4 className="font-semibold mb-3 text-gray-800">
                    Recent Discoveries:
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {viewedAnnotations
                      .slice(-3)
                      .reverse()
                      .map((annotation) => (
                        <div
                          key={annotation.id}
                          className={`p-3 rounded-lg text-sm ${
                            annotation.severity === "critical"
                              ? "bg-red-50 border border-red-200"
                              : annotation.severity === "high"
                              ? "bg-orange-50 border border-orange-200"
                              : "bg-yellow-50 border border-yellow-200"
                          }`}
                        >
                          <h5 className="font-medium mb-1">
                            {annotation.title}
                          </h5>
                          <p className="text-xs text-gray-600">
                            {annotation.darkPattern}
                          </p>
                        </div>
                      ))}
                  </div>
                </Card>
              )}

              {/* Protection Tips */}
              <Card className="p-5 bg-green-50 border-2 border-green-300">
                <h4 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Protection Strategies:
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>✓ Always calculate true APR before agreeing</li>
                  <li>✓ Never give bank login credentials</li>
                  <li>✓ Uncheck ALL pre-selected add-ons</li>
                  <li>✓ Screenshot everything for evidence</li>
                  <li>✓ Know your state's usury laws</li>
                </ul>
              </Card>

              {/* Kantian Ethics Summary */}
              <Card className="p-5 bg-purple-50 border-2 border-purple-300">
                <h4 className="font-semibold mb-3 text-purple-800 flex items-center gap-2">
                  <Scale className="w-5 h-5" />
                  Ethical Framework:
                </h4>
                <div className="text-sm text-purple-700">
                  <p className="mb-2">
                    {
                      debriefData.debrief.sections.kantian_ethics_violations
                        .introduction
                    }
                  </p>
                  <ul className="space-y-1">
                    {debriefData.debrief.sections.kantian_ethics_violations.requirements
                      .slice(0, 2)
                      .map((req, idx) => (
                        <li key={idx} className="text-xs">
                          •{" "}
                          <span className="font-medium">{req.principle}:</span>{" "}
                          {req.violation}
                        </li>
                      ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Educational Footer */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-3 text-blue-800">
              You're Learning to Protect Yourself
            </h3>
            <p className="text-blue-700 mb-4">
              By understanding these tactics, you become immune to them. Share
              this knowledge to protect others from predatory lending.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-800">391%</div>
                <div className="text-sm text-blue-600">Average APR Hidden</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-800">$520</div>
                <div className="text-sm text-blue-600">Fees to Borrow $375</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-800">80%</div>
                <div className="text-sm text-blue-600">End Up in Debt Trap</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button
                onClick={() => (window.location.href = "/reflection")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Test Your Knowledge
              </Button>
              <Button
                onClick={() => (window.location.href = "/ethical")}
                className="bg-white hover:bg-blue-100 text-blue-700 border-2 border-blue-400"
              >
                See Ethical Alternative
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
