import React from "react"
import { useNavigate } from "react-router-dom"
import { User } from "../redux/features/users/userModel"

interface Props {
  users: User[]
}

const UserTable: React.FC<Props> = ({ users }) => {
  const navigate = useNavigate()

  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase())
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 white:bg-gray-700 white:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Group
            </th>
            <th scope="col" className="px-6 py-3">
              Total Tasks
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={user._id}
              onClick={() => navigate(`${user._id}`)}
              className="bg-white border-b white:bg-gray-900 white:border-gray-700"
            >
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{toTitleCase(user.role)}</td>
              <td className="px-6 py-4">{user.assignedGroup?.name}</td>
              <td className="px-6 py-4">{user.totalTasks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
