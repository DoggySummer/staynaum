import { executeQuery } from "@/lib/db"
import { NextResponse } from "next/server"
// import { RowDataPacket, OkPacket } from "mysql2"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const result = await executeQuery({
      query: "DELETE FROM USER_TB WHERE id = ?",
      values: [id],
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
