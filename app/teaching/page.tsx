"use client";

import DeceptiveCheckoutFlow from "@/components/phase1-exploitative/DeceptiveCheckoutFlow";
import React from "react";

const TeachingPage = () => {
  return (
    <div>
      <DeceptiveCheckoutFlow
        initialData={{ loanAmount: 500, state: "TX" }}
        onComplete={(data) => {
          console.log("Teaching phase complete:", data);
        }}
        phase="teaching"
      />
    </div>
  );
};

export default TeachingPage;
