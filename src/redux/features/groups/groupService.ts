import axios from "axios"
import { User } from "../users/userModel"
import { Group } from "./groupModel"

const getToken = (): string | null => {
  const stringUserData = localStorage.getItem("userData")
  const userData = stringUserData ? JSON.parse(stringUserData) : null
  return userData ? userData.accessToken : null
}

const fetchGroups = async (): Promise<Group[]> => {
  const token = getToken()

  const response = await axios.get("/groups", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
}

const fetchGroupById = async (id: string): Promise<Group> => {
  const token = getToken()

  const response = await axios.get(`/groups/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
}

const addGroup = async (
  users: string[] | undefined,
  name: string,
  description: string,
): Promise<Group> => {
  const token = getToken()

  const response = await axios.post(
    "/groups",
    {
      users,
      name,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data.payload.data
}

const updateGroup = async (groupData: {
  name: string
  description: string
  users: any[] | undefined
  _id: string
}): Promise<Group> => {
  const token = getToken()

  const response = await axios.patch(
    `/groups/${groupData._id}`,
    {
      users: groupData.users,
      name: groupData.name,
      description: groupData.description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data.payload.data
}

const deleteGroup = async (id: string) => {
  const token = getToken()

  const response = await axios.delete(`groups/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
}

const groupServices = {
  fetchGroups,
  fetchGroupById,
  addGroup,
  updateGroup,
  deleteGroup,
}

export default groupServices
