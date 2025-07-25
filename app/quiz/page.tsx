"use client";

import { QuizEngine } from '@/components/quiz/QuizEngine';
import { Suspense } from 'react';

export default function QuizPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Comprehension Quiz</h1>
      <Suspense fallback={<div>Loading Quiz...</div>}>
        <QuizEngine />
      </Suspense>
    </div>
  );
} 