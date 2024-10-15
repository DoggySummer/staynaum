import { NextApiRequest, NextApiResponse } from "next"
import { executeQuery } from "../../lib/db"
import { RowDataPacket } from "mysql2"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await executeQuery<RowDataPacket[]>({
      query: "SELECT NOW() as now",
      values: [],
    })
    res.status(200).json({ now: result[0].now })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
