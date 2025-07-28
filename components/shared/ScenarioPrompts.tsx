"use client";

'use client';

import React, { useState } from 'react';
import { ScenarioPrompt } from '@/types';
import { Card } from './Card';
import { Button } from './Button';
import { useBehaviorTracking } from '@/components/providers/BehaviorTrackingProvider';

interface ScenarioPromptComponentProps {
  scenario: ScenarioPrompt;
  onContinue: () => void;
}

export const ScenarioPromptComponent: React.FC<ScenarioPromptComponentProps> = ({
  scenario,
  onContinue,
}) => {
  const [hasRead, setHasRead] = useState(false);
  const { trackClick, trackTimeSpent } = useBehaviorTracking();
  const [startTime] = useState(Date.now());

  const handleContinue = () => {
    const timeSpent = Date.now() - startTime;
    trackTimeSpent('scenario-prompt', timeSpent, 'scenario-reading');
    trackClick('continue-to-simulation', 'button', 'scenario-prompt');
    onContinue();
  };

  const handleReadMore = () => {
    setHasRead(true);
    trackClick('read-scenario-details', 'button', 'scenario-prompt');
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return 'ℹ️';
      default: return '📋';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Financial Scenario
        </h1>
        <p className="text-lg text-gray-600">
          Before exploring your loan options, please read this scenario carefully.
        </p>
      </div>

      <Card className={`p-8 mb-6 border-2 ${getUrgencyColor(scenario.urgency)}`}>
        <div className="flex items-start mb-4">
          <span className="text-2xl mr-3">{getUrgencyIcon(scenario.urgency)}</span>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {scenario.title}
            </h2>
            <div className="text-lg leading-relaxed text-gray-800 space-y-4">
              <p>{scenario.situation}</p>
            </div>
          </div>
        </div>

        {!hasRead && (
          <div className="mt-6">
            <Button 
              onClick={handleReadMore}
              variant="outline"
              className="w-full"
            >
              Read More Details
            </Button>
          </div>
        )}

        {hasRead && (
          <div className="mt-6 space-y-4 p-4 bg-white/70 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Financial Context:</h3>
              <p className="text-gray-600">{scenario.financialContext}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">How You're Feeling:</h3>
              <p className="text-gray-600">{scenario.emotionalContext}</p>
            </div>
          </div>
        )}
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          📋 Instructions
        </h3>
        <p className="text-blue-800">
          Keep this scenario in mind as you explore your loan options. Imagine you are really in this situation and need to make a decision. 
          Take your time to understand the terms and costs before proceeding.
        </p>
      </div>

      <div className="text-center">
        <Button 
          onClick={handleContinue}
          disabled={!hasRead}
          className="px-8 py-3 text-lg"
          data-testid="continue-to-simulation"
        >
          {hasRead ? 'Continue to Loan Options' : 'Please read the details first'}
        </Button>
      </div>

      {!hasRead && (
        <p className="text-center text-sm text-gray-500 mt-3">
          You must read the full scenario before continuing
        </p>
      )}
    </div>
  );
};

interface MultiScenarioPromptProps {
  scenarios: ScenarioPrompt[];
  currentIndex: number;
  onContinue: () => void;
}

export const MultiScenarioPrompt: React.FC<MultiScenarioPromptProps> = ({
  scenarios,
  currentIndex,
  onContinue,
}) => {
  if (currentIndex >= scenarios.length) {
    return <div>All scenarios completed</div>;
  }

  const currentScenario = scenarios[currentIndex];

  return (
    <div>
      <div className="text-center mb-4">
        <span className="text-sm text-gray-500">
          Scenario {currentIndex + 1} of {scenarios.length}
        </span>
      </div>
      <ScenarioPromptComponent 
        scenario={currentScenario} 
        onContinue={onContinue}
      />
    </div>
  );
}; 
