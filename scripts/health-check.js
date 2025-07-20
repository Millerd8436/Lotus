const fs = require("fs");
const path = require("path");

console.log("🏥 Running Lotus Project Health Check...\n");

const healthReport = {
  status: "healthy",
  errors: [],
  warnings: [],
  info: [],
};

// Check 1: Required directories exist
console.log("📁 Checking directory structure...");
const requiredDirs = [
  "app",
  "components",
  "data",
  "lib",
  "types",
  "scripts",
  "public",
];
requiredDirs.forEach((dir) => {
  if (!fs.existsSync(path.join(__dirname, "..", dir))) {
    healthReport.errors.push(`Missing required directory: ${dir}`);
    healthReport.status = "unhealthy";
  }
});

// Check 2: Essential files exist
console.log("📄 Checking essential files...");
const essentialFiles = [
  "package.json",
  "tsconfig.json",
  "next.config.js",
  "tailwind.config.js",
  "app/layout.tsx",
  "app/page.tsx",
  "types/index.ts",
];
essentialFiles.forEach((file) => {
  if (!fs.existsSync(path.join(__dirname, "..", file))) {
    healthReport.errors.push(`Missing essential file: ${file}`);
    healthReport.status = "unhealthy";
  }
});

// Check 3: No duplicate exports
console.log("🔍 Checking for duplicate exports...");
const componentsIndex = path.join(__dirname, "..", "components", "index.tsx");
if (fs.existsSync(componentsIndex)) {
  const content = fs.readFileSync(componentsIndex, "utf8");
  const exports = content.match(/export\s*{\s*default\s+as\s+(\w+)\s*}/g) || [];
  const exportNames = exports
    .map((e) => e.match(/as\s+(\w+)/)?.[1])
    .filter(Boolean);
  const duplicates = exportNames.filter(
    (item, index) => exportNames.indexOf(item) !== index
  );
  if (duplicates.length > 0) {
    healthReport.warnings.push(
      `Duplicate exports found: ${duplicates.join(", ")}`
    );
  }
}

// Check 4: Type consistency
console.log("🎯 Checking type consistency...");
const typesFile = path.join(__dirname, "..", "types", "index.ts");
if (fs.existsSync(typesFile)) {
  const typesContent = fs.readFileSync(typesFile, "utf8");
  const todoCount = (typesContent.match(/TODO:/g) || []).length;
  const commentedCount = (typesContent.match(/\/\/ export/g) || []).length;

  if (todoCount > 10) {
    healthReport.warnings.push(`High number of TODOs in types (${todoCount})`);
  }
  if (commentedCount > 20) {
    healthReport.warnings.push(
      `Many commented exports in types (${commentedCount})`
    );
  }
}

// Check 5: Import consistency
console.log("🔗 Checking import consistency...");
let importIssues = 0;
function checkImports(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !["node_modules", ".next", ".git"].includes(file)
    ) {
      checkImports(fullPath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (
        content.includes("@/types/shared") ||
        content.includes("@/types/lotus")
      ) {
        importIssues++;
      }
    }
  });
}

["app", "components", "lib"].forEach((dir) => {
  const dirPath = path.join(__dirname, "..", dir);
  if (fs.existsSync(dirPath)) {
    checkImports(dirPath);
  }
});

if (importIssues > 0) {
  healthReport.warnings.push(
    `Found ${importIssues} files with outdated import paths`
  );
}

// Check 6: API routes
console.log("🌐 Checking API routes...");
const apiDir = path.join(__dirname, "..", "app", "api");
if (fs.existsSync(apiDir)) {
  const apiRoutes = [];
  function findRoutes(dir, base = "") {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        findRoutes(fullPath, path.join(base, file));
      } else if (file === "route.ts" || file === "route.js") {
        apiRoutes.push(base);
      }
    });
  }
  findRoutes(apiDir);
  healthReport.info.push(
    `Found ${apiRoutes.length} API routes: ${apiRoutes.join(", ")}`
  );
}

// Check 7: Component health
console.log("🧩 Checking component health...");
const uiComponents = fs
  .readdirSync(path.join(__dirname, "..", "components", "ui"))
  .filter((f) => f.endsWith(".tsx")).length;
healthReport.info.push(`Found ${uiComponents} UI components`);

// Generate report
console.log("\n" + "=".repeat(60));
console.log("📊 HEALTH CHECK REPORT");
console.log("=".repeat(60));

console.log(`\n🔴 Errors (${healthReport.errors.length}):`);
healthReport.errors.forEach((err) => console.log(`   ❌ ${err}`));

console.log(`\n🟡 Warnings (${healthReport.warnings.length}):`);
healthReport.warnings.forEach((warn) => console.log(`   ⚠️  ${warn}`));

console.log(`\n🔵 Information (${healthReport.info.length}):`);
healthReport.info.forEach((info) => console.log(`   ℹ️  ${info}`));

// Overall status
console.log("\n" + "=".repeat(60));
if (healthReport.status === "healthy" && healthReport.warnings.length === 0) {
  console.log("✅ PROJECT STATUS: EXCELLENT HEALTH");
} else if (healthReport.status === "healthy") {
  console.log("🟢 PROJECT STATUS: GOOD HEALTH (with minor warnings)");
} else {
  console.log("🔴 PROJECT STATUS: NEEDS ATTENTION");
}
console.log("=".repeat(60));

// Recommendations
console.log("\n📋 Recommendations:");
if (importIssues > 0) {
  console.log("   1. Run `npm run cleanup:imports` to fix import paths");
}
if (healthReport.warnings.some((w) => w.includes("TODO"))) {
  console.log("   2. Run `npm run cleanup:types` to clean up type definitions");
}
if (healthReport.errors.length > 0) {
  console.log("   3. Address critical errors before deployment");
}
console.log("   4. Run `npm run validate:full` before committing");

process.exit(healthReport.status === "healthy" ? 0 : 1);
