"use client";

import React from "react";

interface LiveAnnotationProps {
  step: string;
  darkPattern: string;
}

const LiveAnnotation: React.FC<LiveAnnotationProps> = ({
  step,
  darkPattern,
}) => {
  const darkPatternDetails = {
    "Fake Urgency": {
      tactic: "Creates artificial time pressure to rush decisions.",
      example: "A countdown timer suggesting the offer will expire soon.",
      kantianPrompt:
        "Does this pressure respect your ability to make a rational, uncoerced decision?",
    },
    "Data Harvesting": {
      tactic: "Collects more personal data than necessary for the transaction.",
      example:
        "Requesting access to your contacts or location for a simple loan.",
      kantianPrompt:
        "Are you being treated as an end, or as a means to gather data for profit?",
    },
    "Tip Coercion": {
      tactic: "Uses guilt and social pressure to encourage tipping.",
      example: "A pre-selected tip amount that is difficult to remove.",
      kantianPrompt:
        "Is this a truly voluntary tip, or a disguised mandatory fee?",
    },
    "Hidden Costs": {
      tactic: "Obscures the true cost of the loan until the final step.",
      example: "A low advertised APR that doesn't include all fees.",
      kantianPrompt:
        "Can you give informed consent if the full cost is not transparent from the start?",
    },
  };

  const details =
    darkPatternDetails[darkPattern as keyof typeof darkPatternDetails];

  if (!details) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in-up">
        <h3 className="text-xl font-semibold mb-4 text-red-600">
          Dark Pattern Detected: {darkPattern}
        </h3>
        <div className="space-y-3">
          <div>
            <p className="font-semibold">Tactic:</p>
            <p className="text-gray-700">{details.tactic}</p>
          </div>
          <div>
            <p className="font-semibold">Example:</p>
            <p className="text-gray-700 italic">{details.example}</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg mt-4">
            <p className="font-semibold text-yellow-800">Kantian Prompt:</p>
            <p className="text-gray-700">{details.kantianPrompt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAnnotation;
