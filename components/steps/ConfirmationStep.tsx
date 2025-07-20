"use client";

import { Button } from "@/components/ui/Button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

interface ConfirmationStepProps {
  onSetFeelsRespected: (value: boolean) => void;
  feelsRespected: boolean | null;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  onSetFeelsRespected,
  feelsRespected,
}) => {
  return (
    <div className="space-y-6 text-center">
      <div className="bg-purple-50 p-8 rounded-lg border border-purple-200">
        <h3 className="text-2xl font-bold text-purple-800 mb-4">
          One Final Question
        </h3>
        <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
          Our commitment is to treat every person with dignity and respect, as
          an end in themselves, not merely as a means to a profit. Your feedback
          is vital to this mission.
        </p>
        <p className="text-lg font-semibold text-gray-800 mb-6">
          Did you feel respected and fully informed throughout this process?
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => onSetFeelsRespected(true)}
            variant={feelsRespected === true ? "success" : "outline"}
            size="lg"
            className="flex items-center gap-2"
          >
            <ThumbsUp />
            Yes, I did
          </Button>
          <Button
            onClick={() => onSetFeelsRespected(false)}
            variant={feelsRespected === false ? "danger" : "outline"}
            size="lg"
            className="flex items-center gap-2"
          >
            <ThumbsDown />
            No, I did not
          </Button>
        </div>
        {feelsRespected === false && (
          <p className="text-red-600 mt-4">
            Thank you for your honesty. We will not proceed with the loan. A
            team member will reach out to understand how we can improve.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmationStep;
