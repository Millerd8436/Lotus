import { DarkPatternAnalysis, ResearchData, EducationalContent } from "./interfaces";

export const DARK_PATTERNS: DarkPatternAnalysis[] = [
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

export const RESEARCH_DATA: ResearchData[] = [
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

export const EDUCATIONAL_CONTENT: EducationalContent[] = [
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
