import { NextRequest, NextResponse } from "next/server";
import {
  handleLoanApplication,
  handleCalculateFees,
  handleRolloverSimulation,
  handleAchExploitation,
  handleStateRegulations,
  handleResearchStatistics,
  handleApiInfo,
} from "./lib";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case "loan_application":
        return handleLoanApplication(request, data);
      case "calculate_fees":
        return handleCalculateFees(data);
      case "rollover_simulation":
        return handleRolloverSimulation(data);
      case "ach_exploitation":
        return handleAchExploitation(data);
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === "development") {
      // console.error('Phase One API Error:', error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  switch (type) {
    case "state_regulations":
      return handleStateRegulations();
    case "research_statistics":
      return handleResearchStatistics();
    default:
      return handleApiInfo();
  }
}
