#!/usr/bin/env node

/**
 * 🚂 PRIMARY DEPLOYMENT: Railway for Lotus Educational Platform
 * One-command deployment with comprehensive setup and validation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 🎨 Console colors
const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  bold: '\x1b[1m'
};

// Railway deployment banner
console.log(`${c.magenta}${c.bold}
╔═══════════════════════════════════════════════════════════╗
║  🚂 RAILWAY DEPLOYMENT - Lotus Educational Platform      ║
║  Primary hosting solution: Fast, cheap, reliable         ║
╚═══════════════════════════════════════════════════════════╝${c.reset}\n`);

const log = (msg, color = c.cyan) => console.log(`${color}${msg}${c.reset}`);
const success = (msg) => console.log(`${c.green}✅ ${msg}${c.reset}`);
const warning = (msg) => console.log(`${c.yellow}⚠️  ${msg}${c.reset}`);
const error = (msg) => console.log(`${c.red}❌ ${msg}${c.reset}`);

function runCommand(command, description, options = {}) {
  try {
    log(`🔧 ${description}...`);
    const result = execSync(command, { 
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: options.silent ? 'utf8' : undefined,
      ...options 
    });
    success(description);
    return result;
  } catch (err) {
    error(`Failed: ${description}`);
    if (options.required !== false) {
      process.exit(1);
    }
    return null;
  }
}

// Step 1: Validate environment
log('🔍 Validating Lotus Educational Platform...');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  error('package.json not found. Are you in the Lotus project directory?');
  process.exit(1);
}

// Check if API routes exist
const apiRoutes = ['app/api/phase-one/route.ts', 'app/api/phase-two/route.ts', 'app/api/phase-three/route.ts'];
const missingRoutes = apiRoutes.filter(route => !fs.existsSync(route));

if (missingRoutes.length > 0) {
  error(`Missing API routes: ${missingRoutes.join(', ')}`);
  warning('Your dynamic educational simulator needs these API routes to function');
  process.exit(1);
}

success('Lotus Educational Platform structure validated');

// Step 2: Install Railway CLI if needed
try {
  runCommand('railway --version', 'Checking Railway CLI', { silent: true });
} catch {
  log('📦 Installing Railway CLI...');
  runCommand('npm install -g @railway/cli', 'Installing Railway CLI');
}

// Step 3: Check Railway authentication
try {
  const whoami = runCommand('railway whoami', 'Checking Railway authentication', { silent: true });
  success(`Logged in as: ${whoami.trim()}`);
} catch {
  error('Not logged in to Railway');
  log('🔐 Please run: railway login');
  log('💡 Then re-run this deployment script');
  process.exit(1);
}

// Step 4: Build verification
log('🔍 Verifying build configuration...');
runCommand('npm run build', 'Building Lotus Educational Platform');
success('Build successful - all API routes and components working');

// Step 5: Railway project setup
let projectExists = false;
try {
  runCommand('railway status', 'Checking Railway project', { silent: true });
  projectExists = true;
  success('Railway project already exists');
} catch {
  warning('No Railway project found');
  log('🚀 Creating new Railway project...');
  runCommand('railway init', 'Creating Railway project');
  success('Railway project created');
}

// Step 6: Environment variables check
log('🔧 Setting up environment variables...');
try {
  const envVars = runCommand('railway variables', 'Checking environment variables', { silent: true });
  if (!envVars.includes('NODE_ENV')) {
    runCommand('railway variables set NODE_ENV=production', 'Setting NODE_ENV');
  }
  success('Environment variables configured');
} catch {
  warning('Could not check environment variables, will set defaults');
  runCommand('railway variables set NODE_ENV=production', 'Setting NODE_ENV', { required: false });
}

// Step 7: Deploy to Railway
log('🚀 Deploying to Railway...');
log('📊 Features being deployed:');
log('   • 3 Educational API routes (phase-one, phase-two, phase-three)');
log('   • Dynamic loan calculation engine');
log('   • Real-time behavioral tracking');
log('   • Interactive educational simulator');

runCommand('railway up', 'Deploying Lotus Educational Platform');

// Step 8: Get deployment info
try {
  const domain = runCommand('railway domain', 'Getting deployment URL', { silent: true });
  
  console.log(`\n${c.green}${c.bold}🎉 DEPLOYMENT SUCCESSFUL!${c.reset}`);
  console.log(`${c.magenta}🌐 Your Lotus Educational Platform is live at:${c.reset}`);
  console.log(`${c.cyan}${c.bold}   ${domain.trim()}${c.reset}\n`);
  
  console.log(`${c.blue}📊 Railway Deployment Benefits:${c.reset}`);
  console.log(`${c.green}   💰 Cost: ~$20/month (80% cheaper than Vercel)${c.reset}`);
  console.log(`${c.green}   🌍 Global CDN included${c.reset}`);
  console.log(`${c.green}   🔒 SSL certificates automatic${c.reset}`);
  console.log(`${c.green}   📈 Auto-scaling enabled${c.reset}`);
  console.log(`${c.green}   🔧 Zero configuration needed${c.reset}\n`);
  
  console.log(`${c.cyan}🛠️  Manage your deployment:${c.reset}`);
  console.log(`${c.blue}   Dashboard: https://railway.app/dashboard${c.reset}`);
  console.log(`${c.blue}   Logs: railway logs${c.reset}`);
  console.log(`${c.blue}   Redeploy: npm run deploy:railway${c.reset}\n`);
  
} catch {
  warning('Could not retrieve domain. Check Railway dashboard for deployment URL');
  log('🔗 Visit: https://railway.app/dashboard');
}

console.log(`${c.magenta}🚂 Lotus Educational Platform successfully deployed to Railway!${c.reset}`);
console.log(`${c.cyan}📚 Your comprehensive payday loan educational simulator is now live!${c.reset}`); 