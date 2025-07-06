/**
 * ui_components/aprCalculator.js - True APR Calculator & Fee Conversion
 * 
 * Converts "flat fee" + term to true APR and exposes hidden costs
 */

export class APRCalculator {
    constructor() {
        this.calculations = [];
    }

    // Convert flat fee to APR (main conversion function)
    convertFlatFeeToAPR(feeAmount, principal, termDays) {
        const apr = ((feeAmount / principal) * (365 / termDays) * 100);
        
        const calculation = {
            feeAmount,
            principal,
            termDays,
            apr: apr.toFixed(2),
            timestamp: new Date().toISOString(),
            type: "FLAT_FEE_CONVERSION"
        };
        
        this.calculations.push(calculation);
        return calculation;
    }

    // Calculate tip-based APR (for Earnin-style models)
    convertTipToAPR(tipAmount, principal, termDays) {
        const apr = ((tipAmount / principal) * (365 / termDays) * 100);
        
        const calculation = {
            tipAmount,
            principal,
            termDays,
            apr: apr.toFixed(2),
            timestamp: new Date().toISOString(),
            type: "TIP_CONVERSION"
        };
        
        this.calculations.push(calculation);
        return calculation;
    }

    // Calculate express fee APR
    convertExpressFeeToAPR(expressFee, principal, termDays) {
        const apr = ((expressFee / principal) * (365 / termDays) * 100);
        
        const calculation = {
            expressFee,
            principal,
            termDays,
            apr: apr.toFixed(2),
            timestamp: new Date().toISOString(),
            type: "EXPRESS_FEE_CONVERSION"
        };
        
        this.calculations.push(calculation);
        return calculation;
    }

    // Calculate cumulative cost over multiple rollovers
    calculateRolloverAPR(principal, feePerPeriod, periodsPerYear, numberOfRollovers) {
        const totalFees = feePerPeriod * numberOfRollovers;
        const effectiveTermDays = (365 / periodsPerYear) * numberOfRollovers;
        const apr = ((totalFees / principal) * (365 / effectiveTermDays) * 100);
        
        const calculation = {
            principal,
            feePerPeriod,
            numberOfRollovers,
            totalFees,
            effectiveTermDays,
            apr: apr.toFixed(2),
            timestamp: new Date().toISOString(),
            type: "ROLLOVER_APR"
        };
        
        this.calculations.push(calculation);
        return calculation;
    }

    // Real-world payday loan examples
    getCommonPaydayAPRs() {
        return [
            { fee: 15, principal: 100, days: 14, apr: this.convertFlatFeeToAPR(15, 100, 14).apr, lender: "Typical Payday" },
            { fee: 10, principal: 100, days: 14, apr: this.convertFlatFeeToAPR(10, 100, 14).apr, lender: "Lower Fee Payday" },
            { fee: 25, principal: 100, days: 14, apr: this.convertFlatFeeToAPR(25, 100, 14).apr, lender: "High Fee Payday" },
            { fee: 5, principal: 100, days: 14, apr: this.convertFlatFeeToAPR(5, 100, 14).apr, lender: "EWA 'Low' Tip" },
            { fee: 15, principal: 100, days: 14, apr: this.convertFlatFeeToAPR(15, 100, 14).apr, lender: "EWA 'High' Tip" }
        ];
    }

    // Compare against credit alternatives
    compareToAlternatives(calculatedAPR) {
        const alternatives = [
            { type: "Credit Union PAL", apr: 28, description: "Federal maximum for PALs" },
            { type: "Credit Card", apr: 29.99, description: "Average credit card APR" },
            { type: "Bank Overdraft", apr: 3520, description: "Typical $35 fee on $100 overdraft (1 day)" },
            { type: "Traditional Personal Loan", apr: 36, description: "High-risk personal loan" }
        ];

        return alternatives.map(alt => ({
            ...alt,
            comparison: calculatedAPR > alt.apr ? `${(calculatedAPR / alt.apr).toFixed(1)}x more expensive` : `${(alt.apr / calculatedAPR).toFixed(1)}x more expensive`
        }));
    }

    // Generate APR disclosure warning
    generateAPRWarning(apr, principal, fee) {
        let warningLevel = "LOW";
        let warningText = "";

        if (apr >= 400) {
            warningLevel = "EXTREME";
            warningText = `🚨 EXTREME CAUTION: ${apr}% APR is exceptionally high. This loan costs $${(fee * 26).toFixed(0)} in fees per year for every $${principal} borrowed.`;
        } else if (apr >= 200) {
            warningLevel = "VERY_HIGH";
            warningText = `⚠️ WARNING: ${apr}% APR is very high. Most credit cards charge 20-30% APR.`;
        } else if (apr >= 100) {
            warningLevel = "HIGH";
            warningText = `⚠️ CAUTION: ${apr}% APR is high. Consider alternatives like credit union loans.`;
        } else if (apr >= 36) {
            warningLevel = "MODERATE";
            warningText = `ℹ️ NOTICE: ${apr}% APR exceeds many state usury caps (36% or lower).`;
        }

        return {
            level: warningLevel,
            text: warningText,
            apr: parseFloat(apr)
        };
    }

    // Get all calculations for session report
    getSessionCalculations() {
        return this.calculations;
    }

    // Clear calculations (for new session)
    clearCalculations() {
        this.calculations = [];
    }
}

export default APRCalculator;
