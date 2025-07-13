import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "professional";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  darkPattern?: boolean;
  urgency?: boolean;
  manipulationContext?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  type = "button",
  darkPattern = false,
  urgency = false,
  manipulationContext = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500";

  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-md hover:shadow-lg",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl",
    success:
      "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-lg hover:shadow-xl",
    warning:
      "bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500 shadow-md hover:shadow-lg",
    professional:
      "bg-slate-700 hover:bg-slate-800 text-white focus:ring-slate-500 shadow-lg hover:shadow-xl border border-slate-600",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const darkPatternClasses = darkPattern
    ? "animate-pulse shadow-lg shadow-red-500/50"
    : "";
  const urgencyClasses = urgency
    ? "animate-bounce bg-gradient-to-r from-red-500 to-orange-500"
    : "";
  const fullWidthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || loading
      ? "opacity-50 cursor-not-allowed"
      : "hover:scale-105 active:scale-95";

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    darkPatternClasses,
    urgencyClasses,
    fullWidthClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (disabled || loading) return;

    // Track dark pattern usage if applicable
    if (darkPattern && manipulationContext) {
      console.log("Dark pattern detected:", manipulationContext);
      // Here you could integrate with the dark pattern engine
    }

    onClick?.();
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      data-dark-pattern={darkPattern}
      data-manipulation-context={manipulationContext}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

// Specialized button components for different contexts
export const UrgencyButton: React.FC<
  Omit<ButtonProps, "urgency"> & { countdown?: number }
> = ({ countdown, children, ...props }) => {
  return (
    <Button
      {...props}
      urgency={true}
      variant="danger"
      className="relative overflow-hidden"
    >
      {countdown && (
        <div className="absolute inset-0 bg-red-600 animate-pulse opacity-20" />
      )}
      <span className="relative z-10">{children}</span>
      {countdown && (
        <span className="absolute top-1 right-1 text-xs bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center">
          {countdown}
        </span>
      )}
    </Button>
  );
};

export const DarkPatternButton: React.FC<
  Omit<ButtonProps, "darkPattern"> & {
    patternType: string;
    educationalNote?: string;
  }
> = ({ patternType, educationalNote, children, ...props }) => {
  return (
    <Button
      {...props}
      darkPattern={true}
      variant="danger"
      className="relative group"
      manipulationContext={patternType}
    >
      {children}
      {educationalNote && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {educationalNote}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
        </div>
      )}
    </Button>
  );
};

export const PreCheckedButton: React.FC<
  ButtonProps & {
    preChecked?: boolean;
    autoRenewal?: boolean;
  }
> = ({ preChecked = false, autoRenewal = false, children, ...props }) => {
  return (
    <div className="relative">
      <Button
        {...props}
        variant={preChecked ? "danger" : "secondary"}
        className={`${preChecked ? "ring-2 ring-red-500" : ""}`}
      >
        {children}
        {preChecked && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            ✓
          </span>
        )}
      </Button>
      {autoRenewal && (
        <div className="text-xs text-gray-500 mt-1">Auto-renewal enabled</div>
      )}
    </div>
  );
};
