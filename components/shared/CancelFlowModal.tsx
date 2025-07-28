"use client";

import React, { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { useRouter } from 'next/navigation';

interface CancelFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CancelFlowModal: React.FC<CancelFlowModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleRestart = () => {
    router.push('/');
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
            <p className="mb-6">We've already found you the best rates. Are you sure you want to abandon your application?</p>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(2)}>Yes, Cancel</Button>
              <Button onClick={onClose}>No, Continue</Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Don't Miss Out!</h3>
            <p className="mb-6">You are just moments away from receiving your funds. This offer may not be available again.</p>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setStep(3)}>I'm Sure, Cancel</Button>
              <Button onClick={onClose}>Continue Application</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Final Confirmation</h3>
            <p className="mb-6">Your application will be deleted and you will lose this exclusive offer.</p>
            <div className="flex justify-between">
              <Button variant="danger" onClick={handleRestart}>Yes, Delete My Application</Button>
              <Button onClick={onClose}>Keep My Application</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Application">
      {renderContent()}
    </Modal>
  );
}; 