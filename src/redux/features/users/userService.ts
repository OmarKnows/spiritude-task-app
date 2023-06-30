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

const fetchUserById = async (id: string): Promise<User> => {
  const token = getToken()

  const response = await axios.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
}

const addUser = async (user: User): Promise<User> => {
  const token = getToken()

  const response = await axios.post(
    "/users",
    {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data.payload.data
}

const updateUser = async (user: User): Promise<User> => {
  const token = getToken()

  const response = await axios.patch(
    `/users/${user._id}`,
    {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data.payload.data
}

const deleteUser = async (id: string) => {
  const token = getToken()

  const response = await axios.delete(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
}

const userServices = {
  fetchUsers,
  fetchUserById,
  addUser,
  updateUser,
  deleteUser,
}

export default userServices
