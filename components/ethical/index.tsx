"use client";

// Export all individual ethical components
export { default as CoolingOffNotice } from "./CoolingOffNotice";
export { default as EmpowermentDashboard } from "./EmpowermentDashboard";
export { default as EthicalHeader } from "./EthicalHeader";
export { default as EthicalHomepage } from "./EthicalHomepage";
export { default as EthicalLoanCalculator } from "./EthicalLoanCalculator";
export { default as EthicalLoanSummary } from "./EthicalLoanSummary";

// Export as namespace for convenience
import CoolingOffNotice from "./CoolingOffNotice";
import EmpowermentDashboard from "./EmpowermentDashboard";
import EthicalHeader from "./EthicalHeader";
import EthicalHomepage from "./EthicalHomepage";
import EthicalLoanCalculator from "./EthicalLoanCalculator";
import EthicalLoanSummary from "./EthicalLoanSummary";

export const EthicalComponents = {
  CoolingOffNotice,
  EmpowermentDashboard,
  EthicalHeader,
  EthicalHomepage,
  EthicalLoanCalculator,
  EthicalLoanSummary,
};