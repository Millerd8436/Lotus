/**
 * OptimizedComponents - Performance-optimized React components
 *
 * Uses React.memo, useMemo, and useCallback for optimal performance
 * Prevents unnecessary re-renders and expensive recalculations
 */

import { DarkPatternsRegistry } from "@/lib/core/DarkPatternsRegistry";
import {
  EnhancedLoanCalculator,
  LoanTerms,
} from "@/lib/core/EnhancedLoanCalculator";
import { LotusSession } from "@/types";
import React, { memo, useCallback, useMemo, useState } from "react";

// ================== Memoized Loan Calculator Display ==================
interface LoanCalculatorDisplayProps {
  principal: number;
  termDays: number;
  state: string;
  onCalculate?: (terms: LoanTerms) => void;
}

export const OptimizedLoanCalculator = memo<LoanCalculatorDisplayProps>(
  ({ principal, termDays, state, onCalculate }) => {
    const calculator = useMemo(() => new EnhancedLoanCalculator(), []);

    const loanTerms = useMemo(() => {
      return calculator.calculateLoanTerms(principal, termDays, state);
    }, [calculator, principal, termDays, state]);

    const affordability = useMemo(() => {
      return calculator.calculateAffordability(loanTerms);
    }, [calculator, loanTerms]);

    const handleCalculate = useCallback(() => {
      onCalculate?.(loanTerms);
    }, [loanTerms, onCalculate]);

    return (
      <div className="loan-calculator-display">
        <h3>Loan Details</h3>
        <div className="loan-metrics">
          <div className="metric">
            <span className="label">Principal:</span>
            <span className="value">${principal}</span>
          </div>
          <div className="metric">
            <span className="label">Fee:</span>
            <span className="value">${loanTerms.fee.toFixed(2)}</span>
          </div>
          <div className="metric">
            <span className="label">Total Due:</span>
            <span className="value">${loanTerms.totalPayment.toFixed(2)}</span>
          </div>
          <div className="metric highlight">
            <span className="label">APR:</span>
            <span className="value">{loanTerms.apr}%</span>
          </div>
        </div>

        <div className="affordability-info">
          <h4>To Afford This Loan:</h4>
          <p>Monthly income needed: ${affordability.minimumMonthlyIncome}</p>
          <p>Hours at minimum wage: {affordability.hoursAtMinWage}</p>
        </div>

        {onCalculate && (
          <button onClick={handleCalculate} className="calculate-btn">
            Calculate
          </button>
        )}
      </div>
    );
  },
  // Custom comparison function for memo
  (prevProps, nextProps) => {
    return (
      prevProps.principal === nextProps.principal &&
      prevProps.termDays === nextProps.termDays &&
      prevProps.state === nextProps.state
    );
  }
);

OptimizedLoanCalculator.displayName = "OptimizedLoanCalculator";

// ================== Memoized Rollover Visualization ==================
interface RolloverVisualizationProps {
  initialPrincipal: number;
  numberOfRollovers: number;
  state: string;
  monthlyIncome?: number;
}

export const OptimizedRolloverVisualization = memo<RolloverVisualizationProps>(
  ({ initialPrincipal, numberOfRollovers, state, monthlyIncome = 2500 }) => {
    const calculator = useMemo(() => new EnhancedLoanCalculator(), []);

    const { scenarios, metrics } = useMemo(() => {
      const initialLoan = calculator.calculateLoanTerms(
        initialPrincipal,
        14,
        state
      );
      return calculator.calculateRolloverScenario(
        initialLoan,
        numberOfRollovers,
        monthlyIncome
      );
    }, [calculator, initialPrincipal, numberOfRollovers, state, monthlyIncome]);

    const severityColor = useMemo(() => {
      const colors = {
        low: "#10b981",
        medium: "#f59e0b",
        high: "#ef4444",
        extreme: "#7c2d12",
      };
      return colors[metrics.trapSeverity];
    }, [metrics.trapSeverity]);

    return (
      <div className="rollover-visualization">
        <h3>Debt Trap Analysis</h3>

        <div
          className="trap-severity"
          style={{ backgroundColor: severityColor }}
        >
          <span>Trap Severity: {metrics.trapSeverity.toUpperCase()}</span>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <h4>Total Fees Paid</h4>
            <p className="value">${metrics.totalFeesPaid.toFixed(2)}</p>
          </div>
          <div className="metric-card">
            <h4>Effective APR</h4>
            <p className="value">{metrics.effectiveAPR}%</p>
          </div>
          <div className="metric-card">
            <h4>Days in Debt</h4>
            <p className="value">{metrics.daysInDebt}</p>
          </div>
          <div className="metric-card">
            <h4>Debt/Income Ratio</h4>
            <p className="value">
              {(metrics.debtToIncomeRatio * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="scenarios-timeline">
          {scenarios.map((scenario, index) => (
            <div key={index} className="timeline-item">
              <div className="cycle-number">Cycle {scenario.cycleNumber}</div>
              <div className="cycle-details">
                <span>Fees: ${scenario.fees}</span>
                <span>Total: ${scenario.totalOwed}</span>
                <span>APR: {scenario.apr}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

OptimizedRolloverVisualization.displayName = "OptimizedRolloverVisualization";

// ================== Memoized Dark Pattern Detector ==================
interface DarkPatternDetectorProps {
  content: string;
  elementType?: string;
  onPatternsDetected?: (patterns: string[]) => void;
}

export const OptimizedDarkPatternDetector = memo<DarkPatternDetectorProps>(
  ({ content, elementType = "text", onPatternsDetected }) => {
    const registry = useMemo(() => new DarkPatternsRegistry(), []);

    const detectedPatterns = useMemo(() => {
      return registry.analyzeElement({ text: content, type: elementType });
    }, [registry, content, elementType]);

    const manipulationScore = useMemo(() => {
      const patternIds = detectedPatterns.map((p) => p.id);
      return registry.calculateManipulationScore(patternIds);
    }, [registry, detectedPatterns]);

    const scoreColor = useMemo(() => {
      if (manipulationScore >= 80) return "#dc2626";
      if (manipulationScore >= 60) return "#f59e0b";
      if (manipulationScore >= 40) return "#eab308";
      return "#10b981";
    }, [manipulationScore]);

    React.useEffect(() => {
      if (detectedPatterns.length > 0) {
        onPatternsDetected?.(detectedPatterns.map((p) => p.name));
      }
    }, [detectedPatterns, onPatternsDetected]);

    if (detectedPatterns.length === 0) {
      return null;
    }

    return (
      <div className="dark-pattern-detector">
        <div className="manipulation-score" style={{ color: scoreColor }}>
          Manipulation Score: {manipulationScore}/100
        </div>

        <div className="detected-patterns">
          <h4>Detected Dark Patterns:</h4>
          {detectedPatterns.map((pattern) => (
            <div key={pattern.id} className="pattern-item">
              <span className="pattern-name">{pattern.name}</span>
              <span className="pattern-category">({pattern.category})</span>
              <div className="pattern-impact">
                Impact: {pattern.psychologicalImpact}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

OptimizedDarkPatternDetector.displayName = "OptimizedDarkPatternDetector";

// ================== Memoized Session Summary ==================
interface SessionSummaryProps {
  session: LotusSession;
  showDetails?: boolean;
}

export const OptimizedSessionSummary = memo<SessionSummaryProps>(
  ({ session, showDetails = false }) => {
    const violationsSummary = useMemo(() => {
      const violations = session.autonomyViolations || [];
      const severityToNumber = (severity: string): number => {
        switch (severity) {
          case "critical":
            return 4;
          case "high":
            return 3;
          case "medium":
            return 2;
          case "low":
            return 1;
          default:
            return 0;
        }
      };

      return {
        total: violations.length,
        byType: violations.reduce((acc, v) => {
          acc[v.type] = (acc[v.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        averageSeverity:
          violations.length > 0
            ? violations.reduce(
                (sum, v) => sum + severityToNumber(v.severity),
                0
              ) / violations.length
            : 0,
      };
    }, [session.autonomyViolations]);

    const darkPatternsSummary = useMemo(() => {
      const patterns = session.darkPatterns || [];
      return {
        total: patterns.length,
        uniqueTypes: new Set(patterns.map((p) => p.type)).size,
        mostFrequent: patterns.reduce((acc, p) => {
          acc[p.type] = (acc[p.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
      };
    }, [session.darkPatterns]);

    const loanSummary = useMemo(() => {
      return {
        totalCost: session.amount + session.fee,
        effectiveAPR: session.apr,
        daysUntilDue: Math.ceil(
          (new Date(session.createdAt).getTime() +
            session.termDays * 24 * 60 * 60 * 1000 -
            Date.now()) /
            (24 * 60 * 60 * 1000)
        ),
      };
    }, [
      session.amount,
      session.fee,
      session.apr,
      session.termDays,
      session.createdAt,
    ]);

    return (
      <div className="session-summary">
        <h3>Session Summary</h3>

        <div className="summary-grid">
          <div className="summary-section">
            <h4>Loan Details</h4>
            <p>Amount: ${session.amount}</p>
            <p>Total Cost: ${loanSummary.totalCost}</p>
            <p>APR: {loanSummary.effectiveAPR}%</p>
            <p>State: {session.state}</p>
          </div>

          <div className="summary-section">
            <h4>Violations ({violationsSummary.total})</h4>
            <p>
              Average Severity: {violationsSummary.averageSeverity.toFixed(1)}/5
            </p>
            {showDetails &&
              Object.entries(violationsSummary.byType).map(([type, count]) => (
                <p key={type}>
                  {type}: {count}
                </p>
              ))}
          </div>

          <div className="summary-section">
            <h4>Dark Patterns ({darkPatternsSummary.total})</h4>
            <p>Unique Patterns: {darkPatternsSummary.uniqueTypes}</p>
            {showDetails &&
              Object.entries(darkPatternsSummary.mostFrequent)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([pattern, count]) => (
                  <p key={pattern}>
                    {pattern}: {count}
                  </p>
                ))}
          </div>

          <div className="summary-section">
            <h4>Risk Assessment</h4>
            <p>Vulnerability Score: {session.vulnerabilityScore}/100</p>
            <p>Mode: {session.mode}</p>
            <p>Phase: {session.phase}</p>
          </div>
        </div>
      </div>
    );
  }
);

OptimizedSessionSummary.displayName = "OptimizedSessionSummary";

// ================== Performance Hook ==================
export function usePerformanceMonitor(componentName: string) {
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState(0);

  React.useEffect(() => {
    const startTime = performance.now();
    setRenderCount((prev) => prev + 1);

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      setLastRenderTime(renderTime);

      if (process.env.NODE_ENV === "development" && renderTime > 16) {
        console.warn(
          `[Performance] ${componentName} took ${renderTime.toFixed(
            2
          )}ms to render`
        );
      }
    };
  });

  return { renderCount, lastRenderTime };
}
