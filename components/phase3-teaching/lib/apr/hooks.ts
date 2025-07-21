import { useEffect, useState } from "react";
import {
  FeeBreakdown,
  LiveAPRTransparencyToolProps,
} from "../interfaces";
import { getFeeDescription, getFeeManipulationTactic } from "./utils";

export const useAPRTransparency = ({
  loanAmount,
  termDays,
  fees,
  interestRate,
  onAPRExposure,
}: LiveAPRTransparencyToolProps) => {
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

  return {
    isVisible,
    setIsVisible,
    aprCalculation,
    hiddenFeeAlert,
    manipulationDetected,
    getFeeBreakdown,
    calculateManipulationSeverity,
  };
};
