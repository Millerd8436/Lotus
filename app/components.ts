// App-level barrel export for easy imports

export * from "@/components";

// Re-export specific component groups (they export individual components, not a single object)
export * from "@/components/predatory";
export * from "@/components/ethical";
export * from "@/components/reflection";

// Hooks
export { useSimulation } from "@/components/providers/SimulationProvider";
export { useEducation } from "@/components/providers/EducationProvider";
