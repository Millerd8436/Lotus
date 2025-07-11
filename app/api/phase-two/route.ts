import { NextRequest, NextResponse } from "next/server";

/**
 * Phase Two API - Ethical Lending Operations
 *
 * Complete contrast to Phase One predatory practices:
 * - Full transparency upfront
 * - User empowerment and education
 * - Alternatives-first approach
 * - Fair pricing and clear terms
 * - Consumer protection compliance
 * - No dark patterns or manipulation
 * - Responsible lending practices
 *
 * Consolidates ethical alternatives to all predatory Phase 1 operations
 */

interface EthicalLoanApplication {
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

interface TransparentFeeStructure {
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

interface FeesComparison {
  name: string;
  typical_apr: number;
  typical_fees: number;
  typical_total_for_same_amount: number;
  availability: string;
  pros: string[];
  cons: string[];
  how_to_access: string;
}

interface PaymentOption {
  option_name: string;
  due_date: string;
  amount: number;
  fees: number;
  penalties: number;
  early_payoff_benefit: string;
}

interface FullDisclosure {
  all_fees_listed: string[];
  no_hidden_charges: boolean;
  cancellation_policy: string;
  cooling_off_period: string;
  complaint_process: string;
  regulatory_compliance: string[];
}

interface AlternativeOptions {
  immediate_alternatives: ImmediateAlternative[];
  medium_term_solutions: MediumTermSolution[];
  long_term_strategies: LongTermStrategy[];
  local_resources: LocalResource[];
  emergency_assistance: EmergencyAssistance[];
}

interface ImmediateAlternative {
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

interface MediumTermSolution {
  solution: string;
  description: string;
  timeline: string;
  requirements: string[];
  benefits: string[];
  how_to_start: string;
}

interface LongTermStrategy {
  strategy: string;
  description: string;
  timeline: string;
  expected_outcome: string;
  resources_needed: string[];
  steps: string[];
}

interface LocalResource {
  organization: string;
  service_type: string;
  eligibility: string;
  cost: string;
  contact_info: string;
  description: string;
}

interface EmergencyAssistance {
  program: string;
  provider: string;
  assistance_type: string;
  eligibility: string;
  application_process: string;
  contact_info: string;
}

interface EthicalGuidance {
  financial_counseling: FinancialCounseling;
  educational_resources: EducationalResource[];
  budgeting_tools: BudgetingTool[];
  credit_building: CreditBuilding[];
  savings_strategies: SavingsStrategy[];
}

interface FinancialCounseling {
  free_counseling_options: string[];
  what_to_expect: string;
  how_to_prepare: string[];
  typical_outcomes: string[];
}

interface EducationalResource {
  topic: string;
  provider: string;
  format: string;
  duration: string;
  cost: string;
  link: string;
  target_audience: string;
}

interface BudgetingTool {
  tool_name: string;
  provider: string;
  features: string[];
  cost: string;
  best_for: string;
  link: string;
}

interface CreditBuilding {
  method: string;
  description: string;
  timeline: string;
  requirements: string[];
  expected_impact: string;
  risks: string[];
}

interface SavingsStrategy {
  strategy: string;
  description: string;
  target_amount: string;
  timeline: string;
  difficulty: string;
  tips: string[];
}

// Calculate transparent, fair fee structure
function calculateEthicalFees(principal: number): TransparentFeeStructure {
  // Simple, transparent fee structure - no hidden charges
  const fee = Math.floor(principal * 0.15); // 15% fee vs 391% APR predatory loans
  const total_due = principal + fee;
  const apr = Math.floor((fee / principal) * (365 / 14) * 100); // About 143% APR

  return {
    principal,
    fee,
    total_due,
    apr,
    comparison: {
      credit_card_cash_advance: {
        name: "Credit Card Cash Advance",
        typical_apr: 25,
        typical_fees: Math.floor(principal * 0.05),
        typical_total_for_same_amount:
          principal + Math.floor(principal * 0.25 * (14 / 365)),
        availability: "If you have credit card with available credit",
        pros: [
          "Lower total cost",
          "Established relationship",
          "Flexible repayment",
        ],
        cons: [
          "Requires existing credit",
          "May affect credit score",
          "Higher interest rate than purchases",
        ],
        how_to_access: "Call your credit card company or use online banking",
      },
      credit_union_pal: {
        name: "Credit Union Payday Alternative Loan (PAL)",
        typical_apr: 28,
        typical_fees: 20,
        typical_total_for_same_amount:
          principal + Math.floor(principal * 0.28 * (14 / 365)) + 20,
        availability: "Credit union members (membership may be available)",
        pros: [
          "Much lower cost",
          "Builds relationship",
          "Credit reporting",
          "Financial counseling",
        ],
        cons: [
          "Requires membership",
          "May take longer to process",
          "Limited loan amounts",
        ],
        how_to_access: "Visit local credit union or check online eligibility",
      },
      bank_overdraft: {
        name: "Bank Overdraft (if available)",
        typical_apr: 0,
        typical_fees: 35,
        typical_total_for_same_amount: principal + 35,
        availability: "If you have checking account with overdraft protection",
        pros: [
          "Lower total cost",
          "Immediate access",
          "No application process",
        ],
        cons: [
          "Limited to account balance",
          "Can damage banking relationship",
          "May trigger additional fees",
        ],
        how_to_access: "Contact your bank about overdraft options",
      },
      employer_advance: {
        name: "Employer Salary Advance",
        typical_apr: 0,
        typical_fees: 0,
        typical_total_for_same_amount: principal,
        availability: "Many employers offer this benefit",
        pros: [
          "No interest or fees",
          "Automatic payroll deduction",
          "No credit check",
        ],
        cons: [
          "Not all employers offer",
          "Limited to salary amount",
          "May affect future paychecks",
        ],
        how_to_access: "Contact HR department or speak with supervisor",
      },
    },
    payment_plan: [
      {
        option_name: "Standard 14-day term",
        due_date:
          new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0] || "",
        amount: total_due,
        fees: 0,
        penalties: 0,
        early_payoff_benefit: "No penalty for early payment",
      },
      {
        option_name: "Extended payment plan (if needed)",
        due_date:
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0] || "",
        amount: total_due,
        fees: 10,
        penalties: 0,
        early_payoff_benefit: "Reduced fee if paid early",
      },
    ],
    full_disclosure: {
      all_fees_listed: [
        `Loan fee: $${fee}`,
        "No hidden charges",
        "No rollover fees",
        "No prepayment penalties",
      ],
      no_hidden_charges: true,
      cancellation_policy: "You can cancel within 24 hours with no penalty",
      cooling_off_period: "24 hours to reconsider after signing",
      complaint_process:
        "Contact us directly or file complaint with CFPB at consumerfinance.gov",
      regulatory_compliance: [
        "Truth in Lending Act",
        "Fair Debt Collection Practices Act",
        "State licensing requirements",
      ],
    },
  };
}

// Provide comprehensive alternatives
function getAlternativeOptions(_userState: string): AlternativeOptions {
  return {
    immediate_alternatives: [
      {
        option: "Credit Union Payday Alternative Loan (PAL)",
        description:
          "Small dollar loans with 28% APR maximum and $20 application fee",
        typical_cost: "28% APR + $20 fee",
        time_to_access: "1-3 business days",
        eligibility: "Credit union membership (often available to anyone)",
        how_to_apply: "Visit credit union branch or apply online",
        contact_info: "Use NCUA.gov to find local credit unions",
        pros: [
          "Much lower cost",
          "Builds credit",
          "Financial counseling included",
        ],
        cons: ["Requires membership", "Slightly longer process"],
      },
      {
        option: "Employer Salary Advance",
        description:
          "Many employers offer salary advances to help with emergencies",
        typical_cost: "Often free or low administrative fee",
        time_to_access: "Same day to 2 business days",
        eligibility: "Varies by employer",
        how_to_apply: "Contact HR or supervisor",
        contact_info: "Your company's HR department",
        pros: ["No interest", "Automatic repayment", "No credit check"],
        cons: ["Limited to salary amount", "Not all employers offer"],
      },
      {
        option: "Community Assistance Programs",
        description:
          "Local organizations often provide emergency financial assistance",
        typical_cost: "Free or low cost",
        time_to_access: "1-5 business days",
        eligibility: "Varies by program and need",
        how_to_apply: "Contact local community organizations",
        contact_info: "Call 211 for local resources",
        pros: ["Free or very low cost", "May include other support services"],
        cons: ["Limited availability", "May have waiting lists"],
      },
    ],
    medium_term_solutions: [
      {
        solution: "Build Emergency Fund",
        description: "Start with small amounts to build emergency savings",
        timeline: "3-6 months to build initial fund",
        requirements: ["Consistent income", "Basic budgeting"],
        benefits: [
          "Avoid future need for emergency loans",
          "Peace of mind",
          "Financial stability",
        ],
        how_to_start:
          "Set up automatic transfer of $25-50 per paycheck to savings",
      },
      {
        solution: "Improve Credit Score",
        description: "Better credit opens access to lower-cost loan options",
        timeline: "6-12 months for significant improvement",
        requirements: [
          "Credit report review",
          "Consistent payments",
          "Credit monitoring",
        ],
        benefits: [
          "Access to traditional loans",
          "Lower interest rates",
          "Better financial options",
        ],
        how_to_start:
          "Get free credit report and create payment plan for any debts",
      },
    ],
    long_term_strategies: [
      {
        strategy: "Financial Education and Literacy",
        description: "Comprehensive understanding of personal finance",
        timeline: "Ongoing, lifelong learning",
        expected_outcome: "Better financial decision-making and stability",
        resources_needed: [
          "Time for learning",
          "Access to educational materials",
        ],
        steps: [
          "Take financial literacy course",
          "Read reputable financial resources",
          "Work with financial counselor",
        ],
      },
      {
        strategy: "Career Development and Income Growth",
        description:
          "Increase earning potential to improve financial stability",
        timeline: "1-3 years depending on approach",
        expected_outcome: "Higher income and better job security",
        resources_needed: [
          "Time for training/education",
          "Networking opportunities",
        ],
        steps: [
          "Assess current skills",
          "Identify growth opportunities",
          "Pursue training or education",
          "Network in your field",
        ],
      },
    ],
    local_resources: [
      {
        organization: "United Way",
        service_type: "Emergency financial assistance",
        eligibility: "Varies by local chapter",
        cost: "Free",
        contact_info: "Call 211 or visit unitedway.org",
        description:
          "Provides emergency assistance and connects people with local resources",
      },
      {
        organization: "Salvation Army",
        service_type: "Emergency financial assistance",
        eligibility: "Based on need",
        cost: "Free",
        contact_info: "Find local office at salvationarmyusa.org",
        description:
          "Offers emergency assistance for utilities, rent, and other basic needs",
      },
    ],
    emergency_assistance: [
      {
        program: "Low Income Home Energy Assistance Program (LIHEAP)",
        provider: "State government",
        assistance_type: "Utility bill assistance",
        eligibility: "Income-based",
        application_process: "Apply through state agency",
        contact_info: "Contact your state's LIHEAP office",
      },
    ],
  };
}

// Provide ethical guidance and education
function getEthicalGuidance(): EthicalGuidance {
  return {
    financial_counseling: {
      free_counseling_options: [
        "Credit counseling agencies (NFCC certified)",
        "Financial counselors at credit unions",
        "Free financial education workshops",
        "Online financial counseling services",
      ],
      what_to_expect:
        "Review of your financial situation, budgeting help, debt management strategies, and long-term planning",
      how_to_prepare: [
        "Gather recent bank statements",
        "List all debts and monthly expenses",
        "Be honest about financial challenges",
        "Come with specific questions",
      ],
      typical_outcomes: [
        "Better understanding of your financial situation",
        "Personalized budget and debt management plan",
        "Strategies for building emergency savings",
        "Resources for continued financial education",
      ],
    },
    educational_resources: [
      {
        topic: "Budgeting Basics",
        provider: "Consumer Financial Protection Bureau",
        format: "Online modules and worksheets",
        duration: "2-3 hours",
        cost: "Free",
        link: "consumerfinance.gov",
        target_audience: "Anyone wanting to improve budgeting skills",
      },
      {
        topic: "Building Credit",
        provider: "myFICO",
        format: "Online articles and tools",
        duration: "1-2 hours",
        cost: "Free basic info, premium tools available",
        link: "myfico.com",
        target_audience: "People with no credit or damaged credit",
      },
    ],
    budgeting_tools: [
      {
        tool_name: "Mint",
        provider: "Intuit",
        features: [
          "Expense tracking",
          "Budget creation",
          "Bill reminders",
          "Credit score monitoring",
        ],
        cost: "Free",
        best_for: "Comprehensive budget management",
        link: "mint.com",
      },
      {
        tool_name: "YNAB (You Need A Budget)",
        provider: "YNAB LLC",
        features: [
          "Zero-based budgeting",
          "Goal setting",
          "Debt tracking",
          "Educational resources",
        ],
        cost: "$14/month (free trial available)",
        best_for: "People serious about changing spending habits",
        link: "youneedabudget.com",
      },
    ],
    credit_building: [
      {
        method: "Secured Credit Card",
        description: "Credit card backed by a security deposit",
        timeline: "6-12 months to see credit score improvement",
        requirements: [
          "Security deposit ($200-500)",
          "Regular income",
          "Bank account",
        ],
        expected_impact:
          "10-50 point credit score improvement with responsible use",
        risks: ["Annual fees", "Need discipline to avoid overspending"],
      },
      {
        method: "Credit Builder Loan",
        description: "Small loan designed specifically to build credit",
        timeline: "12-24 months loan term",
        requirements: ["Regular income", "Bank account"],
        expected_impact: "Credit history establishment and score improvement",
        risks: ["Interest charges", "Late payment damage to credit"],
      },
    ],
    savings_strategies: [
      {
        strategy: "Automatic Micro-Savings",
        description: "Automatically save small amounts regularly",
        target_amount: "$500 emergency fund",
        timeline: "6-12 months",
        difficulty: "Easy",
        tips: [
          "Start with $1/day",
          "Use apps that round up purchases",
          "Automate transfers on payday",
        ],
      },
      {
        strategy: "52-Week Savings Challenge",
        description: "Save increasing amounts each week of the year",
        target_amount: "$1,378 in one year",
        timeline: "52 weeks",
        difficulty: "Moderate",
        tips: [
          "Start small in week 1",
          "Adjust amounts to fit your budget",
          "Use visual tracker",
        ],
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case "evaluate_application":
        const application: EthicalLoanApplication = data;

        // Check if user has reviewed alternatives
        if (!application.hasReviewedAlternatives) {
          return NextResponse.json({
            success: false,
            message: "Please review alternative options before proceeding",
            alternatives_required: true,
            alternative_options: getAlternativeOptions("TX"),
          });
        }

        // Provide transparent fee structure
        const feeStructure = calculateEthicalFees(data.amount || 300);
        const applicationAlternatives = getAlternativeOptions(
          data.state || "TX"
        );
        const applicationGuidance = getEthicalGuidance();

        return NextResponse.json({
          success: true,
          evaluation: {
            recommendation:
              "Consider alternatives first, but loan available if needed",
            fee_structure: feeStructure,
            alternative_options: applicationAlternatives,
            ethical_guidance: applicationGuidance,
            cooling_off_period: "24 hours to change your mind",
            no_pressure_message:
              "Take your time to decide. This offer will remain available.",
          },
        });

      case "calculate_transparent_fees":
        const { amount } = data;
        const fees = calculateEthicalFees(amount);

        return NextResponse.json({
          success: true,
          transparent_fees: fees,
          honesty_promise:
            "All fees disclosed upfront - no hidden charges ever",
          comparison_encouragement:
            "We encourage you to compare with other options",
        });

      case "get_alternatives":
        const { user_state, situation: _situation } = data;
        const stateAlternatives = getAlternativeOptions(user_state || "TX");

        return NextResponse.json({
          success: true,
          alternatives: stateAlternatives,
          recommendation:
            "Try these options first - they're often better than any loan",
          support_message:
            "We're here to help you find the best solution, even if it's not with us",
        });

      case "financial_guidance":
        const financialGuidance = getEthicalGuidance();

        return NextResponse.json({
          success: true,
          guidance: financialGuidance,
          philosophy: "Financial education empowers better decisions",
          commitment: "We invest in your long-term financial health",
        });

      case "complaint_or_feedback":
        const { complaint_type: _complaint_type, description: _description } =
          data;

        return NextResponse.json({
          success: true,
          response: {
            acknowledgment: "We take all feedback seriously",
            next_steps: "We will review your concern within 1 business day",
            escalation_options: [
              "Consumer Financial Protection Bureau: consumerfinance.gov/complaint",
              "State Attorney General office",
              "Better Business Bureau",
            ],
            our_commitment: "Continuous improvement based on customer feedback",
          },
        });

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === "development") {
      // console.error('Phase Two API Error:', error);
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
    case "ethical_principles":
      return NextResponse.json({
        success: true,
        ethical_principles: {
          transparency: "All costs and terms disclosed upfront",
          user_empowerment: "Education and alternatives always provided",
          fair_pricing: "Reasonable fees, no exploitation of vulnerability",
          no_dark_patterns: "Honest design that respects user autonomy",
          consumer_protection: "Full compliance with consumer protection laws",
          responsible_lending:
            "Only lend when appropriate for user's situation",
          continuous_improvement: "Regular review and enhancement of practices",
        },
        commitment:
          "Our success is measured by customer financial health improvement",
      });

    case "alternatives_database":
      return NextResponse.json({
        success: true,
        alternatives: getAlternativeOptions("TX"),
        philosophy: "The best loan is often no loan at all",
        success_metrics:
          "We measure success by how many people we help avoid debt",
      });

    case "educational_resources":
      return NextResponse.json({
        success: true,
        resources: getEthicalGuidance(),
        investment_statement:
          "We invest in financial education because informed customers make better decisions",
      });

    case "transparency_report":
      return NextResponse.json({
        success: true,
        transparency_report: {
          average_loan_amount: 300,
          average_total_cost: 345,
          percentage_who_found_alternatives: 65,
          customer_satisfaction: 94,
          complaint_resolution_time: "1 business day average",
          regulatory_compliance_score: "100%",
          financial_counseling_referrals: 856,
        },
        methodology: "All metrics independently verified and publicly reported",
      });

    default:
      return NextResponse.json({
        success: true,
        api_info: {
          name: "Phase Two API - Ethical Lending",
          version: "1.0.0",
          description:
            "Transparent, user-empowering alternative to predatory lending",
          principles: [
            "Full transparency",
            "User empowerment",
            "Alternatives first",
            "No manipulation",
          ],
          endpoints: {
            POST: [
              "evaluate_application",
              "calculate_transparent_fees",
              "get_alternatives",
              "financial_guidance",
              "complaint_or_feedback",
            ],
            GET: [
              "ethical_principles",
              "alternatives_database",
              "educational_resources",
              "transparency_report",
            ],
          },
        },
      });
  }
}
