"use client";

import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <span className="relative group">
      {children}
      <span className="absolute bottom-full mb-2 w-48 p-2 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {content}
      </span>
    </span>
  );
}; 