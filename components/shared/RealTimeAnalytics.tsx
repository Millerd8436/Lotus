"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useBehaviorTracking } from '@/components/providers/BehaviorTrackingProvider';

interface MousePosition {
  x: number;
  y: number;
  timestamp: number;
}

interface InteractionHeatmap {
  elementId: string;
  interactions: number;
  avgDwellTime: number;
  clickThroughRate: number;
}

interface RealTimeAnalyticsProps {
  children: React.ReactNode;
  pageContext: string;
  onAnalyticsUpdate?: (analytics: AnalyticsData) => void;
}

interface AnalyticsData {
  mouseMovements: MousePosition[];
  scrollDepth: number;
  timeOnPage: number;
  interactionHeatmap: InteractionHeatmap[];
  hesitationPoints: { x: number; y: number; duration: number }[];
  attentionPattern: 'focused' | 'scattered' | 'rushed' | 'careful';
  riskScore: number; // Based on behavioral patterns
}

export const RealTimeAnalytics: React.FC<RealTimeAnalyticsProps> = ({ 
  children, 
  pageContext, 
  onAnalyticsUpdate 
}) => {
  const { trackEvent } = useBehaviorTracking();
  const containerRef = useRef<HTMLDivElement>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    mouseMovements: [],
    scrollDepth: 0,
    timeOnPage: 0,
    interactionHeatmap: [],
    hesitationPoints: [],
    attentionPattern: 'focused',
    riskScore: 0.5
  });

  const mousePositionRef = useRef<MousePosition | null>(null);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const pageStartTimeRef = useRef<number>(Date.now());

  // Track mouse movements and detect hesitation patterns
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    const newPosition: MousePosition = {
      x: e.clientX,
      y: e.clientY,
      timestamp: now
    };

    // Detect hesitation (mouse staying in small area for extended time)
    if (mousePositionRef.current) {
      const distance = Math.sqrt(
        Math.pow(newPosition.x - mousePositionRef.current.x, 2) + 
        Math.pow(newPosition.y - mousePositionRef.current.y, 2)
      );
      
      if (distance < 20 && now - lastMoveTimeRef.current > 2000) {
        setAnalytics(prev => ({
          ...prev,
          hesitationPoints: [...prev.hesitationPoints, {
            x: newPosition.x,
            y: newPosition.y,
            duration: now - lastMoveTimeRef.current
          }]
        }));
      }
    }

    setAnalytics(prev => ({
      ...prev,
      mouseMovements: [...prev.mouseMovements.slice(-50), newPosition] // Keep last 50 movements
    }));

    mousePositionRef.current = newPosition;
    lastMoveTimeRef.current = now;
  }, []);

  // Track scroll depth
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    setAnalytics(prev => ({
      ...prev,
      scrollDepth: Math.max(prev.scrollDepth, scrollDepth)
    }));
  }, []);

  // Analyze attention patterns based on mouse movement
  const analyzeAttentionPattern = useCallback((movements: MousePosition[]) => {
    if (movements.length < 10) return 'focused';

    const velocities = movements.slice(1).map((pos, i) => {
      const prev = movements[i];
      const distance = Math.sqrt(
        Math.pow(pos.x - prev.x, 2) + Math.pow(pos.y - prev.y, 2)
      );
      const timeDiff = pos.timestamp - prev.timestamp;
      return timeDiff > 0 ? distance / timeDiff : 0;
    });

    const avgVelocity = velocities.reduce((sum, v) => sum + v, 0) / velocities.length;
    const velocityVariance = velocities.reduce((sum, v) => sum + Math.pow(v - avgVelocity, 2), 0) / velocities.length;

    if (avgVelocity > 0.5 && velocityVariance > 0.3) return 'scattered';
    if (avgVelocity > 0.8) return 'rushed';
    if (avgVelocity < 0.2 && velocityVariance < 0.1) return 'careful';
    return 'focused';
  }, []);

  // Calculate risk score based on behavioral patterns
  const calculateRiskScore = useCallback((analyticsData: AnalyticsData) => {
    let riskScore = 0.5; // Baseline

    // Fast decision-making increases risk
    if (analyticsData.timeOnPage < 30000) riskScore += 0.2;
    
    // Rushed patterns increase risk
    if (analyticsData.attentionPattern === 'rushed') riskScore += 0.3;
    
    // Low scroll depth suggests not reading terms
    if (analyticsData.scrollDepth < 50) riskScore += 0.2;
    
    // Few hesitation points suggest impulsive behavior
    if (analyticsData.hesitationPoints.length < 2) riskScore += 0.1;
    
    // Careful patterns reduce risk
    if (analyticsData.attentionPattern === 'careful') riskScore -= 0.2;

    return Math.max(0, Math.min(1, riskScore));
  }, []);

  // Update analytics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => {
        const timeOnPage = Date.now() - pageStartTimeRef.current;
        const attentionPattern = analyzeAttentionPattern(prev.mouseMovements);
        const updatedAnalytics = {
          ...prev,
          timeOnPage,
          attentionPattern
        };
        updatedAnalytics.riskScore = calculateRiskScore(updatedAnalytics);
        
        if (onAnalyticsUpdate) {
          onAnalyticsUpdate(updatedAnalytics);
        }

        // Track significant behavioral events
        trackEvent({
          type: 'behavioral_analytics',
          elementId: `analytics-${pageContext}`,
          details: {
            attentionPattern,
            riskScore: updatedAnalytics.riskScore,
            hesitationCount: prev.hesitationPoints.length,
            scrollDepth: prev.scrollDepth
          }
        });

        return updatedAnalytics;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [analyzeAttentionPattern, calculateRiskScore, onAnalyticsUpdate, pageContext, trackEvent]);

  // Set up event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {children}
      
      {/* Debug overlay for development (can be removed in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs z-50">
          <div>Attention: {analytics.attentionPattern}</div>
          <div>Risk Score: {analytics.riskScore.toFixed(2)}</div>
          <div>Scroll Depth: {analytics.scrollDepth.toFixed(1)}%</div>
          <div>Time: {(analytics.timeOnPage / 1000).toFixed(1)}s</div>
          <div>Hesitations: {analytics.hesitationPoints.length}</div>
        </div>
      )}
    </div>
  );
};

export default RealTimeAnalytics; 
