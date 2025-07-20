# Lotus Platform - System Connectivity Guide

graph TB
subgraph "Lotus Platform - Component Connectivity Analysis"

        subgraph "App Pages (Entry Points)"
            A[app/page.tsx] --> B[WebsitePhase]
            A --> C[ModeSelector]
            A --> D[LoadingSpinner]

            E[app/reflection/page.tsx] --> F[ReflectionDashboard]
        end

        subgraph "Active Components (Used)"
            B --> G[DeceptiveCheckoutFlow]
            F --> H[EducationProvider]
            F --> I[SimulationProvider]
        end

        subgraph "UI Components (All Connected)"
            C
            D
            UI1[Button]
            UI2[Card]
            UI3[Input/Select/Slider]
            UI4[InteractiveElements]
        end

        subgraph "Dark Pattern Components (Potentially Unused)"
            style DP1 fill:#ff9999
            style DP2 fill:#ff9999
            style DP3 fill:#ff9999
            style DP4 fill:#ff9999
            style DP5 fill:#ff9999

            DP1[AdvancedDarkPatternsDemo]
            DP2[DebtTrapMechanism]
            DP3[PaymentCollectionEngine]
            DP4[StateSpecificMessaging]
            DP5[RealtimeProcessingSimulator]
        end

        subgraph "Predatory Components (Unused)"
            style P1 fill:#ff6666
            style P2 fill:#ff6666
            style P3 fill:#ff6666
            style P4 fill:#ff6666

            P1[AutonomyTheater]
            P2[DebtCycleManager]
            P3[PrivacyConsentForm]
            P4[RealtimeAnalysisMonitor]
        end

        subgraph "Ethical Components (Unused)"
            style E1 fill:#ff6666
            style E2 fill:#ff6666
            style E3 fill:#ff6666
            style E4 fill:#ff6666
            style E5 fill:#ff6666
            style E6 fill:#ff6666

            E1[CoolingOffNotice]
            E2[EmpowermentDashboard]
            E3[EthicalHeader]
            E4[EthicalHomepage]
            E5[EthicalLoanCalculator]
            E6[EthicalLoanSummary]
        end
    end

    style A fill:#90EE90
    style E fill:#90EE90
    style B fill:#90EE90
    style F fill:#90EE90
    style G fill:#90EE90
    style H fill:#90EE90
    style I fill:#90EE90

## Overview

This document explains how all components, modules, and systems in the Lotus Platform connect and interact with each other.

## Core Architecture

### 1. Type System (Central Source of Truth)

**Location**: `types/index.ts`

All shared types are defined in a single location to prevent circular dependencies and ensure consistency:

- `LotusSession` - Main session data structure
- `UserProfile` - Behavioral and psychological profiling
- `RealisticFormData` - Form data collection
- `DarkPatternEvent` - Dark pattern tracking
- `AutonomyViolation` - Ethics violations

### 2. Core Libraries

#### Autonomy Theater Engine

**Location**: `lib/core/AutonomyTheaterEngine.ts`

Manages the manipulation of user perception through positive framing:

- Tracks user actions and progress
- Generates manipulative messaging
- Analyzes manipulation levels

#### Behavioral Psychology Engine

**Location**: `lib/core/behavioral-engine.ts`

Analyzes user behavior and updates psychological profiles:

- Imports types from `@/types`
- Updates `UserProfile` based on interactions
- Calculates vulnerability scores
- Predicts user behavior

#### Loan Calculator

**Location**: `lib/core/LoanCalculator.js`

Handles all loan-related calculations:

- State-specific APR calculations
- Regulatory compliance checking
- Debt trap metrics

#### Session Manager

**Location**: `lib/core/SessionManager.ts`

Manages session state and analytics:

- Imports `LotusSession` from `@/types`
- Tracks user choices and violations
- Generates session reports

#### Theme System

**Location**: `lib/core/theme.ts`

Centralized theming for consistent UI:

- Theme definitions for each phase
- Helper functions for component styling
- Urgency and manipulation indicators

### 3. Utility Functions

**Location**: `lib/utils.ts`

Organized by category:

- CSS & Styling utilities
- Formatting utilities
- Loan calculations
- State regulations
- Validation utilities
- Dark pattern detection
- Ethics analysis

### 4. Component Structure

#### UI Components (`components/ui/`)

Base UI components with theming support:

- `Button.tsx` - Including dark pattern variants
- `Card.tsx` - With manipulation contexts
- `LoadingSpinner.tsx` - Phase-specific loading states
- `InteractiveElements.tsx` - Modals, tooltips, notifications
- `ModeSelector.tsx` - Phase navigation

#### Feature Components

- **Predatory** (`components/predatory/`)

  - AutonomyTheater
  - DebtCycleManager
  - RealtimeAnalysisMonitor

- **Ethical** (`components/ethical/`)

  - EthicalHomepage
  - EthicalLoanCalculator
  - CoolingOffNotice

- **Reflection** (`components/reflection/`)
  - ReflectionDashboard
  - EthicalFrameworksExplainer

#### Providers (`components/providers/`)

- `SimulationProvider` - Main state management
- `EducationProvider` - Educational content delivery

### 5. Data Flow

```
User Input → Component → Provider → Core Library → Type System
     ↓           ↓           ↓            ↓            ↓
   Event    State Update  Calculate    Validate    Store
     ↓           ↓           ↓            ↓            ↓
Analytics   Re-render    Results     Compliance   Session
```

### 6. Phase System

The platform operates in three distinct phases:

1. **Phase 1 - Exploitative** (`/`)

   - Uses predatory components
   - Dark patterns enabled
   - Manipulation tracking active

2. **Phase 2 - Ethical** (`/ethical`)

   - Uses ethical components
   - Transparent information
   - Consumer protection

3. **Phase 3 - Analysis** (`/reflection`)
   - Comparison and education
   - Behavioral analysis
   - Learning outcomes

### 7. Import Patterns

#### Standard Imports

```typescript
// Types
import { LotusSession, UserProfile } from "@/types";

// Utils
import { formatCurrency, calculateAPR } from "@/lib/utils";

// Core
import { AutonomyTheaterEngine } from "@/lib/core/AutonomyTheaterEngine";
import { BehavioralPsychologyEngine } from "@/lib/core/behavioral-engine";

// Components
import { Button, Card, LoadingSpinner } from "@/components";

// Themes
import { getThemeForPhase, THEMES } from "@/lib/core/theme";
```

### 8. State Management

#### Local State

- Component-level state using React hooks
- Form data management
- UI interactions

#### Global State

- Session data via SimulationProvider
- User profile via context
- Phase management

#### Persistent State

- LocalStorage for session continuity
- Analytics data collection
- User preferences

### 9. API Integration

**Location**: `app/api/`

Server-side endpoints:

- `/api/health` - System health check
- `/api/phase-one` - Exploitative phase processing
- `/api/phase-two` - Ethical phase processing
- `/api/phase-three` - Analysis and reporting

### 10. Build & Deployment

#### Scripts (`scripts/`)

- `cleanup-types.js` - Type consolidation
- `consolidate-ui.js` - UI component organization
- `deploy.js` - Deployment automation
- `health-check.js` - System verification
- `validate.js` - Code validation

#### Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Styling configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## Best Practices

### 1. Type Safety

- Always import types from `@/types`
- Use proper type annotations
- Avoid `any` types

### 2. Component Organization

- Keep components focused and single-purpose
- Use composition over inheritance
- Export through index files

### 3. State Management

- Use appropriate state level (local vs global)
- Avoid prop drilling
- Keep state close to where it's used

### 4. Performance

- Use dynamic imports for heavy components
- Implement proper memoization
- Optimize re-renders

### 5. Testing

- Unit test utilities and calculations
- Integration test user flows
- E2E test critical paths

## Troubleshooting

### Common Issues

1. **Type Conflicts**

   - Ensure importing from `@/types`
   - Check for duplicate definitions
   - Run type validation script

2. **Component Not Found**

   - Check export in component index
   - Verify file naming convention
   - Check import path

3. **State Sync Issues**

   - Verify provider wrapping
   - Check context usage
   - Debug with React DevTools

4. **Theme Inconsistencies**
   - Import from theme system
   - Use theme helper functions
   - Check phase configuration

## Future Enhancements

1. **GraphQL Integration**

   - Type-safe API queries
   - Real-time subscriptions
   - Optimistic updates

2. **Advanced Analytics**

   - Machine learning integration
   - Predictive modeling
   - A/B testing framework

3. **Internationalization**

   - Multi-language support
   - Locale-specific regulations
   - Cultural adaptation

4. **Accessibility**
   - WCAG compliance
   - Screen reader support
   - Keyboard navigation
