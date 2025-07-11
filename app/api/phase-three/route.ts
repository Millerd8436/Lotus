import { NextRequest, NextResponse } from "next/server";

/**
 * Phase Three API - Educational & Reflection Operations
 *
 * Provides comprehensive analysis, education, and research data about:
 * - Dark pattern analysis
 * - Consumer protection information
 * - Financial literacy education
 * - Research statistics and studies
 * - Policy recommendations
 * - Behavioral analysis
 */

interface DarkPatternAnalysis {
  pattern_name: string;
  description: string;
  how_it_works: string;
  psychological_mechanism: string;
  harm_level: number;
  examples: string[];
  how_to_recognize: string[];
  protection_strategies: string[];
}

interface ConsumerProtectionInfo {
  federal_protections: FederalProtection[];
  state_protections: StateProtection[];
  complaint_process: ComplaintProcess[];
  legal_resources: LegalResource[];
}

interface FederalProtection {
  law_name: string;
  agency: string;
  protection_type: string;
  coverage: string;
  how_to_use: string;
  website: string;
}

interface StateProtection {
  state: string;
  max_apr: number;
  loan_limits: string;
  rollover_restrictions: string;
  cooling_off_period: string;
  licensing_requirements: string;
}

interface ComplaintProcess {
  organization: string;
  complaint_type: string;
  process: string;
  timeline: string;
  contact_info: string;
}

interface LegalResource {
  organization: string;
  service_type: string;
  cost: string;
  eligibility: string;
  contact_info: string;
}

interface EducationalContent {
  topic: string;
  learning_objectives: string[];
  content_modules: ContentModule[];
  assessment_questions: AssessmentQuestion[];
  resources: EducationalResource[];
}

interface ContentModule {
  module_title: string;
  duration: string;
  key_concepts: string[];
  interactive_elements: string[];
  real_world_examples: string[];
}

interface AssessmentQuestion {
  question: string;
  type: "multiple_choice" | "true_false" | "scenario_based";
  correct_answer: string;
  explanation: string;
  learning_objective: string;
}

interface EducationalResource {
  resource_name: string;
  resource_type: string;
  provider: string;
  cost: string;
  website: string;
  description: string;
}

interface ResearchData {
  study_title: string;
  source: string;
  year: number;
  key_findings: string[];
  sample_size: number;
  methodology: string;
  policy_implications: string[];
}

interface BehavioralAnalysis {
  cognitive_bias: string;
  description: string;
  how_exploited: string;
  prevalence: string;
  mitigation_strategies: string[];
}

// Dark patterns database
const DARK_PATTERNS: DarkPatternAnalysis[] = [
  {
    pattern_name: "Progressive Disclosure",
    description:
      "Gradually revealing information to prevent informed decision-making",
    how_it_works:
      "Start with simple form, then add complexity and fees step by step",
    psychological_mechanism:
      "Sunk cost fallacy - users feel invested after starting",
    harm_level: 8,
    examples: [
      "1-step form becomes 4-step process",
      "Fees revealed only after personal info collected",
      "APR hidden until final step",
    ],
    how_to_recognize: [
      "Form complexity increases unexpectedly",
      "Critical information revealed late in process",
      "Difficult to go back and review terms",
    ],
    protection_strategies: [
      "Demand full disclosure upfront",
      "Don't provide personal info until you know total cost",
      "Use comparison shopping before committing",
    ],
  },
  {
    pattern_name: "Roach Motel",
    description: "Easy to get in, hard to get out",
    how_it_works: "Simple application process, but difficult cancellation",
    psychological_mechanism: "Leverages loss aversion and complexity aversion",
    harm_level: 9,
    examples: [
      "One-click signup, multi-step cancellation",
      "Cancellation requires phone call during business hours",
      "Multiple confirmation steps to cancel",
    ],
    how_to_recognize: [
      "Asymmetric effort between signup and cancellation",
      "No online cancellation option",
      "Retention specialists assigned to cancellation calls",
    ],
    protection_strategies: [
      "Read cancellation policy before signing up",
      "Screenshot all terms and conditions",
      "Know your state's cooling-off period laws",
    ],
  },
  {
    pattern_name: "Drip Pricing",
    description: "Advertising low price but gradually adding fees",
    how_it_works: "Lead with attractive base rate, then add mandatory fees",
    psychological_mechanism:
      "Anchoring bias - users fixate on initial low price",
    harm_level: 7,
    examples: [
      "$45 fee becomes $195 total with hidden charges",
      "Processing fees added at checkout",
      "Mandatory insurance fees",
    ],
    how_to_recognize: [
      "Base price seems too good to be true",
      "Fees called 'processing' or 'verification'",
      "Total cost not clearly stated upfront",
    ],
    protection_strategies: [
      "Always ask for 'total cost to me'",
      "Compare total costs, not base rates",
      "Read all fee disclosures",
    ],
  },
];

// Research database
const RESEARCH_DATA: ResearchData[] = [
  {
    study_title:
      "Payday Lending in America: Who Borrows, Where They Borrow, and Why",
    source: "Pew Charitable Trusts",
    year: 2023,
    key_findings: [
      "80% of payday loans are rolled over within 14 days",
      "Average borrower is in debt 5 months of the year",
      "75% of lender revenue comes from borrowers trapped in debt",
    ],
    sample_size: 33587,
    methodology: "National survey and industry data analysis",
    policy_implications: [
      "Need for stronger rollover restrictions",
      "Importance of ability-to-repay requirements",
      "Value of alternative loan products",
    ],
  },
  {
    study_title: "ACH Abuse in the Payday Lending Industry",
    source: "Consumer Financial Protection Bureau",
    year: 2022,
    key_findings: [
      "32% of borrowers experienced unauthorized withdrawals",
      "Average NSF fees per borrower: $105",
      "Multiple withdrawal attempts generate cascading fees",
    ],
    sample_size: 15000,
    methodology: "Consumer complaints analysis and industry data",
    policy_implications: [
      "Need for stronger ACH authorization requirements",
      "Limits on retry attempts",
      "Better consumer notification requirements",
    ],
  },
];

// Educational content database
const EDUCATIONAL_CONTENT: EducationalContent[] = [
  {
    topic: "Understanding APR vs. Fee Structure",
    learning_objectives: [
      "Calculate true cost of a loan",
      "Understand difference between APR and fees",
      "Compare loan offers effectively",
    ],
    content_modules: [
      {
        module_title: "APR Basics",
        duration: "10 minutes",
        key_concepts: [
          "Annual Percentage Rate",
          "Interest vs. Fees",
          "Term Impact",
        ],
        interactive_elements: ["APR Calculator", "Cost Comparison Tool"],
        real_world_examples: ["$300 loan at 391% APR vs 28% APR"],
      },
    ],
    assessment_questions: [
      {
        question:
          "A $300 loan for 14 days with $45 in fees has an APR of approximately:",
        type: "multiple_choice",
        correct_answer: "391%",
        explanation: "($45 ÷ $300) × (365 ÷ 14) × 100 = 391%",
        learning_objective: "Calculate true cost of a loan",
      },
    ],
    resources: [
      {
        resource_name: "CFPB APR Calculator",
        resource_type: "Online Tool",
        provider: "Consumer Financial Protection Bureau",
        cost: "Free",
        website: "consumerfinance.gov",
        description: "Official calculator for comparing loan costs",
      },
    ],
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case "analyze_dark_patterns":
        const { patterns_observed } = data;
        const analysis = DARK_PATTERNS.filter((pattern) =>
          patterns_observed.includes(pattern.pattern_name)
        );

        return NextResponse.json({
          success: true,
          analysis: analysis,
          overall_harm_score:
            analysis.reduce((sum, p) => sum + p.harm_level, 0) /
            analysis.length,
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

      case "get_consumer_protections":
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
            stateProtections.find((s) => s.state === state) ||
            stateProtections[0],
        });

      case "get_educational_content":
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

      case "behavioral_analysis":
        const {
          user_actions: _user_actions,
          decision_points: _decision_points,
        } = data;

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

      case "research_lookup":
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

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === "development") {
      // console.error('Phase Three API Error:', error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  switch (type) {
    case "dark_patterns_database":
      return NextResponse.json({
        success: true,
        dark_patterns: DARK_PATTERNS,
        categories: [
          "Deceptive Design",
          "Behavioral Manipulation",
          "Information Asymmetry",
          "Process Friction",
        ],
        harm_assessment: {
          scale: "1-10 (10 = highest harm)",
          criteria: [
            "Financial impact",
            "Psychological manipulation",
            "Difficulty to detect",
            "Frequency of use",
          ],
        },
      });

    case "research_statistics":
      return NextResponse.json({
        success: true,
        research_database: RESEARCH_DATA,
        key_statistics: {
          debt_trap_rate: "80% of loans rolled over",
          average_borrower_debt_duration: "5 months per year",
          revenue_from_trapped_borrowers: "75%",
          unauthorized_withdrawal_rate: "32% of borrowers",
          average_nsf_fees: "$105 per borrower",
        },
        methodology_note:
          "Data compiled from peer-reviewed studies, government reports, and industry analysis",
      });

    case "educational_catalog":
      return NextResponse.json({
        success: true,
        educational_content: EDUCATIONAL_CONTENT,
        learning_paths: [
          {
            path_name: "Consumer Protection Basics",
            duration: "2 hours",
            topics: [
              "APR calculation",
              "Dark pattern recognition",
              "Complaint process",
            ],
          },
          {
            path_name: "Advanced Financial Literacy",
            duration: "4 hours",
            topics: [
              "Behavioral finance",
              "Alternative lending",
              "Policy analysis",
            ],
          },
        ],
        certification_available: false,
      });

    case "policy_recommendations":
      return NextResponse.json({
        success: true,
        policy_recommendations: {
          federal_level: [
            "Nationwide 36% APR cap on consumer loans",
            "Mandatory cooling-off periods",
            "Stronger ability-to-repay requirements",
            "ACH authorization reform",
          ],
          state_level: [
            "Comprehensive payday lending reform",
            "Dark pattern regulation",
            "Consumer education funding",
            "Alternative lending support",
          ],
          industry_level: [
            "Transparent design principles",
            "Ethical lending standards",
            "Consumer-first business models",
            "Harm reduction practices",
          ],
        },
        evidence_base:
          "Recommendations based on research showing 80% debt trap rate and widespread consumer harm",
      });

    default:
      return NextResponse.json({
        success: true,
        api_info: {
          name: "Phase Three API - Educational & Reflection",
          version: "1.0.0",
          description:
            "Comprehensive analysis, education, and research about predatory lending",
          endpoints: {
            POST: [
              "analyze_dark_patterns",
              "get_consumer_protections",
              "get_educational_content",
              "behavioral_analysis",
              "research_lookup",
            ],
            GET: [
              "dark_patterns_database",
              "research_statistics",
              "educational_catalog",
              "policy_recommendations",
            ],
          },
        },
      });
  }
}
