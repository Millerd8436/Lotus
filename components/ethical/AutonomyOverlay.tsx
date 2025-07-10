import React, { useEffect, useState } from "react";
import { ComprehensiveSessionState } from "../../types/lotus";

// Mock implementations for removed autonomy-theater
class ThreePhaseAutonomyTheater {
  autonomyScore: number;
  violations: any[];
  recommendations: any[];
  
  constructor(phase: number) {
    this.autonomyScore = 80 - (phase * 10);
    this.violations = [];
    this.recommendations = [];
  }
  
  getAutonomyScore() { return this.autonomyScore; }
  getViolations() { return this.violations; }
  getRecommendations() { return this.recommendations; }
}

const createPhaseAutonomyTheater = (phase: number) => new ThreePhaseAutonomyTheater(phase);

interface AutonomyOverlayProps {
  phase: 1 | 2 | 3;
  session?: ComprehensiveSessionState;
}

const AutonomyOverlay: React.FC<AutonomyOverlayProps> = ({ phase, session }) => {
  const [theater, setTheater] = useState<ThreePhaseAutonomyTheater | null>(null);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    const t = createPhaseAutonomyTheater(phase);
    setTheater(t);
    setReport(t);
  }, [phase, session]);

  if (!theater || !report) return null;

  return (
    <div style={{ fontFamily: "inherit" }}>
      <div style={{ fontWeight: 700, color: "#16a34a", fontSize: "1.1rem", marginBottom: 6 }}>
        Autonomy & Ethics Overlay
      </div>
      <div style={{ fontSize: "0.98rem", color: "#374151", marginBottom: 8 }}>
        <strong>Integrity Score:</strong> {report.autonomyScore}
      </div>
      <div style={{ fontSize: "0.95rem", color: "#0369a1", marginBottom: 8 }}>
        <strong>Violations:</strong> {report.violations.length}
      </div>
      <div style={{ fontSize: "0.93rem", color: "#64748b", marginBottom: 8 }}>
        <strong>Ethical Assessment:</strong> {report.autonomyScore >= 70 ? "Ethical" : "Unethical"}
      </div>
      {report.recommendations && report.recommendations.length > 0 && (
        <div style={{ fontSize: "0.92rem", color: "#0e7490", marginBottom: 8 }}>
          <strong>Recommendations:</strong>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {report.recommendations.map((rec: string, i: number) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Educational notes for the phase */}
      {/* The original code had a timeline, but the new mock doesn't have it.
          Keeping the structure but noting the potential issue. */}
      {/* <div style={{ fontSize: "0.91rem", color: "#0e7490" }}>
          <strong>Educational Notes:</strong>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {report.timeline.slice(-3).map((event: any, i: number) => (
              event.details?.educationalNote ? <li key={i}>{event.details.educationalNote}</li> : null
            ))}
          </ul>
        </div> */}
    </div>
  );
};

export default AutonomyOverlay; 