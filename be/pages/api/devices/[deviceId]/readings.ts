import type { NextApiRequest, NextApiResponse } from "next";
import type { Reading } from "../../../../interfaces";
import * as db from "../../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { deviceId } = req.query;

  switch (req.method) {
    case "GET": {
      try {
        const result = await db.query(
          `
        SELECT reading_id, timestamp, fullness_level, created_at
        FROM readings
        WHERE device_id = $1
        ORDER BY timestamp DESC
      `,
          [deviceId],
        );

        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: "Failed to retrieve readings" });
      }
      break;
    }
    default: {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
