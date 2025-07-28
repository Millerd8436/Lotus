"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Heart, Eye, Activity, Zap, AlertTriangle } from 'lucide-react';

interface BiometricData {
  heartRate: number;
  eyeTracking: {
    fixationTime: number;
    scanPath: string[];
    pupilDilation: number;
  };
  skinConductance: number;
  facialExpression: 'neutral' | 'stressed' | 'confident' | 'hesitant' | 'excited';
  brainwavePattern: 'alpha' | 'beta' | 'gamma' | 'theta';
  stressLevel: number;
  cognitiveLoad: number;
}

interface NeuroeconomicProfile {
  lossAversion: number;
  riskTolerance: number;
  timePreference: number;
  socialInfluence: number;
  confidenceLevel: number;
  emotionalState: string;
  decisionMakingSpeed: number;
  rewardSensitivity: number;
}

interface DecisionContext {
  loanAmount: number;
  apr: number;
  timeStress: boolean;
  socialPressure: boolean;
  cognitiveComplexity: 'low' | 'medium' | 'high';
  priming: string[];
}

interface NeuroeconomicBehaviorEngineProps {
  loanType: 'Payday' | 'Installment' | 'EWA' | 'BNPL';
  onBehaviorUpdate: (behavior: NeuroeconomicProfile) => void;
  context: DecisionContext;
  isActive: boolean;
}

export const NeuroeconomicBehaviorEngine: React.FC<NeuroeconomicBehaviorEngineProps> = ({
  loanType,
  onBehaviorUpdate,
  context,
  isActive
}) => {
  const [biometrics, setBiometrics] = useState<BiometricData>({
    heartRate: 72,
    eyeTracking: {
      fixationTime: 250,
      scanPath: [],
      pupilDilation: 4.0
    },
    skinConductance: 0.5,
    facialExpression: 'neutral',
    brainwavePattern: 'beta',
    stressLevel: 0.3,
    cognitiveLoad: 0.4
  });

  const [neuroProfile, setNeuroProfile] = useState<NeuroeconomicProfile>({
    lossAversion: 1.5,
    riskTolerance: 0.6,
    timePreference: 0.7,
    socialInfluence: 0.5,
    confidenceLevel: 0.6,
    emotionalState: 'neutral',
    decisionMakingSpeed: 0.5,
    rewardSensitivity: 0.6
  });

  const [brainActivity, setBrainActivity] = useState({
    prefrontalCortex: 0.6, // rational decision making
    amygdala: 0.4, // fear/emotion
    striatumActivity: 0.5, // reward processing
    anteriorCingulate: 0.5, // conflict monitoring
    insula: 0.4 // interoceptive awareness
  });

  const simulationInterval = useRef<NodeJS.Timeout>();

  // Simulate real-time biometric feedback based on 2025 BCI research
  const simulateNeuroeconomicResponse = useCallback(() => {
    // Advanced stress response simulation based on context
    const baseStress = context.timeStress ? 0.7 : 0.3;
    const socialStress = context.socialPressure ? 0.6 : 0.2;
    const complexityStress = context.cognitiveComplexity === 'high' ? 0.8 : 
                            context.cognitiveComplexity === 'medium' ? 0.5 : 0.2;

    const combinedStress = Math.min(1.0, baseStress + socialStress + complexityStress);

    // Heart rate variability simulation
    const stressHeartRate = 60 + (combinedStress * 40) + (Math.random() * 10 - 5);

    // Eye tracking patterns for financial decision making
    const highStressFixation = combinedStress > 0.6 ? 150 : 250; // Faster scanning under stress
    const pupilSize = 3.0 + (combinedStress * 2.0) + (Math.random() * 0.5);

    // Facial expression mapping based on stress and decision confidence
    let expression: BiometricData['facialExpression'] = 'neutral';
    if (combinedStress > 0.7) expression = 'stressed';
    else if (combinedStress > 0.5) expression = 'hesitant';
    else if (neuroProfile.confidenceLevel > 0.7) expression = 'confident';

    // Brainwave patterns from 2025 neuromarketing research
    let brainwave: BiometricData['brainwavePattern'] = 'beta';
    if (combinedStress > 0.8) brainwave = 'gamma'; // High arousal
    else if (combinedStress < 0.3) brainwave = 'alpha'; // Relaxed state
    else if (expression === 'hesitant') brainwave = 'theta'; // Uncertainty

    setBiometrics(prev => ({
      ...prev,
      heartRate: stressHeartRate,
      eyeTracking: {
        ...prev.eyeTracking,
        fixationTime: highStressFixation,
        pupilDilation: pupilSize
      },
      skinConductance: 0.2 + (combinedStress * 0.8),
      facialExpression: expression,
      brainwavePattern: brainwave,
      stressLevel: combinedStress,
      cognitiveLoad: Math.min(1.0, complexityStress + (combinedStress * 0.5))
    }));

    // Update brain region activity based on decision context
    setBrainActivity(prev => ({
      prefrontalCortex: Math.max(0.1, 0.8 - (combinedStress * 0.4)), // Rational thinking decreases with stress
      amygdala: 0.2 + (combinedStress * 0.6), // Fear center activation
      striatumActivity: 0.3 + (neuroProfile.rewardSensitivity * 0.5), // Reward anticipation
      anteriorCingulate: 0.4 + (combinedStress * 0.4), // Conflict detection
      insula: 0.3 + (combinedStress * 0.3) // Body awareness
    }));

    // Update neuroeconomic profile based on current state
    const updatedProfile: NeuroeconomicProfile = {
      lossAversion: Math.min(3.0, 1.5 + (combinedStress * 1.0)), // Stress increases loss aversion
      riskTolerance: Math.max(0.1, 0.6 - (combinedStress * 0.4)),
      timePreference: Math.max(0.1, 0.7 - (combinedStress * 0.5)), // Stress increases present bias
      socialInfluence: context.socialPressure ? 0.8 : 0.3,
      confidenceLevel: Math.max(0.1, 0.6 - (combinedStress * 0.3)),
      emotionalState: expression,
      decisionMakingSpeed: combinedStress > 0.6 ? 0.8 : 0.4, // Stress speeds up decisions
      rewardSensitivity: 0.6 + (Math.random() * 0.3 - 0.15)
    };

    setNeuroProfile(updatedProfile);
    onBehaviorUpdate(updatedProfile);
  }, [context, neuroProfile.rewardSensitivity, onBehaviorUpdate]);

  // Advanced decision prediction algorithm
  const predictDecisionOutcome = () => {
    const urgencyFactor = context.timeStress ? 1.4 : 1.0;
    const socialFactor = context.socialPressure ? 1.2 : 1.0;
    const stressFactor = biometrics.stressLevel * 1.3;

    const decisionPressure = urgencyFactor * socialFactor * stressFactor;
    
    return {
      approvalProbability: Math.min(0.95, 0.3 + (decisionPressure * 0.4)),
      regretProbability: Math.max(0.05, decisionPressure * 0.6),
      timeToDecision: Math.max(5, 30 - (decisionPressure * 15)) // seconds
    };
  };

  useEffect(() => {
    if (isActive) {
      simulationInterval.current = setInterval(simulateNeuroeconomicResponse, 2000);
      return () => {
        if (simulationInterval.current) {
          clearInterval(simulationInterval.current);
        }
      };
    }
  }, [isActive, simulateNeuroeconomicResponse]);

  if (!isActive) return null;

  const prediction = predictDecisionOutcome();

  return (
    <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-purple-400" />
        <h3 className="text-sm font-medium text-white">Neuroeconomic Analysis</h3>
        <div className="text-xs text-gray-400">Live BCI Simulation</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Biometric Indicators */}
        <div className="bg-gray-800/50 rounded p-3">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-xs text-gray-300">Biometrics</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Heart Rate:</span>
              <span className={`${biometrics.heartRate > 90 ? 'text-red-400' : 'text-green-400'}`}>
                {Math.round(biometrics.heartRate)} BPM
              </span>
            </div>
            <div className="flex justify-between">
              <span>Stress Level:</span>
              <span className={`${biometrics.stressLevel > 0.6 ? 'text-red-400' : 'text-yellow-400'}`}>
                {Math.round(biometrics.stressLevel * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Expression:</span>
              <span className="text-blue-400 capitalize">{biometrics.facialExpression}</span>
            </div>
          </div>
        </div>

        {/* Brain Activity */}
        <div className="bg-gray-800/50 rounded p-3">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-300">Brain Activity</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Rational:</span>
              <span className="text-blue-400">{Math.round(brainActivity.prefrontalCortex * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Emotional:</span>
              <span className="text-orange-400">{Math.round(brainActivity.amygdala * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Reward:</span>
              <span className="text-green-400">{Math.round(brainActivity.striatumActivity * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Prediction */}
      <div className="bg-gray-800/30 rounded p-3">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-gray-300">Decision Prediction</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-green-400 font-mono">
              {Math.round(prediction.approvalProbability * 100)}%
            </div>
            <div className="text-gray-400">Approval</div>
          </div>
          <div className="text-center">
            <div className="text-red-400 font-mono">
              {Math.round(prediction.regretProbability * 100)}%
            </div>
            <div className="text-gray-400">Regret Risk</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-mono">
              {Math.round(prediction.timeToDecision)}s
            </div>
            <div className="text-gray-400">Time to Decide</div>
          </div>
        </div>
      </div>

      {/* Warnings based on neuroeconomic state */}
      {(biometrics.stressLevel > 0.7 || neuroProfile.lossAversion > 2.5) && (
        <div className="mt-3 p-2 bg-red-900/30 rounded border border-red-500/40">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-300">
              High stress detected. Consider decision delay for optimal outcome.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}; 
