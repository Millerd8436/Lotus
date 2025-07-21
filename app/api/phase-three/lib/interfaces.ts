export interface DarkPatternAnalysis {
  pattern_name: string;
  description: string;
  how_it_works: string;
  psychological_mechanism: string;
  harm_level: number;
  examples: string[];
  how_to_recognize: string[];
  protection_strategies: string[];
}

export interface ConsumerProtectionInfo {
  federal_protections: FederalProtection[];
  state_protections: StateProtection[];
  complaint_process: ComplaintProcess[];
  legal_resources: LegalResource[];
}

export interface FederalProtection {
  law_name: string;
  agency: string;
  protection_type: string;
  coverage: string;
  how_to_use: string;
  website: string;
}

export interface StateProtection {
  state: string;
  max_apr: number;
  loan_limits: string;
  rollover_restrictions: string;
  cooling_off_period: string;
  licensing_requirements: string;
}

export interface ComplaintProcess {
  organization: string;
  complaint_type: string;
  process: string;
  timeline: string;
  contact_info: string;
}

export interface LegalResource {
  organization: string;
  service_type: string;
  cost: string;
  eligibility: string;
  contact_info: string;
}

export interface EducationalContent {
  topic: string;
  learning_objectives: string[];
  content_modules: ContentModule[];
  assessment_questions: AssessmentQuestion[];
  resources: EducationalResource[];
}

export interface ContentModule {
  module_title: string;
  duration: string;
  key_concepts: string[];
  interactive_elements: string[];
  real_world_examples: string[];
}

export interface AssessmentQuestion {
  question: string;
  type: "multiple_choice" | "true_false" | "scenario_based";
  correct_answer: string;
  explanation: string;
  learning_objective: string;
}

export interface EducationalResource {
  resource_name: string;
  resource_type: string;
  provider: string;
  cost: string;
  website: string;
  description: string;
}

export interface ResearchData {
  study_title: string;
  source: string;
  year: number;
  key_findings: string[];
  sample_size: number;
  methodology: string;
  policy_implications: string[];
}

export interface BehavioralAnalysis {
  cognitive_bias: string;
  description: string;
  how_exploited: string;
  prevalence: string;
  mitigation_strategies: string[];
}
