import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, simulationType, loanAmount, apr, repaymentAmount, consentGiven, interactionLog } = body;

    const newSimulation = await prisma.loanSimulation.create({
      data: {
        userId,
        simulationType,
        loanAmount,
        apr,
        repaymentAmount,
        consentGiven,
        interactionLog,
      },
    });

    return NextResponse.json(newSimulation, { status: 201 });
  } catch (error) {
    console.error('Error creating simulation:', error);
    return NextResponse.json({ message: 'Error creating simulation' }, { status: 500 });
  }
} 