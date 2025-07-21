"use client";

import DeceptiveCheckoutFlow from "@/components/phase1-exploitative/DeceptiveCheckoutFlow";
import RealTimeAnnotationEngine from "@/components/phase3-teaching/RealTimeAnnotationEngine";
import React from "react";

const TeachingPage = () => {
  return (
    <RealTimeAnnotationEngine isActive={true}>
      <DeceptiveCheckoutFlow
        initialData={{ loanAmount: 500, state: "TX" }}
        onComplete={(data) => {
          console.log("Teaching phase complete:", data);
        }}
        phase="teaching"
      />
    </RealTimeAnnotationEngine>
  );
};

export default TeachingPage;
