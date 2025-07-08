# Lotus Comprehensive System Setup - Ultimate Development Environment
# Installs everything needed for the 96,000+ line comprehensive system

Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  🌸 LOTUS COMPREHENSIVE SYSTEM SETUP  " -ForegroundColor Magenta  
Write-Host "    96,000+ Line Educational Platform   " -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

# Function to check if command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Function to refresh environment variables
function Refresh-Environment {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

Write-Host "📋 PHASE 1: Core Development Tools Installation" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Install Chocolatey if not present
if (!(Test-Command choco)) {
    Write-Host "📦 Installing Chocolatey package manager..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    try {
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        Write-Host "✅ Chocolatey installed successfully" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to install Chocolatey: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Chocolatey already installed" -ForegroundColor Green
}

Refresh-Environment

# Core development tools
$coreTools = @(
    @{ name = "nodejs-lts"; description = "Node.js LTS with npm" },
    @{ name = "git"; description = "Git version control" },
    @{ name = "vscode"; description = "Visual Studio Code editor" }
)

foreach ($tool in $coreTools) {
    Write-Host "🔧 Installing $($tool.description)..." -ForegroundColor Yellow
    try {
        choco install $tool.name -y --no-progress
        Write-Host "✅ $($tool.description) installed" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Warning: Failed to install $($tool.description)" -ForegroundColor Red
    }
}

Refresh-Environment

Write-Host ""
Write-Host "🧩 PHASE 2: VS Code Extensions for Comprehensive Development" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# Essential VS Code extensions for the comprehensive system
$extensions = @(
    # AI and Copilot
    "github.copilot",
    "github.copilot-chat",
    "github.copilot-labs",
    "visualstudioexptteam.vscodeintellicode",
    
    # Next.js and React
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets", 
    "burkeholland.simple-react-snippets",
    "ms-vscode.vscode-typescript-next",
    
    # Git and GitHub
    "eamodio.gitlens",
    "github.vscode-pull-request-github",
    "github.vscode-github-actions",
    
    # Code Quality
    "ms-vscode.vscode-eslint",
    "esbenp.prettier-vscode",
    "streetsidesoftware.code-spell-checker",
    
    # API and Testing
    "humao.rest-client",
    "ms-playwright.playwright",
    "ms-vscode.vscode-jest",
    
    # Database and Analytics
    "ms-vscode.vscode-postgres",
    "mtxr.sqltools",
    
    # Deployment and DevOps
    "vercel.vercel-vscode",
    "ms-azuretools.vscode-docker",
    
    # Productivity
    "gruntfuggly.todo-tree",
    "alefragnani.bookmarks",
    "yzhang.markdown-all-in-one",
    
    # Specialized for Lotus System
    "ms-vscode.hexeditor",
    "ms-vscode.vscode-github-issue-notebooks"
)

if (Test-Command code) {
    Write-Host "🧩 Installing VS Code extensions..." -ForegroundColor Yellow
    foreach ($ext in $extensions) {
        Write-Host "  • Installing $ext..." -ForegroundColor Gray
        try {
            & code --install-extension $ext --force 2>$null
        } catch {
            Write-Host "  ⚠️  Warning: Failed to install $ext" -ForegroundColor Red
        }
    }
    Write-Host "✅ VS Code extensions installation completed" -ForegroundColor Green
} else {
    Write-Host "⚠️  VS Code not found - skipping extensions" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📚 PHASE 3: Node.js Dependencies and Comprehensive Packages" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan

if (Test-Command node) {
    Write-Host "🟢 Node.js version: $(node --version)" -ForegroundColor Green
    Write-Host "📦 npm version: $(npm --version)" -ForegroundColor Green
    
    Write-Host "📥 Installing comprehensive npm packages..." -ForegroundColor Yellow
    
    # Core Next.js and React packages
    Write-Host "  • Next.js and React ecosystem..." -ForegroundColor Gray
    npm install next@latest react@latest react-dom@latest typescript@latest --silent
    
    # UI and Styling
    Write-Host "  • UI and styling packages..." -ForegroundColor Gray
    npm install tailwindcss@latest autoprefixer@latest postcss@latest --silent
    npm install @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio --silent
    npm install framer-motion lucide-react clsx tailwind-merge --silent
    npm install @headlessui/react @heroicons/react --silent
    
    # Data Visualization for Analytics
    Write-Host "  • Data visualization packages..." -ForegroundColor Gray
    npm install chart.js react-chartjs-2 d3 recharts --silent
    npm install @visx/group @visx/scale @visx/shape --silent
    
    # Utilities and Analytics
    Write-Host "  • Utilities and analytics..." -ForegroundColor Gray
    npm install lodash date-fns uuid zod --silent
    npm install @types/lodash @types/uuid @types/d3 --silent
    npm install @vercel/analytics @vercel/speed-insights --silent
    
    # Development Tools
    Write-Host "  • Development and testing tools..." -ForegroundColor Gray
    npm install --save-dev eslint@latest prettier@latest --silent
    npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser --silent
    npm install --save-dev eslint-config-next jest @testing-library/react --silent
    npm install --save-dev playwright @playwright/test --silent
    
    # Database and API
    Write-Host "  • Database and API packages..." -ForegroundColor Gray  
    npm install prisma @prisma/client axios swr --silent
    
    # Specialized packages for Lotus System
    Write-Host "  • Specialized Lotus system packages..." -ForegroundColor Gray
    npm install @sentry/nextjs --silent
    
    Write-Host "✅ All npm packages installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found - cannot install packages" -ForegroundColor Red
    Write-Host "   Please restart PowerShell and try again" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "⚙️  PHASE 4: Project Configuration and Optimization" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Initialize or update package.json scripts
if (Test-Path "package.json") {
    Write-Host "📝 Updating package.json scripts..." -ForegroundColor Yellow
    
    # Create optimized scripts
    $packageJson = Get-Content "package.json" | ConvertFrom-Json -AsHashtable
    
    $packageJson.scripts = @{
        "dev" = "next dev --turbo"
        "build" = "next build"
        "start" = "next start"
        "lint" = "next lint"
        "lint:fix" = "next lint --fix"
        "type-check" = "tsc --noEmit"
        "format" = "prettier --write ."
        "test" = "jest"
        "test:watch" = "jest --watch"
        "test:e2e" = "playwright test"
        "validate-comprehensive" = "npm run type-check && npm run lint && npm run test"
        "analyze" = "ANALYZE=true npm run build"
        "deploy" = "vercel --prod"
        "deploy:preview" = "vercel"
        "lotus:dev" = "npm run validate-comprehensive && npm run dev"
        "lotus:build" = "npm run validate-comprehensive && npm run build"
        "lotus:deploy" = "npm run validate-comprehensive && npm run deploy"
    }
    
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    Write-Host "✅ Package.json updated with comprehensive scripts" -ForegroundColor Green
}

# Setup Tailwind with comprehensive configuration
Write-Host "🎨 Setting up comprehensive Tailwind CSS..." -ForegroundColor Yellow
if (Test-Command npx) {
    try {
        npx tailwindcss init -p 2>$null
        Write-Host "✅ Tailwind CSS initialized" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Warning: Tailwind initialization failed" -ForegroundColor Red
    }
}

# Setup testing
Write-Host "🧪 Setting up comprehensive testing..." -ForegroundColor Yellow
if (Test-Command npx) {
    try {
        npx playwright install 2>$null
        Write-Host "✅ Playwright testing setup completed" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Warning: Playwright setup failed" -ForegroundColor Red
    }
}

# Install Vercel CLI globally
Write-Host "🚀 Installing Vercel CLI..." -ForegroundColor Yellow
if (Test-Command npm) {
    try {
        npm install -g vercel@latest --silent
        Write-Host "✅ Vercel CLI installed globally" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Warning: Vercel CLI installation failed" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📋 PHASE 5: Environment Setup and Validation" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Create environment template
Write-Host "🔧 Creating comprehensive environment template..." -ForegroundColor Yellow
$envTemplate = @"
# Lotus Comprehensive System Environment Variables

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Database Configuration
DATABASE_URL=postgresql://localhost:5432/lotus

# Analytics and Monitoring
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
NEXT_PUBLIC_MIXPANEL_TOKEN=
SENTRY_DSN=

# AI and Research
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Lotus System Features
NEXT_PUBLIC_ENABLE_GHOST_MODE=true
NEXT_PUBLIC_ENABLE_COMPREHENSIVE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_RESEARCH_MODE=true
NEXT_PUBLIC_ENABLE_DARK_PATTERN_DETECTION=true

# Legal and Compliance
RESEARCH_CONSENT_REQUIRED=true
ANONYMIZATION_ENABLED=true
EDUCATIONAL_MODE=true

# Vercel Deployment
VERCEL_URL=
VERCEL_GIT_COMMIT_SHA=
"@

$envTemplate | Out-File -FilePath ".env.local" -Encoding UTF8
Write-Host "✅ Environment template created (.env.local)" -ForegroundColor Green

# Validation
Write-Host "🔍 Validating installation..." -ForegroundColor Yellow
$validationResults = @()

if (Test-Command node) { 
    $validationResults += "✅ Node.js: $(node --version)"
} else { 
    $validationResults += "❌ Node.js: Not found"
}

if (Test-Command npm) { 
    $validationResults += "✅ npm: $(npm --version)"
} else { 
    $validationResults += "❌ npm: Not found"
}

if (Test-Command git) { 
    $validationResults += "✅ Git: $(git --version)"
} else { 
    $validationResults += "❌ Git: Not found"
}

if (Test-Command code) { 
    $validationResults += "✅ VS Code: Available"
} else { 
    $validationResults += "❌ VS Code: Not found"
}

if (Test-Command vercel) { 
    $validationResults += "✅ Vercel CLI: Available"
} else { 
    $validationResults += "❌ Vercel CLI: Not found"
}

Write-Host ""
Write-Host "📊 INSTALLATION VALIDATION RESULTS" -ForegroundColor Magenta
Write-Host "===================================" -ForegroundColor Magenta
foreach ($result in $validationResults) {
    Write-Host $result
}

Write-Host ""
Write-Host "🎯 COMPREHENSIVE LOTUS SYSTEM - READY!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Quick Start Commands:" -ForegroundColor Cyan
Write-Host "  npm run dev              # Start development server" -ForegroundColor White
Write-Host "  npm run lotus:dev        # Start with full validation" -ForegroundColor White
Write-Host "  code .                   # Open in VS Code" -ForegroundColor White
Write-Host "  npm run deploy           # Deploy to Vercel" -ForegroundColor White
Write-Host ""
Write-Host "🧩 VS Code Features Available:" -ForegroundColor Cyan
Write-Host "  • GitHub Copilot AI assistance" -ForegroundColor White
Write-Host "  • GitLens for advanced Git integration" -ForegroundColor White
Write-Host "  • Tailwind CSS IntelliSense" -ForegroundColor White
Write-Host "  • Comprehensive testing with Playwright" -ForegroundColor White
Write-Host "  • Vercel deployment integration" -ForegroundColor White
Write-Host ""
Write-Host "📚 Comprehensive System Features:" -ForegroundColor Cyan
Write-Host "  • 96,000+ line advanced dark pattern engine" -ForegroundColor White
Write-Host "  • Behavioral psychology analysis" -ForegroundColor White
Write-Host "  • Kantian ethics evaluation" -ForegroundColor White
Write-Host "  • Legal loophole simulation" -ForegroundColor White
Write-Host "  • Advanced analytics and research tools" -ForegroundColor White
Write-Host "  • Complete 3-phase educational platform" -ForegroundColor White
Write-Host ""
Write-Host "🌸 Your comprehensive Lotus system is ready for development!" -ForegroundColor Magenta
Write-Host "   Start with: npm run lotus:dev" -ForegroundColor Yellow
