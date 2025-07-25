"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { Input } from '@/components/shared/Input';

interface PersonalInfoAndConsentStepProps {
  onNext: () => void;
  onBack: () => void;
  isEthical: boolean;
}

export const PersonalInfoAndConsentStep: React.FC<PersonalInfoAndConsentStepProps> = ({ onNext, onBack, isEthical }) => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpStep, setOtpStep] = useState(1);
  const [showTipJar, setShowTipJar] = useState(false);

  useEffect(() => {
    if (!isEthical) {
      const timer = setTimeout(() => setShowTipJar(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isEthical]);

  const handleVerifyPhone = () => {
    setShowOtpModal(true);
    setOtpStep(1);
  };

  const renderOtpModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        {otpStep === 1 && (
          <>
            <h3 className="text-xl font-bold mb-4">Step 1: Enter Phone Number</h3>
            <Input id="phone" label="Phone Number" type="tel" placeholder="e.g., (555) 123-4567" />
            <Button onClick={() => setOtpStep(2)} className="mt-4">Send Code</Button>
          </>
        )}
        {otpStep === 2 && (
          <>
            <h3 className="text-xl font-bold mb-4">Step 2: Enter Verification Code</h3>
            <Input id="otp" label="OTP Code" type="text" placeholder="******" />
            <Button onClick={() => setOtpStep(3)} className="mt-4">Verify</Button>
          </>
        )}
        {otpStep === 3 && (
          <>
            <h3 className="text-xl font-bold mb-4">Step 3: Phone Verified!</h3>
            <p>Thank you for verifying your phone number.</p>
            <Button onClick={() => setShowOtpModal(false)} className="mt-4">Done</Button>
          </>
        )}
        {isEthical && <button onClick={() => setShowOtpModal(false)} className="text-xs text-gray-500 mt-4 hover:underline">Skip</button>}
      </div>
    </div>
  );

  return (
    <Card>
      {showTipJar && (
        <div className="absolute top-0 right-0 -mr-4 mt-4 bg-blue-100 p-4 rounded-lg shadow-lg animate-slide-in">
          <p className="font-bold">Psst! A tip would be nice!</p>
          <select defaultValue="15" className="mt-2 border-gray-300 rounded-md w-full">
            <option value="15">15%</option>
            <option value="10">10%</option>
            <option value="5">5%</option>
            <option value="0">No tip</option>
          </select>
          <button onClick={() => setShowTipJar(false)} className="text-xs text-blue-500 hover:underline mt-2">Close</button>
        </div>
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEthical ? 'Your Personal Information' : 'A Few More Details...'}
        </h2>
        
        <div className="space-y-4">
          <Input id="full-name" label="Full Legal Name" type="text" placeholder="John A. Doe" />
          <Input id="dob" label="Date of Birth" type="date" />
          <Button onClick={handleVerifyPhone} variant="outline" className="w-full">Verify Phone Number</Button>
        </div>

        {isEthical ? (
          <div className="mt-6 space-y-4">
            <div>
              <input type="checkbox" id="auto-debit-ethical" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="auto-debit-ethical" className="ml-2 text-sm text-gray-900">
                Enable automatic debit for payments. <span className="text-gray-500">(Recommended for avoiding late fees)</span>
              </label>
            </div>
            <div>
              <input type="checkbox" id="share-data-ethical" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="share-data-ethical" className="ml-2 text-sm text-gray-900">
                Share anonymized data to improve our services. <span className="text-gray-500">(Helps us build better products for you)</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="mt-4 space-y-2">
              <div>
                <input type="checkbox" id="auto-debit-deceptive" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                <label htmlFor="auto-debit-deceptive" className="ml-2 text-sm text-gray-900">I agree to automatic debit of my account for repayments.</label>
              </div>
              <div>
                <input type="checkbox" id="share-data-deceptive" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                <label htmlFor="share-data-deceptive" className="ml-2 text-sm text-gray-900">I agree to share my data with marketing partners.</label>
              </div>
            </div>
          </div>
        )}

        {showOtpModal && renderOtpModal()}

        <div className="mt-8 flex justify-between">
          <Button onClick={onBack} variant="outline">Back</Button>
          <Button onClick={onNext}>Next Step</Button>
        </div>
      </div>
    </Card>
  );
}; 