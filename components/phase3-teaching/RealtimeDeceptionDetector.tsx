"use client";

import {
  AlertTriangle,
  Clock,
  DollarSign,
  Eye,
  Info,
  Lock,
  Shield,
  X,
  Zap,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface DeceptionPattern {
  id: string;
  name: string;
  type: "dark_pattern" | "manipulation" | "legal_violation" | "hidden_cost";
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  userAction: string;
  impact: string;
  protection: string;
  detectedAt: Date;
}

interface DeceptionStats {
  totalDeceptions: number;
  criticalCount: number;
  hiddenCosts: number;
  manipulationAttempts: number;
  userVulnerabilityScore: number;
}

export const RealtimeDeceptionDetector: React.FC = () => {
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "dark_pattern":
        return <Eye className="w-4 h-4" />;
      case "manipulation":
        return <Zap className="w-4 h-4" />;
      case "legal_violation":
        return <Lock className="w-4 h-4" />;
      case "hidden_cost":
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <>
      {/* Main Detector Panel */}
      <div
        className={`fixed ${
          isMinimized ? "bottom-4 right-4" : "top-4 right-4"
        } z-50 transition-all duration-300`}
      >
        <div
          className={`bg-white rounded-lg shadow-2xl border-2 border-red-500 ${
            isMinimized ? "w-64" : "w-96 max-h-[600px]"
          } overflow-hidden`}
        >
          {/* Header */}
          <div
            className="bg-red-500 text-white p-4 cursor-pointer"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <h3 className="font-bold">Deception Detector Active</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white text-red-500 px-2 py-1 rounded text-sm font-bold">
                  {stats.totalDeceptions}
                </span>
                <button className="text-white hover:text-gray-200">
                  {isMinimized ? "▲" : "▼"}
                </button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Stats Bar */}
              <div className="bg-gray-100 p-3 border-b grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {stats.criticalCount}
                  </div>
                  <div className="text-xs text-gray-600">Critical</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {stats.hiddenCosts}
                  </div>
                  <div className="text-xs text-gray-600">Hidden Costs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.manipulationAttempts}
                  </div>
                  <div className="text-xs text-gray-600">Manipulations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.userVulnerabilityScore}%
                  </div>
                  <div className="text-xs text-gray-600">Risk Score</div>
                </div>
              </div>

              {/* Detected Patterns List */}
              <div className="max-h-[400px] overflow-y-auto">
                {detectedPatterns.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>Monitoring for deceptive patterns...</p>
                  </div>
                ) : (
                  detectedPatterns.map((pattern) => (
                    <div
                      key={pattern.id}
                      className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                        selectedPattern?.id === pattern.id ? "bg-yellow-50" : ""
                      }`}
                      onClick={() => setSelectedPattern(pattern)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`${getSeverityColor(
                            pattern.severity
                          )} text-white p-2 rounded`}
                        >
                          {getTypeIcon(pattern.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {pattern.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {pattern.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                pattern.severity === "critical"
                                  ? "bg-red-100 text-red-700"
                                  : pattern.severity === "high"
                                  ? "bg-orange-100 text-orange-700"
                                  : pattern.severity === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {pattern.severity.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(
                                pattern.detectedAt
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Pattern Detail Modal */}
      {selectedPattern && !isMinimized && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedPattern(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`${getSeverityColor(
                  selectedPattern.severity
                )} text-white p-3 rounded`}
              >
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedPattern.name}</h3>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    selectedPattern.severity === "critical"
                      ? "bg-red-100 text-red-700"
                      : selectedPattern.severity === "high"
                      ? "bg-orange-100 text-orange-700"
                      : selectedPattern.severity === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {selectedPattern.severity.toUpperCase()} SEVERITY
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">
                  What's Happening:
                </h4>
                <p className="text-gray-600">{selectedPattern.userAction}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-1">
                  Why This Matters:
                </h4>
                <p className="text-gray-600">{selectedPattern.impact}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  How to Protect Yourself:
                </h4>
                <p className="text-green-700">{selectedPattern.protection}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedPattern(null)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </>
  );
};
