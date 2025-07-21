import { NextRequest, NextResponse } from "next/server";
import {
  handleEvaluateApplication,
  handleCalculateTransparentFees,
  handleGetAlternatives,
  handleFinancialGuidance,
  handleComplaintOrFeedback,
  handleEthicalPrinciples,
  handleAlternativesDatabase,
  handleEducationalResources,
  handleTransparencyReport,
  handleApiInfo,
} from "./lib";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case "evaluate_application":
        return handleEvaluateApplication(data);
      case "calculate_transparent_fees":
        return handleCalculateTransparentFees(data);
      case "get_alternatives":
        return handleGetAlternatives(data);
      case "financial_guidance":
        return handleFinancialGuidance();
      case "complaint_or_feedback":
        return handleComplaintOrFeedback();
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === "development") {
      // console.error('Phase Two API Error:', error);
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
    case "ethical_principles":
      return handleEthicalPrinciples();
    case "alternatives_database":
      return handleAlternativesDatabase();
    case "educational_resources":
      return handleEducationalResources();
    case "transparency_report":
      return handleTransparencyReport();
    default:
      return handleApiInfo();
  }
}
