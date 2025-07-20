import regulations from "@/data/state_rules_comprehensive.json";

export interface StateRegulation {
  state_name: string;
  payday_legal: boolean;
  max_amount: number | "N/A";
  max_term_days: number | "N/A";
  max_fee: string;
  apr_range: string;
  cooling_off: string;
  database_required: boolean;
  notes: string;
}

const stateData = regulations.states as { [key: string]: StateRegulation };

export const getRegulationForState = (
  stateCode: string
): StateRegulation | null => {
  return stateData[stateCode.toUpperCase()] || null;
};

export const isPaydayLendingLegal = (stateCode: string): boolean => {
  const regulation = getRegulationForState(stateCode);
  return regulation ? regulation.payday_legal : false;
};

export const getMaxLoanAmount = (stateCode: string): number | "N/A" => {
  const regulation = getRegulationForState(stateCode);
  return regulation ? regulation.max_amount : "N/A";
};
