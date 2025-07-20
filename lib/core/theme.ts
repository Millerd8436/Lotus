// Centralized theme configuration for Lotus Platform
export type ThemeMode =
  | "exploitative"
  | "ethical"
  | "analysis"
  | "neutral"
  | "professional";
export type Severity = "low" | "medium" | "high" | "critical";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  border: string;
  hover: string;
  gradient: string;
  shadow: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  manipulationLevel?: Severity;
  darkPattern?: boolean;
}

// Theme definitions
export const THEMES: Record<ThemeMode, ThemeConfig> = {
  exploitative: {
    colors: {
      primary: "#dc2626", // red-600
      secondary: "#ef4444", // red-500
      background: "#fef2f2", // red-50
      foreground: "#991b1b", // red-800
      border: "#fecaca", // red-200
      hover: "#b91c1c", // red-700
      gradient: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
      shadow: "rgba(220, 38, 38, 0.2)",
    },
    manipulationLevel: "high",
    darkPattern: true,
  },
  ethical: {
    colors: {
      primary: "#16a34a", // green-600
      secondary: "#22c55e", // green-500
      background: "#f0fdf4", // green-50
      foreground: "#166534", // green-800
      border: "#bbf7d0", // green-200
      hover: "#15803d", // green-700
      gradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      shadow: "rgba(22, 163, 74, 0.2)",
    },
    manipulationLevel: "low",
    darkPattern: false,
  },
  analysis: {
    colors: {
      primary: "#2563eb", // blue-600
      secondary: "#3b82f6", // blue-500
      background: "#eff6ff", // blue-50
      foreground: "#1e40af", // blue-800
      border: "#bfdbfe", // blue-200
      hover: "#1d4ed8", // blue-700
      gradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      shadow: "rgba(37, 99, 235, 0.2)",
    },
    manipulationLevel: "low",
    darkPattern: false,
  },
  neutral: {
    colors: {
      primary: "#6b7280", // gray-500
      secondary: "#9ca3af", // gray-400
      background: "#f9fafb", // gray-50
      foreground: "#1f2937", // gray-800
      border: "#e5e7eb", // gray-200
      hover: "#4b5563", // gray-600
      gradient: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
      shadow: "rgba(107, 114, 128, 0.2)",
    },
  },
  professional: {
    colors: {
      primary: "#334155", // slate-700
      secondary: "#475569", // slate-600
      background: "#f8fafc", // slate-50
      foreground: "#0f172a", // slate-900
      border: "#cbd5e1", // slate-300
      hover: "#1e293b", // slate-800
      gradient: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      shadow: "rgba(51, 65, 85, 0.2)",
    },
  },
};

// Helper functions
export function getThemeForPhase(phase: 1 | 2 | 3): ThemeMode {
  switch (phase) {
    case 1:
      return "exploitative";
    case 2:
      return "ethical";
    case 3:
      return "analysis";
    default:
      return "neutral";
  }
}

export function getThemeStyles(theme: ThemeMode): string {
  const config = THEMES[theme];
  return `
    --primary: ${config.colors.primary};
    --secondary: ${config.colors.secondary};
    --background: ${config.colors.background};
    --foreground: ${config.colors.foreground};
    --border: ${config.colors.border};
    --hover: ${config.colors.hover};
    --shadow: ${config.colors.shadow};
  `;
}

export function getButtonClasses(theme: ThemeMode): string {
  const config = THEMES[theme];
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  // Use actual color values from theme
  const themeClasses = config.darkPattern ? "animate-pulse shadow-lg" : "";

  return `${baseClasses} ${themeClasses}`;
}

export function getCardClasses(theme: ThemeMode): string {
  const config = THEMES[theme];
  const darkPattern = config.darkPattern ? "animate-pulse shadow-lg" : "";

  return `rounded-lg border shadow-sm transition-all duration-200 bg-[var(--background)] border-[var(--border)] ${darkPattern}`;
}

// Urgency and manipulation indicators
export function getUrgencyIndicator(level: Severity): {
  animation: string;
  color: string;
  message: string;
} {
  const indicators = {
    low: {
      animation: "",
      color: "#fbbf24", // yellow-400
      message: "Limited time offer",
    },
    medium: {
      animation: "animate-pulse",
      color: "#f59e0b", // amber-500
      message: "Offer expires soon!",
    },
    high: {
      animation: "animate-bounce",
      color: "#ef4444", // red-500
      message: "URGENT: Act now!",
    },
    critical: {
      animation: "animate-ping",
      color: "#dc2626", // red-600
      message: "⚠️ FINAL WARNING!",
    },
  };

  return indicators[level];
}

// Export theme context for React components
export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  config: ThemeConfig;
}
