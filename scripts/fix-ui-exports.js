#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing UI component exports...\n');

const uiComponentsDir = path.join('components', 'ui');

// These components use named exports, not default exports
const namedExportComponents = {
  'Button.tsx': ['Button'],
  'Card.tsx': ['Card', 'ComparisonCard', 'DarkPatternCard', 'PreCheckedCard', 'UrgencyCard'],
  'Checkbox.tsx': ['Checkbox'],
  'Input.tsx': ['Input'],
  'Select.tsx': ['Select', 'SelectContent', 'SelectGroup', 'SelectItem', 'SelectLabel', 'SelectSeparator', 'SelectTrigger', 'SelectValue'],
  'Slider.tsx': ['Slider']
};

// These components use default exports
const defaultExportComponents = [
  'LoadingSpinner.tsx',
  'ModeSelector.tsx',
  'InteractiveElements.tsx',
  'CardSkeleton.tsx'
];

// Generate the proper barrel export
let indexContent = '// Auto-generated barrel export file for UI components\n\n';

// Handle named exports
Object.entries(namedExportComponents).forEach(([file, exports]) => {
  const componentName = path.basename(file, '.tsx');
  indexContent += `export { ${exports.join(', ')} } from './${componentName}';\n`;
});

// Handle default exports
defaultExportComponents.forEach(file => {
  const componentName = path.basename(file, '.tsx');
  indexContent += `export { default as ${componentName} } from './${componentName}';\n`;
});

// Write the updated index file
fs.writeFileSync(path.join(uiComponentsDir, 'index.tsx'), indexContent);
console.log('✅ Fixed UI component exports!\n');

// Now fix app/components.ts
console.log('🔧 Fixing app/components.ts...\n');

const appComponentsContent = `// App-level barrel export for easy imports

export * from "@/components";

// Re-export specific component groups (they export individual components, not a single object)
export * from "@/components/predatory";
export * from "@/components/ethical";
export * from "@/components/reflection";

// Hooks
export { useSimulation } from "@/components/providers/SimulationProvider";
export { useEducation } from "@/components/providers/EducationProvider";
`;

fs.writeFileSync(path.join('app', 'components.ts'), appComponentsContent);
console.log('✅ Fixed app/components.ts!\n');

console.log('✨ All exports fixed!');