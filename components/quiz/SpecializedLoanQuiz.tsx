import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, DollarSign, Eye, TrendingUp } from 'lucide-react';

interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'scale' | 'yes_no' | 'slider' | 'numeric';
  category: 'core' | 'loan_specific' | 'behavioral';
  question: string;
  description?: string;
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  required: boolean;
}

interface LoanQuizData {
  loanType: 'payday' | 'ewa' | 'bnpl' | 'installment';
  loanAmount: number;
  simulationData: any;
  behaviorData: any;
}

interface SpecializedLoanQuizProps {
  loanData: LoanQuizData;
  onComplete: (answers: any) => void;
  onQuizStart?: () => void;
}

const SpecializedLoanQuiz: React.FC<SpecializedLoanQuizProps> = ({ 
  loanData, 
  onComplete, 
  onQuizStart 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState<Record<string, number>>({});

  // Core questions that appear for ALL loan types for comparison
  const coreQuestions: QuizQuestion[] = [
    {
      id: 'total_repayment',
      type: 'numeric',
      category: 'core',
      question: 'How much total were you expected to repay?',
      description: 'Include all fees, tips, and charges in your answer',
      unit: '$',
      required: true
    },
    {
      id: 'fee_clarity',
      type: 'scale',
      category: 'core',
      question: 'How clear were the fees?',
      description: 'Rate from 1 (very unclear) to 5 (very clear)',
      min: 1,
      max: 5,
      required: true
    },
    {
      id: 'felt_misled',
      type: 'yes_no',
      category: 'core',
      question: 'Did you feel misled by any part of the process?',
      required: true
    },
    {
      id: 'would_recommend',
      type: 'scale',
      category: 'core',
      question: 'Would you recommend this product to a friend?',
      description: 'Rate from 1 (definitely not) to 5 (definitely yes)',
      min: 1,
      max: 5,
      required: true
    }
  ];

  // Loan-specific questions targeting each type's dark patterns
  const getLoanSpecificQuestions = (loanType: string): QuizQuestion[] => {
    switch (loanType) {
      case 'payday':
        return [
          {
            id: 'apr_awareness',
            type: 'multiple_choice',
            category: 'loan_specific',
            question: 'What was the APR (Annual Percentage Rate) for this loan?',
            options: ['Under 100%', '100-300%', '300-500%', 'Over 500%', 'I didn\'t see an APR displayed'],
            required: true
          },
          {
            id: 'rollover_awareness',
            type: 'yes_no',
            category: 'loan_specific',
            question: 'Was it obvious when you had to repay the full amount?',
            required: true
          },
          {
            id: 'rollover_cost_awareness',
            type: 'yes_no',
            category: 'loan_specific',
            question: 'Did you notice any mention of fees for extending or renewing the loan?',
            required: true
          },
          {
            id: 'urgency_pressure',
            type: 'scale',
            category: 'loan_specific',
            question: 'How pressured did you feel by urgency messages (limited time offers, countdown timers)?',
            description: 'Rate from 1 (not pressured) to 5 (very pressured)',
            min: 1,
            max: 5,
            required: true
          }
        ];
      
      case 'ewa':
        return [
          {
            id: 'loan_recognition',
            type: 'yes_no',
            category: 'loan_specific',
            question: 'Did the simulator make it clear this was a loan?',
            required: true
          },
          {
            id: 'tip_awareness',
            type: 'multiple_choice',
            category: 'loan_specific',
            question: 'How were tips presented to you?',
            options: [
              'Required fees clearly labeled',
              'Optional with clear opt-out',
              'Pre-selected with hidden opt-out',
              'No tips were mentioned',
              'I\'m not sure what the tips were for'
            ],
            required: true
          },
          {
            id: 'employer_relationship',
            type: 'multiple_choice',
            category: 'loan_specific',
            question: 'Did the terms feel voluntary or automatic?',
            options: [
              'Completely voluntary',
              'Mostly voluntary',
              'Somewhat automatic',
              'Felt like employer requirement',
              'Unclear'
            ],
            required: true
          },
          {
            id: 'data_awareness',
            type: 'yes_no',
            category: 'loan_specific',
            question: 'Did you notice any requests to access your work schedule, location, or bank data?',
            required: true
          }
        ];
      
      case 'bnpl':
        return [
          {
            id: 'loan_vs_payment_plan',
            type: 'multiple_choice',
            category: 'loan_specific',
            question: 'Did the simulator make it clear this was a loan?',
            options: [
              'Yes, clearly labeled as a loan',
              'Somewhat clear it was debt',
              'Called it "split payments" or similar',
              'No, seemed like a payment plan',
              'I\'m not sure'
            ],
            required: true
          },
          {
            id: 'interest_understanding',
            type: 'yes_no',
            category: 'loan_specific',
            question: 'Was this loan really interest-free as advertised?',
            required: true
          },
          {
            id: 'late_fee_awareness',
            type: 'yes_no',
            category: 'loan_specific',
            question: 'Did you notice any information about late fees or penalties?',
            required: true
          },
          {
            id: 'credit_impact_awareness',
            type: 'multiple_choice',
            category: 'loan_specific',
            question: 'What did you learn about credit checks or impacts?',
            options: [
              'No credit check required',
              'Soft credit check only',
              'May affect credit score',
              'Nothing was mentioned',
              'I\'m not sure'
            ],
            required: true
          }
        ];
      
      case 'installment':
        return [
          {
            id: 'monthly_vs_total_focus',
            type: 'multiple_choice',
            category: 'loan_specific',
            question: 'What was emphasized more in the presentation?',
            options: [
              'Total loan cost',
              'Monthly payment amount',
              'Both equally',
              'Interest rate',
              'I\'m not sure'
            ],
            required: true
          },
          {
            id: 'total_cost_awareness',
            type: 'numeric',
            category: 'loan_specific',
            question: 'What was the total amount you would pay over the life of the loan?',
            description: 'Include all payments from start to finish',
            unit: '$',
            required: true
          },
          {
            id: 'fee_disclosure',
            type: 'yes_no',
            category: 'loan_specific',
            question: 'Were all fees clearly shown before you had to agree to terms?',
            required: true
          },
          {
            id: 'balloon_payment_awareness',
            type: 'yes_no',
            category: 'loan_specific',
            question: 'Did you notice any mentions of larger final payments or balloon payments?',
            required: true
          }
        ];
      
      default:
        return [];
    }
  };

  // Behavioral/perception questions
  const behavioralQuestions: QuizQuestion[] = [
    {
      id: 'difficulty_understanding',
      type: 'scale',
      category: 'behavioral',
      question: 'How difficult was it to understand the true cost of this loan?',
      description: 'Rate from 1 (very easy) to 5 (very difficult)',
      min: 1,
      max: 5,
      required: true
    },
    {
      id: 'trust_level',
      type: 'scale',
      category: 'behavioral',
      question: 'How much did you trust this lender?',
      description: 'Rate from 1 (no trust) to 5 (complete trust)',
      min: 1,
      max: 5,
      required: true
    },
    {
      id: 'information_seeking',
      type: 'multiple_choice',
      category: 'behavioral',
      question: 'During the simulation, did you actively look for fee information?',
      options: [
        'Yes, I searched carefully for all costs',
        'Yes, I looked but didn\'t find much',
        'Somewhat, I skimmed for obvious fees',
        'No, I trusted the main information shown',
        'No, I was focused on getting the money quickly'
      ],
      required: true
    }
  ];

  const allQuestions = [
    ...coreQuestions,
    ...getLoanSpecificQuestions(loanData.loanType),
    ...behavioralQuestions
  ];

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    // Record time spent on this question
    const timeSpent = Date.now() - questionStartTime;
    setTimeSpentPerQuestion(prev => ({
      ...prev,
      [allQuestions[currentQuestion].id]: timeSpent
    }));

    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setQuestionStartTime(Date.now());
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handleComplete = () => {
    const quizResults = {
      answers,
      timeSpentPerQuestion,
      totalTime: Date.now() - startTime,
      loanType: loanData.loanType,
      loanAmount: loanData.loanAmount,
      completedAt: new Date().toISOString(),
      behaviorData: loanData.behaviorData,
      simulationData: loanData.simulationData
    };

    onComplete(quizResults);
  };

  const currentQ = allQuestions[currentQuestion];
  const isAnswered = answers[currentQ?.id] !== undefined;
  const progress = ((currentQuestion + 1) / allQuestions.length) * 100;

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handleAnswer(question.id, option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    answers[question.id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {option}
                </button>
              </motion.div>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{question.min}</span>
              <span className="text-sm text-gray-600">{question.max}</span>
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={answers[question.id] || question.min}
              onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className="text-2xl font-bold text-blue-600">
                {answers[question.id] || question.min}
              </span>
            </div>
          </div>
        );

      case 'yes_no':
        return (
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(question.id, true)}
              className={`p-4 rounded-lg border-2 transition-all ${
                answers[question.id] === true
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <span className="font-medium">Yes</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(question.id, false)}
              className={`p-4 rounded-lg border-2 transition-all ${
                answers[question.id] === false
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <AlertCircle className="w-6 h-6 mx-auto mb-2 text-red-600" />
              <span className="font-medium">No</span>
            </motion.button>
          </div>
        );

      case 'numeric':
        return (
          <div className="space-y-4">
            <div className="relative">
              {question.unit && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {question.unit}
                </span>
              )}
              <input
                type="number"
                placeholder="Enter amount"
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswer(question.id, parseFloat(e.target.value) || '')}
                className={`w-full p-4 text-lg font-medium border-2 rounded-lg ${
                  question.unit ? 'pl-8' : ''
                } border-gray-200 focus:border-blue-500 focus:outline-none`}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getLoanTypeLabel = (type: string) => {
    switch (type) {
      case 'payday': return 'Payday Loan';
      case 'ewa': return 'Earned Wage Access';
      case 'bnpl': return 'Buy Now, Pay Later';
      case 'installment': return 'Installment Loan';
      default: return 'Loan';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core': return <DollarSign className="w-5 h-5" />;
      case 'loan_specific': return <Eye className="w-5 h-5" />;
      case 'behavioral': return <TrendingUp className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'blue';
      case 'loan_specific': return 'purple';
      case 'behavioral': return 'green';
      default: return 'gray';
    }
  };

  useEffect(() => {
    if (onQuizStart && currentQuestion === 0) {
      onQuizStart();
    }
  }, [onQuizStart, currentQuestion]);

  if (!currentQ) return null;

  const categoryColor = getCategoryColor(currentQ.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-${categoryColor}-100 rounded-lg flex items-center justify-center`}>
                {getCategoryIcon(currentQ.category)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {getLoanTypeLabel(loanData.loanType)} Quiz
                </h1>
                <p className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {allQuestions.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600">Progress</div>
              <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg border-2 border-gray-200">
              <CardHeader className={`bg-${categoryColor}-50 border-b border-${categoryColor}-100`}>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-${categoryColor}-500 rounded-lg flex items-center justify-center`}>
                    {getCategoryIcon(currentQ.category)}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">
                      {currentQ.question}
                    </div>
                    {currentQ.description && (
                      <p className="text-sm text-gray-600 font-normal mt-1">
                        {currentQ.description}
                      </p>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                {renderQuestion(currentQ)}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            variant="outline"
            className="px-6"
          >
            ← Back
          </Button>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {Math.round((Date.now() - questionStartTime) / 1000)}s
            </span>
          </div>
          
          <Button
            onClick={handleNext}
            disabled={currentQ.required && !isAnswered}
            className="px-6"
          >
            {currentQuestion === allQuestions.length - 1 ? 'Complete Quiz' : 'Next →'}
          </Button>
        </div>

        {/* Question Type Legend */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-3">Question Categories:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Core Comparison Questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Loan-Specific Deception Detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Behavioral & Trust Measures</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializedLoanQuiz; 