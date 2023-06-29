import ModuleTable from "../components/ModuleTable"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import { fetchUsers } from "../redux/features/users/usersSlice"

const Users = () => {
  const dispatch = useAppDispatch()
  const { users } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUsers())
    console.log(users)
  }, [])

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="flex justify-center">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Users
        </h1>
      </div>
      <div className="mx-3">
        <ModuleTable users={users} />
      </div>
    </div>
  )
}

export default Users
