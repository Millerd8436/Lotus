import { NextRequest, NextResponse } from "next/server";
import {
  handleAnalyzeDarkPatterns,
  handleGetConsumerProtections,
  handleGetEducationalContent,
  handleBehavioralAnalysis,
  handleResearchLookup,
  handleDarkPatternsDatabase,
  handleResearchStatistics,
  handleEducationalCatalog,
  handlePolicyRecommendations,
  handleApiInfo,
} from "./lib";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case "analyze_dark_patterns":
        return handleAnalyzeDarkPatterns(data);
      case "get_consumer_protections":
        return handleGetConsumerProtections(data);
      case "get_educational_content":
        return handleGetEducationalContent(data);
      case "behavioral_analysis":
        return handleBehavioralAnalysis();
      case "research_lookup":
        return handleResearchLookup(data);
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === "development") {
      // console.error('Phase Three API Error:', error);
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
    case "dark_patterns_database":
      return handleDarkPatternsDatabase();
    case "research_statistics":
      return handleResearchStatistics();
    case "educational_catalog":
      return handleEducationalCatalog();
    case "policy_recommendations":
      return handlePolicyRecommendations();
    default:
      return handleApiInfo();
  }
}
