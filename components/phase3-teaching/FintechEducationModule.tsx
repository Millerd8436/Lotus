"use client";

import { Card } from "@/components/shared/Card";
import React, { useState } from "react";
import { useFintechEducation } from "./lib/education";
import {
  DetectedScheme,
  FintechEducationModuleProps,
} from "./lib/interfaces";
import { getSchemeEducation, getSchemeQuiz } from "./lib/education/utils";

const SchemeAlert: React.FC<{
  scheme: DetectedScheme;
  setActiveScheme: (scheme: DetectedScheme | null) => void;
  handleEducationalInteraction: (action: string, scheme: DetectedScheme) => void;
  setShowQuiz: (show: boolean) => void;
}> = ({
  scheme,
  setActiveScheme,
  handleEducationalInteraction,
  setShowQuiz,
}) => {
  const education = getSchemeEducation(scheme.type);
  if (!education) return null;

  const severityColors = {
    CRITICAL: "bg-red-600 border-red-700",
    HIGH: "bg-orange-500 border-orange-600",
    MEDIUM: "bg-yellow-500 border-yellow-600",
    LOW: "bg-blue-500 border-blue-600",
  };

  return (
    <Card
      className={`border-2 ${
        severityColors[scheme.severity]
      } text-white p-4 mb-4`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{education.title}</h3>
        <button
          onClick={() => setActiveScheme(null)}
          className="text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>

      <p className="mb-3 text-white/90">{education.description}</p>

      <div className="space-y-3">
        <div>
          <h4 className="font-semibold mb-1">⚠️ Warning:</h4>
          <p className="text-sm text-white/90">{education.warning}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Red Flags Detected:</h4>
          <ul className="text-sm space-y-1">
            {scheme.evidence.map((evidence, index) => (
              <li key={index} className="text-white/90">
                • {evidence}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveScheme(scheme);
              handleEducationalInteraction("learned_more", scheme);
            }}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
          >
            Learn More
          </button>
          <button
            onClick={() => {
              setShowQuiz(true);
              handleEducationalInteraction("viewed", scheme);
            }}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
          >
            Take Quiz
          </button>
          <button
            onClick={() => handleEducationalInteraction("took_action", scheme)}
            className="bg-white text-black hover:bg-white/90 px-3 py-1 rounded text-sm font-medium"
          >
            Find Alternatives
          </button>
        </div>
      </div>
    </Card>
  );
};

const DetailedEducation: React.FC<{
  scheme: DetectedScheme;
  setShowQuiz: (show: boolean) => void;
  handleEducationalInteraction: (action: string, scheme: DetectedScheme) => void;
  setActiveScheme: (scheme: DetectedScheme | null) => void;
}> = ({
  scheme,
  setShowQuiz,
  handleEducationalInteraction,
  setActiveScheme,
}) => {
  const education = getSchemeEducation(scheme.type);
  if (!education) return null;

  return (
    <Card className="p-6 border-2 border-red-200">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        {education.title}
      </h2>

      <div className="prose max-w-none mb-6">
        <div className="whitespace-pre-line text-gray-700">
          {education.explanation}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold text-red-600 mb-2">
            🚩 Red Flags to Watch For:
          </h3>
          <ul className="space-y-1 text-sm">
            {education.redFlags.map((flag, index) => (
              <li key={index} className="text-gray-700">
                • {flag}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-green-600 mb-2">
            🛡️ Protective Actions:
          </h3>
          <ul className="space-y-1 text-sm">
            {education.protectiveActions.map((action, index) => (
              <li key={index} className="text-gray-700">
                • {action}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Legal Context:</h4>
        <p className="text-sm text-yellow-700">{education.legalContext}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setShowQuiz(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Test Understanding
        </button>
        <button
          onClick={() => handleEducationalInteraction("took_action", scheme)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Find Safer Alternatives
        </button>
        <button
          onClick={() => setActiveScheme(null)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </Card>
  );
};

const Quiz: React.FC<{
  scheme: DetectedScheme;
  setShowQuiz: (show: boolean) => void;
  handleEducationalInteraction: (action: string, scheme: DetectedScheme) => void;
}> = ({ scheme, setShowQuiz, handleEducationalInteraction }) => {
  const quiz = getSchemeQuiz(scheme.type);
  if (!quiz) return null;

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
    handleEducationalInteraction("learned_more", scheme);
  };

  return (
    <Card className="p-6 border-2 border-blue-200">
      <h3 className="text-xl font-bold mb-4 text-blue-600">
        📝 Understanding Check
      </h3>

      <div className="mb-4">
        <p className="font-medium mb-3">{quiz.question}</p>

        <div className="space-y-2">
          {quiz.options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="quiz"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => setSelectedAnswer(index)}
                className="text-blue-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Submit Answer
        </button>
      ) : (
        <div
          className={`p-4 rounded-lg ${
            selectedAnswer === quiz.correct
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <p
            className={`font-medium ${
              selectedAnswer === quiz.correct
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {selectedAnswer === quiz.correct ? "✓ Correct!" : "✗ Incorrect"}
          </p>
          <p className="text-sm text-gray-700 mt-1">{quiz.explanation}</p>

          <button
            onClick={() => setShowQuiz(false)}
            className="mt-3 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
          >
            Continue
          </button>
        </div>
      )}
    </Card>
  );
};

export const FintechEducationModule: React.FC<FintechEducationModuleProps> = (
  props
) => {
  const {
    activeScheme,
    setActiveScheme,
    educationHistory,
    showQuiz,
    setShowQuiz,
    quizScore,
    handleEducationalInteraction,
  } = useFintechEducation(props);

  // Show scheme alerts in order of severity
  const sortedSchemes = [...props.detectedSchemes].sort((a, b) => {
    const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });

  return (
    <div className="space-y-4">
      {/* Critical schemes always visible */}
      {sortedSchemes
        .filter((scheme) => scheme.severity === "CRITICAL")
        .map((scheme, index) => (
          <div key={`critical-${index}`}>
            <SchemeAlert
              scheme={scheme}
              setActiveScheme={setActiveScheme}
              handleEducationalInteraction={handleEducationalInteraction}
              setShowQuiz={setShowQuiz}
            />
          </div>
        ))}

      {/* Other schemes */}
      {sortedSchemes
        .filter((scheme) => scheme.severity !== "CRITICAL")
        .slice(0, 2) // Limit to avoid overwhelming
        .map((scheme, index) => (
          <div key={`other-${index}`}>
            <SchemeAlert
              scheme={scheme}
              setActiveScheme={setActiveScheme}
              handleEducationalInteraction={handleEducationalInteraction}
              setShowQuiz={setShowQuiz}
            />
          </div>
        ))}

      {/* Detailed education modal */}
      {activeScheme && !showQuiz && (
        <DetailedEducation
          scheme={activeScheme}
          setShowQuiz={setShowQuiz}
          handleEducationalInteraction={handleEducationalInteraction}
          setActiveScheme={setActiveScheme}
        />
      )}

      {/* Quiz modal */}
      {showQuiz && activeScheme && (
        <Quiz
          scheme={activeScheme}
          setShowQuiz={setShowQuiz}
          handleEducationalInteraction={handleEducationalInteraction}
        />
      )}

      {/* Summary for developers */}
      {props.detectedSchemes.length > 0 && (
        <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
          Education module active: {props.detectedSchemes.length} scheme(s)
          detected,
          {educationHistory.length} viewed, quiz score: {quizScore}%
        </div>
      )}
    </div>
  );
};
