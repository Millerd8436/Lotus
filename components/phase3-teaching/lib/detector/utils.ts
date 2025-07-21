import { Eye, Zap, Lock, DollarSign, Info } from "lucide-react";

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

export const getTypeIcon = (type: string) => {
  switch (type) {
    case "dark_pattern":
      return <Eye className="w-4 h-4" />;
    case "manipulation":
      return <Zap className="w-4 h-4" />;
    case "legal_violation":
      return <Lock className="w-4 h-4" />;
    case "hidden_cost":
      return <DollarSign className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
};
