import { SimulationConfig, ValidatedDeceptivePattern, getScenarioPrompts, VALIDATED_PATTERNS } from '@/types';

const scenarioPrompts = getScenarioPrompts();

// Research-validated simulation configurations based on most controversial practices
export const simulationConfigs: SimulationConfig[] = [
  {
    loanType: 'Payday',
    name: 'CashAdvance Plus',
    description: 'Fast cash when you need it most. Get approved instantly with our streamlined process.',
    validatedPatterns: VALIDATED_PATTERNS['Payday'],
    scenarioPrompt: scenarioPrompts['Payday'],
    realWorldExample: 'Based on CFPB data showing 76% of payday borrowers trapped in debt 5+ months/year and debt trap rollover practices',
    researchBasis: 'CFPB Payday borrower outcomes data (2022); Price Complexity in Laboratory Markets (2024); Multiple state AG enforcement actions'
  },
  {
    loanType: 'Installment',
    name: 'FlexPayment Solutions', 
    description: 'Manageable monthly payments for larger expenses. Get the funds you need with predictable payments.',
    validatedPatterns: VALIDATED_PATTERNS['Installment'],
    scenarioPrompt: scenarioPrompts['Installment'],
    realWorldExample: 'Based on NCLC analysis of payment anchoring exploitation and CFPB data on 1.6x average refinancing rates',
    researchBasis: 'NCLC payment anchoring analysis; CFPB installment lending practices review; Behavioral economics anchoring bias research'
  },
  {
    loanType: 'EWA',
    name: 'EarlyPay Advance',
    description: 'Access your earned wages instantly. No interest, just optional tips to help others.',
    validatedPatterns: VALIDATED_PATTERNS['EWA'],
    scenarioPrompt: scenarioPrompts['EWA'],
    realWorldExample: 'Based on CA DFPI findings of 73% tip compliance rates and NCLC documentation of 17 manipulative tip prompts requiring 13 clicks to avoid',
    researchBasis: 'CA DFPI EWA investigation (2023); NCLC tip coercion documentation; CFPB EWA analysis showing 330% effective APR'
  },
  {
    loanType: 'BNPL',
    name: 'SplitPay Easy',
    description: 'Split your purchase into simple payments. No interest, no hidden fees on most purchases.',
    validatedPatterns: VALIDATED_PATTERNS['BNPL'],
    scenarioPrompt: scenarioPrompts['BNPL'],
    realWorldExample: 'Based on CFPB data showing 73% higher spending with BNPL users and Stanford research on decreased financial awareness',
    researchBasis: 'CFPB BNPL market analysis (2022); Stanford BNPL behavioral study (2024); CFPB 2024 rule treating BNPL as credit'
  },
];

export const getSimulationConfig = (
  loanType: LoanType
): SimulationConfig | undefined => {
  return simulationConfigs.find(
    (config) => config.loanType === loanType
  );
};

// Helper functions for accessing validated patterns
export const getValidatedPatternsForLoan = (loanType: LoanType): ValidatedDeceptivePattern[] => {
  return VALIDATED_PATTERNS[loanType] || [];
};

export const getAllValidatedPatterns = (): ValidatedDeceptivePattern[] => {
  return Object.values(VALIDATED_PATTERNS).flat();
};

// Get specific pattern by ID across all loan types
export const getPatternById = (patternId: string): ValidatedDeceptivePattern | undefined => {
  return getAllValidatedPatterns().find(pattern => pattern.id === patternId);
};

// Get patterns by psychological mechanism
export const getPatternsByMechanism = (mechanism: string): ValidatedDeceptivePattern[] => {
  return getAllValidatedPatterns().filter(pattern => 
    pattern.psychologicalMechanism.toLowerCase().includes(mechanism.toLowerCase())
  );
}; 