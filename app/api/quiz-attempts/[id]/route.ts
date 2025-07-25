import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { answers, score } = body;
    const { id } = params;

    const updatedQuizAttempt = await prisma.quizAttempt.update({
      where: { id },
      data: {
        answers: {
          create: answers.map((answer: any) => ({
            questionId: answer.questionId, // Assuming you'll pass questionId from the frontend
            value: answer.answer,
            isCorrect: answer.isCorrect,
            confidence: answer.confidence,
          })),
        },
        score,
        completedAt: new Date(),
      },
    });

    return NextResponse.json(updatedQuizAttempt);
  } catch (error) {
    console.error(`Error submitting quiz attempt ${params.id}:`, error);
    return NextResponse.json({ message: `Error submitting quiz attempt ${params.id}` }, { status: 500 });
  }
} 