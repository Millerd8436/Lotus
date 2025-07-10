import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'dark-pattern' | 'ethical' | 'warning' | 'success';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  highlight?: boolean;
  urgency?: boolean;
  manipulationContext?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  size = 'md',
  className = '',
  onClick,
  interactive = false,
  highlight = false,
  urgency = false,
  manipulationContext = '',
}) => {
  const baseClasses = 'rounded-lg border shadow-sm transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white border-gray-200 hover:border-gray-300',
    'dark-pattern': 'bg-red-50 border-red-200 hover:border-red-300 shadow-red-100',
    ethical: 'bg-green-50 border-green-200 hover:border-green-300 shadow-green-100',
    warning: 'bg-yellow-50 border-yellow-200 hover:border-yellow-300 shadow-yellow-100',
    success: 'bg-blue-50 border-blue-200 hover:border-blue-300 shadow-blue-100',
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const interactiveClasses = interactive ? 'cursor-pointer hover:shadow-md active:scale-98' : '';
  const highlightClasses = highlight ? 'ring-2 ring-blue-500 ring-opacity-50' : '';
  const urgencyClasses = urgency ? 'animate-pulse bg-gradient-to-r from-red-50 to-orange-50' : '';
  const darkPatternClasses = variant === 'dark-pattern' ? 'animate-pulse shadow-lg shadow-red-500/20' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    interactiveClasses,
    highlightClasses,
    urgencyClasses,
    darkPatternClasses,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!interactive) return;
    
    // Track dark pattern usage if applicable
    if (variant === 'dark-pattern' && manipulationContext) {
      console.log('Dark pattern card detected:', manipulationContext);
    }
    
    onClick?.();
  };

  return (
    <div
      className={classes}
      onClick={handleClick}
      data-variant={variant}
      data-manipulation-context={manipulationContext}
    >
      {(title || subtitle) && (
        <div className="mb-3">
          {title && (
            <h3 className={`font-semibold ${
              variant === 'dark-pattern' ? 'text-red-800' :
              variant === 'ethical' ? 'text-green-800' :
              variant === 'warning' ? 'text-yellow-800' :
              variant === 'success' ? 'text-blue-800' :
              'text-gray-900'
            }`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-sm ${
              variant === 'dark-pattern' ? 'text-red-600' :
              variant === 'ethical' ? 'text-green-600' :
              variant === 'warning' ? 'text-yellow-600' :
              variant === 'success' ? 'text-blue-600' :
              'text-gray-600'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={variant === 'dark-pattern' ? 'text-red-700' : 'text-gray-700'}>
        {children}
      </div>
    </div>
  );
};

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
