import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, quizId } = body;

    const newQuizAttempt = await prisma.quizAttempt.create({
      data: {
        userId,
        quizId,
      },
    });

    return NextResponse.json(newQuizAttempt, { status: 201 });
  } catch (error) {
    console.error('Error starting quiz attempt:', error);
    return NextResponse.json({ message: 'Error starting quiz attempt' }, { status: 500 });
  }
} 