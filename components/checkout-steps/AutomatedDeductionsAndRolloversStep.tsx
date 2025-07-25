"use client";

import React, { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { Input } from '@/components/shared/Input';

interface AutomatedDeductionsAndRolloversStepProps {
  onComplete: () => void;
  onBack: () => void;
  isEthical: boolean;
}

export const AutomatedDeductionsAndRolloversStep: React.FC<AutomatedDeductionsAndRolloversStepProps> = ({ onComplete, onBack, isEthical }) => {
  const [showDataPopup, setShowDataPopup] = useState(false);

  const renderDataPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm">
        <h3 className="text-xl font-bold mb-4">Unlock Personalized Offers!</h3>
        <p className="mb-6 text-sm">Provide some extra info to help our partners tailor better financial products for you.</p>
        <Input id="income" label="Annual Income" type="text" placeholder="$50,000" />
        <Input id="employer" label="Employer Name" type="text" placeholder="MegaCorp" className="mt-4" />
        <Button onClick={() => setShowDataPopup(false)} className="mt-6 w-full">Submit for Better Offers</Button>
        <button onClick={() => setShowDataPopup(false)} className="text-xs text-gray-400 mt-2 hover:underline">Maybe later</button>
      </div>
    </div>
  );

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment & Account Management</h2>

        {isEthical ? (
          <div className="space-y-4">
            <p>Your payment of <strong>$620.00</strong> is scheduled for your due date.</p>
            <p>If the payment fails, we will notify you via email and you can opt-in to retry the payment.</p>
            <div className="flex items-center">
              <input type="checkbox" id="sms-retry" className="h-4 w-4" />
              <label htmlFor="sms-retry" className="ml-2">Notify me by SMS for payment retries.</label>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-sm">
            <p>As per our agreement, we will deduct <strong>4%</strong> of your daily future receivables until the total amount is paid.</p>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="font-bold text-red-800">Important: Rollover Policy</p>
              <p className="text-xs text-red-700 mt-1">If two consecutive debits fail, your loan will be automatically rolled over into a new loan with a 5% fee added to the principal. This may lead to a cycle of debt.</p>
            </div>
            <Button onClick={() => setShowDataPopup(true)} variant="link">
              Update your marketing preferences to receive special offers.
            </Button>
          </div>
        )}

        {showDataPopup && renderDataPopup()}

        <div className="mt-8 flex justify-between">
          <Button onClick={onBack} variant="outline">Back</Button>
          <Button onClick={onComplete} variant="primary">
            Complete Simulation
          </Button>
        </div>
      </div>
    </Card>
  );
}; 