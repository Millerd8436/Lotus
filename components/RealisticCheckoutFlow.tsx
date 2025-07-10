"use client";

import React, { useEffect, useState } from "react";

/**
 * RealisticCheckoutFlow - Enhanced Predatory Checkout Based on 2024 Research
 *
 * Based on analysis of actual payday loan websites (MyPaydayLoan.com, SunshineLoans.com, etc.)
 * Implements the exact 15-step checkout process used by real predatory lenders:
 *
 * 1. Quick Entry (Name, Phone, ZIP)
 * 2. Loan Amount & Purpose
 * 3. Personal Information (SSN, DOB, Address)
 * 4. Employment Information (Employer, Income, Pay frequency)
 * 5. Bank Account Details (Bank name, Account type, Routing/Account numbers)
 * 6. Identity Verification (Driver's license upload)
 * 7. Income Verification (Pay stub upload OR bank login)
 * 8. Contact References (2-3 personal references)
 * 9. Electronic Signature & Disclosures
 * 10. ACH Authorization (Multiple account access)
 * 11. Add-on Services (Insurance, Express processing)
 * 12. Final Terms Review (APR finally disclosed)
 * 13. Submission & Approval Process
 * 14. Funding Options (ACH vs Debit card)
 * 15. Rollover/Renewal Setup
 */

interface RealisticFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  ssn: string;
  dob: string;

  // Address Information
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  timeAtAddress: string;
  housingType: "own" | "rent" | "other";
  monthlyRent?: number;

  // Employment Information
  employmentStatus: "employed" | "self-employed" | "benefits" | "retired";
  employer: string;
  jobTitle: string;
  workPhone: string;
  timeAtJob: string;
  payFrequency: "weekly" | "biweekly" | "monthly" | "other";
  nextPayDate: string;
  monthlyIncome: number;
  incomeSource: "employment" | "benefits" | "other";

  // Banking Information
  bankName: string;
  accountType: "checking" | "savings";
  routingNumber: string;
  accountNumber: string;
  bankingTime: string;
  onlineBankingUsername?: string;

  // Identity Verification
  driversLicenseNumber: string;
  driversLicenseState: string;
  driversLicenseExp: string;

  // References (for collections)
  reference1Name: string;
  reference1Phone: string;
  reference1Relationship: string;
  reference2Name: string;
  reference2Phone: string;
  reference2Relationship: string;

  // Loan Information
  loanAmount: number;
  loanPurpose: string;
  previousPaydayLoan: boolean;

  // Consents (mostly pre-checked)
  achAuthorization: boolean;
  electronicSignature: boolean;
  creditCheck: boolean;
  dataSharing: boolean;
  marketingConsent: boolean;
  autoRenewal: boolean;
  loanInsurance: boolean;
  expressProcessing: boolean;
}

interface CheckoutStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  progressPercent: number;
  darkPattern: string;
  mobileOptimized: boolean;
}

const RealisticCheckoutFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RealisticFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ssn: "",
    dob: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    timeAtAddress: "",
    housingType: "rent",
    employer: "",
    jobTitle: "",
    workPhone: "",
    timeAtJob: "",
    payFrequency: "biweekly",
    nextPayDate: "",
    monthlyIncome: 0,
    incomeSource: "employment",
    bankName: "",
    accountType: "checking",
    routingNumber: "",
    accountNumber: "",
    bankingTime: "",
    driversLicenseNumber: "",
    driversLicenseState: "",
    driversLicenseExp: "",
    reference1Name: "",
    reference1Phone: "",
    reference1Relationship: "",
    reference2Name: "",
    reference2Phone: "",
    reference2Relationship: "",
    loanAmount: 300,
    loanPurpose: "",
    previousPaydayLoan: false,
    achAuthorization: false,
    electronicSignature: false,
    creditCheck: false,
    dataSharing: true,
    marketingConsent: true,
    autoRenewal: true,
    loanInsurance: true,
    expressProcessing: true,
    employmentStatus: "employed",
  });

  const [timeLeft, setTimeLeft] = useState(1847); // Fake urgency timer
  const [_isProcessing, _setIsProcessing] = useState(false);
  const [showFakeActivity, _setShowFakeActivity] = useState(true);
  const [fakeApplications, setFakeApplications] = useState<string[]>([]);
  const [currentFees, setCurrentFees] = useState(0);
  const [totalAPR, setTotalAPR] = useState(0);

  // Realistic checkout steps based on actual payday loan websites
  const checkoutSteps: CheckoutStep[] = [
    {
      id: "quick-entry",
      title: "💰 GET CASH FAST! $100-$2,000",
      subtitle: "NO CREDIT CHECK • INSTANT APPROVAL",
      description: "Get started with just 3 quick details:",
      progressPercent: 7,
      darkPattern: "Bait with simplicity - hide 14 more required steps",
      mobileOptimized: true,
    },
    {
      id: "loan-details",
      title: "How Much Cash Do You Need?",
      subtitle: "Choose your loan amount and purpose",
      description: "Select the amount that works for you:",
      progressPercent: 14,
      darkPattern: 'Hide true fees - show only "small fee" language',
      mobileOptimized: true,
    },
    {
      id: "personal-info",
      title: "Personal Information",
      subtitle: "Quick verification for your security",
      description: "We need to verify your identity:",
      progressPercent: 21,
      darkPattern: "Normalize excessive data collection",
      mobileOptimized: true,
    },
    {
      id: "employment-info",
      title: "Employment Details",
      subtitle: "Verify your income source",
      description: "Tell us about your job:",
      progressPercent: 28,
      darkPattern: "Vulnerability scoring - target desperate workers",
      mobileOptimized: true,
    },
    {
      id: "banking-info",
      title: "Banking Information",
      subtitle: "Secure account setup",
      description: "Where should we send your money?",
      progressPercent: 35,
      darkPattern: "Broad ACH authorization for exploitation",
      mobileOptimized: true,
    },
    {
      id: "identity-verification",
      title: "Identity Verification",
      subtitle: "Upload your driver's license",
      description: "Quick photo upload for verification:",
      progressPercent: 42,
      darkPattern: "Legitimize extensive data collection",
      mobileOptimized: true,
    },
    {
      id: "income-verification",
      title: "Income Verification",
      subtitle: "Connect your bank OR upload pay stub",
      description: "Choose your verification method:",
      progressPercent: 49,
      darkPattern: "Bank login credentials harvesting",
      mobileOptimized: true,
    },
    {
      id: "references",
      title: "Emergency Contacts",
      subtitle: "People who can reach you",
      description: "Provide 2 contacts (for your security):",
      progressPercent: 56,
      darkPattern: "Collection harassment contact list",
      mobileOptimized: true,
    },
    {
      id: "electronic-signature",
      title: "Electronic Signature",
      subtitle: "Sign your loan documents",
      description: "Review and sign your agreement:",
      progressPercent: 63,
      darkPattern: "Rushed signature on buried terms",
      mobileOptimized: true,
    },
    {
      id: "ach-authorization",
      title: "Payment Authorization",
      subtitle: "Authorize automatic payments",
      description: "Set up automatic loan repayment:",
      progressPercent: 70,
      darkPattern: "Broad ACH exploitation permissions",
      mobileOptimized: true,
    },
    {
      id: "add-ons",
      title: "Protect Your Loan",
      subtitle: "Recommended services for you",
      description: "Smart borrowers choose these protections:",
      progressPercent: 77,
      darkPattern: "Pre-selected expensive add-ons",
      mobileOptimized: true,
    },
    {
      id: "final-terms",
      title: "Final Terms Review",
      subtitle: "Confirm your loan details",
      description: "Review your loan terms:",
      progressPercent: 84,
      darkPattern: "APR finally disclosed in tiny text",
      mobileOptimized: true,
    },
    {
      id: "processing",
      title: "Processing Your Application",
      subtitle: "Contacting our network of lenders",
      description: "Please wait while we process your application...",
      progressPercent: 91,
      darkPattern: "Fake processing to simulate legitimacy",
      mobileOptimized: true,
    },
    {
      id: "funding-options",
      title: "Choose Your Funding Speed",
      subtitle: "How fast do you need your cash?",
      description: "Select your preferred funding method:",
      progressPercent: 98,
      darkPattern: "Upsell expensive instant funding",
      mobileOptimized: true,
    },
    {
      id: "rollover-setup",
      title: "Congratulations! You're Approved!",
      subtitle: "Your money is on the way",
      description: "Set up renewal options for convenience:",
      progressPercent: 100,
      darkPattern: "Trap setup - auto-rollover authorization",
      mobileOptimized: true,
    },
  ];

  // Fake urgency timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 1847; // Reset to maintain fake urgency
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fake activity feed
  useEffect(() => {
    const activities = [
      "Sarah from Dallas just approved for $500",
      "Mike from Houston got $750 in minutes",
      "Jessica from Austin approved for $1,000",
      "Carlos from San Antonio got $300 fast",
      "Jennifer from Fort Worth approved for $600",
    ];

    const interval = setInterval(() => {
      const randomActivity =
        activities[Math.floor(Math.random() * activities.length)];
      setFakeApplications((prev) => [randomActivity, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Progressive fee calculation
  useEffect(() => {
    let fees = 0;
    let baseFee = Math.floor(formData.loanAmount * 0.15); // 15% base fee

    if (currentStep >= 1) fees += baseFee;
    if (currentStep >= 10 && formData.expressProcessing) fees += 25;
    if (currentStep >= 10 && formData.loanInsurance) fees += 35;
    if (currentStep >= 13) fees += 15; // "Processing fee"

    setCurrentFees(fees);

    // Calculate APR (only shown in final steps)
    if (currentStep >= 11) {
      const totalCost = formData.loanAmount + fees;
      const apr = (fees / formData.loanAmount) * (365 / 14) * 100; // 2-week loan
      setTotalAPR(Math.round(apr));
    }
  }, [
    currentStep,
    formData.loanAmount,
    formData.expressProcessing,
    formData.loanInsurance,
  ]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentStep < checkoutSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = checkoutSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 font-sans">
      {/* Mobile-first header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">$</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">CashFast Loans</h1>
              <p className="text-xs opacity-90">Trusted by thousands</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-red-600 px-2 py-1 rounded text-xs font-bold">
              OFFER EXPIRES: {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep + 1} of {checkoutSteps.length}
          </span>
          <span className="text-sm font-medium text-orange-600">
            {currentStepData.progressPercent}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${currentStepData.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Fake activity feed */}
      {showFakeActivity && (
        <div className="bg-green-50 border-l-4 border-green-400 p-3 mx-4 my-2">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <p className="text-sm text-green-800">
              {fakeApplications[0] || "Processing applications..."}
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Step header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-sm text-orange-600 font-medium mb-1">
              {currentStepData.subtitle}
            </p>
            <p className="text-sm text-gray-600">
              {currentStepData.description}
            </p>
          </div>

          {/* Step content */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    placeholder="John Smith"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    placeholder="75201"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={formData.loanAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          loanAmount: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>$100</span>
                      <span className="font-bold text-2xl text-orange-600">
                        ${formData.loanAmount}
                      </span>
                      <span>$2,000</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    ✓ Small processing fee applies
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's this for?
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    value={formData.loanPurpose}
                    onChange={(e) =>
                      setFormData({ ...formData, loanPurpose: e.target.value })
                    }
                  >
                    <option value="">Select purpose</option>
                    <option value="emergency">Emergency expense</option>
                    <option value="bills">Pay bills</option>
                    <option value="car">Car repair</option>
                    <option value="medical">Medical expense</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Add more steps as needed */}
            {currentStep >= 2 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🚧</div>
                <p className="text-gray-600">
                  Step {currentStep + 1} implementation in progress...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Dark Pattern: {currentStepData.darkPattern}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex space-x-3">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
            >
              {currentStep === checkoutSteps.length - 1
                ? "Complete Application"
                : "Continue"}
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 flex justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span>BBB Accredited</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
              <span>Licensed Lender</span>
            </div>
          </div>

          {/* Fee disclosure (progressive) */}
          {currentStep >= 1 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Loan Details:</strong> ${formData.loanAmount}
                {currentFees > 0 && <span> + ${currentFees} fees</span>}
                {totalAPR > 0 && (
                  <span className="text-xs"> ({totalAPR}% APR)</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealisticCheckoutFlow;
