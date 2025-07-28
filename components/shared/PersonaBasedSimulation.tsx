"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { User, Briefcase, DollarSign, TrendingUp, Heart, Home } from 'lucide-react';

interface FinancialProfile {
  creditScore: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsBalance: number;
  existingDebt: number;
  employmentType: 'full-time' | 'part-time' | 'gig' | 'unemployed' | 'student';
  bankingHistory: 'excellent' | 'good' | 'fair' | 'poor' | 'no-history';
}

interface BehavioralProfile {
  riskTolerance: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  decisionMakingStyle: 'analytical' | 'quick' | 'consulting' | 'impulsive';
  financialLiteracy: 'high' | 'medium' | 'low';
  technologyComfort: 'high' | 'medium' | 'low';
  priorLoanExperience: 'extensive' | 'some' | 'minimal' | 'none';
  urgencyLevel: 'emergency' | 'high' | 'medium' | 'low';
}

interface PersonaProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  situation: string;
  financial: FinancialProfile;
  behavioral: BehavioralProfile;
  likelyInteractions: {
    readTermsCompletely: boolean;
    compareOptions: boolean;
    seekAdvice: boolean;
    proceedQuickly: boolean;
    focusOnAPR: boolean;
    focusOnMonthlyPayment: boolean;
  };
}

interface PersonaBasedSimulationProps {
  onPersonaSelect: (persona: PersonaProfile) => void;
  allowCustomPersona?: boolean;
  currentLoanType?: 'Payday' | 'Installment' | 'EWA' | 'BNPL';
}

export const PersonaBasedSimulation: React.FC<PersonaBasedSimulationProps> = ({
  onPersonaSelect,
  allowCustomPersona = false,
  currentLoanType
}) => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaProfile | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Pre-defined realistic personas based on research data
  const predefinedPersonas: PersonaProfile[] = useMemo(() => [
    {
      id: 'urgent-gig-worker',
      name: 'Maria Rodriguez',
      age: 28,
      location: 'Phoenix, AZ',
      occupation: 'Rideshare Driver',
      situation: 'Car repair needed for work, between gigs',
      financial: {
        creditScore: 580,
        monthlyIncome: 2800,
        monthlyExpenses: 2650,
        savingsBalance: 150,
        existingDebt: 8500,
        employmentType: 'gig',
        bankingHistory: 'fair'
      },
      behavioral: {
        riskTolerance: 'medium',
        decisionMakingStyle: 'quick',
        financialLiteracy: 'medium',
        technologyComfort: 'high',
        priorLoanExperience: 'some',
        urgencyLevel: 'emergency'
      },
      likelyInteractions: {
        readTermsCompletely: false,
        compareOptions: false,
        seekAdvice: false,
        proceedQuickly: true,
        focusOnAPR: false,
        focusOnMonthlyPayment: true
      }
    },
    {
      id: 'careful-teacher',
      name: 'David Thompson',
      age: 35,
      location: 'Columbus, OH',
      occupation: 'Elementary School Teacher',
      situation: 'Home repairs after storm damage',
      financial: {
        creditScore: 720,
        monthlyIncome: 4200,
        monthlyExpenses: 3800,
        savingsBalance: 3500,
        existingDebt: 15000,
        employmentType: 'full-time',
        bankingHistory: 'good'
      },
      behavioral: {
        riskTolerance: 'low',
        decisionMakingStyle: 'analytical',
        financialLiteracy: 'high',
        technologyComfort: 'medium',
        priorLoanExperience: 'minimal',
        urgencyLevel: 'medium'
      },
      likelyInteractions: {
        readTermsCompletely: true,
        compareOptions: true,
        seekAdvice: true,
        proceedQuickly: false,
        focusOnAPR: true,
        focusOnMonthlyPayment: false
      }
    },
    {
      id: 'college-student',
      name: 'Ashley Chen',
      age: 20,
      location: 'Austin, TX',
      occupation: 'College Student',
      situation: 'Textbooks and unexpected medical bill',
      financial: {
        creditScore: 650,
        monthlyIncome: 1200,
        monthlyExpenses: 1100,
        savingsBalance: 350,
        existingDebt: 12000,
        employmentType: 'part-time',
        bankingHistory: 'fair'
      },
      behavioral: {
        riskTolerance: 'medium',
        decisionMakingStyle: 'consulting',
        financialLiteracy: 'low',
        technologyComfort: 'high',
        priorLoanExperience: 'none',
        urgencyLevel: 'high'
      },
      likelyInteractions: {
        readTermsCompletely: false,
        compareOptions: true,
        seekAdvice: true,
        proceedQuickly: false,
        focusOnAPR: false,
        focusOnMonthlyPayment: true
      }
    },
    {
      id: 'retail-manager',
      name: 'Robert Williams',
      age: 42,
      location: 'Jacksonville, FL',
      occupation: 'Retail Store Manager',
      situation: 'Christmas gifts and family vacation',
      financial: {
        creditScore: 680,
        monthlyIncome: 3800,
        monthlyExpenses: 3600,
        savingsBalance: 800,
        existingDebt: 6500,
        employmentType: 'full-time',
        bankingHistory: 'good'
      },
      behavioral: {
        riskTolerance: 'medium',
        decisionMakingStyle: 'quick',
        financialLiteracy: 'medium',
        technologyComfort: 'medium',
        priorLoanExperience: 'extensive',
        urgencyLevel: 'low'
      },
      likelyInteractions: {
        readTermsCompletely: false,
        compareOptions: true,
        seekAdvice: false,
        proceedQuickly: true,
        focusOnAPR: false,
        focusOnMonthlyPayment: true
      }
    },
    {
      id: 'single-parent',
      name: 'Jennifer Martinez',
      age: 31,
      location: 'San Antonio, TX',
      occupation: 'Nurse Assistant',
      situation: 'Childcare deposit and school supplies',
      financial: {
        creditScore: 620,
        monthlyIncome: 2900,
        monthlyExpenses: 2850,
        savingsBalance: 200,
        existingDebt: 4200,
        employmentType: 'full-time',
        bankingHistory: 'fair'
      },
      behavioral: {
        riskTolerance: 'low',
        decisionMakingStyle: 'consulting',
        financialLiteracy: 'medium',
        technologyComfort: 'medium',
        priorLoanExperience: 'some',
        urgencyLevel: 'high'
      },
      likelyInteractions: {
        readTermsCompletely: true,
        compareOptions: true,
        seekAdvice: true,
        proceedQuickly: false,
        focusOnAPR: true,
        focusOnMonthlyPayment: true
      }
    }
  ], []);

  const getPersonaIcon = (occupation: string) => {
    if (occupation.includes('Driver') || occupation.includes('Gig')) return <Briefcase className="w-5 h-5" />;
    if (occupation.includes('Teacher')) return <User className="w-5 h-5" />;
    if (occupation.includes('Student')) return <TrendingUp className="w-5 h-5" />;
    if (occupation.includes('Manager')) return <DollarSign className="w-5 h-5" />;
    if (occupation.includes('Nurse') || occupation.includes('Parent')) return <Heart className="w-5 h-5" />;
    return <User className="w-5 h-5" />;
  };

  const getRiskColor = (riskTolerance: string) => {
    switch (riskTolerance) {
      case 'very-low': return 'text-green-600';
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-orange-500';
      case 'very-high': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getUrgencyColor = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePersonaSelect = (persona: PersonaProfile) => {
    setSelectedPersona(persona);
    onPersonaSelect(persona);
  };

  const calculateFinancialStress = (persona: PersonaProfile) => {
    const { financial } = persona;
    const debtToIncomeRatio = financial.existingDebt / (financial.monthlyIncome * 12);
    const savingsMonths = financial.savingsBalance / financial.monthlyExpenses;
    const creditScoreNormalized = (financial.creditScore - 300) / 550; // 300-850 range
    
    let stress = 0;
    stress += debtToIncomeRatio > 0.4 ? 0.3 : debtToIncomeRatio * 0.75;
    stress += savingsMonths < 1 ? 0.3 : Math.max(0, (3 - savingsMonths) * 0.1);
    stress += (1 - creditScoreNormalized) * 0.4;
    
    return Math.min(1, stress);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">Choose a Research Persona</h3>
        <p className="text-sm text-gray-600 mt-1">
          Select a realistic user profile to simulate their loan application experience
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {predefinedPersonas.map((persona) => {
          const financialStress = calculateFinancialStress(persona);
          const stressLevel = financialStress > 0.7 ? 'High' : financialStress > 0.4 ? 'Medium' : 'Low';
          const stressColor = financialStress > 0.7 ? 'text-red-600' : financialStress > 0.4 ? 'text-yellow-600' : 'text-green-600';

          return (
            <div
              key={persona.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-blue-300 ${
                selectedPersona?.id === persona.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
              onClick={() => handlePersonaSelect(persona)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getPersonaIcon(persona.occupation)}
                  <div>
                    <div className="font-medium text-gray-900">{persona.name}</div>
                    <div className="text-sm text-gray-600">{persona.age} • {persona.location}</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(persona.behavioral.urgencyLevel)}`}>
                  {persona.behavioral.urgencyLevel}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Occupation:</span> {persona.occupation}
                </div>
                <div>
                  <span className="font-medium">Situation:</span> {persona.situation}
                </div>
                <div className="flex justify-between">
                  <span>Credit Score: <span className="font-medium">{persona.financial.creditScore}</span></span>
                  <span>Income: <span className="font-medium">${persona.financial.monthlyIncome.toLocaleString()}/mo</span></span>
                </div>
                <div className="flex justify-between">
                  <span>Financial Stress: <span className={`font-medium ${stressColor}`}>{stressLevel}</span></span>
                  <span className={`${getRiskColor(persona.behavioral.riskTolerance)}`}>
                    {persona.behavioral.riskTolerance} risk
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(showDetails === persona.id ? null : persona.id);
                }}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800 underline"
              >
                {showDetails === persona.id ? 'Hide Details' : 'View Details'}
              </button>

              {showDetails === persona.id && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-xs text-gray-600">
                  <div><strong>Savings:</strong> ${persona.financial.savingsBalance.toLocaleString()}</div>
                  <div><strong>Existing Debt:</strong> ${persona.financial.existingDebt.toLocaleString()}</div>
                  <div><strong>Decision Style:</strong> {persona.behavioral.decisionMakingStyle}</div>
                  <div><strong>Financial Literacy:</strong> {persona.behavioral.financialLiteracy}</div>
                  <div><strong>Loan Experience:</strong> {persona.behavioral.priorLoanExperience}</div>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <strong>Likely Behaviors:</strong>
                    <ul className="mt-1 space-y-1">
                      {persona.likelyInteractions.readTermsCompletely && <li>• Will read terms carefully</li>}
                      {persona.likelyInteractions.compareOptions && <li>• Will compare loan options</li>}
                      {persona.likelyInteractions.seekAdvice && <li>• May seek advice from others</li>}
                      {persona.likelyInteractions.proceedQuickly && <li>• Likely to proceed quickly</li>}
                      {persona.likelyInteractions.focusOnAPR && <li>• Focuses on APR over monthly payment</li>}
                      {persona.likelyInteractions.focusOnMonthlyPayment && <li>• Focuses on monthly payment amount</li>}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedPersona && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Selected Persona: {selectedPersona.name}</span>
          </div>
          <p className="text-sm text-blue-800">
            The simulation will now adapt to reflect {selectedPersona.name}'s financial situation, 
            behavioral patterns, and decision-making style. This includes their urgency level, 
            risk tolerance, and likelihood to read terms carefully.
          </p>
        </div>
      )}

      {allowCustomPersona && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center">
            <h4 className="font-medium text-gray-900 mb-2">Custom Persona</h4>
            <p className="text-sm text-gray-600 mb-3">
              Create a custom user profile for specialized research scenarios
            </p>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
              Build Custom Persona
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonaBasedSimulation; 
