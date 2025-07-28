"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface Loan {
  type: string;
  displayName: string;
}

interface ProgressiveRankingProps {
  completedLoans: Loan[];
  onRankingComplete: (rankings: Record<string, any>) => void;
}

const rankingPrompts = [
  "Which loan was **clearest** in its terms?",
  "Which would you **trust most** in real life?",
  "Which one felt like it was **hiding something**?",
  "Which one felt the **most fair** overall?"
];

export const ProgressiveRanking: React.FC<ProgressRankingProps> = ({ 
  completedLoans, 
  onRankingComplete 
}) => {
  const [stage, setStage] = useState(0); // 0: single rating, 1: pairwise, 2: full ranking
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [pairwiseChoice, setPairwiseChoice] = useState<string | null>(null);
  const [rankedList, setRankedList] = useState<Loan[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    // Determine which stage to show based on number of completed loans
    if (completedLoans.length === 1) {
      setStage(0);
    } else if (completedLoans.length === 2) {
      setStage(1);
    } else {
      setStage(2);
      setRankedList(completedLoans); // Initialize with current order
    }
    // Pick a random prompt for this ranking session
    setCurrentPromptIndex(Math.floor(Math.random() * rankingPrompts.length));
  }, [completedLoans]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(rankedList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setRankedList(items);
  };

  const handleSubmit = () => {
    let result: Record<string, any> = {};
    if (stage === 0) {
      result = {
        loan: completedLoans[0].type,
        initialRating: ratings[completedLoans[0].type],
        prompt: "Initial Fairness/Clarity Rating"
      };
    } else if (stage === 1) {
      result = {
        pair: completedLoans.map(l => l.type),
        choice: pairwiseChoice,
        prompt: rankingPrompts[currentPromptIndex]
      };
    } else {
      const finalRanking = rankedList.reduce((acc, loan, index) => {
        acc[loan.type] = index + 1;
        return acc;
      }, {} as Record<string, number>);
      result = {
        loans: completedLoans.map(l => l.type),
        ranking: finalRanking,
        prompt: `Final Ranking: ${rankingPrompts[currentPromptIndex]}`
      };
    }
    onRankingComplete(result);
  };
  
  const renderStage = () => {
    switch (stage) {
      case 0: // Initial rating for the first loan
        return (
          <Card className="max-w-2xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Initial Impression</h2>
            <p className="mb-6 text-gray-600">You've completed one loan simulation. How would you rate its fairness and clarity?</p>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <Button
                  key={rating}
                  variant={ratings[completedLoans[0].type] === rating ? 'default' : 'outline'}
                  onClick={() => setRatings({ [completedLoans[0].type]: rating })}
                  className="w-full"
                >
                  {['Very Unfair/Unclear', 'Somewhat Unfair/Unclear', 'Neutral', 'Somewhat Fair/Clear', 'Very Fair/Clear'][rating - 1]}
                </Button>
              ))}
            </div>
            <Button className="w-full mt-6" onClick={handleSubmit} disabled={!ratings[completedLoans[0].type]}>
              Save & Continue
            </Button>
          </Card>
        );

      case 1: // Pairwise comparison for the second loan
        return (
          <Card className="max-w-2xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Comparison</h2>
            <p className="mb-6 text-gray-600" dangerouslySetInnerHTML={{ __html: `Now that you’ve tried two loans, ${rankingPrompts[currentPromptIndex]}` }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedLoans.map(loan => (
                <Button
                  key={loan.type}
                  variant={pairwiseChoice === loan.type ? 'default' : 'outline'}
                  onClick={() => setPairwiseChoice(loan.type)}
                  className="h-24 text-lg"
                >
                  {loan.displayName}
                </Button>
              ))}
            </div>
            <Button className="w-full mt-6" onClick={handleSubmit} disabled={!pairwiseChoice}>
              Save & Continue
            </Button>
          </Card>
        );

      case 2: // Full drag-and-drop ranking
        return (
          <Card className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-2 text-center">Final Ranking</h2>
            <p className="mb-6 text-gray-600 text-center" dangerouslySetInnerHTML={{ __html: `Drag and drop to rank all ${completedLoans.length} loans based on this question: ${rankingPrompts[currentPromptIndex]}` }} />
            
            {/* Logic for Drag and Drop would be here, using a library like react-beautiful-dnd */}
            <p className="text-center text-sm text-red-500 my-4">(Drag and Drop functionality to be implemented with an external library)</p>
            
            {/* Placeholder for ranking */}
            <div className="space-y-2">
              {rankedList.map((loan, index) => (
                <div key={loan.type} className="flex items-center bg-gray-100 p-3 rounded-lg">
                  <span className="text-lg font-bold mr-4">{index + 1}</span>
                  <span>{loan.displayName}</span>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6" onClick={handleSubmit}>
              Submit Final Ranking
            </Button>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderStage()}
      </motion.div>
    </AnimatePresence>
  );
}; 
