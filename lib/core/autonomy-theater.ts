"use client";

import {
    StateRegulation,
    getRegulationForState,
} from "@/lib/state-regulations";
import React, { useEffect, useState } from "react";
import IncomeVerificationSimulator from "./IncomeVerificationSimulator";
import RealtimeProcessingSimulator from "./RealtimeProcessingSimulator";

/**
 * Phase 1: Exploitative Payday Loan Website
 *
 * A comprehensive simulation of predatory lending practices.
 * This component guides the user through a multi-step, increasingly intrusive
 * loan application designed to mimic the worst aspects of the payday loan industry.
 * It incorporates dark patterns, hidden fees, and manipulative language.
 */

// ADVANCED, REALISTIC FORM DATA (Based on industry analysis)
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
  hasDirectDeposit: boolean;

  // Financial Information
  bankName: string;
  accountType: "checking" | "savings";
  routingNumber: string;
  accountNumber: string;
  timeWithBank: string;
  hasOnlineBanking: boolean;
  onlineBankingUsername?: string;
  onlineBankingPassword?: string;

  // Identity & Loan
  driversLicenseOrStateId: string;
  issuingState: string;
  militaryStatus: "none" | "active" | "veteran" | "spouse";
  requestedLoanAmount: number;
  loanPurpose: string;

  // Consent & Dark Patterns
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  agreedToAutodial: boolean;
  autoRenewal: boolean;
  loanInsurance: boolean;
  expressProcessing: boolean;
}

interface LoanTerms {
  loan_amount: number;
  finance_charge: number;
  total_due: number;
  deceptive_apr: string;
  real_apr: number;
  rollover_fee: number;
  nsf_fee: number;
  dueDate: string; // Added for final terms
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};


const Phase1ExploitativeWebsite: React.FC = () => {
  const [currentStep, setCurrentStep] = useState("homepage");
  const [formData, setFormData] = useState<RealisticFormData>({
    // Personal Info
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    ssn: "",
    dob: "",
    // Address Info
    streetAddress: "",
    city: "",
    state: "TX", // Default to a state where it's legal
    zipCode: "",
    timeAtAddress: "",
    housingType: "rent",
    monthlyRent: 1200,
    // Employment Info
    employmentStatus: "employed",
    employer: "",
    jobTitle: "",
    workPhone: "",
    timeAtJob: "",
    payFrequency: "biweekly",
    nextPayDate: "",
    monthlyIncome: 3000,
    incomeSource: "employment",
    hasDirectDeposit: true,
    // Financial Info
    bankName: "",
    accountType: "checking",
    routingNumber: "",
    accountNumber: "",
    timeWithBank: "",
    hasOnlineBanking: true,
    // Identity & Loan
    driversLicenseOrStateId: "",
    issuingState: "TX",
    militaryStatus: "none",
    requestedLoanAmount: 500,
    loanPurpose: "Emergency Expenses",
    // Consent
    agreedToTerms: true,
    agreedToPrivacy: true,
    agreedToAutodial: true,
    autoRenewal: true,
    loanInsurance: true,
    expressProcessing: true,
  });
  const [currentRegulation, setCurrentRegulation] =
    useState<StateRegulation | null>(null);
  const [loanTerms, setLoanTerms] = useState<LoanTerms | null>(null);
  const [urgencyTimer, setUrgencyTimer] = useState(300); // 5 minutes
  const [spotsLeft, setSpotsLeft] = useState(11);
  const [platformTip, setPlatformTip] = useState(15.0); // Pre-filled deceptive tip

  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    const spotsTimer = setInterval(() => {
        setSpotsLeft(prev => prev > 2 ? prev -1 : 2)
    }, 15000)
    return () => {
        clearInterval(timer)
        clearInterval(spotsTimer)
    };
  }, []);

  useEffect(() => {
    if (formData.state) {
      const regulation = getRegulationForState(formData.state);
      setCurrentRegulation(regulation);
    }
  }, [formData.state]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: isCheckbox ? checked : value,
    });
  };

  const nextStep = () => {
    const steps = [
      "homepage",
      "basic_info",
      "financial_info",
      "income_verification",
      "verification",
      "addons",
      "final_terms",
      "esignature",
      "rollover_trap",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };
  
  const calculateTerms = () => {
    // Basic calculation, can be refined with state logic
    const amount = formData.requestedLoanAmount;
    const fee = amount * 0.2; // Simplified 20% fee
    setLoanTerms({
      loan_amount: amount,
      finance_charge: fee,
      total_due: amount + fee,
      deceptive_apr: "Rates as low as 250%",
      real_apr: (fee / amount) * 26, // Bi-weekly loan annualized
      rollover_fee: amount * 0.25, // Predatory rollover
      nsf_fee: 35,
      dueDate: "In 2 Weeks",
    });
    nextStep();
  };

  const renderHomepage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500">
      {/* Fake Urgency Header */}
      <div className="bg-red-600 text-white text-center py-2 text-sm font-bold animate-pulse">
        ⚠️ SPECIAL OFFER EXPIRES IN {formatTime(urgencyTimer)} ⚠️ Only{" "}
        {spotsLeft} spots left in your area!
      </div>

      {/* Hero Section with Deceptive Claims */}
      <div className="container mx-auto text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-white mb-4 shadow-text">
          Get Up to $1,500 in as Little as 5 Minutes!
        </h1>
        <p className="text-xl text-yellow-200 mb-8 max-w-2xl mx-auto shadow-text">
          Bad Credit? No Problem! Our advanced algorithm approves 9 out of 10
          applicants instantly. No hidden fees, ever.
        </p>
        <button
          onClick={nextStep}
          className="bg-yellow-400 text-red-800 font-bold text-2xl py-4 px-10 rounded-full shadow-lg hover:bg-yellow-300 transform hover:scale-105 transition-transform"
        >
          Check My Rate NOW
        </button>
        <div className="mt-4 text-xs text-yellow-100">
          *Checking your rate will not affect your credit score.
        </div>
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="min-h-screen bg-gray-50 py-8">
       {/* Persistent Fake Urgency Header */}
      <div className="bg-red-600 text-white text-center py-2 text-sm font-bold animate-pulse sticky top-0 z-10">
        ⚠️ Your rate is held for {formatTime(urgencyTimer)} ⚠️ Application expires soon!
      </div>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Deceptive Progress Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-green-500 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Step 1: Tell Us About Yourself
            </h2>
            <div className="text-sm text-gray-500">
              <span className="font-bold text-green-600">Progress: 25%</span>
            </div>
          </div>
          <p className="text-gray-600">
            We just need some basic information to verify your identity. Your
            data is 256-bit encrypted and secure.
          </p>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* ... Form fields for basic info ... */}
          <button
            onClick={nextStep}
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors mt-6"
          >
            Continue to Financial Info
          </button>
        </div>
      </div>
    </div>
  );

  const renderFinancialInfo = () => (
    <div className="min-h-screen bg-gray-50 py-8">
       {/* Persistent Fake Urgency Header */}
       <div className="bg-red-600 text-white text-center py-2 text-sm font-bold animate-pulse sticky top-0 z-10">
        ⚠️ TIME IS RUNNING OUT: {formatTime(urgencyTimer)} ⚠️ Don't lose your spot!
      </div>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Step 2: Secure Your Funding
            </h2>
            <div className="text-sm text-gray-500">
              <span className="font-bold text-blue-600">Progress: 50%</span>
            </div>
          </div>
          <p className="text-gray-600">
            Provide your employment and banking details so we know where to send
            your cash.
          </p>
        </div>
        {/* ... form fields ... */}
      </div>
    </div>
  );

  const renderIncomeVerification = () => (
    <IncomeVerificationSimulator
      onVerificationComplete={() => {
        /* Handle completion */
      }}
    />
  );

  const renderVerification = () => (
    <div className="min-h-screen bg-gray-50 py-8">
       {/* Persistent Fake Urgency Header */}
       <div className="bg-red-600 text-white text-center py-2 text-sm font-bold animate-pulse sticky top-0 z-10">
        ⚠️ FINAL CHANCE: {formatTime(urgencyTimer)} ⚠️ Complete your application NOW!
      </div>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500 mt-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Step 3: Almost There!
            </h2>
            <div className="text-sm text-gray-500">
              <span className="font-bold text-purple-600">Progress: 75%</span>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Our system is pre-qualifying your loan... just a few more details.
          </p>
          <RealtimeProcessingSimulator
            formData={formData}
            onProcessingComplete={calculateTerms}
          />
        </div>
      </div>
    </div>
  );
  
  const renderAddons = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Final Step: Customize Your Loan
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Add these recommended services for peace of mind and faster funding.
          </p>

          <div className="space-y-4 mb-8">
            {/* Add-on Items */}
          </div>

          {/* Confirmshaming opt-out */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="text-center">
              <div className="text-red-700 font-bold text-lg mb-2">
                ⚠️ Are you sure you want to decline these protections?
              </div>
              <div className="text-red-600 text-sm">
                Most customers who skip these services end up paying more in
                fees and penalties. Our data shows protected loans have 90%
                fewer issues.
              </div>
              <div className="mt-3">
                <a href="#" className="text-xs text-gray-500 underline hover:text-red-600">
                  No thanks, I'll risk it.
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={nextStep}
              className="bg-blue-600 text-white font-bold py-4 px-12 rounded-lg text-xl hover:bg-blue-700 transition-colors"
            >
              View My Loan Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinalTerms = () => (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-yellow-400">
          <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-4">
            Congratulations! You're Approved!
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Here are your official loan terms. Please review and sign below.
          </p>

          {loanTerms && (
            <div className="space-y-4 text-lg">
              {/* Term details */}
              <div className="mt-6 pt-4 border-t border-gray-300">
                <label
                  htmlFor="tip"
                  className="block text-md font-medium text-gray-400 mb-2"
                >
                  Support Our Mission (Optional Tip):
                </label>
                <div className="flex items-center">
                  <span className="text-gray-400 text-lg mr-2">$</span>
                  <input
                    type="number"
                    id="tip"
                    name="tip"
                    value={platformTip}
                    onChange={(e) =>
                      setPlatformTip(parseFloat(e.target.value) || 0)
                    }
                    className="w-24 p-2 border bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  92% of users leave a tip to support our free service. Thanks for
                  your generosity!
                </p>
              </div>
            </div>
          )}
          <div className="text-center mt-8">
            <button
              onClick={nextStep}
              className="bg-green-500 text-white font-bold py-3 px-10 rounded-lg text-lg hover:bg-green-600"
            >
              Agree & E-Sign
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  switch (currentStep) {
    case "homepage":
      return renderHomepage();
    case "basic_info":
      return renderBasicInfo();
    case "financial_info":
      return renderFinancialInfo();
    case "income_verification":
      return renderIncomeVerification();
    case "verification":
      return renderVerification();
    case "addons":
        return renderAddons();
    case "final_terms":
      return renderFinalTerms();
    // ... other cases
    default:
      return renderHomepage();
  }
};

export default Phase1ExploitativeWebsite;
