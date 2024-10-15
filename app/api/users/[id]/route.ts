import { executeQuery } from "@/lib/db"
import { NextResponse } from "next/server"
import { OkPacket } from "mysql2"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email } = await request.json()
    await executeQuery<OkPacket>({
      query: "UPDATE users SET name = ?, email = ? WHERE id = ?",
      values: [name, email, params.id],
    })
    return NextResponse.json({ id: params.id, name, email })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await executeQuery<OkPacket>({
      query: "DELETE FROM users WHERE id = ?",
      values: [params.id],
    })
    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    )
  }
}
