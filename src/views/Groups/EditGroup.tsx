import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { useParams } from "react-router-dom"
import { updateGroup } from "../../redux/features/groups/groupSlice"
import Select from "react-tailwindcss-select"
import "react-tailwindcss-select/dist/index.css"
import { fetchUsers } from "../../redux/features/users/usersSlice"

const EditGroup = () => {
  const dispatch = useAppDispatch()
  const { selectedGroup } = useAppSelector((state) => state.group)
  const { users } = useAppSelector((state) => state.user)
  const { id } = useParams()

  const [options, setOptions] = useState<any[]>([])
  const [groupMembers, setGroupMembers] = useState<any[] | null>(null)
  const [formData, setFormData] = useState({
    name: selectedGroup?.name,
    description: selectedGroup?.description,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, description } = formData
    if (!name || !description || !id) return
    e.preventDefault()
    dispatch(
      updateGroup({
        name,
        description,
        _id: id,
        users: groupMembers?.map((user) => user.value),
      }),
    )
  }

  const handleChange = (value: any) => {
    setGroupMembers(value)
  }

  useEffect(() => {
    dispatch(fetchUsers)
    setOptions(users.map((user) => ({ value: user._id, label: user.name })))
  }, [])

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit Group Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Name</label>
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
            <label className="block mb-2 text-sm font-medium">
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Users</label>
            <Select
              value={groupMembers}
              onChange={handleChange}
              options={options}
              isMultiple={true}
              isSearchable={true}
              primaryColor={"Indigo"}
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
