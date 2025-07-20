import { analyticsEngine } from "@/lib/core/AnalyticsEngine";
import React, { useEffect, useState } from "react";

/**
 * DebtTrapMechanism - Enhanced 2025 Version
 *
 * Based on research findings:
 * - 80% of loans are rolled over within 2 weeks
 * - Only 15% of borrowers pay on time without taking new loan
 * - 75% of lender revenue from borrowers in 10+ loans per year
 * - Borrowers pay more in fees than original principal
 * - Business model designed around debt dependency
 * - Rollover fees without principal reduction
 *
 * NEW 2025 TACTICS:
 * - Merchant Cash Advances (MCA) with daily ACH debits
 * - Confession of Judgment clauses for immediate asset seizure
 * - Automatic renewal defaults (opt-out required)
 * - Multiple account debiting strategies
 * - Offshore lender partnerships to evade regulations
 * - Rent-a-bank schemes for 600%+ APR in regulated states
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
  // NEW 2025 FIELDS
  loanType: "payday" | "mca" | "installment" | "line_of_credit";
  hasConfessionOfJudgment: boolean;
  autoRenewEnabled: boolean;
  linkedAccounts: BankAccount[];
  originatingBank?: string; // For rent-a-bank schemes
  dailyDebitAmount?: number; // For MCAs
}

interface BankAccount {
  id: string;
  type: "checking" | "savings" | "prepaid" | "paypal" | "cashapp";
  lastFour: string;
  balance: number;
  isPrimary: boolean;
  achAttempts: number;
  nsfFees: number;
}

interface MerchantCashAdvance {
  id: string;
  advanceAmount: number;
  factorRate: number; // e.g., 1.4 means pay back $1.40 for every $1
  dailyDebitAmount: number;
  totalPayback: number;
  daysToPayback: number;
  missedDebits: number;
  totalDebited: number;
  startDate: Date;
  reconciliationFees: number;
}

interface ConfessionOfJudgment {
  id: string;
  loanId: string;
  signedDate: Date;
  triggerAmount: number;
  assetsListed: string[];
  courtJurisdiction: string;
  canSeizeWithoutNotice: boolean;
  waivedRights: string[];
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

const DebtTrapMechanism: React.FC = () => {
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
  const [mcaActive, setMcaActive] = useState<MerchantCashAdvance | null>(null);
  const [confessionsSigned, setConfessionsSigned] = useState<
    ConfessionOfJudgment[]
  >([]);
  const [linkedAccounts] = useState<BankAccount[]>([]);
  // Removed unused simulationPhase and setSimulationPhase

  const [simulationActive, setSimulationActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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
        loanType: "payday",
        hasConfessionOfJudgment: false,
        autoRenewEnabled: false,
        linkedAccounts: [],
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
      rolloverLoan();
    }, 3000);

    // Step 3: Second rollover
    setTimeout(() => {
      setCurrentStep(3);
      rolloverLoan();
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

  const rolloverLoan = () => {
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

    // NEW 2025: Auto-enable more predatory features after 3 rollovers
    if (currentLoan && currentLoan.rolloverCount >= 3) {
      // Switch to MCA structure
      offerMerchantCashAdvance();

      // Add confession of judgment
      if (!confessionsSigned.find((c) => c.loanId === currentLoan.id)) {
        addConfessionOfJudgment(currentLoan);
      }

      // Enable auto-renewal
      setCurrentLoan({
        ...currentLoan,
        autoRenewEnabled: true,
      });
    }
  };

  // NEW: Merchant Cash Advance - Daily ACH torture
  const offerMerchantCashAdvance = () => {
    const advanceAmount = 500;
    const factorRate = 1.49; // Pay back $745 for $500
    const dailyDebitAmount = 37.25; // Over 20 business days

    const mca: MerchantCashAdvance = {
      id: `mca_${Date.now()}`,
      advanceAmount,
      factorRate,
      dailyDebitAmount,
      totalPayback: advanceAmount * factorRate,
      daysToPayback: 20,
      missedDebits: 0,
      totalDebited: 0,
      startDate: new Date(),
      reconciliationFees: 0,
    };

    setMcaActive(mca);

    // Track via analytics
    analyticsEngine.trackBehavior("user_id", {
      type: "mca_accepted",
      amount: advanceAmount,
      effectiveAPR: calculateMCAasAPR(factorRate, 20),
    });
  };

  // NEW: Confession of Judgment - Waive all legal rights
  const addConfessionOfJudgment = (loan: LoanCycle) => {
    const confession: ConfessionOfJudgment = {
      id: `coj_${Date.now()}`,
      loanId: loan.id,
      signedDate: new Date(),
      triggerAmount: loan.totalDue,
      assetsListed: ["wages", "bank accounts", "vehicle", "tax refunds"],
      courtJurisdiction: "Delaware", // Corporate-friendly
      canSeizeWithoutNotice: true,
      waivedRights: [
        "Right to notice before judgment",
        "Right to dispute the debt",
        "Right to a court hearing",
        "Right to legal representation",
        "Protection from wage garnishment limits",
      ],
    };

    setConfessionsSigned((prev) => [...prev, confession]);
  };

  // NEW: Multiple Account Debiting Strategy
  // const executeMultipleAccountDebits = () => {
  //   if (!currentLoan || linkedAccounts.length === 0) return;

  //   const debitAmount = currentLoan.totalDue;
  //   let remainingAmount = debitAmount;
  //   const debitAttempts: any[] = [];

  //   // Try primary account first
  //   linkedAccounts.forEach((account) => {
  //     if (remainingAmount <= 0) return;

  //     const attemptAmount = Math.min(account.balance, remainingAmount);

  //     if (attemptAmount > 0) {
  //       debitAttempts.push({
  //         accountId: account.id,
  //         amount: attemptAmount,
  //         success: true,
  //         timestamp: new Date(),
  //       });

  //       remainingAmount -= attemptAmount;
  //     }
  //   });

  //   // Update loan status
  //   setCurrentLoan((prev) => ({
  //     ...prev!,
  //     payments: [
  //       ...(prev?.payments || []),
  //       {
  //         id: generateId(),
  //         amount: debitAmount - remainingAmount,
  //         date: new Date(),
  //         method: "auto_debit_multiple",
  //         status: remainingAmount > 0 ? "partial" : "complete",
  //         attempts: debitAttempts,
  //       },
  //     ],
  //   }));

  //   // Show notification
  //   if (remainingAmount > 0) {
  //     showNotification({
  //       type: "warning",
  //       message: `Partial payment collected. Remaining balance: $${remainingAmount}`,
  //       actions: [
  //         {
  //           label: "Add Payment Method",
  //           action: () => setCurrentStep(4), // Payment methods step
  //         },
  //       ],
  //     });
  //   }
  // };

  // NEW: Rent-a-Bank Partnership Display
  const getRentABankInfo = () => {
    const schemes = [
      {
        bank: "WebBank (Utah)",
        realLender: "QuickCash Corp",
        statedAPR: "159%",
        effectiveAPR: "521%",
        legalLoophole: "Utah has no usury cap",
      },
      {
        bank: "FinWise Bank (Utah)",
        realLender: "OppFi",
        statedAPR: "160%",
        effectiveAPR: "438%",
        legalLoophole: "Valid when sold doctrine",
      },
      {
        bank: "Cross River Bank (NJ)",
        realLender: "Upstart",
        statedAPR: "99%",
        effectiveAPR: "289%",
        legalLoophole: "Federal preemption claim",
      },
    ];

    return schemes[Math.floor(Math.random() * schemes.length)];
  };

  // NEW: Auto-Renewal Trap
  // const processAutoRenewal = () => {
  //   if (!currentLoan || !currentLoan.autoRenewEnabled) return;

  //   // Automatically roll over loan unless user takes action
  //   const renewalDate = new Date(currentLoan.dueDate);
  //   renewalDate.setDate(renewalDate.getDate() - 1); // Day before due date

  //   if (new Date() >= renewalDate) {
  //     // Auto-renew with higher fees
  //     const renewalFee = currentLoan.fees * 0.2; // 20% renewal fee

  //     setCurrentLoan((prev) => ({
  //       ...prev!,
  //       principal: prev!.principal + renewalFee,
  //       fees: prev!.fees + renewalFee,
  //       dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Extend 14 days
  //       autoRenewals: (prev!.autoRenewals || 0) + 1,
  //     }));

  //     showNotification({
  //       type: "info",
  //       message: "Your loan has been automatically renewed to avoid late fees",
  //       subtext: `Renewal fee: $${renewalFee.toFixed(2)}`,
  //     });
  //   }
  // };

  // Calculate MCA as APR for comparison
  const calculateMCAasAPR = (factorRate: number, days: number): number => {
    const totalCost = (factorRate - 1) * 100; // Percentage cost
    const yearFraction = days / 365;
    return totalCost / yearFraction;
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
      loanType: "payday",
      hasConfessionOfJudgment: false,
      autoRenewEnabled: false,
      linkedAccounts: [],
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
        loanType: "payday",
        hasConfessionOfJudgment: false,
        autoRenewEnabled: false,
        linkedAccounts: [],
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

  // const resetSimulation = () => {
  //   setSimulationActive(false);
  //   setCurrentStep(0);
  //   setLoanHistory([]);
  //   setCurrentLoan(null);
  //   setStatistics({
  //     totalLoansThisYear: 0,
  //     totalFeesPaid: 0,
  //     totalPrincipalPaid: 0,
  //     currentDebtCycle: 0,
  //     daysInDebt: 0,
  //     rolloverStreak: 0,
  //     dependencyScore: 0,
  //   });
  //   setAchievements((prev) =>
  //     prev.map((achievement) => ({ ...achievement, unlocked: false }))
  //   );
  // };

  // const getProgressColor = (dependencyScore: number) => {
  //   if (dependencyScore <= 2) {
  //     return "#4caf50";
  //   }
  //   if (dependencyScore <= 5) {
  //     return "#ff9800";
  //   }
  //   if (dependencyScore <= 8) {
  //     return "#ff5722";
  //   }
  //   return "#f44336";
  // };

  // const getStepDescription = (step: number) => {
  //   const descriptions = [
  //     "Setting up your first loan...",
  //     "Initial loan created - welcome to the system!",
  //     "First rollover - just a small fee to help you out",
  //     "Second rollover - building your credit history",
  //     "New loan needed - you're becoming a valued customer",
  //     "Multiple loan cycle - you're our VIP member!",
  //     "Debt cycle complete - maximum revenue extraction achieved",
  //   ];
  //   return descriptions[step] || "";
  // };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg shadow-xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-red-800 dark:text-red-400 mb-2">
          Debt Trap Mechanism Simulator (2025 Enhanced)
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Experience how modern payday lenders trap borrowers using merchant
          cash advances, confession of judgment, and rent-a-bank schemes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Statistics Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Your Debt Prison Stats
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Total Loans This Year:
              </span>
              <span className="font-bold text-red-600">
                {statistics.totalLoansThisYear}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Total Fees Paid:
              </span>
              <span className="font-bold text-red-600">
                ${statistics.totalFeesPaid.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Principal Paid:
              </span>
              <span className="font-bold text-green-600">
                ${statistics.totalPrincipalPaid.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Days in Debt:
              </span>
              <span className="font-bold text-orange-600">
                {statistics.daysInDebt}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Dependency Score:
              </span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-red-600 h-2 rounded-full"
                    style={{ width: `${statistics.dependencyScore * 10}%` }}
                  />
                </div>
                <span className="font-bold">
                  {statistics.dependencyScore}/10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Loan Status - Enhanced */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Current Loan Status
          </h2>
          {currentLoan ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Type:</span>
                <span className="font-bold capitalize">
                  {currentLoan.loanType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Loan #{currentLoan.loanNumber}
                </span>
                <span
                  className={`font-bold ${
                    currentLoan.status === "active"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {currentLoan.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Principal:
                </span>
                <span className="font-bold">${currentLoan.principal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Fees:</span>
                <span className="font-bold text-red-600">
                  ${currentLoan.fees}
                </span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Due:
                </span>
                <span className="font-bold text-red-700">
                  ${currentLoan.totalDue}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Due Date:
                </span>
                <span className="font-bold text-orange-600">
                  {currentLoan.dueDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Rollovers:
                </span>
                <span className="font-bold text-red-600">
                  {currentLoan.rolloverCount}
                </span>
              </div>

              {/* NEW 2025 Features Display */}
              {currentLoan.autoRenewEnabled && (
                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded">
                  <span className="text-xs text-yellow-800 dark:text-yellow-200">
                    ⚠️ AUTO-RENEWAL ENABLED - Will rollover automatically
                  </span>
                </div>
              )}

              {currentLoan.hasConfessionOfJudgment && (
                <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded">
                  <span className="text-xs text-red-800 dark:text-red-200">
                    🚨 CONFESSION OF JUDGMENT SIGNED - Assets can be seized
                  </span>
                </div>
              )}

              {currentLoan.originatingBank && (
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    🏦 Via: {currentLoan.originatingBank}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No active loan</p>
          )}
        </div>

        {/* MCA Display */}
        {mcaActive && (
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">
              Merchant Cash Advance
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Advance:
                </span>
                <span className="font-bold">${mcaActive.advanceAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Factor Rate:
                </span>
                <span className="font-bold text-red-600">
                  {mcaActive.factorRate}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Daily ACH:
                </span>
                <span className="font-bold text-red-600">
                  ${mcaActive.dailyDebitAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Payback:
                </span>
                <span className="font-bold text-red-700">
                  ${mcaActive.totalPayback}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Effective APR:
                </span>
                <span className="font-bold text-red-800">
                  {calculateMCAasAPR(
                    mcaActive.factorRate,
                    mcaActive.daysToPayback
                  ).toFixed(0)}
                  %
                </span>
              </div>
              <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded mt-2">
                <span className="text-xs text-red-800 dark:text-red-200">
                  💸 Daily debits will continue until paid in full
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Rent-a-Bank Scheme Display */}
        {currentLoan && currentLoan.originatingBank && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Rent-a-Bank Scheme Active
            </h2>
            {(() => {
              const scheme = getRentABankInfo();
              return (
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Originating Bank:
                    </span>
                    <div className="font-bold">{scheme.bank}</div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Real Lender:
                    </span>
                    <div className="font-bold text-red-600">
                      {scheme.realLender}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Legal Loophole:
                    </span>
                    <div className="text-xs italic">{scheme.legalLoophole}</div>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded">
                    <span className="text-xs text-yellow-800 dark:text-yellow-200">
                      ⚖️ Evading your state's {scheme.effectiveAPR} APR cap
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Confession of Judgment Warning */}
      {confessionsSigned.length > 0 && (
        <div className="bg-red-100 dark:bg-red-900/20 border-2 border-red-600 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">
            ⚠️ CONFESSION OF JUDGMENT ACTIVE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Rights You've Waived:</h4>
              <ul className="text-sm space-y-1 text-red-700 dark:text-red-300">
                {confessionsSigned[0]?.waivedRights.map((right, i) => (
                  <li key={i}>❌ {right}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Assets at Risk:</h4>
              <ul className="text-sm space-y-1 text-red-700 dark:text-red-300">
                {confessionsSigned[0]?.assetsListed.map((asset, i) => (
                  <li key={i}>🎯 {asset}</li>
                ))}
              </ul>
              <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                Court: {confessionsSigned[0]?.courtJurisdiction}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={simulateDebtTrap}
          disabled={simulationActive}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all disabled:bg-gray-400"
        >
          Start Debt Trap Demo
        </button>
        <button
          onClick={rolloverLoan}
          disabled={!currentLoan || currentLoan.status !== "active"}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all disabled:bg-gray-400"
        >
          Rollover Loan (+$50)
        </button>
        <button
          onClick={createNewLoan}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
        >
          Take New Loan
        </button>
        <button
          onClick={createMultipleLoanCycle}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
        >
          Simulate 10+ Loans
        </button>
      </div>

      {/* Loan History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Loan History - Your Debt Journey
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-2">Loan #</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Principal</th>
                <th className="text-left p-2">Fees Paid</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Rollovers</th>
                <th className="text-left p-2">Special</th>
              </tr>
            </thead>
            <tbody>
              {loanHistory.map((loan) => (
                <tr
                  key={loan.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-2">#{loan.loanNumber}</td>
                  <td className="p-2 capitalize">{loan.loanType}</td>
                  <td className="p-2">${loan.principal}</td>
                  <td className="p-2 text-red-600">${loan.feesPaid}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        loan.status === "active"
                          ? "bg-red-100 text-red-800"
                          : loan.status === "rolled_over"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-2">{loan.rolloverCount}</td>
                  <td className="p-2">
                    {loan.hasConfessionOfJudgment && "⚖️"}
                    {loan.autoRenewEnabled && "🔄"}
                    {loan.originatingBank && "🏦"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
