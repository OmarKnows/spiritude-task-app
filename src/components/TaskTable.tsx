import React from "react"
import { useNavigate } from "react-router-dom"
import { Task } from "../redux/features/task/taskModel"
import StatusPill from "./StatusPill"

interface Props {
  tasks: Task[]
}

const TaskTable: React.FC<Props> = ({ tasks }) => {
  const navigate = useNavigate()

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 white:bg-gray-700 white:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Details
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Due Date
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Created By
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr
              key={task._id}
              onClick={() => navigate(`${task._id}`)}
              className="bg-white border-b white:bg-gray-900 white:border-gray-700 cursor-pointer"
            >
              <td className="px-6 py-4">{task.details}</td>
              <td className="px-6 py-4">
                <StatusPill status={task.status} />
              </td>
              <td className="px-6 py-4">{task.dueDate}</td>
              <td className="px-6 py-4">{task.user.name}</td>
              <td className="px-6 py-4">{task.createdBy.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskTable
