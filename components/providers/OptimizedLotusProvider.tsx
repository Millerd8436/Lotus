'use client';

import React, { createContext, useContext, useCallback, useReducer, useRef, useEffect, useMemo } from 'react';
import { ExperimentState, LoanType, BehaviorEvent, QuizResponse, DemographicData } from '@/types';

// Unified State Interface
interface LotusState {
  // Experiment Management
  experiment: ExperimentState;
  
  // Behavioral Tracking
  behaviorEvents: BehaviorEvent[];
  sessionMetrics: {
    sessionId: string;
    startTime: number;
    currentLoanType?: LoanType;
    totalInteractions: number;
    averageEngagement: number;
  };
  
  // Education & Progress
  education: {
    currentModule?: string;
    completedModules: string[];
    insights: Array<{
      type: 'warning' | 'info' | 'success';
      message: string;
      loanType: LoanType;
    }>;
  };
  
  // UI State
  ui: {
    isLoading: boolean;
    activeModal: string | null;
    notifications: Array<{
      id: string;
      type: 'success' | 'error' | 'warning' | 'info';
      message: string;
    }>;
  };
}

// Action Types for Reducer
type LotusAction = 
  | { type: 'INITIALIZE_SESSION'; payload: { experimentId: string; userId: string } }
  | { type: 'UPDATE_EXPERIMENT_PHASE'; payload: ExperimentState['currentPhase'] }
  | { type: 'SET_LOAN_ORDER'; payload: LoanType[] }
  | { type: 'COMPLETE_LOAN'; payload: LoanType }
  | { type: 'TRACK_BEHAVIOR'; payload: Omit<BehaviorEvent, 'id' | 'timestamp'> }
  | { type: 'ADD_QUIZ_RESPONSE'; payload: QuizResponse }
  | { type: 'UPDATE_DEMOGRAPHICS'; payload: DemographicData }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SHOW_NOTIFICATION'; payload: { type: string; message: string } }
  | { type: 'CLEAR_NOTIFICATION'; payload: string }
  | { type: 'ADD_EDUCATION_INSIGHT'; payload: { type: string; message: string; loanType: LoanType } };

// Initial State
const initialState: LotusState = {
  experiment: {
    experimentId: '',
    userId: '',
    currentPhase: 'NOT_STARTED',
    loanOrder: [],
    completedLoans: [],
    consentGiven: false,
  },
  behaviorEvents: [],
  sessionMetrics: {
    sessionId: '',
    startTime: Date.now(),
    totalInteractions: 0,
    averageEngagement: 0,
  },
  education: {
    completedModules: [],
    insights: [],
  },
  ui: {
    isLoading: false,
    activeModal: null,
    notifications: [],
  },
};

// Optimized Reducer with Performance Considerations
function lotusReducer(state: LotusState, action: LotusAction): LotusState {
  switch (action.type) {
    case 'INITIALIZE_SESSION':
      return {
        ...state,
        experiment: {
          ...state.experiment,
          experimentId: action.payload.experimentId,
          userId: action.payload.userId,
          currentPhase: 'INFORMED_CONSENT',
        },
        sessionMetrics: {
          ...state.sessionMetrics,
          sessionId: action.payload.experimentId,
          startTime: Date.now(),
        },
      };
      
    case 'UPDATE_EXPERIMENT_PHASE':
      return {
        ...state,
        experiment: {
          ...state.experiment,
          currentPhase: action.payload,
        },
      };
      
    case 'SET_LOAN_ORDER':
      return {
        ...state,
        experiment: {
          ...state.experiment,
          loanOrder: action.payload,
        },
      };
      
    case 'COMPLETE_LOAN':
      return {
        ...state,
        experiment: {
          ...state.experiment,
          completedLoans: [...state.experiment.completedLoans, action.payload],
        },
      };
      
    case 'TRACK_BEHAVIOR':
      const newEvent: BehaviorEvent = {
        ...action.payload,
        id: `${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
      };
      
      // Optimize: Keep only last 1000 events in memory
      const behaviorEvents = [...state.behaviorEvents, newEvent].slice(-1000);
      
      return {
        ...state,
        behaviorEvents,
        sessionMetrics: {
          ...state.sessionMetrics,
          totalInteractions: state.sessionMetrics.totalInteractions + 1,
        },
      };
      
    case 'ADD_QUIZ_RESPONSE':
      return {
        ...state,
        experiment: {
          ...state.experiment,
          quizResponses: [...(state.experiment.quizResponses || []), action.payload],
        },
      };
      
    case 'UPDATE_DEMOGRAPHICS':
      return {
        ...state,
        experiment: {
          ...state.experiment,
          demographics: action.payload,
        },
      };
      
    case 'SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload,
        },
      };
      
    case 'SHOW_NOTIFICATION':
      const notification = {
        id: `notif-${Date.now()}`,
        type: action.payload.type,
        message: action.payload.message,
      };
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, notification],
        },
      };
      
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(n => n.id !== action.payload),
        },
      };
      
    case 'ADD_EDUCATION_INSIGHT':
      return {
        ...state,
        education: {
          ...state.education,
          insights: [...state.education.insights, action.payload],
        },
      };
      
    default:
      return state;
  }
}

// Context Interfaces
interface LotusContextType {
  state: LotusState;
  
  // Experiment Management
  initializeSession: (experimentId: string, userId: string) => void;
  updatePhase: (phase: ExperimentState['currentPhase']) => void;
  setLoanOrder: (order: LoanType[]) => void;
  completeLoan: (loanType: LoanType) => void;
  
  // Behavioral Tracking (Optimized)
  trackClick: (elementId: string, elementType: string, pageSection?: string) => void;
  trackHover: (elementId: string, duration: number, elementType?: string) => void;
  trackScroll: (scrollDepth: number, pageSection: string) => void;
  trackFormEdit: (elementId: string, value: string, elementType: string) => void;
  trackTimeSpent: (elementId: string, timeMs: number, elementType?: string) => void;
  
  // Quiz & Demographics
  addQuizResponse: (response: QuizResponse) => void;
  updateDemographics: (demographics: DemographicData) => void;
  
  // UI Management
  setLoading: (loading: boolean) => void;
  showNotification: (type: string, message: string) => void;
  clearNotification: (id: string) => void;
  
  // Education
  addEducationInsight: (type: string, message: string, loanType: LoanType) => void;
  
  // Data Export (Optimized)
  exportSessionData: () => Promise<void>;
  getStatisticalSummary: () => object;
}

// Create Context
const LotusContext = createContext<LotusContextType | undefined>(undefined);

// Optimized Provider Component
export const OptimizedLotusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(lotusReducer, initialState);
  const persistenceRef = useRef<{
    lastSave: number;
    pendingEvents: BehaviorEvent[];
  }>({
    lastSave: Date.now(),
    pendingEvents: [],
  });

  // Optimized Tracking Functions with Batching
  const trackEvent = useCallback((eventData: Omit<BehaviorEvent, 'id' | 'timestamp'>) => {
    dispatch({ type: 'TRACK_BEHAVIOR', payload: eventData });
    
    // Batch events for performance
    persistenceRef.current.pendingEvents.push({
      ...eventData,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    });
    
    // Auto-save every 10 seconds or 50 events
    const now = Date.now();
    if (
      now - persistenceRef.current.lastSave > 10000 ||
      persistenceRef.current.pendingEvents.length > 50
    ) {
      saveBehaviorData();
    }
  }, []);

  const saveBehaviorData = useCallback(async () => {
    const events = persistenceRef.current.pendingEvents;
    if (events.length === 0) return;

    try {
      await fetch('/api/behavior-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experimentId: state.experiment.experimentId,
          events,
        }),
      });
      
      persistenceRef.current.pendingEvents = [];
      persistenceRef.current.lastSave = Date.now();
    } catch (error) {
      console.error('Failed to save behavior data:', error);
    }
  }, [state.experiment.experimentId]);

  // Memoized Action Creators
  const actions = useMemo(() => ({
    initializeSession: (experimentId: string, userId: string) => {
      dispatch({ type: 'INITIALIZE_SESSION', payload: { experimentId, userId } });
    },
    
    updatePhase: (phase: ExperimentState['currentPhase']) => {
      dispatch({ type: 'UPDATE_EXPERIMENT_PHASE', payload: phase });
    },
    
    setLoanOrder: (order: LoanType[]) => {
      dispatch({ type: 'SET_LOAN_ORDER', payload: order });
    },
    
    completeLoan: (loanType: LoanType) => {
      dispatch({ type: 'COMPLETE_LOAN', payload: loanType });
    },
    
    trackClick: (elementId: string, elementType: string, pageSection?: string) => {
      trackEvent({
        type: 'click',
        elementId,
        elementType,
        pageSection,
        experimentId: state.experiment.experimentId,
        loanType: state.sessionMetrics.currentLoanType,
      });
    },
    
    trackHover: (elementId: string, duration: number, elementType?: string) => {
      trackEvent({
        type: 'hover',
        elementId,
        elementType,
        duration,
        experimentId: state.experiment.experimentId,
        loanType: state.sessionMetrics.currentLoanType,
      });
    },
    
    trackScroll: (scrollDepth: number, pageSection: string) => {
      trackEvent({
        type: 'scroll',
        scrollDepth,
        pageSection,
        experimentId: state.experiment.experimentId,
        loanType: state.sessionMetrics.currentLoanType,
      });
    },
    
    trackFormEdit: (elementId: string, value: string, elementType: string) => {
      trackEvent({
        type: 'form_edit',
        elementId,
        elementType,
        value,
        experimentId: state.experiment.experimentId,
        loanType: state.sessionMetrics.currentLoanType,
      });
    },
    
    trackTimeSpent: (elementId: string, timeMs: number, elementType?: string) => {
      trackEvent({
        type: 'time_spent',
        elementId,
        elementType,
        duration: timeMs,
        experimentId: state.experiment.experimentId,
        loanType: state.sessionMetrics.currentLoanType,
      });
    },
    
    addQuizResponse: (response: QuizResponse) => {
      dispatch({ type: 'ADD_QUIZ_RESPONSE', payload: response });
    },
    
    updateDemographics: (demographics: DemographicData) => {
      dispatch({ type: 'UPDATE_DEMOGRAPHICS', payload: demographics });
    },
    
    setLoading: (loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    },
    
    showNotification: (type: string, message: string) => {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: { type, message } });
    },
    
    clearNotification: (id: string) => {
      dispatch({ type: 'CLEAR_NOTIFICATION', payload: id });
    },
    
    addEducationInsight: (type: string, message: string, loanType: LoanType) => {
      dispatch({ type: 'ADD_EDUCATION_INSIGHT', payload: { type, message, loanType } });
    },
    
    exportSessionData: async () => {
      await saveBehaviorData();
      // Additional export logic here
    },
    
    getStatisticalSummary: () => {
      return {
        totalInteractions: state.sessionMetrics.totalInteractions,
        sessionDuration: Date.now() - state.sessionMetrics.startTime,
        completedLoans: state.experiment.completedLoans.length,
        currentPhase: state.experiment.currentPhase,
      };
    },
  }), [state, trackEvent, saveBehaviorData]);

  // Auto-save on unmount
  useEffect(() => {
    return () => {
      saveBehaviorData();
    };
  }, [saveBehaviorData]);

  const contextValue = useMemo(() => ({
    state,
    ...actions,
  }), [state, actions]);

  return (
    <LotusContext.Provider value={contextValue}>
      {children}
    </LotusContext.Provider>
  );
};

// Optimized Hook
export const useLotus = () => {
  const context = useContext(LotusContext);
  if (context === undefined) {
    throw new Error('useLotus must be used within OptimizedLotusProvider');
  }
  return context;
};

// Selective Hooks for Performance (Only re-render when specific data changes)
export const useLotusExperiment = () => {
  const { state } = useLotus();
  return state.experiment;
};

export const useLotusUI = () => {
  const { state } = useLotus();
  return state.ui;
};

export const useLotusEducation = () => {
  const { state } = useLotus();
  return state.education;
};

export const useLotusTracking = () => {
  const { trackClick, trackHover, trackScroll, trackFormEdit, trackTimeSpent } = useLotus();
  return { trackClick, trackHover, trackScroll, trackFormEdit, trackTimeSpent };
}; 