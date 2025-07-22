"use client";

import React from 'react';
import ExploitativeHomepage from '../phase1-exploitative/ExploitativeHomepage';
import EthicalHomepage from '../phase4-ethical/EthicalHomepage';
import Enhanced2025ReflectionDashboard from '../phase2-reflection/Enhanced2025ReflectionDashboard';
import { Card } from './Card';
import { LoadingSpinner } from './LoadingSpinner';

interface WebsitePhaseProps {
  phase: 1 | 2 | 3 | 4;
}

const WebsitePhase: React.FC<WebsitePhaseProps> = ({ phase }) => {
  switch (phase) {
    case 1:
      return <ExploitativeHomepage />;
    case 2:
      return <Enhanced2025ReflectionDashboard />;
    case 3:
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Card>
            <h2 className="text-xl font-bold mb-2">Phase 3: Teaching</h2>
            <p>Coming soon...</p>
          </Card>
        </div>
      );
    case 4:
      return <EthicalHomepage />;
    default:
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Card>
            <h2 className="text-xl font-bold mb-2">Loading Lotus Simulator</h2>
            <LoadingSpinner />
            <p>Initializing educational experience...</p>
          </Card>
        </div>
      );
  }
};

export default WebsitePhase;
