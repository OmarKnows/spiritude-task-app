import Sidebar from "./components/Sidebar"
import Login from "./views/Login"
import Admin from "./views/Admin"
import Users from "./views/Users"
import Employees from "./views/Employees"
import Teams from "./views/Teams"
import Tasks from "./views/Tasks"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

const App = () => {
  return (
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admins" element={<Admin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
