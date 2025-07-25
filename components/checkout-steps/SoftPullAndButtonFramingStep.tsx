"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface SoftPullAndButtonFramingStepProps {
  onNext: (data: { endpoint: string }) => void;
  onBack: () => void;
  isEthical: boolean;
}

export const SoftPullAndButtonFramingStep: React.FC<SoftPullAndButtonFramingStepProps> = ({ onNext, onBack, isEthical }) => {
  const [isDisabled, setIsDisabled] = useState(!isEthical);
  const [isLoading, setIsLoading] = useState(false);
  const [showTribalPopup, setShowTribalPopup] = useState(false);

  useEffect(() => {
    if (!isEthical) {
      const timer = setTimeout(() => {
        setIsDisabled(false);
      }, 7000); // 7 seconds
      return () => clearTimeout(timer);
    }
  }, [isEthical]);

  const handleNext = () => {
    setIsLoading(true);
    const useTribalLoan = !isEthical && Math.random() < 0.5;
    
    if (useTribalLoan) {
      setShowTribalPopup(true);
      setIsLoading(false);
    } else {
      proceedToNextStep('/api/standard-terms');
    }
  };
  
  const proceedToNextStep = (endpoint: string) => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowTribalPopup(false);
      onNext({ endpoint });
    }, 1500);
  }

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEthical ? 'Review Your Loan Terms' : 'Checking Your Rates...'}
        </h2>
        
        <div className="text-center my-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <p className="text-gray-600">
              {isEthical 
                ? "You're almost there! Click below to review the full terms and conditions of your loan before you commit."
                : "Please wait while we check for the best rates for you. This won't affect your credit score."
              }
            </p>
          )}
        </div>

        {showTribalPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
              <h3 className="text-xl font-bold mb-4">Important Information</h3>
              <p className="mb-6">Your loan is being processed by a tribal lending entity. This loan is governed by tribal law and is exempt from state interest rate caps.</p>
              <Button onClick={() => proceedToNextStep('/api/tribal-terms')}>Accept & Continue</Button>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button onClick={onBack} variant="outline" disabled={isLoading}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isDisabled || isLoading}>
            {isLoading ? 'Processing...' : (isEthical ? 'Proceed to Terms' : 'See My Cash Offer')}
          </Button>
        </div>
      </div>
    </Card>
  );
}; 