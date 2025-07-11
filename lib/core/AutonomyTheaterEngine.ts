// lib/core/AutonomyTheaterEngine.ts

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
          positiveFraming:
            "🔒 Your information is secure with us. You're one step closer!",
          progressIncrement: 20,
        };
      case "provide-income-info":
        return {
          positiveFraming:
            "🎉 Excellent! We've confirmed your income. This speeds things up!",
          progressIncrement: 20,
        };
      case "agree-to-ach":
        return {
          positiveFraming:
            "⚡ You've unlocked FAST-TRACK funding! The most popular choice.",
          progressIncrement: 15,
        };
      case "agree-to-terms":
        return {
          positiveFraming:
            "🤝 You're all set! Just one final click to get your cash.",
          progressIncrement: 10,
        };
      case "submit-application":
        return {
          positiveFraming:
            "🚀 Your application is on its way! We'll have an answer in minutes.",
          progressIncrement: 10,
        };
      default:
        return {
          positiveFraming: "Progressing nicely!",
          progressIncrement: 5,
        };
    }
  }

  public static generateEvent(action: UserAction, value?: any): TheaterEvent {
    const framing = this.getFraming(action, value);
    return {
      action,
      timestamp: Date.now(),
      ...framing,
    };
  }
}
