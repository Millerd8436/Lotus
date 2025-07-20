/**
 * CentralizedDarkPatternEngine - Unified Dark Pattern Detection & Analysis
 *
 * Consolidates all dark pattern functionality from:
 * - AdvancedDarkPatternsDemo
 * - DarkPatternsRegistry
 * - Phase Three API
 * - Various component implementations
 *
 * Provides comprehensive 2025 fintech dark pattern detection,
 * real-time analysis, educational content, and protective guidance.
 */

export interface DarkPattern2025 {
  id: string;
  name: string;
  category:
    | "tip_coercion"
    | "confession_judgment"
    | "rent_a_bank"
    | "drip_pricing"
    | "roach_motel"
    | "consent_theater"
    | "fake_urgency"
    | "social_proof"
    | "privacy_zuckering"
    | "forced_continuity"
    | "bait_switch"
    | "confirm_shaming";
  description: string;
  implementation: string;
  harmLevel: 1 | 2 | 3 | 4 | 5;
  prevalence2025: number; // Percentage of lenders using this pattern
  cfpbViolation: boolean;
  stateLawViolations: string[]; // States where this violates specific laws
  realWorldExamples: {
    company: string;
    description: string;
    outcome: string; // Regulatory action taken
    source: string;
  }[];
  detectionCriteria: {
    uiElements: string[];
    textPatterns: string[];
    behaviorIndicators: string[];
    technicalSignals: string[];
  };
  psychologicalMechanism: string;
  targetVulnerabilities: string[];
  protectionStrategies: string[];
  educationalContent: {
    explanation: string;
    realWorldImpact: string;
    legalContext: string;
    actionSteps: string[];
  };
}

export interface DarkPatternDetection {
  patternId: string;
  confidence: number; // 0-1
  detectedElements: HTMLElement[];
  evidence: string[];
  severity: "low" | "medium" | "high" | "critical";
  immediateHarm: number; // Estimated financial harm
  longTermHarm: number; // Estimated long-term financial harm
  recommendedAction: "inform" | "warn" | "block" | "redirect";
  userGuidance: string;
  timestamp: Date;
}

export interface EducationalAnnotation {
  id: string;
  patternId: string;
  title: string;
  description: string;
  position: { x: number; y: number };
  content: {
    explanation: string;
    harmAnalysis: string;
    protectionTip: string;
    legalInformation: string;
    alternatives: string[];
  };
  interactionType: "hover" | "click" | "auto";
  dismissible: boolean;
  urgencyLevel: "info" | "warning" | "danger" | "critical";
}

export interface PatternAnalysisReport {
  overallRisk: number; // 0-100
  detectedPatterns: DarkPatternDetection[];
  vulnerabilityExploitation: {
    score: number;
    targetedDemographics: string[];
    exploitationTactics: string[];
    psychologicalPressure: number;
  };
  regulatoryViolations: {
    cfpb: string[];
    state: Array<{ state: string; violation: string }>;
    ftc: string[];
  };
  financialHarmEstimate: {
    immediate: number;
    longTerm: number;
    comparisonToAlternatives: number;
  };
  protectionRecommendations: string[];
  educationalPriorities: string[];
}

export class CentralizedDarkPatternEngine {
  private patterns: Map<string, DarkPattern2025> = new Map();
  private detectionQueue: DarkPatternDetection[] = [];
  private observationTargets: Set<HTMLElement> = new Set();
  private isActivelyMonitoring: boolean = false;
  private mutationObserver?: MutationObserver;
  private onPatternDetected?: (detection: DarkPatternDetection) => void;

  constructor() {
    this.initializePatternDatabase();
  }

  private initializePatternDatabase(): void {
    const patterns2025: DarkPattern2025[] = [
      {
        id: "tip_coercion_2025",
        name: "Coercive Tip Interface",
        category: "tip_coercion",
        description:
          'UI designed to make "voluntary" tips feel mandatory through psychological pressure',
        implementation:
          "Pre-selected tip amounts, no $0 option visible, guilt-inducing language, multiple prompts",
        harmLevel: 4,
        prevalence2025: 73,
        cfpbViolation: true,
        stateLawViolations: ["NY", "CA", "CT", "DC"],
        realWorldExamples: [
          {
            company: "EarnIn",
            description:
              "17 messages about tipping importance, 13 clicks required to avoid tip",
            outcome: "NCLC report documenting deceptive practices",
            source: "NCLC.org tip coercion analysis 2025",
          },
          {
            company: "MoneyLion",
            description:
              "NY AG charged with relentless fee collection and tip pressure",
            outcome: "State enforcement action for deceptive practices",
            source: "NY Attorney General press release 2024",
          },
        ],
        detectionCriteria: {
          uiElements: [
            ".tip-amount",
            ".donation",
            "[data-tip]",
            ".suggested-amount",
          ],
          textPatterns: [
            "support our service",
            "help us continue",
            "recommended tip",
            "suggested amount",
            "most users tip",
            "fair amount",
            "show appreciation",
          ],
          behaviorIndicators: [
            "preselected_amounts",
            "no_zero_option",
            "multiple_prompts",
          ],
          technicalSignals: [
            "tip_tracking_pixels",
            "pressure_measurement",
            "avoidance_difficulty",
          ],
        },
        psychologicalMechanism:
          "Social obligation, guilt induction, reciprocity bias",
        targetVulnerabilities: [
          "Financial desperation",
          "Social conformity pressure",
          "Limited time",
        ],
        protectionStrategies: [
          "Always look for $0 tip option",
          "Screenshot interface if no zero option exists",
          "Report to CFPB if tips feel mandatory",
          "Remember: tips are legally voluntary",
        ],
        educationalContent: {
          explanation:
            "This interface uses psychological manipulation to make voluntary tips feel mandatory. It's designed to extract additional revenue without calling it interest.",
          realWorldImpact:
            'CFPB data shows tip-based lenders collect tips 73% of the time, effectively charging 200-750% APR on "free" advances.',
          legalContext:
            "Under CFPB regulations, this may constitute an abusive practice by materially interfering with consumer understanding.",
          actionSteps: [
            "Document the interface with screenshots",
            "File CFPB complaint if tips feel coercive",
            "Report to state consumer protection office",
            "Share experience with consumer advocacy groups",
          ],
        },
      },
      {
        id: "confession_judgment_2025",
        name: "Hidden Asset Seizure Rights",
        category: "confession_judgment",
        description:
          "Buried contract clauses allowing immediate asset seizure without court proceedings",
        implementation:
          "Legal language hidden in terms, pre-signed judgment authorization, asset waiver clauses",
        harmLevel: 5,
        prevalence2025: 45,
        cfpbViolation: true,
        stateLawViolations: ["NY", "NJ", "PA", "NC", "VT"],
        realWorldExamples: [
          {
            company: "Yellowstone Capital",
            description:
              "Used confession of judgment to freeze business accounts instantly across multiple states",
            outcome:
              "Bloomberg investigation exposed 25,000+ default judgments",
            source: "Bloomberg Businessweek MCA investigation 2018-2025",
          },
          {
            company: "Richmond Capital Group",
            description:
              "Jonathan Braun companies used confession clauses for immediate asset seizure",
            outcome:
              "Federal court ruled practice constitutes fraudulent lending",
            source: "Second Circuit Court decision 2023",
          },
        ],
        detectionCriteria: {
          uiElements: [
            ".terms",
            ".agreement",
            ".legal-text",
            'textarea[name*="terms"]',
          ],
          textPatterns: [
            "confession of judgment",
            "waive right to defend",
            "consent to judgment",
            "authorize judgment",
            "without notice",
            "seize assets",
            "freeze accounts",
            "immediate collection",
            "expedited enforcement",
          ],
          behaviorIndicators: [
            "buried_in_terms",
            "no_explanation",
            "auto_scroll",
          ],
          technicalSignals: [
            "legal_obfuscation",
            "scroll_tracking",
            "signature_capture",
          ],
        },
        psychologicalMechanism:
          "Information overload, legal intimidation, complexity aversion",
        targetVulnerabilities: [
          "Legal inexperience",
          "Desperation for funds",
          "Time pressure",
        ],
        protectionStrategies: [
          "NEVER sign documents with confession of judgment language",
          "Demand explanation of all legal terms",
          "Consult attorney before signing any business loan",
          "Check if prohibited in your state",
        ],
        educationalContent: {
          explanation:
            "Confession of judgment allows lenders to freeze your accounts and seize assets immediately without going to court or giving you a chance to defend yourself.",
          realWorldImpact:
            "Businesses have lost hundreds of thousands of dollars through confession of judgment seizures, often more than they originally borrowed.",
          legalContext:
            "Many states have banned or severely restricted confession of judgment clauses as unconscionable and predatory.",
          actionSteps: [
            "Contact legal aid if you've signed such an agreement",
            "Report to state attorney general",
            "File CFPB complaint",
            "Consult with business attorney immediately",
          ],
        },
      },
      {
        id: "rent_a_bank_2025",
        name: "Regulatory Arbitrage Scheme",
        category: "rent_a_bank",
        description:
          "Using national bank partnerships to evade state usury laws",
        implementation:
          "National bank partnership, state law preemption claims, regulatory shopping",
        harmLevel: 4,
        prevalence2025: 62,
        cfpbViolation: true,
        stateLawViolations: [
          "All states with usury caps below federal partner rates",
        ],
        realWorldExamples: [
          {
            company: "MoneyLion + MetaBank",
            description: "Partnership allows 750% APR in states with 36% caps",
            outcome: "Under regulatory scrutiny for rent-a-bank schemes",
            source: "NCLC rent-a-bank analysis 2025",
          },
          {
            company: "OppFi + FinWise Bank",
            description:
              "Utah bank partnership to bypass state interest rate caps",
            outcome: "Multiple state investigations ongoing",
            source: "State regulatory enforcement actions 2024-2025",
          },
        ],
        detectionCriteria: {
          uiElements: [".bank-partner", ".fdic-insured", ".national-bank"],
          textPatterns: [
            "issued by",
            "originated by",
            "bank partner",
            "fdic insured",
            "national bank",
            "utah bank",
            "delaware bank",
            "federal charter",
          ],
          behaviorIndicators: [
            "hidden_true_lender",
            "complex_structure",
            "rate_arbitrage",
          ],
          technicalSignals: [
            "multi_entity_flow",
            "jurisdiction_shopping",
            "preemption_claims",
          ],
        },
        psychologicalMechanism:
          "Authority bias (bank legitimacy), complexity concealment",
        targetVulnerabilities: [
          "Trust in bank brands",
          "Regulatory confusion",
          "Desperation",
        ],
        protectionStrategies: [
          "Check if actual lender is the bank or fintech company",
          "Verify if rate exceeds your state's usury cap",
          "Report rent-a-bank schemes to state regulators",
          "Look for actual state-chartered alternatives",
        ],
        educationalContent: {
          explanation:
            "Fintech companies partner with national banks to claim federal preemption of state consumer protection laws, charging illegal rates.",
          realWorldImpact:
            "Rent-a-bank schemes allow lenders to charge 400-700% APR in states that cap rates at 36%, costing borrowers billions annually.",
          legalContext:
            "Courts and regulators increasingly view rent-a-bank as sham arrangements designed to evade state law.",
          actionSteps: [
            "File complaint with state consumer protection agency",
            "Report to CFPB as potential evasion of state law",
            "Contact state attorney general about regulatory arbitrage",
            "Seek local alternatives with transparent licensing",
          ],
        },
      },
      {
        id: "drip_pricing_2025",
        name: "Deceptive Fee Disclosure",
        category: "drip_pricing",
        description:
          "Advertising low base price while gradually adding mandatory fees",
        implementation:
          "Prominent base rate, hidden additional fees, unclear total cost",
        harmLevel: 3,
        prevalence2025: 89,
        cfpbViolation: true,
        stateLawViolations: ["CA", "NY", "IL", "CT", "MA"],
        realWorldExamples: [
          {
            company: "SoLo Funds",
            description:
              'Advertised "0% APR" but collected mandatory tips resulting in 300%+ effective APR',
            outcome: "CFPB enforcement action for deceptive advertising",
            source: "CFPB v. SoLo Funds complaint 2024",
          },
        ],
        detectionCriteria: {
          uiElements: [
            ".base-rate",
            ".additional-fees",
            ".processing-fee",
            ".total-cost",
          ],
          textPatterns: [
            "plus fees",
            "additional charges",
            "processing fee",
            "verification fee",
            "platform fee",
            "service charge",
            "total may vary",
          ],
          behaviorIndicators: [
            "fee_revelation",
            "cost_obfuscation",
            "total_hiding",
          ],
          technicalSignals: [
            "dynamic_pricing",
            "fee_stacking",
            "disclosure_timing",
          ],
        },
        psychologicalMechanism:
          "Anchoring bias, sunk cost fallacy, commitment escalation",
        targetVulnerabilities: [
          "Price sensitivity",
          "Process momentum",
          "Time investment",
        ],
        protectionStrategies: [
          "Always ask for total repayment amount upfront",
          "Calculate your own APR before agreeing",
          "Compare total costs, not base rates",
          "Walk away if fees are revealed gradually",
        ],
        educationalContent: {
          explanation:
            "Drip pricing uses psychological anchoring to make you focus on a low base price while hiding the true cost through add-on fees.",
          realWorldImpact:
            "CFPB research shows drip pricing can increase total consumer costs by 21% compared to upfront pricing.",
          legalContext:
            "FTC has ruled that drip pricing can constitute deceptive advertising under Section 5 of the FTC Act.",
          actionSteps: [
            "Document fee disclosure timeline with screenshots",
            "Calculate and report true APR to CFPB",
            "File complaint about deceptive advertising",
            "Share experience to warn others",
          ],
        },
      },
      {
        id: "roach_motel_2025",
        name: "Easy Entry, Difficult Exit",
        category: "roach_motel",
        description:
          "Simple signup process but deliberately difficult cancellation",
        implementation:
          "One-click signup, hidden cancellation process, retention obstacles",
        harmLevel: 3,
        prevalence2025: 78,
        cfpbViolation: true,
        stateLawViolations: ["CA", "NY", "VT", "IL"],
        realWorldExamples: [
          {
            company: "Multiple fintech lenders",
            description:
              "Online signup in minutes, cancellation requires phone calls during business hours only",
            outcome:
              "State investigations into asymmetric cancellation processes",
            source: "Consumer protection agency reports 2024-2025",
          },
        ],
        detectionCriteria: {
          uiElements: [".signup-flow", ".cancellation-link", ".contact-only"],
          textPatterns: [
            "call to cancel",
            "during business hours",
            "speak with specialist",
            "retention offer",
            "hard to find cancel",
            "phone only",
          ],
          behaviorIndicators: [
            "asymmetric_difficulty",
            "hidden_cancellation",
            "retention_pressure",
          ],
          technicalSignals: [
            "flow_imbalance",
            "contact_requirements",
            "specialist_routing",
          ],
        },
        psychologicalMechanism:
          "Effort justification, status quo bias, loss aversion",
        targetVulnerabilities: [
          "Time constraints",
          "Conflict avoidance",
          "Process fatigue",
        ],
        protectionStrategies: [
          "Check cancellation process before signing up",
          "Look for online cancellation options",
          "Know your state's right to cancel laws",
          "Document cancellation attempts",
        ],
        educationalContent: {
          explanation:
            "The roach motel pattern makes it easy to get into a service but deliberately difficult to get out, trapping customers through friction.",
          realWorldImpact:
            "Studies show asymmetric cancellation processes can increase customer retention by 40% through pure friction rather than satisfaction.",
          legalContext:
            "Many states require that cancellation be no more difficult than signup, and California specifically prohibits roach motel patterns.",
          actionSteps: [
            "Document cancellation difficulty with timestamps",
            "File complaint with state consumer protection",
            "Report roach motel patterns to CFPB",
            "Demand written confirmation of cancellation",
          ],
        },
      },
    ];

    patterns2025.forEach((pattern) => {
      this.patterns.set(pattern.id, pattern);
    });
  }

  // Public API Methods
  startMonitoring(
    onDetection?: (detection: DarkPatternDetection) => void
  ): void {
    this.onPatternDetected = onDetection;
    this.isActivelyMonitoring = true;
    this.setupDOMObservation();
    this.performInitialScan();
  }

  stopMonitoring(): void {
    this.isActivelyMonitoring = false;
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    this.observationTargets.clear();
  }

  analyzeCurrentPage(): PatternAnalysisReport {
    const detections = this.scanForPatterns();
    return this.generateAnalysisReport(detections);
  }

  getPatternById(id: string): DarkPattern2025 | null {
    return this.patterns.get(id) || null;
  }

  getPatternsByCategory(category: string): DarkPattern2025[] {
    return Array.from(this.patterns.values()).filter(
      (p) => p.category === category
    );
  }

  generateEducationalAnnotations(
    detections: DarkPatternDetection[]
  ): EducationalAnnotation[] {
    return detections.map((detection) =>
      this.createAnnotationForDetection(detection)
    );
  }

  // Private Implementation Methods
  private setupDOMObservation(): void {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.scanElement(node as HTMLElement);
            }
          });
        }
        if (mutation.type === "attributes") {
          this.scanElement(mutation.target as HTMLElement);
        }
      });
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "data-tip", "data-amount", "style"],
    });
  }

  private performInitialScan(): void {
    const detections = this.scanForPatterns();
    detections.forEach((detection) => {
      if (this.onPatternDetected) {
        this.onPatternDetected(detection);
      }
    });
  }

  private scanForPatterns(): DarkPatternDetection[] {
    const detections: DarkPatternDetection[] = [];

    this.patterns.forEach((pattern) => {
      const detection = this.detectPattern(pattern);
      if (detection) {
        detections.push(detection);
      }
    });

    return detections;
  }

  private detectPattern(pattern: DarkPattern2025): DarkPatternDetection | null {
    const elements = this.findMatchingElements(pattern);
    if (elements.length === 0) return null;

    const evidence = this.gatherEvidence(pattern, elements);
    const confidence = this.calculateConfidence(pattern, elements, evidence);

    if (confidence < 0.3) return null; // Minimum confidence threshold

    return {
      patternId: pattern.id,
      confidence,
      detectedElements: elements,
      evidence,
      severity: this.calculateSeverity(pattern, confidence),
      immediateHarm: this.estimateImmediateHarm(pattern),
      longTermHarm: this.estimateLongTermHarm(pattern),
      recommendedAction: this.getRecommendedAction(pattern, confidence),
      userGuidance: this.generateUserGuidance(pattern),
      timestamp: new Date(),
    };
  }

  private findMatchingElements(pattern: DarkPattern2025): HTMLElement[] {
    const elements: HTMLElement[] = [];

    // Check UI elements
    pattern.detectionCriteria.uiElements.forEach((selector) => {
      try {
        const found = document.querySelectorAll(selector);
        found.forEach((el) => elements.push(el as HTMLElement));
      } catch (e) {
        // Invalid selector, skip
      }
    });

    // Check text patterns
    if (pattern.detectionCriteria.textPatterns.length > 0) {
      const textElements = this.findElementsWithText(
        pattern.detectionCriteria.textPatterns
      );
      elements.push(...textElements);
    }

    return [...new Set(elements)]; // Remove duplicates
  }

  private findElementsWithText(patterns: string[]): HTMLElement[] {
    const elements: HTMLElement[] = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent?.toLowerCase() || "";
      if (patterns.some((pattern) => text.includes(pattern.toLowerCase()))) {
        const element = node.parentElement;
        if (element) {
          elements.push(element);
        }
      }
    }

    return elements;
  }

  private gatherEvidence(
    pattern: DarkPattern2025,
    elements: HTMLElement[]
  ): string[] {
    const evidence: string[] = [];

    elements.forEach((element) => {
      // Text content evidence
      const text = element.textContent?.toLowerCase() || "";
      pattern.detectionCriteria.textPatterns.forEach((textPattern) => {
        if (text.includes(textPattern.toLowerCase())) {
          evidence.push(
            `Text pattern "${textPattern}" found in ${element.tagName}`
          );
        }
      });

      // Attribute evidence
      if (element.hasAttribute("data-tip")) {
        evidence.push("Data-tip attribute indicates tip-related functionality");
      }

      // Style evidence
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") {
        evidence.push("Hidden element may indicate concealed information");
      }

      // Form evidence
      if (element.tagName === "INPUT" && element.hasAttribute("checked")) {
        evidence.push(
          "Pre-checked input suggests default selection manipulation"
        );
      }
    });

    return evidence;
  }

  private calculateConfidence(
    pattern: DarkPattern2025,
    elements: HTMLElement[],
    evidence: string[]
  ): number {
    let confidence = 0;

    // Base confidence from element matches
    confidence += Math.min(elements.length * 0.2, 0.6);

    // Evidence strength
    confidence += Math.min(evidence.length * 0.1, 0.3);

    // Pattern-specific boosters
    if (pattern.category === "tip_coercion") {
      const hasTipElements = elements.some(
        (el) => el.className.includes("tip") || el.textContent?.includes("tip")
      );
      if (hasTipElements) confidence += 0.3;
    }

    if (pattern.category === "confession_judgment") {
      const hasLegalTerms = evidence.some(
        (e) => e.includes("confession") || e.includes("judgment")
      );
      if (hasLegalTerms) confidence += 0.4;
    }

    return Math.min(confidence, 1.0);
  }

  private calculateSeverity(
    pattern: DarkPattern2025,
    confidence: number
  ): "low" | "medium" | "high" | "critical" {
    const riskScore = pattern.harmLevel * confidence;

    if (riskScore >= 4) return "critical";
    if (riskScore >= 3) return "high";
    if (riskScore >= 2) return "medium";
    return "low";
  }

  private estimateImmediateHarm(pattern: DarkPattern2025): number {
    const baseHarm = {
      tip_coercion: 50,
      confession_judgment: 1000,
      rent_a_bank: 200,
      drip_pricing: 100,
      roach_motel: 30,
      consent_theater: 20,
      fake_urgency: 75,
      social_proof: 40,
      privacy_zuckering: 15,
      forced_continuity: 120,
      bait_switch: 150,
      confirm_shaming: 25,
    };

    return baseHarm[pattern.category] || 50;
  }

  private estimateLongTermHarm(pattern: DarkPattern2025): number {
    // Long-term harm is typically 3-10x immediate harm for predatory lending
    return this.estimateImmediateHarm(pattern) * (3 + pattern.harmLevel);
  }

  private getRecommendedAction(
    pattern: DarkPattern2025,
    confidence: number
  ): "inform" | "warn" | "block" | "redirect" {
    if (pattern.harmLevel >= 4 && confidence > 0.7) return "block";
    if (pattern.harmLevel >= 3 && confidence > 0.6) return "warn";
    if (confidence > 0.5) return "inform";
    return "inform";
  }

  private generateUserGuidance(pattern: DarkPattern2025): string {
    return (
      pattern.protectionStrategies[0] ||
      "Exercise caution and consider alternatives."
    );
  }

  private scanElement(element: HTMLElement): void {
    if (!this.isActivelyMonitoring) return;

    this.patterns.forEach((pattern) => {
      const detection = this.detectPatternInElement(pattern, element);
      if (detection && this.onPatternDetected) {
        this.onPatternDetected(detection);
      }
    });
  }

  private detectPatternInElement(
    pattern: DarkPattern2025,
    element: HTMLElement
  ): DarkPatternDetection | null {
    // Simplified single-element detection
    const matches = this.checkElementMatches(pattern, element);
    if (!matches) return null;

    return {
      patternId: pattern.id,
      confidence: 0.8, // High confidence for direct matches
      detectedElements: [element],
      evidence: [`Direct match in ${element.tagName}`],
      severity: this.calculateSeverity(pattern, 0.8),
      immediateHarm: this.estimateImmediateHarm(pattern),
      longTermHarm: this.estimateLongTermHarm(pattern),
      recommendedAction: this.getRecommendedAction(pattern, 0.8),
      userGuidance: this.generateUserGuidance(pattern),
      timestamp: new Date(),
    };
  }

  private checkElementMatches(
    pattern: DarkPattern2025,
    element: HTMLElement
  ): boolean {
    // Check if element matches pattern criteria
    const className = element.className.toLowerCase();
    const textContent = element.textContent?.toLowerCase() || "";

    // UI element matching
    const uiMatch = pattern.detectionCriteria.uiElements.some((selector) => {
      try {
        return element.matches(selector.replace(".", ""));
      } catch {
        return className.includes(selector.replace(".", ""));
      }
    });

    // Text pattern matching
    const textMatch = pattern.detectionCriteria.textPatterns.some(
      (textPattern) => textContent.includes(textPattern.toLowerCase())
    );

    return uiMatch || textMatch;
  }

  private generateAnalysisReport(
    detections: DarkPatternDetection[]
  ): PatternAnalysisReport {
    const overallRisk = this.calculateOverallRisk(detections);
    const vulnerabilityExploitation =
      this.analyzeVulnerabilityExploitation(detections);
    const regulatoryViolations = this.identifyRegulatoryViolations(detections);
    const financialHarm = this.calculateFinancialHarm(detections);

    return {
      overallRisk,
      detectedPatterns: detections,
      vulnerabilityExploitation,
      regulatoryViolations,
      financialHarmEstimate: financialHarm,
      protectionRecommendations:
        this.generateProtectionRecommendations(detections),
      educationalPriorities: this.identifyEducationalPriorities(detections),
    };
  }

  private calculateOverallRisk(detections: DarkPatternDetection[]): number {
    if (detections.length === 0) return 0;

    const totalRisk = detections.reduce((sum, detection) => {
      const pattern = this.patterns.get(detection.patternId);
      if (!pattern) return sum;
      return sum + pattern.harmLevel * detection.confidence;
    }, 0);

    return Math.min(
      Math.round((totalRisk / (detections.length * 5)) * 100),
      100
    );
  }

  private analyzeVulnerabilityExploitation(
    detections: DarkPatternDetection[]
  ): any {
    const vulnerabilities = new Set<string>();
    const tactics = new Set<string>();

    detections.forEach((detection) => {
      const pattern = this.patterns.get(detection.patternId);
      if (pattern) {
        pattern.targetVulnerabilities.forEach((v) => vulnerabilities.add(v));
        tactics.add(pattern.psychologicalMechanism);
      }
    });

    return {
      score: Math.min(detections.length * 15, 100),
      targetedDemographics: [
        "Low-income individuals",
        "Financially stressed",
        "Limited tech literacy",
      ],
      exploitationTactics: Array.from(tactics),
      psychologicalPressure: Math.min(detections.length * 2, 10),
    };
  }

  private identifyRegulatoryViolations(
    detections: DarkPatternDetection[]
  ): any {
    const cfpbViolations = new Set<string>();
    const stateViolations: Array<{ state: string; violation: string }> = [];
    const ftcViolations = new Set<string>();

    detections.forEach((detection) => {
      const pattern = this.patterns.get(detection.patternId);
      if (pattern) {
        if (pattern.cfpbViolation) {
          cfpbViolations.add(`${pattern.name} - Abusive/Deceptive Practice`);
        }

        pattern.stateLawViolations.forEach((state) => {
          stateViolations.push({
            state,
            violation: `${pattern.name} violates ${state} consumer protection laws`,
          });
        });

        ftcViolations.add(`Section 5 FTC Act - ${pattern.name}`);
      }
    });

    return {
      cfpb: Array.from(cfpbViolations),
      state: stateViolations,
      ftc: Array.from(ftcViolations),
    };
  }

  private calculateFinancialHarm(detections: DarkPatternDetection[]): any {
    const immediate = detections.reduce((sum, d) => sum + d.immediateHarm, 0);
    const longTerm = detections.reduce((sum, d) => sum + d.longTermHarm, 0);

    return {
      immediate,
      longTerm,
      comparisonToAlternatives: immediate * 3, // Typically 3x more expensive than alternatives
    };
  }

  private generateProtectionRecommendations(
    detections: DarkPatternDetection[]
  ): string[] {
    const recommendations = new Set<string>();

    detections.forEach((detection) => {
      const pattern = this.patterns.get(detection.patternId);
      if (pattern) {
        pattern.protectionStrategies.forEach((strategy) =>
          recommendations.add(strategy)
        );
      }
    });

    return Array.from(recommendations).slice(0, 8);
  }

  private identifyEducationalPriorities(
    detections: DarkPatternDetection[]
  ): string[] {
    const priorities = new Set<string>();

    detections.forEach((detection) => {
      const pattern = this.patterns.get(detection.patternId);
      if (pattern) {
        priorities.add(`Understanding ${pattern.name}`);
        priorities.add(`Recognizing ${pattern.category} patterns`);
      }
    });

    return Array.from(priorities).slice(0, 6);
  }

  public createAnnotationForDetection(
    detection: DarkPatternDetection
  ): EducationalAnnotation {
    const pattern = this.patterns.get(detection.patternId);
    if (!pattern) {
      throw new Error(`Pattern not found: ${detection.patternId}`);
    }

    const element = detection.detectedElements[0];
    const rect = element?.getBoundingClientRect() || {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };

    return {
      id: `annotation-${detection.patternId}-${Date.now()}`,
      patternId: detection.patternId,
      title: `⚠️ ${pattern.name}`,
      description: pattern.description,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      },
      content: {
        explanation: pattern.educationalContent.explanation,
        harmAnalysis: pattern.educationalContent.realWorldImpact,
        protectionTip: pattern.protectionStrategies[0] || "Exercise caution",
        legalInformation: pattern.educationalContent.legalContext,
        alternatives: pattern.protectionStrategies.slice(1, 4),
      },
      interactionType: detection.severity === "critical" ? "auto" : "hover",
      dismissible: true,
      urgencyLevel: this.mapSeverityToUrgency(detection.severity),
    };
  }

  private mapSeverityToUrgency(
    severity: string
  ): "info" | "warning" | "danger" | "critical" {
    const mapping: Record<string, "info" | "warning" | "danger" | "critical"> =
      {
        low: "info",
        medium: "warning",
        high: "danger",
        critical: "critical",
      };
    return mapping[severity] || "info";
  }
}

export default CentralizedDarkPatternEngine;
