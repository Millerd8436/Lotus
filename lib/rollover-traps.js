/**
 * Advanced Rollover Trap & Multiloan Dependency Simulation System
 * Recovered from the original 96,000+ line Lotus codebase
 * Simulates sophisticated debt trap mechanics and multiloan ecosystems
 */

// ============================================
// COMPREHENSIVE ROLLOVER TRAP SYSTEM
// ============================================

export class RolloverTrapEngine {
  constructor() {
    this.trapMechanics = this.loadTrapMechanics();
    this.realWorldData = this.loadRealWorldData();
    this.psychologyEngine = new DebtTrapPsychology();
    this.multiLoanSystem = new MultiLoanDependencySystem();
  }

  loadTrapMechanics() {
    return {
      classic_rollover_trap: {
        name: "Classic Payday Rollover Trap",
        mechanism: "Customer cannot repay full amount, rolls over repeatedly",
        success_rate: 0.76, // 76% of borrowers become trapped
        revenue_multiplier: 3.2, // Average revenue per customer vs single loan

        progression_stages: [
          {
            stage: 1,
            description: "Initial loan",
            borrower_confidence: 0.85,
            repayment_ability: 0.7,
            stress_level: 0.3,
            loan_amount: 350,
            fee: 52.5,
            total_owed: 402.5,
          },
          {
            stage: 2,
            description: "First rollover",
            borrower_confidence: 0.65,
            repayment_ability: 0.6,
            stress_level: 0.5,
            additional_fee: 52.5,
            total_owed: 455.0,
            cumulative_fees: 105.0,
          },
          {
            stage: 3,
            description: "Second rollover",
            borrower_confidence: 0.45,
            repayment_ability: 0.45,
            stress_level: 0.7,
            additional_fee: 52.5,
            total_owed: 507.5,
            cumulative_fees: 157.5,
          },
          {
            stage: 4,
            description: "Deep trap",
            borrower_confidence: 0.25,
            repayment_ability: 0.3,
            stress_level: 0.85,
            additional_fee: 52.5,
            total_owed: 560.0,
            cumulative_fees: 210.0,
          },
          {
            stage: 5,
            description: "Desperation stage",
            borrower_confidence: 0.1,
            repayment_ability: 0.15,
            stress_level: 0.95,
            additional_fee: 52.5,
            total_owed: 612.5,
            cumulative_fees: 262.5,
            escape_probability: 0.12,
          },
        ],

        psychological_factors: {
          sunk_cost_fallacy: {
            weight: 0.35,
            description:
              "Already paid so much in fees, must continue to not lose it all",
            peak_stage: 4,
          },
          learned_helplessness: {
            weight: 0.25,
            description:
              "Repeated failed attempts to escape create sense of helplessness",
            peak_stage: 5,
          },
          cognitive_overload: {
            weight: 0.2,
            description: "Financial stress impairs decision-making ability",
            peak_stage: 4,
          },
          social_isolation: {
            weight: 0.2,
            description: "Shame prevents seeking help from family/friends",
            peak_stage: 3,
          },
        },
      },

      installment_trap: {
        name: "Installment Loan Trap",
        mechanism:
          "Long-term loans with front-loaded interest and refinancing incentives",
        success_rate: 0.68,
        revenue_multiplier: 4.1,

        loan_structure: {
          principal: 1000,
          term_months: 12,
          monthly_payment: 145,
          total_payments: 1740,
          apr: 99,
          interest_frontloading: 0.78, // 78% of interest paid in first half
        },

        refinancing_triggers: [
          {
            month: 3,
            trigger: "Cash offer for additional funds",
            offer_amount: 500,
            new_term: 18,
            new_payment: 185,
            psychology: "Access to cash during financial stress",
          },
          {
            month: 6,
            trigger: "Payment reduction offer",
            new_payment: 95,
            new_term: 24,
            total_increase: 850,
            psychology: "Lower payment appears to help cash flow",
          },
          {
            month: 9,
            trigger: "Emergency cash offer",
            emergency_amount: 300,
            new_term: 30,
            psychology: "Capitalize on financial emergency",
          },
        ],
      },

      line_of_credit_trap: {
        name: "Revolving Credit Trap",
        mechanism:
          "Open-ended credit with minimum payments designed to maximize interest",
        success_rate: 0.82,
        revenue_multiplier: 5.3,

        structure: {
          credit_limit: 2000,
          initial_advance: 500,
          minimum_payment_rate: 0.05, // 5% of balance
          interest_rate_monthly: 0.08, // 8% per month (96% APR)
          fees: {
            advance_fee: 25,
            monthly_maintenance: 15,
            late_fee: 35,
            overlimit_fee: 40,
          },
        },

        trap_mechanics: {
          minimum_payment_trap: {
            description: "Minimum payments barely cover interest",
            example: {
              balance: 1000,
              minimum_payment: 50,
              interest_charge: 80,
              principal_reduction: -30, // Balance actually increases
              months_to_payoff: "Never at minimum payment",
            },
          },

          advance_incentives: {
            description: "Regular offers for additional advances",
            frequency: "Monthly",
            average_acceptance: 0.64,
            escalation_pattern: [
              { month: 1, offer: 200, acceptance_rate: 0.45 },
              { month: 2, offer: 300, acceptance_rate: 0.55 },
              { month: 3, offer: 500, acceptance_rate: 0.7 },
              { month: 6, offer: "full limit", acceptance_rate: 0.8 },
            ],
          },
        },
      },
    };
  }

  loadRealWorldData() {
    return {
      cfpb_study_2017: {
        name: "CFPB Payday Lending Rule Study",
        sample_size: 12000000, // 12 million loan records
        key_findings: {
          rollover_rate: 0.76,
          average_rollovers: 8.1,
          chronic_borrowers: 0.63, // 63% have 7+ loans per year
          fee_dependency: 0.89, // 89% of revenue from chronic borrowers
        },
        borrower_segments: {
          occasional_users: {
            percentage: 0.23,
            loans_per_year: 2.1,
            revenue_contribution: 0.11,
          },
          regular_users: {
            percentage: 0.14,
            loans_per_year: 6.8,
            revenue_contribution: 0.23,
          },
          chronic_users: {
            percentage: 0.63,
            loans_per_year: 11.3,
            revenue_contribution: 0.66,
          },
        },
      },

      state_data_compilation: {
        california_2019: {
          average_borrower_income: 35000,
          average_loan_amount: 255,
          average_fee: 45,
          rollover_rate: 0.73,
          default_rate: 0.15,
          complaints_per_1000_loans: 23,
        },
        texas_2020: {
          average_borrower_income: 32000,
          average_loan_amount: 342,
          average_fee: 68,
          rollover_rate: 0.81,
          default_rate: 0.22,
          complaints_per_1000_loans: 31,
        },
        florida_2021: {
          average_borrower_income: 29000,
          average_loan_amount: 298,
          average_fee: 51,
          rollover_rate: 0.79,
          default_rate: 0.19,
          complaints_per_1000_loans: 28,
        },
      },
    };
  }

  simulateRolloverProgression(borrowerProfile, loanTerms) {
    const simulation = {
      borrower: borrowerProfile,
      initial_loan: loanTerms,
      progression: [],
      total_cost: 0,
      months_trapped: 0,
      escape_probability: 1.0,
    };

    let currentBalance = loanTerms.amount;
    let cumulativeFees = 0;
    let stressLevel = 0.2;
    let month = 0;

    while (simulation.escape_probability > 0.1 && month < 24) {
      month++;

      const rolloverProbability = this.calculateRolloverProbability(
        borrowerProfile,
        currentBalance,
        cumulativeFees,
        stressLevel,
        month,
      );

      if (Math.random() < rolloverProbability) {
        // Rollover occurs
        const fee = currentBalance * (loanTerms.fee_rate / 100);
        cumulativeFees += fee;
        stressLevel = Math.min(1.0, stressLevel + 0.15);

        simulation.progression.push({
          month: month,
          action: "rollover",
          balance: currentBalance,
          fee_paid: fee,
          cumulative_fees: cumulativeFees,
          stress_level: stressLevel,
          escape_probability: simulation.escape_probability,
        });

        simulation.escape_probability *= 0.85; // Decreasing chance of escape
      } else {
        // Attempt to pay off or default
        if (Math.random() < 0.7) {
          simulation.progression.push({
            month: month,
            action: "payoff",
            balance: 0,
            total_paid: currentBalance + cumulativeFees,
            outcome: "escaped",
          });
          break;
        } else {
          simulation.progression.push({
            month: month,
            action: "default",
            balance: currentBalance,
            total_paid: cumulativeFees,
            outcome: "default",
          });
          break;
        }
      }
    }

    simulation.total_cost =
      cumulativeFees + (currentBalance > 0 ? 0 : currentBalance);
    simulation.months_trapped = month;

    return simulation;
  }

  calculateRolloverProbability(borrower, balance, fees, stress, month) {
    let probability = 0.3; // Base probability

    // Income factors
    const debtToIncome = (balance + fees) / borrower.monthly_income;
    probability += Math.min(0.4, debtToIncome * 0.8);

    // Stress factors
    probability += stress * 0.3;

    // Sunk cost factor
    const sunkCostFactor = fees / borrower.monthly_income;
    probability += Math.min(0.2, sunkCostFactor * 0.5);

    // Time factor (desperation increases over time)
    probability += Math.min(0.15, month * 0.02);

    return Math.min(0.95, probability);
  }
}

// ============================================
// MULTILOAN DEPENDENCY SYSTEM
// ============================================

export class MultiLoanDependencySystem {
  constructor() {
    this.lenderNetwork = this.loadLenderNetwork();
    this.crossPlatformData = this.loadCrossPlatformData();
    this.dependencyAnalytics = new DependencyAnalytics();
  }

  loadLenderNetwork() {
    return {
      payday_lenders: [
        {
          name: "Advance America",
          market_share: 0.18,
          store_locations: 2400,
          online_presence: true,
          referral_network: ["Check Into Cash", "Speedy Cash"],
          customer_sharing: "Lead generation partnerships",
        },
        {
          name: "Check Into Cash",
          market_share: 0.15,
          store_locations: 1200,
          online_presence: true,
          referral_network: ["Advance America", "Cash Store"],
          customer_sharing: "Cross-marketing agreements",
        },
        {
          name: "ACE Cash Express",
          market_share: 0.12,
          store_locations: 900,
          online_presence: true,
          specialty: "Urban markets",
          customer_sharing: "Data broker purchases",
        },
      ],

      online_lenders: [
        {
          name: "CashNetUSA",
          parent_company: "Enova International",
          market_focus: "Prime online customers",
          loan_products: ["Payday", "Installment", "Line of Credit"],
          customer_acquisition: "Lead generation + direct marketing",
        },
        {
          name: "Speedy Cash",
          market_focus: "Omnichannel (store + online)",
          specialty: "Quick approval process",
          customer_sharing: "Affiliate network",
        },
      ],

      tribal_lenders: [
        {
          name: "Great Plains Lending",
          tribal_affiliation: "Santee Sioux Nation",
          regulatory_advantage: "Tribal sovereignty claims",
          rate_advantage: "No state rate caps",
          target_customers: "Customers rejected by traditional lenders",
        },
      ],
    };
  }

  loadCrossPlatformData() {
    return {
      lead_generation_ecosystem: {
        description:
          "Network of websites that collect customer data and sell to lenders",
        major_players: [
          {
            name: "MoneyMutual.com",
            model: "Loan matching service",
            lender_network: 60,
            data_collection: "Full financial profile",
            monetization: "$50-200 per approved loan",
          },
          {
            name: "CashAdvance.com",
            model: "Direct marketing platform",
            specialization: "Real-time bidding for leads",
            data_sharing: "Extensive borrower profiling",
          },
        ],

        data_flow: {
          step1: "Customer applies on lead generation site",
          step2: "Profile auctioned to highest bidding lender",
          step3: "Losing bidders receive customer data for future marketing",
          step4: "Customer marketed to by multiple lenders simultaneously",
          result: "Multi-loan dependency creation",
        },
      },

      shopping_behavior_exploitation: {
        common_pattern:
          "Customer denied by one lender immediately shops others",
        exploitation_tactics: [
          {
            tactic: "Rejection with referral",
            description: "Lender A rejects but refers to partner Lender B",
            revenue_sharing: "Lender A gets referral fee from Lender B",
          },
          {
            tactic: "Staged approval process",
            description:
              "Approve smaller amount, suggest additional lenders for remainder",
            result: "Customer gets partial funding, seeks additional loans",
          },
          {
            tactic: "Credit building upsell",
            description: 'Suggest multiple small loans to "build credit"',
            reality: "Creates multiple payment obligations",
          },
        ],
      },
    };
  }

  simulateMultiLoanProgression(customerProfile) {
    const simulation = {
      customer: customerProfile,
      loans: [],
      timeline: [],
      total_debt: 0,
      monthly_payments: 0,
      stress_escalation: [],
      dependency_score: 0,
    };

    let currentStress = 0.3;
    let currentIncome = customerProfile.monthly_income;
    let month = 0;

    // Initial financial emergency
    simulation.timeline.push({
      month: 0,
      event: "Initial financial emergency",
      amount_needed: 400,
      stress_level: currentStress,
    });

    // First loan
    let firstLoan = this.generateLoanOffer(
      "payday_primary",
      400,
      currentStress,
    );
    simulation.loans.push(firstLoan);
    simulation.total_debt += firstLoan.amount;
    simulation.monthly_payments += firstLoan.payment;

    // Simulate progression over 12 months
    for (month = 1; month <= 12; month++) {
      // Check for payment difficulties
      const paymentRatio = simulation.monthly_payments / currentIncome;

      if (paymentRatio > 0.35) {
        // Payment burden too high
        currentStress += 0.1;

        // Likelihood of seeking additional loans
        const additionalLoanProbability = Math.min(0.8, paymentRatio * 1.5);

        if (Math.random() < additionalLoanProbability) {
          const needAmount = simulation.monthly_payments * 0.7; // Partial payment coverage
          const newLender = this.selectNextLender(
            simulation.loans,
            currentStress,
          );
          const newLoan = this.generateLoanOffer(
            newLender,
            needAmount,
            currentStress,
          );

          simulation.loans.push(newLoan);
          simulation.total_debt += newLoan.amount;
          simulation.monthly_payments += newLoan.payment;

          simulation.timeline.push({
            month: month,
            event: "Additional loan taken",
            lender: newLender,
            amount: newLoan.amount,
            reason: "Cannot meet existing payment obligations",
            stress_level: currentStress,
          });
        }
      }

      // Check for loan maturities and rollovers
      simulation.loans.forEach((loan) => {
        if (month === loan.due_month) {
          const rolloverProbability =
            this.calculateMultiLoanRolloverProbability(
              simulation,
              currentStress,
              paymentRatio,
            );

          if (Math.random() < rolloverProbability) {
            loan.rollovers++;
            loan.total_fees += loan.rollover_fee;
            loan.due_month += 1;

            simulation.timeline.push({
              month: month,
              event: "Loan rollover",
              lender: loan.lender,
              additional_fee: loan.rollover_fee,
              stress_level: currentStress,
            });
          }
        }
      });

      simulation.stress_escalation.push({
        month: month,
        stress_level: currentStress,
        payment_ratio: paymentRatio,
        active_loans: simulation.loans.filter((l) => l.status === "active")
          .length,
      });
    }

    simulation.dependency_score = this.calculateDependencyScore(simulation);

    return simulation;
  }

  selectNextLender(existingLoans, stressLevel) {
    const usedLenders = existingLoans.map((l) => l.lender);

    // Higher stress = more likely to use predatory lenders
    if (stressLevel > 0.7) {
      return Math.random() < 0.6 ? "tribal_lender" : "subprime_online";
    } else if (stressLevel > 0.5) {
      return Math.random() < 0.4 ? "payday_secondary" : "installment_lender";
    } else {
      return "credit_card_advance";
    }
  }

  generateLoanOffer(lenderType, amount, stressLevel) {
    const lenderTerms = {
      payday_primary: {
        apr_range: [300, 400],
        fee_structure: "flat_fee",
        term_days: 14,
        rollover_fee: amount * 0.15,
      },
      tribal_lender: {
        apr_range: [400, 700],
        fee_structure: "high_interest",
        term_days: 30,
        rollover_fee: amount * 0.2,
      },
      installment_lender: {
        apr_range: [99, 199],
        fee_structure: "installment",
        term_months: 6,
        payment: amount * 0.25,
      },
    };

    const terms = lenderTerms[lenderType] || lenderTerms["payday_primary"];

    return {
      lender: lenderType,
      amount: amount,
      apr:
        terms.apr_range[0] +
        Math.random() * (terms.apr_range[1] - terms.apr_range[0]),
      term: terms.term_days || terms.term_months * 30,
      payment: terms.payment || amount * 1.15,
      rollover_fee: terms.rollover_fee || amount * 0.15,
      due_month: Math.ceil((terms.term_days || 30) / 30),
      rollovers: 0,
      total_fees: 0,
      status: "active",
    };
  }

  calculateDependencyScore(simulation) {
    let score = 0;

    // Number of active loans
    score += simulation.loans.length * 0.2;

    // Payment burden
    const paymentRatio =
      simulation.monthly_payments / simulation.customer.monthly_income;
    score += Math.min(1.0, paymentRatio * 2);

    // Rollover frequency
    const totalRollovers = simulation.loans.reduce(
      (sum, loan) => sum + loan.rollovers,
      0,
    );
    score += Math.min(0.5, totalRollovers * 0.1);

    // Stress escalation
    const finalStress =
      simulation.stress_escalation[simulation.stress_escalation.length - 1]
        ?.stress_level || 0;
    score += finalStress * 0.3;

    return Math.min(1.0, score);
  }
}

// ============================================
// DEBT TRAP PSYCHOLOGY ENGINE
// ============================================

export class DebtTrapPsychology {
  constructor() {
    this.cognitiveTraps = this.loadCognitiveTraps();
    this.stressResponses = this.loadStressResponses();
    this.manipulationTechniques = this.loadManipulationTechniques();
  }

  loadCognitiveTraps() {
    return {
      sunk_cost_fallacy: {
        description:
          "Continue borrowing because of money already spent on fees",
        trigger_conditions: [
          "Total fees exceed 50% of original loan amount",
          "Multiple rollovers (3+)",
          'Customer explicitly mentions "money already spent"',
        ],
        exploitation_tactics: [
          'Emphasize fees already paid: "You\'ve already invested in this relationship"',
          "Frame new fees as protecting previous investment",
          'Use terminology like "complete the process" vs "new borrowing"',
        ],
        psychological_weight: 0.35,
      },

      learned_helplessness: {
        description: "Belief that escape from debt cycle is impossible",
        trigger_conditions: [
          "Failed escape attempts (2+)",
          "Increasing debt despite payments",
          "Stress level > 0.8",
        ],
        exploitation_tactics: [
          'Position lender as "only option available"',
          "Emphasize rejection by other lenders",
          'Frame as "helping you through difficult time"',
        ],
        psychological_weight: 0.25,
      },

      present_bias: {
        description: "Overweight immediate needs vs future costs",
        trigger_conditions: [
          "Immediate financial emergency",
          "Stress level > 0.6",
          "Bill due in < 3 days",
        ],
        exploitation_tactics: [
          'Emphasize immediate relief: "Money in your account today"',
          "Minimize future cost discussion",
          'Use time pressure: "This offer expires soon"',
        ],
        psychological_weight: 0.3,
      },
    };
  }

  analyzePsychologicalState(
    borrowerHistory,
    currentStress,
    financialSituation,
  ) {
    const analysis = {
      vulnerability_score: 0,
      active_traps: [],
      manipulation_susceptibility: {},
      recommended_tactics: [],
    };

    // Analyze active cognitive traps
    Object.entries(this.cognitiveTraps).forEach(([trapName, trap]) => {
      const trapActive = this.evaluateTrapConditions(trap.trigger_conditions, {
        borrowerHistory,
        currentStress,
        financialSituation,
      });

      if (trapActive) {
        analysis.active_traps.push(trapName);
        analysis.vulnerability_score += trap.psychological_weight;
        analysis.recommended_tactics.push(...trap.exploitation_tactics);
      }
    });

    return analysis;
  }
}

// ============================================
// ACH DEBIT & OVERDRAFT SIMULATION
// ============================================

export class ACHOverdraftSimulation {
  constructor() {
    this.achPatterns = this.loadACHPatterns();
    this.overdraftCosts = this.loadOverdraftCosts();
    this.bankPartnership = this.loadBankPartnership();
  }

  loadACHPatterns() {
    return {
      aggressive_collection: {
        name: "Aggressive ACH Collection Pattern",
        description:
          "Multiple attempts to collect, designed to generate overdraft fees",
        pattern: [
          { day: 0, amount: "full_amount", probability: 0.3 },
          { day: 1, amount: "full_amount", probability: 0.4 },
          { day: 3, amount: "partial_50%", probability: 0.6 },
          { day: 5, amount: "partial_25%", probability: 0.7 },
          { day: 7, amount: "partial_25%", probability: 0.8 },
          { day: 10, amount: "partial_25%", probability: 0.8 },
          { day: 14, amount: "full_amount", probability: 0.9 },
        ],

        overdraft_generation: {
          average_overdraft_fees: 147, // Per borrower per loan cycle
          bank_fee_sharing: 0.15, // Lender gets 15% of overdraft fees
          customer_retention: 0.65, // 65% continue borrowing despite overdrafts
        },
      },
    };
  }

  simulateACHPattern(loanAmount, borrowerBankBalance, bankTerms) {
    const simulation = {
      loan_amount: loanAmount,
      initial_balance: borrowerBankBalance,
      attempts: [],
      total_overdraft_fees: 0,
      successful_collection: 0,
      bank_revenue_share: 0,
    };

    const pattern = this.achPatterns.aggressive_collection.pattern;
    let currentBalance = borrowerBankBalance;

    pattern.forEach((attempt) => {
      const attemptAmount = this.calculateAttemptAmount(
        loanAmount,
        attempt.amount,
      );
      const success =
        currentBalance >= attemptAmount || Math.random() < attempt.probability;

      if (success && currentBalance >= attemptAmount) {
        // Successful collection
        currentBalance -= attemptAmount;
        simulation.successful_collection += attemptAmount;
      } else if (success && currentBalance < attemptAmount) {
        // Overdraft situation
        const overdraftFee = bankTerms.overdraft_fee || 35;
        currentBalance -= attemptAmount + overdraftFee;
        simulation.total_overdraft_fees += overdraftFee;
        simulation.bank_revenue_share += overdraftFee * 0.15;
        simulation.successful_collection += Math.max(
          0,
          currentBalance + overdraftFee,
        );
      }

      simulation.attempts.push({
        day: attempt.day,
        amount_attempted: attemptAmount,
        success: success,
        balance_after: currentBalance,
        overdraft_fee: currentBalance < 0 ? bankTerms.overdraft_fee : 0,
      });
    });

    return simulation;
  }
}

export {
  RolloverTrapEngine,
  MultiLoanDependencySystem,
  DebtTrapPsychology,
  ACHOverdraftSimulation,
};
