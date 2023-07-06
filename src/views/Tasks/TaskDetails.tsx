import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { useEffect } from "react"
import { deleteTask, fetchTasksById } from "../../redux/features/task/taskSlice"
import StatusPill from "../../components/StatusPill"

const TaskDetails = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { selectedTask } = useAppSelector((state) => state.task)
  let { id } = useParams()

  const handleDelete = () => {
    if (id) dispatch(deleteTask(id))
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchTasksById(id))
    }
  }, [])

  return (
    <div>
      <div className="w-[85vw] ml-[15vw]">
        <div className="bg-white max-w shadow overflow-hidden sm:rounded-lg">
          <div className="flex justify-between  px-4 py-5 sm:px-6">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
              Task Details
            </h1>
            <div>
              <button
                onClick={handleDelete}
                className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded "
              >
                Delete
              </button>

              <button
                onClick={() => navigate("edit-task")}
                className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 mx-3 rounded "
              >
                Edit
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 m-5">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Details</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedTask?.details}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <StatusPill status={selectedTask?.status} />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedTask?.dueDate.substring(0, 10)}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Past Due Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedTask?.isTaskPastDue ? "Yes" : "No"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Created By
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedTask?.createdBy?.name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedTask?.user.name}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails
