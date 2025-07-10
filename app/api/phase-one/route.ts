import { NextRequest, NextResponse } from 'next/server';

/**
 * Phase One API - Consolidated Predatory Lending Operations
 * 
 * Combines functionality from:
 * - loan-application/route.ts
 * - calculate-fees/route.ts
 * - user-tracking/route.ts
 * - psychological-triggers/route.ts
 * - rollover-mechanism/route.ts
 * - professional-loan/route.ts
 * 
 * Based on research findings about predatory practices
 */

interface LoanApplication {
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

interface FeeStructure {
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

interface PsychologicalTriggers {
  urgency_level: number;
  scarcity_messaging: string[];
  social_proof: string[];
  authority_badges: string[];
  vulnerability_targeting: string[];
  gamification_elements: string[];
}

interface UserTrackingData {
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

// State-specific regulations for maximum exploitation
const STATE_REGULATIONS = {
  'TX': { max_apr: 664, max_amount: 1500, term_days: 14, rollover_limit: 4 },
  'CA': { max_apr: 36, max_amount: 300, term_days: 31, rollover_limit: 0 },
  'NY': { max_apr: 36, max_amount: 500, term_days: 30, rollover_limit: 0 },
  'FL': { max_apr: 304, max_amount: 500, term_days: 14, rollover_limit: 3 },
  'OH': { max_apr: 391, max_amount: 1000, term_days: 14, rollover_limit: 4 },
  'DEFAULT': { max_apr: 400, max_amount: 500, term_days: 14, rollover_limit: 3 }
};

// Vulnerability assessment algorithm
function calculateVulnerabilityScore(application: LoanApplication): number {
  let score = 0;
  
  // Income-based vulnerability
  if (application.income < 2000) {
    score += 3;
  } else if (application.income < 3000) {
    score += 2;
  } else if (application.income < 4000) {
    score += 1;
  }
  
  // Employment instability
  if (application.employment.toLowerCase().includes('part')) {
    score += 2;
  }
  if (application.employment.toLowerCase().includes('temp')) {
    score += 2;
  }
  if (application.employment.toLowerCase().includes('gig')) {
    score += 1;
  }
  
  // Banking status (underbanked indicators)
  if (application.bankName.toLowerCase().includes('check')) {
    score += 2;
  }
  if (application.bankName.toLowerCase().includes('cash')) {
    score += 2;
  }
  if (application.bankName.toLowerCase().includes('money')) {
    score += 1;
  }
  
  // Demographic targeting (research shows elderly/disability recipients targeted)
  // This would be implemented based on additional data points
  
  return Math.min(score, 10);
}

// Calculate predatory fee structure
function calculatePredatoryFees(principal: number, state: string, vulnerabilityScore: number): FeeStructure {
  const stateReg = STATE_REGULATIONS[state as keyof typeof STATE_REGULATIONS] || STATE_REGULATIONS.DEFAULT;
  const baseRate = stateReg.max_apr / 100;
  const termDays = stateReg.term_days;
  
  // Base calculation
  const base_fee = Math.floor(principal * (baseRate / 365) * termDays);
  
  // Additional exploitative fees
  const processing_fee = Math.floor(principal * 0.08); // 8% processing
  const verification_fee = 25;
  const ach_fee = 15;
  const risk_assessment = 30 + (vulnerabilityScore * 5); // Higher fees for vulnerable
  const platform_fee = 20;
  const insurance_fee = 25; // Often pre-selected
  const late_fee = 40;
  const rollover_fee = 50;
  const nsf_fee = 35;
  
  const total_fees = base_fee + processing_fee + verification_fee + ach_fee + 
                     risk_assessment + platform_fee + insurance_fee;
  const total_due = principal + total_fees;
  const actual_apr = Math.floor((total_fees / principal) * (365 / termDays) * 100);
  
  // Exploitation multiplier based on vulnerability
  const exploitation_multiplier = 1 + (vulnerabilityScore * 0.1);
  
  return {
    principal,
    base_fee,
    processing_fee,
    verification_fee,
    ach_fee,
    risk_assessment,
    platform_fee,
    insurance_fee,
    late_fee,
    rollover_fee,
    nsf_fee,
    total_fees: Math.floor(total_fees * exploitation_multiplier),
    total_due: Math.floor(total_due * exploitation_multiplier),
    apr: actual_apr,
    state_max_apr: stateReg.max_apr,
    exploitation_multiplier
  };
}

// Generate psychological triggers based on vulnerability
function generatePsychologicalTriggers(vulnerabilityScore: number): PsychologicalTriggers {
  const base_triggers: PsychologicalTriggers = {
    urgency_level: Math.min(vulnerabilityScore + 2, 10),
    scarcity_messaging: [
      "Only 3 spots left for instant approval",
      "This pre-approved offer expires in 24 hours",
      "Limited time: No credit check required"
    ],
    social_proof: [
      "347 people applied in the last hour",
      "Sarah from Dallas just got approved for $500",
      "Over 10,000 satisfied customers this month"
    ],
    authority_badges: [
      "BBB Accredited Business",
      "SSL Secured Application",
      "Licensed in 50 States",
      "As Seen on TV"
    ],
    vulnerability_targeting: [],
    gamification_elements: [
      "Unlock VIP status with your first loan",
      "Earn rewards for quick repayment",
      "Join our loyalty program"
    ]
  };
  
  // Enhanced targeting for vulnerable populations
  if (vulnerabilityScore >= 7) {
    base_triggers.vulnerability_targeting = [
      "Emergency financial assistance available",
      "No judgment, we understand financial struggles",
      "Designed for people with imperfect credit",
      "Get cash when banks say no"
    ];
  } else if (vulnerabilityScore >= 4) {
    base_triggers.vulnerability_targeting = [
      "Fast approval for working professionals",
      "Bridge the gap until payday",
      "Flexible options for your situation"
    ];
  }
  
  return base_triggers;
}

// Track user behavior for manipulation
function trackUserBehavior(request: NextRequest): UserTrackingData {
  const headers = request.headers;
  const userAgent = headers.get('user-agent') || '';
  const referer = headers.get('referer') || '';
  
  // Analyze user agent and referer for targeting
  const isMobile = userAgent.toLowerCase().includes('mobile');
  const isFromSocialMedia = referer.includes('facebook') || referer.includes('instagram');
  const isDirectVisit = !referer;
  
  // Simulate tracking data based on user behavior
  return {
    session_id: Date.now().toString(),
    page_views: Math.floor(Math.random() * 10) + 1,
    time_on_site: Math.floor(Math.random() * 300) + 60,
    form_interactions: Math.floor(Math.random() * 5) + 1,
    cancel_attempts: Math.floor(Math.random() * 3),
    vulnerability_indicators: [
      'multiple_form_attempts',
      'long_session_duration',
      'repeated_visits',
      isMobile ? 'mobile_device_usage' : 'desktop_usage',
      isFromSocialMedia ? 'social_media_referral' : 'direct_traffic',
      isDirectVisit ? 'desperate_direct_search' : 'referral_traffic'
    ],
    financial_stress_score: Math.floor(Math.random() * 10) + 1,
    manipulation_susceptibility: Math.floor(Math.random() * 8) + 1,
    target_profile: 'high_value_vulnerable'
  };
}

// Simulate rollover mechanism
function simulateRollover(originalAmount: number, rolloverCount: number): any {
  const rolloverFee = 50;
  const compoundedFees = rolloverFee * (rolloverCount + 1);
  
  return {
    original_principal: originalAmount,
    rollover_count: rolloverCount,
    rollover_fee: rolloverFee,
    new_total_due: originalAmount + compoundedFees,
    total_fees_paid: compoundedFees,
    principal_paid: 0, // Research shows principal never reduces
    new_due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    trap_status: rolloverCount >= 3 ? 'deep_trap' : 'entering_trap',
    profitability_score: rolloverCount * 2.5 // Higher rollovers = higher profit
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;
    
    switch (action) {
      case 'loan_application':
        const application: LoanApplication = data;
        const vulnerabilityScore = calculateVulnerabilityScore(application);
        const state = 'TX'; // Default to Texas (highest APR allowed)
        const fees = calculatePredatoryFees(data.amount || 300, state, vulnerabilityScore);
        const triggers = generatePsychologicalTriggers(vulnerabilityScore);
        const tracking = trackUserBehavior(request);
        
        return NextResponse.json({
          success: true,
          application_id: Date.now().toString(),
          vulnerability_score: vulnerabilityScore,
          fee_structure: fees,
          psychological_triggers: triggers,
          tracking_data: tracking,
          approval_status: 'pre_approved',
          exploitation_profile: {
            target_type: vulnerabilityScore >= 7 ? 'high_value_vulnerable' : 'standard_target',
            estimated_lifetime_value: fees.total_fees * (2 + vulnerabilityScore),
            rollover_probability: Math.min(80 + vulnerabilityScore * 2, 95),
            extraction_strategy: 'maximize_fees_minimize_principal_reduction'
          }
        });
        
      case 'calculate_fees':
        const { amount, state: userState, vulnerability } = data;
        const feeStructure = calculatePredatoryFees(amount, userState, vulnerability || 0);
        
        return NextResponse.json({
          success: true,
          fee_breakdown: feeStructure,
          comparison: {
            ethical_alternative: {
              credit_union_loan: {
                principal: amount,
                interest: Math.floor(amount * 0.28 * (14/365)), // 28% APR
                total_due: amount + Math.floor(amount * 0.28 * (14/365)),
                apr: 28,
                no_rollover_fees: true
              }
            },
            predatory_reality: feeStructure
          }
        });
        
      case 'rollover_simulation':
        const { original_amount, rollover_count } = data;
        const rolloverData = simulateRollover(original_amount, rollover_count);
        
        return NextResponse.json({
          success: true,
          rollover_data: rolloverData,
          research_statistics: {
            percent_loans_rolled_over: 80,
            percent_on_time_payment: 15,
            percent_revenue_from_trapped_borrowers: 75,
            average_rollovers_per_loan: 8
          }
        });
        
      case 'ach_exploitation':
        const { account_info, payment_amount } = data;
        
        // Analyze account info for exploitation potential
        const account_type = account_info?.account_type || 'checking';
        const bank_name = account_info?.bank_name || 'unknown';
        const is_credit_union = bank_name.toLowerCase().includes('credit union');
        
        return NextResponse.json({
          success: true,
          ach_simulation: {
            authorized_amount: payment_amount,
            account_analysis: {
              account_type,
              bank_name,
              exploitation_risk: is_credit_union ? 'low' : 'high',
              multiple_attempt_likelihood: is_credit_union ? 20 : 85
            },
            unauthorized_attempts: [
              { amount: payment_amount, purpose: 'duplicate_payment', status: 'failed' },
              { amount: payment_amount, purpose: 'retry_attempt', status: 'failed' },
              { amount: payment_amount, purpose: 'alternative_account', status: 'success' }
            ],
            nsf_fees_generated: 70, // 2 failed attempts × $35
            total_extracted: payment_amount + 70,
            research_data: {
              percent_borrowers_unauthorized_withdrawals: 32,
              average_nsf_fees_per_borrower: 105,
              multiple_attempt_strategy: 'standard_industry_practice'
            }
          }
        });
        
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Phase One API Error:', error);
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  switch (type) {
    case 'state_regulations':
      return NextResponse.json({
        success: true,
        state_regulations: STATE_REGULATIONS,
        exploitation_analysis: {
          highest_apr_states: ['TX', 'OH', 'FL'],
          lowest_protection_states: ['TX', 'OH', 'FL'],
          regulatory_arbitrage: 'Lenders incorporate in high-APR states'
        }
      });
      
    case 'research_statistics':
      return NextResponse.json({
        success: true,
        research_findings: {
          debt_trap_statistics: {
            percent_loans_rolled_over: 80,
            percent_on_time_payment: 15,
            percent_revenue_from_trapped_customers: 75,
            average_loan_sequence_length: 8,
            median_borrower_fees_vs_principal: 1.8
          },
          ach_exploitation: {
            percent_unauthorized_withdrawals: 32,
            average_nsf_fees_per_borrower: 105,
            multiple_attempt_frequency: 78
          },
          targeting_vulnerable_populations: {
            percent_elderly_borrowers: 12,
            percent_disability_recipients: 8,
            percent_monthly_benefit_borrowers_trapped_all_year: 20
          }
        }
      });
      
    default:
      return NextResponse.json({
        success: true,
        api_info: {
          name: 'Phase One API - Predatory Lending Simulation',
          version: '1.0.0',
          description: 'Consolidated API for simulating predatory lending practices based on research',
          endpoints: {
            POST: ['loan_application', 'calculate_fees', 'rollover_simulation', 'ach_exploitation'],
            GET: ['state_regulations', 'research_statistics']
          }
        }
      });
  }
} 