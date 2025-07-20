"use client";

import { analyticsEngine } from "@/lib/core/AnalyticsEngine";
import {
  AlertTriangle,
  Brain,
  Database,
  DollarSign,
  Eye,
  Shield,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

interface ProcessingEvent {
  id: string;
  timestamp: Date;
  type: "api_call" | "behavior_track" | "risk_calc" | "data_sale" | "decision";
  api?: string;
  data?: any;
  revenue?: number;
  risk?: string;
}

export function RealtimeProcessingSimulator() {
  const [isActive, setIsActive] = useState(false);
  const [events, setEvents] = useState<ProcessingEvent[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [vulnerabilityScore, setVulnerabilityScore] = useState(5);
  const [phase, setPhase] = useState<
    "data_collection" | "risk_assessment" | "monetization" | "exploitation"
  >("data_collection");

  // Initialize user session
  useEffect(() => {
    const userId = `user_${Date.now()}`;
    const sessionId = `session_${Date.now()}`;
    const profile = analyticsEngine.initializeUser(userId, sessionId);
    setUserData({ userId, sessionId, profile });

    // Set up behavioral tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (isActive) {
        analyticsEngine.trackBehavior(userId, {
          type: "mousemove",
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleScroll = () => {
      if (isActive) {
        analyticsEngine.trackBehavior(userId, {
          type: "scroll",
          position: window.scrollY,
          velocity: 0, // Would calculate in real implementation
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  // Simulate API calls and data collection
  const simulateDataCollection = useCallback(async () => {
    if (!userData || !isActive) return;

    // Phase 1: Initial Credit Check
    const creditCheck = await analyticsEngine.executeAPICall(
      userData.userId,
      "experian_precise_id",
      "Initial credit verification",
      false // No real consent
    );

    addEvent({
      type: "api_call",
      api: "Experian Precise ID",
      data: creditCheck,
      revenue: 2.5 * 0.3,
      risk: "High - No explicit consent",
    });

    // Phase 2: Behavioral Tracking
    setTimeout(() => {
      addEvent({
        type: "behavior_track",
        api: "MouseFlow Analytics",
        data: {
          anxietyLevel: "High",
          hesitations: 5,
          formAbandonment: 2,
        },
        revenue: 0.1,
        risk: "Medium - Passive collection",
      });
    }, 1000);

    // Phase 3: Financial Deep Dive
    setTimeout(async () => {
      if (vulnerabilityScore > 6) {
        const bankData = await analyticsEngine.executeAPICall(
          userData.userId,
          "plaid_liabilities",
          "Bank verification",
          false
        );

        addEvent({
          type: "api_call",
          api: "Plaid Bank Connection",
          data: bankData,
          revenue: 3.0 * 0.3,
          risk: "Extreme - Full financial access",
        });
      }
    }, 2000);

    // Phase 4: Subprime History
    setTimeout(async () => {
      const subprimeData = await analyticsEngine.executeAPICall(
        userData.userId,
        "clarity_services",
        "Subprime credit check",
        false
      );

      addEvent({
        type: "api_call",
        api: "Clarity Services (Subprime)",
        data: subprimeData,
        revenue: 1.75 * 0.3,
        risk: "High - Targets vulnerable populations",
      });

      // Calculate new vulnerability score
      const apiData = new Map();
      apiData.set("clarity_services", subprimeData);
      const newScore = analyticsEngine.calculateVulnerabilityScore(
        userData.userId,
        apiData
      );
      setVulnerabilityScore(newScore);
    }, 3000);

    // Phase 5: Social & Dark Web Data
    setTimeout(async () => {
      if (vulnerabilityScore >= 8) {
        const darkData = await analyticsEngine.executeAPICall(
          userData.userId,
          "underground_broker_network",
          "Enhanced profiling",
          false
        );

        addEvent({
          type: "data_sale",
          api: "Dark Broker Network",
          data: darkData,
          revenue: 8.0 * 0.3,
          risk: "Extreme - Potentially illegal",
        });
      }
    }, 4000);

    // Phase 6: Exploitation Decision
    setTimeout(() => {
      const strategy = analyticsEngine.generateExploitationStrategy(
        userData.userId
      );

      addEvent({
        type: "decision",
        data: strategy,
        risk:
          vulnerabilityScore >= 8
            ? "Maximum Extraction Mode"
            : "Standard Predation",
      });

      setPhase("exploitation");
    }, 5000);
  }, [userData, isActive, vulnerabilityScore]);

  const addEvent = (event: Omit<ProcessingEvent, "id" | "timestamp">) => {
    const newEvent: ProcessingEvent = {
      ...event,
      id: `event_${Date.now()}_${Math.random()}`,
      timestamp: new Date(),
    };

    setEvents((prev) => [newEvent, ...prev].slice(0, 10));

    if (event.revenue) {
      setTotalRevenue((prev) => prev + event.revenue);
    }
  };

  const startSimulation = () => {
    setIsActive(true);
    setEvents([]);
    setTotalRevenue(0);
    setPhase("data_collection");
    simulateDataCollection();
  };

  const stopSimulation = () => {
    setIsActive(false);
  };

  // Get vulnerability indicators
  const getVulnerabilityIndicators = () => {
    const indicators = [];

    if (vulnerabilityScore >= 8) {
      indicators.push("🚨 EXTREME: Perfect exploitation target");
    } else if (vulnerabilityScore >= 6) {
      indicators.push("⚠️ HIGH: Financially desperate");
    } else if (vulnerabilityScore >= 4) {
      indicators.push("🔶 MODERATE: Some risk factors");
    } else {
      indicators.push("🟢 LOW: Less profitable target");
    }

    return indicators;
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            Real-Time API Exploitation Engine
          </h2>
          <div className="flex gap-4">
            <Button
              onClick={startSimulation}
              disabled={isActive}
              className="bg-red-600 hover:bg-red-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Data Harvesting
            </Button>
            <Button
              onClick={stopSimulation}
              disabled={!isActive}
              variant="outline"
            >
              Stop
            </Button>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Phase
            </div>
            <div className="text-lg font-semibold capitalize">
              {phase.replace("_", " ")}
            </div>
          </div>

          <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Vulnerability Score
            </div>
            <div className="text-2xl font-bold text-red-600">
              {vulnerabilityScore}/10
            </div>
          </div>

          <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Data Revenue
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${totalRevenue.toFixed(2)}
            </div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              APIs Called
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {events.filter((e) => e.type === "api_call").length}
            </div>
          </div>
        </div>

        {/* Vulnerability Assessment */}
        {vulnerabilityScore > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Target Profile Assessment
            </h3>
            <ul className="space-y-1 text-sm">
              {getVulnerabilityIndicators().map((indicator, i) => (
                <li key={i}>{indicator}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Event Stream */}
        <div className="bg-black rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
          <div className="text-green-400 mb-2">
            {isActive ? "● LIVE" : "○ STOPPED"} - API Exploitation Monitor
          </div>

          {events.map((event) => (
            <div key={event.id} className="mb-3 border-b border-gray-800 pb-2">
              <div className="text-gray-400 text-xs">
                [{event.timestamp.toLocaleTimeString()}]
              </div>

              {event.type === "api_call" && (
                <div className="text-blue-400">
                  <Database className="inline w-3 h-3 mr-1" />
                  API CALL: {event.api}
                  {event.revenue && (
                    <span className="text-green-400 ml-2">
                      +${event.revenue.toFixed(2)}
                    </span>
                  )}
                </div>
              )}

              {event.type === "behavior_track" && (
                <div className="text-purple-400">
                  <Eye className="inline w-3 h-3 mr-1" />
                  BEHAVIOR: {event.api}
                </div>
              )}

              {event.type === "data_sale" && (
                <div className="text-red-400">
                  <DollarSign className="inline w-3 h-3 mr-1" />
                  DATA SALE: {event.api}
                  <span className="text-green-400 ml-2">
                    +${event.revenue?.toFixed(2)}
                  </span>
                </div>
              )}

              {event.type === "decision" && (
                <div className="text-yellow-400">
                  <Brain className="inline w-3 h-3 mr-1" />
                  EXPLOITATION DECISION MADE
                </div>
              )}

              {event.risk && (
                <div className="text-orange-400 text-xs mt-1">
                  Risk: {event.risk}
                </div>
              )}

              {event.data && (
                <div className="text-gray-500 text-xs mt-1">
                  {JSON.stringify(event.data, null, 2).substring(0, 100)}...
                </div>
              )}
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-gray-600 text-center mt-8">
              Press "Start Data Harvesting" to begin simulation...
            </div>
          )}
        </div>
      </Card>

      {/* API Details Panel */}
      {phase === "exploitation" && userData && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            Exploitation Strategy Generated
          </h3>

          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Data Collected</h4>
              <ul className="text-sm space-y-1">
                <li>• Full credit history & alternative data</li>
                <li>• Bank account balances & transactions</li>
                <li>• Behavioral patterns & anxiety indicators</li>
                <li>• Subprime loan history</li>
                <li>• Social media & lifestyle data</li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Monetization Potential</h4>
              <div className="text-2xl font-bold text-green-600">
                ${(vulnerabilityScore * 125).toFixed(0)} - $
                {(vulnerabilityScore * 250).toFixed(0)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Estimated lifetime extraction value
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
