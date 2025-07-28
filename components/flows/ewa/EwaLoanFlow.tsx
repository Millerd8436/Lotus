// components/flows/ewa/EwaLoanFlow.tsx
import React, { useState, useEffect } from 'react';
import { useBehaviorTracking } from '@/components/providers/BehaviorTrackingProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Label } from '@/components/shared';
import { Checkbox } from '@/components/shared/Checkbox';
import { ProgressIndicator } from '@/components/shared/ProgressIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import { LoanSimulation, SimulationConfig } from '@/types';
import { IntroductionPrompt } from '@/components/shared';

interface EwaLoanFlowProps {
  config: SimulationConfig['ewa'];
  onComplete: (data: LoanSimulation) => void;
}

const EwaLoanFlow: React.FC<EwaLoanFlowProps> = ({ config, onComplete }) => {
  const [step, setStep] = useState(0); // 0: prompt, 1+: flow
  const [flowStep, setFlowStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState(config.defaultLoanAmount);
  const [tipAmount, setTipAmount] = useState(loanAmount * config.defaultTipRate);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { trackEvent } = useBehaviorTracking();

  // Deceptive pattern states
  const [expressTransfer, setExpressTransfer] = useState(true); // Pre-checked
  const [balanceShield, setBalanceShield] = useState(true); // Pre-checked

  // DV Tracking States
  const [dvData, setDvData] = useState({
    timeOnStep1: 0,
    timeOnStep2: 0,
    timeOnStep3: 0,
    timeOnStep4: 0,
    tipChanged: false,
    viewedTipDetails: false,
    hoveredZeroPercent: false,
    consentApi: 'unchecked',
    consentLocation: 'unchecked',
    consentEmployer: 'unchecked',
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
  
  const totalFee = tipAmount + (expressTransfer ? config.expressFee : 0) + (balanceShield ? config.balanceShieldFee : 0);
  const totalRepayment = loanAmount + totalFee;
  const effectiveAPR = ((totalFee / loanAmount) * (365 / 14)) * 100;

  const handleNextStep = () => {
    trackEvent({ type: 'click', elementId: `ewa-next-step-${flowStep}` });
    setFlowStep(prev => prev + 1);
  };
  
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setLoanAmount(newAmount);
    if (!dvData.tipChanged) {
      setTipAmount(newAmount * config.defaultTipRate);
    }
  };

  const handleTipChange = (value: number) => {
    setTipAmount(value);
    setDvData(prev => ({ ...prev, tipChanged: true }));
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    trackEvent({ type: 'click', elementId: 'ewa-submit' });
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
      onComplete({
        loanType: 'EWA',
        loanAmount,
        totalRepayment,
        apr: effectiveAPR,
        fees: totalFee,
        deceptivePractices: {
          tipJar: true,
          feeStacking: true,
          softFraming: true,
        },
        dvData,
      });
    }, 2000);
  };

  const renderFlow = () => {
    switch (flowStep) {
      case 1: // Earnings Display & "0% APR" framing
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Access Your Pay, Instantly</CardTitle>
              <CardDescription>You've earned it. Why wait for payday?</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
               <p className="text-lg text-gray-600">Your available earnings:</p>
               <p className="text-6xl font-extrabold text-green-600">$284.50</p>
               <div 
                 className="p-3 bg-green-50 border-l-4 border-green-400 cursor-pointer"
                 onMouseEnter={() => setDvData(prev => ({ ...prev, hoveredZeroPercent: true }))}
               >
                 <p className="font-semibold text-green-800">🎉 0% Interest. Always.</p>
                 <p className="text-xs text-green-700">This is not a loan. We just give you access to your own money.</p>
               </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg font-bold bg-green-600 hover:bg-green-700" onClick={handleNextStep}>Get Cash Now</Button>
            </CardFooter>
          </motion.div>
        );

      case 2: // Amount Selection & Tipping
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">How much do you need?</CardTitle>
              <CardDescription>Access up to your available earnings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label htmlFor="loan-amount" className="text-lg font-semibold">Amount</Label>
                 <div className="text-center my-4">
                  <p className="text-5xl font-extrabold text-green-600">${loanAmount.toLocaleString()}</p>
                </div>
                <input id="loan-amount" type="range" min="20" max="284" step="1" value={loanAmount} onChange={handleLoanAmountChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <Label className="text-lg font-semibold">Add a Tip?</Label>
                <p className="text-xs text-gray-500 mb-2">Tips help us provide this service to millions of workers.</p>
                <div className="flex justify-around">
                  {[0, 0.05, 0.1, 0.15].map(rate => {
                    const tip = loanAmount * rate;
                    return (
                      <Button 
                        key={rate}
                        variant={tipAmount === tip ? "default" : "outline"}
                        onClick={() => handleTipChange(tip)}
                        className="flex-grow mx-1"
                      >
                        {rate === 0 ? 'No Tip' : `${(rate*100)}%`} (${tip.toFixed(2)})
                      </Button>
                    );
                  })}
                </div>
                 <p 
                  className="text-xs text-blue-600 mt-2 cursor-pointer text-center"
                  onClick={() => setDvData(prev => ({...prev, viewedTipDetails: true}))}
                 >
                   Is this a fee?
                 </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg font-bold bg-green-600 hover:bg-green-700" onClick={handleNextStep}>Review Transfer</Button>
            </CardFooter>
          </motion.div>
        );
      
      case 3: // Add-ons (Fee stacking)
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Transfer Options</CardTitle>
              <CardDescription>Choose how you want to get your money.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-4 border rounded-lg ${expressTransfer ? 'border-green-500 bg-green-50' : 'bg-gray-50'}`}>
                <Checkbox id="expressTransfer" checked={expressTransfer} onCheckedChange={(c) => setExpressTransfer(c as boolean)} />
                <label htmlFor="expressTransfer" className="ml-2 font-semibold">⚡ Express Transfer (+${config.expressFee.toFixed(2)})</label>
                <p className="text-xs text-gray-600 ml-6">Receive your money in minutes.</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50 text-center">
                <p className="font-semibold">Standard Transfer</p>
                <p className="text-xs text-gray-600">Receive your money in 1-3 business days (Free).</p>
              </div>
               <div className={`p-4 border rounded-lg ${balanceShield ? 'border-green-500 bg-green-50' : 'bg-gray-50'}`}>
                <Checkbox id="balanceShield" checked={balanceShield} onCheckedChange={(c) => setBalanceShield(c as boolean)} />
                <label htmlFor="balanceShield" className="ml-2 font-semibold">🛡️ Balance Shield (+${config.balanceShieldFee.toFixed(2)})</label>
                <p className="text-xs text-gray-600 ml-6">Avoid overdrafts. We'll automatically send you cash if your balance is low.</p>
              </div>
            </CardContent>
             <CardFooter>
              <Button className="w-full text-lg font-bold bg-green-600 hover:bg-green-700" onClick={handleNextStep}>Continue</Button>
            </CardFooter>
          </motion.div>
        );

      case 4: // Final Confirmation & Consent
         return (
          <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Confirm & Get Cash</CardTitle>
              <CardDescription>Final check before we send your money.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-lg mb-2">Transfer Summary</h3>
                <div className="flex justify-between"><span>Amount:</span> <span className="font-mono">${loanAmount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tip:</span> <span className="font-mono">${tipAmount.toFixed(2)}</span></div>
                {expressTransfer && <div className="flex justify-between"><span>Express Fee:</span> <span className="font-mono">${config.expressFee.toFixed(2)}</span></div>}
                {balanceShield && <div className="flex justify-between"><span>Balance Shield:</span> <span className="font-mono">${config.balanceShieldFee.toFixed(2)}</span></div>}
                <hr className="my-2"/>
                <div className="flex justify-between font-bold text-xl"><span>Total Repayment:</span> <span className="font-mono">${totalRepayment.toFixed(2)}</span></div>
                <p className="text-xs text-gray-500 mt-2">*Effective APR: {effectiveAPR.toFixed(0)}% (based on fees)</p>
              </div>

               <div className="mt-6 p-4 border rounded-lg bg-gray-50 text-xs text-gray-600">
                <h4 className="font-semibold mb-2">Required Permissions</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="consentApi" onCheckedChange={(c) => setDvData(prev => ({...prev, consentApi: c ? 'checked' : 'unchecked'}))} />
                    <label htmlFor="consentApi" className="ml-2">I authorize secure access to my bank transaction data.</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="consentLocation" onCheckedChange={(c) => setDvData(prev => ({...prev, consentLocation: c ? 'checked' : 'unchecked'}))} />
                    <label htmlFor="consentLocation" className="ml-2">I allow location tracking to verify work hours.</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="consentEmployer" onCheckedChange={(c) => setDvData(prev => ({...prev, consentEmployer: c ? 'checked' : 'unchecked'}))} />
                    <label htmlFor="consentEmployer" className="ml-2">I consent to sharing my employment data for verification.</label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg font-bold bg-green-600 hover:bg-green-700" onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Get $${loanAmount} Now`}
              </Button>
            </CardFooter>
          </motion.div>
        );
    }
  };
  
  if (step === 0) {
    return (
      <IntroductionPrompt
        title="Earned Wage Access Scenario"
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
              <CardTitle className="text-3xl font-bold text-green-600">Transfer Successful!</CardTitle>
              <CardDescription>Your funds are on their way to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg">Amount Transferred: <span className="font-bold">${loanAmount.toFixed(2)}</span></p>
              <p className="text-lg">Total Deduction on Payday: <span className="font-bold">${totalRepayment.toFixed(2)}</span></p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
       <div className="max-w-xl mx-auto p-4 sm:p-6">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">Your Employer's Financial Wellness Partner</h1>
        </div>
        <ProgressIndicator currentStep={flowStep} totalSteps={4} />
        <Card className="shadow-lg mt-4 bg-white">
          <AnimatePresence mode="wait">
            {renderFlow()}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};

export default EwaLoanFlow; 