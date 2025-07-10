import React, { useState } from "react";

/**
 * EthicalHeader - Transparent, calming header for ethical payday loan alternative
 * Directly contrasts with predatory tactics by providing clear information,
 * no time pressure, and genuine financial education
 */
const EthicalHeader: React.FC = () => {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  // Transparent information about real loan costs
  const realInformation = [
    {
      topic: "True APR Disclosure",
      info: "Our 36% APR is clearly displayed upfront",
      comparison: "vs. predatory lenders: 391-664% APR hidden until final step"
    },
    {
      topic: "No Hidden Fees",
      info: "All costs shown before you apply",
      comparison: "vs. predatory lenders: drip pricing reveals fees late"
    },
    {
      topic: "No Rollover Traps",
      info: "Fixed 30-day term, pay once and done",
      comparison: "vs. predatory lenders: designed for expensive rollovers"
    },
    {
      topic: "Real Processing Time",
      info: "1-3 business days for responsible verification",
      comparison: "vs. predatory lenders: fake 'instant' claims to pressure decisions"
    }
  ];

  // Genuine alternative options
  const alternatives = [
    {
      title: "Credit Union PAL",
      description: "Payday Alternative Loans with 28% APR maximum",
      apr: "28%",
      benefits: ["Lower cost", "Longer terms", "Credit building"],
      contact: "Find your local credit union"
    },
    {
      title: "Employer Assistance",
      description: "Check if your employer offers advance or emergency funds",
      apr: "0-5%",
      benefits: ["No interest", "Payroll deduction", "No credit check"],
      contact: "Contact HR department"
    },
    {
      title: "Community Resources",
      description: "Local charities and assistance programs",
      apr: "0%",
      benefits: ["Free assistance", "No repayment", "Additional support"],
      contact: "Call 211 for local resources"
    },
    {
      title: "Credit Card Cash Advance",
      description: "Even with fees, often cheaper than payday loans",
      apr: "25-30%",
      benefits: ["Lower APR", "Flexible payment", "Build credit"],
      contact: "Contact your card issuer"
    }
  ];

  return (
    <div style={{ background: "#f8f9fa" }}>
      {/* Calm, Professional Header */}
      <header style={{
        background: "linear-gradient(135deg, #e3f2fd 0%, #f0f4f8 100%)",
        color: "#2c3e50",
        padding: "2rem 0",
        borderBottom: "3px solid #0277bd"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
              color: "#0277bd"
            }}>
              🏦 Transparent Financial Solutions
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#546e7a", marginBottom: "0.5rem" }}>
              Clear terms • Fair rates • No hidden costs • Your choice, your time
            </p>
            <p style={{ fontSize: "1rem", color: "#37474f" }}>
              Licensed • Regulated • Committed to your financial well-being
            </p>
          </div>

          {/* Truth in Lending Disclosure */}
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 4px 20px rgba(2, 119, 189, 0.1)",
            border: "2px solid #0277bd"
          }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#0277bd", marginBottom: "1rem", textAlign: "center" }}>
              📋 Complete Cost Disclosure
            </h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
              <div style={{
                background: "#e8f5e8",
                padding: "1.5rem",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px solid #4caf50"
              }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#2e7d32", marginBottom: "0.5rem" }}>
                  36%
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "#2e7d32" }}>
                  Maximum APR
                </div>
                <div style={{ fontSize: "0.8rem", color: "#388e3c", marginTop: "0.5rem" }}>
                  Capped by regulation
                </div>
              </div>

              <div style={{
                background: "#e3f2fd",
                padding: "1.5rem",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px solid #2196f3"
              }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#1976d2", marginBottom: "0.5rem" }}>
                  30
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "#1976d2" }}>
                  Days to Repay
                </div>
                <div style={{ fontSize: "0.8rem", color: "#1976d2", marginTop: "0.5rem" }}>
                  Not 14 days
                </div>
              </div>

              <div style={{
                background: "#fff3e0",
                padding: "1.5rem",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px solid #ff9800"
              }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#f57c00", marginBottom: "0.5rem" }}>
                  $0
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "#f57c00" }}>
                  Hidden Fees
                </div>
                <div style={{ fontSize: "0.8rem", color: "#f57c00", marginTop: "0.5rem" }}>
                  All costs upfront
                </div>
              </div>

              <div style={{
                background: "#fce4ec",
                padding: "1.5rem",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px solid #e91e63"
              }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#c2185b", marginBottom: "0.5rem" }}>
                  0
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 600, color: "#c2185b" }}>
                  Rollover Options
                </div>
                <div style={{ fontSize: "0.8rem", color: "#c2185b", marginTop: "0.5rem" }}>
                  One-time repayment
                </div>
              </div>
            </div>

            <div style={{
              background: "#f5f5f5",
              padding: "1rem",
              borderRadius: "8px",
              marginTop: "1rem",
              textAlign: "center"
            }}>
              <p style={{ fontSize: "0.9rem", color: "#546e7a", margin: 0 }}>
                <strong>Example:</strong> Borrow $300 for 30 days = $27 finance charge (36% APR) = $327 total repayment
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowAlternatives(!showAlternatives)}
              style={{
                background: "#4caf50",
                color: "#fff",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#45a049"}
              onMouseOut={(e) => e.currentTarget.style.background = "#4caf50"}
            >
              🏦 See Better Alternatives First
            </button>

            <button
              onClick={() => setShowEducation(!showEducation)}
              style={{
                background: "#2196f3",
                color: "#fff",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#1976d2"}
              onMouseOut={(e) => e.currentTarget.style.background = "#2196f3"}
            >
              📚 Learn About Loan Costs
            </button>

            <button
              style={{
                background: "#fff",
                color: "#0277bd",
                border: "2px solid #0277bd",
                padding: "1rem 2rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#0277bd";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#0277bd";
              }}
            >
              📝 Apply (No Time Pressure)
            </button>
          </div>
        </div>
      </header>

      {/* Alternatives Section */}
      {showAlternatives && (
        <div style={{
          background: "#fff",
          padding: "2rem 0",
          borderBottom: "1px solid #e0e0e0"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2c3e50", marginBottom: "2rem", textAlign: "center" }}>
              🌟 Better Financial Options
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {alternatives.map((alt, index) => (
                <div key={index} style={{
                  background: "#f8f9fa",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: "2px solid #e0e0e0",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#4caf50";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(76, 175, 80, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e0e0e0";
                  e.currentTarget.style.boxShadow = "none";
                }}
                >
                  <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2c3e50", marginBottom: "0.5rem" }}>
                    {alt.title}
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "#546e7a", marginBottom: "1rem" }}>
                    {alt.description}
                  </p>
                  <div style={{
                    background: "#4caf50",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    display: "inline-block",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "1rem"
                  }}>
                    APR: {alt.apr}
                  </div>
                  <ul style={{ margin: "1rem 0", paddingLeft: "1.5rem" }}>
                    {alt.benefits.map((benefit, i) => (
                      <li key={i} style={{ fontSize: "0.9rem", color: "#37474f", marginBottom: "0.25rem" }}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div style={{
                    background: "#e3f2fd",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    color: "#1976d2",
                    fontWeight: 600
                  }}>
                    📞 {alt.contact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Educational Content */}
      {showEducation && (
        <div style={{
          background: "#f8f9fa",
          padding: "2rem 0"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2c3e50", marginBottom: "2rem", textAlign: "center" }}>
              📚 Understanding Loan Costs
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {realInformation.map((info, index) => (
                <div key={index} style={{
                  background: "#fff",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0277bd", marginBottom: "1rem" }}>
                    {info.topic}
                  </h4>
                  <div style={{
                    background: "#e8f5e8",
                    padding: "1rem",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                    border: "1px solid #4caf50"
                  }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#2e7d32", marginBottom: "0.5rem" }}>
                      ✅ Our Approach:
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#2e7d32" }}>
                      {info.info}
                    </div>
                  </div>
                  <div style={{
                    background: "#ffebee",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #f44336"
                  }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#c62828", marginBottom: "0.5rem" }}>
                      ⚠️ What to Avoid:
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#c62828" }}>
                      {info.comparison}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regulatory Information */}
      <div style={{
        background: "#0277bd",
        color: "#fff",
        padding: "1rem 0",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
          <p style={{ fontSize: "0.9rem", margin: 0 }}>
            🏛️ Licensed and regulated • FDIC member • CFPB compliant • 
            <a href="#" style={{ color: "#81d4fa", marginLeft: "0.5rem" }}>
              View our licensing information
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EthicalHeader; 