/**
 * Research-Grade Data Collection Engine
 * Optimized for scientific validity, precision tracking, and data integrity
 */

export interface ResearchEvent {
  id: string;
  participantId: string;
  sessionId: string;
  loanType: 'Payday' | 'BNPL' | 'EWA' | 'Installment';
  eventType: 'interaction' | 'cognitive' | 'behavioral' | 'physiological';
  timestamp: number; // High-precision microseconds
  relativeTimestamp: number; // Time since session start
  
  // Interaction Events
  elementId?: string;
  elementType?: string;
  actionType?: 'click' | 'hover' | 'scroll' | 'focus' | 'blur' | 'input';
  coordinates?: { x: number; y: number };
  
  // Cognitive Events
  attentionState?: 'focused' | 'distracted' | 'confused';
  cognitiveLoad?: number; // 1-10 scale
  confidenceLevel?: number; // 1-7 scale
  
  // Behavioral Events
  scrollDepth?: number;
  timeSpent?: number;
  interactionIntensity?: number;
  hesitationPattern?: boolean;
  
  // Research Metadata
  studyPhase: string;
  conditionGroup: string;
  trialNumber: number;
  validationFlags: ResearchValidationFlags;
}

export interface ResearchValidationFlags {
  isValid: boolean;
  qualityScore: number; // 0-100
  outlierFlags: string[];
  attentionCheckPassed: boolean;
  dataCompleteness: number; // 0-100
  temporalConsistency: boolean;
}

export interface ResearchSession {
  id: string;
  participantId: string;
  startTime: number;
  endTime?: number;
  condition: 'experimental' | 'control';
  randomizationSeed: number;
  
  // Research Design
  loanOrder: string[];
  scenarioAssignment: string;
  attentionChecks: AttentionCheck[];
  
  // Data Quality
  completionRate: number;
  validEventCount: number;
  invalidEventCount: number;
  averageResponseTime: number;
  
  // Statistical Metadata
  powerAnalysis: PowerAnalysisResult;
  effectSizeEstimate?: number;
  confidenceInterval?: [number, number];
}

export interface AttentionCheck {
  id: string;
  type: 'reading_comprehension' | 'instruction_following' | 'timing_validation';
  presented: boolean;
  passed: boolean;
  responseTime: number;
  expectedResponse: string;
  actualResponse?: string;
}

export interface PowerAnalysisResult {
  sampleSize: number;
  alpha: number;
  beta: number;
  power: number;
  effectSize: number;
  recommendation: 'continue' | 'stop_success' | 'stop_futility';
}

class ResearchDataCollectionEngine {
  private events: ResearchEvent[] = [];
  private session: ResearchSession | null = null;
  private precision: 'millisecond' | 'microsecond' = 'microsecond';
  private validationEngine: DataValidationEngine;
  private statisticalEngine: StatisticalAnalysisEngine;
  private qualityMonitor: DataQualityMonitor;

  constructor() {
    this.validationEngine = new DataValidationEngine();
    this.statisticalEngine = new StatisticalAnalysisEngine();
    this.qualityMonitor = new DataQualityMonitor();
  }

  // High-Precision Event Tracking
  public trackEvent(eventData: Partial<ResearchEvent>): void {
    const timestamp = this.getHighPrecisionTimestamp();
    const relativeTimestamp = this.session ? timestamp - this.session.startTime : 0;

    const event: ResearchEvent = {
      id: this.generateEventId(),
      participantId: this.session?.participantId || '',
      sessionId: this.session?.id || '',
      timestamp,
      relativeTimestamp,
      studyPhase: this.getCurrentStudyPhase(),
      conditionGroup: this.session?.condition || 'unknown',
      trialNumber: this.getCurrentTrialNumber(),
      validationFlags: this.validationEngine.validateEvent(eventData),
      ...eventData,
    } as ResearchEvent;

    // Real-time validation
    if (event.validationFlags.isValid) {
      this.events.push(event);
      this.qualityMonitor.updateMetrics(event);
      this.checkStatisticalPower();
    } else {
      this.handleInvalidEvent(event);
    }

    // Auto-persist for research reliability
    this.persistEventBatch();
  }

  // Research Session Management
  public initializeSession(participantId: string, condition: 'experimental' | 'control'): ResearchSession {
    const randomizationSeed = Math.random();
    const loanOrder = this.generateRandomizedLoanOrder(randomizationSeed);
    
    this.session = {
      id: this.generateSessionId(),
      participantId,
      startTime: this.getHighPrecisionTimestamp(),
      condition,
      randomizationSeed,
      loanOrder,
      scenarioAssignment: this.assignScenario(condition),
      attentionChecks: this.generateAttentionChecks(),
      completionRate: 0,
      validEventCount: 0,
      invalidEventCount: 0,
      averageResponseTime: 0,
      powerAnalysis: this.statisticalEngine.calculateInitialPower(),
    };

    this.trackEvent({
      eventType: 'behavioral',
      actionType: 'session_start',
      loanType: 'Payday', // Will be updated as user progresses
    });

    return this.session;
  }

  // Advanced Behavioral Analysis
  public analyzeBehavioralPatterns(): BehavioralAnalysisResult {
    if (!this.session) throw new Error('No active session');

    const patterns = {
      // Attention Patterns
      focusDistribution: this.calculateFocusDistribution(),
      attentionSustainability: this.measureAttentionSustainability(),
      
      // Interaction Patterns
      clickPrecision: this.analyzeClickPrecision(),
      scrollingBehavior: this.analyzeScrollingBehavior(),
      hesitationPatterns: this.detectHesitationPatterns(),
      
      // Cognitive Load Indicators
      responseTimeVariability: this.calculateResponseTimeVariability(),
      interactionComplexity: this.measureInteractionComplexity(),
      decisionLatency: this.analyzeDecisionLatency(),
      
      // Deception Detection Indicators
      comprehensionGaps: this.identifyComprehensionGaps(),
      trustIndicators: this.extractTrustIndicators(),
      susceptibilityMarkers: this.detectSusceptibilityMarkers(),
    };

    return {
      participantId: this.session.participantId,
      sessionId: this.session.id,
      analysisTimestamp: this.getHighPrecisionTimestamp(),
      patterns,
      qualityScore: this.qualityMonitor.getOverallQuality(),
      validityFlags: this.validationEngine.getSessionValidityFlags(),
      recommendations: this.generateDataQualityRecommendations(),
    };
  }

  // Real-time Statistical Monitoring
  private checkStatisticalPower(): void {
    if (this.events.length % 100 === 0) { // Check every 100 events
      const powerAnalysis = this.statisticalEngine.updatePowerAnalysis(this.events);
      
      if (this.session) {
        this.session.powerAnalysis = powerAnalysis;
        
        // Alert researchers if stopping criteria met
        if (powerAnalysis.recommendation !== 'continue') {
          this.notifyResearchers(powerAnalysis);
        }
      }
    }
  }

  // Microsecond-Precision Timing
  private getHighPrecisionTimestamp(): number {
    if (typeof performance !== 'undefined' && performance.now) {
      // Browser environment - microsecond precision when available
      return Math.round(performance.now() * 1000); // Convert to microseconds
    } else {
      // Node.js environment
      const hrTime = process.hrtime.bigint();
      return Number(hrTime / 1000n); // Convert nanoseconds to microseconds
    }
  }

  // Research-Grade Randomization
  private generateRandomizedLoanOrder(seed: number): string[] {
    const loanTypes = ['Payday', 'BNPL', 'EWA', 'Installment'];
    const rng = this.createSeededRNG(seed);
    
    // Fisher-Yates shuffle with seeded randomization for reproducibility
    const shuffled = [...loanTypes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }

  // Data Quality Monitoring
  private analyzeClickPrecision(): ClickPrecisionAnalysis {
    const clickEvents = this.events.filter(e => e.actionType === 'click');
    
    return {
      averageAccuracy: this.calculateClickAccuracy(clickEvents),
      intentionalityScore: this.assessClickIntentionality(clickEvents),
      coordinateStability: this.measureCoordinateStability(clickEvents),
      timingConsistency: this.analyzeClickTiming(clickEvents),
    };
  }

  private detectHesitationPatterns(): HesitationAnalysis {
    const interactions = this.events.filter(e => e.actionType);
    
    return {
      hesitationCount: this.countHesitationEvents(interactions),
      averageHesitationDuration: this.calculateAverageHesitation(interactions),
      hesitationLocations: this.mapHesitationLocations(interactions),
      significanceLevel: this.assessHesitationSignificance(interactions),
    };
  }

  // Advanced Validation
  private handleInvalidEvent(event: ResearchEvent): void {
    console.warn('Invalid research event detected:', {
      eventId: event.id,
      flags: event.validationFlags.outlierFlags,
      qualityScore: event.validationFlags.qualityScore,
    });

    // Store for analysis but don't include in main dataset
    this.storeInvalidEvent(event);
    
    if (this.session) {
      this.session.invalidEventCount++;
    }
  }

  // Attention Check Management
  private generateAttentionChecks(): AttentionCheck[] {
    return [
      {
        id: 'reading_check_1',
        type: 'reading_comprehension',
        presented: false,
        passed: false,
        responseTime: 0,
        expectedResponse: 'understood',
      },
      {
        id: 'instruction_check_1',
        type: 'instruction_following',
        presented: false,
        passed: false,
        responseTime: 0,
        expectedResponse: 'click_continue',
      },
      {
        id: 'timing_check_1',
        type: 'timing_validation',
        presented: false,
        passed: false,
        responseTime: 0,
        expectedResponse: 'within_threshold',
      },
    ];
  }

  // Utility Methods
  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private createSeededRNG(seed: number): () => number {
    let state = seed;
    return () => {
      state = (state * 1103515245 + 12345) & 0x7fffffff;
      return state / 0x7fffffff;
    };
  }

  private getCurrentStudyPhase(): string {
    if (!this.session) return 'unknown';
    
    const eventCount = this.events.length;
    if (eventCount < 50) return 'introduction';
    if (eventCount < 200) return 'loan_simulation';
    if (eventCount < 250) return 'comprehension_quiz';
    return 'completion';
  }

  private getCurrentTrialNumber(): number {
    return this.events.filter(e => e.eventType === 'behavioral').length;
  }

  private persistEventBatch(): void {
    // Implement batched persistence to database
    if (this.events.length % 50 === 0) {
      this.sendToDatabase(this.events.slice(-50));
    }
  }

  private async sendToDatabase(events: ResearchEvent[]): Promise<void> {
    try {
      await fetch('/api/research/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events, session: this.session }),
      });
    } catch (error) {
      console.error('Failed to persist research events:', error);
      // Implement retry logic and local storage backup
    }
  }

  private notifyResearchers(powerAnalysis: PowerAnalysisResult): void {
    console.log('Statistical stopping criteria met:', powerAnalysis.recommendation);
    // Implement researcher notification system
  }

  // Export for external analysis
  public exportResearchData(): ResearchDataExport {
    return {
      session: this.session!,
      events: this.events,
      behavioralAnalysis: this.analyzeBehavioralPatterns(),
      qualityMetrics: this.qualityMonitor.getDetailedMetrics(),
      statisticalSummary: this.statisticalEngine.generateSummary(),
      exportTimestamp: this.getHighPrecisionTimestamp(),
    };
  }
}

// Supporting Interfaces
interface BehavioralAnalysisResult {
  participantId: string;
  sessionId: string;
  analysisTimestamp: number;
  patterns: any;
  qualityScore: number;
  validityFlags: any;
  recommendations: string[];
}

interface ClickPrecisionAnalysis {
  averageAccuracy: number;
  intentionalityScore: number;
  coordinateStability: number;
  timingConsistency: number;
}

interface HesitationAnalysis {
  hesitationCount: number;
  averageHesitationDuration: number;
  hesitationLocations: string[];
  significanceLevel: number;
}

interface ResearchDataExport {
  session: ResearchSession;
  events: ResearchEvent[];
  behavioralAnalysis: BehavioralAnalysisResult;
  qualityMetrics: any;
  statisticalSummary: any;
  exportTimestamp: number;
}

// Supporting Classes (placeholders for full implementation)
class DataValidationEngine {
  validateEvent(eventData: any): ResearchValidationFlags {
    // Implement comprehensive validation logic
    return {
      isValid: true,
      qualityScore: 95,
      outlierFlags: [],
      attentionCheckPassed: true,
      dataCompleteness: 100,
      temporalConsistency: true,
    };
  }

  getSessionValidityFlags(): any {
    return {}; // Implement session-level validation
  }
}

class StatisticalAnalysisEngine {
  calculateInitialPower(): PowerAnalysisResult {
    return {
      sampleSize: 0,
      alpha: 0.05,
      beta: 0.20,
      power: 0.80,
      effectSize: 0.3,
      recommendation: 'continue',
    };
  }

  updatePowerAnalysis(events: ResearchEvent[]): PowerAnalysisResult {
    // Implement real-time power analysis
    return this.calculateInitialPower();
  }

  generateSummary(): any {
    return {}; // Implement statistical summary
  }
}

class DataQualityMonitor {
  updateMetrics(event: ResearchEvent): void {
    // Implement quality monitoring
  }

  getOverallQuality(): number {
    return 95; // Implement quality calculation
  }

  getDetailedMetrics(): any {
    return {}; // Implement detailed metrics
  }
}

export default ResearchDataCollectionEngine; 