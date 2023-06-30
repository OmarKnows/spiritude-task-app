import axios from "axios"
import { User } from "../users/userModel"

const getToken = (): string | null => {
  const stringUserData = localStorage.getItem("userData")
  const userData = stringUserData ? JSON.parse(stringUserData) : null
  return userData ? userData.accessToken : null
}

const fetchUsers = async (): Promise<User[]> => {
  const token = getToken()

  const response = await axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
}

const addUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<User> => {
  const token = getToken()

  const response = await axios.post(
    "/users",
    { name, email, password, role },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data.payload.data
}

const userServices = {
  fetchUsers,
  addUser,
}

export default userServices
