// components/predatory/AutonomyTheater.tsx
"use client";

import { TheaterEvent } from "@/lib/core/AutonomyTheaterEngine";
import React from "react";

interface AutonomyTheaterProps {
  events: TheaterEvent[];
  progress: number;
}

const AutonomyTheater: React.FC<AutonomyTheaterProps> = ({
  events,
  progress,
}) => {
  const latestEvent = events[events.length - 1];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 sticky top-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Your Application Progress
      </h3>

      {/* Misleading Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-right text-sm font-semibold text-gray-700 mb-4">
        {progress}% Complete
      </div>

      {/* Latest Manipulative Message */}
      {latestEvent && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg">
          <p className="font-semibold">{latestEvent.positiveFraming}</p>
        </div>
      )}

      {/* History of "Choices" */}
      <div className="mt-4">
        <h4 className="text-sm font-bold text-gray-600 mb-2">
          Your Choices So Far:
        </h4>
        <ul className="space-y-2">
          {events
            .slice(0, -1)
            .reverse()
            .map((event, index) => (
              <li key={index} className="text-xs text-gray-500 opacity-50">
                {event.positiveFraming}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AutonomyTheater;
