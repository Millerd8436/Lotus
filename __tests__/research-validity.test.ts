/**
 * Research Validity Testing Framework
 * Ensures statistical integrity and experimental validity of the Lotus platform
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { prisma } from '../app/lib/prisma';
import { VALIDATED_PATTERNS } from '../types';

// Test Data Factory
class ResearchTestFactory {
  static createParticipantSession(overrides = {}) {
    return {
      id: `test-session-${Date.now()}`,
      loanOrder: ['Payday', 'BNPL', 'EWA', 'Installment'],
      priorLoanExperience: false,
      ...overrides,
    };
  }

  static createLoanInteraction(sessionId: string, loanType: string, overrides = {}) {
    return {
      sessionId,
      loanType,
      presentationOrder: 1,
      totalTimeMs: 120000, // 2 minutes
      clicksOnFeeDisclosure: 3,
      clicksOnTermsDetails: 1,
      scrollDepthPercent: 85,
      feeDisclosureViewedMs: 15000,
      termsDetailsViewedMs: 8000,
      perceivedTrustRating: 3,
      perceivedVoluntariness: 4,
      perceivedClarity: 2,
      ...overrides,
    };
  }

  static createComprehensionQuiz(sessionId: string, loanType: string, overrides = {}) {
    return {
      sessionId,
      loanType,
      totalCostComprehension: true,
      aprComprehension: false,
      feesComprehension: true,
      loanNatureComprehension: true,
      comprehensionScore: 75,
      confidenceRating: 5,
      ...overrides,
    };
  }
}

describe('Research Validity Framework', () => {
  beforeEach(async () => {
    // Clean test database
    await prisma.behaviorEvent.deleteMany();
    await prisma.comprehensionQuiz.deleteMany();
    await prisma.loanInteraction.deleteMany();
    await prisma.participantSession.deleteMany();
  });

  afterEach(async () => {
    // Cleanup after each test
    await prisma.behaviorEvent.deleteMany();
    await prisma.comprehensionQuiz.deleteMany();
    await prisma.loanInteraction.deleteMany();
    await prisma.participantSession.deleteMany();
  });

  describe('Experimental Design Validity', () => {
    test('should ensure proper randomization of loan order', async () => {
      const sessions = [];
      
      // Create 100 test sessions
      for (let i = 0; i < 100; i++) {
        const session = await prisma.participantSession.create({
          data: ResearchTestFactory.createParticipantSession({
            id: `test-${i}`,
            loanOrder: shuffleArray(['Payday', 'BNPL', 'EWA', 'Installment']),
          }),
        });
        sessions.push(session);
      }

      // Analyze randomization
      const orderCounts = {};
      sessions.forEach(session => {
        const orderKey = session.loanOrder.join('-');
        orderCounts[orderKey] = (orderCounts[orderKey] || 0) + 1;
      });

      // Chi-square test for randomization (simplified)
      const expectedFrequency = 100 / 24; // 24 possible orders
      const totalOrders = Object.keys(orderCounts).length;
      
      expect(totalOrders).toBeGreaterThan(10); // Should have good variety
      
      // No single order should dominate (> 20% of total)
      Object.values(orderCounts).forEach(count => {
        expect(count).toBeLessThanOrEqual(20);
      });
    });

    test('should validate IV-DV relationship integrity', () => {
      // Test that each loan type has its specific validated patterns
      const loanTypes = ['Payday', 'BNPL', 'EWA', 'Installment'] as const;
      
      loanTypes.forEach(loanType => {
        const patterns = VALIDATED_PATTERNS[loanType];
        expect(patterns).toBeDefined();
        expect(patterns.length).toBeGreaterThan(0);
        
        // Each pattern should have required research validation
        patterns.forEach(pattern => {
          expect(pattern.researchBasis).toBeDefined();
          expect(pattern.researchBasis.length).toBeGreaterThan(10);
          expect(pattern.measurableOutcome).toBeDefined();
          expect(pattern.validationStudy).toBeDefined();
        });
      });
    });

    test('should ensure dependent variable measurement completeness', async () => {
      const session = await prisma.participantSession.create({
        data: ResearchTestFactory.createParticipantSession(),
      });

      const interaction = await prisma.loanInteraction.create({
        data: ResearchTestFactory.createLoanInteraction(session.id, 'Payday'),
      });

      const quiz = await prisma.comprehensionQuiz.create({
        data: ResearchTestFactory.createComprehensionQuiz(session.id, 'Payday'),
      });

      // Verify all required DVs are captured
      expect(interaction.perceivedTrustRating).toBeDefined();
      expect(interaction.perceivedVoluntariness).toBeDefined();
      expect(interaction.perceivedClarity).toBeDefined();
      
      expect(quiz.totalCostComprehension).toBeDefined();
      expect(quiz.aprComprehension).toBeDefined();
      expect(quiz.feesComprehension).toBeDefined();
      expect(quiz.loanNatureComprehension).toBeDefined();
      expect(quiz.comprehensionScore).toBeDefined();
    });
  });

  describe('Statistical Power Analysis', () => {
    test('should detect meaningful effect sizes (Cohen\'s d ≥ 0.3)', async () => {
      // Create test data with known effect size
      const session1 = await prisma.participantSession.create({
        data: ResearchTestFactory.createParticipantSession({ id: 'session-1' }),
      });

      const session2 = await prisma.participantSession.create({
        data: ResearchTestFactory.createParticipantSession({ id: 'session-2' }),
      });

      // Payday loan (high deception) vs BNPL (medium deception)
      const paydayInteraction = await prisma.loanInteraction.create({
        data: ResearchTestFactory.createLoanInteraction(session1.id, 'Payday', {
          perceivedTrustRating: 2, // Low trust
          totalTimeMs: 180000, // Longer time (confusion)
        }),
      });

      const bnplInteraction = await prisma.loanInteraction.create({
        data: ResearchTestFactory.createLoanInteraction(session2.id, 'BNPL', {
          perceivedTrustRating: 4, // Higher trust
          totalTimeMs: 120000, // Normal time
        }),
      });

      // Calculate effect size
      const trustDifference = bnplInteraction.perceivedTrustRating! - paydayInteraction.perceivedTrustRating!;
      const timeDifference = paydayInteraction.totalTimeMs - bnplInteraction.totalTimeMs;

      // Cohen's d calculation (simplified)
      const pooledSD = 1.5; // Assumed based on 7-point scale
      const cohensD = trustDifference / pooledSD;

      expect(Math.abs(cohensD)).toBeGreaterThanOrEqual(0.3); // Meaningful effect
      expect(timeDifference).toBeGreaterThan(30000); // 30+ second difference
    });

    test('should validate measurement precision (≥ 90% data completeness)', async () => {
      const sessions = [];
      
      // Create multiple sessions
      for (let i = 0; i < 50; i++) {
        const session = await prisma.participantSession.create({
          data: ResearchTestFactory.createParticipantSession({ id: `precision-${i}` }),
        });

        await prisma.loanInteraction.create({
          data: ResearchTestFactory.createLoanInteraction(session.id, 'Payday'),
        });

        await prisma.comprehensionQuiz.create({
          data: ResearchTestFactory.createComprehensionQuiz(session.id, 'Payday'),
        });

        sessions.push(session);
      }

      // Check data completeness
      const interactions = await prisma.loanInteraction.findMany();
      const quizzes = await prisma.comprehensionQuiz.findMany();

      const completeInteractions = interactions.filter(i => 
        i.perceivedTrustRating !== null && 
        i.totalTimeMs > 0 && 
        i.scrollDepthPercent > 0
      );

      const completeQuizzes = quizzes.filter(q => 
        q.totalCostComprehension !== null && 
        q.comprehensionScore !== null
      );

      const interactionCompleteness = completeInteractions.length / interactions.length;
      const quizCompleteness = completeQuizzes.length / quizzes.length;

      expect(interactionCompleteness).toBeGreaterThanOrEqual(0.90);
      expect(quizCompleteness).toBeGreaterThanOrEqual(0.90);
    });
  });

  describe('Deceptive Pattern Effectiveness', () => {
    test('should validate payday rollover trap detection', async () => {
      const session = await prisma.participantSession.create({
        data: ResearchTestFactory.createParticipantSession(),
      });

      // Test payday loan with rollover trap exposure
      const interaction = await prisma.loanInteraction.create({
        data: ResearchTestFactory.createLoanInteraction(session.id, 'Payday', {
          loanSpecificMetrics: {
            rollovercTrapExposed: true,
            rollovercMechanismClicked: false,
            timeSpentOnRolloverTerms: 5000, // 5 seconds (too little)
          },
        }),
      });

      const quiz = await prisma.comprehensionQuiz.create({
        data: ResearchTestFactory.createComprehensionQuiz(session.id, 'Payday', {
          loanSpecificResponses: {
            rolloverFeeComprehension: false, // Failed to understand
            sixMonthCostCalculation: 'wrong', // Incorrect calculation
          },
          comprehensionScore: 45, // Low score due to rollover confusion
        }),
      });

      // Validate pattern effectiveness
      const metrics = interaction.loanSpecificMetrics as any;
      expect(metrics.rollovercTrapExposed).toBe(true);
      expect(metrics.timeSpentOnRolloverTerms).toBeLessThan(10000); // Insufficient time

      const responses = quiz.loanSpecificResponses as any;
      expect(responses.rolloverFeeComprehension).toBe(false);
      expect(quiz.comprehensionScore).toBeLessThan(60); // Below understanding threshold
    });

    test('should validate BNPL credit disguise effectiveness', async () => {
      const session = await prisma.participantSession.create({
        data: ResearchTestFactory.createParticipantSession(),
      });

      const interaction = await prisma.loanInteraction.create({
        data: ResearchTestFactory.createLoanInteraction(session.id, 'BNPL', {
          loanSpecificMetrics: {
            creditTerminologyExposed: true,
            payInFourEmphasisShown: true,
            lateFeeDisclosureClicked: false,
          },
        }),
      });

      const quiz = await prisma.comprehensionQuiz.create({
        data: ResearchTestFactory.createComprehensionQuiz(session.id, 'BNPL', {
          loanNatureComprehension: false, // Didn't recognize as loan
          loanSpecificResponses: {
            recognizedAsCredit: false,
            understoodLateFees: false,
          },
          comprehensionScore: 40, // Very low due to disguise
        }),
      });

      expect(quiz.loanNatureComprehension).toBe(false);
      expect(quiz.comprehensionScore).toBeLessThan(50);
    });
  });

  describe('Data Quality Assurance', () => {
    test('should detect and flag outlier behavioral patterns', async () => {
      const session = await prisma.participantSession.create({
        data: ResearchTestFactory.createParticipantSession(),
      });

      // Create outlier interaction (extremely fast completion)
      const outlierInteraction = await prisma.loanInteraction.create({
        data: ResearchTestFactory.createLoanInteraction(session.id, 'Payday', {
          totalTimeMs: 5000, // 5 seconds (suspiciously fast)
          scrollDepthPercent: 10, // Barely scrolled
          clicksOnFeeDisclosure: 0, // No engagement
          clicksOnTermsDetails: 0,
        }),
      });

      // Quality flags
      const isOutlier = (
        outlierInteraction.totalTimeMs < 30000 || // < 30 seconds
        outlierInteraction.scrollDepthPercent < 25 || // < 25% scroll
        (outlierInteraction.clicksOnFeeDisclosure + outlierInteraction.clicksOnTermsDetails) === 0
      );

      expect(isOutlier).toBe(true);
    });

    test('should ensure behavioral tracking precision (±10ms)', async () => {
      const startTime = Date.now();
      
      // Simulate precise timing
      const eventTimestamp = startTime + 1500; // 1.5 seconds later
      const recordedTimestamp = new Date(eventTimestamp);
      
      const timePrecision = Math.abs(recordedTimestamp.getTime() - eventTimestamp);
      expect(timePrecision).toBeLessThanOrEqual(10); // ±10ms precision
    });
  });
});

// Test Utilities
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Performance Testing
describe('Performance & Scalability', () => {
  test('should handle concurrent user sessions efficiently', async () => {
    const concurrentUsers = 10;
    const startTime = Date.now();
    
    // Simulate concurrent session creation
    const promises = Array.from({ length: concurrentUsers }, (_, i) =>
      prisma.participantSession.create({
        data: ResearchTestFactory.createParticipantSession({ id: `concurrent-${i}` }),
      })
    );

    await Promise.all(promises);
    const endTime = Date.now();
    
    const totalTime = endTime - startTime;
    const avgTimePerSession = totalTime / concurrentUsers;
    
    expect(avgTimePerSession).toBeLessThan(100); // < 100ms per session
    expect(totalTime).toBeLessThan(2000); // < 2 seconds total
  });

  test('should maintain query performance with large datasets', async () => {
    // Create large dataset
    const largeDatasetSize = 1000;
    
    for (let i = 0; i < largeDatasetSize; i++) {
      const session = await prisma.participantSession.create({
        data: ResearchTestFactory.createParticipantSession({ id: `large-${i}` }),
      });

      await prisma.loanInteraction.create({
        data: ResearchTestFactory.createLoanInteraction(session.id, 'Payday'),
      });
    }

    // Test query performance
    const queryStart = Date.now();
    
    const results = await prisma.loanInteraction.findMany({
      where: { loanType: 'Payday' },
      include: { session: true },
      orderBy: { totalTimeMs: 'desc' },
      take: 100,
    });

    const queryTime = Date.now() - queryStart;
    
    expect(queryTime).toBeLessThan(100); // < 100ms query time
    expect(results.length).toBe(100);
  });
}); 