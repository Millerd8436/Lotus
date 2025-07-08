/**
 * Comprehensive Lotus API Route - Session Management
 * Integrates all 96,000+ line legacy systems with modern Next.js/Vercel
 */

import { NextRequest, NextResponse } from "next/server";
import { lotusOrchestrator } from "../../../../lib/lotus-orchestrator";

// Enable edge runtime for better performance on Vercel
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Initialize orchestrator on first request
let initialized = false;

async function ensureInitialized() {
  if (!initialized) {
    await lotusOrchestrator.initialize();
    initialized = true;
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureInitialized();

    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case "create":
        const result = await lotusOrchestrator.createSession({
          amount: Number(data.amount),
          termDays: Number(data.termDays),
          state: String(data.state),
          researchConsent: Boolean(data.researchConsent),
        });

        return NextResponse.json(result);

      case "record_dark_pattern":
        lotusOrchestrator.recordDarkPattern(data.sessionId, {
          type: data.patternType,
          details: data.details,
        });

        return NextResponse.json({ success: true });

      case "record_behavior":
        lotusOrchestrator.recordBehavior(data.sessionId, {
          eventType: data.eventType,
          data: data.eventData,
        });

        return NextResponse.json({ success: true });

      case "transition_phase":
        const transitionResult = await lotusOrchestrator.transitionPhase(
          data.sessionId,
          data.newPhase,
        );

        return NextResponse.json({ success: transitionResult });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Lotus API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureInitialized();

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const action = searchParams.get("action");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 },
      );
    }

    switch (action) {
      case "session":
        const session = lotusOrchestrator.getSession(sessionId);
        if (!session) {
          return NextResponse.json(
            { error: "Session not found" },
            { status: 404 },
          );
        }
        return NextResponse.json(session);

      case "analytics":
        const analytics = lotusOrchestrator.getAnalytics(sessionId);
        if (!analytics) {
          return NextResponse.json(
            { error: "Session not found" },
            { status: 404 },
          );
        }
        return NextResponse.json(analytics);

      case "export":
        const format = searchParams.get("format") || "json";
        const exportData = lotusOrchestrator.exportSessionData(
          sessionId,
          format as "json" | "csv",
        );

        if (!exportData) {
          return NextResponse.json(
            { error: "Export not available - check research consent" },
            { status: 403 },
          );
        }

        return NextResponse.json(exportData);

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Lotus API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
