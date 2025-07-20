"use client";

import { cn } from "@/core/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark-pattern' | 'ethical' | 'warning' | 'success';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  highlight?: boolean;
  urgency?: boolean;
  manipulationContext?: string;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', size = 'md', interactive = false, highlight = false, urgency = false, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-card text-card-foreground border-border',
      'dark-pattern': 'bg-red-50 border-red-200 text-red-900',
      ethical: 'bg-green-50 border-green-200 text-green-900',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      success: 'bg-blue-50 border-blue-200 text-blue-900',
    };
    const sizeClasses = {
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    };
    const interactiveClasses = interactive ? 'cursor-pointer hover:shadow-md' : '';
    const highlightClasses = highlight ? 'ring-2 ring-blue-500' : '';
    const urgencyClasses = urgency ? 'animate-pulse' : '';

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border shadow-sm",
          variantClasses[variant],
          sizeClasses[size],
          interactiveClasses,
          highlightClasses,
          urgencyClasses,
          className
        )}
        {...props}
      />
    );
  }
);
CardRoot.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

// Specialized card components for different contexts
export const DarkPatternCard: React.FC<Omit<CardProps, 'variant'> & {
  patternType: string;
  educationalNote?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}> = ({
  patternType,
  educationalNote,
  severity = 'medium',
  children,
  ...props
}) => {
  const severityClasses = {
    low: 'border-orange-200 bg-orange-50',
    medium: 'border-red-200 bg-red-50',
    high: 'border-red-300 bg-red-100',
    critical: 'border-red-400 bg-red-200 animate-pulse',
  };

  return (
    <Card
      {...props}
      variant="dark-pattern"
      className={`${severityClasses[severity]} relative group`}
      manipulationContext={patternType}
    >
      <div className="absolute top-2 right-2">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          severity === 'critical' ? 'bg-red-600 text-white' :
          severity === 'high' ? 'bg-red-500 text-white' :
          severity === 'medium' ? 'bg-orange-500 text-white' :
          'bg-yellow-500 text-white'
        }`}>
          {severity.toUpperCase()}
        </span>
      </div>
      {children}
      {educationalNote && (
        <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-800">
          <strong>Educational Note:</strong> {educationalNote}
        </div>
      )}
    </Card>
  );
};

export const UrgencyCard: React.FC<Omit<CardProps, 'urgency'> & {
  countdown?: number;
  timeLimit?: string;
}> = ({
  countdown,
  timeLimit,
  children,
  ...props
}) => {
  return (
    <Card
      {...props}
      urgency={true}
      variant="warning"
      className="relative overflow-hidden"
    >
      {countdown && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
      )}
      {timeLimit && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          {timeLimit}
        </div>
      )}
      {children}
    </Card>
  );
};

export const PreCheckedCard: React.FC<CardProps & {
  preChecked?: boolean;
  autoRenewal?: boolean;
  hiddenTerms?: boolean;
}> = ({
  preChecked = false,
  autoRenewal = false,
  hiddenTerms = false,
  children,
  ...props
}) => {
  return (
    <Card
      {...props}
      variant={preChecked ? "dark-pattern" : "default"}
      className={`${preChecked ? 'ring-2 ring-red-500' : ''} relative`}
    >
      {children}
      {preChecked && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          ✓
        </div>
      )}
      {(autoRenewal || hiddenTerms) && (
        <div className="mt-2 text-xs text-gray-500 space-y-1">
          {autoRenewal && <div>• Auto-renewal enabled</div>}
          {hiddenTerms && <div>• Additional terms apply</div>}
        </div>
      )}
    </Card>
  );
};

export const ComparisonCard: React.FC<CardProps & {
  comparisonData: {
    label: string;
    value: string | number;
    highlight?: boolean;
    hidden?: boolean;
  }[];
  obfuscated?: boolean;
}> = ({
  comparisonData,
  obfuscated = false,
  children,
  ...props
}) => {
  return (
    <Card
      {...props}
      variant={obfuscated ? "dark-pattern" : "default"}
      className={obfuscated ? "relative" : ""}
    >
      {children}
      <div className="mt-3 space-y-2">
        {comparisonData.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              item.hidden ? 'opacity-50' : ''
            }`}
          >
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className={`font-medium ${
              item.highlight ? 'text-red-600' : 'text-gray-900'
            }`}>
              {item.hidden ? '***' : item.value}
            </span>
          </div>
        ))}
      </div>
      {obfuscated && (
        <div className="mt-2 text-xs text-red-600">
          ⚠️ Some costs may be hidden
        </div>
      )}
    </Card>
  );
};
