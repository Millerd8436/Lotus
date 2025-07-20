"use client";

import React, { useState } from "react";
import EthicalCheckoutFlow from "./EthicalCheckoutFlow";

/**
 * EthicalHomepage - Main landing page for the ethical payday loan simulator.
 * Demonstrates transparent, user-empowering lending practices.
 * Phase 4 of the 4-phase educational platform.
 */
const EthicalHomepage: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(300);
  const [loanTerm, setLoanTerm] = useState(30);
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Calculate loan details transparently
  const fee = loanAmount * 0.15; // 15% fee (much lower than predatory)
  const apr = ((fee / loanAmount) * (365 / loanTerm) * 100).toFixed(2);
  const totalRepayment = loanAmount + fee;

  // Show checkout flow if user clicked apply
  if (showCheckout) {
    return (
      <EthicalCheckoutFlow
        loanAmount={loanAmount}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* 1. Honest Hero/Header Section */}
      <header
        style={{
          background: "#f0fdf4",
          padding: "2rem 0",
          borderBottom: "2px solid #16a34a",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 1rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#16a34a",
              marginBottom: 16,
            }}
          >
            Emergency Short-Term Loan
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#374151", marginBottom: 8 }}>
            Full APR Disclosed Up Front • No Hidden Fees • No Pressure
          </p>
          <p style={{ fontSize: "1rem", color: "#6b7280" }}>
            Make an informed decision with complete transparency
          </p>
        </div>
      </header>

      {/* Main Content Container */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem" }}>
        {/* 2. Transparent Calculator & Pricing Tools */}
        <section
          style={{
            background: "#f9fafb",
            borderRadius: 12,
            padding: "2rem",
            marginBottom: "2rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: 20,
              color: "#111827",
            }}
          >
            Calculate Your Loan Cost
          </h2>

          <div style={{ display: "grid", gap: 20, marginBottom: 24 }}>
            <div>
              <label
                style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
              >
                Loan Amount: ${loanAmount}
              </label>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: 8,
                  borderRadius: 4,
                  background: "#e5e7eb",
                  outline: "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  marginTop: 4,
                }}
              >
                <span>$100</span>
                <span>$1,000</span>
              </div>
            </div>

            <div>
              <label
                style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
              >
                Loan Term: {loanTerm} days
              </label>
              <input
                type="range"
                min="7"
                max="30"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: 8,
                  borderRadius: 4,
                  background: "#e5e7eb",
                  outline: "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  marginTop: 4,
                }}
              >
                <span>7 days</span>
                <span>30 days</span>
              </div>
            </div>
          </div>

          {/* Live Cost Breakdown */}
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "1.5rem",
              border: "2px solid #16a34a",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                marginBottom: 16,
                color: "#16a34a",
              }}
            >
              Your Loan Breakdown
            </h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Amount Borrowed:</span>
                <span style={{ fontWeight: 600 }}>
                  ${loanAmount.toFixed(2)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Fee (15%):</span>
                <span style={{ fontWeight: 600 }}>${fee.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: 600 }}>Total Repayment:</span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#16a34a",
                  }}
                >
                  ${totalRepayment.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#dc2626",
                  fontWeight: 600,
                }}
              >
                <span>APR:</span>
                <span>{apr}%</span>
              </div>
            </div>
          </div>

          {/* Comparison Context */}
          <div
            style={{
              marginTop: 20,
              padding: 16,
              background: "#fef3c7",
              borderRadius: 8,
            }}
          >
            <p style={{ fontSize: "0.875rem", color: "#92400e" }}>
              <strong>For comparison:</strong> Credit card cash advance APR:
              ~25% | Personal loan APR: 10-18% | Our APR: {apr}%
            </p>
          </div>
        </section>

        {/* 3. Explicit Fee Disclosure */}
        <section
          style={{
            background: "#f0f9ff",
            borderRadius: 12,
            padding: "1.5rem",
            marginBottom: "2rem",
            border: "1px solid #0369a1",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: 12,
              color: "#0369a1",
            }}
          >
            All Fees Listed Up Front
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: 8 }}>
              ✓ Origination Fee: 15% of loan amount (${fee.toFixed(2)})
            </li>
            <li style={{ marginBottom: 8 }}>
              ✓ Late Payment Fee: $25 (only if payment is late)
            </li>
            <li style={{ marginBottom: 8 }}>
              ✓ NSF Fee: $0 (we never charge for insufficient funds)
            </li>
            <li style={{ marginBottom: 8 }}>
              ✓ Early Repayment: No penalty - save on interest!
            </li>
            <li style={{ marginBottom: 8 }}>
              ✓ Rollover Fee: Not offered (to prevent debt cycles)
            </li>
          </ul>
        </section>

        {/* 4. Ethical Info Banner */}
        <section
          style={{
            background: "#f0fdf4",
            borderRadius: 12,
            padding: "1.5rem",
            marginBottom: "2rem",
            border: "1px solid #16a34a",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: 8,
              color: "#16a34a",
            }}
          >
            Our Ethical Commitment
          </h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem" }}>
            <li style={{ marginBottom: 6 }}>
              🚫 No urgency tricks or countdown timers
            </li>
            <li style={{ marginBottom: 6 }}>
              🚫 No pre-checked boxes or hidden add-ons
            </li>
            <li style={{ marginBottom: 6 }}>
              🚫 No data sharing without explicit consent
            </li>
            <li style={{ marginBottom: 6 }}>
              ✅ Take your time to make the right decision
            </li>
            <li style={{ marginBottom: 6 }}>
              ✅ All terms clearly stated before you apply
            </li>
          </ul>
        </section>

        {/* 5. Pre-Qualification Form */}
        <section
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 20 }}
          >
            Check Your Eligibility (No Credit Impact)
          </h3>
          <form>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: "block", marginBottom: 6, fontWeight: 500 }}
              >
                Monthly Income
              </label>
              <input
                type="number"
                placeholder="$2,500"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: "block", marginBottom: 6, fontWeight: 500 }}
              >
                Employment Status
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                }}
              >
                <option>Employed Full-Time</option>
                <option>Employed Part-Time</option>
                <option>Self-Employed</option>
                <option>Other Income</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{ display: "block", marginBottom: 6, fontWeight: 500 }}
              >
                State
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                }}
              >
                <option>California</option>
                <option>Texas</option>
                <option>New York</option>
                <option>Florida</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setShowFullTerms(true)}
              style={{
                width: "100%",
                background: "#16a34a",
                color: "#fff",
                padding: "0.875rem",
                borderRadius: 8,
                border: "none",
                fontSize: "1.125rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Check Eligibility
            </button>

            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginTop: 12,
                textAlign: "center",
              }}
            >
              This is a soft credit check that won't affect your credit score
            </p>
          </form>
        </section>

        {/* 6. Privacy Guarantee */}
        <section
          style={{
            background: "#fef3c7",
            borderRadius: 12,
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <h3
            style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: 8 }}
          >
            🔒 Your Privacy is Protected
          </h3>
          <p style={{ fontSize: "0.95rem", marginBottom: 8 }}>
            We will <strong>never</strong> share or sell your personal
            information to third parties.
          </p>
          <p style={{ fontSize: "0.875rem", color: "#92400e" }}>
            Your data is encrypted and used only for loan processing. Read our{" "}
            <a
              href="#"
              style={{ color: "#0369a1", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </p>
        </section>

        {/* 7. Clear Terms Review (shown after eligibility check) */}
        {showFullTerms && (
          <section
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "2rem",
              marginBottom: "2rem",
              border: "2px solid #16a34a",
            }}
          >
            <h3
              style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 16 }}
            >
              Review Your Loan Terms
            </h3>
            <div
              style={{
                background: "#f9fafb",
                padding: "1rem",
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <p>
                <strong>Loan Amount:</strong> ${loanAmount}
              </p>
              <p>
                <strong>Term:</strong> {loanTerm} days
              </p>
              <p>
                <strong>Fee:</strong> ${fee.toFixed(2)}
              </p>
              <p>
                <strong>Total to Repay:</strong> ${totalRepayment.toFixed(2)}
              </p>
              <p>
                <strong>APR:</strong> {apr}%
              </p>
              <p>
                <strong>Repayment Date:</strong>{" "}
                {new Date(
                  Date.now() + loanTerm * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  fontSize: "0.95rem",
                }}
              >
                <input
                  type="checkbox"
                  style={{ marginRight: 8, marginTop: 2 }}
                />
                <span>
                  I have read and agree to the{" "}
                  <a
                    href="#"
                    style={{ color: "#0369a1", textDecoration: "underline" }}
                  >
                    Loan Agreement
                  </a>{" "}
                  and understand all fees and repayment terms.
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={() => setShowCheckout(true)}
              style={{
                width: "100%",
                background: "#16a34a",
                color: "#fff",
                padding: "0.875rem",
                borderRadius: 8,
                border: "none",
                fontSize: "1.125rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Accept Loan Terms
            </button>

            <button
              type="button"
              onClick={() => setShowFullTerms(false)}
              style={{
                width: "100%",
                background: "#fff",
                color: "#6b7280",
                padding: "0.875rem",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: "1rem",
                fontWeight: 500,
                cursor: "pointer",
                marginTop: 12,
              }}
            >
              Cancel - I Need More Time
            </button>
          </section>
        )}

        {/* 8. Support Resources */}
        <section
          style={{ background: "#f3f4f6", borderRadius: 12, padding: "1.5rem" }}
        >
          <h3
            style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: 12 }}
          >
            Alternative Resources
          </h3>
          <p style={{ fontSize: "0.95rem", marginBottom: 12 }}>
            Before taking a payday loan, consider these alternatives:
          </p>
          <ul style={{ fontSize: "0.9rem", paddingLeft: 20 }}>
            <li>Credit union emergency loans (lower APR)</li>
            <li>Payment plans with creditors</li>
            <li>Local nonprofit assistance programs</li>
            <li>Employer salary advances</li>
            <li>Side income opportunities</li>
          </ul>
          <p style={{ fontSize: "0.875rem", marginTop: 12, color: "#6b7280" }}>
            Need help? Call our financial counselors at 1-800-XXX-XXXX
          </p>
        </section>
      </div>

      {/* 9. Ethical Footer */}
      <footer
        style={{
          background: "#1f2937",
          color: "#d1d5db",
          padding: "2rem 0",
          marginTop: "4rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1rem",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: 8 }}>
            Licensed in CA (#12345) | Member of Responsible Lending Association
          </p>
          <p style={{ fontSize: "0.875rem", marginBottom: 16 }}>
            We follow all state and federal lending regulations
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
              Terms of Service
            </a>
            <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
              Contact Us
            </a>
            <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
              File a Complaint
            </a>
          </div>
          <p style={{ fontSize: "0.75rem", marginTop: 16, color: "#6b7280" }}>
            © 2024 Ethical Lotus Loans. We're committed to responsible lending.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EthicalHomepage;
