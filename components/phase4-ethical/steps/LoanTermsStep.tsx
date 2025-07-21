"use client";

import React from 'react';
import EthicalLoanCalculator from '../EthicalLoanCalculator';

const LoanTermsStep = () => {
    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Review Your Loan Terms</h3>
            <p className="text-gray-700 mb-4">
                Use the calculator below to see the full, transparent cost of your loan.
            </p>
            <EthicalLoanCalculator />
        </div>
    );
};

export default LoanTermsStep;
