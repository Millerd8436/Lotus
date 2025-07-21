import { useCallback, useEffect, useState } from "react";
import { DeceptionPattern, DeceptionStats } from "../interfaces";

export const useDeceptionDetector = () => {
  const [detectedPatterns, setDetectedPatterns] = useState<DeceptionPattern[]>(
    []
  );
  const [stats, setStats] = useState<DeceptionStats>({
    totalDeceptions: 0,
    criticalCount: 0,
    hiddenCosts: 0,
    manipulationAttempts: 0,
    userVulnerabilityScore: 0,
  });
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedPattern, setSelectedPattern] =
    useState<DeceptionPattern | null>(null);

  // 2025 Dark Pattern Detection Logic
  const detectPattern = useCallback(
    (pattern: Omit<DeceptionPattern, "id" | "detectedAt">) => {
      const newPattern: DeceptionPattern = {
        ...pattern,
        id: `pattern-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        detectedAt: new Date(),
      };

      setDetectedPatterns((prev) => [newPattern, ...prev].slice(0, 10)); // Keep last 10

      setStats((prev) => ({
        totalDeceptions: prev.totalDeceptions + 1,
        criticalCount:
          prev.criticalCount + (pattern.severity === "critical" ? 1 : 0),
        hiddenCosts:
          prev.hiddenCosts + (pattern.type === "hidden_cost" ? 1 : 0),
        manipulationAttempts:
          prev.manipulationAttempts + (pattern.type === "manipulation" ? 1 : 0),
        userVulnerabilityScore: Math.min(
          100,
          prev.userVulnerabilityScore +
            (pattern.severity === "critical"
              ? 15
              : pattern.severity === "high"
              ? 10
              : 5)
        ),
      }));

      // Auto-show critical patterns
      if (pattern.severity === "critical") {
        setSelectedPattern(newPattern);
        setIsMinimized(false);
      }
    },
    []
  );

  // Monitor DOM for dark patterns
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Check for countdown timers
      const timers = document.querySelectorAll(
        "[data-countdown], .countdown, .timer"
      );
      timers.forEach((timer) => {
        if (!timer.getAttribute("data-detected")) {
          timer.setAttribute("data-detected", "true");
          detectPattern({
            name: "Artificial Urgency Timer",
            type: "dark_pattern",
            severity: "high",
            description: "Fake countdown timer creating false urgency",
            userAction: "Being rushed to make a decision",
            impact: "May lead to hasty, regretted decisions",
            protection: "This timer is fake. Take your time to decide.",
          });
        }
      });

      // Check for hidden fees
      const fees = document.querySelectorAll(".fee, .charge, [data-fee]");
      fees.forEach((fee) => {
        const text = fee.textContent || "";
        if (
          text.includes("tip") ||
          text.includes("processing") ||
          text.includes("service")
        ) {
          if (!fee.getAttribute("data-detected")) {
            fee.setAttribute("data-detected", "true");
            detectPattern({
              name: "Hidden Fee Detected",
              type: "hidden_cost",
              severity: "critical",
              description: `Hidden ${
                text.includes("tip") ? "tip as interest" : "fee"
              } found`,
              userAction: "Being charged extra fees",
              impact: "Increases total cost significantly",
              protection: "This is a disguised interest charge, not optional.",
            });
          }
        }
      });

      // Check for confession of judgment
      const legal = document.querySelectorAll(".legal, .terms, [data-legal]");
      legal.forEach((element) => {
        const text = element.textContent || "";
        if (
          text.toLowerCase().includes("confession") ||
          text.toLowerCase().includes("waive")
        ) {
          if (!element.getAttribute("data-detected")) {
            element.setAttribute("data-detected", "true");
            detectPattern({
              name: "Confession of Judgment",
              type: "legal_violation",
              severity: "critical",
              description: "Attempting to make you waive legal rights",
              userAction: "Being asked to give up court rights",
              impact: "Lender can seize assets without trial",
              protection: "DO NOT AGREE. This is illegal in many states.",
            });
          }
        }
      });

      // Check for daily debits
      const payment = document.querySelectorAll(
        "[data-payment], .payment-schedule"
      );
      payment.forEach((element) => {
        const text = element.textContent || "";
        if (
          text.toLowerCase().includes("daily") ||
          text.toLowerCase().includes("each day")
        ) {
          if (!element.getAttribute("data-detected")) {
            element.setAttribute("data-detected", "true");
            detectPattern({
              name: "Daily ACH Withdrawal",
              type: "manipulation",
              severity: "high",
              description: "Daily withdrawals instead of standard monthly",
              userAction: "Agreeing to daily bank debits",
              impact: "Constant drain on bank account, overdraft risk",
              protection: "Request monthly payments instead.",
            });
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [detectPattern]);

  return {
    detectedPatterns,
    stats,
    isMinimized,
    setIsMinimized,
    selectedPattern,
    setSelectedPattern,
  };
};
