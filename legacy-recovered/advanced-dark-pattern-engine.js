/**
 * Advanced Dark Pattern Detection & Simulation Engine
 *
 * This module provides comprehensive dark pattern detection, implementation,
 * and educational analysis for the Lotus 3-Phase simulation system.
 */

export class DarkPatternEngine {
  constructor(session, echo, config = {}) {
    this.session = session;
    this.echo = echo;
    this.config = {
      enableDetection: true,
      enableEducationalMode: false,
      ghostModeEnabled: false,
      logViolations: true,
      ...config,
    };

    // Dark pattern tracking
    this.detectedPatterns = new Map();
    this.violationLog = [];
    this.manipulationScore = 0;
    this.coercionIndex = 0;

    // Pattern categories
    this.patterns = {
      // Interface interference
      hidden_costs: { severity: "high", detected: false, instances: [] },
      bait_and_switch: { severity: "high", detected: false, instances: [] },
      misdirection: { severity: "medium", detected: false, instances: [] },

      // Obstruction
      roach_motel: { severity: "high", detected: false, instances: [] },
      privacy_zuckering: { severity: "medium", detected: false, instances: [] },

      // Sneaking
      sneak_into_basket: { severity: "medium", detected: false, instances: [] },
      friend_spam: { severity: "low", detected: false, instances: [] },

      // Social engineering
      false_urgency: { severity: "high", detected: false, instances: [] },
      bandwagon: { severity: "medium", detected: false, instances: [] },
      social_proof_manipulation: {
        severity: "medium",
        detected: false,
        instances: [],
      },

      // Forced action
      forced_continuity: { severity: "high", detected: false, instances: [] },
      hard_to_cancel: { severity: "high", detected: false, instances: [] },

      // Financial manipulation
      drip_pricing: { severity: "high", detected: false, instances: [] },
      subscription_trap: { severity: "high", detected: false, instances: [] },
      comparison_prevention: {
        severity: "medium",
        detected: false,
        instances: [],
      },
    };

    this.initialize();
  }

  initialize() {
    console.log("🕷️ Dark Pattern Engine initialized");
    this.setupDetectors();
    this.echo?.logAction("dark_pattern_engine_init", {
      patterns_monitored: Object.keys(this.patterns).length,
      detection_enabled: this.config.enableDetection,
    });
  }

  setupDetectors() {
    // Set up real-time DOM monitoring for dark patterns
    if (typeof document !== "undefined") {
      this.observeInterface();
      this.monitorUserInteractions();
    }
  }

  // ==== DARK PATTERN IMPLEMENTATION (Phase 1: Exploitative) ====

  implementTimePressurePattern(seconds, message = "⚡ Limited time offer!") {
    if (this.session.currentPhase !== 1) return;

    const pattern = {
      type: "false_urgency",
      severity: "high",
      message: message,
      duration: seconds,
      timestamp: new Date().toISOString(),
      psychologicalTarget: "System 1 thinking, prevents deliberation",
      educationalNote:
        "Artificial time pressure forces quick decisions and prevents careful consideration",
    };

    this.recordPattern("false_urgency", pattern);
    this.manipulationScore += 25;
    this.coercionIndex += 0.3;

    this.echo?.logAction("dark_pattern_implemented", {
      pattern: "false_urgency",
      details: pattern,
      manipulation_score: this.manipulationScore,
    });

    return pattern;
  }

  implementHiddenCosts(visibleCost, hiddenFees, totalCost) {
    const pattern = {
      type: "hidden_costs",
      severity: "high",
      visibleCost: visibleCost,
      hiddenFees: hiddenFees,
      totalCost: totalCost,
      hiddenPercentage: (hiddenFees / totalCost) * 100,
      timestamp: new Date().toISOString(),
      psychologicalTarget: "Anchoring bias, prevents true cost evaluation",
      educationalNote:
        "Hidden fees are revealed only after commitment to manipulate price perception",
    };

    this.recordPattern("hidden_costs", pattern);
    this.manipulationScore += 30;
    this.coercionIndex += 0.4;

    this.echo?.logAction("dark_pattern_implemented", {
      pattern: "hidden_costs",
      details: pattern,
    });

    return pattern;
  }

  implementForcedContinuity(
    serviceName,
    autoRenewal = true,
    hardToCancel = true,
  ) {
    const pattern = {
      type: "forced_continuity",
      severity: "high",
      serviceName: serviceName,
      autoRenewal: autoRenewal,
      hardToCancel: hardToCancel,
      timestamp: new Date().toISOString(),
      psychologicalTarget: "Sunk cost fallacy, inertia bias",
      educationalNote:
        "Auto-renewal with difficult cancellation creates ongoing revenue at user expense",
    };

    this.recordPattern("forced_continuity", pattern);
    this.manipulationScore += 35;
    this.coercionIndex += 0.5;

    return pattern;
  }

  implementSocialProofManipulation(fakeTestimonials, fakeCounters) {
    const pattern = {
      type: "social_proof_manipulation",
      severity: "medium",
      fakeTestimonials: fakeTestimonials,
      fakeCounters: fakeCounters,
      timestamp: new Date().toISOString(),
      psychologicalTarget: "Social proof bias, conformity pressure",
      educationalNote:
        "Fabricated social proof exploits our tendency to follow others",
    };

    this.recordPattern("social_proof_manipulation", pattern);
    this.manipulationScore += 20;
    this.coercionIndex += 0.25;

    return pattern;
  }

  implementDripPricing(basePrice, addOns, finalPrice) {
    const pattern = {
      type: "drip_pricing",
      severity: "high",
      basePrice: basePrice,
      addOns: addOns,
      finalPrice: finalPrice,
      priceIncrease: ((finalPrice - basePrice) / basePrice) * 100,
      timestamp: new Date().toISOString(),
      psychologicalTarget: "Anchoring bias, sunk cost fallacy",
      educationalNote:
        "Gradually revealing higher costs after initial commitment",
    };

    this.recordPattern("drip_pricing", pattern);
    this.manipulationScore += 28;
    this.coercionIndex += 0.35;

    return pattern;
  }

  // ==== PATTERN DETECTION (All Phases) ====

  detectPattern(patternType, elements = []) {
    if (!this.config.enableDetection) return null;

    const detection = {
      type: patternType,
      elements: elements,
      confidence: this.calculateDetectionConfidence(patternType, elements),
      timestamp: new Date().toISOString(),
      phase: this.session.currentPhase,
    };

    if (detection.confidence > 0.7) {
      this.recordDetection(patternType, detection);
    }

    return detection;
  }

  calculateDetectionConfidence(patternType, elements) {
    // Simplified confidence calculation based on element presence
    const indicators = this.getPatternIndicators(patternType);
    const foundIndicators = elements.filter((element) =>
      indicators.some((indicator) => element.includes(indicator)),
    );

    return foundIndicators.length / indicators.length;
  }

  getPatternIndicators(patternType) {
    const indicators = {
      false_urgency: [
        "countdown",
        "limited time",
        "hurry",
        "expires",
        "only.*left",
      ],
      hidden_costs: [
        "additional fees",
        "processing fee",
        "service charge",
        "hidden",
      ],
      forced_continuity: ["auto-renew", "automatically charged", "continuous"],
      social_proof_manipulation: [
        "customers bought",
        "people viewing",
        "testimonial",
      ],
      drip_pricing: ["starting at", "additional", "extra charge", "upgrade"],
    };

    return indicators[patternType] || [];
  }

  // ==== EDUCATIONAL ANALYSIS ====

  generateEducationalAnalysis() {
    const analysis = {
      sessionId: this.session.id,
      timestamp: new Date().toISOString(),
      phase: this.session.currentPhase,

      // Pattern summary
      patternsDetected: Array.from(this.detectedPatterns.keys()),
      totalPatterns: this.detectedPatterns.size,
      manipulationScore: this.manipulationScore,
      coercionIndex: this.coercionIndex,

      // Severity breakdown
      severityBreakdown: this.analyzeSeverity(),

      // Psychological impact
      psychologicalTargets: this.analyzePsychologicalTargets(),

      // User vulnerability assessment
      vulnerabilityAssessment: this.assessUserVulnerability(),

      // Educational insights
      educationalInsights: this.generateEducationalInsights(),

      // Protection recommendations
      protectionRecommendations: this.generateProtectionRecommendations(),
    };

    return analysis;
  }

  analyzeSeverity() {
    const breakdown = { high: 0, medium: 0, low: 0 };

    this.detectedPatterns.forEach((instances, patternType) => {
      const severity = this.patterns[patternType]?.severity || "medium";
      breakdown[severity] += instances.length;
    });

    return breakdown;
  }

  analyzePsychologicalTargets() {
    const targets = new Map();

    this.violationLog.forEach((violation) => {
      const target = violation.psychologicalTarget;
      if (target) {
        targets.set(target, (targets.get(target) || 0) + 1);
      }
    });

    return Object.fromEntries(targets);
  }

  assessUserVulnerability() {
    // Assess user's susceptibility to different manipulation types
    const vulnerability = {
      timePresssure: this.calculateTimeVulnerability(),
      socialProof: this.calculateSocialVulnerability(),
      priceManipulation: this.calculatePriceVulnerability(),
      overallRisk: "medium",
    };

    const avgVulnerability =
      Object.values(vulnerability)
        .filter((v) => typeof v === "number")
        .reduce((sum, v) => sum + v, 0) / 3;

    vulnerability.overallRisk =
      avgVulnerability > 0.7
        ? "high"
        : avgVulnerability > 0.4
          ? "medium"
          : "low";

    return vulnerability;
  }

  generateEducationalInsights() {
    const insights = [];

    if (this.manipulationScore > 50) {
      insights.push(
        "You were exposed to significant manipulation tactics designed to influence your decisions.",
      );
    }

    if (this.detectedPatterns.has("false_urgency")) {
      insights.push(
        "Time pressure tactics were used to prevent careful consideration of loan terms.",
      );
    }

    if (this.detectedPatterns.has("hidden_costs")) {
      insights.push(
        "Important cost information was concealed or de-emphasized to mislead you about the true price.",
      );
    }

    if (this.coercionIndex > 0.5) {
      insights.push(
        "The level of psychological coercion detected exceeds ethical lending standards.",
      );
    }

    insights.push(
      `You encountered ${this.detectedPatterns.size} different types of dark patterns during this session.`,
    );

    return insights;
  }

  generateProtectionRecommendations() {
    const recommendations = [];

    if (this.detectedPatterns.has("false_urgency")) {
      recommendations.push(
        "Always take time to consider financial decisions, regardless of artificial deadlines.",
      );
    }

    if (this.detectedPatterns.has("hidden_costs")) {
      recommendations.push(
        "Always ask for the total cost upfront and get it in writing before committing.",
      );
    }

    if (this.detectedPatterns.has("forced_continuity")) {
      recommendations.push(
        "Read all terms about automatic renewals and understand cancellation procedures before signing.",
      );
    }

    if (this.manipulationScore > 30) {
      recommendations.push(
        "Be especially cautious with lenders who use high-pressure or emotional tactics.",
      );
    }

    recommendations.push(
      "Compare offers from multiple lenders and consider credit union alternatives.",
    );
    recommendations.push(
      "Seek financial counseling if you're considering payday loans due to financial distress.",
    );

    return recommendations;
  }

  // ==== UTILITY METHODS ====

  recordPattern(patternType, details) {
    if (!this.detectedPatterns.has(patternType)) {
      this.detectedPatterns.set(patternType, []);
    }

    this.detectedPatterns.get(patternType).push(details);
    this.violationLog.push(details);

    if (this.patterns[patternType]) {
      this.patterns[patternType].detected = true;
      this.patterns[patternType].instances.push(details);
    }

    this.echo?.logAction("dark_pattern_recorded", {
      type: patternType,
      total_detected: this.detectedPatterns.size,
      manipulation_score: this.manipulationScore,
    });
  }

  recordDetection(patternType, detection) {
    this.recordPattern(patternType, detection);
  }

  observeInterface() {
    // DOM observation for automatic pattern detection
    if (typeof MutationObserver !== "undefined") {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          this.analyzeInterfaceChanges(mutation);
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    }
  }

  analyzeInterfaceChanges(mutation) {
    // Analyze DOM changes for dark pattern indicators
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          this.scanElementForPatterns(node);
        }
      });
    }
  }

  scanElementForPatterns(element) {
    const text = element.textContent?.toLowerCase() || "";
    const classList = Array.from(element.classList || []);

    // Check for urgency patterns
    if (text.match(/limited time|hurry|expires|only.*left/)) {
      this.detectPattern("false_urgency", [text]);
    }

    // Check for hidden cost patterns
    if (
      text.match(/additional fees|processing fee|service charge/) ||
      classList.some(
        (cls) => cls.includes("hidden") || cls.includes("fine-print"),
      )
    ) {
      this.detectPattern("hidden_costs", [text]);
    }
  }

  monitorUserInteractions() {
    // Track user behavior patterns that might indicate confusion or pressure
    if (typeof document !== "undefined") {
      document.addEventListener("click", (e) => {
        this.analyzeClickBehavior(e);
      });

      document.addEventListener("scroll", (e) => {
        this.analyzeScrollBehavior(e);
      });
    }
  }

  analyzeClickBehavior(event) {
    // Analyze clicking patterns for signs of manipulation effectiveness
    const element = event.target;
    const hesitationTime = this.measureHesitation(element);

    if (hesitationTime < 100) {
      // Very quick click might indicate pressure
      this.echo?.logAction("rapid_decision", {
        element: element.tagName,
        hesitation: hesitationTime,
        possible_pressure: true,
      });
    }
  }

  analyzeScrollBehavior(event) {
    // Rapid scrolling might indicate confusion or overwhelm
    const scrollSpeed = this.calculateScrollSpeed();
    if (scrollSpeed > 1000) {
      // Pixels per second
      this.echo?.logAction("rapid_scroll", {
        speed: scrollSpeed,
        possible_overwhelm: true,
      });
    }
  }

  // Helper methods
  calculateTimeVulnerability() {
    return Math.random() * 0.5 + 0.3;
  }
  calculateSocialVulnerability() {
    return Math.random() * 0.5 + 0.3;
  }
  calculatePriceVulnerability() {
    return Math.random() * 0.5 + 0.3;
  }
  measureHesitation(element) {
    return Math.random() * 1000;
  }
  calculateScrollSpeed() {
    return Math.random() * 2000;
  }

  // Export methods
  exportDetectionReport() {
    return {
      detectedPatterns: Object.fromEntries(this.detectedPatterns),
      violationLog: this.violationLog,
      manipulationScore: this.manipulationScore,
      coercionIndex: this.coercionIndex,
      educationalAnalysis: this.generateEducationalAnalysis(),
    };
  }

  getManipulationScore() {
    return this.manipulationScore;
  }

  getCoercionIndex() {
    return this.coercionIndex;
  }

  getDetectedPatterns() {
    return Array.from(this.detectedPatterns.keys());
  }
}

export default DarkPatternEngine;
