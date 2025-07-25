"use client";

import { QuizEngine } from "@/components/quiz/QuizEngine";
import { useParams, useRouter } from 'next/navigation';

const QuizPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // This is a placeholder for the actual navigation logic
  const handleQuizComplete = (answerData: any) => {
    console.log('Quiz answer:', answerData);
    // In a real application, you would save the answerData to a database
    // and then navigate to the next step in the simulation.
    // For now, we'll just navigate to a placeholder page.
    router.push('/quiz/completed');
  };

  if (!id) {
    return <div>Loading...</div>;
  }
  
  const [phase, step] = id.split('-');
  
  if (!phase || !step || !['phase1', 'phase2', 'phase3'].includes(phase)) {
    return <div>Invalid Quiz ID</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-8">Quiz</h1>
      <QuizEngine 
        phase={phase as 'phase1' | 'phase2' | 'phase3'} 
        step={`step${step}`}
        onComplete={handleQuizComplete} 
      />
    </div>
  );
};

export default QuizPage; 