import { useState } from "react"
import { useAppDispatch } from "../../redux/hook"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "tailwindcss/tailwind.css"
import { addTask } from "../../redux/features/task/taskSlice"

const CreateTask = () => {
  const dispatch = useAppDispatch()

  const [details, setDetails] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const submitHandler = (e: any) => {
    e.preventDefault()
    // dispatch(
    //   addTask({
    //     user: {},
    //     task: {
    //         dueDate: selectedDate?.toISOString(),
    //         details:
    //     }
    //   }),
    // )
    console.log(selectedDate?.toISOString())
  }
  return (
    <div className="w-[85vw] ml-[15vw] bg-white max-w shadow overflow-hidden sm:rounded-lg">
      <div className="flex justify-between  px-4 py-5 sm:px-6">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Add Task
        </h1>
      </div>
      <div className="m-4">
        <form onSubmit={submitHandler} className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Details
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Description
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                className="text-black border rounded p-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTask
