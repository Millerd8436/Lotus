import React, { useState } from 'react';

interface IncomeVerificationSimulatorProps {
  onVerificationComplete?: (data: VerificationResult) => void;
  vulnerabilityScore?: number;
}

interface BankCredentials {
  username: string;
  password: string;
  bankName: string;
}

interface DocumentUpload {
  type: 'paystub' | 'tax_return' | 'bank_statement';
  file: File | null;
  status: 'pending' | 'uploading' | 'verified' | 'rejected';
}

interface VerificationResult {
  method: 'bank_login' | 'document_upload' | 'employer_contact';
  income_verified: number;
  employment_status: string;
  risk_assessment: string;
  approval_likelihood: number;
}

const IncomeVerificationSimulator: React.FC<IncomeVerificationSimulatorProps> = ({
  onVerificationComplete,
  vulnerabilityScore = 5
}) => {
  const [verificationMethod, setVerificationMethod] = useState<string>('bank_login');
  const [bankCredentials, setBankCredentials] = useState<BankCredentials>({
    username: '',
    password: '',
    bankName: ''
  });
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { type: 'paystub', file: null, status: 'pending' },
    { type: 'bank_statement', file: null, status: 'pending' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [verificationComplete, setVerificationComplete] = useState(false);

  const popularBanks = [
    'Chase Bank', 'Bank of America', 'Wells Fargo', 'Citibank',
    'Capital One', 'PNC Bank', 'TD Bank', 'US Bank'
  ];

  const simulateVerificationProcess = async (method: string) => {
    setIsProcessing(true);
    
    const steps = [
      'Connecting to verification service...',
      'Validating credentials...',
      'Accessing account information...',
      'Analyzing income patterns...',
      'Calculating employment stability...',
      'Generating risk assessment...',
      'Finalizing verification...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i] || '');
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Simulate verification result
    const result: VerificationResult = {
      method: method as any,
      income_verified: 2800 + Math.floor(Math.random() * 1000),
      employment_status: 'Full-time verified',
      risk_assessment: vulnerabilityScore > 6 ? 'High value target' : 'Standard risk',
      approval_likelihood: Math.max(75, 95 - vulnerabilityScore * 2)
    };

    setIsProcessing(false);
    setVerificationComplete(true);
    onVerificationComplete?.(result);
  };

  const handleBankLogin = () => {
    if (!bankCredentials.username || !bankCredentials.password || !bankCredentials.bankName) {
      alert('Please fill in all bank credentials');
      return;
    }
    simulateVerificationProcess('bank_login');
  };

  const handleDocumentUpload = (type: DocumentUpload['type'], file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.type === type 
        ? { ...doc, file, status: 'uploading' as const }
        : doc
    ));

    // Simulate upload process
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.type === type 
          ? { ...doc, status: 'verified' as const }
          : doc
      ));
    }, 2000);
  };

  const canProceedWithDocuments = documents.every(doc => doc.status === 'verified');

  return (
    <div className="income-verification-simulator" style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        color: 'white',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', fontWeight: 'bold' }}>
          📋 Income Verification Required
        </h2>
        <p style={{ margin: 0, fontSize: '1rem', opacity: 0.9 }}>
          Quick verification to ensure you get the best rates available
        </p>
      </div>

      {!isProcessing && !verificationComplete && (
        <>
          {/* Verification Method Selection */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.3rem', fontWeight: 'bold' }}>
              Choose Verification Method
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                border: verificationMethod === 'bank_login' ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                background: verificationMethod === 'bank_login' ? '#f0f9ff' : 'white'
              }}>
                <input
                  type="radio"
                  name="verification"
                  value="bank_login"
                  checked={verificationMethod === 'bank_login'}
                  onChange={(e) => setVerificationMethod(e.target.value)}
                  style={{ marginRight: '0.75rem' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    🏦 Instant Bank Verification (Recommended)
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    Securely connect your bank account for instant approval
                  </div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                border: verificationMethod === 'documents' ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                background: verificationMethod === 'documents' ? '#f0f9ff' : 'white'
              }}>
                <input
                  type="radio"
                  name="verification"
                  value="documents"
                  checked={verificationMethod === 'documents'}
                  onChange={(e) => setVerificationMethod(e.target.value)}
                  style={{ marginRight: '0.75rem' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    📄 Document Upload
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    Upload pay stubs or bank statements (slower approval)
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Bank Login Method */}
          {verificationMethod === 'bank_login' && (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
                🔒 Secure Bank Login
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Select Your Bank
                </label>
                <select
                  value={bankCredentials.bankName}
                  onChange={(e) => setBankCredentials(prev => ({ ...prev, bankName: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Choose your bank...</option>
                  {popularBanks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              {bankCredentials.bankName && (
                <>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Online Banking Username
                    </label>
                    <input
                      type="text"
                      value={bankCredentials.username}
                      onChange={(e) => setBankCredentials(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="Enter your online banking username"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Password
                    </label>
                    <input
                      type="password"
                      value={bankCredentials.password}
                      onChange={(e) => setBankCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your banking password"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{
                    background: '#f9fafb',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    color: '#374151'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ marginRight: '0.5rem' }}>🔒</span>
                      <strong>Bank-Level Security</strong>
                    </div>
                    <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
                      <li>256-bit SSL encryption</li>
                      <li>Read-only access to verify income</li>
                      <li>No storage of banking credentials</li>
                    </ul>
                  </div>

                  <button
                    onClick={handleBankLogin}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    🚀 Verify Income Instantly
                  </button>
                </>
              )}
            </div>
          )}

          {/* Document Upload Method */}
          {verificationMethod === 'documents' && (
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
                📄 Upload Income Documents
              </h3>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {documents.map((doc) => (
                  <div key={doc.type} style={{
                    padding: '1.5rem',
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', textTransform: 'capitalize' }}>
                        {doc.type.replace('_', ' ')}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                        {doc.type === 'paystub' && 'Most recent pay stub (last 30 days)'}
                        {doc.type === 'bank_statement' && 'Last 2 months of bank statements'}
                      </p>
                    </div>

                    {doc.status === 'pending' && (
                      <label style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: '#4f46e5',
                        color: 'white',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}>
                        Choose File
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleDocumentUpload(doc.type, file);
                            }
                          }}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}

                    {doc.status === 'uploading' && (
                      <div style={{ color: '#f59e0b' }}>
                        ⏳ Uploading...
                      </div>
                    )}

                    {doc.status === 'verified' && (
                      <div style={{ color: '#10b981' }}>
                        ✅ Verified - {doc.file?.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {canProceedWithDocuments && (
                <button
                  onClick={() => simulateVerificationProcess('document_upload')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'linear-gradient(90deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '1.5rem'
                  }}
                >
                  📋 Process Document Verification
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* Processing Animation */}
      {isProcessing && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #4f46e5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem auto'
          }} />
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', fontWeight: 'bold' }}>
            Verifying Your Income...
          </h3>
          <p style={{ margin: 0, fontSize: '1rem', color: '#666' }}>
            {processingStep}
          </p>
        </div>
      )}

      {/* Verification Complete */}
      {verificationComplete && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
              Income Verification Complete!
            </h3>
            <p style={{ margin: 0, fontSize: '1rem', color: '#666' }}>
              Your application is now being processed with verified income data
            </p>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default IncomeVerificationSimulator; 