// app/api/experiments/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, assignedLoanType, conditionOrder } = body;

    if (!userId || !assignedLoanType || !conditionOrder) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newExperiment = await prisma.experiment.create({
      data: {
        userId,
        assignedLoanType,
        conditionOrder,
      },
    });

    return NextResponse.json(newExperiment, { status: 201 });
  } catch (error) {
    console.error('Failed to create experiment:', error);
    return NextResponse.json({ error: 'Failed to create experiment' }, { status: 500 });
  }
} 