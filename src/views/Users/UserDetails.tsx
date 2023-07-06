import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { useEffect, useState } from "react"
import {
  deleteUser,
  fetchUserById,
} from "../../redux/features/users/usersSlice"

const UserDetails = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { selectedUser } = useAppSelector((state) => state.user)
  let { id } = useParams()

  const handleDelete = () => {
    if (id) dispatch(deleteUser(id))
  }

  const toTitleCase = (str?: string): string | undefined => {
    if (str !== undefined)
      return str
        .toLowerCase()
        .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase())
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id))
      console.log(selectedUser)
    }
  }, [])

  return (
    <div>
      <div className="w-[85vw] ml-[15vw]">
        <div className="bg-white max-w shadow overflow-hidden sm:rounded-lg">
          <div className="flex justify-between  px-4 py-5 sm:px-6">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
              User Details
            </h1>
            <div>
              <button
                onClick={handleDelete}
                className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded "
              >
                Delete
              </button>

              <button
                onClick={() => navigate("edit-user")}
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
                  {selectedUser?.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedUser?.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {toTitleCase(selectedUser?.role)}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Group</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {toTitleCase(selectedUser?.assignedGroup?.name)}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tasks</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {toTitleCase(selectedUser?.totalTasks?.toString())}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
