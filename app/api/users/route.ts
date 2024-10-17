import { executeQuery } from "@/lib/db"
import { NextResponse } from "next/server"
import { RowDataPacket, OkPacket } from "mysql2"

interface User extends RowDataPacket {
  id: number
  name: string
  email: string
}

export async function GET() {
  try {
    const users = await executeQuery<User[]>({
      query: "SELECT * FROM users",
      values: [],
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()
    const result = await executeQuery<OkPacket>({
      query: "INSERT INTO users (name, email) VALUES (?, ?)",
      values: [name, email],
    })
    return NextResponse.json({ id: result.insertId, name, email })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
