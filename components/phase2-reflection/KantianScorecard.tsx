"use client";

import { LotusSession } from "@/types";
import { CheckCircle, MessageCircle, XCircle } from "lucide-react";
import React from "react";

interface KantianScorecardProps {
  session: LotusSession;
}

interface KantianAssessment {
  respectsAutonomy: boolean;
  treatsAsEnds: boolean;
  isUniversalizable: boolean;
  overallScore: number;
  violations: {
    autonomy: string[];
    means: string[];
    universalizability: string[];
  };
}

const KantianScorecard: React.FC<KantianScorecardProps> = ({ session }) => {
  const assessKantianPrinciples = (
    session: LotusSession
  ): KantianAssessment => {
    const assessment: KantianAssessment = {
      respectsAutonomy: true,
      treatsAsEnds: true,
      isUniversalizable: true,
      overallScore: 100,
      violations: {
        autonomy: [],
        means: [],
        universalizability: [],
      },
    };

    const darkPatterns = session.darkPatternsEncountered || [];
    const interactionEvents = session.interactionEvents || [];

    // 1. Respect for Autonomy (Informed Consent)
    const consentPatterns = [
      "hidden_costs",
      "bait_switch",
      "privacy_zuckering",
      "terms-trap",
    ];
    consentPatterns.forEach((p) => {
      if (darkPatterns.some((dp) => dp.type === p)) {
        assessment.respectsAutonomy = false;
        assessment.violations.autonomy.push(
          `The use of "${p}" undermines the user's ability to give informed consent.`
        );
      }
    });
    if (session.loanData?.consents?.autoRenewal) {
      assessment.respectsAutonomy = false;
      assessment.violations.autonomy.push(
        "Pre-checked consent for auto-renewal does not respect user autonomy."
      );
    }

    // 2. Treating People as Ends, Not Merely as Means
    const exploitationPatterns = [
      "tip-pressure",
      "data-harvest",
      "social_pyramid",
    ];
    exploitationPatterns.forEach((p) => {
      if (darkPatterns.some((dp) => dp.type === p)) {
        assessment.treatsAsEnds = false;
        assessment.violations.means.push(
          `The "${p}" pattern treats the user as a means to extract more data or money.`
        );
      }
    });

    if (session.loanData?.apr && session.loanData.apr > 100) {
      assessment.treatsAsEnds = false;
      assessment.violations.means.push(
        "Charging an excessively high APR (300%+) treats the user's financial distress as a means for profit."
      );
    }

    // 3. Universalizability
    if (!assessment.respectsAutonomy || !assessment.treatsAsEnds) {
      assessment.isUniversalizable = false;
      assessment.violations.universalizability.push(
        "A system built on deception and exploitation cannot be universalized without contradiction, as it would destroy the trust necessary for lending to function."
      );
    }
    if (darkPatterns.some((dp) => dp.type === "fake_urgency")) {
      assessment.isUniversalizable = false;
      assessment.violations.universalizability.push(
        'The principle of creating "fake urgency" cannot be universalized, as it would lead to a breakdown in rational decision-making.'
      );
    }

    // Calculate score
    let score = 100;
    if (!assessment.respectsAutonomy) score -= 40;
    if (!assessment.treatsAsEnds) score -= 40;
    if (!assessment.isUniversalizable) score -= 20;
    assessment.overallScore = Math.max(0, score);

    return assessment;
  };

  const assessment = assessKantianPrinciples(session);

  const renderPrinciple = (
    title: string,
    passed: boolean,
    violations: string[],
    icon: React.ReactNode
  ) => (
    <div
      className={`p-4 rounded-lg ${
        passed ? "bg-green-50" : "bg-red-50"
      } border ${passed ? "border-green-200" : "border-red-200"}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          <h3
            className={`text-lg font-semibold ${
              passed ? "text-green-800" : "text-red-800"
            }`}
          >
            {title}
          </h3>
          {passed ? (
            <p className="text-sm text-green-700 mt-1">Principle upheld.</p>
          ) : (
            <div className="mt-2 text-sm text-red-700">
              <ul className="list-disc space-y-1 pl-5">
                {violations.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <MessageCircle className="mr-3 text-blue-500" />
        Kantian Ethics Scorecard
      </h2>
      <p className="text-gray-600 mb-6">
        This analysis evaluates the exploitative flow against key principles of
        Kantian ethics: treating people with respect, not just as tools for
        profit.
      </p>

      <div className="space-y-4">
        {renderPrinciple(
          "Respect for Autonomy",
          assessment.respectsAutonomy,
          assessment.violations.autonomy,
          assessment.respectsAutonomy ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500" />
          )
        )}
        {renderPrinciple(
          "Treating People as Ends",
          assessment.treatsAsEnds,
          assessment.violations.means,
          assessment.treatsAsEnds ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500" />
          )
        )}
        {renderPrinciple(
          "Universalizability",
          assessment.isUniversalizable,
          assessment.violations.universalizability,
          assessment.isUniversalizable ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500" />
          )
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold">Overall Ethical Score:</h3>
        <div
          className={`text-4xl font-extrabold ${
            assessment.overallScore > 60
              ? "text-green-600"
              : assessment.overallScore > 30
              ? "text-yellow-500"
              : "text-red-600"
          }`}
        >
          {assessment.overallScore}
          <span className="text-2xl text-gray-500">/100</span>
        </div>
      </div>
    </div>
  );
};

export default KantianScorecard;
