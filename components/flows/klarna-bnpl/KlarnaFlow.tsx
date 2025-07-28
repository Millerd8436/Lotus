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
import { CreditCard, Calendar, Shield, Sparkles, Gift, Star, Info, Book, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface KlarnaFlowProps {
  onComplete: (data: any) => void;
  scenarioPrompt: string;
}

const KlarnaFlow: React.FC<KlarnaFlowProps> = ({ onComplete, scenarioPrompt }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    purchaseAmount: 110,
    email: '',
    phoneNumber: '',
    paymentMethod: 'debit',
    installmentPlan: 'pay-in-4',
    acceptTerms: false,
    marketingOptIn: true, // Pre-selected
    creditCheck: true
  });
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [timeSpentOnTerms, setTimeSpentOnTerms] = useState(0);
  const [scheduleClicks, setScheduleClicks] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  
  const { trackInteraction, trackTimeSpent } = useBehaviorTracking();

  const calculatePaymentSchedule = () => {
    const amount = formData.purchaseAmount;
    const installmentAmount = amount / 4;
    const today = new Date();
    
    return {
      total: amount,
      installmentAmount: Math.round(installmentAmount * 100) / 100,
      schedule: [
        { date: new Date(today), amount: installmentAmount, status: 'Today' },
        { date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000), amount: installmentAmount, status: '2 weeks' },
        { date: new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000), amount: installmentAmount, status: '4 weeks' },
        { date: new Date(today.getTime() + 42 * 24 * 60 * 60 * 1000), amount: installmentAmount, status: '6 weeks' }
      ],
      lateFee: 7, // $7 late fee per missed payment
      maxLateFees: 25 // Capped at $25
    };
  };

  const handleTermsClick = () => {
    trackInteraction('terms_modal_opened', { step, timeSpent: timeSpentOnTerms });
    setShowTermsModal(true);
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      setTimeSpentOnTerms(Date.now() - startTime);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 60000);
  };

  const handleScheduleClick = () => {
    setScheduleClicks(prev => prev + 1);
    trackInteraction('payment_schedule_viewed', { 
      clickCount: scheduleClicks + 1,
      step 
    });
    setShowScheduleDetails(!showScheduleDetails);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const schedule = calculatePaymentSchedule();

  return (
    <RealTimeAnalytics pageContext="klarna-bnpl-checkout">
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        
        {/* Authentic Klarna Header */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">Klarna</div>
                  <div className="text-sm text-gray-600">Smooth shopping</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">Excellent</span>
                </div>
                <div className="text-xs text-gray-500">150M+ users worldwide</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Prompt */}
        <div className="max-w-4xl mx-auto mb-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Book className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">{scenarioPrompt}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Checkout Flow */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Complete Your Purchase</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  
                  {step === 1 && (
                    <div className="space-y-6">
                      
                      {/* Purchase Summary */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                              <Book className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">Advanced Physics Textbook</h3>
                              <p className="text-sm text-gray-600">3rd Edition • Digital + Print</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">${formData.purchaseAmount}</div>
                            <div className="text-sm text-gray-600">inc. tax</div>
                          </div>
                        </div>

                        {/* Klarna Payment Option - Featured */}
                        <div className="bg-white rounded-lg p-4 border-2 border-pink-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="payment"
                                checked={formData.installmentPlan === 'pay-in-4'}
                                onChange={() => setFormData(prev => ({...prev, installmentPlan: 'pay-in-4'}))}
                                className="w-4 h-4 text-pink-600"
                              />
                              <div>
                                <div className="font-semibold text-gray-800">
                                  Pay in 4 • Interest-free
                                </div>
                                <div className="text-sm text-gray-600">
                                  ${schedule.installmentAmount} today, then 3 payments of ${schedule.installmentAmount}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-pink-600">${schedule.installmentAmount}</div>
                              <div className="text-xs text-gray-500">due today</div>
                            </div>
                          </div>
                          
                          <div className="mt-3 text-xs text-gray-600">
                            <span 
                              className="text-pink-600 underline cursor-pointer"
                              onClick={handleScheduleClick}
                            >
                              View payment schedule
                            </span>
                          </div>
                        </div>

                        {/* Alternative Payment Methods */}
                        <div className="space-y-2 mt-3">
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name="payment"
                                  checked={formData.installmentPlan === 'full-payment'}
                                  onChange={() => setFormData(prev => ({...prev, installmentPlan: 'full-payment'}))}
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">Pay in full today</span>
                              </div>
                              <span className="text-sm font-medium">${formData.purchaseAmount}</span>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name="payment"
                                  checked={formData.installmentPlan === 'financing'}
                                  onChange={() => setFormData(prev => ({...prev, installmentPlan: 'financing'}))}
                                  className="w-4 h-4"
                                />
                                <div>
                                  <div className="text-sm">6-36 month financing</div>
                                  <div className="text-xs text-gray-500">
                                    From ${Math.round(formData.purchaseAmount / 12 * 100) / 100}/mo
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs text-purple-600">See terms</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => setStep(2)}
                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium py-4 rounded-xl text-lg"
                      >
                        Continue with Klarna
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Complete your order</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email address *
                            </label>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                              className="w-full rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone number *
                            </label>
                            <Input
                              type="tel"
                              placeholder="(555) 123-4567"
                              value={formData.phoneNumber}
                              onChange={(e) => setFormData(prev => ({...prev, phoneNumber: e.target.value}))}
                              className="w-full rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Payment Method Selection */}
                      <div>
                        <h4 className="font-medium mb-3">Select payment method for today's payment</h4>
                        <div className="space-y-2">
                          <div className="border rounded-lg p-3">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="debit"
                                checked={formData.paymentMethod === 'debit'}
                                onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                                className="w-4 h-4 text-pink-600"
                              />
                              <CreditCard className="w-5 h-5 text-gray-600" />
                              <span className="text-sm">Debit card</span>
                            </label>
                          </div>
                          <div className="border rounded-lg p-3">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="bank"
                                checked={formData.paymentMethod === 'bank'}
                                onChange={(e) => setFormData(prev => ({...prev, paymentMethod: e.target.value}))}
                                className="w-4 h-4 text-pink-600"
                              />
                              <span className="text-sm">Bank account</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="space-y-3 border-t pt-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="terms"
                            checked={formData.acceptTerms}
                            onCheckedChange={(checked) => setFormData(prev => ({...prev, acceptTerms: checked as boolean}))}
                          />
                          <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                            I agree to Klarna's{' '}
                            <span 
                              className="text-pink-600 underline cursor-pointer"
                              onClick={handleTermsClick}
                            >
                              Terms and Conditions
                            </span>
                            {' '}and authorize automatic payments for future installments.
                          </label>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="marketing"
                            checked={formData.marketingOptIn}
                            onCheckedChange={(checked) => setFormData(prev => ({...prev, marketingOptIn: checked as boolean}))}
                          />
                          <label htmlFor="marketing" className="text-sm text-gray-700">
                            Keep me updated on Klarna offers and shopping tips
                          </label>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="creditCheck"
                            checked={formData.creditCheck}
                            onCheckedChange={(checked) => setFormData(prev => ({...prev, creditCheck: checked as boolean}))}
                          />
                          <label htmlFor="creditCheck" className="text-sm text-gray-700">
                            I authorize Klarna to perform a soft credit check to determine my eligibility
                          </label>
                        </div>
                      </div>

                      <Button
                        onClick={() => onComplete({
                          flow: 'klarna-bnpl',
                          purchaseAmount: formData.purchaseAmount,
                          installmentAmount: schedule.installmentAmount,
                          timeSpentOnTerms,
                          scheduleClicks,
                          lateFeeAwareness: expandedSections.lateFees || false
                        })}
                        disabled={!formData.acceptTerms || !formData.email || !formData.phoneNumber}
                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium py-4 rounded-xl text-lg"
                      >
                        Complete Purchase
                      </Button>

                      <div className="text-center">
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Your first payment of ${schedule.installmentAmount} will be charged today. 
                          Future payments will be automatically charged every 2 weeks.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Benefits & Info */}
            <div className="space-y-4">
              
              {/* Benefits Card */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-pink-600">Why choose Pay in 4?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-pink-500" />
                      <span className="text-sm">0% interest, always</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">No impact on credit score</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Automatic payments</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Schedule Card */}
              {showScheduleDetails && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Payment Schedule</h3>
                    <div className="space-y-3">
                      {schedule.schedule.map((payment, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <div className="text-sm font-medium">
                              Payment {index + 1}
                            </div>
                            <div className="text-xs text-gray-600">
                              {payment.status}
                            </div>
                          </div>
                          <div className="text-sm font-bold">
                            ${payment.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t">
                      <div className="text-xs text-gray-600">
                        <p>
                          <strong>Late fee:</strong> ${schedule.lateFee} per missed payment
                        </p>
                        <p>
                          <strong>Max late fees:</strong> ${schedule.maxLateFees}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security Badge */}
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">Secure & Protected</div>
                  <div className="text-xs text-gray-600">Bank-level encryption</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Modal */}
        <AnimatePresence>
          {showTermsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowTermsModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Klarna Pay in 4 Terms</h3>
                  
                  <div className="space-y-4 text-sm">
                    
                    {/* Payment Terms */}
                    <div>
                      <button
                        onClick={() => toggleSection('payments')}
                        className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">Payment Terms</span>
                        {expandedSections.payments ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedSections.payments && (
                        <div className="mt-2 text-gray-600 space-y-2">
                          <p>Your purchase will be split into 4 equal payments, due every 2 weeks.</p>
                          <p>First payment is due at the time of purchase.</p>
                          <p>Subsequent payments will be automatically charged to your selected payment method.</p>
                        </div>
                      )}
                    </div>

                    {/* Late Fees - Buried Information */}
                    <div>
                      <button
                        onClick={() => toggleSection('lateFees')}
                        className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">Late Payment Policy</span>
                        {expandedSections.lateFees ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedSections.lateFees && (
                        <div className="mt-2 text-gray-600 space-y-2">
                          <p><strong>Late Fee:</strong> ${schedule.lateFee} will be charged for each missed payment.</p>
                          <p><strong>Maximum Fees:</strong> Late fees are capped at ${schedule.maxLateFees} total per purchase.</p>
                          <p><strong>Retries:</strong> We'll retry failed payments for up to 10 days.</p>
                          <p><strong>Collections:</strong> Unpaid amounts may be sent to collections after 30 days.</p>
                        </div>
                      )}
                    </div>

                    {/* Credit Impact */}
                    <div>
                      <button
                        onClick={() => toggleSection('credit')}
                        className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">Credit Information</span>
                        {expandedSections.credit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedSections.credit && (
                        <div className="mt-2 text-gray-600 space-y-2">
                          <p>We may perform a soft credit check for approval - this won't affect your credit score.</p>
                          <p>Payment history may be reported to credit bureaus.</p>
                          <p>Missed payments could negatively impact your credit score.</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-pink-50 p-3 rounded-lg text-xs">
                      <p><strong>Important:</strong> This is a credit product. Make sure you can afford the payments before proceeding.</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setShowTermsModal(false)}
                    className="mt-4 w-full bg-pink-600 hover:bg-pink-700"
                  >
                    I Understand
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Components Integration */}
        <AuthenticFinancialMessaging 
          loanType="BNPL"
          loanAmount={formData.purchaseAmount}
          apr={0} // "0% interest" messaging
          currentStep={`step-${step}`}
        />
        
        <NeuroeconomicBehaviorEngine
          userId="klarna-user"
          currentContext="textbook-purchase"
          stressLevel={0.4} // Moderate stress - textbook needed for school
        />
        
        <DopamineBankingSystem
          userId="klarna-user"
          currentFlow="split-payment"
          completionPercentage={step === 2 ? 80 : 40}
        />
      </div>
    </RealTimeAnalytics>
  );
};

export default KlarnaFlow; 