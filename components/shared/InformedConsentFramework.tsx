"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, Database, Users, AlertTriangle, CheckCircle, FileText, Clock } from 'lucide-react';

interface ConsentData {
  participantId: string;
  timestamp: string;
  consents: {
    participationConsent: boolean;
    dataCollectionConsent: boolean;
    behaviorTrackingConsent: boolean;
    researchPurposeConsent: boolean;
    futureContactConsent: boolean;
    dataRetentionConsent: boolean;
  };
  demographics: {
    ageRange: string;
    hasUsedPaydayLoans: boolean;
    hasUsedBNPL: boolean;
    hasUsedEWA: boolean;
    financialStressLevel: string;
  };
  timeSpentReading: number;
}

interface InformedConsentFrameworkProps {
  onComplete: (consentData: ConsentData) => void;
  studyVersion: string;
  institutionInfo: {
    name: string;
    irb: string;
    principalInvestigator: string;
    contactEmail: string;
  };
}

const InformedConsentFramework: React.FC<InformedConsentFrameworkProps> = ({
  onComplete,
  studyVersion,
  institutionInfo
}) => {
  const [step, setStep] = useState(0);
  const [startTime] = useState(Date.now());
  const [consents, setConsents] = useState({
    participationConsent: false,
    dataCollectionConsent: false,
    behaviorTrackingConsent: false,
    researchPurposeConsent: false,
    futureContactConsent: false,
    dataRetentionConsent: false
  });
  const [demographics, setDemographics] = useState({
    ageRange: '',
    hasUsedPaydayLoans: false,
    hasUsedBNPL: false,
    hasUsedEWA: false,
    financialStressLevel: ''
  });

  const generateParticipantId = () => {
    return `LRP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleComplete = () => {
    const consentData: ConsentData = {
      participantId: generateParticipantId(),
      timestamp: new Date().toISOString(),
      consents,
      demographics,
      timeSpentReading: Date.now() - startTime
    };
    onComplete(consentData);
  };

  const allRequiredConsentsGiven = () => {
    return consents.participationConsent && 
           consents.dataCollectionConsent && 
           consents.behaviorTrackingConsent && 
           consents.researchPurposeConsent;
  };

  const steps = [
    {
      title: "Research Study Information",
      component: <StudyOverview />
    },
    {
      title: "What We're Testing (Independent Variables)",
      component: <IndependentVariablesDisclosure />
    },
    {
      title: "What We're Measuring (Dependent Variables)", 
      component: <DependentVariablesDisclosure />
    },
    {
      title: "Data Collection & Privacy",
      component: <DataCollectionDisclosure />
    },
    {
      title: "Your Rights & Consent",
      component: <ConsentForm consents={consents} setConsents={setConsents} />
    },
    {
      title: "Demographics (Optional)",
      component: <DemographicsForm demographics={demographics} setDemographics={setDemographics} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Financial Product Research Study</h1>
              <p className="text-gray-600">Informed Consent Process</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Step {step + 1} of {steps.length}</div>
              <div className="text-lg font-semibold text-blue-600">
                {Math.round(((step + 1) / steps.length) * 100)}% Complete
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center space-x-3">
                  <FileText className="w-6 h-6" />
                  <span>{steps[step].title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {steps[step].component}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            variant="outline"
            className="px-6"
          >
            ← Previous
          </Button>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Reading time: {Math.round((Date.now() - startTime) / 1000)}s</span>
          </div>
          
          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="px-6"
            >
              Next →
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!allRequiredConsentsGiven()}
              className="px-8 bg-green-600 hover:bg-green-700"
            >
              {allRequiredConsentsGiven() ? 'Begin Study →' : 'Complete Required Consents'}
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 text-sm text-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <strong>Institution:</strong><br />
              {institutionInfo.name}
            </div>
            <div>
              <strong>Principal Investigator:</strong><br />
              {institutionInfo.principalInvestigator}
            </div>
            <div>
              <strong>IRB Approval:</strong><br />
              {institutionInfo.irb}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <strong>Contact:</strong> {institutionInfo.contactEmail} | <strong>Study Version:</strong> {studyVersion}
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual step components
const StudyOverview: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-blue-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">Study Purpose</h3>
      <p className="text-blue-700 leading-relaxed">
        We are conducting research to understand how different types of loan products are presented online 
        and how people understand and interact with these financial products. This research will help inform 
        policy discussions about consumer financial protection and fair lending practices.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-green-50 p-5 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <Users className="w-6 h-6 text-green-600" />
          <h4 className="font-semibold text-green-800">What You'll Do</h4>
        </div>
        <ul className="text-green-700 space-y-2 text-sm">
          <li>• Experience 4 realistic loan simulators (about 15 minutes total)</li>
          <li>• Answer questions about each loan experience</li>
          <li>• Complete a brief final questionnaire</li>
          <li>• Learn about loan alternatives and financial resources</li>
        </ul>
      </div>
      
      <div className="bg-amber-50 p-5 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <h4 className="font-semibold text-amber-800">Important Notes</h4>
        </div>
        <ul className="text-amber-700 space-y-2 text-sm">
          <li>• These are simulations - no real money or loans involved</li>
          <li>• Participation is completely voluntary</li>
          <li>• You can withdraw at any time without penalty</li>
          <li>• All data is confidential and anonymized</li>
        </ul>
      </div>
    </div>
  </div>
);

const IndependentVariablesDisclosure: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-purple-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-purple-800 mb-3">What We're Testing (Independent Variables)</h3>
      <p className="text-purple-700 mb-4">
        We want to be transparent about what aspects of the loan presentations we're studying:
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-purple-200">
        <CardContent className="p-5">
          <h4 className="font-semibold text-gray-800 mb-3">Loan Type Differences</h4>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>• <strong>Payday loans:</strong> Short-term, high-fee loans</li>
            <li>• <strong>Earned wage access:</strong> Early access to earned wages</li>
            <li>• <strong>Buy-now-pay-later:</strong> Split payment arrangements</li>
            <li>• <strong>Installment loans:</strong> Longer-term monthly payments</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-purple-200">
        <CardContent className="p-5">
          <h4 className="font-semibold text-gray-800 mb-3">Presentation Elements</h4>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>• How fees and costs are displayed</li>
            <li>• Timing and urgency messaging</li>
            <li>• Trust badges and security claims</li>
            <li>• Application flow and consent processes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
    
    <div className="bg-purple-100 p-4 rounded-lg">
      <p className="text-purple-800 text-sm">
        <strong>Note:</strong> Each loan simulator reflects authentic design patterns found on real lending websites. 
        We are not manipulating these presentations for experimental purposes - we are studying how they naturally differ.
      </p>
    </div>
  </div>
);

const DependentVariablesDisclosure: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-green-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-3">What We're Measuring (Dependent Variables)</h3>
      <p className="text-green-700 mb-4">
        We'll collect several types of data to understand your experience with each loan simulator:
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-green-200">
        <CardContent className="p-5">
          <div className="flex items-center space-x-2 mb-3">
            <Eye className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-800">Behavioral Data</h4>
          </div>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Time spent on each page</li>
            <li>• What you click on</li>
            <li>• Scroll patterns</li>
            <li>• Form completion patterns</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-green-200">
        <CardContent className="p-5">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-800">Comprehension</h4>
          </div>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Understanding of costs</li>
            <li>• Recognition of loan terms</li>
            <li>• Awareness of fees and risks</li>
            <li>• Timeline comprehension</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-green-200">
        <CardContent className="p-5">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-800">Perceptions</h4>
          </div>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Trust in the lender</li>
            <li>• Perceived fairness</li>
            <li>• Likelihood to recommend</li>
            <li>• Overall satisfaction</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

const DataCollectionDisclosure: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-blue-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">Data Collection & Privacy</h3>
      <p className="text-blue-700">
        We take your privacy seriously. Here's exactly what data we collect and how we protect it:
      </p>
    </div>
    
    <div className="space-y-4">
      <Card className="border-blue-200">
        <CardContent className="p-5">
          <div className="flex items-center space-x-3 mb-3">
            <Database className="w-6 h-6 text-blue-600" />
            <h4 className="font-semibold text-gray-800">Data We Collect</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-gray-700">Automatic Collection:</strong>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• Mouse movements and clicks</li>
                <li>• Time stamps and duration</li>
                <li>• Scroll depth and patterns</li>
                <li>• Page navigation sequence</li>
              </ul>
            </div>
            <div>
              <strong className="text-gray-700">Your Responses:</strong>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• Quiz answers</li>
                <li>• Rating scale responses</li>
                <li>• Open-ended feedback</li>
                <li>• Demographic information (optional)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-blue-200">
        <CardContent className="p-5">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <h4 className="font-semibold text-gray-800">Privacy Protection</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-gray-700">Data Security:</strong>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• Encrypted data transmission</li>
                <li>• Secure server storage</li>
                <li>• Access limited to research team</li>
                <li>• No personal identifiers stored</li>
              </ul>
            </div>
            <div>
              <strong className="text-gray-700">Your Rights:</strong>
              <ul className="text-gray-600 mt-1 space-y-1">
                <li>• Withdraw at any time</li>
                <li>• Request data deletion</li>
                <li>• Access your data</li>
                <li>• Contact us with questions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ConsentForm: React.FC<{
  consents: any;
  setConsents: (consents: any) => void;
}> = ({ consents, setConsents }) => (
  <div className="space-y-6">
    <div className="bg-amber-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-amber-800 mb-3">Your Consent</h3>
      <p className="text-amber-700">
        Please indicate your consent for each aspect of the study. Required items are marked with *.
      </p>
    </div>
    
    <div className="space-y-4">
      <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={consents.participationConsent}
            onChange={(checked) => setConsents({...consents, participationConsent: checked})}
            className="mt-1"
          />
          <div>
            <label className="font-medium text-red-800">
              * I consent to participate in this research study
            </label>
            <p className="text-sm text-red-700 mt-1">
              I understand the purpose, procedures, and my rights as described above.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={consents.dataCollectionConsent}
            onChange={(checked) => setConsents({...consents, dataCollectionConsent: checked})}
            className="mt-1"
          />
          <div>
            <label className="font-medium text-red-800">
              * I consent to the collection of my interaction data and responses
            </label>
            <p className="text-sm text-red-700 mt-1">
              This includes behavioral tracking, quiz responses, and timing data.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={consents.behaviorTrackingConsent}
            onChange={(checked) => setConsents({...consents, behaviorTrackingConsent: checked})}
            className="mt-1"
          />
          <div>
            <label className="font-medium text-red-800">
              * I consent to behavioral tracking (mouse movements, clicks, scroll patterns)
            </label>
            <p className="text-sm text-red-700 mt-1">
              This data helps us understand how people interact with loan interfaces.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-2 border-red-200 rounded-lg bg-red-50">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={consents.researchPurposeConsent}
            onChange={(checked) => setConsents({...consents, researchPurposeConsent: checked})}
            className="mt-1"
          />
          <div>
            <label className="font-medium text-red-800">
              * I consent to use of my data for research purposes and potential publication
            </label>
            <p className="text-sm text-red-700 mt-1">
              Data will be anonymized and aggregated. No individual responses will be identifiable.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={consents.futureContactConsent}
            onChange={(checked) => setConsents({...consents, futureContactConsent: checked})}
            className="mt-1"
          />
          <div>
            <label className="font-medium text-gray-700">
              I consent to be contacted for future related research (optional)
            </label>
            <p className="text-sm text-gray-600 mt-1">
              We may invite you to participate in follow-up studies on similar topics.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={consents.dataRetentionConsent}
            onChange={(checked) => setConsents({...consents, dataRetentionConsent: checked})}
            className="mt-1"
          />
          <div>
            <label className="font-medium text-gray-700">
              I consent to data retention for up to 7 years (optional)
            </label>
            <p className="text-sm text-gray-600 mt-1">
              Allows for long-term analysis and replication. Data remains anonymized.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DemographicsForm: React.FC<{
  demographics: any;
  setDemographics: (demographics: any) => void;
}> = ({ demographics, setDemographics }) => (
  <div className="space-y-6">
    <div className="bg-green-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-3">Demographics (Optional)</h3>
      <p className="text-green-700">
        This information helps us understand if different groups have different experiences with loan products.
        All responses are optional and will be kept confidential.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
        <select
          value={demographics.ageRange}
          onChange={(e) => setDemographics({...demographics, ageRange: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select age range</option>
          <option value="18-24">18-24</option>
          <option value="25-34">25-34</option>
          <option value="35-44">35-44</option>
          <option value="45-54">45-54</option>
          <option value="55-64">55-64</option>
          <option value="65+">65+</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Financial Stress Level</label>
        <select
          value={demographics.financialStressLevel}
          onChange={(e) => setDemographics({...demographics, financialStressLevel: e.target.value})}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select stress level</option>
          <option value="low">Low - Comfortable financially</option>
          <option value="moderate">Moderate - Some financial concerns</option>
          <option value="high">High - Significant financial stress</option>
        </select>
      </div>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Previous Experience with These Loan Types (check all that apply):
      </label>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={demographics.hasUsedPaydayLoans}
            onChange={(checked) => setDemographics({...demographics, hasUsedPaydayLoans: checked})}
          />
          <label className="text-sm text-gray-700">Payday loans or cash advances</label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={demographics.hasUsedBNPL}
            onChange={(checked) => setDemographics({...demographics, hasUsedBNPL: checked})}
          />
          <label className="text-sm text-gray-700">Buy-now-pay-later services (Klarna, Afterpay, etc.)</label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={demographics.hasUsedEWA}
            onChange={(checked) => setDemographics({...demographics, hasUsedEWA: checked})}
          />
          <label className="text-sm text-gray-700">Earned wage access (Earnin, DailyPay, etc.)</label>
        </div>
      </div>
    </div>
  </div>
);

export default InformedConsentFramework; 