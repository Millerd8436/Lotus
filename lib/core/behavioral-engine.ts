export interface BehavioralEvent {
  eventType: "click" | "hover" | "scroll" | "input_change";
  elementId: string;
  timestamp: number;
  value?: string;
  hesitation?: number; // Time in ms before action
}

export interface BehavioralProfile {
  vulnerabilityScore: number; // 0-100
  emotionalState: "calm" | "anxious" | "rushed" | "frustrated";
  cognitiveLoad: "low" | "medium" | "high";
  decisionFatigue: number; // 0-100
}

export type PredictedAction =
  | "Will accept add-ons"
  | "Will not read terms"
  | "Will accept loan"
  | "High churn risk"
  | "Seeking lowest payment";

const initialState: BehavioralProfile = {
  vulnerabilityScore: 20,
  emotionalState: "calm",
  cognitiveLoad: "low",
  decisionFatigue: 0,
};

// Mock engine to simulate real-time behavioral analysis
export class BehavioralPsychologyEngine {
  private profile: BehavioralProfile;

  constructor() {
    this.profile = { ...initialState };
  }

  // Processes a user event and updates the profile
  processEvent(event: BehavioralEvent): BehavioralProfile {
    // Simulate complex analysis based on event type
    switch (event.eventType) {
      case "hover":
        if (event.hesitation && event.hesitation > 1500) {
          this.profile.cognitiveLoad = "medium";
          this.profile.vulnerabilityScore = Math.min(
            this.profile.vulnerabilityScore + 2,
            90
          );
        }
        break;
      case "click":
        if (event.elementId.includes("urgent")) {
          this.profile.emotionalState = "rushed";
          this.profile.vulnerabilityScore = Math.min(
            this.profile.vulnerabilityScore + 5,
            90
          );
          this.profile.decisionFatigue = Math.min(
            this.profile.decisionFatigue + 3,
            80
          );
        }
        break;
      case "input_change":
        this.profile.decisionFatigue = Math.min(
          this.profile.decisionFatigue + 1,
          80
        );
        if (
          event.elementId.includes("ssn") ||
          event.elementId.includes("password")
        ) {
          this.profile.emotionalState = "anxious";
          this.profile.cognitiveLoad = "high";
        }
        break;
      case "scroll":
        // Fast scrolling could indicate frustration or being rushed
        this.profile.vulnerabilityScore = Math.min(
          this.profile.vulnerabilityScore + 0.5,
          90
        );
        break;
    }

    // Decay emotional state over time back to calm
    if (Math.random() < 0.1) {
      if (this.profile.emotionalState !== "calm") {
        this.profile.emotionalState = "calm";
      }
    }

    return this.getProfile();
  }

  getProfile(): BehavioralProfile {
    // Return a copy to prevent external mutation
    return { ...this.profile };
  }

  // Predicts the user's next likely action based on their profile
  predictNextAction(): PredictedAction {
    const { vulnerabilityScore, emotionalState, decisionFatigue } =
      this.profile;

    if (vulnerabilityScore > 70 && emotionalState === "rushed") {
      return "Will not read terms";
    }
    if (vulnerabilityScore > 60 && decisionFatigue > 50) {
      return "Will accept add-ons";
    }
    if (emotionalState === "anxious" && vulnerabilityScore > 50) {
      return "Will accept loan";
    }
    if (emotionalState === "frustrated") {
      return "High churn risk";
    }

    return "Seeking lowest payment";
  }

  reset() {
    this.profile = { ...initialState };
  }
}
