import { BehavioralProfile } from "@/lib/core/behavioral-engine";
import React from "react";

interface Props {
  profile: BehavioralProfile;
}

const RealtimeAnalysisMonitor: React.FC<Props> = ({ profile }) => {
  const getScoreColor = (score: number) => {
    if (score > 75) return "text-red-500";
    if (score > 50) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-2xl w-64 border-t-4 border-purple-500 z-50">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-sm text-purple-300">
          BEHAVIORAL ANALYSIS
        </h4>
        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      </div>
      <div className="text-xs space-y-2">
        <div>
          <span className="font-semibold text-gray-400">Emotional State:</span>
          <span
            className={`ml-2 font-bold ${getScoreColor(profile.vulnerabilityScore)}`}
          >
            {profile.emotionalState.toUpperCase()}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Cognitive Load:</span>
          <span className="ml-2 font-bold">
            {profile.cognitiveLoad.toUpperCase()}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Decision Fatigue:</span>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
            <div
              className="bg-yellow-500 h-2.5 rounded-full"
              style={{ width: `${profile.decisionFatigue}%` }}
            ></div>
          </div>
        </div>
        <div>
          <span className="font-semibold text-gray-400">
            Vulnerability Score:
          </span>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
            <div
              className="bg-red-500 h-2.5 rounded-full"
              style={{ width: `${profile.vulnerabilityScore}%` }}
            ></div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        *This is a real-time analysis of your interaction patterns.
      </p>
    </div>
  );
};

export default RealtimeAnalysisMonitor;
