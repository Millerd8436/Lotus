/**
 * Ultra-Strict Validation Engine for Research-Grade Data Collection
 * Zero tolerance for data quality issues - implements multiple validation layers
 * with comprehensive error handling and predictive failure detection
 */

export interface ValidationResult {
  isValid: boolean;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  validationScore: number; // 0-100, must be ≥99.5 to pass
  errors: ValidationError[];
  warnings: ValidationWarning[];
  recommendations: string[];
  quarantineRequired: boolean;
  dataIntegrityHash: string;
}

export interface ValidationError {
  code: string;
  field: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  expectedValue?: any;
  actualValue?: any;
  context: Record<string, any>;
  timestamp: number;
  stackTrace?: string;
}

export interface ValidationWarning {
  code: string;
  field: string;
  message: string;
  impact: 'statistical' | 'compliance' | 'quality' | 'performance';
  recommendation: string;
  timestamp: number;
}

export interface DataIntegrityCheck {
  checksumVerification: boolean;
  temporalConsistency: boolean;
  referentialIntegrity: boolean;
  schemaCompliance: boolean;
  businessRuleCompliance: boolean;
  statisticalAnomaly: boolean;
  duplicateDetection: boolean;
  completenessCheck: boolean;
}

export interface StatisticalAnomalyDetection {
  zScore: number;
  isOutlier: boolean;
  outlierType: 'univariate' | 'multivariate' | 'temporal' | 'behavioral';
  confidence: number; // 0-1
  recommendation: 'accept' | 'flag' | 'quarantine' | 'reject';
  baseline: any;
  deviation: number;
}

class UltraStrictValidationEngine {
  private readonly MINIMUM_VALIDATION_SCORE = 99.5;
  private readonly CRITICAL_ERROR_THRESHOLD = 0;
  private readonly HIGH_ERROR_THRESHOLD = 1;
  private readonly TEMPORAL_TOLERANCE_MICROSECONDS = 1000; // 1ms
  private readonly STATISTICAL_OUTLIER_THRESHOLD = 3.0; // 3 standard deviations
  private readonly MIN_ATTENTION_DURATION_MS = 500;
  private readonly MAX_RESPONSE_TIME_MS = 30000;
  private readonly MIN_INTERACTION_QUALITY = 0.95;

  private validationHistory: Map<string, ValidationResult[]> = new Map();
  private baselineMetrics: Map<string, any> = new Map();
  private emergencyFlags: Set<string> = new Set();

  constructor() {
    this.initializeBaselineMetrics();
  }

  // Main validation entry point - ULTRA STRICT
  public validateResearchData(data: any, context: any): ValidationResult {
    const validationStart = performance.now();
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const recommendations: string[] = [];

    try {
      // Layer 1: Critical System Validation
      const systemValidation = this.validateSystemIntegrity(data, context);
      errors.push(...systemValidation.errors);
      warnings.push(...systemValidation.warnings);

      // Layer 2: Data Type and Schema Validation
      const schemaValidation = this.validateDataSchema(data);
      errors.push(...schemaValidation.errors);
      warnings.push(...schemaValidation.warnings);

      // Layer 3: Business Logic Validation
      const businessValidation = this.validateBusinessRules(data, context);
      errors.push(...businessValidation.errors);
      warnings.push(...businessValidation.warnings);

      // Layer 4: Statistical Anomaly Detection
      const statisticalValidation = this.detectStatisticalAnomalies(data, context);
      errors.push(...statisticalValidation.errors);
      warnings.push(...statisticalValidation.warnings);

      // Layer 5: Research Ethics Validation
      const ethicsValidation = this.validateResearchEthics(data, context);
      errors.push(...ethicsValidation.errors);
      warnings.push(...ethicsValidation.warnings);

      // Layer 6: Data Integrity and Security
      const integrityValidation = this.validateDataIntegrity(data);
      errors.push(...integrityValidation.errors);
      warnings.push(...integrityValidation.warnings);

      // Layer 7: Temporal Consistency Validation
      const temporalValidation = this.validateTemporalConsistency(data, context);
      errors.push(...temporalValidation.errors);
      warnings.push(...temporalValidation.warnings);

      // Layer 8: Cross-Reference Validation
      const crossRefValidation = this.validateCrossReferences(data, context);
      errors.push(...crossRefValidation.errors);
      warnings.push(...crossRefValidation.warnings);

      // Calculate validation score with ULTRA STRICT criteria
      const validationScore = this.calculateUltraStrictScore(errors, warnings);
      
      // Determine if quarantine is required
      const quarantineRequired = this.requiresQuarantine(errors, warnings, validationScore);
      
      // Generate data integrity hash
      const dataIntegrityHash = this.generateIntegrityHash(data);
      
      // Generate recommendations
      recommendations.push(...this.generateStrictRecommendations(errors, warnings));

      // Check for emergency conditions
      this.checkEmergencyConditions(errors, data, context);

      const result: ValidationResult = {
        isValid: validationScore >= this.MINIMUM_VALIDATION_SCORE && 
                errors.filter(e => e.severity === 'critical').length === 0,
        severity: this.determineSeverity(errors, warnings),
        validationScore,
        errors,
        warnings,
        recommendations,
        quarantineRequired,
        dataIntegrityHash,
      };

      // Store validation history for pattern detection
      this.storeValidationHistory(context.participantId || 'unknown', result);

      // Performance check - validation should complete in <10ms
      const validationTime = performance.now() - validationStart;
      if (validationTime > 10) {
        warnings.push({
          code: 'VALIDATION_PERFORMANCE_DEGRADED',
          field: 'system',
          message: `Validation took ${validationTime.toFixed(2)}ms, exceeding 10ms threshold`,
          impact: 'performance',
          recommendation: 'Investigate validation performance bottlenecks',
          timestamp: Date.now(),
        });
      }

      return result;

    } catch (error) {
      // Critical validation failure
      return {
        isValid: false,
        severity: 'critical',
        validationScore: 0,
        errors: [{
          code: 'VALIDATION_SYSTEM_FAILURE',
          field: 'system',
          message: `Validation system failure: ${error.message}`,
          severity: 'critical',
          context: { error: error.toString() },
          timestamp: Date.now(),
          stackTrace: error.stack,
        }],
        warnings: [],
        recommendations: ['Investigate validation system failure immediately'],
        quarantineRequired: true,
        dataIntegrityHash: 'FAILED',
      };
    }
  }

  // Layer 1: Critical System Validation
  private validateSystemIntegrity(data: any, context: any): { errors: ValidationError[], warnings: ValidationWarning[] } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check system clock synchronization
    const systemTime = Date.now();
    const dataTime = data.timestamp || 0;
    const timeDrift = Math.abs(systemTime - dataTime);
    
    if (timeDrift > 5000) { // 5 second drift
      errors.push({
        code: 'SYSTEM_CLOCK_DRIFT',
        field: 'timestamp',
        message: `System clock drift detected: ${timeDrift}ms`,
        severity: 'critical',
        expectedValue: systemTime,
        actualValue: dataTime,
        context: { drift: timeDrift },
        timestamp: Date.now(),
      });
    }

    // Check memory pressure
    if (typeof window !== 'undefined' && (window as any).performance?.memory) {
      const memory = (window as any).performance.memory;
      const memoryUsage = memory.usedJSHeapSize / memory.totalJSHeapSize;
      
      if (memoryUsage > 0.9) {
        warnings.push({
          code: 'HIGH_MEMORY_USAGE',
          field: 'system',
          message: `High memory usage: ${(memoryUsage * 100).toFixed(1)}%`,
          impact: 'performance',
          recommendation: 'Monitor memory usage and consider data pruning',
          timestamp: Date.now(),
        });
      }
    }

    // Check for concurrent validation processes
    if (this.validationHistory.size > 1000) {
      warnings.push({
        code: 'HIGH_VALIDATION_LOAD',
        field: 'system',
        message: 'High number of concurrent validations may impact performance',
        impact: 'performance',
        recommendation: 'Consider implementing validation throttling',
        timestamp: Date.now(),
      });
    }

    return { errors, warnings };
  }

  // Layer 2: Ultra-Strict Data Schema Validation
  private validateDataSchema(data: any): { errors: ValidationError[], warnings: ValidationWarning[] } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Required fields validation with zero tolerance
    const requiredFields = [
      'id', 'participantId', 'sessionId', 'timestamp', 'eventType', 'loanType'
    ];

    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        errors.push({
          code: 'REQUIRED_FIELD_MISSING',
          field,
          message: `Required field '${field}' is missing or empty`,
          severity: 'critical',
          context: { requiredFields },
          timestamp: Date.now(),
        });
      }
    }

    // Data type validation with strict typing
    const typeValidations = {
      id: 'string',
      participantId: 'string',
      sessionId: 'string',
      timestamp: 'number',
      eventType: 'string',
      loanType: 'string',
      qualityScore: 'number',
    };

    for (const [field, expectedType] of Object.entries(typeValidations)) {
      if (data[field] !== undefined && typeof data[field] !== expectedType) {
        errors.push({
          code: 'INVALID_DATA_TYPE',
          field,
          message: `Field '${field}' must be of type ${expectedType}, got ${typeof data[field]}`,
          severity: 'high',
          expectedValue: expectedType,
          actualValue: typeof data[field],
          context: { value: data[field] },
          timestamp: Date.now(),
        });
      }
    }

    // Enum validation with strict matching
    const enumValidations = {
      eventType: ['interaction', 'cognitive', 'behavioral', 'physiological'],
      loanType: ['Payday', 'BNPL', 'EWA', 'Installment'],
      actionType: ['click', 'hover', 'scroll', 'focus', 'blur', 'input'],
      attentionState: ['focused', 'distracted', 'confused'],
    };

    for (const [field, validValues] of Object.entries(enumValidations)) {
      if (data[field] !== undefined && !validValues.includes(data[field])) {
        errors.push({
          code: 'INVALID_ENUM_VALUE',
          field,
          message: `Field '${field}' has invalid value '${data[field]}'. Must be one of: ${validValues.join(', ')}`,
          severity: 'high',
          expectedValue: validValues,
          actualValue: data[field],
          context: { validValues },
          timestamp: Date.now(),
        });
      }
    }

    // Range validation with strict bounds
    const rangeValidations = {
      qualityScore: { min: 0, max: 100 },
      cognitiveLoad: { min: 1, max: 10 },
      confidenceLevel: { min: 1, max: 7 },
      scrollDepth: { min: 0, max: 100 },
      interactionIntensity: { min: 0, max: 100 },
    };

    for (const [field, range] of Object.entries(rangeValidations)) {
      if (data[field] !== undefined) {
        const value = Number(data[field]);
        if (isNaN(value) || value < range.min || value > range.max) {
          errors.push({
            code: 'VALUE_OUT_OF_RANGE',
            field,
            message: `Field '${field}' value ${data[field]} is outside valid range [${range.min}, ${range.max}]`,
            severity: 'high',
            expectedValue: `${range.min}-${range.max}`,
            actualValue: data[field],
            context: { range },
            timestamp: Date.now(),
          });
        }
      }
    }

    return { errors, warnings };
  }

  // Layer 3: Business Logic Validation
  private validateBusinessRules(data: any, context: any): { errors: ValidationError[], warnings: ValidationWarning[] } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Interaction timing validation
    if (data.eventType === 'interaction' && data.timeSpent !== undefined) {
      if (data.timeSpent < this.MIN_ATTENTION_DURATION_MS) {
        errors.push({
          code: 'INSUFFICIENT_ATTENTION_TIME',
          field: 'timeSpent',
          message: `Interaction time ${data.timeSpent}ms below minimum ${this.MIN_ATTENTION_DURATION_MS}ms`,
          severity: 'high',
          expectedValue: `>=${this.MIN_ATTENTION_DURATION_MS}`,
          actualValue: data.timeSpent,
          context: { interactionType: data.actionType },
          timestamp: Date.now(),
        });
      }

      if (data.timeSpent > this.MAX_RESPONSE_TIME_MS) {
        warnings.push({
          code: 'EXCESSIVE_RESPONSE_TIME',
          field: 'timeSpent',
          message: `Response time ${data.timeSpent}ms exceeds typical range`,
          impact: 'quality',
          recommendation: 'Investigate potential attention issues',
          timestamp: Date.now(),
        });
      }
    }

    // Quality score validation
    if (data.qualityScore !== undefined && data.qualityScore < (this.MIN_INTERACTION_QUALITY * 100)) {
      errors.push({
        code: 'LOW_INTERACTION_QUALITY',
        field: 'qualityScore',
        message: `Quality score ${data.qualityScore} below minimum threshold ${this.MIN_INTERACTION_QUALITY * 100}`,
        severity: 'high',
        expectedValue: `>=${this.MIN_INTERACTION_QUALITY * 100}`,
        actualValue: data.qualityScore,
        context: { threshold: this.MIN_INTERACTION_QUALITY },
        timestamp: Date.now(),
      });
    }

    // Attention check validation
    if (data.attentionCheckPassed === false) {
      errors.push({
        code: 'ATTENTION_CHECK_FAILED',
        field: 'attentionCheckPassed',
        message: 'Participant failed attention check',
        severity: 'high',
        expectedValue: true,
        actualValue: false,
        context: { eventType: data.eventType },
        timestamp: Date.now(),
      });
    }

    // Coordinate validation for click events
    if (data.actionType === 'click' && data.coordinates) {
      const { x, y } = data.coordinates;
      if (x < 0 || y < 0 || x > 10000 || y > 10000) { // Reasonable screen bounds
        errors.push({
          code: 'INVALID_CLICK_COORDINATES',
          field: 'coordinates',
          message: `Click coordinates (${x}, ${y}) outside reasonable bounds`,
          severity: 'medium',
          expectedValue: 'coordinates within screen bounds',
          actualValue: `(${x}, ${y})`,
          context: { coordinates: data.coordinates },
          timestamp: Date.now(),
        });
      }
    }

    return { errors, warnings };
  }

  // Layer 4: Statistical Anomaly Detection
  private detectStatisticalAnomalies(data: any, context: any): { errors: ValidationError[], warnings: ValidationWarning[] } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Get baseline metrics for comparison
    const baseline = this.getBaselineMetrics(data.loanType, data.eventType);
    
    if (baseline && data.timeSpent !== undefined) {
      const zScore = this.calculateZScore(data.timeSpent, baseline.mean, baseline.stdDev);
      
      if (Math.abs(zScore) > this.STATISTICAL_OUTLIER_THRESHOLD) {
        const severity = Math.abs(zScore) > 5 ? 'high' : 'medium';
        
        errors.push({
          code: 'STATISTICAL_OUTLIER_DETECTED',
          field: 'timeSpent',
          message: `Value is ${Math.abs(zScore).toFixed(2)} standard deviations from baseline (z-score: ${zScore.toFixed(2)})`,
          severity,
          expectedValue: `${baseline.mean} ± ${baseline.stdDev}`,
          actualValue: data.timeSpent,
          context: { zScore, baseline },
          timestamp: Date.now(),
        });
      }
    }

    // Pattern anomaly detection
    const participantHistory = this.validationHistory.get(data.participantId) || [];
    if (participantHistory.length > 5) {
      const recentQualities = participantHistory.slice(-5).map(v => v.validationScore);
      const avgQuality = recentQualities.reduce((sum, q) => sum + q, 0) / recentQualities.length;
      
      if (data.qualityScore && Math.abs(data.qualityScore - avgQuality) > 20) {
        warnings.push({
          code: 'QUALITY_PATTERN_ANOMALY',
          field: 'qualityScore',
          message: `Quality score deviates significantly from participant's recent pattern`,
          impact: 'quality',
          recommendation: 'Investigate potential data quality degradation',
          timestamp: Date.now(),
        });
      }
    }

    return { errors, warnings };
  }

  // Layer 5: Research Ethics Validation
  private validateResearchEthics(data: any, context: any): { errors: ValidationError[], warnings: ValidationWarning[] } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Consent validation
    if (!context.consentVerified) {
      errors.push({
        code: 'CONSENT_NOT_VERIFIED',
        field: 'consent',
        message: 'Data collection without verified informed consent',
        severity: 'critical',
        context: { participantId: data.participantId },
        timestamp: Date.now(),
      });
    }

    // Data minimization check
    const sensitiveFields = ['coordinates', 'ipAddress', 'userAgent'];
    const unnecessaryData = sensitiveFields.filter(field => 
      data[field] !== undefined && !this.isDataNecessary(field, data.eventType)
    );

    if (unnecessaryData.length > 0) {
      warnings.push({
        code: 'UNNECESSARY_SENSITIVE_DATA',
        field: unnecessaryData.join(', '),
        message: `Collecting potentially unnecessary sensitive data: ${unnecessaryData.join(', ')}`,
        impact: 'compliance',
        recommendation: 'Review data minimization practices',
        timestamp: Date.now(),
      });
    }

    // Participant burden check
    if (context.sessionDuration && context.sessionDuration > 1800000) { // 30 minutes
      warnings.push({
        code: 'EXCESSIVE_PARTICIPANT_BURDEN',
        field: 'sessionDuration',
        message: `Session duration ${Math.round(context.sessionDuration / 60000)} minutes may constitute excessive burden`,
        impact: 'compliance',
        recommendation: 'Consider implementing session breaks or reducing study length',
        timestamp: Date.now(),
      });
    }

    return { errors, warnings };
  }

  // Layer 6: Data Integrity and Security
  private validateDataIntegrity(data: any): { errors: ValidationError[], warnings: ValidationWarning[] } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Checksum validation
    const expectedChecksum = this.calculateDataChecksum(data);
    if (data.checksum && data.checksum !== expectedChecksum) {
      errors.push({
        code: 'DATA_INTEGRITY_FAILURE',
        field: 'checksum',
        message: 'Data integrity check failed - possible tampering or corruption',
        severity: 'critical',
        expectedValue: expectedChecksum,
        actualValue: data.checksum,
        context: { integrityCheck: 'failed' },
        timestamp: Date.now(),
      });
    }

    // Duplicate detection
    const dataFingerprint = this.generateDataFingerprint(data);
    if (this.isDuplicateData(dataFingerprint)) {
      errors.push({
        code: 'DUPLICATE_DATA_DETECTED',
        field: 'id',
        message: 'Duplicate data submission detected',
        severity: 'medium',
        context: { fingerprint: dataFingerprint },
        timestamp: Date.now(),
      });
    }

    // Encryption validation for sensitive fields
    const sensitiveFields = ['participantId', 'coordinates'];
    for (const field of sensitiveFields) {
      if (data[field] && !this.isDataEncrypted(data[field])) {
        errors.push({
          code: 'SENSITIVE_DATA_NOT_ENCRYPTED',
          field,
          message: `Sensitive field '${field}' is not properly encrypted`,
          severity: 'critical',
          context: { securityRequirement: 'encryption' },
          timestamp: Date.now(),
        });
      }
    }

    return { errors, warnings };
  }

  // Layer 7: Temporal Consistency Validation
  private validateTemporalConsistency(data: any, context: any): { errors: ValidationError[], warnings: ValidationWarning[] } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Timestamp ordering validation
    if (context.lastEventTimestamp && data.timestamp <= context.lastEventTimestamp) {
      errors.push({
        code: 'TEMPORAL_ORDERING_VIOLATION',
        field: 'timestamp',
        message: 'Event timestamp is not chronologically ordered',
        severity: 'high',
        expectedValue: `>${context.lastEventTimestamp}`,
        actualValue: data.timestamp,
        context: { previousTimestamp: context.lastEventTimestamp },
        timestamp: Date.now(),
      });
    }

    // Relative timestamp validation
    if (data.relativeTimestamp !== undefined && context.sessionStartTime) {
      const expectedRelative = data.timestamp - context.sessionStartTime;
      const timeDifference = Math.abs(data.relativeTimestamp - expectedRelative);
      
      if (timeDifference > this.TEMPORAL_TOLERANCE_MICROSECONDS) {
        errors.push({
          code: 'RELATIVE_TIMESTAMP_MISMATCH',
          field: 'relativeTimestamp',
          message: `Relative timestamp inconsistent with absolute timestamp by ${timeDifference}μs`,
          severity: 'medium',
          expectedValue: expectedRelative,
          actualValue: data.relativeTimestamp,
          context: { tolerance: this.TEMPORAL_TOLERANCE_MICROSECONDS },
          timestamp: Date.now(),
        });
      }
    }

    // Future timestamp detection
    const now = Date.now() * 1000; // Convert to microseconds
    if (data.timestamp > now + 1000000) { // 1 second future tolerance
      errors.push({
        code: 'FUTURE_TIMESTAMP_DETECTED',
        field: 'timestamp',
        message: 'Event timestamp is in the future',
        severity: 'high',
        expectedValue: `<=${now}`,
        actualValue: data.timestamp,
        context: { systemTime: now },
        timestamp: Date.now(),
      });
    }

    return { errors, warnings };
  }

  // Layer 8: Cross-Reference Validation
  private validateCrossReferences(data: any, context: any): { errors: ValidationError[], warnings: ValidationWarning[] } {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Session consistency validation
    if (context.expectedSessionId && data.sessionId !== context.expectedSessionId) {
      errors.push({
        code: 'SESSION_ID_MISMATCH',
        field: 'sessionId',
        message: 'Session ID does not match expected value',
        severity: 'critical',
        expectedValue: context.expectedSessionId,
        actualValue: data.sessionId,
        context: { sessionValidation: 'failed' },
        timestamp: Date.now(),
      });
    }

    // Participant consistency validation
    if (context.expectedParticipantId && data.participantId !== context.expectedParticipantId) {
      errors.push({
        code: 'PARTICIPANT_ID_MISMATCH',
        field: 'participantId',
        message: 'Participant ID does not match session context',
        severity: 'critical',
        expectedValue: context.expectedParticipantId,
        actualValue: data.participantId,
        context: { participantValidation: 'failed' },
        timestamp: Date.now(),
      });
    }

    // Loan type progression validation
    if (context.expectedLoanOrder && data.loanType) {
      const currentIndex = context.currentLoanIndex || 0;
      const expectedLoanType = context.expectedLoanOrder[currentIndex];
      
      if (data.loanType !== expectedLoanType) {
        errors.push({
          code: 'LOAN_TYPE_SEQUENCE_VIOLATION',
          field: 'loanType',
          message: `Loan type '${data.loanType}' does not match expected sequence position '${expectedLoanType}'`,
          severity: 'high',
          expectedValue: expectedLoanType,
          actualValue: data.loanType,
          context: { loanOrder: context.expectedLoanOrder, currentIndex },
          timestamp: Date.now(),
        });
      }
    }

    return { errors, warnings };
  }

  // Ultra-strict scoring calculation
  private calculateUltraStrictScore(errors: ValidationError[], warnings: ValidationWarning[]): number {
    let score = 100;

    // Critical errors result in immediate failure
    const criticalErrors = errors.filter(e => e.severity === 'critical').length;
    if (criticalErrors > 0) {
      return 0;
    }

    // Severe penalties for high-severity errors
    const highErrors = errors.filter(e => e.severity === 'high').length;
    score -= highErrors * 20;

    // Moderate penalties for medium-severity errors
    const mediumErrors = errors.filter(e => e.severity === 'medium').length;
    score -= mediumErrors * 10;

    // Light penalties for low-severity errors
    const lowErrors = errors.filter(e => e.severity === 'low').length;
    score -= lowErrors * 5;

    // Penalties for warnings based on impact
    warnings.forEach(warning => {
      switch (warning.impact) {
        case 'statistical':
          score -= 2;
          break;
        case 'compliance':
          score -= 3;
          break;
        case 'quality':
          score -= 1;
          break;
        case 'performance':
          score -= 0.5;
          break;
      }
    });

    return Math.max(0, score);
  }

  // Quarantine determination
  private requiresQuarantine(errors: ValidationError[], warnings: ValidationWarning[], score: number): boolean {
    // Always quarantine critical errors
    if (errors.some(e => e.severity === 'critical')) {
      return true;
    }

    // Quarantine if score is below threshold
    if (score < this.MINIMUM_VALIDATION_SCORE) {
      return true;
    }

    // Quarantine if too many high-severity errors
    if (errors.filter(e => e.severity === 'high').length > this.HIGH_ERROR_THRESHOLD) {
      return true;
    }

    // Quarantine based on statistical anomalies
    if (errors.some(e => e.code === 'STATISTICAL_OUTLIER_DETECTED' && e.severity === 'high')) {
      return true;
    }

    return false;
  }

  // Helper methods
  private initializeBaselineMetrics(): void {
    // Initialize with research-validated baseline metrics
    this.baselineMetrics.set('Payday:interaction', { mean: 5000, stdDev: 2000 });
    this.baselineMetrics.set('BNPL:interaction', { mean: 4500, stdDev: 1800 });
    this.baselineMetrics.set('EWA:interaction', { mean: 3800, stdDev: 1500 });
    this.baselineMetrics.set('Installment:interaction', { mean: 6200, stdDev: 2200 });
  }

  private getBaselineMetrics(loanType: string, eventType: string): any {
    return this.baselineMetrics.get(`${loanType}:${eventType}`);
  }

  private calculateZScore(value: number, mean: number, stdDev: number): number {
    return stdDev === 0 ? 0 : (value - mean) / stdDev;
  }

  private determineSeverity(errors: ValidationError[], warnings: ValidationWarning[]): 'critical' | 'high' | 'medium' | 'low' | 'info' {
    if (errors.some(e => e.severity === 'critical')) return 'critical';
    if (errors.some(e => e.severity === 'high')) return 'high';
    if (errors.some(e => e.severity === 'medium')) return 'medium';
    if (errors.some(e => e.severity === 'low')) return 'low';
    return 'info';
  }

  private generateStrictRecommendations(errors: ValidationError[], warnings: ValidationWarning[]): string[] {
    const recommendations: string[] = [];

    if (errors.length > 0) {
      recommendations.push('Immediate data quality review required');
    }

    if (errors.some(e => e.severity === 'critical')) {
      recommendations.push('CRITICAL: Stop data collection and investigate system integrity');
    }

    if (warnings.some(w => w.impact === 'compliance')) {
      recommendations.push('Review compliance procedures and regulatory requirements');
    }

    if (errors.some(e => e.code.includes('STATISTICAL'))) {
      recommendations.push('Conduct statistical analysis review and outlier investigation');
    }

    return recommendations;
  }

  private storeValidationHistory(participantId: string, result: ValidationResult): void {
    const history = this.validationHistory.get(participantId) || [];
    history.push(result);
    
    // Keep only last 100 validations per participant
    if (history.length > 100) {
      history.splice(0, history.length - 100);
    }
    
    this.validationHistory.set(participantId, history);
  }

  private checkEmergencyConditions(errors: ValidationError[], data: any, context: any): void {
    const emergencyConditions = [
      'SYSTEM_CLOCK_DRIFT',
      'DATA_INTEGRITY_FAILURE',
      'CONSENT_NOT_VERIFIED',
      'SENSITIVE_DATA_NOT_ENCRYPTED'
    ];

    const hasEmergency = errors.some(e => emergencyConditions.includes(e.code));
    if (hasEmergency) {
      this.emergencyFlags.add(data.participantId || 'unknown');
      console.error('EMERGENCY: Critical validation failure detected', {
        participantId: data.participantId,
        errors: errors.filter(e => emergencyConditions.includes(e.code)),
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Data integrity helper methods
  private generateIntegrityHash(data: any): string {
    const cleanData = { ...data };
    delete cleanData.checksum; // Remove checksum from hash calculation
    return this.calculateDataChecksum(cleanData);
  }

  private calculateDataChecksum(data: any): string {
    // Simple checksum implementation - in production use crypto.createHash
    const str = JSON.stringify(data, Object.keys(data).sort());
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  private generateDataFingerprint(data: any): string {
    return `${data.participantId}:${data.timestamp}:${data.eventType}`;
  }

  private isDuplicateData(fingerprint: string): boolean {
    // In production, check against database or cache
    return false; // Placeholder
  }

  private isDataEncrypted(value: any): boolean {
    // In production, implement proper encryption detection
    return typeof value === 'string' && value.length > 20; // Placeholder
  }

  private isDataNecessary(field: string, eventType: string): boolean {
    const necessaryFields = {
      'interaction': ['coordinates'],
      'cognitive': [],
      'behavioral': [],
      'physiological': [],
    };
    
    return necessaryFields[eventType]?.includes(field) || false;
  }

  // Emergency response methods
  public getEmergencyFlags(): string[] {
    return Array.from(this.emergencyFlags);
  }

  public clearEmergencyFlag(participantId: string): void {
    this.emergencyFlags.delete(participantId);
  }

  public getValidationStatistics(): {
    totalValidations: number;
    averageScore: number;
    criticalErrors: number;
    quarantineRate: number;
    emergencyFlags: number;
  } {
    let totalValidations = 0;
    let totalScore = 0;
    let criticalErrors = 0;
    let quarantined = 0;

    this.validationHistory.forEach(history => {
      history.forEach(result => {
        totalValidations++;
        totalScore += result.validationScore;
        if (result.errors.some(e => e.severity === 'critical')) {
          criticalErrors++;
        }
        if (result.quarantineRequired) {
          quarantined++;
        }
      });
    });

    return {
      totalValidations,
      averageScore: totalValidations > 0 ? totalScore / totalValidations : 0,
      criticalErrors,
      quarantineRate: totalValidations > 0 ? quarantined / totalValidations : 0,
      emergencyFlags: this.emergencyFlags.size,
    };
  }
}

export default UltraStrictValidationEngine; 