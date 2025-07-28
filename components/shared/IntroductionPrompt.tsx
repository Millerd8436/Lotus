"use client";

import React, { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { QuizEngine } from '@/components/quiz/QuizEngine';
import { paydayQuizQuestions } from '@/data/quiz_bank';

interface IntroductionPromptProps {
  onStart: () => void;
}

export const IntroductionPrompt: React.FC<IntroductionPromptProps> = ({ onStart }) => {
  const [view, setView] = useState<'intro' | 'pre-test'>('intro');

  const handleQuizComplete = (answers: any) => {
    // In a real app, we'd save these baseline answers to the user's session/profile
    console.log("Pre-test answers captured:", answers);
    onStart();
  };

  // Use a sample of payday questions for the pre-test
  const preTestQuestions = paydayQuizQuestions.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        {view === 'intro' && (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">Welcome to the Loan Research Study</h1>
            <div className="space-y-4 text-gray-700">
              <p>
                You'll be participating in a research study that examines different types of online lending products. 
                This will help us understand how different loan interfaces affect user comprehension.
              </p>
              <p>
                The study has several phases:
                • Background questions about your loan knowledge
                • Interactive loan simulations
                • Comprehension assessments
                • Educational materials about loan alternatives
              </p>
              <p>
                Your participation is voluntary and your responses will be kept confidential.
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <Button onClick={() => setView('pre-test')}>
                Begin Study
              </Button>
            </div>
          </>
        )}

        {view === 'pre-test' && (
          <div>
            <h2 className="text-xl font-bold text-center mb-4">Background Assessment</h2>
            <p className="text-gray-600 mb-6 text-center">
              Please answer these questions based on your current knowledge about loans.
            </p>
            <QuizEngine
              key="pre-test"
              quizId="pre-test"
              questions={preTestQuestions}
              onComplete={handleQuizComplete}
            />
          </div>
        )}
      </Card>
    </div>
  );
}; 