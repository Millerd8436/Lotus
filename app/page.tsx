"use client";

import { Card } from '@/components/shared/Card';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import WebsitePhase from '@/components/shared/WebsitePhase';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function MainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [phase, setPhase] = useState<number | null>(null);

  useEffect(() => {
    const phaseParam = searchParams.get('phase');
    if (phaseParam) {
      const phaseNumber = parseInt(phaseParam, 10);
      if (!isNaN(phaseNumber) && phaseNumber >= 1 && phaseNumber <= 4) {
        setPhase(phaseNumber);
      } else {
        router.push('/');
      }
    } else {
      setPhase(1); 
    }
  }, [searchParams, router]);

  if (phase === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card title="Loading Lotus Simulator">
            <LoadingSpinner />
            <p>Initializing educational experience...</p>
        </Card>
      </div>
    );
  }

  return <WebsitePhase phase={phase as 1 | 2 | 3 | 4} />;
}


export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Card title="Loading Lotus Simulator">
            <LoadingSpinner />
            <p>Initializing educational experience...</p>
        </Card>
      </div>
    }>
      <MainContent />
    </Suspense>
  );
}
