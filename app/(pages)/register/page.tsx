"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Component() {
  const router = useRouter()
  const [id, setID] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email)
  }

  useEffect(() => {
    if (email && !isValidEmail(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.")
    } else {
      setEmailError("")
    }
  }, [email])

  useEffect(() => {
    if (password !== repeatPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다")
    } else {
      setPasswordError("")
    }
  }, [password, repeatPassword])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (emailError || passwordError) {
      return // 유효성 검사 오류가 있으면 제출하지 않음
    }

    const data = {
      id,
      email,
      password,
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (response.ok) {
        // 성공적으로 제출됨
        alert("회원가입이 완료되었습니다")
        router.push("/login")
      } else {
        // 오류 처리
        alert(result.error)
        console.error("회원가입 실패 ", result.error)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900 pb-20">
              회원가입
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="id" className="sr-only">
                  아이디
                </Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  required
                  className="outline-none focus:outline-none appearance-none relative block w-full px-0 py-2 bg-transparent border-0 border-b border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                  placeholder="아이디"
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email" className="sr-only">
                  이메일
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="outline-none focus:outline-none appearance-none relative block w-full px-0 py-2 bg-transparent border-0 border-b border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {emailError}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  비밀번호
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-0 py-2 bg-transparent border-0 border-b border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="repeatPassword" className="sr-only">
                  비밀번호 확인
                </Label>
                <Input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-0 py-2 bg-transparent border-0 border-b border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm"
                  placeholder="비밀번호 확인"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                회원가입
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
