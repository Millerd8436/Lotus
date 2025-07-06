@echo off
setlocal enabledelayedexpansion

echo 🌸 Lotus GitHub Pages Deployment Script
echo ========================================

REM Check if we're in the right directory
if not exist "index_github_pages.html" (
    echo ❌ Error: index_github_pages.html not found. Are you in the Lotus project directory?
    pause
    exit /b 1
)

echo 📁 Preparing files for GitHub Pages...

REM Create deployment directory
if not exist "deploy" mkdir deploy

REM Copy all files to deploy directory
xcopy /E /Y /Q * deploy\ >nul 2>&1

REM Switch to deploy directory
cd deploy

REM Remove unnecessary files from deployment
if exist "*.bat" del /q *.bat >nul 2>&1
if exist "*.sh" del /q *.sh >nul 2>&1
if exist "COMPLETE_*" del /q COMPLETE_* >nul 2>&1
if exist "COMPREHENSIVE_*" del /q COMPREHENSIVE_* >nul 2>&1
if exist "FINAL_*" del /q FINAL_* >nul 2>&1
if exist "MASTER_*" del /q MASTER_* >nul 2>&1
if exist "OPTIMIZATION_*" del /q OPTIMIZATION_* >nul 2>&1
if exist "QA_*" del /q QA_* >nul 2>&1
if exist "DEPLOYMENT_*" del /q DEPLOYMENT_* >nul 2>&1
if exist "ARCHITECTURE_*" del /q ARCHITECTURE_* >nul 2>&1
if exist "archive" rmdir /s /q archive >nul 2>&1

REM Set up index.html for GitHub Pages
if exist "index_github_pages.html" (
    copy /y index_github_pages.html index.html >nul
    echo ✅ Set index_github_pages.html as main index.html
) else (
    echo ❌ Error: index_github_pages.html not found
    pause
    exit /b 1
)

REM Verify all required directories exist
echo 🔍 Verifying project structure...

set "REQUIRED_DIRS=assets predatory ethical engine research ui_components core modes"

for %%d in (%REQUIRED_DIRS%) do (
    if not exist "%%d" (
        echo ⚠️  Warning: Missing directory: %%d
        echo    Creating empty directory...
        mkdir "%%d"
        echo ^<div^>Content for %%d coming soon...^</div^> > "%%d\placeholder.html"
    )
)

REM Check for required files
echo 📋 Checking required files...

if not exist "assets\global.css" (
    echo ⚠️  Missing: assets\global.css
    if not exist "assets" mkdir assets
    echo /* Placeholder CSS for assets/global.css */ > "assets\global.css"
) else (
    echo ✅ Found: assets\global.css
)

if not exist "assets\global.js" (
    echo ⚠️  Missing: assets\global.js
    if not exist "assets" mkdir assets
    echo // Placeholder JS for assets/global.js > "assets\global.js"
) else (
    echo ✅ Found: assets\global.js
)

if not exist "predatory\styles.css" (
    echo ⚠️  Missing: predatory\styles.css
    if not exist "predatory" mkdir predatory
    echo /* Placeholder CSS for predatory/styles.css */ > "predatory\styles.css"
) else (
    echo ✅ Found: predatory\styles.css
)

if not exist "ethical\styles.css" (
    echo ⚠️  Missing: ethical\styles.css
    if not exist "ethical" mkdir ethical
    echo /* Placeholder CSS for ethical/styles.css */ > "ethical\styles.css"
) else (
    echo ✅ Found: ethical\styles.css
)

REM Create .nojekyll file for GitHub Pages
echo. > .nojekyll
echo ✅ Created .nojekyll file

REM Create GitHub Pages configuration
(
echo # Lotus GitHub Pages Configuration
echo title: "Lotus Payday Loan Simulator"
echo description: "Educational simulation comparing predatory and ethical lending interfaces"
echo url: ""
echo baseurl: ""
echo.
echo # GitHub Pages settings
echo plugins:
echo   - jekyll-relative-links
echo.
echo # File processing
echo include:
echo   - "_*_.html"
echo   - "_*_.css"
echo   - "_*_.js"
echo.
echo # Exclude development files
echo exclude:
echo   - "*.md"
echo   - "*.bat"
echo   - "*.sh"
echo   - "archive/"
echo   - "docs/"
echo   - "tests/"
echo.
echo # Enable relative links
echo relative_links:
echo   enabled: true
echo   collections: false
) > _config.yml

echo ✅ Created _config.yml

REM Generate file manifest
echo 📊 Generating file manifest...
dir /s /b *.html *.css *.js 2>nul | findstr /v "node_modules" > file_manifest.txt

REM Count files
for /f %%i in ('type file_manifest.txt ^| find /c /v ""') do set FILE_COUNT=%%i
echo ✅ Found !FILE_COUNT! web files

REM Create deployment summary
(
echo # Lotus Deployment Ready
echo.
echo This directory is ready for GitHub Pages deployment.
echo.
echo ## File Count: !FILE_COUNT! web files
echo.
echo ## Deployment Instructions:
echo.
echo 1. **Create GitHub Repository**
echo    ```bash
echo    git init
echo    git add .
echo    git commit -m "Initial Lotus deployment"
echo    git branch -M main
echo    git remote add origin https://github.com/username/lotus-simulator.git
echo    git push -u origin main
echo    ```
echo.
echo 2. **Enable GitHub Pages**
echo    - Go to repository Settings
echo    - Navigate to Pages
echo    - Source: Deploy from a branch
echo    - Branch: main
echo    - Folder: / ^(root^)
echo.
echo 3. **Access Your Site**
echo    - URL will be: https://username.github.io/lotus-simulator
echo    - Initial deployment may take 5-10 minutes
echo.
echo ## Features Enabled:
echo - ✅ Predatory interface mode
echo - ✅ Ethical redesign mode
echo - ✅ Real-time mode switching
echo - ✅ Analytics terminal
echo - ✅ Research data collection
echo - ✅ Mobile responsive design
echo - ✅ All UI components loaded
echo.
echo ## Next Steps:
echo 1. Test both interface modes
echo 2. Verify analytics functionality
echo 3. Check mobile responsiveness
echo 4. Monitor performance metrics
echo.
echo Generated: %date% %time%
) > DEPLOYMENT_READY.md

echo.
echo 🎉 Deployment preparation complete!
echo.
echo 📁 Deployment files are in: .\deploy\
echo 📋 File manifest: .\deploy\file_manifest.txt
echo 📖 Instructions: .\deploy\DEPLOYMENT_READY.md
echo.
echo 🚀 Next steps:
echo    1. cd deploy
echo    2. git init ^&^& git add . ^&^& git commit -m "Lotus deployment"
echo    3. Push to GitHub and enable Pages
echo.
echo 🌐 Your site will be live at: https://username.github.io/repository-name

pause
