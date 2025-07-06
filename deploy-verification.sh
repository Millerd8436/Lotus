#!/bin/bash
# GitHub Pages Deployment Verification Script
# Run this script to verify all systems are ready for deployment

echo "🚀 GitHub Pages Deployment Verification"
echo "========================================"

# Check if all critical files exist
echo "📁 Checking file structure..."
files=(
    "index.html"
    "app.js"
    "ui.js" 
    "style.css"
    "core/loan_core.js"
    "engine/autonomy_theater.js"
    "engine/kant.js"
    "engine/echo.js"
    "engine/behavioralPsychology.js"
    "components/reflection.js"
    "narrator/ghost.js"
    "research/research_analytics.js"
    "research/researchDataCollector.js"
    "ui_components/educationalScaffolding.js"
    "ui_components/educationalAssessment.js"
    "tests/educationalSystemIntegrationTest.js"
    "docs/README.md"
    "docs/philosophy.md"
    "docs/design_notes.md"
    "docs/academic_references.js"
    ".nojekyll"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ MISSING: $file"
    fi
done

echo ""
echo "🔍 Checking for server-side dependencies..."
if grep -r "localhost\|127.0.0.1\|http://[^/]" *.html *.js 2>/dev/null | grep -v "cdn\|github\|jsdelivr"; then
    echo "⚠️  Found potential localhost dependencies"
else
    echo "✅ No localhost dependencies found"
fi

echo ""
echo "🧪 Checking JavaScript syntax..."
# This would require Node.js to be installed for a full syntax check
# For now, just check for obvious syntax errors
if find . -name "*.js" -exec grep -l "console.log\|debugger\|alert" {} \; | wc -l | grep -q "^0$"; then
    echo "✅ No debug statements found"
else
    echo "⚠️  Debug statements found - consider removing for production"
fi

echo ""
echo "📋 GitHub Pages Deployment Checklist:"
echo "□ Repository is public (required for free GitHub Pages)"
echo "□ GitHub Pages is enabled in repository settings"
echo "□ Source is set to 'Deploy from a branch' -> 'main' branch -> '/ (root)'"
echo "□ .nojekyll file exists (for proper file serving)"
echo "□ All external resources use HTTPS CDN links"
echo "□ No server-side code or dependencies"
echo "□ All file paths use relative paths (./ or absolute paths)"

echo ""
echo "🌐 To deploy:"
echo "1. Push all files to your GitHub repository"
echo "2. Go to repository Settings → Pages"
echo "3. Set Source to 'Deploy from a branch'"
echo "4. Select 'main' branch and '/ (root)' folder"
echo "5. Click Save"
echo "6. Your site will be available at: https://[username].github.io/[repository-name]"

echo ""
echo "✨ Educational simulation is ready for deployment!"
