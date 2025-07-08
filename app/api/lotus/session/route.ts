// app/api/lotus/session/route.ts - Modern Next.js 13+ App Router API
import { NextRequest, NextResponse } from "next/server";

// Import comprehensive system (will be properly typed)
import { LotusComprehensiveOrchestrator } from "../../../../legacy-recovered/lotus_orchestrator_comprehensive.js";
import { ComprehensiveEthicsEngine } from "../../../../legacy-recovered/ethics_engine_comprehensive.js";

// Temporary session storage (in production, use Redis or database)
const sessions = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, sessionId, interactionType, data } = body;

    switch (action) {
      case "start":
        // Start new comprehensive session
        const orchestrator = new LotusComprehensiveOrchestrator();
        const sessionResult = await orchestrator.startComprehensiveSession(
          body,
          "full",
        );

        if (sessionResult.success) {
          sessions.set(sessionResult.sessionId, {
            orchestrator,
            startTime: Date.now(),
            data: sessionResult,
          });

          return NextResponse.json({
            success: true,
            sessionId: sessionResult.sessionId,
            data: sessionResult,
          });
        } else {
          return NextResponse.json(
            {
              success: false,
              error: sessionResult.error,
            },
            { status: 400 },
          );
        }

      case "interact":
        // Handle user interaction
        const session = sessions.get(sessionId);
        if (!session) {
          return NextResponse.json(
            {
              success: false,
              error: "Session not found",
            },
            { status: 404 },
          );
        }

        // Process interaction through orchestrator
        const interactionResult =
          await session.orchestrator.handleUserInteraction(
            interactionType,
            data,
          );

        return NextResponse.json({
          success: true,
          result: interactionResult,
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid action",
          },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Lotus API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const sessionId = searchParams.get("sessionId");

    switch (action) {
      case "report":
        const session = sessions.get(sessionId);
        if (!session) {
          return NextResponse.json(
            {
              success: false,
              error: "Session not found",
            },
            { status: 404 },
          );
        }

        const report =
          await session.orchestrator.generateFinalComprehensiveReport();
        return NextResponse.json({
          success: true,
          report,
        });

      case "metrics":
        const metricsSession = sessions.get(sessionId);
        if (!metricsSession) {
          return NextResponse.json(
            {
              success: false,
              error: "Session not found",
            },
            { status: 404 },
          );
        }

        // Get real-time metrics
        const metrics = {
          autonomyScore:
            metricsSession.orchestrator.realTimeData?.autonomyScore || 100,
          coercionIndex:
            metricsSession.orchestrator.realTimeData?.coercionIndex || 0,
          manipulationExposure:
            metricsSession.orchestrator.comprehensiveMetrics
              ?.totalManipulationExposure || 0,
          currentPhase:
            metricsSession.orchestrator.currentPhase || "exploitative",
        };

        return NextResponse.json({
          success: true,
          metrics,
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Invalid action",
          },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("Lotus API GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          error: "Session ID required",
        },
        { status: 400 },
      );
    }

    const session = sessions.get(sessionId);
    if (session) {
      // Cleanup session
      await session.orchestrator.cleanup();
      sessions.delete(sessionId);
    }

    return NextResponse.json({
      success: true,
      message: "Session cleaned up",
    });
  } catch (error) {
    console.error("Lotus API DELETE Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
