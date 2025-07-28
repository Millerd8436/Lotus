"use client";

/**
 * Comprehensive Error Boundary Components for Production-Ready Error Handling
 * 
 * Provides multiple layers of error boundary protection for different scenarios:
 * - UI Error Boundary: For component rendering errors
 * - API Error Boundary: For data fetching errors
 * - Route Error Boundary: For navigation and routing errors
 */

import React, {
  Component,
  ErrorInfo,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

// ================== Error State Types ==================
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
  lastErrorTime: number;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (
    error: Error,
    errorInfo: ErrorInfo,
    resetError: () => void
  ) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
  isolate?: boolean;
}

// ================== Base Error Boundary ==================
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
      lastErrorTime: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorCount: 1,
      lastErrorTime: Date.now(),
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error("Error caught by boundary:", error, errorInfo);

    // Call onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  override componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange, resetKeys } = this.props;

    if (resetOnPropsChange && resetKeys && this.state.hasError) {
      const hasResetKeyChanged = resetKeys.some(
        (key) =>
          prevProps[key as keyof ErrorBoundaryProps] !==
          this.props[key as keyof ErrorBoundaryProps]
      );

      if (hasResetKeyChanged) {
        this.resetError();
      }
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
      lastErrorTime: 0,
    });
  };

  override render() {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      if (this.props.fallback) {
        return this.props.fallback(
          this.state.error,
          this.state.errorInfo,
          this.resetError
        );
      }
      return (
        <DefaultErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
        />
      );
    }
    return this.props.children;
  }
}

// ================== Default Error Fallback ==================
interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo;
  resetError: () => void;
}

export function DefaultErrorFallback({
  error,
  errorInfo,
  resetError,
}: ErrorFallbackProps) {
  return (
    <div className="error-fallback-container">
      <div className="error-content">
        <h2 className="error-title">🚨 Something went wrong</h2>
        <p className="error-message">
          We're sorry, but something unexpected happened. The error has been
          logged and we'll look into it.
        </p>

        <details className="error-details">
          <summary>Error Details</summary>
          <pre className="error-stack">
            {error.toString()}
            {errorInfo.componentStack}
          </pre>
        </details>

        <div className="error-actions">
          <button onClick={resetError} className="btn-reset">
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="btn-home"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ================== Phase-Specific Error Boundaries ==================

// Exploitative Phase Error Boundary
export function ExploitativePhaseErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={(_error, _errorInfo, resetError) => (
        <div className="p-8 bg-red-50 border-2 border-red-500 rounded-lg">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            💔 The Predatory System Failed
          </h2>
          <p className="text-red-700 mb-4">
            Even our exploitative system has errors. In real predatory lending,
            when systems fail, borrowers suffer the most.
          </p>
          <button
            onClick={resetError}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again (Like Borrowers Have To)
          </button>
        </div>
      )}
      onError={(error) => {
        console.error("Exploitative phase error:", error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// Ethical Phase Error Boundary
export function EthicalPhaseErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={(error, _errorInfo, resetError) => (
        <div className="p-8 bg-green-50 border-2 border-green-500 rounded-lg">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            🛡️ Something Went Wrong
          </h2>
          <p className="text-green-700 mb-4">
            We encountered an error, but in ethical systems, we handle problems
            transparently. Error: {error.message}
          </p>
          <button
            onClick={resetError}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Try Again Safely
          </button>
        </div>
      )}
      onError={(error) => {
        console.error("Ethical phase error:", error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// Reflection Phase Error Boundary
export function ReflectionPhaseErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={(_error, _errorInfo, resetError) => (
        <div className="p-8 bg-purple-50 border-2 border-purple-500 rounded-lg">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">
            🤔 Analysis Error
          </h2>
          <p className="text-purple-700 mb-4">
            An error occurred during analysis. This is a learning opportunity -
            even educational systems can have bugs.
          </p>
          <button
            onClick={resetError}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Continue Learning
          </button>
        </div>
      )}
      onError={(error) => {
        console.error("Reflection phase error:", error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// ================== Component-Specific Error Boundaries ==================

// Calculator Error Boundary
export function CalculatorErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={(_error, _errorInfo, resetError) => (
        <div className="p-4 bg-yellow-50 border border-yellow-400 rounded">
          <p className="text-yellow-800">
            Calculation error. Please check your inputs.
          </p>
          <button
            onClick={resetError}
            className="mt-2 text-sm text-yellow-600 hover:text-yellow-800"
          >
            Reset Calculator
          </button>
        </div>
      )}
      resetOnPropsChange
      resetKeys={["principal", "termDays", "state"]}
    >
      {children}
    </ErrorBoundary>
  );
}

// Dark Pattern Error Boundary
export function DarkPatternErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ErrorBoundary
      fallback={(_error, _errorInfo, resetError) => (
        <div className="p-6 bg-gray-900 text-white rounded-lg">
          <h3 className="text-xl font-bold mb-2">🕷️ Dark Pattern Failed</h3>
          <p className="text-gray-300 mb-4">
            Even manipulative patterns can break. This error shows how fragile
            deceptive systems are.
          </p>
          <button
            onClick={resetError}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Recover
          </button>
        </div>
      )}
      isolate
    >
      {children}
    </ErrorBoundary>
  );
}

// ================== Error Recovery Hook ==================
export function useErrorRecovery() {
  const [errorHistory, setErrorHistory] = useState<
    Array<{
      error: Error;
      timestamp: number;
      recovered: boolean;
    }>
  >([]);

  const logError = useCallback((error: Error) => {
    setErrorHistory((prev) => [
      ...prev,
      {
        error,
        timestamp: Date.now(),
        recovered: false,
      },
    ]);
  }, []);

  const markRecovered = useCallback((errorIndex: number) => {
    setErrorHistory((prev) =>
      prev.map((item, index) =>
        index === errorIndex ? { ...item, recovered: true } : item
      )
    );
  }, []);

  const clearHistory = useCallback(() => {
    setErrorHistory([]);
  }, []);

  const recentErrors = useMemo(() => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return errorHistory.filter((item) => item.timestamp > fiveMinutesAgo);
  }, [errorHistory]);

  return {
    errorHistory,
    recentErrors,
    logError,
    markRecovered,
    clearHistory,
    hasRecentErrors: recentErrors.length > 0,
    errorRate: recentErrors.length,
  };
}

// ================== Error Boundary Provider ==================
interface ErrorBoundaryContextValue {
  reportError: (error: Error, componentName?: string) => void;
  clearErrors: () => void;
  errors: Array<{
    error: Error;
    componentName?: string | undefined;
    timestamp: number;
  }>;
}

const ErrorBoundaryContext =
  React.createContext<ErrorBoundaryContextValue | null>(null);

export function ErrorBoundaryProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<
    Array<{
      error: Error;
      componentName?: string | undefined;
      timestamp: number;
    }>
  >([]);

  const reportError = useCallback((error: Error, componentName?: string) => {
    console.error(`[${componentName || "Unknown"}] Error:`, error);

    setErrors((prev) => [
      ...prev,
      {
        error,
        componentName: componentName || undefined,
        timestamp: Date.now(),
      },
    ]);

    // Send to error tracking service
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "exception", {
        description: error.message,
        fatal: false,
        error_name: error.name,
        component: componentName,
      });
    }
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return (
    <ErrorBoundaryContext.Provider value={{ reportError, clearErrors, errors }}>
      <ErrorBoundary onError={(error) => reportError(error, "Root")}>
        {children}
      </ErrorBoundary>
    </ErrorBoundaryContext.Provider>
  );
}

export function useErrorBoundary() {
  const context = React.useContext(ErrorBoundaryContext);
  if (!context) {
    throw new Error(
      "useErrorBoundary must be used within ErrorBoundaryProvider"
    );
  }
  return context;
}
