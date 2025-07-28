"use client";

import React, { createContext, ReactNode, useContext, useState, useCallback } from "react";
import { LoanType, SimulationConfig } from "@/types";
import { simulationConfigs } from "@/components/lib/simulationConfigs";

export type ExperimentPhase = 
  | 'NOT_STARTED'
  | 'INFORMED_CONSENT'
  | 'SIMULATION_1'
  | 'QUIZ_1'
  | 'RANKING_1'
  | 'SIMULATION_2'
  | 'QUIZ_2'
  | 'RANKING_2'
  | 'SIMULATION_3'
  | 'QUIZ_3'
  | 'RANKING_3'
  | 'SIMULATION_4'
  | 'QUIZ_4'
  | 'RANKING_4'
  | 'FINAL_QUIZ'
  | 'DATA_CONSENT'
  | 'DEBRIEF'
  | 'COMPLETED';

export interface ExperimentState {
  experimentId: string | null;
  userId: string;
  loanOrder: LoanType[];
  currentPhase: ExperimentPhase;
  phaseData: {
    [key in ExperimentPhase]?: any;
  };
  completedLoans: LoanType[];
}

interface SimulationContextType {
  experimentState: ExperimentState;
  startExperiment: (userId: string) => void;
  getCurrentSimulationConfig: () => SimulationConfig | undefined;
  progressToNextPhase: (currentPhaseData?: any) => void;
  getCurrentLoanType: () => LoanType | undefined;
  getCompletedLoans: () => LoanType[];
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

const getRandomizedLoanOrder = (): LoanType[] => {
  const loanTypes: LoanType[] = ['Payday', 'Installment', 'EWA', 'BNPL'];
  // Fisher-Yates shuffle
  for (let i = loanTypes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [loanTypes[i], loanTypes[j]] = [loanTypes[j], loanTypes[i]];
  }
  return loanTypes;
};

const getInitialExperimentState = (userId: string): Omit<ExperimentState, 'experimentId'> => ({
  userId,
  loanOrder: getRandomizedLoanOrder(),
  currentPhase: 'NOT_STARTED',
  phaseData: {},
  completedLoans: [],
});

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [experimentState, setExperimentState] = useState<ExperimentState | null>(null);

  const startExperiment = useCallback(async (userId: string) => {
    const initialState = getInitialExperimentState(userId);
    try {
      const response = await fetch('/api/experiments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          loanOrder: initialState.loanOrder,
        }),
      });
      const newExperiment = await response.json();
      if (response.ok) {
        setExperimentState({
          ...initialState,
          experimentId: newExperiment.id,
          currentPhase: 'INFORMED_CONSENT'
        });
      } else {
        console.error('Failed to create experiment:', newExperiment.error);
      }
    } catch (error) {
      console.error('Error creating experiment:', error);
    }
  }, []);

  const getCurrentLoanType = useCallback((): LoanType | undefined => {
    if (!experimentState) return undefined;
    
    const phaseToIndex: Record<string, number> = {
      'SIMULATION_1': 0, 'QUIZ_1': 0, 'RANKING_1': 0,
      'SIMULATION_2': 1, 'QUIZ_2': 1, 'RANKING_2': 1,
      'SIMULATION_3': 2, 'QUIZ_3': 2, 'RANKING_3': 2,
      'SIMULATION_4': 3, 'QUIZ_4': 3, 'RANKING_4': 3,
    };
    
    const index = phaseToIndex[experimentState.currentPhase];
    return index !== undefined ? experimentState.loanOrder[index] : undefined;
  }, [experimentState]);

  const getCurrentSimulationConfig = useCallback((): SimulationConfig | undefined => {
    const loanType = getCurrentLoanType();
    if (!loanType) return undefined;
    
    return simulationConfigs.find(config => config.loanType === loanType);
  }, [getCurrentLoanType]);

  const getCompletedLoans = useCallback((): LoanType[] => {
    return experimentState?.completedLoans || [];
  }, [experimentState]);

  const progressToNextPhase = useCallback((currentPhaseData?: any) => {
    setExperimentState(prevState => {
      if (!prevState) return null;

      const phaseOrder: ExperimentPhase[] = [
        'NOT_STARTED', 
        'INFORMED_CONSENT',
        'SIMULATION_1', 'QUIZ_1', 'RANKING_1',
        'SIMULATION_2', 'QUIZ_2', 'RANKING_2',
        'SIMULATION_3', 'QUIZ_3', 'RANKING_3',
        'SIMULATION_4', 'QUIZ_4', 'RANKING_4',
        'FINAL_QUIZ', 'DATA_CONSENT', 'DEBRIEF', 'COMPLETED'
      ];
      
      const currentPhaseIndex = phaseOrder.indexOf(prevState.currentPhase);
      const nextPhase = phaseOrder[currentPhaseIndex + 1] || 'COMPLETED';

      // Update completed loans after each quiz
      let updatedCompletedLoans = [...prevState.completedLoans];
      if (prevState.currentPhase.startsWith('QUIZ_') && !prevState.currentPhase.includes('FINAL')) {
        const loanType = getCurrentLoanType();
        if (loanType && !updatedCompletedLoans.includes(loanType)) {
          updatedCompletedLoans.push(loanType);
        }
      }

      return {
        ...prevState,
        currentPhase: nextPhase,
        phaseData: {
          ...prevState.phaseData,
          [prevState.currentPhase]: currentPhaseData,
        },
        completedLoans: updatedCompletedLoans,
      };
    });
  }, [getCurrentLoanType]);

  const value: SimulationContextType = {
    experimentState: experimentState || { ...getInitialExperimentState('uninitialized'), experimentId: null },
    startExperiment,
    getCurrentSimulationConfig,
    progressToNextPhase,
    getCurrentLoanType,
    getCompletedLoans,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};
