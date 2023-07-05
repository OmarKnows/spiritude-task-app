import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { addUser, updateUser } from "../../redux/features/users/usersSlice"
import { useParams } from "react-router-dom"
import { updateGroup } from "../../redux/features/groups/groupSlice"

const EditGroup = () => {
  const dispatch = useAppDispatch()
  const { selectedGroup } = useAppSelector((state) => state.group)

  const [formData, setFormData] = useState({
    name: selectedGroup?.name,
    description: selectedGroup?.description,
    users: selectedGroup?.users,
  })

  const { id } = useParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, description, users } = formData
    if (!name || !description || !users || !id) return
    e.preventDefault()
    dispatch(
      updateGroup({
        name,
        description,
        _id: id,
        users,
      }),
    )
  }

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit Group Details</h2>
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
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              name="description"
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

export default EditGroup
