"use client";

import { getInitialLotusSession, LotusSession } from "@/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

// Educational content interfaces
interface EducationalContent {
  id: string;
  title: string;
  content: string;
  type: "lesson" | "quiz" | "interactive" | "case_study";
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  completed: boolean;
  score?: number;
}

interface EducationalProgress {
  moduleId: string;
  completion: number;
  comprehension: number;
  timestamp: string;
}

// Unified context interface combining simulation and education
interface UnifiedLotusContextType {
  // Simulation state
  session: LotusSession;
  updateSession: (data: Partial<LotusSession>) => void;
  transitionToPhase: (phase: 1 | 2 | 3) => void;

  // Educational state
  educationalContent: EducationalContent[];
  currentModule: EducationalContent | null;
  progress: EducationalProgress[];
  isLearningMode: boolean;
  showEducationalOverlay: boolean;
  comprehensionScore: number;

  // Educational actions
  setCurrentModule: (module: EducationalContent) => void;
  markModuleComplete: (moduleId: string, score: number) => void;
  toggleLearningMode: () => void;
  toggleEducationalOverlay: () => void;
  updateComprehensionScore: (score: number) => void;

  // Educational insights
  getEducationalInsights: () => string[];
  getRecommendations: () => string[];
  getProgressReport: () => any;

  // Phase-specific methods
  startPhaseOneSimulation: (mode: "ethical" | "exploitative") => void;
  completePhaseOneReflection: (
    darkPatterns: string[],
    ethicalViolations: string[]
  ) => void;
  activateRealTimeAnnotations: (enabled: boolean) => void;
}

const UnifiedLotusContext = createContext<UnifiedLotusContextType | undefined>(
  undefined
);

interface UnifiedLotusProviderProps {
  children: ReactNode;
  initialContent?: EducationalContent[];
}

export const UnifiedLotusProvider: React.FC<UnifiedLotusProviderProps> = ({
  children,
  initialContent = [],
}) => {
  // Simulation state
  const [session, setSession] = useState<LotusSession>(
    getInitialLotusSession()
  );

  // Educational state
  const [educationalContent, setEducationalContent] = useState<
    EducationalContent[]
  >([
    {
      id: "belmont-report-primer",
      title: "Belmont Report Principles in Lending",
      content:
        "The Belmont Report established three core ethical principles: respect for persons (autonomy), beneficence (maximizing benefits), and justice (fair distribution). In lending, these translate to informed consent, protecting borrower welfare, and preventing exploitation of vulnerable populations.",
      type: "lesson",
      difficulty: "beginner",
      tags: ["ethics", "belmont-report", "autonomy", "lending"],
      completed: false,
    },
    {
      id: "fintech-dark-patterns-2025",
      title: "2025 Fintech Dark Patterns",
      content:
        "Modern fintech uses sophisticated dark patterns including 'tip coercion', 'confession of judgment' clauses, 'rent-a-bank' schemes, hidden daily debit structures, and psychological manipulation through fake scarcity and social proof.",
      type: "lesson",
      difficulty: "intermediate",
      tags: ["dark-patterns", "fintech", "2025", "manipulation"],
      completed: false,
    },
    {
      id: "kantian-ethics-assessment",
      title: "Kantian Ethics in Financial Services",
      content:
        "Kant's categorical imperative asks: 'Can this action be universalized?' In lending, this means examining whether deceptive practices would work if everyone used them (they wouldn't), making them ethically impermissible.",
      type: "lesson",
      difficulty: "advanced",
      tags: ["kant", "categorical-imperative", "ethics", "universalizability"],
      completed: false,
    },
    {
      id: "cfpb-2025-regulations",
      title: "CFPB 2025 Abusive Practice Standards",
      content:
        "The CFPB's 2025 guidance defines abusive practices as those taking unreasonable advantage of consumer inability to protect their interests, lack of understanding, or reasonable reliance on covered persons to act in their interests.",
      type: "lesson",
      difficulty: "intermediate",
      tags: ["cfpb", "regulations", "2025", "abusive-practices"],
      completed: false,
    },
    {
      id: "real-time-protection-quiz",
      title: "Real-Time Dark Pattern Recognition",
      content:
        "Test your ability to identify dark patterns in real-time as they appear in loan applications, including hidden fees, manipulative timers, and consent theater.",
      type: "quiz",
      difficulty: "advanced",
      tags: ["quiz", "real-time", "protection", "recognition"],
      completed: false,
    },
    ...initialContent,
  ]);

  const [currentModule, setCurrentModule] = useState<EducationalContent | null>(
    null
  );
  const [progress, setProgress] = useState<EducationalProgress[]>([]);
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [showEducationalOverlay, setShowEducationalOverlay] = useState(false);
  const [comprehensionScore, setComprehensionScore] = useState(0);

  // Simulation methods
  const updateSession = (data: Partial<LotusSession>) => {
    setSession((prev) => ({ ...prev, ...data }));
  };

  const transitionToPhase = (phase: 1 | 2 | 3) => {
    setSession((prev) => ({
      ...prev,
      currentPhase: phase,
    }));
  };

  // Educational methods
  const markModuleComplete = (moduleId: string, score: number) => {
    setEducationalContent((prev) =>
      prev.map((module) =>
        module.id === moduleId ? { ...module, completed: true, score } : module
      )
    );

    const newProgress: EducationalProgress = {
      moduleId,
      completion: 100,
      comprehension: score,
      timestamp: new Date().toISOString(),
    };

    setProgress((prev) => [...prev, newProgress]);
  };

  const toggleLearningMode = () => {
    setIsLearningMode((prev) => !prev);
  };

  const toggleEducationalOverlay = () => {
    setShowEducationalOverlay((prev) => !prev);
  };

  const updateComprehensionScore = (score: number) => {
    setComprehensionScore(Math.max(0, Math.min(100, score)));
  };

  const getEducationalInsights = (): string[] => {
    const insights: string[] = [];
    const completedModules = educationalContent.filter((m) => m.completed);

    if (completedModules.length === 0) {
      insights.push(
        "Start with the Belmont Report primer to understand ethical foundations"
      );
      return insights;
    }

    const avgScore =
      completedModules.reduce((sum, m) => sum + (m.score || 0), 0) /
      completedModules.length;

    if (avgScore < 70) {
      insights.push(
        "Consider reviewing ethical frameworks before advancing to complex scenarios"
      );
    }

    if (
      session.currentPhase === 2 &&
      completedModules.some((m) => m.tags.includes("kant"))
    ) {
      insights.push(
        "Your understanding of Kantian ethics will help in retrospective analysis"
      );
    }

    if (
      session.currentPhase === 3 &&
      completedModules.some((m) => m.tags.includes("real-time"))
    ) {
      insights.push(
        "Apply your real-time recognition skills to identify emerging dark patterns"
      );
    }

    return insights;
  };

  const getRecommendations = (): string[] => {
    const recommendations: string[] = [];
    const completedIds = educationalContent
      .filter((m) => m.completed)
      .map((m) => m.id);

    if (!completedIds.includes("belmont-report-primer")) {
      recommendations.push(
        "Start with Belmont Report principles for ethical foundation"
      );
    }

    if (
      session.currentPhase === 2 &&
      !completedIds.includes("kantian-ethics-assessment")
    ) {
      recommendations.push(
        "Study Kantian ethics for Phase 2 retrospective analysis"
      );
    }

    if (
      session.currentPhase === 3 &&
      !completedIds.includes("real-time-protection-quiz")
    ) {
      recommendations.push(
        "Take the real-time recognition quiz to prepare for live annotation"
      );
    }

    return recommendations;
  };

  const getProgressReport = () => {
    const completedModules = educationalContent.filter((m) => m.completed);
    const totalModules = educationalContent.length;
    const completionRate = (completedModules.length / totalModules) * 100;
    const avgScore =
      completedModules.length > 0
        ? completedModules.reduce((sum, m) => sum + (m.score || 0), 0) /
          completedModules.length
        : 0;

    return {
      totalModules,
      completedModules: completedModules.length,
      completionRate,
      averageScore: avgScore,
      currentPhase: session.currentPhase,
      sessionData: session,
      insights: getEducationalInsights(),
      recommendations: getRecommendations(),
    };
  };

  // Phase-specific methods
  const startPhaseOneSimulation = (mode: "ethical" | "exploitative") => {
    updateSession({
      currentPhase: 1,
      mode,
      startTime: new Date(),
    });
  };

  const completePhaseOneReflection = (
    darkPatterns: string[],
    ethicalViolations: string[]
  ) => {
    updateSession({
      phase1Results: {
        darkPatternsIdentified: darkPatterns,
        ethicalViolations,
        completedAt: new Date().toISOString(),
      },
    });
    transitionToPhase(2);
  };

  const activateRealTimeAnnotations = (enabled: boolean) => {
    updateSession({
      realTimeAnnotationsEnabled: enabled,
    });
    if (enabled) {
      transitionToPhase(3);
    }
  };

  const value: UnifiedLotusContextType = {
    // Simulation
    session,
    updateSession,
    transitionToPhase,

    // Education
    educationalContent,
    currentModule,
    progress,
    isLearningMode,
    showEducationalOverlay,
    comprehensionScore,
    setCurrentModule,
    markModuleComplete,
    toggleLearningMode,
    toggleEducationalOverlay,
    updateComprehensionScore,
    getEducationalInsights,
    getRecommendations,
    getProgressReport,

    // Phase-specific
    startPhaseOneSimulation,
    completePhaseOneReflection,
    activateRealTimeAnnotations,
  };

  return (
    <UnifiedLotusContext.Provider value={value}>
      {children}
    </UnifiedLotusContext.Provider>
  );
};

export const useLotus = (): UnifiedLotusContextType => {
  const context = useContext(UnifiedLotusContext);
  if (context === undefined) {
    throw new Error("useLotus must be used within a UnifiedLotusProvider");
  }
  return context;
};

// Legacy compatibility exports
export const useSimulation = () => {
  const { session, updateSession, transitionToPhase } = useLotus();
  return { session, updateSession, transitionToPhase };
};

export const useEducation = () => {
  const {
    educationalContent,
    currentModule,
    progress,
    isLearningMode,
    showEducationalOverlay,
    comprehensionScore,
    setCurrentModule,
    markModuleComplete,
    toggleLearningMode,
    toggleEducationalOverlay,
    updateComprehensionScore,
    getEducationalInsights,
    getRecommendations,
    getProgressReport,
  } = useLotus();

  return {
    educationalContent,
    currentModule,
    progress,
    isLearningMode,
    showEducationalOverlay,
    comprehensionScore,
    setCurrentModule,
    markModuleComplete,
    toggleLearningMode,
    toggleEducationalOverlay,
    updateComprehensionScore,
    getEducationalInsights,
    getRecommendations,
    getProgressReport,
  };
};
