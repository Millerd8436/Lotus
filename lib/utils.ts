import type { UserProfile } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// =========================
// CSS & STYLING UTILITIES
// =========================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =========================
// FORMATTING UTILITIES
// =========================

export const formatCurrency = (amount: number): string => {
  if (typeof amount !== "number") {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function formatAPR(apr: number): string {
  if (apr > 1000) {
    return `${Math.round(apr / 100)}x`;
  }
  return `${Math.round(apr)}%`;
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  }
  return phone;
};

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// =========================
// LOAN CALCULATIONS
// =========================

export const calculateAPR = (
  principal: number,
  fee: number,
  termDays: number
): number => {
  if (principal <= 0 || termDays <= 0) {
    return 0;
  }
  return (fee / principal) * (365 / termDays) * 100;
};

export const generateLoanTerms = (
  amount: number,
  vulnerabilityScore: number = 0
) => {
  // Base fee structure with vulnerability exploitation
  let fee = amount * 0.15; // 15% base fee

  // Exploit vulnerable applicants with higher fees
  if (vulnerabilityScore > 5) {
    fee *= 1.5;
  } else if (vulnerabilityScore > 3) {
    fee *= 1.3;
  }

  const total = amount + fee;
  const apr = calculateAPR(amount, fee, 14);

  return {
    principal: amount,
    fee: Math.round(fee),
    total: Math.round(total),
    apr: Math.round(apr),
    termDays: 14,
    rolloverFee: 50,
    nsfFee: 35,
  };
};

export function calculateTotalCost(
  principal: number,
  fee: number,
  rollovers: number = 0
): number {
  const baseCost = principal + fee;
  if (rollovers === 0) return baseCost;

  // Each rollover adds another fee
  return baseCost + fee * rollovers;
}

export const calculateDebtToIncomeRatio = (
  monthlyDebt: number,
  monthlyIncome: number
): number => {
  if (monthlyIncome === 0) {
    return 0;
  }
  return (monthlyDebt / monthlyIncome) * 100;
};

// =========================
// STATE & REGULATION UTILITIES
// =========================

export function getStateRegulation(stateCode: string) {
  // This would typically load from the state_rules_comprehensive.json
  const stateRegulations = {
    TX: { maxAPR: 664, maxAmount: 1800, maxTermDays: 7 },
    CA: { maxAPR: 460, maxAmount: 300, maxTermDays: 31 },
    NY: { maxAPR: 25, maxAmount: 0, maxTermDays: 0 }, // Prohibited
    FL: { maxAPR: 304, maxAmount: 500, maxTermDays: 31 },
  };

  return (
    stateRegulations[stateCode as keyof typeof stateRegulations] ||
    stateRegulations.TX
  );
}

// =========================
// VALIDATION UTILITIES
// =========================

export function validateLoanAmount(amount: number): boolean {
  return amount >= 100 && amount <= 2000;
}

export function validateTermDays(termDays: number): boolean {
  return termDays >= 7 && termDays <= 30;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateSSN = (ssn: string): boolean => {
  const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
  return ssnRegex.test(ssn);
};

// =========================
// ID & SESSION UTILITIES
// =========================

export function generateSessionId(): string {
  return `lotus_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// =========================
// PERFORMANCE UTILITIES
// =========================

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// =========================
// DARK PATTERN DETECTION
// =========================

export function detectDarkPattern(element: HTMLElement): string[] {
  const patterns: string[] = [];

  // Check for urgency indicators
  if (
    element.textContent?.includes("limited time") ||
    element.textContent?.includes("expires soon")
  ) {
    patterns.push("artificial_urgency");
  }

  // Check for scarcity indicators
  if (
    element.textContent?.includes("only") ||
    element.textContent?.includes("last")
  ) {
    patterns.push("fake_scarcity");
  }

  // Check for pre-checked boxes
  const checkboxes = element.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if ((checkbox as HTMLInputElement).checked) {
      patterns.push("pre_checked_boxes");
    }
  });

  return patterns;
}

export function calculateCoercionIndex(patterns: string[]): number {
  const patternWeights = {
    artificial_urgency: 0.3,
    fake_scarcity: 0.2,
    pre_checked_boxes: 0.4,
    hidden_fees: 0.5,
    social_proof: 0.2,
    rollover_trap: 0.6,
  };

  return patterns.reduce((total, pattern) => {
    return (
      total + (patternWeights[pattern as keyof typeof patternWeights] || 0)
    );
  }, 0);
}

// =========================
// ETHICS & ANALYSIS
// =========================

export function calculateEthicsScore(violations: any[]): number {
  if (violations.length === 0) return 100;

  const severityWeights = {
    low: 0.1,
    medium: 0.3,
    high: 0.6,
    critical: 1.0,
  };

  const totalPenalty = violations.reduce((sum, violation) => {
    return (
      sum +
      (severityWeights[violation.severity as keyof typeof severityWeights] || 0)
    );
  }, 0);

  return Math.max(0, 100 - totalPenalty * 100);
}

// =========================
// DATA PRIVACY UTILITIES
// =========================

export function anonymizeData(data: any): any {
  // Remove personally identifiable information
  const { name, email, phone, address, ...anonymized } = data;
  return {
    ...anonymized,
    sessionId: generateSessionId(),
    timestamp: new Date().toISOString(),
  };
}

export function validateResearchConsent(consent: boolean): boolean {
  return consent === true;
}

// =========================
// EDUCATIONAL UTILITIES
// =========================

export function generateEducationalContent(phase: number): string {
  const content = {
    1: "This phase demonstrates predatory lending practices. Notice how information is hidden and urgency is created.",
    2: "This phase shows ethical lending with transparent terms and clear disclosures.",
    3: "This phase helps you reflect on the differences and learn about consumer protection.",
  };

  return (
    content[phase as keyof typeof content] ||
    "Educational content not available."
  );
}

export function trackUserBehavior(event: string, data: any): void {
  // In a real implementation, this would send data to analytics
  console.log("Behavior tracked:", {
    event,
    data,
    timestamp: new Date().toISOString(),
  });
}

// =========================
// DEVICE & BROWSER UTILITIES
// =========================

export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// =========================
// ARRAY & ASYNC UTILITIES
// =========================

export function getRandomElement<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error("Cannot get random element from empty array");
  }
  return array[Math.floor(Math.random() * array.length)]!;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =========================
// INITIALIZATION HELPERS
// =========================

export const getInitialBehavioralProfile = (): UserProfile => ({
  vulnerabilityScore: 0,
  decisionMaking: "hesitant", // neutral default
  emotionalState: "calm",
  trustLevel: "medium",
  cognitiveLoad: "low",
  decisionFatigue: 0,
  interactionPattern: "focused",
  inferredGoal: "exploring",
  financialLiteracy: 0.5,
  debtToIncomeRatio: 0,
  dehumanizationScore: 0,
  netUtilityScore: 0,
  financialLiteracyLevel: "basic",
  learningStyle: "visual",
  vulnerabilities: [],
  strengths: [],
  goals: [],
});

export const getInitialFormData = () =>
  ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Financial basics
    monthlyIncome: 0,
    monthlyRent: 0,
    loanAmount: 500,
    // Minimal required fields used elsewhere in the app
    previousPaydayLoan: false,
  } as any);
