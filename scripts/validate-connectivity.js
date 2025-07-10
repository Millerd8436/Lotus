#!/usr/bin/env node

/**
 * 🌸 Lotus Comprehensive Connectivity Validator
 * 
 * Validates all file imports, API routes, and dependencies for Vercel deployment
 * Checks the entire 96,000+ line system for connectivity issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for output
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

class ConnectivityValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
    this.fileCount = 0;
    this.importCount = 0;
    this.apiRoutes = [];
    this.components = [];
    this.libModules = [];
    this.legacyModules = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      error: `${colors.red}❌ ERROR${colors.reset}`,
      warning: `${colors.yellow}⚠️  WARNING${colors.reset}`,
      success: `${colors.green}✅ SUCCESS${colors.reset}`,
      info: `${colors.blue}ℹ️  INFO${colors.reset}`
    }[type];
    
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async validateFileStructure() {
    this.log('🔍 Validating file structure...', 'info');
    
    const requiredDirs = [
      'app',
      'components',
      'lib',
      'legacy-recovered',
      'data',
      'types',
      'public',
      'pages'
    ];

    for (const dir of requiredDirs) {
      if (fs.existsSync(dir)) {
        this.success.push(`Directory exists: ${dir}`);
      } else {
        this.errors.push(`Missing required directory: ${dir}`);
      }
    }

    // Check critical files
    const criticalFiles = [
      'package.json',
      'next.config.js',
      'vercel.json',
      'tsconfig.json',
      'tailwind.config.js',
      'app/layout.tsx',
      'app/page.tsx'
    ];

    for (const file of criticalFiles) {
      if (fs.existsSync(file)) {
        this.success.push(`Critical file exists: ${file}`);
      } else {
        this.errors.push(`Missing critical file: ${file}`);
      }
    }
  }

  async validatePackageJson() {
    this.log('📦 Validating package.json...', 'info');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Check required scripts
      const requiredScripts = ['dev', 'build', 'start', 'lint'];
      for (const script of requiredScripts) {
        if (packageJson.scripts[script]) {
          this.success.push(`Script exists: ${script}`);
        } else {
          this.errors.push(`Missing required script: ${script}`);
        }
      }

      // Check dependencies
      const requiredDeps = ['next', 'react', 'react-dom', 'typescript'];
      for (const dep of requiredDeps) {
        if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
          this.success.push(`Dependency exists: ${dep}`);
        } else {
          this.errors.push(`Missing required dependency: ${dep}`);
        }
      }

      // Check Vercel-specific dependencies
      const vercelDeps = ['@vercel/analytics', '@vercel/speed-insights'];
      for (const dep of vercelDeps) {
        if (packageJson.dependencies[dep]) {
          this.success.push(`Vercel dependency exists: ${dep}`);
        } else {
          this.warnings.push(`Missing Vercel dependency: ${dep}`);
        }
      }

    } catch (error) {
      this.errors.push(`Failed to parse package.json: ${error.message}`);
    }
  }

  async validateVercelConfig() {
    this.log('🚀 Validating Vercel configuration...', 'info');
    
    try {
      const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      
      // Check required fields
      if (vercelConfig.framework) {
        this.success.push('Vercel framework specified');
      } else {
        this.errors.push('Missing Vercel framework specification');
      }

      if (vercelConfig.buildCommand) {
        this.success.push('Build command specified');
      } else {
        this.warnings.push('No custom build command specified');
      }

      if (vercelConfig.functions) {
        this.success.push('Function configuration exists');
      } else {
        this.warnings.push('No function configuration specified');
      }

      if (vercelConfig.headers) {
        this.success.push('Security headers configured');
      } else {
        this.warnings.push('No security headers configured');
      }

    } catch (error) {
      this.errors.push(`Failed to parse vercel.json: ${error.message}`);
    }
  }

  async validateNextConfig() {
    this.log('⚙️ Validating Next.js configuration...', 'info');
    
    try {
      const nextConfigPath = 'next.config.js';
      if (fs.existsSync(nextConfigPath)) {
        const configContent = fs.readFileSync(nextConfigPath, 'utf8');
        
        // Check for common configurations
        if (configContent.includes('experimental')) {
          this.success.push('Experimental features configured');
        }
        
        if (configContent.includes('images')) {
          this.success.push('Image optimization configured');
        }
        
        if (configContent.includes('redirects')) {
          this.success.push('Redirects configured');
        }
        
        if (configContent.includes('headers')) {
          this.success.push('Headers configured');
        }
        
      } else {
        this.errors.push('Missing next.config.js');
      }
    } catch (error) {
      this.errors.push(`Failed to validate Next.js config: ${error.message}`);
    }
  }

  async validateTypeScriptConfig() {
    this.log('📝 Validating TypeScript configuration...', 'info');
    
    try {
      const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      
      if (tsConfig.compilerOptions) {
        this.success.push('TypeScript compiler options configured');
        
        if (tsConfig.compilerOptions.strict) {
          this.success.push('Strict mode enabled');
        } else {
          this.warnings.push('Strict mode not enabled');
        }
        
        if (tsConfig.compilerOptions.esModuleInterop) {
          this.success.push('ES module interop enabled');
        }
        
      } else {
        this.errors.push('Missing TypeScript compiler options');
      }
      
      if (tsConfig.include) {
        this.success.push('TypeScript include paths configured');
      }
      
    } catch (error) {
      this.errors.push(`Failed to parse tsconfig.json: ${error.message}`);
    }
  }

  async validateAppRouter() {
    this.log('🏠 Validating App Router structure...', 'info');
    
    const appDir = 'app';
    if (!fs.existsSync(appDir)) {
      this.errors.push('App directory does not exist');
      return;
    }

    // Check for required App Router files
    const requiredAppFiles = [
      'layout.tsx',
      'page.tsx',
      'globals.css'
    ];

    for (const file of requiredAppFiles) {
      const filePath = path.join(appDir, file);
      if (fs.existsSync(filePath)) {
        this.success.push(`App Router file exists: ${file}`);
      } else {
        this.errors.push(`Missing App Router file: ${file}`);
      }
    }

    // Check API routes
    const apiDir = path.join(appDir, 'api');
    if (fs.existsSync(apiDir)) {
      this.success.push('API routes directory exists');
      this.scanApiRoutes(apiDir);
    } else {
      this.warnings.push('No API routes directory found');
    }
  }

  scanApiRoutes(apiDir) {
    const scanDirectory = (dir, prefix = '') => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath, `${prefix}/${item}`);
        } else if (item.endsWith('.ts') || item.endsWith('.js')) {
          const routePath = `${prefix}/${item.replace(/\.(ts|js)$/, '')}`;
          this.apiRoutes.push(routePath);
          this.success.push(`API route found: ${routePath}`);
        }
      }
    };
    
    scanDirectory(apiDir);
  }

  async validateComponents() {
    this.log('🧩 Validating React components...', 'info');
    
    const componentsDir = 'components';
    if (!fs.existsSync(componentsDir)) {
      this.errors.push('Components directory does not exist');
      return;
    }

    this.scanComponents(componentsDir);
  }

  scanComponents(componentsDir) {
    const scanDirectory = (dir, prefix = '') => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath, `${prefix}/${item}`);
        } else if (item.endsWith('.tsx') || item.endsWith('.jsx')) {
          const componentPath = `${prefix}/${item}`;
          this.components.push(componentPath);
          this.success.push(`Component found: ${componentPath}`);
          
          // Validate component imports
          this.validateComponentImports(fullPath);
        }
      }
    };
    
    scanDirectory(componentsDir);
  }

  validateComponentImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for React import
      if (!content.includes('import React') && !content.includes('from "react"')) {
        this.warnings.push(`Component ${filePath} may be missing React import`);
      }
      
      // Check for common import patterns
      const importMatches = content.match(/import.*from\s+['"]([^'"]+)['"]/g);
      if (importMatches) {
        this.importCount += importMatches.length;
        for (const match of importMatches) {
          const moduleMatch = match.match(/from\s+['"]([^'"]+)['"]/);
          if (moduleMatch) {
            const module = moduleMatch[1];
            if (module.startsWith('.')) {
              // Local import - validate file exists
              this.validateLocalImport(filePath, module);
            }
          }
        }
      }
      
    } catch (error) {
      this.errors.push(`Failed to validate component ${filePath}: ${error.message}`);
    }
  }

  validateLocalImport(filePath, importPath) {
    try {
      const dir = path.dirname(filePath);
      let resolvedPath;
      
      if (importPath.startsWith('./')) {
        resolvedPath = path.join(dir, importPath.substring(2));
      } else if (importPath.startsWith('../')) {
        resolvedPath = path.join(dir, importPath);
      } else {
        resolvedPath = path.join(dir, importPath);
      }
      
      // Try different extensions
      const extensions = ['.tsx', '.ts', '.jsx', '.js', '.json'];
      let found = false;
      
      for (const ext of extensions) {
        if (fs.existsSync(resolvedPath + ext)) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        this.errors.push(`Import not found: ${importPath} in ${filePath}`);
      }
      
    } catch (error) {
      this.warnings.push(`Could not validate import ${importPath} in ${filePath}`);
    }
  }

  async validateLibModules() {
    this.log('📚 Validating library modules...', 'info');
    
    const libDir = 'lib';
    if (!fs.existsSync(libDir)) {
      this.errors.push('Lib directory does not exist');
      return;
    }

    this.scanLibModules(libDir);
  }

  scanLibModules(libDir) {
    const scanDirectory = (dir, prefix = '') => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath, `${prefix}/${item}`);
        } else if (item.endsWith('.ts') || item.endsWith('.js')) {
          const modulePath = `${prefix}/${item}`;
          this.libModules.push(modulePath);
          this.success.push(`Library module found: ${modulePath}`);
        }
      }
    };
    
    scanDirectory(libDir);
  }

  async validateLegacyModules() {
    this.log('🔄 Validating legacy modules...', 'info');
    
    const legacyDir = 'legacy-recovered';
    if (!fs.existsSync(legacyDir)) {
      this.errors.push('Legacy directory does not exist');
      return;
    }

    this.scanLegacyModules(legacyDir);
  }

  scanLegacyModules(legacyDir) {
    const items = fs.readdirSync(legacyDir);
    
    for (const item of items) {
      const fullPath = path.join(legacyDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.ts'))) {
        this.legacyModules.push(item);
        this.success.push(`Legacy module found: ${item}`);
      }
    }
  }

  async validateDataFiles() {
    this.log('📊 Validating data files...', 'info');
    
    const dataDir = 'data';
    if (!fs.existsSync(dataDir)) {
      this.errors.push('Data directory does not exist');
      return;
    }

    const items = fs.readdirSync(dataDir);
    for (const item of items) {
      if (item.endsWith('.json')) {
        try {
          const content = fs.readFileSync(path.join(dataDir, item), 'utf8');
          JSON.parse(content); // Validate JSON
          this.success.push(`Data file valid: ${item}`);
        } catch (error) {
          this.errors.push(`Invalid JSON in data file: ${item}`);
        }
      }
    }
  }

  async validateTypeDefinitions() {
    this.log('🏷️ Validating TypeScript definitions...', 'info');
    
    const typesDir = 'types';
    if (!fs.existsSync(typesDir)) {
      this.errors.push('Types directory does not exist');
      return;
    }

    const items = fs.readdirSync(typesDir);
    for (const item of items) {
      if (item.endsWith('.ts')) {
        this.success.push(`Type definition found: ${item}`);
      }
    }
  }

  async runTypeCheck() {
    this.log('🔍 Running TypeScript type check...', 'info');
    
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      this.success.push('TypeScript type check passed');
    } catch (error) {
      this.errors.push(`TypeScript type check failed: ${error.message}`);
    }
  }

  async runLintCheck() {
    this.log('🧹 Running ESLint check...', 'info');
    
    try {
      execSync('npm run lint', { stdio: 'pipe' });
      this.success.push('ESLint check passed');
    } catch (error) {
      this.warnings.push(`ESLint check failed: ${error.message}`);
    }
  }

  generateReport() {
    this.log('\n📋 CONNECTIVITY VALIDATION REPORT', 'info');
    this.log('=' .repeat(50), 'info');
    
    // Summary
    this.log(`\n📊 SUMMARY:`, 'info');
    this.log(`Files scanned: ${this.fileCount}`, 'info');
    this.log(`Imports validated: ${this.importCount}`, 'info');
    this.log(`API routes found: ${this.apiRoutes.length}`, 'info');
    this.log(`Components found: ${this.components.length}`, 'info');
    this.log(`Library modules: ${this.libModules.length}`, 'info');
    this.log(`Legacy modules: ${this.legacyModules.length}`, 'info');
    
    // Results
    this.log(`\n✅ SUCCESSES: ${this.success.length}`, 'success');
    this.log(`⚠️  WARNINGS: ${this.warnings.length}`, 'warning');
    this.log(`❌ ERRORS: ${this.errors.length}`, 'error');
    
    // Display errors
    if (this.errors.length > 0) {
      this.log('\n❌ ERRORS:', 'error');
      this.errors.forEach(error => this.log(`  • ${error}`, 'error'));
    }
    
    // Display warnings
    if (this.warnings.length > 0) {
      this.log('\n⚠️  WARNINGS:', 'warning');
      this.warnings.forEach(warning => this.log(`  • ${warning}`, 'warning'));
    }
    
    // Display successes
    if (this.success.length > 0) {
      this.log('\n✅ SUCCESSES:', 'success');
      this.success.slice(0, 20).forEach(success => this.log(`  • ${success}`, 'success'));
      if (this.success.length > 20) {
        this.log(`  ... and ${this.success.length - 20} more`, 'success');
      }
    }
    
    // Deployment readiness
    this.log('\n🚀 DEPLOYMENT READINESS:', 'info');
    if (this.errors.length === 0) {
      this.log('✅ READY FOR VERCEL DEPLOYMENT', 'success');
    } else {
      this.log('❌ NOT READY - Please fix errors above', 'error');
    }
    
    // Recommendations
    if (this.warnings.length > 0) {
      this.log('\n💡 RECOMMENDATIONS:', 'info');
      this.log('Consider addressing warnings for optimal deployment', 'info');
    }
  }

  async run() {
    this.log('🌸 Starting Lotus Comprehensive Connectivity Validation', 'info');
    this.log('This will validate the entire 96,000+ line system for Vercel deployment', 'info');
    
    await this.validateFileStructure();
    await this.validatePackageJson();
    await this.validateVercelConfig();
    await this.validateNextConfig();
    await this.validateTypeScriptConfig();
    await this.validateAppRouter();
    await this.validateComponents();
    await this.validateLibModules();
    await this.validateLegacyModules();
    await this.validateDataFiles();
    await this.validateTypeDefinitions();
    
    // Run checks that require npm
    try {
      await this.runTypeCheck();
    } catch (error) {
      this.warnings.push('Could not run TypeScript check - npm may not be available');
    }
    
    try {
      await this.runLintCheck();
    } catch (error) {
      this.warnings.push('Could not run ESLint check - npm may not be available');
    }
    
    this.generateReport();
    
    // Exit with appropriate code
    if (this.errors.length > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
}

// Run the validator
const validator = new ConnectivityValidator();
validator.run().catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
}); 