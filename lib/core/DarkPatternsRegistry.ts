/**
 * Dark Patterns Registry for Loan Research
 * Catalogs and manages deceptive UX patterns for research analysis
 */

export interface DarkPattern {
  id: string;
  name: string;
  category: 'deception' | 'manipulation' | 'coercion' | 'obstruction';
  description: string;
  loanTypes: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  examples: string[];
  detection: {
    selectors: string[];
    behaviors: string[];
    indicators: string[];
  };
}

export class DarkPatternsRegistry {
  private patterns: Map<string, DarkPattern> = new Map();

  constructor() {
    this.initializePatterns();
  }

  private initializePatterns(): void {
    const patterns: DarkPattern[] = [
      {
        id: 'rollover_trap',
        name: 'Rollover Debt Trap',
        category: 'deception',
        description: 'Obscuring true cost of loan extensions and rollovers',
        loanTypes: ['Payday'],
        severity: 'critical',
        examples: ['Hidden extension fees', 'Automatic rollover options'],
        detection: {
          selectors: ['.rollover-option', '.extension-fee'],
          behaviors: ['click_without_reading', 'rapid_acceptance'],
          indicators: ['fee_disclosure_time_under_5s'],
        },
      },
      {
        id: 'credit_disguise',
        name: 'Credit Disguise',
        category: 'deception',
        description: 'Presenting loans as "not credit" or "payment plans"',
        loanTypes: ['BNPL'],
        severity: 'high',
        examples: ['Pay in 4 installments', 'Split your purchase'],
        detection: {
          selectors: ['.payment-plan', '.installment-option'],
          behaviors: ['bypass_credit_check'],
          indicators: ['apr_disclosure_hidden'],
        },
      },
      {
        id: 'tip_coercion',
        name: 'Tip Coercion Interface',
        category: 'manipulation',
        description: 'Manipulative interfaces that pressure users into tipping',
        loanTypes: ['EWA'],
        severity: 'medium',
        examples: ['Pre-selected tip amounts', 'Guilt-inducing messaging'],
        detection: {
          selectors: ['.tip-selector', '.suggested-tip'],
          behaviors: ['default_tip_selection'],
          indicators: ['tip_pressure_messaging'],
        },
      },
      {
        id: 'anchoring_bias',
        name: 'Payment Anchoring',
        category: 'manipulation',
        description: 'Using high anchor payments to make lower payments seem reasonable',
        loanTypes: ['Installment'],
        severity: 'medium',
        examples: ['Showing highest payment first', 'Monthly vs weekly comparison'],
        detection: {
          selectors: ['.payment-anchor', '.comparison-table'],
          behaviors: ['anchor_influence'],
          indicators: ['payment_order_manipulation'],
        },
      },
    ];

    patterns.forEach(pattern => {
      this.patterns.set(pattern.id, pattern);
    });
  }

  public getPattern(id: string): DarkPattern | undefined {
    return this.patterns.get(id);
  }

  public getPatternsByLoanType(loanType: string): DarkPattern[] {
    return Array.from(this.patterns.values()).filter(
      pattern => pattern.loanTypes.includes(loanType)
    );
  }

  public getPatternsByCategory(category: DarkPattern['category']): DarkPattern[] {
    return Array.from(this.patterns.values()).filter(
      pattern => pattern.category === category
    );
  }

  public getAllPatterns(): DarkPattern[] {
    return Array.from(this.patterns.values());
  }

  public detectPattern(element: HTMLElement, behavior: string): DarkPattern[] {
    const detectedPatterns: DarkPattern[] = [];
    
    this.patterns.forEach(pattern => {
      const hasSelector = pattern.detection.selectors.some(selector => 
        element.matches(selector) || element.querySelector(selector)
      );
      
      const hasBehavior = pattern.detection.behaviors.includes(behavior);
      
      if (hasSelector || hasBehavior) {
        detectedPatterns.push(pattern);
      }
    });

    return detectedPatterns;
  }

  public registerPattern(pattern: DarkPattern): void {
    this.patterns.set(pattern.id, pattern);
  }

  public removePattern(id: string): boolean {
    return this.patterns.delete(id);
  }

  public getPatternStatistics(): {
    total: number;
    byCategory: Record<string, number>;
    bySeverity: Record<string, number>;
    byLoanType: Record<string, number>;
  } {
    const patterns = Array.from(this.patterns.values());
    
    return {
      total: patterns.length,
      byCategory: this.groupBy(patterns, 'category'),
      bySeverity: this.groupBy(patterns, 'severity'),
      byLoanType: patterns.reduce((acc, pattern) => {
        pattern.loanTypes.forEach(type => {
          acc[type] = (acc[type] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>),
    };
  }

  private groupBy<T>(array: T[], key: keyof T): Record<string, number> {
    return array.reduce((acc, item) => {
      const value = String(item[key]);
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
} 