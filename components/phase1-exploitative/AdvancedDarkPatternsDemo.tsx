import React, { useEffect, useState } from "react";

interface AdvancedDarkPatternsDemoProps {
  onPatternDetected?: (pattern: string, severity: number) => void;
}

interface DarkPattern {
  id: string;
  name: string;
  description: string;
  severity: number; // 1-10 scale
  example: React.ReactNode;
  explanation: string;
  realWorldUse: string;
}

const AdvancedDarkPatternsDemo: React.FC<AdvancedDarkPatternsDemoProps> = ({
  onPatternDetected,
}) => {
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const [confirmShamingVisible, setConfirmShamingVisible] = useState(false);
  const [roachMotelStep, setRoachMotelStep] = useState(0);
  const [fakeUrgencyTimer, setFakeUrgencyTimer] = useState(847);
  const [scarcityCount, setScarcityCount] = useState(23);
  const [socialProofCount, setSocialProofCount] = useState(1247);

  // Advanced fake urgency with multiple techniques
  useEffect(() => {
    const timer = setInterval(() => {
      setFakeUrgencyTimer((prev) => {
        if (prev <= 0) {
          // Reset timer to create false scarcity cycle
          return 600 + Math.floor(Math.random() * 300);
        }
        return prev - 1;
      });

      // Fake scarcity countdown
      setScarcityCount((prev) =>
        Math.max(1, prev - Math.floor(Math.random() * 3))
      );

      // Fake social proof increment
      setSocialProofCount((prev) => prev + Math.floor(Math.random() * 5));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const darkPatterns: DarkPattern[] = [
    {
      id: "confirm_shaming",
      name: "Confirm Shaming",
      description:
        "Making users feel bad about their choices with guilt-inducing language",
      severity: 8,
      example: (
        <div
          style={{
            padding: "1rem",
            border: "2px solid #ff1744",
            borderRadius: "8px",
            background: "#ffebee",
          }}
        >
          <h4 style={{ color: "#c62828", margin: "0 0 1rem 0" }}>
            Are you sure you want to cancel?
          </h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                background: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Yes, I want my emergency cash!
            </button>
            <button
              style={{
                padding: "0.75rem 1.5rem",
                background: "#757575",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              No, I don&apos;t need financial help
            </button>
          </div>
        </div>
      ),
      explanation:
        "The cancel option uses shame-inducing language that makes users feel bad about leaving",
      realWorldUse:
        "Subscription services, loan applications, insurance cancellations",
    },
    {
      id: "roach_motel",
      name: "Roach Motel",
      description: "Easy to get in, extremely difficult to get out",
      severity: 9,
      example: (
        <div
          style={{
            padding: "1rem",
            border: "2px solid #ff9800",
            borderRadius: "8px",
            background: "#fff3e0",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0" }}>Cancellation Process</h4>
          {roachMotelStep === 0 && (
            <div>
              <p>
                To cancel, you must call during business hours (9 AM - 5 PM EST,
                Mon-Fri)
              </p>
              <button
                onClick={() => setRoachMotelStep(1)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#ff9800",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Continue to Cancel
              </button>
            </div>
          )}
          {roachMotelStep === 1 && (
            <div>
              <p>
                ⚠️ Canceling will permanently remove your account and all
                benefits. Are you absolutely sure?
              </p>
              <button
                onClick={() => setRoachMotelStep(2)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#ff9800",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Yes, Continue
              </button>
            </div>
          )}
          {roachMotelStep === 2 && (
            <div>
              <p>
                💔 We&apos;re sorry to see you go. Please tell us why
                you&apos;re leaving (required field)
              </p>
              <textarea
                style={{ width: "100%", height: "60px", margin: "0.5rem 0" }}
                placeholder="Please provide detailed feedback..."
              />
              <button
                onClick={() => setRoachMotelStep(3)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#ff9800",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Submit & Cancel
              </button>
            </div>
          )}
          {roachMotelStep === 3 && (
            <div>
              <p>
                🎁 WAIT! Here&apos;s a special offer just for you - 50% off for
                6 months!
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Accept Offer
                </button>
                <button
                  onClick={() =>
                    console.log(
                      "Cancellation request submitted. You will receive a confirmation email within 24-48 hours."
                    )
                  }
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#757575",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Still Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ),
      explanation:
        "Multiple friction points make cancellation incredibly difficult and time-consuming",
      realWorldUse:
        "Gym memberships, magazine subscriptions, payday loan services",
    },
    {
      id: "fake_urgency_advanced",
      name: "Advanced Fake Urgency",
      description: "Multiple urgency tactics that reset to maintain pressure",
      severity: 7,
      example: (
        <div
          style={{
            padding: "1rem",
            border: "2px solid #f44336",
            borderRadius: "8px",
            background: "linear-gradient(45deg, #ffebee, #fff3e0)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#c62828",
              }}
            >
              ⏰ EXPIRES IN: {Math.floor(fakeUrgencyTimer / 60)}:
              {(fakeUrgencyTimer % 60).toString().padStart(2, "0")}
            </span>
            <div
              style={{
                background: "#f44336",
                color: "white",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.8rem",
              }}
            >
              LIMITED TIME
            </div>
          </div>
          <div
            style={{
              fontSize: "0.9rem",
              color: "#d84315",
              marginBottom: "0.5rem",
            }}
          >
            🔥 Only {scarcityCount} spots left at this rate!
          </div>
          <div style={{ fontSize: "0.9rem", color: "#d84315" }}>
            📈 {socialProofCount} people viewed this offer today
          </div>
        </div>
      ),
      explanation:
        "Timers that reset, fake scarcity counters, and manufactured social proof create false urgency",
      realWorldUse: "E-commerce, travel booking, financial services",
    },
    {
      id: "privacy_zuckering",
      name: "Privacy Zuckering",
      description: "Tricking users into sharing more information than intended",
      severity: 8,
      example: (
        <div
          style={{
            padding: "1rem",
            border: "2px solid #f59e0b",
            borderRadius: "8px",
            background: "#fffbeb",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0" }}>
            Complete Your Profile for Better Rates!
          </h4>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input type="checkbox" defaultChecked />
              <span style={{ fontSize: "0.9rem" }}>
                Share income information (for personalized offers)
              </span>
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input type="checkbox" defaultChecked />
              <span style={{ fontSize: "0.9rem" }}>
                Contact list access (to verify references)
              </span>
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input type="checkbox" defaultChecked />
              <span style={{ fontSize: "0.9rem" }}>
                Location tracking (for nearby branch locations)
              </span>
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input type="checkbox" defaultChecked />
              <span style={{ fontSize: "0.9rem" }}>
                Share with 500+ trusted partners (for exclusive deals)
              </span>
            </label>
          </div>
          <div
            style={{ fontSize: "0.7rem", color: "#666", marginTop: "0.5rem" }}
          >
            *Unchecking these options may affect your approval chances
          </div>
        </div>
      ),
      explanation:
        "Pre-checked options and deceptive justifications trick users into over-sharing personal data",
      realWorldUse: "Social media platforms, financial apps, dating services",
    },
    {
      id: "loss_aversion_exploitation",
      name: "Loss Aversion Exploitation",
      description:
        "Emphasizing what users will lose rather than what they gain",
      severity: 7,
      example: (
        <div
          style={{
            padding: "1rem",
            border: "2px solid #ff5722",
            borderRadius: "8px",
            background: "#fff3e0",
          }}
        >
          <h4 style={{ color: "#d84315", margin: "0 0 1rem 0" }}>
            ⚠️ You&apos;re About to Lose:
          </h4>
          <ul style={{ margin: "0 0 1rem 1.5rem", color: "#bf360c" }}>
            <li>Your pre-approved $500 loan amount</li>
            <li>48-hour fast funding eligibility</li>
            <li>Special 391% APR rate (normally 664%)</li>
            <li>Priority customer status</li>
            <li>Access to our loyalty program</li>
          </ul>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={{
                flex: 2,
                padding: "0.75rem",
                background: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              Keep My Benefits
            </button>
            <button
              style={{
                flex: 1,
                padding: "0.75rem",
                background: "#757575",
                color: "white",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Give Up Benefits
            </button>
          </div>
        </div>
      ),
      explanation:
        "Frames the decision around loss rather than choice, exploiting psychological loss aversion bias",
      realWorldUse: "Subscription services, loyalty programs, upgrade flows",
    },
    {
      id: "anchoring_manipulation",
      name: "Anchoring Manipulation",
      description:
        "Setting high initial prices to make other options seem reasonable",
      severity: 6,
      example: (
        <div
          style={{
            padding: "1rem",
            border: "2px solid #607d8b",
            borderRadius: "8px",
            background: "#eceff1",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0" }}>Choose Your Loan Amount</h4>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <div
              style={{
                padding: "1rem",
                border: "2px solid #f44336",
                borderRadius: "6px",
                background: "#ffebee",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "10px",
                  background: "#f44336",
                  color: "white",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                }}
              >
                MOST POPULAR
              </div>
              <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                $1,000 - Premium Package
              </div>
              <div style={{ color: "#666" }}>$850 in fees (850% APR)</div>
            </div>
            <div
              style={{
                padding: "1rem",
                border: "1px solid #4caf50",
                borderRadius: "6px",
                background: "#e8f5e8",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                $500 - Standard Package ✨ BEST VALUE
              </div>
              <div style={{ color: "#666" }}>$195 in fees (391% APR)</div>
            </div>
            <div
              style={{
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <div>$300 - Basic Package</div>
              <div style={{ color: "#666" }}>$145 in fees (391% APR)</div>
            </div>
          </div>
        </div>
      ),
      explanation:
        "High-priced option makes middle option seem like good value, even though fees are still predatory",
      realWorldUse: "Software pricing, loan packages, insurance plans",
    },
  ];

  const handlePatternDemo = (patternId: string) => {
    setActivePattern(patternId);
    const pattern = darkPatterns.find((p) => p.id === patternId);
    if (pattern && onPatternDetected) {
      onPatternDetected(pattern.name, pattern.severity);
    }

    // Special handling for interactive patterns
    if (patternId === "confirm_shaming") {
      setConfirmShamingVisible(true);
    } else if (patternId === "roach_motel") {
      setRoachMotelStep(0);
    }
  };

  return (
    <div
      className="advanced-dark-patterns-demo"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "1rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a1a, #333)",
          color: "white",
          padding: "2rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}
        >
          🎭 Advanced Dark Patterns Laboratory
        </h2>
        <p style={{ margin: 0, fontSize: "1rem", opacity: 0.9 }}>
          Interactive demonstrations of sophisticated manipulation techniques
        </p>
      </div>

      {/* Pattern Grid */}
      <div style={{ display: "grid", gap: "2rem" }}>
        {darkPatterns.map((pattern) => (
          <div
            key={pattern.id}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              border:
                activePattern === pattern.id
                  ? "2px solid #ff5722"
                  : "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                  }}
                >
                  {pattern.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 0.5rem 0",
                    color: "#666",
                    fontSize: "0.95rem",
                  }}
                >
                  {pattern.description}
                </p>
              </div>
              <div
                style={{
                  background:
                    pattern.severity >= 8
                      ? "#f44336"
                      : pattern.severity >= 6
                        ? "#ff9800"
                        : "#4caf50",
                  color: "white",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  minWidth: "60px",
                  textAlign: "center",
                }}
              >
                {pattern.severity}/10
              </div>
            </div>

            {/* Pattern Example */}
            <div style={{ marginBottom: "1rem" }}>
              <h4
                style={{
                  margin: "0 0 0.75rem 0",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Live Example:
              </h4>
              {pattern.example}
            </div>

            {/* Educational Information */}
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>How it works:</strong> {pattern.explanation}
              </div>
              <div>
                <strong>Used by:</strong> {pattern.realWorldUse}
              </div>
            </div>

            {/* Interactive Button */}
            <button
              onClick={() => handlePatternDemo(pattern.id)}
              style={{
                padding: "0.75rem 1.5rem",
                background:
                  activePattern === pattern.id ? "#ff5722" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {activePattern === pattern.id
                ? "🔍 Analyzing Pattern"
                : "🧪 Demonstrate Pattern"}
            </button>
          </div>
        ))}
      </div>

      {/* Confirm Shaming Modal */}
      {confirmShamingVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "#f44336",
                marginBottom: "1rem",
                fontSize: "1.5rem",
              }}
            >
              😢 Are you sure you want to abandon your financial future?
            </h3>
            <p style={{ marginBottom: "2rem", color: "#666" }}>
              Millions of Americans struggle with unexpected expenses.
              Don&apos;t let pride prevent you from getting the help you
              deserve.
            </p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button
                onClick={() => setConfirmShamingVisible(false)}
                style={{
                  padding: "1rem 2rem",
                  background: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                You&apos;re right, I need this loan
              </button>
              <button
                onClick={() => setConfirmShamingVisible(false)}
                style={{
                  padding: "1rem 2rem",
                  background: "#757575",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                }}
              >
                No, I&apos;ll struggle on my own
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Educational Summary */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e40af, #0369a1)",
          color: "white",
          padding: "2rem",
          borderRadius: "12px",
          marginTop: "2rem",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
        >
          🛡️ Protection Strategies
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            textAlign: "left",
          }}
        >
          <div>
            <strong>🕒 Time Pressure:</strong> Take 24 hours before major
            financial decisions
          </div>
          <div>
            <strong>🔍 Read Carefully:</strong> Question pre-checked boxes and
            fine print
          </div>
          <div>
            <strong>📊 Compare Options:</strong> Always shop around and compare
            total costs
          </div>
          <div>
            <strong>🧠 Recognize Manipulation:</strong> Be aware of emotional
            pressure tactics
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDarkPatternsDemo;
