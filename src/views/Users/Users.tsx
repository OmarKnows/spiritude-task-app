import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hook"
import { fetchUsers } from "../../redux/features/users/usersSlice"
import { useNavigate } from "react-router-dom"
import UserTable from "../../components/UserTable"
import Pagination from "../../components/Pagination"

const Users = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { users, total, page, limit, pages } = useAppSelector(
    (state) => state.user,
  )

  const [currentPage, setCurrentPage] = useState<number>(1)
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit }))
  }, [currentPage])

  return (
    <div className="w-[85vw] ml-[15vw]">
      <div className="flex justify-between m-3">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
          Users
        </h1>

        <button
          onClick={() => navigate("create-user")}
          className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>
      </div>
      <div className="mx-3">
        <UserTable groupDetails={false} users={users} />
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

export default Users
