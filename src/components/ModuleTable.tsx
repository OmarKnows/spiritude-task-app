import React from "react"
import { User } from "../redux/features/users/userModel"

interface Props {
  users: User[]
}

const ModuleTable: React.FC<Props> = ({ users }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 white:bg-gray-700 white:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              E-Mail
            </th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map((user) => (
              <tr className="bg-white border-b white:bg-gray-900 white:border-gray-700">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
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
