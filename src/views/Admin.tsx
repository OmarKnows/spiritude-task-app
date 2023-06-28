import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import { fetchUsers } from "../redux/features/users/usersSlice"
import ModuleTable from "../components/ModuleTable"
import { User } from "../redux/features/users/userModel"

const Admin = () => {
  const dispatch = useAppDispatch()
  const { users } = useAppSelector((state) => state.user)

  const [admins, setAdmins] = useState<User[]>([])

  useEffect(() => {
    dispatch(fetchUsers())
    setAdmins(users.filter((user) => user.role === "ADMIN"))
    console.log(admins)
  }, [setAdmins])

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="flex justify-center">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Admins
        </h1>
      </div>
      <div className="mx-3">
        <ModuleTable users={admins} />
      </div>
    </div>
  )
}

export default Admin
