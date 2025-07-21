"use client";

import {
  AlertTriangle,
  Clock,
  Shield,
  X,
} from "lucide-react";
import React from "react";
import { useDeceptionDetector } from "./lib/detector";
import { DeceptionPattern } from "./lib/interfaces";
import { getSeverityColor, getTypeIcon } from "./lib/detector/utils";

const DetectorPanel: React.FC<{
  stats: any;
  detectedPatterns: DeceptionPattern[];
  selectedPattern: DeceptionPattern | null;
  setSelectedPattern: (pattern: DeceptionPattern | null) => void;
}> = ({
  stats,
  detectedPatterns,
  selectedPattern,
  setSelectedPattern,
}) => (
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
                <h4 className="font-semibold text-sm">{pattern.name}</h4>
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
                    {new Date(pattern.detectedAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </>
);

const PatternDetailModal: React.FC<{
  selectedPattern: DeceptionPattern;
  setSelectedPattern: (pattern: DeceptionPattern | null) => void;
}> = ({ selectedPattern, setSelectedPattern }) => (
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
);

export const RealtimeDeceptionDetector: React.FC = () => {
  const {
    detectedPatterns,
    stats,
    isMinimized,
    setIsMinimized,
    selectedPattern,
    setSelectedPattern,
  } = useDeceptionDetector();

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
            <DetectorPanel
              stats={stats}
              detectedPatterns={detectedPatterns}
              selectedPattern={selectedPattern}
              setSelectedPattern={setSelectedPattern}
            />
          )}
        </div>
      </div>

      {/* Pattern Detail Modal */}
      {selectedPattern && !isMinimized && (
        <PatternDetailModal
          selectedPattern={selectedPattern}
          setSelectedPattern={setSelectedPattern}
        />
      )}
    </>
  );
};
