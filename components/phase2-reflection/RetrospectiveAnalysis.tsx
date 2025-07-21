"use client";

import { Card } from "@/components/shared/Card";
import React from "react";

const RetrospectiveAnalysis: React.FC<{ session: any }> = ({ session }) => {
  const darkPatterns = session.darkPatternsEncountered || [];
  const kantianAnalysis = session.kantianAnalysis || {
    informedConsent: false,
    treatedAsEnd: false,
    coercion: true,
  };

  const darkPatternDetails = {
    fake_urgency: {
      description: "Creates artificial time pressure to rush decisions.",
      example: "A countdown timer suggesting the offer will expire soon.",
    },
    data_harvesting: {
      description: "Collects more personal data than necessary.",
      example: "Requesting access to contacts or location for a simple loan.",
    },
    tip_coercion: {
      description: "Pressures users into leaving a tip.",
      example: "A pre-selected tip amount that is difficult to remove.",
    },
    hidden_costs: {
      description: "Hides the true cost of the loan until the final step.",
      example: "A low advertised APR that doesn't include all fees.",
    },
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Retrospective Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            Dark Patterns Encountered
          </h3>
          {darkPatterns.length > 0 ? (
            <ul>
              {darkPatterns.map((pattern: any, index: number) => (
                <li key={index} className="mb-2">
                  <strong className="capitalize">
                    {pattern.type.replace(/_/g, " ")}
                  </strong>
                  <p className="text-sm text-gray-600">
                    {
                      darkPatternDetails[
                        pattern.type as keyof typeof darkPatternDetails
                      ]?.description
                    }
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    Example:{" "}
                    {
                      darkPatternDetails[
                        pattern.type as keyof typeof darkPatternDetails
                      ]?.example
                    }
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No dark patterns encountered.</p>
          )}
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Kantian Scorecard</h3>
          <ul>
            <li className="mb-2">
              <strong>Informed Consent:</strong>{" "}
              {kantianAnalysis.informedConsent ? "✅" : "❌"}
              <p className="text-sm text-gray-600">
                The user was not given all the information needed to make a
                rational decision.
              </p>
            </li>
            <li className="mb-2">
              <strong>Treated as an end:</strong>{" "}
              {kantianAnalysis.treatedAsEnd ? "✅" : "❌"}
              <p className="text-sm text-gray-600">
                The user was treated as a means to an end (profit), rather than
                as a rational being.
              </p>
            </li>
            <li className="mb-2">
              <strong>Coercion:</strong>{" "}
              {kantianAnalysis.coercion ? "❌" : "✅"}
              <p className="text-sm text-gray-600">
                The user was coerced into making a decision through the use of
                dark patterns.
              </p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default RetrospectiveAnalysis;
