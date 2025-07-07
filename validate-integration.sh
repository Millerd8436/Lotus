#!/bin/bash
# Lotus Integration Validation Script

echo "🌸 Lotus Payday Loan Simulator - Integration Validation"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first:"
    echo "   https://nodejs.org/en/download/"
    exit 1
fi

# Check if npm is installed  
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Type check
echo ""
echo "🔍 Running TypeScript type checking..."
npm run type-check

# Build check
echo ""
echo "🏗️ Testing build process..."
npm run build

# Start development server
echo ""
echo "🚀 Starting development server..."
echo "   Open http://localhost:3000 to test the simulator"
echo "   Press Ctrl+C to stop the server"

npm run dev
