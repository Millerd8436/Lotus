#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔍 Validating Lotus Platform Connectivity...\n");

const issues = [];
const warnings = [];
const successes = [];

// Check if required directories exist
function checkDirectories() {
  console.log("📁 Checking directory structure...");

  const requiredDirs = [
    "app",
    "components",
    "components/ui",
    "components/predatory",
    "components/ethical",
    "components/reflection",
    "components/providers",
    "lib",
    "lib/core",
    "types",
    "data",
    "docs",
    "scripts",
  ];

  requiredDirs.forEach((dir) => {
    if (fs.existsSync(path.join(process.cwd(), dir))) {
      successes.push(`✅ Directory exists: ${dir}`);
    } else {
      issues.push(`❌ Missing directory: ${dir}`);
    }
  });
}

// Check if core files exist
function checkCoreFiles() {
  console.log("\n📄 Checking core files...");

  const coreFiles = [
    { path: "types/index.ts", description: "Central type definitions" },
    { path: "lib/utils.ts", description: "Utility functions" },
    {
      path: "lib/core/AutonomyTheaterEngine.ts",
      description: "Autonomy Theater Engine",
    },
    {
      path: "lib/core/behavioral-engine.ts",
      description: "Behavioral Psychology Engine",
    },
    { path: "lib/core/LoanCalculator.js", description: "Loan Calculator" },
    { path: "lib/core/SessionManager.ts", description: "Session Manager" },
    { path: "lib/core/theme.ts", description: "Theme System" },
    { path: "components/index.tsx", description: "Component exports" },
    { path: "docs/CONNECTIVITY.md", description: "Connectivity documentation" },
  ];

  coreFiles.forEach((file) => {
    if (fs.existsSync(path.join(process.cwd(), file.path))) {
      successes.push(`✅ ${file.description}: ${file.path}`);
    } else {
      issues.push(`❌ Missing ${file.description}: ${file.path}`);
    }
  });
}

// Check imports in key files
function checkImports() {
  console.log("\n🔗 Checking import connectivity...");

  const filesToCheck = [
    {
      file: "lib/core/behavioral-engine.ts",
      shouldImport: ["@/types"],
      description: "Behavioral engine type imports",
    },
    {
      file: "lib/core/SessionManager.ts",
      shouldImport: ["@/types"],
      description: "Session manager type imports",
    },
    {
      file: "components/types.ts",
      shouldImport: ["@/lib/core/AutonomyTheaterEngine", "@/types"],
      description: "Component type imports",
    },
  ];

  filesToCheck.forEach((check) => {
    const filePath = path.join(process.cwd(), check.file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      check.shouldImport.forEach((importPath) => {
        if (content.includes(importPath)) {
          successes.push(`✅ ${check.description} includes ${importPath}`);
        } else {
          warnings.push(
            `⚠️  ${check.description} missing import: ${importPath}`
          );
        }
      });
    }
  });
}

// Check for duplicate definitions
function checkDuplicates() {
  console.log("\n🔍 Checking for duplicate definitions...");

  // Check if autonomy-theater.ts was properly removed
  if (fs.existsSync(path.join(process.cwd(), "lib/core/autonomy-theater.ts"))) {
    issues.push(
      "❌ Duplicate file exists: lib/core/autonomy-theater.ts (should be removed)"
    );
  } else {
    successes.push("✅ No duplicate autonomy theater files");
  }
}

// Check TypeScript compilation
function checkTypeScript() {
  console.log("\n📘 Checking TypeScript configuration...");

  const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
  if (fs.existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));

    // Check path aliases
    if (tsconfig.compilerOptions?.paths?.["@/*"]) {
      successes.push("✅ TypeScript path aliases configured");
    } else {
      warnings.push("⚠️  TypeScript path aliases not configured");
    }

    // Check strict mode
    if (tsconfig.compilerOptions?.strict) {
      successes.push("✅ TypeScript strict mode enabled");
    } else {
      warnings.push("⚠️  TypeScript strict mode not enabled");
    }
  } else {
    issues.push("❌ Missing tsconfig.json");
  }
}

// Check component exports
function checkComponentExports() {
  console.log("\n📦 Checking component exports...");

  const indexPath = path.join(process.cwd(), "components/index.tsx");
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, "utf8");

    // Check for removed components
    if (content.includes("LoadingSpinner") && !content.includes("// export")) {
      const loadingSpinnerPath = path.join(
        process.cwd(),
        "components/ui/LoadingSpinner.tsx"
      );
      if (!fs.existsSync(loadingSpinnerPath)) {
        issues.push(
          "❌ components/index.tsx exports LoadingSpinner but file doesn't exist"
        );
      } else {
        successes.push("✅ LoadingSpinner properly exported");
      }
    }
  }
}

// Run all checks
function runValidation() {
  checkDirectories();
  checkCoreFiles();
  checkImports();
  checkDuplicates();
  checkTypeScript();
  checkComponentExports();

  // Summary
  console.log("\n📊 Validation Summary:");
  console.log(`✅ Successes: ${successes.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);
  console.log(`❌ Issues: ${issues.length}`);

  if (issues.length > 0) {
    console.log("\n❌ Critical Issues Found:");
    issues.forEach((issue) => console.log(`  ${issue}`));
  }

  if (warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    warnings.forEach((warning) => console.log(`  ${warning}`));
  }

  if (issues.length === 0 && warnings.length === 0) {
    console.log("\n✨ All connectivity checks passed!");
  }

  // Exit with error code if issues found
  process.exit(issues.length > 0 ? 1 : 0);
}

// Run validation
runValidation();
