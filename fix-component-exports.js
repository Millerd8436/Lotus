const fs = require('fs');
const path = require('path');

console.log(' Checking which components actually exist...\n');

// List of potential exports
const exports = [
  // Main Components
  { name: 'WebsitePhase', path: './WebsitePhase' },
  { name: 'LoadingSpinner', path: './LoadingSpinner' },
  { name: 'DeceptiveCheckoutFlow', path: './DeceptiveCheckoutFlow' },
  
  // UI Components
  { name: 'ModeSelector', path: './ui/ModeSelector' },
  { name: 'ProgressBar', path: './ui/ProgressBar' },
  { name: 'SpeedSlider', path: './ui/SpeedSlider' },
  { name: 'ThemeSwitcher', path: './ui/ThemeSwitcher' },
  
  // Analytics Components
  { name: 'ReflectionDashboard', path: './analytics/ReflectionDashboard' },
  { name: 'MonetizationTracker', path: './analytics/MonetizationTracker' },
  { name: 'RealtimeAnalysisMonitor', path: './analytics/RealtimeAnalysisMonitor' },
  
  // Education Components
  { name: 'Phase3EducationalReflection', path: './Phase3EducationalReflection' },
  
  // Layout Components
  { name: 'FloatingModePanel', path: './FloatingModePanel' }
];

// Check which files exist
const existingExports = [];
exports.forEach(exp => {
  const extensions = ['.tsx', '.ts', '.jsx', '.js'];
  let found = false;
  
  for (const ext of extensions) {
    const filePath = path.join('components', exp.path + ext);
    if (fs.existsSync(filePath)) {
      existingExports.push(exp);
      console.log(` Found: ${filePath}`);
      found = true;
      break;
    }
  }
  
  if (!found) {
    console.log(` Not found: ${exp.path}`);
  }
});

// Generate the index.tsx content
let content = '// Central export file for all components\n\n';

// Group exports by category
const mainComponents = existingExports.filter(e => !e.path.includes('/'));
const uiComponents = existingExports.filter(e => e.path.includes('/ui/'));
const analyticsComponents = existingExports.filter(e => e.path.includes('/analytics/'));

if (mainComponents.length > 0) {
  content += '// Main Components\n';
  mainComponents.forEach(exp => {
    content += `export { default as ${exp.name} } from '${exp.path}';\n`;
  });
  content += '\n';
}

if (uiComponents.length > 0) {
  content += '// UI Components\n';
  uiComponents.forEach(exp => {
    content += `export { default as ${exp.name} } from '${exp.path}';\n`;
  });
  content += '\n';
}

if (analyticsComponents.length > 0) {
  content += '// Analytics Components\n';
  analyticsComponents.forEach(exp => {
    content += `export { default as ${exp.name} } from '${exp.path}';\n`;
  });
}

// Write the file
fs.writeFileSync('components/index.tsx', content);
console.log('\n Created components/index.tsx with only existing components');
console.log(` Total exports: ${existingExports.length}`);
