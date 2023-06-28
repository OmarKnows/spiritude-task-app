import axios from "axios"
import { User } from "../users/userModel"

const fetchUsers = async (): Promise<User[]> => {
  const stringUserData = localStorage.getItem("userData")
  const userData = stringUserData ? JSON.parse(stringUserData) : null
  const token = userData ? userData.accessToken : null

  const response = await axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
}

const userServices = {
  fetchUsers,
}

export default userServices
