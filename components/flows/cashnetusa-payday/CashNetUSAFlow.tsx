import React, { useState, useEffect, useRef } from 'react';
import { useBehaviorTracking } from '@/components/providers/BehaviorTrackingProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Checkbox } from '@/components/shared/Checkbox';
import { UrgencyTimer } from '@/components/shared/UrgencyTimer';
import { RealTimeAnalytics } from '@/components/shared/RealTimeAnalytics';
import { AuthenticFinancialMessaging } from '@/components/shared/AuthenticFinancialMessaging';
import { NeuroeconomicBehaviorEngine } from '@/components/shared/NeuroeconomicBehaviorEngine';
import { DopamineBankingSystem } from '@/components/shared/DopamineBankingSystem';
import { Shield, CheckCircle, Star, DollarSign, Clock, TrendingUp, AlertTriangle, Users, Zap, Award, Lock, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CashNetUSAFlowProps {
  onComplete: (data: any) => void;
  scenarioPrompt: string;
}

const CashNetUSAFlow: React.FC<CashNetUSAFlowProps> = ({ onComplete, scenarioPrompt }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanAmount: 500,
    monthlyIncome: '',
    bankAccount: '',
    phoneNumber: '',
    email: '',
    acceptTerms: false,
    subscribeOffers: true, // Pre-checked for marketing
    autoRenew: true // 2025 enhancement: Pre-selected auto-renewal
  });
  const [showAPRModal, setShowAPRModal] = useState(false);
  const [showRolloverDetails, setShowRolloverDetails] = useState(false);
  const [showUrgencyModal, setShowUrgencyModal] = useState(false);
  const [timeSpentOnAPR, setTimeSpentOnAPR] = useState(0);
  const [urgencyClicks, setUrgencyClicks] = useState(0);
  const [spotsRemaining, setSpotsRemaining] = useState(Math.floor(Math.random() * 47) + 13);
  
  const { trackInteraction, trackTimeSpent } = useBehaviorTracking();
  const aprModalRef = useRef<HTMLDivElement>(null);

  // 2025 Enhanced: More aggressive APR calculations based on web research
  const calculateAPR = (amount: number) => {
    // CashNetUSA 2025 pricing: 160-1171% APR based on state and amount
    const baseAPR = 340 + (amount / 10); // Higher amounts = higher APR
    const stateMultiplier = 1.4; // Simulate highest-cost state
    const marketPressure = 1.2; // 2025 market conditions
    return Math.round(baseAPR * stateMultiplier * marketPressure);
  };

  const calculatePaymentSchedule = (amount: number) => {
    const apr = calculateAPR(amount);
    const fee = amount * 0.18; // 18% fee typical for 2025 payday
    const rolloverFee = amount * 0.30; // Higher rollover costs in 2025
    const autoRenewFee = amount * 0.15; // New 2025 auto-renewal fee
    
    return {
      dueAmount: amount + fee,
      rolloverAmount: amount + fee + rolloverFee,
      autoRenewAmount: amount + fee + autoRenewFee,
      dueDays: 14,
      apr: apr,
      effectiveAPR: Math.round((fee * 26) / amount * 100) // Actual calculation payday lenders avoid showing
    };
  };

  // 2025 Enhancement: Simulate countdown pressure
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsRemaining(prev => Math.max(1, prev - Math.floor(Math.random() * 3)));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAPRClick = () => {
    trackInteraction('apr_disclosure_opened', { step, timeSpent: timeSpentOnAPR });
    setShowAPRModal(true);
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      setTimeSpentOnAPR(Date.now() - startTime);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 30000);
  };

  const handleUrgencyClick = () => {
    setUrgencyClicks(prev => prev + 1);
    trackInteraction('urgency_banner_click', { 
      clickCount: urgencyClicks + 1,
      step,
      loanAmount: formData.loanAmount 
    });
  };

  const schedule = calculatePaymentSchedule(formData.loanAmount);

  return (
    <RealTimeAnalytics pageContext="cashnetusa-payday-loan">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        
        {/* 2025 Enhanced Breaking News Style Banner */}
        <motion.div 
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white p-2 shadow-lg"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            opacity: [1, 0.9, 1] 
          }}
          transition={{ 
            backgroundPosition: { duration: 3, repeat: Infinity },
            opacity: { duration: 1.5, repeat: Infinity }
          }}
          style={{ backgroundSize: '400% 400%' }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between text-center">
            <div className="flex-1">
              <motion.div
                animate={{ x: [-20, 0, -20] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm font-black"
              >
                🚨 URGENT: Federal rate changes TOMORROW - Lock in today's rates NOW! 🚨
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="pt-16"> {/* Account for fixed banner */}
          
          {/* 2025 Enhanced Trust Badge Matrix */}
          <div className="max-w-6xl mx-auto mb-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 p-4 bg-white rounded-lg shadow-md border-2 border-blue-200">
              <motion.div 
                className="flex flex-col items-center p-3 bg-gradient-to-b from-green-50 to-green-100 rounded-lg border border-green-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Lock className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-xs font-bold text-green-800">256-BIT</span>
                <span className="text-xs text-green-600">ENCRYPTION</span>
                <span className="text-xs text-gray-500">Bank Level</span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center p-3 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg border border-blue-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Award className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-xs font-bold text-blue-800">BBB A+</span>
                <span className="text-xs text-blue-600">ACCREDITED</span>
                <span className="text-xs text-gray-500">Since 2005</span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center p-3 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg border border-purple-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Users className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-xs font-bold text-purple-800">4.7M+</span>
                <span className="text-xs text-purple-600">CUSTOMERS</span>
                <span className="text-xs text-gray-500">Nationwide</span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center p-3 bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg border border-orange-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="w-8 h-8 text-orange-600 mb-2" />
                <span className="text-xs font-bold text-orange-800">5-MIN</span>
                <span className="text-xs text-orange-600">APPROVAL</span>
                <span className="text-xs text-gray-500">Guaranteed*</span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center p-3 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Zap className="w-8 h-8 text-yellow-600 mb-2" />
                <span className="text-xs font-bold text-yellow-800">SAME DAY</span>
                <span className="text-xs text-yellow-600">FUNDING</span>
                <span className="text-xs text-gray-500">Available**</span>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center p-3 bg-gradient-to-b from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <BadgeCheck className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="text-xs font-bold text-indigo-800">FDIC</span>
                <span className="text-xs text-indigo-600">PARTNER</span>
                <span className="text-xs text-gray-500">Insured</span>
              </motion.div>
            </div>
          </div>

          {/* 2025 Enhanced Countdown Pressure Banner */}
          <motion.div 
            className="max-w-6xl mx-auto mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <div 
              className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 rounded-xl cursor-pointer shadow-xl border-2 border-yellow-400 relative overflow-hidden"
              onClick={handleUrgencyClick}
            >
              <motion.div
                className="absolute inset-0 bg-yellow-400 opacity-20"
                animate={{ 
                  x: [-100, window.innerWidth || 800, -100],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-8 h-8 text-yellow-300" />
                  </motion.div>
                  <div>
                    <div className="text-xl font-black mb-1">
                      🔥 LAST {spotsRemaining} SPOTS AT TODAY'S RATES! 🔥
                    </div>
                    <div className="text-sm font-medium">
                      Rates increase by 15% tomorrow - Apply in next 12 minutes!
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <UrgencyTimer initialMinutes={12} onExpire={() => setShowUrgencyModal(true)} />
                  <div className="text-xs mt-1 bg-yellow-400 text-black px-2 py-1 rounded font-bold">
                    {spotsRemaining} SPOTS LEFT
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scenario Prompt Display */}
          <div className="max-w-6xl mx-auto mb-6">
            <Card className="border-amber-200 bg-amber-50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800 leading-relaxed">{scenarioPrompt}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Application Flow */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Application Form - Enhanced 2025 CashNetUSA Style */}
              <div className="lg:col-span-2">
                <Card className="shadow-2xl border-2 border-blue-200">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-8 h-8" />
                        <div>
                          <div className="text-xl font-bold">Get Cash Today!</div>
                          <div className="text-sm font-normal opacity-90">Application takes 60 seconds</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black">${formData.loanAmount}</div>
                        <div className="text-xs opacity-80">Available Now</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-gradient-to-b from-white to-gray-50">
                    
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <motion.h2 
                            className="text-4xl font-black text-gray-800 mb-3"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Get ${formData.loanAmount} in Your Account Today!
                          </motion.h2>
                          <div className="flex justify-center space-x-6 text-sm">
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-medium">No Credit Check</span>
                            </div>
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-medium">5-Min Approval</span>
                            </div>
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="font-medium">Same Day Funding</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <label className="block text-lg font-bold text-gray-800 mb-3">
                              How much cash do you need today? *
                            </label>
                            <div className="relative">
                              <input
                                type="range"
                                min="100"
                                max="2500"
                                step="50"
                                value={formData.loanAmount}
                                onChange={(e) => setFormData(prev => ({...prev, loanAmount: parseInt(e.target.value)}))}
                                className="w-full h-3 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
                              />
                              <div className="flex justify-between text-sm font-medium text-gray-600 mt-2">
                                <span>$100</span>
                                <motion.span 
                                  className="text-2xl font-black text-blue-600 bg-white px-3 py-1 rounded-full shadow-md"
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 0.5 }}
                                  key={formData.loanAmount}
                                >
                                  ${formData.loanAmount}
                                </motion.span>
                                <span>$2,500</span>
                              </div>
                            </div>
                            <div className="mt-3 text-center">
                              <div className="text-sm text-blue-600 font-medium">
                                Repay in just 2 weeks - Total: ${schedule.dueAmount}
                              </div>
                              <button
                                onClick={handleAPRClick}
                                className="text-xs text-gray-500 hover:text-gray-700 underline mt-1"
                              >
                                See rates & terms
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">
                                Monthly Income *
                              </label>
                              <Input
                                type="number"
                                placeholder="e.g., $2,500"
                                value={formData.monthlyIncome}
                                onChange={(e) => setFormData(prev => ({...prev, monthlyIncome: e.target.value}))}
                                className="text-lg font-medium"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">
                                Phone Number *
                              </label>
                              <Input
                                type="tel"
                                placeholder="(555) 123-4567"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData(prev => ({...prev, phoneNumber: e.target.value}))}
                                className="text-lg font-medium"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                              className="text-lg font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Bank Account Number *
                            </label>
                            <Input
                              type="text"
                              placeholder="For same-day deposit"
                              value={formData.bankAccount}
                              onChange={(e) => setFormData(prev => ({...prev, bankAccount: e.target.value}))}
                              className="text-lg font-medium"
                            />
                            <div className="text-xs text-gray-500 mt-1">
                              We use 256-bit encryption to protect your information
                            </div>
                          </div>

                          {/* 2025 Enhancement: Pre-selected checkboxes with dark patterns */}
                          <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
                            <div className="flex items-start space-x-3">
                              <Checkbox
                                checked={formData.acceptTerms}
                                onChange={(checked) => setFormData(prev => ({...prev, acceptTerms: checked}))}
                                className="mt-1"
                              />
                              <div className="text-sm">
                                <label className="text-gray-700">
                                  I agree to the{' '}
                                  <button
                                    className="text-blue-600 hover:text-blue-800 underline"
                                    onClick={() => setShowAPRModal(true)}
                                  >
                                    Terms & Conditions
                                  </button>
                                  {' '}and authorize CashNetUSA to deposit funds and collect repayment from my bank account. *
                                </label>
                              </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <Checkbox
                                checked={formData.autoRenew}
                                onChange={(checked) => setFormData(prev => ({...prev, autoRenew: checked}))}
                                className="mt-1"
                              />
                              <div className="text-sm">
                                <label className="text-gray-700">
                                  <span className="font-medium text-green-600">RECOMMENDED:</span> Enable automatic renewal to avoid missed payments. 
                                  <span className="text-xs text-gray-500 block mt-1">
                                    (Small convenience fee applies - helps maintain good standing)
                                  </span>
                                </label>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <Checkbox
                                checked={formData.subscribeOffers}
                                onChange={(checked) => setFormData(prev => ({...prev, subscribeOffers: checked}))}
                                className="mt-1"
                              />
                              <div className="text-sm">
                                <label className="text-gray-700">
                                  Send me exclusive offers and financial tips via email and SMS.
                                  <span className="text-xs text-gray-500 block mt-1">
                                    (Recommended - Get notified of rate decreases and special promotions)
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              onClick={() => setStep(2)}
                              disabled={!formData.acceptTerms || !formData.monthlyIncome || !formData.email || !formData.phoneNumber}
                              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-xl py-4 rounded-xl shadow-xl"
                            >
                              <div className="flex items-center justify-center space-x-3">
                                <Zap className="w-6 h-6" />
                                <span>GET MY ${formData.loanAmount} NOW!</span>
                                <Zap className="w-6 h-6" />
                              </div>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-green-600 mb-2">
                          Pre-Approved for ${formData.loanAmount}!
                        </h2>
                        <p className="text-gray-600">Review your loan details below</p>
                      </div>

                      {/* Loan Summary - Minimal APR Visibility */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-3">Your Loan Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Loan Amount:</span>
                            <span className="font-bold text-green-600">${formData.loanAmount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Funding:</span>
                            <span className="font-bold">Today by 5 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Due Date:</span>
                            <span className="font-bold">{schedule.dueDays} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payment Amount:</span>
                            <span className="font-bold">${schedule.dueAmount}</span>
                          </div>
                          
                          {/* Hidden APR - Small Text */}
                          <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                            <span>
                              Representative APR:{' '}
                              <span 
                                className="underline cursor-pointer"
                                onClick={handleAPRClick}
                              >
                                {schedule.apr}%
                              </span>
                            </span>
                            <span 
                              className="underline cursor-pointer"
                              onClick={() => setShowRolloverDetails(true)}
                            >
                              Extension options
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Multiple Call-to-Action Buttons */}
                      <div className="space-y-3">
                        <Button
                          onClick={() => onComplete({
                            flow: 'cashnetusa-payday',
                            loanAmount: formData.loanAmount,
                            apr: schedule.apr,
                            timeSpentOnAPR,
                            urgencyClicks,
                            rolloverViewed: showRolloverDetails
                          })}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg"
                        >
                          ACCEPT LOAN & GET FUNDED TODAY
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="w-full"
                        >
                          Modify Loan Details
                        </Button>
                      </div>

                      <div className="text-center">
                        <p className="text-xs text-gray-500 leading-relaxed">
                          By accepting, you authorize automatic withdrawal of payment on your due date.
                          Late fees may apply. See terms for rollover options and fees.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Trust Signals & Urgency */}
            <div className="space-y-4">
              {/* Trust Badges */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Why Choose CashNetUSA?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Bank-level security</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Same-day funding</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">4+ million customers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Testimonials */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Customer Reviews</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="flex items-center space-x-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600">"Got my money in hours! Saved my car from repo."</p>
                      <p className="text-xs text-gray-500 mt-1">- Sarah M.</p>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center space-x-1 mb-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600">"Easy process, money when I needed it most."</p>
                      <p className="text-xs text-gray-500 mt-1">- Mike R.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Urgency Counter */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-red-700 mb-2">Time Sensitive!</h3>
                  <p className="text-sm text-red-600 mb-3">
                    Applications received after 4 PM may not be funded until next business day.
                  </p>
                  <div className="text-center">
                    <UrgencyTimer initialTime={3600} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* APR Modal - Buried Information */}
        <AnimatePresence>
          {showAPRModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowAPRModal(false)}
            >
              <motion.div
                ref={aprModalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Loan Terms & Conditions</h3>
                  <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                    <p><strong>Representative APR:</strong> {schedule.apr}% (varies by state)</p>
                    <p><strong>Loan Amount:</strong> $100 - $2,500</p>
                    <p><strong>Loan Term:</strong> Typically 14 days</p>
                    <p><strong>Finance Charges:</strong> Calculated based on loan amount and term</p>
                    
                    <div className="bg-yellow-50 p-3 rounded mt-4">
                      <p className="text-xs"><strong>Important:</strong> This is an expensive form of credit. 
                      Payday loans are intended for short-term financial needs. Consider other options like 
                      credit union loans, credit card advances, or borrowing from family.</p>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-4">
                      <p><strong>Rollover Policy:</strong> Extensions may be available with additional fees. 
                      Each extension adds approximately 25% of the original loan amount in fees.</p>
                      <p><strong>Late Fees:</strong> $25-50 depending on loan amount and state regulations.</p>
                      <p><strong>Collection Policy:</strong> Unpaid loans may be reported to credit bureaus 
                      and sent to third-party collection agencies.</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowAPRModal(false)}
                    className="mt-4 w-full"
                  >
                    I Understand
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rollover Details Modal */}
        <AnimatePresence>
          {showRolloverDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowRolloverDetails(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Extension Options</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-medium">Can't pay on time?</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Extend your loan for an additional 14 days with just a {Math.round(formData.loanAmount * 0.25)} rollover fee.
                      </p>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p><strong>Extension Fee:</strong> ${Math.round(formData.loanAmount * 0.25)}</p>
                      <p><strong>New Due Date:</strong> {schedule.dueDays + 14} days from today</p>
                      <p><strong>Total if Extended:</strong> ${schedule.rolloverAmount}</p>
                    </div>
                    
                    <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                      <p><strong>Note:</strong> Multiple extensions can significantly increase the total cost of your loan.</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setShowRolloverDetails(false)}
                    className="mt-4 w-full"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Components Integration */}
        <AuthenticFinancialMessaging 
          loanType="Payday"
          loanAmount={formData.loanAmount}
          apr={schedule.apr}
          currentStep={`step-${step}`}
        />
        
        <NeuroeconomicBehaviorEngine
          userId="cashnetusa-user"
          currentContext="payday-application"
          stressLevel={0.8} // High stress for emergency scenario
        />
        
        <DopamineBankingSystem
          userId="cashnetusa-user"
          currentFlow="loan-application"
          completionPercentage={step === 2 ? 90 : 45}
        />
      </div>
    </RealTimeAnalytics>
  );
};

export default CashNetUSAFlow; 