import { executeQuery } from "@/lib/db"
import { RowDataPacket } from "mysql2"
import CrudButtons from "./crud-btn"

interface User extends RowDataPacket {
  id: number
  name: string
  email: string
}

async function getUsers(): Promise<User[]> {
  try {
    const result = await executeQuery<RowDataPacket[]>({
      query: "SELECT * FROM USER_TB",
      values: [],
    })
    const serializedUsers = result.map((user) => ({
      id: Number(user.id),
      name: user.name,
      email: user.email,
    }))
    return serializedUsers as User[]
  } catch (error) {
    console.error("Failed to fetch users:", error)
    return []
  }
}

export default async function Page() {
  const users = await getUsers()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">MySQL CRUD Operations</h1>
        <CrudButtons initialUsers={users} />
      </main>
    </div>
  )
}
