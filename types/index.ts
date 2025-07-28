// Core Types for Lotus Platform

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LoanType = 'Payday' | 'Installment' | 'EWA' | 'BNPL';

// Enhanced Experiment Types for Research Framework
export type ExperimentPhase = 
  | 'NOT_STARTED'
  | 'INFORMED_CONSENT'
  | 'SIMULATION_1' | 'QUIZ_1' | 'RANKING_1'
  | 'SIMULATION_2' | 'QUIZ_2' | 'RANKING_2'  
  | 'SIMULATION_3' | 'QUIZ_3' | 'RANKING_3'
  | 'SIMULATION_4' | 'QUIZ_4' | 'RANKING_4'
  | 'FINAL_QUIZ' | 'DATA_CONSENT' | 'DEBRIEF' | 'COMPLETED';

export interface ExperimentState {
  experimentId: string;
  userId: string;
  currentPhase: ExperimentPhase;
  loanOrder: LoanType[];
  completedLoans: LoanType[];
  demographics?: DemographicData;
  consentGiven: boolean;
  dataConsentGiven?: boolean;
  startTime: Date;
  completionTime?: Date;
}

// Refined Deceptive Pattern Framework Based on Web Research
export interface ValidatedDeceptivePattern {
  id: string;
  name: string;
  loanType: LoanType;
  
  // Core IV Definition - What we're manipulating
  independentVariable: {
    category: 'fee_disclosure' | 'rollover_design' | 'terminology' | 'tip_interface' | 'payment_anchoring';
    description: string;
    implementation: string;
    regulatoryEvidence: string; // CFPB, NCLC, state AG findings
  };
  
  // Core DV Definition - What we're measuring
  dependentVariable: {
    primary: 'comprehension_accuracy' | 'perceived_voluntariness' | 'trust_rating' | 'fee_awareness';
    measurement: string;
    expectedEffect: 'decrease' | 'increase';
    effectSize: 'small' | 'medium' | 'large';
  };
  
  // Implementation Details
  uiImplementation: {
    component: string;
    exactWording: string;
    visualDesign: string;
    interactionPattern: string;
  };
  
  // Scientific Validation
  researchValidation: {
    cfpbStudy?: string;
    regulatoryAction?: string;
    consumptionData?: string;
    effectValidation: string;
  };
}

// Most Controversial Practices by Loan Type (Based on Web Research)
export const VALIDATED_PATTERNS: Record<LoanType, ValidatedDeceptivePattern[]> = {
  'Payday': [
    {
      id: 'payday_debt_trap_cycle',
      name: 'Rollover Debt Trap Design',
      loanType: 'Payday',
      independentVariable: {
        category: 'rollover_design',
        description: 'One-click rollover vs multi-step full payment interface',
        implementation: 'Prominent "Extend Payment" button vs buried full payment option',
        regulatoryEvidence: 'CFPB: 76% of payday borrowers in debt 5+ months/year; 80% roll over within 14 days'
      },
      dependentVariable: {
        primary: 'comprehension_accuracy',
        measurement: 'Understanding of total rollover costs over 6 months',
        expectedEffect: 'decrease',
        effectSize: 'large'
      },
      uiImplementation: {
        component: 'Payment due interface',
        exactWording: 'Need more time? Extend for just $25! (vs) Pay $375 full amount',
        visualDesign: 'Large green "Extend" button vs small gray "Pay Full" link',
        interactionPattern: 'Single click extension vs 4-step full payment process'
      },
      researchValidation: {
        cfpbStudy: 'CFPB Payday borrower outcomes data (2022)',
        regulatoryAction: 'Multiple state AG actions for "debt trap" practices',
        effectValidation: 'CFPB: Average borrower pays $520 in fees to borrow $375'
      }
    },
    {
      id: 'payday_apr_complexity',
      name: 'APR Burial in Fee Structure',
      loanType: 'Payday',
      independentVariable: {
        category: 'fee_disclosure',
        description: 'Fragmented fee disclosure vs unified APR presentation',
        implementation: 'Multiple small fees listed separately vs single APR',
        regulatoryEvidence: 'CFPB Price Complexity study: Complex pricing → higher transaction costs'
      },
      dependentVariable: {
        primary: 'fee_awareness',
        measurement: 'Accurate estimation of 400% APR from $15 per $100 fee structure',
        expectedEffect: 'decrease',
        effectSize: 'large'
      },
      uiImplementation: {
        component: 'Loan terms disclosure',
        exactWording: 'Processing: $15, Service: $10 per $100, Document: $5 (vs) 400% APR',
        visualDesign: 'Itemized fee list vs prominent APR display',
        interactionPattern: 'Scroll through fee list vs single APR view'
      },
      researchValidation: {
        cfpbStudy: 'Price Complexity in Laboratory Markets (2024)',
        regulatoryAction: 'CFPB enforcement actions for deceptive fee disclosure',
        effectValidation: 'CFPB study: Price complexity reduces consumer comprehension'
      }
    }
  ],
  
  'Installment': [
    {
      id: 'installment_payment_anchoring',
      name: 'Low Payment Amount Anchoring',
      loanType: 'Installment',
      independentVariable: {
        category: 'payment_anchoring',
        description: 'Monthly payment emphasis vs total cost emphasis',
        implementation: 'Prominent "Only $89/month" vs total repayment amount',
        regulatoryEvidence: 'NCLC analysis: Installment lenders exploit payment anchoring bias'
      },
      dependentVariable: {
        primary: 'comprehension_accuracy',
        measurement: 'Accurate calculation of total repayment amount from monthly payment',
        expectedEffect: 'decrease',
        effectSize: 'medium'
      },
      uiImplementation: {
        component: 'Loan amount selection interface',
        exactWording: 'Get $3,000 for only $89/month! (vs) Total repayment: $4,272',
        visualDesign: 'Large monthly payment, small total in fine print',
        interactionPattern: 'Payment calculator focused on monthly amount'
      },
      researchValidation: {
        cfpbStudy: 'Installment lending market analysis',
        regulatoryAction: 'Multiple state investigations into payment anchoring',
        effectValidation: 'Behavioral economics research on anchoring bias in financial decisions'
      }
    },
    {
      id: 'installment_refinancing_trap',
      name: 'Refinancing Debt Trap',
      loanType: 'Installment',
      independentVariable: {
        category: 'rollover_design',
        description: 'Early refinancing offers vs completion incentives',
        implementation: 'Prominent refinancing ads after 3 payments vs completion rewards',
        regulatoryEvidence: 'CFPB: Installment borrowers refinance average 1.6 times'
      },
      dependentVariable: {
        primary: 'comprehension_accuracy',
        measurement: 'Understanding that refinancing resets loan term and increases total cost',
        expectedEffect: 'decrease',
        effectSize: 'medium'
      },
      uiImplementation: {
        component: 'Account dashboard',
        exactWording: 'Get extra cash now! Refinance for up to $5,000 more',
        visualDesign: 'Bright refinancing banner vs buried completion progress',
        interactionPattern: 'One-click refinancing vs multi-step payoff calculation'
      },
      researchValidation: {
        cfpbStudy: 'Installment lending practices analysis',
        regulatoryAction: 'NCLC documentation of refinancing traps',
        effectValidation: 'Consumer complaints show confusion about refinancing costs'
      }
    }
  ],
  
  'EWA': [
    {
      id: 'ewa_tip_coercion',
      name: 'Manipulative Tipping Interface',
      loanType: 'EWA',
      independentVariable: {
        category: 'tip_interface',
        description: 'Coercive tipping design vs neutral fee structure',
        implementation: '17 tip prompts + 13 clicks to avoid vs simple fee disclosure',
        regulatoryEvidence: 'CA DFPI: 73% tip rate despite "voluntary" claims; NCLC documentation of 17 manipulative prompts'
      },
      dependentVariable: {
        primary: 'perceived_voluntariness',
        measurement: 'Perception that tips are truly optional',
        expectedEffect: 'decrease',
        effectSize: 'large'
      },
      uiImplementation: {
        component: 'Payment confirmation interface',
        exactWording: 'Help us help others like you. Suggested tip: $4 (community average)',
        visualDesign: 'Pre-selected $4 tip, small $0 option, guilt messaging',
        interactionPattern: '13 clicks required to select $0 tip'
      },
      researchValidation: {
        cfpbStudy: 'EWA tipping analysis showing 330% effective APR',
        regulatoryAction: 'CA DFPI investigation; NCLC "tip coercion" documentation',
        effectValidation: 'CA DFPI data: 73% tip compliance rate'
      }
    },
    {
      id: 'ewa_employer_deception',
      name: 'False Employer Affiliation',
      loanType: 'EWA',
      independentVariable: {
        category: 'terminology',
        description: 'Employer partnership claims vs third-party disclosure',
        implementation: 'Logo-based employer affiliation vs clear third-party warning',
        regulatoryEvidence: 'CFPB: EWA apps mislead users about employer relationships'
      },
      dependentVariable: {
        primary: 'trust_rating',
        measurement: 'Perceived employer endorsement of EWA service',
        expectedEffect: 'increase',
        effectSize: 'medium'
      },
      uiImplementation: {
        component: 'App login screen',
        exactWording: 'Your employer offers early pay access through [Company Logo]',
        visualDesign: 'Prominent employer logo, small third-party disclaimer',
        interactionPattern: 'Employer-branded interface throughout'
      },
      researchValidation: {
        cfpbStudy: 'EWA employer relationship analysis',
        regulatoryAction: 'Connecticut wage violation warnings about EWA',
        effectValidation: 'Consumer complaints about employer relationship confusion'
      }
    }
  ],
  
  'BNPL': [
    {
      id: 'bnpl_credit_disguise',
      name: 'Loan Terminology Avoidance',
      loanType: 'BNPL',
      independentVariable: {
        category: 'terminology',
        description: 'Payment plan language vs loan terminology',
        implementation: 'Split into 4 payments vs Take out a loan',
        regulatoryEvidence: 'CFPB: BNPL users 73% more likely to overspend; industry avoids loan terminology'
      },
      dependentVariable: {
        primary: 'comprehension_accuracy',
        measurement: 'Recognition that BNPL is a form of credit/debt',
        expectedEffect: 'decrease',
        effectSize: 'large'
      },
      uiImplementation: {
        component: 'Checkout payment options',
        exactWording: 'Split into 4 interest-free payments (vs) Borrow $400 with 4 payments',
        visualDesign: 'Payment plan graphics vs loan terminology',
        interactionPattern: 'Seamless checkout integration vs loan application process'
      },
      researchValidation: {
        cfpbStudy: 'BNPL market analysis showing 73% higher spending',
        regulatoryAction: 'CFPB 2024 rule treating BNPL as credit',
        effectValidation: 'Stanford study: BNPL users increase spending, decrease financial awareness'
      }
    },
    {
      id: 'bnpl_late_fee_hiding',
      name: 'Hidden Late Fee Structure',
      loanType: 'BNPL',
      independentVariable: {
        category: 'fee_disclosure',
        description: '0% interest emphasis vs late fee disclosure',
        implementation: 'Prominent 0% interest with buried late fee terms',
        regulatoryEvidence: 'CFPB: BNPL late fees average $7-34 per incident'
      },
      dependentVariable: {
        primary: 'fee_awareness',
        measurement: 'Awareness of 25% penalty fee for late payments',
        expectedEffect: 'decrease',
        effectSize: 'medium'
      },
      uiImplementation: {
        component: 'Payment terms display',
        exactWording: '0% interest! *See terms for fees (vs) Late fees up to 25% of order',
        visualDesign: 'Large 0% emphasis, tiny terms link',
        interactionPattern: 'Terms buried in separate document'
      },
      researchValidation: {
        cfpbStudy: 'BNPL fee analysis (2022)',
        regulatoryAction: 'Multiple state AG investigations into hidden BNPL fees',
        effectValidation: 'Consumer complaints about unexpected BNPL late fees'
      }
    }
  ]
};

// DEMOGRAPHIC DATA (Minimal for focus on core relationships)
export interface DemographicData {
  id: string;
  experimentId: string;
  ageRange: '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';
  priorLoanExperience: boolean; // Only validated predictor
}

// BEHAVIORAL TRACKING
export interface BehaviorEvent {
  id: string;
  sessionId: string;
  experimentId: string;
  timestamp: Date;
  eventType: 'click' | 'hover' | 'scroll' | 'time_spent' | 'form_edit';
  elementId: string;
  elementType: string;
  value?: string;
  timeMs?: number;
  pageSection?: string;
  metadata?: Record<string, any>;
}

export interface BehavioralMetrics {
  sessionId: string;
  loanType: LoanType;
  totalTimeMs: number;
  clicksOnFeeDisclosure: number;
  clicksOnTermsDetails: number;
  scrollDepthPercent: number;
  feeDisclosureViewedMs: number;
  termsDisclosureViewedMs: number;
  changedDefaultValues: boolean;
  completedWithoutReading: boolean;
}

// QUIZ AND COMPREHENSION MEASUREMENT
export interface QuizQuestion {
  id: string;
  loanType: LoanType;
  category: 'comprehension' | 'trust' | 'perceived_cost' | 'awareness';
  question: string;
  type: 'multiple-choice' | 'scale' | 'true-false' | 'numerical';
  options?: string[];
  correctAnswer?: string;
  targetedDeceptionPattern: string;
  validationStudy?: string;
}

export interface QuizResponse {
  id: string;
  sessionId: string;
  questionId: string;
  response: string;
  responseTime: number;
  isCorrect?: boolean;
  comprehensionScore?: number;
}

// SCENARIO PROMPTS
export interface ScenarioPrompt {
  id: string;
  loanType: LoanType;
  title: string;
  description: string;
  financialSituation: string;
  urgencyLevel: 'low' | 'medium' | 'high';
  amount: number;
  timeframe: string;
}

export function getScenarioPrompts(): Record<LoanType, ScenarioPrompt> {
  return {
    'Payday': {
      id: 'payday-emergency',
      loanType: 'Payday',
      title: 'Car Repair Emergency',
      description: 'Your car broke down and you need it for work tomorrow',
      financialSituation: 'You have $50 in checking, payday is in 6 days',
      urgencyLevel: 'high',
      amount: 400,
      timeframe: '24 hours'
    },
    'Installment': {
      id: 'installment-consolidation',
      loanType: 'Installment',
      title: 'Debt Consolidation',
      description: 'Multiple credit card payments are becoming difficult to manage',
      financialSituation: 'You have 3 credit cards with minimum payments totaling $385/month',
      urgencyLevel: 'medium',
      amount: 5000,
      timeframe: '1 week'
    },
    'EWA': {
      id: 'ewa-bills',
      loanType: 'EWA',
      title: 'Utility Bill Due',
      description: 'Your electricity bill is due today and you get paid Friday',
      financialSituation: 'You worked 3 days this week, earning $240 so far',
      urgencyLevel: 'high',
      amount: 120,
      timeframe: 'Same day'
    },
    'BNPL': {
      id: 'bnpl-purchase',
      loanType: 'BNPL',
      title: 'Work Equipment Purchase',
      description: 'You need a laptop for a freelance project that starts Monday',
      financialSituation: 'You have $200 available but the laptop costs $800',
      urgencyLevel: 'medium',
      amount: 800,
      timeframe: '3 days'
    }
  };
}

// SIMULATION CONFIGURATION
export interface SimulationConfig {
  loanType: LoanType;
  name: string;
  description: string;
  validatedPatterns: ValidatedDeceptivePattern[];
  scenarioPrompt: ScenarioPrompt;
  realWorldExample: string;
  researchBasis: string;
}

export interface ProgressData {
  currentPhase: ExperimentPhase;
  completedPhases: ExperimentPhase[];
  currentLoanIndex: number;
  totalLoans: number;
}

export interface RankingData {
  loanType: LoanType;
  trustRating: number;
  likelihoodToUse: number;
  perceivedCost: number;
  overallRating: number;
  reasoning?: string;
} 