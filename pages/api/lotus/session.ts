// pages/api/lotus/session.ts - Vercel API Route for Lotus Sessions
import type { NextApiRequest, NextApiResponse } from "next";
import {
  startLotusSession,
  handleLotusInteraction,
  generateLotusReport,
  cleanupLotusSession,
} from "../../../lib/comprehensive-integration";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  try {
    switch (method) {
      case "POST":
        if (req.query.action === "start") {
          const sessionData = await startLotusSession(req.body);
          res.status(200).json({
            success: true,
            sessionId: sessionData.sessionId,
            data: sessionData,
          });
        } else if (req.query.action === "interact") {
          const { sessionId, interactionType, data } = req.body;
          const result = await handleLotusInteraction(
            sessionId,
            interactionType,
            data,
          );
          res.status(200).json(result);
        } else {
          res.status(400).json({ error: "Invalid action" });
        }
        break;

      case "GET":
        if (req.query.action === "report") {
          const sessionId = req.query.sessionId as string;
          const report = await generateLotusReport(sessionId);
          res.status(200).json(report);
        } else {
          res.status(400).json({ error: "Invalid action" });
        }
        break;

      case "DELETE":
        if (req.query.action === "cleanup") {
          const sessionId = req.query.sessionId as string;
          await cleanupLotusSession(sessionId);
          res.status(200).json({ success: true });
        } else {
          res.status(400).json({ error: "Invalid action" });
        }
        break;

      default:
        res.setHeader("Allow", ["POST", "GET", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Lotus API Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
