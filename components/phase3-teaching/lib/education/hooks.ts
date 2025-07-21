import { useEffect, useState } from "react";
import {
  DetectedScheme,
  EducationalInteraction,
  FintechEducationModuleProps,
} from "../interfaces";
import { getSchemeEducation } from "./utils";

export const useFintechEducation = ({
  detectedSchemes,
  onEducationalInteraction,
}: FintechEducationModuleProps) => {
  const [activeScheme, setActiveScheme] = useState<DetectedScheme | null>(null);
  const [educationHistory, setEducationHistory] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    // Auto-show education for critical schemes
    const criticalScheme = detectedSchemes.find(
      (s) => s.severity === "CRITICAL"
    );
    if (criticalScheme && !educationHistory.includes(criticalScheme.type)) {
      setActiveScheme(criticalScheme);
    }
  }, [detectedSchemes]);

  const handleEducationalInteraction = (
    action: string,
    scheme: DetectedScheme
  ) => {
    const interaction: EducationalInteraction = {
      timestamp: new Date(),
      schemeType: scheme.type,
      educationalContent: getSchemeEducation(scheme.type)?.title || "",
      userAction: action as any,
      comprehensionScore: showQuiz ? quizScore ?? 0 : undefined,
    };

    onEducationalInteraction(interaction);

    if (action === "viewed") {
      setEducationHistory((prev) => [...prev, scheme.type]);
    }
  };

  return {
    activeScheme,
    setActiveScheme,
    educationHistory,
    showQuiz,
    setShowQuiz,
    quizScore,
    setQuizScore,
    handleEducationalInteraction,
  };
};
