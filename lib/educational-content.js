/**
 * Comprehensive Educational Content & Assessment Engine
 * Recovered from educational modules and content management systems
 * Part of the original 96,000+ line Lotus codebase
 */

// ============================================
// EDUCATIONAL CONTENT LIBRARY
// ============================================

export class EducationalContentEngine {
  constructor() {
    this.contentModules = this.loadContentModules();
    this.assessmentBank = this.loadAssessmentBank();
    this.interactiveElements = this.loadInteractiveElements();
    this.progressTracking = new ProgressTracker();
  }

  loadContentModules() {
    return {
      predatoryTacticsRecognition: {
        id: "predatory_tactics",
        title: "Recognizing Predatory Lending Tactics",
        learningObjectives: [
          "Identify common dark patterns in payday lending",
          "Understand psychological manipulation techniques",
          "Recognize urgency and scarcity tactics",
          "Spot hidden fees and misleading terms",
        ],
        content: {
          introduction: `
            Predatory lenders use sophisticated psychological tactics to manipulate desperate borrowers.
            These aren't accidental design choices - they're carefully crafted to exploit human psychology
            and cognitive biases. Understanding these tactics is your first line of defense.
          `,

          darkPatterns: {
            timePresssure: {
              description:
                "Creating artificial urgency to prevent careful consideration",
              examples: [
                'Countdown timers: "Only 5 minutes left to lock in this rate!"',
                'Limited availability: "Only 3 approvals left today!"',
                'Immediate decision required: "This offer expires if you navigate away"',
              ],
              psychology:
                "Time pressure activates System 1 thinking - fast, emotional, less analytical",
              defense:
                "Legitimate offers don't require split-second decisions. Take time to research.",
            },

            hiddenCosts: {
              description: "Emphasizing fees while hiding true APR costs",
              examples: [
                'Prominent "$15 fee" display with tiny "391% APR" disclosure',
                'Marketing "No credit check!" while hiding 400%+ interest rates',
                'Focusing on "Fast cash!" instead of total repayment amount',
              ],
              psychology:
                "Anchoring bias - first number seen influences all subsequent judgments",
              defense:
                "Always calculate total cost and compare APR to credit cards and bank loans.",
            },

            defaultManipulation: {
              description: "Pre-selecting options that benefit the lender",
              examples: [
                "Pre-checked auto-renewal checkbox",
                "Default opt-in to ACH automatic debit",
                "Pre-selected insurance and add-on products",
              ],
              psychology:
                "Status quo bias - people tend to stick with default options",
              defense: "Uncheck all boxes and consciously choose each option.",
            },

            socialProofDeception: {
              description: "Manufacturing false social validation",
              examples: [
                'Fake testimonials: "This saved my family!" - Sarah K.',
                'Volume claims: "10,000+ customers served this month"',
                'Popularity: "Most customers in your situation choose this option"',
              ],
              psychology:
                "Social proof - people follow perceived majority behavior",
              defense:
                "Verify testimonials and statistics. Question whether claims are real.",
            },
          },

          realWorldExamples: [
            {
              company: "Advance America",
              tactic: "Bait and switch pricing",
              description:
                "Advertised low fees but increased costs at final step",
              outcome: "$18M CFPB settlement in 2015",
              lesson: "Final terms can differ from initial advertising",
            },
            {
              company: "Check Into Cash",
              tactic: "Rollover pressure tactics",
              description: "Employees instructed to push rollovers over payoff",
              outcome: "Multiple state investigations",
              lesson: "Staff incentives may not align with your interests",
            },
          ],
        },

        keyTakeaways: [
          "If it feels rushed or pressured, it's probably a trap",
          "Calculate total cost, not just the fee",
          "Question all pre-checked boxes",
          "Verify social proof claims",
          "Consider alternatives before borrowing",
        ],
      },

      legalRightsEducation: {
        id: "legal_rights",
        title: "Your Legal Rights and Protections",
        learningObjectives: [
          "Understand federal consumer protection laws",
          "Know state-specific payday loan regulations",
          "Learn how to file complaints and seek help",
          "Recognize illegal collection practices",
        ],
        content: {
          federalProtections: {
            militaryLendingAct: {
              coverage: "Active duty military and dependents",
              protection: "36% APR cap on all consumer loans",
              rights: [
                "No prepayment penalties",
                "No mandatory arbitration",
                "Right to payoff amount disclosure",
                "Protection from rollover traps",
              ],
              howToUse:
                "Show military ID and ask lender to verify MLA compliance",
            },

            truthInLendingAct: {
              coverage: "All consumer credit transactions",
              protection: "Clear disclosure of credit costs",
              rights: [
                "APR must be clearly displayed",
                "Total finance charges disclosed",
                "Payment schedule provided",
                "Right to cancel within 3 days (some loans)",
              ],
              violations: "Contact CFPB if APR is hidden or misleading",
            },

            fairDebtCollection: {
              coverage: "Third-party debt collectors",
              protection: "Limits on collection practices",
              rights: [
                "No harassment or abuse",
                "No false statements about consequences",
                "Limited contact times (8 AM - 9 PM)",
                "Right to written validation of debt",
              ],
              violations: "Document violations and file CFPB complaint",
            },
          },

          stateProtections: {
            strongStates: {
              examples: [
                "California",
                "New York",
                "Arkansas",
                "North Carolina",
              ],
              protections: [
                "36% APR caps or payday loan bans",
                "Cooling-off periods between loans",
                "Database tracking to prevent debt cycling",
                "Strong enforcement agencies",
              ],
            },

            weakStates: {
              examples: ["Texas", "Nevada", "Utah", "Wisconsin"],
              risks: [
                "No effective APR caps",
                "CSO loopholes allow unlimited fees",
                "Minimal consumer protections",
                "Industry-friendly regulation",
              ],
              advice: "Be extra cautious - state law may not protect you",
            },
          },

          gettingHelp: {
            immediateHelp: [
              {
                resource: "National Foundation for Credit Counseling",
                contact: "1-800-388-2227",
                services: "Free credit counseling and debt management",
              },
              {
                resource: "United Way 2-1-1",
                contact: "Dial 2-1-1",
                services: "Local emergency assistance and resources",
              },
            ],

            legalHelp: [
              {
                resource: "Legal Aid Organizations",
                finder: "LawHelp.org",
                services: "Free legal assistance for low-income individuals",
              },
              {
                resource: "State Attorney General",
                contact:
                  'Search "[State] Attorney General consumer protection"',
                services: "File complaints and enforcement actions",
              },
            ],

            filing_complaints: [
              {
                agency: "Consumer Financial Protection Bureau (CFPB)",
                website: "consumerfinance.gov/complaint",
                handles: "Federal violations, unfair practices",
              },
              {
                agency: "State Banking Regulator",
                finder: "CSBS.org/find-regulator",
                handles: "State licensing and regulatory violations",
              },
            ],
          },
        },
      },

      alternativesEducation: {
        id: "alternatives",
        title: "Better Alternatives to Payday Loans",
        learningObjectives: [
          "Explore lower-cost borrowing options",
          "Learn about emergency assistance programs",
          "Understand how to negotiate with creditors",
          "Build emergency savings strategies",
        ],
        content: {
          emergencyOptions: {
            creditUnionLoans: {
              description: "Payday Alternative Loans (PALs) from credit unions",
              benefits: [
                "Maximum 28% APR by federal regulation",
                "Longer repayment terms (1-6 months)",
                "No rollover traps",
                "Credit building opportunities",
              ],
              eligibility: "Must be credit union member for 1+ months",
              howToFind: "Use NCUA.gov credit union locator",
            },

            bankPrograms: {
              description: "Small-dollar loan programs from banks",
              examples: [
                "Bank of America Balance Assist: $500, $5 fee",
                "Wells Fargo Flex Loan: $250-$500, $12-20 fee",
                "US Bank Simple Loan: $100-$1000, 6-12% APR",
              ],
              benefits: [
                "Much lower costs than payday loans",
                "Longer repayment terms",
                "No hidden fees",
              ],
            },

            employerPrograms: {
              description: "Employer-based emergency assistance",
              types: [
                "Salary advances from HR",
                "Employee assistance programs (EAPs)",
                "Emergency hardship funds",
                "Earned wage access apps (like DailyPay)",
              ],
              advantage: "Often free or very low cost",
            },
          },

          billManagement: {
            utilityAssistance: {
              description: "Programs to help with utility bills",
              options: [
                "LIHEAP (Low Income Home Energy Assistance Program)",
                "Utility company payment plans",
                "Salvation Army emergency assistance",
                "Local church and community programs",
              ],
              contact: "Call 2-1-1 for local program information",
            },

            negotiatingWithCreditors: {
              description: "How to work with creditors for more time",
              strategies: [
                "Call before you're late - explain situation",
                "Ask for payment plan or extension",
                "Request hardship program enrollment",
                "Get agreements in writing",
              ],
              whatToSay:
                '"I\'m experiencing temporary financial hardship. What payment options do you have available?"',
            },
          },

          longTermSolutions: {
            emergencyFund: {
              description: "Building savings for future emergencies",
              strategy:
                "Start with $25-50 per month in separate savings account",
              goal: "$500-1000 emergency fund",
              tips: [
                "Automate transfers on payday",
                "Save tax refunds and bonuses",
                "Use savings apps that round up purchases",
              ],
            },

            creditBuilding: {
              description: "Improving credit for better borrowing options",
              steps: [
                "Get free credit reports from annualcreditreport.com",
                "Pay all bills on time",
                "Pay down credit card balances",
                "Consider secured credit card if needed",
              ],
              timeframe:
                "Credit improvement takes 6-12 months of consistent effort",
            },
          },
        },
      },

      financialLiteracy: {
        id: "financial_literacy",
        title: "Essential Financial Literacy Skills",
        learningObjectives: [
          "Understand interest rates and APR",
          "Learn budgeting basics",
          "Recognize good debt vs bad debt",
          "Plan for financial emergencies",
        ],
        content: {
          interestRates: {
            aprExplained: {
              definition:
                "Annual Percentage Rate - the yearly cost of borrowing including fees",
              whyImportant: "Allows comparison between different loan products",
              examples: [
                "Credit card: 15-25% APR",
                "Personal loan: 6-36% APR",
                "Payday loan: 391-500% APR",
                "Auto loan: 3-12% APR",
              ],
              calculation:
                "Payday example: $15 fee on $100 for 14 days = 391% APR",
            },

            compoundInterest: {
              definition:
                "Interest charged on both principal and accumulated interest",
              impact: "Small amounts can grow quickly with high interest rates",
              example:
                "$300 payday loan at 391% APR costs $1,500+ if rolled over 10 times",
            },
          },

          budgetingBasics: {
            incomeVsExpenses: {
              income: "All money coming in (wages, benefits, side jobs)",
              fixedExpenses:
                "Same every month (rent, insurance, minimum payments)",
              variableExpenses:
                "Different each month (groceries, gas, entertainment)",
              goal: "Income should exceed total expenses",
            },

            priorityPayments: {
              tier1: "Housing, utilities, food, transportation",
              tier2: "Minimum debt payments, insurance",
              tier3: "Everything else",
              emergency: "If money is tight, focus on tier 1 and 2 only",
            },
          },

          debtManagement: {
            goodDebt: {
              definition:
                "Debt that helps build wealth or provides lasting value",
              examples: ["Mortgage", "Student loans", "Business loans"],
              characteristics:
                "Lower interest rates, tax benefits, builds assets",
            },

            badDebt: {
              definition: "High-interest debt for consumption",
              examples: [
                "Payday loans",
                "Credit cards for luxury items",
                "Auto title loans",
              ],
              characteristics:
                "High interest rates, no lasting value, debt traps",
            },

            payoffStrategies: {
              snowball:
                "Pay minimums on all debts, extra payment to smallest balance",
              avalanche:
                "Pay minimums on all debts, extra payment to highest interest rate",
              recommendation:
                "Avalanche saves more money, snowball provides motivation",
            },
          },
        },
      },
    };
  }

  loadAssessmentBank() {
    return {
      predatoryTacticsQuiz: [
        {
          id: "tactics_001",
          question:
            'A payday lender displays "Only $15 per $100 borrowed" prominently, but shows "APR: 391%" in small text at the bottom. This is an example of:',
          options: [
            "Clear and honest disclosure",
            "Anchoring bias manipulation",
            "Required legal disclosure",
            "Fair advertising practice",
          ],
          correct: 1,
          explanation:
            "This is anchoring bias manipulation. The prominent $15 fee anchors your perception, making the true 391% APR seem less important. This psychological tactic is designed to make you focus on the smaller number while minimizing the astronomical interest rate.",
          learningObjective: "Recognize hidden cost tactics",
        },

        {
          id: "tactics_002",
          question:
            'You see a countdown timer showing "4:32 remaining to lock in this rate!" What should you do?',
          options: [
            "Act quickly to avoid missing the deal",
            "Recognize this as artificial urgency and take your time",
            "Refresh the page to get more time",
            "Call them to negotiate for more time",
          ],
          correct: 1,
          explanation:
            "This is artificial urgency designed to pressure you into making a fast, emotional decision. Legitimate financial products don't require split-second decisions. Take time to research alternatives and read all terms carefully.",
          learningObjective: "Identify time pressure tactics",
        },

        {
          id: "alternatives_001",
          question:
            "If you need $200 for an emergency, which option would likely cost you the LEAST?",
          options: [
            "Payday loan at $15 per $100",
            "Credit union Payday Alternative Loan (PAL)",
            "Credit card cash advance at 25% APR",
            "Pawn shop loan",
          ],
          correct: 1,
          explanation:
            "Credit union PALs are capped at 28% APR by federal regulation, making them much cheaper than payday loans (391%+ APR), credit card advances (often 25%+ APR plus fees), or pawn shop loans (often 100%+ APR).",
          learningObjective: "Understand alternative borrowing costs",
        },

        {
          id: "rights_001",
          question:
            "You're active duty military. A payday lender offers you a loan at 45% APR. This is:",
          options: [
            "Legal because you agreed to it",
            "Illegal under the Military Lending Act",
            "Legal but unethical",
            "Only illegal if you're deployed",
          ],
          correct: 1,
          explanation:
            "The Military Lending Act caps APR at 36% for active duty service members and dependents. A 45% APR loan violates federal law and could result in criminal charges against the lender.",
          learningObjective: "Know military protections",
        },
      ],

      scenarioBasedAssessments: [
        {
          id: "scenario_001",
          title: "Emergency Utility Bill",
          setup:
            "Your electricity will be shut off tomorrow unless you pay $150. You have $50 in your account and don't get paid for 5 days.",
          options: [
            {
              choice: "Get a $150 payday loan",
              analysis:
                "Cost: $22.50 fee (391% APR). Risk: Debt cycle if you can't repay in full.",
              score: 2,
              feedback: "Most expensive option with high risk of debt trap.",
            },
            {
              choice: "Call utility company to negotiate payment plan",
              analysis:
                "Cost: Usually free. May avoid shutoff with partial payment and plan.",
              score: 9,
              feedback:
                "Excellent choice. Most utilities have hardship programs.",
            },
            {
              choice: "Ask family/friends for help",
              analysis:
                "Cost: Free (though may strain relationships if overused).",
              score: 8,
              feedback: "Good option if relationships can handle it.",
            },
            {
              choice: "Get credit union emergency loan",
              analysis:
                "Cost: Up to 28% APR, longer terms. But requires membership.",
              score: 7,
              feedback:
                "Good if you qualify, but may take time to join credit union.",
            },
          ],
          debrief:
            "Always try negotiating with creditors first. Many have hardship programs specifically for situations like this.",
        },
      ],
    };
  }

  loadInteractiveElements() {
    return {
      aprCalculator: {
        type: "calculator",
        title: "True Cost Calculator",
        description: "Calculate the real APR and total cost of any loan",
        inputs: ["principal", "fee", "term_days"],
        calculations: {
          apr: "(fee / principal) * (365 / term_days) * 100",
          total_cost: "principal + fee",
          daily_cost: "fee / term_days",
        },
        examples: [
          {
            principal: 300,
            fee: 45,
            term_days: 14,
            label: "Typical payday loan",
          },
          { principal: 300, fee: 7, term_days: 30, label: "Credit union PAL" },
        ],
      },

      debtCycleSimulator: {
        type: "simulation",
        title: "Debt Cycle Simulator",
        description: "See how rollover fees accumulate over time",
        parameters: {
          initial_amount: 300,
          fee_per_cycle: 45,
          cycles: 9,
        },
        visualization: "Chart showing cumulative fees vs. principal owed",
        insight:
          "After 9 cycles (18 weeks), you've paid $405 in fees but still owe the original $300",
      },

      choiceHeatmap: {
        type: "heatmap",
        title: "Decision Pressure Points",
        description:
          "Visualize where manipulation tactics influenced your choices",
        data_points: [
          "time_spent",
          "hesitation_detected",
          "manipulation_present",
        ],
        color_coding: {
          green: "Autonomous choice",
          yellow: "Some pressure",
          red: "High manipulation detected",
        },
      },

      stateComparison: {
        type: "map",
        title: "State Protection Comparison",
        description: "Interactive map showing payday loan regulations by state",
        data: "State APR caps, rollover limits, enforcement strength",
        interaction:
          "Click state to see detailed regulations and consumer protections",
      },
    };
  }

  generatePersonalizedContent(userProfile, sessionData, assessmentResults) {
    const personalization = {
      riskLevel: this.assessUserRiskLevel(userProfile, sessionData),
      knowledgeGaps: this.identifyKnowledgeGaps(assessmentResults),
      relevantContent: this.selectRelevantContent(userProfile),
      recommendedPath: this.createLearningPath(userProfile, assessmentResults),
    };

    return personalization;
  }

  assessUserRiskLevel(userProfile, sessionData) {
    let risk = 0;

    // Demographic risk factors
    if (userProfile.age < 25) risk += 10; // Less experience
    if (userProfile.income < 30000) risk += 15; // Financial stress
    if (userProfile.military) risk -= 5; // MLA protections
    if (userProfile.state === "TX" || userProfile.state === "NV") risk += 20; // Weak regulations

    // Behavioral risk factors
    if (sessionData.timeOnSite < 300) risk += 15; // Rushed decision
    if (sessionData.manipulationSusceptibility > 0.7) risk += 25; // High susceptibility
    if (sessionData.financialStress > 0.8) risk += 20; // Desperate situation

    return Math.min(risk, 100);
  }

  identifyKnowledgeGaps(assessmentResults) {
    const gaps = [];

    assessmentResults.forEach((result) => {
      if (result.score < 70) {
        gaps.push({
          topic: result.topic,
          deficiency: result.wrongAnswers,
          priority: result.score < 50 ? "high" : "medium",
        });
      }
    });

    return gaps;
  }

  createLearningPath(userProfile, assessmentResults) {
    const path = [];

    // Always start with predatory tactics recognition
    path.push({
      module: "predatoryTacticsRecognition",
      priority: "urgent",
      estimatedTime: "15 minutes",
      reason: "Essential for immediate protection",
    });

    // Add legal rights if user has protections
    if (userProfile.military || userProfile.state === "CA") {
      path.push({
        module: "legalRightsEducation",
        priority: "high",
        estimatedTime: "10 minutes",
        reason: "You have strong legal protections available",
      });
    }

    // Add alternatives if user shows borrowing intent
    if (userProfile.borrowingIntent > 0.5) {
      path.push({
        module: "alternativesEducation",
        priority: "urgent",
        estimatedTime: "20 minutes",
        reason: "Explore better options before borrowing",
      });
    }

    // Add financial literacy for long-term prevention
    path.push({
      module: "financialLiteracy",
      priority: "medium",
      estimatedTime: "25 minutes",
      reason: "Build skills to avoid future financial emergencies",
    });

    return path;
  }
}

// ============================================
// PROGRESS TRACKING AND ANALYTICS
// ============================================

class ProgressTracker {
  constructor() {
    this.userProgress = new Map();
    this.learningAnalytics = new Map();
  }

  trackProgress(userId, moduleId, activityType, data) {
    if (!this.userProgress.has(userId)) {
      this.userProgress.set(userId, {
        startDate: new Date(),
        modules: new Map(),
        assessments: [],
        totalTimeSpent: 0,
      });
    }

    const userRecord = this.userProgress.get(userId);

    switch (activityType) {
      case "module_started":
        this.trackModuleStart(userRecord, moduleId, data);
        break;
      case "module_completed":
        this.trackModuleCompletion(userRecord, moduleId, data);
        break;
      case "assessment_taken":
        this.trackAssessment(userRecord, moduleId, data);
        break;
      case "interactive_used":
        this.trackInteractiveUsage(userRecord, moduleId, data);
        break;
    }
  }

  generateProgressReport(userId) {
    const userRecord = this.userProgress.get(userId);
    if (!userRecord) return null;

    return {
      overallProgress: this.calculateOverallProgress(userRecord),
      moduleProgress: this.calculateModuleProgress(userRecord),
      knowledgeRetention: this.assessKnowledgeRetention(userRecord),
      timeInvestment: userRecord.totalTimeSpent,
      recommendedNext: this.recommendNextSteps(userRecord),
      achievements: this.calculateAchievements(userRecord),
    };
  }

  calculateOverallProgress(userRecord) {
    const totalModules = 4; // predatory, rights, alternatives, literacy
    const completedModules = Array.from(userRecord.modules.values()).filter(
      (module) => module.completed,
    ).length;

    return (completedModules / totalModules) * 100;
  }

  assessKnowledgeRetention(userRecord) {
    const assessments = userRecord.assessments;
    if (assessments.length === 0) return 0;

    const totalScore = assessments.reduce(
      (sum, assessment) => sum + assessment.score,
      0,
    );
    return totalScore / assessments.length;
  }

  recommendNextSteps(userRecord) {
    const recommendations = [];

    // Check for incomplete modules
    const moduleIds = [
      "predatory_tactics",
      "legal_rights",
      "alternatives",
      "financial_literacy",
    ];
    moduleIds.forEach((moduleId) => {
      if (
        !userRecord.modules.has(moduleId) ||
        !userRecord.modules.get(moduleId).completed
      ) {
        recommendations.push({
          type: "complete_module",
          moduleId,
          priority: moduleId === "predatory_tactics" ? "urgent" : "medium",
          reason: "Essential knowledge for protection",
        });
      }
    });

    // Check for low assessment scores
    userRecord.assessments.forEach((assessment) => {
      if (assessment.score < 70) {
        recommendations.push({
          type: "retake_assessment",
          moduleId: assessment.moduleId,
          priority: "medium",
          reason: "Improve understanding of key concepts",
        });
      }
    });

    return recommendations;
  }
}

// Export comprehensive educational system
export const educationalEngine = new EducationalContentEngine();
