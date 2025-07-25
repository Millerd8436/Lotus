export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "CRITICAL":
      return "text-red-600 bg-red-50 border-red-200";
    case "HIGH":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "MEDIUM":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    default:
      return "text-green-600 bg-green-50 border-green-200";
  }
};

export const getFeeDescription = (fee: any): string => {
  const descriptions: { [key: string]: string } = {
    processing: "Fee for basic loan processing (typically automatic)",
    documentation: "Fee for loan paperwork and record-keeping",
    verification: "Fee for identity and income verification",
    express: "Fee for faster processing (often unnecessary)",
    insurance: "Optional loan protection insurance (rarely beneficial)",
    maintenance: "Ongoing account maintenance fee",
    origination: "One-time loan setup fee",
  };

  const key = fee.name.toLowerCase();
  for (const [term, desc] of Object.entries(descriptions)) {
    if (key.includes(term)) return desc;
  }
  return "Additional fee charged by lender";
};

export const getFeeManipulationTactic = (fee: any): string | undefined => {
  if (fee.hidden) return "Hidden from initial APR calculation";
  if (fee.name.toLowerCase().includes("express") && fee.amount > 25)
    return "Charges for standard digital processing";
  if (fee.name.toLowerCase().includes("insurance") && !fee.mandatory)
    return "Upsells unnecessary protection";
  if (fee.timing === "end") return "Back-loaded to artificially lower APR";
  return undefined;
}; 