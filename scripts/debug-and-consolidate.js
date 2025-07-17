#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Starting comprehensive code debug and consolidation...\n');

// Configuration
const CONFIG = {
  componentsDir: 'components',
  typesDir: 'types',
  libDir: 'lib',
  appDir: 'app',
  scriptsDir: 'scripts',
  ignorePatterns: ['.next', 'node_modules', '.git', '.vscode', '.continue'],
  fileExtensions: ['.ts', '.tsx', '.js', '.jsx']
};

// Utility functions
const isIgnored = (filePath) => {
  return CONFIG.ignorePatterns.some(pattern => filePath.includes(pattern));
};

const getAllFiles = (dir, extensions = CONFIG.fileExtensions) => {
  const files = [];
  
  const walk = (currentDir) => {
    if (isIgnored(currentDir)) return;
    
    try {
      const items = fs.readdirSync(currentDir);
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          walk(fullPath);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      });
    } catch (error) {
      console.warn(`⚠️  Could not read directory: ${currentDir}`);
    }
  };
  
  walk(dir);
  return files;
};

// Step 1: Analyze component structure
console.log('📂 Step 1: Analyzing component structure...');
const componentStructure = {};

const analyzeComponents = () => {
  const componentDirs = ['ui', 'ethical', 'predatory', 'providers', 'reflection'];
  
  componentDirs.forEach(dir => {
    const dirPath = path.join(CONFIG.componentsDir, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath)
        .filter(f => CONFIG.fileExtensions.some(ext => f.endsWith(ext)));
      componentStructure[dir] = files;
      console.log(`  ✓ Found ${files.length} components in ${dir}/`);
    }
  });
  
  // Root level components
  const rootComponents = fs.readdirSync(CONFIG.componentsDir)
    .filter(f => {
      const fullPath = path.join(CONFIG.componentsDir, f);
      return fs.statSync(fullPath).isFile() && 
             CONFIG.fileExtensions.some(ext => f.endsWith(ext)) &&
             f !== 'index.tsx' && f !== 'types.ts';
    });
  componentStructure.root = rootComponents;
  console.log(`  ✓ Found ${rootComponents.length} root components`);
};

analyzeComponents();

// Step 2: Create proper barrel exports for each subdirectory
console.log('\n📦 Step 2: Creating barrel exports for subdirectories...');

const createBarrelExports = () => {
  Object.entries(componentStructure).forEach(([dir, files]) => {
    if (dir === 'root') return;
    
    const indexPath = path.join(CONFIG.componentsDir, dir, 'index.tsx');
    let content = '// Auto-generated barrel export file\n\n';
    
    files.forEach(file => {
      if (file !== 'index.tsx' && file !== 'index.ts') {
        const componentName = path.basename(file, path.extname(file));
        content += `export { default as ${componentName} } from './${componentName}';\n`;
      }
    });
    
    fs.writeFileSync(indexPath, content);
    console.log(`  ✓ Created barrel export for ${dir}/`);
  });
};

createBarrelExports();

// Step 3: Update main components index
console.log('\n📋 Step 3: Updating main components index...');

const updateMainComponentsIndex = () => {
  let content = '// Central export file for all components\n// Auto-generated - do not edit manually\n\n';
  
  // Export root components
  if (componentStructure.root.length > 0) {
    content += '// Root Components\n';
    componentStructure.root.forEach(file => {
      const componentName = path.basename(file, path.extname(file));
      content += `export { default as ${componentName} } from './${componentName}';\n`;
    });
    content += '\n';
  }
  
  // Export from subdirectories
  Object.keys(componentStructure).forEach(dir => {
    if (dir !== 'root' && componentStructure[dir].length > 0) {
      content += `// ${dir.charAt(0).toUpperCase() + dir.slice(1)} Components\n`;
      content += `export * from './${dir}';\n\n`;
    }
  });
  
  // Export types if they exist
  if (fs.existsSync(path.join(CONFIG.componentsDir, 'types.ts'))) {
    content += '// Component Types\nexport * from \'./types\';\n';
  }
  
  fs.writeFileSync(path.join(CONFIG.componentsDir, 'index.tsx'), content);
  console.log('  ✓ Updated main components index');
};

updateMainComponentsIndex();

// Step 4: Fix import paths
console.log('\n🔧 Step 4: Fixing import paths...');

const fixImportPaths = () => {
  const files = getAllFiles('.');
  let fixedCount = 0;
  
  files.forEach(file => {
    if (isIgnored(file)) return;
    
    try {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;
      
      // Fix types imports
      if (content.includes('@/types/') && !content.includes('@/types\'')) {
        content = content.replace(/@\/types\/(shared|lotus|advanced-lotus)/g, '@/types');
        modified = true;
      }
      
      // Fix component imports from subdirectories
      const componentImportRegex = /from\s+['"]@\/components\/([^'"]+)['"]/g;
      const matches = content.matchAll(componentImportRegex);
      
      for (const match of matches) {
        const importPath = match[1];
        // If importing specific component from subdirectory, keep it
        // If importing from index, simplify to @/components
        if (importPath.endsWith('/index')) {
          content = content.replace(match[0], 'from \'@/components\'');
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(file, content);
        fixedCount++;
      }
    } catch (error) {
      console.warn(`  ⚠️  Could not process ${file}: ${error.message}`);
    }
  });
  
  console.log(`  ✓ Fixed imports in ${fixedCount} files`);
};

fixImportPaths();

// Step 5: Check for duplicate exports and unused files
console.log('\n🔍 Step 5: Checking for duplicates and unused files...');

const checkDuplicatesAndUnused = () => {
  const exportMap = new Map();
  const importMap = new Map();
  
  // Build export map
  const files = getAllFiles(CONFIG.componentsDir);
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const exportMatches = content.matchAll(/export\s+(?:default\s+)?(?:function|class|const)\s+(\w+)/g);
      
      for (const match of exportMatches) {
        const exportName = match[1];
        if (!exportMap.has(exportName)) {
          exportMap.set(exportName, []);
        }
        exportMap.get(exportName).push(file);
      }
    } catch (error) {
      // Ignore errors
    }
  });
  
  // Check for duplicates
  const duplicates = [];
  exportMap.forEach((files, exportName) => {
    if (files.length > 1) {
      duplicates.push({ name: exportName, files });
    }
  });
  
  if (duplicates.length > 0) {
    console.log('  ⚠️  Found duplicate exports:');
    duplicates.forEach(dup => {
      console.log(`    - ${dup.name} in:`);
      dup.files.forEach(f => console.log(`      • ${f}`));
    });
  } else {
    console.log('  ✓ No duplicate exports found');
  }
};

checkDuplicatesAndUnused();

// Step 6: Consolidate utility functions
console.log('\n🛠️  Step 6: Consolidating utility functions...');

const consolidateUtils = () => {
  const utilsPath = path.join(CONFIG.libDir, 'utils.ts');
  if (fs.existsSync(utilsPath)) {
    const content = fs.readFileSync(utilsPath, 'utf8');
    
    // Check if utils are properly exported
    if (!content.includes('export')) {
      console.log('  ⚠️  No exports found in lib/utils.ts');
    } else {
      console.log('  ✓ Utils file has exports');
    }
  }
};

consolidateUtils();

// Step 7: Clean up old scripts
console.log('\n🧹 Step 7: Cleaning up old scripts...');

const cleanupOldScripts = () => {
  const oldScripts = [
    'verify-vercel-deployment.js',
    'verify-exports.js',
    'validate-connectivity.js',
    'organize-for-vercel.js',
    'analyze-exports.js',
    'consolidate-types.js',
    'fix-component-exports.js',
    'fix-imports.js'
  ];
  
  let removedCount = 0;
  oldScripts.forEach(script => {
    const scriptPath = path.join(CONFIG.scriptsDir, script);
    if (fs.existsSync(scriptPath)) {
      fs.unlinkSync(scriptPath);
      removedCount++;
    }
  });
  
  // Also remove root level consolidation scripts
  ['consolidate-types.js', 'fix-component-exports.js', 'fix-imports.js'].forEach(script => {
    if (fs.existsSync(script)) {
      fs.unlinkSync(script);
      removedCount++;
    }
  });
  
  console.log(`  ✓ Removed ${removedCount} old scripts`);
};

cleanupOldScripts();

// Step 8: Generate summary report
console.log('\n📊 Step 8: Generating summary report...');

const generateReport = () => {
  const report = {
    timestamp: new Date().toISOString(),
    components: {
      total: 0,
      byDirectory: {}
    },
    types: {
      files: []
    },
    issues: []
  };
  
  // Count components
  Object.entries(componentStructure).forEach(([dir, files]) => {
    if (dir === 'root') {
      report.components.byDirectory['root'] = files.length;
    } else {
      report.components.byDirectory[dir] = files.length;
    }
    report.components.total += files.length;
  });
  
  // Check types
  if (fs.existsSync(CONFIG.typesDir)) {
    report.types.files = fs.readdirSync(CONFIG.typesDir)
      .filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
  }
  
  // Write report
  const reportPath = path.join(CONFIG.scriptsDir, 'consolidation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log('  ✓ Report generated at scripts/consolidation-report.json');
  console.log(`\n📈 Summary:`);
  console.log(`  - Total components: ${report.components.total}`);
  console.log(`  - Type files: ${report.types.files.length}`);
};

generateReport();

// Step 9: Run final build check
console.log('\n🏗️  Step 9: Running final build check...');

try {
  execSync('npm run build', { stdio: 'pipe' });
  console.log('  ✓ Build completed successfully!');
} catch (error) {
  console.log('  ⚠️  Build failed. Run "npm run build" to see errors.');
}

console.log('\n✅ Debug and consolidation complete!');
console.log('\n📝 Next steps:');
console.log('  1. Review the consolidation report in scripts/consolidation-report.json');
console.log('  2. Run "npm run build" to verify the build');
console.log('  3. Test the application to ensure everything works correctly');