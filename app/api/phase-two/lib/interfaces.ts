export interface EthicalLoanApplication {
  name: string;
  email: string;
  phone: string;
  monthlyIncome: number;
  emergencyFund: "none" | "less_than_500" | "500_to_1000" | "more_than_1000";
  hasReviewedAlternatives: boolean;
  preferredAlternative?: string;
  understandsTerms: boolean;
  reasonForLoan: string;
  hasExploredOtherOptions: boolean;
}

export interface TransparentFeeStructure {
  principal: number;
  fee: number;
  total_due: number;
  apr: number;
  comparison: {
    credit_card_cash_advance: FeesComparison;
    credit_union_pal: FeesComparison;
    bank_overdraft: FeesComparison;
    employer_advance: FeesComparison;
  };
  payment_plan: PaymentOption[];
  full_disclosure: FullDisclosure;
}

export interface FeesComparison {
  name: string;
  typical_apr: number;
  typical_fees: number;
  typical_total_for_same_amount: number;
  availability: string;
  pros: string[];
  cons: string[];
  how_to_access: string;
}

export interface PaymentOption {
  option_name: string;
  due_date: string;
  amount: number;
  fees: number;
  penalties: number;
  early_payoff_benefit: string;
}

export interface FullDisclosure {
  all_fees_listed: string[];
  no_hidden_charges: boolean;
  cancellation_policy: string;
  cooling_off_period: string;
  complaint_process: string;
  regulatory_compliance: string[];
}

export interface AlternativeOptions {
  immediate_alternatives: ImmediateAlternative[];
  medium_term_solutions: MediumTermSolution[];
  long_term_strategies: LongTermStrategy[];
  local_resources: LocalResource[];
  emergency_assistance: EmergencyAssistance[];
}

export interface ImmediateAlternative {
  option: string;
  description: string;
  typical_cost: string;
  time_to_access: string;
  eligibility: string;
  how_to_apply: string;
  contact_info: string;
  pros: string[];
  cons: string[];
}

export interface MediumTermSolution {
  solution: string;
  description: string;
  timeline: string;
  requirements: string[];
  benefits: string[];
  how_to_start: string;
}

export interface LongTermStrategy {
  strategy: string;
  description: string;
  timeline: string;
  expected_outcome: string;
  resources_needed: string[];
  steps: string[];
}

export interface LocalResource {
  organization: string;
  service_type: string;
  eligibility: string;
  cost: string;
  contact_info: string;
  description: string;
}

export interface EmergencyAssistance {
  program: string;
  provider: string;
  assistance_type: string;
  eligibility: string;
  application_process: string;
  contact_info: string;
}

export interface EthicalGuidance {
  financial_counseling: FinancialCounseling;
  educational_resources: EducationalResource[];
  budgeting_tools: BudgetingTool[];
  credit_building: CreditBuilding[];
  savings_strategies: SavingsStrategy[];
}

export interface FinancialCounseling {
  free_counseling_options: string[];
  what_to_expect: string;
  how_to_prepare: string[];
  typical_outcomes: string[];
}

export interface EducationalResource {
  topic: string;
  provider: string;
  format: string;
  duration: string;
  cost: string;
  link: string;
  target_audience: string;
}

export interface BudgetingTool {
  tool_name: string;
  provider: string;
  features: string[];
  cost: string;
  best_for: string;
  link: string;
}

export interface CreditBuilding {
  method: string;
  description: string;
  timeline: string;
  requirements: string[];
  expected_impact: string;
  risks: string[];
}

export interface SavingsStrategy {
  strategy: string;
  description: string;
  target_amount: string;
  timeline: string;
  difficulty: string;
  tips: string[];
} 