/**
 * Advanced Behavioral Analysis Engine
 * Recovered from autonomy_theater.js and related psychological profiling modules
 * Part of the original 96,000+ line Lotus codebase
 */

// ============================================
// PSYCHOLOGICAL MANIPULATION DETECTION SYSTEM
// ============================================

export class PsychologicalManipulationEngine {
  constructor() {
    this.manipulationTechniques = this.loadManipulationCatalog();
    this.cognitiveVulnerabilities = this.initializeCognitiveVulnerabilities();
    this.realTimeTracking = new RealTimeManipulationTracker();
  }
  
  loadManipulationCatalog() {
    return {
      // Cialdini's 6 Principles of Persuasion - Weaponized
      reciprocity: {
        technique: 'False Reciprocity',
        mechanism: 'Frame loan as lender doing borrower a favor',
        examples: [
          '"We\'re helping you avoid worse consequences"',
          '"This is a service we provide to help you"',
          '"We care about your financial wellbeing"'
        ],
        effectiveness: 0.72,
        vulnerability: 'People feel obligated to return favors'
      },
      
      commitment: {
        technique: 'Forced Commitment Escalation',
        mechanism: 'Get small commitments that lead to larger ones',
        examples: [
          'Start with application "just to see if you qualify"',
          'Pre-approve for amount, then upsell',
          'Sunk cost: "You\'ve already invested time in this process"'
        ],
        effectiveness: 0.78,
        vulnerability: 'People want to appear consistent with past actions'
      },
      
      socialProof: {
        technique: 'Manufactured Social Validation',
        mechanism: 'Create false sense of widespread acceptance',
        examples: [
          '"Thousands of your neighbors have been approved"',
          '"Most people in your situation choose this option"',
          '"Join millions of satisfied customers"'
        ],
        effectiveness: 0.69,
        vulnerability: 'People look to others for behavioral cues'
      },
      
      authority: {
        technique: 'False Expertise & Legitimacy',
        mechanism: 'Position lender as financial expert helping borrower',
        examples: [
          '"Our financial experts recommend..."',
          '"Licensed and regulated for your protection"',
          '"Trusted by financial professionals"'
        ],
        effectiveness: 0.74,
        vulnerability: 'People defer to perceived authority'
      },
      
      liking: {
        technique: 'Artificial Rapport & Similarity',
        mechanism: 'Create false sense of understanding and similarity',
        examples: [
          '"We understand your situation"',
          '"We\'ve helped people just like you"',
          '"We know how hard it is to make ends meet"'
        ],
        effectiveness: 0.66,
        vulnerability: 'People more likely to say yes to those they like'
      },
      
      scarcity: {
        technique: 'Artificial Urgency & Scarcity',
        mechanism: 'Create false time pressure and limited availability',
        examples: [
          '"Only 3 approvals left today"',
          '"This rate expires in 10 minutes"',
          '"Special offer won\'t last long"'
        ],
        effectiveness: 0.81,
        vulnerability: 'People fear missing out on opportunities'
      }
    };
  }
  
  initializeCognitiveVulnerabilities() {
    return {
      // System 1 vs System 2 Thinking Exploitation
      fastThinking: {
        triggers: ['Time pressure', 'Emotional stress', 'Cognitive overload'],
        characteristics: ['Intuitive', 'Emotional', 'Pattern-based'],
        manipulation: 'Create conditions that favor fast, emotional decisions',
        prevention: 'Slow down decision-making process'
      },
      
      // Specific Cognitive Biases
      biases: {
        availabilityHeuristic: {
          description: 'Judge probability by easily recalled examples',
          exploitation: 'Highlight salient negative consequences of not borrowing',
          example: '"Your electricity could be shut off tomorrow"'
        },
        
        representativenessHeuristic: {
          description: 'Judge probability by similarity to mental prototypes',
          exploitation: 'Position payday loans as normal financial product',
          example: '"Just like any other loan, but faster"'
        },
        
        anchoringBias: {
          description: 'Over-rely on first piece of information',
          exploitation: 'Lead with high amounts or dramatic consequences',
          example: '"Up to $1,500!" followed by smaller offer'
        },
        
        confirmationBias: {
          description: 'Seek information confirming existing beliefs',
          exploitation: 'Provide information supporting borrowing decision',
          example: '"You already know you need this cash"'
        },
        
        optimismBias: {
          description: 'Overestimate likelihood of positive outcomes',
          exploitation: 'Encourage unrealistic repayment expectations',
          example: '"You\'ll have the money by next payday"'
        }
      }
    };
  }
  
  analyzeManipulationSusceptibility(userProfile, sessionData) {
    const susceptibilityFactors = {
      emotional: this.assessEmotionalVulnerability(userProfile, sessionData),
      cognitive: this.assessCognitiveLoad(sessionData),
      situational: this.assessSituationalPressure(userProfile),
      temporal: this.assessTemporalFactors(sessionData),
      social: this.assessSocialFactors(userProfile)
    };
    
    const overallSusceptibility = this.computeOverallSusceptibility(susceptibilityFactors);
    
    return {
      susceptibilityFactors,
      overallScore: overallSusceptibility,
      recommendedTechniques: this.selectOptimalTechniques(susceptibilityFactors),
      ethicalConcerns: this.flagEthicalIssues(overallSusceptibility, userProfile),
      manipulationRisk: this.categorizeManipulationRisk(overallSusceptibility)
    };
  }
  
  assessEmotionalVulnerability(userProfile, sessionData) {
    let score = 0;
    
    // Financial stress indicators
    if (userProfile.hasOverdrafts) score += 0.2;
    if (userProfile.behindOnBills) score += 0.25;
    if (userProfile.recentJobLoss) score += 0.3;
    if (userProfile.medicalEmergency) score += 0.25;
    
    // Behavioral indicators from session
    if (sessionData.hesitationTime > 300) score += 0.15; // Over 5 minutes
    if (sessionData.multipleAmountChanges) score += 0.1;
    if (sessionData.timeOfDay === 'late_night') score += 0.15;
    
    return Math.min(score, 1.0);
  }
  
  assessCognitiveLoad(sessionData) {
    let score = 0;
    
    // Information processing indicators
    if (sessionData.device === 'mobile') score += 0.2; // Smaller screen
    if (sessionData.multitasking) score += 0.15;
    if (sessionData.rapidClicking) score += 0.1;
    if (sessionData.formErrors > 2) score += 0.15;
    if (sessionData.backtracking) score += 0.1;
    
    return Math.min(score, 1.0);
  }
  
  assessSituationalPressure(userProfile) {
    let score = 0;
    
    // External pressure factors
    if (userProfile.immediateBillDue) score += 0.3;
    if (userProfile.utilityCutoffNotice) score += 0.35;
    if (userProfile.rentEvictionThreat) score += 0.4;
    if (userProfile.childcareNeeds) score += 0.25;
    if (userProfile.transportationCrisis) score += 0.2;
    
    return Math.min(score, 1.0);
  }
  
  selectOptimalTechniques(susceptibilityFactors) {
    const techniques = [];
    
    if (susceptibilityFactors.emotional > 0.6) {
      techniques.push('loss_aversion', 'rescue_narrative', 'false_altruism');
    }
    
    if (susceptibilityFactors.cognitive > 0.5) {
      techniques.push('information_overload', 'fast_decision_pressure');
    }
    
    if (susceptibilityFactors.situational > 0.7) {
      techniques.push('urgency_amplification', 'consequence_magnification');
    }
    
    if (susceptibilityFactors.temporal > 0.4) {
      techniques.push('artificial_scarcity', 'limited_time_offers');
    }
    
    return techniques;
  }
}

// ============================================
// REAL-TIME MANIPULATION TRACKING
// ============================================

export class RealTimeManipulationTracker {
  constructor() {
    this.trackingData = {
      mouseMoves: [],
      clickPatterns: [],
      hesitationPoints: [],
      formInteractions: [],
      pageVisits: [],
      timeOnElements: new Map()
    };
    this.manipulationEvents = [];
  }
  
  trackUserBehavior(event, elementId, metadata = {}) {
    const timestamp = Date.now();
    
    switch (event) {
      case 'hesitation':
        this.trackHesitation(elementId, timestamp, metadata);
        break;
      case 'rapid_clicking':
        this.trackRapidClicking(elementId, timestamp);
        break;
      case 'form_error':
        this.trackFormError(elementId, timestamp, metadata);
        break;
      case 'page_revisit':
        this.trackPageRevisit(elementId, timestamp);
        break;
      case 'element_focus':
        this.trackElementFocus(elementId, timestamp, metadata);
        break;
    }
    
    this.analyzeManipulationOpportunity(event, elementId, timestamp, metadata);
  }
  
  trackHesitation(elementId, timestamp, metadata) {
    const hesitation = {
      element: elementId,
      timestamp,
      duration: metadata.duration,
      context: metadata.context,
      beforeElement: metadata.beforeElement,
      afterElement: metadata.afterElement
    };
    
    this.trackingData.hesitationPoints.push(hesitation);
    
    // Hesitation indicates uncertainty - manipulation opportunity
    if (metadata.duration > 5000) { // 5+ seconds
      this.flagManipulationOpportunity('extended_hesitation', elementId, {
        duration: metadata.duration,
        suggestedTactic: 'urgency_pressure',
        vulnerability: 'decision_uncertainty'
      });
    }
  }
  
  trackRapidClicking(elementId, timestamp) {
    this.trackingData.clickPatterns.push({
      element: elementId,
      timestamp,
      pattern: 'rapid'
    });
    
    // Rapid clicking indicates urgency/desperation
    this.flagManipulationOpportunity('desperation_clicking', elementId, {
      suggestedTactic: 'false_reassurance',
      vulnerability: 'emotional_decision_making'
    });
  }
  
  analyzeManipulationOpportunity(event, elementId, timestamp, metadata) {
    const opportunities = {
      'hesitation_on_apr': {
        condition: elementId.includes('apr') && event === 'hesitation',
        tactic: 'distract_from_apr',
        message: 'Emphasize speed and convenience instead'
      },
      
      'form_errors_increasing': {
        condition: event === 'form_error' && this.countRecentFormErrors() > 2,
        tactic: 'reduce_cognitive_load',
        message: 'Simplify form, reduce required fields'
      },
      
      'multiple_amount_changes': {
        condition: elementId.includes('amount') && this.countAmountChanges() > 3,
        tactic: 'anchor_higher_amount',
        message: 'Suggest "most customers choose" higher amount'
      },
      
      'late_night_session': {
        condition: new Date(timestamp).getHours() > 22,
        tactic: 'exploit_decision_fatigue',
        message: 'Use urgency and simplified choices'
      }
    };
    
    Object.entries(opportunities).forEach(([opportunityType, config]) => {
      if (config.condition) {
        this.flagManipulationOpportunity(opportunityType, elementId, {
          tactic: config.tactic,
          message: config.message,
          timestamp,
          metadata
        });
      }
    });
  }
  
  flagManipulationOpportunity(type, elementId, details) {
    this.manipulationEvents.push({
      type,
      element: elementId,
      timestamp: Date.now(),
      details,
      exploited: false // Track whether opportunity was used
    });
  }
  
  generateBehavioralProfile() {
    const profile = {
      decisionPattern: this.analyzeDecisionPattern(),
      vulnerabilityMarkers: this.identifyVulnerabilityMarkers(),
      manipulationSusceptibility: this.calculateSusceptibility(),
      optimalApproach: this.recommendOptimalApproach()
    };
    
    return profile;
  }
  
  analyzeDecisionPattern() {
    const hesitations = this.trackingData.hesitationPoints;
    const avgHesitation = hesitations.reduce((sum, h) => sum + h.duration, 0) / hesitations.length;
    
    if (avgHesitation < 2000) return 'impulsive';
    if (avgHesitation < 10000) return 'moderate';
    return 'deliberate';
  }
  
  identifyVulnerabilityMarkers() {
    const markers = [];
    
    if (this.trackingData.hesitationPoints.length > 5) {
      markers.push('high_uncertainty');
    }
    
    if (this.countFormErrors() > 3) {
      markers.push('cognitive_overload');
    }
    
    if (this.trackingData.clickPatterns.filter(c => c.pattern === 'rapid').length > 3) {
      markers.push('emotional_urgency');
    }
    
    return markers;
  }
  
  calculateSusceptibility() {
    let score = 0;
    
    // High hesitation = uncertainty = vulnerability
    if (this.trackingData.hesitationPoints.length > 5) score += 0.3;
    
    // Form errors = cognitive load = vulnerability
    if (this.countFormErrors() > 2) score += 0.2;
    
    // Late night = fatigue = vulnerability
    const lateNightEvents = this.trackingData.pageVisits.filter(
      v => new Date(v.timestamp).getHours() > 22
    );
    if (lateNightEvents.length > 0) score += 0.2;
    
    // Mobile device = reduced attention = vulnerability
    if (this.isLikelyMobileUser()) score += 0.15;
    
    return Math.min(score, 1.0);
  }
  
  countRecentFormErrors() {
    const recent = Date.now() - 300000; // Last 5 minutes
    return this.trackingData.formInteractions.filter(
      f => f.type === 'error' && f.timestamp > recent
    ).length;
  }
  
  countFormErrors() {
    return this.trackingData.formInteractions.filter(f => f.type === 'error').length;
  }
  
  countAmountChanges() {
    return this.trackingData.formInteractions.filter(
      f => f.element && f.element.includes('amount')
    ).length;
  }
  
  isLikelyMobileUser() {
    // Simplified mobile detection based on interaction patterns
    const rapidClicks = this.trackingData.clickPatterns.filter(c => c.pattern === 'rapid').length;
    const formErrors = this.countFormErrors();
    
    return rapidClicks > 2 || formErrors > 3;
  }
}

// ============================================
// KANTIAN ETHICS VIOLATION ANALYZER
// ============================================

export class KantianEthicsAnalyzer {
  constructor() {
    this.categoricalImperative = this.initializeCategoricalImperative();
    this.humanityFormula = this.initializeHumanityFormula();
    this.violationTypes = this.loadViolationTypes();
  }
  
  initializeCategoricalImperative() {
    return {
      universalizabilityTest: {
        question: "What if everyone did this?",
        application: "If all lenders used these tactics, would the financial system function?",
        paydayLoanFailure: "Universal predatory lending would collapse economy and trust"
      },
      
      moralLawTest: {
        question: "Can this be a universal moral law?",
        application: "Can 'exploit desperate people for profit' be universal law?",
        paydayLoanFailure: "Exploitation cannot be universalized without contradiction"
      }
    };
  }
  
  initializeHumanityFormula() {
    return {
      formula: "Act so that you treat humanity, whether in your own person or in that of another, always as an end and never merely as a means",
      
      violations: {
        treatingAsMeansOnly: {
          description: "Using borrower solely for profit extraction",
          examples: [
            "Design products to maximize fees, not help borrower",
            "Target vulnerable populations for higher profits",
            "Create debt traps to ensure repeat business"
          ]
        },
        
        denyingAutonomy: {
          description: "Undermining borrower's rational decision-making",
          examples: [
            "Use time pressure to prevent deliberation",
            "Hide true costs to prevent informed consent",
            "Exploit cognitive biases to manipulate choices"
          ]
        },
        
        ignoringDignity: {
          description: "Failing to respect human dignity",
          examples: [
            "Target people in desperate situations",
            "Use shame and fear as sales tactics",
            "Ignore borrower's long-term wellbeing"
          ]
        }
      }
    };
  }
  
  loadViolationTypes() {
    return {
      informedConsent: {
        requirement: "Borrower must understand true costs and risks",
        violations: [
          "Hidden APR in fine print",
          "Emphasize fee, minimize interest rate",
          "Complex terms designed to confuse",
          "No clear comparison to alternatives"
        ],
        severity: "high",
        kantianPrinciple: "Rational autonomy requires informed decision-making"
      },
      
      voluntariness: {
        requirement: "Choice must be free from coercion",
        violations: [
          "Artificial urgency and time pressure",
          "Exploitation of desperate circumstances",
          "False necessity framing",
          "Threats of consequences for not borrowing"
        ],
        severity: "high",
        kantianPrinciple: "Moral worth requires freedom of choice"
      },
      
      truthfulness: {
        requirement: "All communications must be honest",
        violations: [
          "False or misleading testimonials",
          "Exaggerated approval claims",
          "Hidden fees and costs",
          "Misrepresentation of terms"
        ],
        severity: "medium",
        kantianPrinciple: "Lying treats others as mere means"
      },
      
      respectForPersons: {
        requirement: "Treat borrowers as rational agents",
        violations: [
          "Target cognitive vulnerabilities",
          "Exploit emotional distress",
          "Manipulate decision-making processes",
          "Ignore borrower's stated preferences"
        ],
        severity: "high",
        kantianPrinciple: "Humans deserve respect as rational beings"
      }
    };
  }
  
  analyzeEthicalViolations(loanProcess, manipulationTactics, userProfile) {
    const violations = [];
    
    // Analyze each aspect of the loan process
    violations.push(...this.analyzeInformedConsent(loanProcess));
    violations.push(...this.analyzeVoluntariness(manipulationTactics));
    violations.push(...this.analyzeTruthfulness(loanProcess));
    violations.push(...this.analyzeRespectForPersons(manipulationTactics, userProfile));
    
    const severity = this.calculateOverallSeverity(violations);
    const kantianJustification = this.generateKantianJustification(violations);
    
    return {
      violations,
      overallSeverity: severity,
      kantianAnalysis: kantianJustification,
      ethicalScore: this.calculateEthicalScore(violations),
      recommendations: this.generateEthicalRecommendations(violations)
    };
  }
  
  analyzeInformedConsent(loanProcess) {
    const violations = [];
    
    if (!loanProcess.aprProminentlyDisplayed) {
      violations.push({
        type: 'informed_consent',
        severity: 'high',
        description: 'APR not prominently displayed',
        kantianViolation: 'Prevents rational deliberation by hiding true cost',
        evidence: 'APR buried in fine print or not shown'
      });
    }
    
    if (loanProcess.emphasizeFeeOverAPR) {
      violations.push({
        type: 'informed_consent',
        severity: 'high',
        description: 'Emphasis on fee rather than APR',
        kantianViolation: 'Misleads borrower about true cost',
        evidence: 'Marketing emphasizes "$15 fee" over "391% APR"'
      });
    }
    
    if (!loanProcess.alternativesDiscussed) {
      violations.push({
        type: 'informed_consent',
        severity: 'medium',
        description: 'No discussion of alternatives',
        kantianViolation: 'Limits rational choice by hiding options',
        evidence: 'No mention of credit unions, family loans, etc.'
      });
    }
    
    return violations;
  }
  
  analyzeVoluntariness(manipulationTactics) {
    const violations = [];
    
    if (manipulationTactics.timePresssure) {
      violations.push({
        type: 'voluntariness',
        severity: 'high',
        description: 'Artificial time pressure',
        kantianViolation: 'Undermines rational deliberation',
        evidence: 'Countdown timers, "limited time" offers'
      });
    }
    
    if (manipulationTactics.exploitDesperation) {
      violations.push({
        type: 'voluntariness',
        severity: 'high',
        description: 'Exploitation of desperate circumstances',
        kantianViolation: 'Takes advantage of compromised decision-making',
        evidence: 'Target financially stressed individuals'
      });
    }
    
    return violations;
  }
  
  calculateEthicalScore(violations) {
    let deductions = 0;
    
    violations.forEach(violation => {
      switch (violation.severity) {
        case 'high': deductions += 25; break;
        case 'medium': deductions += 15; break;
        case 'low': deductions += 5; break;
      }
    });
    
    return Math.max(0, 100 - deductions);
  }
  
  generateKantianJustification(violations) {
    const highSeverityViolations = violations.filter(v => v.severity === 'high');
    
    if (highSeverityViolations.length === 0) {
      return "Practice respects human autonomy and dignity";
    }
    
    const justification = {
      categoricalImperativeFailure: "These practices cannot be universalized without logical contradiction",
      humanityFormulaViolation: "Borrowers are treated merely as means to profit, not as ends in themselves",
      specificViolations: highSeverityViolations.map(v => v.kantianViolation),
      conclusion: "These practices violate fundamental principles of human dignity and rational autonomy"
    };
    
    return justification;
  }
}

// ============================================
// COMPREHENSIVE USER CHOICE ANALYSIS
// ============================================

export class UserChoiceAnalysisEngine {
  constructor() {
    this.choiceTypes = this.initializeChoiceTypes();
    this.autonomyMetrics = this.loadAutonomyMetrics();
    this.decisionQuality = new DecisionQualityAnalyzer();
  }
  
  initializeChoiceTypes() {
    return {
      informed: {
        criteria: ['Full information available', 'Sufficient time', 'Understanding demonstrated'],
        autonomyLevel: 'high',
        manipulation: 'minimal'
      },
      
      pressured: {
        criteria: ['Time constraints', 'Emotional pressure', 'Limited options presented'],
        autonomyLevel: 'medium',
        manipulation: 'moderate'
      },
      
      manipulated: {
        criteria: ['Hidden information', 'Cognitive exploitation', 'False urgency'],
        autonomyLevel: 'low',
        manipulation: 'high'
      },
      
      coerced: {
        criteria: ['No real alternatives', 'Threats', 'Exploitation of desperation'],
        autonomyLevel: 'none',
        manipulation: 'extreme'
      }
    };
  }
  
  analyzeChoice(userAction, context, sessionData) {
    const analysis = {
      choiceType: this.classifyChoice(userAction, context),
      autonomyLevel: this.measureAutonomy(context, sessionData),
      informationQuality: this.assessInformationQuality(context),
      timeAdequacy: this.assessTimeAdequacy(sessionData),
      pressureLevel: this.measurePressure(context),
      manipulationDetected: this.detectManipulation(context, sessionData),
      realChoiceAvailable: this.assessRealChoice(context)
    };
    
    return {
      ...analysis,
      overallScore: this.calculateChoiceQualityScore(analysis),
      kantianAssessment: this.assessKantianChoiceQuality(analysis),
      recommendations: this.generateChoiceImprovements(analysis)
    };
  }
  
  classifyChoice(userAction, context) {
    const manipulationIndicators = context.manipulationTactics?.length || 0;
    const pressureIndicators = context.pressureFactors?.length || 0;
    const informationHidden = context.hiddenInformation || false;
    
    if (manipulationIndicators > 3 || informationHidden) {
      return 'manipulated';
    } else if (pressureIndicators > 2) {
      return 'pressured';
    } else if (context.adequateInformation && context.sufficientTime) {
      return 'informed';
    } else {
      return 'pressured';
    }
  }
  
  measureAutonomy(context, sessionData) {
    let autonomyScore = 100;
    
    // Information factors
    if (context.aprHidden) autonomyScore -= 25;
    if (!context.alternativesPresented) autonomyScore -= 20;
    if (context.termsComplex) autonomyScore -= 15;
    
    // Pressure factors
    if (context.timeConstraints) autonomyScore -= 20;
    if (context.artificialUrgency) autonomyScore -= 25;
    if (context.exploitEmergency) autonomyScore -= 30;
    
    // Manipulation factors
    if (sessionData.darkPatternsUsed?.length > 0) {
      autonomyScore -= sessionData.darkPatternsUsed.length * 10;
    }
    
    return Math.max(0, autonomyScore);
  }
  
  assessInformationQuality(context) {
    const quality = {
      completeness: this.assessInformationCompleteness(context),
      clarity: this.assessInformationClarity(context),
      prominence: this.assessInformationProminence(context),
      accuracy: this.assessInformationAccuracy(context)
    };
    
    const avgScore = Object.values(quality).reduce((sum, score) => sum + score, 0) / 4;
    
    return {
      ...quality,
      overallScore: avgScore,
      adequate: avgScore > 70
    };
  }
  
  assessInformationCompleteness(context) {
    let score = 100;
    
    if (!context.aprDisplayed) score -= 40;
    if (!context.totalCostShown) score -= 30;
    if (!context.alternativesMentioned) score -= 20;
    if (!context.risksDisclosed) score -= 20;
    
    return Math.max(0, score);
  }
  
  detectManipulation(context, sessionData) {
    const manipulations = [];
    
    // Dark patterns
    if (context.preCheckedBoxes) {
      manipulations.push({
        type: 'default_bias',
        severity: 'medium',
        description: 'Pre-checked consent boxes'
      });
    }
    
    if (context.urgencyTimer) {
      manipulations.push({
        type: 'artificial_urgency',
        severity: 'high',
        description: 'Countdown timer creating false urgency'
      });
    }
    
    if (context.hiddenFees) {
      manipulations.push({
        type: 'hidden_costs',
        severity: 'high',
        description: 'Fees not clearly disclosed'
      });
    }
    
    // Behavioral exploitation
    if (sessionData.vulnerabilityExploited) {
      manipulations.push({
        type: 'vulnerability_exploitation',
        severity: 'high',
        description: 'Targeting known vulnerabilities'
      });
    }
    
    return manipulations;
  }
}

// Export comprehensive behavioral analysis system
export const psychManipulationEngine = new PsychologicalManipulationEngine();
export const realTimeTracker = new RealTimeManipulationTracker();
export const kantianAnalyzer = new KantianEthicsAnalyzer();
export const choiceAnalyzer = new UserChoiceAnalysisEngine();
