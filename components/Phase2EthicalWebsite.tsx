"use client";

import React, { useCallback, useEffect, useState } from 'react';

/**
 * Phase 2: Ethical Payday Loan Website
 * 
 * Complete opposite of Phase 1 - demonstrates fully ethical lending practices:
 * - Complete transparency from start
 * - All fees disclosed upfront
 * - No fake urgency or social proof
 * - All add-ons are opt-in only
 * - Alternative options provided
 * - Educational resources included
 * - Consumer protections emphasized
 */

interface EthicalFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  existingDebt: number;
  loanAmount: number;
  loanPurpose: string;
  achConsent: boolean;
  autoPay: boolean;
  emailReminders: boolean;
}

interface EthicalLoanTerms {
  principal: number;
  interestRate: number;
  interestAmount: number;
  totalDue: number;
  apr: number;
  termDays: number;
  monthlyPayment: number;
  paymentSchedule: PaymentSchedule[];
}

interface PaymentSchedule {
  paymentNumber: number;
  dueDate: string;
  amount: number;
  principalPortion: number;
  interestPortion: number;
  remainingBalance: number;
}

interface AlternativeOption {
  name: string;
  description: string;
  contact: string;
  pros: string[];
}

const Phase2EthicalWebsite: React.FC = () => {
  const [currentStep, setCurrentStep] = useState('homepage');
  const [formData, setFormData] = useState<EthicalFormData>({
    firstName: '', lastName: '', email: '', phone: '',
    monthlyIncome: 0, monthlyExpenses: 0, existingDebt: 0,
    loanAmount: 300, loanPurpose: '',
    achConsent: false, autoPay: false, emailReminders: true
  });
  
  const [loanTerms, setLoanTerms] = useState<EthicalLoanTerms | null>(null);
  const [canAffordLoan, setCanAffordLoan] = useState(true);
  // Removed unused showAlternatives state

  const alternatives: AlternativeOption[] = [
    {
      name: "Local Credit Union PAL Loan",
      description: "Payday Alternative Loan with 28% APR maximum",
      contact: "Find local credit unions at NCUA.gov",
      pros: ["Lower APR (28% max)", "Longer repayment terms", "Credit building", "Financial counseling"]
    },
    {
      name: "Employer Advance Program",
      description: "Earned wage access through your employer",
      contact: "Check with HR department",
      pros: ["Usually free or $1-5 fee", "No interest", "No credit check", "Immediate access"]
    },
    {
      name: "Community Assistance Programs",
      description: "Local emergency financial assistance",
      contact: "Call 211 for local referrals",
      pros: ["Often free grants", "No repayment required", "Additional support services", "Local community focus"]
    }
  ];

  const calculateEthicalLoan = (amount: number): EthicalLoanTerms => {
    const maxAPR = 36; // Federal credit union limit
    const termDays = 30; // Longer term than predatory loans
    const interestRate = maxAPR / 100;
    const interestAmount = Math.round(amount * interestRate * (termDays / 365));
    const totalDue = amount + interestAmount;
    const monthlyPayment = totalDue; // Single payment for simplicity
    
    // Generate payment schedule
    const paymentSchedule: PaymentSchedule[] = [{
      paymentNumber: 1,
      dueDate: new Date(Date.now() + termDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0] || '',
      amount: totalDue,
      principalPortion: amount,
      interestPortion: interestAmount,
      remainingBalance: 0
    }];

    return {
      principal: amount,
      interestRate: maxAPR,
      interestAmount,
      totalDue,
      apr: maxAPR,
      termDays,
      monthlyPayment,
      paymentSchedule
    };
  };

  const assessAffordability = useCallback(() => {
    const availableIncome = formData.monthlyIncome - formData.monthlyExpenses - formData.existingDebt;
    const loanPayment = loanTerms?.monthlyPayment || 0;
    const minSafetyBuffer = 300; // Minimum remaining after loan payment
    
    setCanAffordLoan(availableIncome >= loanPayment + minSafetyBuffer);
          // Removed setShowAlternatives call (unused)
  }, [formData.monthlyIncome, formData.monthlyExpenses, formData.existingDebt, loanTerms]);

  const handleInputChange = (field: keyof EthicalFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    const steps = ['homepage', 'calculator', 'application', 'alternatives', 'review', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStepName = steps[currentIndex + 1];
      if (nextStepName) {
        setCurrentStep(nextStepName);
      }
    }
  };

  useEffect(() => {
    setLoanTerms(calculateEthicalLoan(formData.loanAmount));
  }, [formData.loanAmount]);

  useEffect(() => {
    if (formData.monthlyIncome > 0) {
      assessAffordability();
    }
  }, [formData.monthlyIncome, formData.monthlyExpenses, formData.existingDebt, assessAffordability]);

  const renderHomepage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      {/* Professional, transparent header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b-2 border-blue-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🏛️</div>
              <div>
                <div className="text-xl font-bold text-blue-700">Ethical Emergency Lending</div>
                <div className="text-sm text-gray-600">Community Financial Services • Licensed TX #ETH-2024</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-green-600">36% APR Maximum</div>
              <div className="text-xs text-gray-500">CFPB Compliant • Consumer First</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternatives-first banner */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 border-b-2 border-green-300">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-800 mb-2">
              💡 Before You Borrow: Free & Lower-Cost Alternatives Available
            </div>
            <div className="text-sm text-green-700">
              ✅ Credit Union PALs (28% APR) ✅ Employer Advances (Usually Free) ✅ Community Programs
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Honest, transparent hero section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Emergency Short-Term Loans
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
            Full Cost Transparency • Consumer Protection • Alternatives First
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-yellow-800 mb-4">
                ⚠️ Important: We Recommend Trying These Options First
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
                  <div className="font-bold text-green-700 text-lg">Credit Union PALs</div>
                  <div className="text-gray-600 text-sm mb-2">28% APR maximum by federal law</div>
                  <div className="text-xs text-green-600">
                    <a href="https://ncua.gov" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                      Find credit unions at NCUA.gov →
                    </a>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
                  <div className="font-bold text-blue-700 text-lg">Employer Advances</div>
                  <div className="text-gray-600 text-sm mb-2">Usually free or $1-5 fee only</div>
                  <div className="text-xs text-blue-600">
                    <span className="font-medium">Check with your HR department</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500 shadow-sm">
                  <div className="font-bold text-purple-700 text-lg">Community Aid</div>
                  <div className="text-gray-600 text-sm mb-2">Often free grants, no repayment</div>
                  <div className="text-xs text-purple-600">
                    <span className="font-medium">Call 211 for local emergency assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Complete transparency calculator */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8 border-2 border-blue-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                📊 Complete Cost Calculator
              </h3>
              <div className="text-lg text-blue-600 font-semibold bg-blue-100 inline-block px-6 py-2 rounded-full border-2 border-blue-300">
                All Fees Disclosed Upfront • No Surprises
              </div>
              <div className="text-sm text-gray-600 mt-3">
                We believe you deserve to know exactly what you&apos;ll pay before you apply
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Loan amount selector with guidance */}
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <label className="block text-xl font-bold text-gray-700 mb-4">
                  💰 Loan Amount (We recommend borrowing only what you absolutely need)
                </label>
                <div className="mb-6">
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="25"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', parseInt(e.target.value))}
                    className="w-full h-4 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    style={{ background: 'linear-gradient(to right, #dbeafe, #3b82f6)' }}
                  />
                  <div className="flex justify-between text-sm font-medium text-gray-600 mt-3">
                    <span className="bg-white px-3 py-1 rounded shadow">$100 minimum</span>
                    <span className="text-3xl font-bold text-blue-600 bg-white px-6 py-2 rounded-xl shadow-lg border-2 border-blue-300">
                      ${formData.loanAmount}
                    </span>
                    <span className="bg-white px-3 py-1 rounded shadow">$1,000 maximum</span>
                  </div>
                </div>
              </div>

              {/* Complete upfront cost breakdown */}
              {loanTerms && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 p-8 rounded-xl shadow-lg">
                  <h4 className="font-bold text-green-800 text-2xl mb-6 text-center">
                    💰 Complete Cost Breakdown - Every Fee Included
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="bg-white p-6 rounded-lg border-2 border-green-200 shadow-md">
                      <h5 className="font-bold text-gray-800 text-lg mb-4 text-center border-b pb-2">What You Receive</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Loan Amount:</span>
                          <span className="font-bold text-2xl text-green-600">${loanTerms.principal}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Loan Term:</span>
                          <span className="font-semibold text-gray-800">{loanTerms.termDays} days</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Due Date:</span>
                          <span className="font-semibold text-gray-800">{loanTerms.paymentSchedule[0]?.dueDate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Payment Method:</span>
                          <span className="font-semibold text-gray-800">Your choice</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-blue-200 shadow-md">
                      <h5 className="font-bold text-gray-800 text-lg mb-4 text-center border-b pb-2">What You Pay</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Principal Amount:</span>
                          <span className="font-semibold text-gray-800">${loanTerms.principal}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Interest Cost:</span>
                          <span className="font-semibold text-orange-600">${loanTerms.interestAmount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Other Fees:</span>
                          <span className="font-semibold text-green-600">$0</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-xl border-t pt-3">
                          <span className="text-gray-800">Total Due:</span>
                          <span className="text-blue-600">${loanTerms.totalDue}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clear APR display */}
                  <div className="bg-white p-6 rounded-lg text-center mb-6 border-2 border-blue-300 shadow-md">
                    <div className="text-3xl font-bold text-blue-800 mb-3">
                      Annual Percentage Rate (APR): {loanTerms.apr}%
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      This is the true annual cost of borrowing • No hidden rates • No surprise fees
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 p-3 rounded">
                      APR includes all costs and is the best way to compare lending options
                    </div>
                  </div>

                  {/* Honest comparison context */}
                  <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
                    <h5 className="font-bold text-yellow-800 mb-4 text-lg text-center">
                      📈 How This Compares to Other Borrowing Options
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center bg-white p-4 rounded-lg border-2 border-green-400">
                        <div className="font-bold text-green-700 text-lg">Credit Union PAL</div>
                        <div className="text-green-600 text-2xl font-bold">28% APR</div>
                        <div className="text-xs text-green-500 mt-1">Best option if available</div>
                      </div>
                      <div className="text-center bg-white p-4 rounded-lg border-2 border-blue-400">
                        <div className="font-bold text-blue-700 text-lg">This Ethical Loan</div>
                        <div className="text-blue-600 text-2xl font-bold">{loanTerms.apr}% APR</div>
                        <div className="text-xs text-blue-500 mt-1">If you must borrow</div>
                      </div>
                      <div className="text-center bg-white p-4 rounded-lg border-2 border-red-400">
                        <div className="font-bold text-red-700 text-lg">Typical Payday Loan</div>
                        <div className="text-red-600 text-2xl font-bold">391-664% APR</div>
                        <div className="text-xs text-red-500 mt-1">Avoid if possible</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Consumer protection features */}
              <div className="bg-green-50 border-2 border-green-200 p-6 rounded-xl">
                <h4 className="font-bold text-green-800 text-xl mb-4 text-center">
                  ✅ Your Consumer Protections
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-green-600">•</div>
                      <span className="text-sm">All costs shown upfront before you apply</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-green-600">•</div>
                      <span className="text-sm">24-hour right to cancel without penalty</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-green-600">•</div>
                      <span className="text-sm">No rollover fees or debt traps allowed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-green-600">•</div>
                      <span className="text-sm">No prepayment penalty - save by paying early</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-green-600">•</div>
                      <span className="text-sm">Affordability assessment required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-green-600">•</div>
                      <span className="text-sm">We don&apos;t sell your data to third parties</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-green-600">•</div>
                      <span className="text-sm">Fair collection practices - no harassment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-green-600">•</div>
                      <span className="text-sm">Free financial counseling resources</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* No-pressure CTA */}
            <button
              onClick={nextStep}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-lg text-xl transition-colors shadow-lg border-2 border-blue-300"
            >
              Check If This Loan Is Right For You
            </button>
            
            <div className="text-center mt-6 space-y-3">
              <div className="text-blue-600 font-semibold text-lg">
                ✅ No obligation • Soft credit check only • No impact on credit score
              </div>
              <div className="text-sm text-gray-600">
                We&apos;ll assess if this loan is financially safe for your situation before proceeding
              </div>
              <div className="text-xs text-gray-500 bg-gray-100 p-3 rounded">
                Take your time to decide • This rate will remain available • No pressure tactics
              </div>
            </div>
          </div>

          {/* Comprehensive Education & Alternatives */}
          <div className="space-y-6">
            {/* Strong Alternative Focus */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4">🌟 Better Alternatives (Try These First!)</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                  <div className="font-bold text-green-700">Credit Union PALs</div>
                  <div className="text-sm text-gray-600">28% APR maximum by federal law</div>
                  <div className="text-xs text-green-600 mt-1">
                    <a href="https://ncua.gov" target="_blank" rel="noopener noreferrer" className="underline">
                      Find credit unions at NCUA.gov →
                    </a>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded">
                  <div className="font-bold text-blue-700">Employer Advances</div>
                  <div className="text-sm text-gray-600">Usually free or $1-5 fee</div>
                  <div className="text-xs text-blue-600 mt-1">Check with your HR department</div>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-3 rounded">
                  <div className="font-bold text-purple-700">Community Programs</div>
                  <div className="text-sm text-gray-600">Often free grants, no repayment</div>
                  <div className="text-xs text-purple-600 mt-1">
                    Call 211 for local emergency assistance
                  </div>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 p-3 rounded">
                  <div className="font-bold text-orange-700">Friends & Family</div>
                  <div className="text-sm text-gray-600">Personal loan from someone you trust</div>
                  <div className="text-xs text-orange-600 mt-1">Often the most affordable option</div>
                </div>
              </div>
            </div>

            {/* Consumer Protection Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">🛡️ Your Consumer Rights</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-bold text-blue-700">24-Hour Cancellation Right</div>
                  <div className="text-gray-600">Cancel without penalty by 5 PM next business day</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-bold text-green-700">No Prepayment Penalty</div>
                  <div className="text-gray-600">Pay early and save on interest - no extra fees</div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="font-bold text-purple-700">Fair Collection Practices</div>
                  <div className="text-gray-600">We follow all FDCPA guidelines - no harassment</div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="font-bold text-orange-700">Privacy Protection</div>
                  <div className="text-gray-600">We never sell your data to third parties</div>
                </div>
              </div>
            </div>

            {/* Financial Education */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-purple-800 mb-4">📚 Financial Education</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">Building Emergency Savings</div>
                  <div className="text-gray-600">Even $25/month can prevent future emergencies</div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">Understanding APR</div>
                  <div className="text-gray-600">The real cost of borrowing money annually</div>
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">Budgeting Basics</div>
                  <div className="text-gray-600">Track income and expenses to avoid future loans</div>
                </div>
                <div className="mt-4">
                  <a href="#" className="text-blue-600 underline text-sm">
                    Access Free Financial Counseling →
                  </a>
                </div>
              </div>
            </div>

            {/* Regulatory Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🏛️ Regulatory Compliance</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• Licensed by Texas Department of Banking</div>
                <div>• CFPB registered and compliant</div>
                <div>• FDCPA fair collection practices</div>
                <div>• State usury law compliant (36% APR max)</div>
                <div>• Member of Community Financial Services Association</div>
                <div className="mt-3 pt-3 border-t">
                  <div className="font-semibold text-gray-700">File Complaints:</div>
                  <div>• CFPB: consumerfinance.gov</div>
                  <div>• Texas DOB: dob.texas.gov</div>
                  <div>• Better Business Bureau</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* No Pressure, Educational Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Our Commitment to You</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-bold text-gray-800">Transparent Pricing</div>
                <div className="text-gray-600">All costs disclosed before you apply • No hidden fees ever</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🛡️</div>
                <div className="font-bold text-gray-800">Consumer Protection</div>
                <div className="text-gray-600">We only approve loans you can afford • No debt traps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🤝</div>
                <div className="font-bold text-gray-800">Community Focus</div>
                <div className="text-gray-600">Mission-driven • Helping build financial wellness</div>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              This ethical lending platform is designed to demonstrate responsible lending practices. 
              We believe financial services should empower consumers, not exploit them.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalculator = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Loan Affordability Assessment
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Monthly Income (after taxes)
                </label>
                <input
                  type="number"
                  value={formData.monthlyIncome || ''}
                  onChange={(e) => handleInputChange('monthlyIncome', parseInt(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                  placeholder="$2,500"
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Monthly Expenses (rent, utilities, food, etc.)
                </label>
                <input
                  type="number"
                  value={formData.monthlyExpenses || ''}
                  onChange={(e) => handleInputChange('monthlyExpenses', parseInt(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                  placeholder="$2,000"
                />
              </div>
              
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Existing Debt Payments
                </label>
                <input
                  type="number"
                  value={formData.existingDebt || ''}
                  onChange={(e) => handleInputChange('existingDebt', parseInt(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                  placeholder="$300"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Affordability Analysis */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Affordability Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monthly Income:</span>
                    <span className="font-semibold">${formData.monthlyIncome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Expenses:</span>
                    <span className="font-semibold">${formData.monthlyExpenses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Debt Payments:</span>
                    <span className="font-semibold">${formData.existingDebt}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Available Income:</span>
                    <span className={`${(formData.monthlyIncome - formData.monthlyExpenses - formData.existingDebt) > 500 ? 'text-green-600' : 'text-red-600'}`}>
                      ${formData.monthlyIncome - formData.monthlyExpenses - formData.existingDebt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Loan Impact */}
              {loanTerms && (
                <div className={`p-6 rounded-lg border-2 ${canAffordLoan ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <h3 className="text-xl font-bold mb-4">
                    {canAffordLoan ? '✅ Loan Assessment' : '❌ Affordability Concern'}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Loan Payment:</span>
                      <span className="font-semibold">${loanTerms.monthlyPayment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining After Payment:</span>
                      <span className={`font-bold ${canAffordLoan ? 'text-green-600' : 'text-red-600'}`}>
                        ${formData.monthlyIncome - formData.monthlyExpenses - formData.existingDebt - loanTerms.monthlyPayment}
                      </span>
                    </div>
                  </div>
                  
                  {!canAffordLoan && (
                    <div className="mt-4 p-4 bg-red-100 rounded-lg">
                      <div className="text-red-800 font-bold">⚠️ We cannot responsibly approve this loan</div>
                      <div className="text-red-700 text-sm mt-1">
                        Based on your financial situation, this loan would leave you with insufficient funds for emergencies.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            {canAffordLoan ? (
              <button
                onClick={nextStep}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
              >
                Continue Application
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep('alternatives')}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
              >
                See Alternatives
              </button>
            )}
            <button
              onClick={() => setCurrentStep('homepage')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplication = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Ethical Loan Application</h2>
          
          {/* Clear expectations */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-blue-800 mb-2">What to Expect:</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• We collect minimal information - only what's needed</div>
              <div>• Soft credit check only (no impact on your credit score)</div>
              <div>• We'll verify you can afford this loan before approval</div>
              <div>• You have 24 hours to cancel after approval</div>
              <div>• No pressure - take your time to complete</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
                <div className="text-xs text-gray-500 mt-1">
                  We'll send loan documents and payment reminders here
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Only for loan-related communication
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">What is this loan for? *</label>
              <select
                value={formData.loanPurpose}
                onChange={(e) => handleInputChange('loanPurpose', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Please select a purpose</option>
                <option value="emergency_expense">Emergency expense (medical, car repair, etc.)</option>
                <option value="utility_bill">Utility bill or rent</option>
                <option value="unexpected_expense">Unexpected expense</option>
                <option value="bridge_gap">Bridge income gap</option>
                <option value="other">Other essential expense</option>
              </select>
              <div className="text-xs text-gray-500 mt-1">
                This helps us ensure the loan serves a legitimate need
              </div>
            </div>

            {/* Privacy Protection Notice */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h3 className="font-bold text-green-800 mb-2">🔒 Your Privacy is Protected</h3>
              <div className="text-sm text-green-700 space-y-1">
                <div>• We never sell your personal information to third parties</div>
                <div>• Your data is encrypted and stored securely</div>
                <div>• We only share information as required by law</div>
                <div>• You can request data deletion at any time</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={nextStep}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
            >
              Continue to Affordability Check
            </button>
            <button
              onClick={() => setCurrentStep('calculator')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="text-center mt-4 text-sm text-gray-600">
            Your information is secure and will not impact your credit score
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlternatives = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Better Alternatives to Consider
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alternatives.map((alt, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{alt.name}</h3>
                <p className="text-gray-600 mb-4">{alt.description}</p>
                <div className="text-sm text-blue-600 font-semibold mb-4">{alt.contact}</div>
                <div className="space-y-2">
                  <div className="font-semibold text-gray-700">Benefits:</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {alt.pros.map((pro, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-green-500 text-xs">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-yellow-800 mb-2">Why We Recommend Alternatives</h3>
              <p className="text-yellow-700">
                These options might work better than any loan - and they&apos;re often free or much cheaper.
              </p>
            </div>
            
            {canAffordLoan && (
              <button
                onClick={() => setCurrentStep('application')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors mr-4"
              >
                Still Want to Apply
              </button>
            )}
            
            <button
              onClick={() => setCurrentStep('homepage')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Back to Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Review Your Ethical Loan Agreement
          </h2>

          {/* Complete transparency section */}
          <div className="bg-blue-50 border-2 border-blue-300 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
              📋 Complete Loan Terms - No Hidden Costs
            </h3>
            
            {loanTerms && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">Loan Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span className="font-bold text-green-600">${loanTerms.principal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Term Length:</span>
                      <span className="font-semibold">{loanTerms.termDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span className="font-semibold">{loanTerms.paymentSchedule[0]?.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate:</span>
                      <span className="font-semibold">{loanTerms.interestRate}% APR</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">Payment Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Interest Cost:</span>
                      <span className="font-semibold">${loanTerms.interestAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Origination Fee:</span>
                      <span className="font-semibold text-green-600">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee:</span>
                      <span className="font-semibold text-green-600">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Fees:</span>
                      <span className="font-semibold text-green-600">$0</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total Due:</span>
                      <span className="text-blue-600">${loanTerms.totalDue}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 text-center">
              <div className="text-lg font-bold text-blue-800">
                True APR: {loanTerms?.apr}% (All costs included)
              </div>
              <div className="text-sm text-gray-600">
                This is significantly lower than typical payday loans (391-664% APR)
              </div>
            </div>
          </div>

          {/* Optional services - truly opt-in */}
          <div className="bg-gray-50 border border-gray-300 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Optional Services (All Optional)</h3>
            
            <div className="space-y-4">
              <label className="flex items-start space-x-3 p-4 bg-white rounded-lg border hover:border-blue-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.autoPay}
                  onChange={(e) => handleInputChange('autoPay', e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Automatic Payment (Optional)</div>
                  <div className="text-sm text-gray-600">
                    Automatically deduct payment on due date. You can cancel this anytime before the due date.
                  </div>
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    ✓ No additional fees • ✓ Can be disabled anytime • ✓ Helps avoid late fees
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-4 bg-white rounded-lg border hover:border-blue-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emailReminders}
                  onChange={(e) => handleInputChange('emailReminders', e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Payment Reminder Emails (Recommended)</div>
                  <div className="text-sm text-gray-600">
                    Receive friendly email reminders 3 days and 1 day before your payment is due.
                  </div>
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    ✓ Completely free • ✓ Helps you stay on track • ✓ Unsubscribe anytime
                  </div>
                </div>
              </label>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              All services above are completely optional and free. We make money from interest, not hidden fees.
            </div>
          </div>

          {/* Consumer rights emphasis */}
          <div className="bg-green-50 border border-green-300 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">🛡️ Your Consumer Rights</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-green-700">Right to Cancel</div>
                <div className="text-gray-700">Cancel within 24 hours for full refund</div>
              </div>
              <div>
                <div className="font-semibold text-green-700">Right to Pay Early</div>
                <div className="text-gray-700">No prepayment penalty - save on interest</div>
              </div>
              <div>
                <div className="font-semibold text-green-700">Fair Collections</div>
                <div className="text-gray-700">No harassment - FDCPA compliant</div>
              </div>
              <div>
                <div className="font-semibold text-green-700">Data Privacy</div>
                <div className="text-gray-700">We never sell your information</div>
              </div>
            </div>
          </div>

          {/* Required authorizations - clearly explained */}
          <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">Required Authorizations</h3>
            
            <label className="flex items-start space-x-3 p-4 bg-white rounded-lg border">
              <input
                type="checkbox"
                checked={formData.achConsent}
                onChange={(e) => handleInputChange('achConsent', e.target.checked)}
                className="mt-1 h-5 w-5 text-blue-600"
                required
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">Electronic Payment Authorization (Required)</div>
                <div className="text-sm text-gray-600 mt-1">
                  I authorize one electronic payment attempt on my due date. If payment fails, 
                  I understand there will be a $25 returned payment fee and no additional automatic attempts.
                </div>
                <div className="text-xs text-blue-600 mt-2 font-semibold">
                  ✓ Only one attempt • ✓ Clear fee structure • ✓ No multiple withdrawal traps
                </div>
              </div>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={nextStep}
              disabled={!formData.achConsent}
              className={`flex-1 font-bold py-3 px-6 rounded-lg text-lg transition-colors ${
                formData.achConsent 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {formData.achConsent ? 'Complete Ethical Loan' : 'Please Review Required Authorization'}
            </button>
            <button
              onClick={() => setCurrentStep('alternatives')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </div>

          <div className="text-center mt-4 text-sm text-gray-600">
            We believe you have the right to understand exactly what you&apos;re signing up for.
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Your Ethical Loan is Approved!
            </h2>
            <div className="text-xl text-gray-600">
              Funds will be deposited within 1-2 business days
            </div>
          </div>

          {/* Clear loan summary */}
          {loanTerms && (
            <div className="bg-green-50 border border-green-300 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 text-center">Loan Summary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-bold">${loanTerms.principal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Cost:</span>
                    <span className="font-bold">${loanTerms.interestAmount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total Due:</span>
                    <span>${loanTerms.totalDue}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>APR:</span>
                    <span className="font-bold">{loanTerms.apr}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <span className="font-bold">{loanTerms.paymentSchedule[0]?.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-bold">{formData.autoPay ? 'Automatic' : 'Manual'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Important reminders */}
          <div className="bg-blue-50 border border-blue-300 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Important Reminders</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="text-blue-600 text-lg">📧</div>
                <div>
                  <div className="font-semibold">Email Confirmation Sent</div>
                  <div className="text-gray-600">Complete loan documents sent to {formData.email}</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-green-600 text-lg">⏰</div>
                <div>
                  <div className="font-semibold">24-Hour Cancellation Period</div>
                  <div className="text-gray-600">You can cancel this loan until 5 PM tomorrow with no penalty</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-purple-600 text-lg">💰</div>
                <div>
                  <div className="font-semibold">Early Payment Welcome</div>
                  <div className="text-gray-600">Pay early and save on interest - no prepayment penalty</div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational resources */}
          <div className="bg-purple-50 border border-purple-300 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-purple-800 mb-4">📚 Financial Wellness Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-purple-700">Building Emergency Savings</div>
                <div className="text-gray-600">Start with just $5-10/week to prevent future emergencies</div>
              </div>
              <div>
                <div className="font-semibold text-purple-700">Free Financial Counseling</div>
                <div className="text-gray-600">Connect with certified counselors at no cost</div>
              </div>
              <div>
                <div className="font-semibold text-purple-700">Budgeting Tools</div>
                <div className="text-gray-600">Free apps and resources to track spending</div>
              </div>
              <div>
                <div className="font-semibold text-purple-700">Alternative Resources</div>
                <div className="text-gray-600">Credit unions, community programs, and assistance</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a href="#" className="text-purple-600 underline">
                Access Free Financial Education Resources →
              </a>
            </div>
          </div>

          {/* Support information */}
          <div className="bg-gray-50 border border-gray-300 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-gray-700">Customer Support</div>
                <div className="text-gray-600">Call 1-800-ETHICAL (1-800-384-4225)</div>
                <div className="text-gray-600">Monday-Friday 8AM-6PM CT</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Payment Questions</div>
                <div className="text-gray-600">Email: payments@ethicallending.org</div>
                <div className="text-gray-600">Response within 24 hours</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentStep('homepage')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  switch (currentStep) {
    case 'homepage': return renderHomepage();
    case 'calculator': return renderCalculator();
    case 'application': return renderApplication();
    case 'alternatives': return renderAlternatives();
    case 'review': return renderReview();
    case 'confirmation': return renderConfirmation();
    default: return renderHomepage();
  }
};

export default Phase2EthicalWebsite; 