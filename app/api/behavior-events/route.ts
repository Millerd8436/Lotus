import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { z } from 'zod';

// Validation schemas
const BehaviorEventSchema = z.object({
  id: z.string(),
  type: z.enum(['click', 'hover', 'scroll', 'form_edit', 'time_spent']),
  timestamp: z.number(),
  experimentId: z.string(),
  loanType: z.enum(['Payday', 'Installment', 'EWA', 'BNPL']).optional(),
  elementId: z.string().optional(),
  elementType: z.string().optional(),
  pageSection: z.string().optional(),
  scrollDepth: z.number().optional(),
  duration: z.number().optional(),
  value: z.string().optional(),
});

const BatchEventSchema = z.object({
  experimentId: z.string(),
  events: z.array(BehaviorEventSchema).max(100), // Limit batch size
});

// POST: Batch insert behavior events (optimized for performance)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = BatchEventSchema.parse(body);
    
    const { experimentId, events } = validatedData;
    
    // Find or create loan interaction session
    const currentLoanType = events[0]?.loanType;
    if (!currentLoanType) {
      return NextResponse.json(
        { error: 'Loan type required for behavior tracking' },
        { status: 400 }
      );
    }
    
    // Check if session exists
    const session = await prisma.participantSession.findFirst({
      where: { id: experimentId },
      include: { 
        loanInteractions: {
          where: { 
            loanType: currentLoanType,
            endTime: null // Current active interaction
          }
        }
      }
    });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Invalid experiment session' },
        { status: 400 }
      );
    }
    
    let currentInteraction = session.loanInteractions[0];
    
    // Create new interaction if none exists
    if (!currentInteraction) {
      const presentationOrder = session.loanInteractions.length + 1;
      currentInteraction = await prisma.loanInteraction.create({
        data: {
          sessionId: experimentId,
          loanType: currentLoanType,
          presentationOrder,
        }
      });
    }
    
    // Batch insert behavior events (optimized single query)
    const behaviorEventsToInsert = events.map(event => ({
      interactionId: currentInteraction.id,
      eventType: event.type,
      timestamp: new Date(event.timestamp),
      elementId: event.elementId,
      elementType: event.elementType,
      pageSection: event.pageSection,
      scrollDepth: event.scrollDepth,
      duration: event.duration,
      value: event.value,
    }));
    
    // Use transaction for consistency
    const result = await prisma.$transaction(async (tx) => {
      // Insert events
      const insertedEvents = await tx.behaviorEvent.createMany({
        data: behaviorEventsToInsert,
        skipDuplicates: true,
      });
      
      // Update interaction metrics (aggregated)
      const aggregatedMetrics = calculateAggregatedMetrics(events);
      await tx.loanInteraction.update({
        where: { id: currentInteraction.id },
        data: {
          totalTimeMs: { increment: aggregatedMetrics.totalTimeMs },
          clicksOnFeeDisclosure: { increment: aggregatedMetrics.clicksOnFeeDisclosure },
          clicksOnTermsDetails: { increment: aggregatedMetrics.clicksOnTermsDetails },
          scrollDepthPercent: Math.max(currentInteraction.scrollDepthPercent, aggregatedMetrics.maxScrollDepth),
          feeDisclosureViewedMs: { increment: aggregatedMetrics.feeDisclosureViewedMs },
          termsDetailsViewedMs: { increment: aggregatedMetrics.termsDetailsViewedMs },
        }
      });
      
      return insertedEvents;
    });
    
    return NextResponse.json({ 
      success: true, 
      eventsInserted: result.count,
      interactionId: currentInteraction.id 
    });
    
  } catch (error) {
    console.error('Behavior events API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET: Retrieve behavior events for analysis (with pagination)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const loanType = searchParams.get('loanType');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = (page - 1) * limit;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }
    
    const whereClause: any = {
      interaction: {
        sessionId,
        ...(loanType && { loanType }),
      }
    };
    
    const [events, totalCount] = await prisma.$transaction([
      prisma.behaviorEvent.findMany({
        where: whereClause,
        include: {
          interaction: {
            select: {
              loanType: true,
              presentationOrder: true,
            }
          }
        },
        orderBy: { timestamp: 'asc' },
        skip: offset,
        take: limit,
      }),
      prisma.behaviorEvent.count({ where: whereClause }),
    ]);
    
    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      }
    });
    
  } catch (error) {
    console.error('Behavior events GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Utility function to calculate aggregated metrics
function calculateAggregatedMetrics(events: any[]) {
  return events.reduce((acc, event) => {
    switch (event.type) {
      case 'click':
        if (event.elementId?.includes('fee-disclosure')) {
          acc.clicksOnFeeDisclosure++;
        }
        if (event.elementId?.includes('terms-details')) {
          acc.clicksOnTermsDetails++;
        }
        break;
      case 'scroll':
        acc.maxScrollDepth = Math.max(acc.maxScrollDepth, event.scrollDepth || 0);
        break;
      case 'time_spent':
        acc.totalTimeMs += event.duration || 0;
        if (event.elementId?.includes('fee-disclosure')) {
          acc.feeDisclosureViewedMs += event.duration || 0;
        }
        if (event.elementId?.includes('terms-details')) {
          acc.termsDetailsViewedMs += event.duration || 0;
        }
        break;
    }
    return acc;
  }, {
    totalTimeMs: 0,
    clicksOnFeeDisclosure: 0,
    clicksOnTermsDetails: 0,
    maxScrollDepth: 0,
    feeDisclosureViewedMs: 0,
    termsDetailsViewedMs: 0,
  });
} 