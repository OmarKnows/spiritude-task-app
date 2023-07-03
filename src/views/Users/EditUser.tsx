import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { addUser, updateUser } from "../../redux/features/users/usersSlice"
import { useParams } from "react-router-dom"

const EditUser = () => {
  const dispatch = useAppDispatch()
  const { selectedUser } = useAppSelector((state) => state.user)

  const [formData, setFormData] = useState({
    name: selectedUser?.name,
    email: selectedUser?.email,
    password: "",
    role: selectedUser?.role,
  })

  const { id } = useParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, email, password, role } = formData
    if (!name || !email || !password || !role || !id) return
    e.preventDefault()
    dispatch(
      updateUser({
        name,
        email,
        password,
        role,
        _id: id,
      }),
    )
  }

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              name="name"
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Password
            </label>
            <input
              type="password"
              value={formData.password || ""}
              name="password"
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="grid-state"
            >
              Role
            </label>
            <div className="relative">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="grid-state"
                value={formData.role}
                name="role"
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }}
              >
                <option value={"USER"}>User</option>
                <option value={"ADMIN"}>Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser
