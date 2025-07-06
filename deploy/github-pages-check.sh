#!/bin/bash
# GitHub Pages Compatibility Check for Lotus Educational Simulation

echo "🔍 GitHub Pages Compatibility Verification"
echo "==========================================="

# Check 1: Verify index.html exists
if [ -f "index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html missing"
    exit 1
fi

# Check 2: Verify .nojekyll exists (prevents Jekyll processing)
if [ -f ".nojekyll" ]; then
    echo "✅ .nojekyll exists"
else
    echo "❌ .nojekyll missing - creating it"
    touch .nojekyll
fi

# Check 3: Verify no server-side dependencies
echo "🔍 Checking for server-side dependencies..."
if grep -r "php\|python\|node\|ruby\|perl" *.html *.js 2>/dev/null | grep -v "comment\|string\|cdn" | head -5; then
    echo "⚠️  Potential server-side dependencies found (check if they're just strings/comments)"
else
    echo "✅ No server-side dependencies detected"
fi

# Check 4: Verify no absolute URLs pointing to localhost
echo "🔍 Checking for localhost dependencies..."
if grep -r "localhost\|127.0.0.1" *.html *.js 2>/dev/null | grep -v "comment\|string\|test" | head -5; then
    echo "⚠️  Found localhost references (check if they're just strings/tests)"
else
    echo "✅ No localhost dependencies found"
fi

# Check 5: Verify all CSS files exist
echo "🔍 Checking CSS file dependencies..."
missing_css=0
for css_file in style.css assets/global.css predatory/styles.css ethical/styles.css; do
    if [ -f "$css_file" ]; then
        echo "✅ $css_file exists"
    else
        echo "❌ $css_file missing"
        missing_css=1
    fi
done

# Check 6: Verify critical JavaScript files exist
echo "🔍 Checking JavaScript file dependencies..."
missing_js=0
for js_file in ui.js app.js core/loan_core.js; do
    if [ -f "$js_file" ]; then
        echo "✅ $js_file exists"
    else
        echo "❌ $js_file missing"
        missing_js=1
    fi
done

# Check 7: Verify modules have proper exports
echo "🔍 Checking ES6 module exports..."
if grep -l "export" *.js */*.js 2>/dev/null | wc -l | grep -q "[1-9]"; then
    echo "✅ ES6 exports found in JavaScript modules"
else
    echo "⚠️  No ES6 exports found - check module structure"
fi

# Check 8: Verify no fetch() calls to local files (should use embedded content)
echo "🔍 Checking for problematic fetch() calls..."
if grep -r "fetch(" index.html | grep -v "cdn\|https\|embeddedContent"; then
    echo "⚠️  Found fetch() calls that might fail on GitHub Pages"
else
    echo "✅ No problematic fetch() calls found"
fi

# Summary
echo ""
echo "📊 GitHub Pages Compatibility Summary"
echo "====================================="

if [ $missing_css -eq 0 ] && [ $missing_js -eq 0 ]; then
    echo "✅ All core files present"
    echo "✅ Ready for GitHub Pages deployment"
    echo ""
    echo "🚀 Deployment Instructions:"
    echo "1. Push all files to your GitHub repository"
    echo "2. Go to Settings > Pages in your GitHub repo"
    echo "3. Select 'Deploy from a branch'"
    echo "4. Choose 'main' branch and '/ (root)'"
    echo "5. Your site will be available at: https://username.github.io/repository-name/"
else
    echo "❌ Missing critical files - fix issues before deployment"
    exit 1
fi
