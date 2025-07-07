/**
 * Advanced Dark Pattern UI Components & Behavioral Tracking
 * Recovered from the original 96,000+ line Lotus codebase
 * Implements sophisticated UI manipulation patterns used by predatory lenders
 */

import React, { useState, useEffect, useRef } from 'react';

// ============================================
// DARK PATTERN UI COMPONENT LIBRARY
// ============================================

// Artificial Urgency Components
export const CountdownTimer = ({ 
  initialTime = 300, 
  onExpire, 
  urgencyLevel = 'high',
  fakeExpiration = true 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExpired(true);
      if (fakeExpiration) {
        // Fake expiration - reset timer after 10 seconds
        setTimeout(() => {
          setTimeLeft(initialTime);
          setIsExpired(false);
        }, 10000);
      }
      onExpire?.();
    }
  }, [timeLeft]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getUrgencyColor = () => {
    if (timeLeft < 60) return 'text-red-600 animate-pulse';
    if (timeLeft < 180) return 'text-orange-600';
    return 'text-yellow-600';
  };
  
  return (
    <div className={`p-4 border-2 rounded-lg ${urgencyLevel === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">⏰</span>
        <span className="font-semibold">
          {isExpired ? 'OFFER EXPIRED!' : 'Time Remaining:'}
        </span>
      </div>
      <div className={`text-2xl font-bold ${getUrgencyColor()}`}>
        {isExpired ? 'EXPIRED' : formatTime(timeLeft)}
      </div>
      <div className="text-sm text-gray-600 mt-1">
        {isExpired ? 
          'Refresh page to see if offer is still available' : 
          'This rate expires when timer reaches zero'
        }
      </div>
    </div>
  );
};

// Scarcity Pressure Components
export const FakeAvailability = ({ 
  spotsLeft = 3, 
  totalSpots = 10, 
  refreshInterval = 30000 
}) => {
  const [availableSpots, setAvailableSpots] = useState(spotsLeft);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly decrease spots to create pressure
      if (Math.random() < 0.3 && availableSpots > 1) {
        setAvailableSpots(prev => prev - 1);
      }
    }, refreshInterval);
    
    return () => clearInterval(interval);
  }, [availableSpots, refreshInterval]);
  
  return (
    <div className="bg-orange-100 border-l-4 border-orange-500 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-orange-500">⚠️</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-orange-700">
            <strong>Limited Availability!</strong> Only {availableSpots} approvals left today.
          </p>
          <div className="mt-2 bg-white rounded-full h-3">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${(availableSpots / totalSpots) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Hidden Cost Display Components
export const ObfuscatedPricing = ({ 
  loanAmount, 
  feeAmount, 
  apr, 
  emphasizeFee = true,
  hideAPR = false 
}) => {
  return (
    <div className="pricing-display space-y-4">
      {/* Prominent fee display */}
      <div className={`text-center p-6 rounded-lg ${emphasizeFee ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'}`}>
        <div className={`${emphasizeFee ? 'text-4xl text-green-600' : 'text-2xl'} font-bold`}>
          Only ${feeAmount} Fee
        </div>
        <div className={`${emphasizeFee ? 'text-lg text-green-700' : 'text-base'} mt-2`}>
          For ${loanAmount} loan
        </div>
      </div>
      
      {/* Hidden/minimized APR */}
      {!hideAPR && (
        <div className="text-xs text-gray-500 text-center">
          APR: {apr}% (Representative example)
        </div>
      )}
      
      {/* Misleading comparison */}
      <div className="bg-blue-50 p-3 rounded text-sm">
        <div className="font-semibold text-blue-800">Compare our low fee:</div>
        <div className="text-blue-700">
          • Bank overdraft fee: $35
          • Credit card late fee: $39
          • Our fee: ${feeAmount} ✓
        </div>
      </div>
    </div>
  );
};

// Social Proof Manipulation
export const FakeSocialProof = ({ 
  customerCount = '10,000+',
  recentActivity = true,
  testimonials = [] 
}) => {
  const [recentApplications, setRecentApplications] = useState([]);
  
  useEffect(() => {
    if (recentActivity) {
      const interval = setInterval(() => {
        const names = ['Sarah K.', 'Mike D.', 'Jennifer L.', 'David R.', 'Maria S.'];
        const cities = ['Dallas', 'Houston', 'Austin', 'Phoenix', 'Denver'];
        const amounts = [300, 500, 400, 600, 350];
        
        const newApp = {
          name: names[Math.floor(Math.random() * names.length)],
          city: cities[Math.floor(Math.random() * cities.length)],
          amount: amounts[Math.floor(Math.random() * amounts.length)],
          timestamp: new Date()
        };
        
        setRecentApplications(prev => [newApp, ...prev.slice(0, 4)]);
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [recentActivity]);
  
  return (
    <div className="space-y-4">
      {/* Customer count */}
      <div className="text-center bg-blue-50 p-4 rounded-lg">
        <div className="text-2xl font-bold text-blue-800">{customerCount}</div>
        <div className="text-blue-600">customers served this month</div>
      </div>
      
      {/* Recent activity feed */}
      {recentActivity && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Recent Activity</h4>
          <div className="space-y-2">
            {recentApplications.map((app, index) => (
              <div key={index} className="text-sm flex justify-between items-center bg-white p-2 rounded">
                <span>{app.name} from {app.city}</span>
                <span className="text-green-600 font-semibold">${app.amount} approved</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Fake testimonials */}
      <div className="space-y-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
            <div className="text-sm text-green-800">"{testimonial.text}"</div>
            <div className="text-xs text-green-600 mt-1">- {testimonial.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Pre-checked Options (Default Manipulation)
export const PreCheckedOptions = ({ 
  options, 
  onSelectionChange,
  manipulationLevel = 'medium' 
}) => {
  const [selections, setSelections] = useState(() => {
    // Pre-check options based on manipulation level
    const initial = {};
    options.forEach(option => {
      if (option.benefitsLender && manipulationLevel === 'high') {
        initial[option.id] = true;
      } else if (option.benefitsLender && manipulationLevel === 'medium' && Math.random() < 0.7) {
        initial[option.id] = true;
      } else if (option.benefitsLender && manipulationLevel === 'low' && Math.random() < 0.3) {
        initial[option.id] = true;
      } else {
        initial[option.id] = false;
      }
    });
    return initial;
  });
  
  const handleChange = (optionId, checked) => {
    const newSelections = { ...selections, [optionId]: checked };
    setSelections(newSelections);
    onSelectionChange?.(newSelections);
  };
  
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800">Additional Options</h4>
      {options.map(option => (
        <label key={option.id} className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={selections[option.id]}
            onChange={(e) => handleChange(option.id, e.target.checked)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="font-medium">{option.label}</div>
            <div className="text-sm text-gray-600">{option.description}</div>
            {option.cost && (
              <div className={`text-sm ${option.benefitsLender ? 'text-green-600' : 'text-gray-500'}`}>
                {option.cost}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

// ============================================
// BEHAVIORAL TRACKING SYSTEM
// ============================================

export class BehavioralTracker {
  constructor() {
    this.startTime = Date.now();
    this.interactions = [];
    this.mouseMovements = [];
    this.hesitationEvents = [];
    this.scrollingPattern = [];
    this.focusEvents = [];
    this.manipulationExposure = [];
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Mouse movement tracking
    document.addEventListener('mousemove', this.trackMouseMovement.bind(this));
    
    // Click tracking
    document.addEventListener('click', this.trackClick.bind(this));
    
    // Scroll tracking
    document.addEventListener('scroll', this.trackScrolling.bind(this));
    
    // Focus/blur tracking (tab switching)
    window.addEventListener('focus', this.trackFocus.bind(this));
    window.addEventListener('blur', this.trackBlur.bind(this));
    
    // Form interaction tracking
    document.addEventListener('change', this.trackFormChange.bind(this));
    
    // Hesitation detection
    this.setupHesitationDetection();
  }
  
  trackMouseMovement(event) {
    this.mouseMovements.push({
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now() - this.startTime,
      target: event.target.tagName
    });
    
    // Keep only last 100 movements for performance
    if (this.mouseMovements.length > 100) {
      this.mouseMovements.shift();
    }
  }
  
  trackClick(event) {
    const element = event.target;
    const interaction = {
      type: 'click',
      element: element.tagName,
      id: element.id,
      className: element.className,
      text: element.textContent?.substring(0, 50),
      timestamp: Date.now() - this.startTime,
      coordinates: { x: event.clientX, y: event.clientY }
    };
    
    this.interactions.push(interaction);
    
    // Detect manipulation interaction
    if (this.isManipulationElement(element)) {
      this.recordManipulationExposure('click', element);
    }
  }
  
  trackScrolling(event) {
    this.scrollingPattern.push({
      scrollY: window.scrollY,
      timestamp: Date.now() - this.startTime,
      direction: this.getScrollDirection()
    });
  }
  
  setupHesitationDetection() {
    let mouseStoppedTimer;
    let lastMovement = Date.now();
    
    document.addEventListener('mousemove', () => {
      clearTimeout(mouseStoppedTimer);
      lastMovement = Date.now();
      
      mouseStoppedTimer = setTimeout(() => {
        const hesitation = {
          type: 'mouse_stopped',
          duration: Date.now() - lastMovement,
          timestamp: Date.now() - this.startTime,
          location: this.getCurrentMouseLocation()
        };
        
        if (hesitation.duration > 2000) { // 2+ seconds = hesitation
          this.hesitationEvents.push(hesitation);
        }
      }, 2000);
    });
  }
  
  isManipulationElement(element) {
    const manipulationClasses = [
      'countdown-timer',
      'urgency-indicator',
      'scarcity-warning',
      'fake-social-proof',
      'pre-checked-option',
      'hidden-fee'
    ];
    
    return manipulationClasses.some(className => 
      element.classList.contains(className) || 
      element.closest(`.${className}`)
    );
  }
  
  recordManipulationExposure(interactionType, element) {
    this.manipulationExposure.push({
      type: interactionType,
      manipulation_technique: this.identifyManipulationTechnique(element),
      timestamp: Date.now() - this.startTime,
      element_details: {
        id: element.id,
        className: element.className,
        text: element.textContent?.substring(0, 100)
      }
    });
  }
  
  identifyManipulationTechnique(element) {
    if (element.classList.contains('countdown-timer')) return 'artificial_urgency';
    if (element.classList.contains('scarcity-warning')) return 'fake_scarcity';
    if (element.classList.contains('fake-social-proof')) return 'social_proof_manipulation';
    if (element.classList.contains('pre-checked-option')) return 'default_manipulation';
    if (element.classList.contains('hidden-fee')) return 'cost_obfuscation';
    return 'unknown_manipulation';
  }
  
  calculateManipulationSusceptibility() {
    const analysis = {
      time_spent: Date.now() - this.startTime,
      interaction_count: this.interactions.length,
      hesitation_events: this.hesitationEvents.length,
      manipulation_interactions: this.manipulationExposure.length,
      scroll_behavior: this.analyzeScrollBehavior(),
      focus_changes: this.focusEvents.length,
      susceptibility_score: 0
    };
    
    // Calculate susceptibility score
    let score = 0;
    
    // Time pressure response (quick decisions = higher susceptibility)
    if (analysis.time_spent < 120000) score += 0.3; // Less than 2 minutes
    if (analysis.time_spent < 60000) score += 0.2; // Less than 1 minute
    
    // Hesitation (more hesitation = lower susceptibility to pressure)
    const hesitationRate = analysis.hesitation_events / (analysis.time_spent / 60000);
    score += Math.max(0, 0.3 - (hesitationRate * 0.1));
    
    // Manipulation interaction rate
    const manipulationRate = analysis.manipulation_interactions / analysis.interaction_count;
    score += manipulationRate * 0.4;
    
    // Focus changes (tab switching = comparison shopping = lower susceptibility)
    if (analysis.focus_changes < 2) score += 0.2;
    
    analysis.susceptibility_score = Math.min(1.0, score);
    
    return analysis;
  }
  
  analyzeScrollBehavior() {
    if (this.scrollingPattern.length < 5) return 'insufficient_data';
    
    const totalScroll = this.scrollingPattern[this.scrollingPattern.length - 1].scrollY;
    const scrollTime = this.scrollingPattern[this.scrollingPattern.length - 1].timestamp - 
                      this.scrollingPattern[0].timestamp;
    
    if (scrollTime < 30000 && totalScroll > 1000) return 'rushed_scrolling';
    if (scrollTime > 180000) return 'careful_reading';
    return 'normal_scrolling';
  }
  
  generateReport() {
    return {
      session_summary: {
        duration: Date.now() - this.startTime,
        total_interactions: this.interactions.length,
        manipulation_exposures: this.manipulationExposure.length
      },
      behavioral_analysis: this.calculateManipulationSusceptibility(),
      manipulation_timeline: this.manipulationExposure,
      hesitation_analysis: this.analyzeHesitationPatterns(),
      risk_assessment: this.assessRiskFactors()
    };
  }
  
  analyzeHesitationPatterns() {
    const patterns = {
      total_hesitations: this.hesitationEvents.length,
      average_hesitation_duration: 0,
      hesitation_locations: [],
      decision_points: []
    };
    
    if (this.hesitationEvents.length > 0) {
      patterns.average_hesitation_duration = 
        this.hesitationEvents.reduce((sum, event) => sum + event.duration, 0) / 
        this.hesitationEvents.length;
      
      // Identify common hesitation locations
      patterns.hesitation_locations = this.hesitationEvents.map(event => ({
        location: event.location,
        duration: event.duration,
        timestamp: event.timestamp
      }));
    }
    
    return patterns;
  }
  
  assessRiskFactors() {
    const analysis = this.calculateManipulationSusceptibility();
    const riskFactors = [];
    
    if (analysis.susceptibility_score > 0.7) {
      riskFactors.push('High susceptibility to manipulation');
    }
    
    if (analysis.time_spent < 120000) {
      riskFactors.push('Rushed decision-making');
    }
    
    if (analysis.manipulation_interactions > 5) {
      riskFactors.push('High engagement with manipulative elements');
    }
    
    if (analysis.hesitation_events < 2) {
      riskFactors.push('Insufficient deliberation time');
    }
    
    if (analysis.focus_changes < 1) {
      riskFactors.push('No comparison shopping detected');
    }
    
    return {
      risk_level: riskFactors.length > 3 ? 'high' : riskFactors.length > 1 ? 'medium' : 'low',
      factors: riskFactors,
      recommendations: this.generateRecommendations(riskFactors)
    };
  }
  
  generateRecommendations(riskFactors) {
    const recommendations = [];
    
    if (riskFactors.includes('Rushed decision-making')) {
      recommendations.push('Take at least 24 hours before making any borrowing decision');
    }
    
    if (riskFactors.includes('No comparison shopping detected')) {
      recommendations.push('Compare at least 3 different lenders and their terms');
    }
    
    if (riskFactors.includes('High susceptibility to manipulation')) {
      recommendations.push('Have a trusted friend or family member review the loan terms');
    }
    
    recommendations.push('Consider alternatives like credit union loans or employer assistance');
    recommendations.push('Calculate the total cost of the loan including all fees');
    
    return recommendations;
  }
}

// ============================================
// COERCION INDEX CALCULATOR
// ============================================

export class CoercionIndexCalculator {
  constructor() {
    this.coercionElements = this.loadCoercionElements();
    this.weightingFactors = this.loadWeightingFactors();
  }
  
  loadCoercionElements() {
    return {
      time_pressure: {
        weight: 0.25,
        indicators: ['countdown_timer', 'limited_time_offer', 'expires_today'],
        severity_levels: {
          low: 'Mentioned urgency without specific timeframe',
          medium: 'Specific but reasonable timeframe (24+ hours)',
          high: 'Very short timeframe (under 1 hour)',
          extreme: 'Immediate action required (minutes)'
        }
      },
      
      scarcity_manipulation: {
        weight: 0.20,
        indicators: ['limited_spots', 'last_chance', 'inventory_pressure'],
        severity_levels: {
          low: 'General scarcity messaging',
          medium: 'Specific quantities mentioned',
          high: 'Real-time availability updates',
          extreme: 'Countdown with consequences'
        }
      },
      
      social_pressure: {
        weight: 0.20,
        indicators: ['peer_comparison', 'social_proof', 'popularity_claims'],
        severity_levels: {
          low: 'General popularity claims',
          medium: 'Specific customer numbers',
          high: 'Real-time activity feeds',
          extreme: 'Peer pressure + time pressure combination'
        }
      },
      
      consequence_amplification: {
        weight: 0.15,
        indicators: ['catastrophic_outcomes', 'fear_appeals', 'problem_escalation'],
        severity_levels: {
          low: 'Mentions potential problems',
          medium: 'Emphasizes negative consequences',
          high: 'Catastrophizes outcomes',
          extreme: 'Threatens immediate severe consequences'
        }
      },
      
      choice_restriction: {
        weight: 0.10,
        indicators: ['pre_selected_options', 'hidden_alternatives', 'forced_bundling'],
        severity_levels: {
          low: 'Some pre-selected options',
          medium: 'Most beneficial options pre-selected',
          high: 'Hidden costs or alternatives',
          extreme: 'No meaningful choice provided'
        }
      },
      
      cognitive_overload: {
        weight: 0.10,
        indicators: ['complex_terms', 'information_flooding', 'decision_fatigue'],
        severity_levels: {
          low: 'Standard complexity',
          medium: 'Above-average complexity',
          high: 'Intentionally confusing presentation',
          extreme: 'Overwhelming information + time pressure'
        }
      }
    };
  }
  
  calculateCoercionIndex(uiElements, behavioralData, contextualFactors) {
    let totalIndex = 0;
    const elementScores = {};
    
    Object.entries(this.coercionElements).forEach(([elementType, config]) => {
      const elementScore = this.scoreCoercionElement(
        elementType, 
        config, 
        uiElements, 
        behavioralData, 
        contextualFactors
      );
      
      elementScores[elementType] = elementScore;
      totalIndex += elementScore.weighted_score;
    });
    
    return {
      overall_index: Math.min(1.0, totalIndex),
      coercion_level: this.categorizeCoercionLevel(totalIndex),
      element_breakdown: elementScores,
      risk_assessment: this.assessCoercionRisk(totalIndex, elementScores),
      mitigation_suggestions: this.generateMitigationSuggestions(elementScores)
    };
  }
  
  scoreCoercionElement(elementType, config, uiElements, behavioralData, contextualFactors) {
    let baseScore = 0;
    let severityMultiplier = 1;
    let contextMultiplier = 1;
    
    // Check for presence of coercion indicators
    const presentIndicators = config.indicators.filter(indicator => 
      this.isIndicatorPresent(indicator, uiElements)
    );
    
    baseScore = presentIndicators.length / config.indicators.length;
    
    // Determine severity level
    const severity = this.determineSeverity(elementType, uiElements, behavioralData);
    severityMultiplier = this.getSeverityMultiplier(severity);
    
    // Apply contextual factors
    contextMultiplier = this.getContextMultiplier(elementType, contextualFactors);
    
    const rawScore = baseScore * severityMultiplier * contextMultiplier;
    const weightedScore = rawScore * config.weight;
    
    return {
      raw_score: rawScore,
      weighted_score: weightedScore,
      severity_level: severity,
      present_indicators: presentIndicators,
      context_factors: this.getRelevantContextFactors(elementType, contextualFactors)
    };
  }
  
  isIndicatorPresent(indicator, uiElements) {
    const indicatorMapping = {
      countdown_timer: () => uiElements.some(el => el.type === 'countdown' || el.hasTimer),
      limited_time_offer: () => uiElements.some(el => el.text?.includes('limited time')),
      expires_today: () => uiElements.some(el => el.text?.includes('expires') || el.text?.includes('today')),
      limited_spots: () => uiElements.some(el => el.text?.includes('spots left') || el.text?.includes('available')),
      last_chance: () => uiElements.some(el => el.text?.includes('last chance') || el.text?.includes('final')),
      peer_comparison: () => uiElements.some(el => el.text?.includes('others') || el.text?.includes('neighbors')),
      social_proof: () => uiElements.some(el => el.type === 'testimonial' || el.type === 'social_proof'),
      catastrophic_outcomes: () => uiElements.some(el => el.text?.includes('eviction') || el.text?.includes('foreclosure')),
      pre_selected_options: () => uiElements.some(el => el.type === 'checkbox' && el.defaultChecked)
    };
    
    return indicatorMapping[indicator]?.() || false;
  }
  
  categorizeCoercionLevel(index) {
    if (index >= 0.8) return 'extreme';
    if (index >= 0.6) return 'high';
    if (index >= 0.4) return 'medium';
    if (index >= 0.2) return 'low';
    return 'minimal';
  }
  
  assessCoercionRisk(totalIndex, elementScores) {
    const riskFactors = [];
    
    if (totalIndex > 0.7) {
      riskFactors.push('Extremely high coercion detected');
    }
    
    if (elementScores.time_pressure?.weighted_score > 0.15) {
      riskFactors.push('Dangerous time pressure tactics');
    }
    
    if (elementScores.consequence_amplification?.weighted_score > 0.10) {
      riskFactors.push('Fear-based manipulation present');
    }
    
    return {
      risk_level: totalIndex > 0.6 ? 'high' : totalIndex > 0.3 ? 'medium' : 'low',
      primary_concerns: riskFactors,
      intervention_recommended: totalIndex > 0.5
    };
  }
  
  generateMitigationSuggestions(elementScores) {
    const suggestions = [];
    
    if (elementScores.time_pressure?.weighted_score > 0.1) {
      suggestions.push({
        issue: 'Time pressure detected',
        suggestion: 'Ignore artificial deadlines. Legitimate financial products don\'t require immediate decisions.',
        action: 'Take at least 24 hours to consider any financial decision'
      });
    }
    
    if (elementScores.scarcity_manipulation?.weighted_score > 0.1) {
      suggestions.push({
        issue: 'Scarcity manipulation detected',
        suggestion: 'Question claims about limited availability. This is often artificial pressure.',
        action: 'Refresh the page or come back tomorrow to see if the "limited" offer is still available'
      });
    }
    
    if (elementScores.choice_restriction?.weighted_score > 0.1) {
      suggestions.push({
        issue: 'Limited choice options detected',
        suggestion: 'Look for hidden alternatives and uncheck pre-selected options.',
        action: 'Manually review all checkboxes and options before proceeding'
      });
    }
    
    return suggestions;
  }
}

export { 
  CountdownTimer, 
  FakeAvailability, 
  ObfuscatedPricing, 
  FakeSocialProof, 
  PreCheckedOptions,
  BehavioralTracker,
  CoercionIndexCalculator 
};
