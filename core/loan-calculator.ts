// core/loan-calculator.ts

export interface LoanTerms {
  principal: number;
  loanType: 'payday' | 'installment' | 'ewa';
  paydayLoan?: {
    fee: number;
  };
  installmentLoan?: {
    apr: number;
    termInMonths: number;
  };
  ewa?: {
    expediteFee: number;
    tipPercentage?: number;
  };
}

export interface LoanCalculationResult {
  totalRepayment: number;
  monthlyPayment?: number;
  apr?: number;
}

export function calculateLoan(terms: LoanTerms): LoanCalculationResult {
  switch (terms.loanType) {
    case 'payday':
      return calculatePaydayLoan(terms);
    case 'installment':
      return calculateInstallmentLoan(terms);
    case 'ewa':
      return calculateEwa(terms);
    default:
      throw new Error('Invalid loan type');
  }
}

function calculatePaydayLoan(terms: LoanTerms): LoanCalculationResult {
  const { principal, paydayLoan } = terms;
  if (!paydayLoan) {
    throw new Error('Payday loan terms not provided');
  }
  const totalRepayment = principal + paydayLoan.fee;
  // APR for a 14-day loan
  const apr = ((paydayLoan.fee / principal) / 14) * 365 * 100;
  return {
    totalRepayment,
    apr,
  };
}

function calculateInstallmentLoan(terms: LoanTerms): LoanCalculationResult {
  const { principal, installmentLoan } = terms;
  if (!installmentLoan) {
    throw new Error('Installment loan terms not provided');
  }
  const { apr, termInMonths } = installmentLoan;

  // Using a simple interest calculation common in predatory installment loans,
  // rather than a standard amortization formula.
  const totalInterest = principal * (apr / 100) * (termInMonths / 12);
  const totalRepayment = principal + totalInterest;
  const monthlyPayment = totalRepayment / termInMonths;

  return {
    totalRepayment,
    monthlyPayment,
    apr: installmentLoan.apr,
  };
}

function calculateEwa(terms: LoanTerms): LoanCalculationResult {
  const { principal, ewa } = terms;
  if (!ewa) {
    throw new Error('EWA terms not provided');
  }
  const tipAmount = ewa.tipPercentage ? principal * (ewa.tipPercentage / 100) : 0;
  const totalRepayment = principal + ewa.expediteFee + tipAmount;
    // APR for a 10-day advance
  const totalFees = ewa.expediteFee + tipAmount;
  const apr = ((totalFees / principal) / 10) * 365 * 100;

  return {
    totalRepayment,
    apr
  };
} 