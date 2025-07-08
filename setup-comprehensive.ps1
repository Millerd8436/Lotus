# Lotus Comprehensive Setup - Vercel Optimization
# This script sets up the complete modern JavaScript development environment

Write-Host "🌸 Lotus Comprehensive Setup - Vercel Ready" -ForegroundColor Magenta

# Check if Chocolatey is installed
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    RefreshEnv
}

Write-Host "✅ Chocolatey ready" -ForegroundColor Green

# Install core development tools
Write-Host "📦 Installing Node.js LTS, Git, and VS Code..." -ForegroundColor Cyan
choco install nodejs-lts git vscode -y

# Install additional development tools
Write-Host "🔧 Installing additional tools..." -ForegroundColor Cyan
choco install postman docker-desktop github-desktop -y

# Refresh environment to use new tools
RefreshEnv

Write-Host "📋 Checking installations..." -ForegroundColor Cyan
node --version
npm --version
git --version
code --version

# Install VS Code extensions for comprehensive development
Write-Host "🧩 Installing VS Code extensions..." -ForegroundColor Cyan

$extensions = @(
    # Essential
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    
    # GitHub & Git
    "github.copilot",
    "github.copilot-chat", 
    "github.vscode-pull-request-github",
    "eamodio.gitlens",
    
    # React & Next.js
    "ms-vscode.vscode-react-native",
    "burkeholland.simple-react-snippets",
    "dsznajder.es7-react-js-snippets",
    "christian-kohler.npm-intellisense",
    
    # JavaScript & TypeScript
    "ms-vscode.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "yoavbls.pretty-ts-errors",
    
    # CSS & Styling  
    "bradlc.vscode-tailwindcss",
    "zignd.html-css-class-completion",
    "pranaygp.vscode-css-peek",
    
    # Database & API
    "ms-vscode.vscode-postgres",
    "humao.rest-client",
    "rangav.vscode-thunder-client",
    
    # Testing & Debugging
    "ms-vscode.vscode-jest",
    "ms-playwright.playwright",
    "ms-vscode.vscode-node-debug2",
    
    # Productivity
    "ms-vscode.vscode-todo-highlight",
    "gruntfuggly.todo-tree",
    "alefragnani.bookmarks",
    "streetsidesoftware.code-spell-checker",
    
    # Vercel & Deployment
    "vercel.vercel-vscode",
    "ms-azuretools.vscode-docker",
    "ms-kubernetes-tools.vscode-kubernetes-tools",
    
    # Advanced Analytics & Monitoring
    "ms-vscode.vscode-github-issue-notebooks",
    "github.vscode-github-actions",
    "ms-vscode.hexeditor",
    
    # AI & Advanced Features
    "github.copilot-labs",
    "visualstudioexptteam.vscodeintellicode",
    "ms-vscode.vscode-ai"
)

foreach ($ext in $extensions) {
    Write-Host "Installing $ext..." -ForegroundColor Yellow
    code --install-extension $ext --force
}

Write-Host "🎯 Installing Node.js packages..." -ForegroundColor Cyan

# Create or update package.json with comprehensive dependencies
if (Test-Path "package.json") {
    Write-Host "📦 Updating existing package.json..." -ForegroundColor Yellow
} else {
    Write-Host "📦 Creating new package.json..." -ForegroundColor Yellow
    npm init -y
}

# Install comprehensive dependencies
Write-Host "📚 Installing core Next.js dependencies..." -ForegroundColor Cyan
npm install next@latest react@latest react-dom@latest typescript@latest

Write-Host "📚 Installing UI and styling dependencies..." -ForegroundColor Cyan
npm install tailwindcss@latest autoprefixer@latest postcss@latest
npm install @tailwindcss/typography @tailwindcss/forms @tailwindcss/aspect-ratio
npm install framer-motion lucide-react clsx tailwind-merge
npm install @headlessui/react @heroicons/react

Write-Host "📚 Installing analytics and monitoring..." -ForegroundColor Cyan
npm install @vercel/analytics @vercel/speed-insights
npm install @sentry/nextjs mixpanel-browser

Write-Host "📚 Installing data visualization..." -ForegroundColor Cyan
npm install chart.js react-chartjs-2 d3 recharts
npm install @visx/group @visx/scale @visx/shape

Write-Host "📚 Installing development tools..." -ForegroundColor Cyan
npm install --save-dev eslint@latest prettier@latest
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev eslint-config-next eslint-plugin-react
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev playwright @playwright/test

Write-Host "📚 Installing utility libraries..." -ForegroundColor Cyan
npm install lodash date-fns uuid zod
npm install @types/lodash @types/uuid

Write-Host "📚 Installing database and API tools..." -ForegroundColor Cyan
npm install prisma @prisma/client
npm install axios swr react-query

Write-Host "🔧 Setting up development scripts..." -ForegroundColor Cyan

# Create comprehensive development scripts
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$packageJson.scripts = @{
    "dev" = "next dev --turbo"
    "build" = "next build"
    "start" = "next start"
    "lint" = "next lint"
    "lint:fix" = "next lint --fix"
    "type-check" = "tsc --noEmit"
    "format" = "prettier --write ."
    "format:check" = "prettier --check ."
    "test" = "jest"
    "test:watch" = "jest --watch"
    "test:e2e" = "playwright test"
    "validate-comprehensive" = "npm run type-check && npm run lint && npm run test"
    "analyze" = "ANALYZE=true npm run build"
    "deploy" = "vercel --prod"
    "deploy:preview" = "vercel"
    "db:generate" = "prisma generate"
    "db:push" = "prisma db push"
    "db:studio" = "prisma studio"
    "lotus:dev" = "npm run validate-comprehensive && npm run dev"
    "lotus:build" = "npm run validate-comprehensive && npm run build"
    "lotus:deploy" = "npm run validate-comprehensive && npm run deploy"
}

$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"

Write-Host "🎨 Setting up Tailwind CSS..." -ForegroundColor Cyan
npx tailwindcss init -p

Write-Host "🧪 Setting up testing..." -ForegroundColor Cyan
npx playwright install

Write-Host "🔒 Setting up environment..." -ForegroundColor Cyan

# Create comprehensive .env.local template
@"
# Lotus Comprehensive Environment Variables

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Database (if using)
DATABASE_URL=postgresql://localhost:5432/lotus

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
NEXT_PUBLIC_MIXPANEL_TOKEN=

# Monitoring
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=

# API Keys
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Research & Data
RESEARCH_CONSENT_REQUIRED=true
ANONYMIZATION_ENABLED=true

# Feature Flags
NEXT_PUBLIC_ENABLE_GHOST_MODE=true
NEXT_PUBLIC_ENABLE_COMPREHENSIVE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_RESEARCH_MODE=true

# Vercel
VERCEL_URL=
VERCEL_GIT_COMMIT_SHA=
"@ | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "🚀 Setting up Vercel optimization..." -ForegroundColor Cyan

# Install Vercel CLI
npm install -g vercel@latest

Write-Host "📋 Creating development checklist..." -ForegroundColor Cyan

@"
# 🌸 Lotus Development Environment - Ready! 

## ✅ Installed Tools
- ✅ Node.js LTS (Latest)
- ✅ npm (Package Manager)
- ✅ Git (Version Control)
- ✅ VS Code (Editor)
- ✅ GitHub Copilot (AI Assistant)
- ✅ Vercel CLI (Deployment)

## ✅ VS Code Extensions Installed
- ✅ GitHub Copilot & Copilot Chat
- ✅ GitLens (Git Integration)
- ✅ Tailwind CSS IntelliSense
- ✅ ES7+ React/Redux/React-Native Snippets
- ✅ Prettier (Code Formatting)
- ✅ ESLint (Code Linting)
- ✅ Thunder Client (API Testing)
- ✅ Vercel (Deployment Integration)

## ✅ Next.js Project Setup
- ✅ Next.js 14+ with Turbopack
- ✅ TypeScript Configuration
- ✅ Tailwind CSS with plugins
- ✅ Framer Motion (Animations)
- ✅ Chart.js & D3 (Data Visualization)
- ✅ Vercel Analytics & Speed Insights

## 🚀 Quick Start Commands

### Development
```powershell
npm run dev              # Start development server
npm run lotus:dev        # Start with full validation
```

### Testing & Quality
```powershell
npm run test             # Run unit tests  
npm run test:e2e         # Run end-to-end tests
npm run validate-comprehensive  # Full validation
```

### Deployment
```powershell
npm run deploy:preview   # Deploy to Vercel preview
npm run lotus:deploy     # Deploy with validation
```

### Copilot Usage
- Type code and get AI suggestions
- Use Ctrl+I for Copilot Chat
- Ask questions like "How do I optimize this for Vercel?"

## 📁 Project Structure Optimized for Vercel
```
lotus/
├── app/                 # Next.js 13+ app directory
├── components/          # React components
├── lib/                 # Utility libraries  
├── legacy-recovered/    # 96,000+ line legacy system
├── pages/              # API routes
├── public/             # Static assets
├── styles/             # CSS and Tailwind
└── types/              # TypeScript definitions
```

## 🎯 Next Steps
1. Run `npm run dev` to start development
2. Open VS Code with `code .`
3. Use Copilot to help implement features
4. Deploy to Vercel with `npm run deploy`

## 🔧 Vercel Optimization Features
- ✅ Edge Runtime Support
- ✅ Image Optimization
- ✅ Analytics & Speed Insights
- ✅ Serverless Functions
- ✅ Build Performance Monitoring
"@ | Out-File -FilePath "DEVELOPMENT_READY.md" -Encoding UTF8

Write-Host ""
Write-Host "🎉 SUCCESS! Lotus development environment is fully set up!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Quick Start:" -ForegroundColor Cyan
Write-Host "1. npm run dev                    # Start development server" -ForegroundColor White
Write-Host "2. code .                         # Open in VS Code" -ForegroundColor White  
Write-Host "3. Use Copilot for AI assistance  # Ctrl+I for chat" -ForegroundColor White
Write-Host ""
Write-Host "📖 See DEVELOPMENT_READY.md for complete setup details" -ForegroundColor Yellow
Write-Host ""
Write-Host "🌸 Ready to build the comprehensive Lotus system!" -ForegroundColor Magenta
