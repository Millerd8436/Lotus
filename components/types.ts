// Type definitions for all components

export interface LotusComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface PredatoryComponentProps extends LotusComponentProps {
  onExploitationDetected?: (type: string, severity: number) => void;
  behavioralProfile?: any;
}

export interface EthicalComponentProps extends LotusComponentProps {
  onEducationalMoment?: (topic: string) => void;
  transparencyLevel?: "high" | "medium" | "low";
}

export interface ReflectionComponentProps extends LotusComponentProps {
  session: any;
  onInsightGained?: (insight: string) => void;
}

// Re-export types from other files
export type { TheaterEvent } from "@/lib/core/AutonomyTheaterEngine";
export type { UserProfile, LotusSession } from "@/types";