import { EthicalLoan, ExploitativeLoan, LoanDetails } from "@/types";
import {
  FeeBreakdown,
  STATE_REGULATIONS,
  UnifiedLoanCalculator,
} from "./LoanCalculator";

export class EnhancedLoanCalculator extends UnifiedLoanCalculator {
  static calculateRegulatedLoan(
    principal: number,
    stateCode: string = "CA"
  ): LoanDetails & { capApplied: boolean; caseNotice: string } {
    const stateReg = STATE_REGULATIONS[stateCode] || STATE_REGULATIONS.DEFAULT;
    if (!stateReg) {
      throw new Error(
        `State regulations not found for state code: ${stateCode}`
      );
    }
    const maxRegulatedAPR = stateReg.maxAPR / 100;
    const termDays = 30;

    const predatoryFees = this.calculatePredatoryFees(principal, stateCode);
    const effectiveAPR = predatoryFees.effectiveAPR / 100;

    let finalAPR = effectiveAPR;
    let capApplied = false;
    let caseNotice = "";

    if (effectiveAPR > maxRegulatedAPR) {
      finalAPR = maxRegulatedAPR;
      capApplied = true;
      caseNotice = `Interest rate adjusted per ${stateCode} state law: Cap applied at ${stateReg.maxAPR}%. LegalCaseNotice("State v. Predatory Lender (2024) upheld cap")`;
    }

    const fees = (principal * finalAPR * termDays) / 365;
    const totalCost = principal + fees;

    return {
      provider: "RegulatedLender",
      apr: finalAPR * 100,
      fees: {
        origination: fees,
        late: 25,
        nsf: 25,
        rollover: 0, // Rollovers prohibited
      },
      totalCost,
      biweeklyPayment: totalCost,
      totalInterest: fees,
      effectiveAPR: finalAPR * 100,
      capApplied,
      caseNotice,
    };
  }
  static compareLoans(principal: number): {
    ethical: EthicalLoan;
    exploitative: ExploitativeLoan;
  } {
    const ethicalFees: FeeBreakdown = this.calculateEthicalFees(principal, 30);
    const predatoryFees: FeeBreakdown = this.calculatePredatoryFees(
      principal,
      "DEFAULT"
    );

    const ethicalLoan: EthicalLoan = {
      principal: ethicalFees.principal,
      termDays: 30,
      interest: ethicalFees.totalFees,
      educationFund: 1.0,
      transparencyTax: 1.0,
      totalRepaid: ethicalFees.totalDue + 2.0,
      apr: ethicalFees.effectiveAPR,
    };

    const exploitativeLoan: ExploitativeLoan = {
      principal: predatoryFees.principal,
      termDays: 14,
      fees: {
        origination: predatoryFees.baseFee,
        late: predatoryFees.lateFee,
        nsf: predatoryFees.nsfFee,
        rollover: predatoryFees.rolloverFee,
        total: predatoryFees.totalFees,
      },
      totalRepaid: predatoryFees.totalDue,
      apr: predatoryFees.effectiveAPR,
    };

    return {
      ethical: ethicalLoan,
      exploitative: exploitativeLoan,
    };
  }
}
