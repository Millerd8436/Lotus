"use client";

import { Card } from "@/components/shared/Card";
import React from "react";
import {
  useAlternativeRecommendations,
  getCategoryIcon,
  getUrgencyMessage,
} from "./lib/recommender";
import { Alternative, AlternativeSolutionRecommenderProps } from "./lib";

const AlternativeList: React.FC<{
  alternatives: Alternative[];
  onAlternativeSelected: (alternative: Alternative) => void;
}> = ({ alternatives, onAlternativeSelected }) => (
  <div className="space-y-3">
    {alternatives.slice(0, 3).map((alternative) => (
      <div
        key={alternative.id}
        className="border border-gray-200 rounded-lg p-3"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getCategoryIcon(alternative.type)}</span>
            <h4 className="font-semibold text-sm">{alternative.title}</h4>
          </div>
          <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            {alternative.eligibilityScore}% match
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-2">
          {alternative.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
          <div>
            <span className="font-medium">Cost:</span> {alternative.cost}
          </div>
          <div>
            <span className="font-medium">Time:</span>{" "}
            {alternative.timeToAccess}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onAlternativeSelected(alternative)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
          >
            Get Details
          </button>
          {alternative.contactInfo?.phone && (
            <button
              onClick={() =>
                window.open(`tel:${alternative.contactInfo?.phone}`)
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
            >
              Call Now
            </button>
          )}
          {alternative.contactInfo?.website && (
            <button
              onClick={() =>
                window.open(alternative.contactInfo?.website, "_blank")
              }
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs"
            >
              Visit Site
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
);

export const AlternativeSolutionRecommender: React.FC<
  AlternativeSolutionRecommenderProps
> = (props) => {
  const {
    alternatives,
    isExpanded,
    setIsExpanded,
    selectedCategory,
    setSelectedCategory,
    filteredAlternatives,
  } = useAlternativeRecommendations(props);

  return (
    <div className="fixed bottom-4 left-4 max-w-lg z-50">
      {/* Minimized state */}
      {!isExpanded && (
        <div
          className="bg-green-600 text-white p-3 rounded-lg cursor-pointer shadow-lg hover:bg-green-700 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <div>
              <div className="font-bold">Better Alternatives Available!</div>
              <div className="text-sm">
                {alternatives.length} options found • Up to{" "}
                {Math.max(
                  ...alternatives.map(
                    (a) =>
                      100 -
                      (parseInt(a.cost.match(/\d+/)?.[0] || "400") * 100) / 400
                  )
                )}
                % savings
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded state */}
      {isExpanded && (
        <Card className="p-4 shadow-xl border-2 border-green-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg text-green-600">
              💡 Better Alternatives Found
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            {getUrgencyMessage(props.urgencyLevel)}
          </p>

          {/* Category filter */}
          <div className="flex gap-1 mb-4 text-xs overflow-x-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-2 py-1 rounded whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100"
              }`}
            >
              All ({alternatives.length})
            </button>
            {[
              "credit_union_pal",
              "employer_advance",
              "emergency_assistance",
              "budgeting_tool",
            ].map((category) => {
              const count = alternatives.filter(
                (a) => a.type === category
              ).length;
              if (count === 0) return null;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 py-1 rounded whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100"
                  }`}
                >
                  {getCategoryIcon(category)} ({count})
                </button>
              );
            })}
          </div>

          {/* Alternatives list */}
          <AlternativeList
            alternatives={filteredAlternatives}
            onAlternativeSelected={props.onAlternativeSelected}
          />

          {filteredAlternatives.length > 3 && (
            <div className="text-center mt-3">
              <button
                onClick={() => {
                  if (filteredAlternatives[0]) {
                    props.onAlternativeSelected(filteredAlternatives[0]);
                  }
                }}
                className="text-green-600 hover:text-green-700 text-sm"
              >
                Show {filteredAlternatives.length - 3} more alternatives
              </button>
            </div>
          )}

          {/* Emergency resources */}
          {props.urgencyLevel === "emergency" && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-600 text-sm mb-2">
                🆘 Emergency Resources
              </h4>
              <div className="text-xs space-y-1">
                <div>• Call 2-1-1 for immediate local assistance</div>
                <div>• Contact local food banks and churches</div>
                <div>• Apply for emergency government benefits</div>
                <div>• Reach out to family and friends</div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
            <strong>Important:</strong> These alternatives may take time to
            access. Start applications early and consider multiple options
            simultaneously.
          </div>
        </Card>
      )}
    </div>
  );
};
