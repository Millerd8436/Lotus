"use client";

// components/shared/CollapsibleSection.tsx
"use client";

import { useState, ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface CollapsibleSectionProps {
  title: ReactNode;
  children: ReactNode;
  startOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t border-gray-200 py-4">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none"
      >
        <span className="text-blue-600 hover:underline">{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 text-sm text-gray-600 prose prose-sm max-w-none">
          {children}
        </div>
      )}
    </div>
  );
}; 
