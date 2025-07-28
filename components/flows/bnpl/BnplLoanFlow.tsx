// components/flows/bnpl/BnplLoanFlow.tsx
import React, { useState, useEffect } from 'react';
import { useBehaviorTracking } from '@/components/providers/BehaviorTrackingProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Checkbox } from '@/components/shared/Checkbox';
import { CollapsibleSection } from '@/components/shared/CollapsibleSection';
import { ProgressIndicator } from '@/components/shared/ProgressIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import { LoanSimulation, SimulationConfig } from '@/types';
import { IntroductionPrompt } from '@/components/shared';

interface BnplLoanFlowProps {
  config: SimulationConfig['bnpl'];
  onComplete: (data: LoanSimulation) => void;
}

const BnplLoanFlow: React.FC<BnplLoanFlowProps> = ({ config, onComplete }) => {
  const [step, setStep] = useState(0); // 0: prompt, 1+: flow
  const [flowStep, setFlowStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { trackEvent } = useBehaviorTracking();

  const [purchaseProtection, setPurchaseProtection] = useState(true); // Pre-checked

  const [dvData, setDvData] = useState({
    timeOnStep1: 0,
    timeOnStep2: 0,
    timeOnStep3: 0,
    timeOnStep4: 0,
    viewedLateFees: false,
    viewedFullTerms: false,
    hoveredInterestFree: false,
    expandedPaymentDetails: false,
    consentCreditCheck: 'unchecked',
    consentAutopay: 'unchecked',
    consentMarketing: 'unchecked',
  });
  
  useEffect(() => {
    if (step === 0) return;
    const timer = setInterval(() => {
      setDvData(prev => {
        const newTimeKey = `timeOnStep${flowStep}` as keyof typeof dvData;
        const previousTime = (prev[newTimeKey] as number) || 0;
        return { ...prev, [newTimeKey]: previousTime + 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [flowStep, step]);

  const loanAmount = config.productPrice;
  const totalAmount = loanAmount + (purchaseProtection ? config.purchaseProtectionFee : 0);
  const installmentAmount = totalAmount / 4;
  const lateFee = config.lateFee;
  
  const handleNextStep = () => {
    trackEvent({ type: 'click', elementId: `bnpl-next-step-${flowStep}` });
    setFlowStep(prev => prev + 1);
  };
  
  const handleSubmit = () => {
    setIsProcessing(true);
    trackEvent({ type: 'click', elementId: 'bnpl-submit' });
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
      onComplete({
        loanType: 'BNPL',
        loanAmount: totalAmount,
        totalRepayment: totalAmount,
        apr: 0,
        fees: (purchaseProtection ? config.purchaseProtectionFee : 0),
        deceptivePractices: {
          softFraming: true,
          hiddenFees: true,
          darkPatterns: true,
        },
        dvData,
      });
    }, 2000);
  };

  const renderFlow = () => {
    switch (flowStep) {
      case 1: // Product View
        return (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <CardHeader>
              <CardTitle className="text-2xl font-bold">Your Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="w-1/3">
                   <img src="https://placehold.co/150x200/a78bfa/ffffff?text=Textbook" alt="Textbook" className="rounded-lg shadow-md" />
                </div>
                <div className="w-2/3">
                  <h3 className="text-lg font-semibold">{config.productName}</h3>
                  <p className="text-2xl font-bold text-gray-800">${config.productPrice.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-2">or 4 interest-free payments of <span className="font-bold text-pink-500">${(config.productPrice / 4).toFixed(2)}</span> with <span className="font-bold">Klarna</span>.</p>
                </div>
              </div>
            </CardContent>
             <CardFooter>
              <Button className="w-full text-lg font-bold bg-gray-800 hover:bg-gray-900 text-white" onClick={handleNextStep}>Proceed to Checkout</Button>
            </CardFooter>
          </motion.div>
        );

      case 2: // Payment Selection
        return (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Choose your payment method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border p-4 rounded-lg cursor-pointer hover:border-gray-400">
                <p>Credit / Debit Card</p>
              </div>
              <div className="border-2 border-pink-500 bg-pink-50 p-4 rounded-lg cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">Pay with Klarna</p>
                    <p className="text-sm text-gray-600">4 interest-free payments</p>
                  </div>
                  <img src="https://www.klarna.com/assets/sites/2/2020/03/10123108/klarna-logo-black.png" alt="Klarna" className="h-6"/>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg font-bold bg-pink-500 hover:bg-pink-600 text-white" onClick={handleNextStep}>Continue with Klarna</Button>
            </CardFooter>
          </motion.div>
        );

      case 3: // Account Creation
        return (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Create your Klarna account</CardTitle>
              <CardDescription>It's quick, easy, and won't affect your credit score.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" type="tel" />
              <Input placeholder="Date of Birth (MM/DD/YYYY)" type="text" />
              <Input placeholder="Last 4 digits of SSN" type="text" maxLength={4} />
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg font-bold bg-pink-500 hover:bg-pink-600 text-white" onClick={handleNextStep}>Continue</Button>
            </CardFooter>
          </motion.div>
        );

      case 4: // Final Confirmation
        return (
          <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Confirm Your Purchase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 border rounded-lg bg-gray-50">
                 <h3 className="font-bold text-lg mb-2">Payment Schedule</h3>
                 <div className="space-y-2">
                   <div className="flex justify-between"><span>Today:</span> <span className="font-mono font-bold">${installmentAmount.toFixed(2)}</span></div>
                   <div className="flex justify-between text-gray-600"><span>In 2 weeks:</span> <span className="font-mono">${installmentAmount.toFixed(2)}</span></div>
                   <div className="flex justify-between text-gray-600"><span>In 4 weeks:</span> <span className="font-mono">${installmentAmount.toFixed(2)}</span></div>
                   <div className="flex justify-between text-gray-600"><span>In 6 weeks:</span> <span className="font-mono">${installmentAmount.toFixed(2)}</span></div>
                 </div>
                 <CollapsibleSection title="Payment Details" onOpen={() => setDvData(prev => ({...prev, expandedPaymentDetails: true}))}>
                    <p className="text-xs text-gray-600 mt-2">Your card will be automatically charged on these dates.</p>
                 </CollapsibleSection>
              </div>
              <div className={`p-4 border rounded-lg ${purchaseProtection ? 'border-pink-500 bg-pink-50' : 'bg-gray-50'}`}>
                <Checkbox id="purchaseProtection" checked={purchaseProtection} onCheckedChange={(c) => setPurchaseProtection(c as boolean)} />
                <label htmlFor="purchaseProtection" className="ml-2 font-semibold">Add Purchase Protection Plus (+${config.purchaseProtectionFee.toFixed(2)})</label>
                <p className="text-xs text-gray-600 ml-6">Get extra protection for your purchase.</p>
              </div>
               <CollapsibleSection title="Review Terms & Conditions" onOpen={() => setDvData(prev => ({...prev, viewedFullTerms: true}))}>
                 <div className="text-xs text-gray-600 mt-2 space-y-2">
                    <p onClick={() => setDvData(prev => ({...prev, viewedLateFees: true}))}>A <span className="font-bold">late fee of up to ${lateFee}</span> may be applied if a payment is not made on time.</p>
                    <div className="flex items-center">
                        <Checkbox id="consentCreditCheck" onCheckedChange={(c) => setDvData(prev => ({...prev, consentCreditCheck: c ? 'checked' : 'unchecked'}))} />
                        <label htmlFor="consentCreditCheck" className="ml-2">I agree to a soft credit check.</label>
                    </div>
                     <div className="flex items-center">
                        <Checkbox id="consentAutopay" onCheckedChange={(c) => setDvData(prev => ({...prev, consentAutopay: c ? 'checked' : 'unchecked'}))} />
                        <label htmlFor="consentAutopay" className="ml-2">I agree to automatic payments.</label>
                    </div>
                 </div>
               </CollapsibleSection>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg font-bold bg-pink-500 hover:bg-pink-600 text-white" onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Confirm & Pay $${installmentAmount.toFixed(2)}`}
              </Button>
            </CardFooter>
          </motion.div>
        );
    }
  };

  if (step === 0) {
    return (
      <IntroductionPrompt
        title="Buy Now, Pay Later Scenario"
        scenario={config.scenario}
        onStart={() => setStep(1)}
      />
    );
  }

  if (showConfirmation) {
     return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-4">
          <Card className="shadow-xl text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-pink-500">Purchase Complete!</CardTitle>
              <CardDescription>Your order is confirmed and will be shipped soon.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg">Total Amount: <span className="font-bold">${totalAmount.toFixed(2)}</span></p>
              <p className="text-lg">First payment of <span className="font-bold">${installmentAmount.toFixed(2)}</span> has been made.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
       <div className="w-full max-w-4xl mx-auto p-4 flex space-x-6">
        {/* Left side: Order Summary */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3">
             <div className="flex justify-between">
              <span>{config.productName}</span>
              <span>${config.productPrice.toFixed(2)}</span>
            </div>
            {purchaseProtection && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Purchase Protection</span>
                <span>${config.purchaseProtectionFee.toFixed(2)}</span>
              </div>
            )}
             <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right side: BNPL Flow */}
        <div className="w-2/3">
           <ProgressIndicator currentStep={flowStep} totalSteps={4} />
           <Card className="shadow-lg bg-white">
            <AnimatePresence mode="wait">
              {renderFlow()}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BnplLoanFlow; 