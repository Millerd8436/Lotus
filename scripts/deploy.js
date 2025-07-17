#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs').promises;

console.log('🚀 Deploying to Vercel...');

try {
  // Build
  console.log('📦 Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Deploy
  console.log('☁️ Deploying...');
  execSync('vercel --prod --yes', { stdio: 'inherit' });
  
  console.log('✅ Deployment complete!');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
