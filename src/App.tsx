import Sidebar from "./components/Sidebar"
import Login from "./views/Login"
import Users from "./views/Users/Users"
import Groups from "./views/Groups/Groups"
import Tasks from "./views/Tasks/Tasks"
import CreateUser from "./views/Users/CreateUser"
import CreateGroup from "./views/Groups/CreateGroup"
import CreateTask from "./views/Tasks/CreateTask"
import UserDetails from "./views/Users/UserDetails"
import GroupDetails from "./views/Groups/GroupDetails"
import TaskDetails from "./views/Tasks/TaskDetails"
import EditUser from "./views/Users/EditUser"
import EditGroup from "./views/Groups/EditGroup"
import EditTask from "./views/Tasks/EditTask"
import BreadCrumbs from "./components/BreadCrumbs"
import { useAppSelector } from "./redux/hook"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

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
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/:id/edit-task" element={<EditTask />} />
          <Route path="/tasks/create-task" element={<CreateTask />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
