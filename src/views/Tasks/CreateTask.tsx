import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "tailwindcss/tailwind.css"
import Select from "react-tailwindcss-select"
import "react-tailwindcss-select/dist/index.css"
import { fetchUsers } from "../../redux/features/users/usersSlice"
import { addTask } from "../../redux/features/task/taskSlice"
import Message from "../../components/Message"

const CreateTask = () => {
  const dispatch = useAppDispatch()
  const { users, limit, error } = useAppSelector((state) => state.user)

  const [details, setDetails] = useState("")
  const [options, setOptions] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [success, setSuccess] = useState<boolean>(false)

  const submitHandler = (e: any) => {
    e.preventDefault()
    const dueDate = selectedDate ? new Date(selectedDate) : null
    const timestamp = dueDate ? dueDate.getTime() : null

    try {
      dispatch(
        addTask({
          user: selectedUser?.value,
          dueDate: timestamp,
          details,
        }),
      )
      setSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (value: any) => {
    setSelectedUser(value)
  }

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit }))
    setOptions(users.map((user) => ({ value: user._id, label: user.name })))
  }, [])

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="flex justify-between  px-4 py-5 sm:px-6">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Add Task
        </h1>
      </div>
      <div className="m-4">
        <form onSubmit={submitHandler} className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
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

            <div className="w-full px-3  mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                User
              </label>

              <Select
                value={selectedUser}
                onChange={handleChange}
                options={options}
                isSearchable={true}
                primaryColor={"Indigo"}
              />
            </div>

            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Due Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                className="text-black border rounded p-2"
                showTimeSelect
                dateFormat="Pp"
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
      {success ? (
        <Message
          message={"Task successfully created."}
          color={"green"}
          redirect={"/tasks"}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default CreateTask
