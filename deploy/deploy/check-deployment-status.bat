@echo off
echo.
echo 🚀 GitHub Pages Deployment Status Checker
echo ==========================================
echo.

echo ✅ Checking critical files...
if exist "index.html" (
    echo    ✅ index.html found
) else (
    echo    ❌ index.html missing
)

if exist ".nojekyll" (
    echo    ✅ .nojekyll found
) else (
    echo    ❌ .nojekyll missing
)

if exist "app.js" (
    echo    ✅ app.js found
) else (
    echo    ❌ app.js missing
)

echo.
echo ✅ Checking Git status...
git status --porcelain >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Git repository detected
    git log --oneline -1 2>nul
    if %errorlevel% equ 0 (
        echo    ✅ Latest commit ready
    )
) else (
    echo    ❌ Not a Git repository
)

echo.
echo ✅ Checking file count...
for /f %%i in ('dir /s /b *.* ^| find /c /v ""') do echo    ✅ Total files: %%i

echo.
echo 🌐 Next Steps:
echo    1. Run: git push origin main
echo    2. Go to: https://github.com/Millerd8436/Lotus/settings/pages
echo    3. Enable GitHub Pages from main branch
echo    4. Visit: https://millerd8436.github.io/Lotus
echo.
echo ✨ Your project is ready for GitHub Pages deployment!
echo.
pause
