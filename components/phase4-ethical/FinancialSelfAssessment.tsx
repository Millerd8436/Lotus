"use client";

import React from 'react';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';

const FinancialSelfAssessment: React.FC = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Financial Self-Assessment</h2>
      <p className="mb-4">Before proceeding, take a moment to reflect on your financial situation.</p>
      <div className="space-y-4">
        <div>
          <p className="font-semibold">Have you considered alternatives to a payday loan?</p>
          <p className="text-sm text-gray-600">e.g., payment plans with creditors, assistance from local nonprofits, etc.</p>
        </div>
        <div>
          <p className="font-semibold">Do you have a clear plan for repaying this loan?</p>
          <p className="text-sm text-gray-600">A payday loan should not be a long-term financial solution.</p>
        </div>
        <div>
          <p className="font-semibold">Have you calculated the total cost of this loan, including all fees?</p>
          <p className="text-sm text-gray-600">Make sure you understand the full cost before you commit.</p>
        </div>
      </div>
      <div className="mt-6">
        <Button asChild>
          <a href="https://www.consumerfinance.gov/ask-cfpb/what-are-my-options-if-i-cant-pay-back-my-payday-loan-en-1575/" target="_blank" rel="noopener noreferrer">
            Explore Alternatives
          </a>
        </Button>
      </div>
    </Card>
  );
};

export default FinancialSelfAssessment;
