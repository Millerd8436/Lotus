"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { Input } from '@/components/shared/Input';
import quizData from '@/data/new_quiz_bank.json';

interface QuizEngineProps {
  phase: 'phase1' | 'phase2' | 'phase3';
  step: string;
  onComplete: (answerData: any) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ phase, step, onComplete }) => {
  const [question, setQuestion] = useState<any>(null);
  const [selection, setSelection] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(50);
  const [clarity, setClarity] = useState(3);
  const [surprise, setSurprise] = useState(3);
  const [openEnded, setOpenEnded] = useState('');
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    const questionData = (quizData as any)[phase]?.[step];
    if (questionData) {
      setQuestion(questionData);
      setStartTime(Date.now());
    }
  }, [phase, step]);

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // in seconds

    const answerData = {
      questionId: question.id,
      selection,
      timeTaken,
      ...(question.type.includes('confidence') && { confidence }),
      ...(question.type.includes('clarity') && { clarity }),
      ...(question.type.includes('surprise') && { surprise }),
      ...(question.type.includes('open-ended') && { openEnded }),
    };
    onComplete(answerData);
  };

  const renderQuestionType = () => {
    if (!question) return null;

    switch (question.type) {
      case 'multiple-choice-confidence':
      case 'multiple-choice-clarity-time':
      case 'multiple-choice-surprise-rating':
        return (
          <div>
            {question.options.map((option: string) => (
              <button
                key={option}
                onClick={() => setSelection(option)}
                className={`block w-full text-left p-3 my-2 rounded-lg border ${
                  selection === option
                    ? 'bg-blue-100 border-blue-400'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
            {question.type.includes('confidence') && renderConfidenceSlider()}
            {question.type.includes('clarity') && renderClaritySlider()}
            {question.type.includes('surprise') && renderSurpriseSlider()}
          </div>
        );
      case 'likert-open-ended':
        return (
          <div>
            {renderLikertScale()}
            <textarea
              value={openEnded}
              onChange={(e) => setOpenEnded(e.target.value)}
              className="w-full p-2 mt-4 border rounded"
              placeholder="Please explain your reasoning..."
            />
          </div>
        );
      default:
        return <p>Unsupported question type.</p>;
    }
  };

  const renderConfidenceSlider = () => (
    <div className="mt-6">
      <label className="block text-sm font-medium">How confident are you in your answer?</label>
      <input type="range" min="0" max="100" value={confidence} onChange={(e) => setConfidence(parseInt(e.target.value))} className="w-full" />
      <div className="flex justify-between text-xs"><span>Not at all</span><span>Very</span></div>
    </div>
  );
  
  const renderClaritySlider = () => (
    <div className="mt-6">
      <label className="block text-sm font-medium">How clear was this information?</label>
      <input type="range" min="1" max="5" value={clarity} onChange={(e) => setClarity(parseInt(e.target.value))} className="w-full" />
      <div className="flex justify-between text-xs"><span>Very Unclear</span><span>Very Clear</span></div>
    </div>
  );

  const renderSurpriseSlider = () => (
    <div className="mt-6">
      <label className="block text-sm font-medium">How surprising was this fee?</label>
      <input type="range" min="1" max="5" value={surprise} onChange={(e) => setSurprise(parseInt(e.target.value))} className="w-full" />
      <div className="flex justify-between text-xs"><span>Not Surprising</span><span>Very Surprising</span></div>
    </div>
  );

  const renderLikertScale = () => (
    <div className="mt-6">
      {/* Implement Likert scale based on question text */}
      <p>Likert scale will be implemented here based on question text.</p>
    </div>
  );

  if (!question) {
    return (
      <Card>
        <div className="p-6">Loading quiz...</div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold">{question.question}</h3>
        <div className="my-4">{renderQuestionType()}</div>
        <Button onClick={handleSubmit} disabled={!selection && !openEnded}>
          Submit Answer
        </Button>
      </div>
    </Card>
  );
}; 