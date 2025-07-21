"use client";

import { CheckoutStepLog, getInitialLotusSession, LotusSession } from "@/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

// The context now provides the full session and a way to update it.
interface SimulationContextType {
  session: LotusSession;
  updateSession: (data: Partial<LotusSession>) => void;
  recordCheckoutStep: (step: CheckoutStepLog) => void;
  // Kept for potential future use, but not the primary mechanism now.
  transitionToPhase: (phase: 1 | 2 | 3 | 4) => void;
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

  const recordCheckoutStep = (step: CheckoutStepLog) => {
    setSession((prev) => {
      const updatedSteps = [...(prev.checkoutSteps || []), step];
      const darkPatterns = Array.from(
        new Set(updatedSteps.map((s) => s.darkPattern))
      ).map((type) => ({
        type,
        // You can add more details here if needed
      }));

      return {
        ...prev,
        checkoutSteps: updatedSteps,
        darkPatternsEncountered: darkPatterns,
      };
    });
  };

  // Kept for now, but direct navigation might be simpler.
  const transitionToPhase = (phase: 1 | 2 | 3 | 4) => {
    setSession((prev) => ({
      ...prev,
      currentPhase: phase,
      // You could add logic here to snapshot data from the previous phase if needed
    }));
  };

  const value: SimulationContextType = {
    session,
    updateSession,
    recordCheckoutStep,
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
