#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Lotus Vercel Deployment Script');
console.log('==================================');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Make sure you\'re in the project root.');
  process.exit(1);
}

// Check if app directory exists and has required files
const requiredFiles = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/globals.css'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Required file missing: ${file}`);
    process.exit(1);
  }
}

console.log('✅ Project structure validated');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    execSync('rmdir /s /q .next', { stdio: 'inherit', shell: true });
  }
  
  // Run type check
  console.log('🔍 Running TypeScript type check...');
  execSync('npm run type-check', { stdio: 'inherit' });
  
  // Run lint
  console.log('🧹 Running linter...');
  execSync('npm run lint', { stdio: 'inherit' });
  
  // Test build
  console.log('🏗️  Testing build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build successful! Ready for deployment.');
  
  // Deploy to Vercel
  console.log('🚀 Deploying to Vercel...');
  execSync('npx vercel --prod', { stdio: 'inherit' });
  
  console.log('🎉 Deployment complete!');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} 