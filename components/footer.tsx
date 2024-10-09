'use client'

import React from 'react'

export function FooterComponent() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            스테이나음 | 대표자 김민정 | 주소 제주도 제주시 조천읍 와흘2길 6 (와흘리) | 전화 010 9473 2096
          </p>
          <p className="text-sm text-gray-500 mt-2">
            사업자 등록번호 676-87-12345 | 통신판매업 신고번호 : 2023-경기가평-290호
          </p>
          <p className="text-sm text-gray-500 mt-2">
            copyright Ⓒ 2023 스테이나음 ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  )
}