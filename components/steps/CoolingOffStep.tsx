"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle, Clock, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CoolingOffStepProps {
  onCoolingOffStart?: () => void;
  onCoolingOffComplete: () => void;
  startTime?: number | null;
}

const COOLING_OFF_PERIOD_MS = 24 * 60 * 60 * 1000; // 24 hours

const CoolingOffStep: React.FC<CoolingOffStepProps> = ({
  onCoolingOffStart,
  onCoolingOffComplete,
}) => {
  const [internalStartTime, setInternalStartTime] = useState<number | null>(
    null
  );
  const [remainingTime, setRemainingTime] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!internalStartTime) {
      setIsCompleted(false);
      setRemainingTime("");
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - internalStartTime;
      const remaining = COOLING_OFF_PERIOD_MS - elapsed;

      if (remaining <= 0) {
        clearInterval(interval);
        setRemainingTime("00:00:00");
        setIsCompleted(true);
        onCoolingOffComplete();
      } else {
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor(
          (remaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setRemainingTime(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [internalStartTime, onCoolingOffComplete]);

  const handleStart = () => {
    const now = Date.now();
    setInternalStartTime(now);
    if (onCoolingOffStart) {
      onCoolingOffStart();
    }
  };

  if (isCompleted) {
    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h4 className="text-xl font-bold text-green-800 mb-2">
          Reflection Period Complete
        </h4>
        <p className="text-green-700">
          You may now proceed to the next step if you still wish to continue.
        </p>
      </div>
    );
  }

  if (internalStartTime) {
    return (
      <div className="space-y-6 text-center">
        <div className="bg-blue-50 p-8 rounded-full w-40 h-40 mx-auto flex flex-col justify-center items-center border-4 border-blue-200">
          <Clock className="w-16 h-16 text-blue-600" />
          <p className="text-blue-800 font-semibold text-lg mt-2">
            {remainingTime}
          </p>
        </div>
        <p className="text-blue-800 mb-4">Time remaining for reflection</p>
        <div className="bg-white p-4 rounded border border-blue-300">
          <p className="text-sm text-blue-700">
            We'll send you an email when your reflection period is complete. Use
            this time wisely to ensure this is the right decision for you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-8 h-8 text-red-600" />
          <h3 className="font-bold text-red-900 text-xl">
            Mandatory 24-Hour Cooling-Off Period
          </h3>
        </div>
        <div className="space-y-4 text-red-800">
          <p className="text-lg">
            Following Kantian ethics, we respect your autonomy by requiring time
            for reflection.
          </p>
          <div className="bg-white p-4 rounded border border-red-300">
            <h4 className="font-semibold mb-2">During this time, please:</h4>
            <ul className="space-y-2 ml-6">
              <li>• Sleep on your decision</li>
              <li>• Discuss with trusted family or friends</li>
              <li>• Review your budget one more time</li>
              <li>• Consider the alternatives we showed you</li>
              <li>• Contact our free financial counselor</li>
            </ul>
          </div>
          <Button onClick={handleStart} variant="danger" className="w-full">
            Start 24-Hour Reflection Period
          </Button>
        </div>
      </div>
      <Card className="p-4 bg-blue-50">
        <div className="flex items-center gap-3 mb-2">
          <Phone className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-blue-800">
            Free Financial Counseling
          </h4>
        </div>
        <p className="text-sm text-blue-700">
          Speak with our certified financial counselor during this time:
          <strong> 1-800-LOTUS-HELP</strong>
          <br />
          Available 24/7, completely free, no sales pressure.
        </p>
      </Card>
    </div>
  );
};

export default CoolingOffStep;
