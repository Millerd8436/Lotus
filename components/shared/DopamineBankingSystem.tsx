"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Target, Zap, Gift, TrendingUp, Star, Heart, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RewardEvent {
  id: string;
  type: 'micro_win' | 'milestone' | 'streak' | 'discovery' | 'improvement';
  amount?: number;
  message: string;
  impact: 'small' | 'medium' | 'large';
  timestamp: Date;
  celebration: 'sparkle' | 'confetti' | 'pulse' | 'glow' | 'bounce';
}

interface ProgressiveMilestone {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  nextUnlock?: string;
  emotionalReward: string;
}

interface DopamineState {
  anticipationLevel: number;
  rewardSensitivity: number;
  engagementMomentum: number;
  habitStrength: number;
  positiveAssociations: number;
}

interface DopamineBankingSystemProps {
  loanAmount: number;
  userActions: string[];
  financialGoals: Array<{ goal: string; progress: number; target: number }>;
  onRewardTriggered: (reward: RewardEvent) => void;
  isActive: boolean;
}

export const DopamineBankingSystem: React.FC<DopamineBankingSystemProps> = ({
  loanAmount,
  userActions,
  financialGoals,
  onRewardTriggered,
  isActive
}) => {
  const [recentRewards, setRecentRewards] = useState<RewardEvent[]>([]);
  const [milestones, setMilestones] = useState<ProgressiveMilestone[]>([]);
  const [dopamineState, setDopamineState] = useState<DopamineState>({
    anticipationLevel: 0.6,
    rewardSensitivity: 0.7,
    engagementMomentum: 0.5,
    habitStrength: 0.4,
    positiveAssociations: 0.6
  });
  const [celebrationQueue, setCelebrationQueue] = useState<RewardEvent[]>([]);
  const [streakCount, setStreakCount] = useState(3);

  const rewardInterval = useRef<NodeJS.Timeout>();
  const celebrationTimeout = useRef<NodeJS.Timeout>();

  // Initialize progressive milestones based on 2025 behavioral finance research
  useEffect(() => {
    const progressiveMilestones: ProgressiveMilestone[] = [
      {
        id: 'first-interaction',
        title: 'Financial Explorer',
        description: 'First step into smart borrowing',
        progress: userActions.length,
        target: 1,
        reward: 'Unlock personalized insights',
        nextUnlock: 'Smart comparison tools',
        emotionalReward: 'You\'re taking control of your finances!'
      },
      {
        id: 'informed-decision',
        title: 'Informed Borrower',
        description: 'Reviewed all loan terms',
        progress: userActions.filter(action => action.includes('review')).length,
        target: 3,
        reward: 'Priority customer status',
        nextUnlock: 'Advanced financial planning tools',
        emotionalReward: 'Your careful research is paying off!'
      },
      {
        id: 'cost-conscious',
        title: 'Cost-Conscious Champion',
        description: 'Compared multiple loan options',
        progress: userActions.filter(action => action.includes('compare')).length,
        target: 2,
        reward: 'Exclusive rate notifications',
        nextUnlock: 'VIP customer benefits',
        emotionalReward: 'Smart shopping saves money!'
      },
      {
        id: 'goal-setter',
        title: 'Goal Achiever',
        description: 'Set clear financial objectives',
        progress: financialGoals.length,
        target: 1,
        reward: 'Personalized action plan',
        nextUnlock: 'AI financial coaching',
        emotionalReward: 'Goals turn dreams into reality!'
      }
    ];

    setMilestones(progressiveMilestones);
  }, [userActions, financialGoals]);

  // Dopamine-driven micro-celebration system
  const triggerMicroWin = (event: Omit<RewardEvent, 'id' | 'timestamp'>) => {
    const reward: RewardEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };

    setRecentRewards(prev => [reward, ...prev.slice(0, 4)]);
    setCelebrationQueue(prev => [...prev, reward]);
    onRewardTriggered(reward);

    // Update dopamine state based on reward
    setDopamineState(prev => ({
      ...prev,
      anticipationLevel: Math.min(1.0, prev.anticipationLevel + 0.1),
      engagementMomentum: Math.min(1.0, prev.engagementMomentum + 0.15),
      positiveAssociations: Math.min(1.0, prev.positiveAssociations + 0.05)
    }));
  };

  // Progressive reward system based on user behavior
  const analyzeUserBehavior = () => {
    const recentActions = userActions.slice(-5);
    
    // Detect positive patterns for micro-wins
    if (recentActions.includes('compare_rates')) {
      triggerMicroWin({
        type: 'micro_win',
        message: 'Smart rate comparison! You could save money.',
        impact: 'small',
        celebration: 'sparkle'
      });
    }

    if (recentActions.includes('read_terms')) {
      triggerMicroWin({
        type: 'discovery',
        message: 'Knowledge is power! Understanding terms protects you.',
        impact: 'medium',
        celebration: 'glow'
      });
    }

    // Check for milestone completion
    milestones.forEach(milestone => {
      if (milestone.progress >= milestone.target && milestone.progress === milestone.target) {
        triggerMicroWin({
          type: 'milestone',
          message: `🎉 Milestone: ${milestone.title} achieved!`,
          impact: 'large',
          celebration: 'confetti'
        });
      }
    });

    // Streak detection for habit formation
    const streakActions = ['daily_check', 'progress_review', 'goal_update'];
    const hasStreakAction = recentActions.some(action => streakActions.includes(action));
    
    if (hasStreakAction) {
      setStreakCount(prev => prev + 1);
      if (streakCount > 0 && streakCount % 3 === 0) {
        triggerMicroWin({
          type: 'streak',
          message: `🔥 ${streakCount} day streak! Habits are forming!`,
          impact: 'medium',
          celebration: 'pulse'
        });
      }
    }
  };

  // Anticipation-building system
  const buildAnticipation = () => {
    const nearCompleteMilestones = milestones.filter(m => 
      m.progress / m.target > 0.7 && m.progress < m.target
    );

    nearCompleteMilestones.forEach(milestone => {
      const remainingSteps = milestone.target - milestone.progress;
      if (remainingSteps <= 2) {
        // Create anticipation for upcoming rewards
        triggerMicroWin({
          type: 'discovery',
          message: `Almost there! ${remainingSteps} more step${remainingSteps > 1 ? 's' : ''} to unlock ${milestone.reward}`,
          impact: 'small',
          celebration: 'pulse'
        });
      }
    });
  };

  // Ethical dopamine regulation
  const regulateDopamineExposure = () => {
    // Prevent overstimulation by spacing rewards
    if (recentRewards.length > 3) {
      setDopamineState(prev => ({
        ...prev,
        rewardSensitivity: Math.max(0.3, prev.rewardSensitivity - 0.1)
      }));
    }

    // Natural dopamine recovery
    if (recentRewards.length === 0) {
      setDopamineState(prev => ({
        ...prev,
        rewardSensitivity: Math.min(1.0, prev.rewardSensitivity + 0.05)
      }));
    }
  };

  // Main dopamine system loop
  useEffect(() => {
    if (isActive) {
      rewardInterval.current = setInterval(() => {
        analyzeUserBehavior();
        buildAnticipation();
        regulateDopamineExposure();
      }, 3000);

      return () => {
        if (rewardInterval.current) {
          clearInterval(rewardInterval.current);
        }
      };
    }
  }, [isActive, userActions, milestones, recentRewards.length]);

  // Process celebration queue
  useEffect(() => {
    if (celebrationQueue.length > 0) {
      const nextCelebration = celebrationQueue[0];
      setCelebrationQueue(prev => prev.slice(1));

      // Auto-clear celebrations after display
      celebrationTimeout.current = setTimeout(() => {
        setRecentRewards(prev => prev.filter(r => r.id !== nextCelebration.id));
      }, 4000);
    }
  }, [celebrationQueue]);

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      {/* Dopamine State Visualization */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-sm font-medium text-white">Engagement Engine</h3>
          <div className="text-xs text-gray-400">Dopamine Banking Active</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Motivation</span>
              <span className="text-yellow-400">{Math.round(dopamineState.anticipationLevel * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                style={{ width: `${dopamineState.anticipationLevel * 100}%` }}
                animate={{ width: `${dopamineState.anticipationLevel * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Momentum</span>
              <span className="text-green-400">{Math.round(dopamineState.engagementMomentum * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                style={{ width: `${dopamineState.engagementMomentum * 100}%` }}
                animate={{ width: `${dopamineState.engagementMomentum * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Habit Strength</span>
              <span className="text-purple-400">{Math.round(dopamineState.habitStrength * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                style={{ width: `${dopamineState.habitStrength * 100}%` }}
                animate={{ width: `${dopamineState.habitStrength * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Positive Feelings</span>
              <span className="text-blue-400">{Math.round(dopamineState.positiveAssociations * 100)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                style={{ width: `${dopamineState.positiveAssociations * 100}%` }}
                animate={{ width: `${dopamineState.positiveAssociations * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Rewards Display */}
      <AnimatePresence>
        {recentRewards.map((reward) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden rounded-lg p-3 border ${
              reward.impact === 'large' ? 'bg-gradient-to-r from-gold-900/40 to-yellow-900/40 border-yellow-500/40' :
              reward.impact === 'medium' ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-500/40' :
              'bg-gradient-to-r from-green-900/40 to-teal-900/40 border-green-500/40'
            }`}
          >
            {/* Celebration Effects */}
            {reward.celebration === 'sparkle' && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: 2
                    }}
                  >
                    <Sparkles className="w-full h-full" />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="relative flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                reward.impact === 'large' ? 'bg-yellow-500/20' :
                reward.impact === 'medium' ? 'bg-blue-500/20' :
                'bg-green-500/20'
              }`}>
                {reward.type === 'milestone' && <Award className="w-4 h-4 text-yellow-400" />}
                {reward.type === 'streak' && <TrendingUp className="w-4 h-4 text-orange-400" />}
                {reward.type === 'micro_win' && <Star className="w-4 h-4 text-green-400" />}
                {reward.type === 'discovery' && <Target className="w-4 h-4 text-blue-400" />}
                {reward.type === 'improvement' && <Heart className="w-4 h-4 text-pink-400" />}
              </div>

              <div className="flex-1">
                <div className="text-white text-sm font-medium">
                  {reward.message}
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  {reward.timestamp.toLocaleTimeString()}
                </div>
              </div>

              {reward.amount && (
                <div className="text-right">
                  <div className="text-green-400 font-bold">
                    ${reward.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">saved</div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Progressive Milestones */}
      <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-4 border border-gray-500/30">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-medium text-white">Your Progress Journey</h3>
          {streakCount > 0 && (
            <div className="ml-auto flex items-center gap-1 text-xs text-orange-400">
              <TrendingUp className="w-3 h-3" />
              {streakCount} day streak
            </div>
          )}
        </div>

        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white text-sm font-medium">{milestone.title}</div>
                  <div className="text-gray-400 text-xs">{milestone.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-blue-400 text-sm font-mono">
                    {milestone.progress}/{milestone.target}
                  </div>
                  <div className="text-xs text-gray-400">
                    {Math.round((milestone.progress / milestone.target) * 100)}%
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                  style={{ width: `${Math.min(100, (milestone.progress / milestone.target) * 100)}%` }}
                  animate={{ width: `${Math.min(100, (milestone.progress / milestone.target) * 100)}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              {milestone.progress >= milestone.target ? (
                <div className="text-green-400 text-xs flex items-center gap-1">
                  <Gift className="w-3 h-3" />
                  Unlocked: {milestone.reward}
                </div>
              ) : (
                <div className="text-gray-400 text-xs">
                  Next: {milestone.nextUnlock}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ethical Notice */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded p-3">
        <div className="text-xs text-blue-300">
          💙 This dopamine system is designed to encourage healthy financial decisions. 
          All celebrations are based on actions that benefit your financial wellbeing.
        </div>
      </div>
    </div>
  );
}; 