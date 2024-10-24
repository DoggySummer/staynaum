import { executeQuery } from "@/lib/db"
import { NextResponse } from "next/server"
import { compare } from "bcrypt"
import { RowDataPacket } from "mysql2"

interface UserRow extends RowDataPacket {
  name: string
  password: string
}
export async function POST(request: Request) {
  try {
    const { id, password } = await request.json()
    const result = await executeQuery<UserRow[]>({
      query: "SELECT name, password FROM USER_TB WHERE name = ? ",
      values: [id],
    })
    if (result.length === 0) {
      return NextResponse.json(
        { error: "유저 정보가 존재하지 않습니다" },
        { status: 404 }
      )
    }

    const user = result[0]
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "비밀번호의 값이 다릅니다" },
        { status: 401 }
      )
    }

    // 로그인 성공
    return NextResponse.json({ success: true, name: user.name })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
