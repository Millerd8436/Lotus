// lib/core/AutonomyTheaterEngine.ts

export type UserAction =
  | "start-application"
  | "set-loan-amount"
  | "provide-personal-info"
  | "provide-income-info"
  | "agree-to-ach"
  | "agree-to-terms"
  | "submit-application"
  | "view-fees"
  | "accept-rollover"
  | "decline-offer";

export interface TheaterEvent {
  action: UserAction;
  timestamp: number;
  positiveFraming: string;
  progressIncrement: number;
  manipulationLevel?: "low" | "medium" | "high";
  psychologicalTactic?: string;
}

export interface FramingData {
  positiveFraming: string;
  progressIncrement: number;
  manipulationLevel?: "low" | "medium" | "high";
  psychologicalTactic?: string;
}

export class AutonomyTheaterEngine {
  private static readonly FRAMINGS: Record<UserAction, FramingData> = {
    "start-application": {
      positiveFraming:
        "✅ You've taken the first step towards your financial solution!",
      progressIncrement: 10,
      manipulationLevel: "low",
      psychologicalTactic: "commitment_bias",
    },
    "set-loan-amount": {
      positiveFraming:
        "👍 Perfect amount selected! You're making smart financial decisions.",
      progressIncrement: 15,
      manipulationLevel: "medium",
      psychologicalTactic: "affirmation_manipulation",
    },
    "provide-personal-info": {
      positiveFraming:
        "🔒 Your information is secure with us. You're one step closer!",
      progressIncrement: 20,
      manipulationLevel: "low",
      psychologicalTactic: "trust_building",
    },
    "provide-income-info": {
      positiveFraming:
        "🎉 Excellent! Your income qualifies you for our BEST rates!",
      progressIncrement: 20,
      manipulationLevel: "high",
      psychologicalTactic: "false_scarcity",
    },
    "agree-to-ach": {
      positiveFraming:
        "⚡ You've unlocked INSTANT funding! Join thousands who get cash TODAY!",
      progressIncrement: 15,
      manipulationLevel: "high",
      psychologicalTactic: "social_proof",
    },
    "agree-to-terms": {
      positiveFraming:
        "🤝 You're all set! Just one final click to get your cash.",
      progressIncrement: 10,
      manipulationLevel: "medium",
      psychologicalTactic: "sunk_cost_fallacy",
    },
    "submit-application": {
      positiveFraming: "🚀 APPROVED! Your funds are being processed RIGHT NOW!",
      progressIncrement: 10,
      manipulationLevel: "high",
      psychologicalTactic: "false_urgency",
    },
    "view-fees": {
      positiveFraming: "💰 Transparent pricing - no hidden surprises here!",
      progressIncrement: 5,
      manipulationLevel: "medium",
      psychologicalTactic: "false_transparency",
    },
    "accept-rollover": {
      positiveFraming: "🔄 Smart choice! Keep your finances flexible.",
      progressIncrement: 0,
      manipulationLevel: "high",
      psychologicalTactic: "debt_normalization",
    },
    "decline-offer": {
      positiveFraming:
        "Are you sure? This exclusive offer expires in 60 seconds!",
      progressIncrement: 0,
      manipulationLevel: "high",
      psychologicalTactic: "loss_aversion",
    },
  };

  private static getFraming(action: UserAction, value?: any): FramingData {
    const baseFraming = this.FRAMINGS[action] || {
      positiveFraming: "Progress saved!",
      progressIncrement: 5,
    };

    // Customize framing based on value
    if (action === "set-loan-amount" && value) {
      return {
        ...baseFraming,
        positiveFraming: `👍 $${value} selected! That's a popular amount - you'll be approved quickly!`,
      };
    }

    return baseFraming;
  }

  public static generateEvent(action: UserAction, value?: any): TheaterEvent {
    const framing = this.getFraming(action, value);
    return {
      action,
      timestamp: Date.now(),
      ...framing,
    };
  }

  public static analyzeManipulation(events: TheaterEvent[]): {
    totalManipulation: number;
    tactics: Record<string, number>;
    progressManipulation: number;
  } {
    const tactics: Record<string, number> = {};
    let totalManipulation = 0;
    let progressManipulation = 0;

    events.forEach((event) => {
      if (event.manipulationLevel) {
        const levels = { low: 1, medium: 2, high: 3 };
        totalManipulation += levels[event.manipulationLevel];
      }

      if (event.psychologicalTactic) {
        tactics[event.psychologicalTactic] =
          (tactics[event.psychologicalTactic] || 0) + 1;
      }

      progressManipulation += event.progressIncrement;
    });

    return {
      totalManipulation,
      tactics,
      progressManipulation: Math.min(progressManipulation, 100),
    };
  }
}
