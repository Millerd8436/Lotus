"use client";

import React, { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { Textarea } from '@/components/shared/Textarea';

export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[];
  type: 'multiple-choice' | 'open-ended' | 'likert';
}

export interface Quiz {
  name: string;
  questions: QuizQuestion[];
}

interface QuizEngineProps {
  quiz: Quiz;
  onComplete: (answers: any) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [startTime, setStartTime] = useState(Date.now());

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = (answerData: any) => {
    const timeTaken = (Date.now() - startTime) / 1000;
    const newAnswers = { 
      ...answers, 
      [currentQuestion.id]: { ...answerData, timeTaken } 
    };
    setAnswers(newAnswers);
    setStartTime(Date.now());

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {(currentQuestion.options || []).map((option) => (
              <Button 
                key={option} 
                onClick={() => handleAnswer({ answer: option })} 
                variant="outline" 
                className="w-full text-left justify-start p-4 h-auto"
              >
                {option}
              </Button>
            ))}
          </div>
        );
      case 'open-ended':
        return <OpenEndedQuestion onSubmit={(answer) => handleAnswer({ answer })} />;
      case 'likert':
          return (
            <div className="flex justify-around">
                {(currentQuestion.options || ['1', '2', '3', '4', '5']).map(option => (
                    <Button 
                        key={option} 
                        onClick={() => handleAnswer({ answer: option })} 
                        variant="outline"
                        className="w-12 h-12 rounded-full"
                    >
                        {option}
                    </Button>
                ))}
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">{quiz.name}</h2>
        <p className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
      </div>
      <div className="my-6">
        <h3 className="font-bold text-xl text-center leading-tight">{currentQuestion.question}</h3>
      </div>
      <div className="mt-6">
        {renderQuestion()}
      </div>
       {currentQuestion.type === 'likert' && (
           <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
               <span>Not at all</span>
               <span>Very much</span>
           </div>
       )}
    </Card>
  );
};


const OpenEndedQuestion = ({ onSubmit }: { onSubmit: (answer: string) => void }) => {
    const [answer, setAnswer] = useState('');
    return (
        <div>
            <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your response..."
                className="w-full"
                rows={4}
            />
            <Button onClick={() => onSubmit(answer)} className="mt-4 w-full" disabled={!answer}>
                Submit
            </Button>
        </div>
    );
}; 