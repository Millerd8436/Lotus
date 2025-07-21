import React, { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

interface InformedConsentStepProps {
  loanAmount: number;
  totalRepayment: number;
  apr: number;
  onConfirm: () => void;
}

const InformedConsentStep: React.FC<InformedConsentStepProps> = ({
  loanAmount,
  totalRepayment,
  apr,
  onConfirm,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <Card className="p-6 bg-yellow-50 border-yellow-300">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Final Confirmation</h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Please review and confirm you understand the following critical details before finalizing your application. This is the last step.
      </p>
      
      <div className="bg-white p-4 rounded-lg shadow-inner">
        <h4 className="font-semibold text-gray-700 mb-3">Informed Consent Checklist</h4>
        <ul className="list-disc list-inside text-sm space-y-2 text-gray-800">
          <li>You are borrowing <strong>${loanAmount.toFixed(2)}</strong>.</li>
          <li>You will repay a total of <strong>${totalRepayment.toFixed(2)}</strong>.</li>
          <li>The Annual Percentage Rate (APR) is <strong>{apr.toFixed(2)}%</strong>.</li>
          <li>You have a 24-hour cooling-off period after submission to cancel without penalty.</li>
          <li>This loan is designed to be affordable and avoids the debt-trap cycles of predatory loans.</li>
        </ul>
      </div>

      <div className="mt-6 flex items-center">
        <input 
          type="checkbox"
          id="consent-checkbox"
          checked={isConfirmed}
          onChange={(e) => setIsConfirmed(e.target.checked)}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="consent-checkbox" className="ml-2 block text-sm text-gray-900">
          I have read, understood, and agree to these terms.
        </label>
      </div>

      <Button
        onClick={onConfirm}
        disabled={!isConfirmed}
        className="w-full mt-6"
      >
        {isConfirmed ? 'Submit Final Application' : 'Please Confirm Understanding'}
      </Button>
    </Card>
  );
};

export default InformedConsentStep; 