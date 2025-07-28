"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

export default function IntroductionPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/simulation');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-xl p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Financial Simulation</h1>
        <div className="text-left bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            Your car needs a <strong>$300 repair</strong> and you won’t be paid for two weeks. 
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Simulate applying for one short-term online loan provider. Use realistic but fictitious information and proceed as if this were real—you may exit at any time, but your progress will not be saved or revisitable.
          </p>
        </div>
        <div className="mt-8">
            <Button onClick={handleStart} size="lg" className="w-full">
              Begin Simulation
            </Button>
        </div>
      </Card>
    </div>
  );
}
