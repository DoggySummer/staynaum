"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signIn } from "next-auth/react"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const router = useRouter()
  const [id, setID] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = { id, password }
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (response.ok) {
        // 성공적으로 제출됨
        alert("로그인이 완료되었습니다")
        router.push("/")
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
              로그인
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
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                로그인
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <Button
                  variant="outline"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => signIn("naver")}
                >
                  <Image
                    className="h-5 w-5"
                    src="/sns_naver.svg"
                    alt="Naver logo"
                    width={20}
                    height={20}
                  />
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => signIn("kakao")}
                >
                  <Image
                    className="h-5 w-5"
                    src="/kakao.webp"
                    alt="Kakao logo"
                    width={20}
                    height={20}
                  />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm">
              <a
                href="/register"
                className="font-medium text-gray-900 hover:text-gray-700"
              >
                회원가입
              </a>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-gray-900 hover:text-gray-700"
              >
                아이디 찾기
              </a>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-gray-900 hover:text-gray-700"
              >
                비밀번호 찾기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
