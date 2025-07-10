import React, { useState } from "react";

/**
 * PrivacyConsentForm - Implements privacy zuckering pattern with forced data collection
 * Dark patterns: Pre-checked consent, forced document uploads, invasive data collection
 */
const PrivacyConsentForm: React.FC<{ 
  onSubmit?: (data: any) => void;
  mode?: "predatory" | "ethical";
}> = ({ onSubmit, mode = "predatory" }) => {
  const [consent, setConsent] = useState({
    dataSharing: true, // Pre-checked trap
    marketingEmails: true, // Pre-checked trap
    phoneContact: true, // Pre-checked trap
    creditCheck: false,
    thirdPartySharing: true, // Pre-checked trap
    socialMediaScraping: true, // Pre-checked trap
    contactNetworking: true, // Pre-checked trap
  });

  const [uploads, setUploads] = useState({
    idDocument: null as File | null,
    bankStatement: null as File | null,
    payStub: null as File | null,
    utilityBill: null as File | null,
    socialSecurityCard: null as File | null,
    proofOfResidence: null as File | null,
  });

  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  const [showMoreRequirements, setShowMoreRequirements] = useState(false);

  const handleConsentChange = (key: string) => {
    setConsent(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleFileUpload = (key: string, file: File | null) => {
    setUploads(prev => ({ ...prev, [key]: file }));
  };

  const handleSubmit = () => {
    setSubmissionAttempts(prev => prev + 1);
    
    // Add friction - require more documents after failed attempts
    if (submissionAttempts === 0) {
      setShowMoreRequirements(true);
      // Professional notification instead of alert for realistic simulation
      return;
    }
    
    if (submissionAttempts === 1) {
      if (!uploads.socialSecurityCard) {
        // Professional requirement notice for realistic simulation
        return;
      }
    }
    
    // Check required consents (predatory requirements)
    if (!consent.dataSharing) {
      // Professional consent requirement for realistic simulation
      return;
    }

    onSubmit?.({
      consent,
      uploads: Object.keys(uploads).filter(key => uploads[key as keyof typeof uploads]),
      submissionAttempts,
      privacyViolationScore: calculatePrivacyViolationScore()
    });
  };

  const calculatePrivacyViolationScore = () => {
    let score = 0;
    if (consent.dataSharing) score += 20;
    if (consent.marketingEmails) score += 15;
    if (consent.phoneContact) score += 10;
    if (consent.thirdPartySharing) score += 25;
    if (consent.socialMediaScraping) score += 30;
    if (consent.contactNetworking) score += 20;
    
    // Add points for each document collected
    score += Object.values(uploads).filter(Boolean).length * 10;
    
    return score;
  };

  const requiredUploads = [
    { key: "idDocument", label: "Government ID *", required: true },
    { key: "bankStatement", label: "Bank Statement *", required: true },
    { key: "payStub", label: "Pay Stub *", required: true },
    { key: "utilityBill", label: "Utility Bill", required: false },
  ];

  const additionalUploads = [
    { key: "socialSecurityCard", label: "Social Security Card *", required: showMoreRequirements },
    { key: "proofOfResidence", label: "Proof of Residence *", required: showMoreRequirements },
  ];

  if (mode === "ethical") {
    return (
      <div style={{
        background: "#f0fdf4",
        padding: "1.5rem",
        borderRadius: "12px",
        border: "2px solid #16a34a",
        margin: "1rem 0"
      }}>
        <h3 style={{ color: "#16a34a", fontWeight: 700, marginBottom: "1rem" }}>
          🔒 Your Privacy is Protected
        </h3>
        
        <div style={{ marginBottom: "1rem", color: "#166534" }}>
          We collect only the minimum information required and never share your data without explicit consent.
        </div>
        
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
            <input
              type="checkbox"
              checked={consent.creditCheck}
              onChange={() => handleConsentChange('creditCheck')}
              style={{ marginRight: "0.5rem" }}
            />
            I consent to a soft credit check (will not affect credit score)
          </label>
        </div>
        
        <div style={{
          background: "#dcfce7",
          padding: "1rem",
          borderRadius: "8px",
          fontSize: "0.9rem",
          color: "#166534"
        }}>
          <strong>What we do NOT do:</strong>
          <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
            <li>Share your data with third parties</li>
            <li>Use your information for marketing</li>
            <li>Contact your employer or references</li>
            <li>Scrape your social media</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      margin: "1rem 0",
      border: "1px solid #e5e7eb"
    }}>
      <h3 style={{ fontWeight: 700, marginBottom: "1rem", color: "#333" }}>
        📄 Privacy & Consent (Required)
      </h3>
      
      <div style={{ fontSize: "0.9rem", color: "#059669", marginBottom: "1rem" }}>
        ✅ Your information is secure and encrypted
      </div>

      {/* Consent checkboxes - many pre-checked */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "#333" }}>
          Consent Options
        </h4>
        
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={consent.dataSharing}
              onChange={() => handleConsentChange('dataSharing')}
              style={{ marginRight: "0.5rem", marginTop: "0.25rem" }}
            />
            <span>
              <strong>Enhanced Network Approval</strong> - Share my information with our partner lenders to improve approval odds and get better rates
            </span>
          </label>
          
          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={consent.marketingEmails}
              onChange={() => handleConsentChange('marketingEmails')}
              style={{ marginRight: "0.5rem", marginTop: "0.25rem" }}
            />
            <span>
              <strong>Exclusive Financial Offers</strong> - Receive personalized deals and financial products via email
            </span>
          </label>
          
          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={consent.phoneContact}
              onChange={() => handleConsentChange('phoneContact')}
              style={{ marginRight: "0.5rem", marginTop: "0.25rem" }}
            />
            <span>
              <strong>Priority Customer Service</strong> - Allow phone calls and SMS for urgent updates and special offers
            </span>
          </label>
          
          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={consent.thirdPartySharing}
              onChange={() => handleConsentChange('thirdPartySharing')}
              style={{ marginRight: "0.5rem", marginTop: "0.25rem" }}
            />
            <span>
              <strong>Financial Services Network</strong> - Share data with insurance, credit, and financial service providers for complete financial wellness
            </span>
          </label>
          
          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={consent.socialMediaScraping}
              onChange={() => handleConsentChange('socialMediaScraping')}
              style={{ marginRight: "0.5rem", marginTop: "0.25rem" }}
            />
            <span>
              <strong>Enhanced Identity Verification</strong> - Use social media and public records to verify identity and improve security
            </span>
          </label>
          
          <label style={{ display: "flex", alignItems: "flex-start", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={consent.contactNetworking}
              onChange={() => handleConsentChange('contactNetworking')}
              style={{ marginRight: "0.5rem", marginTop: "0.25rem" }}
            />
            <span>
              <strong>Reference Network Verification</strong> - Contact family, friends, and colleagues listed in your phone for verification purposes
            </span>
          </label>
        </div>
      </div>

      {/* Document uploads with increasing requirements */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.75rem", color: "#333" }}>
          Required Documents
        </h4>
        
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {requiredUploads.map(upload => (
            <div key={upload.key} style={{ 
              padding: "0.75rem",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              background: "#f9fafb"
            }}>
              <label style={{ 
                display: "block", 
                fontSize: "0.9rem", 
                fontWeight: 600, 
                marginBottom: "0.5rem",
                color: upload.required ? "#dc2626" : "#333"
              }}>
                {upload.label}
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(upload.key, e.target.files?.[0] || null)}
                style={{ fontSize: "0.8rem" }}
              />
              <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                Upload a clear photo or PDF. File will be securely encrypted.
              </div>
            </div>
          ))}
          
          {showMoreRequirements && additionalUploads.map(upload => (
            <div key={upload.key} style={{ 
              padding: "0.75rem",
              border: "2px solid #f59e0b",
              borderRadius: "8px",
              background: "#fffbeb"
            }}>
              <label style={{ 
                display: "block", 
                fontSize: "0.9rem", 
                fontWeight: 600, 
                marginBottom: "0.5rem",
                color: "#dc2626"
              }}>
                {upload.label} (Additional Security Requirement)
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload(upload.key, e.target.files?.[0] || null)}
                style={{ fontSize: "0.8rem" }}
              />
              <div style={{ fontSize: "0.75rem", color: "#92400e", marginTop: "0.25rem" }}>
                Required for enhanced identity protection and fraud prevention.
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #059669 0%, #16a34a 100%)",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.1rem",
          border: "none",
          borderRadius: "8px",
          padding: "0.75rem",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
      >
        {submissionAttempts > 0 ? "Complete Verification" : "Continue Securely"}
      </button>
      
      <div style={{ 
        fontSize: "0.7rem", 
        color: "#6b7280", 
        marginTop: "0.75rem",
        lineHeight: 1.3
      }}>
        By continuing, you agree to our Terms of Service, Privacy Policy, and authorize us to use your information as described above. 
        Your data may be shared with partners, service providers, and verification services to process your application.
      </div>

      {/* Educational note for privacy violations */}
      <div style={{
        marginTop: "1rem",
        padding: "0.75rem",
        background: "#fee2e2",
        border: "1px solid #fca5a5",
        borderRadius: "8px",
        fontSize: "0.8rem",
        color: "#7f1d1d"
      }}>
        <strong>🎓 Educational Note:</strong> This demonstrates "privacy zuckering" - making privacy-invasive options seem beneficial. 
        Real payday lenders often collect excessive personal data and share it widely.
        Privacy Violation Score: {calculatePrivacyViolationScore()}%
      </div>
    </div>
  );
};

export default PrivacyConsentForm; 