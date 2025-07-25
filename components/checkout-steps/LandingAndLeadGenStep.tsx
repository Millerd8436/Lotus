"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

interface LandingAndLeadGenStepProps {
  onNext: () => void;
  isEthical: boolean;
}

export const LandingAndLeadGenStep: React.FC<LandingAndLeadGenStepProps> = ({ onNext, isEthical }) => {
  const [showTipPopup, setShowTipPopup] = useState(!isEthical);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [dismissCount, setDismissCount] = useState(0);

  useEffect(() => {
    if (!isEthical) {
      const timer = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isEthical]);
  
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  
  const handleDismissTip = () => {
    if (dismissCount < 4) {
      setDismissCount(prev => prev + 1);
    } else {
      setShowTipPopup(false);
    }
  };

  return (
    <Card>
      <div className="p-6">
        {isEthical ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Transparent Loans—See APR Up Front</h2>
            <p className="text-gray-600 mb-6">We believe in fair and transparent lending. Get a clear breakdown of your loan terms, including the APR, before you commit to anything.</p>
            <a href="/learn-your-rights" className="text-blue-600 hover:underline text-base mb-4 inline-block" style={{fontSize: '16px'}}>Learn Your Rights</a>
          </div>
        ) : (
          <div className="text-center">
            <div className="inline-block bg-green-500 text-white font-bold px-4 py-2 rounded-full mb-4 shadow-lg">
              Get $500 Today—0% Fees!
            </div>
            <p className="text-gray-600 mb-4">Need cash now? Get a fee-free advance of up to $500 in minutes!</p>
            <div className="text-2xl font-bold text-red-600 my-4 p-2 bg-red-100 border border-red-300 rounded-lg">
              Offer expires in: {minutes}:{seconds < 10 ? '0' : ''}{seconds}
            </div>
            <a href="/tila-disclosure" className="text-gray-400 hover:underline mb-4 inline-block" style={{fontSize: '8px'}}>TILA/APR Disclosure</a>
            <div className="flex items-center justify-center mb-4">
              <input type="checkbox" id="data-harvest" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
              <label htmlFor="data-harvest" className="ml-2 block text-sm text-gray-900">
                I agree to share my data with trusted partners to receive personalized offers.
              </label>
            </div>
          </div>
        )}
        
        {showTipPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm">
              <h3 className="text-xl font-bold mb-4">Enjoying our free service?</h3>
              <p className="mb-6">A small tip helps us keep our service running for others. Thanks for your support!</p>
              <div className="space-y-2">
                <Button onClick={() => setShowTipPopup(false)} variant="primary" className="w-full">Tip 15%</Button>
                <Button onClick={() => setShowTipPopup(false)} variant="secondary" className="w-full">Tip 10%</Button>
                <Button onClick={() => setShowTipPopup(false)} variant="outline" className="w-full">No, thanks</Button>
              </div>
              <button onClick={handleDismissTip} className="text-xs text-gray-400 mt-4 hover:underline">
                {dismissCount < 4 ? `Dismiss (${4 - dismissCount} clicks remaining)` : 'Dismiss'}
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button onClick={onNext}>
            Get Started
          </Button>
        </div>
      </div>
    </Card>
  );
}; 