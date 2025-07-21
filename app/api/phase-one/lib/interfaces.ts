export interface LoanApplication {
  name: string;
  email: string;
  phone: string;
  ssn: string;
  income: number;
  employment: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  vulnerability_score?: number;
  targeting_profile?: string;
}

export interface FeeStructure {
  principal: number;
  base_fee: number;
  processing_fee: number;
  verification_fee: number;
  ach_fee: number;
  risk_assessment: number;
  platform_fee: number;
  insurance_fee: number;
  late_fee: number;
  rollover_fee: number;
  nsf_fee: number;
  total_fees: number;
  total_due: number;
  apr: number;
  state_max_apr: number;
  exploitation_multiplier: number;
}

export interface PsychologicalTriggers {
  urgency_level: number;
  scarcity_messaging: string[];
  social_proof: string[];
  authority_badges: string[];
  vulnerability_targeting: string[];
  gamification_elements: string[];
}

export interface UserTrackingData {
  session_id: string;
  page_views: number;
  time_on_site: number;
  form_interactions: number;
  cancel_attempts: number;
  vulnerability_indicators: string[];
  financial_stress_score: number;
  manipulation_susceptibility: number;
  target_profile: string;
}
