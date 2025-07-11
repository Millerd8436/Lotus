"use client";

import { createPhaseAutonomyTheater } from "@/lib/core/autonomy-theater";
import { LotusSession } from "@/types/lotus";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DarkPatternUI from "./DarkPatternUI";

// Mock Session Data - In a real app, this would come from a provider or API
const mockSession: LotusSession = {
  id: "session-123",
  startTime: new Date(),
  currentPhase: 1,
  exploitativeData: {},
  ethicalData: {},
  analysisData: {},
  userChoices: [],
  coercionIndex: 2.5,
  autonomyViolations: [
    {
      type: "Fake Urgency Creation",
      severity: "high",
      description: "Countdown timer pressure",
      timestamp: "",
      kantianViolation: "",
    },
    {
      type: "Drip Pricing Concealment",
      severity: "critical",
      description: "Fees hidden until last step",
      timestamp: "",
      kantianViolation: "",
    },
    {
      type: "Fake Urgency Creation",
      severity: "high",
      description: "Artificial scarcity claims",
      timestamp: "",
      kantianViolation: "",
    },
    {
      type: "Preselection Manipulation",
      severity: "high",
      description: "Pre-checked add-ons",
      timestamp: "",
      kantianViolation: "",
    },
    {
      type: "Roach Motel Process",
      severity: "medium",
      description: "Hard to exit application",
      timestamp: "",
      kantianViolation: "",
    },
    {
      type: "Authority Deception",
      severity: "high",
      description: "Fake trust badges",
      timestamp: "",
      kantianViolation: "",
    },
  ],
  trapEngineState: {} as any,
  darkPatterns: [],
};

const Phase3EducationalReflection: React.FC = () => {
  const [showAnnotations, setShowAnnotations] = useState(true);

  const autonomyTheater = useMemo(
    () => createPhaseAutonomyTheater(1, mockSession, {}),
    []
  );

  const report = useMemo(
    () => autonomyTheater.generateReport(),
    [autonomyTheater]
  );

  const violationData = useMemo(() => {
    const total = report.totalViolations;
    if (total === 0) return [];

    const violationMap: { [key: string]: string } = {
      "Fake Urgency Creation": "Fake Urgency",
      "Drip Pricing Concealment": "Drip Pricing",
      "Preselection Manipulation": "Preselection",
      "Roach Motel Process": "Roach Motel",
      "Authority Deception": "Deceptive Authority",
    };

    const aggregatedCounts: { [key: string]: number } = {};
    mockSession.autonomyViolations.forEach((v) => {
      const key = violationMap[v.type] || v.type;
      aggregatedCounts[key] = (aggregatedCounts[key] || 0) + 1;
    });

    return Object.entries(aggregatedCounts).map(([name, count]) => ({
      name,
      value: count,
      percent: Math.round((count / total) * 100),
    }));
  }, [report, mockSession.autonomyViolations]);

  const comparisonData = [
    {
      category: "Initial Hook",
      exploitative: "Fake urgency timers, scarcity claims, aggressive CTAs",
      ethical: "Clear value proposition, honest terms, no pressure",
      impact: "Creates panic decisions vs informed choices",
    },
    {
      category: "Fee Disclosure",
      exploitative: "Drip pricing - fees revealed progressively",
      ethical: "Full cost breakdown upfront with APR",
      impact: "Hidden costs vs transparent pricing",
    },
    {
      category: "Add-on Services",
      exploitative: "Pre-selected, confirmshaming opt-outs",
      ethical: "All services opt-in only with clear benefits",
      impact: "Unwanted charges vs conscious choices",
    },
    {
      category: "Application Process",
      exploitative: "Progressive complexity, roach motel pattern",
      ethical: "Clear steps, easy cancellation available",
      impact: "Trapped in process vs free to leave",
    },
    {
      category: "Loan Terms",
      exploitative: "664% APR, rollover traps, NSF fees",
      ethical: "36% APR, no rollovers, fair collection",
      impact: "Debt cycle vs manageable repayment",
    },
    {
      category: "Data Privacy",
      exploitative: "Pre-consented sharing, lead generation",
      ethical: "No data sharing, explicit consent only",
      impact: "Privacy violation vs data protection",
    },
  ];

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#d0ed57",
    "#ff7300",
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Educational Analysis & Reflection
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Compare the two lending experiences and understand the psychology
            behind predatory practices.
          </p>
        </div>

        {/* Autonomy Theater Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
            🎭 Autonomy Theater Detection
          </h2>
          <p className="text-center text-gray-500 mb-8">
            "Autonomy Theater" refers to the illusion of choice and control
            while actually constraining user decisions through manipulation.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-4xl font-bold text-red-600">
                {report.totalViolations}
              </div>
              <div className="text-sm font-medium text-red-800">
                Manipulation Patterns Detected
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-4xl font-bold text-yellow-600">High</div>
              <div className="text-sm font-medium text-yellow-800">
                Average Severity
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-4xl font-bold text-purple-600">
                {100 - report.autonomyScore}
                <span className="text-2xl">/100</span>
              </div>
              <div className="text-sm font-medium text-purple-800">
                Autonomy Violation Score
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
              Most Common Violations (%)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={violationData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(240, 240, 240, 0.5)" }}
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
                <Bar dataKey="percent" barSize={30}>
                  {violationData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Phase Comparison Analysis
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 font-semibold text-left text-gray-600 border-b-2 border-gray-200">
                    Category
                  </th>
                  <th className="p-3 font-semibold text-left text-gray-600 border-b-2 border-gray-200">
                    Phase 1: Exploitative
                  </th>
                  <th className="p-3 font-semibold text-left text-gray-600 border-b-2 border-gray-200">
                    Phase 2: Ethical
                  </th>
                  <th className="p-3 font-semibold text-left text-gray-600 border-b-2 border-gray-200">
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-200 font-semibold">
                      {row.category}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-sm">
                      {row.exploitative}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-sm">
                      {row.ethical}
                    </td>
                    <td className="p-3 border-b border-gray-200 text-sm">
                      {row.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive UI Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
            Interactive Interface Comparison
          </h2>
          <p className="text-center text-gray-500 mb-4">
            Compare how the same loan product can be presented in manipulative
            vs transparent ways.
          </p>
          <div className="flex justify-center items-center my-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showAnnotations}
                onChange={() => setShowAnnotations(!showAnnotations)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900">
                Show educational annotations
              </span>
            </label>
          </div>
          <DarkPatternUI
            mode="comparison"
            showEducationalAnnotations={showAnnotations}
            onShowAnnotationsChange={setShowAnnotations}
          />
        </div>
      </div>
    </div>
  );
};

export default Phase3EducationalReflection;
