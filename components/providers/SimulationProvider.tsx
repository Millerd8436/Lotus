"use client";

import { getInitialLotusSession, LotusSession } from "@/types/shared";
import React, { createContext, ReactNode, useContext, useState } from "react";

// The context now provides the full session and a way to update it.
interface SimulationContextType {
  session: LotusSession;
  updateSession: (data: Partial<LotusSession>) => void;
  // Kept for potential future use, but not the primary mechanism now.
  transitionToPhase: (phase: 1 | 2 | 3) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);

interface SimulationProviderProps {
  children: ReactNode;
}

export const SimulationProvider: React.FC<SimulationProviderProps> = ({
  children,
}) => {
  // The entire LotusSession is now the state.
  const [session, setSession] = useState<LotusSession>(
    getInitialLotusSession()
  );

  // This function allows any child component to update the session.
  // It merges the new data with the existing session state.
  const updateSession = (data: Partial<LotusSession>) => {
    setSession((prev) => ({ ...prev, ...data }));
  };

  // Kept for now, but direct navigation might be simpler.
  const transitionToPhase = (phase: 1 | 2 | 3) => {
    setSession((prev) => ({
      ...prev,
      currentPhase: phase,
      // You could add logic here to snapshot data from the previous phase if needed
    }));
  };

  const value: SimulationContextType = {
    session,
    updateSession,
    transitionToPhase,
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
