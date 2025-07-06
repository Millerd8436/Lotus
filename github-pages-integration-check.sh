#!/bin/bash

# Comprehensive GitHub Pages Integration Check
echo "🔍 Lotus GitHub Pages Integration Analysis"
echo "========================================="

# Check all required JavaScript modules
echo "📦 Checking JavaScript Modules..."
MODULES=(
    "ui.js"
    "app.js" 
    "core/loan_core.js"
    "assets/global.js"
    "engine/autonomy_theater.js"
    "engine/behavioralPsychology.js"
    "engine/echo.js"
    "engine/kant.js"
    "modes/ethical.js"
    "modes/exploitative.js"
    "ui_components/aprCalculator.js"
    "ui_components/aprTransparencyMeter.js"
    "ui_components/behaviorReplay.js"
    "ui_components/consentBar.js"
    "ui_components/consentCheck.js"
    "ui_components/darkPatternEngine.js"
    "ui_components/darkPatternFlags.js"
    "ui_components/debtCycleSimulator.js"
    "ui_components/educationalAssessment.js"
    "ui_components/educationalScaffolding.js"
    "ui_components/ethicsFeedback.js"
    "ui_components/legalLoopholeIndex.js"
    "ui_components/promptEngine.js"
    "ui_components/trapUIEngine.js"
    "research/research_analytics.js"
    "research/researchDataCollector.js"
    "narrator/ghost.js"
    "components/reflection.js"
    "predatory/countdown.js"
)

MISSING_JS=()
for module in "${MODULES[@]}"; do
    if [ ! -f "$module" ]; then
        MISSING_JS+=("$module")
        echo "❌ Missing: $module"
    else
        echo "✅ Found: $module"
    fi
done

echo ""
echo "📄 Checking CSS Files..."
CSS_FILES=(
    "style.css"
    "assets/global.css"
    "predatory/styles.css"
    "ethical/styles.css"
)

MISSING_CSS=()
for css in "${CSS_FILES[@]}"; do
    if [ ! -f "$css" ]; then
        MISSING_CSS+=("$css")
        echo "❌ Missing: $css"
    else
        echo "✅ Found: $css"
    fi
done

echo ""
echo "🌐 Checking for GitHub Pages Issues..."

# Check for absolute paths in JavaScript files
echo "🔍 Checking for absolute paths..."
if grep -r "'/[^/]" --include="*.js" . | grep -v "/api/" | grep -v "/analytics/" | grep -v sw.js; then
    echo "⚠️  Found potential absolute path issues"
else
    echo "✅ No problematic absolute paths found"
fi

# Check for fetch calls that might cause CORS issues
echo "🔍 Checking for fetch() calls..."
FETCH_FILES=$(grep -r "fetch(" --include="*.js" . | grep -v sw.js | grep -v "UltimateContentPreservationSystem.js" | grep -v "app_ultimate.js" | grep -v "app_optimized.js")
if [ -n "$FETCH_FILES" ]; then
    echo "⚠️  Found fetch() calls that might cause CORS issues:"
    echo "$FETCH_FILES"
else
    echo "✅ No problematic fetch() calls found"
fi

echo ""
echo "📊 Summary:"
echo "Total JS modules checked: ${#MODULES[@]}"
echo "Missing JS modules: ${#MISSING_JS[@]}"
echo "Total CSS files checked: ${#CSS_FILES[@]}"
echo "Missing CSS files: ${#MISSING_CSS[@]}"

if [ ${#MISSING_JS[@]} -eq 0 ] && [ ${#MISSING_CSS[@]} -eq 0 ]; then
    echo ""
    echo "🎉 ALL CORE FILES PRESENT!"
    echo "✅ GitHub Pages compatibility: READY"
else
    echo ""
    echo "❌ Missing files detected - see above"
fi

echo ""
echo "🚀 Next steps for deployment:"
echo "1. Fix any missing files listed above"
echo "2. Test locally first"
echo "3. Deploy to GitHub Pages"
echo "4. Verify all functionality works on GitHub Pages"
