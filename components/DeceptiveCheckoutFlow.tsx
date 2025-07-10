import React, { useCallback, useEffect, useState } from 'react';

/**
 * DeceptiveCheckoutFlow - Comprehensive Predatory Checkout Component
 * 
 * Realistic simulation of actual payday loan website checkout flows based on research:
 * - Hero section with "Instant $100-$1,000 - No Credit Check" headlines
 * - Simple 3-field form overlay that becomes 15+ fields across multiple steps
 * - Trust badges and fake social proof with real-time customer activity
 * - Interactive slider/calculator hiding true APR until final step
 * - Fake urgency with countdown timers and artificial scarcity
 * - Pre-selected harmful add-ons with confirm-shaming language
 * - Roach motel pattern (easy to enter, impossible to exit)
 * - Progressive fee revelation (drip pricing)
 * - ACH authorization trickery and multi-account access
 * - Vulnerability targeting based on income/employment data
 * 
 * Consolidates: FastEntryForm, SocialProof, DarkPatternUI components
 * and implements actual predatory UI patterns from real payday loan sites
 */

interface CheckoutStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  deceptiveTactic: string;
  progressLabel: string;
  cancelDifficulty: number;
}

interface FormField {
  name: string;
  type: string;
  placeholder?: string;
  required: boolean;
  preChecked?: boolean;
  label: string;
  hidden?: boolean;
  deceptiveLabel?: string;
}

interface Fee {
  label: string;
  amount: number;
  type: 'principal' | 'fee' | 'optional' | 'penalty' | 'hidden';
  revealed: boolean;
  justification: string;
  color: string;
}

const DeceptiveCheckoutFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [cancelAttempts, setCancelAttempts] = useState(0);
  const [showCancelWarning, setShowCancelWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1847); // Fake urgency timer
  const [fees, setFees] = useState<Fee[]>([]);
  const [_achExploitationActive, _setAchExploitationActive] = useState(false);
  const [vulnerabilityScore, setVulnerabilityScore] = useState(0);

  // Realistic predatory checkout steps mirroring actual payday loan sites
  const checkoutSteps: CheckoutStep[] = [
    {
      id: 'hero_quick_form',
      title: '💰 INSTANT CASH $100-$1,000 - NO CREDIT CHECK!',
      description: 'Get approved in minutes! Just enter 4 quick details:',
      progressLabel: 'Quick Start (1/8)',
      cancelDifficulty: 0,
      deceptiveTactic: 'Bait with simplicity - hide actual 25+ field requirement',
      fields: [
        { name: 'name', type: 'text', label: 'Full Name', placeholder: 'John Smith', required: true },
        { name: 'phone', type: 'tel', label: 'Phone Number', placeholder: '(555) 123-4567', required: true },
        { name: 'zipCode', type: 'text', label: 'ZIP Code', placeholder: '75201', required: true },
        { name: 'loanAmount', type: 'select', label: 'How much do you need?', placeholder: '$300', required: true }
      ]
    },
    {
      id: 'contact_details',
      title: 'Great! Let us contact you with approval details',
      description: 'Quick contact verification for instant approval',
      progressLabel: 'Contact Info (2/8)',
      cancelDifficulty: 1,
      deceptiveTactic: 'Progressive disclosure - innocent contact becomes invasive',
      fields: [
        { name: 'email', type: 'email', label: 'Email Address', placeholder: 'john@email.com', required: true },
        { name: 'workPhone', type: 'tel', label: 'Work Phone', placeholder: '(555) 987-6543', required: true },
        { name: 'homeAddress', type: 'text', label: 'Home Address', placeholder: '123 Main St', required: true },
        { name: 'city', type: 'text', label: 'City', placeholder: 'Dallas', required: true },
        { name: 'state', type: 'select', label: 'State', placeholder: 'TX', required: true },
        { name: 'timeAtAddress', type: 'select', label: 'Time at Address', placeholder: '2+ years', required: true },
        { name: 'housingStatus', type: 'select', label: 'Housing Status', placeholder: 'Rent', required: true }
      ]
    },
    {
      id: 'income_verification',
      title: 'Income Verification - Unlock Higher Amounts!',
      description: 'Verify income to qualify for up to $1,000 instantly',
      progressLabel: 'Income Details (3/8)',
      cancelDifficulty: 1,
      deceptiveTactic: 'Progressive disclosure - promised few fields becomes many',
      fields: [
        { name: 'dateOfBirth', type: 'date', label: 'Date of Birth', required: true },
        { name: 'monthlyIncome', type: 'number', label: 'Monthly Income', placeholder: '$2,500', required: true },
        { name: 'employmentStatus', type: 'select', label: 'Employment Status', placeholder: 'Full-time', required: true },
        { name: 'employerName', type: 'text', label: 'Employer Name', placeholder: 'ABC Company', required: true },
        { name: 'workAddress', type: 'text', label: 'Work Address', placeholder: '456 Business Blvd', required: true },
        { name: 'payFrequency', type: 'select', label: 'Pay Frequency', placeholder: 'Bi-weekly', required: true },
        { name: 'nextPayDate', type: 'date', label: 'Next Pay Date', required: true },
        { name: 'timeAtJob', type: 'select', label: 'Time at Current Job', placeholder: '1+ years', required: true },
        { name: 'directDeposit', type: 'checkbox', label: 'I receive direct deposit', required: false, preChecked: true, deceptiveLabel: 'Required for instant funding' }
      ]
    },
    {
      id: 'financial_details',
      title: 'Banking & Financial Information',
      description: 'Secure bank verification for fast funding',
      progressLabel: 'Banking Info (4/8)',
      cancelDifficulty: 2,
      deceptiveTactic: 'Privacy erosion - extensive financial data collection',
      fields: [
        { name: 'bankName', type: 'select', label: 'Bank Name', placeholder: 'Chase Bank', required: true },
        { name: 'accountType', type: 'select', label: 'Account Type', placeholder: 'Checking', required: true },
        { name: 'routingNumber', type: 'text', label: 'Routing Number', placeholder: '111000025', required: true },
        { name: 'accountNumber', type: 'text', label: 'Account Number', placeholder: '1234567890', required: true },
        { name: 'monthsWithBank', type: 'select', label: 'Months with Bank', placeholder: '12+ months', required: true },
        { name: 'monthlyExpenses', type: 'number', label: 'Monthly Expenses', placeholder: '$1,800', required: true },
        { name: 'otherIncome', type: 'number', label: 'Other Income Sources', placeholder: '$0', required: false },
        { name: 'creditScore', type: 'select', label: 'Credit Score Range', placeholder: 'Fair (580-669)', required: false, deceptiveLabel: 'Optional - for better rates' }
      ]
    },
    {
      id: 'identity_verification',
      title: 'Identity Security Verification',
      description: 'Protect your loan with identity verification',
      progressLabel: 'Identity Check (5/8)',
      cancelDifficulty: 2,
      deceptiveTactic: 'Sunk cost fallacy - too invested to quit now',
      fields: [
        { name: 'ssn', type: 'text', label: 'Social Security Number', placeholder: 'XXX-XX-1234', required: true },
        { name: 'driversLicense', type: 'text', label: 'Driver\'s License Number', placeholder: 'DL123456789', required: true },
        { name: 'dlState', type: 'select', label: 'License State', placeholder: 'TX', required: true },
        { name: 'motherMaiden', type: 'text', label: 'Mother&apos;s Maiden Name', placeholder: 'Security question', required: true },
        { name: 'militaryStatus', type: 'select', label: 'Military Status', placeholder: 'Civilian', required: false, deceptiveLabel: 'For special rates' }
      ]
    },
    {
      id: 'references_contacts',
      title: 'Emergency Contacts & References',
      description: 'Provide contacts for loan approval and safety',
      progressLabel: 'References (6/8)',
      cancelDifficulty: 2,
      deceptiveTactic: 'Contact harvesting for collection and harassment',
      fields: [
        { name: 'reference1Name', type: 'text', label: 'Reference 1: Full Name', placeholder: 'Jane Smith', required: true },
        { name: 'reference1Phone', type: 'tel', label: 'Reference 1: Phone', placeholder: '(555) 111-2222', required: true },
        { name: 'reference1Relationship', type: 'select', label: 'Relationship', placeholder: 'Friend', required: true },
        { name: 'reference2Name', type: 'text', label: 'Reference 2: Full Name', placeholder: 'Bob Johnson', required: true },
        { name: 'reference2Phone', type: 'tel', label: 'Reference 2: Phone', placeholder: '(555) 333-4444', required: true },
        { name: 'reference2Relationship', type: 'select', label: 'Relationship', placeholder: 'Family', required: true },
        { name: 'emergencyContact', type: 'text', label: 'Emergency Contact', placeholder: 'Name and phone', required: true },
        { name: 'supervisorContact', type: 'text', label: 'Work Supervisor Contact', placeholder: 'Manager name and phone', required: false, deceptiveLabel: 'Speeds approval' }
      ]
    },
    {
      id: 'add_ons_upsells',
      title: 'Loan Protection & Services',
      description: 'Recommended add-ons for your protection',
      progressLabel: 'Protection (7/8)',
      cancelDifficulty: 3,
      deceptiveTactic: 'Pre-selected expensive add-ons with deceptive labeling',
      fields: [
        { name: 'loanInsurance', type: 'checkbox', label: 'Loan Protection Insurance ($25)', required: false, preChecked: true, deceptiveLabel: 'Highly recommended' },
        { name: 'expressProcessing', type: 'checkbox', label: 'Express Same-Day Processing ($30)', required: false, preChecked: true, deceptiveLabel: 'Most popular' },
        { name: 'creditReporting', type: 'checkbox', label: 'Report to Credit Bureaus ($15)', required: false, preChecked: true, deceptiveLabel: 'Build credit' },
        { name: 'paymentReminders', type: 'checkbox', label: 'SMS Payment Reminders ($10)', required: false, preChecked: true, deceptiveLabel: 'Avoid late fees' },
        { name: 'rolloverProtection', type: 'checkbox', label: 'Auto-Rollover Protection ($5/month)', required: false, preChecked: true, deceptiveLabel: 'Never miss payments' },
        { name: 'identityGuard', type: 'checkbox', label: 'Identity Monitoring Service ($20)', required: false, preChecked: false, deceptiveLabel: 'Limited time offer' }
      ]
    },
    {
      id: 'authorization_complete',
      title: 'Final Authorization & Terms',
      description: 'Review terms and complete your application',
      progressLabel: 'Complete (8/8)',
      cancelDifficulty: 3,
      deceptiveTactic: 'Buried terms, pre-checked exploitative authorizations',
      fields: [
        { name: 'achAuthorization', type: 'checkbox', label: 'I authorize ACH withdrawals for loan repayment', required: true, preChecked: true },
        { name: 'achMultipleAttempts', type: 'checkbox', label: 'Allow multiple withdrawal attempts if first payment fails', required: false, preChecked: true, deceptiveLabel: 'Recommended for approval' },
        { name: 'achSavingsAccess', type: 'checkbox', label: 'Authorize access to savings account if checking fails', required: false, preChecked: true, deceptiveLabel: 'Backup protection' },
        { name: 'dataSharing', type: 'checkbox', label: 'Share my information with 500+ partner lenders for better rates', required: false, preChecked: true, deceptiveLabel: 'Improves approval odds' },
        { name: 'autoRenewal', type: 'checkbox', label: 'Enable auto-renewal for convenience', required: false, preChecked: true, deceptiveLabel: 'Can disable anytime' },
        { name: 'rolloverAuthorization', type: 'checkbox', label: 'Pre-authorize automatic rollover if payment fails ($50 fee)', required: false, preChecked: true, deceptiveLabel: 'Prevents late fees' },
        { name: 'phoneConsent', type: 'checkbox', label: 'Consent to phone calls, SMS, and emails from us and partners', required: false, preChecked: true },
        { name: 'creditReportAuth', type: 'checkbox', label: 'Authorize soft & hard credit report access', required: false, preChecked: true, deceptiveLabel: 'Required for best rates' },
        { name: 'employerContact', type: 'checkbox', label: 'Authorize contact with employer for verification', required: false, preChecked: true, deceptiveLabel: 'Speeds approval process' },
        { name: 'referenceContact', type: 'checkbox', label: 'Allow contact with references if payment issues arise', required: false, preChecked: true, deceptiveLabel: 'Standard procedure' },
        { name: 'legalArbitration', type: 'checkbox', label: 'Agree to binding arbitration and waive right to jury trial', required: true, preChecked: true, deceptiveLabel: 'Legal requirement' },
        { name: 'electronicSignature', type: 'checkbox', label: 'Electronic signature has same legal effect as handwritten signature', required: true, preChecked: true }
      ]
    }
  ];

  // Progressive fee revelation based on research
  const initializeFees = () => {
    const baseFees: Fee[] = [
      { label: 'Loan Amount', amount: 300, type: 'principal', revealed: true, justification: 'Your requested amount', color: '#4caf50' },
      { label: 'Simple Fee', amount: 45, type: 'fee', revealed: true, justification: 'One-time processing fee', color: '#ff9800' },
      { label: 'Verification Fee', amount: 25, type: 'hidden', revealed: false, justification: 'Identity verification required', color: '#ff5722' },
      { label: 'ACH Setup Fee', amount: 15, type: 'hidden', revealed: false, justification: 'Bank connection setup', color: '#ff5722' },
      { label: 'Risk Assessment', amount: 35, type: 'hidden', revealed: false, justification: 'Automated risk evaluation', color: '#f44336' },
      { label: 'Platform Fee', amount: 20, type: 'hidden', revealed: false, justification: 'System maintenance', color: '#f44336' },
      { label: 'Insurance (Pre-selected)', amount: 25, type: 'optional', revealed: false, justification: 'Loan protection insurance', color: '#9c27b0' },
      { label: 'Express Processing', amount: 30, type: 'optional', revealed: false, justification: 'Same-day funding', color: '#9c27b0' },
      { label: 'Late Payment Fee', amount: 40, type: 'penalty', revealed: false, justification: 'If payment is late', color: '#d32f2f' },
      { label: 'Rollover Fee', amount: 50, type: 'penalty', revealed: false, justification: 'If loan is extended', color: '#d32f2f' },
      { label: 'NSF Fee (Per Attempt)', amount: 35, type: 'penalty', revealed: false, justification: 'Bank rejection fee', color: '#d32f2f' }
    ];
    setFees(baseFees);
  };

  // Calculate vulnerability score based on form data
  const calculateVulnerabilityScore = useCallback(() => {
    let score = 0;
    const income = parseInt(formData.income?.replace(/\D/g, '') || '0');
    
    // Research indicators of vulnerability
    if (income < 2000) {
      score += 3; // Low income
    }
    if (formData.employment?.toLowerCase().includes('part') || formData.employment?.toLowerCase().includes('temp')) {
      score += 2; // Unstable employment
    }
    if (formData.bankName?.toLowerCase().includes('check') || formData.bankName?.toLowerCase().includes('cash')) {
      score += 2; // Underbanked
    }
    if (currentStep >= 2) {
      score += 1; // Desperation (continuing despite complexity)
    }
    
    setVulnerabilityScore(score);
  }, [formData.income, formData.employment, formData.bankName, currentStep]);

  // Urgency timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Progressive fee revelation
  useEffect(() => {
    if (currentStep >= 1) {
      setFees(prev => prev.map(fee => 
        fee.type === 'hidden' && ['Verification Fee', 'ACH Setup Fee'].includes(fee.label) 
          ? { ...fee, revealed: true } : fee
      ));
    }
    if (currentStep >= 2) {
      setFees(prev => prev.map(fee => 
        fee.type === 'hidden' && ['Risk Assessment', 'Platform Fee'].includes(fee.label) 
          ? { ...fee, revealed: true } : fee
      ));
    }
    if (currentStep >= 3) {
      setFees(prev => prev.map(fee => 
        fee.type === 'optional' || fee.type === 'penalty' 
          ? { ...fee, revealed: true } : fee
      ));
    }
  }, [currentStep]);

  // Initialize fees on mount
  useEffect(() => {
    initializeFees();
  }, []);

  // Update vulnerability score when form data changes
  useEffect(() => {
    calculateVulnerabilityScore();
  }, [calculateVulnerabilityScore]);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < checkoutSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleCancel = () => {
    const currentStepData = checkoutSteps[currentStep];
    setCancelAttempts(prev => prev + 1);
    
    if (currentStepData && cancelAttempts < currentStepData.cancelDifficulty) {
      setShowCancelWarning(true);
    } else {
      // Roach Motel Pattern - Make leaving extremely difficult
      if (cancelAttempts >= 3) {
        alert('⚠️ FINAL WARNING: Your pre-approval will be permanently lost. Customer service will call you within 24 hours to discuss this decision.');
      }
      // Reset form
      setCurrentStep(0);
      setFormData({});
      setCancelAttempts(0);
      setShowCancelWarning(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateTotal = () => {
    return fees.filter(fee => fee.revealed).reduce((sum, fee) => sum + fee.amount, 0);
  };

  const calculateAPR = () => {
    const principal = 300;
    const totalFees = fees.filter(fee => fee.revealed && fee.type !== 'principal').reduce((sum, fee) => sum + fee.amount, 0);
    const termDays = 14;
    const apr = (totalFees / principal) * (365 / termDays) * 100;
    return Math.round(apr);
  };

  const currentStepData = checkoutSteps[currentStep];
  const revealedFees = fees.filter(fee => fee.revealed);
  const totalAmount = calculateTotal();
  const apr = calculateAPR();

  // Safety check for currentStepData
  if (!currentStepData) {
    return <div>Error: Invalid checkout step</div>;
  }

  return (
    <div className="deceptive-checkout-flow" style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      {/* Fake urgency timer */}
      <div style={{
        background: 'linear-gradient(90deg, #ff1744, #ff5722)',
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '1rem',
        boxShadow: '0 4px 15px rgba(255, 23, 68, 0.3)'
      }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          ⏰ Limited Time Pre-Approval Expires In: {formatTime(timeLeft)}
        </div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          This exclusive offer may not be available again!
        </div>
      </div>

      {/* Social proof banner */}
      <div style={{
        background: '#f3f4f6',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1rem',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ fontSize: '0.9rem', color: '#374151' }}>
          🔥 <strong>347 people</strong> applied in the last hour • <strong>Sarah from Dallas</strong> just got approved for $500
        </div>
      </div>

      {/* Main form */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '2px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
            {currentStepData.title}
          </h2>
          <div style={{
            background: '#4caf50',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: '600'
          }}>
            {currentStepData.progressLabel}
          </div>
        </div>

        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          {currentStepData.description}
        </p>

        {/* Form fields */}
        <div style={{ marginBottom: '1.5rem' }}>
          {currentStepData.fields.map((field) => (
            <div key={field.name} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                {field.label} {field.required && <span style={{ color: '#f44336' }}>*</span>}
                {field.deceptiveLabel && (
                  <span style={{ fontSize: '0.8rem', color: '#4caf50', marginLeft: '0.5rem' }}>
                    ({field.deceptiveLabel})
                  </span>
                )}
              </label>
              {field.type === 'checkbox' ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData[field.name] ?? field.preChecked}
                    onChange={(e) => handleInputChange(field.name, e.target.checked)}
                  />
                  <span style={{ fontSize: '0.9rem' }}>{field.label}</span>
                </label>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Fee breakdown */}
        {revealedFees.length > 0 && (
          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
              Loan Summary
            </h3>
            {revealedFees.map((fee) => (
              <div key={fee.label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid #e9ecef'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: fee.color
                  }} />
                  <span>{fee.label}</span>
                  {fee.type === 'optional' && (
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>(optional)</span>
                  )}
                </div>
                <span style={{ fontWeight: 'bold', color: fee.color }}>
                  ${fee.amount}
                </span>
              </div>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem 0 0 0',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              <span>Total Repayment:</span>
              <span style={{ color: apr > 300 ? '#f44336' : '#4caf50' }}>
                ${totalAmount}
              </span>
            </div>
            {apr > 0 && (
              <div style={{
                fontSize: '0.9rem',
                color: '#666',
                textAlign: 'center',
                marginTop: '0.5rem'
              }}>
                APR: {apr > 300 ? `${apr}%` : 'Competitive rate'}
              </div>
            )}
          </div>
        )}

        {/* Vulnerability targeting */}
        {vulnerabilityScore > 3 && (
          <div style={{
            background: '#fff3cd',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #ffeaa7'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#856404', fontWeight: '600' }}>
              🎯 Special Offer: Based on your profile, you qualify for emergency funding options!
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {currentStep > 0 && (
            <button
              onClick={handleCancel}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                background: '#f9fafb',
                color: '#374151',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {cancelAttempts > 0 ? 'Really Cancel?' : 'Cancel'}
            </button>
          )}
          <button
            onClick={handleNext}
            style={{
              flex: 2,
              padding: '0.75rem',
              border: 'none',
              borderRadius: '8px',
              background: currentStep === checkoutSteps.length - 1 
                ? 'linear-gradient(90deg, #4caf50, #45a049)'
                : 'linear-gradient(90deg, #ff5722, #ff9800)',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {currentStep === checkoutSteps.length - 1 ? 'Complete Application' : 'Continue'}
          </button>
        </div>

        {/* Progress indicator */}
        <div style={{
          marginTop: '1rem',
          fontSize: '0.8rem',
          color: '#666',
          textAlign: 'center'
        }}>
          ✅ {currentStep === 0 ? 'Almost done!' : 
               currentStep === 1 ? 'Great progress!' :
               currentStep === 2 ? 'Final step!' : 'Ready to fund!'}
        </div>
      </div>

      {/* Cancel warning modal */}
      {showCancelWarning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#f44336', marginBottom: '1rem' }}>
              ⚠️ Wait! Don't Miss Out!
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              You&apos;re about to lose your pre-approved status. This exclusive offer expires in {formatTime(timeLeft)} and cannot be recovered.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowCancelWarning(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: '#4caf50',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Continue
              </button>
              <button
                onClick={handleCancel}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: '#f9fafb',
                  color: '#374151',
                  cursor: 'pointer'
                }}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Educational overlay */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '1rem',
        borderRadius: '8px',
        fontSize: '0.8rem',
        maxWidth: '250px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        zIndex: 999
      }}>
        <strong>🎓 Educational: Dark Patterns Active</strong>
        <br />• {currentStepData.deceptiveTactic}
        <br />• Vulnerability Score: {vulnerabilityScore}/8
        <br />• Real APR: {apr}%
        <br />• Cancel Difficulty: {currentStepData.cancelDifficulty}/3
      </div>
    </div>
  );
};

export default DeceptiveCheckoutFlow; 