"use client";

import React from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { useRouter } from 'next/navigation';

const QuizCompletedPage = () => {
  const router = useRouter();

  const handleContinue = () => {
    // This is a placeholder for the actual navigation logic.
    // In a real application, you would determine the next step
    // based on the user's progress in the simulation.
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen">
      <Card>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Answer Submitted</h1>
          <p className="mb-6">Your response has been recorded. Please continue to the next part of the simulation.</p>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizCompletedPage; 