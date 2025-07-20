"use client";

import { LoadingSpinner } from "@/components/ui";
import dynamic from "next/dynamic";
import React from "react";

// Lazy wrapper component
const LazyWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback = <LoadingSpinner size="large" /> }) => {
  return <React.Suspense fallback={fallback}>{children}</React.Suspense>;
};

// Phase Components
export const LazyPhase1ExploitativeWebsite = dynamic(
  () => import("./Phase1ExploitativeWebsite"),
  { loading: () => <LoadingSpinner size="large" /> }
);

export const LazyPhase2EthicalWebsite = dynamic(
  () => import("./Phase2EthicalWebsite"),
  { loading: () => <LoadingSpinner size="large" /> }
);

// Core Components
export const LazyAdvancedDarkPatternsDemo = dynamic(
  () => import("./AdvancedDarkPatternsDemo"),
  { loading: () => <LoadingSpinner size="large" /> }
);

export const LazyStateSpecificMessaging = dynamic(
  () => import("./StateSpecificMessaging"),
  { loading: () => <LoadingSpinner size="large" /> }
);

export const LazyReflectionDashboard = dynamic(
  () => import("./reflection/ReflectionDashboard"),
  { loading: () => <LoadingSpinner size="large" /> }
);

export const LazyDebtTrapMechanism = dynamic(
  () => import("./DebtTrapMechanism"),
  { loading: () => <LoadingSpinner size="large" /> }
);

export const LazyACHExploitationEngine = dynamic(
  () => import("./ACHExploitationEngine"),
  { loading: () => <LoadingSpinner size="large" /> }
);

export const LazyRealisticCheckoutFlow = dynamic(
  () => import("./RealisticCheckoutFlow"),
  { loading: () => <LoadingSpinner size="large" /> }
);

// Simulators - Import from consolidated file
export const LazyElectronicSignatureSimulator = dynamic(
  () =>
    import("./simulators").then((mod) => ({
      default: mod.ElectronicSignatureSimulator,
    })),
  { loading: () => <LoadingSpinner size="medium" /> }
);

export const LazyIncomeVerificationSimulator = dynamic(
  () =>
    import("./simulators").then((mod) => ({
      default: mod.IncomeVerificationSimulator,
    })),
  { loading: () => <LoadingSpinner size="medium" /> }
);

export const LazyRealtimeProcessingSimulator = dynamic(
  () =>
    import("./simulators").then((mod) => ({
      default: mod.RealtimeProcessingSimulator,
    })),
  { loading: () => <LoadingSpinner size="medium" /> }
);

// Export the wrapper for manual use
export { LazyWrapper };
