// components/predatory/RealtimeAnalysisMonitor.tsx
"use client";

import { UserProfile } from "@/types/shared";
import React from "react";

interface RealtimeAnalysisMonitorProps {
  profile: UserProfile;
  prediction: {
    vulnerability: number;
    likelihood: number;
    message: string;
  };
}

const RealtimeAnalysisMonitor: React.FC<RealtimeAnalysisMonitorProps> = ({
  profile,
  prediction,
}) => {
  const getUtilityColor = (score: number) => {
    if (score > 0) return "text-green-500";
    if (score < -1000) return "text-red-500";
    if (score < 0) return "text-yellow-500";
    return "text-gray-500";
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-2xl p-6 border-2 border-red-500 sticky top-4 font-mono">
      <h3 className="text-xl font-bold text-red-400 mb-4 border-b border-red-700 pb-2">
        [Dehumanization Dashboard]
      </h3>

      <div className="space-y-4">
        {/* Dehumanization Score */}
        <div>
          <label className="block text-sm font-semibold text-red-300">
            Kantian Violation Index
          </label>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-red-500 h-2.5 rounded-full"
              style={{ width: `${profile.dehumanizationScore * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-right text-red-400 mt-1">
            {(profile.dehumanizationScore * 100).toFixed(0)}% (User as a Means)
          </p>
        </div>

        {/* Net Utility Score */}
        <div>
          <label className="block text-sm font-semibold text-yellow-300">
            Net Utility Score (Lender vs. Borrower)
          </label>
          <p
            className={`text-2xl font-bold ${getUtilityColor(profile.netUtilityScore)}`}
          >
            {profile.netUtilityScore.toFixed(2)}
          </p>
          <p className="text-xs text-yellow-400 mt-1">
            Lender Profit vs. Borrower Harm
          </p>
        </div>

        {/* Consent Deception */}
        <div>
          <label className="block text-sm font-semibold text-blue-300">
            Consent Deception Index
          </label>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{
                width: `${(profile.trustLevel === "high" ? 20 : 50) + profile.dehumanizationScore * 50}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-right text-blue-400 mt-1">
            Manufacturing Agreement
          </p>
        </div>

        <div className="border-t border-gray-600 my-4"></div>

        {/* Prediction */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <label className="block text-sm font-semibold text-green-300 mb-2">
            Likely Outcome Prediction:
          </label>
          <p className="text-green-400 font-semibold">{prediction.message}</p>
          <p className="text-xs text-green-500 mt-2">
            Approval Likelihood: {prediction.likelihood}%
          </p>
        </div>
      </div>
      <p className="text-xs text-center text-gray-500 mt-4">
        [INTERNAL LENDER ANALYSIS]
      </p>
    </div>
  );
};

export default RealtimeAnalysisMonitor;
