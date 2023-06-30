import Sidebar from "./components/Sidebar"
import Login from "./views/Login"
import Users from "./views/Users/Users"
import Teams from "./views/Teams"
import Tasks from "./views/Tasks"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useAppSelector } from "./redux/hook"
import CreateUser from "./views/Users/CreateUser"
import UserDetails from "./views/Users/UserDetails"

const App = () => {
  const { userData } = useAppSelector((state) => state.auth)

  return (
    <div>
      <Router>
        {userData ? <Sidebar /> : <Navigate to="/" />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/create-user" element={<CreateUser />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
