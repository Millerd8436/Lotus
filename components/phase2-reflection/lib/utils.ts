import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "extreme":
      return "text-red-600 bg-red-50 border-red-200";
    case "high":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "low":
      return "text-blue-600 bg-blue-50 border-blue-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export const getComplianceIcon = (score: number) => {
  if (score >= 8) return <CheckCircle className="w-5 h-5 text-green-500" />;
  if (score >= 5)
    return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
  return <XCircle className="w-5 h-5 text-red-500" />;
}; 