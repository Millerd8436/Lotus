// components/ui/DarkPatternUI.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

type DarkPattern = "urgency" | "hidden-costs" | "roach-motel";

interface DarkPatternUIProps {
  pattern: DarkPattern;
}

const DarkPatternUI: React.FC<DarkPatternUIProps> = ({ pattern }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (pattern === "urgency") {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
    return; // Explicitly return undefined if the condition is not met.
  }, [pattern]);

  useEffect(() => {
    if (pattern === "urgency") {
      const notificationTimer = setInterval(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }, 15000);
      return () => clearInterval(notificationTimer);
    }
    return; // Explicitly return undefined if the condition is not met.
  }, [pattern]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (pattern === "urgency") {
    return (
      <div className="border rounded-lg shadow-lg max-w-sm mx-auto bg-white">
        <div className="p-4 bg-yellow-100 border-b">
          <h3 className="font-bold text-lg text-yellow-800">
            Limited Time Offer!
          </h3>
          <p className="text-sm">
            You&apos;ve unlocked a special offer! But it expires in{" "}
            <span className="font-bold text-red-500">
              {formatTime(countdown)}
            </span>
            .
          </p>
        </div>
        <div className="p-4">
          <p className="text-gray-700">
            Act now to secure your funds. This exclusive offer is only available
            for a short period.
          </p>
        </div>
        <div className="p-4 border-t">
          <h4 className="font-semibold mb-2">Social Proof</h4>
          <p className="text-sm">
            Join 1,000&apos;s of satisfied customers who got their cash fast!
          </p>
          {showNotification && (
            <div className="text-xs text-green-600 mt-2 animate-pulse">
              Someone from your city just got approved!
            </div>
          )}
        </div>
      </div>
    );
  } else if (pattern === "hidden-costs") {
    return (
      <div className="border rounded-lg shadow-lg max-w-sm mx-auto bg-white">
        <div className="p-4">
          <h3 className="font-bold text-lg">Transparent Pricing</h3>
          <p className="text-2xl font-bold my-4">
            Get $500 for just $45<span className="text-sm">*</span>
          </p>
          <Button>Get My Cash Now</Button>
          <p className="text-xs text-gray-500 mt-4">
            *This is a representative example. The fee is for a 14-day loan.
            Other fees may apply. APR is 391%. See terms for details.
          </p>
        </div>
      </div>
    );
  } else if (pattern === "roach-motel") {
    return (
      <div className="border rounded-lg shadow-lg max-w-sm mx-auto bg-white">
        <div className="p-4">
          <h3 className="font-bold text-lg">Easy Sign-up</h3>
          <p className="mb-4">
            Signing up is quick and easy. But cancellation is a different story.
          </p>
          <Button>One-Click Sign Up</Button>
        </div>
        <div className="p-4 border-t text-xs text-gray-500">
          <h4 className="font-semibold mb-2">Cancellation Policy</h4>
          <p>
            To cancel, please mail a written request to our P.O. Box. Requests
            are processed in 4-6 weeks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm text-center text-gray-500">
      Select a pattern to see it in action.
    </div>
  );
};

export default DarkPatternUI;
