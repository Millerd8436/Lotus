'use client';

import React, { createContext, useContext, useCallback, useRef, useEffect } from 'react';
import { BehaviorEvent, LoanType } from '@/types';

interface BehaviorTrackingContextType {
  trackEvent: (event: Omit<BehaviorEvent, 'id' | 'timestamp'>) => void;
  trackClick: (elementId: string, elementType: string, pageSection?: string) => void;
  trackHover: (elementId: string, duration: number, elementType?: string) => void;
  trackScroll: (scrollDepth: number, pageSection: string) => void;
  trackFormEdit: (elementId: string, value: string, elementType: string) => void;
  trackTimeSpent: (elementId: string, timeMs: number, elementType?: string) => void;
  startSession: (experimentId: string, loanType: LoanType) => void;
  endSession: () => void;
  getSessionEvents: () => BehaviorEvent[];
  clearEvents: () => void;
}

const BehaviorTrackingContext = createContext<BehaviorTrackingContextType | null>(null);

export const useBehaviorTracking = () => {
  const context = useContext(BehaviorTrackingContext);
  if (!context) {
    throw new Error('useBehaviorTracking must be used within a BehaviorTrackingProvider');
  }
  return context;
};

interface BehaviorTrackingProviderProps {
  children: React.ReactNode;
}

export const BehaviorTrackingProvider: React.FC<BehaviorTrackingProviderProps> = ({ children }) => {
  const events = useRef<BehaviorEvent[]>([]);
  const currentSession = useRef<{
    experimentId: string;
    loanType: LoanType;
    startTime: Date;
  } | null>(null);
  const elementTimers = useRef<Map<string, Date>>(new Map());
  const scrollDepth = useRef<number>(0);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const trackEvent = useCallback((event: Omit<BehaviorEvent, 'id' | 'timestamp'>) => {
    if (!currentSession.current) return;

    const fullEvent: BehaviorEvent = {
      ...event,
      id: generateId(),
      timestamp: new Date(),
      experimentId: currentSession.current.experimentId,
      loanType: currentSession.current.loanType,
    };

    events.current.push(fullEvent);

    // Send to backend (implement as needed)
    // await saveEvent(fullEvent);
  }, []);

  const trackClick = useCallback((elementId: string, elementType: string, pageSection?: string) => {
    trackEvent({
      eventType: 'click',
      elementId,
      elementType,
      pageSection,
    });
  }, [trackEvent]);

  const trackHover = useCallback((elementId: string, duration: number, elementType?: string) => {
    trackEvent({
      eventType: 'hover',
      elementId,
      elementType,
      timeOnElement: duration,
    });
  }, [trackEvent]);

  const trackScroll = useCallback((depth: number, pageSection: string) => {
    // Only track significant scroll changes
    if (Math.abs(depth - scrollDepth.current) > 5) {
      scrollDepth.current = depth;
      trackEvent({
        eventType: 'scroll',
        scrollDepth: depth,
        pageSection,
      });
    }
  }, [trackEvent]);

  const trackFormEdit = useCallback((elementId: string, value: string, elementType: string) => {
    trackEvent({
      eventType: 'formEdit',
      elementId,
      elementType,
      value,
    });
  }, [trackEvent]);

  const trackTimeSpent = useCallback((elementId: string, timeMs: number, elementType?: string) => {
    trackEvent({
      eventType: 'timeSpent',
      elementId,
      elementType,
      timeOnElement: timeMs,
    });
  }, [trackEvent]);

  const startSession = useCallback((experimentId: string, loanType: LoanType) => {
    currentSession.current = {
      experimentId,
      loanType,
      startTime: new Date(),
    };
    events.current = [];
    scrollDepth.current = 0;
  }, []);

  const endSession = useCallback(() => {
    currentSession.current = null;
    elementTimers.current.clear();
  }, []);

  const getSessionEvents = useCallback(() => {
    return [...events.current];
  }, []);

  const clearEvents = useCallback(() => {
    events.current = [];
  }, []);

  // Auto-track scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      trackScroll(scrollPercent, 'main');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackScroll]);

  // Auto-track element focus timing
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const element = e.target as HTMLElement;
      if (element.id) {
        elementTimers.current.set(element.id, new Date());
      }
    };

    const handleBlur = (e: FocusEvent) => {
      const element = e.target as HTMLElement;
      if (element.id && elementTimers.current.has(element.id)) {
        const startTime = elementTimers.current.get(element.id)!;
        const timeSpent = Date.now() - startTime.getTime();
        
        trackTimeSpent(element.id, timeSpent, element.tagName.toLowerCase());
        elementTimers.current.delete(element.id);
      }
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, [trackTimeSpent]);

  const contextValue: BehaviorTrackingContextType = {
    trackEvent,
    trackClick,
    trackHover,
    trackScroll,
    trackFormEdit,
    trackTimeSpent,
    startSession,
    endSession,
    getSessionEvents,
    clearEvents,
  };

  return (
    <BehaviorTrackingContext.Provider value={contextValue}>
      {children}
    </BehaviorTrackingContext.Provider>
  );
};

// Hook for automatic element tracking
export const useElementTracking = (elementId: string, elementType: string) => {
  const { trackClick, trackHover } = useBehaviorTracking();
  const hoverTimer = useRef<NodeJS.Timeout>();
  const hoverStart = useRef<Date>();

  const onClick = useCallback(() => {
    trackClick(elementId, elementType);
  }, [elementId, elementType, trackClick]);

  const onMouseEnter = useCallback(() => {
    hoverStart.current = new Date();
  }, []);

  const onMouseLeave = useCallback(() => {
    if (hoverStart.current) {
      const duration = Date.now() - hoverStart.current.getTime();
      if (duration > 500) { // Only track meaningful hovers
        trackHover(elementId, duration, elementType);
      }
    }
  }, [elementId, elementType, trackHover]);

  return {
    onClick,
    onMouseEnter,
    onMouseLeave,
  };
};

// Component wrapper for easy tracking
interface TrackableElementProps {
  id: string;
  elementType: string;
  pageSection?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TrackableElement: React.FC<TrackableElementProps> = ({
  id,
  elementType,
  pageSection,
  children,
  className,
  style,
}) => {
  const tracking = useElementTracking(id, elementType);

  return (
    <div
      id={id}
      className={className}
      style={style}
      {...tracking}
      data-track-type={elementType}
      data-track-section={pageSection}
    >
      {children}
    </div>
  );
}; 