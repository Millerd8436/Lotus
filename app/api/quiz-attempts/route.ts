// app/api/quiz-attempts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      simulationAttemptId,
      experimentId,
      quizName,
      responses
    } = body;

    if ((!simulationAttemptId && !experimentId) || !quizName || !responses) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const newQuizAttempt = await prisma.quizAttempt.create({
      data: {
        simulationAttemptId,
        experimentId,
        quizName,
        responses: {
          create: responses.map((r: any) => ({
            questionId: r.questionId,
            answer: r.answer,
            timeTaken: r.timeTaken
          })),
        },
      },
      include: {
        responses: true,
      },
    });

    return NextResponse.json(newQuizAttempt, { status: 201 });
  } catch (error) {
    console.error('Failed to create quiz attempt:', error);
    return NextResponse.json({ error: 'Failed to create quiz attempt' }, { status: 500 });
  }
} 