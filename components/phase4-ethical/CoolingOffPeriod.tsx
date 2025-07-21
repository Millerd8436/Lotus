import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface CoolingOffPeriodProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const CoolingOffPeriod: React.FC<CoolingOffPeriodProps> = ({ onConfirm, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Cooling-Off Period</h2>
      <p className="mb-4">
        You have a mandatory 24-hour cooling-off period to reconsider your loan. You can cancel at any time during this period with no penalty.
      </p>
      <div className="text-4xl font-bold text-center my-8">{formatTime(timeLeft)}</div>
      <div className="flex gap-4">
        <Button onClick={onConfirm} className="flex-1">
          Confirm Loan
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Cancel Loan
        </Button>
      </div>
    </Card>
  );
};

export default CoolingOffPeriod;
