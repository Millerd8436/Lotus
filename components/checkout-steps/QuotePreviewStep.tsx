"use client";

import React from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

interface QuotePreviewStepProps {
  onNext: () => void;
  onBack: () => void;
  isEthical: boolean;
}

export const QuotePreviewStep: React.FC<QuotePreviewStepProps> = ({ onNext, onBack, isEthical }) => {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Loan Quote Preview</h2>
        
        {isEthical ? (
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-gray-600">Your cost:</p>
            <h3 className="text-3xl font-bold text-gray-800 my-2">$120 in 14 days</h3>
            <p className="text-lg font-semibold text-green-700">(392% APR)</p>
            <a href="/how-apr-is-calculated" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
              How is APR calculated?
            </a>
          </div>
        ) : (
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center relative">
            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
              Fee-free advance!
            </div>
            <p className="text-gray-600">Your cost:</p>
            <h3 className="text-3xl font-bold text-gray-800 my-2">$120 in 14 days</h3>
            <p className="text-xs text-gray-400 mt-8">
              *Actual APR for a representative loan is ~400%.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
          <Button onClick={onNext}>
            Next Step
          </Button>
        </div>
      </div>
    </Card>
  );
}; 