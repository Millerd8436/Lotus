#!/usr/bin/env node

/**
 * 🌸 Lotus Vercel Deployment Organizer
 * 
 * Organizes all files for optimal Vercel deployment
 * Ensures proper structure, connectivity, and performance
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class VercelOrganizer {
  constructor() {
    this.organized = [];
    this.errors = [];
    this.warnings = [];
    this.fileCount = 0;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      error: `${colors.red}❌ ERROR${colors.reset}`,
      warning: `${colors.yellow}⚠️  WARNING${colors.reset}`,
      success: `${colors.green}✅ SUCCESS${colors.reset}`,
      info: `${colors.blue}ℹ️  INFO${colors.reset}`
    }[type];
    
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async createDirectoryStructure() {
    this.log('📁 Creating optimal directory structure for Vercel...', 'info');
    
    const directories = [
      'app',
      'app/api',
      'app/api/lotus',
      'app/api/lotus/session',
      'app/api/lotus/comprehensive',
      'app/api/lotus/analytics',
      'app/api/lotus/behavioral',
      'components',
      'components/ui',
      'components/predatory',
      'components/ethical',
      'components/educational',
      'components/providers',
      'lib',
      'lib/core',
      'lib/predatory',
      'lib/educational',
      'lib/utils',
      'types',
      'data',
      'public',
      'public/images',
      'public/icons',
      'styles',
      'docs',
      'scripts',
      'tests',
      'tests/__tests__',
      'tests/e2e',
      'tests/fixtures'
    ];

    for (const dir of directories) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.organized.push(`Created directory: ${dir}`);
      } else {
        this.organized.push(`Directory exists: ${dir}`);
      }
    }
  }

  async organizeAppRouter() {
    this.log('🏠 Organizing App Router structure...', 'info');
    
    // Ensure critical App Router files exist
    const appFiles = {
      'app/layout.tsx': this.generateLayoutFile(),
      'app/page.tsx': this.generatePageFile(),
      'app/globals.css': this.generateGlobalsCSS(),
      'app/loading.tsx': this.generateLoadingFile(),
      'app/error.tsx': this.generateErrorFile(),
      'app/not-found.tsx': this.generateNotFoundFile()
    };

    for (const [filePath, content] of Object.entries(appFiles)) {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        this.organized.push(`Created App Router file: ${filePath}`);
      }
    }
  }

  generateLayoutFile() {
    return `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '🌸 Lotus - Comprehensive Payday Loan Educational Platform',
  description: 'Advanced 3-Phase educational simulator with 96,000+ lines of behavioral analysis',
  keywords: ['education', 'financial-literacy', 'predatory-lending', 'consumer-protection'],
  authors: [{ name: 'Lotus Research Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Lotus Educational Platform',
    description: 'Learn about predatory lending through interactive simulation',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}`;
  }

  generatePageFile() {
    return `import LotusSimulator from '@/components/LotusSimulator'
import { ModeSelector } from '@/components/ui/ModeSelector'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌸 Lotus Comprehensive Educational Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced 3-Phase Payday Loan Simulator with 96,000+ Lines of Behavioral Analysis
          </p>
        </header>
        
        <ModeSelector />
        
        <div className="mt-8">
          <LotusSimulator phase={1} onPhaseComplete={() => {}} />
        </div>
      </div>
    </main>
  )
}`;
  }

  generateGlobalsCSS() {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

/* Lotus-specific styles */
.lotus-simulator {
  @apply max-w-6xl mx-auto;
}

.phase-content {
  @apply p-6 bg-white rounded-lg shadow-lg;
}

.exploitative {
  @apply border-l-4 border-red-500;
}

.ethical {
  @apply border-l-4 border-green-500;
}

.reflection {
  @apply border-l-4 border-blue-500;
}

/* Dark pattern styling */
.dark-pattern {
  @apply bg-red-50 border border-red-200;
}

.ghost-warning {
  @apply bg-yellow-100 border border-yellow-300 p-3 rounded text-yellow-800;
}

/* Educational overlay styles */
.educational-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.educational-content {
  @apply bg-white p-6 rounded-lg max-w-2xl mx-4 max-h-[80vh] overflow-y-auto;
}`;
  }

  generateLoadingFile() {
    return `export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
    </div>
  )
}`;
  }

  generateErrorFile() {
    return `'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        Try again
      </button>
    </div>
  )
}`;
  }

  generateNotFoundFile() {
    return `import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-4">Could not find the requested resource</p>
      <Link
        href="/"
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        Return Home
      </Link>
    </div>
  )
}`;
  }

  async organizeAPI() {
    this.log('🔌 Organizing API routes...', 'info');
    
    const apiFiles = {
      'app/api/lotus/session/route.ts': this.generateSessionAPI(),
      'app/api/lotus/comprehensive/route.ts': this.generateComprehensiveAPI(),
      'app/api/lotus/analytics/route.ts': this.generateAnalyticsAPI(),
      'app/api/lotus/behavioral/route.ts': this.generateBehavioralAPI()
    };

    for (const [filePath, content] of Object.entries(apiFiles)) {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        this.organized.push(`Created API route: ${filePath}`);
      }
    }
  }

  generateSessionAPI() {
    return `import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Create new session
    const sessionId = \`lotus_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`
    
    const session = {
      sessionId,
      timestamp: new Date().toISOString(),
      currentPhase: 'exploitative',
      amount: body.amount || 300,
      termDays: body.termDays || 14,
      state: body.state || 'TX',
      researchConsent: body.researchConsent || false,
      anonymizedData: true
    }
    
    return NextResponse.json({ 
      success: true, 
      sessionId,
      session 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')
  
  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: 'Session ID required' },
      { status: 400 }
    )
  }
  
  // In a real app, you'd fetch from database
  return NextResponse.json({ 
    success: true, 
    session: { sessionId, status: 'active' }
  })
}`;
  }

  generateComprehensiveAPI() {
    return `import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Process comprehensive analysis
    const analysis = {
      timestamp: new Date().toISOString(),
      sessionId: body.sessionId,
      phase: body.phase,
      manipulationScore: body.manipulationScore || 0,
      coercionIndex: body.coercionIndex || 0,
      autonomyViolations: body.autonomyViolations || [],
      behavioralData: body.behavioralData || {},
      kantianAnalysis: body.kantianAnalysis || {}
    }
    
    return NextResponse.json({ 
      success: true, 
      analysis 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process analysis' },
      { status: 500 }
    )
  }
}`;
  }

  generateAnalyticsAPI() {
    return `import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Process analytics data
    const analytics = {
      timestamp: new Date().toISOString(),
      sessionId: body.sessionId,
      eventType: body.eventType,
      data: body.data,
      anonymized: true
    }
    
    return NextResponse.json({ 
      success: true, 
      analytics 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process analytics' },
      { status: 500 }
    )
  }
}`;
  }

  generateBehavioralAPI() {
    return `import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Process behavioral data
    const behavioral = {
      timestamp: new Date().toISOString(),
      sessionId: body.sessionId,
      behaviorType: body.behaviorType,
      metrics: body.metrics,
      vulnerabilityScore: body.vulnerabilityScore || 0,
      manipulationSusceptibility: body.manipulationSusceptibility || {}
    }
    
    return NextResponse.json({ 
      success: true, 
      behavioral 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process behavioral data' },
      { status: 500 }
    )
  }
}`;
  }

  async organizeComponents() {
    this.log('🧩 Organizing React components...', 'info');
    
    // Create essential UI components
    const uiComponents = {
      'components/ui/Button.tsx': this.generateButtonComponent(),
      'components/ui/Card.tsx': this.generateCardComponent(),
      'components/ui/Modal.tsx': this.generateModalComponent(),
      'components/ui/ProgressBar.tsx': this.generateProgressBarComponent(),
      'components/ui/ModeSelector.tsx': this.generateModeSelectorComponent()
    };

    for (const [filePath, content] of Object.entries(uiComponents)) {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        this.organized.push(`Created UI component: ${filePath}`);
      }
    }
  }

  generateButtonComponent() {
    return `import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }`;
  }

  generateCardComponent() {
    return `import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`;
  }

  generateModalComponent() {
    return `'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

export function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto',
          className
        )}
      >
        {title && (
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}`;
  }

  generateProgressBarComponent() {
    return `import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className,
  showLabel = false 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    </div>
  )
}`;
  }

  generateModeSelectorComponent() {
    return `'use client'

import React from 'react'
import { Button } from './Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card'

interface ModeSelectorProps {
  onModeSelect?: (mode: 'exploitative' | 'ethical' | 'educational') => void
}

export function ModeSelector({ onModeSelect }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-red-600">🕷️ Exploitative Mode</CardTitle>
          <CardDescription>
            Experience predatory lending tactics with full dark pattern exposure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => onModeSelect?.('exploitative')}
            className="w-full"
          >
            Start Exploitative Experience
          </Button>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-green-600">✨ Ethical Mode</CardTitle>
          <CardDescription>
            Compare with transparent, regulated lending practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => onModeSelect?.('ethical')}
            variant="outline"
            className="w-full"
          >
            Start Ethical Experience
          </Button>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-blue-600">🎓 Educational Mode</CardTitle>
          <CardDescription>
            Guided learning with explanations and behavioral analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => onModeSelect?.('educational')}
            variant="secondary"
            className="w-full"
          >
            Start Educational Mode
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}`;
  }

  async organizeLib() {
    this.log('📚 Organizing library modules...', 'info');
    
    const libFiles = {
      'lib/utils.ts': this.generateUtilsFile(),
      'lib/constants.ts': this.generateConstantsFile(),
      'lib/types.ts': this.generateTypesFile()
    };

    for (const [filePath, content] of Object.entries(libFiles)) {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        this.organized.push(`Created lib file: ${filePath}`);
      }
    }
  }

  generateUtilsFile() {
    return `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export function calculateAPR(principal: number, fee: number, termDays: number): number {
  return ((fee / principal) * (365 / termDays)) * 100
}

export function generateSessionId(): string {
  return \`lotus_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}`;
  }

  generateConstantsFile() {
    return `// Lotus Educational Platform Constants

export const APP_CONFIG = {
  name: 'Lotus Comprehensive Educational Platform',
  version: '3.0.0-comprehensive',
  description: 'Advanced 3-Phase Payday Loan Simulator with 96,000+ Lines of Behavioral Analysis',
  author: 'Lotus Research Team',
  repository: 'https://github.com/lotus-platform/comprehensive-simulator',
} as const

export const PHASES = {
  EXPLOITATIVE: 1,
  ETHICAL: 2,
  REFLECTION: 3,
} as const

export const LOAN_DEFAULTS = {
  MIN_AMOUNT: 100,
  MAX_AMOUNT: 1000,
  DEFAULT_AMOUNT: 300,
  MIN_TERM: 7,
  MAX_TERM: 30,
  DEFAULT_TERM: 14,
  DEFAULT_STATE: 'TX',
} as const

export const STATES = {
  TX: { name: 'Texas', maxAPR: 664, allowRollover: true },
  CA: { name: 'California', maxAPR: 36, allowRollover: false },
  NY: { name: 'New York', maxAPR: 25, allowRollover: false },
  FL: { name: 'Florida', maxAPR: 304, allowRollover: true },
} as const

export const DARK_PATTERNS = {
  URGENCY_TIMER: 'urgency_timer',
  FAKE_SCARCITY: 'fake_scarcity',
  HIDDEN_FEES: 'hidden_fees',
  SOCIAL_PROOF: 'social_proof',
  PRE_CHECKED_BOXES: 'pre_checked_boxes',
  ROLLOVER_TRAP: 'rollover_trap',
  FEE_OBFUSCATION: 'fee_obfuscation',
  ARTIFICIAL_SCARCITY: 'artificial_scarcity',
} as const

export const COERCION_LEVELS = {
  MINIMAL: { min: 0, max: 19, label: 'MINIMAL' },
  LOW: { min: 20, max: 39, label: 'LOW' },
  MODERATE: { min: 40, max: 59, label: 'MODERATE' },
  HIGH: { min: 60, max: 79, label: 'HIGH' },
  EXTREME: { min: 80, max: 100, label: 'EXTREME' },
} as const

export const API_ENDPOINTS = {
  SESSION: '/api/lotus/session',
  COMPREHENSIVE: '/api/lotus/comprehensive',
  ANALYTICS: '/api/lotus/analytics',
  BEHAVIORAL: '/api/lotus/behavioral',
} as const

export const LOCAL_STORAGE_KEYS = {
  SESSION_ID: 'lotus_session_id',
  USER_PREFERENCES: 'lotus_user_preferences',
  RESEARCH_CONSENT: 'lotus_research_consent',
  GHOST_MODE: 'lotus_ghost_mode',
} as const`;
  }

  generateTypesFile() {
    return `// Core Lotus Type Definitions

export interface LoanSession {
  sessionId: string
  timestamp: string
  currentPhase: 'exploitative' | 'ethical' | 'reflection'
  amount: number
  termDays: number
  state: string
  fee: number
  apr: number
  rolloverCount: number
  totalCost: number
  researchConsent: boolean
  anonymizedData: boolean
}

export interface DarkPatternEvent {
  type: string
  timestamp: string
  phase: string
  details: Record<string, any>
  ethicalConcern: 'low' | 'medium' | 'high' | 'critical'
  userResponse?: any
  effectiveness?: number
}

export interface AutonomyViolation {
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  timestamp: string
  kantianViolation: string
}

export interface BehavioralEvent {
  eventType: string
  timestamp: string
  phase: string
  data: Record<string, any>
  psychologicalIndicators: Record<string, string>
  cognitiveState: CognitiveState
}

export interface CognitiveState {
  system1_dominance: boolean
  cognitive_load: number
  decision_fatigue: number
  stress_level: number
  attention_level: number
}

export interface KantianAnalysis {
  universalizability: number
  humanityPrinciple: number
  autonomyRespect: number
  moralWorth: number
  categoricalImperative: boolean
  ethicalAssessment: string
}

export interface EducationalProgress {
  module: string
  completion: number
  comprehension: number
  timestamp: string
}

export interface LearningOutcome {
  objective: string
  achieved: boolean
  proficiency: number
  evidence: string[]
}

export interface ReflectionData {
  phasesCompared: string[]
  insights: string[]
  behavioralChanges: string[]
  ethicalReflections: string[]
  futureCommitments: string[]
}

export interface StateRegulation {
  state: string
  maxAPR: number
  minTermDays: number
  allowRollover: boolean
  maxRollovers: number
  coolingOffPeriod: number
  description: string
  consumerProtections: string[]
  regulatoryAgency: string
  enforcementStrength: number
  industryInfluence: number
}

export interface ComprehensiveSessionState extends LoanSession {
  darkPatterns: DarkPatternEvent[]
  complianceViolations: any[]
  behavioralData: BehavioralEvent[]
  decisionPoints: any[]
  coercionIndex: number
  autonomyViolations: AutonomyViolation[]
  kantianAnalysis: KantianAnalysis | null
  ethicsScore: number
  educationalProgress: EducationalProgress[]
  learningOutcomes: LearningOutcome[]
  reflectionData: ReflectionData | null
}`;
  }

  async cleanUnnecessaryFiles() {
    this.log('🧹 Cleaning unnecessary files...', 'info');
    
    const filesToRemove = [
      'index.html',
      'comprehensive_index.html',
      'apply.html',
      'apply-realistic.html',
      'reflect.html',
      'test.html',
      'test-connectivity.html',
      'index-simple.html',
      'index_github_pages.html',
      'app.js',
      'app_working.js',
      'main.js',
      'global.js',
      'ui-components.js',
      'ui-components-full.js',
      'utils.js',
      'lotus_core.js',
      'autonomy_theater.js',
      'sw.js',
      'manifest.json',
      '.nojekyll'
    ];

    for (const file of filesToRemove) {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        this.organized.push(`Removed unnecessary file: ${file}`);
      }
    }
  }

  async updatePackageJson() {
    this.log('📦 Updating package.json scripts...', 'info');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Add organization scripts
      packageJson.scripts = {
        ...packageJson.scripts,
        'organize': 'node scripts/organize-for-vercel.js',
        'validate-connectivity': 'node scripts/validate-connectivity.js',
        'predeploy': 'npm run organize && npm run validate-connectivity'
      };
      
      fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
      this.organized.push('Updated package.json with organization scripts');
      
    } catch (error) {
      this.errors.push(`Failed to update package.json: ${error.message}`);
    }
  }

  async generateReport() {
    this.log('\n📋 VERCEL ORGANIZATION REPORT', 'info');
    this.log('=' .repeat(50), 'info');
    
    this.log(`\n📊 SUMMARY:`, 'info');
    this.log(`Files organized: ${this.organized.length}`, 'info');
    this.log(`Errors: ${this.errors.length}`, 'error');
    this.log(`Warnings: ${this.warnings.length}`, 'warning');
    
    if (this.errors.length > 0) {
      this.log('\n❌ ERRORS:', 'error');
      this.errors.forEach(error => this.log(`  • ${error}`, 'error'));
    }
    
    if (this.warnings.length > 0) {
      this.log('\n⚠️  WARNINGS:', 'warning');
      this.warnings.forEach(warning => this.log(`  • ${warning}`, 'warning'));
    }
    
    if (this.organized.length > 0) {
      this.log('\n✅ ORGANIZED:', 'success');
      this.organized.slice(0, 20).forEach(item => this.log(`  • ${item}`, 'success'));
      if (this.organized.length > 20) {
        this.log(`  ... and ${this.organized.length - 20} more`, 'success');
      }
    }
    
    this.log('\n🚀 NEXT STEPS:', 'info');
    this.log('1. Run: npm run validate-connectivity', 'info');
    this.log('2. Run: npm run build', 'info');
    this.log('3. Run: npm run deploy', 'info');
  }

  async run() {
    this.log('🌸 Starting Lotus Vercel Organization', 'info');
    this.log('Organizing files for optimal Vercel deployment...', 'info');
    
    await this.createDirectoryStructure();
    await this.organizeAppRouter();
    await this.organizeAPI();
    await this.organizeComponents();
    await this.organizeLib();
    await this.cleanUnnecessaryFiles();
    await this.updatePackageJson();
    
    this.generateReport();
    
    if (this.errors.length > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
}

// Run the organizer
const organizer = new VercelOrganizer();
organizer.run().catch(error => {
  console.error('Organization failed:', error);
  process.exit(1);
}); 