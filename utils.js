/**
 * Lotus Payday Loan Simulator - Advanced Utility Functions
 * Recovered and enhanced from original lotus_core.js, autonomy_theater.js, and global.js
 * This recreates the sophisticated 15,000+ line feature set in modern JavaScript
 */

// ============================================
// CORE LOAN CALCULATION ENGINE
// ============================================

// Currency and formatting utilities
export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount,
  );
export const formatPercentage = (rate, decimals = 1) =>
  `${rate.toFixed(decimals)}%`;
export const calculateAPR = (principal, fee, termDays) =>
  principal > 0 && termDays > 0
    ? (fee / principal) * (365 / termDays) * 100
    : 0;

// Advanced debt cycle simulation
export const simulateDebtCycle = (
  initialAmount,
  fee,
  rolloverCount,
  state = "GEN",
) => {
  const cycles = [];
  let currentAmount = initialAmount;
  let totalFeesPaid = 0;

  for (let i = 0; i <= rolloverCount; i++) {
    const cycleFee = (currentAmount / 100) * 15; // $15 per $100
    totalFeesPaid += cycleFee;

    cycles.push({
      cycle: i,
      principalOwed: currentAmount,
      feeThisCycle: cycleFee,
      totalFeesPaid: totalFeesPaid,
      apr: calculateAPR(currentAmount, cycleFee, 14),
      cumulativeAPR: calculateAPR(initialAmount, totalFeesPaid, 14 * (i + 1)),
    });
  }

  return cycles;
};

// ============================================
// STATE REGULATIONS DATABASE (From original lotus_core.js)
// ============================================

export const STATE_REGULATIONS = {
  AL: {
    maxAPR: 456,
    minTermDays: 10,
    allowRollover: true,
    maxRollovers: 1,
    description: "Alabama - Limited regulation",
  },
  AK: {
    maxAPR: 435,
    minTermDays: 14,
    allowRollover: true,
    maxRollovers: 2,
    description: "Alaska - Moderate regulation",
  },
  AZ: {
    maxAPR: 36,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Arizona - Strong consumer protection",
  },
  AR: {
    maxAPR: 17,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Arkansas - Very restrictive",
  },
  CA: {
    maxAPR: 36,
    minTermDays: 31,
    allowRollover: false,
    maxRollovers: 0,
    description: "California - Strong consumer protection",
  },
  CO: {
    maxAPR: 36,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Colorado - Reformed regulations",
  },
  CT: {
    maxAPR: 36,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Connecticut - Strong protection",
  },
  DE: {
    maxAPR: 521,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 4,
    description: "Delaware - Minimal regulation",
  },
  FL: {
    maxAPR: 304,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 3,
    description: "Florida - Moderate regulation",
  },
  GA: {
    maxAPR: 16,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Georgia - Very restrictive",
  },
  HI: {
    maxAPR: 459,
    minTermDays: 14,
    allowRollover: true,
    maxRollovers: 1,
    description: "Hawaii - Limited regulation",
  },
  ID: {
    maxAPR: 652,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 999,
    description: "Idaho - Very permissive",
  },
  IL: {
    maxAPR: 404,
    minTermDays: 13,
    allowRollover: true,
    maxRollovers: 2,
    description: "Illinois - Moderate regulation",
  },
  IN: {
    maxAPR: 391,
    minTermDays: 14,
    allowRollover: true,
    maxRollovers: 2,
    description: "Indiana - Moderate regulation",
  },
  IA: {
    maxAPR: 433,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 2,
    description: "Iowa - Limited regulation",
  },
  KS: {
    maxAPR: 391,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 3,
    description: "Kansas - Moderate regulation",
  },
  KY: {
    maxAPR: 459,
    minTermDays: 14,
    allowRollover: true,
    maxRollovers: 2,
    description: "Kentucky - Limited regulation",
  },
  LA: {
    maxAPR: 780,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 4,
    description: "Louisiana - Very permissive",
  },
  ME: {
    maxAPR: 30,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Maine - Strong protection",
  },
  MD: {
    maxAPR: 33,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Maryland - Strong protection",
  },
  MA: {
    maxAPR: 23,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Massachusetts - Very restrictive",
  },
  MI: {
    maxAPR: 369,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 1,
    description: "Michigan - Moderate regulation",
  },
  MN: {
    maxAPR: 390,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Minnesota - Reformed regulations",
  },
  MS: {
    maxAPR: 572,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 5,
    description: "Mississippi - Very permissive",
  },
  MO: {
    maxAPR: 1955,
    minTermDays: 14,
    allowRollover: true,
    maxRollovers: 6,
    description: "Missouri - Extremely permissive",
  },
  MT: {
    maxAPR: 36,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Montana - Reformed regulations",
  },
  NE: {
    maxAPR: 36,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Nebraska - Reformed regulations",
  },
  NV: {
    maxAPR: 652,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 4,
    description: "Nevada - Very permissive",
  },
  NH: {
    maxAPR: 36,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "New Hampshire - Reformed regulations",
  },
  NJ: {
    maxAPR: 30,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "New Jersey - Strong protection",
  },
  NM: {
    maxAPR: 175,
    minTermDays: 14,
    allowRollover: true,
    maxRollovers: 2,
    description: "New Mexico - Moderate regulation",
  },
  NY: {
    maxAPR: 25,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "New York - Very restrictive",
  },
  NC: {
    maxAPR: 36,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "North Carolina - Strong protection",
  },
  ND: {
    maxAPR: 520,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 3,
    description: "North Dakota - Permissive",
  },
  OH: {
    maxAPR: 391,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 4,
    description: "Ohio - Moderate regulation",
  },
  OK: {
    maxAPR: 390,
    minTermDays: 12,
    allowRollover: true,
    maxRollovers: 2,
    description: "Oklahoma - Moderate regulation",
  },
  OR: {
    maxAPR: 36,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Oregon - Reformed regulations",
  },
  PA: {
    maxAPR: 24,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Pennsylvania - Very restrictive",
  },
  RI: {
    maxAPR: 260,
    minTermDays: 13,
    allowRollover: true,
    maxRollovers: 2,
    description: "Rhode Island - Moderate regulation",
  },
  SC: {
    maxAPR: 391,
    minTermDays: 31,
    allowRollover: true,
    maxRollovers: 1,
    description: "South Carolina - Moderate regulation",
  },
  SD: {
    maxAPR: 36,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "South Dakota - Reformed regulations",
  },
  TN: {
    maxAPR: 460,
    minTermDays: 15,
    allowRollover: true,
    maxRollovers: 2,
    description: "Tennessee - Limited regulation",
  },
  TX: {
    maxAPR: 664,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 3,
    description: "Texas - Very permissive",
  },
  UT: {
    maxAPR: 547,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 10,
    description: "Utah - Extremely permissive",
  },
  VT: {
    maxAPR: 18,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Vermont - Very restrictive",
  },
  VA: {
    maxAPR: 391,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 2,
    description: "Virginia - Moderate regulation",
  },
  WA: {
    maxAPR: 391,
    minTermDays: 31,
    allowRollover: true,
    maxRollovers: 1,
    description: "Washington - Moderate regulation",
  },
  WV: {
    maxAPR: 309,
    minTermDays: 15,
    allowRollover: true,
    maxRollovers: 1,
    description: "West Virginia - Moderate regulation",
  },
  WI: {
    maxAPR: 565,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 4,
    description: "Wisconsin - Permissive",
  },
  WY: {
    maxAPR: 780,
    minTermDays: 14,
    allowRollover: true,
    maxRollovers: 4,
    description: "Wyoming - Very permissive",
  },
  DC: {
    maxAPR: 24,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    description: "Washington DC - Very restrictive",
  },
  GEN: {
    maxAPR: 400,
    minTermDays: 14,
    allowRollover: true,
    maxRollovers: 3,
    description: "General - Typical payday loan state",
  },
};

// ============================================
// PSYCHOLOGICAL ANALYSIS ENGINE (From autonomy_theater.js)
// ============================================

export const DARK_PATTERN_TYPES = {
  TIME_PRESSURE: {
    name: "Time Pressure",
    description: "Artificial urgency to prevent deliberation",
    severity: "high",
    kantianViolation: "Undermines rational decision-making capacity",
  },
  DEFAULT_BIAS: {
    name: "Default Bias Manipulation",
    description: "Pre-selected options to manufacture consent",
    severity: "medium-high",
    kantianViolation: "Treats person as means, not end",
  },
  ARTIFICIAL_SCARCITY: {
    name: "Artificial Scarcity",
    description: "False limitations to create urgency",
    severity: "medium-high",
    kantianViolation: "Deceptive premises undermine autonomy",
  },
  SUNK_COST_FALLACY: {
    name: "Sunk Cost Exploitation",
    description: "Exploiting previous investment to encourage more debt",
    severity: "high",
    kantianViolation: "Manipulates psychological biases",
  },
  CELEBRATION_MANIPULATION: {
    name: "Celebration Manipulation",
    description: "Making debt feel like achievement",
    severity: "medium",
    kantianViolation: "Emotionally manipulates rational assessment",
  },
  HIDDEN_INFORMATION: {
    name: "Information Concealment",
    description: "Burying critical terms in fine print",
    severity: "high",
    kantianViolation: "Prevents informed consent",
  },
  SOCIAL_PROOF: {
    name: "Fake Social Proof",
    description: "Manufacturing false popularity signals",
    severity: "medium",
    kantianViolation: "Uses deception to influence choice",
  },
  COGNITIVE_OVERLOAD: {
    name: "Cognitive Overload",
    description: "Overwhelming with information to impair judgment",
    severity: "medium-high",
    kantianViolation: "Exploits cognitive limitations",
  },
};

// ============================================
// BEHAVIORAL SCORING ALGORITHMS (From autonomy_theater.js)
// ============================================

export const calculateCoercionScore = (
  violations,
  trapTypes,
  timeUnderPressure = 0,
) => {
  let score = 0;

  // Base score from autonomy violations
  violations.forEach((violation) => {
    const severityWeights = { high: 20, "medium-high": 15, medium: 10, low: 5 };
    score += severityWeights[violation.severity] || 5;
  });

  // Active trap penalties
  const activeTrapCount = Object.values(trapTypes).filter(Boolean).length;
  score += activeTrapCount * 8;

  // Compound manipulation penalties
  if (trapTypes.timePressure && trapTypes.defaultBias) score += 15;
  if (trapTypes.artificialScarcity && trapTypes.timePressure) score += 20;
  if (trapTypes.sunkCostFallacy && trapTypes.timePressure) score += 25;

  // Time pressure penalty
  if (timeUnderPressure > 30) score += Math.min(20, timeUnderPressure / 10);

  return Math.min(100, Math.max(0, score));
};

export const getCoercionLevel = (score) => {
  if (score >= 80)
    return {
      level: "EXTREME",
      description: "Severe psychological manipulation",
    };
  if (score >= 60)
    return { level: "HIGH", description: "Significant coercion present" };
  if (score >= 40)
    return { level: "MODERATE", description: "Multiple manipulation tactics" };
  if (score >= 20)
    return { level: "LOW", description: "Some autonomy violations" };
  return { level: "MINIMAL", description: "Relatively ethical environment" };
};

// ============================================
// EDUCATIONAL ASSESSMENT ENGINE
// ============================================

export const QUIZ_QUESTIONS = [
  {
    id: "apr_knowledge",
    question: "What does APR stand for and why is it important?",
    options: [
      "Annual Payment Rate - shows monthly costs",
      "Annual Percentage Rate - shows true yearly cost of borrowing",
      "Approved Payment Range - shows payment options",
      "Average Principal Rate - shows typical loan amounts",
    ],
    correct: 1,
    explanation:
      "APR (Annual Percentage Rate) shows the true yearly cost of borrowing, including fees and interest, making it essential for comparing loans.",
  },
  {
    id: "rollover_trap",
    question: 'What is a "rollover" in payday lending?',
    options: [
      "Getting a new loan to pay off the old one",
      "Paying only the fee to extend the loan without reducing principal",
      "Transferring the loan to another person",
      "Converting to a different type of loan",
    ],
    correct: 1,
    explanation:
      "A rollover means paying only the fee to extend the loan, which traps borrowers in debt cycles since the principal is never reduced.",
  },
  {
    id: "dark_patterns",
    question: 'Which of these is a "dark pattern" in predatory lending?',
    options: [
      "Clearly displaying all fees upfront",
      "Allowing plenty of time to read terms",
      "Pre-checking boxes for auto-renewal",
      "Offering multiple payment options",
    ],
    correct: 2,
    explanation:
      "Pre-checking boxes manufactures consent without explicit user choice, which is a classic dark pattern manipulation.",
  },
  {
    id: "state_regulations",
    question: "Which state has the MOST permissive payday loan regulations?",
    options: [
      "California (36% APR cap)",
      "New York (25% APR cap)",
      "Missouri (1955% APR allowed)",
      "Vermont (18% APR cap)",
    ],
    correct: 2,
    explanation:
      "Missouri allows APRs up to 1955%, making it one of the most permissive states for predatory lending.",
  },
];

// ============================================
// DATA VISUALIZATION HELPERS
// ============================================

export const generateChoiceHeatmap = (userChoices) => {
  const heatmapData = [];

  userChoices.forEach((choice, index) => {
    heatmapData.push({
      timestamp: choice.timestamp,
      choiceType: choice.type,
      timeFromStart: choice.timeFromStart,
      pressure: choice.data.pressure || 0,
      manipulation: choice.data.manipulation || 0,
      autonomyScore: choice.data.autonomyScore || 100,
    });
  });

  return heatmapData;
};

export const generateComparisonMetrics = (
  exploitativeSession,
  ethicalSession,
) => {
  if (!exploitativeSession || !ethicalSession) return null;

  return {
    aprDifference: exploitativeSession.apr - ethicalSession.apr,
    costDifference: exploitativeSession.totalCost - ethicalSession.totalCost,
    termDifference: ethicalSession.termDays - exploitativeSession.termDays,
    savingsAmount: exploitativeSession.totalCost - ethicalSession.totalCost,
    savingsPercentage:
      ((exploitativeSession.totalCost - ethicalSession.totalCost) /
        exploitativeSession.totalCost) *
      100,
  };
};

// ============================================
// REGULATORY COMPLIANCE CHECKER
// ============================================

export const checkRegulatoryCompliance = (loanTerms, state) => {
  const regulations = STATE_REGULATIONS[state] || STATE_REGULATIONS["GEN"];
  const violations = [];

  if (loanTerms.apr > regulations.maxAPR) {
    violations.push({
      type: "APR_VIOLATION",
      description: `APR of ${loanTerms.apr.toFixed(1)}% exceeds state limit of ${regulations.maxAPR}%`,
      severity: "high",
    });
  }

  if (loanTerms.termDays < regulations.minTermDays) {
    violations.push({
      type: "TERM_VIOLATION",
      description: `Term of ${loanTerms.termDays} days is below state minimum of ${regulations.minTermDays} days`,
      severity: "medium",
    });
  }

  if (loanTerms.rolloverCount > regulations.maxRollovers) {
    violations.push({
      type: "ROLLOVER_VIOLATION",
      description: `${loanTerms.rolloverCount} rollovers exceeds state limit of ${regulations.maxRollovers}`,
      severity: "high",
    });
  }

  return {
    compliant: violations.length === 0,
    violations,
    regulations,
  };
};

// Performance utilities
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Date utilities
export const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US").format(new Date(date));
export const addDays = (date, days) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
export const daysBetween = (date1, date2) =>
  Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));

// Simple logger
export const logger = {
  logs: [],
  sessionId:
    "log_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
  log(level, message, data = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      level,
      message,
      data,
    };
    this.logs.push(entry);
    if (window.LotusConfig?.debug)
      console[level](`[${level.toUpperCase()}] ${message}`, data);
  },
  info: function (msg, data) {
    this.log("info", msg, data);
  },
  warn: function (msg, data) {
    this.log("warn", msg, data);
  },
  error: function (msg, data) {
    this.log("error", msg, data);
  },
  exportLogs: function () {
    return JSON.stringify(this.logs, null, 2);
  },
};

// ============================================
// COMPREHENSIVE LEGAL LOOPHOLES & USURY EVASION SYSTEM
// ============================================

export const USURY_LOOPHOLES = {
  FlatFee: {
    type: "FlatFee",
    description: "Fee disguised as service charge not interest",
    effectiveness: 95,
    states: "All states where not explicitly banned",
    implementation: (principal, termDays) => {
      const feePer100 = 15.0;
      const fee = (principal / 100.0) * feePer100;
      const hiddenAPR = (fee / principal) * (365.0 / termDays) * 100.0;
      return {
        fee,
        hiddenAPR,
        userSees: `$${fee} fee`,
        realityIs: `${hiddenAPR.toFixed(0)}% APR`,
      };
    },
  },

  CSOBrokerage: {
    type: "CSO_Brokerage",
    states: 26,
    description: "Credit Service Organization - fees not counted as interest",
    mechanism:
      "Frame as brokerage fee connecting borrower to third-party lender",
    effectiveness: 88,
    vulnerableStates: [
      "TX",
      "OH",
      "NV",
      "UT",
      "WI",
      "KS",
      "AL",
      "MS",
      "LA",
      "SC",
    ],
  },

  TribalCharter: {
    type: "TribalCharter",
    description: "Sovereign immunity from state caps via tribal partnerships",
    mechanism: "Rent-a-tribe arrangements with Native American entities",
    effectiveness: 75,
    vulnerability: "Increasing state enforcement and court challenges",
    examples: [
      {
        lender: "Western Sky",
        tribe: "Cheyenne River Sioux",
        apr: 342,
        outcome: "Shut down by regulators",
      },
      {
        lender: "CashCall",
        tribe: "Lac Vieux Desert Band",
        apr: 135,
        outcome: "$16M settlement",
      },
    ],
  },

  InterstateBanking: {
    type: "InterstateBanking",
    description: "Use lender state laws via federal banking preemption",
    mechanism:
      "Partner with banks in permissive states to override borrower state caps",
    effectiveness: 65,
    vulnerability: "True Lender doctrine and state enforcement",
  },
};

// ============================================
// ADVANCED ROLLOVER TRAP SIMULATION ENGINE
// ============================================

export class RolloverTrapEngine {
  constructor() {
    this.trapHistory = [];
    this.psychologyTactics = this.initializePsychologyTactics();
  }

  initializePsychologyTactics() {
    return {
      lossAversion: {
        message:
          "Don't lose your loan! Roll over to keep your access to emergency cash.",
        effectiveness: 0.82,
        biasExploited: "Loss aversion - fear of losing access",
      },

      artificialUrgency: {
        message: "Decision required by end of business day or loan defaults!",
        effectiveness: 0.75,
        biasExploited: "Time pressure reduces analytical thinking",
      },

      falseAltruism: {
        message:
          "We're here to help! Rolling over prevents damage to your credit.",
        effectiveness: 0.68,
        biasExploited: "Authority bias and false protection narrative",
      },

      socialProof: {
        message: "Most customers in your situation choose to roll over.",
        effectiveness: 0.71,
        biasExploited: "Social proof and herd mentality",
      },

      sunkCostFallacy: {
        message:
          "You've already invested in this loan. Don't waste your progress!",
        effectiveness: 0.77,
        biasExploited: "Sunk cost fallacy",
      },
    };
  }

  simulateRollover(loan, borrower, trapType = "standard") {
    const fee = loan.fee;
    const rolloverData = {
      timestamp: new Date().toISOString(),
      previousBalance: borrower.balance,
      feeCharged: fee,
      principalUnchanged: loan.principal,
      newRolloverCount: borrower.rolloverCount + 1,
      totalFeesAccumulated: borrower.totalFees + fee,
      psychologyUsed: trapType,
      coercionLevel: this.calculateCoercionLevel(borrower.rolloverCount + 1),
    };

    // Update borrower state
    borrower.balance -= fee;
    borrower.totalFees += fee;
    borrower.rolloverCount++;

    // Reset loan term but keep principal
    loan.resetTerm();

    // Track trap usage
    this.trapHistory.push(rolloverData);

    return {
      ...rolloverData,
      echoMessage: this.generateEchoMessage(rolloverData),
      nextTrapRecommendation: this.selectNextTrap(borrower),
    };
  }

  calculateCoercionLevel(rolloverCount) {
    // Escalating coercion based on cycle depth
    const baseCoercion = 40;
    const escalation = Math.min(rolloverCount * 8, 50);
    return Math.min(baseCoercion + escalation, 100);
  }

  generateEchoMessage(data) {
    return (
      `You paid $${data.feeCharged} to roll over your $${data.principalUnchanged} loan. ` +
      `Total fees so far: $${data.totalFeesAccumulated}. Principal unchanged. ` +
      `This is rollover #${data.newRolloverCount}. The debt trap tightens...`
    );
  }

  selectNextTrap(borrower) {
    if (borrower.rolloverCount < 3) return "artificialUrgency";
    if (borrower.rolloverCount < 6) return "sunkCostFallacy";
    return "lossAversion";
  }
}

// ============================================
// ACH DEBIT SIMULATION & OVERDRAFT MECHANICS
// ============================================

export class ACHDebitSimulator {
  constructor() {
    this.achHistory = [];
    this.overdraftTrap = new OverdraftTrapMechanism();
  }

  simulateAutomaticDebit(borrower, loan, bankAccount) {
    const debitAmount = loan.fee + loan.principal; // Full payment attempt
    const debitResult = {
      timestamp: new Date().toISOString(),
      attemptedAmount: debitAmount,
      accountBalance: bankAccount.balance,
      successful: bankAccount.balance >= debitAmount,
      overdraftTriggered:
        bankAccount.balance < debitAmount && bankAccount.overdraftEnabled,
      consequences: [],
    };

    if (debitResult.successful) {
      bankAccount.balance -= debitAmount;
      borrower.loanPaidOff = true;
      debitResult.consequences.push("Loan paid in full");
    } else if (debitResult.overdraftTriggered) {
      // Bank covers but charges overdraft fee
      const overdraftFee = 35;
      bankAccount.balance -= debitAmount + overdraftFee;
      bankAccount.overdraftCount++;
      borrower.loanPaidOff = true;

      debitResult.consequences.push(`Overdraft fee: $${overdraftFee}`);
      debitResult.consequences.push("Account now negative");
      debitResult.totalCost = debitAmount + overdraftFee;

      // Trigger overdraft trap sequence
      this.overdraftTrap.activate(borrower, bankAccount);
    } else {
      // NSF - loan not paid, additional fees
      const nsfFee = 30;
      bankAccount.balance -= nsfFee;
      loan.addLateFee(25);

      debitResult.consequences.push(`NSF fee: $${nsfFee}`);
      debitResult.consequences.push(`Late fee: $25`);
      debitResult.rolloverForced = true;
    }

    this.achHistory.push(debitResult);
    return debitResult;
  }

  generatePredatoryACHTerms() {
    return {
      autoDebitEnabled: true,
      debitPriority: "First priority on payday",
      revokeRestrictions: "Cannot revoke within 3 business days of due date",
      multipleAttempts: "Up to 3 debit attempts if first fails",
      feeStructure: {
        nsfFee: 30,
        reattemptFee: 15,
        lateFee: 25,
      },
      hiddenClause: "ACH authorization survives loan payoff for future loans",
    };
  }
}

class OverdraftTrapMechanism {
  activate(borrower, bankAccount) {
    const trapSequence = [
      "Your account is negative. You need cash to cover expenses.",
      "Good news! You're pre-approved for another loan.",
      "Get cash today to avoid more overdraft fees.",
      "This loan will help stabilize your account.",
    ];

    return {
      trapType: "overdraft_cascade",
      sequence: trapSequence,
      newLoanOffered: this.calculateUpsellLoan(borrower),
      psychologyUsed: "Rescue fantasy and urgency",
      effectiveness: 0.74,
    };
  }

  calculateUpsellLoan(borrower) {
    const baseAmount = Math.abs(borrower.bankAccount?.balance || 200);
    return {
      amount: Math.ceil(baseAmount / 100) * 100, // Round up to nearest $100
      urgencyMessage: "Cover overdrafts and have cash left over!",
      hiddenCost: "New loan fees plus existing debt",
    };
  }
}

// ============================================
// REAL-WORLD CASE STUDIES & LEGAL PRECEDENTS
// ============================================

export const CASE_STUDIES = {
  scottTuckerAMG: {
    lender: "AMG Services (Scott Tucker)",
    structure: "Online national lender with tribal shell companies",
    maxAPR: 1751,
    customerCount: 1200000,
    totalCharges: 2000000000, // $2 billion
    legalOutcome: {
      ftcAction: "$505M consumer refund ordered",
      criminalSentence: "16 years prison for Scott Tucker",
      keyViolation: "Deceptive practices and usury",
      precedent: "Tribal immunity does not protect against fraud",
    },
    mechanicsUsed: [
      "Tribal rental arrangements",
      "Hidden fee structures",
      "Automatic renewals",
      "Deceptive advertising",
    ],
  },

  westernSkyLending: {
    lender: "Western Sky Financial / CashCall",
    structure: "Tribal charter (Cheyenne River Sioux Nation)",
    maxAPR: 342,
    stateCap: 22, // Minnesota
    legalOutcome: {
      settlement: "$12M to Minnesota consumers",
      loansCanceled: "All outstanding loans voided",
      keyRuling: "Tribal immunity insufficient for state law violations",
      enforcement: "Multiple state AGs coordinated action",
    },
    mechanicsUsed: [
      "Sovereign immunity claims",
      "Interstate lending",
      "Hidden APR calculations",
      "Aggressive collections",
    ],
  },

  worldAcceptance: {
    lender: "World Acceptance Corporation",
    structure: "Multi-state installment lender",
    avgAPR: 90,
    violations: [
      "Steering to higher-cost products",
      "Unnecessary insurance products",
      "Loan flipping and churning",
      "Targeting vulnerable communities",
    ],
    legalOutcome: {
      cfpbFine: "$23M civil penalty",
      restitution: "$15M to affected consumers",
      reforms: "Mandatory lending practice changes",
    },
  },

  achCashExpress: {
    lender: "ACE Cash Express",
    structure: "Storefront and online payday lender",
    violations: [
      "Illegal debt collection practices",
      "Harassment and threats",
      "Unauthorized account debits",
      "Deceptive loan terms",
    ],
    legalOutcome: {
      cfpbFine: "$10M penalty",
      practiceChanges: "Reformed collection procedures",
      monitoring: "Ongoing regulatory oversight",
    },
  },
};

// ============================================
// CONSUMER HARM METRICS & RESEARCH DATA
// ============================================

export const HARM_METRICS = {
  centerForResponsibleLending: {
    source: "Center for Responsible Lending (CRL)",
    findings: {
      averageLoanCountPerYear: 10,
      typicalBorrowerCycles: 9,
      avgTotalFeesOn350Loan: 822,
      repeatBorrowingRate: 0.76, // 76% within 1 month
      profitFromRepeatUsersPct: 0.9, // 90% of revenue
      averageCustomerLossesPerYear: 1200,
    },
    quotes: [
      "Typical borrower stuck nine periods, pays $822 on $350 loan",
      "90% of payday lender revenue comes from borrowers trapped in debt cycles",
      "Average payday borrower spends 5 months of the year in debt",
    ],
  },

  cfpbStudy2013: {
    source: "Consumer Financial Protection Bureau (2013)",
    findings: {
      sequenceLength: 10, // average loan sequence
      borrowersWithMore5Loans: 0.8, // 80%
      borrowersWithMore10Loans: 0.6, // 60%
      defaultRate: 0.2, // 20% eventually default
      renewalWithin14Days: 0.8, // 80% of borrowers renew within 14 days
    },
    keyInsight: "Long sequences of loans are the norm, not the exception",
  },

  pewCharitableTrusts: {
    source: "Pew Charitable Trusts (2012)",
    findings: {
      averageAnnualFees: 520,
      averageLoanSize: 350,
      averageAnnualIncome: 30000,
      feeAsPercentIncome: 0.017, // 1.7% of annual income
      reasonsForBorrowing: {
        recurringExpenses: 0.69, // 69% - rent, utilities
        unexpected: 0.16, // 16% - emergency
        other: 0.15,
      },
    },
  },
};

// ============================================
// ADVANCED ECHO MODE & COERCION INDEX
// ============================================

export class EchoModeNarrator {
  constructor() {
    this.narratorPersonality = "cynical_truth_teller";
    this.coercionHistory = [];
    this.realityChecks = [];
  }

  echo(userAction, context) {
    const echoMessages = {
      loanTaken: this.generateLoanEcho(context),
      rolloverAccepted: this.generateRolloverEcho(context),
      feesPaid: this.generateFeesEcho(context),
      achAuthorized: this.generateACHEcho(context),
      upsellViewed: this.generateUpsellEcho(context),
    };

    const message =
      echoMessages[userAction] || this.generateGenericEcho(context);

    this.realityChecks.push({
      timestamp: new Date().toISOString(),
      action: userAction,
      message: message,
      coercionLevel: this.computeCoercionIndex(context),
    });

    return message;
  }

  generateLoanEcho(context) {
    const { amount, fee, apr } = context;
    return (
      `You just agreed to pay ${apr.toFixed(0)}% APR (${formatCurrency(fee)} on ${formatCurrency(amount)}). ` +
      `The lender called it a "fee" to hide the astronomical interest rate. ` +
      `Wall Street would be jealous of these returns.`
    );
  }

  generateRolloverEcho(context) {
    const { rolloverCount, totalFees, principal } = context;
    return (
      `Rollover #${rolloverCount}: You paid ${formatCurrency(totalFees)} in fees but still owe ` +
      `${formatCurrency(principal)}. The lender just made more money off your desperation. ` +
      `This is exactly how the debt trap is designed to work.`
    );
  }

  generateFeesEcho(context) {
    const { totalFees, originalAmount, timeTrapped } = context;
    const feeRatio = (totalFees / originalAmount) * 100;
    return (
      `You've now paid ${feeRatio.toFixed(0)}% of the original loan amount in fees alone. ` +
      `You've been trapped for ${timeTrapped} days. The meter is still running.`
    );
  }

  generateACHEcho(context) {
    return (
      `You just gave them direct access to your bank account. They'll take their money first, ` +
      `before rent, food, or other bills. If your account can't cover it, you'll pay overdraft fees ` +
      `on top of everything else. The trap just got deeper.`
    );
  }

  generateUpsellEcho(context) {
    const { newLoanAmount, existingDebt } = context;
    return (
      `"Congratulations, you qualify!" Translation: "You're trapped enough to be profitable, ` +
      `let's add more debt." ${formatCurrency(newLoanAmount)} more debt on top of ` +
      `${formatCurrency(existingDebt)}. The house always wins.`
    );
  }

  computeCoercionIndex(context) {
    let score = 0;

    // Base manipulation factors
    if (context.urgencyTimer) score += 15;
    if (context.preCheckedOptions) score += 20;
    if (!context.aprDisplayed) score += 25;
    if (context.autoRenewal) score += 20;

    // Escalating factors
    if (context.rolloverCount > 0) score += context.rolloverCount * 5;
    if (context.achAuthorized) score += 15;
    if (context.artificialScarcity) score += 10;

    // Desperation indicators
    if (context.previousDenials > 0) score += 15;
    if (context.timeOfDay === "late_night") score += 10;
    if (context.repeatCustomer) score += 20;

    return Math.min(score, 100);
  }
}

// ============================================
// ADVANCED STATE REGULATION BYPASS SYSTEM
// ============================================

export const REGULATORY_BYPASS_MECHANISMS = {
  minnesotaModel: {
    state: "Minnesota",
    originalCap: "2.75% per month (33% APR)",
    bypassMechanism: "Back-to-back lending loophole",
    implementation:
      "Issue new loan immediately after payoff to circumvent rollover bans",
    effectiveness: 0.85,
    legalStatus: "Addressed by 2014 reforms",
    example: 'Same borrower, same terms, "new" loan every two weeks',
  },

  texasCSO: {
    state: "Texas",
    mechanism: "Credit Service Organization (CSO) model",
    description: "Lender acts as broker, not direct lender",
    aprCap: "None - fees not counted as interest",
    implementation: {
      brokerageFee: "$25 per $100",
      thirdPartyLender: "Minimal fee to actual lender",
      totalCost: "Brokerage fee + lender fee = unregulated total",
    },
    usage: "78% of Texas payday lenders",
    consumerImpact: "Effective APRs over 500%",
  },

  tribalSovereignty: {
    mechanism: "Rent-a-tribe arrangements",
    description: "Non-tribal lenders partner with tribal entities",
    legalTheory: "Tribal sovereign immunity preempts state law",
    implementation: {
      tribalOwnership: "Usually <5% actual tribal ownership",
      managementFee: "Large percentage to non-tribal operator",
      immunityShield: "Claim tribal law governs transactions",
    },
    vulnerabilities: [
      "True lender doctrine challenges",
      "Minimal tribal economic interest",
      "State enforcement actions",
      "Federal regulatory oversight",
    ],
    caseStudies: ["Western Sky/CashCall", "AMG Services", "Think Finance"],
  },

  bankPartnership: {
    mechanism: "Bank partnership model (Rent-a-bank)",
    description: "Partner with FDIC-insured bank to claim federal preemption",
    legalTheory: "National bank powers preempt state interest rate caps",
    implementation: {
      partnerBank: "Small bank provides minimal capital",
      riskTransfer: "Payday lender buys loans immediately",
      servicingRights: "Payday lender services all loans",
      profitSplit: "Bank gets small fee, lender gets profits",
    },
    regulatoryResponse: "OCC guidance limiting rent-a-bank arrangements",
    currentStatus: "Limited but still used by some lenders",
  },
};

// ============================================
// COMPREHENSIVE DARK PATTERN CATALOG
// ============================================

export const DARK_PATTERN_LIBRARY = {
  temporalDiscounting: {
    name: "Temporal Discounting Exploitation",
    psychologicalBasis:
      "Humans heavily discount future costs when under immediate stress",
    implementation: {
      emphasize: "Immediate cash relief",
      deEmphasize: "Future payment obligations",
      timeFraming: "Just $15 for two weeks vs $391% APR",
      urgencyAmplifier: "Cash in 15 minutes!",
    },
    effectiveness: 0.87,
    detectionDifficulty: 0.92,
    counterMeasure: "Mandatory 24-48 hour cooling-off periods",
  },

  anchoringManipulation: {
    name: "Anchoring Bias Exploitation",
    psychologicalBasis:
      "First numerical information heavily influences subsequent judgments",
    implementation: {
      highAnchor: "You could qualify for up to $1,500!",
      reasonableOption: "$300 seems more manageable",
      feeAnchoring: "Only $45 (vs other lenders charging $60+)",
      timeAnchor: "Two weeks (vs mentioning the APR)",
    },
    effectiveness: 0.78,
    variations: [
      "Price anchoring",
      "Time anchoring",
      "Qualification anchoring",
    ],
  },

  lossAversionAmplification: {
    name: "Loss Aversion Amplification",
    psychologicalBasis: "Humans fear losses 2.5x more than equivalent gains",
    implementation: {
      threatFraming: "Avoid late fees, overdrafts, utility shutoffs",
      rescueNarrative: "This loan prevents worse consequences",
      statusQuo: "Keep your lights on, avoid embarrassment",
      falseChoice: "Payday loan vs financial disaster",
    },
    effectiveness: 0.82,
    targeting: "Especially effective on financially stressed individuals",
  },

  socialProofManufacturing: {
    name: "Manufactured Social Proof",
    psychologicalBasis:
      "People follow perceived majority behavior under uncertainty",
    implementation: {
      fakeTestimonials: '"This saved my family!" - Sarah K.',
      volumeClaims: "10,000+ customers served this month",
      normalityFraming: "Millions of Americans use payday loans",
      peerPressure: "Your neighbors trust us for emergency cash",
    },
    legalRisk: "High - potentially false advertising",
    effectiveness: 0.72,
  },

  cognitiveLoadOverload: {
    name: "Cognitive Load Overload",
    psychologicalBasis:
      "Mental overload leads to System 1 (fast, emotional) decision making",
    implementation: {
      informationOverload: "Dense terms, multiple disclosures",
      timeConstraints: "Limited time offers",
      multipleChoices: "Various loan amounts and terms",
      stressAmplification: "Urgent financial need + complex choices",
    },
    effectiveness: 0.75,
    detection: "Difficult - appears as thorough disclosure",
  },

  authorityBiasExploitation: {
    name: "False Authority & Legitimacy",
    psychologicalBasis:
      "People defer to perceived authority figures and institutions",
    implementation: {
      businessLegitimacy: "Professional website, physical locations",
      regulatoryLanguage: "Licensed, regulated, compliant",
      expertEndorsements: "As seen on TV, financial expert approved",
      institutionalTrust: "Member FDIC (for bank partners)",
    },
    effectiveness: 0.69,
    vulnerability: "Especially effective on less financially sophisticated",
  },
};

// ============================================
// MULTILOAN DEPENDENCY SYSTEM
// ============================================

export class MultiloanDependencyEngine {
  constructor() {
    this.customerProfile = null;
    this.loanHistory = [];
    this.dependencyMarkers = [];
  }

  assessDependencyRisk(borrower, loanHistory) {
    const riskFactors = {
      frequency: this.calculateLoanFrequency(loanHistory),
      escalation: this.detectAmountEscalation(loanHistory),
      timing: this.analyzeLoanTiming(loanHistory),
      rolloverPattern: this.countRollovers(loanHistory),
      alternatingLenders: this.detectLenderShopping(loanHistory),
    };

    const dependencyScore = this.computeDependencyScore(riskFactors);

    return {
      score: dependencyScore,
      risk: this.categorizeDependencyRisk(dependencyScore),
      indicators: this.identifyDependencyIndicators(riskFactors),
      interventionRecommended: dependencyScore > 70,
    };
  }

  calculateLoanFrequency(history) {
    if (history.length < 2) return 0;

    const timeSpan =
      new Date(history[history.length - 1].date) - new Date(history[0].date);
    const daysBetween = timeSpan / (1000 * 60 * 60 * 24);
    return (history.length / daysBetween) * 365; // loans per year
  }

  detectAmountEscalation(history) {
    if (history.length < 3) return 0;

    const amounts = history.map((loan) => loan.amount);
    let escalations = 0;

    for (let i = 1; i < amounts.length; i++) {
      if (amounts[i] > amounts[i - 1] * 1.2) escalations++; // 20% increase threshold
    }

    return escalations / (amounts.length - 1);
  }

  analyzeLoanTiming(history) {
    const payoffToNewLoanDays = [];

    for (let i = 1; i < history.length; i++) {
      const prevPayoff = new Date(history[i - 1].payoffDate);
      const nextLoan = new Date(history[i].originationDate);
      const daysBetween = (nextLoan - prevPayoff) / (1000 * 60 * 60 * 24);
      payoffToNewLoanDays.push(daysBetween);
    }

    const avgDaysBetween =
      payoffToNewLoanDays.reduce((a, b) => a + b, 0) /
      payoffToNewLoanDays.length;
    return avgDaysBetween; // Lower = higher dependency
  }

  generateUpsellSequence(borrower, dependencyScore) {
    const sequences = {
      lowRisk: [
        "You're doing great managing your finances!",
        "When you need cash again, we're here.",
        "Get approved faster next time as a returning customer.",
      ],

      mediumRisk: [
        "Life happens - we understand.",
        "You qualify for a larger amount now.",
        "Consolidate your debts with one larger loan.",
        "Take advantage of your excellent payment history.",
      ],

      highRisk: [
        "You're a valued customer - here's exclusive access.",
        "Pre-approved for up to $1,000 - no waiting!",
        "Avoid multiple loans - take one larger amount.",
        "Special rates for loyal customers like you.",
        "Cash whenever you need it - you're always approved.",
      ],
    };

    const risk =
      dependencyScore < 30
        ? "lowRisk"
        : dependencyScore < 70
          ? "mediumRisk"
          : "highRisk";

    return sequences[risk];
  }

  computeDependencyScore(factors) {
    let score = 0;

    // High frequency loans
    if (factors.frequency > 8) score += 25;
    else if (factors.frequency > 5) score += 15;

    // Amount escalation
    score += factors.escalation * 20;

    // Quick turnaround (sign of dependency)
    if (factors.timing < 7) score += 20;
    else if (factors.timing < 14) score += 10;

    // Rollover patterns
    score += Math.min(factors.rolloverPattern * 5, 25);

    // Lender shopping (desperation)
    if (factors.alternatingLenders > 0.5) score += 15;

    return Math.min(score, 100);
  }

  countRollovers(history) {
    return history.reduce(
      (total, loan) => total + (loan.rolloverCount || 0),
      0,
    );
  }

  detectLenderShopping(history) {
    const lenders = new Set(history.map((loan) => loan.lender));
    return lenders.size / history.length; // Higher = more lender shopping
  }

  categorizeDependencyRisk(score) {
    if (score < 30) return "low";
    if (score < 50) return "moderate";
    if (score < 70) return "high";
    return "severe";
  }

  identifyDependencyIndicators(factors) {
    const indicators = [];

    if (factors.frequency > 5) indicators.push("High loan frequency");
    if (factors.escalation > 0.3) indicators.push("Escalating loan amounts");
    if (factors.timing < 14) indicators.push("Quick loan turnaround");
    if (factors.rolloverPattern > 3) indicators.push("Frequent rollovers");
    if (factors.alternatingLenders > 0.3)
      indicators.push("Lender shopping behavior");

    return indicators;
  }
}

// ============================================
// COMPREHENSIVE TRIBAL LENDING SIMULATION
// ============================================

export const TRIBAL_LENDING_SYSTEM = {
  activePairings: [
    {
      lender: "BigPicture Loans",
      tribe: "Lac Vieux Desert Band of Lake Superior Chippewa",
      structure: "Tribal Economic Development Corporation",
      tribalOwnership: 0.01, // 1% actual tribal ownership
      maxAPR: 559,
      legalStatus: "Operating under tribal immunity claims",
    },
    {
      lender: "Plain Green Loans",
      tribe: "Chippewa Cree Tribe",
      structure: "Wholly-owned tribal entity",
      tribalOwnership: 1.0, // Actually tribal-owned
      maxAPR: 299,
      legalStatus: "Legitimate tribal enterprise",
    },
    {
      lender: "MobiLoans",
      tribe: "Tunica-Biloxi Tribe",
      structure: "Tribal Lending Entity",
      tribalOwnership: 0.02,
      maxAPR: 650,
      legalStatus: "Under regulatory scrutiny",
    },
  ],

  immunityMechanisms: {
    jurisdictionalClaims: [
      "Loans made on sovereign tribal land",
      "Governed exclusively by tribal law",
      "State courts lack jurisdiction",
      "Federal preemption applies",
    ],

    operationalShields: [
      "Tribal entity as nominal lender",
      "Services performed on reservation",
      "Tribal law governs all disputes",
      "Arbitration required in tribal forum",
    ],
  },

  legalVulnerabilities: [
    {
      challenge: "True Lender Doctrine",
      description: "Courts examine who has predominant economic interest",
      riskLevel: "High",
      caseExample: "CFPB v. NDG Financial Corp",
    },
    {
      challenge: "Minimal Tribal Interest",
      description: "Insufficient tribal economic benefit",
      riskLevel: "Medium",
      indicator: "Less than 1% tribal ownership",
    },
    {
      challenge: "State Enforcement Actions",
      description: "States enjoining tribal lenders despite immunity claims",
      riskLevel: "High",
      examples: ["Connecticut", "Minnesota", "Arkansas"],
    },
  ],
};

// ============================================
// REGULATORY ARBITRAGE TRACKING SYSTEM
// ============================================

export class RegulatoryArbitrageTracker {
  constructor() {
    this.jurisdictionMap = this.buildJurisdictionMap();
    this.arbitrageStrategies = this.loadArbitrageStrategies();
  }

  buildJurisdictionMap() {
    return {
      permissive: {
        states: ["TX", "NV", "UT", "WI", "KS", "AL", "MS", "LA", "MO"],
        characteristics: [
          "High APR caps",
          "Minimal regulation",
          "CSO loopholes",
        ],
        avgMaxAPR: 550,
      },

      moderate: {
        states: ["FL", "OH", "IN", "TN", "VA", "SC"],
        characteristics: [
          "Some regulation",
          "Database tracking",
          "Limited rollovers",
        ],
        avgMaxAPR: 350,
      },

      restrictive: {
        states: ["CA", "NY", "CT", "MA", "AR", "NC", "GA", "VT"],
        characteristics: ["36% APR caps", "Strong enforcement", "Payday bans"],
        avgMaxAPR: 36,
      },

      tribal: {
        entities: "Native American tribal lands",
        characteristics: [
          "Sovereign immunity claims",
          "Federal oversight only",
        ],
        avgMaxAPR: 400,
      },

      offshore: {
        jurisdictions: ["Malta", "Costa Rica", "Antigua"],
        characteristics: ["No US regulation", "International arbitration"],
        avgMaxAPR: 1000,
      },
    };
  }

  selectOptimalJurisdiction(targetState, loanCharacteristics) {
    const targetRegs = STATE_REGULATIONS[targetState];

    if (!targetRegs || targetRegs.maxAPR > loanCharacteristics.desiredAPR) {
      return { jurisdiction: targetState, strategy: "direct", risk: "low" };
    }

    // Need arbitrage
    const strategies = [
      this.evaluateTribalOption(targetState, loanCharacteristics),
      this.evaluateBankPartnership(targetState, loanCharacteristics),
      this.evaluateCSO(targetState, loanCharacteristics),
      this.evaluateOffshore(targetState, loanCharacteristics),
    ];

    return strategies.sort((a, b) => a.risk - b.risk)[0];
  }

  evaluateTribalOption(targetState, characteristics) {
    const tribalRisk = this.assessTribalRisk(targetState);
    return {
      jurisdiction: "tribal",
      strategy: "sovereign_immunity",
      maxAPR: characteristics.desiredAPR,
      risk: tribalRisk,
      implementation: "Partner with tribal lending entity",
      legalTheory: "Tribal sovereign immunity preempts state law",
    };
  }

  assessTribalRisk(state) {
    const hostileStates = ["CT", "MN", "AR", "NY", "CA"];
    const baseRisk = 0.4;

    if (hostileStates.includes(state)) return baseRisk + 0.3;
    return baseRisk;
  }

  evaluateBankPartnership(targetState, characteristics) {
    return {
      jurisdiction: "federal_bank",
      strategy: "rent_a_bank",
      maxAPR: characteristics.desiredAPR,
      risk: 0.6,
      implementation: "Partner with FDIC-insured bank",
      legalTheory: "Federal banking preemption",
    };
  }

  evaluateCSO(targetState, characteristics) {
    const csoStates = ["TX", "OH", "NV"];
    if (!csoStates.includes(targetState)) {
      return { risk: 1.0, strategy: "not_available" };
    }

    return {
      jurisdiction: targetState,
      strategy: "credit_service_organization",
      maxAPR: "unlimited",
      risk: 0.2,
      implementation: "Frame as brokerage fees",
      legalTheory: "Fees not counted as interest",
    };
  }

  evaluateOffshore(targetState, characteristics) {
    return {
      jurisdiction: "offshore",
      strategy: "international_lending",
      maxAPR: characteristics.desiredAPR,
      risk: 0.8,
      implementation: "Offshore entity with US marketing",
      legalTheory: "International jurisdiction",
    };
  }
}

// ============================================
// ADVANCED BEHAVIORAL SCORING SYSTEM
// ============================================

export class BehavioralScoringEngine {
  constructor() {
    this.scoringModel = this.initializeScoringModel();
    this.vulnerabilityMarkers = this.loadVulnerabilityMarkers();
  }

  initializeScoringModel() {
    return {
      timeOfDay: {
        late_night: 0.3, // 11pm-3am - desperation hours
        business_hours: 0.1,
        evening: 0.2,
      },

      deviceType: {
        mobile: 0.2, // Harder to read terms
        desktop: 0.1,
        tablet: 0.15,
      },

      hesitationPatterns: {
        quick_decision: 0.1, // Less than 30 seconds
        moderate_hesitation: 0.2, // 1-5 minutes
        extended_hesitation: 0.4, // Over 5 minutes
      },

      financialStress: {
        multiple_denials: 0.4,
        previous_payday_loans: 0.3,
        recent_overdrafts: 0.3,
        credit_inquiries: 0.2,
      },

      demographicVulnerability: {
        military: 0.2, // Protected class
        elderly: 0.3,
        low_income_zip: 0.25,
        rural_area: 0.2,
      },
    };
  }

  loadVulnerabilityMarkers() {
    return {
      linguisticPatterns: [
        "need money now",
        "emergency cash",
        "bills due tomorrow",
        "utilities shut off",
        "no other options",
        "desperate",
        "help me",
      ],

      behavioralFlags: [
        "multiple_page_refreshes",
        "rapid_form_completion",
        "multiple_amount_changes",
        "abandoned_then_returned",
        "mobile_device_usage",
      ],

      financialIndicators: [
        "declined_elsewhere",
        "checking_multiple_lenders",
        "increasing_loan_amounts",
        "frequent_applications",
        "rollover_history",
      ],
    };
  }

  calculateVulnerabilityScore(userSession, applicationData) {
    let score = 0;

    // Time-based vulnerability
    score += this.scoringModel.timeOfDay[userSession.timeOfDay] || 0;

    // Device-based (mobile users less likely to read terms)
    score += this.scoringModel.deviceType[userSession.deviceType] || 0;

    // Hesitation patterns (desperation vs deliberation)
    score +=
      this.scoringModel.hesitationPatterns[userSession.hesitationLevel] || 0;

    // Financial stress indicators
    Object.keys(applicationData.financialStress || {}).forEach((indicator) => {
      if (applicationData.financialStress[indicator]) {
        score += this.scoringModel.financialStress[indicator] || 0;
      }
    });

    // Demographic vulnerability
    Object.keys(applicationData.demographics || {}).forEach((demo) => {
      if (applicationData.demographics[demo]) {
        score += this.scoringModel.demographicVulnerability[demo] || 0;
      }
    });

    return Math.min(score, 1.0); // Cap at 100%
  }

  generateTargetingStrategy(vulnerabilityScore, userProfile) {
    if (vulnerabilityScore < 0.3) {
      return {
        approach: "standard",
        messaging: "Conventional loan marketing",
        urgency: "low",
        manipulation: "minimal",
      };
    } else if (vulnerabilityScore < 0.6) {
      return {
        approach: "moderate_pressure",
        messaging: "Emphasize speed and convenience",
        urgency: "medium",
        manipulation: "moderate",
      };
    } else {
      return {
        approach: "high_pressure",
        messaging: "Emergency framing, urgency tactics",
        urgency: "high",
        manipulation: "aggressive",
        tactics: [
          "artificial_scarcity",
          "time_pressure",
          "loss_aversion",
          "false_social_proof",
        ],
      };
    }
  }
}

// ============================================
// COMPREHENSIVE ECHO MODE SYSTEM
// ============================================

export function initializeEchoMode() {
  return new EchoModeNarrator();
}

export function computeCoercionIndex(user, ui, loanState) {
  let score = 0;

  // Dark pattern usage
  if (ui.autoRenewal) score += 30;
  if (!ui.aprDisplayed || ui.aprHidden) score += 20;
  if (ui.urgencyTimer) score += 15;
  if (ui.artificialScarcity) score += 10;
  if (ui.preCheckedBoxes) score += 15;

  // User vulnerability indicators
  if (user.rolloverCount > 3) score += 25;
  if (user.previousDenials > 0) score += 10;
  if (user.timeOfDay === "late_night") score += 5;
  if (user.deviceType === "mobile") score += 5; // Harder to read terms

  // Loan characteristics
  if (loanState.hiddenFees) score += 15;
  if (loanState.achAutoDebit) score += 10;
  if (loanState.bypassingStateCaps) score += 20;

  // Escalation factors
  if (user.loanHistory && user.loanHistory.length > 5) score += 15;
  if (user.totalFeesLifetime > user.totalPrincipalBorrowed * 0.5) score += 20;

  return Math.min(score, 100);
}

// ============================================
// COMPREHENSIVE DEBT TRAP MECHANICS
// ============================================

export class DebtTrapMechanics {
  constructor() {
    this.trapTypes = this.initializeTrapTypes();
    this.victimProfiles = this.loadVictimProfiles();
  }

  initializeTrapTypes() {
    return {
      rolloverTrap: {
        mechanism: "Fee-only payments keep principal unchanged",
        triggerPoint: "Payment due date",
        escapeRate: 0.15, // Only 15% escape without rolling over
        avgCycles: 9,
        totalCostMultiplier: 2.3, // Average 230% of original principal
      },

      multiLoanTrap: {
        mechanism: "Multiple simultaneous loans from different lenders",
        triggerPoint: "Existing loan stress",
        avgLoansSimultaneous: 3.2,
        cumulativeAPR: 1200, // Combined effect
        defaultRate: 0.45,
      },

      collateralTrap: {
        mechanism: "Vehicle title or bank account as collateral",
        triggerPoint: "Need for larger amounts",
        repossessionRate: 0.11, // 11% lose vehicles
        bankAccountSeizure: 0.23, // 23% lose bank accounts
        recoveryTimeMonths: 24,
      },

      creditDamageTrap: {
        mechanism: "Negative credit reporting locks out mainstream credit",
        triggerPoint: "First default",
        creditScoreDrop: 100, // Average drop in FICO score
        recoveryYears: 3.5,
        alternativesRemaining: [
          "more_payday_loans",
          "pawn_shops",
          "loan_sharks",
        ],
      },
    };
  }

  loadVictimProfiles() {
    return {
      typical: {
        demographics: "Female, age 25-44, income $30k-$50k",
        triggers: ["Unexpected expense", "Income shortage", "Bill due"],
        vulnerabilities: ["Limited savings", "Poor credit", "Financial stress"],
        trapProgression: [
          "First loan for emergency",
          "Cannot repay in full",
          "Rolls over multiple times",
          "Takes additional loans",
          "Enters debt spiral",
          "Defaults and faces consequences",
        ],
      },

      military: {
        demographics: "Active duty military, age 18-35",
        vulnerabilities: [
          "Financial inexperience",
          "Deployment stress",
          "Family pressure",
        ],
        protections: ["Military Lending Act 36% APR cap"],
        workarounds: ["Allotment sales", "Tribal lenders", "Auto title loans"],
        harmProfile: "Security clearance threats, readiness impact",
      },

      elderly: {
        demographics: "Age 55+, fixed income",
        vulnerabilities: [
          "Technology confusion",
          "Isolation",
          "Cognitive decline",
        ],
        targeting: ["Direct mail", "Phone calls", "Storefronts"],
        harmProfile:
          "Retirement savings depletion, essential needs deprivation",
      },
    };
  }

  simulateDebtProgression(initialLoan, borrowerProfile) {
    const progression = [];
    let currentLoan = { ...initialLoan };
    let timeInTrap = 0;
    let totalFeesPaid = 0;
    let totalPrincipalBorrowed = initialLoan.principal;

    // Simulate typical 9-cycle progression
    for (let cycle = 1; cycle <= 9; cycle++) {
      const feePayment = currentLoan.principal * 0.15; // $15 per $100
      totalFeesPaid += feePayment;
      timeInTrap += 14; // 14 days per cycle

      progression.push({
        cycle,
        action: cycle === 1 ? "initial_loan" : "rollover",
        principalOwed: currentLoan.principal,
        feeThisCycle: feePayment,
        totalFeesPaid,
        totalPrincipalBorrowed,
        cumulativeAPR:
          (totalFeesPaid / totalPrincipalBorrowed) * (365 / timeInTrap) * 100,
        daysInDebt: timeInTrap,
        escapeOpportunity: cycle === 3 || cycle === 6, // Occasional escape chances
        psychologicalState: this.assessPsychologicalState(cycle, totalFeesPaid),
      });

      // Simulate additional borrowing
      if (cycle === 4 || cycle === 7) {
        const additionalLoan = currentLoan.principal * 0.5; // Borrow more
        totalPrincipalBorrowed += additionalLoan;
        currentLoan.principal += additionalLoan;

        progression.push({
          cycle: cycle + 0.5,
          action: "additional_borrowing",
          newPrincipal: additionalLoan,
          reason: "Cannot break cycle, needs more cash",
          totalPrincipalBorrowed,
          desperation: "increasing",
        });
      }
    }

    return {
      progression,
      summary: {
        totalTimeTrapped: timeInTrap,
        totalFeesPaid,
        totalPrincipalBorrowed,
        effectiveAPR:
          (totalFeesPaid / totalPrincipalBorrowed) * (365 / timeInTrap) * 100,
        costAsPercentOfIncome:
          (totalFeesPaid / borrowerProfile.annualIncome) * 100,
        recoveryEstimateMonths: Math.ceil(
          totalFeesPaid / (borrowerProfile.monthlyIncome * 0.1),
        ),
      },
    };
  }

  assessPsychologicalState(cycle, totalFees) {
    if (cycle <= 2) return "hopeful_temporary";
    if (cycle <= 4) return "concerned_manageable";
    if (cycle <= 6) return "stressed_trapped";
    if (cycle <= 8) return "desperate_panicked";
    return "resigned_defeated";
  }
}

// Export all the comprehensive systems
export const rolloverTrapEngine = new RolloverTrapEngine();
export const achDebitSimulator = new ACHDebitSimulator();
export const multiloanEngine = new MultiloanDependencyEngine();
export const arbitrageTracker = new RegulatoryArbitrageTracker();
export const behavioralScoring = new BehavioralScoringEngine();
export const debtTrapMechanics = new DebtTrapMechanics();
