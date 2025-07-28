"use client";

import React, { useEffect, useState } from 'react';
import { useLotusExperiment } from '@/components/providers/OptimizedLotusProvider';
import { QuizEngine, Quiz, QuizQuestion } from '@/components/quiz/QuizEngine';
import { getQuiz, getFinalQuiz } from '@/data/quiz_bank';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { InformedConsent } from '@/components/shared/InformedConsent';
import { ProgressIndicator } from '@/components/shared/ProgressIndicator';
import { ProgressiveRanking } from '@/components/shared/ProgressiveRanking';
import { DataConsent } from '@/components/shared/DataConsent';
import { ScenarioPromptComponent } from '@/components/shared/ScenarioPrompts';
import { useRouter } from 'next/navigation';
import { useLotusTracking } from '@/components/providers/OptimizedLotusProvider';
import { getSimulationConfig } from '@/components/lib/simulationConfigs';

import { PaydayLoanFlow } from '@/components/flows/payday/PaydayLoanFlow';

export default function SimulationPageContent() {
  const experimentState = useLotusExperiment();
  const tracking = useLotusTracking();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize session or redirect if not ready
    if (experimentState.currentPhase === 'NOT_STARTED') {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [experimentState.currentPhase, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (experimentState.currentPhase === 'INFORMED_CONSENT') {
    return (
      <div className="container mx-auto px-4 py-8">
        <InformedConsent onConsent={() => {
          // Handle consent logic
          console.log('Consent given');
        }} />
      </div>
    );
  }

  if (experimentState.currentPhase === 'SIMULATION_1') {
    return (
      <div className="container mx-auto px-4 py-8">
        <PaydayLoanFlow />
      </div>
    );
  }

  // Default loading state
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loan Research Study</h1>
        <p className="text-gray-600">Initializing study...</p>
      </div>
    </div>
  );
} 