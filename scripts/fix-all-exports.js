#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing all component exports comprehensively...\n');

// Components that use named exports (not default)
const namedExportComponents = {
  'LazyLoadComponents': ['LazyDeceptiveCheckoutFlow', 'LazyWebsitePhase'],
  'LotusStyles': ['simulatorCSS']
};

// Provider components that use named exports
const providerNamedExports = {
  'EducationProvider': ['EducationProvider', 'EducationalOverlay', 'useEducation'],
  'SimulationProvider': ['SimulationProvider', 'useSimulation']
};

// Step 1: Fix root component exports
console.log('📝 Step 1: Fixing root component exports...');

const componentsIndexPath = path.join('components', 'index.tsx');
let componentsContent = fs.readFileSync(componentsIndexPath, 'utf8');

// Fix named export components
Object.entries(namedExportComponents).forEach(([file, exports]) => {
  const regex = new RegExp(`export \\{ default as ${file} \\} from '\\.\\/${file}';`);
  const replacement = `export { ${exports.join(', ')} } from './${file}';`;
  componentsContent = componentsContent.replace(regex, replacement);
});

fs.writeFileSync(componentsIndexPath, componentsContent);
console.log('  ✓ Fixed root component exports');

// Step 2: Fix provider exports
console.log('\n📝 Step 2: Fixing provider exports...');

const providersIndexPath = path.join('components', 'providers', 'index.tsx');
let providersContent = '// Auto-generated barrel export file\n\n';

// Handle provider exports
fs.readdirSync(path.join('components', 'providers')).forEach(file => {
  if (file.endsWith('.tsx') && file !== 'index.tsx') {
    const componentName = path.basename(file, '.tsx');
    
    if (providerNamedExports[componentName]) {
      // Named exports
      providersContent += `export { ${providerNamedExports[componentName].join(', ')} } from './${componentName}';\n`;
    } else {
      // Default export
      providersContent += `export { default as ${componentName} } from './${componentName}';\n`;
    }
  }
});

fs.writeFileSync(providersIndexPath, providersContent);
console.log('  ✓ Fixed provider exports');

// Step 3: Re-run the main consolidation to ensure consistency
console.log('\n📝 Step 3: Running main consolidation...');

const { execSync } = require('child_process');
execSync('node scripts/debug-and-consolidate.js', { stdio: 'inherit' });

console.log('\n✨ All exports fixed!');
console.log('\n📋 Summary of changes:');
console.log('  - Fixed LazyLoadComponents exports (now exports individual lazy components)');
console.log('  - Fixed LotusStyles exports (now exports simulatorCSS)');
console.log('  - Fixed provider exports (now exports named functions/components)');
console.log('\n🚀 Run "npm run build" to verify everything compiles correctly!');