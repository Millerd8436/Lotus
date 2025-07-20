"use client";

// Phase 1: Exploitative/Dark Pattern Components
export { default as AdvancedDarkPatternsDemo } from "./AdvancedDarkPatternsDemo";
export { default as DebtTrapMechanism } from "./DebtTrapMechanism";
export { default as DeceptiveCheckoutFlow } from "./DeceptiveCheckoutFlow";
export { default as ElectronicSignatureSimulator } from "./ElectronicSignatureSimulator";
export { default as IncomeVerificationSimulator } from "./IncomeVerificationSimulator";
export { default as PaymentCollectionEngine } from "./PaymentCollectionEngine";
export { RealtimeProcessingSimulator } from "./RealtimeProcessingSimulator";
export { RegulatoryAnalysis } from "./RegulatoryAnalysis";
export { default as StateSpecificMessaging } from "./StateSpecificMessaging";

// Phase 2 & 3: Analysis and Education Components
export * from "./reflection";

// Phase 4: Ethical Components
export * from "./ethical";

// UI Components
export * from "./ui/Button";
export * from "./ui/Card";
export { default as CardSkeleton } from "./ui/CardSkeleton";
export * from "./ui/Input";
export * from "./ui/InteractiveElements";
export * from "./ui/LoadingSpinner";
export { default as ModeSelector } from "./ui/ModeSelector";

// Core Components
export * from "./ErrorBoundaries";
export * from "./OptimizedComponents";
export { default as WebsitePhase } from "./WebsitePhase";

// Providers
export * from "./providers";

// Types
export type {
  ComponentMeta,
  DarkPatternDemoProps,
  EthicalComponentProps,
  LoadingProps,
  LotusComponentProps,
  PaymentCollectionProps,
  Phase,
  PredatoryComponentProps,
  ProcessingSimulatorProps,
  ReflectionComponentProps,
  Severity,
  StateMessagingProps,
  ThemeMode
} from "./types";

