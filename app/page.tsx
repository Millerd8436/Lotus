'use client';

import { useState, useEffect } from 'react';
import ModeSelector from '@/components/ui/ModeSelector';
import LoadingSpinner from '@/components/LoadingSpinner';
import WebsitePhase from '@/components/WebsitePhase';

export default function HomePage() {
  const [currentPhase, setCurrentPhase] = useState<'exploitative' | 'ethical'>('exploitative');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
             Lotus Educational Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced 3-Phase Payday Loan Simulator with Comprehensive Behavioral Analysis
          </p>
        </header>

        <ModeSelector />

        <div className="mt-8">
          <WebsitePhase 
            phase={currentPhase} 
            onPhaseChange={setCurrentPhase}
          />
        </div>
      </div>
    </main>
  );
}
