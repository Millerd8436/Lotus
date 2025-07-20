# UI Components Documentation

## 🎨 Component Library Overview

### Core Components

#### Button Component

- **Location**: `components/ui/Button.tsx`
- **Variants**:
  - Standard Button with multiple variants (primary, secondary, danger, etc.)
  - UrgencyButton - For time-sensitive actions
  - DarkPatternButton - Educational component showing manipulation
  - PreCheckedButton - Shows pre-selection dark patterns

#### Card Component

- **Location**: `components/ui/Card.tsx`
- **Variants**:
  - Standard Card with themes
  - DarkPatternCard - Shows manipulation severity
  - UrgencyCard - Time-pressure visualization
  - PreCheckedCard - Pre-selection patterns
  - ComparisonCard - For A/B comparisons

#### Form Components

- **Input**: `components/ui/Input.tsx` - Standard form input
- **Checkbox**: `components/ui/Checkbox.tsx` - Radix UI checkbox
- **Select**: `components/ui/Select.tsx` - Dropdown select
- **Slider**: `components/ui/Slider.tsx` - Range slider

#### Loading Components

- **Location**: `components/ui/LoadingSpinner.tsx`
- **Components**:
  - LoadingSpinner - Themed spinner with progress
  - SkeletonLoader - Content placeholder
  - PageLoadingOverlay - Full-page loading state

#### Interactive Elements

- **Location**: `components/ui/InteractiveElements.tsx`
- **Components**:
  - Tooltip - Contextual information
  - Modal - Dialog overlay
  - AnimatedCounter - Number animations
  - ProgressBar - Progress visualization
  - Notification - Toast notifications
  - HoverCard - Hover information cards

### Feature Components

#### Dark Pattern Demonstrations

- **AdvancedDarkPatternsDemo**: Interactive showcase of 20+ dark patterns
- **DebtTrapMechanism**: Simulates debt cycle mechanics
- **PaymentCollectionEngine**: Comprehensive payment exploitation simulation (includes ACH features)

#### Processing Simulations

- **RealtimeProcessingSimulator**: Loan processing visualization
- **IncomeVerificationSimulator**: Income verification flow
- **ElectronicSignatureSimulator**: E-signature capture demonstration
- **StateSpecificMessaging**: 50-state regulatory compliance simulator

#### Phase Components

- **WebsitePhase**: Main phase switcher component
- **DeceptiveCheckoutFlow**: Multi-step checkout with dark patterns
- **ModeSelector**: Mode selection UI

### Error Handling

- **ErrorBoundary**: Class-based error boundary with recovery
- **Phase-specific boundaries**: ExploitativePhaseErrorBoundary, EthicalPhaseErrorBoundary, ReflectionPhaseErrorBoundary
- **Specialized boundaries**: CalculatorErrorBoundary, DarkPatternErrorBoundary
- **Hooks**: useErrorRecovery, useErrorBoundary

### Performance Optimized Components

- **OptimizedLoanCalculator**: Memoized loan calculations
- **OptimizedRolloverVisualization**: Performance-optimized debt visualization
- **OptimizedDarkPatternDetector**: Efficient pattern detection
- **OptimizedSessionSummary**: Memoized session analytics

### Theming & Styling

1. **Theme System**: Located in `lib/core/theme.ts`

   - Supports phases: `exploitative`, `ethical`, `analysis`, `neutral`, `professional`
   - Provides consistent colors, gradients, and styling
   - Manipulation severity indicators

2. **Usage**: All components support theme variants through the theme system

### Usage Guidelines

1. **Import Patterns**:

   ```typescript
   // Import from central export
   import { Button, Card, PaymentCollectionEngine } from "@/components";

   // Or import directly
   import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
   ```

2. **Accessibility**: Components use Radix UI primitives where applicable for built-in accessibility.

3. **Dark Patterns**: Educational components clearly indicate when they demonstrate dark patterns.

4. **Error Handling**: Wrap components in appropriate error boundaries for robust error recovery.

5. **Performance**: Use optimized components for heavy calculations or frequent re-renders.

### Component Categories

1. **UI Primitives**: Basic building blocks (Button, Card, Input, etc.)
2. **Dark Pattern Components**: Educational demonstrations
3. **Processing Components**: Simulation and flow components
4. **Error Components**: Error handling and recovery
5. **Optimized Components**: Performance-focused variants

### Best Practices

- Always use the theme system for consistent styling
- Wrap feature components in appropriate error boundaries
- Use optimized components for data-heavy operations
- Follow the import pattern from `@/components` for consistency
