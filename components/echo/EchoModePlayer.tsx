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
import { AnnotationOverlay } from "./lib";
import { AlternativeSolutionRecommender } from './AlternativeSolutionRecommender';
import quizData from '@/data/quiz_bank.json';


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

        {/* --- DEBRIEF SECTION --- */}
        <div className="bg-gray-100 p-3 rounded-lg border border-gray-200 mb-3">
          <h4 className="font-semibold text-gray-800 mb-1">Debrief & Legal Context</h4>
          <p className="text-xs text-gray-600">
            {activeAnnotation.content.legalLoopholes || "This design, while not strictly illegal, exploits gaps in consumer protection laws."}
          </p>
        </div>

        {/* --- SMARTER ALTERNATIVES SECTION --- */}
        <div className="bg-green-50 p-3 rounded-lg border border-green-200 mb-3">
          <h4 className="font-semibold text-green-800 mb-1">Smarter Financial Alternatives</h4>
          <ul className="text-xs text-green-700 list-disc list-inside">
            <li>Credit Union PALs (Payday Alternative Loans)</li>
            <li>Local community assistance programs</li>
            <li>Negotiating directly with the service provider</li>
          </ul>
        </div>
        
        {/* --- REFLECTIVE PROMPTS --- */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">A Few Questions...</h4>
          <div className="space-y-3 text-sm">
            <p>Did you notice this design element before?</p>
            {/* In a real app, these would be interactive elements that log responses */}
            <div className="flex gap-2">
              <button className="bg-gray-200 px-3 py-1 rounded text-xs">Yes</button>
              <button className="bg-gray-200 px-3 py-1 rounded text-xs">No</button>
            </div>
            <p>How do you feel about this practice now?</p>
             <div className="flex gap-2">
              <button className="bg-gray-200 px-3 py-1 rounded text-xs">Fair</button>
              <button className="bg-gray-200 px-3 py-1 rounded text-xs">Unfair</button>
            </div>
          </div>
        </div>
        
      </Card>
    </div>
  );
};

const EchoModePlayer: React.FC<{
  sessionData: any; // Will be a structured object with session events and annotations
  annotations: AnnotationOverlay[];
}> = ({ sessionData, annotations }) => {
  const [activeAnnotation, setActiveAnnotation] =
    useState<AnnotationOverlay | null>(null);
  // This will be used to control the replay
  const [replayStep, setReplayStep] = useState(0); 

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

  return (
    <div className="relative">
      <div className="w-full h-[80vh] bg-gray-100 border-2 border-dashed rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Session Replay Area (Placeholder)</p>
      </div>

      {/* Annotation Markers will be mapped from the `annotations` prop */}
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
          // We will need to adjust how mousePosition works in a replay context
          mousePosition={{ x: 0, y: 0 }} 
          hideAnnotation={hideAnnotation}
        />
      )}

      <AlternativeSolutionRecommender
        loanAmount={sessionData?.loanAmount || 500}
        urgencyLevel={sessionData?.urgency || 'high'}
        userLocation={sessionData?.location || 'CA'}
        onAlternativeSelected={(alt) => console.log('Alternative selected:', alt)}
        alternatives={[
          ...quizData.educational_content.alternatives,
          ...quizData.educational_content.new_alternatives_2024
        ]}
      />
    </div>
  );
};

export default EchoModePlayer;
