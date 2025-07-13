import React, { Suspense, lazy } from "react";

// Lazy load all heavy components for better performance
const Phase1ExploitativeWebsite = lazy(
  () => import("./Phase1ExploitativeWebsite")
);
const Phase2EthicalWebsite = lazy(() => import("./Phase2EthicalWebsite"));
// Phase3EducationalReflection removed - using ReflectionDashboard instead
const AdvancedDarkPatternsDemo = lazy(
  () => import("./AdvancedDarkPatternsDemo")
);
const StateSpecificMessaging = lazy(() => import("./StateSpecificMessaging"));
const ReflectionDashboard = lazy(
  () => import("./reflection/ReflectionDashboard")
);

// Lazy load complex form components
const IncomeVerificationSimulator = lazy(
  () => import("./IncomeVerificationSimulator")
);
const ElectronicSignatureSimulator = lazy(
  () => import("./ElectronicSignatureSimulator")
);
const RealtimeProcessingSimulator = lazy(
  () => import("./RealtimeProcessingSimulator")
);
const DeceptiveCheckoutFlow = lazy(() => import("./DeceptiveCheckoutFlow"));

// Loading fallback components with different levels of sophistication
const SimpleLoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      background: "#f8f9fa",
      borderRadius: "8px",
      margin: "1rem 0",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "4px solid #e3f2fd",
        borderTop: "4px solid #2196f3",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <style jsx>{`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

const AdvancedLoadingSpinner = ({
  message = "Loading...",
  theme = "neutral",
}: {
  message?: string;
  theme?: "neutral" | "exploitative" | "ethical" | "analysis";
}) => {
  const themes = {
    neutral: {
      bg: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
      color: "#1f2937",
      spinner: "#1f2937",
    },
    exploitative: {
      bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      color: "#92400e",
      spinner: "#f97316",
    },
    ethical: {
      bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      color: "#166534",
      spinner: "#22c55e",
    },
    analysis: {
      bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      color: "#075985",
      spinner: "#0ea5e9",
    },
  };

  const currentTheme = themes[theme];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        background: currentTheme.bg,
        borderRadius: "12px",
        margin: "1rem 0",
        color: currentTheme.color,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          border: `6px solid ${currentTheme.color}20`,
          borderTop: `6px solid ${currentTheme.spinner}`,
          borderRadius: "50%",
          animation: "spin 1.5s linear infinite",
          marginBottom: "1rem",
        }}
      />
      <div
        style={{
          fontSize: "1.1rem",
          fontWeight: "600",
          marginBottom: "0.5rem",
        }}
      >
        {message}
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          opacity: 0.8,
        }}
      >
        Please wait...
      </div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

const SkeletonLoader = ({ height = "200px" }: { height?: string }) => (
  <div
    style={{
      height,
      background:
        "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "loading 1.5s infinite",
      borderRadius: "8px",
      margin: "1rem 0",
    }}
  >
    <style jsx>{`
      @keyframes loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `}</style>
  </div>
);

// Performance-optimized lazy loading wrapper
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorBoundary?: boolean;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback = <SimpleLoadingSpinner />,
  errorBoundary = true,
}) => {
  if (errorBoundary) {
    return (
      <ErrorBoundary>
        <Suspense fallback={fallback}>{children}</Suspense>
      </ErrorBoundary>
    );
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
};

// Simple error boundary for lazy loading failures
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Lazy loading error:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            background: "#ffebee",
            border: "1px solid #ef5350",
            borderRadius: "8px",
            margin: "1rem 0",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#c62828", margin: "0 0 1rem 0" }}>
            ⚠️ Loading Error
          </h3>
          <p style={{ color: "#666", margin: "0 0 1rem 0" }}>
            Failed to load component. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.5rem 1rem",
              background: "#c62828",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Preload functions for critical components
export const preloadCriticalComponents = () => {
  // Preload components that are likely to be used soon
  Phase1ExploitativeWebsite;
  DeceptiveCheckoutFlow;
};

export const preloadAllComponents = () => {
  // Preload all components for better subsequent navigation
  Phase1ExploitativeWebsite;
  Phase2EthicalWebsite;
  AdvancedDarkPatternsDemo;
  StateSpecificMessaging;
  ReflectionDashboard;
  IncomeVerificationSimulator;
  ElectronicSignatureSimulator;
  RealtimeProcessingSimulator;
  DeceptiveCheckoutFlow;
};

// Lazy-loaded component exports with performance optimizations
export const LazyPhase1ExploitativeWebsite = () => (
  <LazyWrapper
    fallback={
      <AdvancedLoadingSpinner
        message="Connecting to Secure Server..."
        theme="exploitative"
      />
    }
  >
    <Phase1ExploitativeWebsite />
  </LazyWrapper>
);

export const LazyPhase2EthicalWebsite = () => (
  <LazyWrapper
    fallback={
      <AdvancedLoadingSpinner
        message="Loading Your Options..."
        theme="ethical"
      />
    }
  >
    <Phase2EthicalWebsite />
  </LazyWrapper>
);

// Phase3EducationalReflection component removed - using ReflectionDashboard instead

export const LazyAdvancedDarkPatternsDemo = () => (
  <LazyWrapper
    fallback={
      <AdvancedLoadingSpinner
        message="Loading Dark Patterns Demo..."
        theme="exploitative"
      />
    }
  >
    <AdvancedDarkPatternsDemo />
  </LazyWrapper>
);

export const LazyStateSpecificMessaging = () => (
  <LazyWrapper
    fallback={
      <AdvancedLoadingSpinner
        message="Loading State Compliance Data..."
        theme="analysis"
      />
    }
  >
    <StateSpecificMessaging />
  </LazyWrapper>
);

export const LazyReflectionDashboard = () => (
  <LazyWrapper
    fallback={
      <AdvancedLoadingSpinner
        message="Loading Reflection Dashboard..."
        theme="analysis"
      />
    }
  >
    <ReflectionDashboard />
  </LazyWrapper>
);

export const LazyIncomeVerificationSimulator = () => (
  <LazyWrapper fallback={<SkeletonLoader height="400px" />}>
    <IncomeVerificationSimulator />
  </LazyWrapper>
);

export const LazyElectronicSignatureSimulator = () => (
  <LazyWrapper fallback={<SkeletonLoader height="400px" />}>
    <ElectronicSignatureSimulator />
  </LazyWrapper>
);

export const LazyRealtimeProcessingSimulator = () => (
  <LazyWrapper fallback={<SkeletonLoader height="400px" />}>
    <RealtimeProcessingSimulator />
  </LazyWrapper>
);

export const LazyDeceptiveCheckoutFlow = () => (
  <LazyWrapper
    fallback={
      <AdvancedLoadingSpinner
        message="Loading Checkout Flow..."
        theme="exploitative"
      />
    }
  >
    <DeceptiveCheckoutFlow />
  </LazyWrapper>
);

// Performance monitoring hook
export const usePerformanceMonitoring = () => {
  React.useEffect(() => {
    // Monitor loading times
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "navigation") {
          const navigationEntry = entry as PerformanceNavigationTiming;
          const loadTime =
            navigationEntry.loadEventEnd - navigationEntry.fetchStart;

          // Log performance metrics in development
          if (process.env.NODE_ENV === "development") {
            console.log(`Page Load Time: ${loadTime}ms`);
            console.log(
              `First Contentful Paint: ${navigationEntry.loadEventEnd - navigationEntry.fetchStart}ms`
            );
          }
        }
      }
    });

    observer.observe({ entryTypes: ["navigation"] });

    return () => observer.disconnect();
  }, []);
};

// Memory usage monitoring
export const useMemoryMonitoring = () => {
  React.useEffect(() => {
    const checkMemory = () => {
      if ("memory" in performance) {
        const memoryInfo = (performance as any).memory;

        if (process.env.NODE_ENV === "development") {
          console.log("Memory Usage:", {
            used: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) + "MB",
            total: Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024) + "MB",
            limit: Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024) + "MB",
          });
        }
      }
    };

    // Check memory usage every 30 seconds in development
    const interval = setInterval(checkMemory, 30000);

    return () => clearInterval(interval);
  }, []);
};

export default LazyWrapper;
