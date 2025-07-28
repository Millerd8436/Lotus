"use client";

// components/shared/UrgencyTimer.tsx
"use client";

import { useState, useEffect } from 'react';

interface UrgencyTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onTimerEnd?: () => void;
}

export const UrgencyTimer: React.FC<UrgencyTimerProps> = ({ 
  initialMinutes = 5, 
  initialSeconds = 0,
  onTimerEnd
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          if(onTimerEnd) onTimerEnd();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [minutes, seconds, onTimerEnd]);

  return (
    <div className="bg-red-500 text-white text-center p-2 rounded-md my-4">
      <p className="font-bold">
        Offer expires in: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
}; 
