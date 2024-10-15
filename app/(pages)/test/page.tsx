import { executeQuery } from "@/lib/db"
import { RowDataPacket } from "mysql2"
import CurrentTime from "./current-time"

async function getCurrentTime() {
  try {
    const result = await executeQuery<RowDataPacket[]>({
      query: "SELECT NOW() as now",
      values: [],
    })
    return result[0].now as string
  } catch (error) {
    console.error("Failed to fetch current time:", error)
    return null
  }
}

export default async function Page() {
  const currentTime = await getCurrentTime()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>
        <p className="mt-3 text-2xl">Connected to MySQL Database</p>
        <CurrentTime initialTime={currentTime} />
      </main>
    </div>
  )
}
