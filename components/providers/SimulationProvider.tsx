"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Mock implementations for removed legacy files
class Echo {
  logAction(event: string, data?: any) {
    console.log('Echo:', event, data);
  }
}

class ResearchAnalytics {
  recordUserInteraction(event: string, element: string, value: any) {
    console.log('Research Analytics:', event, element, value);
  }
}

class ComprehensiveEthicsEngine {
  constructor(session: any, behavioralEngine: any) {
    // Mock constructor
  }
  
  analyzeUIInteraction(event: string, data: any) {
    console.log('Ethics Engine:', event, data);
    return { ethicalScore: 0.5, concerns: [] };
  }
}

interface SimulationState {
  currentPhase: 1 | 2 | 3;
  isActive: boolean;
  isPaused: boolean;
  startTime: number;
  elapsedTime: number;
  sessionId: string;
}

interface SimulationMetrics {
  autonomyScore: number;
  coercionIndex: number;
  manipulationExposure: number;
  decisionQuality: number;
  vulnerabilityIndex: number;
  psychologicalStress: number;
}

interface SimulationContextType {
  // State management
  simulationState: SimulationState;
  metrics: SimulationMetrics;
  
  // Actions
  startSimulation: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  resetSimulation: () => void;
  transitionToPhase: (phase: 1 | 2 | 3) => void;
  
  // Metrics tracking
  updateMetrics: (updates: Partial<SimulationMetrics>) => void;
  recordEvent: (eventType: string, data: any) => void;
  
  // Analysis
  getSimulationReport: () => any;
  getPhaseAnalysis: (phase: number) => any;
}

const SimulationContext = createContext<SimulationContextType & {
  echo: Echo;
  researchAnalytics: ResearchAnalytics;
  ethicsEngine: any;
  logAction: (event: string, data?: any) => void;
} | undefined>(undefined);

interface SimulationProviderProps {
  children: ReactNode;
  initialPhase?: 1 | 2 | 3;
}

export const SimulationProvider: React.FC<SimulationProviderProps> = ({
  children,
  initialPhase = 1,
}) => {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    currentPhase: initialPhase,
    isActive: false,
    isPaused: false,
    startTime: 0,
    elapsedTime: 0,
    sessionId: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  });

  const [metrics, setMetrics] = useState<SimulationMetrics>({
    autonomyScore: 100,
    coercionIndex: 0,
    manipulationExposure: 0,
    decisionQuality: 100,
    vulnerabilityIndex: 0,
    psychologicalStress: 0,
  });

  const [events, setEvents] = useState<any[]>([]);
  const [phaseData, setPhaseData] = useState<Record<number, any>>({});

  // Legacy/analytics/ethics engines
  const [echo] = useState(() => new Echo());
  const [researchAnalytics] = useState(() => new ResearchAnalytics());
  // For demo, pass nulls for session/behavioralEngine; in real use, wire session
  const [ethicsEngine] = useState(() => new ComprehensiveEthicsEngine({}, null));

  // Phase-aware logAction
  const logAction = (event: string, data?: any) => {
    echo.logAction(event, data);
    researchAnalytics.recordUserInteraction(event, data?.element || '', data?.value);
    ethicsEngine.analyzeUIInteraction(event, data);
  };

  // Timer for tracking elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (simulationState.isActive && !simulationState.isPaused) {
      interval = setInterval(() => {
        setSimulationState(prev => ({
          ...prev,
          elapsedTime: Date.now() - prev.startTime,
        }));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [simulationState.isActive, simulationState.isPaused, simulationState.startTime]);

  const startSimulation = () => {
    const startTime = Date.now();
    setSimulationState(prev => ({
      ...prev,
      isActive: true,
      isPaused: false,
      startTime,
      elapsedTime: 0,
    }));

    recordEvent('simulation_started', {
      phase: simulationState.currentPhase,
      timestamp: new Date().toISOString(),
    });
  };

  const pauseSimulation = () => {
    setSimulationState(prev => ({
      ...prev,
      isPaused: true,
    }));

    recordEvent('simulation_paused', {
      phase: simulationState.currentPhase,
      elapsedTime: simulationState.elapsedTime,
      timestamp: new Date().toISOString(),
    });
  };

  const resumeSimulation = () => {
    setSimulationState(prev => ({
      ...prev,
      isPaused: false,
    }));

    recordEvent('simulation_resumed', {
      phase: simulationState.currentPhase,
      timestamp: new Date().toISOString(),
    });
  };

  const resetSimulation = () => {
    setSimulationState(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
      startTime: 0,
      elapsedTime: 0,
      currentPhase: 1,
    }));

    setMetrics({
      autonomyScore: 100,
      coercionIndex: 0,
      manipulationExposure: 0,
      decisionQuality: 100,
      vulnerabilityIndex: 0,
      psychologicalStress: 0,
    });

    setEvents([]);
    setPhaseData({});

    recordEvent('simulation_reset', {
      timestamp: new Date().toISOString(),
    });
  };

  const transitionToPhase = (phase: 1 | 2 | 3) => {
    // Save current phase data
    setPhaseData(prev => ({
      ...prev,
      [simulationState.currentPhase]: {
        duration: simulationState.elapsedTime,
        metrics: { ...metrics },
        events: events.filter(e => e.phase === simulationState.currentPhase),
        timestamp: new Date().toISOString(),
      },
    }));

    // Transition to new phase
    setSimulationState(prev => ({
      ...prev,
      currentPhase: phase,
      startTime: Date.now(),
      elapsedTime: 0,
    }));

    // Reset metrics for new phase
    setMetrics({
      autonomyScore: phase === 1 ? 100 : phase === 2 ? 80 : 60,
      coercionIndex: phase === 1 ? 0 : phase === 2 ? 0.2 : 0.4,
      manipulationExposure: phase === 1 ? 0 : phase === 2 ? 2 : 5,
      decisionQuality: phase === 1 ? 100 : phase === 2 ? 85 : 70,
      vulnerabilityIndex: phase === 1 ? 0 : phase === 2 ? 0.3 : 0.6,
      psychologicalStress: phase === 1 ? 0 : phase === 2 ? 20 : 40,
    });

    recordEvent('phase_transition', {
      fromPhase: simulationState.currentPhase,
      toPhase: phase,
      timestamp: new Date().toISOString(),
    });
  };

  const updateMetrics = (updates: Partial<SimulationMetrics>) => {
    setMetrics(prev => ({
      ...prev,
      ...updates,
    }));

    recordEvent('metrics_updated', {
      updates,
      currentMetrics: { ...metrics, ...updates },
      timestamp: new Date().toISOString(),
    });
  };

  const recordEvent = (eventType: string, data: any) => {
    const event = {
      type: eventType,
      phase: simulationState.currentPhase,
      timestamp: new Date().toISOString(),
      elapsedTime: simulationState.elapsedTime,
      data,
    };

    setEvents(prev => [...prev, event]);
  };

  const getSimulationReport = () => {
    const totalEvents = events.length;
    const phaseEvents = events.reduce((acc, event) => {
      acc[event.phase] = (acc[event.phase] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const avgMetrics = {
      autonomyScore: metrics.autonomyScore,
      coercionIndex: metrics.coercionIndex,
      manipulationExposure: metrics.manipulationExposure,
      decisionQuality: metrics.decisionQuality,
      vulnerabilityIndex: metrics.vulnerabilityIndex,
      psychologicalStress: metrics.psychologicalStress,
    };

    return {
      sessionId: simulationState.sessionId,
      totalDuration: simulationState.elapsedTime,
      currentPhase: simulationState.currentPhase,
      isActive: simulationState.isActive,
      totalEvents,
      phaseEvents,
      currentMetrics: avgMetrics,
      phaseData,
      recentEvents: events.slice(-10),
      insights: generateInsights(),
      recommendations: generateRecommendations(),
    };
  };

  const getPhaseAnalysis = (phase: number) => {
    const phaseEvents = events.filter(e => e.phase === phase);
    const phaseMetrics = phaseData[phase]?.metrics || metrics;

    return {
      phase,
      duration: phaseData[phase]?.duration || 0,
      eventCount: phaseEvents.length,
      metrics: phaseMetrics,
      events: phaseEvents,
      analysis: analyzePhase(phase, phaseEvents, phaseMetrics),
    };
  };

  const generateInsights = (): string[] => {
    const insights: string[] = [];

    if (metrics.coercionIndex > 0.5) {
      insights.push("High levels of psychological coercion detected");
    }

    if (metrics.manipulationExposure > 3) {
      insights.push("Multiple manipulation tactics were used");
    }

    if (metrics.autonomyScore < 50) {
      insights.push("Significant reduction in autonomous decision-making");
    }

    if (metrics.decisionQuality < 70) {
      insights.push("Decision quality was compromised by external factors");
    }

    if (simulationState.currentPhase === 3) {
      insights.push("Reflection phase allows comparison of different approaches");
    }

    return insights;
  };

  const generateRecommendations = (): string[] => {
    const recommendations: string[] = [];

    if (metrics.coercionIndex > 0.3) {
      recommendations.push("Be aware of time pressure and urgency tactics");
    }

    if (metrics.manipulationExposure > 2) {
      recommendations.push("Look for hidden fees and obscured information");
    }

    if (metrics.autonomyScore < 70) {
      recommendations.push("Take time to make informed decisions");
    }

    recommendations.push("Compare multiple options before making financial decisions");
    recommendations.push("Understand your rights under consumer protection laws");
    recommendations.push("Seek financial counseling if needed");

    return recommendations;
  };

  const analyzePhase = (phase: number, events: any[], metrics: SimulationMetrics) => {
    switch (phase) {
      case 1:
        return {
          focus: "Exploitative practices demonstration",
          keyFindings: [
            "High manipulation exposure",
            "Reduced autonomy score",
            "Increased coercion index",
          ],
          educationalValue: "Shows real predatory lending tactics",
        };
      case 2:
        return {
          focus: "Ethical alternatives learning",
          keyFindings: [
            "Improved transparency",
            "Better decision quality",
            "Reduced manipulation",
          ],
          educationalValue: "Demonstrates fair lending practices",
        };
      case 3:
        return {
          focus: "Comparative analysis and reflection",
          keyFindings: [
            "Clear contrast between approaches",
            "Enhanced understanding of tactics",
            "Improved decision-making awareness",
          ],
          educationalValue: "Enables critical comparison and learning",
        };
      default:
        return {
          focus: "Unknown phase",
          keyFindings: [],
          educationalValue: "Limited educational value",
        };
    }
  };

  const value: SimulationContextType & {
    echo: Echo;
    researchAnalytics: ResearchAnalytics;
    ethicsEngine: any;
    logAction: (event: string, data?: any) => void;
  } = {
    simulationState,
    metrics,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
    transitionToPhase,
    updateMetrics,
    recordEvent,
    getSimulationReport,
    getPhaseAnalysis,
    echo,
    researchAnalytics,
    ethicsEngine,
    logAction,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider');
  return ctx;
};

// Simulation control panel component
export const SimulationControlPanel: React.FC = () => {
  const {
    simulationState,
    metrics,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
    transitionToPhase,
  } = useSimulation();

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Simulation Control</h3>
        <div className="text-sm text-gray-600">
          Phase {simulationState.currentPhase} • {formatTime(simulationState.elapsedTime)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-600">Autonomy Score</div>
          <div className="text-lg font-semibold text-blue-600">{Math.round(metrics.autonomyScore)}%</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Coercion Index</div>
          <div className="text-lg font-semibold text-red-600">{metrics.coercionIndex.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Manipulation Exposure</div>
          <div className="text-lg font-semibold text-orange-600">{metrics.manipulationExposure}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Decision Quality</div>
          <div className="text-lg font-semibold text-green-600">{Math.round(metrics.decisionQuality)}%</div>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {!simulationState.isActive ? (
          <button
            onClick={startSimulation}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Start
          </button>
        ) : simulationState.isPaused ? (
          <button
            onClick={resumeSimulation}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Resume
          </button>
        ) : (
          <button
            onClick={pauseSimulation}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Pause
          </button>
        )}
        
        <button
          onClick={resetSimulation}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="flex space-x-2">
        {[1, 2, 3].map((phase) => (
          <button
            key={phase}
            onClick={() => transitionToPhase(phase as 1 | 2 | 3)}
            className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
              simulationState.currentPhase === phase
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Phase {phase}
          </button>
        ))}
      </div>
    </div>
  );
};
