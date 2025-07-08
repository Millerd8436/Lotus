/**
 * Advanced Dark Pattern UI Components for Lotus Payday Loan Simulator
 * Educational components that demonstrate predatory lending UI tactics
 */

"use client";

import React, { useEffect, useState } from "react";

// ============================================
// TYPE DEFINITIONS
// ============================================

interface CountdownTimerProps {
  initialTime?: number;
  onExpire?: () => void;
  urgencyLevel?: "low" | "medium" | "high";
  fakeExpiration?: boolean;
  onManipulationDetected?: (type: string, severity: number) => void;
}

interface FakeAvailabilityProps {
  spotsLeft?: number;
  totalSpots?: number;
  refreshInterval?: number;
  onManipulationDetected?: (type: string, severity: number) => void;
}

interface ObfuscatedPricingProps {
  loanAmount: number;
  feeAmount: number;
  apr: number;
  emphasizeFee?: boolean;
  hideAPR?: boolean;
  onManipulationDetected?: (type: string, severity: number) => void;
}

interface FakeSocialProofProps {
  customerCount?: string;
  recentActivity?: boolean;
  testimonials?: Array<{ text: string; name: string }>;
  onManipulationDetected?: (type: string, severity: number) => void;
}

interface PreCheckedOption {
  id: string;
  label: string;
  description: string;
  cost?: string;
  benefitsLender: boolean;
}

interface PreCheckedOptionsProps {
  options: PreCheckedOption[];
  onSelectionChange?: (selections: Record<string, boolean>) => void;
  manipulationLevel?: "low" | "medium" | "high";
  onManipulationDetected?: (type: string, severity: number) => void;
}

interface BehavioralData {
  timestamp: number;
  type: string;
  element?: string;
  coordinates?: { x: number; y: number };
  duration?: number;
  target?: string;
}

interface CoercionIndexProps {
  uiElements: any[];
  behavioralData: BehavioralData[];
  contextualFactors: any;
  onIndexUpdate: (index: number, analysis: any) => void;
}

// ============================================
// UI COMPONENTS
// ============================================

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialTime = 300,
  onExpire,
  urgencyLevel = "high",
  fakeExpiration = true,
  onManipulationDetected,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Record manipulation detected when component mounts
    onManipulationDetected?.(
      "artificial_urgency",
      urgencyLevel === "high" ? 0.8 : 0.5
    );
  }, [urgencyLevel, onManipulationDetected]);

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
  }, [timeLeft, fakeExpiration, initialTime, onExpire]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getUrgencyColor = (): string => {
    if (timeLeft < 60) return "text-red-600 animate-pulse";
    if (timeLeft < 180) return "text-orange-600";
    return "text-yellow-600";
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg ${urgencyLevel === "high" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">⏰</span>
        <span className="font-semibold">
          {isExpired ? "OFFER EXPIRED!" : "Time Remaining:"}
        </span>
      </div>
      <div className={`text-2xl font-bold ${getUrgencyColor()}`}>
        {isExpired ? "EXPIRED" : formatTime(timeLeft)}
      </div>
      <div className="text-sm text-gray-600 mt-1">
        {isExpired
          ? "Refresh page to see if offer is still available"
          : "This rate expires when timer reaches zero"}
      </div>
    </div>
  );
};

export const FakeAvailability: React.FC<FakeAvailabilityProps> = ({
  spotsLeft = 3,
  totalSpots = 10,
  refreshInterval = 30000,
  onManipulationDetected,
}) => {
  const [availableSpots, setAvailableSpots] = useState(spotsLeft);

  useEffect(() => {
    // Record manipulation detected when component mounts
    onManipulationDetected?.("fake_scarcity", 0.7);
  }, [onManipulationDetected]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly decrease spots to create pressure
      if (Math.random() < 0.3 && availableSpots > 1) {
        setAvailableSpots((prev) => prev - 1);
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
            <strong>Limited Availability!</strong> Only {availableSpots}{" "}
            approvals left today.
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

export const ObfuscatedPricing: React.FC<ObfuscatedPricingProps> = ({
  loanAmount,
  feeAmount,
  apr,
  emphasizeFee = true,
  hideAPR = false,
  onManipulationDetected,
}) => {
  useEffect(() => {
    let severity = 0.3;
    if (emphasizeFee) severity += 0.2;
    if (hideAPR) severity += 0.3;
    onManipulationDetected?.("cost_obfuscation", severity);
  }, [emphasizeFee, hideAPR, onManipulationDetected]);

  return (
    <div className="pricing-display space-y-4">
      {/* Prominent fee display */}
      <div
        className={`text-center p-6 rounded-lg ${emphasizeFee ? "bg-green-100 border-2 border-green-500" : "bg-gray-100"}`}
      >
        <div
          className={`${emphasizeFee ? "text-4xl text-green-600" : "text-2xl"} font-bold`}
        >
          Only ${feeAmount} Fee
        </div>
        <div
          className={`${emphasizeFee ? "text-lg text-green-700" : "text-base"} mt-2`}
        >
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
          • Bank overdraft fee: $35 • Credit card late fee: $39 • Our fee: $
          {feeAmount} ✓
        </div>
      </div>
    </div>
  );
};

export const FakeSocialProof: React.FC<FakeSocialProofProps> = ({
  customerCount = "10,000+",
  recentActivity = true,
  testimonials = [],
  onManipulationDetected,
}) => {
  const [recentApplications, setRecentApplications] = useState<
    Array<{
      name: string;
      city: string;
      amount: number;
      timestamp: Date;
    }>
  >([]);

  useEffect(() => {
    onManipulationDetected?.(
      "social_proof_manipulation",
      recentActivity ? 0.6 : 0.3
    );
  }, [recentActivity, onManipulationDetected]);

  useEffect(() => {
    if (recentActivity) {
      const interval = setInterval(() => {
        const names = [
          "Sarah K.",
          "Mike D.",
          "Jennifer L.",
          "David R.",
          "Maria S.",
        ];
        const cities = ["Dallas", "Houston", "Austin", "Phoenix", "Denver"];
        const amounts = [300, 500, 400, 600, 350];

        const newApp = {
          name: names[Math.floor(Math.random() * names.length)],
          city: cities[Math.floor(Math.random() * cities.length)],
          amount: amounts[Math.floor(Math.random() * amounts.length)],
          timestamp: new Date(),
        };

        setRecentApplications((prev) => [newApp, ...prev.slice(0, 4)]);
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
              <div
                key={index}
                className="text-sm flex justify-between items-center bg-white p-2 rounded"
              >
                <span>
                  {app.name} from {app.city}
                </span>
                <span className="text-green-600 font-semibold">
                  ${app.amount} approved
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fake testimonials */}
      <div className="space-y-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500"
          >
            <div className="text-sm text-green-800">"{testimonial.text}"</div>
            <div className="text-xs text-green-600 mt-1">
              - {testimonial.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PreCheckedOptions: React.FC<PreCheckedOptionsProps> = ({
  options,
  onSelectionChange,
  manipulationLevel = "medium",
  onManipulationDetected,
}) => {
  const [selections, setSelections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    options.forEach((option) => {
      if (option.benefitsLender && manipulationLevel === "high") {
        initial[option.id] = true;
      } else if (
        option.benefitsLender &&
        manipulationLevel === "medium" &&
        Math.random() < 0.7
      ) {
        initial[option.id] = true;
      } else if (
        option.benefitsLender &&
        manipulationLevel === "low" &&
        Math.random() < 0.3
      ) {
        initial[option.id] = true;
      } else {
        initial[option.id] = false;
      }
    });
    return initial;
  });

  useEffect(() => {
    const preCheckedCount = Object.values(selections).filter(Boolean).length;
    const severity = (preCheckedCount / options.length) * 0.8;
    onManipulationDetected?.("default_manipulation", severity);
  }, [selections, options.length, onManipulationDetected]);

  const handleChange = (optionId: string, checked: boolean) => {
    const newSelections = { ...selections, [optionId]: checked };
    setSelections(newSelections);
    onSelectionChange?.(newSelections);
  };

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800">Additional Options</h4>
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-start space-x-3 cursor-pointer"
        >
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
              <div
                className={`text-sm ${option.benefitsLender ? "text-green-600" : "text-gray-500"}`}
              >
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
// BEHAVIORAL TRACKING & ANALYSIS
// ============================================

export class BehavioralTracker {
  private startTime: number;
  private interactions: BehavioralData[];
  private mouseMovements: Array<{
    x: number;
    y: number;
    timestamp: number;
    target: string;
  }>;
  private hesitationEvents: Array<{
    type: string;
    duration: number;
    timestamp: number;
    location: any;
  }>;
  private scrollingPattern: Array<{
    scrollY: number;
    timestamp: number;
    direction: string;
  }>;
  private focusEvents: Array<{ type: string; timestamp: number }>;
  private manipulationExposure: Array<{
    type: string;
    manipulation_technique: string;
    timestamp: number;
    element_details: any;
  }>;

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

  private setupEventListeners(): void {
    if (typeof document === "undefined") return; // SSR safety

    document.addEventListener("mousemove", this.trackMouseMovement.bind(this));
    document.addEventListener("click", this.trackClick.bind(this));
    document.addEventListener("scroll", this.trackScrolling.bind(this));

    if (typeof window !== "undefined") {
      window.addEventListener("focus", this.trackFocus.bind(this));
      window.addEventListener("blur", this.trackBlur.bind(this));
    }

    document.addEventListener("change", this.trackFormChange.bind(this));
    this.setupHesitationDetection();
  }

  private trackMouseMovement(event: MouseEvent): void {
    this.mouseMovements.push({
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now() - this.startTime,
      target: (event.target as Element)?.tagName || "unknown",
    });

    if (this.mouseMovements.length > 100) {
      this.mouseMovements.shift();
    }
  }

  private trackClick(event: MouseEvent): void {
    const element = event.target as Element;
    const interaction: BehavioralData = {
      type: "click",
      element: element.tagName,
      timestamp: Date.now() - this.startTime,
      coordinates: { x: event.clientX, y: event.clientY },
    };

    this.interactions.push(interaction);

    if (this.isManipulationElement(element)) {
      this.recordManipulationExposure("click", element);
    }
  }

  private trackScrolling(): void {
    this.scrollingPattern.push({
      scrollY: window.scrollY,
      timestamp: Date.now() - this.startTime,
      direction: this.getScrollDirection(),
    });
  }

  private trackFocus(): void {
    this.focusEvents.push({
      type: "focus",
      timestamp: Date.now() - this.startTime,
    });
  }

  private trackBlur(): void {
    this.focusEvents.push({
      type: "blur",
      timestamp: Date.now() - this.startTime,
    });
  }

  private trackFormChange(event: Event): void {
    const element = event.target as Element;
    const interaction: BehavioralData = {
      type: "form_change",
      element: element.tagName,
      timestamp: Date.now() - this.startTime,
    };

    this.interactions.push(interaction);
  }

  private setupHesitationDetection(): void {
    let mouseStoppedTimer: ReturnType<typeof setTimeout> | null = null;
    let lastMovement = Date.now();

    if (typeof document === "undefined") return;

    document.addEventListener("mousemove", () => {
      if (mouseStoppedTimer) clearTimeout(mouseStoppedTimer);
      lastMovement = Date.now();

      mouseStoppedTimer = setTimeout(() => {
        const hesitation = {
          type: "mouse_stopped",
          duration: Date.now() - lastMovement,
          timestamp: Date.now() - this.startTime,
          location: this.getCurrentMouseLocation(),
        };

        if (hesitation.duration > 2000) {
          this.hesitationEvents.push(hesitation);
        }
      }, 2000);
    });
  }

  private isManipulationElement(element: Element): boolean {
    const manipulationClasses = [
      "countdown-timer",
      "urgency-indicator",
      "scarcity-warning",
      "fake-social-proof",
      "pre-checked-option",
      "hidden-fee",
    ];

    return manipulationClasses.some(
      (className) =>
        element.classList.contains(className) ||
        element.closest(`.${className}`)
    );
  }

  private recordManipulationExposure(
    interactionType: string,
    element: Element
  ): void {
    this.manipulationExposure.push({
      type: interactionType,
      manipulation_technique: this.identifyManipulationTechnique(element),
      timestamp: Date.now() - this.startTime,
      element_details: {
        id: element.id,
        className: element.className,
        text: element.textContent?.substring(0, 100),
      },
    });
  }

  private identifyManipulationTechnique(element: Element): string {
    if (element.classList.contains("countdown-timer"))
      return "artificial_urgency";
    if (element.classList.contains("scarcity-warning")) return "fake_scarcity";
    if (element.classList.contains("fake-social-proof"))
      return "social_proof_manipulation";
    if (element.classList.contains("pre-checked-option"))
      return "default_manipulation";
    if (element.classList.contains("hidden-fee")) return "cost_obfuscation";
    return "unknown_manipulation";
  }

  private getScrollDirection(): string {
    if (this.scrollingPattern.length < 2) return "initial";
    const last = this.scrollingPattern[this.scrollingPattern.length - 1];
    const previous = this.scrollingPattern[this.scrollingPattern.length - 2];
    return last.scrollY > previous.scrollY ? "down" : "up";
  }

  private getCurrentMouseLocation(): any {
    return { x: 0, y: 0 }; // Simplified for now
  }

  public generateReport(): any {
    return {
      session_summary: {
        duration: Date.now() - this.startTime,
        total_interactions: this.interactions.length,
        manipulation_exposures: this.manipulationExposure.length,
      },
      behavioral_analysis: this.calculateManipulationSusceptibility(),
      manipulation_timeline: this.manipulationExposure,
      risk_assessment: this.assessRiskFactors(),
    };
  }

  private calculateManipulationSusceptibility(): any {
    const analysis = {
      time_spent: Date.now() - this.startTime,
      interaction_count: this.interactions.length,
      hesitation_events: this.hesitationEvents.length,
      manipulation_interactions: this.manipulationExposure.length,
      focus_changes: this.focusEvents.length,
      susceptibility_score: 0,
    };

    let score = 0;

    if (analysis.time_spent < 120000) score += 0.3;
    if (analysis.time_spent < 60000) score += 0.2;

    const hesitationRate =
      analysis.hesitation_events / (analysis.time_spent / 60000);
    score += Math.max(0, 0.3 - hesitationRate * 0.1);

    const manipulationRate =
      analysis.manipulation_interactions /
      Math.max(1, analysis.interaction_count);
    score += manipulationRate * 0.4;

    if (analysis.focus_changes < 2) score += 0.2;

    analysis.susceptibility_score = Math.min(1.0, score);

    return analysis;
  }

  private assessRiskFactors(): any {
    const analysis = this.calculateManipulationSusceptibility();
    const riskFactors: string[] = [];

    if (analysis.susceptibility_score > 0.7) {
      riskFactors.push("High susceptibility to manipulation");
    }

    if (analysis.time_spent < 120000) {
      riskFactors.push("Rushed decision-making");
    }

    if (analysis.manipulation_interactions > 5) {
      riskFactors.push("High engagement with manipulative elements");
    }

    return {
      risk_level:
        riskFactors.length > 3
          ? "high"
          : riskFactors.length > 1
            ? "medium"
            : "low",
      factors: riskFactors,
      recommendations: this.generateRecommendations(riskFactors),
    };
  }

  private generateRecommendations(riskFactors: string[]): string[] {
    const recommendations: string[] = [];

    if (riskFactors.includes("Rushed decision-making")) {
      recommendations.push(
        "Take at least 24 hours before making any borrowing decision"
      );
    }

    if (riskFactors.includes("High susceptibility to manipulation")) {
      recommendations.push(
        "Have a trusted friend or family member review the loan terms"
      );
    }

    recommendations.push(
      "Consider alternatives like credit union loans or employer assistance"
    );
    recommendations.push(
      "Calculate the total cost of the loan including all fees"
    );

    return recommendations;
  }

  // Public methods called by LotusSimulator
  public startTracking(): void {
    this.startTime = Date.now();
    this.interactions = [];
    this.mouseMovements = [];
    this.hesitationEvents = [];
    this.scrollingPattern = [];
    this.focusEvents = [];
    this.manipulationExposure = [];
  }

  public stopTracking(): void {
    // Clean up event listeners if needed
    // Already handled in destructor/cleanup
  }

  public getClickPattern(): any {
    return this.interactions.filter((i) => i.type === "click");
  }

  public getHesitationEvents(): any {
    return this.hesitationEvents;
  }

  public getStressLevel(): number {
    const rapidClicks = this.interactions.filter(
      (i) => i.type === "click" && i.timestamp < this.startTime + 30000
    ).length;
    return Math.min(1.0, rapidClicks / 10);
  }

  public getCognitiveLoad(): number {
    const focusChanges = this.focusEvents.length;
    const timeSpent = Date.now() - this.startTime;
    return Math.min(1.0, focusChanges / (timeSpent / 60000));
  }

  public getDecisionTime(): number {
    return Date.now() - this.startTime;
  }

  public recordInteraction(interaction: any): void {
    this.interactions.push(interaction);
  }

  public exportAnalytics(): any {
    return this.generateReport();
  }
}
