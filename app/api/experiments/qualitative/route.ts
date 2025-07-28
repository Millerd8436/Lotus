import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { experimentId, feedback } = body;

    if (!experimentId || !feedback) {
      return NextResponse.json(
        { error: 'Experiment ID and feedback are required' },
        { status: 400 }
      );
    }

    // Find the existing experiment
    const experiment = await prisma.experiment.findUnique({
      where: { id: experimentId },
    });

    if (!experiment) {
      return NextResponse.json(
        { error: 'Experiment not found' },
        { status: 404 }
      );
    }

    // Append the qualitative feedback to the phaseData
    const updatedPhaseData = {
      ...experiment.phaseData as any,
      finalQualitativeFeedback: feedback,
    };

    const updatedExperiment = await prisma.experiment.update({
      where: { id: experimentId },
      data: {
        phaseData: updatedPhaseData,
      },
    });

    return NextResponse.json({
      success: true,
      experimentId: updatedExperiment.id,
    });
  } catch (error) {
    console.error('Error saving qualitative feedback:', error);
    return NextResponse.json(
      { error: 'Failed to save qualitative feedback' },
      { status: 500 }
    );
  }
} 