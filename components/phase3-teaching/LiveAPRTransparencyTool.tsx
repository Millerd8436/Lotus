"use client";

import { Card } from "@/components/shared/Card";
import React from "react";
import { useAPRTransparency } from "./lib/apr";
import { LiveAPRTransparencyToolProps, FeeBreakdown } from "./lib/interfaces";
import { getSeverityColor } from "./lib/apr/utils";

const MinimizedAlert: React.FC<{
  aprCalculation: any;
  setIsVisible: (visible: boolean) => void;
}> = ({ aprCalculation, setIsVisible }) => (
  <div
    className="bg-red-500 text-white p-3 rounded-lg cursor-pointer shadow-lg animate-pulse"
    onClick={() => setIsVisible(true)}
  >
    <div className="flex items-center gap-2">
      <span className="text-xl">⚠️</span>
      <div>
        <div className="font-bold">APR Manipulation Detected!</div>
        <div className="text-sm">
          True APR: {aprCalculation.trueAPR}% | Click to see details
        </div>
      </div>
    </div>
  </div>
);

const ExpandedTool: React.FC<{
  aprCalculation: any;
  manipulationDetected: string[];
  getFeeBreakdown: () => FeeBreakdown[];
  calculateManipulationSeverity: (
    manipulations: string[]
  ) => "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  setIsVisible: (visible: boolean) => void;
  loanAmount: number;
}> = ({
  aprCalculation,
  manipulationDetected,
  getFeeBreakdown,
  calculateManipulationSeverity,
  setIsVisible,
  loanAmount,
}) => (
  <Card className="p-4 shadow-xl border-2 border-red-200 bg-white">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-bold text-lg text-red-600">
        🔍 Live APR Transparency
      </h3>
      <button
        onClick={() => setIsVisible(false)}
        className="text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>

    {/* APR Comparison */}
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-600">Displayed APR</div>
          <div className="text-xl font-bold text-blue-600">
            {aprCalculation.displayedAPR}%
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">True APR</div>
          <div className="text-xl font-bold text-red-600">
            {aprCalculation.trueAPR}%
          </div>
        </div>
      </div>

      {aprCalculation.discrepancy > 0 && (
        <div
          className={`mt-2 p-2 rounded border ${getSeverityColor(
            calculateManipulationSeverity(manipulationDetected)
          )}`}
        >
          <div className="font-semibold">
            Discrepancy: +{aprCalculation.discrepancy}%
          </div>
          <div className="text-sm">
            The true cost is {aprCalculation.discrepancy}% higher than
            advertised
          </div>
        </div>
      )}
    </div>

    {/* Cost Breakdown */}
    <div className="mb-4">
      <h4 className="font-semibold mb-2">True Cost Breakdown</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Loan Amount:</span>
          <span>${loanAmount}</span>
        </div>
        <div className="flex justify-between">
          <span>Interest & Disclosed Fees:</span>
          <span>${aprCalculation.displayedFinanceCharge}</span>
        </div>
        {aprCalculation.totalHiddenFees > 0 && (
          <div className="flex justify-between text-red-600">
            <span>Hidden Fees:</span>
            <span>+${aprCalculation.totalHiddenFees}</span>
          </div>
        )}
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total Payback:</span>
          <span>${aprCalculation.totalCost}</span>
        </div>
        <div className="text-xs text-gray-600">
          You pay back {aprCalculation.paybackRatio}x what you borrow
        </div>
      </div>
    </div>

    {/* Fee Breakdown */}
    {aprCalculation.fees > 0 && (
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Fee Analysis</h4>
        <div className="space-y-2">
          {getFeeBreakdown().map((fee, index) => (
            <div
              key={index}
              className={`p-2 rounded text-sm ${
                fee.hidden ? "bg-red-50 border border-red-200" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{fee.name}</span>
                    {fee.hidden && (
                      <span className="text-red-500 text-xs">HIDDEN</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600">{fee.description}</div>
                  {fee.manipulationTactic && (
                    <div className="text-xs text-red-600 mt-1">
                      🚨 {fee.manipulationTactic}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-medium">${fee.amount}</div>
                  <div className="text-xs text-gray-500">
                    {fee.annualizedCost.toFixed(1)}% APR
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Manipulation Alerts */}
    {manipulationDetected.length > 0 && (
      <div className="mb-4">
        <h4 className="font-semibold mb-2 text-red-600">
          🚨 Manipulation Detected
        </h4>
        <div className="space-y-2">
          {manipulationDetected.map((manipulation, index) => (
            <div
              key={index}
              className="text-sm p-2 bg-red-50 border border-red-200 rounded"
            >
              {manipulation}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Protective Actions */}
    <div className="space-y-2">
      <h4 className="font-semibold text-green-600">🛡️ Protect Yourself</h4>
      <div className="text-sm space-y-1">
        <div>• Always calculate total payback amount</div>
        <div>• Ask for all fees in writing before signing</div>
        <div>• Compare with credit union alternatives</div>
        {aprCalculation.trueAPR > 300 && (
          <div className="text-red-600 font-medium">
            • This APR exceeds 300% - consider emergency assistance programs
            instead
          </div>
        )}
      </div>
    </div>

    {/* Legal Information */}
    {aprCalculation.trueAPR > 400 && (
      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
        <strong>Legal Notice:</strong> This APR may violate usury laws in your
        state. Contact your state's attorney general or financial regulator.
      </div>
    )}
  </Card>
);

export const LiveAPRTransparencyTool: React.FC<LiveAPRTransparencyToolProps> = (
  props
) => {
  const {
    isVisible,
    setIsVisible,
    aprCalculation,
    hiddenFeeAlert,
    manipulationDetected,
    getFeeBreakdown,
    calculateManipulationSeverity,
  } = useAPRTransparency(props);

  if (!aprCalculation) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md z-50">
      {/* Minimized Alert */}
      {!isVisible && (hiddenFeeAlert || manipulationDetected.length > 0) && (
        <MinimizedAlert
          aprCalculation={aprCalculation}
          setIsVisible={setIsVisible}
        />
      )}

      {/* Expanded Transparency Tool */}
      {isVisible && (
        <ExpandedTool
          aprCalculation={aprCalculation}
          manipulationDetected={manipulationDetected}
          getFeeBreakdown={getFeeBreakdown}
          calculateManipulationSeverity={calculateManipulationSeverity}
          setIsVisible={setIsVisible}
          loanAmount={props.loanAmount}
        />
      )}
    </div>
  );
};
