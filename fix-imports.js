const fs = require('fs');
const path = require('path');

console.log(' Fixing type imports...');

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !['node_modules', '.next'].includes(file)) {
      fixImports(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = false;
      
      if (content.includes('@/types/shared') || content.includes('@/types/lotus') || content.includes('@/types/advanced-lotus')) {
        content = content.replace(/@\/types\/(shared|lotus|advanced-lotus)/g, '@/types');
        updated = true;
      }
      
      if (updated) {
        fs.writeFileSync(fullPath, content);
        console.log(` Fixed imports in: ${file}`);
      }
    }
  });
}

// Fix imports in all directories
['app', 'components', 'lib'].forEach(dir => {
  if (fs.existsSync(dir)) {
    fixImports(dir);
  }
});

console.log(' All imports fixed!');
