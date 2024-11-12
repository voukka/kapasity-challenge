import type { NextApiRequest, NextApiResponse } from "next";
import type { Device } from "../../../interfaces";
import * as db from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const result = await db.query(
        `
        SELECT d.device_id, d.location_name, d.latitude, d.longitude, r.fullness_level
        FROM devices d
        LEFT JOIN LATERAL (
          SELECT fullness_level
          FROM readings
          WHERE readings.device_id = d.device_id
          ORDER BY timestamp DESC
          LIMIT 1
        ) r ON true;
      `,
        [],
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve devices" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
