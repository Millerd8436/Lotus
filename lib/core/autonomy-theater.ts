// lib/core/autonomy-theater.ts

export type UserAction =
  | "start-application"
  | "set-loan-amount"
  | "provide-personal-info"
  | "provide-income-info"
  | "agree-to-ach"
  | "agree-to-terms"
  | "submit-application";

export interface TheaterEvent {
  action: UserAction;
  timestamp: number;
  positiveFraming: string;
  progressIncrement: number;
}

export class AutonomyTheaterEngine {
  private static getFraming(
    action: UserAction,
    value?: any
  ): { positiveFraming: string; progressIncrement: number } {
    switch (action) {
      case "start-application":
        return {
          positiveFraming:
            "✅ You've taken the first step towards your financial solution!",
          progressIncrement: 10,
        };
      case "set-loan-amount":
        return {
          positiveFraming: `👍 You've selected a loan of $${value}. A smart choice to meet your needs!`,
          progressIncrement: 15,
        };
      case "provide-personal-info":
        return {
          positiveFraming: "👍 Great! Your personal details are confirmed.",
          progressIncrement: 20,
        };
      case "provide-income-info":
        return {
          positiveFraming:
            "💰 Your income is verified! You're a strong candidate.",
          progressIncrement: 20,
        };
      case "agree-to-ach":
        return {
          positiveFraming:
            "✍️ You've authorized secure, automatic payments. One less thing to worry about!",
          progressIncrement: 10,
        };
      case "agree-to-terms":
        return {
          positiveFraming:
            "🤝 You've agreed to the terms. We're happy to have you as a customer!",
          progressIncrement: 5,
        };
      case "submit-application":
        return {
          positiveFraming:
            "🎉 Congratulations! Your application is submitted and is on the fast track for approval.",
          progressIncrement: 20,
        };
      default:
        return {
          positiveFraming: "Step completed!",
          progressIncrement: 5,
        };
    }
  }

  public static generateEvent(action: UserAction, value?: any): TheaterEvent {
    const { positiveFraming, progressIncrement } =
      AutonomyTheaterEngine.getFraming(action, value);
    return {
      action,
      timestamp: Date.now(),
      positiveFraming,
      progressIncrement,
    };
  }
}
