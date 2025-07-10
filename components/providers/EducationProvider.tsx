"use client";

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface EducationalContent {
  id: string;
  title: string;
  content: string;
  type: 'lesson' | 'quiz' | 'interactive' | 'case_study';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
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

interface EducationContextType {
  // Content management
  educationalContent: EducationalContent[];
  currentModule: EducationalContent | null;
  progress: EducationalProgress[];
  
  // Learning state
  isLearningMode: boolean;
  showEducationalOverlay: boolean;
  comprehensionScore: number;
  
  // Actions
  setCurrentModule: (module: EducationalContent) => void;
  markModuleComplete: (moduleId: string, score: number) => void;
  toggleLearningMode: () => void;
  toggleEducationalOverlay: () => void;
  updateComprehensionScore: (score: number) => void;
  
  // Educational insights
  getEducationalInsights: () => string[];
  getRecommendations: () => string[];
  getProgressReport: () => any;
}

const EducationContext = createContext<EducationContextType | undefined>(undefined);

interface EducationProviderProps {
  children: ReactNode;
  initialContent?: EducationalContent[];
}

export const EducationProvider: React.FC<EducationProviderProps> = ({
  children,
  initialContent = [],
}) => {
  const [educationalContent, setEducationalContent] = useState<EducationalContent[]>([
    {
      id: 'dark-patterns-101',
      title: 'Understanding Dark Patterns',
      content: 'Dark patterns are user interface design choices that benefit the business at the expense of the user. They exploit cognitive biases and psychological vulnerabilities to manipulate user behavior.',
      type: 'lesson',
      difficulty: 'beginner',
      tags: ['dark-patterns', 'psychology', 'ethics'],
      completed: false,
    },
    {
      id: 'payday-loan-tactics',
      title: 'Common Payday Loan Tactics',
      content: 'Payday lenders use various tactics including hidden fees, artificial urgency, and targeting vulnerable populations. Understanding these tactics helps protect against exploitation.',
      type: 'lesson',
      difficulty: 'intermediate',
      tags: ['payday-loans', 'tactics', 'financial-literacy'],
      completed: false,
    },
    {
      id: 'cognitive-biases',
      title: 'Cognitive Biases in Financial Decisions',
      content: 'Our brains are wired with cognitive biases that can lead to poor financial decisions. Recognizing these biases is the first step toward making better choices.',
      type: 'lesson',
      difficulty: 'intermediate',
      tags: ['cognitive-biases', 'psychology', 'decision-making'],
      completed: false,
    },
    {
      id: 'regulatory-protection',
      title: 'Regulatory Protections and Rights',
      content: 'Understanding your rights under consumer protection laws and state regulations can help you avoid predatory lending practices.',
      type: 'lesson',
      difficulty: 'beginner',
      tags: ['regulations', 'rights', 'consumer-protection'],
      completed: false,
    },
    {
      id: 'dark-pattern-quiz',
      title: 'Dark Pattern Recognition Quiz',
      content: 'Test your ability to identify common dark patterns used in financial services and other industries.',
      type: 'quiz',
      difficulty: 'intermediate',
      tags: ['quiz', 'dark-patterns', 'recognition'],
      completed: false,
    },
    {
      id: 'case-study-1',
      title: 'Case Study: The Debt Trap',
      content: 'Follow the story of a fictional character who falls into a payday loan debt trap and learn how to avoid similar situations.',
      type: 'case_study',
      difficulty: 'advanced',
      tags: ['case-study', 'debt-trap', 'real-world'],
      completed: false,
    },
    ...initialContent,
  ]);

  const [currentModule, setCurrentModule] = useState<EducationalContent | null>(null);
  const [progress, setProgress] = useState<EducationalProgress[]>([]);
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [showEducationalOverlay, setShowEducationalOverlay] = useState(false);
  const [comprehensionScore, setComprehensionScore] = useState(0);

  const markModuleComplete = (moduleId: string, score: number) => {
    setEducationalContent(prev => 
      prev.map(module => 
        module.id === moduleId 
          ? { ...module, completed: true, score }
          : module
      )
    );

    const newProgress: EducationalProgress = {
      moduleId,
      completion: 100,
      comprehension: score,
      timestamp: new Date().toISOString(),
    };

    setProgress(prev => [...prev, newProgress]);
  };

  const toggleLearningMode = () => {
    setIsLearningMode(prev => !prev);
  };

  const toggleEducationalOverlay = () => {
    setShowEducationalOverlay(prev => !prev);
  };

  const updateComprehensionScore = (score: number) => {
    setComprehensionScore(Math.max(0, Math.min(100, score)));
  };

  const getEducationalInsights = (): string[] => {
    const insights: string[] = [];
    const completedModules = educationalContent.filter(m => m.completed);

    if (completedModules.length === 0) {
      insights.push("Start with the basic modules to build your understanding of dark patterns");
      return insights;
    }

    const avgScore = completedModules.reduce((sum, m) => sum + (m.score || 0), 0) / completedModules.length;

    if (avgScore < 70) {
      insights.push("Your comprehension score suggests you might benefit from reviewing some concepts");
    }

    if (completedModules.length >= 3) {
      insights.push("You've completed several modules - consider taking the advanced case studies");
    }

    const darkPatternModules = completedModules.filter(m => m.tags.includes('dark-patterns'));
    if (darkPatternModules.length > 0) {
      insights.push("You've learned about dark patterns - practice identifying them in real-world scenarios");
    }

    return insights;
  };

  const getRecommendations = (): string[] => {
    const recommendations: string[] = [];
    const completedModules = educationalContent.filter(m => m.completed);
    const completedIds = completedModules.map(m => m.id);

    // Recommend next modules based on completion
    if (!completedIds.includes('dark-patterns-101')) {
      recommendations.push("Start with 'Understanding Dark Patterns' to build foundational knowledge");
    }

    if (completedIds.includes('dark-patterns-101') && !completedIds.includes('payday-loan-tactics')) {
      recommendations.push("Learn about 'Common Payday Loan Tactics' to understand specific exploitation methods");
    }

    if (completedIds.includes('payday-loan-tactics') && !completedIds.includes('cognitive-biases')) {
      recommendations.push("Study 'Cognitive Biases in Financial Decisions' to understand psychological vulnerabilities");
    }

    if (completedIds.includes('cognitive-biases') && !completedIds.includes('dark-pattern-quiz')) {
      recommendations.push("Test your knowledge with the 'Dark Pattern Recognition Quiz'");
    }

    if (completedIds.includes('dark-pattern-quiz') && !completedIds.includes('case-study-1')) {
      recommendations.push("Apply your learning with 'Case Study: The Debt Trap'");
    }

    if (completedModules.length >= 4) {
      recommendations.push("Consider exploring additional resources on consumer protection and financial literacy");
    }

    return recommendations;
  };

  const getProgressReport = () => {
    const completedModules = educationalContent.filter(m => m.completed);
    const totalModules = educationalContent.length;
    const completionRate = (completedModules.length / totalModules) * 100;
    
    const avgScore = completedModules.length > 0 
      ? completedModules.reduce((sum, m) => sum + (m.score || 0), 0) / completedModules.length
      : 0;

    const moduleTypes = educationalContent.reduce((acc, module) => {
      acc[module.type] = (acc[module.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalModules,
      completedModules: completedModules.length,
      completionRate,
      averageScore: avgScore,
      moduleTypes,
      recentProgress: progress.slice(-5),
      insights: getEducationalInsights(),
      recommendations: getRecommendations(),
    };
  };

  const value: EducationContextType = {
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

  return (
    <EducationContext.Provider value={value}>
      {children}
    </EducationContext.Provider>
  );
};

export const useEducation = (): EducationContextType => {
  const context = useContext(EducationContext);
  if (context === undefined) {
    throw new Error('useEducation must be used within an EducationProvider');
  }
  return context;
};

// Educational overlay component
export const EducationalOverlay: React.FC<{
  title: string;
  content: string;
  onClose: () => void;
  showQuiz?: boolean;
}> = ({ title, content, onClose, showQuiz = false }) => {
  const [showQuizComponent, setShowQuizComponent] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed">{content}</p>
        </div>

        {showQuiz && !showQuizComponent && (
          <div className="mb-4">
            <button
              onClick={() => setShowQuizComponent(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Take Comprehension Quiz
            </button>
          </div>
        )}

        {showQuizComponent && (
          <EducationalQuiz
            onComplete={(score) => {
              console.log('Quiz completed with score:', score);
              setShowQuizComponent(false);
            }}
          />
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple educational quiz component
const EducationalQuiz: React.FC<{
  onComplete: (score: number) => void;
}> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "What is a dark pattern?",
      options: [
        "A user interface design choice that benefits the business at the expense of the user",
        "A type of software bug",
        "A color scheme for websites",
        "A security feature"
      ],
      correct: 0
    },
    {
      question: "Which of the following is NOT a common payday loan tactic?",
      options: [
        "Hidden fees",
        "Artificial urgency",
        "Transparent pricing",
        "Targeting vulnerable populations"
      ],
      correct: 2
    },
    {
      question: "What cognitive bias makes people more likely to choose immediate rewards over long-term benefits?",
      options: [
        "Confirmation bias",
        "Present bias",
        "Anchoring bias",
        "Availability bias"
      ],
      correct: 1
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = newAnswers.filter((answer, index) => 
        answer === questions[index].correct
      ).length;
      const score = Math.round((correctAnswers / questions.length) * 100);
      onComplete(score);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </h3>
      
      <p className="text-gray-700 mb-4">{question.question}</p>
      
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
