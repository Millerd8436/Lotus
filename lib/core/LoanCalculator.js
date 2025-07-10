/**
 * Comprehensive Loan Calculator for Lotus Educational Platform
 * Integrates state regulations, APR calculations, and ethical analysis
 */

export class LoanCalculator {
  constructor() {
    // State regulations from legacy comprehensive system
    this.stateRules = {
      CA: {
        maxAPR: 36,
        minTermDays: 31,
        allowRollover: false,
        maxLoanAmount: 300,
        coolingPeriod: 1,
        database: true,
      },
      NY: {
        maxAPR: 25,
        minTermDays: 30,
        allowRollover: false,
        maxLoanAmount: 500,
        coolingPeriod: 1,
        database: true,
      },
      TX: {
        maxAPR: 664,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 1800,
        coolingPeriod: 0,
        database: false,
      },
      FL: {
        maxAPR: 304,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 500,
        coolingPeriod: 0,
        database: false,
      },
      NV: {
        maxAPR: 521,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 5000,
        coolingPeriod: 0,
        database: false,
      },
      DE: {
        maxAPR: 521,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 1000,
        coolingPeriod: 0,
        database: false,
      },
      UT: {
        maxAPR: "unlimited",
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: "unlimited",
        coolingPeriod: 0,
        database: false,
      },
      SD: {
        maxAPR: 574,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 500,
        coolingPeriod: 0,
        database: false,
      },
      WI: {
        maxAPR: 574,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 1500,
        coolingPeriod: 0,
        database: false,
      },
      AL: {
        maxAPR: 456,
        minTermDays: 10,
        allowRollover: true,
        maxLoanAmount: 500,
        coolingPeriod: 0,
        database: false,
      },
      GEN: {
        maxAPR: 400,
        minTermDays: 14,
        allowRollover: true,
        maxLoanAmount: 1000,
        coolingPeriod: 0,
        database: false,
      },
    };
  }

  calculateExploitativeLoan(amount, state = 'TX', termDays = 14) {
    const stateRule = this.stateRules[state] || this.stateRules.GEN;
    
    // Exploitative fee calculation (30% fee)
    const feeRate = 0.30;
    const fee = amount * feeRate;
    
    // Calculate APR
    const apr = this.calculateAPR(amount, fee, termDays);
    
    // Check if APR exceeds state limits
    const maxAPR = stateRule.maxAPR;
    const aprViolation = maxAPR !== "unlimited" && apr > maxAPR;
    
    return {
      amount,
      fee,
      apr,
      totalCost: amount + fee,
      termDays,
      state,
      aprViolation,
      maxAPR: stateRule.maxAPR,
      allowRollover: stateRule.allowRollover,
      coolingPeriod: stateRule.coolingPeriod,
      mode: 'exploitative',
      ethicalConcern: 'high',
      regulatoryViolation: aprViolation,
    };
  }

  calculateEthicalLoan(amount, state = 'TX', termDays = 14) {
    const stateRule = this.stateRules[state] || this.stateRules.GEN;
    
    // Ethical fee calculation (5% fee)
    const feeRate = 0.05;
    const fee = amount * feeRate;
    
    // Calculate APR
    const apr = this.calculateAPR(amount, fee, termDays);
    
    return {
      amount,
      fee,
      apr,
      totalCost: amount + fee,
      termDays,
      state,
      aprViolation: false,
      maxAPR: stateRule.maxAPR,
      allowRollover: false, // Ethical loans don't allow rollovers
      coolingPeriod: 3, // Extended cooling period for ethical loans
      mode: 'ethical',
      ethicalConcern: 'low',
      regulatoryViolation: false,
    };
  }

  calculateAPR(principal, fee, termDays) {
    if (principal <= 0 || termDays <= 0) return 0;
    return (fee / principal) * (365 / termDays) * 100;
  }

  calculateEffectiveAPR(principal, fees, tips, termDays) {
    if (principal <= 0 || termDays <= 0) return 0;
    const totalCost = fees + tips;
    return (totalCost / principal) * (365 / termDays) * 100;
  }

  calculateRolloverCost(originalAmount, originalFee, rolloverCount) {
    const baseFee = originalFee;
    const rolloverFee = baseFee * (1 + (rolloverCount * 0.1)); // 10% increase per rollover
    const totalFees = baseFee + (rolloverFee * rolloverCount);
    const totalCost = originalAmount + totalFees;
    
    return {
      rolloverFee,
      totalFees,
      totalCost,
      debtTrapRisk: rolloverCount > 3 ? 'high' : rolloverCount > 1 ? 'medium' : 'low',
    };
  }

  getStateRegulations(state) {
    return this.stateRules[state] || this.stateRules.GEN;
  }

  checkRegulatoryCompliance(loan, state) {
    const stateRule = this.stateRules[state] || this.stateRules.GEN;
    const violations = [];

    // Check APR limits
    if (stateRule.maxAPR !== "unlimited" && loan.apr > stateRule.maxAPR) {
      violations.push({
        type: 'apr_violation',
        severity: 'high',
        description: `APR ${loan.apr}% exceeds state limit of ${stateRule.maxAPR}%`,
        penalty: 'Civil penalty up to $10,000',
      });
    }

    // Check loan amount limits
    if (stateRule.maxLoanAmount !== "unlimited" && loan.amount > stateRule.maxLoanAmount) {
      violations.push({
        type: 'amount_violation',
        severity: 'medium',
        description: `Loan amount $${loan.amount} exceeds state limit of $${stateRule.maxLoanAmount}`,
        penalty: 'Civil penalty up to $5,000',
      });
    }

    // Check term limits
    if (loan.termDays < stateRule.minTermDays) {
      violations.push({
        type: 'term_violation',
        severity: 'medium',
        description: `Term ${loan.termDays} days below state minimum of ${stateRule.minTermDays} days`,
        penalty: 'Civil penalty up to $3,000',
      });
    }

    return violations;
  }

  calculateDebtTrapMetrics(session) {
    const rolloverCount = session.rolloverCount || 0;
    const totalFees = session.fee * (1 + rolloverCount);
    const feeToPrincipalRatio = totalFees / session.amount;
    
    return {
      rolloverCount,
      totalFees,
      feeToPrincipalRatio,
      debtTrapRisk: this.assessDebtTrapRisk(rolloverCount, feeToPrincipalRatio),
      escapeDifficulty: this.calculateEscapeDifficulty(rolloverCount, feeToPrincipalRatio),
    };
  }

  assessDebtTrapRisk(rolloverCount, feeRatio) {
    if (rolloverCount >= 5 || feeRatio >= 2.0) return 'extreme';
    if (rolloverCount >= 3 || feeRatio >= 1.5) return 'high';
    if (rolloverCount >= 1 || feeRatio >= 1.0) return 'medium';
    return 'low';
  }

  calculateEscapeDifficulty(rolloverCount, feeRatio) {
    const baseDifficulty = 50;
    const rolloverPenalty = rolloverCount * 15;
    const feePenalty = feeRatio * 20;
    return Math.min(100, baseDifficulty + rolloverPenalty + feePenalty);
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  formatPercentage(rate) {
    return `${rate.toFixed(1)}%`;
  }
}

// Export utility functions for backward compatibility
export const calculateAPR = (principal, fee, termDays) => {
  if (principal <= 0 || termDays <= 0) return 0;
  return (fee / principal) * (365 / termDays) * 100;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatPercentage = (rate) => {
  return `${rate.toFixed(1)}%`;
};
