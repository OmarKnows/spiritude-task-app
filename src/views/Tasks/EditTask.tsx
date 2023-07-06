import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { useParams } from "react-router-dom"
import { updateTask } from "../../redux/features/task/taskSlice"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "tailwindcss/tailwind.css"

const EditTask = () => {
  const dispatch = useAppDispatch()
  const { selectedTask } = useAppSelector((state) => state.task)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [formData, setFormData] = useState({
    status: selectedTask?.status,
    details: selectedTask?.details,
    dueDate: selectedTask?.dueDate,
    user: {},
  })

  const { id } = useParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { status, details, dueDate, user } = formData
    if (!status || !details || !dueDate || !user || !id) return
    e.preventDefault()
    console.log(
      status + " " + details + " " + dueDate + selectedDate?.toISOString(),
    )
    // dispatch(
    //   updateTask(
    //     status,
    //     details,
    //     dueDate,
    //     user
    //   )
    // )
  }

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="grid-state"
            >
              Status
            </label>
            <div className="relative">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="grid-state"
                value={formData.status}
                name="status"
                onChange={(e) => {
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }}
              >
                <option value={"TODO"}>To do</option>
                <option value={"IN_PROGRESS"}>In Progress</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Details
            </label>
            <input
              type="text"
              value={formData.details}
              name="name"
              onChange={(e) => {
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Due Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              className="text-black border rounded p-2"
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

export default EditTask
