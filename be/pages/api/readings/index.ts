import type { NextApiRequest, NextApiResponse } from "next";
import type { NewReading } from "../../../interfaces";
import * as db from "../../../db";
/**
curl -X POST http://localhost:3000/api/readings \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "thing-1",
    "fullness_level": 5,
    "timestamp": "2024-11-11T14:48:00.000Z"
  }'
*/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST": {
      const { device_id, fullness_level, timestamp } = req.body as NewReading;
      if (!device_id || fullness_level == null || !timestamp) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const fullness_level_validated = parseInt(fullness_level, 10);

      if (fullness_level_validated < 0 || fullness_level_validated > 100) {
        return res.status(400).json({
          error: "Field `fullness_level` must be an integer between 0 and 100.",
        });
      }

      try {
        await db.query(
          `
              INSERT INTO readings (device_id, fullness_level, timestamp)
              VALUES ($1, $2, $3)
            `,
          [device_id, fullness_level_validated, timestamp],
        );

        res.status(201).json({ message: "Reading added successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to save the reading" });
        console.log(error);
      }
    }
    default: {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
