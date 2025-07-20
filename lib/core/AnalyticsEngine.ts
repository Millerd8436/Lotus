/**
 * AnalyticsEngine - 2025 Advanced Data Collection & API Integration
 *
 * Implements research-based API exploitation methods from:
 * - CFPB enforcement actions against fintech data aggregators
 * - FTC investigations into data broker networks
 * - Consumer Reports on predatory data collection
 * - Security research on API vulnerabilities
 */

export interface APIIntegration {
  id: string;
  name: string;
  type:
    | "credit"
    | "behavioral"
    | "social"
    | "financial"
    | "fraud"
    | "marketing";
  endpoint: string;
  dataPoints: string[];
  costPerCall: number;
  responseTime: number;
  privacyRisk: "low" | "medium" | "high" | "extreme";
  legalCompliance: string[];
}

export interface UserProfile {
  id: string;
  sessionId: string;
  ipAddress?: string;
  deviceFingerprint?: string;
  vulnerabilityScore: number;
  dataCollected: Map<string, any>;
  apiCallHistory: APICall[];
  monetizationPotential: number;
  consentManipulations: string[];
}

export interface APICall {
  api: string;
  timestamp: Date;
  dataShared: string[];
  revenue: number;
  purpose: string;
  userConsent: boolean;
}

export interface BehavioralData {
  mouseMovements: Array<{ x: number; y: number; timestamp: number }>;
  scrollPatterns: Array<{
    position: number;
    velocity: number;
    timestamp: number;
  }>;
  clickHesitations: Array<{ element: string; hesitationTime: number }>;
  formAbandonment: Array<{ field: string; timeSpent: number }>;
  timeOnPage: Map<string, number>;
  readingSpeed: number;
  anxietyIndicators: number;
}

export interface PsychographicProfile {
  financialDesperation: number; // 0-10
  impulsivity: number; // 0-10
  technicalSophistication: number; // 0-10
  riskTolerance: number; // 0-10
  educationLevel: "low" | "medium" | "high";
  emotionalState: "calm" | "anxious" | "desperate" | "confused";
  decisionMakingPattern: "careful" | "rushed" | "erratic";
}

export class AnalyticsEngine {
  private static apis: Map<string, APIIntegration> = new Map();
  private static userProfiles: Map<string, UserProfile> = new Map();
  private static behavioralData: Map<string, BehavioralData> = new Map();
  private static psychographicProfiles: Map<string, PsychographicProfile> =
    new Map();
  private static revenueTracker: Map<string, number> = new Map();

  static {
    this.initializeAPIs();
  }

  private static initializeAPIs(): void {
    // 1. CREDIT SCORING APIs
    this.apis.set("experian_precise_id", {
      id: "experian_precise_id",
      name: "Experian Precise ID + CrossCore",
      type: "credit",
      endpoint: "/api/v3/precise-id",
      dataPoints: [
        "Full credit report",
        "Alternative credit data",
        "Utility payment history",
        "Cell phone payment history",
        "Address history (20 years)",
        "Employment verification",
        "Fraud indicators",
        "Identity verification score",
      ],
      costPerCall: 2.5,
      responseTime: 1200,
      privacyRisk: "high",
      legalCompliance: ["FCRA", "GLBA"],
    });

    this.apis.set("clarity_services", {
      id: "clarity_services",
      name: "Clarity Services (Experian Subprime)",
      type: "credit",
      endpoint: "/api/clarity/subprime-check",
      dataPoints: [
        "Subprime credit history",
        "Payday loan history",
        "Check cashing history",
        "Rent-to-own agreements",
        "Auto title loans",
        "Pawn shop transactions",
      ],
      costPerCall: 1.75,
      responseTime: 800,
      privacyRisk: "extreme",
      legalCompliance: ["State licensing required"],
    });

    // 2. BEHAVIORAL ANALYTICS APIs
    this.apis.set("mouseflow_advanced", {
      id: "mouseflow_advanced",
      name: "MouseFlow Behavioral Analytics",
      type: "behavioral",
      endpoint: "/api/mouseflow/session-replay",
      dataPoints: [
        "Full session recordings",
        "Heatmaps",
        "Form analytics",
        "Rage clicks",
        "Dead clicks",
        "Scroll depth",
        "Time hesitations",
        "Cart abandonment triggers",
      ],
      costPerCall: 0.1,
      responseTime: 50,
      privacyRisk: "high",
      legalCompliance: ["GDPR notice required"],
    });

    this.apis.set("plaid_liabilities", {
      id: "plaid_liabilities",
      name: "Plaid Liabilities + Income",
      type: "financial",
      endpoint: "/api/plaid/liabilities",
      dataPoints: [
        "All bank accounts",
        "Transaction history (2 years)",
        "Income streams",
        "Recurring expenses",
        "Loan payments",
        "Credit card balances",
        "Student loans",
        "Mortgage data",
      ],
      costPerCall: 3.0,
      responseTime: 2000,
      privacyRisk: "extreme",
      legalCompliance: ["Bank consent required"],
    });

    // 3. SOCIAL MEDIA & PSYCHOGRAPHIC APIs
    this.apis.set("clearbit_enrichment", {
      id: "clearbit_enrichment",
      name: "Clearbit Person + Company Enrichment",
      type: "social",
      endpoint: "/api/clearbit/enrich",
      dataPoints: [
        "Social media profiles",
        "Employment history",
        "Company details",
        "Seniority level",
        "Technologies used",
        "Personal interests",
        "Family status indicators",
        "Location history",
      ],
      costPerCall: 0.95,
      responseTime: 600,
      privacyRisk: "high",
      legalCompliance: ["No explicit consent needed"],
    });

    // 4. FRAUD & IDENTITY APIs
    this.apis.set("lexisnexis_risk", {
      id: "lexisnexis_risk",
      name: "LexisNexis Risk Solutions",
      type: "fraud",
      endpoint: "/api/lexisnexis/instant-id",
      dataPoints: [
        "Identity verification score",
        "Address discrepancies",
        "Phone carrier data",
        "Death records",
        "Criminal records",
        "Bankruptcy filings",
        "Property records",
        "Professional licenses",
      ],
      costPerCall: 4.5,
      responseTime: 1500,
      privacyRisk: "extreme",
      legalCompliance: ["FCRA", "State restrictions"],
    });

    // 5. DARK DATA BROKER NETWORKS
    this.apis.set("underground_broker_network", {
      id: "underground_broker_network",
      name: "Data Broker Aggregation Network",
      type: "marketing",
      endpoint: "/api/broker-network/profile",
      dataPoints: [
        "Purchased lead lists",
        "Bankruptcy filer lists",
        "Medical debt indicators",
        "Gambling site activity",
        "Adult site activity",
        "Shopping addiction patterns",
        "Political affiliation",
        "Religious affiliation",
      ],
      costPerCall: 8.0,
      responseTime: 3000,
      privacyRisk: "extreme",
      legalCompliance: ["Potentially illegal in some states"],
    });
  }

  // Track user behavior in real-time
  static trackBehavior(userId: string, event: any): void {
    if (!this.behavioralData.has(userId)) {
      this.behavioralData.set(userId, {
        mouseMovements: [],
        scrollPatterns: [],
        clickHesitations: [],
        formAbandonment: [],
        timeOnPage: new Map(),
        readingSpeed: 0,
        anxietyIndicators: 0,
      });
    }

    const data = this.behavioralData.get(userId)!;

    switch (event.type) {
      case "mousemove":
        data.mouseMovements.push({
          x: event.x,
          y: event.y,
          timestamp: Date.now(),
        });
        // Detect erratic movements (anxiety indicator)
        if (this.detectErraticMovement(data.mouseMovements)) {
          data.anxietyIndicators++;
        }
        break;

      case "scroll":
        data.scrollPatterns.push({
          position: event.position,
          velocity: event.velocity,
          timestamp: Date.now(),
        });
        break;

      case "hesitation":
        data.clickHesitations.push({
          element: event.element,
          hesitationTime: event.duration,
        });
        break;

      case "form_abandon":
        data.formAbandonment.push({
          field: event.field,
          timeSpent: event.timeSpent,
        });
        break;
    }

    // Update psychographic profile based on behavior
    this.updatePsychographicProfile(userId, data);
  }

  // Calculate vulnerability score from multiple data sources
  static calculateVulnerabilityScore(
    userId: string,
    apiData: Map<string, any>
  ): number {
    let score = 5; // Base score

    // Financial desperation indicators
    const bankData = apiData.get("plaid_liabilities");
    if (bankData) {
      if (bankData.checking_balance < 100) score += 2;
      if (bankData.savings_balance < 500) score += 1;
      if (bankData.nsf_count > 3) score += 2;
      if (bankData.payday_loan_history) score += 3;
    }

    // Credit desperation
    const creditData = apiData.get("clarity_services");
    if (creditData) {
      if (creditData.subprime_inquiries > 5) score += 2;
      if (creditData.declined_applications > 3) score += 2;
      if (creditData.title_loans > 0) score += 3;
    }

    // Behavioral desperation
    const behavioral = this.behavioralData.get(userId);
    if (behavioral) {
      if (behavioral.anxietyIndicators > 10) score += 1;
      if (behavioral.formAbandonment.length > 2) score += 1;
      if (behavioral.readingSpeed < 100) score += 1; // Not reading terms
    }

    // Psychographic vulnerability
    const psycho = this.psychographicProfiles.get(userId);
    if (psycho) {
      score += Math.floor(psycho.financialDesperation / 2);
      score += Math.floor(psycho.impulsivity / 3);
      score -= Math.floor(psycho.technicalSophistication / 4);
    }

    return Math.min(score, 10); // Cap at 10
  }

  // Generate targeted exploitation strategy
  static generateExploitationStrategy(userId: string): any {
    const profile = this.userProfiles.get(userId);
    const psychographic = this.psychographicProfiles.get(userId);
    const vulnerability = profile?.vulnerabilityScore || 5;

    const strategy = {
      messaging: [] as string[],
      uiPatterns: [] as string[],
      apiCalls: [] as string[],
      pricingModel: {} as Record<string, any>,
      collectionStrategy: {} as Record<string, any>,
    };

    // High vulnerability = more aggressive tactics
    if (vulnerability >= 8) {
      strategy.messaging = [
        "APPROVED! Claim your $1000 NOW",
        "Only 2 spots left at this rate",
        "Bad credit? NO PROBLEM!",
        "Bank account required for instant deposit",
      ];

      strategy.uiPatterns = [
        "auto_checked_expensive_options",
        "hidden_total_cost",
        "fake_countdown_timer",
        "exit_intent_higher_amount",
        "shame_messaging_on_decline",
      ];

      strategy.apiCalls = [
        "clarity_services", // Check subprime history
        "plaid_liabilities", // Get bank data
        "underground_broker_network", // Buy additional data
        "lexisnexis_risk", // Deep background check
      ];

      strategy.pricingModel = {
        apr: 521, // Maximum extraction
        origination_fee: 75,
        late_fee: 50,
        nsf_fee: 35,
        rollover_fee: 100,
        early_payoff_penalty: true,
      };

      strategy.collectionStrategy = {
        ach_attempts: 6,
        split_payment_attempts: true,
        different_dates: true,
        contact_references: true,
        sell_to_collectors: true,
        wage_garnishment_threat: true,
      };
    } else if (vulnerability >= 5) {
      strategy.messaging = [
        "Get funds in minutes",
        "Flexible payment options",
        "Building credit together",
        "Trusted by millions",
      ];

      strategy.uiPatterns = [
        "benefit_focused_messaging",
        "social_proof_widgets",
        "trust_badges",
        "simplified_terms_toggle",
      ];

      strategy.apiCalls = [
        "experian_precise_id",
        "clearbit_enrichment",
        "mouseflow_advanced",
      ];

      strategy.pricingModel = {
        apr: 399,
        origination_fee: 50,
        late_fee: 35,
        nsf_fee: 30,
        rollover_fee: 75,
      };
    }

    return strategy;
  }

  // Execute API calls and track revenue
  static async executeAPICall(
    userId: string,
    apiId: string,
    purpose: string,
    hasConsent: boolean = false
  ): Promise<any> {
    const api = this.apis.get(apiId);
    if (!api) return null;

    const profile = this.userProfiles.get(userId);
    if (!profile) return null;

    // Simulate API call
    const mockData = this.generateMockAPIResponse(apiId, userId);

    // Track the call
    const apiCall: APICall = {
      api: apiId,
      timestamp: new Date(),
      dataShared: api.dataPoints,
      revenue: api.costPerCall * 0.3, // Assume 30% markup
      purpose,
      userConsent: hasConsent,
    };

    profile.apiCallHistory.push(apiCall);

    // Track revenue
    const currentRevenue = this.revenueTracker.get(userId) || 0;
    this.revenueTracker.set(userId, currentRevenue + apiCall.revenue);

    // Store collected data
    profile.dataCollected.set(apiId, mockData);

    return mockData;
  }

  // Detect erratic mouse movement patterns
  private static detectErraticMovement(
    movements: Array<{ x: number; y: number; timestamp: number }>
  ): boolean {
    if (movements.length < 10) return false;

    const recent = movements.slice(-10);
    let directionChanges = 0;
    let totalDistance = 0;

    for (let i = 1; i < recent.length; i++) {
      const dx = recent[i].x - recent[i - 1].x;
      const dy = recent[i].y - recent[i - 1].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      totalDistance += distance;

      if (i > 1) {
        const prevDx = recent[i - 1].x - recent[i - 2].x;
        const prevDy = recent[i - 1].y - recent[i - 2].y;

        // Check for direction change
        if (
          Math.sign(dx) !== Math.sign(prevDx) ||
          Math.sign(dy) !== Math.sign(prevDy)
        ) {
          directionChanges++;
        }
      }
    }

    // High direction changes with high movement = anxiety
    return directionChanges > 5 && totalDistance > 500;
  }

  // Update psychographic profile based on behavior
  private static updatePsychographicProfile(
    userId: string,
    behavioral: BehavioralData
  ): void {
    if (!this.psychographicProfiles.has(userId)) {
      this.psychographicProfiles.set(userId, {
        financialDesperation: 5,
        impulsivity: 5,
        technicalSophistication: 5,
        riskTolerance: 5,
        educationLevel: "medium",
        emotionalState: "calm",
        decisionMakingPattern: "careful",
      });
    }

    const profile = this.psychographicProfiles.get(userId)!;

    // Update based on behavioral patterns
    if (behavioral.anxietyIndicators > 10) {
      profile.emotionalState = "anxious";
      profile.financialDesperation = Math.min(
        profile.financialDesperation + 1,
        10
      );
    }

    if (behavioral.readingSpeed < 100) {
      profile.impulsivity = Math.min(profile.impulsivity + 1, 10);
      profile.decisionMakingPattern = "rushed";
    }

    if (behavioral.formAbandonment.length > 3) {
      profile.financialDesperation = Math.min(
        profile.financialDesperation + 2,
        10
      );
      profile.emotionalState = "desperate";
    }

    // Technical sophistication based on interaction patterns
    const avgHesitation =
      behavioral.clickHesitations.reduce(
        (sum, h) => sum + h.hesitationTime,
        0
      ) / (behavioral.clickHesitations.length || 1);

    if (avgHesitation > 3000) {
      profile.technicalSophistication = Math.max(
        profile.technicalSophistication - 1,
        0
      );
      profile.educationLevel = "low";
    }
  }

  // Generate mock API response for simulation
  private static generateMockAPIResponse(apiId: string, userId: string): any {
    const baseData = {
      timestamp: new Date().toISOString(),
      userId,
      apiId,
    };

    switch (apiId) {
      case "experian_precise_id":
        return {
          ...baseData,
          creditScore: Math.floor(Math.random() * 200) + 450,
          identityScore: Math.floor(Math.random() * 100),
          fraudIndicators: Math.random() > 0.8 ? ["address_mismatch"] : [],
          addressHistory: [
            { address: "123 Main St", monthsAtAddress: 6 },
            { address: "456 Oak Ave", monthsAtAddress: 24 },
          ],
        };

      case "plaid_liabilities":
        return {
          ...baseData,
          checking_balance: Math.floor(Math.random() * 500),
          savings_balance: Math.floor(Math.random() * 1000),
          monthly_income: Math.floor(Math.random() * 2000) + 1000,
          nsf_count: Math.floor(Math.random() * 5),
          recurring_expenses: Math.floor(Math.random() * 1500) + 500,
          payday_loan_history: Math.random() > 0.7,
        };

      case "clarity_services":
        return {
          ...baseData,
          subprime_inquiries: Math.floor(Math.random() * 10),
          declined_applications: Math.floor(Math.random() * 5),
          title_loans: Math.random() > 0.8 ? 1 : 0,
          current_payday_loans: Math.floor(Math.random() * 3),
          default_history: Math.random() > 0.6,
        };

      default:
        return baseData;
    }
  }

  // Get comprehensive user profile with all collected data
  static getUserProfile(userId: string): any {
    const profile = this.userProfiles.get(userId);
    const behavioral = this.behavioralData.get(userId);
    const psychographic = this.psychographicProfiles.get(userId);
    const revenue = this.revenueTracker.get(userId) || 0;

    return {
      profile,
      behavioral,
      psychographic,
      totalRevenue: revenue,
      exploitationStrategy: this.generateExploitationStrategy(userId),
      dataValue: this.calculateDataValue(userId),
    };
  }

  // Calculate monetary value of collected data
  private static calculateDataValue(userId: string): number {
    const profile = this.userProfiles.get(userId);
    if (!profile) return 0;

    let value = 0;

    // Base value for verified identity
    value += 5;

    // Financial data premium
    if (profile.dataCollected.has("plaid_liabilities")) value += 25;
    if (profile.dataCollected.has("experian_precise_id")) value += 15;
    if (profile.dataCollected.has("clarity_services")) value += 20;

    // Behavioral data value
    const behavioral = this.behavioralData.get(userId);
    if (behavioral && behavioral.mouseMovements.length > 100) value += 10;

    // Vulnerability multiplier
    value *= 1 + profile.vulnerabilityScore / 10;

    return Math.round(value * 100) / 100;
  }

  // Initialize user profile
  static initializeUser(userId: string, sessionId: string): UserProfile {
    const profile: UserProfile = {
      id: userId,
      sessionId,
      vulnerabilityScore: 5,
      dataCollected: new Map(),
      apiCallHistory: [],
      monetizationPotential: 0,
      consentManipulations: [],
    };

    this.userProfiles.set(userId, profile);
    return profile;
  }
}

// Export for use in components
export const analyticsEngine = AnalyticsEngine;
