"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSimulation } from "../providers/SimulationProvider";

/**
 * Enhanced ModeSelector - Comprehensive 4-Phase Navigation System
 * Always visible at top of all pages for seamless phase transitions
 *
 * Phase 1: Exploitative Experience (Raw predatory simulation)
 * Phase 2: Retrospective Analysis (Kantian debrief & analysis)
 * Phase 3: Live Annotation (Teaching mode with real-time insights)
 * Phase 4: Ethical Redesign (How lending should work)
 */
const ModeSelector: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFullSelector, setShowFullSelector] = useState(false);
  const { session, updateSession } = useSimulation();

  const getPhase = () => {
    // Comprehensive route to phase mapping
    if (pathname.startsWith("/exploitative")) return 1;
    if (pathname.startsWith("/reflection")) return 2;
    if (pathname.startsWith("/teaching")) return 3;
    if (pathname.startsWith("/ethical")) return 4;
    if (pathname === "/") return 1; // Default homepage to phase 1
    return 1;
  };

  const phase = getPhase();

  // Track phase visits
  useEffect(() => {
    const visitedPhases = session.visitedPhases || [];
    if (!visitedPhases.includes(phase)) {
      updateSession({
        visitedPhases: [...visitedPhases, phase],
        currentPhase: phase as 1 | 2 | 3,
      });
    }
  }, [phase, session.visitedPhases, updateSession]);

  const handlePhaseTransition = async (newPhase: number, route: string) => {
    if (phase === newPhase || isTransitioning) return;

    setIsTransitioning(true);

    // Update session with phase transition
    updateSession({
      currentPhase: newPhase as 1 | 2 | 3,
      phaseHistory: [
        ...(session.phaseHistory || []),
        {
          from: phase,
          to: newPhase,
          timestamp: Date.now(),
          route: route,
        },
      ],
    });

    // Smooth transition with loading state
    await new Promise((resolve) => setTimeout(resolve, 300));
    router.push(route);

    setTimeout(() => setIsTransitioning(false), 500);
  };

  const phases = [
    {
      id: 1,
      route: "/exploitative",
      title: "Phase 1",
      fullTitle: "Exploitative Experience",
      subtitle: "Raw Predatory Simulation",
      icon: "🕷️",
      description: "Experience predatory payday loan tactics without filters",
      color: "#dc2626",
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      textColor: "text-red-600",
      lightBg: "bg-red-50",
      borderColor: "border-red-500",
    },
    {
      id: 2,
      route: "/reflection",
      title: "Phase 2",
      fullTitle: "Retrospective Analysis",
      subtitle: "Kantian Ethics Debrief",
      icon: "📊",
      description: "Analyze what happened through ethical frameworks",
      color: "#3b82f6",
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      textColor: "text-blue-600",
      lightBg: "bg-blue-50",
      borderColor: "border-blue-500",
    },
    {
      id: 3,
      route: "/teaching",
      title: "Phase 3",
      fullTitle: "Live Annotation",
      subtitle: "Teaching Mode",
      icon: "🎓",
      description: "Same experience with real-time educational annotations",
      color: "#f59e0b",
      bgColor: "bg-amber-500",
      hoverColor: "hover:bg-amber-600",
      textColor: "text-amber-600",
      lightBg: "bg-amber-50",
      borderColor: "border-amber-500",
    },
    {
      id: 4,
      route: "/ethical",
      title: "Phase 4",
      fullTitle: "Ethical Redesign",
      subtitle: "How It Should Work",
      icon: "🌱",
      description: "Transparent, respectful, Kantian-compliant lending",
      color: "#10b981",
      bgColor: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600",
      textColor: "text-emerald-600",
      lightBg: "bg-emerald-50",
      borderColor: "border-emerald-500",
    },
  ];

  const currentPhaseData = phases.find((p) => p.id === phase);
  const completedPhases = session.visitedPhases || [];
  const progressPercentage = Math.round((completedPhases.length / 4) * 100);

  // Compact view for smaller screens or when collapsed
  if (!showFullSelector) {
    return (
      <div className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Current phase indicator */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg ${currentPhaseData?.bgColor} flex items-center justify-center text-white font-bold shadow-lg`}
              >
                {currentPhaseData?.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {currentPhaseData?.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {currentPhaseData?.subtitle}
                </p>
              </div>
            </div>

            {/* Quick phase buttons */}
            <div className="flex items-center gap-2">
              {phases.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePhaseTransition(p.id, p.route)}
                  disabled={isTransitioning}
                  className={`
                    w-8 h-8 rounded-full transition-all duration-200 text-sm font-bold
                    ${
                      phase === p.id
                        ? `${p.bgColor} text-white shadow-lg`
                        : `bg-gray-200 hover:bg-gray-300 text-gray-600 ${p.hoverColor} hover:text-white`
                    }
                    ${
                      completedPhases.includes(p.id)
                        ? "ring-2 ring-green-400"
                        : ""
                    }
                    ${
                      isTransitioning
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  `}
                >
                  {p.id}
                </button>
              ))}

              {/* Expand button */}
              <button
                onClick={() => setShowFullSelector(true)}
                className="ml-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                Details
              </button>
            </div>

            {/* Progress indicator */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-sm text-gray-600">
                Progress: {progressPercentage}%
              </div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full selector view
  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Lotus Educational Platform - 4-Phase Navigation
            </h2>
            <p className="text-gray-600">
              Understanding predatory lending through progressive education
            </p>
          </div>
          <button
            onClick={() => setShowFullSelector(false)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            Collapse
          </button>
        </div>

        {/* Phase cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {phases.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePhaseTransition(p.id, p.route)}
              disabled={isTransitioning}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300 text-left group
                ${
                  phase === p.id
                    ? `${p.borderColor} ${p.lightBg} shadow-lg scale-105`
                    : "border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 hover:shadow-md"
                }
                ${
                  isTransitioning
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
            >
              {/* Phase status indicators */}
              <div className="absolute top-2 right-2 flex gap-1">
                {phase === p.id && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    CURRENT
                  </span>
                )}
                {completedPhases.includes(p.id) && (
                  <span className="bg-green-500 text-white text-xs px-1.5 py-1 rounded-full">
                    ✓
                  </span>
                )}
              </div>

              {/* Phase content */}
              <div className="mb-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{p.title}</h3>
                    <p className="text-sm text-gray-600">{p.fullTitle}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {p.subtitle}
                </p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {p.description}
              </p>

              {/* Hover effect */}
              <div
                className={`
                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300
                ${p.bgColor}
              `}
              />
            </button>
          ))}
        </div>

        {/* Progress and recommendations */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Learning Progress</h4>
            <span className="text-sm text-gray-600">
              {completedPhases.length}/4 Phases Visited
            </span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 via-amber-400 to-green-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {progressPercentage}%
            </span>
          </div>

          {/* Recommendations */}
          <div className="text-sm text-gray-600">
            {completedPhases.length === 0 && (
              <p>
                🚀 <strong>Start with Phase 1</strong> to experience predatory
                lending firsthand
              </p>
            )}
            {completedPhases.length === 1 && !completedPhases.includes(2) && (
              <p>
                📊 <strong>Continue to Phase 2</strong> to analyze what you
                experienced
              </p>
            )}
            {completedPhases.length === 2 && !completedPhases.includes(3) && (
              <p>
                🎓 <strong>Try Phase 3</strong> to see the same experience with
                educational annotations
              </p>
            )}
            {completedPhases.length === 3 && !completedPhases.includes(4) && (
              <p>
                🌱 <strong>Complete with Phase 4</strong> to see how ethical
                lending works
              </p>
            )}
            {completedPhases.length === 4 && (
              <p>
                🎉 <strong>Congratulations!</strong> You've completed the full
                educational journey
              </p>
            )}
          </div>
        </div>

        {/* Transition loading overlay */}
        {isTransitioning && (
          <div className="absolute inset-0 bg-white bg-opacity-90 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Transitioning to next phase...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeSelector;
