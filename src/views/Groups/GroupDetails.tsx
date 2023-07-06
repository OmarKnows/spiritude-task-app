import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { useEffect } from "react"
import {
  deleteUser,
  fetchUserById,
} from "../../redux/features/users/usersSlice"
import {
  deleteGroup,
  fetchGroupById,
} from "../../redux/features/groups/groupSlice"
import UserTable from "../../components/UserTable"

const GroupDetails = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { selectedGroup } = useAppSelector((state) => state.group)
  let { id } = useParams()

  const handleDelete = () => {
    if (id) dispatch(deleteGroup(id))
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchGroupById(id))
    }
  }, [])

  return (
    <div>
      <div className="w-[85vw] ml-[15vw]">
        <div className="bg-white max-w shadow overflow-hidden sm:rounded-lg">
          <div className="flex justify-between  px-4 py-5 sm:px-6">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
              Group Details
            </h1>
            <div>
              <button
                onClick={handleDelete}
                className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded "
              >
                Delete
              </button>

              <button
                onClick={() => navigate("edit-group")}
                className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 mx-3 rounded "
              >
                Edit
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 m-5">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedGroup?.name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedGroup?.description}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Created By
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedGroup?.createdBy?.name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Users</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <UserTable groupDetails={true} users={selectedGroup?.users} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupDetails
