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

const addTask = async (
  user: string,
  dueDate: string | undefined,
  details: string,
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
  status: "TODO" | "IN_PROGRESS" | "DONE" | "PENDING_DELETE" | undefined
  details: string | undefined
  dueDate: string | undefined
  user: string | undefined
  _id: string | undefined
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
