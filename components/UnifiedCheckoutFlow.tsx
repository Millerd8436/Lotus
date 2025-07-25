"use client";

import React, { useState } from 'react';
import { Stepper } from '@/components/shared/Stepper';
import { LandingAndLeadGenStep } from './checkout-steps/LandingAndLeadGenStep';
import { PersonalInfoAndConsentStep } from './checkout-steps/PersonalInfoAndConsentStep';
import { QuotePreviewStep } from './checkout-steps/QuotePreviewStep';
import { SoftPullAndButtonFramingStep } from './checkout-steps/SoftPullAndButtonFramingStep';
import { TilaDisclosureStep } from './checkout-steps/TilaDisclosureStep';
import { FinalConfirmationStep } from './checkout-steps/FinalConfirmationStep';
import { FundingAndUpsellsStep } from './checkout-steps/FundingAndUpsellsStep';
import { AutomatedDeductionsAndRolloversStep } from './checkout-steps/AutomatedDeductionsAndRolloversStep';

interface UnifiedCheckoutFlowProps {
  isEthical: boolean;
  onComplete: (data: any) => void;
}

const steps = [
  { id: 'landing', name: 'Welcome' },
  { id: 'personal', name: 'Personal Info' },
  { id: 'quote', name: 'Quote' },
  { id: 'soft-pull', name: 'Terms' },
  { id: 'tila', name: 'Disclosure' },
  { id: 'confirmation', name: 'Confirm' },
  { id: 'funding', name: 'Funding' },
  { id: 'deductions', name: 'Account' },
];

export const UnifiedCheckoutFlow: React.FC<UnifiedCheckoutFlowProps> = ({ isEthical, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data: any = {}) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));
  };
  
  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'landing':
        return <LandingAndLeadGenStep onNext={handleNext} isEthical={isEthical} />;
      case 'personal':
        return <PersonalInfoAndConsentStep onNext={handleNext} onBack={handleBack} isEthical={isEthical} />;
      case 'quote':
        return <QuotePreviewStep onNext={handleNext} onBack={handleBack} isEthical={isEthical} />;
      case 'soft-pull':
        return <SoftPullAndButtonFramingStep onNext={handleNext} onBack={handleBack} isEthical={isEthical} />;
      case 'tila':
        return <TilaDisclosureStep onNext={handleNext} onBack={handleBack} isEthical={isEthical} />;
      case 'confirmation':
        return <FinalConfirmationStep onNext={handleNext} onBack={handleBack} isEthical={isEthical} />;
      case 'funding':
        return <FundingAndUpsellsStep onNext={handleNext} onBack={handleBack} isEthical={isEthical} />;
      case 'deductions':
        return <AutomatedDeductionsAndRolloversStep onComplete={() => onComplete(formData)} onBack={handleBack} isEthical={isEthical} />;
      default:
        return <div>Thank you for completing the simulation!</div>;
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="mt-8">{renderStep()}</div>
    </div>
  );
}; 