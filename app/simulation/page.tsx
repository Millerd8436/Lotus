"use client";

import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

// Dynamic import to prevent SSR issues
const SimulationPageContent = dynamic(() => import('./SimulationPageContent'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function SimulationPage() {
  return <SimulationPageContent />;
} 