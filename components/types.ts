// Type definitions for all components

// ==================== Base Types ====================
export interface LotusComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// ==================== Phase-Specific Types ====================
export interface PredatoryComponentProps extends LotusComponentProps {
  onExploitationDetected?: (type: string, severity: number) => void;
  behavioralProfile?: any;
  manipulationLevel?: "low" | "medium" | "high" | "critical";
  darkPatternEnabled?: boolean;
}

export interface EthicalComponentProps extends LotusComponentProps {
  onEducationalMoment?: (topic: string) => void;
  transparencyLevel?: "high" | "medium" | "low";
  consentRequired?: boolean;
  educationalContent?: string;
}

export interface ReflectionComponentProps extends LotusComponentProps {
  session: any;
  onInsightGained?: (insight: string) => void;
  analyticsEnabled?: boolean;
  showComparison?: boolean;
}

// ==================== Component-Specific Types ====================
export interface PaymentCollectionProps extends LotusComponentProps {
  loanAmount?: number;
  onCollectionComplete?: (result: any) => void;
  simulationSpeed?: "slow" | "normal" | "fast";
}

export interface StateMessagingProps extends LotusComponentProps {
  selectedState?: string;
  onStateChange?: (state: string, regulations: any) => void;
  comparisonMode?: boolean;
}

export interface ProcessingSimulatorProps extends LotusComponentProps {
  applicationData?: any;
  onProcessingComplete?: (result: any) => void;
  showLiveUpdates?: boolean;
}

export interface DarkPatternDemoProps extends LotusComponentProps {
  patternType?: string;
  severity?: number;
  onPatternDetected?: (pattern: string, severity: number) => void;
  educationalMode?: boolean;
}

// ==================== UI Component Types ====================
export interface LoadingProps extends LotusComponentProps {
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "neutral" | "exploitative" | "ethical" | "analysis" | "professional";
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

export interface ErrorBoundaryProps extends LotusComponentProps {
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
  isolate?: boolean;
}

// ==================== Re-export Types ====================
export type { TheaterEvent } from "@/lib/core/AutonomyTheaterEngine";
export type { LotusSession, UserProfile } from "@/types";

// ==================== Utility Types ====================
export type Phase = "exploitative" | "ethical" | "analysis";
export type Severity = "low" | "medium" | "high" | "critical";
export type ThemeMode =
  | "neutral"
  | "exploitative"
  | "ethical"
  | "analysis"
  | "professional";

export interface ComponentMeta {
  displayName: string;
  category: "ui" | "dark-pattern" | "processing" | "error" | "optimized";
  phase?: Phase;
  experimental?: boolean;
}
