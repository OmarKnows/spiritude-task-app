import React from "react"
import { User } from "../redux/features/users/userModel"
import { useNavigate } from "react-router-dom"
import { Group } from "../redux/features/groups/groupModel"

interface Props {
  moduleType: "user" | "group"
  users?: User[]
  groups?: Group[]
}

const ModuleTable: React.FC<Props> = ({ users, groups, moduleType }) => {
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
              {moduleType === "user" ? "Email" : "Description"}
            </th>
            <th scope="col" className="px-6 py-3">
              {moduleType === "user" ? "Role" : "Created By"}
            </th>
            {moduleType === "user" ? (
              <>
                <th scope="col" className="px-6 py-3">
                  Group
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Tasks
                </th>
              </>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {moduleType === "user" ? (
            users?.map((user) => (
              <tr
                key={user._id}
                onClick={() => navigate(`${user._id}`)}
                className="bg-white border-b white:bg-gray-900 white:border-gray-700"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{toTitleCase(user.role)}</td>
                <td className="px-6 py-4">
                  {user.assignedGroup?.name || "N/A"}
                </td>
                <td className="px-6 py-4">{user.totalTasks}</td>
              </tr>
            ))
          ) : (
            <></>
          )}

          {moduleType === "group" ? (
            groups?.map((group) => (
              <tr
                key={group._id}
                onClick={() => navigate(`${group._id}`)}
                className="bg-white border-b white:bg-gray-900 white:border-gray-700"
              >
                <td className="px-6 py-4">{group.name}</td>
                <td className="px-6 py-4">{group.description}</td>
                <td className="px-6 py-4">{group?.createdBy?.name}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ModuleTable
