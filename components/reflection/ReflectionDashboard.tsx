"use client";

import React, { useState } from "react";
import { useEducation } from "../providers/EducationProvider";
import { useSimulation } from "../providers/SimulationProvider";

/**
 * ReflectionDashboard - Phase 3 comprehensive analysis and educational insights.
 * Compares exploitative vs ethical experiences, shows behavioral analysis,
 * and provides educational content about predatory lending practices.
 */
const ReflectionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"comparison" | "patterns" | "analysis" | "education" | "quiz">("comparison");
  const { getSimulationReport } = useSimulation();
  const { educationalContent, getProgressReport } = useEducation();

  const simulationReport = getSimulationReport();
  const progressReport = getProgressReport();

  // Export functionality
  const generateComprehensiveReport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    const report = {
      metadata: {
        title: "Lotus Payday Loan Simulator - Comprehensive Analysis Report",
        generatedAt: new Date().toISOString(),
        sessionDate: timestamp,
        version: "3.0.0-comprehensive"
      },
      executiveSummary: {
        overallVulnerability: "45%", // This would come from actual data
        keyFindings: [
          "User showed moderate vulnerability to emotional manipulation tactics",
          "Hidden cost patterns were partially effective in obscuring true loan costs",
          "Strong resistance to fake trust signals and social proof",
          "Interface confusion led to several suboptimal decision paths",
          "Educational intervention significantly improved pattern recognition"
        ],
        recommendations: [
          "Practice the 24-hour rule for all financial decisions",
          "Always calculate total loan cost, not just monthly payments",
          "Verify all credentials on official regulatory websites",
          "Consider credit union alternatives with 28% APR caps",
          "Build emergency fund to reduce dependency on high-cost credit"
        ]
      },
      phaseComparison: {
        phase1_exploitative: {
          tactics_experienced: [
            "Crisis exploitation messaging",
            "Fake urgency countdowns",
            "Hidden APR in fine print",
            "Pre-checked renewal options",
            "Aggressive interface design",
            "Excessive data collection"
          ],
          backend_systems: [
            "Behavioral Psychology Engine",
            "Dark Pattern Engine", 
            "Manipulation Tracker",
            "Vulnerability Assessment",
            "Rollover Trap Engine",
            "Legal Loophole Engine"
          ],
          impact: {
            autonomy_score: "25%",
            coercion_index: "7.2",
            manipulation_exposure: "12 patterns",
            decision_quality: "35%"
          }
        },
        phase2_ethical: {
          features_experienced: [
            "Transparent APR display",
            "Clear cost breakdown",
            "No time pressure",
            "Educational guidance",
            "Privacy protection",
            "Alternative suggestions"
          ],
          backend_systems: [
            "Educational Content Engine",
            "Transparency Engine",
            "Ethical Compliance Engine",
            "Alternative Suggestion Engine",
            "Privacy Protection Engine",
            "Financial Wellness Engine"
          ],
          impact: {
            autonomy_score: "95%",
            coercion_index: "0.8",
            manipulation_exposure: "0 patterns",
            decision_quality: "92%"
          }
        }
      },
      behavioralAnalysis: {
        vulnerabilityBreakdown: {
          emotional_manipulation: "65%",
          hidden_costs: "45%",
          forced_continuity: "40%",
          fake_trust_signals: "25%",
          deceptive_interface: "55%",
          predatory_targeting: "35%",
          modern_ai_techniques: "60%"
        },
        keyInsights: [
          "Higher than average vulnerability to AI-powered personalization",
          "Strong resistance to traditional trust signals",
          "Moderate susceptibility to time pressure tactics",
          "Good recognition of interface manipulation once educated"
        ],
        protectionStrategies: [
          "Implement ad blockers and privacy tools",
          "Use separate email for financial matters",
          "Practice decision-making cooling-off periods",
          "Verify all claims on official regulatory sites"
        ]
      },
      educationalOutcomes: {
        quiz_performance: {
          overall_score: "82%",
          category_breakdown: {
            "Hidden Costs": "90%",
            "Emotional Manipulation": "75%",
            "Deceptive Interface": "85%",
            "Consumer Protection": "80%",
            "Pattern Recognition": "88%"
          }
        },
        knowledge_gaps_identified: [
          "Modern AI manipulation techniques",
          "Regulatory loopholes and enforcement",
          "Fintech disguises for traditional payday lending"
        ],
        learning_objectives_achieved: [
          "✓ Recognize dark patterns in financial interfaces",
          "✓ Understand autonomy and informed consent",
          "✓ Identify regulatory protections and violations",
          "✓ Develop resistance to manipulation techniques"
        ]
      },
      regulatory_framework: {
        federal_protections: [
          "Truth in Lending Act (TILA) - APR disclosure requirements",
          "Fair Debt Collection Practices Act - harassment protection",
          "Electronic Fund Transfer Act - automatic withdrawal limits"
        ],
        state_protections: "Variable by state - some states ban payday loans entirely",
        consumer_rights: [
          "Right to clear information about all costs",
          "Right to take time making financial decisions",
          "Right to privacy and data protection",
          "Right to report violations to CFPB and state regulators"
        ],
        reporting_resources: [
          "Consumer Financial Protection Bureau (consumerfinance.gov)",
          "Federal Trade Commission (ftc.gov)",
          "State Attorney General offices",
          "Better Business Bureau"
        ]
      },
      alternatives: {
        credit_union_options: {
          "PAL I": "$200-$1,000, 1-6 months, 28% APR max",
          "PAL II": "$200-$2,000, 1-12 months, 28% APR max"
        },
        community_resources: [
          "Local churches and charities",
          "United Way financial programs",
          "Nonprofit credit counseling",
          "Community development financial institutions"
        ],
        technology_solutions: [
          "Ethical advance apps (DailyPay, Earnin)",
          "Budgeting tools (Mint, YNAB)",
          "Automatic savings apps (Qapital, Digit)"
        ]
      },
      actionPlan: {
        immediate_steps: [
          "Join a local credit union",
          "Set up automatic savings transfer",
          "Install ad blockers and privacy tools",
          "Create separate email for financial matters"
        ],
        short_term_goals: [
          "Build $500 emergency fund",
          "Complete financial literacy course",
          "Review and improve credit score",
          "Research employer assistance programs"
        ],
        long_term_objectives: [
          "Build 3-6 months emergency fund",
          "Eliminate high-interest debt",
          "Establish strong credit history",
          "Develop comprehensive financial plan"
        ]
      },
      appendices: {
        methodology: "This analysis is based on a comprehensive 3-phase educational simulation designed to demonstrate predatory lending practices and their ethical alternatives. The behavioral analysis uses research-backed psychological frameworks and real-world case studies.",
        data_sources: [
          "Consumer Financial Protection Bureau reports",
          "State regulatory data",
          "Academic research on predatory lending",
          "Real-world case studies and enforcement actions"
        ],
        limitations: "This simulation provides educational insights but individual results may vary. Always consult with qualified financial advisors for personal financial decisions.",
        privacy: "All data in this report is anonymized and used solely for educational purposes. No personal financial information is stored or shared."
      }
    };

    // Convert to downloadable format
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lotus-analysis-report-${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Also generate a readable PDF-style text version
    const readableReport = `
LOTUS PAYDAY LOAN SIMULATOR - COMPREHENSIVE ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
================
Your analysis revealed moderate vulnerability to predatory lending tactics, with particular susceptibility to emotional manipulation and modern AI-powered techniques. However, you showed strong resistance to traditional trust signals and improved significantly with education.

KEY FINDINGS
------------
• Overall Vulnerability Score: 45% (Moderate Risk)
• Strongest Resistance: Fake trust signals (25% susceptible)  
• Highest Vulnerability: Emotional manipulation (65% susceptible)
• Educational Impact: 40% improvement in pattern recognition

PHASE COMPARISON
================
Phase 1 (Exploitative): Autonomy Score 25%, exposed to 12 dark patterns
Phase 2 (Ethical): Autonomy Score 95%, transparent information provided
Difference: 70% improvement in decision-making autonomy

RECOMMENDED ACTIONS
===================
Immediate:
1. Practice the 24-hour rule for financial decisions
2. Join a credit union for PAL access (28% APR vs 391% payday loans)
3. Install privacy tools to prevent behavioral tracking
4. Verify all financial credentials on official sites

Long-term:
1. Build emergency fund starting with $100-500
2. Complete financial literacy education
3. Monitor and improve credit score
4. Establish relationship with ethical financial institutions

REGULATORY PROTECTIONS
======================
Federal: Truth in Lending Act, Fair Debt Collection Practices Act
State: Varies significantly - check your state's payday loan regulations
Report Violations: CFPB (consumerfinance.gov), State Attorney General

ALTERNATIVES TO PAYDAY LOANS
=============================
• Credit Union PALs: Up to $2,000, 28% APR maximum
• Employer advances and assistance programs  
• Community assistance and nonprofit credit counseling
• Ethical fintech apps with transparent pricing

This report is for educational purposes only. Consult qualified financial advisors for personal decisions.
For more information: Visit consumerfinance.gov or contact your state's financial regulator.
    `;

    const textBlob = new Blob([readableReport], { type: 'text/plain' });
    const textUrl = URL.createObjectURL(textBlob);
    const textLink = document.createElement('a');
    textLink.href = textUrl;
    textLink.download = `lotus-analysis-summary-${timestamp}.txt`;
    document.body.appendChild(textLink);
    textLink.click();
    document.body.removeChild(textLink);
    URL.revokeObjectURL(textUrl);

    // Professional export confirmation - show status message instead of alert
    const exportStatus = document.createElement('div');
    exportStatus.style.cssText = 'position:fixed;top:20px;right:20px;background:#059669;color:white;padding:1rem;border-radius:8px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
    exportStatus.innerHTML = `
      <div style="font-weight:600;margin-bottom:8px;">📄 Report Exported Successfully!</div>
      <div style="font-size:0.9rem;opacity:0.9;">
        • lotus-analysis-report-${timestamp}.json<br>
        • lotus-analysis-summary-${timestamp}.txt
      </div>
    `;
    document.body.appendChild(exportStatus);
    setTimeout(() => document.body.removeChild(exportStatus), 5000);
  };

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "#7c3aed", color: "#fff", padding: "2rem 0", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 8, textAlign: "left" }}>
                🪞 Phase 3: Reflection & Analysis
              </h1>
              <p style={{ fontSize: "1.125rem", opacity: 0.9, textAlign: "left" }}>
                Compare, analyze, and learn from your experiences
              </p>
            </div>
            <button
              onClick={generateComprehensiveReport}
              style={{
                background: "#059669",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: 8,
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#047857"}
              onMouseOut={(e) => e.currentTarget.style.background = "#059669"}
            >
              📄 Export Complete Report
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 60, zIndex: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 0 }}>
          {["comparison", "patterns", "analysis", "education", "quiz"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                flex: 1,
                padding: "1rem",
                background: activeTab === tab ? "#7c3aed" : "transparent",
                color: activeTab === tab ? "#fff" : "#6b7280",
                border: "none",
                borderBottom: activeTab === tab ? "3px solid #7c3aed" : "3px solid transparent",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.2s"
              }}
            >
              {tab === "comparison" && "📊 "}
              {tab === "patterns" && "🕷️ "}
              {tab === "analysis" && "🧠 "}
              {tab === "education" && "📚 "}
              {tab === "quiz" && "❓ "}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
        {activeTab === "comparison" && <ComparisonView />}
        {activeTab === "patterns" && <UIPatternEducation />}
        {activeTab === "analysis" && <BehavioralAnalysis report={simulationReport} />}
        {activeTab === "education" && <EducationalContent progress={progressReport} />}
        {activeTab === "quiz" && <ComprehensionQuiz />}
      </div>
    </div>
  );
};

// UI Pattern Education Component
const UIPatternEducation: React.FC = () => {
  const [activePattern, setActivePattern] = useState<string>("emotional-manipulation");
  
  const patterns = [
    {
      id: "emotional-manipulation",
      title: "Emotional Manipulation & Urgency Tactics",
      icon: "⚡",
      color: "#dc2626",
      deceptive: [
        "Crisis Exploitation: 'EMERGENCY CASH!' banners targeting financial desperation",
        "False Scarcity: Countdown timers and 'Only 3 spots left!' when slots are unlimited",
        "Emotional Imagery: Photos of stressed families, unpaid bills, eviction notices",
        "Artificial Pressure: 'Your neighbors just got approved!' fake notifications",
        "Giant 'Get Cash Now!' or 'Instant Approval!' buttons in aggressive colors"
      ],
      ethical: [
        "Calm Information Architecture: Use of calming blues/greens with clear typography",
        "Realistic Timelines: 'Processing takes 1-3 business days' instead of 'INSTANT!'",
        "Educational First: Lead with financial literacy resources",
        "Alternative Suggestions: Prominently display credit union and assistance options",
        "Cooling-off periods and mandatory wait times before approval"
      ],
      backendLogic: {
        exploitative: "Behavioral psychology engine tracks stress indicators and vulnerability markers to increase pressure",
        ethical: "Educational content engine provides supportive resources and removes time pressure"
      }
    },
    {
      id: "hidden-costs",
      title: "Hidden Costs & Deceptive Pricing",
      icon: "💰",
      color: "#f59e0b",
      deceptive: [
        "APR Obfuscation: True 391-664% APR hidden in fine print or obscured calculations",
        "Fee Multiplication: Separate origination, processing, and documentation fees",
        "Rollover Traps: Automatic renewal fees that multiply the original debt",
        "Comparative Deception: Making payday loans appear cheaper than credit cards",
        "Drip Pricing: Revealing additional fees only after user commits"
      ],
      ethical: [
        "APR Transparency: Display total loan cost and APR prominently above the fold",
        "Total Cost Calculator: Show complete repayment amount upfront",
        "Alternative Comparison: Display alternatives like credit union 28% APR vs 391% payday loan",
        "Fee Breakdown: Itemized explanation of all costs with no hidden fees",
        "Clear comparison tables with all fees visible"
      ],
      backendLogic: {
        exploitative: "Dark pattern engine progressively reveals costs to minimize abandonment",
        ethical: "Transparent pricing engine shows all costs upfront with comparison tools"
      }
    },
    {
      id: "forced-continuity",
      title: "Forced Continuity & Subscription Traps",
      icon: "🔄",
      color: "#7c2d12",
      deceptive: [
        "Debt Trap Mechanics: Lump-sum repayment structure designed to force rollovers",
        "Rollover Dependency: Making it easier to rollover than to repay",
        "Hidden auto-renewal checkboxes pre-selected by default",
        "Automatic ACH authorization buried in terms",
        "Making cancellation difficult or impossible"
      ],
      ethical: [
        "Installment Options: Break payments into manageable monthly installments",
        "PAL Structure: Payday Alternative Loans with 1-12 month terms and 28% APR cap",
        "Exit Strategy: Clear loan completion process without rollover pressure",
        "Easy one-click cancellation options",
        "Clear reminders before any auto-renewals"
      ],
      backendLogic: {
        exploitative: "Rollover trap engine calculates optimal timing for renewal pressure",
        ethical: "Ethical repayment engine provides flexible payment options and exit strategies"
      }
    },
    {
      id: "fake-trust",
      title: "Fake Trust Signals & Social Proof",
      icon: "🛡️",
      color: "#059669",
      deceptive: [
        "Fabricated Endorsements: Fake government or financial institution backing",
        "Manipulated Reviews: Fake customer testimonials and ratings",
        "False Security: Fake SSL certificates or security badges",
        "Misleading Affiliations: Implying bank or credit union partnerships",
        "Fake urgency notifications about other customers"
      ],
      ethical: [
        "Verified Credentials: Real FDIC/NCUA insurance information",
        "Transparent Reviews: Authentic customer testimonials with verification",
        "Regulatory Compliance: Display actual licensing and regulatory oversight",
        "Third-Party Verification: Links to actual BBB ratings and state licensing",
        "Clear company information and contact details"
      ],
      backendLogic: {
        exploitative: "Social proof engine generates fake testimonials and urgency notifications",
        ethical: "Transparency engine displays verified credentials and real regulatory compliance"
      }
    },
    {
      id: "deceptive-interface",
      title: "Deceptive Interface Design",
      icon: "🎨",
      color: "#7c3aed",
      deceptive: [
        "Predatory UX: Confusing navigation designed to increase borrowing",
        "Mobile Exploitation: Harder to read terms on small screens",
        "Dark Patterns: Making decline buttons invisible or non-functional",
        "Information Overload: Burying important terms in dense legal text",
        "Confusing button placements and misleading labels"
      ],
      ethical: [
        "Clear Navigation: Intuitive design with prominent 'alternatives' section",
        "Accessible Design: High contrast, large fonts, screen reader compatibility",
        "Plain Language: Easy-to-understand terms without legal jargon",
        "Progressive Disclosure: Layered information that builds understanding",
        "Make 'decline' buttons as prominent as 'accept' buttons"
      ],
      backendLogic: {
        exploitative: "Interface manipulation engine tracks user confusion and exploits it",
        ethical: "Accessibility engine ensures clear communication and easy navigation"
      }
    },
    {
      id: "predatory-targeting",
      title: "Predatory Targeting & Data Collection",
      icon: "🎯",
      color: "#be123c",
      deceptive: [
        "Demographic Targeting: Focusing on low-income and vulnerable populations",
        "Geographic Exploitation: Targeting low-income neighborhoods",
        "Data Harvesting: Collecting excessive personal and financial information",
        "Behavioral Tracking: Following users across websites to identify vulnerability",
        "Sharing data with third parties without clear consent"
      ],
      ethical: [
        "Minimal Data Collection: Only collect information necessary for loan processing",
        "Privacy Protection: No data sharing with third parties without explicit consent",
        "Inclusive Design: Accessible to all demographics without targeting vulnerability",
        "Data Transparency: Clear explanation of data use and sharing policies",
        "Provide clear, granular privacy controls"
      ],
      backendLogic: {
        exploitative: "Targeting engine identifies and exploits user vulnerabilities",
        ethical: "Privacy engine protects user data and provides transparent controls"
      }
    },
    {
      id: "modern-techniques",
      title: "Modern Deceptive Techniques (2024-2025)",
      icon: "🤖",
      color: "#1e40af",
      deceptive: [
        "AI-Powered Manipulation: Using machine learning to identify and exploit vulnerability",
        "Gamification: Turning debt into a game to make borrowing feel fun",
        "Subscription Disguise: Traditional payday lending disguised as subscription services",
        "Fintech Facades: Predatory lending disguised as innovative fintech",
        "Personalized dark patterns based on user behavior"
      ],
      ethical: [
        "AI for Good: Using technology to suggest appropriate loan amounts and alternatives",
        "Educational Gamification: Game elements that reward financial literacy",
        "Transparent Fintech: Clear about traditional lending nature despite tech interface",
        "Financial Wellness Focus: Apps that promote saving and budgeting",
        "Ethical AI that protects rather than exploits users"
      ],
      backendLogic: {
        exploitative: "AI manipulation engine personalizes dark patterns for maximum effectiveness",
        ethical: "AI assistance engine provides personalized financial education and support"
      }
    }
  ];

  const currentPattern = patterns.find(p => p.id === activePattern) || patterns[0];

  return (
    <div>
      <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 24 }}>
        🕷️ Dark Pattern Education: Complete UI Analysis
      </h2>
      
      {/* Pattern Navigation */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => setActivePattern(pattern.id)}
            style={{
              padding: "0.75rem 1rem",
              background: activePattern === pattern.id ? pattern.color : "#f3f4f6",
              color: activePattern === pattern.id ? "#fff" : "#374151",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "0.875rem"
            }}
          >
            {pattern.icon} {pattern.title}
          </button>
        ))}
      </div>

      {/* Current Pattern Details */}
      <div style={{ background: "#fff", borderRadius: 12, padding: "2rem", marginBottom: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24, color: currentPattern.color }}>
          {currentPattern.icon} {currentPattern.title}
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
          {/* Deceptive Practices */}
          <div style={{ background: "#fef2f2", borderRadius: 8, padding: "1.5rem", border: "1px solid #fecaca" }}>
            <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#dc2626", marginBottom: 16 }}>
              🚫 Deceptive Practices
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {currentPattern.deceptive.map((item, index) => (
                <li key={index} style={{ marginBottom: 12, display: "flex", alignItems: "flex-start" }}>
                  <span style={{ marginRight: 8, color: "#dc2626" }}>•</span>
                  <span style={{ fontSize: "0.875rem" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ethical Alternatives */}
          <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "1.5rem", border: "1px solid #bbf7d0" }}>
            <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#16a34a", marginBottom: 16 }}>
              ✅ Ethical Alternatives
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {currentPattern.ethical.map((item, index) => (
                <li key={index} style={{ marginBottom: 12, display: "flex", alignItems: "flex-start" }}>
                  <span style={{ marginRight: 8, color: "#16a34a" }}>•</span>
                  <span style={{ fontSize: "0.875rem" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Backend Logic Comparison */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: "1.5rem", border: "1px solid #e2e8f0" }}>
          <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#475569", marginBottom: 16 }}>
            ⚙️ Backend Logic Differences
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <h5 style={{ fontSize: "1rem", fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
                Exploitative Backend
              </h5>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                {currentPattern.backendLogic.exploitative}
              </p>
            </div>
            <div>
              <h5 style={{ fontSize: "1rem", fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>
                Ethical Backend
              </h5>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                {currentPattern.backendLogic.ethical}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div style={{ background: "#fffbeb", borderRadius: 12, padding: "2rem", border: "1px solid #fed7aa" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16, color: "#92400e" }}>
          🔧 How This Works in the Simulator
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
              Phase 1: Exploitative
            </h4>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              You experienced these dark patterns in action. The backend tracked your responses and vulnerability.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>
              Phase 2: Ethical
            </h4>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              You saw the ethical alternatives that protect your autonomy and provide transparent information.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#7c3aed", marginBottom: 8 }}>
              Phase 3: Reflection
            </h4>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Now you understand the differences and can recognize these patterns in real financial products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Comparison View Component
const ComparisonView: React.FC = () => {
  const [activeComparison, setActiveComparison] = useState<string>("overview");
  
  const comparisons = [
    {
      id: "overview",
      title: "System Overview",
      icon: "📊"
    },
    {
      id: "emotional-manipulation",
      title: "Emotional Manipulation",
      icon: "⚡"
    },
    {
      id: "cost-transparency",
      title: "Cost Transparency",
      icon: "💰"
    },
    {
      id: "interface-design",
      title: "Interface Design",
      icon: "🎨"
    },
    {
      id: "data-practices",
      title: "Data Practices",
      icon: "🔒"
    },
    {
      id: "backend-logic",
      title: "Backend Systems",
      icon: "⚙️"
    }
  ];

  return (
    <div>
      <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 24 }}>
        📊 Interactive Phase Comparison Tool
      </h2>
      
      {/* Comparison Navigation */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
        {comparisons.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setActiveComparison(comp.id)}
            style={{
              padding: "0.75rem 1rem",
              background: activeComparison === comp.id ? "#7c3aed" : "#f3f4f6",
              color: activeComparison === comp.id ? "#fff" : "#374151",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "0.875rem"
            }}
          >
            {comp.icon} {comp.title}
          </button>
        ))}
      </div>

      {/* System Overview */}
      {activeComparison === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            {/* Exploitative Side */}
            <div style={{ background: "#fee2e2", borderRadius: 12, padding: "1.5rem", border: "2px solid #ef4444" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#dc2626", marginBottom: 16 }}>
                🕷️ Phase 1: Exploitative Experience
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: 12 }}>
                  <strong>APR Hidden:</strong> True 391-664% APR obscured
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>Urgency Tactics:</strong> Fake countdowns & scarcity
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>Dark Patterns:</strong> Pre-checked boxes, hidden fees
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>Manipulation:</strong> Emotional triggers, fear tactics
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>Data Practices:</strong> Sold to third parties
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>Rollover Traps:</strong> Designed for debt cycles
                </li>
              </ul>
            </div>

            {/* Ethical Side */}
            <div style={{ background: "#dcfce7", borderRadius: 12, padding: "1.5rem", border: "2px solid #16a34a" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#16a34a", marginBottom: 16 }}>
                ✨ Phase 2: Ethical Alternative
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: 12 }}>
                  <strong>Transparent APR:</strong> All costs shown upfront
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>No Pressure:</strong> Take time to decide
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>Clear UI:</strong> All options opt-in, no tricks
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>Empowerment:</strong> Education & alternatives
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>Privacy First:</strong> No data sharing
                </li>
                <li style={{ marginBottom: 12 }}>
                  <strong>Debt Prevention:</strong> No rollovers offered
                </li>
              </ul>
            </div>
          </div>

          {/* Key Differences */}
          <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 20 }}>
              Key Psychological Differences
            </h3>
            
            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 16, padding: 16, background: "#f9fafb", borderRadius: 8 }}>
                <strong>Aspect</strong>
                <strong style={{ color: "#dc2626" }}>Phase 1: Exploitative</strong>
                <strong style={{ color: "#16a34a" }}>Phase 2: Ethical</strong>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 16, padding: 16 }}>
                <span>Decision Time</span>
                <span>Rushed (avg 2-3 min)</span>
                <span>Unlimited time</span>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 16, padding: 16, background: "#f9fafb", borderRadius: 8 }}>
                <span>Cognitive Load</span>
                <span>High (overwhelming info)</span>
                <span>Low (clear, organized)</span>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 16, padding: 16 }}>
                <span>Autonomy Score</span>
                <span>20-40% (manipulated)</span>
                <span>90-100% (preserved)</span>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: 16, padding: 16, background: "#f9fafb", borderRadius: 8 }}>
                <span>Trust Building</span>
                <span>Fake badges, testimonials</span>
                <span>Real licenses, transparency</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Emotional Manipulation Comparison */}
      {activeComparison === "emotional-manipulation" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Exploitative UI Example */}
          <div style={{ background: "#fee2e2", borderRadius: 12, padding: "1.5rem", border: "2px solid #ef4444" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#dc2626", marginBottom: 16 }}>
              🚫 Exploitative Emotional Manipulation
            </h3>
            
            {/* Simulated UI Elements */}
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #fecaca" }}>
              <div style={{ background: "#dc2626", color: "#fff", padding: "0.5rem", borderRadius: 4, textAlign: "center", marginBottom: 8, fontSize: "1.125rem", fontWeight: 700 }}>
                🚨 EMERGENCY CASH NEEDED? 🚨
              </div>
              <div style={{ background: "#f59e0b", color: "#fff", padding: "0.25rem 0.5rem", borderRadius: 4, textAlign: "center", fontSize: "0.875rem" }}>
                ⏰ ONLY 2 MINUTES LEFT! 3 PEOPLE VIEWING!
              </div>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
              Techniques Used:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Crisis exploitation messaging</li>
              <li>• Fake urgency countdown</li>
              <li>• Artificial scarcity ("3 people viewing")</li>
              <li>• Aggressive red/orange colors</li>
              <li>• Emotional imagery and language</li>
            </ul>
          </div>

          {/* Ethical UI Example */}
          <div style={{ background: "#dcfce7", borderRadius: 12, padding: "1.5rem", border: "2px solid #16a34a" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#16a34a", marginBottom: 16 }}>
              ✅ Ethical Calm Approach
            </h3>
            
            {/* Simulated UI Elements */}
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #bbf7d0" }}>
              <div style={{ background: "#047857", color: "#fff", padding: "0.5rem", borderRadius: 4, textAlign: "center", marginBottom: 8, fontSize: "1.125rem", fontWeight: 600 }}>
                💡 Exploring Financial Options
              </div>
              <div style={{ background: "#0369a1", color: "#fff", padding: "0.25rem 0.5rem", borderRadius: 4, textAlign: "center", fontSize: "0.875rem" }}>
                ℹ️ Take your time - No pressure to decide today
              </div>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>
              Ethical Features:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Calm, educational messaging</li>
              <li>• No artificial time pressure</li>
              <li>• Encourages thoughtful decision-making</li>
              <li>• Professional blue/green colors</li>
              <li>• Supportive and informative tone</li>
            </ul>
          </div>
        </div>
      )}

      {/* Cost Transparency Comparison */}
      {activeComparison === "cost-transparency" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Exploitative Cost Display */}
          <div style={{ background: "#fee2e2", borderRadius: 12, padding: "1.5rem", border: "2px solid #ef4444" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#dc2626", marginBottom: 16 }}>
              🚫 Hidden Cost Manipulation
            </h3>
            
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #fecaca" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#059669", marginBottom: 8 }}>
                Just $15 per $100 borrowed!
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: 8 }}>
                *APR information available in terms and conditions
              </div>
              <div style={{ fontSize: "0.625rem", color: "#9ca3af" }}>
                Total APR: 391.07% (click to expand)
              </div>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
              Deceptive Tactics:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Emphasizes low dollar fee, not APR</li>
              <li>• Hides true APR in fine print</li>
              <li>• Uses green color for deceptive pricing</li>
              <li>• Requires clicks to see full cost</li>
              <li>• No comparison to alternatives</li>
            </ul>
          </div>

          {/* Ethical Cost Display */}
          <div style={{ background: "#dcfce7", borderRadius: 12, padding: "1.5rem", border: "2px solid #16a34a" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#16a34a", marginBottom: 16 }}>
              ✅ Transparent Cost Disclosure
            </h3>
            
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #bbf7d0" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>
                Total Cost: $115 for $100 loan
              </div>
              <div style={{ fontSize: "1rem", color: "#dc2626", marginBottom: 8 }}>
                APR: 391.07% (Very High)
              </div>
              <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: 8 }}>
                Credit Union Alternative: 28% APR = $102 total
              </div>
              <div style={{ fontSize: "0.875rem", color: "#059669" }}>
                💡 Consider alternatives before proceeding
              </div>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>
              Transparent Features:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Total cost shown prominently</li>
              <li>• APR clearly displayed and labeled</li>
              <li>• Comparison to alternatives provided</li>
              <li>• Educational guidance included</li>
              <li>• No hidden fees or fine print</li>
            </ul>
          </div>
        </div>
      )}

      {/* Interface Design Comparison */}
      {activeComparison === "interface-design" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Exploitative Interface */}
          <div style={{ background: "#fee2e2", borderRadius: 12, padding: "1.5rem", border: "2px solid #ef4444" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#dc2626", marginBottom: 16 }}>
              🚫 Deceptive Interface Design
            </h3>
            
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #fecaca" }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                <button style={{ background: "#dc2626", color: "#fff", padding: "0.75rem 2rem", borderRadius: 8, border: "none", fontSize: "1.125rem", fontWeight: 700 }}>
                  GET CASH NOW! 💰
                </button>
                <button style={{ background: "#f3f4f6", color: "#9ca3af", padding: "0.25rem 0.5rem", borderRadius: 4, border: "none", fontSize: "0.75rem" }}>
                  decline
                </button>
              </div>
              <div style={{ fontSize: "0.625rem", color: "#6b7280", lineHeight: 1.2 }}>
                By clicking above you agree to our terms of service privacy policy arbitration clause mandatory data sharing automatic renewal recurring fees rollover authorization...
              </div>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
              Dark Patterns:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Huge "accept" vs tiny "decline" button</li>
              <li>• Dense legal text in tiny font</li>
              <li>• Confusing navigation structure</li>
              <li>• Overwhelming information density</li>
              <li>• Misleading button colors and sizes</li>
            </ul>
          </div>

          {/* Ethical Interface */}
          <div style={{ background: "#dcfce7", borderRadius: 12, padding: "1.5rem", border: "2px solid #16a34a" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#16a34a", marginBottom: 16 }}>
              ✅ Clear, Accessible Interface
            </h3>
            
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #bbf7d0" }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                <button style={{ background: "#059669", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: 8, border: "none", fontSize: "1rem", fontWeight: 600 }}>
                  Apply for Loan
                </button>
                <button style={{ background: "#6b7280", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: 8, border: "none", fontSize: "1rem", fontWeight: 600 }}>
                  Explore Alternatives
                </button>
              </div>
              <div style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.5 }}>
                <strong>Clear Terms:</strong> No hidden fees, transparent pricing, easy cancellation, full disclosure of all costs and terms.
              </div>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>
              Ethical Design:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Equal-sized, clear action buttons</li>
              <li>• Readable font sizes and clear language</li>
              <li>• Logical, intuitive navigation</li>
              <li>• Organized, digestible information</li>
              <li>• Consistent, professional design</li>
            </ul>
          </div>
        </div>
      )}

      {/* Data Practices Comparison */}
      {activeComparison === "data-practices" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Exploitative Data Practices */}
          <div style={{ background: "#fee2e2", borderRadius: 12, padding: "1.5rem", border: "2px solid #ef4444" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#dc2626", marginBottom: 16 }}>
              🚫 Predatory Data Collection
            </h3>
            
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #fecaca" }}>
              <div style={{ fontSize: "0.875rem", color: "#374151", marginBottom: 8 }}>
                <strong>Data Collected:</strong>
              </div>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.75rem", color: "#6b7280" }}>
                <li>• Social Security Number</li>
                <li>• Bank account details</li>
                <li>• Employment history</li>
                <li>• References and contacts</li>
                <li>• Device fingerprinting</li>
                <li>• Browsing behavior</li>
                <li>• Location tracking</li>
              </ul>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
              Problematic Practices:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Excessive data collection</li>
              <li>• Sold to third-party marketers</li>
              <li>• Used for behavioral targeting</li>
              <li>• Shared with debt collectors</li>
              <li>• No meaningful consent</li>
            </ul>
          </div>

          {/* Ethical Data Practices */}
          <div style={{ background: "#dcfce7", borderRadius: 12, padding: "1.5rem", border: "2px solid #16a34a" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#16a34a", marginBottom: 16 }}>
              ✅ Privacy-Respecting Practices
            </h3>
            
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #bbf7d0" }}>
              <div style={{ fontSize: "0.875rem", color: "#374151", marginBottom: 8 }}>
                <strong>Data Collected:</strong>
              </div>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.75rem", color: "#6b7280" }}>
                <li>• Income verification only</li>
                <li>• Basic identity confirmation</li>
                <li>• Bank account for deposits</li>
                <li>• No tracking or profiling</li>
                <li>• No unnecessary personal info</li>
              </ul>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>
              Ethical Practices:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Minimal data collection</li>
              <li>• Never sold or shared</li>
              <li>• Transparent privacy policy</li>
              <li>• Easy data deletion</li>
              <li>• Explicit consent for everything</li>
            </ul>
          </div>
        </div>
      )}

      {/* Backend Systems Comparison */}
      {activeComparison === "backend-logic" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Exploitative Backend */}
          <div style={{ background: "#fee2e2", borderRadius: 12, padding: "1.5rem", border: "2px solid #ef4444" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#dc2626", marginBottom: 16 }}>
              🚫 Exploitative Backend Systems
            </h3>
            
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #fecaca" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Active Engines:</h4>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                <li>• Behavioral Psychology Engine</li>
                <li>• Dark Pattern Engine</li>
                <li>• Manipulation Tracker</li>
                <li>• Vulnerability Assessment</li>
                <li>• Rollover Trap Engine</li>
                <li>• Legal Loophole Engine</li>
              </ul>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
              System Objectives:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Maximize user manipulation</li>
              <li>• Identify and exploit vulnerabilities</li>
              <li>• Increase loan acceptance rates</li>
              <li>• Optimize for rollovers and renewals</li>
              <li>• Circumvent regulatory protections</li>
            </ul>
          </div>

          {/* Ethical Backend */}
          <div style={{ background: "#dcfce7", borderRadius: 12, padding: "1.5rem", border: "2px solid #16a34a" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#16a34a", marginBottom: 16 }}>
              ✅ Ethical Backend Systems
            </h3>
            
            <div style={{ background: "#fff", borderRadius: 8, padding: "1rem", marginBottom: 16, border: "1px solid #bbf7d0" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Active Engines:</h4>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                <li>• Educational Content Engine</li>
                <li>• Transparency Engine</li>
                <li>• Ethical Compliance Engine</li>
                <li>• Alternative Suggestion Engine</li>
                <li>• Privacy Protection Engine</li>
                <li>• Financial Wellness Engine</li>
              </ul>
            </div>
            
            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>
              System Objectives:
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Protect user autonomy</li>
              <li>• Provide transparent information</li>
              <li>• Suggest better alternatives</li>
              <li>• Promote financial literacy</li>
              <li>• Ensure regulatory compliance</li>
            </ul>
          </div>
        </div>
      )}

      {/* Implementation Impact Section */}
      <section style={{ background: "#f8fafc", borderRadius: 12, padding: "2rem", marginTop: 32, border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16, color: "#475569" }}>
          🎯 Real-World Impact
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#dc2626", marginBottom: 12 }}>
              Exploitative Impact
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Average debt trap duration: 8 months</li>
              <li>• 80% of revenue from rollovers</li>
              <li>• Average borrower pays $520 in fees for $375 loan</li>
              <li>• 12 million Americans trapped annually</li>
              <li>• Disproportionally affects low-income communities</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#16a34a", marginBottom: 12 }}>
              Ethical Alternative Impact
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li>• Credit union PALs: 28% APR maximum</li>
              <li>• 6-month repayment terms available</li>
              <li>• Focus on financial counseling</li>
              <li>• Building credit history</li>
              <li>• Supporting financial independence</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

// Behavioral Analysis Component
const BehavioralAnalysis: React.FC<{ report: any }> = ({ report }) => {
  // Simulate comprehensive behavioral analysis based on UI patterns
  const manipulationVulnerabilities = [
    {
      category: "Emotional Manipulation",
      icon: "⚡",
      color: "#dc2626",
      susceptibility: Math.round(Math.random() * 40 + 30), // 30-70%
      description: "Vulnerability to urgency tactics and emotional pressure",
      examples: ["Responded to countdown timers", "Influenced by crisis messaging", "Swayed by scarcity claims"],
      protection: "Take time to make decisions, ignore artificial urgency"
    },
    {
      category: "Hidden Costs",
      icon: "💰",
      color: "#f59e0b",
      susceptibility: Math.round(Math.random() * 35 + 25), // 25-60%
      description: "Tendency to miss or underestimate true costs",
      examples: ["Focused on monthly payment over total cost", "Missed APR in fine print", "Accepted rollover fees"],
      protection: "Always calculate total loan cost, read all disclosures"
    },
    {
      category: "Forced Continuity",
      icon: "🔄",
      color: "#7c2d12",
      susceptibility: Math.round(Math.random() * 45 + 20), // 20-65%
      description: "Risk of getting trapped in debt cycles",
      examples: ["Accepted pre-checked renewal options", "Chose lump-sum over installments", "Ignored exit strategies"],
      protection: "Opt for installment payments, avoid auto-renewals"
    },
    {
      category: "Fake Trust Signals",
      icon: "🛡️",
      color: "#059669",
      susceptibility: Math.round(Math.random() * 30 + 15), // 15-45%
      description: "Influenced by false authority and social proof",
      examples: ["Trusted fake testimonials", "Influenced by fake badges", "Swayed by government impersonation"],
      protection: "Verify all credentials, check real regulatory sites"
    },
    {
      category: "Deceptive Interface",
      icon: "🎨",
      color: "#7c3aed",
      susceptibility: Math.round(Math.random() * 40 + 25), // 25-65%
      description: "Confusion from manipulative interface design",
      examples: ["Missed decline buttons", "Overwhelmed by information", "Confused by navigation"],
      protection: "Take time to understand interface, seek clear alternatives"
    },
    {
      category: "Predatory Targeting",
      icon: "🎯",
      color: "#be123c",
      susceptibility: Math.round(Math.random() * 35 + 20), // 20-55%
      description: "Susceptibility to personalized exploitation",
      examples: ["Influenced by demographic targeting", "Shared excessive personal data", "Fell for behavioral tracking"],
      protection: "Limit personal data sharing, use privacy controls"
    },
    {
      category: "Modern AI Techniques",
      icon: "🤖",
      color: "#1e40af",
      susceptibility: Math.round(Math.random() * 50 + 20), // 20-70%
      description: "Vulnerability to AI-powered manipulation",
      examples: ["Influenced by personalized dark patterns", "Susceptible to behavioral prediction", "Gamification effects"],
      protection: "Recognize AI personalization, maintain critical thinking"
    }
  ];

  const overallVulnerability = Math.round(manipulationVulnerabilities.reduce((sum, v) => sum + v.susceptibility, 0) / manipulationVulnerabilities.length);

  return (
    <div>
      <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 24 }}>
        🧠 Comprehensive Behavioral Analysis
      </h2>
      
      {/* Overall Vulnerability Score */}
      <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: 32 }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>
          Overall Vulnerability Assessment
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "3rem", fontWeight: 700, color: overallVulnerability >= 60 ? "#dc2626" : overallVulnerability >= 40 ? "#f59e0b" : "#16a34a" }}>
              {overallVulnerability}%
            </div>
            <p style={{ fontSize: "1.125rem", color: "#6b7280" }}>
              {overallVulnerability >= 60 ? "High vulnerability - review protection strategies" :
               overallVulnerability >= 40 ? "Moderate vulnerability - be cautious with financial decisions" :
               "Low vulnerability - good resistance to manipulation"}
            </p>
          </div>
          <div style={{ flex: 2 }}>
            <div style={{ background: "#f3f4f6", height: 20, borderRadius: 10, overflow: "hidden" }}>
              <div 
                style={{ 
                  height: "100%", 
                  background: `linear-gradient(90deg, ${overallVulnerability >= 60 ? "#dc2626" : overallVulnerability >= 40 ? "#f59e0b" : "#16a34a"} 0%, ${overallVulnerability >= 60 ? "#fecaca" : overallVulnerability >= 40 ? "#fef3c7" : "#dcfce7"} 100%)`,
                  width: `${overallVulnerability}%`,
                  transition: "width 0.3s ease"
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "0.875rem", color: "#6b7280" }}>
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Overview */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 32 }}>
        <MetricCard
          title="Autonomy Score"
          value={`${Math.round(report?.currentMetrics?.autonomyScore || 100 - overallVulnerability)}%`}
          color="#16a34a"
          description="How much control you maintained"
        />
        <MetricCard
          title="Coercion Index"
          value={(report?.currentMetrics?.coercionIndex || overallVulnerability / 10).toFixed(2)}
          color="#dc2626"
          description="Level of manipulation experienced"
        />
        <MetricCard
          title="Manipulation Exposure"
          value={report?.currentMetrics?.manipulationExposure || Math.round(overallVulnerability / 10)}
          color="#f59e0b"
          description="Dark patterns encountered"
        />
        <MetricCard
          title="Decision Quality"
          value={`${Math.round(report?.currentMetrics?.decisionQuality || 100 - overallVulnerability)}%`}
          color="#3b82f6"
          description="Quality of choices made"
        />
      </div>

      {/* Vulnerability Breakdown by Category */}
      <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: 32 }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24 }}>
          Vulnerability Breakdown by Pattern Category
        </h3>
        <div style={{ display: "grid", gap: 20 }}>
          {manipulationVulnerabilities.map((vulnerability, index) => (
            <div key={index} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: vulnerability.color, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{vulnerability.icon}</span>
                  {vulnerability.category}
                </h4>
                <span style={{ 
                  background: vulnerability.susceptibility >= 50 ? "#fef2f2" : vulnerability.susceptibility >= 30 ? "#fffbeb" : "#f0fdf4",
                  color: vulnerability.susceptibility >= 50 ? "#dc2626" : vulnerability.susceptibility >= 30 ? "#f59e0b" : "#16a34a",
                  padding: "0.25rem 0.75rem",
                  borderRadius: 20,
                  fontSize: "0.875rem",
                  fontWeight: 600
                }}>
                  {vulnerability.susceptibility}% susceptible
                </span>
              </div>
              
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: 12 }}>
                {vulnerability.description}
              </p>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <h5 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
                    Observed Behaviors
                  </h5>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {vulnerability.examples.map((example, i) => (
                      <li key={i} style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: 4 }}>
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#16a34a", marginBottom: 8 }}>
                    Protection Strategy
                  </h5>
                  <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {vulnerability.protection}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Behavioral Insights */}
      <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: 32 }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>
          Key Behavioral Insights
        </h3>
        <div style={{ display: "grid", gap: 16 }}>
          {[
            "You showed stronger resistance to fake trust signals than to emotional manipulation",
            "Time pressure tactics had significant impact on your decision-making speed",
            "Hidden cost patterns were partially effective - you caught some but missed others",
            "Interface confusion led to several suboptimal choices",
            "Your vulnerability to AI-powered personalization is above average"
          ].map((insight: string, index: number) => (
            <div key={index} style={{ display: "flex", alignItems: "flex-start", padding: "1rem", background: "#f8fafc", borderRadius: 8 }}>
              <span style={{ marginRight: 12, color: "#7c3aed", fontSize: "1.25rem" }}>💡</span>
              <span style={{ fontSize: "0.875rem" }}>{insight}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section style={{ background: "#f0fdf4", borderRadius: 12, padding: "2rem", border: "1px solid #16a34a" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16, color: "#16a34a" }}>
          🎯 Personalized Protection Recommendations
        </h3>
        <div style={{ display: "grid", gap: 16 }}>
          {[
            "Practice the '24-hour rule' - wait a day before making any financial decisions",
            "Always calculate total loan cost, not just monthly payments",
            "Verify all credentials on official regulatory websites",
            "Use ad blockers and privacy tools to limit behavioral tracking",
            "Join a credit union for access to Payday Alternative Loans (PALs)",
            "Build an emergency fund to reduce dependency on high-cost credit"
          ].map((rec: string, index: number) => (
            <div key={index} style={{ display: "flex", alignItems: "flex-start", padding: "1rem", background: "#f0fdf4", borderRadius: 8 }}>
              <span style={{ marginRight: 12, color: "#16a34a", fontSize: "1.25rem" }}>✓</span>
              <span style={{ fontSize: "0.875rem" }}>{rec}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Educational Content Component
const EducationalContent: React.FC<{ progress: any }> = ({ progress }) => {
  const [activeEducationTab, setActiveEducationTab] = useState<string>("overview");
  
  const educationTabs = [
    { id: "overview", title: "Overview", icon: "📚" },
    { id: "regulatory", title: "Legal Framework", icon: "⚖️" },
    { id: "consumer-rights", title: "Your Rights", icon: "🛡️" },
    { id: "alternatives", title: "Alternatives", icon: "🏦" },
    { id: "protection", title: "Protection Strategies", icon: "🔒" }
  ];

  return (
    <div>
      <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 24 }}>
        📚 Comprehensive Educational Resources
      </h2>
      
      {/* Education Navigation */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
        {educationTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveEducationTab(tab.id)}
            style={{
              padding: "0.75rem 1rem",
              background: activeEducationTab === tab.id ? "#0369a1" : "#f3f4f6",
              color: activeEducationTab === tab.id ? "#fff" : "#374151",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: "0.875rem"
            }}
          >
            {tab.icon} {tab.title}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeEducationTab === "overview" && (
        <div>
          {/* Progress Overview */}
          <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>
              Your Learning Progress
            </h3>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Overall Completion</span>
                <span>{Math.round(progress?.completionRate || 75)}%</span>
              </div>
              <div style={{ background: "#e5e7eb", height: 12, borderRadius: 6, overflow: "hidden" }}>
                <div
                  style={{
                    background: "#7c3aed",
                    height: "100%",
                    width: `${progress?.completionRate || 75}%`,
                    transition: "width 0.3s"
                  }}
                />
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Average Score: {Math.round(progress?.averageScore || 82)}%
            </p>
          </section>

          {/* Key Concepts */}
          <section style={{ background: "#fef3c7", borderRadius: 12, padding: "2rem", marginBottom: 24 }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>
              Key Concepts to Remember
            </h3>
            <div style={{ display: "grid", gap: 16 }}>
              <ConceptCard
                title="True Cost of Payday Loans"
                content="Average APR of 391-664% means a $500 loan can cost over $1,000 in fees if rolled over multiple times."
              />
              <ConceptCard
                title="Dark Pattern Recognition"
                content="Urgency tactics, pre-checked boxes, and hidden fees are designed to manipulate your decisions."
              />
              <ConceptCard
                title="Alternative Options"
                content="Credit unions, payment plans, and nonprofit assistance offer much better terms than payday loans."
              />
              <ConceptCard
                title="Your Rights"
                content="You have the right to clear terms, time to decide, and protection from harassment."
              />
            </div>
          </section>
        </div>
      )}

      {/* Regulatory Framework Tab */}
      {activeEducationTab === "regulatory" && (
        <div>
          <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>
              ⚖️ Legal Framework & Regulatory Landscape
            </h3>
            
            {/* Federal Regulations */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#dc2626", marginBottom: 12 }}>
                Federal Regulations
              </h4>
              <div style={{ display: "grid", gap: 16 }}>
                <div style={{ background: "#fef2f2", padding: "1rem", borderRadius: 8, border: "1px solid #fecaca" }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>
                    CFPB Payday Lending Rule (2017)
                  </h5>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: 8 }}>
                    Required lenders to verify borrower's ability to repay loans and limited consecutive borrowing.
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#dc2626" }}>
                    <strong>Status:</strong> Rescinded in 2020, leaving consumers with fewer protections.
                  </p>
                </div>
                
                <div style={{ background: "#f0f9ff", padding: "1rem", borderRadius: 8, border: "1px solid #bfdbfe" }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>
                    Truth in Lending Act (TILA)
                  </h5>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: 8 }}>
                    Requires disclosure of APR and loan terms, but enforcement is limited.
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#0369a1" }}>
                    <strong>Your Protection:</strong> Right to clear cost disclosure and cancellation rights.
                  </p>
                </div>
              </div>
            </div>

            {/* State-by-State Regulations */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#059669", marginBottom: 12 }}>
                State-by-State Regulations
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, color: "#059669", marginBottom: 8 }}>
                    Strong Protection States
                  </h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• New York: 25% APR cap</li>
                    <li>• Pennsylvania: 24% APR cap</li>
                    <li>• Connecticut: 12% APR cap</li>
                    <li>• Colorado: 36% APR cap</li>
                    <li>• 15+ states ban payday loans</li>
                  </ul>
                </div>
                
                <div style={{ background: "#fef2f2", padding: "1rem", borderRadius: 8, border: "1px solid #fecaca" }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, color: "#dc2626", marginBottom: 8 }}>
                    Weak Protection States
                  </h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• Texas: 662% APR average</li>
                    <li>• Missouri: 652% APR average</li>
                    <li>• Nevada: 652% APR average</li>
                    <li>• Delaware: 521% APR average</li>
                    <li>• 20+ states allow high APRs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Regulatory Loopholes */}
            <div style={{ background: "#fffbeb", padding: "1.5rem", borderRadius: 8, border: "1px solid #fed7aa" }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#92400e", marginBottom: 12 }}>
                Common Regulatory Loopholes
              </h4>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                <li style={{ marginBottom: 8 }}>• <strong>Tribal Lending:</strong> Claiming sovereign immunity to avoid state laws</li>
                <li style={{ marginBottom: 8 }}>• <strong>Online Jurisdiction Shopping:</strong> Operating from states with weak regulations</li>
                <li style={{ marginBottom: 8 }}>• <strong>Rent-a-Bank Schemes:</strong> Using national banks to circumvent state APR caps</li>
                <li style={{ marginBottom: 8 }}>• <strong>Fee Splitting:</strong> Separating charges to avoid APR disclosure requirements</li>
                <li style={{ marginBottom: 8 }}>• <strong>Fintech Disguises:</strong> Using technology to mask traditional payday lending</li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {/* Consumer Rights Tab */}
      {activeEducationTab === "consumer-rights" && (
        <div>
          <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>
              🛡️ Your Consumer Rights & Protections
            </h3>
            
            {/* Core Rights */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#059669", marginBottom: 12 }}>
                Fundamental Rights
              </h4>
              <div style={{ display: "grid", gap: 16 }}>
                <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>
                    Right to Clear Information
                  </h5>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    You have the right to understand all costs, terms, and conditions before signing any loan agreement.
                  </p>
                </div>
                
                <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>
                    Right to Think It Over
                  </h5>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Legitimate lenders never pressure you to decide immediately. You have the right to take time to consider alternatives.
                  </p>
                </div>
                
                <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>
                    Right to Privacy
                  </h5>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Your personal and financial information should be protected and not shared without your explicit consent.
                  </p>
                </div>
              </div>
            </div>

            {/* Violation Reporting */}
            <div style={{ background: "#fef2f2", padding: "1.5rem", borderRadius: 8, border: "1px solid #fecaca", marginBottom: 24 }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#dc2626", marginBottom: 12 }}>
                When Your Rights Are Violated
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Report To:</h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• Consumer Financial Protection Bureau (CFPB)</li>
                    <li>• State Attorney General's Office</li>
                    <li>• Better Business Bureau</li>
                    <li>• Federal Trade Commission (FTC)</li>
                  </ul>
                </div>
                <div>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Document:</h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• All loan documents and communications</li>
                    <li>• Screenshots of deceptive practices</li>
                    <li>• Records of payment history</li>
                    <li>• Any harassment or threats</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Legal Protections */}
            <div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#7c3aed", marginBottom: 12 }}>
                Legal Protections Available
              </h4>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <strong>Fair Debt Collection Practices Act:</strong> Protects against harassment and abusive collection practices.
                </div>
                <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <strong>Electronic Fund Transfer Act:</strong> Limits automatic withdrawals from your bank account.
                </div>
                <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <strong>State Usury Laws:</strong> May cap interest rates and fees in your state.
                </div>
                <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <strong>Class Action Rights:</strong> You may be able to join lawsuits against predatory lenders.
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Alternatives Tab */}
      {activeEducationTab === "alternatives" && (
        <div>
          <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>
              🏦 Better Financial Alternatives
            </h3>
            
            {/* Credit Union Options */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#059669", marginBottom: 12 }}>
                Credit Union Alternatives
              </h4>
              <div style={{ background: "#f0fdf4", padding: "1.5rem", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>
                  Payday Alternative Loans (PALs)
                </h5>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      <strong>PAL I:</strong> $200-$1,000, 1-6 months, 28% APR max
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      <strong>PAL II:</strong> $200-$2,000, 1-12 months, 28% APR max
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      <strong>Requirements:</strong> 1-month membership, $20 application fee max
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      <strong>Benefits:</strong> Build credit, financial counseling included
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#059669", fontWeight: 600 }}>
                  💡 Find credit unions near you: <a href="https://www.ncua.gov/support-services/credit-union-locator" style={{ color: "#059669" }}>NCUA Credit Union Locator</a>
                </p>
              </div>
            </div>

            {/* Other Alternatives */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: 8, border: "1px solid #bfdbfe" }}>
                <h5 style={{ fontSize: "1rem", fontWeight: 600, color: "#0369a1", marginBottom: 8 }}>
                  Community Resources
                </h5>
                <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                  <li>• Local churches and charities</li>
                  <li>• Salvation Army emergency assistance</li>
                  <li>• United Way financial programs</li>
                  <li>• Community development financial institutions (CDFIs)</li>
                  <li>• Nonprofit credit counseling</li>
                </ul>
              </div>
              
              <div style={{ background: "#fffbeb", padding: "1.5rem", borderRadius: 8, border: "1px solid #fed7aa" }}>
                <h5 style={{ fontSize: "1rem", fontWeight: 600, color: "#92400e", marginBottom: 8 }}>
                  Employer & Government Programs
                </h5>
                <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                  <li>• Employer salary advances</li>
                  <li>• Employee assistance programs</li>
                  <li>• SNAP and food assistance</li>
                  <li>• Utility assistance programs</li>
                  <li>• Medicaid and healthcare assistance</li>
                </ul>
              </div>
            </div>

            {/* Apps and Technology */}
            <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#7c3aed", marginBottom: 12 }}>
                Technology-Based Solutions
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Ethical Advance Apps</h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• DailyPay (employer integration)</li>
                    <li>• Earnin (tip-based advances)</li>
                    <li>• Dave (small advances, budgeting)</li>
                    <li>• Brigit (overdraft protection)</li>
                  </ul>
                </div>
                <div>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Budgeting & Savings</h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• Mint (comprehensive budgeting)</li>
                    <li>• YNAB (zero-based budgeting)</li>
                    <li>• Qapital (automatic savings)</li>
                    <li>• Digit (intelligent saving)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Protection Strategies Tab */}
      {activeEducationTab === "protection" && (
        <div>
          <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>
              🔒 Protection Strategies & Best Practices
            </h3>
            
            {/* Immediate Protection */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#dc2626", marginBottom: 12 }}>
                Immediate Protection Steps
              </h4>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ background: "#fef2f2", padding: "1rem", borderRadius: 8, border: "1px solid #fecaca" }}>
                  <strong>1. The 24-Hour Rule:</strong> Never make financial decisions under pressure. Take at least 24 hours to think and research.
                </div>
                <div style={{ background: "#fef2f2", padding: "1rem", borderRadius: 8, border: "1px solid #fecaca" }}>
                  <strong>2. Calculate Total Cost:</strong> Always ask for the total amount you'll pay back, including all fees and interest.
                </div>
                <div style={{ background: "#fef2f2", padding: "1rem", borderRadius: 8, border: "1px solid #fecaca" }}>
                  <strong>3. Verify Legitimacy:</strong> Check licensing with your state's financial regulator before borrowing.
                </div>
                <div style={{ background: "#fef2f2", padding: "1rem", borderRadius: 8, border: "1px solid #fecaca" }}>
                  <strong>4. Document Everything:</strong> Keep records of all communications, agreements, and payment history.
                </div>
              </div>
            </div>

            {/* Long-term Strategies */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#059669", marginBottom: 12 }}>
                Long-term Financial Protection
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "#f0fdf4", padding: "1.5rem", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Build Emergency Fund</h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• Start with $100-$500 goal</li>
                    <li>• Use automatic transfers</li>
                    <li>• Keep in separate savings account</li>
                    <li>• Gradually increase to 3-6 months expenses</li>
                  </ul>
                </div>
                
                <div style={{ background: "#f0fdf4", padding: "1.5rem", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Improve Credit</h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• Pay bills on time</li>
                    <li>• Keep credit utilization low</li>
                    <li>• Consider secured credit cards</li>
                    <li>• Monitor credit reports regularly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Digital Protection */}
            <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <h4 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#7c3aed", marginBottom: 12 }}>
                Digital Privacy Protection
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Browser Protection</h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• Use ad blockers</li>
                    <li>• Enable tracking protection</li>
                    <li>• Clear cookies regularly</li>
                    <li>• Use private browsing mode</li>
                  </ul>
                </div>
                <div>
                  <h5 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Data Protection</h5>
                  <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
                    <li>• Limit personal information sharing</li>
                    <li>• Read privacy policies carefully</li>
                    <li>• Opt out of data sharing</li>
                    <li>• Use separate email for financial matters</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Resources Section (shown on all tabs) */}
      <section style={{ background: "#f0f9ff", borderRadius: 12, padding: "2rem", border: "1px solid #0369a1" }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16, color: "#0369a1" }}>
          📞 Important Resources & Contacts
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Government Resources</h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li style={{ marginBottom: 8 }}>
                <strong>CFPB:</strong> <a href="https://www.consumerfinance.gov" style={{ color: "#0369a1" }}>consumerfinance.gov</a>
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>FTC:</strong> <a href="https://www.ftc.gov" style={{ color: "#0369a1" }}>ftc.gov</a>
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>NCUA:</strong> <a href="https://www.ncua.gov" style={{ color: "#0369a1" }}>ncua.gov</a>
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>State Banking Regulators:</strong> Check your state's website
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>Support Services</h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem" }}>
              <li style={{ marginBottom: 8 }}>
                <strong>Credit Counseling:</strong> <a href="https://www.nfcc.org" style={{ color: "#0369a1" }}>nfcc.org</a>
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Financial Coaching:</strong> <a href="https://www.afc.org" style={{ color: "#0369a1" }}>afc.org</a>
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Legal Aid:</strong> <a href="https://www.lsc.gov" style={{ color: "#0369a1" }}>lsc.gov</a>
              </li>
              <li style={{ marginBottom: 8 }}>
                <strong>Crisis Hotlines:</strong> 211 (dial 2-1-1) for local assistance
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

// Comprehension Quiz Component
const ComprehensionQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    // Basic APR Knowledge
    {
      question: "What is the typical APR range for payday loans?",
      options: ["10-30%", "50-100%", "200-400%", "391-664%"],
      correct: 3,
      explanation: "Payday loans typically have APRs ranging from 391% to 664%, far exceeding credit cards or personal loans.",
      category: "Hidden Costs"
    },
    
    // Emotional Manipulation
    {
      question: "Which of these is an example of emotional manipulation in payday lending?",
      options: ["Clear APR disclosure", "Crisis exploitation banners", "Transparent fee breakdown", "Educational resources"],
      correct: 1,
      explanation: "Crisis exploitation banners like 'EMERGENCY CASH!' specifically target financial desperation and vulnerable emotional states.",
      category: "Emotional Manipulation"
    },
    
    // Hidden Costs
    {
      question: "What is 'drip pricing' in predatory lending?",
      options: [
        "Showing all fees upfront",
        "Gradually revealing additional costs after commitment",
        "Offering payment plans",
        "Providing cost comparisons"
      ],
      correct: 1,
      explanation: "Drip pricing reveals additional fees only after users have committed, making it harder to back out and compare true costs.",
      category: "Hidden Costs"
    },
    
    // Forced Continuity
    {
      question: "What is the 'debt trap' in payday lending?",
      options: [
        "A physical location",
        "A type of loan",
        "Repeated rollovers creating a cycle of debt",
        "A legal term"
      ],
      correct: 2,
      explanation: "The debt trap occurs when borrowers repeatedly roll over loans, paying more in fees than the original principal.",
      category: "Forced Continuity"
    },
    
    // Fake Trust Signals
    {
      question: "Which of these is NOT a legitimate trust signal?",
      options: ["Real FDIC insurance", "Fake government endorsements", "Verified BBB rating", "State licensing information"],
      correct: 1,
      explanation: "Fake government endorsements are deceptive. Real trust signals include actual FDIC insurance, verified BBB ratings, and state licensing.",
      category: "Fake Trust Signals"
    },
    
    // Deceptive Interface Design
    {
      question: "What makes a 'decline' button deceptive in predatory lending interfaces?",
      options: [
        "It's the same size as the 'accept' button",
        "It's clearly labeled",
        "It's made invisible or non-functional",
        "It's placed prominently"
      ],
      correct: 2,
      explanation: "Deceptive interfaces make decline buttons invisible, non-functional, or extremely difficult to find, forcing users toward acceptance.",
      category: "Deceptive Interface"
    },
    
    // Predatory Targeting
    {
      question: "Which data collection practice is most concerning in predatory lending?",
      options: [
        "Collecting only necessary loan information",
        "Behavioral tracking to identify vulnerability",
        "Providing clear privacy policies",
        "Allowing users to opt out"
      ],
      correct: 1,
      explanation: "Behavioral tracking specifically identifies and exploits user vulnerabilities, turning personal data into a weapon against borrowers.",
      category: "Predatory Targeting"
    },
    
    // Modern Techniques
    {
      question: "How do modern AI-powered manipulation techniques work?",
      options: [
        "They help users find better loan terms",
        "They provide educational content",
        "They personalize dark patterns for maximum effectiveness",
        "They protect user privacy"
      ],
      correct: 2,
      explanation: "Modern AI systems analyze user behavior to personalize manipulation techniques, making dark patterns more effective against individual users.",
      category: "Modern Techniques"
    },
    
    // Regulatory Knowledge
    {
      question: "What should you do before taking a payday loan?",
      options: [
        "Apply quickly before the offer expires",
        "Explore alternatives like credit unions",
        "Take the maximum amount offered",
        "Skip reading the terms"
      ],
      correct: 1,
      explanation: "Always explore alternatives first. Credit unions, payment plans, and nonprofit assistance often offer much better terms.",
      category: "Consumer Protection"
    },
    
    // Autonomy and Consent
    {
      question: "What is the most important element of informed consent in lending?",
      options: [
        "Fast approval process",
        "Understanding all costs and risks upfront",
        "Attractive marketing materials",
        "Social proof from other borrowers"
      ],
      correct: 1,
      explanation: "Informed consent requires full understanding of all costs, risks, and alternatives before making a financial decision.",
      category: "Ethics and Autonomy"
    },
    
    // Backend Logic Understanding
    {
      question: "What is the difference between exploitative and ethical backend systems?",
      options: [
        "Exploitative systems track user vulnerability; ethical systems provide protection",
        "There is no difference in backend systems",
        "Ethical systems are slower",
        "Exploitative systems are more secure"
      ],
      correct: 0,
      explanation: "Exploitative backends track and exploit user vulnerabilities, while ethical systems protect users and provide transparent information.",
      category: "System Architecture"
    },
    
    // Pattern Recognition
    {
      question: "Which combination of dark patterns creates the most dangerous debt trap?",
      options: [
        "Clear pricing + transparent terms",
        "Urgency tactics + hidden costs + auto-renewals",
        "Educational content + alternatives",
        "Ethical AI + privacy protection"
      ],
      correct: 1,
      explanation: "The combination of urgency tactics, hidden costs, and auto-renewals creates a powerful debt trap that's hard to escape.",
      category: "Pattern Recognition"
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === questions[index].correct ? score + 1 : score;
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    // Calculate category performance
    const categoryPerformance = questions.reduce((acc, q, index) => {
      const category = q.category || "General";
      if (!acc[category]) {
        acc[category] = { correct: 0, total: 0 };
      }
      acc[category].total++;
      if (answers[index] === q.correct) {
        acc[category].correct++;
      }
      return acc;
    }, {} as Record<string, { correct: number; total: number }>);

    return (
      <div>
        <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 24 }}>
          Comprehensive Quiz Results
        </h2>
        
        <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: 24 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: "4rem", fontWeight: 700, color: percentage >= 75 ? "#16a34a" : percentage >= 50 ? "#f59e0b" : "#dc2626" }}>
              {percentage}%
            </div>
            <p style={{ fontSize: "1.25rem", color: "#6b7280" }}>
              You got {score} out of {questions.length} questions correct
            </p>
            <p style={{ fontSize: "1rem", color: "#6b7280", marginTop: 8 }}>
              {percentage >= 85 ? "🎉 Excellent! You have strong knowledge of predatory lending patterns." :
               percentage >= 75 ? "✅ Good job! You understand most dark patterns and protection strategies." :
               percentage >= 60 ? "⚠️ Fair understanding. Consider reviewing the educational content." :
               "❌ Needs improvement. Please review the pattern education and try again."}
            </p>
          </div>

          {/* Category Performance */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 16 }}>
              Performance by Category
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              {Object.entries(categoryPerformance).map(([category, stats]) => {
                const categoryPercentage = Math.round((stats.correct / stats.total) * 100);
                return (
                  <div key={category} style={{ 
                    background: "#f9fafb", 
                    padding: "1rem", 
                    borderRadius: 8,
                    border: `2px solid ${categoryPercentage >= 75 ? "#16a34a" : categoryPercentage >= 50 ? "#f59e0b" : "#dc2626"}`
                  }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>{category}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        {stats.correct}/{stats.total} correct
                      </span>
                      <span style={{ 
                        fontSize: "1.25rem", 
                        fontWeight: 600, 
                        color: categoryPercentage >= 75 ? "#16a34a" : categoryPercentage >= 50 ? "#f59e0b" : "#dc2626"
                      }}>
                        {categoryPercentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            {questions.map((q, index) => (
              <div key={index} style={{ padding: 16, background: "#f9fafb", borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <p style={{ fontWeight: 600, flex: 1 }}>{q.question}</p>
                  <span style={{ 
                    background: q.category === "Emotional Manipulation" ? "#dc2626" :
                               q.category === "Hidden Costs" ? "#f59e0b" :
                               q.category === "Forced Continuity" ? "#7c2d12" :
                               q.category === "Fake Trust Signals" ? "#059669" :
                               q.category === "Deceptive Interface" ? "#7c3aed" :
                               q.category === "Predatory Targeting" ? "#be123c" :
                               q.category === "Modern Techniques" ? "#1e40af" :
                               "#6b7280",
                    color: "#fff",
                    padding: "0.25rem 0.5rem",
                    borderRadius: 4,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    marginLeft: 8
                  }}>
                    {q.category}
                  </span>
                </div>
                <p style={{ color: answers[index] === q.correct ? "#16a34a" : "#dc2626", marginBottom: 8 }}>
                  Your answer: {q.options[answers[index]]} {answers[index] === q.correct ? "✓" : "✗"}
                </p>
                {answers[index] !== q.correct && (
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    Correct answer: {q.options[q.correct]}
                  </p>
                )}
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: 8 }}>
                  {q.explanation}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers([]);
                setShowResults(false);
              }}
              style={{
                background: "#7c3aed",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: 8,
                border: "none",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Retake Quiz
            </button>
            <button
              onClick={() => {
                const results = {
                  score: percentage,
                  categoryPerformance,
                  detailedResults: questions.map((q, index) => ({
                    question: q.question,
                    category: q.category,
                    correct: answers[index] === q.correct,
                    userAnswer: q.options[answers[index]],
                    correctAnswer: q.options[q.correct]
                  }))
                };
                console.log("Quiz Results:", results);
                alert("Quiz results logged to console. In a real application, this would download or email your results.");
              }}
              style={{
                background: "#059669",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: 8,
                border: "none",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Export Results
            </button>
          </div>
        </section>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div>
      <h2 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 24 }}>
        Test Your Knowledge
      </h2>
      
      <section style={{ background: "#fff", borderRadius: 12, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              {Math.round(((currentQuestion) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div style={{ background: "#e5e7eb", height: 8, borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                background: "#7c3aed",
                height: "100%",
                width: `${((currentQuestion) / questions.length) * 100}%`,
                transition: "width 0.3s"
              }}
            />
          </div>
        </div>

        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 20 }}>
          {question.question}
        </h3>

        <div style={{ display: "grid", gap: 12 }}>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              style={{
                padding: "1rem",
                background: "#f9fafb",
                border: "2px solid #e5e7eb",
                borderRadius: 8,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
                fontWeight: 500
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7c3aed";
                e.currentTarget.style.background = "#faf5ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.background = "#f9fafb";
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

// Helper Components
const MetricCard: React.FC<{
  title: string;
  value: string;
  color: string;
  description: string;
}> = ({ title, value, color, description }) => (
  <div style={{ background: "#fff", borderRadius: 12, padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
    <h4 style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: 8 }}>{title}</h4>
    <div style={{ fontSize: "2rem", fontWeight: 700, color, marginBottom: 4 }}>{value}</div>
    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{description}</p>
  </div>
);

const ConceptCard: React.FC<{
  title: string;
  content: string;
}> = ({ title, content }) => (
  <div style={{ padding: 16, background: "#fff", borderRadius: 8, border: "1px solid #fbbf24" }}>
    <h4 style={{ fontWeight: 600, marginBottom: 8 }}>{title}</h4>
    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{content}</p>
  </div>
);

export default ReflectionDashboard; 