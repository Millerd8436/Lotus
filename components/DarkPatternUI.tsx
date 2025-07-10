/**
 * Advanced Dark Pattern UI Components for Lotus Payday Loan Simulator
 * Educational components that demonstrate predatory lending UI tactics
 * Comprehensive Phase 1: Flashy + Friendly + Fake Institutional styles
 */

"use client";

import React, { useState } from "react";
// import UrgencyTimer from "./predatory/UrgencyTimer"; // Optionally add to any step

/**
 * DarkPatternUI - Educational component demonstrating dark patterns vs ethical alternatives
 * Shows side-by-side comparison of manipulative vs transparent UI design
 */
const DarkPatternUI: React.FC<{
  mode?: "comparison" | "predatory" | "ethical";
  onModeChange?: (mode: string) => void;
}> = ({ mode = "comparison", onModeChange }) => {
  const [selectedAmount, setSelectedAmount] = useState(300);
  const [showEducational, setShowEducational] = useState(true);

  const renderPredatoryInterface = () => (
    <div style={{
      background: "linear-gradient(135deg, #fee2e2, #fecaca)",
      padding: "1.5rem",
      borderRadius: "12px",
      border: "2px solid #f87171",
      position: "relative"
    }}>
      <div style={{
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        background: "#dc2626",
        color: "white",
        padding: "0.25rem 0.75rem",
        borderRadius: "12px",
        fontSize: "0.8rem",
        fontWeight: 600
      }}>
        PREDATORY
      </div>

      <h3 style={{ color: "#dc2626", fontWeight: 800, fontSize: "1.5rem", marginBottom: "1rem" }}>
        🚨 EMERGENCY CASH - ACT NOW!
      </h3>

      {/* Fake countdown timer */}
      <div style={{
        background: "#fecaca",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        textAlign: "center",
        border: "2px dashed #dc2626"
      }}>
        <div style={{ color: "#7f1d1d", fontWeight: 700, fontSize: "1.2rem" }}>
          ⏰ OFFER EXPIRES IN: 04:37
        </div>
        <div style={{ color: "#991b1b", fontSize: "0.9rem" }}>
          Only 2 spots left for instant approval!
        </div>
      </div>

      {/* Manipulative amount selector */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "#7f1d1d", fontWeight: 600, marginBottom: "0.5rem", display: "block" }}>
          How much cash do you need RIGHT NOW? 💰
        </label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[100, 300, 500, 750, 1000].map(amount => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              style={{
                background: selectedAmount === amount ? "#dc2626" : "#fff",
                color: selectedAmount === amount ? "#fff" : "#dc2626",
                border: "2px solid #dc2626",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: amount === 1000 ? "1.2rem" : "1rem",
                transform: amount === 1000 ? "scale(1.1)" : "scale(1)"
              }}
            >
              ${amount}
              {amount === 1000 && <div style={{ fontSize: "0.7rem" }}>POPULAR!</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Hidden cost presentation */}
      <div style={{
        background: "#fee2e2",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem"
      }}>
        <div style={{ color: "#059669", fontWeight: 700, fontSize: "1.5rem" }}>
          You Get: ${selectedAmount}
        </div>
        <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
          Simple payment: ${(selectedAmount * 1.25).toFixed(0)} in 2 weeks
        </div>
        <div style={{ color: "#9ca3af", fontSize: "0.7rem" }}>
          (Fee: $15 per $100 borrowed - just $1/day!)
        </div>
      </div>

      {/* Pre-checked harmful options */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
          <span>Auto-renew if I can&apos;t pay (saves late fees!)</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
          <span>Share with partner lenders for better deals</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", fontSize: "0.9rem" }}>
          <input type="checkbox" defaultChecked style={{ marginRight: "0.5rem" }} />
          <span>Get exclusive offers via phone & SMS</span>
        </label>
      </div>

      <button style={{
        width: "100%",
        background: "linear-gradient(90deg, #dc2626 0%, #ef4444 100%)",
        color: "white",
        fontWeight: 800,
        fontSize: "1.5rem",
        border: "none",
        borderRadius: "8px",
        padding: "1rem",
        cursor: "pointer",
        animation: "pulse 2s infinite"
      }}>
        GET MY ${selectedAmount} NOW! 🔥
      </button>

      <div style={{ fontSize: "0.6rem", color: "#6b7280", marginTop: "0.5rem", textAlign: "center" }}>
        *Terms, conditions, and 391% APR apply. See buried fine print.
      </div>
    </div>
  );

  const renderEthicalInterface = () => (
    <div style={{
      background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
      padding: "1.5rem",
      borderRadius: "12px",
      border: "2px solid #16a34a",
      position: "relative"
    }}>
      <div style={{
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        background: "#16a34a",
        color: "white",
        padding: "0.25rem 0.75rem",
        borderRadius: "12px",
        fontSize: "0.8rem",
        fontWeight: 600
      }}>
        ETHICAL
      </div>

      <h3 style={{ color: "#16a34a", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1rem" }}>
        🌟 Explore Your Financial Options
      </h3>

      {/* Calm informational banner */}
      <div style={{
        background: "#dcfce7",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        border: "1px solid #86efac"
      }}>
        <div style={{ color: "#166534", fontWeight: 600, fontSize: "1rem", marginBottom: "0.5rem" }}>
          💡 Take Your Time - No Rush
        </div>
        <div style={{ color: "#15803d", fontSize: "0.9rem" }}>
          We&apos;ll help you find the best solution for your needs. Consider all options before borrowing.
        </div>
      </div>

      {/* Transparent amount selector */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "#166534", fontWeight: 600, marginBottom: "0.5rem", display: "block" }}>
          What amount would help your situation?
        </label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[100, 300, 500, 750, 1000].map(amount => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              style={{
                background: selectedAmount === amount ? "#16a34a" : "#fff",
                color: selectedAmount === amount ? "#fff" : "#16a34a",
                border: "2px solid #16a34a",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>

      {/* Transparent cost breakdown */}
      <div style={{
        background: "#f0fdf4",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        border: "1px solid #16a34a"
      }}>
        <h4 style={{ color: "#16a34a", fontWeight: 700, marginBottom: "0.75rem" }}>
          Complete Cost Breakdown
        </h4>
        <div style={{ fontSize: "0.9rem", color: "#166534", marginBottom: "0.5rem" }}>
          Amount you receive: <strong>${selectedAmount}</strong>
        </div>
        <div style={{ fontSize: "0.9rem", color: "#166534", marginBottom: "0.5rem" }}>
          Fee (15%): <strong>${(selectedAmount * 0.15).toFixed(0)}</strong>
        </div>
        <div style={{ fontSize: "0.9rem", color: "#166534", marginBottom: "0.5rem" }}>
          Total repayment: <strong>${(selectedAmount * 1.15).toFixed(0)}</strong>
        </div>
        <div style={{ fontSize: "0.9rem", color: "#dc2626", fontWeight: 700 }}>
          APR: <strong>143%</strong> (for comparison: credit cards ~25%)
        </div>
      </div>

      {/* Alternatives first */}
      <div style={{
        background: "#fef3c7",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        border: "1px solid #f59e0b"
      }}>
        <h4 style={{ color: "#92400e", fontWeight: 700, marginBottom: "0.5rem" }}>
          💡 Consider These Alternatives First:
        </h4>
        <ul style={{ color: "#92400e", fontSize: "0.9rem", paddingLeft: "1.5rem", margin: 0 }}>
          <li>Credit union emergency loan (typically 28% APR)</li>
          <li>Employer salary advance or assistance program</li>
          <li>Payment plan with creditor</li>
          <li>Local assistance programs</li>
        </ul>
      </div>

      {/* Honest consent options */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          <input type="checkbox" style={{ marginRight: "0.5rem" }} />
          <span>I have reviewed alternative options above</span>
        </label>
        <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
          <input type="checkbox" style={{ marginRight: "0.5rem" }} />
          <span>Send me educational resources about building emergency savings</span>
        </label>
      </div>

      <button style={{
        width: "100%",
        background: "linear-gradient(90deg, #16a34a 0%, #059669 100%)",
        color: "white",
        fontWeight: 700,
        fontSize: "1.2rem",
        border: "none",
        borderRadius: "8px",
        padding: "1rem",
        cursor: "pointer"
      }}>
        Get Guidance & Explore Options
      </button>

      <div style={{ fontSize: "0.8rem", color: "#166534", marginTop: "0.75rem", textAlign: "center" }}>
        Take your time. We&apos;ll help you make the best financial decision for your situation.
      </div>
    </div>
  );

  const renderComparisonMode = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", minHeight: "600px" }}>
      {renderPredatoryInterface()}
      {renderEthicalInterface()}
    </div>
  );

  const renderSingleMode = () => {
    if (mode === "predatory") {
      return renderPredatoryInterface();
    }
    if (mode === "ethical") {
      return renderEthicalInterface();
    }
    return renderComparisonMode();
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Mode Toggle */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem", color: "#374151" }}>
          🎭 Dark Patterns vs Ethical Design
        </h2>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          {["comparison", "predatory", "ethical"].map(modeOption => (
            <button
              key={modeOption}
              onClick={() => onModeChange?.(modeOption)}
              style={{
                background: mode === modeOption ? "#7c3aed" : "#fff",
                color: mode === modeOption ? "#fff" : "#7c3aed",
                border: "2px solid #7c3aed",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize"
              }}
            >
              {modeOption}
            </button>
          ))}
        </div>
        
        <div style={{ fontSize: "0.9rem", color: "#6b7280", maxWidth: "600px", margin: "0 auto" }}>
          Compare how the same loan product can be presented in manipulative vs transparent ways
        </div>
      </div>

      {/* Educational Toggle */}
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <label style={{ fontSize: "0.9rem", color: "#6b7280" }}>
          <input
            type="checkbox"
            checked={showEducational}
            onChange={(e) => setShowEducational(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          Show educational annotations
        </label>
      </div>

      {/* Main Interface */}
      {mode === "comparison" ? renderComparisonMode() : renderSingleMode()}

      {/* Educational Annotations */}
      {showEducational && (
        <div style={{
          marginTop: "2rem",
          background: "#f8fafc",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e2e8f0"
        }}>
          <h3 style={{ fontWeight: 700, marginBottom: "1rem", color: "#1e293b" }}>
            🎓 Educational Analysis
          </h3>
          
          <div style={{ display: "grid", gridTemplateColumns: mode === "comparison" ? "1fr 1fr" : "1fr", gap: "2rem" }}>
            {(mode === "comparison" || mode === "predatory") && (
              <div>
                <h4 style={{ color: "#dc2626", fontWeight: 600, marginBottom: "0.75rem" }}>
                  🕷️ Dark Patterns Demonstrated:
                </h4>
                <ul style={{ fontSize: "0.9rem", color: "#374151", paddingLeft: "1.5rem" }}>
                  <li>Artificial urgency (fake countdown timer)</li>
                  <li>False scarcity (&ldquo;Only 2 spots left&rdquo;)</li>
                  <li>Hidden APR (presenting as daily fee)</li>
                  <li>Pre-checked harmful options</li>
                  <li>Emotional manipulation (emergency framing)</li>
                  <li>Anchoring bias (largest amount highlighted)</li>
                  <li>Misleading cost presentation</li>
                </ul>
              </div>
            )}
            
            {(mode === "comparison" || mode === "ethical") && (
              <div>
                <h4 style={{ color: "#16a34a", fontWeight: 600, marginBottom: "0.75rem" }}>
                  ✨ Ethical Design Principles:
                </h4>
                <ul style={{ fontSize: "0.9rem", color: "#374151", paddingLeft: "1.5rem" }}>
                  <li>No artificial time pressure</li>
                  <li>Complete cost transparency upfront</li>
                  <li>Alternatives presented first</li>
                  <li>Honest consent options</li>
                  <li>Calm, supportive messaging</li>
                  <li>Educational context provided</li>
                  <li>User autonomy respected</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DarkPatternUI;
