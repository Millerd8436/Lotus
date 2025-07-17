#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 Running validation...');

try {
  // Type check
  console.log('📝 Type checking...');
  execSync('tsc --noEmit', { stdio: 'pipe' });
  console.log('✅ Types OK');
  
  // Lint
  console.log('🧹 Linting...');
  execSync('next lint', { stdio: 'pipe' });
  console.log('✅ Linting OK');
  
  console.log('✅ All validations passed!');
} catch (error) {
  console.error('❌ Validation failed');
  process.exit(1);
}
