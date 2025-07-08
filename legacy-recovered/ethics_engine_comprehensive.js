/**
 * ethics_engine_comprehensive.js - Dynamic Comprehensive Ethics Engine
 * Full 3-Phase Informed Consent & Kantian Ethics Analysis
 * Real-time behavioral tracking, manipulation detection, and educational intervention
 */

import { evaluateConsent } from "./kant.js";
import { Echo } from "./echo.js";

export class ComprehensiveEthicsEngine {
  constructor(session, behavioralEngine) {
    this.session = session;
    this.behavioralEngine = behavioralEngine;
    this.echo = new Echo();

    // Core ethics framework
    this.kantianFramework = new KantianEthicsFramework();
    this.consentAnalyzer = new InformedConsentAnalyzer();
    this.autonomyTracker = new AutonomyViolationTracker();
    this.manipulationDetector = new ManipulationDetector();

    // Dynamic tracking
    this.ethicsViolations = [];
    this.autonomyMetrics = {
      informationTransparency: 100,
      voluntariness: 100,
      capacity: 100,
      understanding: 100,
      coercionResistance: 100,
    };

    // Real-time monitoring
    this.activeViolations = new Set();
    this.ethicalInterventions = [];
    this.educationalTriggers = [];

    // Phase-specific configurations
    this.phaseConfigs = {
      exploitative: {
        enableDetection: true,
        enableIntervention: false, // Let them experience manipulation
        trackingLevel: "comprehensive",
        educationalMode: "post-experience",
      },
      ethical: {
        enableDetection: true,
        enableIntervention: true,
        trackingLevel: "educational",
        educationalMode: "proactive",
      },
      reflection: {
        enableDetection: true,
        enableIntervention: true,
        trackingLevel: "analytical",
        educationalMode: "comprehensive",
      },
    };

    this.currentConfig = this.phaseConfigs.exploitative;
    this.initialize();
  }

  initialize() {
    this.setupRealTimeMonitoring();
    this.initializeKantianAnalysis();
    this.startAutonomyTracking();
    this.echo.announce("Comprehensive Ethics Engine Initialized");
  }

  // PHASE MANAGEMENT
  transitionToPhase(phase) {
    this.currentConfig =
      this.phaseConfigs[phase] || this.phaseConfigs.exploitative;
    this.session.currentPhase = phase;

    // Reconfigure monitoring based on phase
    this.reconfigureMonitoring(phase);

    // Log phase transition
    this.logEthicalEvent("phase_transition", {
      newPhase: phase,
      ethicsState: this.generateEthicsSnapshot(),
      autonomyMetrics: { ...this.autonomyMetrics },
    });

    this.echo.announce(`Ethics Engine: Transitioned to ${phase} phase`);
  }

  reconfigureMonitoring(phase) {
    switch (phase) {
      case "exploitative":
        this.manipulationDetector.setSensitivity("high");
        this.autonomyTracker.setMode("passive_observation");
        break;
      case "ethical":
        this.manipulationDetector.setSensitivity("educational");
        this.autonomyTracker.setMode("proactive_protection");
        break;
      case "reflection":
        this.manipulationDetector.setSensitivity("analytical");
        this.autonomyTracker.setMode("comprehensive_analysis");
        break;
    }
  }

  // REAL-TIME MONITORING
  setupRealTimeMonitoring() {
    // Monitor UI interactions in real-time
    this.startUIMonitoring();

    // Track decision-making patterns
    this.startDecisionTracking();

    // Monitor information processing
    this.startInformationTracking();

    // Track coercion indicators
    this.startCoercionMonitoring();
  }

  startUIMonitoring() {
    // Real-time dark pattern detection
    document.addEventListener("click", (event) => {
      this.analyzeUIInteraction("click", event);
    });

    document.addEventListener("change", (event) => {
      this.analyzeUIInteraction("change", event);
    });

    document.addEventListener("scroll", (event) => {
      this.analyzeUIInteraction("scroll", event);
    });

    // Track hesitation and decision patterns
    document.addEventListener("mousemove", (event) => {
      this.trackUserBehavior("mouse_movement", event);
    });
  }

  analyzeUIInteraction(type, event) {
    const element = event.target;
    const timestamp = Date.now();

    // Check for dark pattern triggers
    const darkPatternDetected = this.checkForDarkPattern(element, type);

    if (darkPatternDetected) {
      this.handleDarkPatternDetection(darkPatternDetected, element, type);
    }

    // Analyze autonomy implications
    const autonomyImpact = this.assessAutonomyImpact(element, type);

    if (autonomyImpact.severity > 0) {
      this.handleAutonomyViolation(autonomyImpact);
    }

    // Record interaction for analysis
    this.session.recordBehavioralData("ui_interaction", {
      type: type,
      element: this.describeElement(element),
      darkPattern: darkPatternDetected,
      autonomyImpact: autonomyImpact,
      timestamp: timestamp,
    });
  }

  checkForDarkPattern(element, interactionType) {
    const patterns = [];

    // Urgency patterns
    if (
      element.textContent &&
      /urgent|limited time|expires|hurry/i.test(element.textContent)
    ) {
      patterns.push({
        type: "urgency_manipulation",
        severity: "high",
        description: "Time pressure to bypass careful consideration",
      });
    }

    // Pre-checked boxes (auto-renewal, arbitration)
    if (
      element.type === "checkbox" &&
      element.checked &&
      !element.dataset.userChanged
    ) {
      patterns.push({
        type: "pre_checked_manipulation",
        severity: "critical",
        description: "Pre-selected options without explicit user consent",
      });
    }

    // Hidden or obfuscated fees
    if (
      element.classList.contains("fee-hidden") ||
      element.classList.contains("apr-obfuscated")
    ) {
      patterns.push({
        type: "fee_obfuscation",
        severity: "critical",
        description: "Important financial information hidden or minimized",
      });
    }

    // Artificial scarcity
    if (
      element.textContent &&
      /only \d+ left|limited slots|few remaining/i.test(element.textContent)
    ) {
      patterns.push({
        type: "artificial_scarcity",
        severity: "high",
        description: "False scarcity to pressure quick decisions",
      });
    }

    // Social proof manipulation
    if (
      element.textContent &&
      /\d+ people|others chose|popular choice/i.test(element.textContent)
    ) {
      patterns.push({
        type: "social_proof_manipulation",
        severity: "medium",
        description: "Fabricated social pressure",
      });
    }

    return patterns.length > 0 ? patterns : null;
  }

  handleDarkPatternDetection(patterns, element, interactionType) {
    patterns.forEach((pattern) => {
      // Record the violation
      this.recordEthicsViolation("dark_pattern", pattern);

      // Update autonomy metrics
      this.degradeAutonomyMetrics(pattern);

      // Tag in session
      this.session.tagDarkPattern(pattern.type, {
        element: this.describeElement(element),
        interactionType: interactionType,
        severity: pattern.severity,
        description: pattern.description,
      });

      // Trigger intervention if appropriate
      if (
        this.currentConfig.enableIntervention &&
        pattern.severity === "critical"
      ) {
        this.triggerEthicalIntervention(pattern, element);
      }
    });
  }

  assessAutonomyImpact(element, interactionType) {
    let impact = {
      category: null,
      severity: 0,
      description: "",
      kantianViolation: false,
    };

    // Check for consent-related interactions
    if (
      element.type === "checkbox" &&
      element.name &&
      /consent|agree|arbitration|renewal/i.test(element.name)
    ) {
      impact.category = "consent_manipulation";
      impact.severity =
        element.checked && !element.dataset.userExplicitlyChecked ? 80 : 20;
      impact.description = "Interaction with consent mechanism";
      impact.kantianViolation =
        element.checked && !element.dataset.userExplicitlyChecked;
    }

    // Check for financial commitment interactions
    if (
      element.type === "submit" ||
      element.classList.contains("accept-loan")
    ) {
      const comprehensionChecked = this.assessUserComprehension();
      impact.category = "financial_commitment";
      impact.severity = comprehensionChecked.score < 70 ? 90 : 30;
      impact.description = "Major financial commitment interaction";
      impact.kantianViolation = comprehensionChecked.score < 50;
    }

    return impact;
  }

  handleAutonomyViolation(violation) {
    // Record the violation
    this.recordEthicsViolation("autonomy_violation", violation);

    // Update session autonomy tracking
    this.session.autonomyViolations.push({
      timestamp: Date.now(),
      type: violation.category,
      severity: violation.severity,
      kantianViolation: violation.kantianViolation,
      description: violation.description,
    });

    // Trigger educational intervention if severe
    if (violation.severity > 70 && this.currentConfig.enableIntervention) {
      this.triggerAutonomyProtection(violation);
    }
  }

  // KANTIAN ETHICS ANALYSIS
  initializeKantianAnalysis() {
    this.kantianFramework.initialize(this.session);
  }

  performKantianAnalysis() {
    const analysis = evaluateConsent(this.session);

    // Enhance with real-time data
    analysis.realTimeMetrics = {
      currentAutonomyScore: this.calculateAutonomyScore(),
      manipulationExposure: this.calculateManipulationExposure(),
      informedConsentQuality: this.assessInformedConsentQuality(),
      coercionLevel: this.session.coercionIndex,
    };

    // Assess categorical imperative violations
    analysis.categoricalImperativeViolations =
      this.assessCategoricalImperativeViolations();

    // Assess dignity violations
    analysis.dignityViolations = this.assessDignityViolations();

    return analysis;
  }

  assessCategoricalImperativeViolations() {
    const violations = [];

    // Universal Law Test
    if (this.session.darkPatterns.length > 0) {
      violations.push({
        type: "universal_law",
        description: "Dark patterns cannot be universalized",
        severity: "high",
        details:
          "If all lenders used these deceptive practices, the lending system would collapse",
      });
    }

    // Humanity as End Test
    if (this.session.coercionIndex > 50) {
      violations.push({
        type: "humanity_as_end",
        description: "Treating borrower merely as means to profit",
        severity: "critical",
        details:
          "High coercion indicates borrower autonomy is being undermined",
      });
    }

    return violations;
  }

  assessDignityViolations() {
    const violations = [];

    // Information dignity
    if (this.autonomyMetrics.informationTransparency < 70) {
      violations.push({
        type: "information_dignity",
        description: "Withholding information violates dignity",
        severity: "high",
      });
    }

    // Decision dignity
    if (this.autonomyMetrics.voluntariness < 60) {
      violations.push({
        type: "decision_dignity",
        description: "Coercive practices violate decision-making dignity",
        severity: "critical",
      });
    }

    return violations;
  }

  // INFORMED CONSENT ANALYSIS
  assessInformedConsentQuality() {
    const quality = {
      informationProvided: this.assessInformationProvided(),
      comprehensionVerified: this.assessComprehension(),
      voluntarinessEnsured: this.assessVoluntariness(),
      capacityConfirmed: this.assessCapacity(),
      overallScore: 0,
    };

    quality.overallScore =
      quality.informationProvided * 0.3 +
      quality.comprehensionVerified * 0.3 +
      quality.voluntarinessEnsured * 0.3 +
      quality.capacityConfirmed * 0.1;

    return quality;
  }

  assessInformationProvided() {
    let score = 100;

    // Check if key information is properly disclosed
    if (!this.session.fullDisclosureProvided) score -= 40;
    if (this.session.ui_feeObfuscationActive) score -= 30;
    if (this.session.darkPatterns.some((p) => p.type === "fee_obfuscation"))
      score -= 20;

    return Math.max(0, score);
  }

  assessComprehension() {
    let score = 0;

    if (this.session.quizPassedOverall) score += 80;
    if (this.session.capacityConfirmed_SoundMind) score += 20;

    // Deduct for cognitive overload
    const cognitiveLoad = this.session.assessCognitiveLoad();
    score -= cognitiveLoad * 0.5;

    return Math.max(0, Math.min(100, score));
  }

  assessVoluntariness() {
    let score = 100;

    // Deduct for coercion
    score -= this.session.coercionIndex;

    // Deduct for time pressure
    if (this.session.ui_urgencyTimerUsed) score -= 25;

    // Deduct for pre-checked boxes
    if (
      this.session.ui_autoRenewalChecked &&
      !this.session.voluntarinessAffirmedByDeclaration
    )
      score -= 30;

    return Math.max(0, score);
  }

  assessCapacity() {
    let score = 100;

    if (!this.session.capacityConfirmed_Age) score -= 50;
    if (!this.session.capacityConfirmed_SoundMind) score -= 50;

    return Math.max(0, score);
  }

  // AUTONOMY METRICS CALCULATION
  calculateAutonomyScore() {
    const weights = {
      informationTransparency: 0.25,
      voluntariness: 0.3,
      capacity: 0.15,
      understanding: 0.25,
      coercionResistance: 0.05,
    };

    let score = 0;
    for (const [metric, value] of Object.entries(this.autonomyMetrics)) {
      score += value * weights[metric];
    }

    return score;
  }

  degradeAutonomyMetrics(pattern) {
    switch (pattern.type) {
      case "urgency_manipulation":
        this.autonomyMetrics.voluntariness -= 15;
        this.autonomyMetrics.coercionResistance -= 10;
        break;
      case "fee_obfuscation":
        this.autonomyMetrics.informationTransparency -= 25;
        this.autonomyMetrics.understanding -= 20;
        break;
      case "pre_checked_manipulation":
        this.autonomyMetrics.voluntariness -= 30;
        break;
      case "artificial_scarcity":
        this.autonomyMetrics.voluntariness -= 20;
        this.autonomyMetrics.coercionResistance -= 15;
        break;
    }

    // Ensure metrics don't go below 0
    for (const metric in this.autonomyMetrics) {
      this.autonomyMetrics[metric] = Math.max(0, this.autonomyMetrics[metric]);
    }
  }

  // EDUCATIONAL INTERVENTIONS
  triggerEthicalIntervention(pattern, element) {
    const intervention = {
      timestamp: Date.now(),
      trigger: pattern,
      element: this.describeElement(element),
      type: "educational_overlay",
      content: this.generateInterventionContent(pattern),
    };

    this.ethicalInterventions.push(intervention);

    // Display intervention based on current phase
    if (this.currentConfig.educationalMode === "proactive") {
      this.displayEducationalOverlay(intervention);
    }

    this.echo.announce(`Ethical Intervention: ${pattern.type}`);
  }

  triggerAutonomyProtection(violation) {
    const protection = {
      timestamp: Date.now(),
      trigger: violation,
      type: "autonomy_protection",
      actions: this.generateProtectionActions(violation),
    };

    this.ethicalInterventions.push(protection);

    // Execute protection actions
    this.executeProtectionActions(protection.actions);

    this.echo.announce(`Autonomy Protection: ${violation.category}`);
  }

  generateInterventionContent(pattern) {
    const content = {
      urgency_manipulation: {
        title: "⚠️ Time Pressure Detected",
        message:
          "This interface is using artificial urgency to pressure you into a quick decision. Take your time to consider all options.",
        educationalPoints: [
          "Legitimate lenders don't pressure immediate decisions",
          "Time pressure reduces careful consideration",
          "You have the right to pause and research alternatives",
        ],
      },
      fee_obfuscation: {
        title: "💰 Hidden Costs Detected",
        message:
          "Important fee information is being obscured or minimized. Look for the true total cost.",
        educationalPoints: [
          "All fees must be clearly disclosed",
          "Look for APR, not just dollar amounts",
          "Hidden fees are a red flag for predatory lending",
        ],
      },
      pre_checked_manipulation: {
        title: "☑️ Pre-Selected Options Detected",
        message:
          "Options have been pre-selected without your explicit choice. Review all checkboxes.",
        educationalPoints: [
          "Legitimate consent requires your explicit choice",
          "Pre-checked boxes often hide unfavorable terms",
          "Always review what you're agreeing to",
        ],
      },
    };

    return (
      content[pattern.type] || {
        title: "⚠️ Potential Manipulation Detected",
        message:
          "This interface may be using psychological manipulation techniques.",
        educationalPoints: ["Be cautious of high-pressure tactics"],
      }
    );
  }

  // COMPREHENSIVE REPORTING
  generateComprehensiveEthicsReport() {
    const kantianAnalysis = this.performKantianAnalysis();
    const consentQuality = this.assessInformedConsentQuality();
    const autonomyScore = this.calculateAutonomyScore();

    return {
      timestamp: new Date().toISOString(),
      sessionId: this.session.sessionId,
      phase: this.session.currentPhase,

      // Core metrics
      autonomyScore: autonomyScore,
      ethicsViolations: this.ethicsViolations.length,
      kantianViolations: kantianAnalysis.categoricalImperativeViolations.length,

      // Detailed analysis
      kantianAnalysis: kantianAnalysis,
      consentQuality: consentQuality,
      autonomyMetrics: { ...this.autonomyMetrics },

      // Behavioral integration
      manipulationExposure: this.calculateManipulationExposure(),
      coercionLevel: this.session.coercionIndex,

      // Interventions
      interventionsTriggered: this.ethicalInterventions.length,
      educationalEffectiveness: this.calculateEducationalEffectiveness(),

      // Recommendations
      recommendations: this.generateEthicalRecommendations(),

      // Research data
      researchInsights: this.generateResearchInsights(),
    };
  }

  calculateManipulationExposure() {
    const totalPatterns = this.session.darkPatterns.length;
    const criticalPatterns = this.session.darkPatterns.filter(
      (p) => p.severity === "critical",
    ).length;

    return {
      totalExposure: totalPatterns,
      criticalExposure: criticalPatterns,
      exposureScore: Math.min(100, totalPatterns * 10 + criticalPatterns * 20),
    };
  }

  calculateEducationalEffectiveness() {
    if (this.ethicalInterventions.length === 0) return 0;

    // Measure if interventions led to better decisions
    const interventionEffects = this.ethicalInterventions.map(
      (intervention) => {
        const subsequentBehavior = this.session.behavioralData.filter(
          (b) => new Date(b.timestamp) > new Date(intervention.timestamp),
        );

        return this.measureInterventionEffect(intervention, subsequentBehavior);
      },
    );

    return (
      interventionEffects.reduce((a, b) => a + b, 0) /
      interventionEffects.length
    );
  }

  generateEthicalRecommendations() {
    const recommendations = [];

    if (this.autonomyScore < 60) {
      recommendations.push({
        type: "autonomy_improvement",
        priority: "high",
        description: "Significant autonomy violations detected",
        actions: [
          "Improve information transparency",
          "Reduce coercive elements",
          "Enhance consent processes",
        ],
      });
    }

    if (this.session.coercionIndex > 50) {
      recommendations.push({
        type: "coercion_reduction",
        priority: "critical",
        description: "High coercion levels detected",
        actions: [
          "Remove urgency tactics",
          "Eliminate pre-checked options",
          "Provide clear opt-out mechanisms",
        ],
      });
    }

    return recommendations;
  }

  generateResearchInsights() {
    return {
      ethicalDesignPatterns: this.identifyEthicalDesignPatterns(),
      manipulationEffectiveness: this.analyzeManipulationEffectiveness(),
      userResistanceFactors: this.identifyUserResistanceFactors(),
      educationalOpportunities: this.identifyEducationalOpportunities(),
    };
  }

  // UTILITY METHODS
  recordEthicsViolation(type, details) {
    this.ethicsViolations.push({
      type: type,
      timestamp: Date.now(),
      details: details,
      phase: this.session.currentPhase,
      sessionContext: this.generateContextSnapshot(),
    });
  }

  logEthicalEvent(eventType, data) {
    this.session.recordDecisionPoint(`ethics_${eventType}`, {
      ethicsEngine: true,
      autonomyScore: this.calculateAutonomyScore(),
      violationsCount: this.ethicsViolations.length,
      ...data,
    });
  }

  generateContextSnapshot() {
    return {
      autonomyMetrics: { ...this.autonomyMetrics },
      activeViolations: Array.from(this.activeViolations),
      coercionIndex: this.session.coercionIndex,
      phase: this.session.currentPhase,
    };
  }

  describeElement(element) {
    return {
      tag: element.tagName,
      type: element.type,
      className: element.className,
      id: element.id,
      name: element.name,
      textContent: element.textContent
        ? element.textContent.substring(0, 100)
        : null,
    };
  }

  generateEthicsSnapshot() {
    return {
      autonomyScore: this.calculateAutonomyScore(),
      violationsCount: this.ethicsViolations.length,
      interventionsCount: this.ethicalInterventions.length,
      kantianCompliance: this.performKantianAnalysis().overallCompliance,
      consentQuality: this.assessInformedConsentQuality().overallScore,
    };
  }
}

// Supporting classes for comprehensive ethics analysis
class KantianEthicsFramework {
  initialize(session) {
    this.session = session;
  }
}

class InformedConsentAnalyzer {
  constructor() {
    this.consentElements = [];
    this.comprehensionTests = [];
  }
}

class AutonomyViolationTracker {
  constructor() {
    this.violations = [];
    this.mode = "passive_observation";
  }

  setMode(mode) {
    this.mode = mode;
  }
}

class ManipulationDetector {
  constructor() {
    this.sensitivity = "medium";
    this.detectedPatterns = [];
  }

  setSensitivity(level) {
    this.sensitivity = level;
  }
}

export { ComprehensiveEthicsEngine };
