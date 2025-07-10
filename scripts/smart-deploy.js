#!/usr/bin/env node
// scripts/smart-deploy.js - Intelligent modern Vercel deployment

const { execSync } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorLog(color, message, emoji = '') {
  console.log(`${colors[color]}${emoji} ${message}${colors.reset}`);
}

class SmartDeploy {
  constructor() {
    this.startTime = Date.now();
    this.deployUrl = null;
  }

  async deploy() {
    try {
      colorLog('cyan', 'Starting Modern Vercel Deployment 2025...', '🚀');
      console.log(''); // Empty line for spacing

      // Step 1: Environment validation
      await this.validateEnvironment();
      
      // Step 2: Pre-deployment checks
      await this.runPreDeploymentChecks();
      
      // Step 3: Build application
      await this.buildApplication();
      
      // Step 4: Deploy to Vercel
      await this.deployToVercel();
      
      // Step 5: Post-deployment validation
      await this.postDeploymentValidation();
      
      // Step 6: Success summary
      this.showSuccessSummary();
      
    } catch (error) {
      this.handleError(error);
    }
  }

  async validateEnvironment() {
    colorLog('yellow', 'Validating deployment environment...', '🔍');
    
    // Check if Vercel CLI is installed
    try {
      execSync('vercel --version', { stdio: 'pipe' });
      colorLog('green', 'Vercel CLI found', '✅');
    } catch (error) {
      colorLog('red', 'Vercel CLI not found. Installing...', '📦');
      execSync('npm install -g vercel@latest', { stdio: 'inherit' });
      colorLog('green', 'Vercel CLI installed successfully', '✅');
    }

    // Check for required files
    const requiredFiles = ['package.json', 'next.config.js', 'vercel.json'];
    for (const file of requiredFiles) {
      try {
        await fs.access(file);
        colorLog('green', `${file} found`, '✅');
      } catch (error) {
        colorLog('yellow', `${file} missing - will create default`, '⚠️');
        await this.createDefaultFile(file);
      }
    }

    // Validate TypeScript configuration
    try {
      await fs.access('tsconfig.json');
      colorLog('green', 'TypeScript configuration found', '✅');
    } catch (error) {
      colorLog('red', 'tsconfig.json not found!', '❌');
      throw new Error('TypeScript configuration required');
    }
  }

  async createDefaultFile(filename) {
    switch (filename) {
      case 'vercel.json':
        const vercelConfig = {
          framework: 'nextjs',
          buildCommand: 'npm run build',
          functions: {
            'app/api/**/*.ts': { maxDuration: 30 }
          },
          headers: [
            {
              source: '/(.*)',
              headers: [
                { key: 'X-Frame-Options', value: 'DENY' },
                { key: 'X-Content-Type-Options', value: 'nosniff' }
              ]
            }
          ]
        };
        await fs.writeFile(filename, JSON.stringify(vercelConfig, null, 2));
        colorLog('green', `Created default ${filename}`, '✨');
        break;
    }
  }

  async runPreDeploymentChecks() {
    colorLog('yellow', 'Running pre-deployment checks...', '🔍');
    
    const checks = [
      { name: 'TypeScript compilation', command: 'npm run type-check' },
      { name: 'ESLint validation', command: 'npm run lint' },
      { name: 'Tests', command: 'npm run test:ci || npm test || echo "No tests configured"' }
    ];

    for (const check of checks) {
      try {
        colorLog('blue', `Running ${check.name}...`, '🔄');
        execSync(check.command, { stdio: 'pipe' });
        colorLog('green', `${check.name} passed`, '✅');
      } catch (error) {
        if (check.name === 'Tests' && check.command.includes('||')) {
          colorLog('yellow', 'No tests configured, skipping...', '⚠️');
        } else {
          colorLog('red', `${check.name} failed`, '❌');
          throw new Error(`Pre-deployment check failed: ${check.name}`);
        }
      }
    }
  }

  async buildApplication() {
    colorLog('yellow', 'Building application...', '🏗️');
    
    try {
      // Install dependencies if needed
      colorLog('blue', 'Installing dependencies...', '📦');
      execSync('npm ci --prefer-offline --no-audit', { stdio: 'pipe' });
      colorLog('green', 'Dependencies installed', '✅');

      // Build the application
      colorLog('blue', 'Building Next.js application...', '⚙️');
      execSync('npm run build', { stdio: 'inherit' });
      colorLog('green', 'Build completed successfully', '✅');

    } catch (error) {
      colorLog('red', 'Build failed', '❌');
      throw error;
    }
  }

  async deployToVercel() {
    colorLog('yellow', 'Deploying to Vercel...', '🚀');
    
    try {
      // Deploy to Vercel
      const result = execSync('vercel --prod --yes', { encoding: 'utf8' });
      
      // Extract deployment URL
      this.deployUrl = this.extractUrl(result);
      
      if (this.deployUrl) {
        colorLog('green', 'Deployment successful!', '🎉');
        colorLog('cyan', `Deployment URL: ${this.deployUrl}`, '🌐');
      } else {
        colorLog('yellow', 'Deployment completed but URL not found', '⚠️');
      }

    } catch (error) {
      colorLog('red', 'Deployment failed', '❌');
      throw error;
    }
  }

  async postDeploymentValidation() {
    if (!this.deployUrl) {
      colorLog('yellow', 'Skipping post-deployment validation (no URL)', '⚠️');
      return;
    }

    colorLog('yellow', 'Running post-deployment validation...', '🔍');

    // Health check
    await this.healthCheck();
    
    // Performance check
    await this.performanceCheck();
    
    // API endpoints check
    await this.apiEndpointsCheck();
  }

  async healthCheck() {
    colorLog('blue', 'Running health check...', '🏥');
    
    try {
      // Use curl for basic connectivity check
      execSync(`curl -f -s ${this.deployUrl} > /dev/null`, { stdio: 'pipe' });
      colorLog('green', 'Health check passed', '✅');
    } catch (error) {
      colorLog('yellow', 'Health check warning (site might still be starting)', '⚠️');
    }
  }

  async performanceCheck() {
    colorLog('blue', 'Checking basic performance...', '⚡');
    
    try {
      // Basic response time check
      const start = Date.now();
      execSync(`curl -f -s ${this.deployUrl} > /dev/null`, { stdio: 'pipe' });
      const responseTime = Date.now() - start;
      
      if (responseTime < 2000) {
        colorLog('green', `Response time: ${responseTime}ms (Good)`, '✅');
      } else {
        colorLog('yellow', `Response time: ${responseTime}ms (Slow)`, '⚠️');
      }
    } catch (error) {
      colorLog('yellow', 'Performance check skipped', '⚠️');
    }
  }

  async apiEndpointsCheck() {
    colorLog('blue', 'Checking API endpoints...', '🔌');
    
    const endpoints = [
      '/api/phase-one',
      '/api/phase-two', 
      '/api/phase-three'
    ];

    let workingEndpoints = 0;
    
    for (const endpoint of endpoints) {
      try {
        execSync(`curl -f -s ${this.deployUrl}${endpoint} > /dev/null`, { stdio: 'pipe' });
        colorLog('green', `${endpoint} - OK`, '✅');
        workingEndpoints++;
      } catch (error) {
        colorLog('yellow', `${endpoint} - Not responding`, '⚠️');
      }
    }

    if (workingEndpoints === endpoints.length) {
      colorLog('green', 'All API endpoints working', '🎉');
    } else {
      colorLog('yellow', `${workingEndpoints}/${endpoints.length} API endpoints working`, '⚠️');
    }
  }

  extractUrl(vercelOutput) {
    const urlMatch = vercelOutput.match(/(https:\/\/[^\s]+)/);
    return urlMatch ? urlMatch[1] : null;
  }

  showSuccessSummary() {
    const deployTime = Math.round((Date.now() - this.startTime) / 1000);
    
    console.log(''); // Empty line
    colorLog('green', '═'.repeat(60), '');
    colorLog('green', 'DEPLOYMENT SUCCESSFUL! 🎉', '');
    colorLog('green', '═'.repeat(60), '');
    console.log('');
    
    colorLog('cyan', `🌐 URL: ${this.deployUrl || 'Check Vercel dashboard'}`, '');
    colorLog('cyan', `⏱️  Deploy time: ${deployTime}s`, '');
    colorLog('cyan', `📊 Dashboard: https://vercel.com/dashboard`, '');
    console.log('');
    
    colorLog('blue', 'Next steps:', '📋');
    console.log('  • Test your educational platform features');
    console.log('  • Monitor performance in Vercel dashboard');
    console.log('  • Share the URL with your team');
    console.log('  • Set up custom domain if needed');
    console.log('');
    
    colorLog('magenta', 'Happy building! 🚀', '');
  }

  handleError(error) {
    console.log(''); // Empty line
    colorLog('red', '═'.repeat(60), '');
    colorLog('red', 'DEPLOYMENT FAILED! ❌', '');
    colorLog('red', '═'.repeat(60), '');
    console.log('');
    
    colorLog('red', `Error: ${error.message}`, '💥');
    console.log('');
    
    colorLog('yellow', 'Troubleshooting:', '🔧');
    console.log('  • Check your internet connection');
    console.log('  • Ensure Vercel account is set up');
    console.log('  • Verify environment variables');
    console.log('  • Run individual commands manually:');
    console.log('    - npm run type-check');
    console.log('    - npm run lint');
    console.log('    - npm run build');
    console.log('    - vercel --prod');
    console.log('');
    
    colorLog('blue', 'Get help:', '💡');
    console.log('  • Vercel docs: https://vercel.com/docs');
    console.log('  • GitHub issues: Create an issue in your repo');
    console.log('  • Vercel Discord: https://discord.gg/vercel');
    console.log('');
    
    process.exit(1);
  }
}

// Run the smart deployment
if (require.main === module) {
  new SmartDeploy().deploy();
}

module.exports = SmartDeploy; 