// App-level barrel export for easy imports

export * from "@/components";

// Named exports for specific component groups
export { PredatoryComponents } from "@/components/predatory";
export { EthicalComponents } from "@/components/ethical";
export { ReflectionComponents } from "@/components/reflection";

// Hooks
export { useSimulation } from "@/components/providers/SimulationProvider";
export { useEducation } from "@/components/providers/EducationProvider";