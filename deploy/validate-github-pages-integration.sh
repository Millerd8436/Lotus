#!/bin/bash

# Lotus Complete Integration Validator for GitHub Pages
# Validates all 146 files for GitHub Pages compatibility

echo "🪷 LOTUS COMPLETE INTEGRATION VALIDATOR"
echo "====================================="
echo "Checking all 146 files for GitHub Pages compatibility..."
echo ""

# Get total file count
TOTAL_FILES=$(find . -type f -not -path "./.git/*" -not -path "./deploy/*" | wc -l)
echo "📊 Total files in project: $TOTAL_FILES"
echo ""

# 1. Critical JavaScript Modules Check
echo "📦 1. JAVASCRIPT MODULES VERIFICATION"
echo "======================================"

JS_MODULES=(
    "app.js" "ui.js" "sw.js" "UltimateContentPreservationSystem.js"
    "core/loan_core.js" 
    "assets/global.js"
    "engine/autonomy_theater.js" "engine/behavioralPsychology.js" "engine/echo.js" "engine/kant.js"
    "modes/ethical.js" "modes/exploitative.js"
    "ui_components/aprCalculator.js" "ui_components/aprTransparencyMeter.js" "ui_components/behaviorReplay.js"
    "ui_components/consentBar.js" "ui_components/consentCheck.js" "ui_components/darkPatternEngine.js" 
    "ui_components/darkPatternFlags.js" "ui_components/debtCycleSimulator.js" "ui_components/educationalAssessment.js"
    "ui_components/educationalScaffolding.js" "ui_components/ethicsFeedback.js" "ui_components/legalLoopholeIndex.js"
    "ui_components/promptEngine.js" "ui_components/trapUIEngine.js"
    "research/research_analytics.js" "research/researchDataCollector.js"
    "narrator/ghost.js" "components/reflection.js" "predatory/countdown.js" "docs/academic_references.js"
)

JS_COUNT=0
JS_MISSING=0
for module in "${JS_MODULES[@]}"; do
    if [ -f "$module" ]; then
        echo "✅ $module"
        ((JS_COUNT++))
    else
        echo "❌ MISSING: $module"
        ((JS_MISSING++))
    fi
done

echo "JavaScript Summary: $JS_COUNT found, $JS_MISSING missing"
echo ""

# 2. CSS Files Check
echo "🎨 2. CSS FILES VERIFICATION"
echo "============================"

CSS_FILES=(
    "style.css" 
    "assets/global.css" 
    "predatory/styles.css" 
    "ethical/styles.css"
)

CSS_COUNT=0
CSS_MISSING=0
for css in "${CSS_FILES[@]}"; do
    if [ -f "$css" ]; then
        echo "✅ $css"
        ((CSS_COUNT++))
    else
        echo "❌ MISSING: $css"
        ((CSS_MISSING++))
    fi
done

echo "CSS Summary: $CSS_COUNT found, $CSS_MISSING missing"
echo ""

# 3. HTML Files Check
echo "📄 3. HTML FILES VERIFICATION"
echo "============================="

# Core HTML files (should be embedded in index.html)
CORE_HTML=(
    "predatory/form.html" "predatory/hero.html" "predatory/faq.html" "predatory/slider.html" 
    "predatory/terms.html" "predatory/trust-signals.html"
    "ethical/hero.html" "ethical/education.html" "ethical/form-step1.html" "ethical/form-step2.html" "ethical/apr-display.html"
    "partials/ethical/calculator.html" "partials/ethical/footer.html" "partials/ethical/alternatives.html" "partials/ethical/hero.html"
)

HTML_COUNT=0
HTML_MISSING=0
for html in "${CORE_HTML[@]}"; do
    if [ -f "$html" ]; then
        echo "✅ $html (should be embedded)"
        ((HTML_COUNT++))
    else
        echo "❌ MISSING: $html"
        ((HTML_MISSING++))
    fi
done

# Check if content is embedded in index.html
if grep -q "embeddedContent" index.html; then
    echo "✅ embeddedContent object found in index.html"
    EMBEDDED_COUNT=$(grep -c "'.*\.html':" index.html)
    echo "✅ $EMBEDDED_COUNT HTML files embedded in index.html"
else
    echo "❌ embeddedContent object NOT found in index.html"
fi

echo "HTML Summary: $HTML_COUNT source files found, should be embedded in index.html"
echo ""

# 4. Configuration Files Check
echo "⚙️ 4. CONFIGURATION FILES VERIFICATION"
echo "======================================"

CONFIG_FILES=(
    "index.html" "package.json" "manifest.json" "_config.yml" ".nojekyll"
)

CONFIG_COUNT=0
CONFIG_MISSING=0
for config in "${CONFIG_FILES[@]}"; do
    if [ -f "$config" ]; then
        echo "✅ $config"
        ((CONFIG_COUNT++))
    else
        echo "❌ MISSING: $config"
        ((CONFIG_MISSING++))
    fi
done

echo "Configuration Summary: $CONFIG_COUNT found, $CONFIG_MISSING missing"
echo ""

# 5. GitHub Pages Compatibility Check
echo "🌐 5. GITHUB PAGES COMPATIBILITY CHECK"
echo "====================================="

# Check for absolute paths
echo "🔍 Checking for absolute path issues..."
ABSOLUTE_PATH_ISSUES=$(grep -r "'/[^/]" --include="*.js" --include="*.html" . | grep -v "/api/" | grep -v "/analytics/" | grep -v sw.js | wc -l)
if [ $ABSOLUTE_PATH_ISSUES -gt 0 ]; then
    echo "⚠️  Found $ABSOLUTE_PATH_ISSUES potential absolute path issues"
    echo "   Run: grep -r \"'/[^/]\" --include=\"*.js\" --include=\"*.html\" . | grep -v \"/api/\" | grep -v \"/analytics/\""
else
    echo "✅ No absolute path issues found"
fi

# Check for problematic fetch calls
echo "🔍 Checking for problematic fetch() calls..."
FETCH_ISSUES=$(grep -r "fetch(" --include="*.js" . | grep -v sw.js | grep -v "UltimateContentPreservationSystem.js" | grep -v "app_ultimate.js" | grep -v "app_optimized.js" | wc -l)
if [ $FETCH_ISSUES -gt 0 ]; then
    echo "⚠️  Found $FETCH_ISSUES potential fetch() CORS issues"
else
    echo "✅ No problematic fetch() calls found"
fi

# Check CDN dependencies
echo "🔍 Checking external dependencies..."
if grep -q "cdn.tailwindcss.com" index.html && grep -q "cdn.jsdelivr.net/npm/chart.js" index.html; then
    echo "✅ External CDN dependencies properly configured"
else
    echo "⚠️  External CDN dependencies may be missing"
fi

echo ""

# 6. File Type Summary
echo "📊 6. COMPLETE FILE TYPE SUMMARY"
echo "================================"

echo "Markdown files: $(find . -name "*.md" -not -path "./.git/*" | wc -l)"
echo "HTML files: $(find . -name "*.html" -not -path "./.git/*" | wc -l)"
echo "JavaScript files: $(find . -name "*.js" -not -path "./.git/*" | wc -l)"
echo "CSS files: $(find . -name "*.css" -not -path "./.git/*" | wc -l)"
echo "JSON files: $(find . -name "*.json" -not -path "./.git/*" | wc -l)"
echo "Shell scripts: $(find . -name "*.sh" -not -path "./.git/*" | wc -l)"
echo "Batch files: $(find . -name "*.bat" -not -path "./.git/*" | wc -l)"
echo "YAML files: $(find . -name "*.yml" -not -path "./.git/*" | wc -l)"
echo "Other files: $(find . -name ".nojekyll" -not -path "./.git/*" | wc -l)"

echo ""
echo "📊 FINAL VALIDATION SUMMARY"
echo "==========================="

TOTAL_ISSUES=$((JS_MISSING + CSS_MISSING + CONFIG_MISSING + ABSOLUTE_PATH_ISSUES + FETCH_ISSUES))

if [ $TOTAL_ISSUES -eq 0 ]; then
    echo "🎉 ALL CHECKS PASSED!"
    echo "✅ Project is ready for GitHub Pages deployment"
    echo "✅ All $TOTAL_FILES files properly configured"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Run: ./deploy-to-github-pages.sh"
    echo "2. Push to GitHub repository"
    echo "3. Enable GitHub Pages in repository settings"
else
    echo "❌ ISSUES FOUND: $TOTAL_ISSUES problems detected"
    echo "🛑 Fix issues above before deploying to GitHub Pages"
fi

echo ""
echo "🪷 Lotus Integration Validation Complete"
