import type { NextApiRequest, NextApiResponse } from "next";
import * as db from "../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const result = await db.query(
        `
        SELECT NOW();
      `,
        [],
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed connect to DB" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
