"use client";

import React, { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

interface FundingAndUpsellsStepProps {
  onNext: () => void;
  onBack: () => void;
  isEthical: boolean;
}

export const FundingAndUpsellsStep: React.FC<FundingAndUpsellsStepProps> = ({ onNext, onBack, isEthical }) => {
  const [showRolloverModal, setShowRolloverModal] = useState(false);

  const renderRolloverModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm">
        <h3 className="text-xl font-bold mb-4">Need More Time to Pay?</h3>
        <p className="mb-6">Extend your loan for a small fee of just $25. Get peace of mind today!</p>
        <Button onClick={() => setShowRolloverModal(false)} size="lg" variant="primary" className="w-full">Yes, Extend My Loan!</Button>
        <button onClick={() => setShowRolloverModal(false)} className="text-xs text-gray-500 mt-4 hover:underline">No, I don't need more time</button>
      </div>
    </div>
  );
  
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Funding & Next Steps</h2>

        {isEthical ? (
          <div className="space-y-6">
            <p>Your loan has been funded! You can manage your payments and terms below.</p>
            <div className="flex justify-around">
              <Button variant="primary">Repay Now</Button>
              <Button variant="secondary">Request Extension</Button>
            </div>
            <div className="mt-4 p-4 border rounded-lg">
              <label className="flex items-center">
                <input type="checkbox" id="toolkit-ethical" className="h-4 w-4" />
                <span className="ml-2">Enroll in our Financial Toolkit for $9.99/mo.</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg font-semibold text-center text-green-600">Congratulations! Your funds are on the way.</p>
            <Button onClick={() => setShowRolloverModal(true)} variant="secondary" className="w-full">
              Manage Your Loan & Payment Options
            </Button>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <label className="flex items-center">
                <input type="checkbox" id="toolkit-deceptive" className="h-4 w-4" defaultChecked />
                <div className="ml-2">
                  <span className="font-bold text-yellow-800">Special Offer!</span>
                  <p className="text-xs text-yellow-700">Get our exclusive Financial Toolkit for just $9.99/mo to help you manage your finances.</p>
                </div>
              </label>
            </div>
            <p className="text-xs text-gray-400 text-justify mt-2">
              Please note that a one-time, non-refundable expedition fee of $5.00 will be applied to your first payment to ensure the fastest possible delivery of your funds. This fee is in addition to any other fees or charges associated with your loan.
            </p>
          </div>
        )}

        {showRolloverModal && renderRolloverModal()}

        <div className="mt-8 flex justify-between">
          <Button onClick={onBack} variant="outline">Back</Button>
          <Button onClick={onNext}>Finish</Button>
        </div>
      </div>
    </Card>
  );
}; 