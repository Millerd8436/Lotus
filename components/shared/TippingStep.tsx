"use client";

// components/shared/TippingStep.tsx
import React, { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

interface TippingStepProps {
  principal: number;
  onTipChange: (tipAmount: number) => void;
  onConfirm: () => void;
}

const TippingStep: React.FC<TippingStepProps> = ({ principal, onTipChange, onConfirm }) => {
  const [selectedTip, setSelectedTip] = useState(4); // Default tip
  const tipOptions = [
    { percentage: 0, label: 'No Tip' },
    { amount: 2, label: '$2.00' },
    { amount: 4, label: '$4.00' },
    { amount: 6, label: '$6.00' },
  ];

  const handleSelectTip = (amount: number) => {
    setSelectedTip(amount);
    onTipChange(amount);
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-2 text-center">Leave an Optional Tip</h2>
      <p className="text-center text-gray-500 mb-6">
        Tips help us keep our platform running for everyone.
      </p>

      <div className="grid grid-cols-2 gap-4 my-8">
        {tipOptions.map((option) => {
          const amount = option.amount ?? (principal * (option.percentage! / 100));
          const isSelected = selectedTip === amount;
          return (
            <button
              key={option.label}
              onClick={() => handleSelectTip(amount)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <p className="text-xl font-bold">{option.label}</p>
              {option.percentage !== undefined && (
                 <p className="text-sm text-gray-500">${amount.toFixed(2)}</p>
              )}
            </button>
          );
        })}
      </div>
      
      <p className="text-xs text-center text-gray-500">
        Our most grateful users tip to pay it forward!
      </p>

      <div className="mt-8">
        <Button className="w-full" size="lg" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Card>
  );
};

export { TippingStep }; 
