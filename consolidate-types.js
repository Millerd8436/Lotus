const fs = require('fs');
const path = require('path');

console.log(' Starting type consolidation...');

// Check if types directory exists
if (!fs.existsSync('types')) {
  console.log(' No types directory found!');
  process.exit(1);
}

// Read existing type files
const typeFiles = ['types/lotus.ts', 'types/shared.ts', 'types/advanced-lotus.ts'];
let consolidatedContent = `/**
 *  LOTUS PLATFORM - CONSOLIDATED TYPES
 * All TypeScript interfaces in one file
 */

`;

// Merge all type files
typeFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    consolidatedContent += content + '\n\n';
    console.log(` Read: ${file}`);
  }
});

// Write consolidated file
fs.writeFileSync('types/index.ts', consolidatedContent);
console.log(' Created types/index.ts');

// Delete old files
typeFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`  Deleted: ${file}`);
  }
});

// Clean up scripts
const scriptsToDelete = [
  'scripts/verify-vercel-deployment.js',
  'scripts/verify-exports.js',
  'scripts/validate-connectivity.js',
  'scripts/organize-for-vercel.js',
  'scripts/analyze-exports.js'
];

scriptsToDelete.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`  Deleted: ${file}`);
  }
});

console.log('\n Consolidation complete!');
