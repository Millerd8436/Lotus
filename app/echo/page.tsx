"use client";

import { RealTimeAnnotationEngine } from '@/components/echo/RealTimeAnnotationEngine';
import { Suspense } from 'react';

export default function EchoModePage() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Echo Mode: Annotated Replay</h1>
        <p className="text-gray-600 mt-2">
          Let's review your recent application process. We've added notes to highlight key moments.
        </p>
      </div>
      <Suspense fallback={<div>Loading Replay...</div>}>
        {/* The Replay component will go here, for now we use the engine directly */}
        <RealTimeAnnotationEngine />
      </Suspense>
    </div>
  );
}
