// App-level barrel export for easy imports

export * from "@/components";

// Re-export specific component groups
export * from "@/components/ethical";
export { ReflectionComponents } from "@/components/reflection";

// Hooks
export { useEducation } from "@/components/providers/EducationProvider";
export { useSimulation } from "@/components/providers/SimulationProvider";
