import axios from "axios"
import { User } from "../users/userModel"
import { Task } from "./taskModel"

const getToken = (): string | null => {
  const stringUserData = localStorage.getItem("userData")
  const userData = stringUserData ? JSON.parse(stringUserData) : null
  return userData ? userData.accessToken : null
}

const fetchTasks = async (page: number, limit: number) => {
  const token = getToken()

  const response = await axios.get(`/tasks?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload
}

const fetchTasksById = async (id: string): Promise<Task> => {
  const token = getToken()

  const response = await axios.get(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
}

const addTask = async (
  user: string,
  details: string,
  dueDate?: number | null,
): Promise<Task> => {
  const token = getToken()

  const response = await axios.post(
    "/tasks",
    {
      user,
      dueDate,
      details,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data.payload.data
}

const updateTask = async (task: {
  status?: "TODO" | "IN_PROGRESS" | "DONE" | "PENDING_DELETE"
  details?: string
  dueDate?: number | null
  user?: string
  _id?: string
}): Promise<Task> => {
  const token = getToken()

  const response = await axios.patch(
    `/tasks/${task._id}`,
    {
      status: task.status,
      details: task.details,
      dueDate: task.dueDate,
      user: task.user,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data.payload.data
}

const deleteTask = async (id: string) => {
  const token = getToken()

  const response = await axios.delete(`tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
}

const areTasksPastDue = async (): Promise<boolean> => {
  const token = getToken()

  const response = await axios.get("tasks/past-due", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data.areTasksPastDue
}

const taskServices = {
  fetchTasks,
  fetchTasksById,
  addTask,
  updateTask,
  deleteTask,
  areTasksPastDue,
}

export default taskServices
