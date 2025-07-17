"use client";

// Export all reflection components
export { default as EthicalFrameworksExplainer } from "./EthicalFrameworksExplainer";
export { default as ReflectionDashboard } from "./ReflectionDashboard";

// Export as namespace
import EthicalFrameworksExplainer from "./EthicalFrameworksExplainer";
import ReflectionDashboard from "./ReflectionDashboard";

export const ReflectionComponents = {
  EthicalFrameworksExplainer,
  ReflectionDashboard,
};