#!/usr/bin/env node

/**
 * 🌸 Lotus Debug Configuration & Issue Tracker
 * 
 * This script helps identify and fix TypeScript/build issues systematically.
 * Run with: node debug.config.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class LotusDebugger {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.fixed = [];
    this.totalFiles = 0;
    this.checkedFiles = 0;
  }

  log(message, type = 'info') {
    const colors = {
      error: '\x1b[31m❌',
      warn: '\x1b[33m⚠️ ',
      success: '\x1b[32m✅',
      info: '\x1b[36mℹ️ ',
      progress: '\x1b[35m🔄'
    };
    const color = colors[type] || colors.info;
    console.log(`${color} ${message}\x1b[0m`);
  }

  async runTypeCheck() {
    this.log('Running TypeScript compilation check...', 'progress');
    try {
      const output = execSync('npx tsc --noEmit', { encoding: 'utf8', stdio: 'pipe' });
      this.log('TypeScript compilation: SUCCESS', 'success');
      return { success: true, output };
    } catch (error) {
      const output = error.stdout || error.message;
      const errorCount = (output.match(/error TS\d+:/g) || []).length;
      this.log(`TypeScript compilation: FAILED (${errorCount} errors)`, 'error');
      return { success: false, output, errorCount };
    }
  }

  async runLintCheck() {
    this.log('Running ESLint check...', 'progress');
    try {
      const output = execSync('npm run lint', { encoding: 'utf8', stdio: 'pipe' });
      this.log('ESLint: PASSED', 'success');
      return { success: true, output };
    } catch (error) {
      const output = error.stdout || error.message;
      const warningCount = (output.match(/Warning:/g) || []).length;
      this.log(`ESLint: ${warningCount} warnings found`, 'warn');
      return { success: true, output, warningCount }; // Warnings don't fail build
    }
  }

  async tryBuild() {
    this.log('Attempting production build...', 'progress');
    try {
      const output = execSync('npm run build', { encoding: 'utf8', stdio: 'pipe' });
      this.log('Build: SUCCESS! 🎉', 'success');
      return { success: true, output };
    } catch (error) {
      const output = error.stdout || error.message;
      this.log('Build: FAILED', 'error');
      return { success: false, output };
    }
  }

  analyzeTypeScriptErrors(output) {
    const lines = output.split('\n');
    const errors = [];
    
    for (const line of lines) {
      if (line.includes('error TS')) {
        const match = line.match(/(.+):(\d+):(\d+) - error TS(\d+): (.+)/);
        if (match) {
          const [, file, lineNum, col, errorCode, message] = match;
          errors.push({
            file: file.replace(process.cwd() + '/', ''),
            line: parseInt(lineNum),
            column: parseInt(col),
            code: errorCode,
            message: message.trim(),
            category: this.categorizeError(errorCode, message)
          });
        }
      }
    }
    
    return errors;
  }

  categorizeError(code, message) {
    if (message.includes('not assignable to parameter of type')) return 'TYPE_MISMATCH';
    if (message.includes('Property') && message.includes('does not exist')) return 'MISSING_PROPERTY';
    if (message.includes('is declared but its value is never read')) return 'UNUSED_VARIABLE';
    if (message.includes('has no initializer')) return 'UNINITIALIZED_PROPERTY';
    if (message.includes('possibly')) return 'UNDEFINED_CHECK';
    return 'OTHER';
  }

  generateFixSuggestions(errors) {
    const suggestions = {
      TYPE_MISMATCH: [
        '• Add type assertions (as Type)',
        '• Update interface definitions to match actual data',
        '• Use union types or optional properties',
        '• Add null/undefined checks'
      ],
      MISSING_PROPERTY: [
        '• Add missing properties to interface',
        '• Make properties optional with ?',
        '• Check for typos in property names'
      ],
      UNUSED_VARIABLE: [
        '• Remove unused variables/imports',
        '• Use underscore prefix for intentionally unused vars',
        '• Remove unused functions'
      ],
      UNINITIALIZED_PROPERTY: [
        '• Initialize in constructor',
        '• Use definite assignment assertion (!)',
        '• Make property optional'
      ],
      UNDEFINED_CHECK: [
        '• Add null/undefined checks',
        '• Use optional chaining (?.)',
        '• Provide default values with ||'
      ]
    };

    return suggestions;
  }

  async checkVSCodeDebugConfig() {
    const launchPath = '.vscode/launch.json';
    const tasksPath = '.vscode/tasks.json';
    
    this.log('Checking VS Code debugging configuration...', 'progress');
    
    if (fs.existsSync(launchPath)) {
      this.log('VS Code launch.json found ✓', 'success');
    } else {
      this.log('VS Code launch.json missing', 'warn');
    }
    
    if (fs.existsSync(tasksPath)) {
      this.log('VS Code tasks.json found ✓', 'success');
    } else {
      this.log('VS Code tasks.json missing', 'warn');
    }
  }

  async generateReport(typeCheckResult, lintResult, buildResult) {
    console.log('\n' + '='.repeat(70));
    this.log('🌸 LOTUS PROJECT DEBUG REPORT', 'info');
    console.log('='.repeat(70));

    // Summary
    console.log('\n📊 SUMMARY:');
    console.log(`TypeScript Errors: ${typeCheckResult.errorCount || 0}`);
    console.log(`ESLint Warnings: ${lintResult.warningCount || 0}`);
    console.log(`Build Status: ${buildResult.success ? 'SUCCESS ✅' : 'FAILED ❌'}`);

    if (typeCheckResult.errorCount > 0) {
      console.log('\n🔍 TYPESCRIPT ERROR ANALYSIS:');
      const errors = this.analyzeTypeScriptErrors(typeCheckResult.output);
      
      // Group by file
      const errorsByFile = {};
      errors.forEach(error => {
        if (!errorsByFile[error.file]) errorsByFile[error.file] = [];
        errorsByFile[error.file].push(error);
      });

      Object.entries(errorsByFile).forEach(([file, fileErrors]) => {
        console.log(`\n📁 ${file} (${fileErrors.length} errors):`);
        fileErrors.forEach((error, i) => {
          console.log(`   ${i + 1}. Line ${error.line}: ${error.message}`);
          console.log(`      Category: ${error.category}`);
        });
      });

      console.log('\n💡 FIX SUGGESTIONS:');
      const suggestions = this.generateFixSuggestions(errors);
      const categories = [...new Set(errors.map(e => e.category))];
      
      categories.forEach(category => {
        if (suggestions[category]) {
          console.log(`\n${category}:`);
          suggestions[category].forEach(suggestion => {
            console.log(`  ${suggestion}`);
          });
        }
      });
    }

    console.log('\n🛠️  NEXT STEPS:');
    if (typeCheckResult.errorCount > 0) {
      console.log('1. Fix TypeScript errors first (they prevent builds)');
      console.log('2. Use: npm run type-check to verify fixes');
      console.log('3. Then run: npm run build to test production build');
    } else {
      console.log('1. TypeScript is clean! ✅');
      console.log('2. Run: npm run dev to start development server');
      console.log('3. Run: npm run build to create production build');
    }

    if (lintResult.warningCount > 0) {
      console.log(`4. Address ${lintResult.warningCount} ESLint warnings for code quality`);
    }

    console.log('\n🚀 DEVELOPMENT COMMANDS:');
    console.log('npm run dev           # Start development server');
    console.log('npm run type-check    # Check TypeScript without building');
    console.log('npm run lint          # Check code quality');
    console.log('npm run build         # Production build');
    console.log('node debug.config.js  # Run this debug report again');

    console.log('\n📚 DEBUGGING RESOURCES:');
    console.log('• VS Code: Use F5 to start debugging with launch.json');
    console.log('• Browser DevTools: F12 to inspect client-side issues');
    console.log('• Next.js Docs: https://nextjs.org/docs/debugging');
    console.log('• TypeScript Handbook: https://www.typescriptlang.org/docs/');
  }

  async run() {
    console.clear();
    this.log('🌸 Starting Lotus Debug Analysis...', 'info');
    
    // Check VS Code config
    await this.checkVSCodeDebugConfig();
    
    // Run checks
    const typeCheckResult = await this.runTypeCheck();
    const lintResult = await this.runLintCheck();
    const buildResult = await this.tryBuild();
    
    // Generate comprehensive report
    await this.generateReport(typeCheckResult, lintResult, buildResult);
    
    console.log('\n' + '='.repeat(70) + '\n');
  }
}

// Run if called directly
if (require.main === module) {
  const debugger = new LotusDebugger();
  debugger.run().catch(console.error);
}

module.exports = LotusDebugger;
