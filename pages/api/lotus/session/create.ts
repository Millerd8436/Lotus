/**
 * API Route: Create Comprehensive Lotus Session
 * Handles session creation for the 3-phase educational platform
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { lotusOrchestrator } from "../../../../lib/lotus-orchestrator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { amount, termDays, state, researchConsent } = req.body;

    // Validate required parameters
    if (!amount || !termDays || !state) {
      res.status(400).json({
        error: "Missing required parameters",
        required: ["amount", "termDays", "state"],
      });
      return;
    }

    // Validate parameter types and ranges
    const parsedAmount = Number(amount);
    const parsedTermDays = Number(termDays);

    if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > 10000) {
      res.status(400).json({ error: "Invalid loan amount (must be 1-10000)" });
      return;
    }

    if (isNaN(parsedTermDays) || parsedTermDays < 1 || parsedTermDays > 365) {
      res.status(400).json({ error: "Invalid term days (must be 1-365)" });
      return;
    }

    // Initialize orchestrator if needed
    await lotusOrchestrator.initialize();

    // Create comprehensive session
    const result = await lotusOrchestrator.createSession({
      amount: parsedAmount,
      termDays: parsedTermDays,
      state: String(state).toUpperCase(),
      researchConsent: Boolean(researchConsent),
    });

    if (result.success) {
      res.status(200).json({
        success: true,
        sessionId: result.sessionId,
        message: "Comprehensive Lotus session created successfully",
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || "Failed to create session",
      });
    }
  } catch (error) {
    console.error("Session creation error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
