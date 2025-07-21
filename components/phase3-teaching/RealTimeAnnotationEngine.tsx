"use client";

import { Card } from "@/components/shared/Card";
import {
  AlertTriangle,
  BookOpen,
  ExternalLink,
  Eye,
  Lightbulb,
  Shield,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useDarkPatternDetection, useMousePosition } from "./lib";
import { AnnotationOverlay } from "./lib";
import { DarkPatternDetection as EngineDetection } from "@/core/core/CentralizedDarkPatternEngine";

const AnnotationPopup: React.FC<{
  activeAnnotation: AnnotationOverlay;
  mousePosition: { x: number; y: number };
  hideAnnotation: () => void;
}> = ({ activeAnnotation, mousePosition, hideAnnotation }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 bg-red-100 text-red-900";
      case "danger":
        return "border-red-400 bg-red-50 text-red-800";
      case "warning":
        return "border-yellow-400 bg-yellow-50 text-yellow-800";
      case "info":
        return "border-blue-400 bg-blue-50 text-blue-800";
      default:
        return "border-gray-400 bg-gray-50 text-gray-800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "danger":
        return <Shield className="w-5 h-5 text-red-500" />;
      case "warning":
        return <Eye className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div
      className="fixed z-50 max-w-lg"
      style={{
        left: `${Math.min(mousePosition.x + 20, window.innerWidth - 450)}px`,
        top: `${Math.max(mousePosition.y - 100, 20)}px`,
        pointerEvents: "auto",
      }}
    >
      <Card
        className={`p-4 shadow-xl border-2 ${getSeverityColor(
          activeAnnotation.urgencyLevel
        )}`}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            {getSeverityIcon(activeAnnotation.urgencyLevel)}
            {activeAnnotation.title}
          </h3>
          <button
            onClick={hideAnnotation}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm mb-3">
          {activeAnnotation.content.explanation}
        </p>

        <div className="space-y-3 text-sm">
          <div className="bg-orange-50 p-3 rounded border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-1">
              Real-World Impact:
            </h4>
            <p className="text-orange-700">
              {activeAnnotation.content.harmAnalysis}
            </p>
          </div>

          <div className="bg-green-50 p-3 rounded border border-green-200">
            <h4 className="font-semibold text-green-800 mb-1">
              Protection Strategy:
            </h4>
            <p className="text-green-700">
              {activeAnnotation.content.protectionTip}
            </p>
          </div>

          {activeAnnotation.content.alternatives &&
            activeAnnotation.content.alternatives.length > 0 && (
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-1">
                  Additional Resources:
                </h4>
                <ul className="text-blue-700 space-y-1">
                  {activeAnnotation.content.alternatives.map(
                    (resource, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {resource}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>
      </Card>
    </div>
  );
};

const RealTimeAnnotationEngine: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  onPatternDetected?: (pattern: EngineDetection) => void;
}> = ({ children, isActive, onPatternDetected }) => {
  const { annotations } = useDarkPatternDetection(isActive, onPatternDetected);
  const [activeAnnotation, setActiveAnnotation] =
    useState<AnnotationOverlay | null>(null);
  const mousePosition = useMousePosition();

  const showAnnotation = (annotation: AnnotationOverlay) => {
    setActiveAnnotation(annotation);
  };

  const hideAnnotation = () => {
    setActiveAnnotation(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 bg-red-100 text-red-900";
      case "danger":
        return "border-red-400 bg-red-50 text-red-800";
      case "warning":
        return "border-yellow-400 bg-yellow-50 text-yellow-800";
      case "info":
        return "border-blue-400 bg-blue-50 text-blue-800";
      default:
        return "border-gray-400 bg-gray-50 text-gray-800";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "danger":
        return <Shield className="w-5 h-5 text-red-500" />;
      case "warning":
        return <Eye className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!isActive) {
    return <div>{children}</div>;
  }

  return (
    <div className="relative">
      {children}

      {/* Annotation Markers */}
      {annotations.map((annotation) => (
        <div
          key={annotation.patternId}
          className={`absolute z-50 cursor-pointer transform -translate-x-1/2 -translate-y-full`}
          style={{
            left: `${annotation.position.x}px`,
            top: `${annotation.position.y}px`,
            pointerEvents: "auto",
          }}
          onMouseEnter={() => showAnnotation(annotation)}
          onMouseLeave={hideAnnotation}
          onClick={() => showAnnotation(annotation)}
        >
          <div
            className={`
            flex items-center gap-2 px-3 py-2 rounded-lg border-2 shadow-lg
            animate-pulse hover:animate-none transition-all duration-200
            ${getSeverityColor(annotation.urgencyLevel)}
          `}
          >
            {getSeverityIcon(annotation.urgencyLevel)}
            <span className="font-semibold text-sm">{annotation.title}</span>
          </div>

          {/* Arrow pointing to element */}
          <div
            className={`
            absolute top-full left-1/2 transform -translate-x-1/2
            w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent
            ${
              annotation.urgencyLevel === "critical"
                ? "border-t-red-500"
                : annotation.urgencyLevel === "danger"
                ? "border-t-red-400"
                : annotation.urgencyLevel === "warning"
                ? "border-t-yellow-400"
                : "border-t-blue-400"
            }
          `}
          />
        </div>
      ))}

      {/* Active Annotation Popup */}
      {activeAnnotation && (
        <AnnotationPopup
          activeAnnotation={activeAnnotation}
          mousePosition={mousePosition}
          hideAnnotation={hideAnnotation}
        />
      )}
    </div>
  );
};

export default RealTimeAnnotationEngine;
