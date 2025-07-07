@echo off
REM Lotus Integration Validation Script for Windows

echo 🌸 Lotus Payday Loan Simulator - Integration Validation
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first:
    echo    https://nodejs.org/en/download/
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install npm first
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ npm version: %NPM_VERSION%

REM Install dependencies
echo.
echo 📦 Installing dependencies...
npm install

REM Type check
echo.
echo 🔍 Running TypeScript type checking...
npm run type-check

REM Build check
echo.
echo 🏗️ Testing build process...
npm run build

REM Start development server
echo.
echo 🚀 Starting development server...
echo    Open http://localhost:3000 to test the simulator
echo    Press Ctrl+C to stop the server

npm run dev
