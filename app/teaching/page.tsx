"use client";

import DeceptiveCheckoutFlow from "@/components/phase1-exploitative/DeceptiveCheckoutFlow";
import RealTimeAnnotationEngine from "@/components/phase3-teaching/RealTimeAnnotationEngine";
import React from "react";

const TeachingPage = () => {
  const handlePatternDetected = (pattern: string, severity: number) => {
    console.log("Pattern detected:", pattern, "Severity:", severity);
  };

  const handleFinished = () => {
    console.log("Teaching phase complete");
  };

  return (
    <RealTimeAnnotationEngine isActive={true}>
      <DeceptiveCheckoutFlow
        phase="teaching"
        onPatternDetected={handlePatternDetected}
        onFinished={handleFinished}
      />
    </RealTimeAnnotationEngine>
  );
};

export default TeachingPage;
