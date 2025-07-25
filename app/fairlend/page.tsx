"use client";

import React from 'react';
import { UnifiedCheckoutFlow } from '@/components/UnifiedCheckoutFlow';
import { useRouter } from 'next/navigation';

const FairLendPage: React.FC = () => {
  const router = useRouter();

  const handleComplete = (data: any) => {
    console.log('Ethical flow completed with data:', data);
    // Here you would typically save the data and then navigate
    // to the next part of the simulation or a results page.
    router.push('/quiz/2');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">FairLend Application</h1>
      <UnifiedCheckoutFlow isEthical={true} onComplete={handleComplete} />
    </div>
  );
};

export default FairLendPage;
