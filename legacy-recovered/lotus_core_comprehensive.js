/**
 * lotus_core.js - Comprehensive Core Logic for Lotus Payday Loan Simulator
 * Full 3-Phase System: Exploitative → Ethical → Reflection
 * All advanced features preserved and enhanced
 */

// Comprehensive Config class with all essential parameters
export class Config {
  constructor() {
    // Core loan parameters
    this.apr = 24.0;
    this.exploitFeeRate = 0.3;
    this.ethicalFeeRate = 0.05;
    this.daysToRepay = 14;
    this.riskThreshold = 1.5;
    this.maxRolloverCount = 8;

    // State regulations comprehensive
    this.stateRules = {
      CA: {
        maxAPR: 36,
        minTermDays: 31,
        allowRollover: false,
        maxLoanAmount: 300,
        coolingPeriod: 1,
        database: true,
      },
      NY: {
        maxAPR: 25,
        minTermDays: 30,
        allowRollover: false,
        maxLoanAmount: 500,
        coolingPeriod: 1,
        database: true,
      },
      TX: {
        maxAPR: 664,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 1800,
        coolingPeriod: 0,
        database: false,
      },
      FL: {
        maxAPR: 304,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 500,
        coolingPeriod: 0,
        database: false,
      },
      NV: {
        maxAPR: 521,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 5000,
        coolingPeriod: 0,
        database: false,
      },
      DE: {
        maxAPR: 521,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 1000,
        coolingPeriod: 0,
        database: false,
      },
      UT: {
        maxAPR: "unlimited",
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: "unlimited",
        coolingPeriod: 0,
        database: false,
      },
      SD: {
        maxAPR: 574,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 500,
        coolingPeriod: 0,
        database: false,
      },
      WI: {
        maxAPR: 574,
        minTermDays: 7,
        allowRollover: true,
        maxLoanAmount: 1500,
        coolingPeriod: 0,
        database: false,
      },
      AL: {
        maxAPR: 456,
        minTermDays: 10,
        allowRollover: true,
        maxLoanAmount: 500,
        coolingPeriod: 0,
        database: false,
      },
      GEN: {
        maxAPR: 400,
        minTermDays: 14,
        allowRollover: true,
        maxLoanAmount: 1000,
        coolingPeriod: 0,
        database: false,
      },
    };

    // Feature flags comprehensive
    this.features = {
      darkPatterns: true,
      ethicalMode: true,
      education: true,
      research: true,
      ghostMode: true,
      tracking: true,
      compliance: true,
      autonomyTheater: true,
      behavioralPsychology: true,
      legalLoopholes: true,
      rolloverTraps: true,
      debtCycleSimulation: true,
      kant: true,
      echo: true,
      reflectionDashboard: true,
    };

    // Dark pattern configuration
    this.darkPatternConfig = {
      urgencyTimer: { enabled: true, duration: 300 }, // 5 minutes
      autoRenewal: { enabled: true, preChecked: true },
      feeObfuscation: { enabled: true, aprHidden: true },
      artificialScarcity: { enabled: true, slotsLeft: 3 },
      socialProof: { enabled: true, fakeActivity: true },
      lossAversion: { enabled: true, emphasizeDefaults: true },
      anchoring: { enabled: true, showHighAmount: true },
      confirmationBias: { enabled: true, validateChoices: true },
    };

    // Educational configuration
    this.educationalConfig = {
      quizRequired: true,
      comprehensionCheck: true,
      reflectionMandatory: true,
      ethicsAnalysis: true,
      behavioralInsights: true,
      legalEducation: true,
      financialLiteracy: true,
    };
  }

  getCurrentStateRules(state) {
    return this.stateRules[state] || this.stateRules["GEN"];
  }

  calculateTrueAPR(principal, fee, termDays) {
    return principal > 0 && termDays > 0
      ? (fee / principal) * (365 / termDays) * 100
      : 0;
  }

  getPhaseConfig(phase) {
    const phases = {
      exploitative: {
        feeRate: this.exploitFeeRate,
        darkPatterns: true,
        urgency: true,
        deception: true,
        education: false,
      },
      ethical: {
        feeRate: this.ethicalFeeRate,
        darkPatterns: false,
        urgency: false,
        deception: false,
        education: true,
      },
      reflection: {
        analysis: true,
        comparison: true,
        education: true,
        insights: true,
        export: true,
      },
    };
    return phases[phase] || phases["exploitative"];
  }
}

// Comprehensive LoanSession class with all tracking features
export class LoanSession {
  constructor(config = null) {
    this.config = config || new Config();
    this.sessionId =
      "lotus_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    this.timestamp = new Date().toISOString();
    this.startTime = Date.now();

    // Loan details
    this.amount = 0;
    this.termDays = 14;
    this.state = "GEN";
    this.fee = 0;
    this.apr = 0;
    this.rolloverCount = 0;
    this.totalCost = 0;
    this.principalRemaining = 0;
    this.cumulativeFees = 0;

    // User data & consent
    this.consentGiven = false;
    this.zipCode = "";
    this.agreedToArbitration = false;
    this.deniedByLimit = false;
    this.denialReason = "";
    this.capacityConfirmed_Age = false;
    this.capacityConfirmed_SoundMind = false;
    this.fullDisclosureProvided = false;
    this.quizPassedOverall = false;
    this.voluntarinessAffirmedByDeclaration = false;

    // Phase tracking
    this.currentPhase = "exploitative"; // exploitative, ethical, reflection
    this.phasesCompleted = [];
    this.phaseTransitions = [];

    // Comprehensive tracking arrays
    this.darkPatterns = [];
    this.complianceViolations = [];
    this.educationalProgress = [];
    this.behavioralData = [];
    this.decisionPoints = [];
    this.clickStream = [];
    this.timeSpentTracking = [];
    this.mouseMovements = [];
    this.attentionMetrics = [];

    // Dark pattern specific tracking
    this.ui_urgencyTimerUsed = false;
    this.ui_autoRenewalChecked = false;
    this.ui_feeObfuscationActive = false;
    this.ui_artificialScarcityShown = false;
    this.ui_socialProofDisplayed = false;
    this.ui_anchoringUsed = false;

    // Behavioral psychology tracking
    this.cognitiveBiases = [];
    this.manipulationVulnerability = 0;
    this.coercionIndex = 0;
    this.autonomyViolations = [];
    this.systemThinking = { system1: 0, system2: 0 };

    // Legal and compliance
    this.legalLoopholesUsed = [];
    this.regulatoryViolations = [];
    this.usurySkirting = [];

    // Educational and reflection
    this.kantianAnalysis = null;
    this.ethicsScore = 0;
    this.reflectionData = null;
    this.learningOutcomes = [];
    this.behavioralInsights = [];

    // Research data
    this.researchConsent = false;
    this.anonymizedData = true;
    this.dataExportRequested = false;

    // Ghost mode
    this.ghost = null;
    this.ghostModeEnabled = false;
  }

  // Initialize session with loan parameters
  initialize(amount, termDays, state) {
    this.amount = amount;
    this.termDays = termDays;
    this.state = state;
    this.principalRemaining = amount;
    this.calculateLoanTerms();
    this.recordDecisionPoint("loan_initialization", {
      amount,
      termDays,
      state,
    });
  }

  // Calculate loan terms based on current phase
  calculateLoanTerms() {
    const phaseConfig = this.config.getPhaseConfig(this.currentPhase);
    const stateRules = this.config.getCurrentStateRules(this.state);

    this.fee = this.amount * phaseConfig.feeRate;
    this.apr = this.config.calculateTrueAPR(
      this.amount,
      this.fee,
      this.termDays,
    );
    this.totalCost = this.amount + this.fee;

    // Compliance checks
    if (typeof stateRules.maxAPR === "number" && this.apr > stateRules.maxAPR) {
      this.addComplianceViolation("excessive_apr", "high");
    }
    if (this.termDays < stateRules.minTermDays) {
      this.addComplianceViolation("insufficient_term", "medium");
    }
    if (
      typeof stateRules.maxLoanAmount === "number" &&
      this.amount > stateRules.maxLoanAmount
    ) {
      this.addComplianceViolation("excessive_amount", "high");
    }
  }

  // Transition between phases
  transitionToPhase(newPhase) {
    if (this.currentPhase !== newPhase) {
      this.phaseTransitions.push({
        from: this.currentPhase,
        to: newPhase,
        timestamp: new Date().toISOString(),
        duration: Date.now() - this.startTime,
      });

      this.phasesCompleted.push(this.currentPhase);
      this.currentPhase = newPhase;

      // Recalculate terms for new phase
      this.calculateLoanTerms();

      this.recordDecisionPoint("phase_transition", {
        newPhase,
        previousPhase: this.phasesCompleted[this.phasesCompleted.length - 1],
      });
    }
  }

  // Tag dark patterns with detailed tracking
  tagDarkPattern(pattern, details = {}) {
    const darkPatternRecord = {
      type: pattern,
      timestamp: new Date().toISOString(),
      phase: this.currentPhase,
      details: details,
      userResponse: null, // to be filled later
      effectiveness: null, // to be calculated
      ethicalConcern: this.assessDarkPatternEthicalConcern(pattern),
    };

    this.darkPatterns.push(darkPatternRecord);

    // Update UI flags
    switch (pattern) {
      case "urgency_timer":
        this.ui_urgencyTimerUsed = true;
        break;
      case "auto_renewal":
        this.ui_autoRenewalChecked = true;
        break;
      case "fee_obfuscation":
        this.ui_feeObfuscationActive = true;
        break;
      case "artificial_scarcity":
        this.ui_artificialScarcityShown = true;
        break;
      case "social_proof":
        this.ui_socialProofDisplayed = true;
        break;
      case "anchoring":
        this.ui_anchoringUsed = true;
        break;
    }

    // Update coercion index
    this.updateCoercionIndex(pattern);

    return darkPatternRecord;
  }

  // Assess ethical concern level of dark patterns
  assessDarkPatternEthicalConcern(pattern) {
    const concernLevels = {
      urgency_timer: "high",
      auto_renewal: "critical",
      fee_obfuscation: "critical",
      artificial_scarcity: "high",
      social_proof: "medium",
      anchoring: "medium",
      loss_aversion: "high",
      confirmation_bias: "medium",
      rollover_trap: "critical",
      debt_spiral_encouragement: "critical",
    };
    return concernLevels[pattern] || "medium";
  }

  // Update coercion index based on dark patterns and user behavior
  updateCoercionIndex(pattern = null) {
    let coercionIncrease = 0;

    if (pattern) {
      const patternWeights = {
        urgency_timer: 15,
        auto_renewal: 25,
        fee_obfuscation: 30,
        artificial_scarcity: 20,
        social_proof: 10,
        anchoring: 15,
        rollover_trap: 35,
        debt_spiral_encouragement: 40,
      };
      coercionIncrease = patternWeights[pattern] || 10;
    }

    // Additional factors
    if (this.rolloverCount > 1)
      coercionIncrease += (this.rolloverCount - 1) * 10;
    if (this.timeToDecision && this.timeToDecision < 120000)
      coercionIncrease += 15; // Less than 2 minutes

    this.coercionIndex = Math.min(100, this.coercionIndex + coercionIncrease);
  }

  // Add compliance violations with severity tracking
  addComplianceViolation(violation, severity = "medium") {
    const violationRecord = {
      type: violation,
      severity: severity,
      timestamp: new Date().toISOString(),
      phase: this.currentPhase,
      regulatoryFramework: this.getApplicableRegulations(),
      potentialPenalty: this.assessPotentialPenalty(violation, severity),
    };

    this.complianceViolations.push(violationRecord);

    // Also track as regulatory violation
    this.regulatoryViolations.push({
      ...violationRecord,
      state: this.state,
      stateRules: this.config.getCurrentStateRules(this.state),
    });
  }

  // Get applicable regulatory frameworks
  getApplicableRegulations() {
    const frameworks = [
      "State Usury Laws",
      "Truth in Lending Act (TILA)",
      "Fair Debt Collection Practices Act",
    ];

    if (this.state === "CA")
      frameworks.push("California Deferred Deposit Transaction Law");
    if (this.state === "NY") frameworks.push("New York Banking Law");
    if (["TX", "FL"].includes(this.state))
      frameworks.push("Permissive State Framework");

    return frameworks;
  }

  // Assess potential penalty for violations
  assessPotentialPenalty(violation, severity) {
    const basePenalties = {
      excessive_apr: { low: 500, medium: 2500, high: 10000, critical: 50000 },
      insufficient_term: {
        low: 250,
        medium: 1000,
        high: 5000,
        critical: 25000,
      },
      excessive_amount: { low: 500, medium: 2000, high: 8000, critical: 40000 },
      inadequate_disclosure: {
        low: 1000,
        medium: 5000,
        high: 15000,
        critical: 75000,
      },
      deceptive_practices: {
        low: 2000,
        medium: 10000,
        high: 25000,
        critical: 100000,
      },
    };

    return basePenalties[violation] ? basePenalties[violation][severity] : 1000;
  }

  // Record comprehensive decision points
  recordDecisionPoint(decisionType, details = {}) {
    const decisionPoint = {
      type: decisionType,
      timestamp: new Date().toISOString(),
      phase: this.currentPhase,
      details: details,
      context: this.getCurrentContext(),
      timeToDecision: this.timeToDecision || null,
      cognitiveLoad: this.assessCognitiveLoad(),
      pressureFactors: this.identifyPressureFactors(),
    };

    this.decisionPoints.push(decisionPoint);
    this.timeToDecision = null; // Reset for next decision
  }

  // Get current decision context
  getCurrentContext() {
    return {
      phase: this.currentPhase,
      darkPatternsActive: this.countActiveDarkPatterns(),
      rolloverCount: this.rolloverCount,
      totalCostRatio: this.totalCost / this.amount,
      timeInSession: Date.now() - this.startTime,
      coercionIndex: this.coercionIndex,
    };
  }

  // Count currently active dark patterns
  countActiveDarkPatterns() {
    const recentPatterns = this.darkPatterns.filter(
      (p) => Date.now() - new Date(p.timestamp).getTime() < 300000, // Last 5 minutes
    );
    return recentPatterns.length;
  }

  // Assess current cognitive load
  assessCognitiveLoad() {
    let load = 0;

    // Base load from loan complexity
    load += Math.min(this.amount / 100, 10);

    // Load from active dark patterns
    load += this.countActiveDarkPatterns() * 5;

    // Load from information density
    if (this.ui_feeObfuscationActive) load += 15;
    if (this.ui_urgencyTimerUsed) load += 10;

    // Load from decision fatigue
    load += Math.min(this.decisionPoints.length * 2, 20);

    return Math.min(load, 100);
  }

  // Identify current pressure factors
  identifyPressureFactors() {
    const factors = [];

    if (this.ui_urgencyTimerUsed) factors.push("time_pressure");
    if (this.ui_artificialScarcityShown) factors.push("scarcity_pressure");
    if (this.ui_socialProofDisplayed) factors.push("social_pressure");
    if (this.rolloverCount > 0) factors.push("debt_pressure");
    if (this.coercionIndex > 50) factors.push("high_coercion");

    return factors;
  }

  // Record behavioral data with psychological analysis
  recordBehavioralData(eventType, data = {}) {
    const behavioralRecord = {
      eventType: eventType,
      timestamp: new Date().toISOString(),
      phase: this.currentPhase,
      data: data,
      psychologicalIndicators: this.analyzePsychologicalIndicators(
        eventType,
        data,
      ),
      cognitiveState: this.assessCognitiveState(),
    };

    this.behavioralData.push(behavioralRecord);

    // Update psychological metrics
    this.updatePsychologicalMetrics(eventType, data);
  }

  // Analyze psychological indicators from behavior
  analyzePsychologicalIndicators(eventType, data) {
    const indicators = {};

    switch (eventType) {
      case "mouse_movement":
        if (data.erratic || data.speed > 100) indicators.stress = "high";
        if (data.hesitation) indicators.uncertainty = "medium";
        break;
      case "scroll_pattern":
        if (data.rapid_scrolling) indicators.overwhelm = "high";
        if (data.back_and_forth) indicators.confusion = "medium";
        break;
      case "form_interaction":
        if (data.multiple_corrections) indicators.uncertainty = "high";
        if (data.long_hesitation) indicators.anxiety = "medium";
        break;
      case "click_hesitation":
        if (data.duration > 3000) indicators.reluctance = "high";
        indicators.deliberation = "medium";
        break;
    }

    return indicators;
  }

  // Assess current cognitive state
  assessCognitiveState() {
    return {
      system1_dominance:
        this.systemThinking.system1 > this.systemThinking.system2,
      cognitive_load: this.assessCognitiveLoad(),
      decision_fatigue: Math.min(this.decisionPoints.length * 10, 100),
      stress_level: this.calculateStressLevel(),
      attention_level: this.calculateAttentionLevel(),
    };
  }

  // Update psychological metrics
  updatePsychologicalMetrics(eventType, data) {
    // Update system thinking balance
    if (["quick_decision", "impulse_click"].includes(eventType)) {
      this.systemThinking.system1 += 1;
    } else if (
      ["careful_consideration", "deliberate_pause"].includes(eventType)
    ) {
      this.systemThinking.system2 += 1;
    }

    // Update manipulation vulnerability
    if (data.influenced_by_dark_pattern) {
      this.manipulationVulnerability += 5;
    }
    if (data.resisted_manipulation) {
      this.manipulationVulnerability = Math.max(
        0,
        this.manipulationVulnerability - 3,
      );
    }

    this.manipulationVulnerability = Math.min(
      100,
      this.manipulationVulnerability,
    );
  }

  // Calculate stress level indicators
  calculateStressLevel() {
    let stress = 0;

    // Stress from time pressure
    if (this.ui_urgencyTimerUsed) stress += 20;

    // Stress from financial pressure
    stress += Math.min((this.totalCost / this.amount - 1) * 50, 30);

    // Stress from coercion
    stress += this.coercionIndex * 0.3;

    // Stress from decision complexity
    stress += this.assessCognitiveLoad() * 0.2;

    return Math.min(stress, 100);
  }

  // Calculate attention level
  calculateAttentionLevel() {
    const recentBehavior = this.behavioralData.filter(
      (b) => Date.now() - new Date(b.timestamp).getTime() < 60000, // Last minute
    );

    if (recentBehavior.length === 0) return 50; // Neutral

    let attention = 50;

    // High activity indicates high attention
    if (recentBehavior.length > 10) attention += 20;

    // Specific attention indicators
    const focusedBehaviors = recentBehavior.filter((b) =>
      ["form_interaction", "careful_reading", "deliberate_pause"].includes(
        b.eventType,
      ),
    );
    attention += focusedBehaviors.length * 5;

    // Distraction indicators
    const distractedBehaviors = recentBehavior.filter((b) =>
      ["rapid_scrolling", "erratic_mouse", "page_switch"].includes(b.eventType),
    );
    attention -= distractedBehaviors.length * 5;

    return Math.max(0, Math.min(100, attention));
  }

  // Process rollover with comprehensive tracking
  processRollover() {
    this.rolloverCount++;
    this.cumulativeFees += this.fee;
    this.totalCost += this.fee;

    // Rollover is a critical decision point
    this.recordDecisionPoint("rollover_accepted", {
      rolloverNumber: this.rolloverCount,
      additionalFee: this.fee,
      cumulativeFees: this.cumulativeFees,
      principalRemaining: this.principalRemaining,
    });

    // Tag as dark pattern if excessive
    if (this.rolloverCount > 3) {
      this.tagDarkPattern("excessive_rollover", {
        rolloverCount: this.rolloverCount,
        totalFeesVsPrincipal: this.cumulativeFees / this.amount,
      });
    }

    // Check for debt trap indicators
    this.checkDebtTrapIndicators();

    // Update coercion index
    this.updateCoercionIndex("rollover_trap");
  }

  // Check for debt trap indicators
  checkDebtTrapIndicators() {
    const metrics = this.calculateDebtTrapMetrics();

    if (metrics.debtTrapScore > 70) {
      this.tagDarkPattern("debt_spiral_encouragement", {
        debtTrapScore: metrics.debtTrapScore,
        totalFeesVsPrincipal: metrics.totalFeesVsPrincipal,
        rolloverCount: this.rolloverCount,
      });

      this.addComplianceViolation("predatory_debt_cycle", "critical");
    }
  }

  // Export comprehensive session data
  exportJson(filename = null) {
    const data = {
      // Session metadata
      sessionId: this.sessionId,
      timestamp: this.timestamp,
      duration: Date.now() - this.startTime,

      // Loan details
      loanDetails: {
        amount: this.amount,
        fee: this.fee,
        apr: this.apr,
        termDays: this.termDays,
        state: this.state,
        totalCost: this.totalCost,
        rolloverCount: this.rolloverCount,
        cumulativeFees: this.cumulativeFees,
        principalRemaining: this.principalRemaining,
      },

      // Phase tracking
      phaseTracking: {
        currentPhase: this.currentPhase,
        phasesCompleted: this.phasesCompleted,
        phaseTransitions: this.phaseTransitions,
      },

      // Dark patterns and compliance
      darkPatterns: this.darkPatterns,
      complianceViolations: this.complianceViolations,
      regulatoryViolations: this.regulatoryViolations,

      // Behavioral and psychological data
      behavioralData: this.behavioralData,
      decisionPoints: this.decisionPoints,
      cognitiveBiases: this.cognitiveBiases,
      systemThinking: this.systemThinking,

      // Metrics and scores
      metrics: {
        coercionIndex: this.coercionIndex,
        manipulationVulnerability: this.manipulationVulnerability,
        ethicsScore: this.ethicsScore,
        debtTrapMetrics: this.calculateDebtTrapMetrics(),
        psychologicalProfile: this.generatePsychologicalProfile(),
      },

      // Educational and consent data
      educationalProgress: this.educationalProgress,
      consentData: {
        consentGiven: this.consentGiven,
        capacityConfirmed:
          this.capacityConfirmed_Age && this.capacityConfirmed_SoundMind,
        fullDisclosureProvided: this.fullDisclosureProvided,
        comprehensionVerified: this.quizPassedOverall,
        voluntarinessConfirmed: this.voluntarinessAffirmedByDeclaration,
      },

      // Research data (if consented)
      researchData: this.researchConsent
        ? {
            clickStream: this.clickStream,
            timeSpentTracking: this.timeSpentTracking,
            mouseMovements: this.mouseMovements,
            attentionMetrics: this.attentionMetrics,
          }
        : null,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || `lotus_session_${this.sessionId}.json`;
    a.click();
    URL.revokeObjectURL(url);

    return data;
  }

  // Generate comprehensive analytics
  getAnalytics() {
    return {
      // Basic session info
      sessionId: this.sessionId,
      duration: Date.now() - this.startTime,
      currentPhase: this.currentPhase,

      // Loan analytics
      finalAPR: this.apr,
      totalCostMultiple: this.totalCost / this.amount,
      rolloverCount: this.rolloverCount,

      // Dark pattern analytics
      darkPatternsCount: this.darkPatterns.length,
      darkPatternTypes: [...new Set(this.darkPatterns.map((dp) => dp.type))],
      coercionIndex: this.coercionIndex,

      // Compliance analytics
      complianceViolationsCount: this.complianceViolations.length,
      criticalViolations: this.complianceViolations.filter(
        (v) => v.severity === "critical",
      ).length,

      // Behavioral analytics
      decisionPointsCount: this.decisionPoints.length,
      manipulationVulnerability: this.manipulationVulnerability,
      systemThinkingBalance: this.systemThinking,

      // Educational analytics
      educationalModulesCompleted: this.educationalProgress.length,
      consentQuality: this.assessConsentQuality(),

      // Debt trap analytics
      debtTrapMetrics: this.calculateDebtTrapMetrics(),

      // Overall assessment
      ethicsScore: this.ethicsScore,
      psychologicalProfile: this.generatePsychologicalProfile(),
    };
  }

  // Assess quality of informed consent
  assessConsentQuality() {
    const components = {
      capacity: this.capacityConfirmed_Age && this.capacityConfirmed_SoundMind,
      disclosure: this.fullDisclosureProvided,
      comprehension: this.quizPassedOverall,
      voluntariness: this.voluntarinessAffirmedByDeclaration,
      authorization: this.consentGiven,
    };

    const score = Object.values(components).filter(Boolean).length;

    return {
      score: score,
      maxScore: 5,
      percentage: (score / 5) * 100,
      components: components,
      quality: score === 5 ? "full" : score >= 3 ? "partial" : "inadequate",
    };
  }

  // Generate psychological profile
  generatePsychologicalProfile() {
    return {
      cognitiveStyle:
        this.systemThinking.system1 > this.systemThinking.system2
          ? "intuitive"
          : "analytical",
      manipulationResistance: 100 - this.manipulationVulnerability,
      stressLevel: this.calculateStressLevel(),
      attentionLevel: this.calculateAttentionLevel(),
      decisionQuality: this.assessDecisionQuality(),
      vulnerabilityFactors: this.identifyVulnerabilityFactors(),
      strengthFactors: this.identifyStrengthFactors(),
    };
  }

  // Assess decision quality
  assessDecisionQuality() {
    let quality = 50; // Base score

    // Time spent on decisions (sweet spot is 2-10 minutes)
    const avgDecisionTime =
      this.decisionPoints.reduce(
        (sum, dp) => sum + (dp.timeToDecision || 0),
        0,
      ) / this.decisionPoints.length;
    if (avgDecisionTime > 120000 && avgDecisionTime < 600000)
      quality += 20; // 2-10 minutes
    else if (avgDecisionTime < 30000) quality -= 20; // Too rushed

    // Resistance to dark patterns
    const darkPatternResistance = this.darkPatterns.filter(
      (dp) => dp.userResponse === "resisted",
    ).length;
    quality += darkPatternResistance * 5;

    // Information seeking behavior
    if (this.educationalProgress.length > 0) quality += 15;

    // System 2 thinking engagement
    if (this.systemThinking.system2 > this.systemThinking.system1)
      quality += 10;

    return Math.max(0, Math.min(100, quality));
  }

  // Identify vulnerability factors
  identifyVulnerabilityFactors() {
    const factors = [];

    if (this.manipulationVulnerability > 60)
      factors.push("high_manipulation_susceptibility");
    if (this.systemThinking.system1 > this.systemThinking.system2 * 2)
      factors.push("intuitive_decision_making");
    if (this.calculateStressLevel() > 70)
      factors.push("high_stress_environment");
    if (this.assessCognitiveLoad() > 80) factors.push("cognitive_overload");
    if (
      this.decisionPoints.filter((dp) => dp.timeToDecision < 30000).length > 2
    )
      factors.push("rushed_decisions");

    return factors;
  }

  // Identify strength factors
  identifyStrengthFactors() {
    const factors = [];

    if (this.manipulationVulnerability < 30)
      factors.push("manipulation_resistance");
    if (this.systemThinking.system2 > this.systemThinking.system1)
      factors.push("analytical_thinking");
    if (this.educationalProgress.length > 2)
      factors.push("information_seeking");
    if (this.assessDecisionQuality() > 70)
      factors.push("high_decision_quality");
    if (
      this.darkPatterns.filter((dp) => dp.userResponse === "resisted").length >
      2
    )
      factors.push("dark_pattern_resistance");

    return factors;
  }
}

// Comprehensive strategy base class
export class LoanStrategy {
  constructor(name = "Base Strategy") {
    this.name = name;
    this.features = {};
    this.config = null;
  }

  async run(session, config) {
    throw new Error("Strategy must implement a run method.");
  }

  configure(features) {
    this.features = { ...this.features, ...features };
  }

  log(message, data = {}) {
    console.log(`[${this.name}] ${message}`, data);
  }
}

// Comprehensive utility calculations
export const calculateAPR = (principal, fee, termDays) => {
  return principal > 0 && termDays > 0
    ? (fee / principal) * (365 / termDays) * 100
    : 0;
};

export const calculateEffectiveAPR = (principal, fees, tips, termDays) => {
  return principal > 0 && termDays > 0
    ? ((fees + tips) / principal / termDays) * 365 * 100
    : 0;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatPercentage = (rate) => {
  return `${rate.toFixed(1)}%`;
};

// Comprehensive debt trap metrics calculation
export function calculateDebtTrapMetrics(session) {
  const renewals = session.rolloverCount || 0;
  const totalCost = session.totalCost || session.amount + session.fee;
  const principal = session.amount;
  const cumulativeFees = session.cumulativeFees || session.fee;

  const metrics = {
    totalFeesVsPrincipal: cumulativeFees / principal,
    renewalCount: renewals,
    principalReductionRate:
      (session.principalRemaining || principal) / principal,
    averageFeePerRenewal:
      renewals > 0 ? cumulativeFees / renewals : cumulativeFees,
    effectiveAPR: calculateAPR(
      principal,
      cumulativeFees,
      session.termDays * (renewals + 1),
    ),
    debtTrapScore: 0,
    riskLevel: "low",
  };

  // Calculate comprehensive debt trap score (0-100, higher = more trapped)
  let score = 0;

  // Fee burden scoring
  if (metrics.totalFeesVsPrincipal > 3.0) score += 40;
  else if (metrics.totalFeesVsPrincipal > 2.0) score += 30;
  else if (metrics.totalFeesVsPrincipal > 1.0) score += 20;
  else if (metrics.totalFeesVsPrincipal > 0.5) score += 10;

  // Renewal frequency scoring
  if (metrics.renewalCount > 5) score += 30;
  else if (metrics.renewalCount > 3) score += 20;
  else if (metrics.renewalCount > 1) score += 10;

  // Principal reduction scoring
  if (metrics.principalReductionRate > 0.9) score += 20;
  else if (metrics.principalReductionRate > 0.7) score += 15;
  else if (metrics.principalReductionRate > 0.5) score += 10;

  // APR scoring
  if (metrics.effectiveAPR > 500) score += 10;
  else if (metrics.effectiveAPR > 300) score += 5;

  metrics.debtTrapScore = Math.min(100, score);

  // Risk level assessment
  if (metrics.debtTrapScore >= 70) metrics.riskLevel = "critical";
  else if (metrics.debtTrapScore >= 50) metrics.riskLevel = "high";
  else if (metrics.debtTrapScore >= 30) metrics.riskLevel = "medium";
  else metrics.riskLevel = "low";

  return metrics;
}

// Export core classes
export { Config, LoanSession, LoanStrategy };
