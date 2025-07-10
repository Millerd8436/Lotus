import React, { useState } from "react";

/**
 * EthicalLoanCalculator - Complete transparency in loan cost calculation
 * Directly contrasts with predatory drip pricing by showing all costs upfront,
 * providing alternatives, and educating users about true loan costs
 */

interface LoanCalculation {
  principal: number;
  term: number;
  fee: number;
  apr: number;
  totalRepayment: number;
  dailyCost: number;
  weeklyPayment: number;
}

interface Alternative {
  name: string;
  apr: number;
  description: string;
  requirements: string;
  totalCost: number;
  recommendation: string;
}

const EthicalLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(300);
  const [showComparison, setShowComparison] = useState(true);
  const [_showBreakdown, _setShowBreakdown] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState(30);

  // Calculate our ethical loan
  const calculateEthicalLoan = (amount: number, termDays: number): LoanCalculation => {
    const aprRate = 0.36; // 36% APR cap
    const fee = (amount * aprRate * termDays) / 365;
    const totalRepayment = amount + fee;
    
    return {
      principal: amount,
      term: termDays,
      fee: Math.round(fee * 100) / 100,
      apr: 36,
      totalRepayment: Math.round(totalRepayment * 100) / 100,
      dailyCost: Math.round((fee / termDays) * 100) / 100,
      weeklyPayment: Math.round((totalRepayment / (termDays / 7)) * 100) / 100
    };
  };

  // Calculate alternative options
  const calculateAlternatives = (amount: number): Alternative[] => {
    return [
      {
        name: "Credit Union PAL",
        apr: 28,
        description: "Payday Alternative Loan from federal credit union",
        requirements: "Credit union membership (usually $5-25)",
        totalCost: amount + ((amount * 0.28 * 30) / 365),
        recommendation: "Best option - lowest cost and builds credit"
      },
      {
        name: "Credit Card Advance",
        apr: 25,
        description: "Cash advance from existing credit card",
        requirements: "Existing credit card with available credit",
        totalCost: amount + ((amount * 0.25 * 30) / 365) + 5, // $5 fee
        recommendation: "Good option if you have a credit card"
      },
      {
        name: "Employer Advance",
        apr: 0,
        description: "Payroll advance from your employer",
        requirements: "Check with HR department",
        totalCost: amount,
        recommendation: "Ideal option - no interest or fees"
      },
      {
        name: "Traditional Payday Loan",
        apr: 391,
        description: "Typical payday loan with rollover potential",
        requirements: "Income verification and bank account",
        totalCost: amount + ((amount * 3.91 * 14) / 365),
        recommendation: "Avoid - high cost and debt trap risk"
      }
    ];
  };

  const ethicalLoan = calculateEthicalLoan(loanAmount, selectedTerm);
  const alternatives = calculateAlternatives(loanAmount);

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "2rem",
      margin: "2rem 0",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      border: "2px solid #4caf50"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h3 style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          marginBottom: "0.5rem",
          color: "#2e7d32"
        }}>
          💡 Transparent Loan Calculator
        </h3>
        <p style={{ fontSize: "1rem", color: "#546e7a" }}>
          All costs displayed upfront • No hidden fees • Complete transparency
        </p>
      </div>

      {/* Loan Input Controls */}
      <div style={{
        background: "#f8f9fa",
        borderRadius: "12px",
        padding: "1.5rem",
        marginBottom: "2rem"
      }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "1.5rem" 
        }}>
          {/* Loan Amount */}
          <div>
            <label style={{ 
              display: "block", 
              fontSize: "0.9rem", 
              fontWeight: 600, 
              color: "#2c3e50", 
              marginBottom: "0.5rem" 
            }}>
              Loan Amount
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              style={{
                width: "100%",
                height: "8px",
                borderRadius: "4px",
                background: "#e0e0e0",
                outline: "none",
                marginBottom: "0.5rem"
              }}
            />
            <div style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#4caf50"
            }}>
              ${loanAmount}
            </div>
          </div>

          {/* Loan Term */}
          <div>
            <label style={{ 
              display: "block", 
              fontSize: "0.9rem", 
              fontWeight: 600, 
              color: "#2c3e50", 
              marginBottom: "0.5rem" 
            }}>
              Repayment Term
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(parseInt(e.target.value))}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "2px solid #e0e0e0",
                fontSize: "1rem",
                background: "#fff"
              }}
            >
              <option value={30}>30 days (recommended)</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
            <div style={{
              fontSize: "0.8rem",
              color: "#666",
              marginTop: "0.5rem"
            }}>
              Longer terms reduce daily cost
            </div>
          </div>
        </div>
      </div>

      {/* Complete Cost Breakdown */}
      <div style={{
        background: "linear-gradient(135deg, #e8f5e8, #f1f8e9)",
        borderRadius: "12px",
        padding: "2rem",
        marginBottom: "2rem",
        border: "2px solid #4caf50"
      }}>
        <h4 style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "#2e7d32",
          marginBottom: "1.5rem",
          textAlign: "center"
        }}>
          📊 Complete Cost Breakdown
        </h4>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
          gap: "1rem",
          marginBottom: "1.5rem"
        }}>
          <div style={{
            background: "#fff",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
            border: "1px solid #4caf50"
          }}>
            <div style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}>
              Principal Amount
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#2e7d32" }}>
              ${ethicalLoan.principal}
            </div>
          </div>

          <div style={{
            background: "#fff",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
            border: "1px solid #2196f3"
          }}>
            <div style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}>
              Finance Charge
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1976d2" }}>
              ${ethicalLoan.fee}
            </div>
          </div>

          <div style={{
            background: "#fff",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
            border: "1px solid #ff9800"
          }}>
            <div style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}>
              Total Repayment
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f57c00" }}>
              ${ethicalLoan.totalRepayment}
            </div>
          </div>

          <div style={{
            background: "#fff",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
            border: "1px solid #9c27b0"
          }}>
            <div style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}>
              APR (Annual Rate)
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#7b1fa2" }}>
              {ethicalLoan.apr}%
            </div>
          </div>
        </div>

        {/* Additional Cost Information */}
        <div style={{
          background: "#fff",
          borderRadius: "8px",
          padding: "1rem",
          border: "1px solid #e0e0e0"
        }}>
          <h5 style={{ fontSize: "1rem", fontWeight: 600, color: "#2c3e50", marginBottom: "0.75rem" }}>
            📅 Payment Schedule
          </h5>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
            gap: "1rem",
            fontSize: "0.9rem"
          }}>
            <div>
              <span style={{ fontWeight: 600 }}>Daily Cost:</span>
              <br />
              ${ethicalLoan.dailyCost}/day
            </div>
            <div>
              <span style={{ fontWeight: 600 }}>Due Date:</span>
              <br />
              {selectedTerm} days from funding
            </div>
            <div>
              <span style={{ fontWeight: 600 }}>Late Fees:</span>
              <br />
              $25 after 5 days late
            </div>
            <div>
              <span style={{ fontWeight: 600 }}>Rollover:</span>
              <br />
              Not available
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Comparison */}
      {showComparison && (
        <div style={{
          background: "#f8f9fa",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "1.5rem" 
          }}>
            <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2c3e50", margin: 0 }}>
              🏦 Compare All Your Options
            </h4>
            <button
              onClick={() => setShowComparison(!showComparison)}
              style={{
                background: "transparent",
                border: "1px solid #e0e0e0",
                borderRadius: "20px",
                padding: "0.5rem 1rem",
                fontSize: "0.8rem",
                cursor: "pointer"
              }}
            >
              {showComparison ? "Hide" : "Show"} Comparison
            </button>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "1rem" 
          }}>
            {alternatives.map((alt, index) => (
              <div
                key={index}
                style={{
                  background: alt.name === "Traditional Payday Loan" ? "#ffebee" : "#fff",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: alt.name === "Employer Advance" ? "3px solid #4caf50" : 
                         alt.name === "Traditional Payday Loan" ? "3px solid #f44336" : "2px solid #e0e0e0"
                }}
              >
                {alt.name === "Employer Advance" && (
                  <div style={{
                    background: "#4caf50",
                    color: "#fff",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    display: "inline-block"
                  }}>
                    BEST OPTION
                  </div>
                )}
                
                {alt.name === "Traditional Payday Loan" && (
                  <div style={{
                    background: "#f44336",
                    color: "#fff",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                    display: "inline-block"
                  }}>
                    AVOID
                  </div>
                )}

                <h5 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2c3e50", marginBottom: "0.5rem" }}>
                  {alt.name}
                </h5>
                
                <div style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: alt.apr === 0 ? "#4caf50" : alt.apr > 100 ? "#f44336" : "#2196f3",
                  marginBottom: "0.75rem"
                }}>
                  {alt.apr}% APR
                </div>

                <p style={{ fontSize: "0.9rem", color: "#546e7a", marginBottom: "1rem" }}>
                  {alt.description}
                </p>

                <div style={{
                  background: alt.apr > 100 ? "#ffcdd2" : "#e8f5e8",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  marginBottom: "1rem"
                }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Total Cost: ${Math.round(alt.totalCost * 100) / 100}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666" }}>
                    Requirements: {alt.requirements}
                  </div>
                </div>

                <div style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: alt.apr === 0 ? "#4caf50" : alt.apr > 100 ? "#f44336" : "#2196f3"
                }}>
                  💡 {alt.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educational Information */}
      <div style={{
        background: "linear-gradient(135deg, #e3f2fd, #f0f4f8)",
        borderRadius: "12px",
        padding: "2rem",
        border: "2px solid #2196f3"
      }}>
        <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1976d2", marginBottom: "1.5rem", textAlign: "center" }}>
          📚 Understanding Your Rights & Options
        </h4>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "1.5rem" 
        }}>
          <div style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #2196f3"
          }}>
            <h5 style={{ fontSize: "1rem", fontWeight: 700, color: "#1976d2", marginBottom: "0.75rem" }}>
              🏛️ Your Legal Rights
            </h5>
            <ul style={{ fontSize: "0.8rem", color: "#37474f", paddingLeft: "1rem" }}>
              <li>Right to cancel within 3 business days</li>
              <li>Right to clear cost disclosure</li>
              <li>Protection from harassment</li>
              <li>Right to fair collection practices</li>
            </ul>
          </div>

          <div style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #4caf50"
          }}>
            <h5 style={{ fontSize: "1rem", fontWeight: 700, color: "#2e7d32", marginBottom: "0.75rem" }}>
              ✅ Before You Borrow
            </h5>
            <ul style={{ fontSize: "0.8rem", color: "#37474f", paddingLeft: "1rem" }}>
              <li>Explore all alternatives first</li>
              <li>Only borrow what you can repay</li>
              <li>Plan for the full repayment amount</li>
              <li>Read all terms carefully</li>
            </ul>
          </div>

          <div style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #ff9800"
          }}>
            <h5 style={{ fontSize: "1rem", fontWeight: 700, color: "#f57c00", marginBottom: "0.75rem" }}>
              📞 Get Help
            </h5>
            <div style={{ fontSize: "0.8rem", color: "#37474f" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Financial Counseling:</strong> Call 211
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Complaints:</strong> CFPB.gov
              </div>
              <div>
                <strong>Emergency Aid:</strong> Local community centers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
          Take your time to make an informed decision. No pressure, no rush.
        </div>
        <button style={{
          background: "linear-gradient(45deg, #4caf50, #45a049)",
          color: "#fff",
          border: "none",
          padding: "1rem 2rem",
          borderRadius: "8px",
          fontSize: "1.1rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
          transition: "all 0.3s ease"
        }}>
          📝 Apply with Full Transparency
        </button>
        <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.5rem" }}>
          No obligation • Clear terms • Fair treatment
        </div>
      </div>
    </div>
  );
};

export default EthicalLoanCalculator; 