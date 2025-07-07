/**
 * autonomy-theater.ts - Advanced 3-Phase Autonomy Theater Engine
 * TypeScript port of the legacy autonomy_theater.js with enhanced 3-phase integration
 * 
 * 🎭 PHASE 1: Exploitative - Maximum autonomy violations and manipulation
 * 🌱 PHASE 2: Ethical - Autonomy-preserving ethical lending simulation
 * 🪞 PHASE 3: Reflection - Comprehensive analysis and educational insights
 */

import { LotusSession, AutonomyViolation, UserChoice } from '../types/lotus';

export interface AutonomyTrapConfig {
  phase: 1 | 2 | 3;
  maxViolationSeverity: 'low' | 'medium' | 'high' | 'critical';
  enableKantianAnalysis: boolean;
  enableBehavioralProfiling: boolean;
  ghostModeEnabled: boolean;
}

export interface KantianAnalysis {
  universalizabilityTest: 'PASSED' | 'FAILED';
  humanityFormula: 'PASSED' | 'FAILED';
  autonomyFormula: 'PASSED' | 'FAILED';
  overallAssessment: 'ETHICALLY_SOUND' | 'ETHICALLY_PROBLEMATIC' | 'SEVERELY_PROBLEMATIC';
  violationDetails: string[];
}

export interface AutonomyReport {
  choiceIntegrityScore: number;
  violations: AutonomyViolation[];
  activeTrapTypes: string[];
  timeline: TimelineEvent[];
  ethicalAssessment: string;
  kantianAnalysis: KantianAnalysis;
  recommendations: string[];
  phaseSpecificMetrics: any;
}

export interface TimelineEvent {
  event: string;
  timestamp: string;
  phase: number;
  autonomyImpact: 'low' | 'medium' | 'high' | 'critical';
  details: any;
}

export interface TrapType {
  timePressure: boolean;
  defaultBias: boolean;
  sunkCostFallacy: boolean;
  socialProof: boolean;
  authorityPressure: boolean;
  scarcityIllusion: boolean;
  cognitiveOverload: boolean;
  darkPatternUI: boolean;
  feeObfuscation: boolean;
  rolloverEncouragement: boolean;
}

/**
 * Advanced 3-Phase Autonomy Theater Engine
 * Tracks autonomy violations and provides phase-specific ethical analysis
 */
export class ThreePhaseAutonomyTheater {
  private session: LotusSession;
  private config: AutonomyTrapConfig;
  private autonomyViolations: AutonomyViolation[] = [];
  private manipulationTactics: any[] = [];
  private timelineEvents: TimelineEvent[] = [];
  private choiceIntegrityScore: number = 100;
  private trapTypes: TrapType;
  private currentPhase: 1 | 2 | 3;

  constructor(session: LotusSession, config: AutonomyTrapConfig) {
    this.session = session;
    this.config = config;
    this.currentPhase = config.phase;
    this.trapTypes = this.initializeTrapTypes();
  }

  private initializeTrapTypes(): TrapType {
    return {
      timePressure: false,
      defaultBias: false,
      sunkCostFallacy: false,
      socialProof: false,
      authorityPressure: false,
      scarcityIllusion: false,
      cognitiveOverload: false,
      darkPatternUI: false,
      feeObfuscation: false,
      rolloverEncouragement: false
    };
  }

  /**
   * PHASE 1: EXPLOITATIVE TACTICS
   * Maximum autonomy violations for educational demonstration
   */
  async applyExploitativeTimePressure(seconds: number, offerId: string): Promise<void> {
    if (this.currentPhase !== 1) return;

    this.trapTypes.timePressure = true;
    this.choiceIntegrityScore -= 20; // Higher penalty in Phase 1

    const violation: AutonomyViolation = {
      type: 'time_pressure',
      description: `Artificial urgency: ${seconds}s countdown to force quick decisions`,
      severity: 'high',
      kantianViolation: 'Undermines rational deliberation and autonomous choice',
      timestamp: new Date().toISOString(),
      hiddenFromUser: false,
      phase: 1,
      coercionLevel: 0.8
    };

    this.autonomyViolations.push(violation);
    this.addTimelineEvent('exploitative_countdown_started', {
      offerId,
      duration: seconds,
      autonomyImpact: 'critical',
      educationalNote: 'Real payday lenders use countdown timers to prevent careful consideration'
    });

    // Log dark pattern for comprehensive tracking
    this.session.darkPatterns = this.session.darkPatterns || [];
    this.session.darkPatterns.push({
      type: `ExploitativeTimePressure_${seconds}sec`,
      timestamp: new Date().toISOString(),
      phase: 1,
      severity: 'high'
    });
  }

  /**
   * Apply misleading social proof (fake testimonials, fabricated reviews)
   */
  presentMisleadingTestimonial(testimonial: string, author: string): void {
    if (this.currentPhase !== 1) return;

    this.trapTypes.socialProof = true;
    this.choiceIntegrityScore -= 15;

    const violation: AutonomyViolation = {
      type: 'misleading_social_proof',
      description: `Fabricated testimonial: "${testimonial}" - ${author}`,
      severity: 'medium',
      kantianViolation: 'Deception violates duty to truth and respect for persons',
      timestamp: new Date().toISOString(),
      hiddenFromUser: false,
      phase: 1,
      coercionLevel: 0.6
    };

    this.autonomyViolations.push(violation);
    this.addTimelineEvent('fake_testimonial_displayed', {
      content: testimonial,
      author,
      autonomyImpact: 'medium',
      educationalNote: 'Many predatory lenders use fake testimonials to build false trust'
    });
  }

  /**
   * Create artificial scarcity and false urgency
   */
  createArtificialScarcity(scarcityMessage: string): void {
    if (this.currentPhase !== 1) return;

    this.trapTypes.scarcityIllusion = true;
    this.choiceIntegrityScore -= 18;

    const violation: AutonomyViolation = {
      type: 'artificial_scarcity',
      description: `False scarcity claim: "${scarcityMessage}"`,
      severity: 'high',
      kantianViolation: 'Creates false urgency through deliberate deception',
      timestamp: new Date().toISOString(),
      hiddenFromUser: false,
      phase: 1,
      coercionLevel: 0.7
    };

    this.autonomyViolations.push(violation);
    this.addTimelineEvent('artificial_scarcity_applied', {
      message: scarcityMessage,
      autonomyImpact: 'high',
      educationalNote: 'Scarcity tactics exploit cognitive biases to rush decisions'
    });
  }

  /**
   * PHASE 2: ETHICAL LENDING SIMULATION
   * Demonstrate autonomy-preserving practices
   */
  demonstrateTransparentPricing(): void {
    if (this.currentPhase !== 2) return;

    this.choiceIntegrityScore += 15; // Positive score for ethical behavior

    this.addTimelineEvent('transparent_pricing_displayed', {
      autonomyImpact: 'low',
      ethicalPractice: true,
      educationalNote: 'Ethical lenders provide clear, prominent pricing information'
    });
  }

  provideUnbiasedEducation(): void {
    if (this.currentPhase !== 2) return;

    this.choiceIntegrityScore += 20;

    this.addTimelineEvent('unbiased_education_provided', {
      autonomyImpact: 'low',
      ethicalPractice: true,
      educationalNote: 'Ethical lenders educate borrowers about risks and alternatives'
    });
  }

  /**
   * PHASE 3: REFLECTION AND ANALYSIS
   * Comprehensive autonomy violation analysis
   */
  generateComprehensiveReport(): AutonomyReport {
    const kantianAnalysis = this.generateKantianAnalysis();
    const phaseSpecificMetrics = this.calculatePhaseMetrics();

    return {
      choiceIntegrityScore: this.choiceIntegrityScore,
      violations: this.autonomyViolations,
      activeTrapTypes: Object.keys(this.trapTypes).filter(key => 
        this.trapTypes[key as keyof TrapType]
      ),
      timeline: this.timelineEvents,
      ethicalAssessment: this.generateEthicalAssessment(),
      kantianAnalysis,
      recommendations: this.generateRestorationRecommendations(),
      phaseSpecificMetrics
    };
  }

  /**
   * Generate Kantian ethical analysis based on violations
   */
  private generateKantianAnalysis(): KantianAnalysis {
    const deceptionViolations = this.autonomyViolations.filter(v => 
      v.kantianViolation.toLowerCase().includes('deception')
    );
    const autonomyViolations = this.autonomyViolations.filter(v => 
      v.kantianViolation.toLowerCase().includes('autonomy')
    );
    const humanityViolations = this.autonomyViolations.filter(v => 
      v.kantianViolation.toLowerCase().includes('respect for persons') ||
      v.kantianViolation.toLowerCase().includes('means')
    );

    const totalViolations = deceptionViolations.length + autonomyViolations.length + humanityViolations.length;

    return {
      universalizabilityTest: deceptionViolations.length > 0 ? 'FAILED' : 'PASSED',
      humanityFormula: humanityViolations.length > 0 ? 'FAILED' : 'PASSED',
      autonomyFormula: autonomyViolations.length > 0 ? 'FAILED' : 'PASSED',
      overallAssessment: totalViolations > 5 ? 'SEVERELY_PROBLEMATIC' : 
                        totalViolations > 0 ? 'ETHICALLY_PROBLEMATIC' : 'ETHICALLY_SOUND',
      violationDetails: this.autonomyViolations.map(v => v.kantianViolation)
    };
  }

  private generateEthicalAssessment(): string {
    const score = this.choiceIntegrityScore;
    if (score >= 90) return 'High autonomy preservation - Ethical choice environment';
    if (score >= 70) return 'Moderate autonomy concerns - Some manipulation detected';
    if (score >= 50) return 'Significant autonomy violations - Choice integrity compromised';
    if (score >= 30) return 'Severe autonomy violations - Highly manipulative environment';
    return 'Critical autonomy destruction - Predatory manipulation detected';
  }

  private generateRestorationRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.trapTypes.timePressure) {
      recommendations.push('Remove artificial time constraints - Allow adequate decision time');
    }
    if (this.trapTypes.defaultBias) {
      recommendations.push('Make all options explicitly opt-in - No pre-checked boxes');
    }
    if (this.trapTypes.socialProof) {
      recommendations.push('Provide only verified testimonials with consent');
    }
    if (this.trapTypes.scarcityIllusion) {
      recommendations.push('Remove false scarcity claims - Be honest about availability');
    }
    if (this.trapTypes.cognitiveOverload) {
      recommendations.push('Simplify language and information presentation');
    }
    if (this.trapTypes.feeObfuscation) {
      recommendations.push('Display all fees prominently and clearly');
    }
    if (this.trapTypes.rolloverEncouragement) {
      recommendations.push('Discourage rollovers - Provide debt counseling resources');
    }

    // Add general ethical recommendations
    recommendations.push('Implement cooling-off periods for major financial decisions');
    recommendations.push('Provide independent financial counseling resources');
    recommendations.push('Display clear warnings about debt trap risks');

    return recommendations;
  }

  private calculatePhaseMetrics(): any {
    return {
      phase1ExploitativeMetrics: {
        totalViolations: this.autonomyViolations.filter(v => v.phase === 1).length,
        averageCoercionLevel: this.autonomyViolations
          .filter(v => v.phase === 1)
          .reduce((sum, v) => sum + (v.coercionLevel || 0), 0) / 
          this.autonomyViolations.filter(v => v.phase === 1).length || 0,
        manipulationTechniquesUsed: Object.keys(this.trapTypes).filter(key => 
          this.trapTypes[key as keyof TrapType]
        ).length
      },
      phase2EthicalMetrics: {
        ethicalPracticesCount: this.timelineEvents.filter(e => 
          e.phase === 2 && (e.details as any)?.ethicalPractice
        ).length,
        autonomyPreservationScore: Math.max(0, this.choiceIntegrityScore)
      },
      phase3ReflectionMetrics: {
        totalEducationalInsights: this.timelineEvents.length,
        kantianViolationTypes: new Set(this.autonomyViolations.map(v => v.type)).size,
        learningOpportunities: this.autonomyViolations.length + 
          this.timelineEvents.filter(e => (e.details as any)?.educationalNote).length
      }
    };
  }

  private addTimelineEvent(event: string, details: any): void {
    this.timelineEvents.push({
      event,
      timestamp: new Date().toISOString(),
      phase: this.currentPhase,
      autonomyImpact: details.autonomyImpact || 'low',
      details
    });
  }

  /**
   * Update phase - allows progression through 3-phase structure
   */
  updatePhase(newPhase: 1 | 2 | 3): void {
    this.currentPhase = newPhase;
    this.config.phase = newPhase;
    
    // Log phase transition
    this.addTimelineEvent('phase_transition', {
      fromPhase: this.currentPhase,
      toPhase: newPhase,
      autonomyImpact: 'low',
      educationalNote: `Transitioning to Phase ${newPhase}: ${this.getPhaseDescription(newPhase)}`
    });
  }

  private getPhaseDescription(phase: number): string {
    switch (phase) {
      case 1: return 'Exploitative Lending Experience';
      case 2: return 'Ethical Lending Alternative';
      case 3: return 'Comprehensive Reflection and Analysis';
      default: return 'Unknown Phase';
    }
  }

  /**
   * Get current violation count for real-time monitoring
   */
  getCurrentViolationCount(): number {
    return this.autonomyViolations.length;
  }

  /**
   * Get current choice integrity score
   */
  getCurrentIntegrityScore(): number {
    return this.choiceIntegrityScore;
  }

  /**
   * Export comprehensive data for research purposes
   */
  exportResearchData(): any {
    return {
      sessionId: this.session.id,
      phase: this.currentPhase,
      autonomyViolations: this.autonomyViolations,
      choiceIntegrityScore: this.choiceIntegrityScore,
      trapTypes: this.trapTypes,
      timeline: this.timelineEvents,
      kantianAnalysis: this.generateKantianAnalysis(),
      exportTimestamp: new Date().toISOString()
    };
  }
}

/**
 * Factory function to create phase-specific autonomy theater instances
 */
export function createPhaseAutonomyTheater(
  phase: 1 | 2 | 3, 
  session: LotusSession,
  options: Partial<AutonomyTrapConfig> = {}
): ThreePhaseAutonomyTheater {
  const config: AutonomyTrapConfig = {
    phase,
    maxViolationSeverity: phase === 1 ? 'critical' : phase === 2 ? 'low' : 'medium',
    enableKantianAnalysis: true,
    enableBehavioralProfiling: true,
    ghostModeEnabled: options.ghostModeEnabled ?? true,
    ...options
  };

  return new ThreePhaseAutonomyTheater(session, config);
}

export default ThreePhaseAutonomyTheater;
