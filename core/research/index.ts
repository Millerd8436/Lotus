/**
 * Research Core Components Barrel Export
 * Centralizes all research-grade components for proper integration
 */

// Data Collection and Validation
export { default as UltraStrictValidationEngine } from './UltraStrictValidationEngine';
export { default as DataCollectionEngine } from './DataCollectionEngine';

// Statistical Analysis
export { default as BulletproofStatisticalFramework } from './BulletproofStatisticalFramework';
export { default as StatisticalAnalysisPipeline } from './StatisticalAnalysisPipeline';

// Security Framework
export { default as MilitaryGradeSecurityFramework } from '../security/MilitaryGradeSecurityFramework';

// Monitoring System
export { default as ComprehensiveMonitoringSystem } from '../monitoring/ComprehensiveMonitoringSystem';

// IRB Compliance
export { default as IRBComplianceFramework } from './IRBComplianceFramework';

// Unified Research Platform Interface
export interface ResearchPlatformConfig {
  security: {
    level: 'TOP_SECRET' | 'SECRET' | 'CONFIDENTIAL' | 'UNCLASSIFIED';
    encryptionStandard: string;
    accessControl: 'zero_trust' | 'rbac' | 'dac';
  };
  validation: {
    strictnessLevel: 'ultra_strict' | 'strict' | 'standard';
    qualityThreshold: number;
    errorTolerance: number;
  };
  monitoring: {
    precision: 'microsecond' | 'millisecond';
    predictiveAnalysis: boolean;
    realTimeAlerts: boolean;
  };
  statistical: {
    powerRequirement: number;
    alphaLevel: number;
    effectSizeMinimum: number;
  };
  compliance: {
    irbApproval: string;
    regulatoryFramework: string[];
    auditLevel: 'comprehensive' | 'standard';
  };
}

// Research Platform Factory
export class ResearchPlatformFactory {
  static createUltraStrictPlatform(config: ResearchPlatformConfig) {
    return {
      validation: new UltraStrictValidationEngine(),
      statistics: new BulletproofStatisticalFramework({
        alphaLevel: config.statistical.alphaLevel,
        targetPower: config.statistical.powerRequirement,
        minEffectSize: config.statistical.effectSizeMinimum,
      }),
      security: new MilitaryGradeSecurityFramework(),
      monitoring: new ComprehensiveMonitoringSystem({
        id: 'research_platform',
        name: 'Research Monitoring',
        scope: { precision: config.monitoring.precision },
        metrics: [],
        thresholds: [],
        alerting: { realTime: config.monitoring.realTimeAlerts },
        retention: { days: 2555 }, // 7 years
        sampling: { interval: 1000 },
        aggregation: { method: 'statistical' },
        prediction: { enabled: config.monitoring.predictiveAnalysis },
      }),
      dataCollection: new DataCollectionEngine(),
      irbCompliance: new IRBComplianceFramework({
        id: 'research_study',
        studyTitle: 'Loan Research Platform',
        principalInvestigator: 'Research Team',
        institution: 'Research Institution',
        approvalNumber: config.compliance.irbApproval,
        approvalDate: new Date(),
        expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        status: 'approved',
        riskLevel: 'minimal',
        populationType: 'general',
        modifications: [],
      }),
    };
  }
}

// Type exports for integration
export type {
  ValidationResult,
  StatisticalValidation,
  SecurityEvent,
  MonitoringEvent,
  ResearchEvent,
} from './UltraStrictValidationEngine';

export type {
  StatisticalResult,
  PowerAnalysis,
  EffectSizeAnalysis,
} from './BulletproofStatisticalFramework';

export type {
  SecurityPolicy,
  ThreatAssessment,
  AccessDecision,
} from '../security/MilitaryGradeSecurityFramework';

export type {
  PerformanceMetrics,
  ReliabilityMetrics,
  PredictiveAnalysis,
} from '../monitoring/ComprehensiveMonitoringSystem'; 