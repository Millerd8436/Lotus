import React from 'react';

/**
 * Shared Components Barrel Export
 * Optimized for tree-shaking and performance
 */

// Core UI Components
export { Button } from './Button';
export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './Card';
export { Input } from './Input';
export { Label } from './Label';
export { Textarea } from './Textarea';
export { Checkbox } from './Checkbox';
export { Modal, Tooltip, showNotification } from './InteractiveElements';
export { Badge } from './Badge';

// Layout & Navigation
export { ProgressIndicator } from './ProgressIndicator';
export { Stepper } from './Stepper';
export { CollapsibleSection } from './CollapsibleSection';
export { LoadingSpinner } from './LoadingSpinner';
export { default as CardSkeleton } from './CardSkeleton';

// Interactive Components
export { UrgencyTimer } from './UrgencyTimer';
export { TippingStep } from './TippingStep';
export { CancelFlowModal } from './CancelFlowModal';

// Research & Compliance
export { InformedConsent } from './InformedConsent';
export { default as InformedConsentFramework } from './InformedConsentFramework';
export { DataConsent } from './DataConsent';
export { ScenarioPromptComponent } from './ScenarioPrompts';
export { IntroductionPrompt } from './IntroductionPrompt';

// Advanced Components
export { ProgressiveRanking } from './ProgressiveRanking';
export { RealTimeAnalytics } from './RealTimeAnalytics';
export { default as RealTimeAnnotation } from './RealTimeAnnotation';

// System Components  
export { 
  ErrorBoundary as ErrorBoundaries,
  DefaultErrorFallback,
  useErrorBoundary,
  useErrorRecovery 
} from './ErrorBoundaries';

export { 
  OptimizedLoanCalculator as OptimizedComponents,
  usePerformanceMonitor 
} from './OptimizedComponents';

// Specialized Research Components
export { DopamineBankingSystem } from './DopamineBankingSystem';
export { SpatialComputingInterface } from './SpatialComputingInterface';
export { NeuroeconomicBehaviorEngine } from './NeuroeconomicBehaviorEngine';
export { PersonaBasedSimulation } from './PersonaBasedSimulation';
export { MarketDataSimulator } from './MarketDataSimulator';
export { AuthenticFinancialMessaging } from './AuthenticFinancialMessaging';
export { default as StateSpecificMessaging } from './StateSpecificMessaging';
export { RegulatoryAnalysis } from './RegulatoryAnalysis';

// Lazy-loaded components for performance
export const ModeSelector = React.lazy(() => import('./ModeSelector'));

// Notification Container (always needed)
export { default as NotificationContainer } from './NotificationContainer'; 