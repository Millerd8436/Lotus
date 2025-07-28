"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Info, DollarSign, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinancialMessage {
  id: string;
  type: 'regulatory' | 'warning' | 'promotional' | 'disclosure' | 'contextual';
  severity: 'low' | 'medium' | 'high' | 'critical';
  content: string;
  triggerCondition?: string;
  dismissible: boolean;
  required: boolean;
  delay?: number;
}

interface AuthenticFinancialMessagingProps {
  loanType: 'Payday' | 'Installment' | 'EWA' | 'BNPL';
  loanAmount: number;
  apr: number;
  currentStep: string;
  userBehavior?: {
    rushingThroughSteps: boolean;
    lowScrollDepth: boolean;
    frequentTabSwitching: boolean;
  };
  onMessageInteraction?: (messageId: string, action: 'viewed' | 'dismissed' | 'expanded') => void;
}

export const AuthenticFinancialMessaging: React.FC<AuthenticFinancialMessagingProps> = ({
  loanType,
  loanAmount,
  apr,
  currentStep,
  userBehavior,
  onMessageInteraction
}) => {
  const [activeMessages, setActiveMessages] = useState<FinancialMessage[]>([]);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());

  // Generate realistic financial messages based on loan type and context
  const generateMessages = (): FinancialMessage[] => {
    const messages: FinancialMessage[] = [];

    // Regulatory disclosures (required by law)
    if (loanType === 'Payday') {
      messages.push({
        id: 'payday-regulatory-1',
        type: 'regulatory',
        severity: 'critical',
        content: `IMPORTANT NOTICE: This is a short-term loan with a ${apr.toFixed(0)}% APR. For a ${loanAmount} loan, you will pay back $${(loanAmount * (1 + (apr/100) * (14/365))).toFixed(2)} in 14 days. If you cannot repay on time, additional fees may apply.`,
        dismissible: false,
        required: true
      });
      
      messages.push({
        id: 'payday-warning-1',
        type: 'warning',
        severity: 'high',
        content: 'Payday loans should only be used for short-term financial needs, not as a long-term financial solution. Consider alternatives like borrowing from family or friends, asking your employer for an advance, or seeking financial counseling.',
        dismissible: true,
        required: true,
        delay: 10000 // Show after 10 seconds
      });
    }

    if (loanType === 'BNPL') {
      messages.push({
        id: 'bnpl-regulatory-1',
        type: 'regulatory',
        severity: 'medium',
        content: 'Buy Now, Pay Later arrangements can impact your credit score if payments are missed. Late fees may apply. This credit agreement is subject to status.',
        dismissible: false,
        required: true
      });
    }

    if (loanType === 'EWA') {
      messages.push({
        id: 'ewa-disclosure-1',
        type: 'disclosure',
        severity: 'medium',
        content: 'Early wage access is not a loan. Tips are voluntary but help us provide this service. Frequent use may indicate underlying financial distress.',
        dismissible: true,
        required: false
      });
    }

    // Contextual warnings based on user behavior
    if (userBehavior?.rushingThroughSteps) {
      messages.push({
        id: 'behavior-warning-1',
        type: 'warning',
        severity: 'high',
        content: 'Take your time to review the terms and conditions. Understanding your financial obligations is important for your financial health.',
        dismissible: true,
        required: false,
        delay: 5000
      });
    }

    if (userBehavior?.lowScrollDepth && currentStep === 'terms') {
      messages.push({
        id: 'behavior-warning-2',
        type: 'contextual',
        severity: 'medium',
        content: 'Important terms and conditions appear below. Please scroll down to review all disclosure information.',
        dismissible: true,
        required: false,
        delay: 15000
      });
    }

    // High-risk amount warnings
    if (loanAmount > 300 && loanType === 'Payday') {
      messages.push({
        id: 'amount-warning-1',
        type: 'warning',
        severity: 'high',
        content: `You're requesting a substantial amount ($${loanAmount}). Consider borrowing only what you absolutely need and can afford to repay.`,
        dismissible: true,
        required: false
      });
    }

    // APR-specific warnings
    if (apr > 400) {
      messages.push({
        id: 'apr-warning-1',
        type: 'warning',
        severity: 'critical',
        content: `This loan has a very high APR of ${apr.toFixed(0)}%. This means the cost of borrowing is extremely high. Please consider alternatives.`,
        dismissible: false,
        required: true
      });
    }

    // Step-specific messages
    if (currentStep === 'final-review') {
      messages.push({
        id: 'final-review-notice',
        type: 'disclosure',
        severity: 'high',
        content: 'By proceeding, you acknowledge that you have read and understood all terms and conditions. This is your final opportunity to review before acceptance.',
        dismissible: false,
        required: true
      });
    }

    return messages;
  };

  // Update messages when dependencies change
  useEffect(() => {
    const newMessages = generateMessages();
    
    // Show immediate messages
    const immediateMessages = newMessages.filter(msg => !msg.delay);
    setActiveMessages(immediateMessages);

    // Schedule delayed messages
    const delayedMessages = newMessages.filter(msg => msg.delay);
    delayedMessages.forEach(msg => {
      setTimeout(() => {
        setActiveMessages(prev => [...prev, msg]);
      }, msg.delay);
    });
  }, [loanType, loanAmount, apr, currentStep, userBehavior]);

  const handleMessageDismiss = (messageId: string) => {
    setActiveMessages(prev => prev.filter(msg => msg.id !== messageId));
    onMessageInteraction?.(messageId, 'dismissed');
  };

  const handleMessageExpand = (messageId: string) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
    onMessageInteraction?.(messageId, 'expanded');
  };

  const getMessageIcon = (type: FinancialMessage['type']) => {
    switch (type) {
      case 'regulatory':
      case 'disclosure':
        return <Shield className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'promotional':
        return <DollarSign className="w-5 h-5" />;
      case 'contextual':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getSeverityStyles = (severity: FinancialMessage['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-red-600 bg-red-50 text-red-900';
      case 'high':
        return 'border-orange-500 bg-orange-50 text-orange-900';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 text-yellow-900';
      case 'low':
        return 'border-blue-500 bg-blue-50 text-blue-900';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-900';
    }
  };

  if (activeMessages.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      <AnimatePresence>
        {activeMessages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`border-l-4 p-4 rounded-r-lg ${getSeverityStyles(message.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex-shrink-0 mt-0.5">
                  {getMessageIcon(message.type)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1">
                    {message.type === 'regulatory' && 'Regulatory Disclosure'}
                    {message.type === 'warning' && 'Important Warning'}
                    {message.type === 'disclosure' && 'Financial Disclosure'}
                    {message.type === 'promotional' && 'Offer Details'}
                    {message.type === 'contextual' && 'Helpful Information'}
                  </div>
                  <div className="text-sm leading-relaxed">
                    {expandedMessages.has(message.id) || message.content.length < 120
                      ? message.content
                      : `${message.content.substring(0, 120)}...`}
                  </div>
                  {message.content.length > 120 && (
                    <button
                      onClick={() => handleMessageExpand(message.id)}
                      className="text-xs underline mt-2 hover:no-underline"
                    >
                      {expandedMessages.has(message.id) ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>
              {message.dismissible && (
                <button
                  onClick={() => handleMessageDismiss(message.id)}
                  className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
            {message.required && (
              <div className="mt-3 pt-3 border-t border-current/20">
                <div className="flex items-center text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Required disclosure - Please acknowledge you have read this information
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AuthenticFinancialMessaging; 