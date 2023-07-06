import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { fetchTasks } from "../../redux/features/task/taskSlice"
import TaskTable from "../../components/TaskTable"

const Tasks = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { tasks } = useAppSelector((state) => state.task)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="flex justify-between m-3">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Tasks
        </h1>
        <button
          onClick={() => navigate("create-task")}
          className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>
      <div className="mx-3">
        <TaskTable tasks={tasks} />
      </div>
    </div>
  )
}

export default Tasks
