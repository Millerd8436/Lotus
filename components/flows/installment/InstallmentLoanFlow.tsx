// components/flows/installment/InstallmentLoanFlow.tsx
import React, { useState, useEffect } from 'react';
import { useBehaviorTracking } from '@/components/providers/BehaviorTrackingProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Label } from '@/components/shared';
import { Checkbox } from '@/components/shared/Checkbox';
import { CollapsibleSection } from '@/components/shared/CollapsibleSection';
import { Badge } from '@/components/shared/Badge';
import { ProgressIndicator } from '@/components/shared/ProgressIndicator';
import { motion, AnimatePresence } from 'framer-motion';
import { LoanSimulation, SimulationConfig } from '@/types';
import { IntroductionPrompt } from '@/components/shared';

interface InstallmentLoanFlowProps {
  config: SimulationConfig['installment'];
  onComplete: (data: LoanSimulation) => void;
}

const InstallmentLoanFlow: React.FC<InstallmentLoanFlowProps> = ({ config, onComplete }) => {
  const [step, setStep] = useState(0); // 0 for prompt, 1+ for flow
  const [flowStep, setFlowStep] = useState(1);
  const [loanAmount, setLoanAmount] = useState(config.defaultLoanAmount);
  const [term, setTerm] = useState(12); // months
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { trackEvent } = useBehaviorTracking();

  // Deceptive pattern states
  const [creditLife, setCreditLife] = useState(true); // Pre-checked
  const [unemployment, setUnemployment] = useState(true); // Pre-checked
  const [expressDeposit, setExpressDeposit] = useState(false);

  // DV Tracking States
  const [dvData, setDvData] = useState({
    timeOnStep1: 0,
    timeOnStep2: 0,
    timeOnStep3: 0,
    scheduleViewed: false,
    totalCostViewed: false,
    hoveredPaymentSchedule: false,
    consentCredit: 'unchecked',
    consentArbitration: 'unchecked',
    consentAutoWithdraw: 'unchecked',
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

  const monthlyInterestRate = config.apr / 12;
  const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)) / (Math.pow(1 + monthlyInterestRate, term) - 1);
  
  let totalCost = monthlyPayment * term;
  
  if (creditLife) totalCost += config.junkFees.creditLife;
  if (unemployment) totalCost += config.junkFees.unemployment;
  if (expressDeposit) totalCost += config.junkFees.expressDeposit;
  
  const finalAPR = (((totalCost - loanAmount) / loanAmount) / (term / 12)) * 100;

  const handleNextStep = () => {
    trackEvent({ type: 'click', elementId: `installment-next-step-${flowStep}` });
    setFlowStep(prev => prev + 1);
  };
  
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  };
  
  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(Number(e.target.value));
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    trackEvent({ type: 'click', elementId: 'installment-submit' });
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
      onComplete({
        loanType: 'Installment',
        loanAmount,
        totalRepayment: totalCost,
        apr: finalAPR,
        fees: totalCost - loanAmount,
        deceptivePractices: {
          anchoring: true,
          junkFees: true,
          darkPatterns: true,
        },
        dvData,
      });
    }, 2000);
  };

  const renderFlow = () => {
    switch (flowStep) {
      case 1: // Amount Selection
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Your Loan Offer</CardTitle>
              <CardDescription>Adjust the sliders to find a plan that works for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <Label htmlFor="loan-amount" className="text-lg font-semibold text-gray-700">Loan Amount</Label>
                <div className="text-center my-4">
                  <p className="text-5xl font-extrabold text-blue-600">${loanAmount.toLocaleString()}</p>
                </div>
                <input id="loan-amount" type="range" min="500" max="5000" step="100" value={loanAmount} onChange={handleLoanAmountChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>$500</span>
                  <span>$5,000</span>
                </div>
              </div>
              <div>
                <Label htmlFor="loan-term" className="text-lg font-semibold text-gray-700">Repayment Term</Label>
                <div className="text-center my-4">
                  <p className="text-5xl font-extrabold text-blue-600">{term} <span className="text-3xl">months</span></p>
                </div>
                <input id="loan-term" type="range" min="6" max="36" step="1" value={term} onChange={handleTermChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>6 months</span>
                  <span>36 months</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg font-bold bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>See Your Payment Plan</Button>
            </CardFooter>
          </motion.div>
        );

      case 2: // Payment Plan & Cost Breakdown
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Your Personalized Plan</CardTitle>
              <CardDescription>Here's what your monthly payments look like.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center bg-blue-50 p-6 rounded-lg">
                <p className="text-lg text-gray-600">Your Estimated Monthly Payment</p>
                <p className="text-6xl font-extrabold text-blue-700 my-2">${monthlyPayment.toFixed(2)}</p>
                <p className="text-sm text-gray-500">for {term} months</p>
              </div>
              
              <CollapsibleSection 
                title="View Full Payment Schedule & Total Cost"
                onOpen={() => setDvData(prev => ({ ...prev, scheduleViewed: true }))}
              >
                <div className="p-4 bg-gray-100 rounded-lg mt-2" onMouseEnter={() => setDvData(prev => ({ ...prev, hoveredPaymentSchedule: true }))}>
                  <p className="text-sm text-gray-600">This is an estimate. Your final terms may vary.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between"><span>Principal:</span> <span className="font-mono">${loanAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Estimated Interest:</span> <span className="font-mono">${(monthlyPayment * term - loanAmount).toFixed(2)}</span></div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold" onClick={() => setDvData(prev => ({...prev, totalCostViewed: true}))}>
                      <span>Total Repayment:</span> <span className="font-mono">${(monthlyPayment * term).toFixed(2)}</span>
                    </div>
                     <p className="text-xs text-gray-500 mt-2">*Effective APR: {finalAPR.toFixed(0)}%</p>
                  </div>
                </div>
              </CollapsibleSection>

            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg font-bold bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>Next: Add-ons & Confirmation</Button>
            </CardFooter>
          </motion.div>
        );
      
      case 3: // Optional Add-ons & Confirmation
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Protect Your Loan</CardTitle>
              <CardDescription>Consider these optional services for peace of mind.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-4 border rounded-lg ${creditLife ? 'border-blue-500 bg-blue-50' : 'bg-gray-50'}`}>
                <Checkbox id="creditLife" checked={creditLife} onCheckedChange={(c) => setCreditLife(c as boolean)} />
                <label htmlFor="creditLife" className="ml-2 font-semibold">Credit Life Insurance (+${config.junkFees.creditLife.toFixed(2)})</label>
                <p className="text-xs text-gray-600 ml-6">Helps cover your loan payments in the event of your death.</p>
              </div>
              <div className={`p-4 border rounded-lg ${unemployment ? 'border-blue-500 bg-blue-50' : 'bg-gray-50'}`}>
                <Checkbox id="unemployment" checked={unemployment} onCheckedChange={(c) => setUnemployment(c as boolean)} />
                <label htmlFor="unemployment" className="ml-2 font-semibold">Unemployment Protection (+${config.junkFees.unemployment.toFixed(2)})</label>
                <p className="text-xs text-gray-600 ml-6">Temporarily pauses your payments if you lose your job.</p>
              </div>
              <div className={`p-4 border rounded-lg ${expressDeposit ? 'border-blue-500 bg-blue-50' : 'bg-gray-50'}`}>
                <Checkbox id="expressDeposit" checked={expressDeposit} onCheckedChange={(c) => setExpressDeposit(c as boolean)} />
                <label htmlFor="expressDeposit" className="ml-2 font-semibold">Express Deposit (+${config.junkFees.expressDeposit.toFixed(2)})</label>
                <p className="text-xs text-gray-600 ml-6">Get your funds in as little as 1 hour.</p>
              </div>

              <div className="mt-6 p-4 border rounded-lg bg-gray-50 text-xs text-gray-600">
                <h4 className="font-semibold mb-2">Final Agreements</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="consentCredit" onCheckedChange={(c) => setDvData(prev => ({...prev, consentCredit: c ? 'checked' : 'unchecked'}))} />
                    <label htmlFor="consentCredit" className="ml-2">I authorize a soft credit check that will not impact my credit score.</label>
                  </div>
                   <div className="flex items-center">
                    <Checkbox id="consentArbitration" onCheckedChange={(c) => setDvData(prev => ({...prev, consentArbitration: c ? 'checked' : 'unchecked'}))} />
                    <label htmlFor="consentArbitration" className="ml-2">I agree to the mandatory arbitration clause.</label>
                  </div>
                   <div className="flex items-center">
                    <Checkbox id="consentAutoWithdraw" onCheckedChange={(c) => setDvData(prev => ({...prev, consentAutoWithdraw: c ? 'checked' : 'unchecked'}))} />
                    <label htmlFor="consentAutoWithdraw" className="ml-2">I authorize automatic withdrawals for my monthly payments.</label>
                  </div>
                </div>
              </div>

            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg font-bold bg-green-600 hover:bg-green-700" onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? 'Finalizing...' : `Submit Application & Get $${loanAmount}`}
              </Button>
            </CardFooter>
          </motion.div>
        );
    }
  };
  
  if (step === 0) {
    return (
      <IntroductionPrompt
        title="Installment Loan Scenario"
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
              <CardTitle className="text-3xl font-bold text-green-600">Application Submitted!</CardTitle>
              <CardDescription>You'll receive an email with our decision shortly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg">Requested Amount: <span className="font-bold">${loanAmount.toFixed(2)}</span></p>
              <p className="text-lg">Estimated Total Repayment: <span className="font-bold">${totalCost.toFixed(2)}</span></p>
              <p className="text-sm text-gray-600">Effective APR: {finalAPR.toFixed(0)}%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto p-4 sm:p-6">
        <ProgressIndicator currentStep={flowStep} totalSteps={3} />
        <Card className="shadow-lg mt-4 bg-white">
          <AnimatePresence mode="wait">
            {renderFlow()}
          </AnimatePresence>
        </Card>
         <div className="text-center mt-6 flex justify-center items-center space-x-4">
          <Badge>A+ BBB Rating</Badge>
          <Badge>256-Bit Encryption</Badge>
          <Badge>Trusted by 1M+ Customers</Badge>
        </div>
      </div>
    </div>
  );
};

export default InstallmentLoanFlow; 