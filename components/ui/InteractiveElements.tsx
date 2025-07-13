"use client";

import React, { useEffect, useRef, useState } from "react";

// Tooltip Component
interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  theme?: "neutral" | "exploitative" | "ethical" | "analysis";
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  theme = "neutral",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const themes = {
    neutral: "bg-gray-800 text-white border-gray-700",
    exploitative: "bg-red-600 text-white border-red-500",
    ethical: "bg-green-600 text-white border-green-500",
    analysis: "bg-blue-600 text-white border-blue-500",
  };

  const positions = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  const arrows = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-t-current border-l-transparent border-r-transparent border-b-transparent",
    bottom:
      "bottom-full left-1/2 transform -translate-x-1/2 border-b-current border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 transform -translate-y-1/2 border-l-current border-t-transparent border-b-transparent border-r-transparent",
    right:
      "right-full top-1/2 transform -translate-y-1/2 border-r-current border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-2 text-sm rounded-lg border shadow-lg transition-all duration-200 ${themes[theme]} ${positions[position]}`}
        >
          {content}
          <div className={`absolute w-0 h-0 border-4 ${arrows[position]}`} />
        </div>
      )}
    </div>
  );
};

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "neutral" | "exploitative" | "ethical" | "analysis";
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  theme = "neutral",
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const themes = {
    neutral: "border-gray-200 bg-white",
    exploitative: "border-red-200 bg-red-50",
    ethical: "border-green-200 bg-green-50",
    analysis: "border-blue-200 bg-blue-50",
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className={`w-full ${sizes[size]} bg-white rounded-xl shadow-2xl border-2 ${themes[theme]} transform transition-all duration-300 scale-100`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  theme?: "neutral" | "exploitative" | "ethical" | "analysis";
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  prefix = "",
  suffix = "",
  className = "",
  theme = "neutral",
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const themes = {
    neutral: "text-gray-900",
    exploitative: "text-red-600",
    ethical: "text-green-600",
    analysis: "text-blue-600",
  };

  useEffect(() => {
    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = displayValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(
        startValue + (value - startValue) * easeOutQuart
      );

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span
      className={`font-bold transition-all duration-300 ${themes[theme]} ${className} ${
        isAnimating ? "scale-110" : "scale-100"
      }`}
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

// Progress Bar Component
interface ProgressBarProps {
  progress: number;
  theme?: "neutral" | "exploitative" | "ethical" | "analysis";
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  theme = "neutral",
  showLabel = false,
  animated = true,
  className = "",
}) => {
  const themes = {
    neutral: "bg-blue-500",
    exploitative: "bg-red-500",
    ethical: "bg-green-500",
    analysis: "bg-blue-600",
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${themes[theme]} ${
            animated ? "animate-pulse" : ""
          }`}
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-sm text-gray-600 mt-1 text-center">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

// Notification Component
interface NotificationProps {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const types = {
    success: {
      icon: "✅",
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      iconBg: "bg-green-100",
    },
    error: {
      icon: "❌",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      iconBg: "bg-red-100",
    },
    warning: {
      icon: "⚠️",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      iconBg: "bg-yellow-100",
    },
    info: {
      icon: "ℹ️",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      iconBg: "bg-blue-100",
    },
  };

  const currentType = types[type];

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [autoClose, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full ${currentType.bg} ${currentType.border} border rounded-lg shadow-lg p-4 transform transition-all duration-300 translate-x-0`}
    >
      <div className="flex items-start">
        <div
          className={`flex-shrink-0 w-8 h-8 ${currentType.iconBg} rounded-full flex items-center justify-center`}
        >
          <span className="text-sm">{currentType.icon}</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${currentType.text}`}>{title}</h3>
          {message && (
            <p className={`mt-1 text-sm ${currentType.text} opacity-90`}>
              {message}
            </p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Notification Container
export const NotificationContainer: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return <div className="fixed top-4 right-4 z-50 space-y-2">{children}</div>;
};

// Hover Card Component
interface HoverCardProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  trigger,
  content,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {trigger}
      {isVisible && (
        <div className="absolute z-40 top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          {content}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white" />
        </div>
      )}
    </div>
  );
};

export default {
  Tooltip,
  Modal,
  AnimatedCounter,
  ProgressBar,
  Notification,
  NotificationContainer,
  HoverCard,
};
