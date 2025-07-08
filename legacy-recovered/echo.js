// engine/echo.js
class Echo {
  constructor() {
    this.log = [];
    this.startTime = Date.now();
  }

  logAction(event, data = {}) {
    const timestamp = Date.now();
    this.log.push({
      event,
      data,
      timestamp,
      elapsed: timestamp - this.startTime,
    });
    // console.log("ECHO LOG:", event, data); // Optional: for debugging
  }

  calculateScore(session) {
    let score = 100;
    const penalties = {
      SKIPPED_CONSENT: 30,
      URGENCY_CUE: 15,
      DEFAULT_UNCHANGED: 10,
      FAST_DECISION: 5, // Per fast decision
    };

    const bonuses = {
      SLOW_DELIBERATE: 10,
      CHANGED_DEFAULT: 5,
    };

    this.log.forEach((entry, index) => {
      if (entry.event === "consent_skipped") {
        score -= penalties.SKIPPED_CONSENT;
      }
      if (entry.event.includes("urgency")) {
        score -= penalties.URGENCY_CUE;
      }
      if (entry.event === "default_accepted") {
        score -= penalties.DEFAULT_UNCHANGED;
      }
      if (entry.event === "decision_made") {
        const prevEntry = this.log[index - 1] || { timestamp: this.startTime };
        const timeSpent = entry.timestamp - prevEntry.timestamp;
        if (timeSpent < 3000) {
          // Less than 3 seconds
          score -= penalties.FAST_DECISION;
        } else if (timeSpent > 10000) {
          // More than 10 seconds
          score += bonuses.SLOW_DELIBERATE;
        }
      }
      if (entry.event === "default_changed") {
        score += bonuses.CHANGED_DEFAULT;
      }
    });

    // Integrate with LoanSession data
    score -= session.darkPatternsEncountered.length * 5;
    score += session.ethicalSafeguardsApplied.length * 5;

    return Math.max(0, Math.min(100, score));
  }

  getLog() {
    return this.log;
  }
}

export { Echo };
