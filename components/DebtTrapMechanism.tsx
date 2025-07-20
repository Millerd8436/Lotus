"use client";

import React, { useEffect, useState } from "react";

/**
 * DebtTrapMechanism - Consolidated Component
 *
 * Based on research findings:
 * - 80% of loans are rolled over within 2 weeks
 * - Only 15% of borrowers pay on time without taking new loan
 * - 75% of lender revenue from borrowers in 10+ loans per year
 * - Borrowers pay more in fees than original principal
 * - Business model designed around debt dependency
 * - Rollover fees without principal reduction
 *
 * This consolidates: GamificationDebtTrap, rollover mechanisms, and debt cycle psychology
 */

interface LoanCycle {
  id: string;
  loanNumber: number;
  principal: number;
  fees: number;
  totalDue: number;
  dueDate: Date;
  status: "active" | "rolled_over" | "paid" | "defaulted";
  rolloverCount: number;
  paymentsMade: number;
  principalPaid: number;
  feesPaid: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  deceptiveName: string;
  realMeaning: string;
  harmLevel: number;
}

interface DebtTrapStatistics {
  totalLoansThisYear: number;
  totalFeesPaid: number;
  totalPrincipalPaid: number;
  currentDebtCycle: number;
  daysInDebt: number;
  rolloverStreak: number;
  dependencyScore: number;
}

export const DebtTrapMechanism: React.FC<{
  initialLoan: number;
  feePerRollover: number;
}> = ({ initialLoan = 300, feePerRollover = 50 }) => {
  const [loanHistory, setLoanHistory] = useState<LoanCycle[]>([]);
  const [currentLoan, setCurrentLoan] = useState<LoanCycle | null>(null);
  const [statistics, setStatistics] = useState<DebtTrapStatistics>({
    totalLoansThisYear: 0,
    totalFeesPaid: 0,
    totalPrincipalPaid: 0,
    currentDebtCycle: 0,
    daysInDebt: 0,
    rolloverStreak: 0,
    dependencyScore: 0,
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const [simulationActive, setSimulationActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cycles, setCycles] = useState<RolloverCycle[]>([
    {
      cycleNumber: 0,
      principal: initialLoan,
      fees: 45,
      totalDue: initialLoan + 45,
      daysInDebt: 14,
      totalPaid: 0,
    },
  ]);
  const [isTrapped, setIsTrapped] = useState(false);

  // Initialize predatory achievements
  useEffect(() => {
    const deceptiveAchievements: Achievement[] = [
      {
        id: "first_loan",
        title: "🎯 Smart Starter",
        description: "Completed your first smart loan",
        icon: "🏆",
        unlocked: false,
        deceptiveName: "Financial Empowerment",
        realMeaning: "First step into debt trap",
        harmLevel: 1,
      },
      {
        id: "quick_return",
        title: "⚡ Quick Returner",
        description: "Returned within 30 days - you know quality!",
        icon: "🔥",
        unlocked: false,
        deceptiveName: "Loyalty Reward",
        realMeaning: "Financial desperation indicator",
        harmLevel: 2,
      },
      {
        id: "rollover_user",
        title: "🔄 Flexibility Master",
        description: "Used our flexible rollover options",
        icon: "🌟",
        unlocked: false,
        deceptiveName: "Smart Money Management",
        realMeaning: "Trapped in fee cycle",
        harmLevel: 3,
      },
      {
        id: "loyal_customer",
        title: "💎 Premium Partner",
        description: "Active for 6+ months - true partnership!",
        icon: "💎",
        unlocked: false,
        deceptiveName: "VIP Status",
        realMeaning: "Chronic debt dependency",
        harmLevel: 4,
      },
      {
        id: "debt_cycle_expert",
        title: "🔄 Cycle Champion",
        description: "10+ loans this year - maximum benefits!",
        icon: "👑",
        unlocked: false,
        deceptiveName: "Elite Member",
        realMeaning: "Complete financial exploitation",
        harmLevel: 5,
      },
    ];
    setAchievements(deceptiveAchievements);
  }, []);

  // Initialize first loan
  useEffect(() => {
    if (loanHistory.length === 0) {
      const firstLoan: LoanCycle = {
        id: "1",
        loanNumber: 1,
        principal: 300,
        fees: 45,
        totalDue: 345,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: "active",
        rolloverCount: 0,
        paymentsMade: 0,
        principalPaid: 0,
        feesPaid: 45,
      };

      setLoanHistory([firstLoan]);
      setCurrentLoan(firstLoan);
    }
  }, [loanHistory.length]);

  // Simulate debt trap progression
  const simulateDebtTrap = () => {
    if (simulationActive) {
      return;
    }
    setSimulationActive(true);
    setCurrentStep(0);

    // Step 1: Initial loan (already created)
    setTimeout(() => {
      setCurrentStep(1);
      unlockAchievement("first_loan");
    }, 1000);

    // Step 2: First rollover
    setTimeout(() => {
      setCurrentStep(2);
      performRollover();
    }, 3000);

    // Step 3: Second rollover
    setTimeout(() => {
      setCurrentStep(3);
      performRollover();
      unlockAchievement("rollover_user");
    }, 5000);

    // Step 4: New loan after rollover
    setTimeout(() => {
      setCurrentStep(4);
      createNewLoan();
      unlockAchievement("quick_return");
    }, 7000);

    // Step 5: Multiple loan cycle
    setTimeout(() => {
      setCurrentStep(5);
      createMultipleLoanCycle();
      unlockAchievement("loyal_customer");
    }, 9000);

    // Step 6: Debt cycle expert status
    setTimeout(() => {
      setCurrentStep(6);
      unlockAchievement("debt_cycle_expert");
      setSimulationActive(false);
    }, 11000);
  };

  const performRollover = () => {
    if (!currentLoan) {
      return;
    }

    const rolloverFee = 50;
    const newTotalDue = currentLoan.principal + rolloverFee;

    const rolledLoan: LoanCycle = {
      ...currentLoan,
      fees: currentLoan.fees + rolloverFee,
      totalDue: newTotalDue,
      rolloverCount: currentLoan.rolloverCount + 1,
      feesPaid: currentLoan.feesPaid + rolloverFee,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: "rolled_over",
    };

    setLoanHistory((prev) =>
      prev.map((loan) => (loan.id === currentLoan.id ? rolledLoan : loan))
    );
    setCurrentLoan(rolledLoan);

    updateStatistics({
      totalFeesPaid: statistics.totalFeesPaid + rolloverFee,
      rolloverStreak: statistics.rolloverStreak + 1,
      daysInDebt: statistics.daysInDebt + 14,
    });
  };

  const createNewLoan = () => {
    const newLoanNumber = loanHistory.length + 1;
    const newLoan: LoanCycle = {
      id: newLoanNumber.toString(),
      loanNumber: newLoanNumber,
      principal: 300,
      fees: 45,
      totalDue: 345,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: "active",
      rolloverCount: 0,
      paymentsMade: 0,
      principalPaid: 0,
      feesPaid: 0,
    };

    setLoanHistory((prev) => [...prev, newLoan]);
    setCurrentLoan(newLoan);

    updateStatistics({
      totalLoansThisYear: statistics.totalLoansThisYear + 1,
      currentDebtCycle: statistics.currentDebtCycle + 1,
    });
  };

  const createMultipleLoanCycle = () => {
    // Simulate multiple loans to show the 10+ loan pattern
    const multipleLoanCount = 8;
    const newLoans: LoanCycle[] = [];

    for (let i = 0; i < multipleLoanCount; i++) {
      const loanNumber = loanHistory.length + i + 1;
      const loan: LoanCycle = {
        id: loanNumber.toString(),
        loanNumber: loanNumber,
        principal: 300,
        fees: 45 + i * 10, // Increasing fees
        totalDue: 345 + i * 10,
        dueDate: new Date(Date.now() + (i + 1) * 14 * 24 * 60 * 60 * 1000),
        status: i < 6 ? "rolled_over" : "active",
        rolloverCount: i < 6 ? Math.floor(Math.random() * 3) + 1 : 0,
        paymentsMade: 0,
        principalPaid: 0,
        feesPaid: 45 + i * 10,
      };
      newLoans.push(loan);
    }

    setLoanHistory((prev) => [...prev, ...newLoans]);
    setCurrentLoan(newLoans[newLoans.length - 1] || null);

    updateStatistics({
      totalLoansThisYear: statistics.totalLoansThisYear + multipleLoanCount,
      totalFeesPaid:
        statistics.totalFeesPaid +
        newLoans.reduce((sum, loan) => sum + loan.feesPaid, 0),
      currentDebtCycle: statistics.currentDebtCycle + multipleLoanCount,
      daysInDebt: statistics.daysInDebt + multipleLoanCount * 14,
      dependencyScore: 10,
    });
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, unlocked: true }
          : achievement
      )
    );
  };

  const updateStatistics = (updates: Partial<DebtTrapStatistics>) => {
    setStatistics((prev) => ({ ...prev, ...updates }));
  };

  const resetSimulation = () => {
    setSimulationActive(false);
    setCurrentStep(0);
    setLoanHistory([]);
    setCurrentLoan(null);
    setStatistics({
      totalLoansThisYear: 0,
      totalFeesPaid: 0,
      totalPrincipalPaid: 0,
      currentDebtCycle: 0,
      daysInDebt: 0,
      rolloverStreak: 0,
      dependencyScore: 0,
    });
    setAchievements((prev) =>
      prev.map((achievement) => ({ ...achievement, unlocked: false }))
    );
  };

  const addRollover = () => {
    const lastCycle = cycles[cycles.length - 1];
    const newCycle: RolloverCycle = {
      cycleNumber: lastCycle.cycleNumber + 1,
      principal: lastCycle.principal, // Principal never decreases!
      fees: feePerRollover,
      totalDue: lastCycle.principal + feePerRollover,
      daysInDebt: lastCycle.daysInDebt + 14,
      totalPaid: lastCycle.totalPaid + feePerRollover,
    };

    setCycles([...cycles, newCycle]);

    if (newCycle.cycleNumber >= 3) {
      setIsTrapped(true);
    }
  };

  const currentCycle = cycles[cycles.length - 1];
  const apr =
    ((currentCycle.totalPaid / initialLoan) * (365 / currentCycle.daysInDebt)) *
    100;

  const getProgressColor = (dependencyScore: number) => {
    if (dependencyScore <= 2) {
      return "#4caf50";
    }
    if (dependencyScore <= 5) {
      return "#ff9800";
    }
    if (dependencyScore <= 8) {
      return "#ff5722";
    }
    return "#f44336";
  };

  const getStepDescription = (step: number) => {
    const descriptions = [
      "Setting up your first loan...",
      "Initial loan created - welcome to the system!",
      "First rollover - just a small fee to help you out",
      "Second rollover - building your credit history",
      "New loan needed - you're becoming a valued customer",
      "Multiple loan cycle - you're our VIP member!",
      "Debt cycle complete - maximum revenue extraction achieved",
    ];
    return descriptions[step] || "";
  };

  return (
    <div
      className="debt-trap-mechanism"
      style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #dc2626, #ef4444)",
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
          🌀 Debt Trap Mechanism Simulator
        </h2>
        <p style={{ margin: 0, fontSize: "1.1rem", opacity: 0.9 }}>
          Experience how payday lenders design business models around debt
          dependency
        </p>
      </div>

      {/* Current Status Dashboard */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3
          style={{
            margin: "0 0 1.5rem 0",
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
        >
          📊 Debt Dependency Dashboard
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#b91c1c" }}
            >
              {statistics.totalLoansThisYear}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              Loans This Year
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#f44336" }}
            >
              ${statistics.totalFeesPaid}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              Total Fees Paid
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#4caf50" }}
            >
              ${statistics.totalPrincipalPaid}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              Principal Paid
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#ff9800" }}
            >
              {statistics.daysInDebt}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              Days in Debt
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: getProgressColor(statistics.dependencyScore),
              }}
            >
              {statistics.dependencyScore}/10
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              Dependency Score
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Controls */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
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
          🎮 Debt Trap Simulation
        </h3>
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "0.5rem",
            }}
          >
            Simulation Progress: Step {currentStep} of 6
          </div>
          <div
            style={{
              background: "#f0f0f0",
              height: "8px",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #dc2626, #ef4444)",
                height: "100%",
                width: `${(currentStep / 6) * 100}%`,
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <div
            style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
          >
            {getStepDescription(currentStep)}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={simulateDebtTrap}
            disabled={simulationActive}
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              background: simulationActive
                ? "#ccc"
                : "linear-gradient(90deg, #dc2626, #ef4444)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: simulationActive ? "not-allowed" : "pointer",
              minWidth: "200px",
            }}
          >
            {simulationActive
              ? "Simulating Debt Trap..."
              : "Start Debt Trap Simulation"}
          </button>
          <button
            onClick={resetSimulation}
            style={{
              flex: 1,
              padding: "0.75rem 1.5rem",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              minWidth: "150px",
            }}
          >
            Reset Simulation
          </button>
        </div>
      </div>

      {/* Deceptive Achievements */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
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
          🏆 &quot;Achievements&quot; (Deceptive Gamification)
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              style={{
                background: achievement.unlocked ? "#fee2e2" : "#f8f9fa",
                padding: "1rem",
                borderRadius: "8px",
                border: achievement.unlocked
                  ? "2px solid #ef4444"
                  : "1px solid #e9ecef",
                opacity: achievement.unlocked ? 1 : 0.6,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{achievement.icon}</span>
                <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  {achievement.title}
                </span>
                {achievement.unlocked && (
                  <span
                    style={{
                      fontSize: "0.8rem",
                      background: "#4caf50",
                      color: "white",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                    }}
                  >
                    UNLOCKED
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginBottom: "0.5rem",
                }}
              >
                {achievement.description}
              </div>
              <div style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                <span style={{ color: "#4caf50", fontWeight: "bold" }}>
                  Marketed as:
                </span>{" "}
                {achievement.deceptiveName}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#f44336" }}>
                <span style={{ fontWeight: "bold" }}>Reality:</span>{" "}
                {achievement.realMeaning}
              </div>
              <div style={{ marginTop: "0.5rem" }}>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  Harm Level:
                </div>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background:
                          i < achievement.harmLevel ? "#f44336" : "#e0e0e0",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loan History */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
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
          📋 Loan History & Debt Cycle
        </h3>
        {loanHistory.length === 0 ? (
          <div style={{ textAlign: "center", color: "#666", padding: "2rem" }}>
            No loan history yet. Click &quot;Start Debt Trap Simulation&quot; to
            see the progression.
          </div>
        ) : (
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {loanHistory.map((loan) => (
              <div
                key={loan.id}
                style={{
                  background: loan.status === "active" ? "#e8f5e8" : "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  border: `2px solid ${loan.status === "active" ? "#4caf50" : "#e0e0e0"}`,
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
                  <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Loan #{loan.loanNumber}
                  </span>
                  <span
                    style={{
                      background:
                        loan.status === "active"
                          ? "#4caf50"
                          : loan.status === "rolled_over"
                            ? "#ff9800"
                            : "#6c757d",
                      color: "white",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {loan.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  <div>
                    <strong>Principal:</strong> ${loan.principal}
                  </div>
                  <div>
                    <strong>Fees:</strong> ${loan.fees}
                  </div>
                  <div>
                    <strong>Total Due:</strong> ${loan.totalDue}
                  </div>
                  <div>
                    <strong>Rollovers:</strong> {loan.rolloverCount}
                  </div>
                </div>
                {loan.rolloverCount > 0 && (
                  <div
                    style={{
                      background: "#fff3cd",
                      color: "#856404",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      marginTop: "0.5rem",
                      fontSize: "0.8rem",
                    }}
                  >
                    🔄 Rolled over {loan.rolloverCount} time(s) - Principal
                    never reduced!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Research Statistics */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1.5rem",
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
          📈 Research-Based Debt Trap Statistics
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              background: "#ffebee",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ffcdd2",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#d32f2f",
              }}
            >
              80%
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              Of payday loans are rolled over within 2 weeks
            </div>
          </div>
          <div
            style={{
              background: "#fff3cd",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ffe0a6",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#856404",
              }}
            >
              15%
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              Of borrowers pay off loan on time without taking new loan
            </div>
          </div>
          <div
            style={{
              background: "#fff7ed",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ffedd5",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#c2410c",
              }}
            >
              75%
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              Of lender revenue from borrowers in 10+ loans per year
            </div>
          </div>
          <div
            style={{
              background: "#e8f5e8",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #c8e6c9",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#2e7d32",
              }}
            >
              $0
            </div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>
              Principal reduction in most rollover cycles
            </div>
          </div>
        </div>
      </div>

      {/* Educational Information */}
      <div
        style={{
          background: "#fff5f5",
          padding: "2rem",
          borderRadius: "12px",
          border: "2px solid #ef4444",
        }}
      >
        <h3
          style={{
            margin: "0 0 1rem 0",
            fontSize: "1.3rem",
            fontWeight: "bold",
            color: "#991b1b",
          }}
        >
          🎓 Educational: The Debt Trap Business Model
        </h3>
        <div style={{ fontSize: "1rem", lineHeight: "1.6", color: "#333" }}>
          <p>
            <strong>The 80/15 Rule:</strong> 80% of loans are rolled over within
            2 weeks, while only 15% are paid off on time without taking a new
            loan.
          </p>
          <p>
            <strong>Revenue Concentration:</strong> 75% of lender revenue comes
            from borrowers trapped in 10+ loans per year - this is the target
            customer.
          </p>
          <p>
            <strong>Rollover Trap:</strong> When you &quot;rollover&quot; a
            loan, you only pay the fee (typically $50) but the principal amount
            stays the same. This creates a cycle where you pay repeatedly
            without reducing debt.
          </p>
          <p>
            <strong>Gamification Deception:</strong> Lenders use
            &quot;achievements&quot; and &quot;loyalty programs&quot; to make
            debt dependency feel positive and rewarding.
          </p>
          <p>
            <strong>Business Model:</strong> The industry is designed around
            borrowers who cannot pay back the loan quickly - these are the most
            profitable customers.
          </p>
          <p>
            <strong>Rollover &ldquo;Option&rdquo;:</strong> When borrowers
            can&apos;t repay in full, lenders offer to &ldquo;roll over&rdquo;
            the loan for an additional fee.
          </p>
          <p>
            Lenders make borrowers feel &ldquo;grateful&rdquo; for rollover
            &ldquo;help&rdquo; while trapping them deeper in debt.
          </p>
          <p>
            <strong>&ldquo;Debt Trap&rdquo; Mechanics:</strong> Average borrower
            pays more in fees ($520) than original loan amount ($375).
          </p>
          <p>
            <strong>Industry Research:</strong> &ldquo;Debt Trap&rdquo; by
            Design - Lenders make 76% of revenue from borrowers trapped in 10+
            loans per year.
          </p>
          <p>
            <strong>Rollover Economics:</strong> &ldquo;Convenience&rdquo; fees
            of $50+ generate $4.2 billion annually while borrowers sink deeper
            into debt.
          </p>
          <p>
            <strong>Psychological Manipulation:</strong> Rollover
            &ldquo;offers&rdquo; framed as &ldquo;help&rdquo; and
            &ldquo;flexibility&rdquo; when they&apos;re designed to create
            dependency.
          </p>
          <p>
            Research: Average payday borrower spends 5 months per year in debt,
            paying $520 in fees for $375 in credit - proving the
            &ldquo;short-term&rdquo; loan is actually a &ldquo;long-term debt
            trap&rdquo;.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DebtTrapMechanism;
