"use client";

import { useEducation } from "@/components/providers/EducationProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { analyticsEngine } from "@/lib/core/AnalyticsEngine";
import {
  BoltIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

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

interface DeceptiveCheckoutFlowProps {
  loanAmount: number;
  phase: "exploitative" | "ethical";
  onBack: () => void;
  onStepChange?: (step: string) => void;
}

const DeceptiveCheckoutFlow: React.FC<DeceptiveCheckoutFlowProps> = ({
  loanAmount,
  phase,
  onBack,
  onStepChange,
}) => {
  const { showEducationalOverlay } = useEducation();
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
    employmentStatus: "employed",
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
    loanAmount: loanAmount,
    loanPurpose: "",
    previousPaydayLoan: false,
    achAuthorization: true,
    electronicSignature: true,
    creditCheck: true,
    dataSharing: true,
    marketingConsent: true,
    autoRenewal: true,
    loanInsurance: true,
    expressProcessing: true,
  });

  const [totalCost, setTotalCost] = useState(loanAmount);
  const [baseFee, setBaseFee] = useState(0);
  const [additionalFees, setAdditionalFees] = useState({
    processingFee: 0,
    originationFee: 0,
    creditCheckFee: 0,
    transferFee: 0,
    insuranceFee: 0,
    expressFee: 0,
  });

  // Dark pattern: Fake urgency timer
  const [timer, setTimer] = useState(600); // 10 minutes
  const [spotsRemaining, setSpotsRemaining] = useState(3);
  const [viewersCount, setViewersCount] = useState(127);

  // Start urgency timer and fake activity
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));

      // Randomly update viewers
      if (Math.random() > 0.7) {
        setViewersCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
      }

      // Randomly decrease spots
      if (Math.random() > 0.95 && spotsRemaining > 1) {
        setSpotsRemaining((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [spotsRemaining]);

  // Dark pattern: Drip pricing - gradually reveal fees
  useEffect(() => {
    if (currentStep >= 3) {
      setBaseFee(loanAmount * 0.15); // 15% base fee
    }
    if (currentStep >= 5) {
      setAdditionalFees((prev) => ({ ...prev, processingFee: 49.99 }));
    }
    if (currentStep >= 7) {
      setAdditionalFees((prev) => ({
        ...prev,
        originationFee: loanAmount * 0.05,
      }));
    }
    if (currentStep >= 9) {
      setAdditionalFees((prev) => ({ ...prev, creditCheckFee: 29.99 }));
    }
    if (currentStep >= 11) {
      setAdditionalFees((prev) => ({ ...prev, transferFee: 14.99 }));
    }
    if (formData.loanInsurance && currentStep >= 13) {
      setAdditionalFees((prev) => ({ ...prev, insuranceFee: 89.99 }));
    }
    if (formData.expressProcessing && currentStep >= 14) {
      setAdditionalFees((prev) => ({ ...prev, expressFee: 59.99 }));
    }
  }, [
    currentStep,
    loanAmount,
    formData.loanInsurance,
    formData.expressProcessing,
  ]);

  // Calculate total with all fees
  useEffect(() => {
    const allFees = Object.values(additionalFees).reduce(
      (sum, fee) => sum + fee,
      0
    );
    setTotalCost(loanAmount + baseFee + allFees);
  }, [loanAmount, baseFee, additionalFees]);

  // Call onStepChange when component mounts or step changes
  useEffect(() => {
    if (onStepChange && steps[currentStep]) {
      onStepChange(steps[currentStep].id);
    }
  }, [currentStep]);

  const steps: CheckoutStep[] = [
    {
      id: "start",
      title: "Get Started",
      subtitle: "Quick 2-minute application",
      description: "Just 3 simple steps to get your cash",
      progressPercent: 5,
      darkPattern: "bait_and_switch",
      mobileOptimized: true,
    },
    {
      id: "personal",
      title: "Personal Information",
      subtitle: "Basic details",
      description: "We just need some basic info",
      progressPercent: 10,
      darkPattern: "foot_in_door",
      mobileOptimized: true,
    },
    {
      id: "contact",
      title: "Contact Details",
      subtitle: "How to reach you",
      description: "For your loan confirmation only",
      progressPercent: 15,
      darkPattern: "data_harvesting",
      mobileOptimized: true,
    },
    {
      id: "address",
      title: "Current Address",
      subtitle: "Where you live",
      description: "Required for verification",
      progressPercent: 20,
      darkPattern: "progressive_disclosure",
      mobileOptimized: true,
    },
    {
      id: "employment",
      title: "Employment Status",
      subtitle: "Income verification",
      description: "To ensure you can repay",
      progressPercent: 25,
      darkPattern: "data_collection",
      mobileOptimized: false,
    },
    {
      id: "employer",
      title: "Employer Details",
      subtitle: "Work information",
      description: "For income verification",
      progressPercent: 30,
      darkPattern: "privacy_zuckering",
      mobileOptimized: false,
    },
    {
      id: "income",
      title: "Income Details",
      subtitle: "Financial information",
      description: "Almost there!",
      progressPercent: 40,
      darkPattern: "sunk_cost_fallacy",
      mobileOptimized: false,
    },
    {
      id: "banking",
      title: "Banking Information",
      subtitle: "For instant deposit",
      description: "Get funds in 15 minutes!",
      progressPercent: 50,
      darkPattern: "forced_continuity",
      mobileOptimized: false,
    },
    {
      id: "bank_access",
      title: "Bank Access",
      subtitle: "Secure verification",
      description: "256-bit encryption",
      progressPercent: 60,
      darkPattern: "privacy_invasion",
      mobileOptimized: false,
    },
    {
      id: "identity",
      title: "Identity Verification",
      subtitle: "Government ID",
      description: "Required by law",
      progressPercent: 70,
      darkPattern: "false_authority",
      mobileOptimized: false,
    },
    {
      id: "references",
      title: "References",
      subtitle: "Emergency contacts",
      description: "In case we can't reach you",
      progressPercent: 80,
      darkPattern: "social_pyramid",
      mobileOptimized: false,
    },
    {
      id: "loan_details",
      title: "Loan Purpose",
      subtitle: "Tell us why",
      description: "Help us serve you better",
      progressPercent: 85,
      darkPattern: "emotional_manipulation",
      mobileOptimized: false,
    },
    {
      id: "consents",
      title: "Agreements",
      subtitle: "Terms and conditions",
      description: "Standard authorizations",
      progressPercent: 90,
      darkPattern: "roach_motel",
      mobileOptimized: false,
    },
    {
      id: "insurance",
      title: "Loan Protection",
      subtitle: "Protect your loan",
      description: "Recommended by 9/10 customers",
      progressPercent: 95,
      darkPattern: "sneak_into_basket",
      mobileOptimized: false,
    },
    {
      id: "review",
      title: "Final Review",
      subtitle: "Confirm and submit",
      description: "Get your money now!",
      progressPercent: 99,
      darkPattern: "false_urgency",
      mobileOptimized: true,
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      onStepChange?.(steps[currentStep + 1].id);

      // Track progression
      analyticsEngine.trackBehavior("session123", {
        type: "form_progression",
        step: steps[currentStep + 1].id,
        timeSpent: 600 - timer,
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      onStepChange?.(steps[currentStep - 1].id);
    } else {
      onBack();
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    // Render fake urgency warnings
    const renderUrgencyWarning = () => (
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-red-600 animate-pulse" />
            <span className="text-red-800 font-semibold">
              Offer expires in: {formatTime(timer)}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <UserGroupIcon className="h-4 w-4 text-red-600" />
              <span className="text-red-700">{viewersCount} viewing now</span>
            </div>
            <div className="text-red-800 font-bold">
              Only {spotsRemaining} spots left!
            </div>
          </div>
        </div>
      </div>
    );

    // Render fake social proof
    const renderSocialProof = () => (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <span className="text-green-800">
            <strong>Sarah M.</strong> just received $500! •
            <strong> John D.</strong> got approved for $750! •
            <strong> Lisa K.</strong> received funds in 12 minutes!
          </span>
        </div>
      </div>
    );

    // Render security theater
    const renderSecurityTheater = () => (
      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <ShieldCheckIcon className="h-4 w-4" />
          <span>256-bit SSL Encryption</span>
        </div>
        <div className="flex items-center gap-1">
          <BoltIcon className="h-4 w-4" />
          <span>Instant Approval</span>
        </div>
      </div>
    );

    switch (step.id) {
      case "start":
        return (
          <div className="space-y-6">
            {renderUrgencyWarning()}
            {renderSocialProof()}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Get ${loanAmount} in Your Account Today!
              </h2>
              <p className="text-lg text-gray-600">
                Approved in 2 minutes • Money in 15 minutes • No hidden fees*
              </p>
              <div className="text-xs text-gray-400">
                *Processing, origination, and transfer fees apply. See terms.
              </div>
            </div>
            {renderSecurityTheater()}
          </div>
        );

      case "personal":
        return (
          <div className="space-y-4">
            {renderUrgencyWarning()}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
              <Input
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                required
              />
              <Input
                label="Social Security Number"
                type="password"
                placeholder="XXX-XX-XXXX"
                value={formData.ssn}
                onChange={(e) =>
                  setFormData({ ...formData, ssn: e.target.value })
                }
                required
              />
            </div>
          </div>
        );

      case "consents":
        return (
          <div className="space-y-4">
            {renderUrgencyWarning()}
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={formData.achAuthorization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      achAuthorization: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <div>
                  <div className="font-semibold">ACH Authorization</div>
                  <div className="text-sm text-gray-600">
                    I authorize automatic withdrawals from my account for loan
                    repayment and any fees
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100">
                <input
                  type="checkbox"
                  checked={formData.autoRenewal}
                  onChange={(e) =>
                    setFormData({ ...formData, autoRenewal: e.target.checked })
                  }
                  className="mt-1"
                />
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    Auto-Renewal Service
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Automatically renew your loan if you can't pay in full
                    (saves you from default!)
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={formData.dataSharing}
                  onChange={(e) =>
                    setFormData({ ...formData, dataSharing: e.target.checked })
                  }
                  className="mt-1"
                />
                <div>
                  <div className="font-semibold">Data Sharing Agreement</div>
                  <div className="text-sm text-gray-600">
                    Share my information with partners for better offers and
                    services
                  </div>
                </div>
              </label>
            </div>
          </div>
        );

      case "insurance":
        return (
          <div className="space-y-4">
            {renderUrgencyWarning()}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">⚠️ Protect Your Loan</h3>
              <p className="mb-4">
                <strong>87% of our customers</strong> choose loan protection
                insurance. Without it, you're personally liable for the full
                amount even if you lose your job or get sick!
              </p>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.loanInsurance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      loanInsurance: e.target.checked,
                    })
                  }
                  className="mt-1"
                />
                <div>
                  <div className="font-semibold">
                    Yes, protect my loan for only $89.99
                  </div>
                  <div className="text-sm text-gray-600">
                    Covers job loss, illness, and unexpected emergencies
                  </div>
                </div>
              </label>
              {!formData.loanInsurance && (
                <div className="mt-4 text-red-600 font-semibold">
                  ⚠️ Are you sure? You'll be personally responsible for the full
                  ${totalCost.toFixed(2)} even in emergencies!
                </div>
              )}
            </div>
          </div>
        );

      case "review":
        return (
          <div className="space-y-4">
            {renderUrgencyWarning()}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Loan Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-semibold">
                    ${loanAmount.toFixed(2)}
                  </span>
                </div>
                {baseFee > 0 && (
                  <div className="flex justify-between">
                    <span>Finance Charge (391% APR):</span>
                    <span className="font-semibold">${baseFee.toFixed(2)}</span>
                  </div>
                )}
                {Object.entries(additionalFees).map(
                  ([key, value]) =>
                    value > 0 && (
                      <div
                        key={key}
                        className="flex justify-between text-gray-600"
                      >
                        <span>
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          :
                        </span>
                        <span>${value.toFixed(2)}</span>
                      </div>
                    )
                )}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Amount Due:</span>
                  <span>${totalCost.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Due in 14 days. Late fees of $50 apply after grace period.
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100">
              <input
                type="checkbox"
                checked={formData.expressProcessing}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expressProcessing: e.target.checked,
                  })
                }
                className="mt-1"
              />
              <div>
                <div className="font-semibold flex items-center gap-2">
                  Express Processing
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded animate-pulse">
                    LIMITED TIME
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Get your money in 5 minutes instead of 24 hours for just
                  $59.99
                </div>
              </div>
            </label>
          </div>
        );

      default:
        // Return placeholder for other steps
        return (
          <div className="space-y-4">
            {renderUrgencyWarning()}
            <p className="text-gray-600">Step content for: {step.title}</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Progress bar with manipulation */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span>{steps[currentStep].progressPercent}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${steps[currentStep].progressPercent}%` }}
          />
        </div>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
          <p className="text-gray-600">{steps[currentStep].subtitle}</p>
        </div>

        {renderStepContent()}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack} disabled={timer === 0}>
            Back
          </Button>

          <div className="flex gap-3">
            {currentStep === steps.length - 1 ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (showEducationalOverlay) {
                      showEducationalOverlay(
                        "Debt Trap Warning",
                        `You're about to agree to a loan with 391% APR that will cost you $${totalCost.toFixed(
                          2
                        )} 
                        for borrowing $${loanAmount}. This is designed to trap you in a cycle of debt.`
                      );
                    }
                  }}
                  className="text-red-600 border-red-600"
                >
                  <XMarkIcon className="h-5 w-5 mr-2" />
                  Decline (Really? Give up ${loanAmount}?)
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Get My ${loanAmount} Now!
                  {timer < 60 && (
                    <span className="ml-2 animate-pulse">⚡ HURRY!</span>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={handleNext} disabled={timer === 0}>
                Continue
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Fake activity ticker */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          Live: {Math.floor(Math.random() * 50) + 100} applications being
          processed
        </span>
      </div>
    </div>
  );
};

export default DeceptiveCheckoutFlow;
