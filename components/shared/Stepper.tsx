"use client";

import React from 'react';
import { cn } from '@/core/utils';

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              index < currentStep
                ? "bg-green-500 text-white"
                : index === currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
            )}
          >
            {index + 1}
          </div>
          <span
            className={cn(
              "ml-2 text-sm",
              index <= currentStep ? "text-gray-900" : "text-gray-500"
            )}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-16 h-0.5 mx-4",
                index < currentStep ? "bg-green-500" : "bg-gray-300"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}; 