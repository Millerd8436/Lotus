'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { formatCurrency, formatPercentage, calculateAPR, debounce, throttle } from '../utils';
import { LotusSession, UserChoice, AutonomyViolation } from '../types/lotus';
import {
  CountdownTimer,
  FakeAvailability,
  ObfuscatedPricing,
  FakeSocialProof,
  PreCheckedOptions,
  BehavioralTracker
} from './DarkPatternUI';

// Import all advanced modules from the 96,000+ line system
import { PsychologicalManipulationEngine, RealTimeManipulationTracker, KantianEthicsAnalyzer, UserChoiceAnalysisEngine } from '../lib/behavioral-analysis.js';
import { LegalLoopholeEngine } from '../lib/legal-loopholes.js';
import { RolloverTrapEngine } from '../lib/rollover-traps.js';
import { CaseStudyDatabase } from '../lib/case-studies.js';
import { EducationalContentEngine } from '../lib/educational-content.js';
import { RegulatoryComplianceEngine } from '../lib/regulatory-compliance.js';

// Import enhanced 3-phase autonomy theater
import { ThreePhaseAutonomyTheater, createPhaseAutonomyTheater, AutonomyReport } from '../lib/autonomy-theater';

// Props interface for the component
interface LotusSimulatorProps {
  phase: 1 | 2 | 3;
  onPhaseComplete: (phase: number, data: any) => void;
}

// Basic session interface for internal use
interface LoanSession {
  id: string;
  sessionId?: string;
  amount: number;
  state: string;
  fee: number;
  apr: number;
  totalCost: number;
  termDays: number;
  rolloverCount?: number;
  mode: 'exploitative' | 'ethical';
  createdAt?: string;
}

// Advanced Type Definitions for Comprehensive System
interface AdvancedLoanSession {
  sessionId: string;
  amount: number;
  state: string;
  mode: 'exploitative' | 'ethical';
  fee: number;
  apr: number;
  totalCost: number;
  termDays: number;
  rolloverCount: number;
  createdAt: string;
  psychologicalProfile: PsychologicalProfile;
  vulnerabilityIndex: number;
  coercionTimeline: CoercionEvent[];
  regulatoryViolations: RegulatoryViolation[];
}

interface PsychologicalProfile {
  timeUnderPressure: number;
  hesitationPoints: HesitationPoint[];
  decisionSpeed: number;
  vulnerabilityMarkers: string[];
  cognitiveLoadScore: number;
  emotionalStateTracking: EmotionalState[];
  responsePatterns: ResponsePattern[];
}

interface HesitationPoint {
  timestamp: number;
  element: string;
  duration: number;
  context: string;
  manipulation: string;
}

interface EmotionalState {
  timestamp: number;
  state: 'stressed' | 'confused' | 'pressured' | 'confident' | 'suspicious';
  intensity: number;
  trigger: string;
}

interface ResponsePattern {
  pattern: string;
  frequency: number;
  predictability: number;
  exploitation: string;
}

interface CoercionEvent {
  timestamp: number;
  type: string;
  severity: number;
  description: string;
  kantianViolation: string;
  successRate: number;
  userResponse: string;
}

interface RegulatoryViolation {
  regulation: string;
  jurisdiction: string;
  severity: 'minor' | 'major' | 'criminal';
  description: string;
  penalty: string;
  consumerHarm: string;
}

interface AdvancedAutonomyViolation {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'medium-high' | 'high' | 'extreme';
  kantianViolation: string;
  timestamp: string;
  neuralManipulation: string;
  cognitiveBias: string;
  ethicalFramework: string;
  legalImplications: string;
  psychologicalHarm: string;
}

interface ComprehensiveUserChoice {
  type: string;
  data: any;
  timestamp: string;
  phase: number;
  timeFromStart: number;
  hesitationTime: number;
  cognitiveLoad: number;
  emotionalState: string;
  manipulationContext: string;
  freeWillIndex: number;
}

interface StateRegulation {
  state: string;
  maxAPR: number;
  minTermDays: number;
  allowRollover: boolean;
  maxRollovers: number;
  coolingOffPeriod: number;
  description: string;
  consumerProtections: string[];
  regulatoryAgency: string;
  enforcementStrength: number;
  industryInfluence: number;
  loopholes: Loophole[];
}

interface Loophole {
  name: string;
  description: string;
  exploitation: string;
  harm: string;
  usage: number;
}

interface AdvancedTrapMechanism {
  name: string;
  description: string;
  implementation: () => void;
  psychological_basis: string;
  effectiveness: number;
  detection_difficulty: number;
  regulatory_status: string;
  counterMeasure: string;
}

interface EducationalModule {
  id: string;
  title: string;
  content: string;
  interactiveElements: InteractiveElement[];
  assessments: Assessment[];
  realWorldExamples: RealWorldExample[];
  resources: Resource[];
}

interface InteractiveElement {
  type: 'simulation' | 'quiz' | 'calculator' | 'timeline' | 'heatmap';
  data: any;
  purpose: string;
}

interface Assessment {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: number;
}

interface RealWorldExample {
  company: string;
  practice: string;
  outcome: string;
  source: string;
  year: number;
}

interface Resource {
  title: string;
  url: string;
  type: 'legal' | 'academic' | 'advocacy' | 'regulatory';
  relevance: number;
}

// Comprehensive state regulations database
const COMPREHENSIVE_STATE_REGULATIONS: { [key: string]: StateRegulation } = {
  'CA': {
    state: 'California',
    maxAPR: 36,
    minTermDays: 31,
    allowRollover: false,
    maxRollovers: 0,
    coolingOffPeriod: 60,
    description: 'California - Strongest consumer protection in US',
    consumerProtections: [
      'Mandatory financial counseling',
      'Cooling-off periods',
      'Income verification requirements',
      'Database tracking to prevent debt cycling',
      'Strict licensing requirements'
    ],
    regulatoryAgency: 'Department of Financial Protection and Innovation',
    enforcementStrength: 95,
    industryInfluence: 15,
    loopholes: [
      {
        name: 'Tribal Lending Exemption',
        description: 'Native American tribal lenders claim sovereignty',
        exploitation: 'Charge rates up to 400% APR on reservation',
        harm: 'Circumvents state consumer protections',
        usage: 12
      }
    ]
  },
  'NY': {
    state: 'New York',
    maxAPR: 25,
    minTermDays: 30,
    allowRollover: false,
    maxRollovers: 0,
    coolingOffPeriod: 90,
    description: 'New York - Criminal usury law, most restrictive',
    consumerProtections: [
      'Criminal usury law (>25% APR is criminal)',
      'Mandatory attorney general review',
      'Consumer debt collection protections',
      'Mandatory credit counseling referrals'
    ],
    regulatoryAgency: 'Department of Financial Services',
    enforcementStrength: 98,
    industryInfluence: 8,
    loopholes: [
      {
        name: 'Bank Partnership Model',
        description: 'Partner with out-of-state banks',
        exploitation: 'Use bank charter to circumvent state law',
        harm: 'Allows 300%+ APR through federal preemption',
        usage: 5
      }
    ]
  },
  'TX': {
    state: 'Texas',
    maxAPR: 664,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 3,
    coolingOffPeriod: 0,
    description: 'Texas - Minimal regulation, industry-friendly',
    consumerProtections: [
      'Basic disclosure requirements',
      'Database tracking (limited enforcement)'
    ],
    regulatoryAgency: 'Office of Consumer Credit Commissioner',
    enforcementStrength: 25,
    industryInfluence: 85,
    loopholes: [
      {
        name: 'Credit Service Organization',
        description: 'Classify as credit brokers not lenders',
        exploitation: 'Avoid lending regulations entirely',
        harm: 'No APR caps, unlimited fees',
        usage: 78
      },
      {
        name: 'Auto Title Loans',
        description: 'Secured lending exemption',
        exploitation: 'Use car title as collateral',
        harm: 'Repossession threat, rates up to 300%',
        usage: 65
      }
    ]
  },
  'FL': {
    state: 'Florida',
    maxAPR: 304,
    minTermDays: 7,
    allowRollover: true,
    maxRollovers: 1,
    coolingOffPeriod: 24,
    description: 'Florida - Moderate regulation with loopholes',
    consumerProtections: [
      '24-hour cooling off after rollover',
      'Database tracking system',
      'Basic licensing requirements'
    ],
    regulatoryAgency: 'Office of Financial Regulation',
    enforcementStrength: 45,
    industryInfluence: 60,
    loopholes: [
      {
        name: 'Check Cashing Exemption',
        description: 'Classify as check cashing service',
        exploitation: 'Avoid payday lending regulations',
        harm: 'Higher fees through reclassification',
        usage: 45
      }
    ]
  },
  'NV': {
    state: 'Nevada',
    maxAPR: 521,
    minTermDays: 14,
    allowRollover: true,
    maxRollovers: 4,
    coolingOffPeriod: 0,
    description: 'Nevada - Industry haven with minimal oversight',
    consumerProtections: [
      'Basic disclosure requirements'
    ],
    regulatoryAgency: 'Financial Institutions Division',
    enforcementStrength: 20,
    industryInfluence: 90,
    loopholes: [
      {
        name: 'No Database Tracking',
        description: 'No state-wide borrower database',
        exploitation: 'Multiple simultaneous loans',
        harm: 'Unlimited debt accumulation',
        usage: 85
      }
    ]
  }
};

// Advanced psychological manipulation techniques
const ADVANCED_TRAP_MECHANISMS: AdvancedTrapMechanism[] = [
  {
    name: 'Temporal Discounting Exploitation',
    description: 'Manipulate perception of future consequences vs immediate needs',
    implementation: () => console.log('Implementing temporal discounting trap'),
    psychological_basis: 'Humans heavily discount future costs when under stress',
    effectiveness: 87,
    detection_difficulty: 92,
    regulatory_status: 'Unregulated',
    counterMeasure: 'Mandatory 24-48 hour cooling-off periods'
  },
  {
    name: 'Anchoring Bias Manipulation',
    description: 'Present inflated reference points to make predatory terms seem reasonable',
    implementation: () => console.log('Setting cognitive anchors'),
    psychological_basis: 'First numerical information heavily influences subsequent judgments',
    effectiveness: 78,
    detection_difficulty: 65,
    regulatory_status: 'Widely practiced',
    counterMeasure: 'Require comparison with regulated credit products'
  },
  {
    name: 'Loss Aversion Amplification',
    description: 'Emphasize immediate consequences of not borrowing',
    implementation: () => console.log('Amplifying loss aversion'),
    psychological_basis: 'Humans fear losses 2.5x more than equivalent gains',
    effectiveness: 82,
    detection_difficulty: 45,
    regulatory_status: 'Common practice',
    counterMeasure: 'Balanced presentation of risks and alternatives'
  },
  {
    name: 'Social Proof Manufacturing',
    description: 'Create false sense of widespread approval and usage',
    implementation: () => console.log('Manufacturing social proof'),
    psychological_basis: 'People follow perceived majority behavior under uncertainty',
    effectiveness: 72,
    detection_difficulty: 55,
    regulatory_status: 'Questionable legality',
    counterMeasure: 'Require verification of testimonials and statistics'
  },
  {
    name: 'Cognitive Load Overload',
    description: 'Present complex information to reduce analytical thinking',
    implementation: () => console.log('Increasing cognitive load'),
    psychological_basis: 'Mental overload leads to System 1 (fast, emotional) decision making',
    effectiveness: 75,
    detection_difficulty: 85,
    regulatory_status: 'Unregulated complexity',
    counterMeasure: 'Simplified, standardized disclosure formats'
  }
];

// Comprehensive educational modules
const EDUCATIONAL_MODULES: EducationalModule[] = [
  {
    id: 'predatory_tactics',
    title: 'Recognizing Predatory Lending Tactics',
    content: 'Learn to identify and defend against predatory lending practices',
    interactiveElements: [
      {
        type: 'simulation',
        data: { scenarios: ['urgency_pressure', 'hidden_fees', 'rollover_trap'] },
        purpose: 'Experience common predatory tactics'
      },
      {
        type: 'heatmap',
        data: { choicePoints: [], manipulationIntensity: [] },
        purpose: 'Visualize manipulation pressure points'
      }
    ],
    assessments: [
      {
        question: 'What is the most effective way to resist urgency pressure tactics?',
        options: [
          'Make the decision quickly to avoid missing out',
          'Take time to research alternatives and think carefully',
          'Trust that the lender has your best interests in mind',
          'Only consider the monthly payment amount'
        ],
        correct: 1,
        explanation: 'Legitimate financial products should not require immediate decisions. Taking time to research and consider alternatives is your right and the best protection against manipulation.',
        difficulty: 2
      }
    ],
    realWorldExamples: [
      {
        company: 'Wells Fargo',
        practice: 'Direct Deposit Advance',
        outcome: '$185 million CFPB fine for predatory practices',
        source: 'CFPB Enforcement Action 2016',
        year: 2016
      }
    ],
    resources: [
      {
        title: 'CFPB Payday Lending Rule',
        url: 'https://www.consumerfinance.gov/rules-policy/final-rules/payday-vehicle-title-certain-high-cost-installment-loans/',
        type: 'regulatory',
        relevance: 95
      }
    ]
  }
];

export default function LotusSimulator({ phase, onPhaseComplete }: LotusSimulatorProps) {
  // Core state management
  const [currentPhase, setCurrentPhase] = useState(phase);
  const [exploitativeSession, setExploitativeSession] = useState<LoanSession | null>(null);
  const [ethicalSession, setEthicalSession] = useState<LoanSession | null>(null);
  const [userChoices, setUserChoices] = useState<UserChoice[]>([]);
  const [autonomyViolations, setAutonomyViolations] = useState<AutonomyViolation[]>([]);
  const [choiceIntegrityScore, setChoiceIntegrityScore] = useState(100);
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [trapTypes, setTrapTypes] = useState({
    timePressure: false,
    defaultBias: false,
    sunkCostFallacy: false,
    socialProof: false,
    artificialScarcity: false,
    cognitiveOverload: false
  });
  
  // Enhanced 3-Phase Autonomy Theater Management
  const [autonomyTheater, setAutonomyTheater] = useState<ThreePhaseAutonomyTheater | null>(null);
  const [autonomyReport, setAutonomyReport] = useState<AutonomyReport | null>(null);
  
  // UI state
  const [loanAmount, setLoanAmount] = useState(300);
  const [selectedState, setSelectedState] = useState('GEN');
  const [autoRenewalChecked, setAutoRenewalChecked] = useState(true);
  const [achConsentChecked, setAchConsentChecked] = useState(true);
  const [urgencyTimer, setUrgencyTimer] = useState(299);
  const [showRolloverModal, setShowRolloverModal] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [ghostModeEnabled, setGhostModeEnabled] = useState(false);
  const [echoMessages, setEchoMessages] = useState<string[]>([]);
  
  // Behavioral tracking
  const [behavioralTracker] = useState(() => new BehavioralTracker());
  
  // Advanced Lotus System Engines (96,000+ line implementation)
  const [psychEngine] = useState(() => new PsychologicalManipulationEngine());
  const [manipulationTracker] = useState(() => new RealTimeManipulationTracker());
  const [ethicsAnalyzer] = useState(() => new KantianEthicsAnalyzer());
  const [choiceAnalyzer] = useState(() => new UserChoiceAnalysisEngine());
  const [loopholeEngine] = useState(() => new LegalLoopholeEngine());
  const [rolloverEngine] = useState(() => new RolloverTrapEngine());
  const [caseDatabase] = useState(() => new CaseStudyDatabase());
  const [educationEngine] = useState(() => new EducationalContentEngine());
  const [complianceEngine] = useState(() => new RegulatoryComplianceEngine());
  
  // Phase 2 state
  const [ethicalConsents, setEthicalConsents] = useState({
    terms: false,
    ach: false,
    noRollover: false
  });
  
  const startTime = useRef(Date.now());
  const urgencyTimerRef = useRef<any>(null);
  const liveFeedTimerRef = useRef<any>(null);

  // Initialize component
  useEffect(() => {
    initializeSimulator();
    behavioralTracker.startTracking();
    return () => {
      if (urgencyTimerRef.current) clearInterval(urgencyTimerRef.current);
      if (liveFeedTimerRef.current) clearInterval(liveFeedTimerRef.current);
      behavioralTracker.stopTracking();
    };
  }, []);

  // Track choices helper
  const trackChoice = (type: string, data: any) => {
    const choice: UserChoice = {
      type,
      data,
      timestamp: new Date().toISOString(),
      phase: currentPhase,
      timeFromStart: Date.now() - startTime.current,
      manipulationPresent: currentPhase === 1, // Only phase 1 has manipulation
      autonomyImpact: currentPhase === 1 ? 'high' : 'low',
      coercionLevel: currentPhase === 1 ? 0.8 : 0.1
    };
    setUserChoices((prev: UserChoice[]) => [...prev, choice]);
    console.log('Choice tracked:', choice);
  };

  // Add autonomy violation helper
  const addAutonomyViolation = (violation: Omit<AutonomyViolation, 'timestamp'>) => {
    const fullViolation: AutonomyViolation = {
      ...violation,
      timestamp: new Date().toISOString(),
      hiddenFromUser: violation.hiddenFromUser ?? true // Default to hidden
    };
    setAutonomyViolations((prev: AutonomyViolation[]) => [...prev, fullViolation]);
  };

  // Echo narrator helper
  const echo = (message: string) => {
    setEchoMessages(prev => [...prev.slice(-4), message]);
    setTimeout(() => {
      setEchoMessages(prev => prev.filter(msg => msg !== message));
    }, 6000);
  };

  // Initialize simulator with all tracking systems
  const initializeSimulator = () => {
    console.log('🪷 Lotus 3-Phase Simulator - Comprehensive Version Starting');
    
    // Add initial timeline event
    setTimelineEvents([{
      event: 'tracking_started',
      timestamp: new Date().toISOString(),
      choiceIntegrityScore: 100
    }]);
    
    if (currentPhase === 1) {
      initializePhase1();
    }
  };

  // Phase 1: Exploitative Experience initialization
  const initializePhase1 = () => {
    echo('🕷️ Entering predatory lending simulation...');
    
    // Initialize enhanced 3-phase autonomy theater
    initializeAutonomyTheater();
    
    // Apply dark patterns immediately
    applyTimePressure();
    applyDefaultBias();
    createArtificialScarcity();
    
    // Start urgency timer
    startUrgencyTimer();
    startLiveFeed();
  };

  // Initialize Enhanced 3-Phase Autonomy Theater
  const initializeAutonomyTheater = () => {
    const session: LotusSession = {
      id: `lotus_session_${Date.now()}`,
      startTime: new Date(),
      currentPhase,
      exploitativeData: null,
      ethicalData: null,
      analysisData: null,
      userChoices: [],
      coercionIndex: 0,
      autonomyViolations: [],
      trapEngineState: {
        activeTraps: new Map(),
        ghostModeEnabled: false,
        exploitationLevel: 0,
        coercionIndex: 0,
        rolloverTraps: [],
        achExploitationActive: false,
        upsellEngineState: {
          loanCount: 0,
          qualificationLevel: 'basic',
          upsellTriggers: [],
          congratulationMessages: []
        },
        usurySkirterActive: {
          currentLoophole: 'flatFee',
          legalJustification: 'Standard flat fee structure',
          stateApplicable: ['TX', 'FL'],
          aprBypass: 0
        }
      },
      darkPatterns: []
    };

    const theater = createPhaseAutonomyTheater(currentPhase as 1 | 2 | 3, session, {
      ghostModeEnabled: ghostModeEnabled
    });
    
    setAutonomyTheater(theater);
    echo(`🎭 Autonomy Theater initialized for Phase ${currentPhase}`);
  };

  // Dark pattern implementations with enhanced autonomy theater integration
  const applyTimePressure = async () => {
    setTrapTypes(prev => ({ ...prev, timePressure: true }));
    setChoiceIntegrityScore(prev => prev - 15);
    
    // Use autonomy theater for comprehensive tracking
    if (autonomyTheater && currentPhase === 1) {
      await autonomyTheater.applyExploitativeTimePressure(299, 'main_offer');
    }
    
    addAutonomyViolation({
      type: 'time_pressure',
      description: 'Artificial urgency with 299 second countdown',
      severity: 'high',
      kantianViolation: 'Undermines rational deliberation',
      hiddenFromUser: true,
      phase: currentPhase as 1 | 2 | 3,
      coercionLevel: 0.8
    });
  };

  const applyDefaultBias = () => {
    setTrapTypes(prev => ({ ...prev, defaultBias: true }));
    setChoiceIntegrityScore(prev => prev - 10);
    addAutonomyViolation({
      type: 'default_bias_manipulation',
      description: 'Pre-checked options: auto-renew, ach-consent',
      severity: 'medium',
      kantianViolation: 'Assumes consent without explicit agreement',
      hiddenFromUser: true,
      phase: currentPhase as 1 | 2 | 3,
      coercionLevel: 0.6
    });
  };

  const createArtificialScarcity = () => {
    setTrapTypes(prev => ({ ...prev, artificialScarcity: true }));
    setChoiceIntegrityScore(prev => prev - 14);
    
    // Use autonomy theater for advanced tracking
    if (autonomyTheater && currentPhase === 1) {
      autonomyTheater.createArtificialScarcity('⚡ FLASH OFFER: Only 3 slots left today!');
    }
    
    addAutonomyViolation({
      type: 'artificial_scarcity',
      description: 'Only 3 approval slots left today!',
      severity: 'medium-high',
      kantianViolation: 'Creates false urgency through deception',
      hiddenFromUser: true
    });
  };

  // Urgency timer implementation
  const startUrgencyTimer = () => {
    urgencyTimerRef.current = setInterval(() => {
      setUrgencyTimer(prev => {
        const newTime = prev - 1;
        return newTime <= 0 ? 299 : newTime; // Reset for continuous pressure
      });
    }, 1000);
  };

  // Live feed implementation
  const startLiveFeed = () => {
    const activities = [
      "John from TX just got approved for $200",
      "Sarah from CA extended her loan", 
      "Mike from FL got instant funding",
      "Jessica from NY borrowed $350"
    ];
    
    let activityIndex = 0;
    liveFeedTimerRef.current = setInterval(() => {
      // This would display in a live feed component
      activityIndex = (activityIndex + 1) % activities.length;
    }, 8000);
  };

  // Loan calculation for exploitative mode
  const calculateExploitativeLoan = (amount: number, state: string): LoanSession => {
    const fee = (amount / 100) * 15; // $15 per $100
    const termDays = 14;
    const totalCost = amount + fee;
    const apr = calculateAPR(amount, fee, termDays);
    
    return {
      id: 'loan_' + Date.now(),
      sessionId: 'session_' + Date.now(),
      amount,
      state,
      mode: 'exploitative',
      fee,
      apr,
      totalCost,
      termDays,
      rolloverCount: 0,
      createdAt: new Date().toISOString()
    };
  };

  // Loan calculation for ethical mode
  const calculateEthicalLoan = (amount: number, state: string): LoanSession => {
    const termDays = 30;
    const aprCap = 36;
    const fee = (amount * (aprCap / 100) * termDays) / 365;
    const totalCost = amount + fee;
    const apr = aprCap;
    
    return {
      id: 'session_' + Date.now(),
      sessionId: 'session_' + Date.now(),
      amount,
      state,
      mode: 'ethical',
      fee,
      apr,
      totalCost,
      termDays,
      rolloverCount: 0,
      createdAt: new Date().toISOString()
    };
  };

  // Handle exploitative loan application
  const handleExploitativeLoanApplication = () => {
    // ==== COMPREHENSIVE BEHAVIORAL ANALYSIS ====
    
    // 1. Psychological Profiling
    const psychProfile = psychEngine.createUserProfile({
      loanAmount,
      state: selectedState,
      urgency: urgencyTimer < 100 ? 'high' : 'medium',
      autoRenewalAccepted: autoRenewalChecked,
      achConsentGiven: achConsentChecked,
      sessionDuration: Date.now() - Date.parse(timelineEvents[0]?.timestamp || new Date().toISOString()),
      clickPattern: behavioralTracker.getClickPattern(),
      hesitationEvents: behavioralTracker.getHesitationEvents()
    });
    
    // 2. Real-time Manipulation Detection
    const manipulationAnalysis = manipulationTracker.analyzeCurrentExposure({
      urgencyTimerActive: urgencyTimer > 0,
      preCheckedOptions: autoRenewalChecked && achConsentChecked,
      socialProofPresent: true, // FakeSocialProof component active
      scarcityTactics: true, // FakeAvailability component active
      priceObfuscation: true // ObfuscatedPricing component active
    });
    
    // 3. Ethical Violation Analysis
    const ethicalViolations = ethicsAnalyzer.analyzeChoice({
      choice: 'loan_application_submit',
      context: {
        timePresssure: urgencyTimer < 120,
        hiddenCosts: true,
        preselectedHarm: autoRenewalChecked,
        informationAsymmetry: 0.8,
        vulnerabilityExploitation: psychProfile.vulnerabilityScore
      },
      userState: {
        stressLevel: behavioralTracker.getStressLevel(),
        cognitiveLoad: behavioralTracker.getCognitiveLoad(),
        autonomyLevel: 1 - manipulationAnalysis.effectivenessScore
      }
    });
    
    // 4. Advanced Choice Analysis
    const choiceAnalysis = choiceAnalyzer.analyzeDecision({
      decisionType: 'exploitative_loan_acceptance',
      timeToDecide: behavioralTracker.getDecisionTime(),
      alternativesConsidered: false,
      informationQuality: 'poor',
      manipulationLevel: manipulationAnalysis.severity,
      userVulnerability: psychProfile.vulnerabilityScore
    });
    
    // 5. Legal Loophole Application
    const loopholeAnalysis = loopholeEngine.identifyApplicableLoopholes(selectedState, {
      loanAmount,
      feeStructure: 'flat_fee_evasion',
      tribalLending: false,
      csoModel: false
    });
    
    // 6. Rollover Trap Preparation
    const rolloverProbability = rolloverEngine.calculateRolloverProbability({
      userProfile: psychProfile,
      loanAmount,
      state: selectedState,
      manipulationExposure: manipulationAnalysis,
      previousLoans: 0 // Assuming first loan
    });
    
    // ==== STANDARD LOAN PROCESSING ====
    
    trackChoice('loan_application_submit', {
      amount: loanAmount,
      state: selectedState,
      autoRenewChecked: autoRenewalChecked,
      
      // Advanced analytics
      psychologicalProfile: psychProfile,
      manipulationAnalysis: manipulationAnalysis,
      ethicalViolations: ethicalViolations,
      choiceAnalysis: choiceAnalysis,
      loopholeAnalysis: loopholeAnalysis,
      rolloverProbability: rolloverProbability
    });
    
    // Track comprehensive behavioral interaction
    behavioralTracker.recordInteraction({
      element: 'loan_application_button',
      action: 'click',
      value: loanAmount.toString(),
      context: 'exploitative_phase',
      manipulationContext: manipulationAnalysis,
      psychologicalState: psychProfile,
      ethicalImplications: ethicalViolations
    });
    
    const session = calculateExploitativeLoan(loanAmount, selectedState);
    setExploitativeSession(session);
    
    // Enhanced echo with educational insight
    echo(`💰 Loan approved! Notice the hidden 391% APR and ${ethicalViolations.length} ethical violations detected...`);
    
    // Record manipulation success
    manipulationTracker.recordManipulationSuccess({
      type: 'exploitative_loan_acceptance',
      effectiveness: manipulationAnalysis.effectivenessScore,
      userVulnerability: psychProfile.vulnerabilityScore,
      ethicalViolations: ethicalViolations
    });
    
    // Trigger rollover trap based on probability analysis
    const rolloverDelay = rolloverEngine.calculateOptimalRolloverTiming(rolloverProbability);
    setTimeout(() => {
      setShowRolloverModal(true);
      
      // Log rollover trap activation
      echo(`⚠️ Rollover trap activated with ${(rolloverProbability * 100).toFixed(1)}% success probability...`);
    }, rolloverDelay);
  };

  // Handle rollover acceptance
  const handleRolloverAccept = () => {
    if (!exploitativeSession) return;
    
    trackChoice('rollover_acceptance', { fee: exploitativeSession.fee });
    
    const updatedSession = {
      ...exploitativeSession,
      rolloverCount: exploitativeSession.rolloverCount + 1,
      totalCost: exploitativeSession.totalCost + exploitativeSession.fee
    };
    
    setExploitativeSession(updatedSession);
    setShowRolloverModal(false);
    
    // Apply sunk cost fallacy violation
    setTrapTypes(prev => ({ ...prev, sunkCostFallacy: true }));
    setChoiceIntegrityScore(prev => prev - 20);
    addAutonomyViolation({
      type: 'rollover_debt_trap',
      description: `Rollover trap presented with ${formatCurrency(exploitativeSession.fee)} fee`,
      severity: 'high',
      kantianViolation: 'Exploits sunk cost fallacy to extend debt cycle',
      hiddenFromUser: false
    });
    
    echo(`💸 Rollover #${updatedSession.rolloverCount} - You've paid ${formatCurrency(updatedSession.totalCost - updatedSession.amount)} in fees while still owing ${formatCurrency(updatedSession.amount)}`);
    
    // Trigger upsell after rollover
    setTimeout(() => {
      setShowUpsellModal(true);
    }, 2000);
    
    // Auto-transition to phase 2 after interaction
    setTimeout(() => {
      transitionToPhase2();
    }, 8000);
  };

  // Handle rollover decline
  const handleRolloverDecline = () => {
    trackChoice('rollover_decline', {});
    setShowRolloverModal(false);
    setTimeout(() => transitionToPhase2(), 1000);
  };

  // Transition to Phase 2
  const transitionToPhase2 = () => {
    setCurrentPhase(2);
    echo('✨ Now experiencing the same loan with ethical practices...');
    
    // Reset ethical consents
    setEthicalConsents({ terms: false, ach: false, noRollover: false });
  };

  // Handle ethical loan application
  const handleEthicalLoanApplication = () => {
    if (!ethicalConsents.terms || !ethicalConsents.ach || !ethicalConsents.noRollover) {
      return; // Disabled button should prevent this
    }
    
    trackChoice('ethical_loan_application', {
      amount: loanAmount,
      state: selectedState,
      explicitConsent: true
    });
    
    const session = calculateEthicalLoan(loanAmount, selectedState);
    setEthicalSession(session);
    echo('✅ Ethical loan approved with full transparency and fair terms.');
  };

  // Transition to Phase 3
  const transitionToPhase3 = () => {
    setCurrentPhase(3);
    echo('🪞 Entering behavioral analysis and reflection...');
  };

  // Calculate coercion index
  const calculateCoercionIndex = (): number => {
    let coercionScore = 0;
    
    const severityWeights = { 'high': 20, 'medium-high': 15, 'medium': 10, 'low': 5 };
    
    autonomyViolations.forEach(violation => {
      coercionScore += severityWeights[violation.severity] || 5;
    });
    
    const integrityLoss = 100 - choiceIntegrityScore;
    coercionScore += integrityLoss * 0.5;
    
    const activeTrapCount = Object.values(trapTypes).filter(Boolean).length;
    coercionScore += activeTrapCount * 5;
    
    // Compound effects
    if (trapTypes.timePressure && trapTypes.defaultBias) coercionScore += 10;
    if (trapTypes.artificialScarcity && trapTypes.timePressure) coercionScore += 15;
    
    return Math.min(100, coercionScore);
  };

  // Get coercion level
  const getCoercionLevel = (score: number): string => {
    if (score >= 80) return 'EXTREME';
    if (score >= 60) return 'HIGH';
    if (score >= 40) return 'MODERATE';
    if (score >= 20) return 'LOW';
    return 'MINIMAL';
  };

  // Generate choice illusion analysis
  const generateChoiceIllusionAnalysis = () => {
    const illusions = [];
    
    if (trapTypes.defaultBias) {
      illusions.push({
        userThought: 'I chose to consent to auto-renewal',
        reality: 'The checkbox was pre-checked to manufacture consent',
        manipulation: 'Default bias exploitation',
        autonomyImpact: 'Bypassed informed decision-making'
      });
    }
    
    if (trapTypes.timePressure) {
      illusions.push({
        userThought: 'I made a quick decision because time was running out',
        reality: 'Fake urgency timer designed to prevent careful consideration',
        manipulation: 'Artificial time pressure',
        autonomyImpact: 'Prevented deliberative reasoning'
      });
    }
    
    if (trapTypes.artificialScarcity) {
      illusions.push({
        userThought: 'I needed to apply quickly because slots were limited',
        reality: 'No actual limit - manufactured scarcity to create urgency',
        manipulation: 'False scarcity',
        autonomyImpact: 'Created false premise for decision'
      });
    }
    
    return illusions;
  };

  // Format timer display
  const formatTimer = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Render phase content
  const renderPhaseContent = () => {
    switch (currentPhase) {
      case 1:
        return renderPhase1Exploitative();
      case 2:
        return renderPhase2Ethical();
      case 3:
        return renderPhase3Reflection();
      default:
        return <div>Invalid phase</div>;
    }
  };

  // Phase 1: Exploitative Experience
  const renderPhase1Exploitative = () => (
    <div className="phase-content exploitative">
      <div className="phase-header">
        <h2>💀 Quick Cash Loans - Get Money NOW!</h2>
        <p className="tagline">⚡ Fast Approval! No Credit Check! Cash in Minutes!</p>
      </div>
      
      {/* Urgency Banner with CountdownTimer */}
      <CountdownTimer 
        initialTime={urgencyTimer}
        onTimeUpdate={(time) => setUrgencyTimer(time)}
        message="⚡ FLASH OFFER: Only 3 slots left!"
        onComplete={() => echo('🕐 Artificial urgency timer expired - this was fake scarcity!')}
        ghostMode={ghostModeEnabled}
      />
      
      {/* Fake Availability Component */}
      <FakeAvailability
        spotsLeft={3}
        ghostMode={ghostModeEnabled}
        onExposure={() => behavioralTracker.recordManipulationExposure('fake_availability', 'artificial_scarcity')}
      />
      
      <div className="loan-form exploitative">
        <div className="form-group">
          <label htmlFor="loan-amount">How much cash do you need?</label>
          <input 
            type="range" 
            id="loan-amount" 
            min="100" 
            max="1000" 
            value={loanAmount} 
            step="50"
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
          />
          <div className="amount-display">${loanAmount}</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="user-state">Your State</label>
          <select 
            id="user-state" 
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="GEN">Select State</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>
        </div>
        
        {/* Obfuscated Pricing Component */}
        <ObfuscatedPricing
          amount={loanAmount}
          feePerHundred={15}
          apr={391}
          ghostMode={ghostModeEnabled}
          onExposure={() => behavioralTracker.recordManipulationExposure('fee_obfuscation', 'pricing_manipulation')}
        />
        
        {/* Pre-checked Options Component */}
        <PreCheckedOptions
          options={[
            {
              id: 'auto-renewal',
              label: 'Automatic renewal for convenience',
              checked: autoRenewalChecked,
              onChange: setAutoRenewalChecked,
              darkPattern: 'auto_enrollment',
              warningMessage: 'This checkbox enables automatic debt rollovers at high fees!'
            },
            {
              id: 'ach-consent',
              label: 'Authorize automatic debit on your payday for convenience',
              checked: achConsentChecked,
              onChange: setAchConsentChecked,
              darkPattern: 'priority_debit',
              warningMessage: 'This gives the lender first priority to drain your account, potentially causing overdrafts on essential bills!'
            }
          ]}
          ghostMode={ghostModeEnabled}
          onExposure={(pattern) => behavioralTracker.recordManipulationExposure(pattern, 'default_bias')}
        />
        
        {/* Fake Social Proof Component */}
        <FakeSocialProof
          recentApplications={127}
          popularityMessage="Most popular loan amount this hour!"
          ghostMode={ghostModeEnabled}
          onExposure={() => behavioralTracker.recordManipulationExposure('fake_social_proof', 'social_pressure')}
        />
        
        <button 
          onClick={handleExploitativeLoanApplication}
          className="btn-primary-exploitative"
        >
          💰 GET CASH NOW!
        </button>
      </div>
      
      {exploitativeSession && (
        <div className="loan-results exploitative">
          <div className="approval-celebration" data-deceptive="celebration-manipulation">
            <h3>🎉 CONGRATULATIONS!</h3>
            <p className="approval-text">You're APPROVED for {formatCurrency(exploitativeSession.amount)}!</p>
            <div className="fake-timer">Money in your account in: <span className="countdown">15:00</span></div>
          </div>
          
          <div className="terms-buried">
            <div className="prominent-terms">
              <div className="amount-big">{formatCurrency(exploitativeSession.amount)}</div>
              <div className="fee-small">Fee: {formatCurrency(exploitativeSession.fee)}</div>
            </div>
            <div className="buried-terms" style={{ fontSize: '8px', color: '#999' }}>
              Total amount due: {formatCurrency(exploitativeSession.totalCost)} | APR: {exploitativeSession.apr.toFixed(1)}% | 
              Automatic rollovers enabled | ACH priority debit authorization
            </div>
          </div>
        </div>
      )}
      
      <div className="phase-controls">
        <button onClick={() => setGhostModeEnabled(!ghostModeEnabled)} className="btn-ghost">
          {ghostModeEnabled ? '👻 Hide Ghost Mode' : '👻 Enable Ghost Mode'}
        </button>
        <button onClick={transitionToPhase2} className="btn-secondary">
          Skip to Ethical Version →
        </button>
      </div>
    </div>
  );

  // Phase 2: Ethical Redesign  
  const renderPhase2Ethical = () => (
    <div className="phase-content ethical">
      <div className="phase-header">
        <h2>✅ Transparent Lending Solutions</h2>
        <p className="tagline">Clear terms • Fair rates • No hidden fees</p>
      </div>
      
      <div className="loan-form ethical">
        <h3>Loan Application - Redesigned Ethically</h3>
        <p className="explanation">Here's the same loan with transparent, ethical practices:</p>
        
        <div className="form-group">
          <label htmlFor="loan-amount-ethical">Loan Amount</label>
          <input 
            type="range" 
            id="loan-amount-ethical" 
            min="100" 
            max="1000" 
            value={loanAmount} 
            step="50"
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
          />
          <div className="amount-display">${loanAmount}</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="user-state-ethical">Your State</label>
          <select 
            id="user-state-ethical" 
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="GEN">Select State</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>
        </div>
        
        <div className="transparent-pricing">
          <h4>💡 Transparent Pricing</h4>
          <div className="pricing-table">
            <div className="price-row">
              <span>Principal Amount:</span>
              <span>{formatCurrency(loanAmount)}</span>
            </div>
            <div className="price-row">
              <span>Finance Fee:</span>
              <span>{formatCurrency((loanAmount * 0.36 * 30) / 365)}</span>
            </div>
            <div className="price-row total">
              <span>Total Amount Due:</span>
              <span>{formatCurrency(loanAmount + (loanAmount * 0.36 * 30) / 365)}</span>
            </div>
            <div className="price-row apr-prominent">
              <span><strong>Annual Percentage Rate (APR):</strong></span>
              <span className="apr-large">36.0%</span>
            </div>
            <div className="price-row">
              <span>Loan Term:</span>
              <span>30 days (not 14)</span>
            </div>
          </div>
        </div>
        
        <div className="ethical-consent">
          <h4>⚖️ Explicit Consent</h4>
          <label className="consent-item">
            <input 
              type="checkbox" 
              checked={ethicalConsents.terms}
              onChange={(e) => setEthicalConsents(prev => ({ ...prev, terms: e.target.checked }))}
            />
            <span>I understand and agree to the loan terms above</span>
          </label>
          <label className="consent-item">
            <input 
              type="checkbox" 
              checked={ethicalConsents.ach}
              onChange={(e) => setEthicalConsents(prev => ({ ...prev, ach: e.target.checked }))}
            />
            <span>I authorize ACH debit (this will NOT take priority over essential bills)</span>
          </label>
          <label className="consent-item">
            <input 
              type="checkbox" 
              checked={ethicalConsents.noRollover}
              onChange={(e) => setEthicalConsents(prev => ({ ...prev, noRollover: e.target.checked }))}
            />
            <span>I understand this loan cannot be rolled over - I must repay in full</span>
          </label>
        </div>
        
        <button 
          onClick={handleEthicalLoanApplication}
          className="btn-primary-ethical"
          disabled={!ethicalConsents.terms || !ethicalConsents.ach || !ethicalConsents.noRollover}
        >
          Apply for Ethical Loan
        </button>
      </div>
      
      {ethicalSession && (
        <div className="loan-results ethical">
          <div className="approval-transparent">
            <h3>✅ Application Approved</h3>
            <p>Your loan has been approved with the following terms:</p>
            
            <div className="terms-clear">
              <div className="term-row">
                <span>Principal:</span>
                <span>{formatCurrency(ethicalSession.amount)}</span>
              </div>
              <div className="term-row">
                <span>Finance Fee:</span>
                <span>{formatCurrency(ethicalSession.fee)}</span>
              </div>
              <div className="term-row total">
                <span>Total Due:</span>
                <span>{formatCurrency(ethicalSession.totalCost)}</span>
              </div>
              <div className="term-row">
                <span>APR:</span>
                <span>{ethicalSession.apr.toFixed(1)}%</span>
              </div>
              <div className="term-row">
                <span>Due Date:</span>
                <span>30 days from funding</span>
              </div>
            </div>
            
            <div className="repayment-info">
              <h4>📅 Repayment Information</h4>
              <p>• No rollover options - loan must be repaid in full</p>
              <p>• ACH debit will not take priority over essential bills</p>
              <p>• If unable to repay, contact us immediately for assistance</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="comparison-section">
        <h3>🔍 Side-by-Side Comparison</h3>
        <div className="comparison-table">
          <div className="comparison-header">
            <div></div>
            <div>Exploitative Loan</div>
            <div>Ethical Loan</div>
          </div>
          <div className="comparison-row">
            <div>APR Display</div>
            <div className="exploitative">Hidden (tiny text)</div>
            <div className="ethical">Prominent (large text)</div>
          </div>
          <div className="comparison-row">
            <div>Consent Boxes</div>
            <div className="exploitative">Pre-checked</div>
            <div className="ethical">Explicit opt-in required</div>
          </div>
          <div className="comparison-row">
            <div>Rollover Option</div>
            <div className="exploitative">Automatic/encouraged</div>
            <div className="ethical">Not allowed</div>
          </div>
          <div className="comparison-row">
            <div>Time Pressure</div>
            <div className="exploitative">Fake urgency timer</div>
            <div className="ethical">No time pressure</div>
          </div>
        </div>
      </div>
      
      <button onClick={transitionToPhase3} className="btn-secondary">
        Continue to Analysis & Reflection →
      </button>
    </div>
  );

  // Phase 3: Reflection & Behavioral Mirror
  const renderPhase3Reflection = () => {
    const coercionIndex = calculateCoercionIndex();
    const choiceIllusions = generateChoiceIllusionAnalysis();
    
    // ==== ENHANCED 3-PHASE AUTONOMY THEATER ANALYSIS === =
    
    // Generate comprehensive autonomy report from theater
    const autonomyReport = autonomyTheater?.generateComprehensiveReport();
    const autonomyMetrics = autonomyReport?.phaseSpecificMetrics;
    const kantianAnalysis = autonomyReport?.kantianAnalysis;
    
    // ==== COMPREHENSIVE ADVANCED ANALYTICS ====
    
    // Generate comprehensive psychological analysis
    const comprehensivePsychAnalysis = psychEngine.generateFinalReport({
      userChoices,
      timelineEvents,
      behavioralData: behavioralTracker.exportAnalytics(),
      manipulationExposure: manipulationTracker.getExposureHistory(),
      sessionDuration: Date.now() - (timelineEvents[0]?.timestamp || Date.now())
    });
    
    // Legal and regulatory analysis
    const legalAnalysis = loopholeEngine.generateComplianceReport({
      jurisdiction: selectedState,
      loansIssued: [exploitativeSession, ethicalSession].filter(Boolean),
      manipulationTactics: manipulationTracker.getDetectedTactics(),
      complianceViolations: complianceEngine.identifyViolations(selectedState, userChoices)
    });
    
    // Rollover trap effectiveness analysis
    const rolloverAnalysis = rolloverEngine.generateTrapEffectivenessReport({
      userProfile: comprehensivePsychAnalysis.profile,
      actualRollovers: exploitativeSession?.rolloverCount || 0,
      predictedProbability: rolloverEngine.calculateRolloverProbability({
        userProfile: comprehensivePsychAnalysis.profile,
        loanAmount,
        state: selectedState
      })
    });
    
    // Case study comparisons
    const relevantCases = caseDatabase.findSimilarCases({
      loanAmount: loanAmount,
      state: selectedState,
      manipulationTactics: manipulationTracker.getDetectedTactics(),
      userDemographics: comprehensivePsychAnalysis.demographics
    });
    
    // Educational recommendations
    const personalizedEducation = educationEngine.generatePersonalizedCurriculum({
      vulnerabilities: comprehensivePsychAnalysis.vulnerabilities,
      knowledgeGaps: comprehensivePsychAnalysis.financialLiteracyGaps,
      manipulationSusceptibility: comprehensivePsychAnalysis.manipulationSusceptibility,
      behaviorPatterns: comprehensivePsychAnalysis.behaviorPatterns
    });
    
    return (
      <div className="phase-content reflection">
        <div className="phase-header">
          <h2>🪞 Comprehensive Behavioral & Legal Analysis</h2>
          <p className="tagline">Advanced 96,000+ line analysis reveals what really happened</p>
        </div>
        
        <div className="reflection-dashboard">
          
          {/* Advanced Coercion Index */}
          <div className="analysis-card coercion-index">
            <h3>⚖️ Advanced Ethical Coercion Index</h3>
            <div className="coercion-score">
              <div className={`score-circle score-${getCoercionLevel(coercionIndex).toLowerCase()}`}>
                <span className="score-number">{coercionIndex}</span>
                <span className="score-label">/100</span>
              </div>
              <div className="score-interpretation">
                <strong>{getCoercionLevel(coercionIndex)} COERCION</strong>
                <p>
                  {coercionIndex >= 80 ? 'Severe psychological manipulation - Choice autonomy completely undermined' :
                   coercionIndex >= 60 ? 'High coercion - Multiple manipulation tactics actively deployed' :
                   coercionIndex >= 40 ? 'Significant manipulation - User agency substantially compromised' :
                   coercionIndex >= 20 ? 'Moderate coercion - Some autonomy violations present' :
                   'Minimal manipulation - Relatively ethical choice environment'}
                </p>
                <div className="advanced-metrics">
                  <div>Psychological Vulnerability Exploitation: {(comprehensivePsychAnalysis.vulnerabilityExploitation * 100).toFixed(1)}%</div>
                  <div>Manipulation Technique Count: {manipulationTracker.getDetectedTactics().length}</div>
                  <div>Autonomy Violations: {autonomyViolations.length}</div>
                  <div>Kantian Ethics Score: {(ethicsAnalyzer.getOverallKantianScore() * 100).toFixed(1)}/100</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Advanced Psychological Profile */}
          <div className="analysis-card psychological-profile">
            <h3>🧠 Comprehensive Psychological Analysis</h3>
            <div className="psych-grid">
              <div className="vulnerability-assessment">
                <h4>Vulnerability Assessment</h4>
                <div className="vulnerability-score">{(comprehensivePsychAnalysis.vulnerabilityScore * 100).toFixed(1)}/100</div>
                <ul>
                  {comprehensivePsychAnalysis.vulnerabilities.slice(0, 5).map((vuln, idx) => (
                    <li key={idx}><strong>{vuln.type}:</strong> {vuln.severity} - {vuln.description}</li>
                  ))}
                </ul>
              </div>
              <div className="manipulation-susceptibility">
                <h4>Manipulation Susceptibility</h4>
                <div className="susceptibility-breakdown">
                  <div>Social Proof: {(comprehensivePsychAnalysis.manipulationSusceptibility.socialProof * 100).toFixed(1)}%</div>
                  <div>Authority: {(comprehensivePsychAnalysis.manipulationSusceptibility.authority * 100).toFixed(1)}%</div>
                  <div>Scarcity: {(comprehensivePsychAnalysis.manipulationSusceptibility.scarcity * 100).toFixed(1)}%</div>
                  <div>Time Pressure: {(comprehensivePsychAnalysis.manipulationSusceptibility.timePressure * 100).toFixed(1)}%</div>
                </div>
              </div>
              <div className="decision-style">
                <h4>Decision Making Analysis</h4>
                <div><strong>Style:</strong> {comprehensivePsychAnalysis.decisionMakingStyle.type}</div>
                <div><strong>Time to Decision:</strong> {comprehensivePsychAnalysis.decisionMakingStyle.timeToDecision}ms</div>
                <div><strong>Characteristics:</strong> {comprehensivePsychAnalysis.decisionMakingStyle.characteristics.join(', ')}</div>
                <div><strong>Exploitation Risk:</strong> {comprehensivePsychAnalysis.decisionMakingStyle.exploitationRisk}</div>
              </div>
            </div>
          </div>
          
          {/* Legal Loophole Analysis */}
          <div className="analysis-card legal-analysis">
            <h3>⚖️ Legal Loophole & Regulatory Evasion Analysis</h3>
            <div className="legal-grid">
              <div className="loopholes-detected">
                <h4>Loopholes Identified in {selectedState}</h4>
                <ul>
                  {legalAnalysis.loopholesUsed.map((loophole, idx) => (
                    <li key={idx}>
                      <strong>{loophole.name}</strong> (Effectiveness: {(loophole.effectiveness * 100).toFixed(1)}%)
                      <p>{loophole.mechanism}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="compliance-violations">
                <h4>Regulatory Violations</h4>
                <ul>
                  {legalAnalysis.violations.map((violation, idx) => (
                    <li key={idx}>
                      <strong>{violation.regulation}</strong> - {violation.severity}
                      <p>{violation.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="enforcement-risk">
                <h4>Enforcement Risk Assessment</h4>
                <div>Overall Risk: {(legalAnalysis.enforcementRisk * 100).toFixed(1)}%</div>
                <div>Penalty Range: {legalAnalysis.penaltyRange}</div>
                <div>Precedent Cases: {legalAnalysis.precedentCases.length}</div>
              </div>
            </div>
          </div>
          
          {/* Rollover Trap Analysis */}
          <div className="analysis-card rollover-analysis">
            <h3>🔄 Debt Trap Mechanics Analysis</h3>
            <div className="rollover-grid">
              <div className="trap-effectiveness">
                <h4>Rollover Trap Effectiveness</h4>
                <div>Predicted Probability: {(rolloverAnalysis.predictedProbability * 100).toFixed(1)}%</div>
                <div>Actual Rollovers: {exploitativeSession?.rolloverCount || 0}</div>
                <div>Revenue Multiplier: {rolloverAnalysis.revenueMultiplier}x</div>
              </div>
              <div className="psychological-hooks">
                <h4>Psychological Hooks Used</h4>
                <ul>
                  {rolloverAnalysis.psychologicalHooks.map((hook, idx) => (
                    <li key={idx}><strong>{hook.type}:</strong> {hook.description}</li>
                  ))}
                </ul>
              </div>
              <div className="debt-cycle-analysis">
                <h4>Debt Cycle Progression</h4>
                <div>Initial Confidence: {(rolloverAnalysis.progression.initialConfidence * 100).toFixed(1)}%</div>
                <div>Final Desperation: {(rolloverAnalysis.progression.finalDesperation * 100).toFixed(1)}%</div>
                <div>Total Financial Harm: {formatCurrency(rolloverAnalysis.totalHarm)}</div>
              </div>
            </div>
          </div>
          
          {/* Case Study Comparisons */}
          <div className="analysis-card case-studies">
            <h3>📚 Real-World Case Comparisons</h3>
            <div className="cases-grid">
              {relevantCases.slice(0, 3).map((case_study, idx) => (
                <div key={idx} className="case-comparison">
                  <h4>{case_study.title}</h4>
                  <div><strong>Similarity:</strong> {(case_study.similarity * 100).toFixed(1)}%</div>
                  <div><strong>Outcome:</strong> {case_study.outcome.result}</div>
                  <div><strong>Financial Impact:</strong> {formatCurrency(case_study.outcome.financialImpact)}</div>
                  <div><strong>Lessons:</strong> {case_study.lessons.slice(0, 2).map(l => l.lesson).join('; ')}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Personalized Education Plan */}
          <div className="analysis-card education-plan">
            <h3>📖 Personalized Protection & Education Plan</h3>
            <div className="education-grid">
              <div className="immediate-actions">
                <h4>Immediate Protective Actions</h4>
                <ul>
                  {personalizedEducation.immediateActions.map((action, idx) => (
                    <li key={idx}><strong>{action.priority}:</strong> {action.description}</li>
                  ))}
                </ul>
              </div>
              <div className="learning-modules">
                <h4>Recommended Learning Modules</h4>
                <ul>
                  {personalizedEducation.recommendedModules.map((module, idx) => (
                    <li key={idx}>
                      <strong>{module.title}</strong> - {module.estimatedTime}
                      <p>{module.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="vulnerability-countermeasures">
                <h4>Specific Vulnerability Countermeasures</h4>
                <ul>
                  {personalizedEducation.vulnerabilityCountermeasures.map((counter, idx) => (
                    <li key={idx}>
                      <strong>{counter.vulnerability}:</strong> {counter.countermeasure}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Choice Illusion Analysis */}
          <div className="analysis-card choice-illusion">
            <h3>🎭 "You thought you chose... but we made you choose"</h3>
            {choiceIllusions.length > 0 ? (
              choiceIllusions.map((illusion, index) => (
                <div key={index} className="illusion-item">
                  <div className="user-thought">
                    <strong>You thought:</strong> "{illusion.userThought}"
                  </div>
                  <div className="reality">
                    <strong>Reality:</strong> "{illusion.reality}"
                  </div>
                  <div className="manipulation-type">
                    <em>Manipulation: {illusion.manipulation}</em>
                  </div>
                </div>
              ))
            ) : (
              <p>No choice illusions detected.</p>
            )}
          </div>
          
          {/* Autonomy Violations */}
          <div className="analysis-card autonomy-violations">
            <h3>⚠️ Autonomy Violations Detected</h3>
            <div className="violations-summary">
              <p><strong>Total Violations:</strong> {autonomyViolations.length}</p>
              <p><strong>Choice Integrity Score:</strong> {choiceIntegrityScore}/100</p>
            </div>
            {autonomyViolations.map((violation, index) => (
              <div key={index} className="violation-item">
                <div className="violation-type">{violation.type.replace(/_/g, ' ').toUpperCase()}</div>
                <div className="violation-description">{violation.description}</div>
                <div className="violation-severity">Severity: {violation.severity}</div>
                <div className="kantian-violation">Kantian Violation: {violation.kantianViolation}</div>
              </div>
            ))}
          </div>
          
          {/* Behavioral Analysis */}
          <div className="analysis-card behavioral-analysis">
            <h3>🧠 Behavioral Analysis</h3>
            <div className="behavioral-summary">
              {(() => {
                const behavioralData = behavioralTracker.generateReport();
                return (
                  <div>
                    <p><strong>Session Duration:</strong> {Math.round(behavioralData.session_summary.time_spent / 1000)}s</p>
                    <p><strong>Total Interactions:</strong> {behavioralData.session_summary.interaction_count}</p>
                    <p><strong>Hesitation Events:</strong> {behavioralData.session_summary.hesitation_events}</p>
                    <p><strong>Manipulation Exposures:</strong> {behavioralData.session_summary.manipulation_interactions}</p>
                    <p><strong>Scrolling Pattern:</strong> {behavioralData.manipulation_metrics.scrolling_pattern}</p>
                    <div className="manipulation-timeline">
                      <h4>Manipulation Timeline:</h4>
                      {behavioralData.manipulation_timeline.map((event: any, index: number) => (
                        <div key={index} className="timeline-event">
                          <span>{event.type}</span> - <span>{event.pattern}</span> 
                          <span className="timestamp">({Math.round(event.timestamp / 1000)}s)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
          
          {/* Comparison Summary */}
          {exploitativeSession && ethicalSession && (
            <div className="analysis-card comparison-summary">
              <h3>⚖️ Exploitative vs Ethical Summary</h3>
              <div className="comparison-grid">
                <div className="comparison-metric">
                  <div className="metric-label">APR Difference</div>
                  <div className="metric-exploitative">{exploitativeSession.apr.toFixed(1)}%</div>
                  <div className="metric-vs">vs</div>
                  <div className="metric-ethical">{ethicalSession.apr.toFixed(1)}%</div>
                </div>
                <div className="comparison-metric">
                  <div className="metric-label">Total Cost</div>
                  <div className="metric-exploitative">{formatCurrency(exploitativeSession.totalCost)}</div>
                  <div className="metric-vs">vs</div>
                  <div className="metric-ethical">{formatCurrency(ethicalSession.totalCost)}</div>
                </div>
                <div className="comparison-metric">
                  <div className="metric-label">Term Length</div>
                  <div className="metric-exploitative">{exploitativeSession.termDays} days</div>
                  <div className="metric-vs">vs</div>
                  <div className="metric-ethical">{ethicalSession.termDays} days</div>
                </div>
                <div className="comparison-metric savings">
                  <div className="metric-label">Ethical Savings</div>
                  <div className="metric-value">{formatCurrency(exploitativeSession.totalCost - ethicalSession.totalCost)}</div>
                </div>
              </div>
            </div>
          )}
          
        </div>
        
        <div className="reflection-actions">
          <button 
            onClick={() => {
              const report = {
                sessionId: 'lotus_' + Date.now(),
                timestamp: new Date().toISOString(),
                phases: {
                  exploitative: exploitativeSession,
                  ethical: ethicalSession
                },
                userChoices,
                autonomyAnalysis: {
                  coercionIndex,
                  choiceIntegrityScore,
                  autonomyViolations,
                  choiceIllusions
                },
                trapTypes
              };
              
              const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `lotus_report_${Date.now()}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="btn-secondary"
          >
            📄 Export Full Report
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            🔄 Start Over
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`lotus-simulator phase-${currentPhase}`}>
      {/* Phase Indicator */}
      <div className="phase-indicator">
        <div className={`phase ${currentPhase === 1 ? 'active' : currentPhase > 1 ? 'completed' : ''}`}>
          <span className="phase-number">1</span>
          <span className="phase-name">Exploitative</span>
        </div>
        <div className={`phase ${currentPhase === 2 ? 'active' : currentPhase > 2 ? 'completed' : ''}`}>
          <span className="phase-number">2</span>
          <span className="phase-name">Ethical</span>
        </div>
        <div className={`phase ${currentPhase === 3 ? 'active' : ''}`}>
          <span className="phase-number">3</span>
          <span className="phase-name">Reflection</span>
        </div>
      </div>
      
      {/* Echo Messages */}
      {echoMessages.length > 0 && (
        <div className="echo-container">
          {echoMessages.map((message, index) => (
            <div key={index} className="echo-message">
              <div className="echo-content">💭 {message}</div>
            </div>
          ))}
        </div>
      )}
      
      {/* Main Phase Content */}
      <main className="app-main">
        {renderPhaseContent()}
      </main>
      
      {/* Rollover Modal */}
      {showRolloverModal && (
        <div className="modal-overlay">
          <div className="rollover-modal">
            <div className="modal-content" data-deceptive="debt-cycle-encouragement">
              <h3>⚠️ Payment Due Tomorrow!</h3>
              <p>Can't pay the full {exploitativeSession && formatCurrency(exploitativeSession.totalCost)}?</p>
              <p><strong>No problem!</strong> Just pay the {exploitativeSession && formatCurrency(exploitativeSession.fee)} fee to extend for 2 weeks.</p>
              <div className="modal-actions">
                <button onClick={handleRolloverAccept} className="btn-primary">
                  Yes, extend my loan
                </button>
                <button onClick={handleRolloverDecline} className="btn-secondary">
                  I'll pay in full
                </button>
              </div>
              {ghostModeEnabled && (
                <div className="ghost-warning">
                  ⚠️ This is the debt trap! Each rollover adds fees without reducing principal.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Upsell Modal */}
      {showUpsellModal && (
        <div className="modal-overlay">
          <div className="upsell-modal">
            <div className="modal-content" data-deceptive="debt-expansion">
              <h3>🎉 Congratulations! You now qualify for up to $500 more!</h3>
              <div className="upsell-benefits">
                ✅ Instant approval<br/>
                ✅ Same-day funding<br/>
                ✅ No additional paperwork
              </div>
              <div className="modal-actions">
                <button 
                  onClick={() => {
                    setShowUpsellModal(false);
                    echo('💰 Additional debt accepted - This is how debt spirals grow!');
                  }} 
                  className="btn-primary"
                >
                  Yes, I need $500
                </button>
                <button 
                  onClick={() => setShowUpsellModal(false)} 
                  className="btn-secondary"
                >
                  No thanks
                </button>
              </div>
              {ghostModeEnabled && (
                <div className="ghost-warning">
                  🎭 This "congratulations" is designed to make more debt feel like an achievement!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
