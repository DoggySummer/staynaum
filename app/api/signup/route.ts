import { executeQuery } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcrypt"
import { z } from "zod"
import { OkPacket } from "mysql2"

const signUpSchema = z.object({
  id: z.string().min(1, "아이디를 입력해주세요"),
  email: z.string().email("올바르지 않은 이메일 형식입님다"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = signUpSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { id, email, password } = result.data
    const hashedPassword = await hash(password, 10)

    // Here you would typically store the user in your database
    await executeQuery<OkPacket>({
      query: "INSERT INTO USER_TB (name, email, password) VALUES (?, ?, ?)",
      values: [id, email, hashedPassword],
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Sign up error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create user. Please try again." },
      { status: 500 }
    )
  }
}
