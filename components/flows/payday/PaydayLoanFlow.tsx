// components/flows/payday/PaydayLoanFlow.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useBehaviorTracking } from '@/components/providers/BehaviorTrackingProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Label } from '@/components/shared';
import { Checkbox } from '@/components/shared/Checkbox';
import { CollapsibleSection } from '@/components/shared/CollapsibleSection';
import { UrgencyTimer } from '@/components/shared/UrgencyTimer';
import { RealTimeAnalytics } from '@/components/shared/RealTimeAnalytics';
import { AuthenticFinancialMessaging } from '@/components/shared/AuthenticFinancialMessaging';
import { MarketDataSimulator } from '@/components/shared/MarketDataSimulator';
import { PersonaBasedSimulation } from '@/components/shared/PersonaBasedSimulation';
import { NeuroeconomicBehaviorEngine } from '@/components/shared/NeuroeconomicBehaviorEngine';
import { SpatialComputingInterface } from '@/components/shared/SpatialComputingInterface';
import { DopamineBankingSystem } from '@/components/shared/DopamineBankingSystem';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, Eye, Brain, Zap, Sparkles } from 'lucide-react';

interface PaydayLoanState {
  loanAmount: number;
  purpose: string;
  emergencyType: string;
  timeToRepay: number;
  employmentVerified: boolean;
  agreedToTerms: boolean;
  understandsRisks: boolean;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  currentStep: number;
}

export const PaydayLoanFlow: React.FC = () => {
  const [loanState, setLoanState] = useState<PaydayLoanState>({
    loanAmount: 300,
    purpose: '',
    emergencyType: '',
    timeToRepay: 14,
    employmentVerified: false,
    agreedToTerms: false,
    understandsRisks: false,
    urgencyLevel: 'medium',
    currentStep: 1
  });

  const [userActions, setUserActions] = useState<string[]>([]);
  const [spatialMode, setSpatialMode] = useState<'ar' | 'vr' | 'mixed'>('ar');
  const [enabledEnhancements, setEnabledEnhancements] = useState({
    neuroeconomic: true,
    spatial: true,
    dopamine: true,
    realtime: true,
    authentic: true,
    market: true,
    persona: true
  });

  const behaviorContext = useBehaviorTracking();
  const stepRefs = useRef<HTMLDivElement[]>([]);

  // Calculate realistic APR and fees based on 2025 market research
  const apr = 391.07; // Typical payday loan APR in 2025
  const fee = Math.round(loanState.loanAmount * 0.15); // 15% fee
  const totalRepayment = loanState.loanAmount + fee;
  const dailyRate = apr / 365;

  // Financial goals for dopamine system
  const financialGoals = [
    { goal: 'Emergency fund', progress: 0, target: 500 },
    { goal: 'Credit improvement', progress: 20, target: 100 },
    { goal: 'Financial literacy', progress: userActions.length, target: 10 }
  ];

  // Track user actions for behavioral analysis
  const trackAction = (action: string) => {
    setUserActions(prev => [...prev, action]);
    behaviorContext?.recordEvent({
      type: 'user_action',
      data: { action, timestamp: Date.now(), step: loanState.currentStep }
    });
  };

  // Update loan state with tracking
  const updateLoanState = (updates: Partial<PaydayLoanState>) => {
    setLoanState(prev => ({ ...prev, ...updates }));
    trackAction(`update_${Object.keys(updates)[0]}`);
  };

  // Enhanced decision context for neuroeconomic analysis
  const decisionContext = {
    loanAmount: loanState.loanAmount,
    apr: apr,
    timeStress: loanState.urgencyLevel === 'high' || loanState.urgencyLevel === 'critical',
    socialPressure: loanState.emergencyType === 'family' || loanState.emergencyType === 'social',
    cognitiveComplexity: 'high' as const,
    priming: ['emergency', 'urgent', 'fast_cash', 'financial_stress']
  };

  // Spatial computing loan data
  const spatialLoanData = {
    amount: loanState.loanAmount,
    apr: apr,
    term: loanState.timeToRepay,
    payments: totalRepayment
  };

  const handleSpatialInteraction = (elementId: string, interaction: string) => {
    trackAction(`spatial_${elementId}_${interaction}`);
    console.log('Spatial interaction:', elementId, interaction);
  };

  const handleRewardTriggered = (reward: any) => {
    console.log('Dopamine reward triggered:', reward);
    trackAction(`reward_${reward.type}`);
  };

  const handleNeuroProfileUpdate = (profile: any) => {
    console.log('Neuroeconomic profile updated:', profile);
    
    // Adjust UI based on stress level
    if (profile.stressLevel > 0.7) {
      setLoanState(prev => ({ ...prev, urgencyLevel: 'critical' }));
    }
  };

  // Progress to next step with enhanced tracking
  const nextStep = () => {
    if (loanState.currentStep < 4) {
      setLoanState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      trackAction(`advance_to_step_${loanState.currentStep + 1}`);
    }
  };

  const prevStep = () => {
    if (loanState.currentStep > 1) {
      setLoanState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
      trackAction(`return_to_step_${loanState.currentStep - 1}`);
    }
  };

  // 2025 Enhancement Controls
  const toggleEnhancement = (enhancement: keyof typeof enabledEnhancements) => {
    setEnabledEnhancements(prev => ({
      ...prev,
      [enhancement]: !prev[enhancement]
    }));
    trackAction(`toggle_${enhancement}_${!enabledEnhancements[enhancement]}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 2025 Enhancement Controls */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            2025 Realism Enhancements
          </CardTitle>
          <CardDescription>
            Advanced behavioral simulation using cutting-edge web research
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(enabledEnhancements).map(([key, enabled]) => (
              <label key={key} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={enabled}
                  onCheckedChange={() => toggleEnhancement(key as keyof typeof enabledEnhancements)}
                />
                <span className="text-sm text-white capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {enabled && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
              </label>
            ))}
          </div>

          {/* Spatial Computing Mode Selector */}
          <div className="mt-4 flex gap-2">
            <span className="text-sm text-gray-300">XR Mode:</span>
            {(['ar', 'vr', 'mixed'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSpatialMode(mode)}
                className={`px-3 py-1 rounded text-xs ${
                  spatialMode === mode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Loan Flow */}
        <div className="lg:col-span-2 space-y-6">
          {/* Urgency Timer */}
          <UrgencyTimer 
            urgencyLevel={loanState.urgencyLevel}
            timeRemaining={3600}
            onUrgencyChange={(level) => updateLoanState({ urgencyLevel: level })}
          />

          {/* Step Content */}
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle>
                Step {loanState.currentStep} of 4: {
                  loanState.currentStep === 1 ? 'Emergency Details' :
                  loanState.currentStep === 2 ? 'Loan Terms' :
                  loanState.currentStep === 3 ? 'Verification' : 'Final Agreement'
                }
              </CardTitle>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full"
                  style={{ width: `${(loanState.currentStep / 4) * 100}%` }}
                  animate={{ width: `${(loanState.currentStep / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {loanState.currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="loanAmount">How much do you need?</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanState.loanAmount}
                      onChange={(e) => updateLoanState({ loanAmount: parseInt(e.target.value) || 0 })}
                      min="50"
                      max="1000"
                      step="25"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="purpose">What's this for?</Label>
                    <select
                      id="purpose"
                      value={loanState.purpose}
                      onChange={(e) => updateLoanState({ purpose: e.target.value })}
                      className="mt-1 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
                    >
                      <option value="">Select emergency type...</option>
                      <option value="medical">Medical emergency</option>
                      <option value="car">Car repair</option>
                      <option value="rent">Rent/bills</option>
                      <option value="family">Family emergency</option>
                      <option value="other">Other urgent expense</option>
                    </select>
                  </div>

                  {loanState.purpose && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded"
                    >
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm font-medium">Consider alternatives first</span>
                      </div>
                      <p className="text-xs text-yellow-300 mt-1">
                        Have you explored other options like asking family, employer advance, or community assistance?
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {loanState.currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-red-900/20 border border-red-500/30 rounded p-4">
                    <h3 className="text-red-400 font-medium mb-2">Loan Terms - READ CAREFULLY</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Loan Amount:</span>
                        <span className="font-mono">${loanState.loanAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Finance Charge:</span>
                        <span className="font-mono text-red-400">${fee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total to Repay:</span>
                        <span className="font-mono text-red-400 font-bold">${totalRepayment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>APR:</span>
                        <span className="font-mono text-red-400 font-bold">{apr}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Due Date:</span>
                        <span className="font-mono">{loanState.timeToRepay} days</span>
                      </div>
                    </div>
                  </div>

                  <CollapsibleSection 
                    title="Important Disclosures" 
                    defaultOpen={false}
                    onToggle={() => trackAction('read_terms')}
                  >
                    <div className="text-xs text-gray-300 space-y-2">
                      <p>This is a short-term, high-cost loan. It should only be used for emergency expenses.</p>
                      <p>If you cannot repay on time, you may face additional fees and collection actions.</p>
                      <p>Consider other options: employer advance, credit union loan, family assistance.</p>
                    </div>
                  </CollapsibleSection>
                </motion.div>
              )}

              {loanState.currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={loanState.employmentVerified}
                        onCheckedChange={(checked) => updateLoanState({ employmentVerified: !!checked })}
                      />
                      <span className="text-sm">I verify my employment and income</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={loanState.understandsRisks}
                        onCheckedChange={(checked) => updateLoanState({ understandsRisks: !!checked })}
                      />
                      <span className="text-sm">I understand this is an expensive form of credit</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={loanState.agreedToTerms}
                        onCheckedChange={(checked) => updateLoanState({ agreedToTerms: !!checked })}
                      />
                      <span className="text-sm">I agree to the loan terms and conditions</span>
                    </label>
                  </div>
                </motion.div>
              )}

              {loanState.currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-green-900/20 border border-green-500/30 rounded p-4">
                    <h3 className="text-green-400 font-medium mb-2">Review Your Application</h3>
                    <div className="space-y-2 text-sm">
                      <div>Purpose: {loanState.purpose}</div>
                      <div>Amount: ${loanState.loanAmount}</div>
                      <div>Due in: {loanState.timeToRepay} days</div>
                      <div>Total cost: ${totalRepayment}</div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-4">
                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">Last chance to reconsider</span>
                    </div>
                    <p className="text-xs text-yellow-300">
                      This loan will cost you ${fee} for a {loanState.timeToRepay}-day loan. 
                      Are you sure you cannot wait or find another solution?
                    </p>
                  </div>
                </motion.div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={loanState.currentStep === 1}
              >
                Previous
              </Button>
              
              <Button 
                onClick={nextStep}
                disabled={
                  loanState.currentStep === 4 && 
                  (!loanState.agreedToTerms || !loanState.understandsRisks || !loanState.employmentVerified)
                }
              >
                {loanState.currentStep === 4 ? 'Submit Application' : 'Continue'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Enhanced Realism Panel */}
        <div className="space-y-4">
          {/* Neuroeconomic Behavior Engine */}
          {enabledEnhancements.neuroeconomic && (
            <NeuroeconomicBehaviorEngine
              loanType="Payday"
              context={decisionContext}
              onBehaviorUpdate={handleNeuroProfileUpdate}
              isActive={true}
            />
          )}

          {/* Dopamine Banking System */}
          {enabledEnhancements.dopamine && (
            <DopamineBankingSystem
              loanAmount={loanState.loanAmount}
              userActions={userActions}
              financialGoals={financialGoals}
              onRewardTriggered={handleRewardTriggered}
              isActive={true}
            />
          )}

          {/* Real-Time Analytics */}
          {enabledEnhancements.realtime && (
            <RealTimeAnalytics
              pageContext="payday_loan_flow"
              onAnalyticsUpdate={(analytics) => console.log('Analytics update:', analytics)}
            >
              <div className="p-3 bg-gray-800/30 rounded text-xs text-gray-400">
                Live behavioral tracking active
              </div>
            </RealTimeAnalytics>
          )}

          {/* Authentic Financial Messaging */}
          {enabledEnhancements.authentic && (
            <AuthenticFinancialMessaging
              loanType="Payday"
              loanAmount={loanState.loanAmount}
              apr={apr}
              currentStep={`step_${loanState.currentStep}`}
              userProfile={{
                hasReadTerms: userActions.includes('read_terms'),
                timeOnPage: userActions.length * 15,
                urgencyLevel: loanState.urgencyLevel
              }}
            />
          )}

          {/* Market Data Simulator */}
          {enabledEnhancements.market && (
            <MarketDataSimulator
              loanType="Payday"
              loanAmount={loanState.loanAmount}
              currentAPR={apr}
              showCompetitors={true}
              showTrends={true}
              onRateUpdate={(newRate) => console.log('Market rate update:', newRate)}
            />
          )}

          {/* Persona-Based Simulation */}
          {enabledEnhancements.persona && (
            <PersonaBasedSimulation
              onPersonaSelected={(persona) => {
                console.log('Persona selected:', persona);
                trackAction(`persona_${persona.archetype}`);
              }}
            />
          )}
        </div>
      </div>

      {/* Spatial Computing Interface */}
      {enabledEnhancements.spatial && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" />
              Spatial Computing Preview
            </CardTitle>
            <CardDescription>
              Experience the future of financial interfaces in XR
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SpatialComputingInterface
              mode={spatialMode}
              loanData={spatialLoanData}
              onInteraction={handleSpatialInteraction}
              isActive={true}
            />
          </CardContent>
        </Card>
      )}

      {/* User Actions Log */}
      <Card className="bg-gray-900/40">
        <CardHeader>
          <CardTitle className="text-sm">Research Data Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-400 space-y-1">
            <div>Actions tracked: {userActions.length}</div>
            <div>Current step: {loanState.currentStep}/4</div>
            <div>Time on page: {userActions.length * 15}s (simulated)</div>
            <div>Urgency level: {loanState.urgencyLevel}</div>
            <div>Latest actions: {userActions.slice(-3).join(', ') || 'None yet'}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 