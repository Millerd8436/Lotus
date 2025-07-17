"use client";

// Export all individual predatory components
export { default as AutonomyTheater } from "./AutonomyTheater";
export { default as DebtCycleManager } from "./DebtCycleManager";
export { default as PrivacyConsentForm } from "./PrivacyConsentForm";
export { default as RealtimeAnalysisMonitor } from "./RealtimeAnalysisMonitor";

// You can also export them as a namespace for convenience
import AutonomyTheater from "./AutonomyTheater";
import DebtCycleManager from "./DebtCycleManager";
import PrivacyConsentForm from "./PrivacyConsentForm";
import RealtimeAnalysisMonitor from "./RealtimeAnalysisMonitor";

export const PredatoryComponents = {
  AutonomyTheater,
  DebtCycleManager,
  PrivacyConsentForm,
  RealtimeAnalysisMonitor,
};