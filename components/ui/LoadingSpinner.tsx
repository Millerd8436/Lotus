import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "neutral" | "exploitative" | "ethical" | "analysis" | "professional";
  message?: string;
  showProgress?: boolean;
  progress?: number;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  theme = "neutral",
  message = "Loading...",
  showProgress = false,
  progress = 0,
  className = "",
}) => {
  const themes = {
    neutral: {
      bg: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
      color: "#1f2937",
      spinner: "#3b82f6",
      border: "#d1d5db",
    },
    exploitative: {
      bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      color: "#92400e",
      spinner: "#f97316",
      border: "#fbbf24",
    },
    ethical: {
      bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      color: "#166534",
      spinner: "#22c55e",
      border: "#86efac",
    },
    analysis: {
      bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      color: "#075985",
      spinner: "#0ea5e9",
      border: "#7dd3fc",
    },
    professional: {
      bg: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      color: "#334155",
      spinner: "#64748b",
      border: "#cbd5e1",
    },
  };

  const sizes = {
    sm: {
      container: "h-16 w-16",
      spinner: "h-8 w-8",
      text: "text-sm",
    },
    md: {
      container: "h-24 w-24",
      spinner: "h-12 w-12",
      text: "text-base",
    },
    lg: {
      container: "h-32 w-32",
      spinner: "h-16 w-16",
      text: "text-lg",
    },
    xl: {
      container: "h-48 w-48",
      spinner: "h-24 w-24",
      text: "text-xl",
    },
  };

  const currentTheme = themes[theme];
  const currentSize = sizes[size];

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${className}`}
      style={{
        background: currentTheme.bg,
        borderColor: currentTheme.border,
        color: currentTheme.color,
      }}
    >
      {/* Spinner */}
      <div className={`relative ${currentSize.container} mb-4`}>
        <div
          className={`${currentSize.spinner} border-4 border-transparent border-t-current rounded-full animate-spin`}
          style={{ borderTopColor: currentTheme.spinner }}
        />

        {/* Optional inner spinner for more complex animation */}
        {size === "lg" || size === "xl" ? (
          <div
            className={`absolute inset-2 border-2 border-transparent border-r-current rounded-full animate-spin`}
            style={{
              borderRightColor: currentTheme.spinner,
              animationDirection: "reverse",
              animationDuration: "1.5s",
            }}
          />
        ) : null}
      </div>

      {/* Message */}
      <div className={`text-center ${currentSize.text} font-medium`}>
        <div className="mb-2">{message}</div>

        {/* Progress bar */}
        {showProgress && (
          <div className="w-full max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${currentTheme.spinner}, ${currentTheme.spinner}dd)`,
                }}
              />
            </div>
            <div className="text-xs opacity-75">{Math.round(progress)}%</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Specialized loading components for different contexts
export const ExploitativeLoadingSpinner: React.FC<
  Omit<LoadingSpinnerProps, "theme">
> = (props) => <LoadingSpinner {...props} theme="exploitative" />;

export const EthicalLoadingSpinner: React.FC<
  Omit<LoadingSpinnerProps, "theme">
> = (props) => <LoadingSpinner {...props} theme="ethical" />;

export const AnalysisLoadingSpinner: React.FC<
  Omit<LoadingSpinnerProps, "theme">
> = (props) => <LoadingSpinner {...props} theme="analysis" />;

export const ProfessionalLoadingSpinner: React.FC<
  Omit<LoadingSpinnerProps, "theme">
> = (props) => <LoadingSpinner {...props} theme="professional" />;

// Skeleton loading component
export const SkeletonLoader: React.FC<{
  lines?: number;
  className?: string;
  variant?: "text" | "card" | "button";
}> = ({ lines = 3, className = "", variant = "text" }) => {
  const baseClasses = "animate-pulse bg-gray-200 rounded";

  const variants = {
    text: "h-4 mb-2",
    card: "h-32 mb-4",
    button: "h-10 w-24",
  };

  const skeletonClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (variant === "card") {
    return (
      <div className="space-y-4">
        <div className={skeletonClasses} />
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={`${baseClasses} h-4`}
              style={{ width: `${100 - i * 10}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "button") {
    return <div className={skeletonClasses} />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={skeletonClasses}
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  );
};

// Page loading overlay
export const PageLoadingOverlay: React.FC<{
  isVisible: boolean;
  message?: string;
  theme?: LoadingSpinnerProps["theme"];
}> = ({ isVisible, message = "Loading page...", theme = "neutral" }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 shadow-2xl">
        <LoadingSpinner
          size="lg"
          theme={theme}
          message={message}
          showProgress={true}
          progress={0}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
