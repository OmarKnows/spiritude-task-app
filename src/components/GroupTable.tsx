import React from "react"
import { useNavigate } from "react-router-dom"
import { Group } from "../redux/features/groups/groupModel"

interface Props {
  groups: Group[]
}

const GroupTable: React.FC<Props> = ({ groups }) => {
  const navigate = useNavigate()

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 white:bg-gray-700 white:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Created By
            </th>
          </tr>
        </thead>
        <tbody>
          {groups?.map((group) => (
            <tr
              key={group._id}
              onClick={() => navigate(`${group._id}`)}
              className="bg-white border-b white:bg-gray-900 white:border-gray-700"
            >
              <td className="px-6 py-4">{group.name}</td>
              <td className="px-6 py-4">{group.description}</td>
              <td className="px-6 py-4">{group?.createdBy?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GroupTable
