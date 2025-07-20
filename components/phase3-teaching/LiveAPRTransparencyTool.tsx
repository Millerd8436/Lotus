"use client";

import { Card } from "@/components/shared/Card";
import React, { useEffect, useState } from "react";

interface LiveAPRTransparencyToolProps {
  loanAmount: number;
  termDays: number;
  fees: Array<{
    name: string;
    amount: number;
    hidden: boolean;
    mandatory: boolean;
    timing: "upfront" | "ongoing" | "end";
  }>;
  interestRate: number;
  onAPRExposure: (exposure: APRExposureData) => void;
}

interface APRExposureData {
  displayedAPR: number;
  trueAPR: number;
  discrepancy: number;
  hiddenFees: number;
  totalCost: number;
  manipulationSeverity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  exposedTricks: string[];
}

interface FeeBreakdown {
  name: string;
  amount: number;
  description: string;
  hidden: boolean;
  annualizedCost: number;
  manipulationTactic?: string | undefined;
}

export const LiveAPRTransparencyTool: React.FC<
  LiveAPRTransparencyToolProps
> = ({ loanAmount, termDays, fees, interestRate, onAPRExposure }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [aprCalculation, setAprCalculation] = useState<any>(null);
  const [hiddenFeeAlert, setHiddenFeeAlert] = useState(false);
  const [manipulationDetected, setManipulationDetected] = useState<string[]>(
    []
  );

  useEffect(() => {
    const calculation = calculateTrueAPR();
    setAprCalculation(calculation);

    // Check for APR manipulation
    const manipulations = detectAPRManipulation(calculation);
    setManipulationDetected(manipulations);

    // Show alert for hidden fees
    if (fees.some((f) => f.hidden && f.amount > 0)) {
      setHiddenFeeAlert(true);
    }

    // Report to parent component
    onAPRExposure({
      displayedAPR: calculation.displayedAPR,
      trueAPR: calculation.trueAPR,
      discrepancy: calculation.discrepancy,
      hiddenFees: calculation.totalHiddenFees,
      totalCost: calculation.totalCost,
      manipulationSeverity: calculateManipulationSeverity(manipulations),
      exposedTricks: manipulations,
    });
  }, [loanAmount, termDays, fees, interestRate]);

  const calculateTrueAPR = () => {
    // Calculate displayed APR (what the lender shows)
    const displayedFees = fees
      .filter((f) => !f.hidden)
      .reduce((sum, f) => sum + f.amount, 0);
    const displayedFinanceCharge =
      (((loanAmount * interestRate) / 100) * termDays) / 365 + displayedFees;
    const displayedAPR =
      (displayedFinanceCharge / loanAmount) * (365 / termDays) * 100;

    // Calculate true APR (including all fees)
    const allFees = fees.reduce((sum, f) => sum + f.amount, 0);
    const trueFinanceCharge =
      (((loanAmount * interestRate) / 100) * termDays) / 365 + allFees;
    const trueAPR = (trueFinanceCharge / loanAmount) * (365 / termDays) * 100;

    // Additional calculations
    const totalCost = loanAmount + trueFinanceCharge;
    const totalHiddenFees = fees
      .filter((f) => f.hidden)
      .reduce((sum, f) => sum + f.amount, 0);
    const discrepancy = trueAPR - displayedAPR;

    return {
      displayedAPR: Math.round(displayedAPR * 100) / 100,
      trueAPR: Math.round(trueAPR * 100) / 100,
      discrepancy: Math.round(discrepancy * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      totalHiddenFees: Math.round(totalHiddenFees * 100) / 100,
      displayedFinanceCharge: Math.round(displayedFinanceCharge * 100) / 100,
      trueFinanceCharge: Math.round(trueFinanceCharge * 100) / 100,
      paybackRatio: Math.round((totalCost / loanAmount) * 100) / 100,
    };
  };

  const detectAPRManipulation = (calculation: any): string[] => {
    const manipulations: string[] = [];

    // Hidden fee manipulation
    if (calculation.totalHiddenFees > 0) {
      manipulations.push(
        `Hidden fees of $${calculation.totalHiddenFees} not included in displayed APR`
      );
    }

    // Massive APR discrepancy
    if (calculation.discrepancy > 50) {
      manipulations.push(
        `True APR is ${calculation.discrepancy}% higher than displayed`
      );
    }

    // Usury-level rates
    if (calculation.trueAPR > 400) {
      manipulations.push(
        `True APR of ${calculation.trueAPR}% exceeds usury thresholds in most states`
      );
    }

    // Fee timing manipulation
    const endFees = fees
      .filter((f) => f.timing === "end")
      .reduce((sum, f) => sum + f.amount, 0);
    if (endFees > loanAmount * 0.1) {
      manipulations.push(
        `Back-end fees of $${endFees} artificially lower displayed APR`
      );
    }

    // Mandatory "optional" fees
    const optionalButMandatory = fees.filter(
      (f) => !f.mandatory && f.amount > 0
    ).length;
    if (optionalButMandatory > 0) {
      manipulations.push(
        `${optionalButMandatory} "optional" fees are actually required`
      );
    }

    // Express processing scam
    const expressFee = fees.find((f) =>
      f.name.toLowerCase().includes("express")
    );
    if (expressFee && expressFee.amount > 50) {
      manipulations.push(
        `Express processing fee of $${expressFee.amount} for instant digital processing`
      );
    }

    return manipulations;
  };

  const calculateManipulationSeverity = (
    manipulations: string[]
  ): "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" => {
    if (!aprCalculation) return "LOW";

    if (aprCalculation.trueAPR > 500 || aprCalculation.discrepancy > 100)
      return "CRITICAL";
    if (aprCalculation.trueAPR > 300 || aprCalculation.discrepancy > 50)
      return "HIGH";
    if (aprCalculation.trueAPR > 200 || aprCalculation.discrepancy > 25)
      return "MEDIUM";
    return "LOW";
  };

  const getFeeBreakdown = (): FeeBreakdown[] => {
    return fees.map((fee) => ({
      name: fee.name,
      amount: fee.amount,
      description: getFeeDescription(fee),
      hidden: fee.hidden,
      annualizedCost: (fee.amount / loanAmount) * (365 / termDays) * 100,
      manipulationTactic: getFeeManipulationTactic(fee),
    }));
  };

  const getFeeDescription = (fee: any): string => {
    const descriptions: { [key: string]: string } = {
      processing: "Fee for basic loan processing (typically automatic)",
      documentation: "Fee for loan paperwork and record-keeping",
      verification: "Fee for identity and income verification",
      express: "Fee for faster processing (often unnecessary)",
      insurance: "Optional loan protection insurance (rarely beneficial)",
      maintenance: "Ongoing account maintenance fee",
      origination: "One-time loan setup fee",
    };

    const key = fee.name.toLowerCase();
    for (const [term, desc] of Object.entries(descriptions)) {
      if (key.includes(term)) return desc;
    }
    return "Additional fee charged by lender";
  };

  const getFeeManipulationTactic = (fee: any): string | undefined => {
    if (fee.hidden) return "Hidden from initial APR calculation";
    if (fee.name.toLowerCase().includes("express") && fee.amount > 25)
      return "Charges for standard digital processing";
    if (fee.name.toLowerCase().includes("insurance") && !fee.mandatory)
      return "Upsells unnecessary protection";
    if (fee.timing === "end") return "Back-loaded to artificially lower APR";
    return undefined;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "text-red-600 bg-red-50 border-red-200";
      case "HIGH":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "MEDIUM":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  if (!aprCalculation) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-md z-50">
      {/* Minimized Alert */}
      {!isVisible && (hiddenFeeAlert || manipulationDetected.length > 0) && (
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
      )}

      {/* Expanded Transparency Tool */}
      {isVisible && (
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
          {fees.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Fee Analysis</h4>
              <div className="space-y-2">
                {getFeeBreakdown().map((fee, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-sm ${
                      fee.hidden
                        ? "bg-red-50 border border-red-200"
                        : "bg-gray-50"
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
                        <div className="text-xs text-gray-600">
                          {fee.description}
                        </div>
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
            <h4 className="font-semibold text-green-600">
              🛡️ Protect Yourself
            </h4>
            <div className="text-sm space-y-1">
              <div>• Always calculate total payback amount</div>
              <div>• Ask for all fees in writing before signing</div>
              <div>• Compare with credit union alternatives</div>
              {aprCalculation.trueAPR > 300 && (
                <div className="text-red-600 font-medium">
                  • This APR exceeds 300% - consider emergency assistance
                  programs instead
                </div>
              )}
            </div>
          </div>

          {/* Legal Information */}
          {aprCalculation.trueAPR > 400 && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
              <strong>Legal Notice:</strong> This APR may violate usury laws in
              your state. Contact your state's attorney general or financial
              regulator.
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
