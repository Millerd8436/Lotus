"use client";

import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Checkbox } from './Checkbox';

interface DataConsentProps {
  onConsent: (consent: boolean) => void;
}

export const DataConsent: React.FC<DataConsentProps> = ({ onConsent }) => {
  const [consentResearch, setConsentResearch] = useState(false);
  const [consentPublication, setConsentPublication] = useState(false);
  const [consentEducation, setConsentEducation] = useState(false);
  const [hasRead, setHasRead] = useState(false);

  const handleContinue = (saveData: boolean) => {
    onConsent(saveData);
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-xl">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Data Consent for Research
        </h1>
        
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
          <p className="text-sm font-semibold text-purple-800">
            Thank you for completing the study! We would like to save your anonymous data for research purposes.
          </p>
        </div>

        <div className="prose max-w-none mb-6">
          <h2 className="text-xl font-semibold mb-4">What Data We Collected</h2>
          <p className="mb-4">During this study, we collected:</p>
          <ul className="list-disc ml-6 mb-4 text-gray-700">
            <li>Your responses to all quiz questions</li>
            <li>Time spent on each loan simulator and section</li>
            <li>Click patterns and navigation paths through the interfaces</li>
            <li>Scroll behavior and hover interactions</li>
            <li>Rankings and qualitative feedback</li>
            <li>Behavioral patterns (e.g., which information you viewed or skipped)</li>
          </ul>
          
          <div className="bg-green-50 border rounded-lg p-4 mb-6">
            <p className="font-semibold text-green-800 mb-2">✓ Your data is completely anonymous</p>
            <p className="text-sm text-gray-700">
              We have NOT collected any personally identifiable information such as your name, 
              email address, IP address, or any real financial information. Your responses cannot 
              be linked back to you in any way.
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-4">How We Will Use Your Data</h2>
          <p className="mb-4">If you consent, your anonymous data may be used for:</p>
          
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📊 Research Analysis</h3>
              <p className="text-sm text-gray-700">
                Analyzing patterns in how users interact with and understand different loan interfaces 
                to identify deceptive design practices and areas of confusion.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📝 Academic Publications</h3>
              <p className="text-sm text-gray-700">
                Publishing research findings in academic journals and presenting at conferences to 
                advance knowledge about online lending practices and consumer protection.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🎓 Educational Materials</h3>
              <p className="text-sm text-gray-700">
                Creating educational resources to help consumers better understand and navigate 
                online lending services safely.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">⚖️ Policy Recommendations</h3>
              <p className="text-sm text-gray-700">
                Informing policy makers and regulators about problematic practices to improve 
                consumer protection laws and regulations.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
          <ul className="list-disc ml-6 mb-6 text-gray-700">
            <li>You can choose not to have your data saved without any penalty</li>
            <li>You will still receive all educational materials regardless of your choice</li>
            <li>Once submitted, we cannot remove your specific data as it is anonymous</li>
            <li>Your data will be stored securely and retained for up to 7 years</li>
          </ul>
        </div>

        <div className="border-t pt-6 space-y-4">
          <div className="bg-yellow-50 border rounded-lg p-4">
            <p className="font-semibold mb-2">Please indicate your consent preferences:</p>
          </div>
          
          <Checkbox
            id="hasReadConsent"
            label="I have read and understood how my anonymous data will be used"
            checked={hasRead}
            onChange={(e) => setHasRead(e.target.checked)}
          />
          
          {hasRead && (
            <>
              <Checkbox
                id="consentResearch"
                label="I consent to my anonymous data being used for research analysis"
                checked={consentResearch}
                onChange={(e) => setConsentResearch(e.target.checked)}
              />
              
              <Checkbox
                id="consentPublication"
                label="I consent to my anonymous data being included in academic publications"
                checked={consentPublication}
                onChange={(e) => setConsentPublication(e.target.checked)}
              />
              
              <Checkbox
                id="consentEducation"
                label="I consent to my anonymous data being used to create educational materials"
                checked={consentEducation}
                onChange={(e) => setConsentEducation(e.target.checked)}
              />
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Button
            onClick={() => handleContinue(false)}
            variant="outline"
            size="lg"
            disabled={!hasRead}
          >
            Do Not Save My Data
          </Button>
          <Button
            onClick={() => handleContinue(consentResearch || consentPublication || consentEducation)}
            size="lg"
            disabled={!hasRead}
            className={hasRead && (consentResearch || consentPublication || consentEducation) 
              ? 'bg-green-600 hover:bg-green-700' 
              : ''}
          >
            {consentResearch || consentPublication || consentEducation 
              ? 'Save My Data & Continue' 
              : 'Continue Without Saving'}
          </Button>
        </div>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          You will proceed to view your results and educational materials regardless of your choice.
        </p>
      </div>
    </Card>
  );
}; 