// data/quiz_bank.ts
import { QuizQuestion, LoanType } from '@/types';

// PAYDAY LOAN QUIZ - Targets debt trap cycle and APR complexity (most controversial practices)
const paydayQuizQuestions: QuizQuestion[] = [
  {
    id: 'payday-rollover-trap-comprehension',
    loanType: 'Payday',
    category: 'comprehension',
    question: 'If you borrowed $375 and pay only the $25 extension fee each time you cannot repay in full, how much would you owe in total fees after 6 months of extensions?',
    type: 'multiple-choice',
    options: [
      '$150 (6 months × $25)',
      '$375 (same as loan amount)', 
      '$400 (loan + one extension)',
      '$650 (26 weeks × $25)'
    ],
    correctAnswer: '$650 (26 weeks × $25)',
    targetedDeceptionPattern: 'payday_debt_trap_cycle',
    researchBasis: 'CFPB data: Average borrower pays $520 in fees to borrow $375'
  },
  {
    id: 'payday-apr-from-fees',
    loanType: 'Payday',
    category: 'comprehension',
    question: 'A $100 loan with a $15 processing fee, $10 service charge, and $5 document fee for 2 weeks equals what APR?',
    type: 'multiple-choice',
    options: [
      '30% APR (total fees)',
      '200% APR', 
      '400% APR',
      '15% APR (just processing fee)'
    ],
    correctAnswer: '400% APR',
    targetedDeceptionPattern: 'payday_apr_complexity',
    researchBasis: 'CFPB Price Complexity study: Fee fragmentation reduces comprehension'
  },
  {
    id: 'payday-extension-vs-payoff',
    loanType: 'Payday',
    category: 'behavioral',
    question: 'In the simulator, which option was more prominently displayed when your payment was due?',
    type: 'multiple-choice',
    options: [
      'Pay full amount owed',
      'Extend payment for $25',
      'Both were equally prominent',
      'Neither was clearly shown'
    ],
    correctAnswer: 'Extend payment for $25',
    targetedDeceptionPattern: 'payday_debt_trap_cycle',
    researchBasis: 'Multiple state AG enforcement actions for debt trap interface design'
  }
];

// INSTALLMENT LOAN QUIZ - Targets payment anchoring and refinancing traps
const installmentQuizQuestions: QuizQuestion[] = [
  {
    id: 'installment-total-from-monthly',
    loanType: 'Installment',
    category: 'comprehension',
    question: 'If you borrow $3,000 at "only $89/month" for 48 months, what is the total amount you will repay?',
    type: 'multiple-choice',
    options: [
      '$3,000 (just the loan amount)',
      '$3,534 (including some interest)',
      '$4,272 (48 × $89)',
      '$4,500 (rough estimate)'
    ],
    correctAnswer: '$4,272 (48 × $89)',
    targetedDeceptionPattern: 'installment_payment_anchoring',
    researchBasis: 'NCLC analysis: Payment anchoring obscures total cost awareness'
  },
  {
    id: 'installment-refinancing-effect',
    loanType: 'Installment',
    category: 'comprehension',
    question: 'If you refinance your loan after making 12 payments, what happens to your total repayment amount?',
    type: 'multiple-choice',
    options: [
      'It decreases because you get a lower rate',
      'It stays the same, just extended',
      'It increases because the term resets',
      'It depends on how much extra you borrow'
    ],
    correctAnswer: 'It increases because the term resets',
    targetedDeceptionPattern: 'installment_refinancing_trap',
    researchBasis: 'CFPB data: Installment borrowers refinance average 1.6 times'
  },
  {
    id: 'installment-interface-emphasis',
    loanType: 'Installment', 
    category: 'behavioral',
    question: 'In the loan simulator, which information was displayed most prominently?',
    type: 'multiple-choice',
    options: [
      'Total amount to be repaid',
      'Monthly payment amount',
      'Interest rate (APR)',
      'Number of payments'
    ],
    correctAnswer: 'Monthly payment amount',
    targetedDeceptionPattern: 'installment_payment_anchoring',
    researchBasis: 'Behavioral economics research on anchoring bias in financial decisions'
  }
];

// EWA QUIZ - Targets tip coercion and employer deception
const ewaQuizQuestions: QuizQuestion[] = [
  {
    id: 'ewa-tip-voluntariness',
    loanType: 'EWA',
    category: 'perception',
    question: 'Based on your experience with the simulator, how would you describe the "tip" for your wage advance?',
    type: 'multiple-choice',
    options: [
      'Completely optional with no pressure',
      'Suggested but easy to decline',
      'Strongly encouraged with multiple prompts',
      'Required for the service'
    ],
    correctAnswer: 'Strongly encouraged with multiple prompts',
    targetedDeceptionPattern: 'ewa_tip_coercion',
    researchBasis: 'CA DFPI: 73% tip rate despite "voluntary" claims; NCLC: 17 manipulative prompts'
  },
  {
    id: 'ewa-effective-apr',
    loanType: 'EWA',
    category: 'comprehension',
    question: 'A $100 advance paid back in 2 weeks with a $4 tip and $2 express fee equals what effective APR?',
    type: 'multiple-choice',
    options: [
      '6% APR (just the fees)',
      '78% APR',
      '156% APR', 
      '312% APR'
    ],
    correctAnswer: '156% APR',
    targetedDeceptionPattern: 'ewa_tip_coercion',
    researchBasis: 'CFPB analysis showing 330% effective APR with tips and fees'
  },
  {
    id: 'ewa-employer-relationship',
    loanType: 'EWA',
    category: 'perception',
    question: 'In the simulator, what was your impression of the relationship between the EWA service and your employer?',
    type: 'multiple-choice',
    options: [
      'My employer directly provides this service',
      'My employer officially partners with this service',
      'My employer allows but doesn\'t endorse this service',
      'This is a completely separate third-party service'
    ],
    correctAnswer: 'My employer officially partners with this service',
    targetedDeceptionPattern: 'ewa_employer_deception',
    researchBasis: 'Connecticut wage violation warnings; CFPB analysis of employer relationship deception'
  }
];

// BNPL QUIZ - Targets credit disguise and hidden late fees
const bnplQuizQuestions: QuizQuestion[] = [
  {
    id: 'bnpl-credit-recognition',
    loanType: 'BNPL',
    category: 'comprehension',
    question: 'When you "split your purchase into 4 payments," what type of financial product are you using?',
    type: 'multiple-choice',
    options: [
      'A payment plan (not credit)',
      'A form of credit/loan',
      'A bank transfer service',
      'A savings withdrawal'
    ],
    correctAnswer: 'A form of credit/loan',
    targetedDeceptionPattern: 'bnpl_credit_disguise',
    researchBasis: 'CFPB 2024 rule treating BNPL as credit; Stanford study on decreased financial awareness'
  },
  {
    id: 'bnpl-late-fee-awareness',
    loanType: 'BNPL',
    category: 'comprehension',
    question: 'If you miss a $100 BNPL payment, what late fee might you face?',
    type: 'multiple-choice',
    options: [
      'No fee (it\'s 0% interest)',
      '$5-10 standard late fee',
      'Up to $25 (25% of payment)',
      'Just a small service charge'
    ],
    correctAnswer: 'Up to $25 (25% of payment)',
    targetedDeceptionPattern: 'bnpl_late_fee_hiding',
    researchBasis: 'CFPB analysis: BNPL late fees average $7-34 per incident'
  },
  {
    id: 'bnpl-interface-emphasis',
    loanType: 'BNPL',
    category: 'behavioral',
    question: 'In the BNPL simulator, which information was most prominently displayed?',
    type: 'multiple-choice',
    options: [
      'Late fee penalties',
      '0% interest rate',
      'Credit impact warnings',
      'Total debt amount'
    ],
    correctAnswer: '0% interest rate',
    targetedDeceptionPattern: 'bnpl_late_fee_hiding',
    researchBasis: 'Multiple state AG investigations into hidden BNPL fees'
  }
];

// CROSS-LOAN COMPARISON QUESTIONS
const comparisonQuizQuestions: QuizQuestion[] = [
  {
    id: 'cross-loan-worst-practice',
    loanType: 'All',
    category: 'analysis',
    question: 'Which simulator used the most deceptive interface design to hide true costs?',
    type: 'multiple-choice',
    options: [
      'Payday loan (rollover encouragement)',
      'Installment loan (payment anchoring)', 
      'EWA (tip coercion)',
      'BNPL (credit disguise)'
    ],
    correctAnswer: 'User-dependent based on experience',
    targetedDeceptionPattern: 'comparative_analysis',
    researchBasis: 'Cross-platform deception analysis'
  },
  {
    id: 'cross-loan-highest-cost',
    loanType: 'All',
    category: 'comprehension',
    question: 'Rank these loans from highest to lowest effective interest rate for a typical user:',
    type: 'ranking',
    options: [
      'Payday (with rollovers): ~400% APR',
      'EWA (with tips): ~330% APR',
      'Installment: ~160% APR',
      'BNPL (on-time): 0% APR'
    ],
    correctAnswer: 'Payday > EWA > Installment > BNPL',
    targetedDeceptionPattern: 'cost_comparison',
    researchBasis: 'CFPB data on effective APRs across loan types'
  }
];

// Export all quiz questions by loan type
export const getQuiz = (loanType: LoanType): QuizQuestion[] => {
  switch (loanType) {
    case 'Payday':
      return paydayQuizQuestions;
    case 'Installment':
      return installmentQuizQuestions;
    case 'EWA':
      return ewaQuizQuestions;
    case 'BNPL':
      return bnplQuizQuestions;
    default:
      return [];
  }
};

export const getFinalQuiz = (): QuizQuestion[] => {
  return comparisonQuizQuestions;
};

// Individual exports for direct access
export { 
  paydayQuizQuestions,
  installmentQuizQuestions,
  ewaQuizQuestions,
  bnplQuizQuestions,
  comparisonQuizQuestions 
}; 