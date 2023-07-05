import Sidebar from "./components/Sidebar"
import Login from "./views/Login"
import Users from "./views/Users/Users"
import Tasks from "./views/Tasks/Tasks"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useAppSelector } from "./redux/hook"
import CreateUser from "./views/Users/CreateUser"
import UserDetails from "./views/Users/UserDetails"
import EditUser from "./views/Users/EditUser"
import BreadCrumbs from "./components/BreadCrumbs"
import Groups from "./views/Groups/Groups"
import CreateGroup from "./views/Groups/CreateGroup"
import GroupDetails from "./views/Groups/GroupDetails"
import EditGroup from "./views/Groups/EditGroup"

const App = () => {
  const { userData } = useAppSelector((state) => state.auth)

  return (
    <div>
      <Router>
        {userData ? <Sidebar /> : <Navigate to="/" />}
        <BreadCrumbs />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/:id/edit-user" element={<EditUser />} />
          <Route path="/users/create-user" element={<CreateUser />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:id" element={<GroupDetails />} />
          <Route path="/groups/:id/edit-group" element={<EditGroup />} />
          <Route path="/groups/create-group" element={<CreateGroup />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
