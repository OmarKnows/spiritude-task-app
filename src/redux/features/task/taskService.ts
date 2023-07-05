import axios from "axios"
import { User } from "../users/userModel"
import { Task } from "./taskModel"

const getToken = (): string | null => {
  const stringUserData = localStorage.getItem("userData")
  const userData = stringUserData ? JSON.parse(stringUserData) : null
  return userData ? userData.accessToken : null
}

const fetchTasks = async (): Promise<Task[]> => {
  const token = getToken()

  const response = await axios.get("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.payload.data
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

const addTask = async (task: Task, user: User): Promise<Task> => {
  const token = getToken()

  const response = await axios.post(
    "/tasks",
    {
      user: user,
      dueDate: task.dueDate,
      details: task.details,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data.payload.data
}

const updateTask = async (taskData: {
  status: string
  details: string
  dueDate: string
  user: User
  _id: string
}): Promise<Task> => {
  const token = getToken()

  const response = await axios.patch(
    `/tasks/${taskData._id}`,
    {
      status: taskData.status,
      details: taskData.details,
      dueDate: taskData.dueDate,
      user: taskData.user,
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

const taskServices = {
  fetchTasks,
  fetchTasksById,
  addTask,
  updateTask,
  deleteTask,
}

export default taskServices
