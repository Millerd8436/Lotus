"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

interface FinalConfirmationStepProps {
  onNext: () => void;
  onBack: () => void;
  isEthical: boolean;
}

export const FinalConfirmationStep: React.FC<FinalConfirmationStepProps> = ({ onNext, onBack, isEthical }) => {
  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    mca: false,
  });
  
  const allConsentsChecked = isEthical ? Object.values(consents).every(Boolean) : true;

  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setConsents(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleDeceptiveConfirm = () => {
    // In the deceptive flow, consents are implicitly agreed to by clicking the button.
    onNext();
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Final Confirmation</h2>

        {isEthical ? (
          <div className="space-y-4">
            <p>Please review and confirm the following to proceed:</p>
            <label className="flex items-center">
              <input type="checkbox" name="terms" checked={consents.terms} onChange={handleConsentChange} className="h-4 w-4" />
              <span className="ml-2">I have read and agree to the Terms of Service.</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="privacy" checked={consents.privacy} onChange={handleConsentChange} className="h-4 w-4" />
              <span className="ml-2">I have read and agree to the Privacy Policy.</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="mca" checked={consents.mca} onChange={handleConsentChange} className="h-4 w-4" />
              <span className="ml-2">I understand this may be structured as a purchase of future receivables (MCA).</span>
            </label>
          </div>
        ) : (
          <div className="space-y-3 text-center">
            <p className="text-sm text-gray-600">By clicking "Confirm & Get Funds," you agree to all terms and conditions.</p>
            <div className="p-4 bg-gray-100 border border-gray-300 rounded">
              <p className="font-mono text-xs text-gray-700">This agreement is structured as a purchase of future receivables.</p>
            </div>
            <a href="/extend-payment" className="text-xs text-gray-300 hover:underline">Need to extend payment?</a>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button onClick={onBack} variant="outline">Back</Button>
          {isEthical ? (
            <Button onClick={onNext} disabled={!allConsentsChecked}>
              I Confirm Loan Terms
            </Button>
          ) : (
            <Button onClick={handleDeceptiveConfirm}>
              Confirm & Get Funds
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}; 