import React, { useState, useEffect, useRef } from 'react';
import { useBehaviorTracking } from '@/components/providers/BehaviorTrackingProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Checkbox } from '@/components/shared/Checkbox';
import { RealTimeAnalytics } from '@/components/shared/RealTimeAnalytics';
import { AuthenticFinancialMessaging } from '@/components/shared/AuthenticFinancialMessaging';
import { NeuroeconomicBehaviorEngine } from '@/components/shared/NeuroeconomicBehaviorEngine';
import { DopamineBankingSystem } from '@/components/shared/DopamineBankingSystem';
import { Building2, Shield, Heart, Sparkles, Gift, TrendingUp, Clock, DollarSign, Info, Star, CheckCircle, Users, Zap, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EarninFlowProps {
  onComplete: (data: any) => void;
  scenarioPrompt: string;
}

const EarninFlow: React.FC<EarninFlowProps> = ({ onComplete, scenarioPrompt }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    earnedAmount: 120,
    accessAmount: 50,
    bankAccount: '',
    employer: 'Warehouse Solutions Inc.',
    tipAmount: 4, // 2025 Enhancement: Higher default tip pre-selected
    tipOptOut: false,
    acceptTerms: false,
    dataSharing: true, // Pre-selected for API access
    marketingConsent: true, // 2025 Enhancement: Pre-selected marketing
    locationSharing: true, // 2025 Enhancement: Pre-selected location data
    workScheduleAccess: true // 2025 Enhancement: Pre-selected schedule data
  });
  const [showDataModal, setShowDataModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [timeSpentOnTip, setTimeSpentOnTip] = useState(0);
  const [tipInteractions, setTipInteractions] = useState(0);
  
  const { trackInteraction, trackTimeSpent } = useBehaviorTracking();

  const calculateNetPayout = () => {
    const baseAmount = formData.accessAmount;
    const tip = formData.tipOptOut ? 0 : formData.tipAmount;
    const expressDelivery = 2; // Optional express fee
    return {
      gross: baseAmount,
      tip: tip,
      expressDelivery: expressDelivery,
      net: baseAmount - tip - expressDelivery
    };
  };

  const handleTipClick = () => {
    setTipInteractions(prev => prev + 1);
    trackInteraction('tip_amount_interaction', { 
      newAmount: formData.tipAmount,
      interaction: tipInteractions + 1,
      step 
    });
  };

  const handleDataSharingClick = () => {
    trackInteraction('data_sharing_modal_opened', { step });
    setShowDataModal(true);
  };

  const payout = calculateNetPayout();

  return (
    <RealTimeAnalytics pageContext="earnin-ewa-access">
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-4">
        
        {/* 2025 Enhanced Earnin Header - Clean & Trustworthy */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">Earnin</div>
                  <div className="text-sm text-gray-600">Get paid as you work, when you need it</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-600 font-semibold">Verified Employer Partner</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">4.8/5 • 12M+ users</span>
                </div>
              </div>
            </div>
            
            {/* 2025 Enhancement: Trust indicators grid */}
            <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-700">0% APR</span>
                <span className="text-xs text-gray-500">No Interest Ever</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-1">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-blue-700">Bank-Level</span>
                <span className="text-xs text-gray-500">Security</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-1">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-purple-700">12M+ Users</span>
                <span className="text-xs text-gray-500">Trusted Daily</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-1">
                  <Zap className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs font-medium text-orange-700">Instant Access</span>
                <span className="text-xs text-gray-500">No Waiting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Prompt */}
        <div className="max-w-3xl mx-auto mb-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">{scenarioPrompt}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Employer Verification Card */}
              <Card className="shadow-sm border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {formData.employer}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">Verified Employer</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">This Pay Period Earned:</span>
                      <span className="text-lg font-bold text-green-600">${formData.earnedAmount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Next Payday:</span>
                      <span className="text-sm font-medium">Friday, 12 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Access Amount Selection */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>How much would you like to access?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      ${formData.accessAmount}
                    </div>
                    <p className="text-sm text-gray-600">
                      Available: ${Math.min(formData.earnedAmount * 0.7, 100)} max
                    </p>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min="10"
                      max={Math.min(formData.earnedAmount * 0.7, 100)}
                      step="5"
                      value={formData.accessAmount}
                      onChange={(e) => setFormData(prev => ({...prev, accessAmount: parseInt(e.target.value)}))}
                      className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>$10</span>
                      <span className="text-sm font-medium text-green-600">Perfect for groceries!</span>
                      <span>${Math.min(formData.earnedAmount * 0.7, 100)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center p-4">
                  <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">0% Interest</div>
                  <div className="text-xs text-gray-600">Never pay interest on advances</div>
                </Card>
                <Card className="text-center p-4">
                  <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">Instant Transfer</div>
                  <div className="text-xs text-gray-600">Get money in minutes</div>
                </Card>
                <Card className="text-center p-4">
                  <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">Bank-Level Security</div>
                  <div className="text-xs text-gray-600">Your data is protected</div>
                </Card>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              
              {/* Payment Summary */}
              <Card className="shadow-sm border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5" />
                    <span>Your Cash Advance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-medium">Cash Advance</span>
                        <span className="text-2xl font-bold text-green-600">${payout.gross}</span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Express Delivery (2 min)</span>
                          <span>-${payout.expressDelivery}</span>
                        </div>
                        
                        {/* Tip Section - Key Deception Point */}
                        <div className="flex justify-between items-center bg-white rounded p-2">
                          <div className="flex items-center space-x-2">
                            <span>Optional tip</span>
                            <button
                              onClick={() => setShowTipModal(true)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Info className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setFormData(prev => ({...prev, tipAmount: Math.max(1, prev.tipAmount - 1)}));
                                handleTipClick();
                              }}
                              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-medium">${payout.tip}</span>
                            <button
                              onClick={() => {
                                setFormData(prev => ({...prev, tipAmount: Math.min(10, prev.tipAmount + 1)}));
                                handleTipClick();
                              }}
                              className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="border-t pt-2 font-medium">
                          <div className="flex justify-between">
                            <span>You'll receive</span>
                            <span className="text-lg font-bold text-green-600">${payout.net}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bank Account Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Account for Deposit
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your checking account"
                        value={formData.bankAccount}
                        onChange={(e) => setFormData(prev => ({...prev, bankAccount: e.target.value}))}
                        className="w-full rounded-lg"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Funds will be automatically recovered from your next paycheck
                      </p>
                    </div>

                    {/* Consent Checkboxes */}
                    <div className="space-y-3 border-t pt-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => setFormData(prev => ({...prev, acceptTerms: checked as boolean}))}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                          I agree to the Terms of Service and authorize Earnin to access my timesheet data and deduct this advance from my next paycheck.
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="dataSharing"
                          checked={formData.dataSharing}
                          onCheckedChange={(checked) => setFormData(prev => ({...prev, dataSharing: checked as boolean}))}
                        />
                        <label htmlFor="dataSharing" className="text-sm text-gray-700">
                          Allow Earnin to access my banking data to verify income and optimize my experience.{' '}
                          <span 
                            className="text-blue-600 underline cursor-pointer"
                            onClick={handleDataSharingClick}
                          >
                            Learn more
                          </span>
                        </label>
                      </div>
                    </div>

                    <Button
                      onClick={() => onComplete({
                        flow: 'earnin-ewa',
                        accessAmount: formData.accessAmount,
                        netPayout: payout.net,
                        tipAmount: payout.tip,
                        timeSpentOnTip,
                        tipInteractions,
                        dataSharing: formData.dataSharing
                      })}
                      disabled={!formData.acceptTerms || !formData.bankAccount}
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-4 rounded-xl text-lg"
                    >
                      Get ${payout.net} Now
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500 leading-relaxed">
                        No interest • No credit check • Money in your account within 2 minutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Message */}
              <Card className="border-pink-200 bg-pink-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <div className="text-sm text-pink-800">
                      <span className="font-medium">You're helping build a fairer financial system!</span>
                      <br />
                      Your tips help us keep Earnin free for everyone.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Tip Information Modal */}
        <AnimatePresence>
          {showTipModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowTipModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <span>About Tips</span>
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      Tips are optional and help us keep Earnin free for everyone. They don't affect 
                      your access to cash advances.
                    </p>
                    <p>
                      <strong>How tips work:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>100% voluntary - you can always tip $0</li>
                      <li>Helps cover operational costs</li>
                      <li>Supports fair financial access for all</li>
                      <li>No impact on your credit or account</li>
                    </ul>
                    
                    <div className="bg-green-50 p-3 rounded-lg mt-4">
                      <p className="text-green-700 text-xs">
                        <strong>Note:</strong> While tips are optional, they help us maintain our 0% APR policy 
                        and continue offering advances without interest charges.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <Button
                      onClick={() => {
                        setFormData(prev => ({...prev, tipOptOut: true, tipAmount: 0}));
                        setShowTipModal(false);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      No Tip This Time
                    </Button>
                    <Button
                      onClick={() => setShowTipModal(false)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Keep Tip
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data Sharing Modal */}
        <AnimatePresence>
          {showDataModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowDataModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-lg w-full max-h-96 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span>Data Access & Privacy</span>
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      <strong>We access your data to:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Verify your hours worked and wages earned</li>
                      <li>Calculate available advance amounts</li>
                      <li>Automatically recover advances from paychecks</li>
                      <li>Improve our service and prevent fraud</li>
                    </ul>
                    
                    <p className="text-xs bg-blue-50 p-3 rounded">
                      <strong>Bank Data:</strong> We use read-only access to verify income patterns 
                      and paycheck deposits. We never store your banking credentials.
                    </p>
                    
                    <p className="text-xs bg-yellow-50 p-3 rounded">
                      <strong>Employer Integration:</strong> We may share advance information with 
                      your employer's payroll system to facilitate automatic recovery.
                    </p>
                    
                    <div className="text-xs text-gray-500 mt-4">
                      <p><strong>Data Security:</strong> All data is encrypted and stored securely. 
                      We're SOC 2 compliant and never sell your personal information.</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowDataModal(false)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Got It
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Components Integration */}
        <AuthenticFinancialMessaging 
          loanType="EWA"
          loanAmount={formData.accessAmount}
          apr={0} // "0% APR" marketing
          currentStep={`step-${step}`}
        />
        
        <NeuroeconomicBehaviorEngine
          userId="earnin-user"
          currentContext="wage-access"
          stressLevel={0.6} // Moderate stress - need groceries
        />
        
        <DopamineBankingSystem
          userId="earnin-user"
          currentFlow="wage-advance"
          completionPercentage={step === 2 ? 85 : 50}
        />
      </div>
    </RealTimeAnalytics>
  );
};

export default EarninFlow; 