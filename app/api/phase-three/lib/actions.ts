import { NextResponse } from "next/server";
import {
  ConsumerProtectionInfo,
  FederalProtection,
  StateProtection,
  ComplaintProcess,
  LegalResource,
  BehavioralAnalysis,
} from "./interfaces";
import { DARK_PATTERNS, EDUCATIONAL_CONTENT, RESEARCH_DATA } from "./constants";

export const handleAnalyzeDarkPatterns = (data: any) => {
  const { patterns_observed } = data;
  const analysis = DARK_PATTERNS.filter((pattern) =>
    patterns_observed.includes(pattern.pattern_name)
  );

  return NextResponse.json({
    success: true,
    analysis: analysis,
    overall_harm_score:
      analysis.reduce((sum, p) => sum + p.harm_level, 0) / analysis.length,
    protection_summary: {
      immediate_actions: analysis.flatMap((p) =>
        p.protection_strategies.slice(0, 1)
      ),
      long_term_strategies: analysis.flatMap((p) =>
        p.protection_strategies.slice(1)
      ),
      recognition_skills: analysis.flatMap((p) => p.how_to_recognize),
    },
  });
};

export const handleGetConsumerProtections = (data: any) => {
  const { state } = data;

  // Filter protections based on loan type if provided
  // const isPaydayLoan = loan_type === 'payday' || !loan_type;

  const federalProtections: FederalProtection[] = [
    {
      law_name: "Truth in Lending Act (TILA)",
      agency: "Consumer Financial Protection Bureau",
      protection_type: "Disclosure Requirements",
      coverage: "APR and fee disclosure requirements",
      how_to_use: "Lenders must provide clear cost information",
      website: "consumerfinance.gov",
    },
    {
      law_name: "Fair Debt Collection Practices Act",
      agency: "Federal Trade Commission",
      protection_type: "Collection Practices",
      coverage: "Limits on harassment and abuse",
      how_to_use: "File complaint for abusive collection practices",
      website: "ftc.gov",
    },
  ];

  const stateProtections: StateProtection[] = [
    {
      state: "California",
      max_apr: 36,
      loan_limits: "$300 maximum",
      rollover_restrictions: "No rollovers allowed",
      cooling_off_period: "24 hours",
      licensing_requirements: "State licensing required",
    },
    {
      state: "Texas",
      max_apr: 664,
      loan_limits: "$1,500 maximum",
      rollover_restrictions: "4 rollovers maximum",
      cooling_off_period: "None",
      licensing_requirements: "Municipal licensing varies",
    },
  ];

  const complaintProcesses: ComplaintProcess[] = [
    {
      organization: "Consumer Financial Protection Bureau",
      complaint_type: "Lending practices",
      process: "Online complaint form",
      timeline: "15 days for company response",
      contact_info: "consumerfinance.gov/complaint",
    },
  ];

  const legalResources: LegalResource[] = [
    {
      organization: "Legal Aid Society",
      service_type: "Free legal assistance",
      cost: "Free for qualifying individuals",
      eligibility: "Income-based eligibility",
      contact_info: "Call 211 for local resources",
    },
  ];

  const protectionInfo: ConsumerProtectionInfo = {
    federal_protections: federalProtections,
    state_protections: stateProtections,
    complaint_process: complaintProcesses,
    legal_resources: legalResources,
  };

  return NextResponse.json({
    success: true,
    protections: protectionInfo,
    state_specific:
      stateProtections.find((s) => s.state === state) || stateProtections[0],
  });
};

export const handleGetEducationalContent = (data: any) => {
  const { topic } = data;

  const relevantContent = EDUCATIONAL_CONTENT.filter((content) =>
    content.topic.toLowerCase().includes(topic.toLowerCase())
  );

  return NextResponse.json({
    success: true,
    content: relevantContent,
    supplementary_resources: {
      beginner: [
        {
          name: "MyMoney.gov",
          description: "Federal government's financial education portal",
          url: "mymoney.gov",
        },
      ],
      advanced: [
        {
          name: "CFPB Financial Education Resources",
          description: "Comprehensive financial education materials",
          url: "consumerfinance.gov/consumer-tools",
        },
      ],
    },
  });
};

export const handleBehavioralAnalysis = () => {
  const cognitiveBiases: BehavioralAnalysis[] = [
    {
      cognitive_bias: "Anchoring Bias",
      description:
        "Tendency to rely heavily on first piece of information encountered",
      how_exploited:
        "Display attractive initial fee while hiding total cost",
      prevalence: "Very common in financial decisions",
      mitigation_strategies: [
        "Always compare total costs",
        "Set decision criteria beforehand",
        "Use comparison tools",
      ],
    },
    {
      cognitive_bias: "Loss Aversion",
      description:
        "Tendency to prefer avoiding losses over acquiring equivalent gains",
      how_exploited:
        "Sunk cost fallacy - users continue after investing time",
      prevalence: "Universal psychological tendency",
      mitigation_strategies: [
        "Set time limits",
        "Use cooling-off periods",
        "Ignore sunk costs in decisions",
      ],
    },
  ];

  const behavioralInsights = {
    cognitive_biases_observed: cognitiveBiases,
    decision_quality_score: 3.5,
    recommendations: [
      "Use cooling-off periods for major financial decisions",
      "Create personal financial decision checklist",
      "Practice comparison shopping before committing",
    ],
  };

  return NextResponse.json({
    success: true,
    behavioral_analysis: behavioralInsights,
    educational_opportunities: [
      "Behavioral finance course",
      "Consumer psychology awareness training",
      "Financial decision-making workshop",
    ],
  });
};

export const handleResearchLookup = (data: any) => {
  const { research_topic, year_range } = data;

  const relevantResearch = RESEARCH_DATA.filter(
    (study) =>
      study.study_title
        .toLowerCase()
        .includes(research_topic.toLowerCase()) &&
      study.year >= (year_range?.start || 2020) &&
      study.year <= (year_range?.end || 2024)
  );

  return NextResponse.json({
    success: true,
    research: relevantResearch,
    meta_analysis: {
      total_studies: relevantResearch.length,
      average_sample_size:
        relevantResearch.reduce(
          (sum, study) => sum + study.sample_size,
          0
        ) / relevantResearch.length,
      key_themes: [
        "Debt trap mechanisms",
        "Vulnerable population targeting",
        "Regulatory effectiveness",
      ],
    },
  });
};
