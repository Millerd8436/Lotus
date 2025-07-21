"use client";

import React, { useState } from "react";
import ComparisonTab from "./ComparisonTab";
import PatternsTab from "./PatternsTab";
import AnalysisTab from "./AnalysisTab";
import EducationTab from "./EducationTab";
import QuizTab from "./QuizTab";
import { useSimulation } from "../providers/SimulationProvider";

const ReflectionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("comparison");
  const { session } = useSimulation();

  const tabs = [
    { id: "comparison", label: "Comparison" },
    { id: "patterns", label: "Dark Patterns" },
    { id: "analysis", label: "Behavioral Analysis" },
    { id: "education", label: "Education" },
    { id: "quiz", label: "Quiz" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "comparison":
        return <ComparisonTab />;
      case "patterns":
        return <PatternsTab />;
      case "analysis":
        return <AnalysisTab />;
      case "education":
        return <EducationTab />;
      case "quiz":
        return <QuizTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Phase 2: Reflection & Debrief
      </h1>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="flex border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 font-semibold ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">{renderContent()}</div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Personalized Feedback</h3>
              <p>
                Based on your actions in Phase 1, here's what we observed:
              </p>
              <ul className="list-disc pl-5 mt-4">
                {session.detectedDarkPatterns?.map((pattern, index) => (
                  <li key={index}>
                    You encountered the "{pattern.pattern}" dark pattern.
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Next Steps</h3>
              <p>
                Now that you've experienced a predatory loan application and
                reflected on the tactics used, you're ready to move on to the
                next phases of your learning journey.
              </p>
              <ul className="mt-4 space-y-4">
                <li>
                  <a
                    href="/teaching"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Phase 3: Teaching
                  </a>
                  <p className="text-sm">
                    Experience the same predatory application, but this time
                    with real-time annotations that expose the deceptive
                    tactics as they happen.
                  </p>
                </li>
                <li>
                  <a
                    href="/ethical/redesign"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Phase 4: Ethical Redesign
                  </a>
                  <p className="text-sm">
                    Explore a redesigned version of the loan application that
                    is transparent, fair, and designed to empower you.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectionDashboard;
