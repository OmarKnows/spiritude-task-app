import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import {
  areTasksPastDue,
  fetchTasks,
} from "../../redux/features/task/taskSlice"
import TaskTable from "../../components/TaskTable"
import DueBanner from "../../components/DueBanner"
import Pagination from "../../components/Pagination"

const Tasks = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { tasks, tasksPastDue, limit, page, pages, total } = useAppSelector(
    (state) => state.task,
  )

  const [currentPage, setCurrentPage] = useState<number>(1)
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(fetchTasks({ page: currentPage, limit }))
    dispatch(areTasksPastDue())
  }, [])

  return (
    <div className="w-[85vw] ml-[15vw]">
      {tasksPastDue ? <DueBanner /> : <></>}
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
      <Pagination
        currentPage={currentPage}
        totalPages={pages}
        totalEntries={total}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Tasks
