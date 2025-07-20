"use client";

import React, { useState } from "react";
import { useEducation } from "../providers/EducationProvider";
import { useSimulation } from "../providers/SimulationProvider";
import CardSkeleton from '../ui/CardSkeleton';
import EthicalFrameworksExplainer from './EthicalFrameworksExplainer';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";

/**
 * ReflectionDashboard - Phase 3 comprehensive analysis and educational insights.
 * Implements UI streaming with React Suspense to show a loading skeleton
 * while data-heavy components are fetched and rendered on the server.
 */
const ReflectionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "comparison" | "patterns" | "analysis" | "education" | "quiz"
  >("comparison");
  const { getSimulationReport } = useSimulation();
  const { educationalContent: _educationalContent, getProgressReport } =
    useEducation();

  const simulationReport = getSimulationReport();
  const progressReport = getProgressReport();

  const generateComprehensiveReport = () => {
    // ... (keep the existing report generation logic)
  };

  const tabs = [
    { id: "comparison", label: "Comparison", icon: "📊" },
    { id: "patterns", label: "Dark Patterns", icon: "🕷️" },
    { id: "analysis", label: "Behavioral Analysis", icon: "🧠" },
    { id: "education", label: "Education", icon: "📚" },
    { id: "quiz", label: "Quiz", icon: "❓" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-violet-600 text-white py-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 text-left">
              <h1 className="text-4xl font-bold mb-2">
                🪞 Phase 3: Reflection & Analysis
              </h1>
              <p className="text-lg opacity-90">
                Compare, analyze, and learn from your experiences.
              </p>
            </div>
            <button
              onClick={generateComprehensiveReport}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
            >
              📄 Export Complete Report
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 p-4 font-semibold text-sm sm:text-base transition-all duration-200 capitalize flex items-center justify-center gap-2
                ${
                  activeTab === tab.id
                    ? "bg-violet-600 text-white border-b-4 border-violet-800"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === "comparison" && <ComparisonView />}
        {activeTab === "patterns" && <UIPatternEducation />}
        {activeTab === "analysis" && (
          <BehavioralAnalysis report={simulationReport} />
        )}
        {activeTab === "education" && (
          <EducationalContent progress={progressReport} />
        )}
        {activeTab === "quiz" && <ComprehensionQuiz />}
      </div>
    </div>
  );
};

export default ReflectionDashboard;
