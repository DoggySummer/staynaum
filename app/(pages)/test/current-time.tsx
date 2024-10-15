"use client"

import { useState, useEffect } from "react"

export default function CurrentTime({
  initialTime,
}: {
  initialTime: string | null
}) {
  const [currentTime, setCurrentTime] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toISOString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!currentTime) {
    return <p className="mt-3 text-xl">Failed to fetch current time</p>
  }

  return (
    <p className="mt-3 text-xl">
      Current time: {new Date(currentTime).toLocaleString()}
    </p>
  )
}
