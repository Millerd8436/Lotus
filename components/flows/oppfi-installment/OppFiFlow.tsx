import React, { useState, useEffect } from 'react';
import { useBehaviorTracking } from '@/components/providers/BehaviorTrackingProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { RealTimeAnalytics } from '@/components/shared/RealTimeAnalytics';
import { Shield, TrendingUp, Calendar, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OppFiFlowProps {
  onComplete: (data: any) => void;
  scenarioPrompt: string;
}

const OppFiFlow: React.FC<OppFiFlowProps> = ({ onComplete, scenarioPrompt }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanAmount: 3000,
    monthlyIncome: '',
    loanTerm: 18, // 18 months default
    email: '',
    acceptTerms: false
  });
  const [showTotalCost, setShowTotalCost] = useState(false);
  
  const { trackInteraction } = useBehaviorTracking();

  // Authentic OppFi pricing (160-179% APR range)
  const calculateLoanTerms = (amount: number, term: number) => {
    const apr = 160; // Base APR from research
    const monthlyRate = apr / 100 / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                          (Math.pow(1 + monthlyRate, term) - 1);
    const totalRepayment = monthlyPayment * term;
    const totalInterest = totalRepayment - amount;
    
    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalRepayment: Math.round(totalRepayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      apr
    };
  };

  const loanTerms = calculateLoanTerms(formData.loanAmount, formData.loanTerm);

  return (
    <RealTimeAnalytics pageContext="oppfi-installment-loan">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        
        {/* OppFi Header */}
        <div className="max-w-4xl mx-auto mb-6">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-blue-600">OppFi</div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-600">Trusted Lender</span>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">$500 - $5,000</div>
                  <div className="text-gray-600">9-18 Month Terms</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scenario Prompt */}
        <div className="max-w-4xl mx-auto mb-6">
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">{scenarioPrompt}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Application */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle>Get Your Installment Loan</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                          Affordable Monthly Payments
                        </h2>
                        <p className="text-gray-600">As low as ${loanTerms.monthlyPayment}/month</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loan Amount
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="500"
                            max="5000"
                            step="100"
                            value={formData.loanAmount}
                            onChange={(e) => setFormData(prev => ({...prev, loanAmount: parseInt(e.target.value)}))}
                            className="w-full h-2 bg-blue-200 rounded-lg"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>$500</span>
                            <span className="font-bold text-blue-600">${formData.loanAmount}</span>
                            <span>$5,000</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loan Term
                        </label>
                        <select
                          value={formData.loanTerm}
                          onChange={(e) => setFormData(prev => ({...prev, loanTerm: parseInt(e.target.value)}))}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                          <option value={9}>9 months</option>
                          <option value={12}>12 months</option>
                          <option value={18}>18 months (Most Popular)</option>
                        </select>
                      </div>

                      {/* Monthly Payment Emphasis */}
                      <div className="bg-blue-50 rounded-lg p-6 text-center">
                        <div className="text-sm text-gray-600 mb-2">Your Monthly Payment</div>
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          ${loanTerms.monthlyPayment}
                        </div>
                        <div className="text-sm text-gray-600">
                          Fixed payment • Auto-pay available
                        </div>
                        
                        {/* Hidden Total Cost */}
                        <div className="mt-4 pt-4 border-t border-blue-200">
                          <button
                            onClick={() => setShowTotalCost(!showTotalCost)}
                            className="text-xs text-blue-600 underline"
                          >
                            {showTotalCost ? 'Hide' : 'Show'} total cost details
                          </button>
                          
                          {showTotalCost && (
                            <div className="mt-3 text-xs text-gray-600 space-y-1">
                              <div className="flex justify-between">
                                <span>Loan Amount:</span>
                                <span>${formData.loanAmount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Interest:</span>
                                <span>${loanTerms.totalInterest}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>Total Repayment:</span>
                                <span>${loanTerms.totalRepayment}</span>
                              </div>
                              <div className="flex justify-between text-red-600">
                                <span>APR:</span>
                                <span>{loanTerms.apr}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        onClick={() => setStep(2)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg"
                      >
                        Check My Rate
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-2">
                          Great News! You Pre-Qualify
                        </h2>
                        <p className="text-gray-600">Complete your application below</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Monthly Income *
                          </label>
                          <Input
                            type="text"
                            placeholder="$3,000"
                            value={formData.monthlyIncome}
                            onChange={(e) => setFormData(prev => ({...prev, monthlyIncome: e.target.value}))}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                          />
                        </div>

                        {/* Loan Summary */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold mb-3">Your Loan Summary</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Loan Amount:</span>
                              <span className="font-bold">${formData.loanAmount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly Payment:</span>
                              <span className="font-bold text-blue-600">${loanTerms.monthlyPayment}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Loan Term:</span>
                              <span>{formData.loanTerm} months</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Representative APR:</span>
                              <span>{loanTerms.apr}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={formData.acceptTerms}
                            onChange={(e) => setFormData(prev => ({...prev, acceptTerms: e.target.checked}))}
                            className="mt-1"
                          />
                          <label htmlFor="terms" className="text-sm text-gray-700">
                            I agree to the terms and conditions and authorize OppFi to verify my information
                          </label>
                        </div>

                        <Button
                          onClick={() => onComplete({
                            flow: 'oppfi-installment',
                            loanAmount: formData.loanAmount,
                            monthlyPayment: loanTerms.monthlyPayment,
                            totalCost: loanTerms.totalRepayment,
                            apr: loanTerms.apr,
                            totalCostViewed: showTotalCost
                          })}
                          disabled={!formData.acceptTerms || !formData.monthlyIncome || !formData.email}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg"
                        >
                          Complete Application
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Why Choose OppFi?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Same day funding</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Build credit history</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Flexible terms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </RealTimeAnalytics>
  );
};

export default OppFiFlow; 