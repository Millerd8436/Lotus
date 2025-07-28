"use client";

'use client';

import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Checkbox } from './Checkbox';

interface InformedConsentProps {
  onConsent: () => void;
}

export const InformedConsent: React.FC<InformedConsentProps> = ({ onConsent }) => {
  const [hasReadStudyPurpose, setHasReadStudyPurpose] = useState(false);
  const [hasReadDataCollection, setHasReadDataCollection] = useState(false);
  const [hasReadRisks, setHasReadRisks] = useState(false);
  const [hasReadRights, setHasReadRights] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [currentSection, setCurrentSection] = useState<'overview' | 'purpose' | 'procedures' | 'data' | 'risks' | 'rights' | 'consent'>('overview');

  const allSectionsRead = hasReadStudyPurpose && hasReadDataCollection && hasReadRisks && hasReadRights;

  const handleSectionComplete = (section: string) => {
    switch (section) {
      case 'purpose':
        setHasReadStudyPurpose(true);
        setCurrentSection('procedures');
        break;
      case 'procedures':
        setCurrentSection('data');
        break;
      case 'data':
        setHasReadDataCollection(true);
        setCurrentSection('risks');
        break;
      case 'risks':
        setHasReadRisks(true);
        setCurrentSection('rights');
        break;
      case 'rights':
        setHasReadRights(true);
        setCurrentSection('consent');
        break;
    }
  };

  const handleConsent = () => {
    if (consentGiven && allSectionsRead) {
      onConsent();
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'overview':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Research Study: Financial Decision-Making and Loan Comprehension
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                You are being invited to participate in a research study examining how people understand 
                and interact with different types of online loans. This study is being conducted to better 
                understand consumer financial decision-making and loan comprehension.
              </p>
              <p>
                Before you decide whether to participate, it's important that you understand why the research 
                is being done and what it will involve. Please take time to read the following information 
                carefully.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">⏱️ Time Commitment</h3>
                <p className="text-blue-800">
                  This study will take approximately 15-20 minutes to complete.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => setCurrentSection('purpose')} className="w-full">
                Continue to Study Details
              </Button>
            </div>
          </div>
        );

      case 'purpose':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Study Purpose</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>What is the purpose of this study?</strong>
              </p>
              <p>
                This research aims to understand how different interface designs and presentation styles 
                affect people's comprehension of loan terms, costs, and risks. We are studying various 
                types of short-term financial products including payday loans, installment loans, 
                earned wage advances, and buy-now-pay-later services.
              </p>
              <p>
                <strong>Why have I been invited?</strong>
              </p>
              <p>
                You have been invited because you are an adult who might encounter these types of 
                financial products online. We are seeking participants from diverse backgrounds to 
                understand how different people interact with these loan interfaces.
              </p>
              <p>
                <strong>What will the results be used for?</strong>
              </p>
              <p>
                The results may be used for academic research, policy recommendations, and to inform 
                better design practices for financial products. Findings may be published in academic 
                journals or presented at conferences, but your individual responses will remain anonymous.
              </p>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleSectionComplete('purpose')} className="w-full">
                I understand the study purpose
              </Button>
            </div>
          </div>
        );

      case 'procedures':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Study Procedures</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>What will I be asked to do?</strong>
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>
                  <strong>Financial Scenarios:</strong> You will be presented with realistic financial 
                  scenarios and asked to imagine yourself in those situations.
                </li>
                <li>
                  <strong>Loan Simulations:</strong> You will interact with 4 different loan application 
                  interfaces. These are simulations - no real money or credit applications are involved.
                </li>
                <li>
                  <strong>Comprehension Quizzes:</strong> After each simulation, you'll answer questions 
                  about the loan terms, costs, and your understanding of the product.
                </li>
                <li>
                  <strong>Comparison Tasks:</strong> You'll be asked to compare and rank the different 
                  loan options you experienced.
                </li>
                <li>
                  <strong>Final Questions:</strong> You'll complete a brief questionnaire about your 
                  overall experience and perceptions.
                </li>
              </ol>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ Important</h3>
                <p className="text-green-800">
                  These are simulations only. You will not be applying for real loans, providing real 
                  financial information, or entering into any financial agreements.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleSectionComplete('procedures')} className="w-full">
                I understand what I'll be asked to do
              </Button>
            </div>
          </div>
        );

      case 'data':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Collection & Privacy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>What data will be collected?</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your responses to quiz questions and surveys</li>
                <li>How you interact with the loan interfaces (clicks, scrolling, time spent)</li>
                <li>Basic demographic information (age range, education level, income range)</li>
                <li>Your device type and browser information</li>
                <li>Timestamps of your participation</li>
              </ul>
              
              <p>
                <strong>What data will NOT be collected?</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Real financial information (actual bank accounts, credit scores, etc.)</li>
                <li>Your name, address, or other personally identifying information</li>
                <li>Your IP address (this is anonymized)</li>
                <li>Information from other websites or your browsing history</li>
              </ul>

              <p>
                <strong>How will my data be protected?</strong>
              </p>
              <p>
                All data is collected anonymously and stored securely. Your responses are identified 
                only by a random study ID number. Data is encrypted during transmission and storage. 
                Only authorized research personnel have access to the data.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">🔒 Data Retention</h3>
                <p className="text-blue-800">
                  Research data will be retained for up to 7 years as required by research standards, 
                  then securely deleted. You can request data deletion at any time by contacting the 
                  research team.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleSectionComplete('data')} className="w-full">
                I understand how my data will be used
              </Button>
            </div>
          </div>
        );

      case 'risks':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Risks & Considerations</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Are there any risks to participating?</strong>
              </p>
              <p>
                The risks of participating in this study are minimal. However, please be aware of:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Time commitment:</strong> The study takes 15-20 minutes of your time.
                </li>
                <li>
                  <strong>Mild stress:</strong> Some financial scenarios may evoke mild stress as 
                  they involve imagining difficult financial situations.
                </li>
                <li>
                  <strong>Privacy considerations:</strong> While we protect your anonymity, no 
                  online activity is 100% secure.
                </li>
                <li>
                  <strong>Technical issues:</strong> Rare technical problems could require restarting 
                  the study.
                </li>
              </ul>

              <p>
                <strong>What if I experience discomfort?</strong>
              </p>
              <p>
                If any part of the study makes you uncomfortable, you can stop at any time without 
                penalty. If you have concerns about financial stress or need resources for financial 
                assistance, we can provide information about legitimate financial counseling services.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important Reminder</h3>
                <p className="text-yellow-800">
                  This study involves simulations only. Do not provide real financial information 
                  or apply for real loans during this study.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleSectionComplete('risks')} className="w-full">
                I understand the potential risks
              </Button>
            </div>
          </div>
        );

      case 'rights':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights as a Participant</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Participation in this study is entirely voluntary. You have the following rights:
              </p>
              
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>
                  <strong>Right to withdraw:</strong> You can stop participating at any time, 
                  for any reason, without penalty or explanation.
                </li>
                <li>
                  <strong>Right to skip questions:</strong> You can choose not to answer any 
                  specific questions that make you uncomfortable.
                </li>
                <li>
                  <strong>Right to your data:</strong> You can request information about what 
                  data has been collected about you.
                </li>
                <li>
                  <strong>Right to data deletion:</strong> You can request that your data be 
                  deleted from the study at any time.
                </li>
                <li>
                  <strong>Right to ask questions:</strong> You can contact the research team 
                  with questions about the study, your rights, or concerns.
                </li>
              </ul>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">📞 Contact Information</h3>
                <p className="text-gray-700 text-sm">
                  If you have questions about this study, your rights as a participant, or wish to 
                  report concerns, you can contact:<br/>
                  Research Team: [research-team@institution.edu]<br/>
                  IRB Office: [irb@institution.edu]<br/>
                  Study ID: LOTUS-2024-001
                </p>
              </div>

              <p>
                <strong>What happens if I decide not to participate or withdraw?</strong>
              </p>
              <p>
                There are no consequences for choosing not to participate or for withdrawing from 
                the study. Your decision will not affect any services or benefits you may receive.
              </p>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleSectionComplete('rights')} className="w-full">
                I understand my rights
              </Button>
            </div>
          </div>
        );

      case 'consent':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Consent to Participate</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                By providing your consent below, you indicate that:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You have read and understood the information about this study</li>
                <li>You understand the purpose, procedures, and potential risks</li>
                <li>You know that participation is voluntary</li>
                <li>You understand your rights as a participant</li>
                <li>You consent to participate in this research study</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
                <h3 className="font-semibold text-blue-900 mb-2">📋 Study Summary</h3>
                <div className="text-blue-800 text-sm space-y-1">
                  <p><strong>Study:</strong> Financial Decision-Making and Loan Comprehension</p>
                  <p><strong>Time:</strong> 15-20 minutes</p>
                  <p><strong>Activities:</strong> 4 loan simulations + comprehension quizzes</p>
                  <p><strong>Risks:</strong> Minimal (mild stress from financial scenarios)</p>
                  <p><strong>Benefits:</strong> Contributing to financial literacy research</p>
                  <p><strong>Confidentiality:</strong> Anonymous data collection</p>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <label className="flex items-start space-x-3">
                  <Checkbox
                    checked={consentGiven}
                    onChange={setConsentGiven}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    <strong>I consent to participate in this research study.</strong><br/>
                    I confirm that I am at least 18 years old, have read and understood the 
                    information provided, and voluntarily agree to participate in this research.
                  </span>
                </label>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <Button 
                onClick={handleConsent}
                disabled={!consentGiven || !allSectionsRead}
                className="w-full"
              >
                {consentGiven && allSectionsRead ? 
                  'Begin Study' : 
                  'Please read all sections and provide consent'
                }
              </Button>
              <p className="text-center text-xs text-gray-500">
                By clicking "Begin Study," you provide your informed consent to participate.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-center space-x-2">
          {['overview', 'purpose', 'procedures', 'data', 'risks', 'rights', 'consent'].map((section, index) => (
            <div
              key={section}
              className={`w-3 h-3 rounded-full ${
                section === currentSection ? 'bg-blue-600' :
                (index < ['overview', 'purpose', 'procedures', 'data', 'risks', 'rights', 'consent'].indexOf(currentSection)) ? 'bg-green-500' :
                'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Section {['overview', 'purpose', 'procedures', 'data', 'risks', 'rights', 'consent'].indexOf(currentSection) + 1} of 7
        </p>
      </div>

      <Card className="p-8">
        {renderSection()}
      </Card>
    </div>
  );
}; 
