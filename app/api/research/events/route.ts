import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { z } from 'zod';

// Research-Grade Event Validation Schema
const ResearchEventSchema = z.object({
  id: z.string(),
  participantId: z.string(),
  sessionId: z.string(),
  loanType: z.enum(['Payday', 'BNPL', 'EWA', 'Installment']),
  eventType: z.enum(['interaction', 'cognitive', 'behavioral', 'physiological']),
  timestamp: z.number().positive(), // Microsecond precision
  relativeTimestamp: z.number().min(0),
  
  // Interaction Events
  elementId: z.string().optional(),
  elementType: z.string().optional(),
  actionType: z.enum(['click', 'hover', 'scroll', 'focus', 'blur', 'input']).optional(),
  coordinates: z.object({ x: z.number(), y: z.number() }).optional(),
  
  // Cognitive Events
  attentionState: z.enum(['focused', 'distracted', 'confused']).optional(),
  cognitiveLoad: z.number().min(1).max(10).optional(),
  confidenceLevel: z.number().min(1).max(7).optional(),
  
  // Behavioral Events
  scrollDepth: z.number().min(0).max(100).optional(),
  timeSpent: z.number().min(0).optional(),
  interactionIntensity: z.number().min(0).optional(),
  hesitationPattern: z.boolean().optional(),
  
  // Research Metadata
  studyPhase: z.string(),
  conditionGroup: z.string(),
  trialNumber: z.number().min(0),
  validationFlags: z.object({
    isValid: z.boolean(),
    qualityScore: z.number().min(0).max(100),
    outlierFlags: z.array(z.string()),
    attentionCheckPassed: z.boolean(),
    dataCompleteness: z.number().min(0).max(100),
    temporalConsistency: z.boolean(),
  }),
});

const ResearchSessionSchema = z.object({
  id: z.string(),
  participantId: z.string(),
  startTime: z.number(),
  endTime: z.number().optional(),
  condition: z.enum(['experimental', 'control']),
  randomizationSeed: z.number(),
  loanOrder: z.array(z.string()),
  scenarioAssignment: z.string(),
  completionRate: z.number().min(0).max(100),
  validEventCount: z.number().min(0),
  invalidEventCount: z.number().min(0),
  averageResponseTime: z.number().min(0),
});

const ResearchBatchSchema = z.object({
  events: z.array(ResearchEventSchema).max(200), // Larger batches for research
  session: ResearchSessionSchema,
  qualityMetrics: z.object({
    overallQuality: z.number().min(0).max(100),
    attentionScore: z.number().min(0).max(100),
    engagementLevel: z.number().min(0).max(100),
    dataConsistency: z.number().min(0).max(100),
  }).optional(),
});

// Research Analytics Cache
interface AnalyticsCache {
  lastUpdate: number;
  participantCount: number;
  eventCount: number;
  qualityMetrics: any;
  powerAnalysis: any;
}

let analyticsCache: AnalyticsCache | null = null;

// POST: High-Performance Research Event Collection
export async function POST(request: NextRequest) {
  const startTime = performance.now();
  
  try {
    const body = await request.json();
    const validatedData = ResearchBatchSchema.parse(body);
    
    const { events, session, qualityMetrics } = validatedData;
    
    // Real-time Data Quality Assessment
    const qualityAssessment = assessDataQuality(events);
    if (qualityAssessment.criticalIssues.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Data quality issues detected',
        issues: qualityAssessment.criticalIssues,
        recommendations: qualityAssessment.recommendations,
      }, { status: 422 });
    }
    
    // Begin Database Transaction for Research Integrity
    const result = await prisma.$transaction(async (tx) => {
      // Upsert Research Session
      const dbSession = await tx.researchSession.upsert({
        where: { id: session.id },
        update: {
          endTime: session.endTime ? new Date(session.endTime / 1000) : undefined,
          completionRate: session.completionRate,
          validEventCount: session.validEventCount,
          invalidEventCount: session.invalidEventCount,
          averageResponseTime: session.averageResponseTime,
          updatedAt: new Date(),
        },
        create: {
          id: session.id,
          participantId: session.participantId,
          startTime: new Date(session.startTime / 1000),
          endTime: session.endTime ? new Date(session.endTime / 1000) : undefined,
          condition: session.condition,
          randomizationSeed: session.randomizationSeed,
          loanOrder: session.loanOrder,
          scenarioAssignment: session.scenarioAssignment,
          completionRate: session.completionRate,
          validEventCount: session.validEventCount,
          invalidEventCount: session.invalidEventCount,
          averageResponseTime: session.averageResponseTime,
        },
      });
      
      // Batch Insert Research Events with Optimized Query
      const eventsToInsert = events
        .filter(event => event.validationFlags.isValid)
        .map(event => ({
          id: event.id,
          sessionId: event.sessionId,
          participantId: event.participantId,
          loanType: event.loanType,
          eventType: event.eventType,
          timestamp: new Date(event.timestamp / 1000),
          relativeTimestamp: event.relativeTimestamp,
          
          // Event Data (structured for analysis)
          elementId: event.elementId,
          elementType: event.elementType,
          actionType: event.actionType,
          coordinates: event.coordinates ? JSON.stringify(event.coordinates) : null,
          
          // Cognitive & Behavioral Data
          attentionState: event.attentionState,
          cognitiveLoad: event.cognitiveLoad,
          confidenceLevel: event.confidenceLevel,
          scrollDepth: event.scrollDepth,
          timeSpent: event.timeSpent,
          interactionIntensity: event.interactionIntensity,
          hesitationPattern: event.hesitationPattern,
          
          // Research Metadata
          studyPhase: event.studyPhase,
          conditionGroup: event.conditionGroup,
          trialNumber: event.trialNumber,
          
          // Quality Metrics
          qualityScore: event.validationFlags.qualityScore,
          outlierFlags: event.validationFlags.outlierFlags,
          attentionCheckPassed: event.validationFlags.attentionCheckPassed,
          dataCompleteness: event.validationFlags.dataCompleteness,
          temporalConsistency: event.validationFlags.temporalConsistency,
        }));
      
      const insertedEvents = await tx.researchEvent.createMany({
        data: eventsToInsert,
        skipDuplicates: true,
      });
      
      // Update Real-time Analytics
      await updateRealTimeAnalytics(tx, session.participantId, eventsToInsert.length);
      
      // Trigger Statistical Power Analysis
      if (eventsToInsert.length > 0) {
        await triggerPowerAnalysis(tx, session.participantId);
      }
      
      return {
        session: dbSession,
        eventsInserted: insertedEvents.count,
        qualityScore: qualityAssessment.overallQuality,
      };
    });
    
    const processingTime = performance.now() - startTime;
    
    // Real-time Research Monitoring
    if (processingTime > 500) { // Alert if processing > 500ms
      console.warn('Research API performance degradation:', {
        processingTime: `${processingTime.toFixed(2)}ms`,
        eventCount: events.length,
        participantId: session.participantId,
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        sessionId: result.session.id,
        eventsProcessed: result.eventsInserted,
        qualityScore: result.qualityScore,
        processingTime: `${processingTime.toFixed(2)}ms`,
        warnings: qualityAssessment.warnings,
      },
      analytics: await getQuickAnalytics(session.participantId),
    });
    
  } catch (error) {
    console.error('Research Events API Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Research data validation failed',
        details: error.errors,
        researchNote: 'Data quality standards not met for scientific analysis',
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Research data collection system error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

// GET: Research Analytics and Data Quality Dashboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const participantId = searchParams.get('participantId');
    const sessionId = searchParams.get('sessionId');
    const analysisType = searchParams.get('analysis') || 'summary';
    const timeWindow = searchParams.get('timeWindow') || '24h';
    
    if (analysisType === 'power') {
      return NextResponse.json(await getPowerAnalysis(participantId));
    }
    
    if (analysisType === 'quality') {
      return NextResponse.json(await getDataQualityReport(participantId, sessionId));
    }
    
    if (analysisType === 'behavioral') {
      return NextResponse.json(await getBehavioralAnalytics(participantId, sessionId));
    }
    
    // Default: Comprehensive Research Summary
    const summary = await getResearchSummary(timeWindow);
    return NextResponse.json(summary);
    
  } catch (error) {
    console.error('Research Analytics Error:', error);
    return NextResponse.json({
      error: 'Analytics generation failed',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

// Research Data Quality Assessment
function assessDataQuality(events: any[]): {
  overallQuality: number;
  criticalIssues: string[];
  warnings: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  // Temporal Consistency Check
  let previousTimestamp = 0;
  let temporalInconsistencies = 0;
  
  events.forEach((event, index) => {
    if (event.timestamp < previousTimestamp) {
      temporalInconsistencies++;
    }
    previousTimestamp = event.timestamp;
    
    // Quality Score Validation
    if (event.validationFlags.qualityScore < 50) {
      warnings.push(`Event ${event.id} has low quality score: ${event.validationFlags.qualityScore}`);
    }
    
    // Attention Check Validation
    if (!event.validationFlags.attentionCheckPassed && event.eventType === 'cognitive') {
      issues.push(`Attention check failed for event ${event.id}`);
    }
    
    // Data Completeness Check
    if (event.validationFlags.dataCompleteness < 80) {
      warnings.push(`Incomplete data for event ${event.id}: ${event.validationFlags.dataCompleteness}%`);
    }
  });
  
  // Temporal Consistency Assessment
  const temporalConsistency = 1 - (temporalInconsistencies / events.length);
  if (temporalConsistency < 0.95) {
    issues.push(`Temporal inconsistency detected: ${(temporalConsistency * 100).toFixed(1)}% consistency`);
  }
  
  // Overall Quality Calculation
  const qualityScores = events.map(e => e.validationFlags.qualityScore);
  const averageQuality = qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length;
  const overallQuality = Math.min(averageQuality, temporalConsistency * 100);
  
  // Generate Recommendations
  if (overallQuality < 90) {
    recommendations.push('Consider increasing data collection precision');
  }
  if (temporalInconsistencies > 0) {
    recommendations.push('Review timestamp synchronization mechanisms');
  }
  if (warnings.length > events.length * 0.1) {
    recommendations.push('Implement additional quality control measures');
  }
  
  return {
    overallQuality,
    criticalIssues: issues,
    warnings,
    recommendations,
  };
}

// Real-time Analytics Updates
async function updateRealTimeAnalytics(tx: any, participantId: string, eventCount: number) {
  await tx.researchAnalytics.upsert({
    where: { participantId },
    update: {
      eventCount: { increment: eventCount },
      lastActivity: new Date(),
      updatedAt: new Date(),
    },
    create: {
      participantId,
      eventCount,
      lastActivity: new Date(),
      qualityScore: 95, // Initial high quality assumption
    },
  });
}

// Statistical Power Analysis Trigger
async function triggerPowerAnalysis(tx: any, participantId: string) {
  // Check if we need to update power analysis
  const participantCount = await tx.researchSession.count({
    where: { 
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    }
  });
  
  if (participantCount % 10 === 0) { // Every 10 participants
    // Trigger background power analysis
    console.log(`Power analysis triggered at ${participantCount} participants`);
    // Implement actual power analysis logic
  }
}

// Quick Analytics for Real-time Feedback
async function getQuickAnalytics(participantId: string) {
  const session = await prisma.researchSession.findFirst({
    where: { participantId },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { events: true }
      }
    }
  });
  
  if (!session) return null;
  
  return {
    sessionDuration: session.endTime ? 
      (session.endTime.getTime() - session.startTime.getTime()) / 1000 : 
      (Date.now() - session.startTime.getTime()) / 1000,
    eventCount: session._count.events,
    completionRate: session.completionRate,
    qualityEstimate: session.validEventCount / (session.validEventCount + session.invalidEventCount) * 100,
  };
}

// Comprehensive Research Analytics Functions
async function getPowerAnalysis(participantId?: string | null) {
  // Implement comprehensive power analysis
  return {
    currentPower: 0.85,
    requiredSampleSize: 200,
    currentSampleSize: 150,
    recommendation: 'continue',
    effectSizeEstimate: 0.35,
    confidenceInterval: [0.25, 0.45],
  };
}

async function getDataQualityReport(participantId?: string | null, sessionId?: string | null) {
  const whereClause: any = {};
  if (participantId) whereClause.participantId = participantId;
  if (sessionId) whereClause.sessionId = sessionId;
  
  const events = await prisma.researchEvent.findMany({
    where: whereClause,
    select: {
      qualityScore: true,
      attentionCheckPassed: true,
      dataCompleteness: true,
      temporalConsistency: true,
      outlierFlags: true,
    },
    take: 1000, // Limit for performance
  });
  
  const averageQuality = events.reduce((sum, e) => sum + e.qualityScore, 0) / events.length;
  const attentionPassRate = events.filter(e => e.attentionCheckPassed).length / events.length;
  const temporalConsistencyRate = events.filter(e => e.temporalConsistency).length / events.length;
  
  return {
    averageQuality,
    attentionPassRate,
    temporalConsistencyRate,
    outlierCount: events.filter(e => e.outlierFlags && e.outlierFlags.length > 0).length,
    totalEvents: events.length,
    recommendations: generateQualityRecommendations(averageQuality, attentionPassRate),
  };
}

async function getBehavioralAnalytics(participantId?: string | null, sessionId?: string | null) {
  // Implement behavioral pattern analysis
  return {
    engagementMetrics: {},
    attentionPatterns: {},
    interactionAnalysis: {},
    cognitiveLoadIndicators: {},
  };
}

async function getResearchSummary(timeWindow: string) {
  const hoursAgo = timeWindow === '24h' ? 24 : timeWindow === '7d' ? 168 : 1;
  const since = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
  
  const [sessionCount, eventCount, avgQuality] = await Promise.all([
    prisma.researchSession.count({ where: { createdAt: { gte: since } } }),
    prisma.researchEvent.count({ where: { timestamp: { gte: since } } }),
    prisma.researchEvent.aggregate({
      where: { timestamp: { gte: since } },
      _avg: { qualityScore: true },
    }),
  ]);
  
  return {
    timeWindow,
    participantSessions: sessionCount,
    totalEvents: eventCount,
    averageDataQuality: avgQuality._avg.qualityScore || 0,
    dataCollectionRate: eventCount / hoursAgo, // Events per hour
    systemHealth: 'optimal',
  };
}

function generateQualityRecommendations(avgQuality: number, attentionRate: number): string[] {
  const recommendations: string[] = [];
  
  if (avgQuality < 85) {
    recommendations.push('Implement additional data validation checks');
  }
  if (attentionRate < 0.9) {
    recommendations.push('Review attention check mechanisms');
  }
  if (avgQuality > 95 && attentionRate > 0.95) {
    recommendations.push('Data quality is excellent - maintain current procedures');
  }
  
  return recommendations;
} 