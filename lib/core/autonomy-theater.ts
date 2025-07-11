"use client";

import React, { useEffect, useState } from "react";

/**
 * Phase 1: Exploitative Payday Loan Website
 *
 * A comprehensive simulation of predatory lending practices that consolidates:
 * - All deceptive patterns from research
 * - Progressive disclosure and drip pricing
 * - ACH exploitation and rollover traps
 * - Fake urgency and social proof
 * - Pre-selected add-ons and hidden fees
 * - Realistic Texas-style predatory lending (664% APR)
 *
 * This represents the worst of payday lending designed to trap vulnerable borrowers
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

interface LoanTerms {
  principal: number;
  advertised_fee: number;
  hidden_fees: {
    processing: number;
    verification: number;
    service: number;
    risk_assessment: number;
    platform: number;
    insurance: number;
  };
  total_fees: number;
  total_due: number;
  deceptive_apr: string;
  real_apr: number;
  rollover_fee: number;
  nsf_fee: number;
  dueDate: string; // Added for final terms
}

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
    state: "TX",
    zipCode: "",
    timeAtAddress: "1-2 years",
    housingType: "rent",
    monthlyRent: 1200,

    // Employment Info
    employmentStatus: "employed",
    employer: "",
    jobTitle: "",
    workPhone: "",
    timeAtJob: "2+ years",
    payFrequency: "biweekly",
    nextPayDate: "",
    monthlyIncome: 3000,
    incomeSource: "employment",

    // Banking Info
    bankName: "",
    accountType: "checking",
    routingNumber: "",
    accountNumber: "",
    bankingTime: "5+ years",
    onlineBankingUsername: "",

    // Identity Verification
    driversLicenseNumber: "",
    driversLicenseState: "TX",
    driversLicenseExp: "",

    // References
    reference1Name: "",
    reference1Phone: "",
    reference1Relationship: "",
    reference2Name: "",
    reference2Phone: "",
    reference2Relationship: "",

    // Loan Info
    loanAmount: 300,
    loanPurpose: "Emergency",
    previousPaydayLoan: false,

    // Consents
    achAuthorization: false,
    electronicSignature: false,
    creditCheck: true,
    dataSharing: true,
    marketingConsent: true,
    autoRenewal: true,
    loanInsurance: true,
    expressProcessing: true,
  });

  const [urgencyTimer, setUrgencyTimer] = useState(1847); // Fake countdown
  const [fakeActivity, setFakeActivity] = useState<string[]>([]);
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [showHiddenFees, setShowHiddenFees] = useState(false);
  const [loanTerms, setLoanTerms] = useState<LoanTerms | null>(null);
  // Vulnerability score logic removed; keeping constant at 0 to hide related UI
  const vulnerabilityScore = 0;
  const [rolloverCount, setRolloverCount] = useState(0);
  const [achAttempts, setAchAttempts] = useState(0); // Added for rollover trap
  const [totalBankFees, setTotalBankFees] = useState(0); // Added for rollover trap

  // Fake urgency timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer((prev) => {
        if (prev <= 0) return 1847; // Reset to create false scarcity
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fake social proof activity
  useEffect(() => {
    const activities = [
      "Jennifer from Dallas just got approved for $500! 💰",
      "Mike from Houston received $300 in 8 minutes! ⚡",
      "Sarah from Austin just renewed her loan! 🔄",
      "David from San Antonio got emergency cash! 🚨",
      "Lisa from Fort Worth was approved instantly! ✅",
      "Robert from El Paso got $750 approved! 💵",
    ];

    const activityTimer = setInterval(() => {
      setFakeActivity((prev: string[]) => {
        const newActivity: string =
          activities[Math.floor(Math.random() * activities.length)] ||
          "New application approved!";
        return [...prev.slice(-2), newActivity];
      });

      // Occasionally decrease "spots left" to create scarcity
      if (Math.random() < 0.3) {
        setSpotsLeft((prev) => (prev > 1 ? prev - 1 : 3));
      }
    }, 8000);

    return () => clearInterval(activityTimer);
  }, []);

  // Calculate predatory loan terms with progressive disclosure
  const calculateLoanTerms = (amount: number, step: string): LoanTerms => {
    const base_fee = amount * 0.15; // Start low, add fees progressively

    const hidden_fees = {
      processing: step === "basic_info" ? 25 : 0,
      verification: step === "financial_info" ? 15 : 0,
      service: step === "verification" ? 20 : 0,
      risk_assessment:
        step === "verification" ? 30 + vulnerabilityScore * 5 : 0,
      platform: step === "addons" ? 20 : 0,
      insurance: formData.loanInsurance ? 25 : 0,
    };

    const total_hidden_fees = Object.values(hidden_fees).reduce(
      (sum, fee) => sum + fee,
      0
    );
    const total_fees = base_fee + total_hidden_fees;
    const total_due = amount + total_fees;
    const real_apr = (total_fees / amount) * (365 / 14) * 100;

    return {
      principal: amount,
      advertised_fee: base_fee,
      hidden_fees,
      total_fees,
      total_due,
      deceptive_apr: "Low Daily Rate!", // Hide real APR
      real_apr: Math.round(real_apr),
      rollover_fee: 50,
      nsf_fee: 35,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10), // Added for final terms
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (field: keyof RealisticFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "loanAmount") {
      setLoanTerms(calculateLoanTerms(Number(value), currentStep));
    }
  };

  const nextStep = () => {
    const steps = [
      "homepage",
      "basic_info",
      "financial_info",
      "verification",
      "addons",
      "final_terms",
      "esignature",
      "rollover_trap",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      const nextStepValue = steps[currentIndex + 1];
      if (nextStepValue) {
        setCurrentStep(nextStepValue);
        setLoanTerms(calculateLoanTerms(formData.loanAmount, nextStepValue));
      }
    }
  };

  const renderHomepage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500">
      {/* Fake Urgency Header */}
      <div className="bg-red-600 text-white text-center py-2 text-sm font-bold animate-pulse">
        ⚠️ SPECIAL OFFER EXPIRES IN {formatTime(urgencyTimer)} ⚠️ Only{" "}
        {spotsLeft} spots left in your area!
      </div>

      {/* Hero Section with Deceptive Claims */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-6xl font-black mb-4 drop-shadow-lg animate-bounce">
            💰 INSTANT CASH $100-$1,500 💰
          </h1>
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">
            ✅ NO CREDIT CHECK ✅ APPROVED IN MINUTES ✅ FUNDS TODAY
          </h2>
          <div className="text-2xl font-semibold mb-6 bg-red-700 bg-opacity-80 inline-block px-6 py-2 rounded-lg">
            🔥 EMERGENCY CASH WHEN BANKS SAY NO! 🔥
          </div>
          <div className="text-lg text-yellow-200 mb-4">
            "Instant approval, bank deposit in minutes, flexible repayment"
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left: Trust Badges & Social Proof - Enhanced */}
          <div className="bg-white rounded-xl shadow-2xl p-6 border-4 border-yellow-400">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Trusted by Thousands, Rated Excellent
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <img src="/ssl-secure.png" alt="SSL Secure" className="mx-auto h-16 w-16" />
                <p className="font-semibold mt-2">SSL SECURE</p>
              </div>
              <div>
                <img src="/bbb-rated.png" alt="BBB Rated" className="mx-auto h-16 w-16" />
                <p className="font-semibold mt-2">BBB A+ RATED</p>
              </div>
              <div>
                <img src="/licensed.png" alt="State Licensed" className="mx-auto h-16 w-16" />
                <p className="font-semibold mt-2">STATE LICENSED</p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-2">Live Activity Feed:</h4>
              <div id="fake-activity-feed" className="h-24 overflow-hidden relative">
                {fakeActivity.map((act, index) => (
                  <div key={index} className="p-2 text-sm text-gray-600 animate-fade-in-up">
                    {act}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Quick Application Form */}
          <div className="bg-white rounded-xl shadow-2xl p-8 border-4 border-green-400">
            <h3 className="text-4xl font-black text-gray-800 mb-4">
              Get Your Cash Now!
            </h3>
            <p className="text-gray-600 mb-6">
              Just 3 simple fields to start. We only ask for what we need.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentStep("basic_info");
              }}
              className="space-y-4"
            >
              <div className="flex items-center border border-gray-300 rounded-lg p-3">
                <span className="text-gray-500 mr-3">💲</span>
                <select
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange("loanAmount", Number(e.target.value))}
                  className="w-full bg-transparent outline-none"
                >
                  {[100, 200, 300, 400, 500, 750, 1000, 1250, 1500].map((amt) => (
                    <option key={amt} value={amt}>
                      I need ${amt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email Address*"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-4 rounded-lg text-2xl hover:bg-green-600 transition-all duration-300 shadow-lg animate-pulse"
              >
                GET CASH NOW →
              </button>
              <p className="text-xs text-gray-500 text-center">
                By clicking, I agree to the Terms, Privacy Policy, and to
                receive marketing communications.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-black text-gray-800 mb-2">
          Step 2: Personal & Address Information
        </h2>
        <p className="text-gray-600 mb-8">
          We just need a few more details to verify your identity for security
          purposes. This is a standard process.
        </p>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mb-2">
            Personal Details
          </div>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Middle Name (Optional)"
            value={formData.middleName}
            onChange={(e) => handleInputChange("middleName", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Date of Birth (MM/DD/YYYY)"
            value={formData.dob}
            onChange={(e) => handleInputChange("dob", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Social Security Number (SSN)"
            value={formData.ssn}
            onChange={(e) => handleInputChange("ssn", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
           <input
            type="tel"
            placeholder="Alternate Phone (Optional)"
            value={formData.alternatePhone}
            onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />

          {/* Address Information */}
          <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mt-6 mb-2">
            Residential Address
          </div>
          <input
            type="text"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full md:col-span-2 focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
           <input
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <select
            value={formData.timeAtAddress}
            onChange={(e) => handleInputChange("timeAtAddress", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          >
            <option>Time at Address</option>
            <option>Less than 1 year</option>
            <option>1-2 years</option>
            <option>2-5 years</option>
            <option>5+ years</option>
          </select>
           <select
            value={formData.housingType}
            onChange={(e) => handleInputChange("housingType", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          >
            <option value="rent">Housing: Rent</option>
            <option value="own">Housing: Own</option>
            <option value="other">Housing: Other</option>
          </select>
          {formData.housingType === 'rent' && (
             <input
              type="number"
              placeholder="Monthly Rent"
              value={formData.monthlyRent}
              onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />
          )}
        </div>
        <button
          onClick={nextStep}
          className="w-full mt-8 bg-red-600 text-white font-bold py-4 rounded-lg text-2xl hover:bg-red-700 transition-all duration-300 shadow-lg"
        >
          Next: Financial Details →
        </button>
      </div>
    </div>
  );

    const renderFinancialInfo = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-black text-gray-800 mb-2">
          Step 3: Employment & Banking
        </h2>
        <p className="text-gray-600 mb-8">
          This helps us verify you can afford the loan. Your information is kept secure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employment Information */}
          <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mb-2">
            Employment
          </div>
          <select
            value={formData.employmentStatus}
            onChange={(e) => handleInputChange("employmentStatus", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          >
            <option value="employed">Employed</option>
            <option value="self-employed">Self-Employed</option>
            <option value="benefits">Receiving Benefits</option>
             <option value="retired">Retired</option>
          </select>
          <input
            type="text"
            placeholder="Employer Name"
            value={formData.employer}
            onChange={(e) => handleInputChange("employer", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
           <input
            type="tel"
            placeholder="Work Phone"
            value={formData.workPhone}
            onChange={(e) => handleInputChange("workPhone", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <select
            value={formData.timeAtJob}
            onChange={(e) => handleInputChange("timeAtJob", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          >
            <option>Time at Job</option>
            <option>Less than 1 year</option>
            <option>1-2 years</option>
            <option>2-5 years</option>
            <option>5+ years</option>
          </select>
          <select
            value={formData.payFrequency}
            onChange={(e) => handleInputChange("payFrequency", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          >
            <option value="biweekly">Paid Bi-Weekly</option>
            <option value="weekly">Paid Weekly</option>
            <option value="monthly">Paid Monthly</option>
            <option value="other">Other</option>
          </select>
           <input
            type="text"
            placeholder="Next Pay Date (MM/DD/YYYY)"
            value={formData.nextPayDate}
            onChange={(e) => handleInputChange("nextPayDate", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
           <input
            type="number"
            placeholder="Monthly Income"
            value={formData.monthlyIncome}
            onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />

           {/* Banking Information */}
          <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mt-6 mb-2">
            Banking
          </div>
          <input
            type="text"
            placeholder="Bank Name"
            value={formData.bankName}
            onChange={(e) => handleInputChange("bankName", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <select
            value={formData.accountType}
            onChange={(e) => handleInputChange("accountType", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          >
            <option value="checking">Checking Account</option>
            <option value="savings">Savings Account</option>
          </select>
          <input
            type="text"
            placeholder="Routing Number"
            value={formData.routingNumber}
            onChange={(e) => handleInputChange("routingNumber", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
           <input
            type="text"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          />
          <select
            value={formData.bankingTime}
            onChange={(e) => handleInputChange("bankingTime", e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
          >
            <option>Time with Bank</option>
            <option>Less than 1 year</option>
            <option>1-2 years</option>
            <option>2-5 years</option>
            <option>5+ years</option>
          </select>
        </div>
        <button
          onClick={nextStep}
          className="w-full mt-8 bg-red-600 text-white font-bold py-4 rounded-lg text-2xl hover:bg-red-700 transition-all duration-300 shadow-lg"
        >
          Next: Final Verification →
        </button>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-black text-gray-800 mb-2">
          Step 4: Final Verification
        </h2>
        <p className="text-gray-600 mb-8">
          Last step! We need to verify your identity and ask for references, which we may contact if you default.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity Verification */}
            <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mb-2">
                Identity
            </div>
             <input
                type="text"
                placeholder="Driver's License Number"
                value={formData.driversLicenseNumber}
                onChange={(e) => handleInputChange("driversLicenseNumber", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />
            <input
                type="text"
                placeholder="License State"
                value={formData.driversLicenseState}
                onChange={(e) => handleInputChange("driversLicenseState", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />
             <input
                type="text"
                placeholder="Expiration (MM/YY)"
                value={formData.driversLicenseExp}
                onChange={(e) => handleInputChange("driversLicenseExp", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />
            
            {/* References */}
            <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mt-6 mb-2">
                Reference #1
            </div>
             <input
                type="text"
                placeholder="Reference Name"
                value={formData.reference1Name}
                onChange={(e) => handleInputChange("reference1Name", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />
             <input
                type="tel"
                placeholder="Reference Phone"
                value={formData.reference1Phone}
                onChange={(e) => handleInputChange("reference1Phone", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />
             <input
                type="text"
                placeholder="Relationship (e.g., Friend)"
                value={formData.reference1Relationship}
                onChange={(e) => handleInputChange("reference1Relationship", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />

            <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mt-6 mb-2">
                Reference #2
            </div>
             <input
                type="text"
                placeholder="Reference Name"
                value={formData.reference2Name}
                onChange={(e) => handleInputChange("reference2Name", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />
             <input
                type="tel"
                placeholder="Reference Phone"
                value={formData.reference2Phone}
                onChange={(e) => handleInputChange("reference2Phone", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />
             <input
                type="text"
                placeholder="Relationship (e.g., Friend)"
                value={formData.reference2Relationship}
                onChange={(e) => handleInputChange("reference2Relationship", e.target.value)}
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-red-500"
            />
        </div>
        <button
          onClick={nextStep}
          className="w-full mt-8 bg-red-600 text-white font-bold py-4 rounded-lg text-2xl hover:bg-red-700 transition-all duration-300 shadow-lg"
        >
          Next: Loan Terms →
        </button>
      </div>
    </div>
  );

  const renderLoanTerms = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-black text-gray-800 mb-2">
          Step 5: Loan Terms & Consent
        </h2>
        <p className="text-gray-600 mb-8">
          Please review the loan terms and conditions carefully.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loan Terms */}
          <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mb-2">
            Loan Terms
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Principal Amount: ${loanTerms?.principal.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Advertised Fee: ${loanTerms?.advertised_fee.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Total Hidden Fees: ${loanTerms?.hidden_fees.total_fees.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Total Due: ${loanTerms?.total_due.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Deceptive APR: {loanTerms?.deceptive_apr}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Real APR: {loanTerms?.real_apr}%
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Rollover Fee: ${loanTerms?.rollover_fee.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              NSF Fee: ${loanTerms?.nsf_fee.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Due Date: {loanTerms?.dueDate}
            </p>
          </div>

          {/* Consent Form */}
          <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mb-2">
            Consent & Signature
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-lg text-gray-800 mb-4">
              I hereby authorize the lender to process my application and
              disclose my personal and financial information to verify my
              identity and creditworthiness. I understand that my consent
              is voluntary and I can withdraw it at any time.
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="achAuthorization"
                checked={formData.achAuthorization}
                onChange={(e) => handleInputChange("achAuthorization", e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="achAuthorization" className="text-lg text-gray-700">
                I authorize ACH (Automatic Clearing House) direct deposit
                and rollover of my loan.
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="electronicSignature"
                checked={formData.electronicSignature}
                onChange={(e) => handleInputChange("electronicSignature", e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="electronicSignature" className="text-lg text-gray-700">
                I agree to the electronic signature of the loan agreement.
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="creditCheck"
                checked={formData.creditCheck}
                onChange={(e) => handleInputChange("creditCheck", e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="creditCheck" className="text-lg text-gray-700">
                I consent to a credit check to evaluate my creditworthiness.
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="dataSharing"
                checked={formData.dataSharing}
                onChange={(e) => handleInputChange("dataSharing", e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="dataSharing" className="text-lg text-gray-700">
                I agree to share my personal and financial data with the lender
                for the purpose of loan processing and management.
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="marketingConsent"
                checked={formData.marketingConsent}
                onChange={(e) => handleInputChange("marketingConsent", e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="marketingConsent" className="text-lg text-gray-700">
                I agree to receive marketing communications from the lender.
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="autoRenewal"
                checked={formData.autoRenewal}
                onChange={(e) => handleInputChange("autoRenewal", e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="autoRenewal" className="text-lg text-gray-700">
                I agree to automatically renew my loan if I do not repay it in full
                by the due date.
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="loanInsurance"
                checked={formData.loanInsurance}
                onChange={(e) => handleInputChange("loanInsurance", e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="loanInsurance" className="text-lg text-gray-700">
                I agree to purchase loan insurance to protect the lender's interest.
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="expressProcessing"
                checked={formData.expressProcessing}
                onChange={(e) => handleInputChange("expressProcessing", e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="expressProcessing" className="text-lg text-gray-700">
                I agree to the express processing of my application and consent
                to the lender's collection efforts.
              </label>
            </div>
          </div>
        </div>
        <button
          onClick={nextStep}
          className="w-full mt-8 bg-red-600 text-white font-bold py-4 rounded-lg text-2xl hover:bg-red-700 transition-all duration-300 shadow-lg"
        >
          Next: Review & Submit →
        </button>
      </div>
    </div>
  );

  const renderRolloverTrap = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-black text-gray-800 mb-2">
          Step 6: Rollover Trap
        </h2>
        <p className="text-gray-600 mb-8">
          This is the final step. We will simulate a rollover trap to see if you
          fall for it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rollover Trap Details */}
          <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mb-2">
            Rollover Trap Details
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-lg text-gray-800 mb-2">
              Current Loan Amount: ${formData.loanAmount.toFixed(2)}
            </p>
            <p className="text-lg text-gray-800 mb-2">
              Rollover Count: {rolloverCount}
            </p>
            <p className="text-lg text-gray-800 mb-2">
              Total Bank Fees Paid: ${totalBankFees.toFixed(2)}
            </p>
            <p className="text-lg text-gray-800 mb-2">
              Current Urgency Timer: {formatTime(urgencyTimer)}
            </p>
            <p className="text-lg text-gray-800 mb-2">
              Spots Left: {spotsLeft}
            </p>
          </div>

          {/* Rollover Trap Simulation */}
          <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mb-2">
            Rollover Trap Simulation
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-lg text-gray-800 mb-2">
              Simulating a rollover trap...
            </p>
            <p className="text-lg text-gray-800 mb-2">
              If you see this message, it means the rollover trap was successful!
              The timer was reset, and the "spots left" increased.
            </p>
            <p className="text-lg text-gray-800 mb-2">
              This is a common tactic to encourage borrowers to take out
              another loan to pay off the first one, increasing the lender's profits.
            </p>
            <button
              onClick={() => {
                setRolloverCount((prev) => prev + 1);
                setTotalBankFees((prev) => prev + loanTerms?.rollover_fee || 0);
                setUrgencyTimer(1847); // Reset timer
                setSpotsLeft(3); // Reset spots
              }}
              className="w-full bg-blue-500 text-white font-bold py-4 rounded-lg text-2xl hover:bg-blue-600 transition-all duration-300 shadow-lg"
            >
              Simulate Rollover Trap
            </button>
          </div>
        </div>
        <button
          onClick={nextStep}
          className="w-full mt-8 bg-red-600 text-white font-bold py-4 rounded-lg text-2xl hover:bg-red-700 transition-all duration-300 shadow-lg"
        >
          Next: Complete Simulation →
        </button>
      </div>
    </div>
  );

  const renderReviewAndSubmit = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-black text-gray-800 mb-2">
          Step 7: Review & Submit
        </h2>
        <p className="text-gray-600 mb-8">
          Please review all the information you have provided and confirm
          your consent to proceed with the loan application.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reviewed Data */}
          <div className="md:col-span-2 font-bold text-xl text-gray-700 border-b pb-2 mb-2">
            Reviewed Data
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h3>
            <p className="text-lg text-gray-700">First Name: {formData.firstName}</p>
            <p className="text-lg text-gray-700">Last Name: {formData.lastName}</p>
            <p className="text-lg text-gray-700">Email: {formData.email}</p>
            <p className="text-lg text-gray-700">Phone: {formData.phone}</p>
            <p className="text-lg text-gray-700">SSN: {formData.ssn}</p>
            <p className="text-lg text-gray-700">DOB: {formData.dob}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Address Information</h3>
            <p className="text-lg text-gray-700">Street: {formData.streetAddress}</p>
            <p className="text-lg text-gray-700">City: {formData.city}</p>
            <p className="text-lg text-gray-700">State: {formData.state}</p>
            <p className="text-lg text-gray-700">ZIP: {formData.zipCode}</p>
            <p className="text-lg text-gray-700">Time at Address: {formData.timeAtAddress}</p>
            <p className="text-lg text-gray-700">Housing Type: {formData.housingType}</p>
            {formData.housingType === 'rent' && <p className="text-lg text-gray-700">Monthly Rent: ${formData.monthlyRent}</p>}
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Employment Information</h3>
            <p className="text-lg text-gray-700">Employment Status: {formData.employmentStatus}</p>
            <p className="text-lg text-gray-700">Employer: {formData.employer}</p>
            <p className="text-lg text-gray-700">Job Title: {formData.jobTitle}</p>
            <p className="text-lg text-gray-700">Work Phone: {formData.workPhone}</p>
            <p className="text-lg text-gray-700">Time at Job: {formData.timeAtJob}</p>
            <p className="text-lg text-gray-700">Pay Frequency: {formData.payFrequency}</p>
            <p className="text-lg text-gray-700">Next Pay Date: {formData.nextPayDate}</p>
            <p className="text-lg text-gray-700">Monthly Income: ${formData.monthlyIncome}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Banking Information</h3>
            <p className="text-lg text-gray-700">Bank Name: {formData.bankName}</p>
            <p className="text-lg text-gray-700">Account Type: {formData.accountType}</p>
            <p className="text-lg text-gray-700">Routing Number: {formData.routingNumber}</p>
            <p className="text-lg text-gray-700">Account Number: {formData.accountNumber}</p>
            <p className="text-lg text-gray-700">Banking Time: {formData.bankingTime}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Identity Verification</h3>
            <p className="text-lg text-gray-700">Drivers License Number: {formData.driversLicenseNumber}</p>
            <p className="text-lg text-gray-700">License State: {formData.driversLicenseState}</p>
            <p className="text-lg text-gray-700">Expiration: {formData.driversLicenseExp}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">References</h3>
            <p className="text-lg text-gray-700">Reference 1: {formData.reference1Name} ({formData.reference1Relationship})</p>
            <p className="text-lg text-gray-700">Phone: {formData.reference1Phone}</p>
            <p className="text-lg text-gray-700">Reference 2: {formData.reference2Name} ({formData.reference2Relationship})</p>
            <p className="text-lg text-gray-700">Phone: {formData.reference2Phone}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Loan Terms</h3>
            <p className="text-lg text-gray-700">Loan Amount: ${formData.loanAmount.toFixed(2)}</p>
            <p className="text-lg text-gray-700">Loan Purpose: {formData.loanPurpose}</p>
            <p className="text-lg text-gray-700">Previous Payday Loan: {formData.previousPaydayLoan ? 'Yes' : 'No'}</p>
            <p className="text-lg text-gray-700">Total Hidden Fees: ${loanTerms?.hidden_fees.total_fees.toFixed(2)}</p>
            <p className="text-lg text-gray-700">Total Due: ${loanTerms?.total_due.toFixed(2)}</p>
            <p className="text-lg text-gray-700">Deceptive APR: {loanTerms?.deceptive_apr}</p>
            <p className="text-lg text-gray-700">Real APR: {loanTerms?.real_apr}%</p>
            <p className="text-lg text-gray-700">Due Date: {loanTerms?.dueDate}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Consents</h3>
            <p className="text-lg text-gray-700">ACH Authorization: {formData.achAuthorization ? 'Yes' : 'No'}</p>
            <p className="text-lg text-gray-700">Electronic Signature: {formData.electronicSignature ? 'Yes' : 'No'}</p>
            <p className="text-lg text-gray-700">Credit Check: {formData.creditCheck ? 'Yes' : 'No'}</p>
            <p className="text-lg text-gray-700">Data Sharing: {formData.dataSharing ? 'Yes' : 'No'}</p>
            <p className="text-lg text-gray-700">Marketing Consent: {formData.marketingConsent ? 'Yes' : 'No'}</p>
            <p className="text-lg text-gray-700">Auto Renewal: {formData.autoRenewal ? 'Yes' : 'No'}</p>
            <p className="text-lg text-gray-700">Loan Insurance: {formData.loanInsurance ? 'Yes' : 'No'}</p>
            <p className="text-lg text-gray-700">Express Processing: {formData.expressProcessing ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <button
          onClick={() => {
            // In a real application, you would send this data to your backend
            // For this simulation, we'll just show a success message
            alert("Simulation Complete! Your loan application has been submitted.");
            // Optionally, reset the form or go back to homepage
            setCurrentStep("homepage");
            setFormData({
              firstName: "",
              lastName: "",
              middleName: "",
              email: "",
              phone: "",
              alternatePhone: "",
              ssn: "",
              dob: "",
              streetAddress: "",
              city: "",
              state: "TX",
              zipCode: "",
              timeAtAddress: "1-2 years",
              housingType: "rent",
              monthlyRent: 1200,
              employmentStatus: "employed",
              employer: "",
              jobTitle: "",
              workPhone: "",
              timeAtJob: "2+ years",
              payFrequency: "biweekly",
              nextPayDate: "",
              monthlyIncome: 3000,
              incomeSource: "employment",
              bankName: "",
              accountType: "checking",
              routingNumber: "",
              accountNumber: "",
              bankingTime: "5+ years",
              onlineBankingUsername: "",
              driversLicenseNumber: "",
              driversLicenseState: "TX",
              driversLicenseExp: "",
              reference1Name: "",
              reference1Phone: "",
              reference1Relationship: "",
              reference2Name: "",
              reference2Phone: "",
              reference2Relationship: "",
              loanAmount: 300,
              loanPurpose: "Emergency",
              previousPaydayLoan: false,
              achAuthorization: false,
              electronicSignature: false,
              creditCheck: true,
              dataSharing: true,
              marketingConsent: true,
              autoRenewal: true,
              loanInsurance: true,
              expressProcessing: true,
            });
            setLoanTerms(null);
            setUrgencyTimer(1847);
            setSpotsLeft(3);
            setRolloverCount(0);
            setTotalBankFees(0);
          }}
          className="w-full mt-8 bg-green-500 text-white font-bold py-4 rounded-lg text-2xl hover:bg-green-600 transition-all duration-300 shadow-lg"
        >
          Submit Application
        </button>
      </div>
    </div>
  );

  const renderCompleteSimulation = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-black text-gray-800 mb-2">
          Simulation Complete!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for completing the simulation. You have successfully
          interacted with an exploitative payday loan website.
        </p>
        <p className="text-gray-600 mb-8">
          The simulation demonstrated several predatory lending practices:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li>Progressive disclosure and drip pricing</li>
          <li>Fake urgency and scarcity</li>
          <li>Pre-selected add-ons and hidden fees</li>
          <li>ACH exploitation and rollover traps</li>
          <li>Deceptive APR and fees</li>
          <li>Social proof and trust building</li>
          <li>Identity verification and reference traps</li>
        </ul>
        <p className="text-gray-600 mb-8">
          You can restart the simulation or explore other educational modules.
        </p>
        <button
          onClick={() => setCurrentStep("homepage")}
          className="w-full bg-blue-500 text-white font-bold py-4 rounded-lg text-2xl hover:bg-blue-600 transition-all duration-300 shadow-lg"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case "homepage":
        return renderHomepage();
      case "basic_info":
        return renderBasicInfo();
      case "financial_info":
        return renderFinancialInfo();
      case "verification":
        return renderVerification();
      case "addons":
        return renderLoanTerms();
      case "rollover_trap":
        return renderRolloverTrap();
      case "review_and_submit":
        return renderReviewAndSubmit();
      case "complete_simulation":
        return renderCompleteSimulation();
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default Phase1ExploitativeWebsite;
