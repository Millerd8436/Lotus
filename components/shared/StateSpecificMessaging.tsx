import React, { useEffect, useState } from "react";

interface StateSpecificMessagingProps {
  selectedState?: string;
  onStateChange?: (state: string, regulations: StateRegulation) => void;
}

interface StateRegulation {
  state_code: string;
  state_name: string;
  payday_legal: boolean;
  max_amount: number | string;
  max_term_days: number | string;
  max_fee: string;
  apr_range: string;
  cooling_off: string;
  database_required: boolean;
  rollover_limit: number;
  compliance_level?: "strict" | "moderate" | "permissive" | undefined;
  predatory_messaging?: PredatoryMessage[] | undefined;
  regulatory_warnings?: RegulatoryWarning[] | undefined;
  enforcement_strength?: number | undefined; // 1-10 scale
}

interface PredatoryMessage {
  type: "urgency" | "targeting" | "minimization" | "deception";
  message: string;
  context: string;
}

interface RegulatoryWarning {
  type: "required" | "suggested" | "minimal";
  message: string;
  font_size: string;
  prominence: number; // 1-10 scale
}

const StateSpecificMessaging: React.FC<StateSpecificMessagingProps> = ({
  selectedState = "TX",
  onStateChange,
}) => {
  const [currentState, setCurrentState] = useState(selectedState);
  const [showComparison, setShowComparison] = useState(false);

  // State-specific regulations and loopholes (2025 Updated)
  const stateRegulations: Record<string, StateRegulation> = {
    // STATES WITH NO RATE CAPS
    DE: {
      maxAPR: 9999, // No limit
      paydayStatus: "permitted",
      loopholes: ["no_usury_cap", "rent_a_bank", "credit_card_bank_friendly"],
      warnings: ["No interest rate caps - APRs can exceed 600%"],
      alternatives: "Credit unions, employer advances",
    },
    MO: {
      maxAPR: 652, // Average payday loan APR
      paydayStatus: "permitted",
      loopholes: ["no_usury_cap", "weak_enforcement"],
      warnings: ["No meaningful rate caps - average APR is 652%"],
      alternatives: "Nonprofit lenders, payment plans",
    },

    // STATES WITH HIGH CAPS
    ID: {
      maxAPR: 300, // Must not be "unconscionable"
      paydayStatus: "permitted",
      loopholes: ["unconscionable_standard", "rent_a_bank"],
      warnings: ["Rates up to 300% APR considered acceptable"],
      alternatives: "Credit counseling, community assistance",
    },
    UT: {
      maxAPR: 300, // Must not be "unconscionable"
      paydayStatus: "permitted",
      loopholes: ["unconscionable_standard", "bank_charter_haven"],
      warnings: ["Home to many rent-a-bank schemes"],
      alternatives: "Emergency assistance programs",
    },
    WI: {
      maxAPR: 300, // Must not be "unconscionable"
      paydayStatus: "permitted",
      loopholes: ["unconscionable_standard", "weak_enforcement"],
      warnings: ["Vague consumer protections"],
      alternatives: "Local credit unions, charity assistance",
    },
    SC: {
      maxAPR: 300, // Unconscionable standard for $2000+
      paydayStatus: "permitted",
      loopholes: ["unconscionable_standard", "tiered_caps"],
      warnings: ["Higher loan amounts have no meaningful cap"],
      alternatives: "Employer-based loans, credit counseling",
    },
    AL: {
      maxAPR: 300, // Unconscionable standard for $2000+
      paydayStatus: "permitted",
      loopholes: ["unconscionable_standard", "weak_enforcement", "junk_fees"],
      warnings: ["Additional fees can push effective APR higher"],
      alternatives: "Community development financial institutions",
    },

    // HIGH APR STATES (100%+)
    NV: {
      maxAPR: 652, // Average for payday loans
      paydayStatus: "permitted",
      loopholes: ["weak_regulation", "tourism_loophole"],
      warnings: ["Average payday loan APR exceeds 650%"],
      alternatives: "Nonprofit emergency funds",
    },
    MS: {
      maxAPR: 59, // But extended to $5,100 loans in 2024
      paydayStatus: "permitted",
      loopholes: ["expanded_limits", "weak_enforcement"],
      warnings: ["Recent expansion allows 59% APR on larger loans"],
      alternatives: "Faith-based assistance, credit unions",
    },
    OK: {
      maxAPR: 54, // Increased from 34% in 2022
      paydayStatus: "permitted",
      loopholes: ["increasing_caps", "annual_adjustments"],
      warnings: ["APR caps increase annually with inflation"],
      alternatives: "Tribal lending programs, employer advances",
    },
    TX: {
      maxAPR: 48, // Plus increasing fees
      paydayStatus: "permitted",
      loopholes: ["fee_inflation", "auto_title_loans"],
      warnings: ["Fees increase annually, auto title loans common"],
      alternatives: "Emergency assistance, payment plans",
    },

    // MODERATE PROTECTION STATES (36-60% APR)
    FL: {
      maxAPR: 52, // Increased from 48% in 2024
      paydayStatus: "permitted",
      loopholes: ["recent_increase", "larger_loan_exposure"],
      warnings: ["Rate cap recently increased to 52% APR"],
      alternatives: "Credit union payday alternatives",
    },
    KS: {
      maxAPR: 38, // Extended to entire loan in 2025
      paydayStatus: "permitted",
      loopholes: ["recent_expansion", "weak_enforcement"],
      warnings: ["36% rate now applies to entire loan amount"],
      alternatives: "Employer-sponsored programs",
    },

    // STRONG PROTECTION STATES (≤36% APR)
    CA: {
      maxAPR: 36,
      paydayStatus: "restricted",
      loopholes: ["rent_a_bank", "online_lenders"],
      warnings: ["Watch for out-of-state online lenders"],
      alternatives: "Earned wage access, credit unions",
    },
    NY: {
      maxAPR: 25,
      paydayStatus: "prohibited",
      loopholes: ["merchant_cash_advance", "online_tribal"],
      warnings: ["Beware merchant cash advances targeting businesses"],
      alternatives: "Community development financial institutions",
    },
    IL: {
      maxAPR: 36,
      paydayStatus: "restricted",
      loopholes: ["rent_a_bank_attempts"],
      warnings: ["Strong 2021 law but rent-a-bank schemes persist"],
      alternatives: "State assistance programs, credit counseling",
    },
    CO: {
      maxAPR: 36,
      paydayStatus: "restricted",
      loopholes: ["recently_closed"],
      warnings: ["2023 law closed rent-a-bank loopholes"],
      alternatives: "Nonprofit lenders, employer advances",
    },
    MN: {
      maxAPR: 50, // For small loans
      paydayStatus: "restricted",
      loopholes: ["recently_strengthened"],
      warnings: ["2024 law added strong anti-evasion provisions"],
      alternatives: "Emergency assistance funds",
    },
    CT: {
      maxAPR: 36,
      paydayStatus: "restricted",
      loopholes: ["recently_strengthened"],
      warnings: ["2023 law tightened rent-a-bank restrictions"],
      alternatives: "Credit union small dollar loans",
    },
    WA: {
      maxAPR: 36,
      paydayStatus: "restricted",
      loopholes: ["recently_strengthened"],
      warnings: ["2024 law clarified all-in APR calculations"],
      alternatives: "Earned wage access, payment plans",
    },

    // STATES WITH RECENT IMPROVEMENTS
    KY: {
      maxAPR: 36,
      paydayStatus: "restricted",
      loopholes: ["auto_title_banned"],
      warnings: ["2024 law abolished high-cost auto title loans"],
      alternatives: "Community assistance, credit counseling",
    },
    NC: {
      maxAPR: 35, // Increased from 31% but still protective
      paydayStatus: "prohibited",
      loopholes: ["rate_creep", "online_lenders"],
      warnings: ["Rate increased to 35% in 2023"],
      alternatives: "State employees credit union programs",
    },
  };

  // Add remaining states with similar comprehensive data...
  const additionalStates = {
    AK: {
      ...stateRegulations["TX"],
      state_code: "AK",
      state_name: "Alaska",
      max_amount: 500,
      apr_range: "391%",
    },
    AZ: {
      ...stateRegulations["NY"],
      state_code: "AZ",
      state_name: "Arizona",
      apr_range: "36% cap",
    },
    AR: {
      ...stateRegulations["NY"],
      state_code: "AR",
      state_name: "Arkansas",
      apr_range: "17% cap",
    },
    CO: {
      ...stateRegulations["CA"],
      state_code: "CO",
      state_name: "Colorado",
      max_amount: 500,
      apr_range: "200%",
    },
    CT: {
      ...stateRegulations["NY"],
      state_code: "CT",
      state_name: "Connecticut",
      apr_range: "12% cap",
    },
    DE: {
      ...stateRegulations["TX"],
      state_code: "DE",
      state_name: "Delaware",
      max_amount: 1000,
      apr_range: "521%",
    },
    GA: {
      ...stateRegulations["NY"],
      state_code: "GA",
      state_name: "Georgia",
      apr_range: "60% cap",
    },
    HI: {
      ...stateRegulations["CA"],
      state_code: "HI",
      state_name: "Hawaii",
      max_amount: 600,
      apr_range: "460%",
    },
    ID: {
      ...stateRegulations["TX"],
      state_code: "ID",
      state_name: "Idaho",
      max_amount: 1000,
      apr_range: "652%",
    },
    IL: {
      ...stateRegulations["CA"],
      state_code: "IL",
      state_name: "Illinois",
      max_amount: 1000,
      apr_range: "404%",
    },
    IN: {
      ...stateRegulations["CA"],
      state_code: "IN",
      state_name: "Indiana",
      max_amount: 550,
      apr_range: "391%",
    },
    IA: {
      ...stateRegulations["CA"],
      state_code: "IA",
      state_name: "Iowa",
      max_amount: 500,
      apr_range: "391%",
    },
    KS: {
      ...stateRegulations["TX"],
      state_code: "KS",
      state_name: "Kansas",
      max_amount: 500,
      apr_range: "391%",
    },
    KY: {
      ...stateRegulations["CA"],
      state_code: "KY",
      state_name: "Kentucky",
      max_amount: 500,
      apr_range: "459%",
    },
    LA: {
      ...stateRegulations["TX"],
      state_code: "LA",
      state_name: "Louisiana",
      max_amount: 350,
      apr_range: "391%",
    },
    ME: {
      ...stateRegulations["NY"],
      state_code: "ME",
      state_name: "Maine",
      apr_range: "30% cap",
    },
    MD: {
      ...stateRegulations["NY"],
      state_code: "MD",
      state_name: "Maryland",
      apr_range: "33% cap",
    },
    MA: {
      ...stateRegulations["NY"],
      state_code: "MA",
      state_name: "Massachusetts",
      apr_range: "23% cap",
    },
    MI: {
      ...stateRegulations["CA"],
      state_code: "MI",
      state_name: "Michigan",
      max_amount: 600,
      apr_range: "391%",
    },
    MN: {
      ...stateRegulations["CA"],
      state_code: "MN",
      state_name: "Minnesota",
      max_amount: 350,
      apr_range: "390%",
    },
    MS: {
      ...stateRegulations["TX"],
      state_code: "MS",
      state_name: "Mississippi",
      max_amount: 500,
      apr_range: "520%",
    },
    NE: { ...stateRegulations["MT"], state_code: "NE", state_name: "Nebraska" },
    NV: {
      ...stateRegulations["TX"],
      state_code: "NV",
      state_name: "Nevada",
      max_amount: "Unlimited",
      apr_range: "Unlimited",
    },
    NH: {
      ...stateRegulations["NY"],
      state_code: "NH",
      state_name: "New Hampshire",
      apr_range: "36% cap",
    },
    NJ: {
      ...stateRegulations["NY"],
      state_code: "NJ",
      state_name: "New Jersey",
      apr_range: "30% cap",
    },
    NM: {
      ...stateRegulations["CA"],
      state_code: "NM",
      state_name: "New Mexico",
      max_amount: 500,
      apr_range: "400%",
    },
    NC: {
      ...stateRegulations["NY"],
      state_code: "NC",
      state_name: "North Carolina",
      apr_range: "30% cap",
    },
    ND: {
      ...stateRegulations["TX"],
      state_code: "ND",
      state_name: "North Dakota",
      max_amount: 500,
      apr_range: "520%",
    },
    OH: {
      ...stateRegulations["CA"],
      state_code: "OH",
      state_name: "Ohio",
      max_amount: 1000,
      apr_range: "391%",
    },
    OK: {
      ...stateRegulations["TX"],
      state_code: "OK",
      state_name: "Oklahoma",
      max_amount: 500,
      apr_range: "456%",
    },
    OR: {
      ...stateRegulations["CA"],
      state_code: "OR",
      state_name: "Oregon",
      max_amount: 50,
      apr_range: "154%",
    },
    PA: {
      ...stateRegulations["NY"],
      state_code: "PA",
      state_name: "Pennsylvania",
      apr_range: "6% cap",
    },
    RI: {
      ...stateRegulations["CA"],
      state_code: "RI",
      state_name: "Rhode Island",
      max_amount: 500,
      apr_range: "260%",
    },
    SC: {
      ...stateRegulations["CA"],
      state_code: "SC",
      state_name: "South Carolina",
      max_amount: 550,
      apr_range: "391%",
    },
    SD: {
      ...stateRegulations["TX"],
      state_code: "SD",
      state_name: "South Dakota",
      max_amount: 500,
      apr_range: "391%",
    },
    TN: {
      ...stateRegulations["CA"],
      state_code: "TN",
      state_name: "Tennessee",
      max_amount: 400,
      apr_range: "391%",
    },
    UT: {
      ...stateRegulations["TX"],
      state_code: "UT",
      state_name: "Utah",
      max_amount: 1000,
      apr_range: "547%",
    },
    VT: {
      ...stateRegulations["NY"],
      state_code: "VT",
      state_name: "Vermont",
      apr_range: "18% cap",
    },
    VA: {
      ...stateRegulations["CA"],
      state_code: "VA",
      state_name: "Virginia",
      max_amount: 500,
      apr_range: "391%",
    },
    WA: {
      ...stateRegulations["CA"],
      state_code: "WA",
      state_name: "Washington",
      max_amount: 700,
      apr_range: "391%",
    },
    WV: {
      ...stateRegulations["TX"],
      state_code: "WV",
      state_name: "West Virginia",
      max_amount: 500,
      apr_range: "391%",
    },
    WI: {
      ...stateRegulations["CA"],
      state_code: "WI",
      state_name: "Wisconsin",
      max_amount: 1500,
      apr_range: "547%",
    },
    WY: {
      ...stateRegulations["TX"],
      state_code: "WY",
      state_name: "Wyoming",
      max_amount: 200,
      apr_range: "780%",
    },
  };

  const allStates = { ...stateRegulations, ...additionalStates };

  const currentRegulation = allStates[currentState as keyof typeof allStates];

  useEffect(() => {
    if (onStateChange && currentRegulation) {
      // Ensure currentRegulation meets StateRegulation requirements
      const normalizedRegulation: StateRegulation = {
        state_code: currentRegulation.state_code,
        state_name: currentRegulation.state_name,
        payday_legal: currentRegulation.payday_legal ?? true,
        max_amount: currentRegulation.max_amount ?? 500,
        max_term_days: currentRegulation.max_term_days ?? 14,
        max_fee: currentRegulation.max_fee ?? "No limit",
        apr_range: currentRegulation.apr_range ?? "500%",
        cooling_off: currentRegulation.cooling_off ?? "None",
        database_required: currentRegulation.database_required ?? false,
        rollover_limit: currentRegulation.rollover_limit ?? 999,
        compliance_level: currentRegulation.compliance_level ?? "moderate",
        predatory_messaging: currentRegulation.predatory_messaging ?? [],
        regulatory_warnings: currentRegulation.regulatory_warnings ?? [],
        enforcement_strength: currentRegulation.enforcement_strength ?? 5,
      };
      onStateChange(currentState, normalizedRegulation);
    }
  }, [currentState, onStateChange, currentRegulation]);

  if (!currentRegulation) {
    return <div>Loading state data...</div>;
  }

  const getComplianceColor = (level: string) => {
    switch (level) {
      case "strict":
        return "#4caf50";
      case "moderate":
        return "#ff9800";
      case "permissive":
        return "#f44336";
      default:
        return "#666";
    }
  };

  const getAPRSeverity = (apr: string) => {
    const numericAPR = parseInt(apr);
    if (numericAPR > 500) return { color: "#d32f2f", level: "EXTREME" };
    if (numericAPR > 300) return { color: "#f44336", level: "VERY HIGH" };
    if (numericAPR > 100) return { color: "#ff9800", level: "HIGH" };
    if (numericAPR > 36) return { color: "#fbc02d", level: "ELEVATED" };
    return { color: "#4caf50", level: "REASONABLE" };
  };

  return (
    <div
      className="state-specific-messaging"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #2e7d32, #4caf50)",
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
          🗺️ 50-State Compliance Simulator
        </h2>
        <p style={{ margin: 0, fontSize: "1rem", opacity: 0.9 }}>
          See how predatory lenders adapt messaging and terms to each state's
          regulations
        </p>
      </div>

      {/* State Selector */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          Select State to View Compliance Strategy
        </h3>
        <select
          value={currentState}
          onChange={(e) => setCurrentState(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "1rem",
            background: "white",
          }}
        >
          {Object.entries(allStates).map(([code, state]) => (
            <option key={code} value={code}>
              {state.state_name} ({code}) -{" "}
              {state.payday_legal ? `${state.apr_range} APR` : "Prohibited"}
            </option>
          ))}
        </select>
      </div>

      {currentRegulation && (
        <>
          {/* State Overview */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              border: `3px solid ${getComplianceColor(
                currentRegulation.compliance_level || "moderate"
              )}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {currentRegulation.state_name} ({currentRegulation.state_code}
                  )
                </h3>
                <div
                  style={{
                    display: "inline-block",
                    background: getComplianceColor(
                      currentRegulation.compliance_level || "moderate"
                    ),
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {currentRegulation.compliance_level || "Moderate"} Regulations
                </div>
              </div>
              <div
                style={{
                  background: getAPRSeverity(
                    currentRegulation.apr_range || "500%"
                  ).color,
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {currentRegulation.apr_range}
                <div style={{ fontSize: "0.7rem", opacity: 0.9 }}>
                  {getAPRSeverity(currentRegulation.apr_range || "500%").level}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <strong>Legal Status:</strong>
                <br />
                <span
                  style={{
                    color: currentRegulation.payday_legal
                      ? "#d32f2f"
                      : "#4caf50",
                  }}
                >
                  {currentRegulation.payday_legal
                    ? "❌ Legal & Exploitative"
                    : "✅ Prohibited/Restricted"}
                </span>
              </div>
              <div>
                <strong>Max Amount:</strong>
                <br />${currentRegulation.max_amount}
              </div>
              <div>
                <strong>Max Term:</strong>
                <br />
                {currentRegulation.max_term_days} days
              </div>
              <div>
                <strong>Max Fee:</strong>
                <br />
                {currentRegulation.max_fee}
              </div>
              <div>
                <strong>Database Required:</strong>
                <br />
                {currentRegulation.database_required ? "✅ Yes" : "❌ No"}
              </div>
              <div>
                <strong>Enforcement Strength:</strong>
                <br />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span>{currentRegulation.enforcement_strength || 5}/10</span>
                  <div
                    style={{
                      width: "50px",
                      height: "8px",
                      background: "#e0e0e0",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${
                          (currentRegulation.enforcement_strength || 5) * 10
                        }%`,
                        height: "100%",
                        background:
                          (currentRegulation.enforcement_strength || 5) > 6
                            ? "#4caf50"
                            : (currentRegulation.enforcement_strength || 5) > 3
                            ? "#ff9800"
                            : "#f44336",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Predatory Messaging Examples */}
          {currentRegulation.predatory_messaging &&
            currentRegulation.predatory_messaging.length > 0 && (
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "2rem",
                  marginBottom: "2rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  border: "2px solid #ff5722",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#d32f2f",
                  }}
                >
                  🎭 Predatory Messaging Tactics
                </h3>
                <p
                  style={{
                    margin: "0 0 1.5rem 0",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  How lenders adapt their manipulation tactics to your state's
                  regulatory environment:
                </p>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {currentRegulation.predatory_messaging.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "1rem",
                        background: "#fff3e0",
                        border: "1px solid #ff9800",
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            background: "#ff9800",
                            color: "white",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          {msg.type}
                        </div>
                      </div>
                      <div
                        style={{
                          fontWeight: "bold",
                          marginBottom: "0.5rem",
                          fontSize: "1rem",
                        }}
                      >
                        "{msg.message}"
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#666" }}>
                        <strong>Tactic:</strong> {msg.context}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Regulatory Warnings */}
          {currentRegulation.regulatory_warnings &&
            currentRegulation.regulatory_warnings.length > 0 && (
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "2rem",
                  marginBottom: "2rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  border: "2px solid #4caf50",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#2e7d32",
                  }}
                >
                  ⚖️ Required Regulatory Disclosures
                </h3>
                <p
                  style={{
                    margin: "0 0 1.5rem 0",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  Legal warnings and disclosures required in this state:
                </p>
                <div style={{ display: "grid", gap: "1rem" }}>
                  {currentRegulation.regulatory_warnings.map(
                    (warning, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "1rem",
                          background:
                            warning.prominence > 6 ? "#e8f5e8" : "#f9f9f9",
                          border: `1px solid ${
                            warning.prominence > 6 ? "#4caf50" : "#ddd"
                          }`,
                          borderRadius: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              background:
                                warning.prominence > 6 ? "#4caf50" : "#757575",
                              color: "white",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "4px",
                              fontSize: "0.8rem",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            {warning.type}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#666" }}>
                            Prominence: {warning.prominence}/10 • Size:{" "}
                            {warning.font_size}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: warning.font_size,
                            fontWeight:
                              warning.prominence > 6 ? "bold" : "normal",
                            color: warning.prominence > 6 ? "#2e7d32" : "#666",
                          }}
                        >
                          {warning.message}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* State Comparison Tool */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold" }}>
                📊 Compare States
              </h3>
              <button
                onClick={() => setShowComparison(!showComparison)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {showComparison ? "Hide" : "Show"} Comparison
              </button>
            </div>

            {showComparison && (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.9rem",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#f5f5f5" }}>
                      <th
                        style={{
                          padding: "0.75rem",
                          textAlign: "left",
                          borderBottom: "2px solid #ddd",
                        }}
                      >
                        State
                      </th>
                      <th
                        style={{
                          padding: "0.75rem",
                          textAlign: "left",
                          borderBottom: "2px solid #ddd",
                        }}
                      >
                        Legal
                      </th>
                      <th
                        style={{
                          padding: "0.75rem",
                          textAlign: "left",
                          borderBottom: "2px solid #ddd",
                        }}
                      >
                        Max APR
                      </th>
                      <th
                        style={{
                          padding: "0.75rem",
                          textAlign: "left",
                          borderBottom: "2px solid #ddd",
                        }}
                      >
                        Max Amount
                      </th>
                      <th
                        style={{
                          padding: "0.75rem",
                          textAlign: "left",
                          borderBottom: "2px solid #ddd",
                        }}
                      >
                        Protection Level
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(allStates)
                      .slice(0, 10)
                      .map(([code, state]) => (
                        <tr
                          key={code}
                          style={{ borderBottom: "1px solid #eee" }}
                        >
                          <td style={{ padding: "0.5rem", fontWeight: "bold" }}>
                            {state.state_name}
                          </td>
                          <td style={{ padding: "0.5rem" }}>
                            <span
                              style={{
                                color: state.payday_legal
                                  ? "#f44336"
                                  : "#4caf50",
                              }}
                            >
                              {state.payday_legal ? "❌" : "✅"}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "0.5rem",
                              color: getAPRSeverity(state.apr_range || "500%")
                                .color,
                              fontWeight: "bold",
                            }}
                          >
                            {state.apr_range}
                          </td>
                          <td style={{ padding: "0.5rem" }}>
                            ${state.max_amount}
                          </td>
                          <td style={{ padding: "0.5rem" }}>
                            <span
                              style={{
                                background: getComplianceColor(
                                  state.compliance_level || "moderate"
                                ),
                                color: "white",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "4px",
                                fontSize: "0.8rem",
                              }}
                            >
                              {state.compliance_level || "Moderate"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Educational Summary */}
      <div
        style={{
          background: "linear-gradient(135deg, #673ab7, #9c27b0)",
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
          🎓 Key Learning: Regulatory Arbitrage
        </h3>
        <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
          Predatory lenders deliberately operate in states with the weakest
          consumer protections while using sophisticated messaging to exploit
          local conditions. States with strong regulations (36% APR caps)
          effectively eliminate the payday lending business model, proving that
          consumer protection works.
        </p>
      </div>
    </div>
  );
};

export default StateSpecificMessaging;
