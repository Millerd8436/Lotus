import React, { useState } from 'react';

interface ElectronicSignatureSimulatorProps {
  loanTerms?: LoanTerms;
  onSignatureComplete?: (signatureData: SignatureData) => void;
}

interface LoanTerms {
  principal: number;
  fees: number;
  apr: number;
  term_days: number;
  total_due: number;
  due_date: string;
}

interface SignatureData {
  signature_captured: boolean;
  timestamp: string;
  ip_address: string;
  user_agent: string;
  consent_agreements: string[];
  ach_authorization: boolean;
  rollover_consent: boolean;
}

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  requires_signature: boolean;
  requires_initial: boolean;
  signed: boolean;
  critical: boolean;
}

const ElectronicSignatureSimulator: React.FC<ElectronicSignatureSimulatorProps> = ({
  loanTerms = {
    principal: 300,
    fees: 195,
    apr: 664,
    term_days: 14,
    total_due: 495,
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
  },
  onSignatureComplete
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [signatureDrawn, setSignatureDrawn] = useState(false);
  const [_isDrawing, _setIsDrawing] = useState(false);
  const [signaturePath, setSignaturePath] = useState('');
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [showFinalReview, setShowFinalReview] = useState(false);

  const documentSections: DocumentSection[] = [
    {
      id: 'loan_agreement',
      title: 'Loan Agreement Terms',
      content: `PAYDAY LOAN AGREEMENT

Principal Amount: $${loanTerms.principal}
Finance Charge: $${loanTerms.fees}
Total Amount Due: $${loanTerms.total_due}
Due Date: ${loanTerms.due_date}

Annual Percentage Rate (APR): ${loanTerms.apr}%

By signing below, you agree to repay the full amount on the due date. If payment fails, additional fees may apply.`,
      requires_signature: true,
      requires_initial: false,
      signed: false,
      critical: true
    },
    {
      id: 'ach_authorization',
      title: 'ACH Payment Authorization',
      content: `AUTOMATED CLEARING HOUSE (ACH) AUTHORIZATION

I authorize the Lender to electronically debit my account for loan payments and any applicable fees. This includes:

• Initial loan repayment on due date
• Additional attempts if first payment fails
• Late fees, NSF fees, and collection costs
• Any rollover or extension fees

I understand that multiple withdrawal attempts may be made, and I may be charged bank fees for each attempt.

WARNING: This authorization allows the lender to withdraw money from your account multiple times.`,
      requires_signature: false,
      requires_initial: true,
      signed: false,
      critical: true
    },
    {
      id: 'rollover_consent',
      title: 'Rollover and Extension Agreement',
      content: `LOAN ROLLOVER AUTHORIZATION

If I cannot repay my loan on the due date, I authorize the Lender to automatically roll over my loan for an additional fee of $50 per rollover.

Key Terms:
• Rollover fee: $50 (added to principal)
• Principal amount remains unchanged
• New due date: 14 days from rollover
• No limit on number of rollovers
• I can opt out by calling before due date

Research shows 80% of payday loans are rolled over within 2 weeks, and borrowers typically pay more in fees than the original loan amount.

By initialing, I consent to automatic rollovers.`,
      requires_signature: false,
      requires_initial: true,
      signed: false,
      critical: true
    },
    {
      id: 'disclosures',
      title: 'Required Disclosures and Warnings',
      content: `IMPORTANT DISCLOSURES

DEBT TRAP WARNING: Payday loans are designed for short-term financial needs. Taking out multiple loans or rolling over loans can lead to a cycle of debt.

ALTERNATIVES AVAILABLE:
• Credit union payday alternative loans (28% APR)
• Employee advance programs
• Community assistance programs
• Payment plans with creditors

YOUR RIGHTS:
• You have the right to cancel this loan by 5:00 PM the next business day
• You cannot be criminally prosecuted for non-payment
• Complaints can be filed with state regulators

MILITARY PERSONNEL: This loan may violate Military Lending Act protections.

This loan has a ${loanTerms.apr}% APR. For comparison, credit cards typically have 18-29% APR.`,
      requires_signature: true,
      requires_initial: false,
      signed: false,
      critical: false
    }
  ];

  const [sections, setSections] = useState(documentSections);

  const handleSectionComplete = (sectionIndex: number, _type: 'signature' | 'initial') => {
    const newCompletedSections = new Set(completedSections);
    newCompletedSections.add(sectionIndex);
    setCompletedSections(newCompletedSections);

    setSections(prev => prev.map((section, index) => 
      index === sectionIndex ? { ...section, signed: true } : section
    ));

    // Move to next section or final review
    if (sectionIndex < sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    } else {
      setShowFinalReview(true);
    }
  };

  const handleSignatureCapture = () => {
    setSignatureDrawn(true);
    // Simulate signature path
    setSignaturePath('M10,50 Q50,10 90,50 T170,50');
  };

  const completeSigningProcess = () => {
    const signatureData: SignatureData = {
      signature_captured: true,
      timestamp: new Date().toISOString(),
      ip_address: '192.168.1.100',
      user_agent: navigator.userAgent,
      consent_agreements: sections.map(s => s.id),
      ach_authorization: true,
      rollover_consent: true
    };

    onSignatureComplete?.(signatureData);
  };

  const allSectionsSigned = sections.every(section => section.signed);

  return (
    <div className="electronic-signature-simulator" style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', fontWeight: 'bold' }}>
          ✍️ Electronic Document Signing
        </h2>
        <p style={{ margin: 0, fontSize: '1rem', opacity: 0.9 }}>
          Please review and sign your loan documents to complete your application
        </p>
      </div>

      {!showFinalReview ? (
        <>
          {/* Progress Bar */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                Document {currentSection + 1} of {sections.length}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                {Math.round(((currentSection) / sections.length) * 100)}% Complete
              </span>
            </div>
            <div style={{
              background: '#f0f0f0',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
                height: '100%',
                width: `${((currentSection) / sections.length) * 100}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Document Section */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: sections[currentSection]?.critical ? '2px solid #ef4444' : '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 'bold' }}>
                {sections[currentSection]?.title}
              </h3>
              {sections[currentSection]?.critical && (
                <span style={{
                  background: '#ef4444',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  marginLeft: '1rem'
                }}>
                  CRITICAL
                </span>
              )}
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              whiteSpace: 'pre-line',
              fontFamily: 'Courier, monospace'
            }}>
              {sections[currentSection]?.content}
            </div>

            {/* Signature Area */}
            {sections[currentSection]?.requires_signature && (
              <div style={{
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                padding: '2rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>
                  Electronic Signature Required
                </h4>
                
                {!signatureDrawn ? (
                  <div>
                    <div style={{
                      background: '#f9fafb',
                      border: '1px solid #d1d5db',
                      height: '120px',
                      borderRadius: '6px',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }} onClick={handleSignatureCapture}>
                      <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                        Click here to draw your signature
                      </span>
                    </div>
                    <button
                      onClick={handleSignatureCapture}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: '#1e40af',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      ✍️ Draw Signature
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      background: '#f0f9ff',
                      border: '1px solid #0ea5e9',
                      height: '120px',
                      borderRadius: '6px',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="200" height="80">
                        <path d={signaturePath} stroke="#1e40af" strokeWidth="2" fill="none" />
                        <text x="10" y="70" fontSize="16" fill="#1e40af" fontFamily="cursive">
                          {/* Simulate signature */}
                          John Doe
                        </text>
                      </svg>
                    </div>
                    <button
                      onClick={() => handleSectionComplete(currentSection, 'signature')}
                      style={{
                        padding: '0.75rem 2rem',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      ✅ Accept and Continue
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Initial Area */}
            {sections[currentSection]?.requires_initial && (
              <div style={{
                border: '2px dashed #f59e0b',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>
                  Initial Required
                </h4>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#666' }}>
                  By initialing below, you acknowledge you have read and understand this section
                </p>
                <button
                  onClick={() => handleSectionComplete(currentSection, 'initial')}
                  style={{
                    padding: '0.75rem 2rem',
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  📝 Add Initial & Continue
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Final Review */
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 2rem 0', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
            📋 Final Document Review
          </h3>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Documents Signed:
            </h4>
            {sections.map((section, _index) => (
              <div key={section.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem',
                background: section.signed ? '#f0f9ff' : '#fef2f2',
                border: `1px solid ${section.signed ? '#0ea5e9' : '#ef4444'}`,
                borderRadius: '6px',
                marginBottom: '0.5rem'
              }}>
                <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>
                  {section.signed ? '✅' : '❌'}
                </span>
                <span style={{ fontWeight: '600' }}>{section.title}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: '#f9fafb',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
              Loan Summary:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div><strong>Principal:</strong> ${loanTerms.principal}</div>
              <div><strong>Fees:</strong> ${loanTerms.fees}</div>
              <div><strong>Total Due:</strong> ${loanTerms.total_due}</div>
              <div><strong>APR:</strong> {loanTerms.apr}%</div>
              <div><strong>Due Date:</strong> {loanTerms.due_date}</div>
            </div>
          </div>

          {allSectionsSigned ? (
            <button
              onClick={completeSigningProcess}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(90deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🎉 Complete Electronic Signing Process
            </button>
          ) : (
            <div style={{
              padding: '1rem',
              background: '#fef2f2',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#dc2626'
            }}>
              ⚠️ Please complete all document signatures before proceeding
            </div>
          )}
        </div>
      )}

      {/* Educational Overlay */}
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
        <strong>🎓 Educational: E-Signature Process</strong>
        <br />• Document {currentSection + 1} of {sections.length}
        <br />• Predatory clauses highlighted
        <br />• Legal alternatives available
        <br />• Notice: Real signatures have legal consequences
      </div>
    </div>
  );
};

export default ElectronicSignatureSimulator; 