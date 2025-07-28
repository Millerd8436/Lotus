'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { ProgressIndicator } from '@/components/shared/ProgressIndicator';
import { VALIDATED_PATTERNS, ValidatedDeceptivePattern } from '@/types';

interface PersonalizedInsight {
  loanType: string;
  timeSpent: number;
  comprehensionScore: number;
  trustRating: number;
  patternsExposed: ValidatedDeceptivePattern[];
  behaviorAnalysis: BehaviorAnalysis;
  riskLevel: 'low' | 'medium' | 'high';
}

interface BehaviorAnalysis {
  impulsivityIndicators: string[];
  comprehensionGaps: string[];
  susceptibilityFactors: string[];
  protectiveFactors: string[];
}

interface ScientificInsight {
  title: string;
  finding: string;
  yourExperience: string;
  researchBasis: string;
  implication: string;
}

const CREDIT_ALTERNATIVES = [
  {
    name: 'Credit Union Personal Loan',
    description: 'Lower-cost personal loans from member-owned financial institutions',
    pros: ['Typically 6-18% APR', 'No prepayment penalties', 'Flexible terms', 'Member benefits'],
    cons: ['Membership requirements', 'May take longer to fund', 'Credit check required'],
    typical_apr: '6-18%',
    qualification_requirements: ['Credit union membership', 'Steady income', 'Fair credit (580+)'],
    recommended_for: ['Consolidating debt', 'Large purchases', 'Building credit history']
  },
  {
    name: 'Emergency Assistance Programs',
    description: 'Government and nonprofit programs for financial emergencies',
    pros: ['Free or very low cost', 'No credit check', 'Additional support services', 'No debt burden'],
    cons: ['Limited availability', 'Specific eligibility requirements', 'May take time to process'],
    typical_apr: '0%',
    qualification_requirements: ['Income limits', 'Emergency situation', 'Local residency'],
    recommended_for: ['Utility bills', 'Rent assistance', 'Food insecurity', 'Medical bills']
  },
  {
    name: 'Employer-Based Emergency Loans',
    description: 'Small loans or advances offered directly by employers',
    pros: ['Payroll deduction', 'No credit check', 'Lower rates', 'No external lender'],
    cons: ['Limited availability', 'Employment dependent', 'May affect work relationship'],
    typical_apr: '0-10%',
    qualification_requirements: ['Employment tenure', 'Good standing at work', 'Company participation'],
    recommended_for: ['Small emergencies', 'Transportation issues', 'Unexpected expenses']
  },
  {
    name: 'Secured Credit Card',
    description: 'Credit card requiring a security deposit to establish credit',
    pros: ['Builds credit history', 'Regular APR rates', 'Grace period for payments', 'Upgrade potential'],
    cons: ['Requires deposit', 'Lower credit limits', 'Annual fees possible', 'Takes time to build'],
    typical_apr: '15-25%',
    qualification_requirements: ['Security deposit ($200-500)', 'Bank account', 'Identity verification'],
    recommended_for: ['Building credit', 'Regular purchases', 'Online shopping', 'Emergency backup']
  }
];

const DebriefPage: React.FC = () => {
  const router = useRouter();
  const [insights, setInsights] = useState<PersonalizedInsight[]>([]);
  const [scientificInsights, setScientificInsights] = useState<ScientificInsight[]>([]);
  const [currentSection, setCurrentSection] = useState<'insights' | 'research' | 'alternatives' | 'actions'>('insights');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user's experimental data and generate personalized insights
    const generateInsights = async () => {
      try {
        // Simulated data fetch - in real app, this would come from database
        const mockInsights = generateMockInsights();
        const mockScientificInsights = generateScientificInsights(mockInsights);
        
        setInsights(mockInsights);
        setScientificInsights(mockScientificInsights);
        setLoading(false);
      } catch (error) {
        console.error('Error generating insights:', error);
        setLoading(false);
      }
    };

    generateInsights();
  }, []);

  const generateMockInsights = (): PersonalizedInsight[] => {
    // This would be generated from actual user data
    return [
      {
        loanType: 'BNPL',
        timeSpent: 45000, // 45 seconds
        comprehensionScore: 3, // out of 5
        trustRating: 4, // out of 5
        patternsExposed: VALIDATED_PATTERNS['BNPL'],
        behaviorAnalysis: {
          impulsivityIndicators: ['Quick decision making', 'Minimal fee disclosure interaction'],
          comprehensionGaps: ['Underestimated total cost', 'Missed late fee information'],
          susceptibilityFactors: ['High trust in 0% messaging', 'Payment plan terminology preference'],
          protectiveFactors: ['Noticed it was a form of credit', 'Asked about alternatives']
        },
        riskLevel: 'medium'
      },
      {
        loanType: 'EWA',
        timeSpent: 38000, // 38 seconds
        comprehensionScore: 2, // out of 5
        trustRating: 5, // out of 5
        patternsExposed: VALIDATED_PATTERNS['EWA'],
        behaviorAnalysis: {
          impulsivityIndicators: ['Left tip without hesitation', 'Clicked fastest payment option'],
          comprehensionGaps: ['Missed total annual cost calculation', 'Believed tips were truly voluntary'],
          susceptibilityFactors: ['High trust in employer affiliation', 'Urgency bias'],
          protectiveFactors: ['Questioned frequency of use']
        },
        riskLevel: 'high'
      }
    ];
  };

  const generateScientificInsights = (userInsights: PersonalizedInsight[]): ScientificInsight[] => {
    return [
      {
        title: 'The Price Complexity Effect',
        finding: 'CFPB research shows that complex pricing increases transaction costs by making true costs harder to evaluate.',
        yourExperience: 'You spent less time reviewing fee structures when they were broken into multiple components.',
        researchBasis: 'CFPB (2024) "Price Complexity in Laboratory Markets"',
        implication: 'Even financially sophisticated consumers struggle with complex pricing. Always ask for total cost in simple terms.'
      },
      {
        title: 'Tip Coercion Psychology',
        finding: '73% of users tip on "voluntary" EWA services due to interface design and psychological pressure.',
        yourExperience: 'You left a tip despite the service being advertised as free, influenced by default settings and guilt messaging.',
        researchBasis: 'CA DFPI (2023) EWA Data Findings; NCLC Tipping Coercion Research',
        implication: 'Companies profit from behavioral biases. True costs are often hidden in "optional" fees.'
      },
      {
        title: 'Credit Disguise Effect',
        finding: 'BNPL users are 73% more likely to overspend when services avoid loan terminology.',
        yourExperience: 'You rated BNPL as more trustworthy when it was called "payment plans" rather than loans.',
        researchBasis: 'Time inconsistency and impulse buying research (2024)',
        implication: 'Language matters. If it quacks like a loan, it probably is one - regardless of what it\'s called.'
      },
      {
        title: 'Authority Bias Transfer',
        finding: 'Consumers trust financial products more when they appear to be endorsed by employers or authority figures.',
        yourExperience: 'Your trust rating increased when the EWA service mentioned employer partnerships.',
        researchBasis: 'Harvard EWA usage patterns research (2023)',
        implication: 'Question apparent endorsements. Many are marketing tactics, not actual employer recommendations.'
      }
    ];
  };

  const getRiskColorClass = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your behavior patterns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Financial Decision-Making Profile
          </h1>
          <p className="text-lg text-gray-600">
            Based on your interactions with different loan simulators, here's what we learned about your financial decision-making patterns and some science-backed insights to help you make better choices in the future.
          </p>
        </div>

        {/* Progress/Navigation */}
        <div className="mb-8">
          <ProgressIndicator 
            currentStep={['insights', 'research', 'alternatives', 'actions'].indexOf(currentSection)}
            totalSteps={4}
            stepLabels={['Your Patterns', 'The Science', 'Better Options', 'Action Plan']}
          />
        </div>

        {/* Section Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {[
            { id: 'insights', label: 'Your Behavior Patterns' },
            { id: 'research', label: 'Scientific Insights' },
            { id: 'alternatives', label: 'Better Credit Options' },
            { id: 'actions', label: 'Your Action Plan' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id as any)}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                currentSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {currentSection === 'insights' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Behavior Patterns</h2>
            {insights.map((insight, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {insight.loanType} Simulator Results
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColorClass(insight.riskLevel)}`}>
                    {insight.riskLevel.toUpperCase()} RISK
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Behavioral Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time spent:</span>
                        <span className="font-medium">{Math.round(insight.timeSpent / 1000)}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Comprehension score:</span>
                        <span className="font-medium">{insight.comprehensionScore}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trust rating:</span>
                        <span className="font-medium">{insight.trustRating}/5</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Pattern Exposure</h4>
                    <div className="space-y-2">
                      {insight.patternsExposed.map((pattern, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-medium text-gray-700">{pattern.name}</span>
                          <p className="text-gray-600 text-xs">{pattern.psychologicalMechanism}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Behavioral Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-red-600">Risk Factors:</strong>
                      <ul className="mt-1 space-y-1">
                        {[...insight.behaviorAnalysis.impulsivityIndicators, ...insight.behaviorAnalysis.susceptibilityFactors].map((factor, idx) => (
                          <li key={idx} className="text-gray-600">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-green-600">Protective Factors:</strong>
                      <ul className="mt-1 space-y-1">
                        {insight.behaviorAnalysis.protectiveFactors.map((factor, idx) => (
                          <li key={idx} className="text-gray-600">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {currentSection === 'research' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Science Behind Your Decisions</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Finding</h3>
              <p className="text-blue-800">
                Your behavior patterns match documented psychological biases that financial companies exploit. 
                Understanding these biases helps you make better decisions and avoid costly traps.
              </p>
            </div>

            {scientificInsights.map((insight, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{insight.title}</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Research Finding:</h4>
                    <p className="text-gray-600">{insight.finding}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Your Experience:</h4>
                    <p className="text-gray-600">{insight.yourExperience}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">What This Means:</h4>
                    <p className="text-gray-600">{insight.implication}</p>
                  </div>
                  
                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                    <strong>Research basis:</strong> {insight.researchBasis}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {currentSection === 'alternatives' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Better Credit Options</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Good News</h3>
              <p className="text-green-800">
                There are legitimate, lower-cost alternatives to high-fee financial products. 
                Here are evidence-based options that can help you avoid debt traps.
              </p>
            </div>

            {CREDIT_ALTERNATIVES.map((alternative, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{alternative.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {alternative.typical_apr} APR
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{alternative.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Pros:</h4>
                    <ul className="space-y-1">
                      {alternative.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-gray-600">✓ {pro}</li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium text-red-700 mb-2 mt-4">Cons:</h4>
                    <ul className="space-y-1">
                      {alternative.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {con}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Requirements:</h4>
                    <ul className="space-y-1 mb-4">
                      {alternative.qualification_requirements.map((req, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {req}</li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium text-gray-700 mb-2">Best for:</h4>
                    <ul className="space-y-1">
                      {alternative.recommended_for.map((use, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {use}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {currentSection === 'actions' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Personal Action Plan</h2>
            
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Based on Your Risk Profile: {insights[0]?.riskLevel?.toUpperCase() || 'MEDIUM'} RISK
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Immediate Actions (This Week)</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Review your current financial products for hidden fees</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Research one credit union in your area</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Set up automatic savings of $25/week for emergencies</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Medium-term Goals (This Month)</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Build $500 emergency fund</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Apply for a secured credit card if you need to build credit</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Set up budget tracking to understand spending patterns</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Long-term Strategy (Next 6 Months)</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Build emergency fund to 3 months of expenses</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Establish relationship with credit union or community bank</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-700">Review and improve credit score if needed</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Red Flags to Watch For</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Warning Signs:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• "Optional" tips that are hard to avoid</li>
                    <li>• Complex fee structures</li>
                    <li>• Pressure to decide quickly</li>
                    <li>• Claims of employer endorsement</li>
                    <li>• "0% interest" with buried fees</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Good Practices:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Always ask for total cost</li>
                    <li>• Read all terms before agreeing</li>
                    <li>• Compare multiple options</li>
                    <li>• Take time to decide</li>
                    <li>• Verify any claimed endorsements</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button
            onClick={() => {
              const sections = ['insights', 'research', 'alternatives', 'actions'];
              const currentIndex = sections.indexOf(currentSection);
              if (currentIndex > 0) {
                setCurrentSection(sections[currentIndex - 1] as any);
              }
            }}
            disabled={currentSection === 'insights'}
            variant="outline"
          >
            Previous
          </Button>
          
          {currentSection === 'actions' ? (
            <Button
              onClick={() => router.push('/')}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Study
            </Button>
          ) : (
            <Button
              onClick={() => {
                const sections = ['insights', 'research', 'alternatives', 'actions'];
                const currentIndex = sections.indexOf(currentSection);
                if (currentIndex < sections.length - 1) {
                  setCurrentSection(sections[currentIndex + 1] as any);
                }
              }}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebriefPage; 