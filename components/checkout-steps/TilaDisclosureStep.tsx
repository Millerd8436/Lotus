"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

interface TilaDisclosureStepProps {
  onNext: () => void;
  onBack: () => void;
  isEthical: boolean;
}

export const TilaDisclosureStep: React.FC<TilaDisclosureStepProps> = ({ onNext, onBack, isEthical }) => {
  const [activeTab, setActiveTab] = useState('TILA');
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEthical && scrollBoxRef.current) {
      const timer = setTimeout(() => {
        scrollBoxRef.current?.scrollTo({ top: scrollBoxRef.current.scrollHeight, behavior: 'smooth' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isEthical]);

  const tilaContent = (
    <div>
      <h3 className="font-bold text-lg">Federal Truth-In-Lending Act (TILA) Disclosures</h3>
      <table className="w-full mt-4 text-left border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-semibold">Annual Percentage Rate (APR)</td>
            <td className="py-2">392.86%</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Finance Charge</td>
            <td className="py-2">$120.00</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-semibold">Amount Financed</td>
            <td className="py-2">$500.00</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold">Total of Payments</td>
            <td className="py-2">$620.00</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-4 text-sm">Your payment schedule will be...</p>
      {/* More TILA details here */}
    </div>
  );

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Loan Disclosure</h2>
        
        {isEthical ? (
          <div>
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button onClick={() => setActiveTab('TILA')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'TILA' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  TILA Disclosure
                </button>
                <button onClick={() => setActiveTab('Legal')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'Legal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  Legal Agreements
                </button>
              </nav>
            </div>
            <div className="mt-6" style={{fontSize: '16px'}}>
              {activeTab === 'TILA' ? tilaContent : (
                <div>
                  <h3 className="font-bold">Confession of Judgment</h3>
                  <p className="text-sm">This is an important legal clause. Please read it carefully before agreeing.</p>
                  <label className="flex items-center mt-2">
                    <input type="checkbox" id="confession-ethical" className="h-4 w-4" />
                    <span className="ml-2 text-sm">I have read and agree to the Confession of Judgment clause.</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div ref={scrollBoxRef} className="h-48 overflow-y-scroll border border-gray-300 p-2 rounded" style={{fontSize: '12px'}}>
              {tilaContent}
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-bold text-yellow-800">Confession of Judgment</h4>
              <p className="text-xs text-yellow-700 mt-1">By checking this box, you waive your right to a trial and allow us to seize your assets in case of default.</p>
              <label className="flex items-center mt-2">
                <input type="checkbox" id="confession-deceptive" defaultChecked className="h-4 w-4" />
                <span className="ml-2 text-xs">I agree to the Confession of Judgment.</span>
              </label>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">This loan is originated by a state-chartered bank to abide by federal law, a model sometimes referred to as 'rent-a-bank'.</p>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <Button onClick={onBack} variant="outline">Back</Button>
          <Button onClick={onNext}>Next Step</Button>
        </div>
      </div>
    </Card>
  );
}; 