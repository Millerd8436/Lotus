import {
  AlertTriangle,
  BookOpen,
  DollarSign,
  ExternalLink,
  Lightbulb,
  Scale,
  Shield,
  Users,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { ReflectionAnalysis } from "./interfaces";
import { getSeverityColor } from "./utils";
import KantianScorecard from "../KantianScorecard";
import { SimulationState } from "@/components/providers/SimulationProvider";

export const OverviewSection: React.FC<{ analysis: ReflectionAnalysis }> = ({
  analysis,
}) => (
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
          Including tip coercion, confession of judgment, and rent-a-bank
          schemes
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
          {Math.round((10 - analysis.kantianViolations.length * 2.5) * 10) / 10}
          /10
        </div>
        <p className="text-purple-700 text-sm">
          Severe violations of autonomy, dignity, and universalizability
        </p>
      </Card>

      <Card className="p-6 border-2 border-blue-200 bg-blue-50">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
          <h3 className="text-xl font-bold text-blue-800">CFPB Compliance</h3>
        </div>
        <div className="text-3xl font-bold text-blue-600 mb-2">
          {analysis.cfpbCompliance.overallScore}/10
        </div>
        <p className="text-blue-700 text-sm">
          Multiple violations of abusive, deceptive, and unfair practices
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
);

export const DarkPatternsSection: React.FC<{ analysis: ReflectionAnalysis }> = ({
  analysis,
}) => (
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
              pattern.detected ? "border-red-200 bg-red-50" : "border-gray-200"
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
);

export const KantianSection: React.FC<{ session: SimulationState | null }> = ({
  session,
}) => (
  <div className="space-y-6">
    <KantianScorecard session={session} />
  </div>
);

export const CFPBSection: React.FC<{ analysis: ReflectionAnalysis }> = ({
  analysis,
}) => (
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
              <XCircle className={`w-5 h-5 text-${category.color}-600`} />
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
            Based on similar CFPB enforcement actions for comparable violations
          </p>
        </Card>
      )}
    </Card>
  </div>
);

export const EducationSection: React.FC<{ analysis: ReflectionAnalysis }> = ({
  analysis,
}) => (
  <div className="space-y-6">
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-green-600" />
        Education & Protection Resources
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold text-lg mb-3">Key Concepts to Learn</h4>
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
          <h4 className="font-bold text-lg mb-3">Legal Protections Available</h4>
          <div className="space-y-2">
            {analysis.legalProtections.map((protection, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 bg-green-50 rounded"
              >
                <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-green-800 text-sm">{protection}</span>
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
              window.open("https://www.nclc.org/share-your-story/", "_blank")
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
);
