"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RowDataPacket } from "mysql2"

interface User extends RowDataPacket {
  id: number
  name: string
  email: string
}

export default function CrudButtons({
  initialUsers,
}: {
  initialUsers: User[]
}) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [newUser, setNewUser] = useState({ name: "", email: "" })
  const [message, setMessage] = useState("")

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
      if (!response.ok) throw new Error("Failed to create user")
      const createdUser = await response.json()
      setUsers([...users, createdUser])
      setNewUser({ name: "", email: "" })
      setMessage("User created successfully")
    } catch (error) {
      console.log(error)
      setMessage("Failed to create user")
    }
  }

  const handleRead = async () => {
    try {
      const response = await fetch("/api/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      const fetchedUsers = await response.json()
      setUsers(fetchedUsers)
      setMessage("Users fetched successfully")
    } catch (error) {
      console.log(error)
      setMessage("Failed to fetch users")
    }
  }

  const handleUpdate = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Updated Name",
          email: "updated@email.com",
        }),
      })
      if (!response.ok) throw new Error("Failed to update user")
      const updatedUser = await response.json()
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
      setMessage("User updated successfully")
    } catch (error) {
      console.log(error)

      setMessage("Failed to update user")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete user")
      setUsers(users.filter((user) => user.id !== id))
      setMessage("User deleted successfully")
    } catch (error) {
      console.log(error)

      setMessage("Failed to delete user")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <Button onClick={handleCreate}>Create</Button>
      </div>
      <Button onClick={handleRead}>Read All Users</Button>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-2">
            <span>
              {user.name} ({user.email})
            </span>
            <Button onClick={() => handleUpdate(user.id)}>Update</Button>
            <Button onClick={() => handleDelete(user.id)} variant="destructive">
              Delete
            </Button>
          </div>
        ))}
      </div>
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  )
}
