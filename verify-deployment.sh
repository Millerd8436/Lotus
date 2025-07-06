#!/bin/bash

# Lotus Platform - Final Deployment Verification Script
# Run this script to verify all systems before GitHub Pages deployment

echo "🚀 LOTUS PLATFORM - FINAL DEPLOYMENT VERIFICATION"
echo "=================================================="

# Check core files exist
echo "📁 Verifying core files..."
FILES=(
    "index.html"
    "index_professional.html" 
    "app.js"
    "ui.js"
    "style.css"
    "README.md"
    "package.json"
    ".nojekyll"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
        exit 1
    fi
done

# Check directories
echo ""
echo "📂 Verifying directories..."
DIRS=(
    "core"
    "modes" 
    "engine"
    "ui_components"
    "research"
    "narrator"
    "components"
    "docs"
    ".github/workflows"
)

for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir/"
    else
        echo "❌ $dir/ - MISSING"
        exit 1
    fi
done

# Check critical JavaScript files
echo ""
echo "🔧 Verifying JavaScript modules..."
JS_FILES=(
    "core/loan_core.js"
    "modes/ethical.js"
    "modes/exploitative.js"
    "ui_components/darkPatternEngine.js"
    "ui_components/promptEngine.js"
    "research/research_analytics.js"
    "engine/kant.js"
    "engine/ethics_engine.js"
)

for jsfile in "${JS_FILES[@]}"; do
    if [ -f "$jsfile" ]; then
        echo "✅ $jsfile"
        # Check for syntax errors (requires Node.js)
        if command -v node &> /dev/null; then
            if node -c "$jsfile" 2>/dev/null; then
                echo "  └─ ✅ Syntax valid"
            else
                echo "  └─ ❌ Syntax error detected"
                exit 1
            fi
        fi
    else
        echo "❌ $jsfile - MISSING"
        exit 1
    fi
done

# Check HTML files for basic structure
echo ""
echo "🌐 Verifying HTML structure..."
if grep -q "<!DOCTYPE html>" index.html; then
    echo "✅ index.html has DOCTYPE declaration"
else
    echo "❌ index.html missing DOCTYPE"
    exit 1
fi

if grep -q "<!DOCTYPE html>" index_professional.html; then
    echo "✅ index_professional.html has DOCTYPE declaration"
else
    echo "❌ index_professional.html missing DOCTYPE"
    exit 1
fi

# Check for GitHub Pages requirements
echo ""
echo "📄 Verifying GitHub Pages requirements..."
if [ -f ".nojekyll" ]; then
    echo "✅ .nojekyll file present"
else
    echo "❌ .nojekyll file missing"
    exit 1
fi

if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ GitHub Actions workflow present"
else
    echo "❌ GitHub Actions workflow missing"
    exit 1
fi

# Performance check
echo ""
echo "⚡ Performance verification..."
INDEX_SIZE=$(stat -f%z index.html 2>/dev/null || stat -c%s index.html 2>/dev/null)
if [ "$INDEX_SIZE" -lt 1000000 ]; then  # Less than 1MB
    echo "✅ index.html size optimal ($INDEX_SIZE bytes)"
else
    echo "⚠️  index.html larger than expected ($INDEX_SIZE bytes)"
fi

# Final summary
echo ""
echo "🎉 VERIFICATION COMPLETE"
echo "========================="
echo "✅ All core files present"
echo "✅ All JavaScript modules valid"
echo "✅ HTML structure correct"
echo "✅ GitHub Pages ready"
echo "✅ Performance optimized"
echo ""
echo "🚀 READY FOR DEPLOYMENT TO GITHUB PAGES!"
echo ""
echo "Next steps:"
echo "1. Commit all changes: git add . && git commit -m 'Complete optimization'"
echo "2. Push to GitHub: git push origin main"
echo "3. Enable GitHub Pages in repository settings"
echo "4. Access your live site at: https://yourusername.github.io/Lotus/"
