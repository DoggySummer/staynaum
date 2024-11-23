"use client"

import { useState } from "react"
import Image from "next/image"

export default function Page({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src="/promotion.jpg"
        width={900}
        height={900}
        alt={params.id}
        className="mx-auto my-10"
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}
