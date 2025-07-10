#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function checkFile(filepath, description) {
  const exists = fs.existsSync(filepath);
  console.log(`${exists ? "✅" : "❌"} ${description}: ${filepath}`);
  return exists;
}

function checkPackageJson() {
  console.log("\n🔍 Checking package.json...");

  if (!checkFile("package.json", "Package file")) {
    return false;
  }

  try {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

    const requiredScripts = ["build", "start", "dev"];
    const missingScripts = requiredScripts.filter(
      (script) => !pkg.scripts?.[script]
    );

    if (missingScripts.length > 0) {
      console.log(`❌ Missing required scripts: ${missingScripts.join(", ")}`);
      return false;
    }

    console.log("✅ All required scripts present");
    console.log(`✅ Project: ${pkg.name} v${pkg.version}`);
    return true;
  } catch (error) {
    console.log(`❌ Invalid package.json: ${error.message}`);
    return false;
  }
}

function checkNextConfig() {
  console.log("\n🔍 Checking Next.js configuration...");

  const hasNextConfig = checkFile("next.config.js", "Next.js config");
  const hasTsConfig = checkFile("tsconfig.json", "TypeScript config");

  return hasNextConfig && hasTsConfig;
}

function checkVercelConfig() {
  console.log("\n🔍 Checking Vercel configuration...");

  if (!checkFile("vercel.json", "Vercel config")) {
    return false;
  }

  try {
    const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));

    console.log(`✅ Framework: ${vercelConfig.framework || "default"}`);
    console.log(
      `✅ Root Directory: ${vercelConfig.rootDirectory || "default"}`
    );
    console.log(`✅ Build Command: ${vercelConfig.buildCommand || "default"}`);

    return true;
  } catch (error) {
    console.log(`❌ Invalid vercel.json: ${error.message}`);
    return false;
  }
}

function checkDependencies() {
  console.log("\n🔍 Checking dependencies...");

  const hasNodeModules = checkFile("node_modules", "Dependencies installed");
  const hasLockFile = checkFile("package-lock.json", "Lock file");

  return hasNodeModules && hasLockFile;
}

function main() {
  console.log("🚀 Verifying Vercel Deployment Readiness\n");

  const checks = [
    checkPackageJson(),
    checkNextConfig(),
    checkVercelConfig(),
    checkDependencies(),
  ];

  const allPassed = checks.every((check) => check);

  console.log(
    `\n${allPassed ? "🎉" : "💥"} Deployment ${allPassed ? "READY" : "NOT READY"}`
  );

  if (!allPassed) {
    console.log("\n📋 Fix the issues above before deploying to Vercel");
    process.exit(1);
  }

  console.log("\n📋 Next steps:");
  console.log("1. Run: npm run build (test local build)");
  console.log("2. Run: vercel --prod (deploy to production)");
  console.log("3. Or use: npx vercel --prod --force (force redeploy)");
}

if (require.main === module) {
  main();
}
