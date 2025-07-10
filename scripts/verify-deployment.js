const fs = require("fs");
const path = require("path");

function verifyDeploymentReadiness() {
  console.log("🔍 Verifying deployment readiness...");

  // Check essential files
  const essentialFiles = [
    "package.json",
    "next.config.js",
    "vercel.json",
    "tsconfig.json",
  ];

  const missing = essentialFiles.filter((file) => !fs.existsSync(file));
  if (missing.length > 0) {
    console.error("❌ Missing essential files:", missing);
    return false;
  }

  // Verify package.json structure
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  if (!pkg.scripts?.build) {
    console.error("❌ Missing build script in package.json");
    return false;
  }

  console.log("✅ All deployment requirements met");
  return true;
}

if (require.main === module) {
  process.exit(verifyDeploymentReadiness() ? 0 : 1);
}

module.exports = verifyDeploymentReadiness;
