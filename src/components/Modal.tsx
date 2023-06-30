import React, { useEffect, useState } from "react"
import { User } from "../redux/features/users/userModel"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import { updateUser } from "../redux/features/users/usersSlice"
import { useParams } from "react-router-dom"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  selectedUser: User | null
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch()
  const { selectedUser } = useAppSelector((state) => state.user)

  const [name, setName] = useState(selectedUser?.name || "")
  const [email, setEmail] = useState(selectedUser?.email || "")
  const [password, setPassword] = useState(selectedUser?.password || "")
  const [role, setRole] = useState(selectedUser?.role || "")

  const { id } = useParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="relative bg-white p-8 max-w-md mx-auto rounded shadow-lg z-50">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
                value={role}
                onChange={(e) => {
                  setRole(e.target.value)
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

export default Modal
