const fs = require('fs');
const path = require('path');

console.log('--- Running Project Linter ---');

const componentsDir = path.join(__dirname, '..', 'components');
const fileMap = new Map();
const duplicates = [];
const emptyDirs = [];

function scanDir(directory) {
  const files = fs.readdirSync(directory);

  if (files.length === 0) {
    emptyDirs.push(directory);
  }

  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else {
      if (fileMap.has(file)) {
        duplicates.push({
          file,
          paths: [fileMap.get(file), fullPath],
        });
      } else {
        fileMap.set(file, fullPath);
      }
    }
  });
}

scanDir(componentsDir);

console.log('\n--- Scan Complete ---');

if (duplicates.length > 0) {
  console.log('\n🔴 Found Duplicate Files:');
  duplicates.forEach(dup => {
    console.log(`  - File: ${dup.file}`);
    dup.paths.forEach(p => console.log(`    - Path: ${path.relative(path.join(__dirname, '..'), p)}`));
  });
} else {
  console.log('\n🟢 No duplicate files found.');
}

if (emptyDirs.length > 0) {
    console.log('\n🟡 Found Empty Directories:');
    emptyDirs.forEach(dir => {
        console.log(`  - ${path.relative(path.join(__dirname, '..'), dir)}`);
    });
} else {
    console.log('\n🟢 No empty directories found.');
}

console.log('\n--- End of Report ---'); 