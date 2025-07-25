import React from 'react';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';

interface InitialCaptureStepProps {
  onNext: () => void;
}

const InitialCaptureStep: React.FC<InitialCaptureStepProps> = ({ onNext }) => {
  return (
    <Card className="p-6 text-center">
      <h3 className="text-2xl font-bold mb-2">A Responsible Way to Borrow</h3>
      <p className="text-gray-600 mb-6">We provide clear, transparent terms so you can make an informed decision.</p>
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4 text-left">
        <h4 className="font-bold text-blue-900 mb-2">Example Loan: $500 for 30 days</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="font-semibold text-blue-800">Amount Financed:</p><p className="text-blue-800">$500.00</p>
          <p className="font-semibold text-blue-800">Finance Charge:</p><p className="text-blue-800">$50.00</p>
          <p className="font-semibold text-blue-800">Total of Payments:</p><p className="text-blue-800">$550.00</p>
          <p className="font-bold text-lg text-blue-900 mt-2">APR:</p><p className="font-bold text-lg text-blue-900 mt-2">450%</p>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={onNext} className="w-full">
          Learn More & Start Application
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        This is an expensive form of credit. Please consider alternatives.
      </p>
    </Card>
  );
};

export default InitialCaptureStep;
