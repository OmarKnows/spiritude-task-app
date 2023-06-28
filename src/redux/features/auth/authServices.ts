import axios from "axios"
import { User } from "../users/userModel"

const login = async (email: string, password: string): Promise<User> => {
  const response = await axios.post("/auth/public/login-email", {
    email,
    password,
  })
  const userData: User = response.data.payload.data
  localStorage.setItem("userData", JSON.stringify(response.data.payload.data))
  return userData
}

const logout = () => {
  localStorage.removeItem("userData")
}

const authServices = {
  login,
  logout,
}

export default authServices
