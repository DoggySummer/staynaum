'use client'

import Link from 'next/link'

export function NavbarComponent() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl text-gray-800">
              스테이 나음
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/about" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                호텔소개
              </Link>
              <Link href="/inquiry" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                고객문의
              </Link>
              <Link href="/offers" className="text-gray-800 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                특별한 제안
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/login" className="text-gray-500 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                로그인
              </Link>
              <span className="text-gray-500 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                ko
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}