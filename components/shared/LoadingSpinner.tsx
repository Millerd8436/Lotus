"use client";

import { cn } from "@/core/utils";
import React from "react";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "neutral" | "exploitative" | "ethical" | "analysis" | "professional";
  className?: string;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  theme = "neutral",
  className = "",
  message,
}) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  const themes = {
    neutral: "border-gray-500",
    exploitative: "border-red-500",
    ethical: "border-green-500",
    analysis: "border-blue-500",
    professional: "border-slate-700",
  };

  const spinnerClasses = cn(
    "rounded-full animate-spin",
    sizes[size],
    themes[theme],
    "border-t-transparent",
    className
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={spinnerClasses} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export interface PageLoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  theme?: "neutral" | "exploitative" | "ethical" | "analysis" | "professional";
}

export const PageLoadingOverlay: React.FC<PageLoadingOverlayProps> = ({
  isVisible,
  message = "Processing...",
  theme = "professional",
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
      <LoadingSpinner size="lg" theme={theme} />
      <p className="mt-4 text-lg font-semibold text-slate-800">{message}</p>
    </div>
  );
};

export const SkeletonLoader: React.FC<{
  className?: string;
  count?: number;
}> = ({ className, count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={cn("bg-gray-200 rounded-md animate-pulse", className)}
    />
  ));
  return <>{skeletons}</>;
};
