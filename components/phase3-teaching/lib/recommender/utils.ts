import { Alternative } from "../interfaces";

export const getCategoryIcon = (type: string) => {
  const icons = {
    credit_union_pal: "🏛️",
    employer_advance: "💼",
    emergency_assistance: "🆘",
    budgeting_tool: "📊",
    side_income: "💪",
  };
  return icons[type as keyof typeof icons] || "💡";
};

export const getUrgencyMessage = (
  urgencyLevel: "low" | "medium" | "high" | "emergency"
) => {
  switch (urgencyLevel) {
    case "emergency":
      return "🚨 Emergency financial situation detected. Here are immediate alternatives:";
    case "high":
      return "⚡ High urgency detected. Consider these faster alternatives:";
    case "medium":
      return "⏰ You have some time. These alternatives can save you money:";
    default:
      return "✅ You have options. Consider these alternatives to avoid high-cost debt:";
  }
}; 