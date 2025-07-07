# Lotus Payday Loan Simulator

A comprehensive educational platform exposing predatory lending practices through interactive simulation. Built for Vercel deployment with Next.js architecture.

## 🎯 Project Mission

Lotus is an educational tool that demonstrates the mechanics of predatory payday lending by allowing users to experience both exploitative and ethical loan scenarios. Through interactive simulation, users learn to recognize dark patterns, understand debt traps, and discover better financial alternatives.

## 🏗️ Architecture Overview

### Core Educational Framework

The simulation is built around three primary modes:

1. **Predatory Mode**: Full implementation of exploitative tactics used by predatory lenders
2. **Ethical Mode**: Transparent, regulated lending practices 
3. **Ghost Mode**: Educational overlay revealing hidden manipulation tactics

### Technical Stack

- **Frontend**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with custom dark pattern components
- **State Management**: React Context + localStorage persistence
- **Deployment**: Vercel with edge functions
- **Data**: JSON-based configuration and educational content

## 📁 Directory Structure

```
├── README.md                    # This documentation
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── vercel.json                 # Vercel deployment config
├── tailwind.config.js          # Tailwind CSS configuration
│
├── app/                        # Next.js 13+ App Router
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page with mode selection
│   ├── globals.css             # Global styles
│   ├── predatory/              # Predatory loan simulation
│   │   └── page.tsx
│   ├── ethical/                # Ethical loan alternative
│   │   └── page.tsx
│   ├── compare/                # Side-by-side comparison
│   │   └── page.tsx
│   ├── quiz/                   # Educational quizzes
│   │   └── page.tsx
│   └── reflect/                # Reflection and analysis
│       └── page.tsx
│
├── components/                 # React components
│   ├── ui/                     # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ProgressBar.tsx
│   ├── simulation/             # Simulation-specific components
│   │   ├── LoanCalculator.tsx
│   │   ├── APRDisplay.tsx
│   │   ├── ConsentBar.tsx
│   │   └── StateSelector.tsx
│   ├── predatory/              # Dark pattern components
│   │   ├── UrgencyTimer.tsx
│   │   ├── FakeLiveFeed.tsx
│   │   ├── PreCheckedBoxes.tsx
│   │   ├── HiddenFees.tsx
│   │   └── RolloverTrap.tsx
│   ├── educational/            # Educational components
│   │   ├── GhostModeOverlay.tsx
│   │   ├── ExplanationPopup.tsx
│   │   ├── ProgressTracker.tsx
│   │   └── QuizEngine.tsx
│   └── providers/              # Context providers
│       ├── SimulationProvider.tsx
│       └── EducationProvider.tsx
│
├── lib/                        # Core business logic
│   ├── core/                   # Core simulation engines
│   │   ├── LoanCalculator.ts   # APR and fee calculations
│   │   ├── StateRegulations.ts # State-specific lending rules
│   │   ├── SessionManager.ts   # User session tracking
│   │   └── DataExporter.ts     # Analytics and data export
│   ├── predatory/              # Predatory lending mechanics
│   │   ├── DarkPatternEngine.ts    # Dark UI pattern orchestration
│   │   ├── DebtTrapMechanics.ts    # Rollover and debt cycle logic
│   │   ├── PsychologyEngine.ts     # Behavioral manipulation tactics
│   │   ├── FeeObfuscation.ts       # APR hiding techniques
│   │   ├── CoercionIndex.ts        # Manipulation intensity tracking
│   │   └── ACHExploitation.ts      # Payment priority exploitation
│   ├── educational/            # Educational systems
│   │   ├── GhostModeController.ts  # Educational overlay system
│   │   ├── ConceptExplainer.ts     # In-context explanations
│   │   ├── ProgressTracker.ts      # Learning progress tracking
│   │   ├── QuizEngine.ts           # Interactive quiz system
│   │   └── AssessmentEngine.ts     # Knowledge evaluation
│   └── utils/                  # Shared utilities
│       ├── formatting.ts       # Currency and percentage formatting
│       ├── validation.ts       # Input validation and sanitization
│       ├── analytics.ts        # User interaction tracking
│       └── constants.ts        # Configuration constants
│
├── data/                       # Static data and configuration
│   ├── state-regulations.json  # State-by-state lending rules
│   ├── quiz-questions.json     # Educational quiz content
│   ├── dark-patterns.json      # Dark pattern definitions
│   ├── educational-content.json # Learning modules
│   └── alternatives.json       # Ethical lending alternatives
│
├── public/                     # Static assets
│   ├── images/                 # UI images and icons
│   └── favicon.ico
│
└── styles/                     # Additional styling
    ├── dark-patterns.css       # Predatory UI styling
    ├── educational.css         # Educational overlay styling
    └── components.css          # Component-specific styles
```

## 🔧 Core Features Implementation

### 1. Loan Calculation Engine (`lib/core/LoanCalculator.ts`)

**Mathematical Foundation:**
- APR Calculation: `((fee / principal) × (365 / term_days)) × 100`
- Debt Trap Metrics: Cumulative cost tracking across rollovers
- State Compliance: Automatic regulation checking per jurisdiction

**Key Functions:**
```typescript
calculateTrueAPR(principal: number, fee: number, termDays: number): number
generateLoanTerms(amount: number, state: string, mode: 'predatory' | 'ethical'): LoanTerms
calculateRolloverCost(session: LoanSession, rolloverNumber: number): number
assessDebtTrapRisk(session: LoanSession): DebtTrapMetrics
```

### 2. Dark Pattern Engine (`lib/predatory/DarkPatternEngine.ts`)

**Predatory Tactics Implemented:**
- **Fee Obfuscation**: Display "$15 per $100" instead of "391% APR"
- **Pre-checked Boxes**: Auto-renewal and ACH consent defaults
- **Artificial Urgency**: Fake countdown timers and scarcity claims
- **Rollover Traps**: Celebration language for debt extensions
- **Social Proof Deception**: Fake live feed of "recent approvals"
- **ACH Priority**: Explaining payment prioritization risks

### 3. Educational System (`lib/educational/`)

**Ghost Mode Controller:**
- Reveals all dark patterns with educational explanations
- Side-by-side ethical alternatives
- Real-time manipulation exposure
- Progressive disclosure of predatory mechanics

**Quiz Engine:**
- Interactive knowledge assessments
- Behavioral psychology education
- Legal loophole explanations
- Debt cycle mathematics

### 4. State Regulations (`lib/core/StateRegulations.ts`)

**Regulatory Coverage:**
- APR caps by state (e.g., CA: 36%, TX: 664%)
- Rollover restrictions and cooling-off periods
- Fee structure limitations
- Disclosure requirements
- Legal loophole documentation

## 🎮 User Experience Flow

### 1. Mode Selection
Users choose between:
- **Predatory Experience**: Full dark pattern exposure
- **Ethical Alternative**: Transparent, regulated experience
- **Educational Mode**: Guided learning with explanations

### 2. Loan Simulation
- State selection (impacts regulations)
- Loan amount and term configuration
- Real-time APR and cost calculation
- Interactive form with dark patterns (predatory mode)

### 3. Educational Intervention
- Ghost mode toggle for pattern revelation
- Pop-up explanations for manipulative elements
- Progressive learning modules
- Knowledge assessment quizzes

### 4. Reflection and Analysis
- Side-by-side cost comparison
- Debt cycle visualization
- Alternative lending options
- Personal reflection prompts

## 📊 Data Collection and Analytics

### User Interaction Tracking
- Dark pattern exposure and responses
- Educational module completion
- Quiz performance and misconceptions
- Mode preference and switching behavior

### Educational Effectiveness Metrics
- Time spent in ghost mode
- Pattern recognition improvement
- Behavioral change indicators
- Knowledge retention assessment

### Research Data Export
- Anonymized session data
- Aggregated user behavior patterns
- Educational intervention effectiveness
- Dark pattern impact measurement

## 🚀 Deployment Architecture

### Vercel Configuration (`vercel.json`)
```json
{
  "builds": [
    { "src": "next.config.js", "use": "@vercel/next" }
  ],
  "functions": {
    "app/api/**.ts": {
      "maxDuration": 10
    }
  },
  "env": {
    "NEXT_PUBLIC_SIMULATION_MODE": "production"
  }
}
```

### Environment Configuration
- **Development**: Full logging and debug modes
- **Production**: Optimized performance with analytics
- **Research**: Enhanced data collection capabilities

## 🔬 Educational Research Applications

### Academic Use Cases
- **Behavioral Economics**: Dark pattern effectiveness measurement
- **Consumer Protection**: Predatory lending impact assessment
- **Financial Literacy**: Educational intervention testing
- **Policy Research**: Regulatory effectiveness evaluation

### Data Privacy and Ethics
- No personally identifiable information collection
- Transparent data usage policies
- Opt-in analytics participation
- Regular data purging protocols

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
git clone [repository]
cd lotus-simulator
npm install
npm run dev
```

### Key Commands
- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run test`: Run test suite
- `npm run lint`: Code quality check
- `npm run deploy`: Deploy to Vercel

## 🧪 Testing Strategy

### Unit Tests
- Loan calculation accuracy
- State regulation compliance
- Dark pattern detection
- Educational content delivery

### Integration Tests
- Mode switching functionality
- Data persistence and export
- Educational progress tracking
- User interaction flows

### User Experience Testing
- Dark pattern effectiveness (ethical research context)
- Educational intervention impact
- Navigation and usability
- Cross-device compatibility

## 📈 Performance Considerations

### Optimization Strategies
- Next.js static generation for educational content
- Component lazy loading for complex simulations
- Efficient state management with React Context
- Vercel edge caching for data-heavy operations

### Monitoring
- Real-time performance metrics
- User engagement analytics
- Educational effectiveness tracking
- Error reporting and resolution

## 🤝 Contributing

### Code Standards
- TypeScript strict mode
- ESLint configuration for consistency
- Prettier for code formatting
- Comprehensive documentation requirements

### Educational Content Guidelines
- Evidence-based explanations
- Clear, accessible language
- Interactive learning elements
- Regular content accuracy reviews

## 📚 Research and References

### Academic Sources
- Consumer Financial Protection Bureau reports
- Behavioral economics research on predatory lending
- Financial literacy intervention studies
- Dark pattern research and taxonomy

### Legal References
- State usury law documentation
- Federal lending regulation summaries
- Consumer protection statute analysis
- Regulatory enforcement case studies

## 🔒 Security and Privacy

### Data Protection
- No sensitive financial information storage
- Encrypted data transmission
- Regular security audits
- GDPR compliance measures

### Ethical Considerations
- Clear educational purpose disclosure
- No actual financial products offered
- Transparent simulation boundaries
- Responsible dark pattern demonstration

---

**Lotus Payday Loan Simulator** - Educational tool for financial literacy and consumer protection research.

Built with ❤️ for financial education and consumer protection.
