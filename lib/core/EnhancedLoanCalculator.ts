/**
 * Enhanced Loan Calculator for Research Platform
 * Provides accurate loan calculations with research-grade precision
 */

export interface LoanTerms {
  principal: number;
  termDays: number;
  apr: number;
  totalCost: number;
  totalInterest: number;
  fees: {
    origination: number;
    late: number;
    extension: number;
    processing: number;
  };
  paymentSchedule: PaymentScheduleItem[];
  effectiveApr: number;
  state: string;
  warnings: string[];
}

export interface PaymentScheduleItem {
  paymentNumber: number;
  dueDate: Date;
  principal: number;
  interest: number;
  fees: number;
  totalPayment: number;
  remainingBalance: number;
}

export interface StateRegulation {
  maxApr: number;
  maxLoanAmount: number;
  maxTermDays: number;
  allowedFees: string[];
  usuryCap: number;
  regulatoryFramework: string;
}

export class EnhancedLoanCalculator {
  private stateRegulations: Map<string, StateRegulation> = new Map();

  constructor() {
    this.initializeStateRegulations();
  }

  private initializeStateRegulations(): void {
    const regulations: Array<[string, StateRegulation]> = [
      ['CA', {
        maxApr: 36,
        maxLoanAmount: 300,
        maxTermDays: 31,
        allowedFees: ['origination'],
        usuryCap: 36,
        regulatoryFramework: 'California Finance Lenders Law',
      }],
      ['NY', {
        maxApr: 25,
        maxLoanAmount: 500,
        maxTermDays: 30,
        allowedFees: ['origination'],
        usuryCap: 25,
        regulatoryFramework: 'New York Banking Law',
      }],
      ['TX', {
        maxApr: 590,
        maxLoanAmount: 1800,
        maxTermDays: 30,
        allowedFees: ['origination', 'late', 'extension'],
        usuryCap: 590,
        regulatoryFramework: 'Texas Finance Code',
      }],
      ['SD', {
        maxApr: 36,
        maxLoanAmount: 500,
        maxTermDays: 365,
        allowedFees: ['origination'],
        usuryCap: 36,
        regulatoryFramework: 'South Dakota Codified Laws',
      }],
      ['DEFAULT', {
        maxApr: 400,
        maxLoanAmount: 1000,
        maxTermDays: 30,
        allowedFees: ['origination', 'late', 'extension', 'processing'],
        usuryCap: 400,
        regulatoryFramework: 'Federal Guidelines',
      }],
    ];

    regulations.forEach(([state, regulation]) => {
      this.stateRegulations.set(state, regulation);
    });
  }

  public calculateLoanTerms(
    principal: number,
    termDays: number,
    state: string = 'DEFAULT',
    loanType: 'payday' | 'installment' | 'bnpl' | 'ewa' = 'payday'
  ): LoanTerms {
    const regulation = this.stateRegulations.get(state) || this.stateRegulations.get('DEFAULT')!;
    const warnings: string[] = [];

    // Validate against state regulations
    if (principal > regulation.maxLoanAmount) {
      warnings.push(`Loan amount exceeds state maximum of $${regulation.maxLoanAmount}`);
    }

    if (termDays > regulation.maxTermDays) {
      warnings.push(`Loan term exceeds state maximum of ${regulation.maxTermDays} days`);
    }

    // Calculate base APR based on loan type and state
    const baseApr = this.calculateBaseApr(loanType, state, principal, termDays);
    
    // Apply regulatory caps
    const cappedApr = Math.min(baseApr, regulation.maxApr);
    
    if (baseApr > regulation.maxApr) {
      warnings.push(`APR capped at state maximum of ${regulation.maxApr}%`);
    }

    // Calculate fees
    const fees = this.calculateFees(principal, termDays, regulation, loanType);

    // Calculate interest
    const dailyRate = cappedApr / 365 / 100;
    const totalInterest = principal * dailyRate * termDays;

    // Calculate total cost
    const totalFees = Object.values(fees).reduce((sum, fee) => sum + fee, 0);
    const totalCost = principal + totalInterest + totalFees;

    // Calculate effective APR (including fees)
    const effectiveApr = this.calculateEffectiveApr(principal, totalCost, termDays);

    // Generate payment schedule
    const paymentSchedule = this.generatePaymentSchedule(
      principal,
      totalInterest,
      totalFees,
      termDays,
      loanType
    );

    return {
      principal,
      termDays,
      apr: cappedApr,
      totalCost,
      totalInterest,
      fees,
      paymentSchedule,
      effectiveApr,
      state,
      warnings,
    };
  }

  private calculateBaseApr(
    loanType: string,
    state: string,
    principal: number,
    termDays: number
  ): number {
    // Base APR calculation varies by loan type
    switch (loanType) {
      case 'payday':
        // Typical payday loan APRs range from 300-500%
        return Math.min(400, 15 * (365 / termDays));
      
      case 'installment':
        // Installment loans typically 36-199% APR
        return Math.min(199, 150 * Math.pow(principal / 1000, -0.3));
      
      case 'bnpl':
        // BNPL often 0% but with late fees that create effective APR
        return 0; // Fees create the real cost
      
      case 'ewa':
        // EWA typically 0% but with "tips" and expedite fees
        return 0; // Tips and fees create the real cost
      
      default:
        return 400;
    }
  }

  private calculateFees(
    principal: number,
    termDays: number,
    regulation: StateRegulation,
    loanType: string
  ): LoanTerms['fees'] {
    const fees = {
      origination: 0,
      late: 0,
      extension: 0,
      processing: 0,
    };

    if (regulation.allowedFees.includes('origination')) {
      fees.origination = Math.min(principal * 0.05, 25); // 5% or $25 max
    }

    if (regulation.allowedFees.includes('late')) {
      fees.late = Math.min(principal * 0.05, 30); // 5% or $30 max
    }

    if (regulation.allowedFees.includes('extension')) {
      fees.extension = Math.min(principal * 0.03, 20); // 3% or $20 max
    }

    if (regulation.allowedFees.includes('processing')) {
      fees.processing = Math.min(15, principal * 0.02); // $15 or 2% max
    }

    // Loan type specific fee adjustments
    switch (loanType) {
      case 'bnpl':
        fees.late = Math.min(25, principal * 0.08); // Higher late fees for BNPL
        break;
      case 'ewa':
        fees.processing = Math.min(5, principal * 0.01); // Lower processing fees
        break;
    }

    return fees;
  }

  private calculateEffectiveApr(
    principal: number,
    totalCost: number,
    termDays: number
  ): number {
    const totalInterestAndFees = totalCost - principal;
    return (totalInterestAndFees / principal) * (365 / termDays) * 100;
  }

  private generatePaymentSchedule(
    principal: number,
    totalInterest: number,
    totalFees: number,
    termDays: number,
    loanType: string
  ): PaymentScheduleItem[] {
    const schedule: PaymentScheduleItem[] = [];
    
    if (loanType === 'payday' || loanType === 'ewa') {
      // Single payment at end
      const totalPayment = principal + totalInterest + totalFees;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + termDays);

      schedule.push({
        paymentNumber: 1,
        dueDate,
        principal: principal,
        interest: totalInterest,
        fees: totalFees,
        totalPayment,
        remainingBalance: 0,
      });
    } else {
      // Installment payments (BNPL, installment loans)
      const numberOfPayments = loanType === 'bnpl' ? 4 : Math.ceil(termDays / 30);
      const paymentAmount = (principal + totalInterest + totalFees) / numberOfPayments;
      
      let remainingBalance = principal;
      const interestPerPayment = totalInterest / numberOfPayments;
      const feesPerPayment = totalFees / numberOfPayments;
      const principalPerPayment = principal / numberOfPayments;

      for (let i = 1; i <= numberOfPayments; i++) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (i * (termDays / numberOfPayments)));

        remainingBalance -= principalPerPayment;

        schedule.push({
          paymentNumber: i,
          dueDate,
          principal: principalPerPayment,
          interest: interestPerPayment,
          fees: feesPerPayment,
          totalPayment: paymentAmount,
          remainingBalance: Math.max(0, remainingBalance),
        });
      }
    }

    return schedule;
  }

  public getStateRegulation(state: string): StateRegulation | undefined {
    return this.stateRegulations.get(state);
  }

  public validateLoanCompliance(
    principal: number,
    termDays: number,
    apr: number,
    state: string
  ): {
    isCompliant: boolean;
    violations: string[];
  } {
    const regulation = this.stateRegulations.get(state) || this.stateRegulations.get('DEFAULT')!;
    const violations: string[] = [];

    if (principal > regulation.maxLoanAmount) {
      violations.push(`Principal amount $${principal} exceeds maximum $${regulation.maxLoanAmount}`);
    }

    if (termDays > regulation.maxTermDays) {
      violations.push(`Term ${termDays} days exceeds maximum ${regulation.maxTermDays} days`);
    }

    if (apr > regulation.maxApr) {
      violations.push(`APR ${apr}% exceeds maximum ${regulation.maxApr}%`);
    }

    return {
      isCompliant: violations.length === 0,
      violations,
    };
  }
} 