import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { experimentId, dataConsent } = body;

    if (!experimentId) {
      return NextResponse.json(
        { error: 'Experiment ID is required' },
        { status: 400 }
      );
    }

    // Update the experiment with the consent decision
    const updatedExperiment = await prisma.experiment.update({
      where: { id: experimentId },
      data: { 
        dataConsent,
        phaseData: {
          ...(await prisma.experiment.findUnique({ 
            where: { id: experimentId },
            select: { phaseData: true }
          }))?.phaseData as any || {},
          dataConsentTimestamp: new Date().toISOString(),
          dataConsentGiven: dataConsent,
        }
      },
    });

    return NextResponse.json({
      success: true,
      experimentId: updatedExperiment.id,
      dataConsent: updatedExperiment.dataConsent,
    });
  } catch (error) {
    console.error('Consent update error:', error);
    return NextResponse.json(
      { error: 'Failed to update consent' },
      { status: 500 }
    );
  }
} 