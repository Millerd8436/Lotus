import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      experimentId,
      uxCondition,
      loanType,
      ...simulationData
    } = body;

    if (!experimentId || !uxCondition || !loanType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newSimulationAttempt = await prisma.simulationAttempt.create({
      data: {
        experimentId,
        uxCondition,
        loanType,
        ...simulationData
      },
    });

    return NextResponse.json(newSimulationAttempt, { status: 201 });
  } catch (error) {
    console.error('Failed to create simulation attempt:', error);
    return NextResponse.json({ error: 'Failed to create simulation attempt' }, { status: 500 });
  }
} 