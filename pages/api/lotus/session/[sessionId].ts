/**
 * API Route: Get Session Data
 * Retrieves comprehensive session data for analysis
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { lotusOrchestrator } from "../../../../lib/lotus-orchestrator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { sessionId } = req.query;

    if (!sessionId || typeof sessionId !== "string") {
      res.status(400).json({ error: "Invalid session ID" });
      return;
    }

    const session = lotusOrchestrator.getSession(sessionId);

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.status(200).json({
      success: true,
      session,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Session retrieval error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
