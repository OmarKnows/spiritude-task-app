import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import { logout } from "../redux/features/auth/authSlice"
import { useEffect } from "react"

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!userData) {
      navigate("/")
    }
  }, [userData])

  return (
    <div>
      <aside
        id="default-sidebar"
        className="w-[15vw] fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/teams"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Teams</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Tasks</span>
              </Link>
            </li>
            <li
              onClick={() => {
                dispatch(logout())
                navigate("/")
              }}
            >
              <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
